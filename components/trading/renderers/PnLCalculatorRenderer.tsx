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
      <div className="lg:col-span-7 bg-[#0b1222] border border-[#1e293b] rounded-3xl p-6 space-y-4">
        <div className="flex gap-2 p-1 bg-[#0f172a] rounded-xl border border-[#1e293b]">
          <button
            type="button"
            onClick={() => setTradeType("long")}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-colors ${
              tradeType === "long" ? "bg-[#00f59b] text-[#050b14]" : "text-slate-400"
            }`}
          >
            BUY (Long)
          </button>
          <button
            type="button"
            onClick={() => setTradeType("short")}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-colors ${
              tradeType === "short" ? "bg-rose-500 text-white" : "text-slate-400"
            }`}
          >
            SELL (Short)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Entry Price (₹)</label>
            <input
              type="number"
              value={entryPrice || ""}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Exit Price (₹)</label>
            <input
              type="number"
              value={exitPrice || ""}
              onChange={(e) => setExitPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Quantity (Shares)</label>
            <input
              type="number"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
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
