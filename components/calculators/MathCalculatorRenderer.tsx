"use client";

import React, { useState, useMemo } from "react";
import {
  calculatePercentage,
  calculatePercentageIncrease,
  calculatePercentageDecrease,
  calculateDiscount,
  calculateProfitLoss,
  calculateAverage,
  calculateRatio,
  calculateMarkup,
  calculateMargin,
} from "@/lib/calculators/math";
import { Copy, Check, Share2, RotateCcw } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function MathCalculatorRenderer({ slug, name }: Props) {
  const [mode, setMode] = useState<number>(1);
  const [val1, setVal1] = useState<number>(() => {
    if (slug === "discount-calculator") return 1500;
    if (slug.includes("markup") || slug.includes("margin") || slug.includes("profit") || slug.includes("loss")) return 500;
    if (slug === "ratio-calculator") return 16;
    return 25; // default percentage
  });

  const [val2, setVal2] = useState<number>(() => {
    if (slug === "discount-calculator") return 20;
    if (slug.includes("profit") || slug.includes("loss") || slug.includes("margin")) return 750;
    if (slug === "ratio-calculator") return 9;
    return 200;
  });

  const [textInput, setTextInput] = useState<string>("12, 25, 34, 48, 56, 72, 89, 94");
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    switch (slug) {
      case "percentage-calculator":
        return calculatePercentage(mode, val1, val2);
      case "percentage-increase-calculator":
        return calculatePercentageIncrease(val1, val2);
      case "percentage-decrease-calculator":
        return calculatePercentageDecrease(val1, val2);
      case "discount-calculator":
        return calculateDiscount(val1, val2);
      case "profit-calculator":
      case "loss-calculator":
      case "profit-loss-calculator":
        return calculateProfitLoss(val1, val2);
      case "average-calculator":
        return calculateAverage(textInput);
      case "ratio-calculator":
        return calculateRatio(val1, val2);
      case "markup-calculator":
        return calculateMarkup(val1, val2);
      case "margin-calculator":
        return calculateMargin(val1, val2);
      default:
        return calculatePercentage(1, val1, val2);
    }
  }, [slug, mode, val1, val2, textInput]);

  const handleCopy = () => {
    const text = `${name} Result:\n${result.primaryLabel}: ${result.primaryValue}\n` +
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
    setVal1(slug === "discount-calculator" ? 1500 : 25);
    setVal2(slug === "discount-calculator" ? 20 : 200);
    setTextInput("12, 25, 34, 48, 56, 72, 89, 94");
    setMode(1);
  };

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Math Engine
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

      {/* Percentage Mode Switcher */}
      {slug === "percentage-calculator" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6 p-1.5 bg-sage/30 rounded-2xl border border-navy/10">
          <button
            type="button"
            onClick={() => setMode(1)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 1 ? "bg-navy text-cream shadow-sm" : "text-navy/70 hover:text-navy"
            }`}
          >
            What is X% of Y?
          </button>
          <button
            type="button"
            onClick={() => setMode(2)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 2 ? "bg-navy text-cream shadow-sm" : "text-navy/70 hover:text-navy"
            }`}
          >
            X is what % of Y?
          </button>
          <button
            type="button"
            onClick={() => setMode(3)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 3 ? "bg-navy text-cream shadow-sm" : "text-navy/70 hover:text-navy"
            }`}
          >
            % Change from X to Y
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {slug === "average-calculator" ? (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">
                Enter Numbers (separated by commas or spaces)
              </label>
              <textarea
                rows={4}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="e.g. 10, 20, 35, 45, 90"
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  {slug === "percentage-calculator"
                    ? mode === 1 ? "Percentage (X %)" : "Part Value (X)"
                    : slug === "discount-calculator"
                    ? "Original Price (₹)"
                    : slug.includes("markup")
                    ? "Cost Price (₹)"
                    : slug.includes("profit") || slug.includes("loss") || slug.includes("margin")
                    ? "Cost Price (₹)"
                    : slug === "ratio-calculator"
                    ? "First Quantity (A)"
                    : "Base Original Value"}
                </label>
                <input
                  type="number"
                  value={val1 || ""}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  {slug === "percentage-calculator"
                    ? mode === 1 ? "Base Total (Y)" : "Total Whole (Y)"
                    : slug === "discount-calculator"
                    ? "Discount Rate (%)"
                    : slug.includes("markup")
                    ? "Markup Percentage (%)"
                    : slug.includes("profit") || slug.includes("loss") || slug.includes("margin")
                    ? "Selling Price (₹)"
                    : slug === "ratio-calculator"
                    ? "Second Quantity (B)"
                    : "Rate / Second Value (%)"}
                </label>
                <input
                  type="number"
                  value={val2 || ""}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
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
