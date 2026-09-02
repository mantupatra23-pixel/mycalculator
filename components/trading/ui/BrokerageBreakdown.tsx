import React from "react";

interface ChargeItem {
  item: string;
  amount: number;
  formatted: string;
  type?: "credit" | "debit" | "neutral";
}

interface Props {
  breakdown: ChargeItem[];
}

export function BrokerageBreakdown({ breakdown }: Props) {
  return (
    <div className="border border-[#1e293b] rounded-2xl overflow-hidden text-xs">
      <div className="bg-[#0b1222] px-4 py-2.5 font-black uppercase text-[10px] tracking-wider text-[#94a3b8] border-b border-[#1e293b]">
        Statutory & Regulatory Levies
      </div>
      <div className="divide-y divide-[#1e293b] bg-[#0f172a]/50">
        {breakdown.map((row, idx) => (
          <div key={idx} className="flex justify-between items-center px-4 py-2 text-slate-300">
            <span>{row.item}</span>
            <span className="font-mono font-bold text-white">{row.formatted}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
