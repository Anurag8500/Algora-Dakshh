"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store, 
  Activity, 
  ListOrdered, 
  Bookmark, 
  Settings,
  Bot,
  LineChart,
  Wallet,
  Key,
  Rocket
} from "lucide-react";
import { WalletCard } from "./WalletCard";

interface SidebarProps {
  type: "user" | "developer";
}

export function Sidebar({ type }: SidebarProps) {
  const pathname = usePathname();

  const userRoutes = [
    { name: "Overview", href: "/user-dashboard", icon: LayoutDashboard },
    { name: "Marketplace", href: "/user-dashboard/marketplace", icon: Store },
    { name: "My Usage", href: "/user-dashboard/my-usage", icon: Activity },
    { name: "Transactions", href: "/user-dashboard/transactions", icon: ListOrdered },
    { name: "Saved Agents", href: "/user-dashboard/saved-agents", icon: Bookmark },
    { name: "Settings", href: "/user-dashboard/settings", icon: Settings },
  ];

  const developerRoutes = [
    { name: "Overview", href: "/developer-dashboard", icon: LayoutDashboard },
    { name: "My Agents", href: "/developer-dashboard/my-agents", icon: Bot },
    { name: "Analytics", href: "/developer-dashboard/analytics", icon: LineChart },
    { name: "Earnings", href: "/developer-dashboard/earnings", icon: Wallet },
    { name: "API Keys", href: "/developer-dashboard/api-keys", icon: Key },
    { name: "Deploy Agent", href: "/developer-dashboard/deploy", icon: Rocket },
    { name: "Settings", href: "/developer-dashboard/settings", icon: Settings },
  ];

  const routes = type === "user" ? userRoutes : developerRoutes;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#0D0D0D] border-r border-[#1F1F1F] flex flex-col pt-6 px-4 pb-4">
      <div className="mb-10 px-2 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">ALGORA</h1>
        <div className="flex items-center gap-2">
          <div className="w-4 h-[2px] bg-[#00FF88]" />
          <p className="text-xs text-[#A1A1A1] uppercase tracking-wider font-semibold">AI Agent Marketplace</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          const Icon = route.icon;

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-[#111111] text-white border-l-4 border-[#00FF88] -ml-[4px] pl-[15px]"
                    : "text-[#A1A1A1] hover:bg-[#111111] hover:text-white"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{route.name}</span>
            </Link>
          );
        })}
      </nav>

      <WalletCard />
    </aside>
  );
}
