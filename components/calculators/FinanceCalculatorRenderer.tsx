"use client";

import React, { useState, useMemo } from "react";
import { formatINR } from "@/lib/formatters";
import {
  calculateEMI,
  calculateGST,
  calculateSIP,
  calculateIncomeTax,
  calculateSalary,
  calculateFD,
  calculatePPF,
  calculateEPF,
  calculateRD,
  calculateNPS,
  calculateHRA,
  calculateGratuity,
  calculateTDS,
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateLumpsum,
  calculateCAGR,
  calculateInflation,
  calculateROI,
  calculateTaxSavings,
  calculateSavingsGoal,
} from "@/lib/calculators/finance";
import { Copy, Check, Share2, RotateCcw, AlertCircle } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function FinanceCalculatorRenderer({ slug, name }: Props) {
  const [val1, setVal1] = useState<number>(() => {
    if (slug.includes("gst")) return 50000;
    if (slug.includes("sip")) return 10000;
    if (slug.includes("salary") || slug.includes("income-tax")) return 1200000;
    if (slug.includes("cagr")) return 100000;
    return 2500000; // default loan/lumpsum
  });

  const [val2, setVal2] = useState<number>(() => {
    if (slug.includes("gst")) return 18;
    if (slug.includes("sip")) return 12;
    if (slug.includes("cagr")) return 250000;
    return 8.5; // default interest rate
  });

  const [val3, setVal3] = useState<number>(() => {
    if (slug.includes("gst")) return 0; // 0 = exclusive, 1 = inclusive
    if (slug.includes("cagr")) return 5; // years
    return 20; // default tenure years
  });

  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    switch (slug) {
      case "emi-calculator":
      case "home-loan-emi-calculator":
      case "car-loan-emi-calculator":
      case "personal-loan-emi-calculator":
      case "loan-calculator":
        return calculateEMI(val1, val2, val3);

      case "gst-calculator":
        return calculateGST(val1, val2, val3 === 1);

      case "sip-calculator":
        return calculateSIP(val1, val2, val3);

      case "income-tax-calculator":
        return calculateIncomeTax(val1);

      case "salary-calculator":
        return calculateSalary(val1);

      case "fd-calculator":
        return calculateFD(val1, val2, val3);

      case "ppf-calculator":
        return calculatePPF(val1, val2 || 7.1, val3 || 15);

      case "epf-calculator":
        return calculateEPF(val1, 12, val2 || 8.25, val3 || 25);

      case "rd-calculator":
        return calculateRD(val1, val2, val3 || 36);

      case "nps-calculator":
        return calculateNPS(val1, val2 || 10, 30, (val3 || 30) + 30);

      case "hra-calculator":
        return calculateHRA(val1, val2, val3, true);

      case "gratuity-calculator":
        return calculateGratuity(val1, 0, val2);

      case "tds-calculator":
        return calculateTDS(val1, val2);

      case "simple-interest-calculator":
        return calculateSimpleInterest(val1, val2, val3);

      case "compound-interest-calculator":
        return calculateCompoundInterest(val1, val2, val3);

      case "lumpsum-calculator":
        return calculateLumpsum(val1, val2, val3);

      case "cagr-calculator":
        return calculateCAGR(val1, val2, val3);

      case "inflation-calculator":
        return calculateInflation(val1, val2, val3);

      case "roi-calculator":
        return calculateROI(val1, val2);

      case "tax-savings-calculator":
        return calculateTaxSavings(val1, val2, val3, 30);

      case "savings-goal-calculator":
        return calculateSavingsGoal(val1, val2, val3);

      default:
        return calculateEMI(val1, val2, val3);
    }
  }, [slug, val1, val2, val3]);

  const handleCopy = () => {
    const text = `${name} Results:\n${result.primaryLabel}: ${result.primaryValue}\n` +
      result.metrics.map((m) => `${m.label}: ${m.value}`).join("\n") +
      `\nCalculated on MyCalculators.xyz`;

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
          text: `${result.primaryLabel}: ${result.primaryValue}`,
          url: window.location.href,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const handleReset = () => {
    setVal1(slug.includes("gst") ? 50000 : slug.includes("sip") ? 10000 : 2500000);
    setVal2(slug.includes("gst") ? 18 : slug.includes("sip") ? 12 : 8.5);
    setVal3(slug.includes("gst") ? 0 : 20);
  };

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Finance Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
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
          {/* Field 1 */}
          <div>
            <label className="block font-bold text-sm text-navy mb-2">
              {slug.includes("gst")
                ? "Total Amount"
                : slug.includes("sip") || slug.includes("rd")
                ? "Monthly Investment Amount (₹)"
                : slug.includes("salary") || slug.includes("income-tax")
                ? "Annual Gross CTC / Salary (₹)"
                : slug.includes("cagr")
                ? "Initial Investment Valuation (₹)"
                : slug.includes("inflation")
                ? "Current Cost / Living Expense (₹)"
                : slug.includes("savings-goal")
                ? "Target Corpus Amount (₹)"
                : "Principal Amount (₹)"}
            </label>
            <input
              type="number"
              value={val1 || ""}
              onChange={(e) => setVal1(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
            />
          </div>

          {/* Field 2 */}
          <div>
            <label className="block font-bold text-sm text-navy mb-2">
              {slug.includes("gst")
                ? "GST Rate (%)"
                : slug.includes("cagr")
                ? "Final Target Valuation (₹)"
                : slug.includes("salary")
                ? "Annual Performance Bonus (₹)"
                : slug.includes("gratuity")
                ? "Total Years of Service"
                : slug.includes("savings-goal")
                ? "Target Tenure (Years)"
                : "Annual Rate of Interest / Return (%)"}
            </label>
            <input
              type="number"
              step="0.1"
              value={val2 || ""}
              onChange={(e) => setVal2(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
            />
          </div>

          {/* Field 3 (Conditional) */}
          {!slug.includes("income-tax") && !slug.includes("salary") && !slug.includes("gratuity") && !slug.includes("roi") && !slug.includes("tds") && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">
                {slug.includes("gst")
                  ? "Calculation Type"
                  : slug.includes("cagr") || slug.includes("inflation")
                  ? "Time Horizon (Years)"
                  : slug.includes("savings-goal")
                  ? "Expected Annual Return (%)"
                  : "Tenure Duration (Years)"}
              </label>

              {slug.includes("gst") ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVal3(0)}
                    className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all border ${
                      val3 === 0
                        ? "bg-navy text-cream border-navy shadow-sm"
                        : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                    }`}
                  >
                    GST Exclusive (+GST)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVal3(1)}
                    className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all border ${
                      val3 === 1
                        ? "bg-navy text-cream border-navy shadow-sm"
                        : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                    }`}
                  >
                    GST Inclusive (-GST)
                  </button>
                </div>
              ) : (
                <input
                  type="number"
                  value={val3 || ""}
                  onChange={(e) => setVal3(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
                />
              )}
            </div>
          )}
        </div>

        {/* Right Output Box */}
        <div className="lg:col-span-5 bg-sage/35 rounded-2xl p-5 sm:p-6 border border-navy/15 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-1">
              {result.primaryLabel}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-navy mb-6 tracking-tight">
              {result.primaryValue}
            </div>

            <div className="space-y-3 text-sm border-t border-navy/10 pt-4">
              {result.metrics.map((m, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-navy/75 font-medium">{m.label}:</span>
                  <span className={`font-bold ${m.highlight ? "text-[#b36932]" : "text-navy"}`}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Visual ratio bar */}
            {result.breakdown && result.breakdown.length === 2 && (
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-navy/70 mb-1.5">
                  <span>{result.breakdown[0].label} ({result.breakdown[0].percentage}%)</span>
                  <span>{result.breakdown[1].label} ({result.breakdown[1].percentage}%)</span>
                </div>
                <div className="h-3 w-full bg-sand rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${result.breakdown[0].percentage}%` }}
                    className={`${result.breakdown[0].colorClass} h-full transition-all duration-300`}
                  />
                </div>
              </div>
            )}
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

      {/* Schedule Table Preview */}
      {result.table && (
        <div className="mt-8 pt-6 border-t border-navy/10">
          <h3 className="font-bold text-navy text-sm mb-3">Amortization Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-sage/50 text-navy border-b border-navy/20">
                  {result.table.headers.map((h, i) => (
                    <th key={i} className="p-2.5 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {result.table.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cream/40">
                    {row.map((col, cIdx) => (
                      <td key={cIdx} className="p-2.5 font-medium text-navy/90">{col}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
