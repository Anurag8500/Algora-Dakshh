"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ title, value, icon: Icon, subValue, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0, 255, 136, 0.15)" }}
      transition={{ duration: 0.2 }}
      className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Top subtle gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent" />
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center border border-[#00FF88]/20">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-[#A1A1A1] font-medium text-sm">{title}</h3>
      </div>
      
      <div>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        {subValue && (
          <p className={`text-sm mt-1 font-medium ${
            trend === "up" ? "text-[#00FF88]" : trend === "down" ? "text-red-500" : "text-[#A1A1A1]"
          }`}>
            {subValue}
          </p>
        )}
      </div>
    </motion.div>
  );
}
