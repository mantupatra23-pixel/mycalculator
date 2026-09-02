"use client";

import React, { useState } from "react";
import { calculatePositionSize } from "@/lib/trading/engines/riskEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { RiskSafetyMeter } from "../ui/RiskSafetyMeter";

export function PositionSizeRenderer({ toolSlug }: { toolSlug: string }) {
  const [accountCapital, setAccountCapital] = useState<number>(200000);
  const [riskPercentage, setRiskPercentage] = useState<number>(1.5);
  const [entryPrice, setEntryPrice] = useState<number>(450);
  const [stopLossPrice, setStopLossPrice] = useState<number>(435);

  const result = calculatePositionSize({ accountCapital, riskPercentage, entryPrice, stopLossPrice });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-[#0b1222] border border-[#1e293b] rounded-3xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Trading Capital (₹)</label>
            <input
              type="number"
              value={accountCapital || ""}
              onChange={(e) => setAccountCapital(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Account Risk per Trade (%)</label>
            <input
              type="number"
              step="0.1"
              value={riskPercentage || ""}
              onChange={(e) => setRiskPercentage(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Entry Level (₹)</label>
            <input
              type="number"
              value={entryPrice || ""}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Stop-Loss Level (₹)</label>
            <input
              type="number"
              value={stopLossPrice || ""}
              onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
        </div>

        <RiskSafetyMeter level={result.riskAssessment?.level || "low"} percentageRisk={riskPercentage} />
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Position Sizing Limits" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
