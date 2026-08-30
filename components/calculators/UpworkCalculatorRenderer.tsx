"use client";

import React, { useState, useId } from "react";
import { Copy, Share2, RotateCcw, Check, UserCheck, ShieldAlert, Calendar } from "lucide-react";

export function UpworkCalculatorRenderer() {
  const [contractAmount, setContractAmount] = useState<number>(1000);
  const [currency, setCurrency] = useState<"$" | "₹">("$");
  const [upworkFeePct, setUpworkFeePct] = useState<number>(10);
  const [country, setCountry] = useState<"IN" | "OTHER">("IN");
  const [panCompliant, setPanCompliant] = useState<boolean>(true);
  const [aadhaarLinked, setAadhaarLinked] = useState<boolean>(true);
  const [withdrawalFee, setWithdrawalFee] = useState<number>(0.99);
  const [fxSpreadPct, setFxSpreadPct] = useState<number>(1.5);
  const [otherExpenses, setOtherExpenses] = useState<number>(0);
  const [monthlyProjects, setMonthlyProjects] = useState<number>(4);
  const [copied, setCopied] = useState(false);

  const contractInputId = useId();
  const upworkFeeInputId = useId();
  const withdrawalInputId = useId();
  const fxInputId = useId();
  const expenseInputId = useId();
  const monthlyProjInputId = useId();

  const handleReset = () => {
    setContractAmount(1000);
    setCurrency("$");
    setUpworkFeePct(10);
    setCountry("IN");
    setPanCompliant(true);
    setAadhaarLinked(true);
    setWithdrawalFee(0.99);
    setFxSpreadPct(1.5);
    setOtherExpenses(0);
    setMonthlyProjects(4);
  };

  const grossInvoice = Math.max(0, isNaN(contractAmount) ? 0 : contractAmount);
  const upworkServiceFee = (grossInvoice * upworkFeePct) / 100;
  const afterUpworkFee = Math.max(0, grossInvoice - upworkServiceFee);

  // Indian Section 194-O TDS logic
  let tdsRate = 0;
  if (country === "IN") {
    if (panCompliant && aadhaarLinked) {
      tdsRate = 1.0; // 1% under section 194-O
    } else {
      tdsRate = 5.0; // Higher withholding if PAN/compliance link missing
    }
  }

  const estimatedTds = (grossInvoice * tdsRate) / 100;
  const fxFee = (afterUpworkFee * fxSpreadPct) / 100;
  const totalDeductions = upworkServiceFee + estimatedTds + withdrawalFee + fxFee + otherExpenses;
  const netPayout = Math.max(0, grossInvoice - totalDeductions);
  const effectiveDeductionPct = grossInvoice > 0 ? (totalDeductions / grossInvoice) * 100 : 0;

  // Annual Projections
  const annualGross = grossInvoice * monthlyProjects * 12;
  const annualUpworkFees = upworkServiceFee * monthlyProjects * 12;
  const annualTds = estimatedTds * monthlyProjects * 12;
  const annualNet = netPayout * monthlyProjects * 12;

  const handleCopy = () => {
    const text = `Upwork Net Earnings Breakdown:\nGross Invoice: ${currency}${grossInvoice.toFixed(2)}\nUpwork Service Fee (${upworkFeePct}%): -${currency}${upworkServiceFee.toFixed(2)}\nEstimated TDS (${tdsRate}%): -${currency}${estimatedTds.toFixed(2)}\nWithdrawal & FX Fees: -${currency}${(withdrawalFee + fxFee).toFixed(2)}\nNet Take-Home Payout: ${currency}${netPayout.toFixed(2)}\nEffective Deduction: ${effectiveDeductionPct.toFixed(2)}%\nAnnual Projected Net (${monthlyProjects} proj/mo): ${currency}${annualNet.toFixed(2)}\nCalculated on https://www.mycalculator.xyz/calculators/upwork-net-earnings-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Upwork Net Earnings & Tax Calculator",
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Setup Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-navy/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy">Freelancer Location:</span>
          <div className="inline-flex rounded-lg border border-navy/10 p-0.5 bg-sage/20">
            <button
              type="button"
              onClick={() => setCountry("IN")}
              className={`px-3 py-1 text-xs font-bold rounded-md ${country === "IN" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              India (TDS 194-O)
            </button>
            <button
              type="button"
              onClick={() => setCountry("OTHER")}
              className={`px-3 py-1 text-xs font-bold rounded-md ${country === "OTHER" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              Global / US / Other
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy/70">Display Currency:</span>
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
          {/* Invoice Amount */}
          <div className="space-y-1.5">
            <label htmlFor={contractInputId} className="text-xs font-bold text-navy">
              Project / Contract Invoice Amount ({currency})
            </label>
            <input
              id={contractInputId}
              type="number"
              min="0"
              value={contractAmount || ""}
              onChange={(e) => setContractAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 text-base font-extrabold text-navy bg-sage/20 border border-navy/15 rounded-xl focus:outline-none focus:border-steel"
              placeholder="1000"
            />
          </div>

          {/* Upwork Service Fee Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-navy">
              Upwork Freelancer Service Fee Rate
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 5, 0, 15].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setUpworkFeePct(rate)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    upworkFeePct === rate
                      ? "bg-navy text-cream border-navy shadow-xs"
                      : "bg-sage/20 text-navy/70 border-navy/10 hover:border-navy/30"
                  }`}
                >
                  {rate}% {rate === 10 ? "(Standard)" : ""}
                </button>
              ))}
            </div>
            <div className="pt-1">
              <input
                id={upworkFeeInputId}
                type="number"
                step="0.5"
                min="0"
                value={upworkFeePct || ""}
                onChange={(e) => setUpworkFeePct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl focus:outline-none"
                placeholder="Custom Fee %"
              />
            </div>
          </div>

          {/* India Statutory Compliance Toggles */}
          {country === "IN" && (
            <div className="p-4 bg-sage/20 border border-navy/10 rounded-2xl space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-navy block">
                Indian Tax (Section 194-O TDS) Compliance
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={panCompliant}
                    onChange={(e) => setPanCompliant(e.target.checked)}
                    className="w-4 h-4 rounded text-steel focus:ring-steel"
                  />
                  <span className="font-semibold text-navy/80">Valid PAN Submitted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aadhaarLinked}
                    onChange={(e) => setAadhaarLinked(e.target.checked)}
                    className="w-4 h-4 rounded text-steel focus:ring-steel"
                  />
                  <span className="font-semibold text-navy/80">Aadhaar Linked with PAN</span>
                </label>
              </div>
              <p className="text-[11px] text-navy/60 leading-relaxed">
                {panCompliant && aadhaarLinked
                  ? "Standard 1% TDS applies on gross freelance billings."
                  : "Higher 5% withholding rate applies due to pending PAN/Aadhaar statutory linking."}
              </p>
            </div>
          )}

          {/* Additional Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor={withdrawalInputId} className="text-[11px] font-bold text-navy">
                Withdrawal Fee ({currency})
              </label>
              <input
                id={withdrawalInputId}
                type="number"
                step="0.01"
                value={withdrawalFee || ""}
                onChange={(e) => setWithdrawalFee(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor={fxInputId} className="text-[11px] font-bold text-navy">
                FX Spread / Fee (%)
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

            <div className="space-y-1">
              <label htmlFor={expenseInputId} className="text-[11px] font-bold text-navy">
                Other Expenses ({currency})
              </label>
              <input
                id={expenseInputId}
                type="number"
                value={otherExpenses || ""}
                onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>

          {/* Annual Forecast Inputs */}
          <div className="pt-2 border-t border-navy/10 space-y-1.5">
            <label htmlFor={monthlyProjInputId} className="text-xs font-bold text-navy">
              Average Number of Similar Contracts per Month
            </label>
            <input
              id={monthlyProjInputId}
              type="number"
              min="1"
              value={monthlyProjects || ""}
              onChange={(e) => setMonthlyProjects(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
            />
          </div>
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5 bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
              Estimated Net Payout
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {currency}
              {netPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-cream/90">
                Effective Deduction: {effectiveDeductionPct.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Itemized Deductions */}
          <div className="space-y-2.5 pt-3 border-t border-cream/15 text-xs">
            <div className="flex justify-between text-cream/80">
              <span>Gross Project Value</span>
              <span className="font-bold text-white">
                {currency}{grossInvoice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Upwork Service Fee ({upworkFeePct}%)</span>
              <span className="font-bold text-red-300">
                -{currency}{upworkServiceFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {country === "IN" && (
              <div className="flex justify-between text-cream/80">
                <span>Estimated TDS Section 194-O ({tdsRate}%)</span>
                <span className="font-bold text-red-300">
                  -{currency}{estimatedTds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            <div className="flex justify-between text-cream/80">
              <span>Withdrawal & FX Conversion</span>
              <span className="font-bold text-red-300">
                -{currency}{(withdrawalFee + fxFee).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {otherExpenses > 0 && (
              <div className="flex justify-between text-cream/80">
                <span>Direct Business Expenses</span>
                <span className="font-bold text-red-300">
                  -{currency}{otherExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-cream/15 font-black text-white text-base">
              <span>Net Take-Home Payout</span>
              <span className="text-emerald-300">
                {currency}{netPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Annual Projection Box */}
          <div className="p-3.5 bg-white/5 rounded-2xl border border-cream/10 space-y-2 text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e89d67] block">
              Annual Earnings Run-Rate ({monthlyProjects * 12} Projects/Yr)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-cream/60 block">Annual Gross:</span>
                <strong className="text-white">{currency}{annualGross.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
              </div>
              <div>
                <span className="text-cream/60 block">Annual Net:</span>
                <strong className="text-emerald-300">{currency}{annualNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
              </div>
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
