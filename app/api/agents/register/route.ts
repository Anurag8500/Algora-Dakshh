import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Agent from "@/models/Agent";
import { encrypt } from "@/lib/encryption";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      shortDescription,
      fullDescription,
      pricePerRun,
      developerWallet,
      endpointURL,
      method,
      category,
      tags,
      inputType,
      outputType,
      logoURL,
      authType,
      authToken,
      provider,
      modelId,
      requestFormat,
    } = body;

    // Validate required fields
    if (
      !name ||
      !shortDescription ||
      pricePerRun === undefined ||
      !developerWallet ||
      (!endpointURL && provider !== "huggingface") ||
      !method ||
      !category ||
      !inputType ||
      !outputType ||
      !authType
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Auto-generate HuggingFace endpoint if modelId is provided
    let finalEndpoint = endpointURL;
    if (provider === "huggingface" && modelId) {
      finalEndpoint = `https://router.huggingface.co/hf-inference/models/${modelId}`;
    }

    // Normalize and trim authToken
    let normalizedToken = authToken ? authToken.trim() : "";
    if (normalizedToken.toLowerCase().startsWith("bearer ")) {
      normalizedToken = normalizedToken.slice(7).trim();
    }

    // Encrypt normalized token
    const encryptedToken = normalizedToken ? encrypt(normalizedToken) : "";

    const agent = await Agent.create({
      name,
      shortDescription,
      fullDescription,
      pricePerRun: Number(pricePerRun),
      developerWallet: developerWallet.toLowerCase(),
      endpointURL: finalEndpoint,
      method,
      category,
      tags: tags || [],
      inputType,
      outputType,
      logoURL,
      authType,
      authToken: encryptedToken,
      provider: provider || "generic",
      modelId,
      requestFormat: provider === "huggingface" ? "huggingface" : requestFormat,
      status: "active",
      totalExecutions: 0,
      revenueGenerated: 0,
    });

    return NextResponse.json({
      success: true,
      agent,
    });
  } catch (error: any) {
    console.error("Agent registration error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
