"use client";

import { LogOut } from "lucide-react";

export function WalletCard() {
  return (
    <div className="mt-auto p-4 rounded-xl bg-[#111] border border-[#1F1F1F] flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-mono text-sm">0x71A2...39B2</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#00FF88]"></div>
          <span className="text-xs text-[#A1A1A1]">Connected</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20 uppercase tracking-wider">
          User
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-[#A1A1A1] border border-white/10 uppercase tracking-wider">
          Avalanche
        </span>
      </div>
      <button className="flex items-center justify-center gap-2 mt-2 w-full py-1.5 text-sm text-[#A1A1A1] hover:text-[#00FF88] transition-colors rounded-lg hover:bg-white/5">
        <LogOut className="w-4 h-4" />
        Disconnect
      </button>
    </div>
  );
}
