"use client";

import React, { useState, useId } from "react";
import { Copy, Share2, RotateCcw, Check, ArrowRightLeft, CreditCard, ShieldCheck } from "lucide-react";

interface GatewayPreset {
  name: string;
  pct: number;
  fixed: number;
  taxPct: number;
}

const GATEWAY_PRESETS: Record<string, GatewayPreset> = {
  stripe_us: { name: "Stripe US (Domestic)", pct: 2.9, fixed: 0.30, taxPct: 0 },
  stripe_in: { name: "Stripe India (Domestic)", pct: 2.0, fixed: 0.0, taxPct: 18 },
  paypal_us: { name: "PayPal US (Commercial)", pct: 3.49, fixed: 0.49, taxPct: 0 },
  paypal_in_intl: { name: "PayPal International (Export)", pct: 4.40, fixed: 0.30, taxPct: 18 },
  razorpay_in: { name: "Razorpay / Cashfree India", pct: 2.0, fixed: 0.0, taxPct: 18 },
  custom: { name: "Custom Gateway", pct: 2.5, fixed: 0.0, taxPct: 0 },
};

export function PaymentGatewayFeeCalculatorRenderer() {
  const [calcMode, setCalcMode] = useState<"forward" | "reverse">("forward");
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [presetKey, setPresetKey] = useState<string>("razorpay_in");
  
  const [amount, setAmount] = useState<number>(10000);
  const [feePct, setFeePct] = useState<number>(2.0);
  const [fixedFee, setFixedFee] = useState<number>(0);
  const [taxPct, setTaxPct] = useState<number>(18);
  const [conversionFeePct, setConversionFeePct] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const amountInputId = useId();
  const feePctInputId = useId();
  const fixedFeeInputId = useId();
  const taxPctInputId = useId();
  const convFeeInputId = useId();

  const handlePresetChange = (key: string) => {
    setPresetKey(key);
    const p = GATEWAY_PRESETS[key];
    if (p) {
      setFeePct(p.pct);
      setFixedFee(p.fixed);
      setTaxPct(p.taxPct);
      if (key.includes("_in")) {
        setCurrency("₹");
      } else if (key.includes("_us")) {
        setCurrency("$");
      }
    }
  };

  const handleReset = () => {
    setCalcMode("forward");
    handlePresetChange("razorpay_in");
    setAmount(10000);
    setConversionFeePct(0);
  };

  // Calculations
  let grossAmount = 0;
  let baseFee = 0;
  let taxOnFee = 0;
  let totalGatewayFee = 0;
  let conversionFee = 0;
  let totalDeduction = 0;
  let netReceived = 0;

  const validAmount = Math.max(0, isNaN(amount) ? 0 : amount);

  if (calcMode === "forward") {
    grossAmount = validAmount;
    baseFee = (grossAmount * feePct) / 100 + fixedFee;
    taxOnFee = (baseFee * taxPct) / 100;
    totalGatewayFee = baseFee + taxOnFee;
    conversionFee = (grossAmount * conversionFeePct) / 100;
    totalDeduction = totalGatewayFee + conversionFee;
    netReceived = Math.max(0, grossAmount - totalDeduction);
  } else {
    // Reverse: Target Net to Customer Charge
    const targetNet = validAmount;
    const effectiveFeeRate = (feePct / 100) * (1 + taxPct / 100) + conversionFeePct / 100;
    const fixedWithTax = fixedFee * (1 + taxPct / 100);
    
    if (effectiveFeeRate >= 1) {
      grossAmount = 0;
    } else {
      grossAmount = (targetNet + fixedWithTax) / (1 - effectiveFeeRate);
    }
    
    baseFee = (grossAmount * feePct) / 100 + fixedFee;
    taxOnFee = (baseFee * taxPct) / 100;
    totalGatewayFee = baseFee + taxOnFee;
    conversionFee = (grossAmount * conversionFeePct) / 100;
    totalDeduction = totalGatewayFee + conversionFee;
    netReceived = targetNet;
  }

  const effectiveFeePct = grossAmount > 0 ? (totalDeduction / grossAmount) * 100 : 0;

  const handleCopy = () => {
    const text = `Payment Gateway Fee Breakdown:\nMode: ${calcMode === "forward" ? "Standard Charge" : "Target Net Calculation"}\nCustomer Charge: ${currency}${grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nTotal Gateway & Tax Fees: -${currency}${totalDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nNet Amount Received: ${currency}${netReceived.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nEffective Fee: ${effectiveFeePct.toFixed(2)}%\nCalculated on https://www.mycalculator.xyz/calculators/payment-gateway-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Payment Gateway Fee Calculator",
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
            I am Charging
          </button>
          <button
            type="button"
            onClick={() => setCalcMode("reverse")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              calcMode === "reverse" ? "bg-navy text-cream shadow-xs" : "text-navy/70 hover:text-navy"
            }`}
          >
            I Want to Receive (Reverse)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy/70">Currency:</span>
          <div className="inline-flex rounded-lg border border-navy/10 p-0.5 bg-sage/20">
            <button
              type="button"
              onClick={() => setCurrency("₹")}
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${currency === "₹" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("$")}
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${currency === "$" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
          {/* Preset Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-navy/70">
              Gateway Provider Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(GATEWAY_PRESETS).map(([k, v]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handlePresetChange(k)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all text-left truncate ${
                    presetKey === k
                      ? "bg-sage/40 border-steel text-navy shadow-xs"
                      : "bg-white border-navy/10 text-navy/70 hover:border-navy/30"
                  }`}
                >
                  {v.name.split(" ")[0]} {v.name.split(" ")[1] || ""}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-1.5">
            <label htmlFor={amountInputId} className="text-xs font-bold text-navy">
              {calcMode === "forward" ? "Customer Transaction Amount" : "Desired Net Payout (Target)"} ({currency})
            </label>
            <input
              id={amountInputId}
              type="number"
              min="0"
              value={amount || ""}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 text-base font-extrabold text-navy bg-sage/20 border border-navy/15 rounded-xl focus:outline-none focus:border-steel"
              placeholder="10000"
            />
          </div>

          {/* Fee Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor={feePctInputId} className="text-xs font-bold text-navy">
                Processing Fee (%)
              </label>
              <input
                id={feePctInputId}
                type="number"
                step="0.01"
                min="0"
                value={feePct || ""}
                onChange={(e) => {
                  setPresetKey("custom");
                  setFeePct(parseFloat(e.target.value) || 0);
                }}
                className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl focus:outline-none focus:border-steel"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={fixedFeeInputId} className="text-xs font-bold text-navy">
                Fixed Transaction Fee ({currency})
              </label>
              <input
                id={fixedFeeInputId}
                type="number"
                step="0.01"
                min="0"
                value={fixedFee || ""}
                onChange={(e) => {
                  setPresetKey("custom");
                  setFixedFee(parseFloat(e.target.value) || 0);
                }}
                className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl focus:outline-none focus:border-steel"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={taxPctInputId} className="text-xs font-bold text-navy">
                GST / Tax on Gateway Fee (%)
              </label>
              <input
                id={taxPctInputId}
                type="number"
                step="0.1"
                min="0"
                value={taxPct || ""}
                onChange={(e) => {
                  setPresetKey("custom");
                  setTaxPct(parseFloat(e.target.value) || 0);
                }}
                className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl focus:outline-none focus:border-steel"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={convFeeInputId} className="text-xs font-bold text-navy">
                Currency FX Conversion Fee (%)
              </label>
              <input
                id={convFeeInputId}
                type="number"
                step="0.1"
                min="0"
                value={conversionFeePct || ""}
                onChange={(e) => setConversionFeePct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl focus:outline-none focus:border-steel"
              />
            </div>
          </div>
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5 bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
              {calcMode === "forward" ? "Net Payout Received" : "Required Customer Charge"}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currency}
              {(calcMode === "forward" ? netReceived : grossAmount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-cream/90">
                Effective Fee: {effectiveFeePct.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2.5 pt-3 border-t border-cream/15 text-xs">
            <div className="flex justify-between text-cream/80">
              <span>Customer Transaction Amount</span>
              <span className="font-bold text-white">
                {currency}{grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Base Gateway Fee ({feePct}% + {currency}{fixedFee})</span>
              <span className="font-bold text-red-300">
                -{currency}{baseFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {taxPct > 0 && (
              <div className="flex justify-between text-cream/80">
                <span>Tax / GST on Gateway ({taxPct}%)</span>
                <span className="font-bold text-red-300">
                  -{currency}{taxOnFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            {conversionFeePct > 0 && (
              <div className="flex justify-between text-cream/80">
                <span>Currency FX Fee ({conversionFeePct}%)</span>
                <span className="font-bold text-red-300">
                  -{currency}{conversionFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-cream/15 font-extrabold text-white text-sm">
              <span>Total Deductions</span>
              <span className="text-red-300">
                -{currency}{totalDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between pt-1 font-black text-white text-base">
              <span>Net In-Pocket Payout</span>
              <span className="text-emerald-300">
                {currency}{netReceived.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
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
