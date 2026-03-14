"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LogOut, ExternalLink, ShieldAlert } from "lucide-react";

export default function DeveloperSettingsPage() {
  return (
    <DashboardLayout type="developer" title="Settings">
      <div className="max-w-3xl flex flex-col gap-8">
        
        {/* Profile Section */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Developer Profile Settings</h3>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Developer Username</label>
              <input 
                type="text" 
                defaultValue="AlexWeb3_Dev"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@alexweb3.dev"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white placeholder-[#333] focus:outline-none focus:border-[#00FF88] transition-colors"
                help-text="This email will be visible to users who purchase your agents."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Developer Bio / Studio Description</label>
              <textarea 
                rows={4}
                defaultValue="Building high-performance trading and analytics agents for the decentralized web."
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Website / Portfolio</label>
              <input 
                type="url" 
                defaultValue="https://alexweb3.dev"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
              />
            </div>

            <button className="mt-2 bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold py-3 px-6 rounded-xl transition-colors self-start">
              Save Profile
            </button>
          </div>
        </section>

        {/* Developer Stats Section */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Platform Status</h3>
            <span className="px-3 py-1 rounded bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20 text-xs font-bold uppercase tracking-wider">
              Verified Partner
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-r border-[#1F1F1F] pr-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Joined Date</p>
              <p className="font-medium text-white">Oct 12, 2025</p>
            </div>
            <div className="border-r border-[#1F1F1F] pr-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Total Agents</p>
              <p className="font-medium text-white">3 Active</p>
            </div>
            <div className="border-r border-[#1F1F1F] pr-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Avg Rating</p>
              <p className="font-medium text-white">4.9 / 5.0</p>
            </div>
            <div>
              <p className="text-xs text-[#A1A1A1] mb-1">Revenue Share</p>
              <p className="font-medium text-[#00FF88]">85%</p>
            </div>
          </div>
        </section>

        {/* Wallet Section */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Connected Payout Wallet</h3>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Wallet Address</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly
                  value="0x71A2890...39B2"
                  className="flex-1 bg-black/50 border border-[#1F1F1F] rounded-xl px-4 py-3 text-[#A1A1A1] font-mono cursor-not-allowed"
                />
                <button className="px-4 bg-[#111] hover:bg-white/5 border border-[#1F1F1F] rounded-xl text-white transition-colors" title="View on Explorer">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#A1A1A1] mt-2 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                This wallet receives all automated payouts for agent executions.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Account Role</label>
              <input 
                type="text" 
                readOnly
                value="Developer"
                className="w-full bg-black/50 border border-[#1F1F1F] rounded-xl px-4 py-3 text-[#A1A1A1] font-bold cursor-not-allowed"
              />
            </div>
            
            <button className="flex items-center gap-2 mt-4 px-6 py-3 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 font-bold transition-colors self-start">
              <LogOut className="w-5 h-5" />
              Disconnect Wallet
            </button>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
