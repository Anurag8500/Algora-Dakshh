import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Execution from "@/models/Execution";
import Agent from "@/models/Agent";

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

    const agent = await Agent.findById(execution.agentId);
    if (!agent) {
      return NextResponse.json(
        { success: false, message: "Agent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment: {
        contract: process.env.CONTRACT_ADDRESS,
        amount: execution.paymentAmount,
        executionId: execution._id,
        chain: "Avalanche Fuji",
      },
      developerWallet: agent.developerWallet,
    });
  } catch (error: any) {
    console.error("Payment request error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
