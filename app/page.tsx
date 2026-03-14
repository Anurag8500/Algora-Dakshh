import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedAgents } from "@/components/FeaturedAgents";
import { DeveloperSection } from "@/components/DeveloperSection";
import { Features } from "@/components/Features";
import { SecuritySection } from "@/components/SecuritySection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedAgents />
      <DeveloperSection />
      <Features />
      <SecuritySection />
      <CTA />
      <Footer />
    </main>
  );
}
