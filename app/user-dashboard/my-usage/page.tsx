"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

export default function MyUsagePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = [
    { name: "Mon", executions: 12, cost: 0.05 },
    { name: "Tue", executions: 19, cost: 0.08 },
    { name: "Wed", executions: 15, cost: 0.06 },
    { name: "Thu", executions: 22, cost: 0.12 },
    { name: "Fri", executions: 30, cost: 0.15 },
    { name: "Sat", executions: 25, cost: 0.10 },
    { name: "Sun", executions: 18, cost: 0.07 },
  ];

  const tableData = [
    { id: 1, agent: "QuantTrader Pro", executions: 145, totalCost: "0.725 AVAX", lastUsed: "2 hours ago" },
    { id: 2, agent: "DeFi Yield Optimizer", executions: 56, totalCost: "0.448 AVAX", lastUsed: "1 day ago" },
    { id: 3, agent: "Smart Contract Auditor", executions: 12, totalCost: "0.180 AVAX", lastUsed: "3 days ago" },
    { id: 4, agent: "NFT Rarity Scraper", executions: 89, totalCost: "0.089 AVAX", lastUsed: "1 week ago" },
  ];

  const columns = [
    { 
      header: "Agent Name", 
      accessorKey: "agent" as const,
      cell: (item: typeof tableData[0]) => <span className="font-medium text-white">{item.agent}</span>
    },
    { header: "Executions", accessorKey: "executions" as const },
    { 
      header: "Total Cost", 
      accessorKey: "totalCost" as const,
      cell: (item: typeof tableData[0]) => <span className="text-[#00FF88] font-mono">{item.totalCost}</span>
    },
    { header: "Last Used", accessorKey: "lastUsed" as const, className: "text-[#A1A1A1]" },
  ];

  return (
    <DashboardLayout type="user" title="My Usage">
      <div className="flex flex-col gap-8">
        
        {/* Chart Section */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Execution History</h3>
            <select className="bg-black border border-[#1F1F1F] text-sm text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00FF88]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
                  <XAxis dataKey="name" stroke="#A1A1A1" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A1A1A1" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#111', borderColor: '#1F1F1F', borderRadius: '8px' }}
                    itemStyle={{ color: '#00FF88' }}
                  />
                  <Bar dataKey="executions" fill="#00FF88" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-xl animate-pulse" />
            )}
          </div>
        </section>

        {/* Table Section */}
        <section>
          <h3 className="text-lg font-bold text-white mb-4">Usage By Agent</h3>
          <DataTable data={tableData} columns={columns} />
        </section>

      </div>
    </DashboardLayout>
  );
}
