"use client";

import { motion } from "framer-motion";
import { Shield, Bitcoin, Code2, LineChart, ServerCog, CheckSquare } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Execution",
      description: "Agents run in isolated environments ensuring your data remains private and secure from extraction.",
    },
    {
      icon: <Bitcoin className="w-6 h-6 text-primary" />,
      title: "Web3 Payments",
      description: "Micro-transactions settled instantly on-chain using the fast and cheap Avalanche network.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-primary" />,
      title: "Facinet SDK Integration",
      description: "Embed crypto payments into any AI product with just 3 lines of code using our typescript SDK.",
    },
    {
      icon: <LineChart className="w-6 h-6 text-primary" />,
      title: "Agent Analytics",
      description: "Real-time dashboard for developers to track execution counts, revenue, and latency metrics.",
    },
    {
      icon: <ServerCog className="w-6 h-6 text-primary" />,
      title: "Multi-Agent Routing",
      description: "Chain multiple AI models together into complex workflows under a single transaction.",
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-primary" />,
      title: "Execution Tracking",
      description: "Deterministic outputs are verified and logged on immutable ledgers for complete auditability.",
    },
  ];

  return (
    <section className="py-24 bg-card relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to build, deploy, and monetize AI agents on the decentralized web.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all text-primary border border-primary/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
