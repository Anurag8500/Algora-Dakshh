import { IAgent } from "@/models/Agent";
import { decrypt } from "@/lib/encryption";

interface HFExecutionResult {
  success: boolean;
  data: any;
  message?: string;
  latency?: number;
}

/**
 * Normalizes sentiment analysis results from HuggingFace
 */
function normalizeSentiment(data: any): any {
  if (!Array.isArray(data) || !Array.isArray(data[0])) return data;
  
  const results = data[0];
  const normalized = results.map((res: any) => {
    let label = res.label;
    if (label === "LABEL_0") label = "negative";
    if (label === "LABEL_1") label = "neutral";
    if (label === "LABEL_2") label = "positive";
    
    return {
      sentiment: label,
      confidence: res.score
    };
  });

  // Return the one with highest confidence
  return normalized.sort((a: any, b: any) => b.confidence - a.confidence)[0];
}

export async function executeHuggingFaceAgent(
  agent: IAgent,
  input: any,
  maxRetries = 3,
  retryDelay = 3000
): Promise<HFExecutionResult> {
  const startTime = Date.now();
  
  // Decrypt and normalize API Key
  let decryptedKey = "";
  try {
    decryptedKey = agent.authToken ? decrypt(agent.authToken).trim() : "";
    if (decryptedKey.toLowerCase().startsWith("bearer ")) {
      decryptedKey = decryptedKey.slice(7).trim();
    }
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: "Decryption failed. " + error.message,
    };
  }

  // Debug logging
  console.log("Agent endpoint:", agent.endpointURL);
  console.log("Auth type:", agent.authType);
  console.log("Decrypted key exists:", !!decryptedKey);
  console.log("Key length:", decryptedKey.length);
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (decryptedKey) {
    headers["Authorization"] = `Bearer ${decryptedKey}`;
  }

  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const response = await fetch(agent.endpointURL, {
        method: "POST",
        headers,
        body: JSON.stringify({ inputs: input }),
      });

      const text = await response.text();
      let data: any;
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        if (!response.ok) {
          return {
            success: false,
            data: null,
            message: `HuggingFace API error (${response.status}): ${text}`,
          };
        }
        return {
          success: false,
          data: null,
          message: "HuggingFace returned non-JSON response: " + text,
        };
      }

      // Handle authentication failure
      if (response.status === 401 || response.status === 403 || (data.error && data.error.includes("Invalid username or password"))) {
        return {
          success: false,
          data: null,
          message: "Agent authentication failed. Check API key.",
        };
      }

      // Handle model loading retry
      if (response.status === 503 || (data.error && data.error.includes("is currently loading"))) {
        attempt++;
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
        return {
          success: false,
          data: null,
          message: "HuggingFace model is still loading after multiple retries.",
        };
      }

      if (!response.ok) {
        return {
          success: false,
          data: null,
          message: data.error || `HuggingFace API error: ${response.status}`,
        };
      }

      // Normalization for specific models if needed
      let result = data;
      if (agent.modelId?.includes("sentiment") || agent.name.toLowerCase().includes("sentiment")) {
        result = normalizeSentiment(data);
      }

      return {
        success: true,
        data: result,
        latency: Date.now() - startTime
      };

    } catch (error: any) {
      console.error("HF Execution Error:", error);
      return {
        success: false,
        data: null,
        message: error.message || "Internal HF Executor error",
      };
    }
  }

  return {
    success: false,
    data: null,
    message: "Max retries reached",
  };
}
