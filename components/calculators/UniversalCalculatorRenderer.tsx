"use client";

import React, { useState, useMemo } from "react";
import { calculateUniversal } from "@/lib/calculators/allEngines";
import { Copy, Check, Share2, RotateCcw } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function UniversalCalculatorRenderer({ slug, name }: Props) {
  const [v1, setV1] = useState<number>(() => {
    if (slug === "bmi-calculator") return 70;
    if (slug.includes("calorie") || slug.includes("bmr")) return 70;
    if (slug === "roas-calculator") return 150000;
    if (slug === "cgpa-to-percentage") return 8.5;
    if (slug === "celsius-to-fahrenheit") return 37;
    if (slug === "fuel-cost-calculator") return 300;
    return 100;
  });

  const [v2, setV2] = useState<number>(() => {
    if (slug === "bmi-calculator") return 175;
    if (slug.includes("calorie") || slug.includes("bmr")) return 175;
    if (slug === "roas-calculator") return 30000;
    if (slug === "celsius-to-fahrenheit") return 0;
    if (slug === "fuel-cost-calculator") return 18;
    return 10;
  });

  const [v3, setV3] = useState<number>(() => {
    if (slug.includes("calorie") || slug.includes("bmr")) return 28;
    if (slug === "fuel-cost-calculator") return 102;
    return 0;
  });

  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateUniversal(slug, v1, v2, v3);
  }, [slug, v1, v2, v3]);

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
    setV1(slug === "bmi-calculator" ? 70 : 100);
    setV2(slug === "bmi-calculator" ? 175 : 10);
    setV3(0);
  };

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Interactive Calculator
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
          <div>
            <label className="block font-bold text-sm text-navy mb-2">
              {slug === "bmi-calculator" || slug.includes("calorie") || slug.includes("water")
                ? "Body Weight (kg)"
                : slug === "cgpa-to-percentage"
                ? "Enter CGPA (0 - 10 Scale)"
                : slug === "percentage-to-cgpa"
                ? "Enter Percentage (%)"
                : slug === "roas-calculator"
                ? "Total Campaign Revenue (₹)"
                : slug === "celsius-to-fahrenheit"
                ? "Temperature in Celsius (°C)"
                : slug === "fahrenheit-to-celsius"
                ? "Temperature in Fahrenheit (°F)"
                : slug === "fuel-cost-calculator"
                ? "Total Distance (km)"
                : slug === "electricity-bill-calculator"
                ? "Total Power Rating (Watts)"
                : slug === "tip-calculator"
                ? "Total Bill Amount (₹)"
                : "Primary Input Value"}
            </label>
            <input
              type="number"
              step="any"
              value={v1 || ""}
              onChange={(e) => setV1(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
            />
          </div>

          {!slug.includes("cgpa") && !slug.includes("water") && !slug.includes("to-") && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">
                {slug === "bmi-calculator" || slug.includes("calorie")
                  ? "Height (cm)"
                  : slug === "roas-calculator"
                  ? "Total Ad Spend (₹)"
                  : slug === "fuel-cost-calculator"
                  ? "Vehicle Mileage (km / Liter)"
                  : slug === "electricity-bill-calculator"
                  ? "Hours Used Per Day"
                  : slug === "tip-calculator"
                  ? "Tip Percentage (%)"
                  : "Secondary Value"}
              </label>
              <input
                type="number"
                step="any"
                value={v2 || ""}
                onChange={(e) => setV2(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>
          )}

          {(slug.includes("calorie") || slug === "fuel-cost-calculator" || slug === "electricity-bill-calculator" || slug === "tip-calculator") && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">
                {slug.includes("calorie")
                  ? "Age (Years)"
                  : slug === "fuel-cost-calculator"
                  ? "Fuel Price (₹ / Liter)"
                  : slug === "electricity-bill-calculator"
                  ? "Electricity Tariff (₹ / Unit kWh)"
                  : "Number of People Sharing"}
              </label>
              <input
                type="number"
                step="any"
                value={v3 || ""}
                onChange={(e) => setV3(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
              />
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
