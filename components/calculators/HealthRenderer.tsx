"use client";

import React, { useState, useMemo } from "react";
import {
  calculateBMI,
  calculateBMR,
  calculateCalories,
  calculateBodyFat,
  calculateIdealWeight,
  calculateWaterIntake,
  calculateMacros,
} from "@/lib/calculators/health";
import { Copy, Check, Share2, RotateCcw } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function HealthRenderer({ slug, name }: Props) {
  // Common states
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(177);
  const [age, setAge] = useState<number>(28);

  // Body Fat specific states (US Navy method)
  const [neck, setNeck] = useState<number>(38);
  const [waist, setWaist] = useState<number>(86);
  const [hip, setHip] = useState<number>(95);

  // Calorie & Activity states
  const [activity, setActivity] = useState<number>(1.375);
  const [exerciseMins, setExerciseMins] = useState<number>(45);
  const [isHotClimate, setIsHotClimate] = useState<boolean>(false);

  // Macro specific states
  const [calorieIntake, setCalorieIntake] = useState<number>(2200);
  const [dietType, setDietType] = useState<"balanced" | "low_carb" | "high_protein" | "keto">("balanced");

  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    switch (slug) {
      case "body-fat-calculator":
        return calculateBodyFat(gender, height, neck, waist, hip, weight);

      case "bmi-calculator":
        return calculateBMI(weight, height);

      case "bmr-calculator":
        return calculateBMR(gender, weight, height, age);

      case "calorie-calculator":
        return calculateCalories(gender, weight, height, age, activity);

      case "ideal-weight-calculator":
        return calculateIdealWeight(gender, height);

      case "water-intake-calculator":
        return calculateWaterIntake(weight, exerciseMins, isHotClimate);

      case "macro-calculator":
        return calculateMacros(calorieIntake, dietType);

      default:
        return calculateBMI(weight, height);
    }
  }, [
    slug,
    gender,
    weight,
    height,
    age,
    neck,
    waist,
    hip,
    activity,
    exerciseMins,
    isHotClimate,
    calorieIntake,
    dietType,
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
    setGender("male");
    setWeight(75);
    setHeight(177);
    setAge(28);
    setNeck(38);
    setWaist(86);
    setHip(95);
    setActivity(1.375);
    setExerciseMins(45);
    setIsHotClimate(false);
    setCalorieIntake(2200);
    setDietType("balanced");
  };

  const isBodyFat = slug === "body-fat-calculator";
  const isBmi = slug === "bmi-calculator";
  const isBmr = slug === "bmr-calculator";
  const isCalorie = slug === "calorie-calculator";
  const isIdealWeight = slug === "ideal-weight-calculator";
  const isWater = slug === "water-intake-calculator";
  const isMacro = slug === "macro-calculator";

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Health & Fitness Engine
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
        <div className="lg:col-span-7 space-y-5">
          {/* Gender Selector */}
          {(isBodyFat || isBmr || isCalorie || isIdealWeight) && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all border ${
                    gender === "male"
                      ? "bg-navy text-cream border-navy shadow-sm"
                      : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all border ${
                    gender === "female"
                      ? "bg-navy text-cream border-navy shadow-sm"
                      : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          )}

          {/* Body Weight */}
          {!isIdealWeight && !isMacro && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">Body Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                min="10"
                max="300"
                value={weight || ""}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>
          )}

          {/* Height */}
          {!isWater && !isMacro && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">Height (cm)</label>
              <input
                type="number"
                step="0.5"
                min="50"
                max="250"
                value={height || ""}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>
          )}

          {/* Age */}
          {(isBmr || isCalorie) && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">Age (Years)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={age || ""}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>
          )}

          {/* US Navy Body Fat Specific Circumferences */}
          {isBodyFat && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">
                    Neck Circumference (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="10"
                    max="100"
                    value={neck || ""}
                    onChange={(e) => setNeck(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-navy mb-2">
                    Waist Circumference (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="20"
                    max="200"
                    value={waist || ""}
                    onChange={(e) => setWaist(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </div>

              {gender === "female" && (
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">
                    Hip Circumference (cm)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="20"
                    max="200"
                    value={hip || ""}
                    onChange={(e) => setHip(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              )}
            </>
          )}

          {/* Calorie Calculator Activity Level */}
          {isCalorie && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">Daily Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
              >
                <option value={1.2}>Sedentary (Little to no exercise / desk job)</option>
                <option value={1.375}>Lightly Active (Light exercise 1-3 days/week)</option>
                <option value={1.55}>Moderately Active (Moderate workouts 3-5 days/week)</option>
                <option value={1.725}>Very Active (Hard workouts 6-7 days/week)</option>
                <option value={1.9}>Extra Active (Intense training / physical job)</option>
              </select>
            </div>
          )}

          {/* Water Intake Specific Controls */}
          {isWater && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  Daily Workout / Activity (Minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={exerciseMins || ""}
                  onChange={(e) => setExerciseMins(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="hotClimate"
                  checked={isHotClimate}
                  onChange={(e) => setIsHotClimate(e.target.checked)}
                  className="w-5 h-5 rounded accent-steel cursor-pointer"
                />
                <label htmlFor="hotClimate" className="text-sm font-bold text-navy cursor-pointer">
                  Hot / Humid Tropical Weather (+500ml water need)
                </label>
              </div>
            </>
          )}

          {/* Macro Calculator Specific Controls */}
          {isMacro && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  Daily Calorie Target (kcal)
                </label>
                <input
                  type="number"
                  min="800"
                  max="8000"
                  value={calorieIntake || ""}
                  onChange={(e) => setCalorieIntake(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Diet Protocol</label>
                <select
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value as any)}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
                >
                  <option value="balanced">Balanced Diet (30% Protein / 40% Carbs / 30% Fat)</option>
                  <option value="high_protein">High Protein (35% Protein / 45% Carbs / 20% Fat)</option>
                  <option value="low_carb">Low Carb (40% Protein / 20% Carbs / 40% Fat)</option>
                  <option value="keto">Ketogenic (25% Protein / 5% Carbs / 70% Fat)</option>
                </select>
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
