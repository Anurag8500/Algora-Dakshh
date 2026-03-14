"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Copy, RefreshCw, Key, Eye, EyeOff, Plus } from "lucide-react";

export default function ApiKeysPage() {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const apiKeys = [
    {
      id: "key_live_1a2b3c",
      name: "Production Agent Router",
      key: "alg_live_8f92a3b4c5d6e7f8g9h0i1j2k3l4m5n6",
      usage: "14,029 reqs",
      lastUsed: "2 minutes ago",
      created: "Oct 01, 2026",
    },
    {
      id: "key_test_9z8y7x",
      name: "Development Testing",
      key: "alg_test_p1o2n3m4l5k6j7i8h9g0f1e2d3c4b5a6",
      usage: "4,192 reqs",
      lastUsed: "Yesterday",
      created: "Oct 15, 2026",
    }
  ];

  const maskKey = (key: string) => {
    return key.slice(0, 9) + "•".repeat(20) + key.slice(-4);
  };

  const toggleVisibility = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <DashboardLayout type="developer" title="API Keys">
      <div className="flex flex-col gap-6 max-w-4xl">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#111111] p-6 rounded-2xl border border-[#1F1F1F] gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Your Secret API Keys</h3>
            <p className="text-[#A1A1A1] text-sm">
              Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold px-4 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Create New Key
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1F1F1F]" />
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-[#A1A1A1]">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{apiKey.name}</h4>
                    <p className="text-xs text-[#A1A1A1] mt-1">Created on {apiKey.created}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded bg-black border border-[#1F1F1F] text-xs font-mono text-[#A1A1A1]">
                    {apiKey.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-0 mt-2 bg-black rounded-lg border border-[#1F1F1F] pl-4 pr-1 py-1">
                <span className="flex-1 font-mono text-sm tracking-widest text-[#00FF88]">
                  {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                </span>
                
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => toggleVisibility(apiKey.id)}
                    className="p-2 text-[#A1A1A1] hover:text-white transition-colors rounded-md hover:bg-white/5"
                    title={showKey[apiKey.id] ? "Hide Key" : "Show Key"}
                  >
                    {showKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-[#A1A1A1] hover:text-[#00FF88] transition-colors rounded-md hover:bg-[#00FF88]/10" title="Copy Key">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#1F1F1F] pt-4 mt-2">
                <div className="flex gap-6 text-sm">
                  <div className="flex flex-col">
                    <span className="text-[#A1A1A1] text-xs">Usage</span>
                    <span className="text-white font-medium">{apiKey.usage}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#A1A1A1] text-xs">Last Used</span>
                    <span className="text-white font-medium">{apiKey.lastUsed}</span>
                  </div>
                </div>
                
                <button className="flex items-center gap-2 text-xs font-bold text-[#A1A1A1] hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-[#1F1F1F] hover:bg-white/5">
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
