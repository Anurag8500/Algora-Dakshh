"use client";

import { motion } from "framer-motion";
import { Lock, FileSignature, WalletMinimal, Fingerprint } from "lucide-react";

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "Backend Proxy Execution",
      description: "API keys and model weights stay hidden. All execution requests are routed through secure enclaves."
    },
    {
      icon: <FileSignature className="w-6 h-6 text-primary" />,
      title: "Smart Contract Logging",
      description: "Every request and response hash is anchored on-chain ensuring a tamper-proof audit trail."
    },
    {
      icon: <WalletMinimal className="w-6 h-6 text-primary" />,
      title: "Wallet Authentication",
      description: "No passwords to steal. Sign in and authorize executions securely using your Web3 wallet."
    },
    {
      icon: <Fingerprint className="w-6 h-6 text-primary" />,
      title: "Result Integrity",
      description: "Cryptographic proofs verify that the result returned is exactly what the model generated."
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Built for <span className="text-secondary bg-clip-text">Secure</span> AI Execution
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Trust is at the core of the AI agent economy. Algora provides enterprise-grade 
              infrastructure to ensure that both developers and users are protected from 
              malicious actors natively.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {securityFeatures.map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 w-full relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Abstract visual representation of security */}
            <div className="aspect-[4/3] w-full max-w-lg mx-auto rounded-3xl border border-primary/20 bg-card p-8 flex flex-col justify-center relative overflow-hidden shadow-[0_0_50px_rgba(0,255,136,0.05)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1)_0,transparent_70%)]" />
              
              <div className="relative z-10 flex flex-col items-center gap-8">
                 <div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center relative">
                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-[-10px] rounded-full border border-dashed border-primary/50"
                    />
                    <Lock className="w-10 h-10 text-primary" />
                 </div>

                 <div className="w-full max-w-[280px] bg-background border border-border rounded-xl p-4 shadow-lg text-sm font-mono space-y-3">
                    <div className="flex justify-between items-center text-xs text-muted-foreground border-b border-border/50 pb-2">
                       <span>Authorization Event</span>
                       <span className="text-primary">Verified</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-muted-foreground">Signature</span>
                       <span className="opacity-70 truncate max-w-[120px]">0x7b2f...8a1c</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-muted-foreground">Enclave</span>
                       <span className="text-secondary">active (SGX)</span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mt-4">
                       <div className="h-full bg-primary w-full" />
                    </div>
                 </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
