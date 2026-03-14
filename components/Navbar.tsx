"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Developers", href: "#developers" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Docs", href: "#docs" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-300",
        isScrolled
          ? "h-16 bg-background/80 backdrop-blur-md border-b border-white/5 shadow-sm"
          : "h-24 bg-transparent"
      )}
    >
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 outline-none">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Algora
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex flex-1 justify-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="flex-1 flex justify-end gap-3 items-center">
        <Link
          href="/signin"
          className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-foreground bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-primary active:scale-95"
        >
          Sign In
        </Link>
        <Link
          href="/get-started"
          className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-background bg-primary rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#00eb7b] hover:shadow-[0_0_20px_rgba(0,208,112,0.4)] active:scale-95"
        >
          Get Started
        </Link>
      </div>
    </motion.header>
  );
}
