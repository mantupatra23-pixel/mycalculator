"use client";

import React, { useState } from "react";
import {
  calculateTradeExpectancy,
  calculateProfitFactor,
  calculateWinRateBreakeven,
  calculateAtrStopLoss,
  calculateScaleOut,
} from "@/lib/trading/engines/advancedTradeEngines";
import { TradeResultCard } from "../ui/TradeResultCard";

export function AdvancedTradeRenderer({ toolSlug }: { toolSlug: string }) {
  const [winRate, setWinRate] = useState<number>(55);
  const [avgWin, setAvgWin] = useState<number>(2500);
  const [avgLoss, setAvgLoss] = useState<number>(1200);
  const [grossProfit, setGrossProfit] = useState<number>(75000);
  const [grossLoss, setGrossLoss] = useState<number>(30000);
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [atr, setAtr] = useState<number>(12.5);
  const [atrMult, setAtrMult] = useState<number>(2.0);
  const [shares, setShares] = useState<number>(100);

  let result;
  if (toolSlug === "profit-factor-calculator") {
    result = calculateProfitFactor(grossProfit, grossLoss);
  } else if (toolSlug === "win-rate-breakeven-calculator") {
    result = calculateWinRateBreakeven(avgWin, avgLoss);
  } else if (toolSlug === "atr-stop-loss-calculator") {
    result = calculateAtrStopLoss(entryPrice, atr, atrMult);
  } else if (toolSlug === "scale-out-calculator") {
    result = calculateScaleOut(shares, entryPrice, entryPrice * 1.04, 30, entryPrice * 1.08, 40, entryPrice * 1.15, 30);
  } else {
    result = calculateTradeExpectancy(winRate, avgWin, avgLoss);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-4">
        {toolSlug === "profit-factor-calculator" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Gross Profit Realized (₹)</label>
              <input
                type="number"
                value={grossProfit || ""}
                onChange={(e) => setGrossProfit(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Gross Loss Incurred (₹)</label>
              <input
                type="number"
                value={grossLoss || ""}
                onChange={(e) => setGrossLoss(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>
        ) : toolSlug === "atr-stop-loss-calculator" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Entry Price (₹)</label>
              <input
                type="number"
                value={entryPrice || ""}
                onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">ATR Value</label>
              <input
                type="number"
                step="0.1"
                value={atr || ""}
                onChange={(e) => setAtr(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">ATR Multiplier</label>
              <input
                type="number"
                step="0.5"
                value={atrMult || ""}
                onChange={(e) => setAtrMult(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Win Rate (%)</label>
              <input
                type="number"
                value={winRate || ""}
                onChange={(e) => setWinRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Avg Winning Trade (₹)</label>
              <input
                type="number"
                value={avgWin || ""}
                onChange={(e) => setAvgWin(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Avg Losing Trade (₹)</label>
              <input
                type="number"
                value={avgLoss || ""}
                onChange={(e) => setAvgLoss(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Advanced Trade Analysis" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}

export default AdvancedTradeRenderer;
