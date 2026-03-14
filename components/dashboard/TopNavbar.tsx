import { SearchBar } from "./SearchBar";

interface TopNavbarProps {
  title: string;
}

export function TopNavbar({ title }: TopNavbarProps) {
  return (
    <header className="h-[80px] bg-[#0A0A0A] border-b border-[#1F1F1F] flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      
      <div className="flex-1 max-w-[500px] flex justify-center px-4">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#111] border border-[#1F1F1F] rounded-full pl-2 pr-4 py-1.5">
          <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
          <span className="text-sm font-mono text-white">0x71A2...39B2</span>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00FF88] to-[#00C76A] flex items-center justify-center text-black font-bold border-2 border-[#1F1F1F]">
          A
        </div>
      </div>
    </header>
  );
}
