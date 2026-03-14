"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Bot, PlaySquare, Wallet, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

export default function DeveloperOverviewPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = [
    { name: "Mon", revenue: 0.15 },
    { name: "Tue", revenue: 0.22 },
    { name: "Wed", revenue: 0.18 },
    { name: "Thu", revenue: 0.35 },
    { name: "Fri", revenue: 0.45 },
    { name: "Sat", revenue: 0.30 },
    { name: "Sun", revenue: 0.25 },
  ];

  return (
    <DashboardLayout type="developer" title="Overview">
      <div className="flex flex-col gap-8">
        
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Agents" 
            value="3" 
            icon={Bot} 
          />
          <StatCard 
            title="Total Executions" 
            value="12,450" 
            icon={PlaySquare} 
            trend="up" 
            subValue="+1.2k this week" 
          />
          <StatCard 
            title="Total Earnings" 
            value="45.20 AVAX" 
            icon={Wallet} 
            trend="up" 
            subValue="+4.5 AVAX this week" 
          />
          <StatCard 
            title="Active Users" 
            value="892" 
            icon={Users} 
            trend="up"
            subValue="+54 this week"
          />
        </section>

        {/* Earnings Graph Section */}
        <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
            <select className="bg-black border border-[#1F1F1F] text-sm text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00FF88]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-[400px] w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
                  <XAxis dataKey="name" stroke="#A1A1A1" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A1A1A1" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ stroke: '#1F1F1F', strokeWidth: 1 }}
                    contentStyle={{ backgroundColor: '#111', borderColor: '#1F1F1F', borderRadius: '8px' }}
                    itemStyle={{ color: '#00FF88' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#00FF88" 
                    strokeWidth={3}
                    dot={{ fill: '#111', stroke: '#00FF88', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#00FF88' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-xl">
                <div className="w-8 h-8 border-2 border-[#00FF88] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
