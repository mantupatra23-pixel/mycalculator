"use client";

import React, { useState, useMemo } from "react";
import { formatNumberIN, formatINR } from "@/lib/formatters";
import { Copy, Check, RotateCcw } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function BusinessRenderer({ slug, name }: Props) {
  const [val1, setVal1] = useState<number>(() => {
    if (slug === "roas-calculator") return 150000;
    if (slug === "break-even-calculator") return 50000;
    if (slug === "commission-calculator") return 200000;
    if (slug === "freelance-rate-calculator" || slug === "hourly-rate-calculator") return 100000;
    if (slug === "salary-hike-calculator" || slug === "salary-increment-calculator") return 600000;
    if (slug === "overtime-calculator") return 250;
    if (slug === "rent-split-calculator") return 30000;
    return 100000;
  });

  const [val2, setVal2] = useState<number>(() => {
    if (slug === "roas-calculator") return 30000;
    if (slug === "break-even-calculator") return 100;
    if (slug === "commission-calculator") return 10;
    if (slug === "freelance-rate-calculator") return 30;
    if (slug === "salary-hike-calculator") return 15;
    if (slug === "overtime-calculator") return 15;
    if (slug === "rent-split-calculator") return 3;
    return 10;
  });

  const [val3, setVal3] = useState<number>(() => {
    if (slug === "break-even-calculator") return 40;
    if (slug === "overtime-calculator") return 1.5;
    return 0;
  });

  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    if (slug === "roas-calculator") {
      const revenue = Math.max(0, val1);
      const adSpend = Math.max(1, val2);
      const roas = revenue / adSpend;
      return {
        primaryLabel: "Return on Ad Spend (ROAS)",
        primaryValue: `${roas.toFixed(2)}x (${(roas * 100).toFixed(0)}%)`,
        metrics: [
          { label: "Total Campaign Revenue", value: formatINR(revenue) },
          { label: "Total Ad Spend", value: formatINR(adSpend) },
          { label: "Net Campaign Profit", value: formatINR(revenue - adSpend), highlight: true },
        ],
        summaryText: `ROAS is ${roas.toFixed(2)}x.`,
      };
    }

    if (slug === "break-even-calculator") {
      const fixedCosts = Math.max(0, val1);
      const priceUnit = Math.max(1, val2);
      const costUnit = Math.max(0, val3);
      const margin = priceUnit - costUnit;
      const breakEvenUnits = margin > 0 ? Math.ceil(fixedCosts / margin) : 0;

      return {
        primaryLabel: "Break-Even Sales Units",
        primaryValue: `${formatNumberIN(breakEvenUnits, 0)} Units`,
        metrics: [
          { label: "Break-Even Revenue", value: formatINR(breakEvenUnits * priceUnit), highlight: true },
          { label: "Unit Margin", value: formatINR(margin) },
          { label: "Fixed Costs", value: formatINR(fixedCosts) },
        ],
        summaryText: `You need ${breakEvenUnits} units to break even.`,
      };
    }

    if (slug === "commission-calculator") {
      const sales = Math.max(0, val1);
      const comm = (sales * Math.max(0, val2)) / 100;
      return {
        primaryLabel: "Commission Earned",
        primaryValue: formatINR(Math.round(comm)),
        metrics: [
          { label: "Gross Sales Revenue", value: formatINR(sales) },
          { label: "Commission Rate", value: `${val2}%` },
          { label: "Net Seller Share", value: formatINR(Math.round(sales - comm)), highlight: true },
        ],
        summaryText: `${val2}% commission is ${formatINR(Math.round(comm))}.`,
      };
    }

    if (slug === "freelance-rate-calculator" || slug === "hourly-rate-calculator") {
      const target = Math.max(0, val1);
      const hrsWeek = Math.max(1, val2);
      const hourly = target / (hrsWeek * 4);
      return {
        primaryLabel: "Target Hourly Rate",
        primaryValue: `₹${Math.round(hourly)} / hr`,
        metrics: [
          { label: "Monthly Income Goal", value: formatINR(target) },
          { label: "Billable Hours / Mo", value: `${hrsWeek * 4} hrs`, highlight: true },
          { label: "Daily Rate (6h)", value: formatINR(Math.round(hourly * 6)) },
        ],
        summaryText: `Target rate is ₹${Math.round(hourly)}/hr.`,
      };
    }

    if (slug === "salary-hike-calculator" || slug === "salary-increment-calculator") {
      const ctc = Math.max(0, val1);
      const inc = (ctc * Math.max(0, val2)) / 100;
      const newCtc = ctc + inc;
      return {
        primaryLabel: "New Appraised CTC",
        primaryValue: formatINR(Math.round(newCtc)),
        metrics: [
          { label: "Current CTC", value: formatINR(ctc) },
          { label: "Annual Hike Amount", value: `+${formatINR(Math.round(inc))}`, highlight: true },
          { label: "New Monthly Pay", value: formatINR(Math.round(newCtc / 12)) },
        ],
        summaryText: `New salary after hike is ${formatINR(Math.round(newCtc))}.`,
      };
    }

    if (slug === "overtime-calculator") {
      const wage = Math.max(0, val1);
      const otHours = Math.max(0, val2);
      const mult = Math.max(1, val3 || 1.5);
      const otPay = wage * otHours * mult;
      return {
        primaryLabel: "Total Overtime Pay",
        primaryValue: formatINR(Math.round(otPay)),
        metrics: [
          { label: "Base Hourly Rate", value: formatINR(wage) },
          { label: "OT Hours", value: `${otHours} hrs` },
          { label: "Effective OT Rate", value: formatINR(Math.round(wage * mult)), highlight: true },
        ],
        summaryText: `Overtime compensation is ${formatINR(Math.round(otPay))}.`,
      };
    }

    // rent-split-calculator
    const rent = Math.max(0, val1);
    const people = Math.max(1, val2);
    return {
      primaryLabel: "Per Person Rent Share",
      primaryValue: formatINR(Math.round(rent / people)),
      metrics: [
        { label: "Total Room Rent", value: formatINR(rent) },
        { label: "Flatmates", value: `${people} Flatmates` },
      ],
      summaryText: `Dividing ${formatINR(rent)} by ${people} is ${formatINR(Math.round(rent / people))} each.`,
    };
  }, [slug, val1, val2, val3]);

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
            Business Tool
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setVal1(100000);
            setVal2(10);
            setVal3(0);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block font-bold text-sm text-navy mb-2">
              {slug === "roas-calculator" ? "Total Campaign Revenue (₹)"
                : slug === "break-even-calculator" ? "Total Fixed Costs (₹)"
                : slug === "commission-calculator" ? "Gross Sales Amount (₹)"
                : slug === "rent-split-calculator" ? "Total Room Rent (₹)"
                : slug === "overtime-calculator" ? "Base Hourly Wage (₹)"
                : "Primary Input Value (₹)"}
            </label>
            <input
              type="number"
              value={val1 || ""}
              onChange={(e) => setVal1(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-sm text-navy mb-2">
              {slug === "roas-calculator" ? "Total Ad Spend (₹)"
                : slug === "break-even-calculator" ? "Sale Price Per Unit (₹)"
                : slug === "commission-calculator" ? "Commission Rate (%)"
                : slug === "rent-split-calculator" ? "Number of Flatmates"
                : slug === "overtime-calculator" ? "Total Overtime Hours"
                : "Secondary Value"}
            </label>
            <input
              type="number"
              value={val2 || ""}
              onChange={(e) => setVal2(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
            />
          </div>

          {(slug === "break-even-calculator" || slug === "overtime-calculator") && (
            <div>
              <label className="block font-bold text-sm text-navy mb-2">
                {slug === "break-even-calculator" ? "Variable Cost Per Unit (₹)" : "Multiplier (1.5x / 2.0x)"}
              </label>
              <input
                type="number"
                step="0.1"
                value={val3 || ""}
                onChange={(e) => setVal3(Number(e.target.value))}
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
