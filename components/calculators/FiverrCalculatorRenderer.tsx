"use client";

import React, { useState, useId } from "react";
import { Copy, Share2, RotateCcw, Check, Sparkles, AlertCircle } from "lucide-react";

export function FiverrCalculatorRenderer() {
  const [calcMode, setCalcMode] = useState<"forward" | "reverse">("forward");
  const [currency, setCurrency] = useState<"$" | "₹">("$");
  const [gigPrice, setGigPrice] = useState<number>(100);
  const [extras, setExtras] = useState<number>(50);
  const [tips, setTips] = useState<number>(20);
  const [refunds, setRefunds] = useState<number>(0);
  const [fiverrFeePct, setFiverrFeePct] = useState<number>(20);
  const [withdrawalFee, setWithdrawalFee] = useState<number>(1.0);
  const [fxSpreadPct, setFxSpreadPct] = useState<number>(2.0);
  const [tdsPct, setTdsPct] = useState<number>(1.0);
  const [otherExpenses, setOtherExpenses] = useState<number>(0);
  const [targetNet, setTargetNet] = useState<number>(500);
  const [copied, setCopied] = useState(false);

  const gigPriceInputId = useId();
  const extrasInputId = useId();
  const tipsInputId = useId();
  const refundsInputId = useId();
  const fiverrFeeInputId = useId();
  const withdrawalInputId = useId();
  const fxInputId = useId();
  const tdsInputId = useId();
  const expenseInputId = useId();
  const targetNetInputId = useId();

  const handleReset = () => {
    setCalcMode("forward");
    setCurrency("$");
    setGigPrice(100);
    setExtras(50);
    setTips(20);
    setRefunds(0);
    setFiverrFeePct(20);
    setWithdrawalFee(1.0);
    setFxSpreadPct(2.0);
    setTdsPct(1.0);
    setOtherExpenses(0);
    setTargetNet(500);
  };

  let grossOrderValue = 0;
  let fiverrFee = 0;
  let afterPlatformFee = 0;
  let estimatedTds = 0;
  let fxFee = 0;
  let totalDeductions = 0;
  let netEarnings = 0;

  if (calcMode === "forward") {
    grossOrderValue = Math.max(0, (gigPrice + extras + tips) - refunds);
    fiverrFee = (grossOrderValue * fiverrFeePct) / 100;
    afterPlatformFee = Math.max(0, grossOrderValue - fiverrFee);
    estimatedTds = (grossOrderValue * tdsPct) / 100;
    fxFee = (afterPlatformFee * fxSpreadPct) / 100;
    totalDeductions = fiverrFee + estimatedTds + withdrawalFee + fxFee + otherExpenses;
    netEarnings = Math.max(0, grossOrderValue - totalDeductions);
  } else {
    // Reverse Mode: Target Net to Required Order Price
    const desired = Math.max(0, isNaN(targetNet) ? 0 : targetNet);
    const platformRate = fiverrFeePct / 100;
    const tdsRate = tdsPct / 100;
    const fxRate = (fxSpreadPct / 100) * (1 - platformRate);
    const totalRate = platformRate + tdsRate + fxRate;

    if (totalRate >= 1) {
      grossOrderValue = 0;
    } else {
      grossOrderValue = (desired + withdrawalFee + otherExpenses) / (1 - totalRate);
    }

    fiverrFee = (grossOrderValue * fiverrFeePct) / 100;
    afterPlatformFee = Math.max(0, grossOrderValue - fiverrFee);
    estimatedTds = (grossOrderValue * tdsPct) / 100;
    fxFee = (afterPlatformFee * fxSpreadPct) / 100;
    totalDeductions = fiverrFee + estimatedTds + withdrawalFee + fxFee + otherExpenses;
    netEarnings = desired;
  }

  const effectiveDeductionPct = grossOrderValue > 0 ? (totalDeductions / grossOrderValue) * 100 : 0;
  const netMarginPct = grossOrderValue > 0 ? (netEarnings / grossOrderValue) * 100 : 0;

  const handleCopy = () => {
    const text = `Fiverr Earnings Breakdown:\nGross Order Value: ${currency}${grossOrderValue.toFixed(2)}\nFiverr Fee (${fiverrFeePct}%): -${currency}${fiverrFee.toFixed(2)}\nEstimated TDS (${tdsPct}%): -${currency}${estimatedTds.toFixed(2)}\nWithdrawal & FX Fees: -${currency}${(withdrawalFee + fxFee).toFixed(2)}\nNet In-Pocket Earnings: ${currency}${netEarnings.toFixed(2)}\nNet Margin: ${netMarginPct.toFixed(2)}%\nCalculated on https://www.mycalculator.xyz/calculators/fiverr-net-earnings-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Fiverr Net Earnings & Tax Calculator",
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8">
      {/* Mode & Currency Switchers */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-navy/10 shadow-sm">
        <div className="flex items-center gap-1.5 p-1 bg-sage/30 rounded-xl border border-navy/10">
          <button
            type="button"
            onClick={() => setCalcMode("forward")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === "forward" ? "bg-navy text-cream shadow-xs" : "text-navy/70 hover:text-navy"
            }`}
          >
            Calculate Order Earnings
          </button>
          <button
            type="button"
            onClick={() => setCalcMode("reverse")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === "reverse" ? "bg-navy text-cream shadow-xs" : "text-navy/70 hover:text-navy"
            }`}
          >
            Required Gig Price (Reverse)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy/70">Currency:</span>
          <div className="inline-flex rounded-lg border border-navy/10 p-0.5 bg-sage/20">
            <button
              type="button"
              onClick={() => setCurrency("$")}
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${currency === "$" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              $ USD
            </button>
            <button
              type="button"
              onClick={() => setCurrency("₹")}
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${currency === "₹" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              ₹ INR
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
          {calcMode === "forward" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label htmlFor={gigPriceInputId} className="text-xs font-bold text-navy">
                  Gig Base Price ({currency})
                </label>
                <input
                  id={gigPriceInputId}
                  type="number"
                  min="0"
                  value={gigPrice || ""}
                  onChange={(e) => setGigPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="100"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor={extrasInputId} className="text-xs font-bold text-navy">
                  Gig Extras ({currency})
                </label>
                <input
                  id={extrasInputId}
                  type="number"
                  min="0"
                  value={extras || ""}
                  onChange={(e) => setExtras(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor={tipsInputId} className="text-xs font-bold text-navy">
                  Customer Tips ({currency})
                </label>
                <input
                  id={tipsInputId}
                  type="number"
                  min="0"
                  value={tips || ""}
                  onChange={(e) => setTips(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="20"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label htmlFor={targetNetInputId} className="text-xs font-bold text-navy">
                Desired Net Take-Home Earnings ({currency})
              </label>
              <input
                id={targetNetInputId}
                type="number"
                min="0"
                value={targetNet || ""}
                onChange={(e) => setTargetNet(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 text-base font-extrabold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                placeholder="500"
              />
            </div>
          )}

          {/* Platform & Fee Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label htmlFor={fiverrFeeInputId} className="text-xs font-bold text-navy">
                Fiverr Seller Commission (%)
              </label>
              <input
                id={fiverrFeeInputId}
                type="number"
                step="0.5"
                value={fiverrFeePct || ""}
                onChange={(e) => setFiverrFeePct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={tdsInputId} className="text-xs font-bold text-navy">
                Estimated TDS (Sec 194-O) (%)
              </label>
              <input
                id={tdsInputId}
                type="number"
                step="0.1"
                value={tdsPct || ""}
                onChange={(e) => setTdsPct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={withdrawalInputId} className="text-xs font-bold text-navy">
                Withdrawal Fee ({currency})
              </label>
              <input
                id={withdrawalInputId}
                type="number"
                step="0.1"
                value={withdrawalFee || ""}
                onChange={(e) => setWithdrawalFee(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={fxInputId} className="text-xs font-bold text-navy">
                Currency Conversion / FX (%)
              </label>
              <input
                id={fxInputId}
                type="number"
                step="0.1"
                value={fxSpreadPct || ""}
                onChange={(e) => setFxSpreadPct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5 bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
              {calcMode === "forward" ? "Net Fiverr Payout" : "Required Total Gig Price"}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currency}
              {(calcMode === "forward" ? netEarnings : grossOrderValue).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-cream/90">
                Net Margin: {netMarginPct.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-2.5 pt-3 border-t border-cream/15 text-xs">
            <div className="flex justify-between text-cream/80">
              <span>Gross Order Value</span>
              <span className="font-bold text-white">
                {currency}{grossOrderValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Fiverr 20% Seller Commission</span>
              <span className="font-bold text-red-300">
                -{currency}{fiverrFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {tdsPct > 0 && (
              <div className="flex justify-between text-cream/80">
                <span>Estimated TDS Withholding ({tdsPct}%)</span>
                <span className="font-bold text-red-300">
                  -{currency}{estimatedTds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            <div className="flex justify-between text-cream/80">
              <span>Withdrawal & FX Spread</span>
              <span className="font-bold text-red-300">
                -{currency}{(withdrawalFee + fxFee).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-cream/15 font-black text-white text-base">
              <span>Net Take-Home Earnings</span>
              <span className="text-emerald-300">
                {currency}{netEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
              aria-label="Share Calculator"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
              aria-label="Reset Calculator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
