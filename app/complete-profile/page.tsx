"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProfileForm } from "@/components/onboarding/ProfileForm";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useAccount } from "wagmi";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [role, setRole] = useState<"user" | "developer" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserState = useCallback(async (walletAddress: string) => {
    try {
      const response = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();
      if (data.success) {
        if (data.state === "ROLE_PENDING" || data.state === "NEW_USER") {
          router.push("/select-role");
        } else if (data.state === "COMPLETE") {
          if (data.role === "developer") {
            router.push("/developer-dashboard");
          } else {
            router.push("/user-dashboard");
          }
        } else {
          setRole(data.role);
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (isConnected && address) {
      checkUserState(address);
    } else if (!isConnected) {
      router.push("/connect-wallet");
    }
  }, [isConnected, address, checkUserState, router]);

  if (isLoading || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative px-6 py-12">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />
      
      {/* Header */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/select-role" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
          <span>←</span> Back to role selection
        </Link>
      </div>

      <div className="mb-10 text-center relative z-10">
        <Link href="/" className="inline-block outline-none mb-3">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
            ALGORA
          </h1>
        </Link>
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          AI Agent Marketplace
        </p>
      </div>

      <div className="relative z-10 w-full mb-12">
        <ProfileForm role={role} />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground/80 bg-card/50 px-4 py-2 rounded-lg border border-border backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Your data is encrypted and securely stored.
        </div>
      </div>
    </div>
  );
}
