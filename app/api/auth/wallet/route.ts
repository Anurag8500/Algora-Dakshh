import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Wallet address is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const normalizedWallet = walletAddress.toLowerCase();
    let user = await User.findOne({ walletAddress: normalizedWallet });

    if (!user) {
      // Step 1: Create user if not found
      user = await User.create({
        walletAddress: normalizedWallet,
        role: null,
        onboardingCompleted: false,
      });

      const response = NextResponse.json({
        success: true,
        state: "NEW_USER",
      });

      response.cookies.set("walletAddress", normalizedWallet, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return response;
    }

    const response = NextResponse.json({
      success: true,
      state: user.onboardingCompleted ? "COMPLETE" : user.role ? "PROFILE_PENDING" : "ROLE_PENDING",
      role: user.role,
    });

    // Set a cookie with the wallet address and state for middleware protection
    response.cookies.set("walletAddress", normalizedWallet, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    response.cookies.set("userRole", user.role || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    response.cookies.set("onboardingCompleted", String(user.onboardingCompleted), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
