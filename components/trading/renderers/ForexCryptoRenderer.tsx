"use client";

import React, { useState } from "react";
import {
  calculateForexPipValue,
  calculateForexPositionSize,
  calculateCryptoDca,
  CryptoDcaPurchase,
} from "@/lib/trading/engines/forexCryptoEngines";
import { TradeResultCard } from "../ui/TradeResultCard";
import { Plus, Trash2 } from "lucide-react";

export function ForexCryptoRenderer({ toolSlug }: { toolSlug: string }) {
  // Forex states
  const [lotsTraded, setLotsTraded] = useState<number>(1);
  const [lotSizeUnits, setLotSizeUnits] = useState<number>(100000);
  const [pipSize, setPipSize] = useState<number>(0.0001);
  const [exchangeRate, setExchangeRate] = useState<number>(85.5);
  const [accountCapital, setAccountCapital] = useState<number>(100000);
  const [stopLossPips, setStopLossPips] = useState<number>(25);

  // Crypto DCA states
  const [dcaEntries, setDcaEntries] = useState<CryptoDcaPurchase[]>([
    { price: 5500000, amountInvested: 50000 },
    { price: 5100000, amountInvested: 50000 },
  ]);

  let result;
  if (toolSlug === "forex-position-size-calculator") {
    result = calculateForexPositionSize({
      accountCapital,
      riskPct: 1.5,
      stopLossPips,
      pipValuePerStandardLotInAccountCurrency: exchangeRate * 10,
    });
  } else if (toolSlug === "crypto-dca-calculator") {
    result = calculateCryptoDca(dcaEntries);
  } else {
    // Default: Forex Pip Value
    result = calculateForexPipValue({
      lotSizeUnits,
      lotsTraded,
      pipSize,
      exchangeRateToAccountCurrency: exchangeRate,
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
        {toolSlug === "crypto-dca-calculator" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-navy">Recurring Dollar-Cost Purchases</h3>
              <button
                type="button"
                onClick={() => setDcaEntries([...dcaEntries, { price: 5000000, amountInvested: 25000 }])}
                className="text-xs font-bold text-steel hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Buy Order
              </button>
            </div>

            {dcaEntries.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-navy/60 font-semibold">Asset Price (₹)</label>
                  <input
                    type="number"
                    value={item.price || ""}
                    onChange={(e) => {
                      const upd = [...dcaEntries];
                      upd[idx].price = parseFloat(e.target.value) || 0;
                      setDcaEntries(upd);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-navy/60 font-semibold">Invested Amount (₹)</label>
                  <input
                    type="number"
                    value={item.amountInvested || ""}
                    onChange={(e) => {
                      const upd = [...dcaEntries];
                      upd[idx].amountInvested = parseFloat(e.target.value) || 0;
                      setDcaEntries(upd);
                    }}
                    className="w-full px-3 py-1.5 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  />
                </div>
                {dcaEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setDcaEntries(dcaEntries.filter((_, i) => i !== idx))}
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
              <label className="text-xs font-bold text-navy">Lots Traded</label>
              <input
                type="number"
                step="0.01"
                value={lotsTraded || ""}
                onChange={(e) => setLotsTraded(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Lot Size Contract</label>
              <select
                value={lotSizeUnits}
                onChange={(e) => setLotSizeUnits(parseInt(e.target.value) || 100000)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              >
                <option value={100000}>Standard Lot (100,000)</option>
                <option value={10000}>Mini Lot (10,000)</option>
                <option value={1000}>Micro Lot (1,000)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Pip Size</label>
              <select
                value={pipSize}
                onChange={(e) => setPipSize(parseFloat(e.target.value) || 0.0001)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              >
                <option value={0.0001}>0.0001 (Standard FX Pairs)</option>
                <option value={0.01}>0.01 (JPY Currency Pairs)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy">Exchange Rate to INR (₹)</label>
              <input
                type="number"
                step="0.1"
                value={exchangeRate || ""}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <TradeResultCard title="Trading Metric Output" result={result} toolSlug={toolSlug} />
      </div>
    </div>
  );
}
