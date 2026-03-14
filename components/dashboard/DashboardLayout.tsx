"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  type: "user" | "developer";
  title: string;
}

export function DashboardLayout({ children, type, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      <Sidebar type={type} />
      
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        <TopNavbar title={title} />
        
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-8 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
