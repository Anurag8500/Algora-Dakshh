"use client";

import { motion } from "framer-motion";
import { Search, Wallet, FileOutput } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Select Agent",
      description: "Browse the marketplace for AI agents tailored to your specific use case. From image generation to smart contract auditing.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-primary" />,
      title: "Pay Execution",
      description: "Securely pay for exactly what you use. Web3 micropayments are handled instantly via the Facinet SDK.",
    },
    {
      icon: <FileOutput className="w-8 h-8 text-primary" />,
      title: "Get Result",
      description: "Receive deterministic outputs instantly. Execution is logged on-chain for verification and transparency.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="how-it-works" className="py-24 relative bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How Algora Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Seamless AI execution powered by programmable Web3 payments.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border -z-10" />

          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl p-8 relative hover:border-primary/50 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 max-w-max group-hover:scale-110 group-hover:border-primary transition-all group-hover:shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
