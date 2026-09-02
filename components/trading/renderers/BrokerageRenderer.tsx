"use client";

import React, { useState } from "react";
import { calculateTradingCharges } from "@/lib/trading/engines/chargesEngines";
import { TradeResultCard } from "../ui/TradeResultCard";

export function BrokerageRenderer({ toolSlug }: { toolSlug: string }) {
  const [turnover, setTurnover] = useState<number>(100000);
  const [ordersCount, setOrdersCount] = useState<number>(2);

  const result = calculateTradingCharges({ turnover, orderType: "intraday", ordersCount });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Trade Turnover (₹)</label>
            <input
              type="number"
              value={turnover || ""}
              onChange={(e) => setTurnover(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy">Executed Orders</label>
            <input
              type="number"
              min="1"
              value={ordersCount || ""}
              onChange={(e) => setOrdersCount(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>

        {result.breakdown && (
          <div className="border border-navy/10 rounded-2xl overflow-hidden text-xs">
            <div className="bg-sage/40 px-3 py-2 font-bold text-navy text-[11px] border-b border-navy/10">
              Statutory Levies Breakdown
            </div>
            <div className="divide-y divide-navy/5">
              {result.breakdown.map((row, idx) => (
                <div key={idx} className="flex justify-between items-center px-3 py-1.5 text-navy/80">
                  <span>{row.item}</span>
                  <span className="font-bold text-navy">{row.formatted}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Trading Frictions" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
