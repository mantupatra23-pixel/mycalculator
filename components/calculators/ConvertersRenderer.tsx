"use client";

import React, { useState, useMemo } from "react";
import { UNIT_DATA, UnitCategory, convertUnits } from "@/lib/calculators/converters";
import { Copy, Check, Share2, RotateCcw, ArrowRightLeft, ChevronDown } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function ConvertersRenderer({ slug, name }: Props) {
  const getInitialCategory = (): UnitCategory => {
    if (slug.includes("weight") || slug.includes("kg") || slug.includes("pound")) return "weight";
    if (slug.includes("temperature") || slug.includes("celsius") || slug.includes("fahrenheit")) return "temperature";
    if (slug.includes("area")) return "area";
    if (slug.includes("volume")) return "volume";
    if (slug.includes("speed")) return "speed";
    if (slug.includes("data")) return "data";
    if (slug.includes("time")) return "time";
    return "length";
  };

  const [category, setCategory] = useState<UnitCategory>(getInitialCategory);

  const getInitialFrom = (): string => {
    if (slug === "meter-to-feet") return "m";
    if (slug === "inch-to-cm") return "in";
    if (slug === "cm-to-inch") return "cm";
    if (slug === "kg-to-pound") return "kg";
    if (slug === "pound-to-kg") return "lb";
    if (slug === "km-to-miles") return "km";
    if (slug === "miles-to-km") return "mi";
    if (slug === "celsius-to-fahrenheit") return "c";
    if (slug === "fahrenheit-to-celsius") return "f";
    if (slug === "feet-to-meter") return "ft";
    return UNIT_DATA[getInitialCategory()].units[0].id;
  };

  const getInitialTo = (): string => {
    if (slug === "meter-to-feet") return "ft";
    if (slug === "inch-to-cm") return "cm";
    if (slug === "cm-to-inch") return "in";
    if (slug === "kg-to-pound") return "lb";
    if (slug === "pound-to-kg") return "kg";
    if (slug === "km-to-miles") return "mi";
    if (slug === "miles-to-km") return "km";
    if (slug === "celsius-to-fahrenheit") return "f";
    if (slug === "fahrenheit-to-celsius") return "c";
    if (slug === "feet-to-meter") return "m";
    return UNIT_DATA[getInitialCategory()].units[1]?.id || UNIT_DATA[getInitialCategory()].units[0].id;
  };

  const [fromUnit, setFromUnit] = useState<string>(getInitialFrom);
  const [toUnit, setToUnit] = useState<string>(getInitialTo);
  const [value, setValue] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  const currentCatUnits = UNIT_DATA[category].units;

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    setFromUnit(UNIT_DATA[newCat].units[0].id);
    setToUnit(UNIT_DATA[newCat].units[1]?.id || UNIT_DATA[newCat].units[0].id);
  };

  const handleSwap = () => {
    const prevFrom = fromUnit;
    setFromUnit(toUnit);
    setToUnit(prevFrom);
  };

  const result = useMemo(() => {
    return convertUnits(category, fromUnit, toUnit, value);
  }, [category, fromUnit, toUnit, value]);

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

  const isUniversalConverter = slug === "unit-converter";

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Converter Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setValue(10);
            setFromUnit(getInitialFrom());
            setToUnit(getInitialTo());
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Category Pills (Visible on Universal Unit Converter) */}
      {isUniversalConverter && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-navy/10 scrollbar-none">
          {(Object.keys(UNIT_DATA) as UnitCategory[]).map((catKey) => (
            <button
              key={catKey}
              onClick={() => handleCategoryChange(catKey)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                category === catKey
                  ? "bg-navy text-cream shadow-sm"
                  : "bg-sage/30 text-navy hover:bg-sage border border-navy/10"
              }`}
            >
              {UNIT_DATA[catKey].name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block font-bold text-sm text-navy mb-2">
              Value to Convert
            </label>
            <input
              type="number"
              step="any"
              value={value || ""}
              onChange={(e) => setValue(Number(e.target.value))}
              placeholder="Enter number..."
              className="w-full px-4 py-3.5 bg-white rounded-xl border border-navy/20 font-bold text-navy text-lg focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* From Unit */}
            <div>
              <label className="block font-bold text-xs sm:text-sm text-navy mb-2">
                From Unit
              </label>
              <div className="relative">
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
                >
                  {currentCatUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50 pointer-events-none" />
              </div>
            </div>

            {/* To Unit */}
            <div>
              <label className="block font-bold text-xs sm:text-sm text-navy mb-2">
                To Unit
              </label>
              <div className="relative">
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:outline-none focus:ring-2 focus:ring-steel shadow-sm"
                >
                  {currentCatUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage/50 text-navy font-bold text-xs hover:bg-sage transition-colors border border-navy/10 shadow-sm"
            >
              <ArrowRightLeft className="w-4 h-4 text-steel" /> Swap Units
            </button>
          </div>
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

            {/* Common conversion table */}
            {result.table && (
              <div className="mt-6 pt-4 border-t border-navy/10">
                <div className="text-xs font-bold text-navy/70 uppercase mb-2">
                  Quick Equivalents
                </div>
                <div className="space-y-1.5 text-xs text-navy/90 font-semibold">
                  {result.table.rows.map((row, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-navy/5">
                      <span className="text-navy/65">{row[0]}</span>
                      <span>{row[1]}</span>
                    </div>
                  ))}
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
    </div>
  );
}
