import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, role } = await req.json();

    if (!walletAddress || !role) {
      return NextResponse.json(
        { success: false, error: "Wallet address and role are required" },
        { status: 400 }
      );
    }

    if (!["user", "developer"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    await connectDB();

    const normalizedWallet = walletAddress.toLowerCase();
    const user = await User.findOneAndUpdate(
      { walletAddress: normalizedWallet },
      { role },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      success: true,
      role: user.role,
    });

    response.cookies.set("userRole", user.role || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Set role error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
