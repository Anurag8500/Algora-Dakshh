"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { Download } from "lucide-react";

export default function TransactionsPage() {
  const transactionsData = [
    { id: "TX-9823", agent: "QuantTrader Pro", date: "Oct 24, 2026", amount: "0.005 AVAX", status: "Success" },
    { id: "TX-9822", agent: "DeFi Yield Optimizer", date: "Oct 24, 2026", amount: "0.008 AVAX", status: "Success" },
    { id: "TX-9821", agent: "Smart Contract Auditor", date: "Oct 23, 2026", amount: "0.015 AVAX", status: "Pending" },
    { id: "TX-9820", agent: "NFT Rarity Scraper", date: "Oct 21, 2026", amount: "0.001 AVAX", status: "Failed" },
    { id: "TX-9819", agent: "QuantTrader Pro", date: "Oct 20, 2026", amount: "0.005 AVAX", status: "Success" },
    { id: "TX-9818", agent: "Social Sentiment Bot", date: "Oct 19, 2026", amount: "0.002 AVAX", status: "Success" },
  ];

  const columns = [
    { header: "Transaction ID", accessorKey: "id" as const, className: "font-mono text-[#A1A1A1]" },
    { 
      header: "Agent", 
      accessorKey: "agent" as const,
      cell: (item: typeof transactionsData[0]) => <span className="font-medium text-white">{item.agent}</span>
    },
    { header: "Date", accessorKey: "date" as const },
    { 
      header: "Amount", 
      accessorKey: "amount" as const,
      cell: (item: typeof transactionsData[0]) => <span className="font-mono text-white">{item.amount}</span>
    },
    { 
      header: "Status", 
      accessorKey: "status" as const,
      cell: (item: typeof transactionsData[0]) => {
        let bgColor = "";
        let textColor = "";
        
        if (item.status === "Success") {
          bgColor = "bg-[#00FF88]/10";
          textColor = "text-[#00FF88]";
        } else if (item.status === "Pending") {
          bgColor = "bg-yellow-500/10";
          textColor = "text-yellow-500";
        } else {
          bgColor = "bg-red-500/10";
          textColor = "text-red-500";
        }

        return (
          <span className={`px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider ${bgColor} ${textColor} border-current/20`}>
            {item.status}
          </span>
        );
      }
    },
  ];

  return (
    <DashboardLayout type="user" title="Transactions">
      <div className="flex flex-col gap-6">
        
        <div className="flex justify-between items-center">
          <p className="text-[#A1A1A1]">A complete log of your agent execution payments.</p>
          <button className="flex items-center gap-2 bg-[#111] hover:bg-white/5 border border-[#1F1F1F] text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <DataTable data={transactionsData} columns={columns} />

      </div>
    </DashboardLayout>
  );
}
