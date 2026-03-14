import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Execution from "@/models/Execution";
import Agent from "@/models/Agent";
import { executeAgent } from "@/lib/agentRouter";
import crypto from "crypto";

/**
 * Simulates payment verification.
 * In the future, this will be replaced by Facinet or smart contract verification.
 */
async function verifyPayment(executionId: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { executionId } = await req.json();

    if (!executionId) {
      return NextResponse.json(
        { success: false, message: "Execution ID is required" },
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

    // 1. Verify Payment (Simulation)
    const isPaid = await verifyPayment(executionId);
    if (!isPaid) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Update status to paid
    execution.status = "paid";
    await execution.save();

    // 2. Start Execution Process
    execution.status = "running";
    await execution.save();

    const agent = await Agent.findById(execution.agentId);
    if (!agent) {
      execution.status = "failed";
      await execution.save();
      return NextResponse.json(
        { success: false, message: "Agent not found" },
        { status: 404 }
      );
    }

    // Call Agent Router
    const result = await executeAgent(agent, execution.input);

    if (result.success) {
      // Generate result hash
      const resultHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(result.data))
        .digest("hex");

      // Update Execution
      execution.status = "completed";
      execution.result = result.data;
      execution.resultHash = resultHash;
      if (result.latency) {
        (execution as any).latency = result.latency;
      }
      (execution as any).completedAt = new Date();
      await execution.save();

      // 3. Update Agent Stats
      agent.totalExecutions += 1;
      agent.revenueGenerated += execution.paymentAmount;
      await agent.save();

      return NextResponse.json({
        success: true,
        status: "completed",
        result: result.data,
      });
    } else {
      execution.status = "failed";
      (execution as any).errorMessage = result.message || "Agent execution failed";
      await execution.save();
      return NextResponse.json(
        { success: false, message: result.message || "Agent execution failed" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Payment confirm error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
