"use client";

import React, { useState, useMemo } from "react";
import { calculateInHandSalary } from "@/lib/calculators/salary";
import { formatINR } from "@/lib/formatters";
import { Copy, Check, Share2, RotateCcw, SlidersHorizontal, Table } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function SalaryCalculatorRenderer({ slug, name }: Props) {
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [ctc, setCtc] = useState<number>(1200000); // 12 LPA
  const [basicPct, setBasicPct] = useState<number>(50);
  const [hraPct, setHraPct] = useState<number>(20);
  const [employeePfMonthly, setEmployeePfMonthly] = useState<number>(1800);
  const [ptMonthly, setPtMonthly] = useState<number>(200);
  const [tdsMonthly, setTdsMonthly] = useState<number>(4500);
  const [otherDeductionsMonthly, setOtherDeductionsMonthly] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateInHandSalary({
      annualCTC: ctc,
      basicPercentage: basicPct,
      hraPercentage: hraPct,
      customEmployeePF: employeePfMonthly,
      customPT: ptMonthly,
      customTDS: tdsMonthly,
      customOtherDeductions: otherDeductionsMonthly,
      includeEmployerPFInCTC: true,
    });
  }, [ctc, basicPct, hraPct, employeePfMonthly, ptMonthly, tdsMonthly, otherDeductionsMonthly]);

  const handleCopy = () => {
    const text =
      `MyCalculators - ${name}\n` +
      `Annual CTC: ${formatINR(ctc)}\n` +
      `Monthly In-Hand: ${result.primaryValue}\n` +
      result.metrics.map((m) => `${m.label}: ${m.value}`).join("\n") +
      `\nCalculated on https://mycalculators.xyz/calculators/salary-calculator`;

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
          text: `Monthly Take-Home: ${result.primaryValue} on CTC ${formatINR(ctc)}`,
          url: window.location.href,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const handleReset = () => {
    setCtc(1200000);
    setBasicPct(50);
    setHraPct(20);
    setEmployeePfMonthly(1800);
    setPtMonthly(200);
    setTdsMonthly(4500);
    setOtherDeductionsMonthly(0);
    setIsAdvanced(false);
  };

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm space-y-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Salary & Compensation Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAdvanced((prev) => !prev)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
              isAdvanced ? "bg-navy text-cream border-navy shadow-sm" : "bg-white text-navy border-navy/20 hover:bg-sage/20"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {isAdvanced ? "Simple Mode" : "Advanced Breakdown"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Annual CTC Input & Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold text-sm text-navy">Annual Cost to Company (CTC)</label>
              <span className="text-xs font-extrabold text-navy bg-sand/30 px-2.5 py-1 rounded-md">
                {formatINR(ctc)} / year
              </span>
            </div>
            <input
              type="number"
              min="100000"
              max="50000000"
              step="25000"
              value={ctc || ""}
              onChange={(e) => setCtc(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
            />
            <input
              type="range"
              min="200000"
              max="5000000"
              step="50000"
              value={ctc}
              onChange={(e) => setCtc(Number(e.target.value))}
              className="w-full accent-steel cursor-pointer"
            />
            {/* Quick CTC Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[300000, 600000, 1000000, 1500000, 2500000, 5000000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCtc(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                    ctc === val ? "bg-navy text-cream border-navy" : "bg-sage/30 text-navy/80 border-navy/10 hover:bg-sage"
                  }`}
                >
                  {val >= 100000 ? `${val / 100000} LPA` : formatINR(val)}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Deductions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm text-navy mb-2">Monthly Employee EPF (₹)</label>
              <input
                type="number"
                min="0"
                value={employeePfMonthly}
                onChange={(e) => setEmployeePfMonthly(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-navy mb-2">Professional Tax (PT ₹/mo)</label>
              <input
                type="number"
                min="0"
                value={ptMonthly}
                onChange={(e) => setPtMonthly(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-sm text-navy mb-2">Estimated Monthly TDS / Income Tax (₹)</label>
            <input
              type="number"
              min="0"
              value={tdsMonthly}
              onChange={(e) => setTdsMonthly(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
            />
          </div>

          {/* Advanced Salary Components */}
          {isAdvanced && (
            <div className="space-y-4 pt-4 border-t border-navy/10">
              <h3 className="font-extrabold text-sm text-navy uppercase tracking-wider">
                Advanced Salary Structure (%)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-navy mb-1">
                    <span>Basic Salary (% of CTC)</span>
                    <span>{basicPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="70"
                    step="5"
                    value={basicPct}
                    onChange={(e) => setBasicPct(Number(e.target.value))}
                    className="w-full accent-steel cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-navy mb-1">
                    <span>HRA (% of CTC)</span>
                    <span>{hraPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={hraPct}
                    onChange={(e) => setHraPct(Number(e.target.value))}
                    className="w-full accent-steel cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-xs text-navy mb-1">Other Monthly Deductions (Insurance/Loan EMI) (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={otherDeductionsMonthly}
                  onChange={(e) => setOtherDeductionsMonthly(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
                />
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
            <div className="text-3xl sm:text-4xl font-black text-navy mb-4 tracking-tight">
              {result.primaryValue}
            </div>

            {/* Visual Ratio Bar */}
            {result.breakdown && (
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-bold text-navy/75">
                  <span>Take-Home ({result.breakdown.principalPct}%)</span>
                  <span>Deductions ({result.breakdown.interestPct}%)</span>
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

            {/* Metrics Breakdown */}
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

      {/* Salary Component Breakdown Table */}
      {result.table && (
        <div className="pt-6 border-t border-navy/10">
          <div className="flex items-center gap-2 mb-4">
            <Table className="w-5 h-5 text-steel" />
            <h3 className="font-black text-lg text-navy">Detailed Salary Component Table</h3>
          </div>

          <div className="border border-navy/15 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-sage/50 text-navy font-black border-b border-navy/15">
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
                    className={
                      row[3] === "Net Payout"
                        ? "bg-sage/30 font-bold"
                        : rIdx % 2 === 0
                        ? "bg-white hover:bg-sage/15"
                        : "bg-sage/10 hover:bg-sage/20"
                    }
                  >
                    <td className="py-3 px-4 font-bold text-navy">{row[0]}</td>
                    <td className={`py-3 px-4 ${row[3] === "Deduction" ? "text-rose-600" : ""}`}>{row[1]}</td>
                    <td className={`py-3 px-4 ${row[3] === "Deduction" ? "text-rose-600" : ""}`}>{row[2]}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                          row[3] === "Earnings"
                            ? "bg-emerald-100 text-emerald-800"
                            : row[3] === "Deduction"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-navy text-cream"
                        }`}
                      >
                        {row[3]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-navy/60 mt-3 leading-relaxed">
            Actual take-home salary may vary depending on employer salary structure, tax regime, deductions, benefits and applicable statutory rules.
          </p>
        </div>
      )}
    </div>
  );
}
