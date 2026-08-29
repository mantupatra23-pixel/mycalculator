"use client";

import React, { useState, useMemo } from "react";
import { calculateIncomeTaxDetailed } from "@/lib/calculators/tax";
import { formatINR } from "@/lib/formatters";
import { Disclaimer } from "@/components/Disclaimer";
import { Copy, Check, Share2, RotateCcw, Landmark, CheckCircle2 } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function TaxCalculatorRenderer({ slug, name }: Props) {
  const [ay, setAy] = useState<"AY2026_27" | "AY2025_26">("AY2026_27");
  const [income, setIncome] = useState<number>(1200000);
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [incomeType, setIncomeType] = useState<"salaried" | "business">("salaried");
  const [sec80C, setSec80C] = useState<number>(150000);
  const [sec80D, setSec80D] = useState<number>(25000);
  const [hra, setHra] = useState<number>(100000);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const b = useMemo(() => {
    return calculateIncomeTaxDetailed({
      assessmentYear: ay,
      annualIncome: income,
      regime,
      incomeType,
      deductions80C: sec80C,
      deductions80D: sec80D,
      hraExemption: hra,
      otherDeductions,
    });
  }, [ay, income, regime, incomeType, sec80C, sec80D, hra, otherDeductions]);

  const alt = useMemo(() => {
    return calculateIncomeTaxDetailed({
      assessmentYear: ay,
      annualIncome: income,
      regime: regime === "new" ? "old" : "new",
      incomeType,
      deductions80C: sec80C,
      deductions80D: sec80D,
      hraExemption: hra,
      otherDeductions,
    });
  }, [ay, income, regime, incomeType, sec80C, sec80D, hra, otherDeductions]);

  const handleCopy = () => {
    const text =
      `MyCalculators - ${name}\n` +
      `Assessment Year: ${ay.replace("_", "-")}\n` +
      `Tax Regime: ${regime.toUpperCase()} Regime\n` +
      `Gross Income: ${formatINR(b.grossIncome)}\n` +
      `Taxable Income: ${formatINR(b.taxableIncome)}\n` +
      `Base Slab Tax: ${formatINR(b.slabTax)}\n` +
      `Section 87A Rebate: -${formatINR(b.rebate87A)}\n` +
      `Final Estimated Tax: ${formatINR(b.finalTax)}\n` +
      `\nCalculated on https://www.mycalculator.xyz/calculators/income-tax-calculator`;

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
          title: `${name} - MyCalculators`,
          text: `Estimated Tax: ${formatINR(b.finalTax)} on Gross Income ${formatINR(b.grossIncome)}`,
          url: window.location.href,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white border-2 border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm space-y-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Direct Tax Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setAy("AY2026_27");
            setIncome(1200000);
            setRegime("new");
            setIncomeType("salaried");
            setSec80C(150000);
            setSec80D(25000);
            setHra(100000);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Assessment Year Selector */}
          <div>
            <label className="block font-bold text-sm text-navy mb-2">Select Assessment Year (AY)</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAy("AY2026_27")}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                  ay === "AY2026_27"
                    ? "bg-navy text-cream border-navy shadow-sm"
                    : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                }`}
              >
                AY 2026-27 (FY 2025-26)
              </button>
              <button
                type="button"
                onClick={() => setAy("AY2025_26")}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                  ay === "AY2025_26"
                    ? "bg-navy text-cream border-navy shadow-sm"
                    : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                }`}
              >
                AY 2025-26 (FY 2024-25)
              </button>
            </div>
          </div>

          {/* Tax Regime Selector */}
          <div>
            <label className="block font-bold text-sm text-navy mb-2">Choose Tax Regime</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRegime("new")}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                  regime === "new"
                    ? "bg-steel text-white border-steel shadow-sm"
                    : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                }`}
              >
                New Tax Regime (Revised)
              </button>
              <button
                type="button"
                onClick={() => setRegime("old")}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                  regime === "old"
                    ? "bg-steel text-white border-steel shadow-sm"
                    : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                }`}
              >
                Old Tax Regime (With 80C/HRA)
              </button>
            </div>
          </div>

          {/* Income Source Type */}
          <div>
            <label className="block font-bold text-sm text-navy mb-2">Income Nature</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIncomeType("salaried")}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all ${
                  incomeType === "salaried"
                    ? "bg-sage/60 text-navy border-navy/30"
                    : "bg-white text-navy/70 border-navy/15"
                }`}
              >
                Salaried (Standard Deduction Eligible)
              </button>
              <button
                type="button"
                onClick={() => setIncomeType("business")}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all ${
                  incomeType === "business"
                    ? "bg-sage/60 text-navy border-navy/30"
                    : "bg-white text-navy/70 border-navy/15"
                }`}
              >
                Business / Profession / Other
              </button>
            </div>
          </div>

          {/* Annual Income */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-sm text-navy">Total Annual Gross Income (₹)</label>
              <span className="text-xs font-extrabold text-navy bg-sand/30 px-2.5 py-1 rounded-md">
                {formatINR(income)}
              </span>
            </div>
            <input
              type="number"
              min="100000"
              max="50000000"
              step="25000"
              value={income || ""}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
            />
            <input
              type="range"
              min="300000"
              max="5000000"
              step="50000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full accent-steel cursor-pointer"
            />
          </div>

          {/* Deductions in Old Regime */}
          {regime === "old" ? (
            <div className="space-y-4 pt-4 border-t border-navy/10">
              <h3 className="font-bold text-xs uppercase tracking-wider text-navy/70">
                Eligible Tax Deductions (Old Regime)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-xs text-navy mb-1">Section 80C (PPF/ELSS/EPF) (Max ₹1.5L)</label>
                  <input
                    type="number"
                    max="150000"
                    value={sec80C}
                    onChange={(e) => setSec80C(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs text-navy mb-1">Section 80D (Health Insurance) (₹)</label>
                  <input
                    type="number"
                    max="100000"
                    value={sec80D}
                    onChange={(e) => setSec80D(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-xs text-navy mb-1">HRA Exemption / Home Loan Interest (₹)</label>
                <input
                  type="number"
                  value={hra}
                  onChange={(e) => setHra(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel"
                />
              </div>
            </div>
          ) : (
            <div className="bg-sage/20 border border-navy/10 rounded-2xl p-4 text-xs text-navy/80 space-y-1.5">
              <div className="font-bold text-navy flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-steel" /> AY 2026-27 Slabs & Section 87A Rebate
              </div>
              <p>
                Section 87A rebate can provide full tax relief for eligible resident individuals with total income up to ₹12,00,000, subject to applicable rules. For salaried taxpayers, standard deduction of ₹75,000 applies separately to reduce taxable income.
              </p>
            </div>
          )}
        </div>

        {/* Right Output Box */}
        <div className="lg:col-span-5 bg-sage/35 rounded-2xl p-5 sm:p-6 border border-navy/15 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-1">
              Estimated Tax Liability
            </div>
            <div className="text-3xl sm:text-4xl font-black text-navy mb-6 tracking-tight">
              {formatINR(Math.round(b.finalTax))}
            </div>

            <div className="space-y-2.5 text-sm border-t border-navy/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-navy/75 font-medium">Gross Annual Income:</span>
                <span className="font-bold text-navy">{formatINR(b.grossIncome)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy/75 font-medium">Standard Deduction:</span>
                <span className="font-bold text-navy">-{formatINR(b.standardDeduction)}</span>
              </div>
              {b.otherDeductions > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-navy/75 font-medium">Exemptions (80C/80D/HRA):</span>
                  <span className="font-bold text-navy">-{formatINR(b.otherDeductions)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-navy/75 font-medium">Net Taxable Income:</span>
                <span className="font-bold text-navy">{formatINR(b.taxableIncome)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy/75 font-medium">Base Computed Slab Tax:</span>
                <span className="font-bold text-navy">{formatINR(b.slabTax)}</span>
              </div>
              {b.rebate87A > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-navy/75 font-medium">Section 87A Tax Rebate:</span>
                  <span className="font-bold text-emerald-700">-{formatINR(b.rebate87A)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-navy/75 font-medium">Health & Education Cess (4%):</span>
                <span className="font-bold text-navy">{formatINR(Math.round(b.cess))}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-navy/10">
                <span className="text-navy font-bold">Effective Tax Rate:</span>
                <span className="font-extrabold text-steel">{b.effectiveRate.toFixed(2)}%</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-navy/10 bg-white/70 rounded-xl p-3.5 border border-navy/10">
              <div className="text-xs font-bold text-navy/60 uppercase">Alternative Regime Comparison</div>
              <div className="flex justify-between items-center mt-1 text-xs">
                <span className="font-semibold text-navy">
                  {regime === "new" ? "Old Regime Tax:" : "New Regime Tax:"}
                </span>
                <span className="font-extrabold text-navy">{formatINR(Math.round(alt.finalTax))}</span>
              </div>
            </div>
          </div>

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

      {/* Why This Result Breakdown */}
      <div className="bg-sage/20 border border-navy/10 rounded-2xl p-5 space-y-2 text-xs text-navy/80">
        <h4 className="font-bold text-navy text-sm flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-steel" /> Calculation Details & Explanation
        </h4>
        <ul className="list-disc pl-5 space-y-1">
          {b.explanation.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
          <li>
            Slab Tax = {formatINR(b.slabTax)}, 87A Rebate = -{formatINR(b.rebate87A)}, Net Tax after Rebate = {formatINR(b.taxAfterRebate)}, Cess (4%) = {formatINR(Math.round(b.cess))}.
          </li>
        </ul>
      </div>

      <Disclaimer type="tax" />
    </div>
  );
}
