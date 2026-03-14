"use client";

import { motion } from "framer-motion";
import { Wallet, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState, useCallback, useRef } from "react";

export function ConnectWalletCard() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const isHandlingConnection = useRef(false);

  const handleWalletAuth = useCallback(async (walletAddress: string) => {
    if (isHandlingConnection.current) return;
    isHandlingConnection.current = true;
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.state === "NEW_USER" || data.state === "ROLE_PENDING") {
          router.push("/select-role");
        } else if (data.state === "PROFILE_PENDING") {
          router.push("/complete-profile");
        } else if (data.state === "COMPLETE") {
          if (data.role === "developer") {
            router.push("/developer-dashboard");
          } else {
            router.push("/user-dashboard");
          }
        }
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
      isHandlingConnection.current = false;
    }
  }, [router]);

  useEffect(() => {
    if (isConnected && address) {
      handleWalletAuth(address);
    }
  }, [isConnected, address, handleWalletAuth]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-10 max-w-md mx-auto w-full text-center relative shadow-[0_0_40px_rgba(0,0,0,0.5)]"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-[0_0_20px_rgba(0,255,136,0.1)]">
        <Wallet className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-3">
        Connect Wallet
      </h2>
      <p className="text-muted-foreground mb-10">
        Connect using your Web3 wallet.
      </p>

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      disabled={isLoading}
                      type="button"
                      className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-semibold text-background bg-[#00FF88] rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#00eb7b] hover:shadow-[0_0_25px_rgba(0,208,112,0.4)] active:scale-95 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <Wallet className="w-5 h-5 mr-2" fill="currentColor" />
                      )}
                      {isLoading ? "Connecting..." : "Connect Wallet"}
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-semibold text-white bg-red-500 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-red-600 active:scale-95 mb-8"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex flex-col gap-3 mb-8">
                    <button
                      onClick={openAccountModal}
                      disabled={isLoading}
                      type="button"
                      className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-semibold text-background bg-[#00FF88] rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#00eb7b] hover:shadow-[0_0_25px_rgba(0,208,112,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        account.displayName
                      )}
                      {!isLoading && account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>

      <div className="text-center">
        <p className="text-sm font-medium text-foreground mb-3">Supported wallets:</p>
        <div className="flex justify-center gap-4 text-xs text-muted-foreground font-medium">
          <span>MetaMask</span>
          <span>•</span>
          <span>WalletConnect</span>
          <span>•</span>
          <span>Coinbase</span>
        </div>
      </div>
    </motion.div>
  );
}
