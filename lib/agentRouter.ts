import { IAgent } from "@/models/Agent";
import { executeHuggingFaceAgent } from "./huggingfaceExecutor";
import { decrypt } from "./encryption";

interface AgentExecutionResult {
  success: boolean;
  data: any;
  message?: string;
  latency?: number;
}

export async function executeAgent(
  agent: IAgent,
  input: any
): Promise<AgentExecutionResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    console.log("Executing:", agent.name);
    console.log("Provider:", agent.provider);
    console.log("Format:", agent.requestFormat);
    console.log("Input:", input);

    // 1. Delegate to specialized executor if provider is HuggingFace
    if (agent.provider === "huggingface") {
      return await executeHuggingFaceAgent(agent, input);
    }

    // 2. Generic Execution Logic
    const headers: Record<string, string> = {};
    let body: any = null;
    let finalURL = agent.endpointURL;

    // Handle Authentication for generic providers
    if (agent.authType === "apikey" && agent.authToken) {
      const decryptedKey = decrypt(agent.authToken).trim();
      headers["x-api-key"] = decryptedKey;
    } else if (agent.authType === "bearer" && agent.authToken) {
      let decryptedKey = decrypt(agent.authToken).trim();
      if (decryptedKey.toLowerCase().startsWith("bearer ")) {
        decryptedKey = decryptedKey.slice(7).trim();
      }
      headers["Authorization"] = `Bearer ${decryptedKey}`;
    }

    // Handle Request Configuration
    if (agent.method === "POST") {
      headers["Content-Type"] = "application/json";

      if (agent.requestFormat === "libretranslate") {
        body = JSON.stringify({
          q: input,
          source: "auto",
        });
      } else if (agent.requestFormat === "huggingface") {
        body = JSON.stringify({
          inputs: input,
        });
      } else {
        // generic
        if (agent.inputType === "json") {
          body = JSON.stringify(input);
        } else {
          body = JSON.stringify({ input });
        }
      }
    } else if (agent.method === "GET") {
      const url = new URL(agent.endpointURL);
      if (typeof input === "string") {
        url.searchParams.append("input", input);
      } else if (typeof input === "object") {
        Object.keys(input).forEach((key) => {
          url.searchParams.append(key, String(input[key]));
        });
      }
      finalURL = url.toString();
    }

    const startTime = Date.now();
    const response = await fetch(finalURL, {
      method: agent.method,
      headers,
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type");
    const text = await response.text();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: "Agent API error: " + text,
      };
    }

    if (text.startsWith("<!DOCTYPE") || (contentType && !contentType.includes("application/json"))) {
      return {
        success: false,
        data: null,
        message: "Agent returned non JSON response (Invalid API response)",
      };
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return {
        success: false,
        data: null,
        message: "Agent returned non JSON response: " + text,
      };
    }

    return {
      success: true,
      data,
      latency: Date.now() - startTime
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error("Agent execution error:", error);

    // Development mode fallback
    if (
      process.env.NODE_ENV !== "production" &&
      (!agent.endpointURL || agent.endpointURL.includes("example.com"))
    ) {
      return {
        success: true,
        data: {
          status: "success",
          output:
            agent.outputType === "score"
              ? 85
              : "Simulated real execution successful",
          metadata: {
            method: agent.method,
            inputType: agent.inputType,
            receivedInput: input,
          },
        },
      };
    }

    return {
      success: false,
      data: null,
      message:
        error.name === "AbortError" ? "Execution timed out" : error.message,
    };
  }
}
