"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F2937_1px,transparent_1px),linear-gradient(to_bottom,#1F2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Center Copy */}
        <motion.div 
          className="flex-1 flex flex-col items-center text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI Agent Execution Platform
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Monetize AI Agents With <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Pay-Per-Execution
            </span> Payments
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Infrastructure for the AI agent economy.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-10 bg-card/50 w-max mx-auto px-4 py-2 rounded-lg border border-border backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Web3 programmable payments powered by Facinet SDK.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-background bg-primary rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#00eb7b] hover:shadow-[0_0_25px_rgba(0,208,112,0.4)] active:scale-95">
               Explore Agents
            </button>
            <button className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-foreground bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-primary active:scale-95 backdrop-blur-sm shadow-sm">
               List Your Agent
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
