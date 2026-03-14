import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Agent from "@/models/Agent";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  try {
    await connectDB();
    const { wallet } = await params;

    if (!wallet) {
      return NextResponse.json(
        { success: false, message: "Developer wallet address is required" },
        { status: 400 }
      );
    }

    const agents = await Agent.find({
      developerWallet: wallet.toLowerCase(),
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      agents,
    });
  } catch (error: any) {
    console.error("Developer agents fetch error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
