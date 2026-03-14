export interface Agent {
  _id?: string;
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
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AgentApiResponse {
  success: boolean;
  data?: any;
  agents?: Agent[];
  agent?: Agent;
  message?: string;
}
