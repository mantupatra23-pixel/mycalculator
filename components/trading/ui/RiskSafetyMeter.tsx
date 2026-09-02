import React from "react";
import { RiskLevel } from "@/lib/trading/types";

interface Props {
  level: RiskLevel;
  percentageRisk: number;
}

export function RiskSafetyMeter({ level, percentageRisk }: Props) {
  const getPositionWidth = () => {
    switch (level) {
      case "low":
        return "w-1/4 bg-[#00f59b]";
      case "moderate":
        return "w-2/4 bg-amber-400";
      case "high":
        return "w-3/4 bg-orange-500";
      case "critical":
        return "w-full bg-rose-500";
    }
  };

  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-[#94a3b8] font-bold">Capital Risk Gauge</span>
        <span className="font-extrabold text-white uppercase tracking-wider text-[11px]">{level} Risk ({percentageRisk}%)</span>
      </div>
      <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${getPositionWidth()}`} />
      </div>
      <p className="text-[11px] text-[#94a3b8] leading-tight">
        Professional trade parameters advise risking at most 1% to 2% of equity per transaction.
      </p>
    </div>
  );
}
