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
import { Copy, Check, Share2, RotateCcw, Percent, Tag, TrendingUp, BarChart3, Scale } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function MathCalculatorRenderer({ slug, name }: Props) {
  // Percentage State
  const [pctMode, setPctMode] = useState<number>(1);
  const [pctX, setPctX] = useState<number>(20);
  const [pctY, setPctY] = useState<number>(500);

  // Discount State
  const [origPrice, setOrigPrice] = useState<number>(2499);
  const [discountRate, setDiscountRate] = useState<number>(25);
  const [additionalOff, setAdditionalOff] = useState<number>(10);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [hasExtraCoupon, setHasExtraCoupon] = useState<boolean>(false);

  // Profit / Loss / Margin / Markup
  const [costPrice, setCostPrice] = useState<number>(800);
  const [sellingPrice, setSellingPrice] = useState<number>(1200);
  const [unitsQty, setUnitsQty] = useState<number>(1);
  const [markupPct, setMarkupPct] = useState<number>(50);

  // Ratio State
  const [ratioA, setRatioA] = useState<number>(16);
  const [ratioB, setRatioB] = useState<number>(9);
  const [ratioScale, setRatioScale] = useState<number>(1);

  // Statistics / Average State
  const [avgInput, setAvgInput] = useState<string>("15, 28, 35, 42, 58, 64, 75, 89, 94");

  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    switch (slug) {
      case "percentage-calculator":
        return calculatePercentage(pctMode, pctX, pctY);

      case "percentage-increase-calculator":
        return calculatePercentageIncrease(pctX, pctY);

      case "percentage-decrease-calculator":
        return calculatePercentageDecrease(pctX, pctY);

      case "discount-calculator":
        return calculateDiscount(
          origPrice,
          discountRate,
          hasExtraCoupon ? additionalOff : 0,
          taxRate
        );

      case "profit-calculator":
      case "loss-calculator":
      case "profit-loss-calculator":
        return calculateProfitLoss(costPrice, sellingPrice, unitsQty);

      case "average-calculator":
        return calculateAverage(avgInput);

      case "ratio-calculator":
        return calculateRatio(ratioA, ratioB, ratioScale);

      case "markup-calculator":
        return calculateMarkup(costPrice, markupPct);

      case "margin-calculator":
        return calculateMargin(costPrice, sellingPrice);

      default:
        return calculatePercentage(1, pctX, pctY);
    }
  }, [
    slug,
    pctMode,
    pctX,
    pctY,
    origPrice,
    discountRate,
    additionalOff,
    taxRate,
    hasExtraCoupon,
    costPrice,
    sellingPrice,
    unitsQty,
    markupPct,
    ratioA,
    ratioB,
    ratioScale,
    avgInput,
  ]);

  const handleCopy = () => {
    const text =
      `${name} Results:\n${result.primaryLabel}: ${result.primaryValue}\n` +
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
    setPctMode(1);
    setPctX(20);
    setPctY(500);
    setOrigPrice(2499);
    setDiscountRate(25);
    setAdditionalOff(10);
    setTaxRate(0);
    setHasExtraCoupon(false);
    setCostPrice(800);
    setSellingPrice(1200);
    setUnitsQty(1);
    setMarkupPct(50);
    setRatioA(16);
    setRatioB(9);
    setRatioScale(1);
    setAvgInput("15, 28, 35, 42, 58, 64, 75, 89, 94");
  };

  const isPercentage = slug === "percentage-calculator";
  const isPctInc = slug === "percentage-increase-calculator";
  const isPctDec = slug === "percentage-decrease-calculator";
  const isDiscount = slug === "discount-calculator";
  const isProfitLoss = slug.includes("profit") || slug.includes("loss");
  const isAverage = slug === "average-calculator";
  const isRatio = slug === "ratio-calculator";
  const isMarkup = slug === "markup-calculator";
  const isMargin = slug === "margin-calculator";

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Math & Trade Engine
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

      {/* Mode Switcher for Main Percentage Calculator */}
      {isPercentage && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6 p-1.5 bg-sage/30 rounded-2xl border border-navy/10">
          <button
            type="button"
            onClick={() => setPctMode(1)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              pctMode === 1 ? "bg-navy text-cream shadow-sm" : "text-navy/70 hover:text-navy"
            }`}
          >
            What is X% of Y?
          </button>
          <button
            type="button"
            onClick={() => setPctMode(2)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              pctMode === 2 ? "bg-navy text-cream shadow-sm" : "text-navy/70 hover:text-navy"
            }`}
          >
            X is what % of Y?
          </button>
          <button
            type="button"
            onClick={() => setPctMode(3)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              pctMode === 3 ? "bg-navy text-cream shadow-sm" : "text-navy/70 hover:text-navy"
            }`}
          >
            % Change from X to Y
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Percentage Inputs */}
          {(isPercentage || isPctInc || isPctDec) && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  {isPercentage
                    ? pctMode === 1
                      ? "Percentage Rate (X %)"
                      : pctMode === 2
                      ? "Part Quantity (X)"
                      : "Initial Value (From X)"
                    : isPctInc || isPctDec
                    ? "Original Base Amount"
                    : "Primary Value"}
                </label>
                <input
                  type="number"
                  step="any"
                  value={pctX || ""}
                  onChange={(e) => setPctX(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  {isPercentage
                    ? pctMode === 1
                      ? "Total Base Value (Y)"
                      : pctMode === 2
                      ? "Total Whole Base (Y)"
                      : "Final Value (To Y)"
                    : isPctInc
                    ? "Percentage Increase (+ %)"
                    : "Percentage Decrease (- %)"}
                </label>
                <input
                  type="number"
                  step="any"
                  value={pctY || ""}
                  onChange={(e) => setPctY(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {/* 2. Discount Calculator Inputs */}
          {isDiscount && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  Original Price (₹ MRP)
                </label>
                <input
                  type="number"
                  min="0"
                  value={origPrice || ""}
                  onChange={(e) => setOrigPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  Discount Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountRate || ""}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
                {/* Quick % buttons */}
                <div className="flex gap-2 mt-2">
                  {[10, 15, 20, 25, 30, 50].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setDiscountRate(rate)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        discountRate === rate ? "bg-steel text-white" : "bg-sage/40 text-navy hover:bg-sage"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="couponCheck"
                  checked={hasExtraCoupon}
                  onChange={(e) => setHasExtraCoupon(e.target.checked)}
                  className="w-4 h-4 rounded accent-steel cursor-pointer"
                />
                <label htmlFor="couponCheck" className="text-xs sm:text-sm font-bold text-navy cursor-pointer">
                  Add Additional Coupon Discount (e.g. +10% OFF)
                </label>
              </div>

              {hasExtraCoupon && (
                <div>
                  <label className="block font-bold text-xs sm:text-sm text-navy mb-2">
                    Additional Coupon / Card Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={additionalOff || ""}
                    onChange={(e) => setAdditionalOff(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              )}
            </>
          )}

          {/* 3. Profit, Loss, Margin Inputs */}
          {(isProfitLoss || isMargin) && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Cost Price (CP) (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={costPrice || ""}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Selling Price (SP) (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={sellingPrice || ""}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              {isProfitLoss && (
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Total Units / Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={unitsQty || ""}
                    onChange={(e) => setUnitsQty(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              )}
            </>
          )}

          {/* 4. Markup Calculator Inputs */}
          {isMarkup && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Base Cost Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={costPrice || ""}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Markup Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  value={markupPct || ""}
                  onChange={(e) => setMarkupPct(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {/* 5. Ratio Calculator Inputs */}
          {isRatio && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Quantity A</label>
                  <input
                    type="number"
                    step="any"
                    value={ratioA || ""}
                    onChange={(e) => setRatioA(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Quantity B</label>
                  <input
                    type="number"
                    step="any"
                    value={ratioB || ""}
                    onChange={(e) => setRatioB(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-xs sm:text-sm text-navy mb-2">
                  Scale Multiplier ({ratioScale}x)
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={ratioScale}
                  onChange={(e) => setRatioScale(Number(e.target.value))}
                  className="w-full accent-steel cursor-pointer"
                />
              </div>

              {/* Visual Proportion Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-bold text-navy/70">
                  <span>Part A ({((ratioA / (ratioA + ratioB || 1)) * 100).toFixed(0)}%)</span>
                  <span>Part B ({((ratioB / (ratioA + ratioB || 1)) * 100).toFixed(0)}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-sand/30 overflow-hidden flex">
                  <div
                    className="h-full bg-navy"
                    style={{ width: `${(ratioA / (ratioA + ratioB || 1)) * 100}%` }}
                  />
                  <div
                    className="h-full bg-steel"
                    style={{ width: `${(ratioB / (ratioA + ratioB || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 6. Average Calculator Inputs */}
          {isAverage && (
            <div className="space-y-3">
              <label className="block font-bold text-sm text-navy">
                Enter Number Sequence (separated by commas or spaces)
              </label>
              <textarea
                rows={4}
                value={avgInput}
                onChange={(e) => setAvgInput(e.target.value)}
                placeholder="e.g. 10, 25, 34, 56, 78, 90"
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
              />
              {/* Quick sample chips */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-navy/60 font-medium">Load sample:</span>
                <button
                  type="button"
                  onClick={() => setAvgInput("10, 20, 30, 40, 50, 60, 70, 80, 90, 100")}
                  className="px-2.5 py-1 rounded bg-sage/40 hover:bg-sage text-navy font-bold text-xs"
                >
                  1 to 100
                </button>
                <button
                  type="button"
                  onClick={() => setAvgInput("85, 92, 78, 95, 88, 76, 90")}
                  className="px-2.5 py-1 rounded bg-sage/40 hover:bg-sage text-navy font-bold text-xs"
                >
                  Exam Marks
                </button>
              </div>
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
