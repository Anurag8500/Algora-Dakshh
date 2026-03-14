"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-card/80 backdrop-blur-sm border border-primary/20 p-12 md:p-20 rounded-[3rem] shadow-[0_0_80px_rgba(0,255,136,0.1)] relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* subtle moving borders */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
            Start Monetizing Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI Agents</span> Today
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the fastest growing Web3 AI ecosystem. Access thousands of active users and start earning in AVAX immediately.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="w-full sm:w-auto relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-background bg-primary rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#00eb7b] hover:shadow-[0_0_30px_rgba(0,208,112,0.5)] active:scale-95">
              Get Started Open Source
            </button>
            <button className="w-full sm:w-auto relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-foreground bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-primary active:scale-95 backdrop-blur-sm shadow-sm">
              Explore Network
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
