"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { Agent } from "@/types/agent";

export default function MyAgentsPage() {
  const { address } = useAccount();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = useCallback(async () => {
    if (!address) return;
    try {
      const response = await fetch(`/api/agents/developer/${address}`);
      const data = await response.json();
      if (data.success) {
        setAgents(data.agents);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return (
    <DashboardLayout type="developer" title="My Agents">
      <div className="flex flex-col gap-6">
        
        <div className="flex justify-between items-center bg-[#111111] p-4 rounded-2xl border border-[#1F1F1F]">
          <p className="text-[#A1A1A1] text-sm">
            Manage your deployed AI agents, monitor their performance, and update pricing.
          </p>
          <Link 
            href="/developer-dashboard/deploy"
            className="flex items-center gap-2 bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Deploy New Agent
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
          </div>
        ) : agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent._id}
                type="developer"
                name={agent.name}
                category={agent.category}
                price={`${agent.pricePerRun} AVAX`}
                description={agent.shortDescription}
                status={agent.status}
                executions={agent.totalExecutions}
                revenue={`${agent.revenueGenerated} AVAX`}
                inputType={agent.inputType}
                outputType={agent.outputType}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-2xl border border-[#1F1F1F] border-dashed">
            <p className="text-[#A1A1A1] mb-4">You haven't deployed any agents yet.</p>
            <Link 
              href="/developer-dashboard/deploy"
              className="text-[#00FF88] hover:underline font-medium"
            >
              Deploy your first agent
            </Link>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
