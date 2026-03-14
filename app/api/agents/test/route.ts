import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Agent from "@/models/Agent";
import { executeAgent } from "@/lib/agentRouter";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { agentId } = await req.json();

    if (!agentId) {
      return NextResponse.json({ success: false, message: "Agent ID is required" }, { status: 400 });
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return NextResponse.json({ success: false, message: "Agent not found" }, { status: 404 });
    }

    // Execute with test input
    const startTime = Date.now();
    const result = await executeAgent(agent, "Test execution");
    const latency = Date.now() - startTime;

    return NextResponse.json({
      success: result.success,
      reachable: result.success,
      latency: result.latency || latency,
      status: result.success ? "success" : "error",
      message: result.message || "Agent is reachable",
      data: result.data
    });

  } catch (error: any) {
    console.error("Test Agent Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
