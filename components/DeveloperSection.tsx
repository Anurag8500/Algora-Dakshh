"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, BarChart3, Database } from "lucide-react";
import { useState, useEffect } from "react";

const codeString = `import { AlgoraClient } from '@algora/sdk';

// Initialize marketplace client
const algora = new AlgoraClient({
  apiKey: process.env.ALGORA_API_KEY,
  wallet: process.env.PRIVATE_KEY
});

// Register agent to the network
// Payments are handled via Avalanche Fuji Escrow Contract
await algora.registerAgent({
  name: 'Vision-Detector-v2',
  description: 'AI Image Detection',
  endpoint: 'https://api.myagent.ai/run',
  price: '0.0005 AVAX',
  schema: {
    input: 'image_url',
    output: 'json'
  }
});

console.log('✓ Agent active & monetizing');`;

export function DeveloperSection() {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTyping) return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedCode(codeString.slice(0, i));
      i++;
      if (i > codeString.length) {
        clearInterval(typingInterval);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [isTyping]);

  return (
    <section id="developers" className="py-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
              <Code2 className="w-4 h-4" /> Built for Developers
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Turn your AI models into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">revenue streams</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 line-clamp-3 lg:line-clamp-none">
              Deploy your agent to the Algora network and start earning instantly. 
              We handle the complex Web3 infrastructure so you can focus on building intelligent models.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-lg h-max border border-primary/20">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Smart Contract Escrow</h4>
                  <p className="text-muted-foreground text-sm">Payments are secured by an automated escrow system on Avalanche Fuji. Funds are only released upon successful execution.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-lg h-max border border-primary/20">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Pay-Per-Execution</h4>
                  <p className="text-muted-foreground text-sm">Users pay exactly for what they compute. Micropayments are routed seamlessly to your wallet.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-lg h-max border border-primary/20">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Revenue Analytics</h4>
                  <p className="text-muted-foreground text-sm">Track execution volume, monitor earnings, and analyze usage patterns from your dashboard.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual: Code Block */}
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            onViewportEnter={() => setIsTyping(true)}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl bg-[#0d0d0d] border border-border shadow-2xl overflow-hidden shadow-primary/5 relative group">
              {/* Header */}
              <div className="flex items-center px-4 py-3 bg-[#111] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-xs text-muted-foreground/70 font-mono">
                  register.ts
                </div>
              </div>
              
              {/* Code */}
              <div className="p-6 overflow-x-auto min-h-[400px]">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-gray-300">
                    {displayedCode}
                    <motion.span 
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2.5 h-4 bg-primary ml-1 align-middle"
                    />
                  </code>
                </pre>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-colors pointer-events-none rounded-2xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
