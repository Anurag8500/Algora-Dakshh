"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentCard } from "@/components/dashboard/AgentCard";

export default function SavedAgentsPage() {
  const savedAgents = [
    {
      id: 1,
      name: "Smart Contract Auditor",
      category: "Security",
      price: "0.015 AVAX",
      description: "Comprehensive vulnerability scanner for Solidity smart contracts. Detects reentrancy, overflow, and logic flaws.",
    },
    {
      id: 2,
      name: "DeFi Yield Optimizer",
      category: "Trading",
      price: "0.008 AVAX",
      description: "Constantly monitors top DeFi protocols to auto-compound and rebalance your portfolio for maximum APY.",
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
    <DashboardLayout type="user" title="Saved Agents">
      <div className="flex flex-col gap-6">
        
        <p className="text-[#A1A1A1]">
          Agents you have bookmarked for quick access and future use.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {savedAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              type="marketplace"
              name={agent.name}
              category={agent.category}
              price={agent.price}
              description={agent.description}
            />
          ))}
          
          {savedAgents.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-[#1F1F1F] rounded-2xl bg-[#111]">
              <p className="text-[#A1A1A1] mb-4">No saved agents found.</p>
              <button className="text-[#00FF88] hover:text-white transition-colors font-medium">
                Browse Marketplace
              </button>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
