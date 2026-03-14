import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Execution from "@/models/Execution";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Execution ID is required" },
        { status: 400 }
      );
    }

    const execution = await Execution.findById(id);
    if (!execution) {
      return NextResponse.json(
        { success: false, message: "Execution not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      status: execution.status,
      result: execution.result,
      latency: execution.latency,
      startedAt: (execution as any).startedAt,
      completedAt: execution.completedAt,
      errorMessage: execution.errorMessage,
    });
  } catch (error: any) {
    console.error("Fetch execution error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
