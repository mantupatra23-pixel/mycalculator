"use client";

import React, { useState } from "react";
import {
  calculateIntradayPnL,
  calculateDeliveryPnL,
  calculateTargetProfit,
  calculateStopLossPrice,
  calculateMultiEntryAverage,
  calculateAverageDown,
  EntryItem,
} from "@/lib/trading/engines/pnlEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { Plus, Trash2 } from "lucide-react";

export function PnLCalculatorRenderer({ toolSlug }: { toolSlug: string }) {
  // Shared state
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [exitPrice, setExitPrice] = useState<number>(540);
  const [quantity, setQuantity] = useState<number>(100);
  const [tradeType, setTradeType] = useState<"long" | "short">("long");
  const [targetProfitAmount, setTargetProfitAmount] = useState<number>(5000);
  const [accountCapital, setAccountCapital] = useState<number>(100000);
  const [riskPct, setRiskPct] = useState<number>(1.0);

  // Multi-entry state
  const [entries, setEntries] = useState<EntryItem[]>([
    { price: 100, quantity: 100 },
    { price: 85, quantity: 200 },
  ]);

  // Average down state
  const [newPrice, setNewPrice] = useState<number>(400);
  const [newQty, setNewQty] = useState<number>(100);

  let result;
  if (toolSlug === "equity-pnl-calculator") {
    result = calculateDeliveryPnL({ buyPrice: entryPrice, sellPrice: exitPrice, quantity });
  } else if (toolSlug === "target-profit-calculator") {
    result = calculateTargetProfit({ entryPrice, quantity, targetProfitAmount, tradeType });
  } else if (toolSlug === "stop-loss-calculator") {
    result = calculateStopLossPrice({ entryPrice, accountCapital, riskPct, quantity, tradeType });
  } else if (toolSlug === "average-price-calculator") {
    result = calculateMultiEntryAverage(entries);
  } else if (toolSlug === "average-down-calculator") {
    result = calculateAverageDown({ existingQty: quantity, existingAvgPrice: entryPrice, newPrice, newQty });
  } else {
    // Default: Intraday PnL
    result = calculateIntradayPnL({ entryPrice, exitPrice, quantity, tradeType });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
        {/* Long / Short Toggle if applicable */}
        {(toolSlug === "intraday-pnl-calculator" ||
          toolSlug === "target-profit-calculator" ||
          toolSlug === "stop-loss-calculator") && (
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
        )}

        {/* Dynamic Input Matrix */}
        {toolSlug === "average-price-calculator" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy">Trade Executions</span>
              <button
                type="button"
                onClick={() => setEntries([...entries, { price: 100, quantity: 50 }])}
                className="text-xs font-bold text-steel hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Leg
              </button>
            </div>
            {entries.map((leg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-navy/60 font-semibold">Price (₹)</label>
                  <input
                    type="number"
                    value={leg.price || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[idx].price = parseFloat(e.target.value) || 0;
                      setEntries(updated);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-navy/60 font-semibold">Quantity</label>
                  <input
                    type="number"
                    value={leg.quantity || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[idx].quantity = parseInt(e.target.value) || 0;
                      setEntries(updated);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
                {entries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setEntries(entries.filter((_, i) => i !== idx))}
                    className="mt-4 p-2 text-navy/40 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">
                {toolSlug === "equity-pnl-calculator" ? "Buy Price (₹)" : "Entry Fill Price (₹)"}
              </label>
              <input
                type="number"
                value={entryPrice || ""}
                onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            {toolSlug !== "target-profit-calculator" && toolSlug !== "stop-loss-calculator" && toolSlug !== "average-down-calculator" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">
                  {toolSlug === "equity-pnl-calculator" ? "Sell Price (₹)" : "Exit Square-Off Price (₹)"}
                </label>
                <input
                  type="number"
                  value={exitPrice || ""}
                  onChange={(e) => setExitPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">
                {toolSlug === "average-down-calculator" ? "Current Holding Quantity" : "Traded Quantity (Shares)"}
              </label>
              <input
                type="number"
                value={quantity || ""}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            {toolSlug === "target-profit-calculator" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Desired Target Profit (₹)</label>
                <input
                  type="number"
                  value={targetProfitAmount || ""}
                  onChange={(e) => setTargetProfitAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
            )}

            {toolSlug === "stop-loss-calculator" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">Account Capital (₹)</label>
                  <input
                    type="number"
                    value={accountCapital || ""}
                    onChange={(e) => setAccountCapital(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">Risk per Trade (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={riskPct || ""}
                    onChange={(e) => setRiskPct(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
              </>
            )}

            {toolSlug === "average-down-calculator" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">New Purchase Price (₹)</label>
                  <input
                    type="number"
                    value={newPrice || ""}
                    onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">New Added Quantity</label>
                  <input
                    type="number"
                    value={newQty || ""}
                    onChange={(e) => setNewQty(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Trade Calculation" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
