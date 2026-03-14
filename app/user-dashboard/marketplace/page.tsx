"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { Search, Filter, SortDesc, Loader2 } from "lucide-react";
import { Agent } from "@/types/agent";

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Trading", "Security", "Analytics", "Development", "Marketing"];

  const fetchAgents = useCallback(async () => {
    try {
      const response = await fetch("/api/agents");
      const data = await response.json();
      if (data.success) {
        setAgents(data.agents);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const filteredAgents = activeCategory === "All" 
    ? agents 
    : agents.filter(agent => agent.category === activeCategory);

  return (
    <DashboardLayout type="user" title="Marketplace">
      <div className="flex flex-col gap-8">
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1A1]" />
            <input 
              type="text" 
              placeholder="Search AI agents..."
              className="w-full bg-[#111111] border border-[#1F1F1F] rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#00FF88] transition-colors"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#111111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white hover:border-[#333] transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#111111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white hover:border-[#333] transition-colors">
              <SortDesc className="w-4 h-4" />
              <span className="text-sm font-medium">Sort</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-[#00FF88] text-black"
                  : "bg-[#111111] text-[#A1A1A1] border border-[#1F1F1F] hover:border-[#333] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
          </div>
        ) : filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent._id}
                id={agent._id}
                type="marketplace"
                name={agent.name}
                category={agent.category}
                price={`${agent.pricePerRun} AVAX`}
                description={agent.shortDescription}
                inputType={agent.inputType}
                outputType={agent.outputType}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-2xl border border-[#1F1F1F] border-dashed">
            <p className="text-[#A1A1A1]">No agents found in this category.</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
