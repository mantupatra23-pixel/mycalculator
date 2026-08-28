"use client";

import React, { useState, useMemo } from "react";
import {
  calculateLoanEMI,
  calculateSIP,
  calculateGST,
  calculateFD,
  calculateRD,
  calculateCompoundInterest,
  calculateLTV,
} from "@/lib/calculators/finance";
import { formatINR } from "@/lib/formatters";
import { Copy, Check, Share2, RotateCcw, Table, ChevronDown } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function FinanceCalculatorRenderer({ slug, name }: Props) {
  // Common states
  const [principal, setPrincipal] = useState<number>(() => {
    if (slug === "ltv-calculator") return 5000000; // Property Value
    if (slug.includes("home-loan")) return 3500000;
    if (slug.includes("car-loan")) return 800000;
    if (slug.includes("personal-loan")) return 300000;
    if (slug === "emi-calculator" || slug.includes("loan")) return 2500000;
    if (slug === "sip-calculator" || slug.includes("sip") || slug.includes("mutual")) return 10000;
    if (slug === "gst-calculator") return 50000;
    if (slug === "fd-calculator") return 200000;
    if (slug === "rd-calculator") return 5000;
    return 100000;
  });

  const [rate, setRate] = useState<number>(() => {
    if (slug === "ltv-calculator") return 4000000; // Loan Amount
    if (slug.includes("home-loan")) return 8.5;
    if (slug.includes("car-loan")) return 9.2;
    if (slug.includes("personal-loan")) return 13.5;
    if (slug === "emi-calculator" || slug.includes("loan")) return 8.5;
    if (slug === "sip-calculator" || slug.includes("sip")) return 12;
    if (slug === "gst-calculator") return 18;
    if (slug === "fd-calculator") return 7.1;
    if (slug === "rd-calculator") return 6.8;
    return 10;
  });

  const [tenure, setTenure] = useState<number>(() => {
    if (slug.includes("home-loan") || slug === "emi-calculator") return 20;
    if (slug.includes("car-loan")) return 5;
    if (slug.includes("personal-loan")) return 3;
    if (slug === "sip-calculator") return 15;
    if (slug === "fd-calculator") return 5;
    if (slug === "rd-calculator") return 36;
    return 10;
  });

  const [isGstExclusive, setIsGstExclusive] = useState<boolean>(true);
  const [isInterState, setIsInterState] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showFullTable, setShowFullTable] = useState<boolean>(true);

  // Compute results
  const result = useMemo(() => {
    if (slug === "ltv-calculator") {
      return calculateLTV(principal, rate);
    }
    if (slug.includes("loan") || slug === "emi-calculator" || slug.includes("mortgage")) {
      return calculateLoanEMI(principal, rate, tenure);
    }
    if (slug === "sip-calculator" || slug.includes("sip") || slug.includes("mutual-fund")) {
      return calculateSIP(principal, rate, tenure);
    }
    if (slug === "gst-calculator") {
      return calculateGST(principal, rate, isGstExclusive, isInterState);
    }
    if (slug === "fd-calculator" || slug.includes("fixed-deposit")) {
      return calculateFD(principal, rate, tenure);
    }
    if (slug === "rd-calculator" || slug.includes("recurring-deposit")) {
      return calculateRD(principal, rate, tenure);
    }
    if (slug === "compound-interest-calculator") {
      return calculateCompoundInterest(principal, rate, tenure);
    }
    return calculateLoanEMI(principal, rate, tenure);
  }, [slug, principal, rate, tenure, isGstExclusive, isInterState]);

  const handleCopy = () => {
    const text =
      `MyCalculators - ${name}\n` +
      `${result.primaryLabel}: ${result.primaryValue}\n` +
      result.metrics.map((m) => `${m.label}: ${m.value}`).join("\n") +
      `\nCalculated on https://mycalculators.xyz/calculators/${slug}`;

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
    if (slug === "ltv-calculator") {
      setPrincipal(5000000);
      setRate(4000000);
    } else {
      setPrincipal(slug === "emi-calculator" ? 2500000 : 10000);
      setRate(slug === "emi-calculator" ? 8.5 : 12);
      setTenure(slug === "emi-calculator" ? 20 : 15);
    }
  };

  const isLtv = slug === "ltv-calculator";
  const isLoanType = slug.includes("loan") || slug === "emi-calculator" || slug.includes("mortgage");
  const isSipType = slug === "sip-calculator" || slug.includes("sip") || slug.includes("mutual");
  const isGst = slug === "gst-calculator";

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-navy/10">
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
          {/* LTV Calculator Specific Inputs */}
          {isLtv ? (
            <>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-sm text-navy">Property / Asset Estimated Value (₹)</label>
                  <span className="text-xs font-extrabold text-navy bg-sand/30 px-2.5 py-1 rounded-md">
                    {formatINR(principal)}
                  </span>
                </div>
                <input
                  type="number"
                  min="100000"
                  step="50000"
                  value={principal || ""}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
                />
                <input
                  type="range"
                  min="500000"
                  max="20000000"
                  step="100000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full accent-steel cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-sm text-navy">Loan Amount Requested (₹)</label>
                  <span className="text-xs font-extrabold text-navy bg-sand/30 px-2.5 py-1 rounded-md">
                    {formatINR(rate)}
                  </span>
                </div>
                <input
                  type="number"
                  min="50000"
                  step="50000"
                  value={rate || ""}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
                />
                <input
                  type="range"
                  min="500000"
                  max={principal || 20000000}
                  step="50000"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-steel cursor-pointer"
                />
              </div>
            </>
          ) : (
            <>
              {/* Principal / Investment Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-sm text-navy">
                    {isLoanType
                      ? "Principal Loan Amount (₹)"
                      : isSipType
                      ? "Monthly Investment Amount (₹)"
                      : isGst
                      ? "Base Amount (₹)"
                      : "Principal Deposit Amount (₹)"}
                  </label>
                  <span className="text-xs font-extrabold text-navy bg-sand/30 px-2.5 py-1 rounded-md">
                    {formatINR(principal)}
                  </span>
                </div>
                <input
                  type="number"
                  min="1000"
                  max="50000000"
                  value={principal || ""}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
                />
                <input
                  type="range"
                  min={isSipType ? "500" : "50000"}
                  max={isSipType ? "200000" : "20000000"}
                  step={isSipType ? "500" : "25000"}
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full accent-steel cursor-pointer"
                />
              </div>

              {/* Interest / Return Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-sm text-navy">
                    {isLoanType
                      ? "Annual Interest Rate (%)"
                      : isSipType
                      ? "Expected Annual Return Rate (%)"
                      : isGst
                      ? "GST Tax Slab (%)"
                      : "Interest Rate (% p.a.)"}
                  </label>
                  <span className="text-xs font-extrabold text-navy bg-sand/30 px-2.5 py-1 rounded-md">
                    {rate}%
                  </span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="50"
                  value={rate || ""}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
                />
                {isGst ? (
                  <div className="flex gap-2 mt-2">
                    {[5, 12, 18, 28].map((gstVal) => (
                      <button
                        key={gstVal}
                        type="button"
                        onClick={() => setRate(gstVal)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                          rate === gstVal
                            ? "bg-navy text-cream border-navy shadow-sm"
                            : "bg-sage/30 text-navy border-navy/15 hover:bg-sage"
                        }`}
                      >
                        {gstVal}% GST
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-steel cursor-pointer"
                  />
                )}
              </div>

              {/* Tenure Slider */}
              {!isGst && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-bold text-sm text-navy">
                      Tenure Duration ({slug === "rd-calculator" ? "Months" : "Years"})
                    </label>
                    <span className="text-xs font-extrabold text-navy bg-sand/30 px-2.5 py-1 rounded-md">
                      {tenure} {slug === "rd-calculator" ? "Months" : "Years"} ({tenure * 12} Months)
                    </span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={slug === "rd-calculator" ? "120" : "40"}
                    value={tenure || ""}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
                  />
                  <input
                    type="range"
                    min="1"
                    max={slug === "rd-calculator" ? "120" : "30"}
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-steel cursor-pointer"
                  />
                </div>
              )}

              {/* GST Toggles */}
              {isGst && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsGstExclusive(true)}
                      className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                        isGstExclusive ? "bg-navy text-cream border-navy shadow-sm" : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                      }`}
                    >
                      GST Exclusive (+ Add)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsGstExclusive(false)}
                      className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                        !isGstExclusive ? "bg-navy text-cream border-navy shadow-sm" : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                      }`}
                    >
                      GST Inclusive (- Extract)
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsInterState(false)}
                      className={`py-2 px-3 rounded-lg font-bold text-xs border transition-all ${
                        !isInterState ? "bg-steel text-white border-steel" : "bg-white text-navy border-navy/15"
                      }`}
                    >
                      Intra-State (CGST + SGST)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsInterState(true)}
                      className={`py-2 px-3 rounded-lg font-bold text-xs border transition-all ${
                        isInterState ? "bg-steel text-white border-steel" : "bg-white text-navy border-navy/15"
                      }`}
                    >
                      Inter-State (IGST)
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Output Box */}
        <div className="lg:col-span-5 bg-sage/35 rounded-2xl p-5 sm:p-6 border border-navy/15 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-1">
              {result.primaryLabel}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-navy mb-4 tracking-tight">
              {result.primaryValue}
            </div>

            {/* Visual Ratio Bar */}
            {result.breakdown && (
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-bold text-navy/75">
                  <span>{isLtv ? `Loan (${result.breakdown.principalPct}%)` : `Principal (${result.breakdown.principalPct}%)`}</span>
                  <span>{isLtv ? `Equity (${result.breakdown.interestPct}%)` : `Interest (${result.breakdown.interestPct}%)`}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-sand/30 overflow-hidden flex">
                  <div
                    className="h-full bg-steel transition-all duration-300"
                    style={{ width: `${result.breakdown.principalPct}%` }}
                  />
                  <div
                    className="h-full bg-[#b36932] transition-all duration-300"
                    style={{ width: `${result.breakdown.interestPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Metrics List */}
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

      {/* FULL AMORTIZATION SCHEDULE FOR LOANS & SIP */}
      {result.table && (
        <div className="pt-6 border-t border-navy/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-steel" />
              <h3 className="font-black text-lg text-navy">
                Complete Repayment Schedule ({result.table.rows.length} Years Full Report)
              </h3>
            </div>
            <button
              onClick={() => setShowFullTable((prev) => !prev)}
              className="text-xs font-bold text-steel hover:text-navy flex items-center gap-1"
            >
              {showFullTable ? "Collapse Table" : "Expand Table"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFullTable ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFullTable && (
            <div className="border border-navy/15 rounded-2xl overflow-hidden shadow-sm">
              <div className="max-h-[460px] overflow-y-auto overflow-x-auto scrollbar-thin">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead className="bg-sage/50 text-navy font-black sticky top-0 z-10 border-b border-navy/15">
                    <tr>
                      {result.table.headers.map((h, i) => (
                        <th key={i} className="py-3 px-4 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/10 text-navy/85 font-medium bg-white">
                    {result.table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? "bg-white hover:bg-sage/15" : "bg-sage/10 hover:bg-sage/20"}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3 px-4 whitespace-nowrap ${
                              cIdx === 0 ? "font-bold text-navy" : ""
                            } ${cIdx === 3 ? "text-[#b36932] font-semibold" : ""}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
