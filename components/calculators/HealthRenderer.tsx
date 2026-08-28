"use client";

import React, { useState, useMemo } from "react";
import { formatNumberIN } from "@/lib/formatters";
import { Copy, Check, RotateCcw } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function HealthRenderer({ slug, name }: Props) {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [age, setAge] = useState<number>(28);
  const [calories, setCalories] = useState<number>(2000);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    if (slug === "bmi-calculator") {
      const hM = Math.max(1, height) / 100;
      const bmi = Math.max(1, weight) / (hM * hM);
      let cat = "Normal weight";
      if (bmi < 18.5) cat = "Underweight";
      else if (bmi >= 25 && bmi < 29.9) cat = "Overweight";
      else if (bmi >= 30) cat = "Obese";

      return {
        primaryLabel: "Your BMI Score",
        primaryValue: bmi.toFixed(1),
        metrics: [
          { label: "Category", value: cat, highlight: true },
          { label: "Weight", value: `${weight} kg` },
          { label: "Height", value: `${height} cm` },
          { label: "Healthy Range", value: "18.5 - 24.9" },
        ],
        summaryText: `Your BMI is ${bmi.toFixed(1)} (${cat}).`,
      };
    }

    if (slug === "bmr-calculator" || slug === "calorie-calculator") {
      const bmr = 10 * Math.max(1, weight) + 6.25 * Math.max(1, height) - 5 * Math.max(1, age) + 5;
      const maint = Math.round(bmr * 1.375);
      return {
        primaryLabel: slug === "bmr-calculator" ? "Basal Metabolic Rate (BMR)" : "Maintenance Calories",
        primaryValue: `${slug === "bmr-calculator" ? Math.round(bmr) : maint} kcal/day`,
        metrics: [
          { label: "BMR (Resting Burn)", value: `${Math.round(bmr)} kcal` },
          { label: "Mild Weight Loss (0.25kg/wk)", value: `${maint - 250} kcal`, highlight: true },
          { label: "Weight Loss (0.5kg/wk)", value: `${maint - 500} kcal` },
          { label: "Weight Gain (+0.5kg/wk)", value: `${maint + 400} kcal` },
        ],
        summaryText: `Resting burn is ${Math.round(bmr)} kcal, and daily maintenance target is ${maint} kcal.`,
      };
    }

    if (slug === "ideal-weight-calculator") {
      const heightInches = Math.max(100, height) / 2.54;
      const idealKg = 50 + 2.3 * Math.max(0, heightInches - 60);
      return {
        primaryLabel: "Ideal Body Weight",
        primaryValue: `${idealKg.toFixed(1)} kg`,
        metrics: [
          { label: "Healthy Target Range", value: `${(idealKg * 0.9).toFixed(1)} - ${(idealKg * 1.1).toFixed(1)} kg`, highlight: true },
          { label: "Height Entered", value: `${height} cm` },
        ],
        summaryText: `For ${height} cm, ideal body weight is approx. ${idealKg.toFixed(1)} kg.`,
      };
    }

    if (slug === "water-intake-calculator") {
      const waterL = Math.max(1, weight) * 0.033 + 0.35;
      return {
        primaryLabel: "Daily Water Intake Goal",
        primaryValue: `${waterL.toFixed(2)} Liters`,
        metrics: [
          { label: "Glasses (250ml)", value: `${Math.round(waterL * 4)} Glasses`, highlight: true },
          { label: "Bottles (750ml)", value: `${(waterL / 0.75).toFixed(1)} Bottles` },
        ],
        summaryText: `Drink at least ${waterL.toFixed(2)} L of water daily.`,
      };
    }

    // macro-calculator
    const proteinG = Math.round((calories * 0.30) / 4);
    const carbsG = Math.round((calories * 0.40) / 4);
    const fatsG = Math.round((calories * 0.30) / 9);
    return {
      primaryLabel: "Daily Protein Target",
      primaryValue: `${proteinG}g (30%)`,
      metrics: [
        { label: "Carbohydrates (40%)", value: `${carbsG}g`, highlight: true },
        { label: "Healthy Fats (30%)", value: `${fatsG}g` },
        { label: "Total Energy", value: `${calories} kcal` },
      ],
      summaryText: `For ${calories} kcal: Protein ${proteinG}g, Carbs ${carbsG}g, Fats ${fatsG}g.`,
    };
  }, [slug, weight, height, age, calories]);

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

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Health Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setWeight(70);
            setHeight(175);
            setAge(28);
            setCalories(2000);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {slug !== "macro-calculator" ? (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Body Weight (kg)</label>
                <input
                  type="number"
                  value={weight || ""}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              {slug !== "water-intake-calculator" && (
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height || ""}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              )}

              {(slug === "bmr-calculator" || slug === "calorie-calculator") && (
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Age (Years)</label>
                  <input
                    type="number"
                    value={age || ""}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">Daily Calorie Target (kcal)</label>
              <input
                type="number"
                value={calories || ""}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>
          )}
        </div>

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
                  <span className={`font-bold ${m.highlight ? "text-[#b36932]" : "text-navy"}`}>{m.value}</span>
                </div>
              ))}
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
          </div>
        </div>
      </div>
    </div>
  );
}
