"use client";

import React, { useState } from "react";
import {
  calculateFuturesPnL,
  calculateFuturesMargin,
  calculateEstimatedLiquidation,
} from "@/lib/trading/engines/futuresEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { RiskSafetyMeter } from "../ui/RiskSafetyMeter";

export function FuturesRenderer({ toolSlug }: { toolSlug: string }) {
  const [entryPrice, setEntryPrice] = useState<number>(24500);
  const [exitPrice, setExitPrice] = useState<number>(24750);
  const [quantityLots, setQuantityLots] = useState<number>(2);
  const [lotSize, setLotSize] = useState<number>(50);
  const [marginRequirementPct, setMarginRequirementPct] = useState<number>(12);
  const [accountEquity, setAccountEquity] = useState<number>(400000);
  const [leverage, setLeverage] = useState<number>(8.3);
  const [side, setSide] = useState<"long" | "short">("long");

  let result;
  if (toolSlug === "futures-margin-calculator" || toolSlug === "margin-utilization-calculator") {
    result = calculateFuturesMargin({
      contractPrice: entryPrice,
      lotSize,
      lots: quantityLots,
      marginRequirementPct,
      accountEquity,
    });
  } else if (toolSlug === "liquidation-price-calculator") {
    result = calculateEstimatedLiquidation({
      entryPrice,
      leverage,
      side,
      maintenanceMarginPct: 0.5,
    });
  } else {
    // Default: Futures P&L
    result = calculateFuturesPnL({
      entryPrice,
      exitPrice,
      quantityLots,
      lotSize,
      side,
      marginDeposited: (entryPrice * lotSize * quantityLots * marginRequirementPct) / 100,
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
        <div className="flex gap-2 p-1 bg-sage/20 rounded-xl border border-navy/10">
          <button
            type="button"
            onClick={() => setSide("long")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              side === "long" ? "bg-white text-navy shadow-xs" : "text-navy/60"
            }`}
          >
            LONG (Buy)
          </button>
          <button
            type="button"
            onClick={() => setSide("short")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              side === "short" ? "bg-white text-navy shadow-xs" : "text-navy/60"
            }`}
          >
            SHORT (Sell)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Entry Contract Price (₹)</label>
            <input
              type="number"
              value={entryPrice || ""}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          {toolSlug !== "futures-margin-calculator" && toolSlug !== "liquidation-price-calculator" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Exit Price (₹)</label>
              <input
                type="number"
                value={exitPrice || ""}
                onChange={(e) => setExitPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Quantity Lots</label>
            <input
              type="number"
              min="1"
              value={quantityLots || ""}
              onChange={(e) => setQuantityLots(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Lot Size Units</label>
            <input
              type="number"
              min="1"
              value={lotSize || ""}
              onChange={(e) => setLotSize(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Margin Requirement (%)</label>
            <input
              type="number"
              step="0.5"
              value={marginRequirementPct || ""}
              onChange={(e) => setMarginRequirementPct(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Total Account Equity (₹)</label>
            <input
              type="number"
              value={accountEquity || ""}
              onChange={(e) => setAccountEquity(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>

        {result.riskAssessment && (
          <RiskSafetyMeter level={result.riskAssessment.level} percentageRisk={result.riskAssessment.score} />
        )}
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Futures &amp; Leverage Metrics" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
