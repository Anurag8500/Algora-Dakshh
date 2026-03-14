import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Execution from "@/models/Execution";

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

    return NextResponse.json({
      success: true,
      executionId: execution._id,
      amount: execution.paymentAmount,
      token: "AVAX",
      message: "Payment required before execution",
    });
  } catch (error: any) {
    console.error("Payment request error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
