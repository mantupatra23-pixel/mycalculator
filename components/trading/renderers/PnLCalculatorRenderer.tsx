"use client";

import React, { useState } from "react";
import { calculateBasePnL } from "@/lib/trading/engines/pnlEngines";
import { TradeResultCard } from "../ui/TradeResultCard";

export function PnLCalculatorRenderer({ toolSlug }: { toolSlug: string }) {
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [exitPrice, setExitPrice] = useState<number>(540);
  const [quantity, setQuantity] = useState<number>(100);
  const [tradeType, setTradeType] = useState<"long" | "short">("long");

  const result = calculateBasePnL({ entryPrice, exitPrice, quantity, tradeType });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
        <div className="flex gap-2 p-1 bg-sage/20 rounded-xl border border-navy/10">
          <button
            type="button"
            onClick={() => setTradeType("long")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              tradeType === "long" ? "bg-white text-navy shadow-xs" : "text-navy/60"
            }`}
          >
            BUY (Long)
          </button>
          <button
            type="button"
            onClick={() => setTradeType("short")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              tradeType === "short" ? "bg-white text-navy shadow-xs" : "text-navy/60"
            }`}
          >
            SELL (Short)
          </button>
        </div>

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
            <label className="text-xs font-bold text-navy">Exit Price (₹)</label>
            <input
              type="number"
              value={exitPrice || ""}
              onChange={(e) => setExitPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Quantity</label>
            <input
              type="number"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Trade Performance" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
