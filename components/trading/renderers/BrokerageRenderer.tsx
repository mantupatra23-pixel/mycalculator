"use client";

import React, { useState } from "react";
import { calculateTradingCharges } from "@/lib/trading/engines/chargesEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { BrokerageBreakdown } from "../ui/BrokerageBreakdown";

export function BrokerageRenderer({ toolSlug }: { toolSlug: string }) {
  const [turnover, setTurnover] = useState<number>(100000);
  const [ordersCount, setOrdersCount] = useState<number>(2);
  const [orderType, setOrderType] = useState<"intraday" | "delivery" | "futures" | "options">("intraday");

  const result = calculateTradingCharges({ turnover, orderType, ordersCount });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-[#0b1222] border border-[#1e293b] rounded-3xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Gross Trade Turnover (₹)</label>
            <input
              type="number"
              value={turnover || ""}
              onChange={(e) => setTurnover(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Total Executed Orders (Legs)</label>
            <input
              type="number"
              min="1"
              value={ordersCount || ""}
              onChange={(e) => setOrdersCount(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#1e293b] rounded-xl text-white font-mono font-bold text-sm focus:outline-hidden focus:border-[#00f59b]"
            />
          </div>
        </div>

        {result.breakdown && <BrokerageBreakdown breakdown={result.breakdown} />}
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Trading Frictions" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
