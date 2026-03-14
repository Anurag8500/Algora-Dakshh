"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Rocket, HelpCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function DeployAgentPage() {
  const { address } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Language Detector",
    shortDescription: "Detects the language of any text using AI.",
    category: "Analytics",
    pricePerRun: "0.001",
    provider: "generic",
    modelId: "",
    endpointURL: "https://translate.argosopentech.com/detect",
    method: "POST",
    tags: "language, analytics",
    inputType: "text",
    outputType: "classification",
    authType: "none",
    authToken: "",
    requestFormat: "libretranslate",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Auto-update defaults when provider changes
      if (name === "provider") {
        if (value === "huggingface") {
          newData.method = "POST";
          newData.authType = "bearer";
          newData.requestFormat = "huggingface";
          newData.endpointURL = ""; // Hide/disable endpoint input for HF
        } else {
          newData.authType = "none";
          newData.requestFormat = "generic";
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    try {
      const response = await fetch("/api/agents/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          developerWallet: address,
          pricePerRun: parseFloat(formData.pricePerRun),
          tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/developer-dashboard/my-agents");
      } else {
        alert(data.message || "Failed to register agent");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout type="developer" title="Deploy Agent">
      <div className="max-w-3xl flex flex-col gap-8">
        
        <p className="text-[#A1A1A1]">
          Launch your AI agent to the Algora marketplace and start earning AVAX per execution.
        </p>

        <form onSubmit={handleSubmit} className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Agent Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. DeFi Yield Optimizer"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Short Description</label>
              <textarea 
                rows={3}
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Briefly describe what your agent does and how it brings value..."
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors appearance-none"
              >
                <option>Trading</option>
                <option>Security</option>
                <option>Analytics</option>
                <option>Development</option>
                <option>Marketing</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Price per Execution (AVAX)</label>
              <input 
                type="number" 
                name="pricePerRun"
                step="0.001"
                value={formData.pricePerRun}
                onChange={handleChange}
                placeholder="0.01"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">HTTP Method</label>
              <select 
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors appearance-none"
              >
                <option value="POST">POST (Recommended)</option>
                <option value="GET">GET</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Provider Type</label>
              <select 
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors appearance-none"
              >
                <option value="generic">Generic API (Self Hosted)</option>
                <option value="huggingface">HuggingFace Inference API</option>
              </select>
            </div>

            {formData.provider === "huggingface" ? (
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#A1A1A1]">HuggingFace Model ID</label>
                  <div className="flex items-center gap-1 text-xs text-[#A1A1A1] cursor-help">
                    <HelpCircle className="w-3 h-3" />
                    e.g. google/vit-base-patch16-224
                  </div>
                </div>
                <input 
                  type="text" 
                  name="modelId"
                  value={formData.modelId}
                  onChange={handleChange}
                  placeholder="organization/model-name"
                  className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00FF88] transition-colors"
                  required={formData.provider === "huggingface"}
                />
              </div>
            ) : (
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#A1A1A1]">Endpoint URL</label>
                  <div className="flex items-center gap-1 text-xs text-[#A1A1A1] cursor-help">
                    <HelpCircle className="w-3 h-3" />
                    Must be publicly accessible App URL
                  </div>
                </div>
                <input 
                  type="url" 
                  name="endpointURL"
                  value={formData.endpointURL}
                  onChange={handleChange}
                  placeholder="https://api.yourdomain.com/v1/agent"
                  className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00FF88] transition-colors"
                  required={formData.provider === "generic"}
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Tags (Comma separated)</label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="defi, trading, arbitrage"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Input Type</label>
              <select 
                name="inputType"
                value={formData.inputType}
                onChange={handleChange}
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors appearance-none"
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="file">File</option>
                <option value="json">JSON</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Output Type</label>
              <select 
                name="outputType"
                value={formData.outputType}
                onChange={handleChange}
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors appearance-none"
              >
                <option value="text">Text</option>
                <option value="json">JSON</option>
                <option value="image">Image</option>
                <option value="classification">Classification</option>
                <option value="score">Score</option>
              </select>
            </div>

            <div className={formData.authType === "none" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Authentication Type</label>
              <select 
                name="authType"
                value={formData.authType}
                onChange={handleChange}
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors appearance-none"
              >
                <option value="none">None</option>
                <option value="apikey">API Key</option>
                <option value="bearer">Bearer Token</option>
              </select>
            </div>

            {formData.authType !== "none" && (
              <div>
                <label className="block text-sm font-medium text-[#A1A1A1] mb-2">
                  {formData.authType === "apikey" ? "API Key Value" : "Bearer Token"}
                </label>
                <input 
                  type="password" 
                  name="authToken"
                  value={formData.authToken}
                  onChange={handleChange}
                  placeholder="Enter token..."
                  className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
                  required
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Request Format</label>
              <select 
                name="requestFormat"
                value={formData.requestFormat}
                onChange={handleChange}
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors appearance-none"
              >
                <option value="generic">Generic API</option>
                <option value="libretranslate">LibreTranslate</option>
                <option value="huggingface">HuggingFace</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-6 border-t border-[#1F1F1F] flex justify-end">
            <button 
              type="submit"
              disabled={loading || !address}
              className="flex items-center justify-center gap-2 bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold py-3.5 px-8 rounded-xl transition-colors w-full md:w-auto text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Rocket className="w-5 h-5" />
              )}
              {loading ? "Publishing..." : "Publish Agent"}
            </button>
          </div>

        </form>

      </div>
    </DashboardLayout>
  );
}
