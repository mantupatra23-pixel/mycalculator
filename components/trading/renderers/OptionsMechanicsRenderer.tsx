"use client";

import React, { useState } from "react";
import { calculateSingleOptionMetrics } from "@/lib/trading/engines/optionsEngines";
import { TradeResultCard } from "../ui/TradeResultCard";

export function OptionsMechanicsRenderer({ toolSlug }: { toolSlug: string }) {
  const isPutDefault = toolSlug.includes("put");
  const [spotPrice, setSpotPrice] = useState<number>(24500);
  const [strikePrice, setStrikePrice] = useState<number>(24500);
  const [premium, setPremium] = useState<number>(180);
  const [quantity, setQuantity] = useState<number>(1);
  const [contractMultiplier, setContractMultiplier] = useState<number>(50);
  const [optionType, setOptionType] = useState<"call" | "put">(isPutDefault ? "put" : "call");
  const [side, setSide] = useState<"long" | "short">("long");
  const [targetPriceAtExpiry, setTargetPriceAtExpiry] = useState<number>(24700);

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
        {/* Call / Put and Long / Short Controls */}
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

        {/* Core Option Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Current Underlying (₹)</label>
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
            <label className="text-xs font-bold text-navy">Option Premium (₹)</label>
            <input
              type="number"
              value={premium || ""}
              onChange={(e) => setPremium(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>

        {/* Quantity & Multipliers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Contracts / Lots</label>
            <input
              type="number"
              min="1"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Lot Multiplier</label>
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
