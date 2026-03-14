import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Agent from "@/models/Agent";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const agents = await Agent.find({ status: "active" })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      agents,
    });
  } catch (error: any) {
    console.error("Marketplace fetch error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
