"use client";

import React, { useState } from "react";
import {
  calculatePositionSize,
  calculateRiskReward,
  calculateDrawdownRecovery,
  calculateDailyLossLimit,
  calculateRiskOfRuin,
} from "@/lib/trading/engines/riskEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { RiskSafetyMeter } from "../ui/RiskSafetyMeter";

export function RiskCalculatorRenderer({ toolSlug }: { toolSlug: string }) {
  const [accountCapital, setAccountCapital] = useState<number>(200000);
  const [riskPercentage, setRiskPercentage] = useState<number>(1.5);
  const [entryPrice, setEntryPrice] = useState<number>(450);
  const [stopLossPrice, setStopLossPrice] = useState<number>(435);
  const [targetPrice, setTargetPrice] = useState<number>(495);
  const [drawdownPct, setDrawdownPct] = useState<number>(25);
  const [realizedLoss, setRealizedLoss] = useState<number>(2000);
  const [winRatePct, setWinRatePct] = useState<number>(55);
  const [payoffRatio, setPayoffRatio] = useState<number>(1.5);

  let result;
  if (toolSlug === "risk-reward-calculator") {
    result = calculateRiskReward({ entryPrice, stopLossPrice, targetPrice, tradeType: "long" });
  } else if (toolSlug === "drawdown-recovery-calculator") {
    result = calculateDrawdownRecovery(drawdownPct, accountCapital);
  } else if (toolSlug === "daily-loss-limit-calculator") {
    result = calculateDailyLossLimit({ accountCapital, maxDailyLossPct: riskPercentage, realizedLossToday: realizedLoss });
  } else if (toolSlug === "risk-of-ruin-calculator") {
    result = calculateRiskOfRuin({ winRatePct, payoffRatio, riskPerTradePct: riskPercentage });
  } else {
    // Default: Position Size Calculator
    result = calculatePositionSize({ accountCapital, riskPercentage, entryPrice, stopLossPrice });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {toolSlug === "drawdown-recovery-calculator" ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Account Balance Before Loss (₹)</label>
                <input
                  type="number"
                  value={accountCapital || ""}
                  onChange={(e) => setAccountCapital(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Account Drawdown (%)</label>
                <input
                  type="number"
                  step="1"
                  max="99"
                  value={drawdownPct || ""}
                  onChange={(e) => setDrawdownPct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
            </>
          ) : toolSlug === "risk-of-ruin-calculator" ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Historical Win Rate (%)</label>
                <input
                  type="number"
                  value={winRatePct || ""}
                  onChange={(e) => setWinRatePct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Payoff Ratio (Avg Win / Avg Loss)</label>
                <input
                  type="number"
                  step="0.1"
                  value={payoffRatio || ""}
                  onChange={(e) => setPayoffRatio(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-navy">Risk per Trade (% of Capital)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercentage || ""}
                  onChange={(e) => setRiskPercentage(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Active Trading Capital (₹)</label>
                <input
                  type="number"
                  value={accountCapital || ""}
                  onChange={(e) => setAccountCapital(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Max Risk per Trade (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercentage || ""}
                  onChange={(e) => setRiskPercentage(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
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
                <label className="text-xs font-bold text-navy">Stop-Loss Price (₹)</label>
                <input
                  type="number"
                  value={stopLossPrice || ""}
                  onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
              {toolSlug === "risk-reward-calculator" && (
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-navy">Target Profit Price (₹)</label>
                  <input
                    type="number"
                    value={targetPrice || ""}
                    onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Visual Risk Gauge */}
        <RiskSafetyMeter
          level={result.riskAssessment?.level || "low"}
          percentageRisk={toolSlug === "drawdown-recovery-calculator" ? drawdownPct : riskPercentage}
        />
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Risk Evaluation" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
