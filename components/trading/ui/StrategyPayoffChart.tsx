import React from "react";

interface Props {
  title?: string;
  breakeven: number;
  maxProfitText?: string;
  maxLossText?: string;
}

export function StrategyPayoffChart({
  title = "Payoff Dynamics",
  breakeven,
  maxProfitText = "Unlimited",
  maxLossText = "Premium Paid",
}: Props) {
  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 text-xs space-y-3">
      <div className="flex justify-between items-center text-[#94a3b8] font-bold">
        <span>{title}</span>
        <span className="text-[#00f59b]">BEP: ₹{breakeven.toFixed(2)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded-lg bg-[#1e293b]/40 border border-[#1e293b]">
          <span className="text-[#94a3b8] block">Max Upside</span>
          <span className="font-bold text-[#00f59b]">{maxProfitText}</span>
        </div>
        <div className="p-2 rounded-lg bg-[#1e293b]/40 border border-[#1e293b]">
          <span className="text-[#94a3b8] block">Max Downside</span>
          <span className="font-bold text-rose-400">{maxLossText}</span>
        </div>
      </div>
    </div>
  );
}
