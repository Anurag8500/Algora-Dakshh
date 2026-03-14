"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Server, Loader2 } from "lucide-react";
import { RoleCard } from "@/components/onboarding/RoleCard";
import { useAccount } from "wagmi";

export default function SelectRolePage() {
  const router = useRouter();
  const { address } = useAccount();
  const [selectedRole, setSelectedRole] = useState<"user" | "developer" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (selectedRole && address) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user/set-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            walletAddress: address,
            role: selectedRole,
          }),
        });

        const data = await response.json();
        if (data.success) {
          router.push("/complete-profile");
        }
      } catch (error) {
        console.error("Set role error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative px-6 py-12">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/connect-wallet" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
          <span>←</span> Back
        </Link>
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Title Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Select your role
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Choose how you want to use Algora.
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto">
            You can run AI agents as a user or monetize AI agents as a developer.
          </p>
        </motion.div>

        {/* Roles Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 w-full mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="h-full">
            <RoleCard
              icon={<User className="w-7 h-7 text-[#00FF88]" strokeWidth={2} />}
              title="User"
              description="Run AI agents and pay per execution."
              bullets={[
                "Run AI tools",
                "Pay per execution",
                "View execution history"
              ]}
              isSelected={selectedRole === "user"}
              onClick={() => setSelectedRole("user")}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <RoleCard
              icon={<Server className="w-7 h-7 text-[#00FF88]" strokeWidth={2} />}
              title="Developer"
              description="Build and monetize AI agents."
              bullets={[
                "Register AI agents",
                "Earn revenue",
                "View analytics"
              ]}
              isSelected={selectedRole === "developer"}
              onClick={() => setSelectedRole("developer")}
            />
          </motion.div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedRole && !isLoading
                ? "bg-[#00FF88] text-black shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:scale-105 hover:bg-[#00eb7b]" 
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
