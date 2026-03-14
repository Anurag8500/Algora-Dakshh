"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  isSelected: boolean;
  onClick: () => void;
}

export function RoleCard({ icon, title, description, bullets, isSelected, onClick }: RoleCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative bg-[#0A0A0A] rounded-2xl p-8 cursor-pointer transition-all duration-300 border ${
        isSelected 
          ? "border-[#00FF88] bg-[#0A0A0A]/80 shadow-[0_0_25px_rgba(0,255,136,0.15)]" 
          : "border-gray-800 hover:border-green-400 hover:shadow-[0_0_25px_rgba(0,255,136,0.1)]"
      }`}
    >
      {/* Selected Indicator Icon */}
      {isSelected && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#00FF88] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,136,0.4)]"
        >
          <Check className="w-4 h-4 text-black" strokeWidth={3} />
        </motion.div>
      )}

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-colors ${
        isSelected ? "bg-primary/20 border-primary/40" : "bg-primary/5 border-primary/10"
      }`}>
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 h-12">{description}</p>

      <ul className="space-y-3">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start text-sm text-muted-foreground/90">
            <span className="mr-3 text-[#00FF88] mt-0.5">•</span>
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
