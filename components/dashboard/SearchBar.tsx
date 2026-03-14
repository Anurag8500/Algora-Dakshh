"use client";

import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-[400px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1A1]" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full h-[40px] pl-10 pr-4 bg-[#111] border border-[#1F1F1F] rounded-xl text-white placeholder-[#A1A1A1] focus:outline-none focus:border-[#00FF88] transition-colors"
      />
    </div>
  );
}
