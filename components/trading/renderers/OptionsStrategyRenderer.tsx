"use client";

import React, { useState } from "react";
import { OptionLeg, TradingCalculationResult } from "@/lib/trading/types";
import {
  createBullCallSpread,
  createBearPutSpread,
  createLongStraddle,
  createIronCondor,
  calculateStrategyPayoff,
} from "@/lib/trading/engines/optionsEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { StrategyPayoffChart } from "../ui/StrategyPayoffChart";

export function OptionsStrategyRenderer({ toolSlug }: { toolSlug: string }) {
  const [currentSpot, setCurrentSpot] = useState<number>(24500);

  const getInitialLegs = (): OptionLeg[] => {
    if (toolSlug === "bear-put-spread-calculator") {
      return createBearPutSpread(24500, 24000, 160, 45, 1, 50);
    }
    if (toolSlug === "long-straddle-calculator") {
      return createLongStraddle(24500, 180, 170, 1, 50);
    }
    if (toolSlug === "iron-condor-calculator") {
      return createIronCondor(23800, 24100, 24800, 25100, 30, 90, 85, 25, 1, 50);
    }
    return createBullCallSpread(24500, 25000, 190, 60, 1, 50);
  };

  const [legs, setLegs] = useState<OptionLeg[]>(getInitialLegs());

  const payoff = calculateStrategyPayoff(toolSlug.replace("-calculator", ""), legs, currentSpot);

  const result: TradingCalculationResult = {
    primaryMetric: {
      label: `Net Expiry P&L (at ₹${currentSpot.toLocaleString()})`,
      value: payoff.selectedSpotPnL,
      formatted: `${payoff.selectedSpotPnL >= 0 ? "+" : ""}₹${payoff.selectedSpotPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: payoff.selectedSpotPnL >= 0,
    },
    secondaryMetrics: [
      {
        label: "Net Premium Position",
        value: payoff.netPremium,
        formatted: `${payoff.isNetCredit ? "Net Credit: +" : "Net Debit: -"}₹${payoff.netPremium.toFixed(2)}`,
        highlight: payoff.isNetCredit ? "green" : "neutral",
      },
      {
        label: "Maximum Upside",
        value: 0,
        formatted: typeof payoff.maxProfit === "number" ? `+₹${payoff.maxProfit.toFixed(2)}` : payoff.maxProfit,
        highlight: "green",
      },
      {
        label: "Maximum Risk Outlay",
        value: 0,
        formatted: typeof payoff.maxLoss === "number" ? `-₹${payoff.maxLoss.toFixed(2)}` : payoff.maxLoss,
        highlight: "red",
      },
      {
        label: "Breakeven Levels",
        value: 0,
        formatted: payoff.breakevens.length > 0 ? payoff.breakevens.map((b) => `₹${b.toFixed(0)}`).join(", ") : "None in range",
        highlight: "cyan",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-navy/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-navy/10 pb-3">
            <h3 className="font-bold text-sm text-navy">Strategy Position Legs ({legs.length})</h3>
            <div className="space-y-1">
              <label className="text-[10px] text-navy/60 font-bold block">Evaluation Spot (₹)</label>
              <input
                type="number"
                value={currentSpot || ""}
                onChange={(e) => setCurrentSpot(parseFloat(e.target.value) || 0)}
                className="w-28 px-2 py-1 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-lg text-right"
              />
            </div>
          </div>

          <div className="space-y-3">
            {legs.map((leg, idx) => (
              <div key={leg.id || idx} className="p-3 bg-sage/20 rounded-2xl border border-navy/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-navy/60 font-bold block">Type &amp; Side</span>
                  <span className="font-extrabold text-navy uppercase">
                    {leg.side} {leg.optionType}
                  </span>
                </div>
                <div>
                  <label className="text-[10px] text-navy/60 font-bold block">Strike (₹)</label>
                  <input
                    type="number"
                    value={leg.strikePrice || ""}
                    onChange={(e) => {
                      const updated = [...legs];
                      updated[idx].strikePrice = parseFloat(e.target.value) || 0;
                      setLegs(updated);
                    }}
                    className="w-full px-2 py-1 font-bold text-navy bg-white border border-navy/15 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-navy/60 font-bold block">Premium (₹)</label>
                  <input
                    type="number"
                    value={leg.premium || ""}
                    onChange={(e) => {
                      const updated = [...legs];
                      updated[idx].premium = parseFloat(e.target.value) || 0;
                      setLegs(updated);
                    }}
                    className="w-full px-2 py-1 font-bold text-navy bg-white border border-navy/15 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-navy/60 font-bold block">Lots × Mult</label>
                  <span className="font-bold text-navy block pt-1">
                    {leg.quantity} × {leg.contractMultiplier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <StrategyPayoffChart
          payoffCurve={payoff.payoffCurve}
          breakevens={payoff.breakevens}
          currentSpot={currentSpot}
          maxProfit={payoff.maxProfit}
          maxLoss={payoff.maxLoss}
        />
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Strategy Payoff Dynamics" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}

export default OptionsStrategyRenderer;
