"use client";

import React, { useState, useMemo } from "react";
import {
  calculateROAS,
  calculateBreakEven,
  calculateCommission,
  calculateFreelanceRate,
  calculateHourlyToSalary,
  calculateOvertime,
  calculateSalaryHike,
  calculatePayroll,
  calculateInvoice,
  calculateBusinessProfit,
  calculateMarkupMarginComparison,
  calculateRentSplit,
} from "@/lib/calculators/business";
import { Copy, Check, Share2, RotateCcw, Briefcase, Plus, Trash2, ArrowRightLeft } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

interface InvoiceItem {
  id: string;
  desc: string;
  qty: number;
  rate: number;
}

export function BusinessRenderer({ slug, name }: Props) {
  // Common numeric parameters
  const [v1, setV1] = useState<number>(() => {
    if (slug === "roas-calculator") return 250000;
    if (slug === "break-even-calculator") return 80000;
    if (slug === "commission-calculator") return 500000;
    if (slug === "freelance-hourly-rate" || slug === "freelance-rate-calculator") return 120000;
    if (slug === "hourly-to-annual-salary" || slug === "hourly-rate-calculator") return 500;
    if (slug === "overtime-pay-calculator" || slug === "overtime-calculator") return 350;
    if (slug === "salary-hike-calculator" || slug === "salary-increment-calculator") return 800000;
    if (slug === "payroll-calculator") return 65000;
    if (slug === "invoice-total-calculator") return 45000;
    if (slug.includes("business-profit") || slug.includes("business-margin")) return 1000000;
    if (slug === "markup-vs-margin-calculator") return 35;
    if (slug === "rent-split-calculator") return 36000;
    return 100000;
  });

  const [v2, setV2] = useState<number>(() => {
    if (slug === "roas-calculator") return 50000; // Ad Spend
    if (slug === "break-even-calculator") return 200; // Selling Price
    if (slug === "commission-calculator") return 8; // Commission Rate %
    if (slug === "freelance-hourly-rate" || slug === "freelance-rate-calculator") return 30; // Billable hrs/wk
    if (slug === "hourly-to-annual-salary") return 40; // Hours/week
    if (slug === "overtime-pay-calculator") return 40; // Reg hours
    if (slug === "salary-hike-calculator" || slug === "salary-increment-calculator") return 18; // Hike %
    if (slug === "invoice-total-calculator") return 5; // Discount %
    if (slug.includes("business-profit") || slug.includes("business-margin")) return 450000; // COGS
    if (slug === "rent-split-calculator") return 3; // Roommates
    return 10;
  });

  const [v3, setV3] = useState<number>(() => {
    if (slug === "roas-calculator") return 60000; // COGS
    if (slug === "break-even-calculator") return 80; // Variable Cost
    if (slug === "commission-calculator") return 25000; // Base Salary
    if (slug === "freelance-hourly-rate") return 20000; // Monthly Expenses
    if (slug === "overtime-pay-calculator") return 15; // OT Hours
    if (slug === "invoice-total-calculator") return 18; // GST Rate
    if (slug.includes("business-profit")) return 200000; // OpEx
    if (slug === "rent-split-calculator") return 4500; // Utilities
    return 0;
  });

  const [v4, setV4] = useState<number>(() => {
    if (slug === "overtime-pay-calculator") return 1.5; // OT Multiplier
    if (slug === "freelance-hourly-rate") return 4; // Vacation weeks
    if (slug.includes("business-profit")) return 25; // Tax rate
    return 0;
  });

  // Payroll specific toggles
  const [includePF, setIncludePF] = useState<boolean>(true);
  const [includePT, setIncludePT] = useState<boolean>(true);
  const [tdsDeduction, setTdsDeduction] = useState<number>(2500);

  // Markup vs Margin type toggle
  const [compType, setCompType] = useState<"markup" | "margin">("markup");

  // Dynamic Line Item Invoice Builder State
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: "1", desc: "UI/UX & Web Development", qty: 1, rate: 35000 },
    { id: "2", desc: "Cloud Server Hosting & Setup", qty: 1, rate: 10000 },
  ]);

  const [copied, setCopied] = useState<boolean>(false);

  // Invoice Builder Helpers
  const addInvoiceItem = () => {
    setInvoiceItems((prev) => [
      ...prev,
      { id: Date.now().toString(), desc: `Service / Item ${prev.length + 1}`, qty: 1, rate: 5000 },
    ]);
  };

  const removeInvoiceItem = (id: string) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateInvoiceItem = (id: string, field: keyof InvoiceItem, val: any) => {
    setInvoiceItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const invoiceSubtotal = useMemo(() => {
    return invoiceItems.reduce((acc, curr) => acc + (Number(curr.qty) || 0) * (Number(curr.rate) || 0), 0);
  }, [invoiceItems]);

  // Main Calculation Dispatcher
  const result = useMemo(() => {
    switch (slug) {
      case "roas-calculator":
        return calculateROAS(v1, v2, v3);

      case "break-even-calculator":
      case "break-even-point-calculator":
        return calculateBreakEven(v1, v2, v3);

      case "commission-calculator":
        return calculateCommission(v1, v2, v3);

      case "freelance-hourly-rate":
      case "freelance-rate-calculator":
        return calculateFreelanceRate(v1, v2, v3, v4);

      case "hourly-to-annual-salary":
      case "hourly-rate-calculator":
        return calculateHourlyToSalary(v1, v2);

      case "overtime-pay-calculator":
      case "overtime-calculator":
        return calculateOvertime(v1, v2, v3, v4);

      case "salary-hike-calculator":
      case "salary-increment-calculator":
        return calculateSalaryHike(v1, v2, v3);

      case "payroll-calculator":
        return calculatePayroll(v1, includePF, includePT, tdsDeduction);

      case "invoice-total-calculator":
        return calculateInvoice(invoiceSubtotal, v2, v3);

      case "business-profit-calculator":
        return calculateBusinessProfit(v1, v2, v3, v4);

      case "business-margin-calculator":
        return calculateBusinessProfit(v1, v2, v3, 0);

      case "markup-vs-margin-calculator":
        return calculateMarkupMarginComparison(v1, compType);

      case "rent-split-calculator":
        return calculateRentSplit(v1, v2, v3);

      default:
        return calculateROAS(v1, v2, v3);
    }
  }, [
    slug,
    v1,
    v2,
    v3,
    v4,
    includePF,
    includePT,
    tdsDeduction,
    compType,
    invoiceSubtotal,
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
    setV1(slug === "roas-calculator" ? 250000 : 100000);
    setV2(slug === "roas-calculator" ? 50000 : 10);
    setV3(slug === "roas-calculator" ? 60000 : 0);
    setV4(1.5);
    setIncludePF(true);
    setIncludePT(true);
    setTdsDeduction(2500);
    setCompType("markup");
  };

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Business & Financial Model
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
          {/* 1. ROAS Calculator */}
          {slug === "roas-calculator" && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Total Gross Revenue (₹)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Total Ad Spend (₹)</label>
                <input
                  type="number"
                  value={v2 || ""}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Cost of Goods Sold (COGS) (₹)</label>
                <input
                  type="number"
                  value={v3 || ""}
                  onChange={(e) => setV3(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {/* 2. Break-Even Calculator */}
          {(slug === "break-even-calculator" || slug === "break-even-point-calculator") && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Fixed Overhead Costs (₹ / Month)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Selling Price Per Unit (₹)</label>
                  <input
                    type="number"
                    value={v2 || ""}
                    onChange={(e) => setV2(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Variable Cost Per Unit (₹)</label>
                  <input
                    type="number"
                    value={v3 || ""}
                    onChange={(e) => setV3(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </div>
            </>
          )}

          {/* 3. Freelance Rate Calculator */}
          {(slug === "freelance-hourly-rate" || slug === "freelance-rate-calculator") && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Monthly Take-Home Income Goal (₹)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Billable Hours / Week</label>
                  <input
                    type="number"
                    min="1"
                    max="80"
                    value={v2 || ""}
                    onChange={(e) => setV2(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Monthly Business Expenses (₹)</label>
                  <input
                    type="number"
                    value={v3 || ""}
                    onChange={(e) => setV3(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Vacation / Leave Weeks per Year ({v4} Weeks)</label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={v4}
                  onChange={(e) => setV4(Number(e.target.value))}
                  className="w-full accent-steel cursor-pointer"
                />
              </div>
            </>
          )}

          {/* 4. Hourly to Salary */}
          {(slug === "hourly-to-annual-salary" || slug === "hourly-rate-calculator") && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Hourly Pay Rate (₹ / hr)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Work Hours per Week</label>
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={v2 || ""}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {/* 5. Overtime Pay */}
          {(slug === "overtime-pay-calculator" || slug === "overtime-calculator") && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Base Hourly Wage (₹ / hr)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Regular Shift Hours</label>
                  <input
                    type="number"
                    value={v2 || ""}
                    onChange={(e) => setV2(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Overtime Hours Worked</label>
                  <input
                    type="number"
                    value={v3 || ""}
                    onChange={(e) => setV3(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">OT Rate Multiplier</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1.5, 2.0, 2.5].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setV4(m)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        v4 === m ? "bg-navy text-cream shadow-sm" : "bg-sage/40 text-navy hover:bg-sage border border-navy/10"
                      }`}
                    >
                      {m}x (Time & Half)
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 6. Salary Hike / Increment */}
          {(slug === "salary-hike-calculator" || slug === "salary-increment-calculator") && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Current Annual CTC (₹)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Hike Percentage ({v2}%)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={v2 || ""}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm mb-2"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={v2}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full accent-steel cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">One-Time Joining / Performance Bonus (Optional ₹)</label>
                <input
                  type="number"
                  value={v3 || ""}
                  onChange={(e) => setV3(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {/* 7. Payroll Calculator */}
          {slug === "payroll-calculator" && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Gross Monthly Salary (₹)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="pfCheck"
                    checked={includePF}
                    onChange={(e) => setIncludePF(e.target.checked)}
                    className="w-4 h-4 rounded accent-steel cursor-pointer"
                  />
                  <label htmlFor="pfCheck" className="text-xs sm:text-sm font-bold text-navy cursor-pointer">
                    Deduct Employee Provident Fund (EPF 12% on basic)
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="ptCheck"
                    checked={includePT}
                    onChange={(e) => setIncludePT(e.target.checked)}
                    className="w-4 h-4 rounded accent-steel cursor-pointer"
                  />
                  <label htmlFor="ptCheck" className="text-xs sm:text-sm font-bold text-navy cursor-pointer">
                    Deduct Standard Professional Tax (PT ₹200/mo)
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Monthly Income Tax / TDS (₹)</label>
                <input
                  type="number"
                  value={tdsDeduction || ""}
                  onChange={(e) => setTdsDeduction(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {/* 8. Invoice Generator */}
          {slug === "invoice-total-calculator" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-bold text-sm text-navy">Invoice Line Items</label>
                <button
                  type="button"
                  onClick={addInvoiceItem}
                  className="flex items-center gap-1 text-xs font-bold text-steel hover:text-navy bg-sage/30 px-3 py-1.5 rounded-lg border border-navy/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                {invoiceItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 p-2.5 bg-sage/20 border border-navy/10 rounded-xl">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateInvoiceItem(item.id, "desc", e.target.value)}
                      placeholder="Item Description"
                      className="flex-1 px-3 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-semibold text-navy"
                    />
                    <div className="w-16">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateInvoiceItem(item.id, "qty", Number(e.target.value))}
                        placeholder="Qty"
                        className="w-full px-2 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-bold text-navy text-center"
                      />
                    </div>
                    <div className="w-28">
                      <input
                        type="number"
                        min="0"
                        value={item.rate}
                        onChange={(e) => updateInvoiceItem(item.id, "rate", Number(e.target.value))}
                        placeholder="Rate ₹"
                        className="w-full px-2 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-bold text-navy"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInvoiceItem(item.id)}
                      disabled={invoiceItems.length <= 1}
                      className="p-2 text-navy/40 hover:text-rose-600 disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-xs sm:text-sm text-navy mb-1.5">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={v2 || ""}
                    onChange={(e) => setV2(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-xs sm:text-sm text-navy mb-1.5">GST Rate (%)</label>
                  <select
                    value={v3}
                    onChange={(e) => setV3(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm"
                  >
                    <option value={0}>0% (Exempt)</option>
                    <option value={5}>5% GST</option>
                    <option value={12}>12% GST</option>
                    <option value={18}>18% GST (Standard Services)</option>
                    <option value={28}>28% GST</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 9. Business Profit & Margin */}
          {(slug.includes("business-profit") || slug.includes("business-margin")) && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Total Gross Revenue (₹)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Cost of Goods Sold (COGS) (₹)</label>
                <input
                  type="number"
                  value={v2 || ""}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">Operating Expenses (OpEx / Salaries / Rent) (₹)</label>
                <input
                  type="number"
                  value={v3 || ""}
                  onChange={(e) => setV3(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {/* 10. Markup vs Margin */}
          {slug === "markup-vs-margin-calculator" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Conversion Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCompType("markup")}
                    className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all border ${
                      compType === "markup"
                        ? "bg-navy text-cream border-navy shadow-sm"
                        : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                    }`}
                  >
                    Markup to Margin
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompType("margin")}
                    className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all border ${
                      compType === "margin"
                        ? "bg-navy text-cream border-navy shadow-sm"
                        : "bg-white text-navy border-navy/20 hover:bg-sage/20"
                    }`}
                  >
                    Margin to Markup
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-sm text-navy mb-2">
                  Enter {compType === "markup" ? "Cost Markup Percentage (%)" : "Gross Profit Margin (%)"}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </div>
          )}

          {/* 11. Rent Split */}
          {slug === "rent-split-calculator" && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Total Monthly Room Rent (₹)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Total Flatmates / People</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={v2 || ""}
                    onChange={(e) => setV2(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Utilities (Wifi, Electricity, Maid) (₹)</label>
                  <input
                    type="number"
                    value={v3 || ""}
                    onChange={(e) => setV3(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </div>
            </>
          )}

          {/* 12. Commission Calculator */}
          {slug === "commission-calculator" && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Total Sales Revenue Closed (₹)</label>
                <input
                  type="number"
                  value={v1 || ""}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Commission Rate (%)</label>
                  <input
                    type="number"
                    value={v2 || ""}
                    onChange={(e) => setV2(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Base Fixed Salary (Optional ₹)</label>
                  <input
                    type="number"
                    value={v3 || ""}
                    onChange={(e) => setV3(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
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
