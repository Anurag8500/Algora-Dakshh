import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Agent from "@/models/Agent";
import Execution from "@/models/Execution";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { agentId, userWallet, input } = await req.json();

    if (!agentId || !userWallet) {
      return NextResponse.json(
        { success: false, message: "Agent ID and user wallet are required" },
        { status: 400 }
      );
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return NextResponse.json(
        { success: false, message: "Agent not found" },
        { status: 404 }
      );
    }

    const execution = await Execution.create({
      userWallet: userWallet.toLowerCase(),
      agentId: agent._id,
      paymentAmount: agent.pricePerRun,
      status: "pending",
      input,
    });

    return NextResponse.json({
      success: true,
      executionId: execution._id,
    });
  } catch (error: any) {
    console.error("Create execution error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
