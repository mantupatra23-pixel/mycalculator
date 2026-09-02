"use client";

import React, { useState } from "react";
import { calculateSingleOptionMetrics } from "@/lib/trading/engines/optionsEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { RotateCcw } from "lucide-react";

export function OptionsMechanicsRenderer({ toolSlug }: { toolSlug: string }) {
  const isPutDefault = toolSlug.includes("put");

  const defaultSpot = 24500;
  const defaultStrike = 24500;
  const defaultPremium = 180;
  const defaultExpirySpot = 24700;

  const [spotPrice, setSpotPrice] = useState<number>(defaultSpot);
  const [strikePrice, setStrikePrice] = useState<number>(defaultStrike);
  const [premium, setPremium] = useState<number>(defaultPremium);
  const [quantity, setQuantity] = useState<number>(1);
  const [contractMultiplier, setContractMultiplier] = useState<number>(50);
  const [optionType, setOptionType] = useState<"call" | "put">(isPutDefault ? "put" : "call");
  const [side, setSide] = useState<"long" | "short">("long");
  const [targetPriceAtExpiry, setTargetPriceAtExpiry] = useState<number>(defaultExpirySpot);

  const handleReset = () => {
    setSpotPrice(defaultSpot);
    setStrikePrice(defaultStrike);
    setPremium(defaultPremium);
    setQuantity(1);
    setContractMultiplier(50);
    setOptionType(isPutDefault ? "put" : "call");
    setSide("long");
    setTargetPriceAtExpiry(defaultExpirySpot);
  };

  const result = calculateSingleOptionMetrics({
    spotPrice,
    strikePrice,
    premium,
    quantity,
    contractMultiplier,
    optionType,
    side,
    targetPriceAtExpiry,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-navy/10 pb-3">
          <span className="text-xs font-bold text-navy uppercase tracking-wider">Contract Parameters</span>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-steel hover:text-navy inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex gap-1 p-1 bg-sage/20 rounded-xl border border-navy/10">
            <button
              type="button"
              onClick={() => setOptionType("call")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                optionType === "call" ? "bg-white text-navy shadow-xs" : "text-navy/60"
              }`}
            >
              CALL
            </button>
            <button
              type="button"
              onClick={() => setOptionType("put")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                optionType === "put" ? "bg-white text-navy shadow-xs" : "text-navy/60"
              }`}
            >
              PUT
            </button>
          </div>

          <div className="flex gap-1 p-1 bg-sage/20 rounded-xl border border-navy/10">
            <button
              type="button"
              onClick={() => setSide("long")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                side === "long" ? "bg-white text-navy shadow-xs" : "text-navy/60"
              }`}
            >
              BUY (Long)
            </button>
            <button
              type="button"
              onClick={() => setSide("short")}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                side === "short" ? "bg-white text-navy shadow-xs" : "text-navy/60"
              }`}
            >
              SELL (Short)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Current Spot (₹)</label>
            <input
              type="number"
              value={spotPrice || ""}
              onChange={(e) => setSpotPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Strike Price (₹)</label>
            <input
              type="number"
              value={strikePrice || ""}
              onChange={(e) => setStrikePrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Premium (₹)</label>
            <input
              type="number"
              value={premium || ""}
              onChange={(e) => setPremium(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Lots Traded</label>
            <input
              type="number"
              min="1"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Lot Size Multiplier</label>
            <input
              type="number"
              min="1"
              value={contractMultiplier || ""}
              onChange={(e) => setContractMultiplier(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Target Expiry Price (₹)</label>
            <input
              type="number"
              value={targetPriceAtExpiry || ""}
              onChange={(e) => setTargetPriceAtExpiry(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Option Performance Profile" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}

export default OptionsMechanicsRenderer;
