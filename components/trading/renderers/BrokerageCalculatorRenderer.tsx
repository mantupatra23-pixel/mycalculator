"use client";

import React, { useState } from "react";
import {
  BrokerId,
  SegmentId,
  calculateTradingCharges,
  calculateDetailedCharges,
  BROKER_PRESETS,
} from "@/lib/trading/engines/chargesEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { BrokerageBreakdown } from "../ui/BrokerageBreakdown";

export function BrokerageCalculatorRenderer({ toolSlug }: { toolSlug: string }) {
  const [broker, setBroker] = useState<BrokerId>("zerodha");
  const [segment, setSegment] = useState<SegmentId>("equity-intraday");
  const [buyPrice, setBuyPrice] = useState<number>(1000);
  const [sellPrice, setSellPrice] = useState<number>(1050);
  const [quantity, setQuantity] = useState<number>(100);

  const detailed = calculateDetailedCharges({ broker, segment, buyPrice, sellPrice, quantity });
  const result = calculateTradingCharges({ broker, segment, buyPrice, sellPrice, quantity });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-navy">Select Broker</label>
          <div className="grid grid-cols-3 gap-2">
            {(["zerodha", "groww", "angelone"] as BrokerId[]).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBroker(b)}
                className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                  broker === b
                    ? "bg-navy text-white border-navy"
                    : "bg-sage/20 border-navy/10 text-navy hover:bg-cream"
                }`}
              >
                {BROKER_PRESETS[b].name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-navy">Market Segment</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSegment("equity-intraday")}
              className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                segment === "equity-intraday"
                  ? "bg-navy text-white border-navy"
                  : "bg-sage/20 border-navy/10 text-navy hover:bg-cream"
              }`}
            >
              Equity Intraday
            </button>
            <button
              type="button"
              onClick={() => setSegment("equity-delivery")}
              className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                segment === "equity-delivery"
                  ? "bg-navy text-white border-navy"
                  : "bg-sage/20 border-navy/10 text-navy hover:bg-cream"
              }`}
            >
              Equity Delivery (CNC)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Buy Price (₹)</label>
            <input
              type="number"
              value={buyPrice || ""}
              onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Sell Price (₹)</label>
            <input
              type="number"
              value={sellPrice || ""}
              onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Quantity (Shares)</label>
            <input
              type="number"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>

        <div className="p-3.5 bg-sage/30 border border-navy/10 rounded-2xl flex items-center justify-between text-xs">
          <span className="text-navy/70">Break-even points to cover round-trip friction:</span>
          <strong className="text-navy font-mono text-sm">+₹{detailed.breakEvenPoints.toFixed(2)} / share</strong>
        </div>

        {result.breakdown && <BrokerageBreakdown breakdown={result.breakdown} />}
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Trading Frictions & Net P&L" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}

export default BrokerageCalculatorRenderer;
