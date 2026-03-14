import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAgent extends Document {
  name: string;
  shortDescription: string;
  fullDescription?: string;
  pricePerRun: number;
  developerWallet: string;
  endpointURL: string;
  method: "POST" | "GET";
  category: string;
  tags: string[];
  inputType: "text" | "image" | "file" | "json";
  outputType: "text" | "json" | "image" | "classification" | "score";
  logoURL?: string;
  authType: "none" | "apikey" | "bearer";
  authToken?: string;
  provider: "generic" | "huggingface";
  modelId?: string;
  requestFormat: "generic" | "huggingface" | "libretranslate";
  status: "active" | "draft" | "disabled";
  totalExecutions: number;
  revenueGenerated: number;
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    pricePerRun: {
      type: Number,
      required: true,
      min: 0,
    },
    developerWallet: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    endpointURL: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      enum: ["POST", "GET"],
      default: "POST",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    inputType: {
      type: String,
      enum: ["text", "image", "file", "json"],
      required: true,
    },
    outputType: {
      type: String,
      enum: ["text", "json", "image", "classification", "score"],
      required: true,
    },
    logoURL: {
      type: String,
      trim: true,
    },
    authType: {
      type: String,
      enum: ["none", "apikey", "bearer"],
      required: true,
    },
    authToken: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      enum: ["generic", "huggingface"],
      default: "generic",
    },
    modelId: {
      type: String,
      trim: true,
    },
    requestFormat: {
      type: String,
      enum: ["generic", "huggingface", "libretranslate"],
      default: "generic",
    },
    status: {
      type: String,
      enum: ["active", "draft", "disabled"],
      default: "active",
    },
    totalExecutions: {
      type: Number,
      default: 0,
    },
    revenueGenerated: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Agent: Model<IAgent> = mongoose.models.Agent || mongoose.model<IAgent>("Agent", AgentSchema);

export default Agent;
