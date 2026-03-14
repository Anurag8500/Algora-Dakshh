import Link from "next/link";
import { ConnectWalletCard } from "@/components/onboarding/ConnectWalletCard";
import { ShieldCheck } from "lucide-react";

export default function ConnectWalletPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative px-6 py-12">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />
      
      {/* Header */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
          <span>←</span> Back to Home
        </Link>
      </div>

      <div className="mb-12 text-center relative z-10">
        <Link href="/" className="inline-block outline-none mb-3">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
            ALGORA
          </h1>
        </Link>
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          AI Agent Marketplace
        </p>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10 mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Connect your wallet
        </h2>
        <p className="text-lg text-muted-foreground mb-2">
          Connect your Web3 wallet to access Algora.
        </p>
        <p className="text-sm text-muted-foreground/70">
          Algora uses wallet authentication instead of passwords.
        </p>
      </div>

      <div className="relative z-10 w-full mb-12">
        <ConnectWalletCard />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto space-y-4">
        <p className="text-sm text-muted-foreground">
          Wallet connection is secure and does not give access to your funds.
        </p>
        <div className="inline-flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground/80 bg-card/50 px-4 py-2 rounded-lg border border-border backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Powered by Web3 programmable payments using the Facinet SDK.
        </div>
      </div>
    </div>
  );
}
