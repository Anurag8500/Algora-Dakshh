"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { Bot, DollarSign, Bookmark, Coins } from "lucide-react";

export default function UserOverviewPage() {
  const recentActivity = [
    { id: 1, agent: "DeepGuard Image Analyzer", time: "5 minutes ago", cost: "-0.0007 AVAX", url: "#" },
    { id: 2, agent: "Smart Contract Auditor", time: "2 hours ago", cost: "-0.0120 AVAX", url: "#" },
    { id: 3, agent: "DeFi Yield Optimizer", time: "Yesterday", cost: "-0.0050 AVAX", url: "#" },
  ];

  const recommendedAgents = [
    {
      id: 1,
      name: "QuantTrader Pro",
      category: "Trading",
      price: "0.005 AVAX",
      description: "Advanced AI trading agent that analyzes on-chain DEX data to identify and execute arbitrage opportunities in real-time.",
    },
    {
      id: 2,
      name: "Smart Contract Auditor",
      category: "Security",
      price: "0.015 AVAX",
      description: "Comprehensive vulnerability scanner for Solidity smart contracts. Detects reentrancy, overflow, and logic flaws.",
    },
    {
      id: 3,
      name: "NFT Rarity Scraper",
      category: "Analytics",
      price: "0.001 AVAX",
      description: "Scans newly minted NFT collections and calculates rarity scores within seconds of revealing.",
    }
  ];

  return (
    <DashboardLayout type="user" title="Overview">
      <div className="flex flex-col gap-8">
        
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Agents Used" 
            value="12" 
            icon={Bot} 
            trend="up" 
            subValue="+3 this week" 
          />
          <StatCard 
            title="Total Spending" 
            value="1.45 AVAX" 
            icon={DollarSign} 
            trend="up" 
            subValue="+0.2 AVAX this week" 
          />
          <StatCard 
            title="Saved Agents" 
            value="8" 
            icon={Bookmark} 
          />
          <StatCard 
            title="Available Credits" 
            value="5.00 AVAX" 
            icon={Coins} 
          />
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity Timeline */}
          <section className="lg:col-span-1 bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
            <div className="flex flex-col gap-6">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="relative pl-6">
                  {/* Timeline dot and line */}
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#00FF88]" />
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute left-[3px] top-3 bottom-[-24px] w-[2px] bg-[#1F1F1F]" />
                  )}
                  
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-white">Used {activity.agent}</p>
                    <div className="flex justify-between items-center text-xs text-[#A1A1A1]">
                      <span>{activity.time}</span>
                      <span className="text-red-400">{activity.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-[#A1A1A1] hover:text-white transition-colors border-t border-[#1F1F1F]">
              View All Activity
            </button>
          </section>

          {/* Recommended Agents */}
          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Recommended for You</h3>
              <button className="text-sm text-[#00FF88] hover:text-[#00C76A] transition-colors font-medium">
                View Marketplace
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedAgents.slice(0, 2).map((agent) => (
                <AgentCard 
                  key={agent.id}
                  type="marketplace"
                  name={agent.name}
                  category={agent.category}
                  price={agent.price}
                  description={agent.description}
                />
              ))}
            </div>
          </section>

        </div>
      </div>
    </DashboardLayout>
  );
}
