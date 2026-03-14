import connectDB from "@/lib/mongodb";
import Execution from "@/models/Execution";
import Agent from "@/models/Agent";
import { executeAgent as triggerAgentCall } from "@/lib/agentRouter";
import crypto from "crypto";
import { completeContractExecution, refundContractExecution } from "@/lib/contractService";

export async function executeAgent(executionId: string) {
  try {
    await connectDB();

    // 1. Fetch execution
    const execution = await Execution.findById(executionId);
    if (!execution) {
      console.error(`Execution ${executionId} not found`);
      return;
    }

    // 2. Fetch agent config
    const agent = await Agent.findById(execution.agentId);
    if (!agent) {
      await failExecution(executionId, "Agent not found");
      return;
    }

    // 3. Update to running
    await startExecution(executionId);

    // 4. Measure latency
    const startTime = Date.now();

    // 5. Call AI provider
    const result = await triggerAgentCall(agent, execution.input);

    const endTime = Date.now();
    const latency = endTime - startTime;

    if (result.success) {
      // 6. On success
      await completeExecution(executionId, result.data, latency);
      
      // Update Agent Stats
      agent.totalExecutions += 1;
      agent.revenueGenerated += execution.paymentAmount;
      await agent.save();

      // Trigger Smart Contract Payout (Escrow -> Developer/Platform)
      if (execution.contractExecutionId !== undefined) {
        console.log(`Triggering payout for contract execution ID: ${execution.contractExecutionId}`);
        await completeContractExecution(execution.contractExecutionId);
      }
    } else {
      // 7. On failure
      await failExecution(executionId, result.message || "Provider execution failed");

      // Trigger Smart Contract Refund (Escrow -> User)
      if (execution.contractExecutionId !== undefined) {
        console.log(`Triggering refund for contract execution ID: ${execution.contractExecutionId}`);
        await refundContractExecution(execution.contractExecutionId);
      }
    }
  } catch (error: any) {
    console.error("Execution service error:", error);
    await failExecution(executionId, error.message || "Internal execution service error");

    // Attempt refund on critical system error
    const execution = await Execution.findById(executionId);
    if (execution && execution.contractExecutionId !== undefined) {
      try {
        await refundContractExecution(execution.contractExecutionId);
      } catch (refundError) {
        console.error("Failed to trigger refund after execution crash:", refundError);
      }
    }
  }
}

async function startExecution(executionId: string) {
  await Execution.findByIdAndUpdate(executionId, {
    status: "running",
    startedAt: new Date(),
  });
}

async function completeExecution(executionId: string, result: any, latency: number) {
  const resultHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(result))
    .digest("hex");

  await Execution.findByIdAndUpdate(executionId, {
    status: "completed",
    result,
    resultHash,
    latency,
    completedAt: new Date(),
  });
}

async function failExecution(executionId: string, error: string) {
  await Execution.findByIdAndUpdate(executionId, {
    status: "failed",
    errorMessage: error,
  });
}
