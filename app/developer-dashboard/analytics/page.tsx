"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, MousePointerClick, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: "Jan", executions: 400, revenue: 2.4, users: 120 },
    { name: "Feb", executions: 600, revenue: 3.6, users: 180 },
    { name: "Mar", executions: 1100, revenue: 6.5, users: 300 },
    { name: "Apr", executions: 1500, revenue: 8.2, users: 450 },
    { name: "May", executions: 2200, revenue: 12.5, users: 600 },
    { name: "Jun", executions: 3400, revenue: 19.8, users: 890 },
  ];

  return (
    <DashboardLayout type="developer" title="Analytics">
      <div className="flex flex-col gap-8">
        
        {/* Metrics Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00FF88]/10 text-[#00FF88] rounded-xl border border-[#00FF88]/20">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <p className="text-[#A1A1A1] font-medium text-sm">Conversion Rate</p>
            </div>
            <p className="text-3xl font-bold text-white">12.4%</p>
            <p className="text-[#00FF88] text-sm">+2.1% from last month</p>
          </div>
          
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00FF88]/10 text-[#00FF88] rounded-xl border border-[#00FF88]/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-[#A1A1A1] font-medium text-sm">Avg Execution Cost</p>
            </div>
            <p className="text-3xl font-bold text-white">0.004 AVAX</p>
            <p className="text-[#A1A1A1] text-sm">Stable across agents</p>
          </div>

          <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00FF88]/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00FF88]/10 text-[#00FF88] rounded-xl border border-[#00FF88]/20">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-[#A1A1A1] font-medium text-sm">Top Performing Agent</p>
            </div>
            <p className="text-2xl font-bold text-white truncate">QuantTrader Pro</p>
            <p className="text-[#00FF88] text-sm">42.15 AVAX Total Revenue</p>
          </div>
        </section>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
            <div className="h-[250px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
                    <XAxis dataKey="name" stroke="#A1A1A1" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#A1A1A1" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', borderColor: '#1F1F1F', borderRadius: '8px' }}
                      itemStyle={{ color: '#00FF88' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#00FF88" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-xl animate-pulse" />
              )}
            </div>
          </section>

          {/* Executions Chart */}
          <section className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Execution Volume</h3>
            <div className="h-[250px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
        </div>

      </div>
    </DashboardLayout>
  );
}
