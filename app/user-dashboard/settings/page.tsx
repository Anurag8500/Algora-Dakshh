"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout type="user" title="Settings">
      <div className="max-w-3xl flex flex-col gap-8">
        
        {/* Profile Section */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Profile Settings</h3>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Username</label>
              <input 
                type="text" 
                defaultValue="AlexWeb3"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Email (Optional)</label>
              <input 
                type="email" 
                placeholder="alex@example.com"
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white placeholder-[#333] focus:outline-none focus:border-[#00FF88] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Bio</label>
              <textarea 
                rows={4}
                defaultValue="Exploring the intersection of AI and Web3."
                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors resize-none"
              />
            </div>
            
            <button className="mt-2 bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold py-3 px-6 rounded-xl transition-colors self-start">
              Save Profile
            </button>
          </div>
        </section>

        {/* Wallet Section */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Connected Wallet</h3>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Wallet Address</label>
              <input 
                type="text" 
                readOnly
                value="0x71A2890...39B2"
                className="w-full bg-black/50 border border-[#1F1F1F] rounded-xl px-4 py-3 text-[#A1A1A1] font-mono cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1A1] mb-2">Account Role</label>
              <input 
                type="text" 
                readOnly
                value="User"
                className="w-full bg-black/50 border border-[#1F1F1F] rounded-xl px-4 py-3 text-[#A1A1A1] cursor-not-allowed"
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
