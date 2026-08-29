"use client";

import React, { useState, useMemo } from "react";
import { formatINR, formatInLakhCrore } from "@/lib/formatters";
import { Copy, Check, RotateCcw, Share2, Sparkles } from "lucide-react";

export function FeaturedEMI() {
  const [principal, setPrincipal] = useState<number>(2500000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [copied, setCopied] = useState<boolean>(false);

  const calculation = useMemo(() => {
    const p = Math.max(0, principal);
    const r = Math.max(0, rate) / 12 / 100;
    const n = Math.max(1, tenureYears) * 12;

    if (p === 0 || r === 0) {
      const zeroEmi = n > 0 ? p / n : 0;
      return {
        monthlyEmi: zeroEmi,
        totalInterest: 0,
        totalPayment: p,
        principalPercent: 100,
        interestPercent: 0,
      };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totalInt = totalPay - p;

    const principalPct = Math.round((p / totalPay) * 100);
    const interestPct = 100 - principalPct;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
      principalPercent: principalPct,
      interestPercent: interestPct,
    };
  }, [principal, rate, tenureYears]);

  const handleReset = () => {
    setPrincipal(2500000);
    setRate(8.5);
    setTenureYears(20);
  };

  const handleCopy = () => {
    const text = `Loan EMI Summary:
Principal: ${formatINR(principal)}
Interest Rate: ${rate}%
Tenure: ${tenureYears} Years
Monthly EMI: ${formatINR(calculation.monthlyEmi)}
Total Interest: ${formatINR(calculation.totalInterest)}
Total Payment: ${formatINR(calculation.totalPayment)}
Calculated on MyCalculators.xyz`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "EMI Calculator Result - MyCalculators",
          text: `My monthly loan EMI is ${formatINR(calculation.monthlyEmi)} for a loan of ${formatINR(principal)} at ${rate}%.`,
          url: "https://www.mycalculator.xyz/calculators/emi-calculator",
        });
      } catch {
        // Fallback
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-bold bg-cream text-navy px-3 py-1 rounded-full uppercase tracking-wider mb-1.5 border border-sand/40">
            <Sparkles className="w-3.5 h-3.5 text-sand" /> Featured Interactive Tool
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-navy">Loan EMI Calculator</h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-sm text-navy">Loan Amount</label>
              <span className="text-xs font-bold text-steel bg-sage/30 px-2 py-0.5 rounded">
                {formatInLakhCrore(principal)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-navy/60">₹</span>
              <input
                type="number"
                min="10000"
                max="100000000"
                step="10000"
                value={principal || ""}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel"
              />
            </div>
            <input
              type="range"
              min="50000"
              max="20000000"
              step="50000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full mt-2.5 accent-steel cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-sm text-navy">Interest Rate (p.a)</label>
              <span className="text-xs font-bold text-steel bg-sage/30 px-2 py-0.5 rounded">{rate}%</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="30"
                step="0.1"
                value={rate || ""}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-navy/60">%</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full mt-2.5 accent-steel cursor-pointer"
            />
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-sm text-navy">Loan Tenure (Years)</label>
              <span className="text-xs font-bold text-steel bg-sage/30 px-2 py-0.5 rounded">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="number"
              min="1"
              max="35"
              value={tenureYears || ""}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel"
            />
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full mt-2.5 accent-steel cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-sage/40 rounded-2xl p-5 sm:p-6 border border-navy/15 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-1">
              Monthly Loan EMI
            </div>
            <div className="text-3xl sm:text-4xl font-black text-navy mb-6 tracking-tight">
              {formatINR(calculation.monthlyEmi)}
            </div>

            <div className="space-y-3 text-sm border-t border-navy/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-navy/75 font-medium">Principal Amount:</span>
                <span className="font-bold text-navy">{formatINR(principal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy/75 font-medium">Total Interest Payable:</span>
                <span className="font-bold text-[#b36932]">{formatINR(calculation.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-navy/10 text-base font-extrabold text-navy">
                <span>Total Amount:</span>
                <span>{formatINR(calculation.totalPayment)}</span>
              </div>
            </div>

            {/* Visual Ratio Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-bold text-navy/70 mb-1.5">
                <span>Principal ({calculation.principalPercent}%)</span>
                <span>Interest ({calculation.interestPercent}%)</span>
              </div>
              <div className="h-3 w-full bg-sand rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${calculation.principalPercent}%` }}
                  className="bg-steel h-full transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-6 mt-6 border-t border-navy/10">
            <button
              onClick={handleCopy}
              className="flex-1 bg-white hover:bg-white/80 text-navy font-bold py-2.5 px-3 rounded-xl border border-navy/20 flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>
            <button
              onClick={handleShare}
              className="bg-navy hover:bg-navy/90 text-cream font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
