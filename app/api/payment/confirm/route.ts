import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Execution from "@/models/Execution";
import { executeAgent } from "@/services/executionService";
import { ethers } from "ethers";
import { verifyContractPayment } from "@/lib/contractService";
import { verifyAvalanchePayment } from "@/lib/avalancheVerifier";

const RPC_URL = process.env.AVALANCHE_RPC || "https://api.avax-test.network/ext/bc/C/rpc";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { executionId, txHash, contractExecutionId } = await req.json();

    if (!executionId || !txHash) {
      return NextResponse.json(
        { success: false, message: "Missing required confirmation data" },
        { status: 400 }
      );
    }

    const execution = await Execution.findById(executionId);
    if (!execution) {
      return NextResponse.json(
        { success: false, message: "Execution not found" },
        { status: 404 }
      );
    }

    // 1. Verify transaction on blockchain
    const verifierRes = await verifyAvalanchePayment(
      txHash,
      execution.userWallet,
      CONTRACT_ADDRESS || "",
      execution.paymentAmount
    );

    if (!verifierRes.success) {
      return NextResponse.json(
        { success: false, message: verifierRes.message },
        { status: 400 }
      );
    }

    // PART 7 - Extra strict check for contract address
    if (CONTRACT_ADDRESS && verifierRes.success) {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const tx = await provider.getTransaction(txHash);
      if (tx?.to?.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
        return NextResponse.json(
          { success: false, message: "Payment not sent to escrow contract" },
          { status: 400 }
        );
      }
    }

    // Find contractExecutionId from logs if not provided or provided as 0
    let finalContractExecutionId = contractExecutionId;
    if (!finalContractExecutionId) {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const receipt = await provider.getTransactionReceipt(txHash);
      
      if (receipt) {
        // Parse logs for ExecutionCreated event
        const iface = new ethers.Interface([
          "event ExecutionCreated(uint256 indexed executionId, address indexed user, address indexed developer, uint256 amount)"
        ]);
        
        const log = receipt.logs.find(l => l.address.toLowerCase() === CONTRACT_ADDRESS?.toLowerCase());
        if (log) {
          try {
            const parsedLog = iface.parseLog(log);
            if (parsedLog) {
              finalContractExecutionId = Number(parsedLog.args.executionId);
            }
          } catch (e) {
            console.error("Failed to parse logs:", e);
          }
        }
      }
    }

    if (!finalContractExecutionId) {
      return NextResponse.json(
        { success: false, message: "Could not determine contract execution ID" },
        { status: 400 }
      );
    }

    // 2. Verify state in contract
    const isVerified = await verifyContractPayment(
      finalContractExecutionId,
      execution.userWallet,
      execution.paymentAmount.toString()
    );

    if (!isVerified) {
      return NextResponse.json(
        { success: false, message: "Contract state verification failed" },
        { status: 400 }
      );
    }

    // 3. Update execution
    execution.status = "paid";
    execution.txHash = txHash;
    execution.contractExecutionId = finalContractExecutionId;
    await execution.save();

    // PART 3 & 7 - Trigger execution immediately and add logs
    console.log("Payment verified for execution:", executionId);
    console.log("Triggering execution service...");
    
    // PART 3 - Await execution start if possible, or trigger and log
    // We await to ensure the status becomes 'running' before returning
    await executeAgent(executionId);

    console.log("Execution triggered successfully for:", executionId);

    return NextResponse.json({
      success: true,
      message: "Payment confirmed, agent execution started",
    });
  } catch (error: any) {
    console.error("Payment confirm error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
