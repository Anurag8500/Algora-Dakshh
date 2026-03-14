"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { Wallet, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

export default function EarningsPage() {
  const withdrawalHistory = [
    { id: "WD-1029", date: "Oct 24, 2026", amount: "15.00 AVAX", status: "Completed" },
    { id: "WD-1028", date: "Oct 15, 2026", amount: "22.50 AVAX", status: "Completed" },
    { id: "WD-1027", date: "Oct 01, 2026", amount: "18.20 AVAX", status: "Completed" },
  ];

  const columns = [
    { header: "Withdrawal ID", accessorKey: "id" as const, className: "font-mono text-[#A1A1A1]" },
    { header: "Date", accessorKey: "date" as const },
    { 
      header: "Amount", 
      accessorKey: "amount" as const,
      cell: (item: typeof withdrawalHistory[0]) => <span className="font-mono text-white">{item.amount}</span>
    },
    { 
      header: "Status", 
      accessorKey: "status" as const,
      cell: (item: typeof withdrawalHistory[0]) => (
        <span className="px-2.5 py-1 rounded border text-xs font-bold uppercase tracking-wider bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/20">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <DashboardLayout type="developer" title="Earnings & Withdrawals">
      <div className="flex flex-col gap-8">
        
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center border border-[#00FF88]/20">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-[#A1A1A1] font-medium text-sm">Total Earned</h3>
            </div>
            <p className="text-3xl font-bold text-white">100.90 AVAX</p>
          </div>
          
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center border border-white/10">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <h3 className="text-[#A1A1A1] font-medium text-sm">Withdrawn</h3>
            </div>
            <p className="text-3xl font-bold text-white">55.70 AVAX</p>
          </div>

          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 flex flex-col gap-4 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF88]/5 rounded-bl-[100px]" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center border border-yellow-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-[#A1A1A1] font-medium text-sm">Available to Withdraw</h3>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 relative z-10">
              <p className="text-3xl font-bold text-[#00FF88]">45.20 AVAX</p>
              <button className="bg-[#00FF88] hover:bg-[#00C76A] text-black font-bold py-2 px-6 rounded-xl transition-colors text-sm whitespace-nowrap">
                Withdraw Now
              </button>
            </div>
          </div>
        </section>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-blue-400 text-sm">
          <ArrowDownRight className="w-5 h-5 shrink-0" />
          <p>Minimum withdrawal amount is 0.1 AVAX. Withdrawals are processed immediately to your connected wallet via smart contract.</p>
        </div>

        {/* Withdrawal History */}
        <section>
          <h3 className="text-lg font-bold text-white mb-4">Withdrawal History</h3>
          <DataTable data={withdrawalHistory} columns={columns} />
        </section>

      </div>
    </DashboardLayout>
  );
}
