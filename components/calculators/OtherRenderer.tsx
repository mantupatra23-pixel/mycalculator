"use client";

import React, { useState, useMemo } from "react";
import { formatNumberIN, formatINR } from "@/lib/formatters";
import { calculateFraction, calculateCountdown } from "@/lib/calculators/allEngines";
import { Copy, Check, RotateCcw } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function OtherRenderer({ slug, name }: Props) {
  const [sciDisplay, setSciDisplay] = useState<string>("0");
  const [sciFormula, setSciFormula] = useState<string>(" ");

  const [fracN1, setFracN1] = useState<number>(3);
  const [fracD1, setFracD1] = useState<number>(4);
  const [fracOp, setFracOp] = useState<string>("+");
  const [fracN2, setFracN2] = useState<number>(2);
  const [fracD2, setFracD2] = useState<number>(5);

  const [countdownDate, setCountdownDate] = useState<string>("2027-01-01T00:00");
  const [countdownTitle, setCountdownTitle] = useState<string>("New Year 2027");

  const [v1, setV1] = useState<number>(() => {
    if (slug === "fuel-cost-calculator") return 300;
    if (slug === "mileage-calculator") return 450;
    if (slug === "electricity-bill-calculator") return 1500;
    if (slug === "tip-calculator") return 2000;
    if (slug === "savings-calculator") return 5000;
    return 100;
  });

  const [v2, setV2] = useState<number>(() => {
    if (slug === "fuel-cost-calculator") return 18;
    if (slug === "mileage-calculator") return 25;
    if (slug === "electricity-bill-calculator") return 8;
    if (slug === "tip-calculator") return 10;
    if (slug === "savings-calculator") return 7;
    return 10;
  });

  const [v3, setV3] = useState<number>(() => {
    if (slug === "fuel-cost-calculator") return 102;
    if (slug === "mileage-calculator") return 102;
    if (slug === "electricity-bill-calculator") return 7.5;
    if (slug === "tip-calculator") return 4;
    if (slug === "savings-calculator") return 5;
    return 0;
  });

  const [copied, setCopied] = useState<boolean>(false);

  const handleSciKey = (key: string) => {
    if (key === "C") {
      setSciDisplay("0");
      setSciFormula(" ");
    } else if (key === "DEL") {
      setSciDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (key === "=") {
      try {
        let expression = sciDisplay
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/π/g, `${Math.PI}`)
          .replace(/e/g, `${Math.E}`);

        expression = expression.replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)");
        expression = expression.replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)");
        expression = expression.replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)");
        expression = expression.replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)");
        expression = expression.replace(/log\(([^)]+)\)/g, "Math.log10($1)");
        expression = expression.replace(/ln\(([^)]+)\)/g, "Math.log($1)");

        const evalResult = Function(`'use strict'; return (${expression})`)();
        setSciFormula(`${sciDisplay} =`);
        setSciDisplay(isNaN(evalResult) || !isFinite(evalResult) ? "Error" : `${parseFloat(evalResult.toFixed(6))}`);
      } catch {
        setSciDisplay("Error");
      }
    } else if (["sin", "cos", "tan", "sqrt", "log", "ln"].includes(key)) {
      setSciDisplay((prev) => (prev === "0" ? `${key}(` : `${prev}${key}(`));
    } else {
      setSciDisplay((prev) => (prev === "0" && key !== "." ? key : `${prev}${key}`));
    }
  };

  const result = useMemo(() => {
    if (slug === "fraction-calculator") {
      return calculateFraction(fracN1, fracD1, fracOp, fracN2, fracD2);
    }
    if (slug === "countdown-calculator") {
      return calculateCountdown(countdownDate, countdownTitle);
    }
    if (slug === "fuel-cost-calculator") {
      const dist = Math.max(1, v1);
      const kmpl = Math.max(1, v2);
      const price = Math.max(1, v3);
      const liters = dist / kmpl;
      const total = liters * price;
      return {
        primaryLabel: "Total Fuel Expense",
        primaryValue: formatINR(Math.round(total)),
        metrics: [
          { label: "Fuel Needed", value: `${liters.toFixed(2)} Liters`, highlight: true },
          { label: "Running Cost Per KM", value: `₹${(total / dist).toFixed(2)} / km` },
          { label: "Trip Distance", value: `${dist} km` },
        ],
        summaryText: `Cost is ${formatINR(Math.round(total))}.`,
      };
    }
    if (slug === "mileage-calculator") {
      const dist = Math.max(1, v1);
      const liters = Math.max(0.1, v2);
      const kmpl = dist / liters;
      return {
        primaryLabel: "Fuel Efficiency",
        primaryValue: `${kmpl.toFixed(2)} km/L`,
        metrics: [
          { label: "Distance Covered", value: `${dist} km` },
          { label: "Fuel Consumed", value: `${liters} Liters`, highlight: true },
        ],
        summaryText: `Average mileage is ${kmpl.toFixed(2)} km/L.`,
      };
    }
    if (slug === "electricity-bill-calculator") {
      const units = (Math.max(0, v1) * Math.max(0, v2)) / 1000 * 30;
      const cost = units * Math.max(0, v3);
      return {
        primaryLabel: "Estimated Monthly Bill",
        primaryValue: formatINR(Math.round(cost)),
        metrics: [
          { label: "Monthly Consumption", value: `${units.toFixed(1)} kWh (Units)`, highlight: true },
          { label: "Tariff Rate", value: `₹${v3} / unit` },
        ],
        summaryText: `Monthly bill is ${formatINR(Math.round(cost))}.`,
      };
    }
    if (slug === "tip-calculator") {
      const bill = Math.max(0, v1);
      const tip = (bill * Math.max(0, v2)) / 100;
      const total = bill + tip;
      return {
        primaryLabel: "Per Person Share",
        primaryValue: formatINR(Math.round(total / Math.max(1, v3))),
        metrics: [
          { label: "Tip Amount", value: formatINR(Math.round(tip)), highlight: true },
          { label: "Grand Total", value: formatINR(Math.round(total)) },
        ],
        summaryText: `Each pays ${formatINR(Math.round(total / Math.max(1, v3)))}.`,
      };
    }
    // savings-calculator
    const p = Math.max(0, v1);
    const r = Math.max(0, v2) / 12 / 100;
    const n = Math.max(1, v3 * 12);
    const fv = r > 0 ? p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : p * n;
    return {
      primaryLabel: "Accumulated Savings",
      primaryValue: formatINR(Math.round(fv)),
      metrics: [
        { label: "Total Deposited", value: formatINR(p * n) },
        { label: "Interest Earned", value: formatINR(Math.round(fv - p * n)), highlight: true },
      ],
      summaryText: `Savings corpus grows to ${formatINR(Math.round(fv))}.`,
    };
  }, [slug, fracN1, fracD1, fracOp, fracN2, fracD2, countdownDate, countdownTitle, v1, v2, v3]);

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
            Utility Tool
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setV1(300);
            setV2(18);
            setV3(102);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {slug === "scientific-calculator" ? (
        <div className="max-w-md mx-auto bg-navy p-5 rounded-3xl shadow-xl text-cream">
          <div className="bg-sage/20 border border-cream/20 p-4 rounded-2xl mb-4 text-right">
            <div className="text-xs text-cream/60 min-h-[18px]">{sciFormula}</div>
            <div className="text-3xl font-mono font-black text-cream tracking-wider overflow-x-auto">{sciDisplay}</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm font-bold">
            {["sin", "cos", "tan", "sqrt", "log", "ln", "(", ")", "C", "DEL", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "π", "="].map((btn) => (
              <button
                key={btn}
                onClick={() => handleSciKey(btn === "×" ? "*" : btn === "÷" ? "/" : btn)}
                className={`py-3 rounded-xl font-bold transition-transform active:scale-95 flex items-center justify-center ${
                  btn === "="
                    ? "bg-sand text-navy text-lg font-black col-span-1 shadow-md hover:bg-sand/90"
                    : btn === "C" || btn === "DEL"
                    ? "bg-rose-500/80 hover:bg-rose-500 text-white"
                    : ["+", "-", "×", "÷", "%"].includes(btn)
                    ? "bg-steel text-white hover:bg-steel/80 text-base"
                    : ["sin", "cos", "tan", "sqrt", "log", "ln", "(", ")", "π"].includes(btn)
                    ? "bg-navy/60 text-sand hover:bg-navy/80 border border-cream/20 text-xs"
                    : "bg-cream/10 hover:bg-cream/20 text-cream text-base"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            {slug === "fraction-calculator" && (
              <div className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <input type="number" value={fracN1} onChange={(e) => setFracN1(Number(e.target.value))} className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy" />
                  <div className="w-20 h-0.5 bg-navy" />
                  <input type="number" value={fracD1} onChange={(e) => setFracD1(Number(e.target.value))} className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy" />
                </div>
                <select value={fracOp} onChange={(e) => setFracOp(e.target.value)} className="py-2.5 px-3 bg-sage/40 rounded-xl border border-navy/20 font-extrabold text-navy text-lg">
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">×</option>
                  <option value="/">÷</option>
                </select>
                <div className="flex flex-col items-center gap-2">
                  <input type="number" value={fracN2} onChange={(e) => setFracN2(Number(e.target.value))} className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy" />
                  <div className="w-20 h-0.5 bg-navy" />
                  <input type="number" value={fracD2} onChange={(e) => setFracD2(Number(e.target.value))} className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy" />
                </div>
              </div>
            )}

            {slug === "countdown-calculator" && (
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Event Title</label>
                  <input type="text" value={countdownTitle} onChange={(e) => setCountdownTitle(e.target.value)} className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel" />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Target Date & Time</label>
                  <input type="datetime-local" value={countdownDate} onChange={(e) => setCountdownDate(e.target.value)} className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel" />
                </div>
              </div>
            )}

            {slug !== "fraction-calculator" && slug !== "countdown-calculator" && (
              <>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">
                    {slug === "fuel-cost-calculator" ? "Total Distance (km)" : slug === "mileage-calculator" ? "Distance Covered (km)" : slug === "electricity-bill-calculator" ? "Power Rating (Watts)" : slug === "tip-calculator" ? "Bill Amount (₹)" : "Monthly Deposit (₹)"}
                  </label>
                  <input type="number" value={v1 || ""} onChange={(e) => setV1(Number(e.target.value))} className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm" />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">
                    {slug === "fuel-cost-calculator" ? "Mileage (km/L)" : slug === "mileage-calculator" ? "Fuel Used (Liters)" : slug === "electricity-bill-calculator" ? "Hours Used / Day" : slug === "tip-calculator" ? "Tip (%)" : "Return Rate (%)"}
                  </label>
                  <input type="number" value={v2 || ""} onChange={(e) => setV2(Number(e.target.value))} className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm" />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">
                    {slug === "fuel-cost-calculator" ? "Fuel Rate (₹/L)" : slug === "electricity-bill-calculator" ? "Tariff (₹/unit)" : slug === "tip-calculator" ? "People Sharing" : "Duration (Years)"}
                  </label>
                  <input type="number" value={v3 || ""} onChange={(e) => setV3(Number(e.target.value))} className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm" />
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-5 bg-sage/35 rounded-2xl p-5 sm:p-6 border border-navy/15 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-1">{result.primaryLabel}</div>
              <div className="text-2xl sm:text-3xl font-black text-navy mb-6 tracking-tight">{result.primaryValue}</div>
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
              <button onClick={handleCopy} className="flex-1 bg-white hover:bg-white/80 text-navy font-bold py-2.5 px-3 rounded-xl border border-navy/20 flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors shadow-sm">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
