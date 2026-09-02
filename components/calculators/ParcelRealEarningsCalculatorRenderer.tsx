"use client";

import React, { useState, useId } from "react";
import { Copy, Share2, RotateCcw, Check, Package, TrendingDown, Percent, ShoppingBag } from "lucide-react";
import { calculateParcelRealEarnings } from "@/lib/calculatorEngines";

export function ParcelRealEarningsCalculatorRenderer() {
  const [sellingPrice, setSellingPrice] = useState<number>(1000);
  const [discount, setDiscount] = useState<number>(0);
  const [productCost, setProductCost] = useState<number>(300);
  const [shippingCost, setShippingCost] = useState<number>(70);
  const [packagingCost, setPackagingCost] = useState<number>(20);
  const [marketplaceFeePct, setMarketplaceFeePct] = useState<number>(10);
  const [paymentFeePct, setPaymentFeePct] = useState<number>(2);
  const [fixedPaymentFee, setFixedPaymentFee] = useState<number>(10);
  const [returnRatePct, setReturnRatePct] = useState<number>(5);
  const [rtoRatePct, setRtoRatePct] = useState<number>(10);
  const [avgReturnCost, setAvgReturnCost] = useState<number>(100);
  const [gstOnFeesPct, setGstOnFeesPct] = useState<number>(18);
  const [otherExpense, setOtherExpense] = useState<number>(10);
  const [monthlyOrders, setMonthlyOrders] = useState<number>(100);
  const [copied, setCopied] = useState(false);

  const priceId = useId();
  const discId = useId();
  const cogsId = useId();
  const shipId = useId();
  const packId = useId();
  const marketFeeId = useId();
  const payFeeId = useId();
  const fixedPayId = useId();
  const retId = useId();
  const rtoId = useId();
  const avgRetId = useId();
  const gstFeeId = useId();
  const otherId = useId();
  const monthId = useId();

  const handleReset = () => {
    setSellingPrice(1000);
    setDiscount(0);
    setProductCost(300);
    setShippingCost(70);
    setPackagingCost(20);
    setMarketplaceFeePct(10);
    setPaymentFeePct(2);
    setFixedPaymentFee(10);
    setReturnRatePct(5);
    setRtoRatePct(10);
    setAvgReturnCost(100);
    setGstOnFeesPct(18);
    setOtherExpense(10);
    setMonthlyOrders(100);
  };

  const result = calculateParcelRealEarnings({
    sellingPrice,
    discount,
    productCost,
    shippingCost,
    packagingCost,
    marketplaceFeePct,
    paymentFeePct,
    fixedPaymentFee,
    returnRatePct,
    rtoRatePct,
    avgReturnCost,
    gstOnFeesPct,
    otherExpense,
    monthlyOrders,
  });

  const handleCopy = () => {
    const text = `Parcel Real Earnings Summary:\n"Parcel आया तो असल में कितना मिलेगा?"\n\nSelling Price: ₹${sellingPrice.toFixed(2)}\nExpected Revenue After Returns (${result.effectiveReturnRatePct}%): ₹${result.expectedRevenue.toFixed(2)}\nProduct & Packaging: ₹${(productCost + packagingCost).toFixed(2)}\nForward Shipping: ₹${shippingCost.toFixed(2)}\nMarketplace & Payment Fees (with GST): ₹${(result.totalPlatformCommission + result.taxOnFees).toFixed(2)}\nReturn/RTO Losses: ₹${result.expectedReturnRtoCost.toFixed(2)}\nTotal Deductions: ₹${result.totalDeductions.toFixed(2)}\nExpected Net Earnings: ₹${result.expectedNetEarnings.toFixed(2)} (${result.profitMarginPct.toFixed(2)}% Margin)\nEstimated Monthly Net (${monthlyOrders} Orders): ₹${result.monthlyNetEarnings.toFixed(2)}\nCalculated on https://www.mycalculator.xyz/calculators/parcel-real-earnings-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Parcel Real Earnings Calculator",
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8">
      {/* Natural Indian Phrase Badge */}
      <div className="bg-sage/40 border border-navy/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-white rounded-xl text-steel shadow-2xs">
            <ShoppingBag className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-black text-navy block">
              &ldquo;Parcel आया तो असल में कितना मिलेगा?&rdquo;
            </span>
            <span className="text-[11px] text-navy/70">
              Calculate exact in-hand profit after reverse logistics, COD fees, and GST deduction leakages.
            </span>
          </div>
        </div>
        <div className="text-xs font-bold text-navy px-3 py-1 bg-white rounded-xl border border-navy/10">
          Leakage Rate: <strong className="text-rose-600">{result.totalLeakagePct.toFixed(1)}%</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-6">
          {/* SECTION: ORDER DETAILS */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-steel" /> Order & Unit Costs
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor={priceId} className="text-xs font-bold text-navy">
                  Selling Price / Order (₹)
                </label>
                <input
                  id={priceId}
                  type="number"
                  min="0"
                  value={sellingPrice || ""}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="1000"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={discId} className="text-xs font-bold text-navy">
                  Discount Given (₹)
                </label>
                <input
                  id={discId}
                  type="number"
                  min="0"
                  value={discount || ""}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="0"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={cogsId} className="text-xs font-bold text-navy">
                  Product Cost (COGS) (₹)
                </label>
                <input
                  id={cogsId}
                  type="number"
                  min="0"
                  value={productCost || ""}
                  onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="300"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={shipId} className="text-xs font-bold text-navy">
                  Forward Shipping Cost (₹)
                </label>
                <input
                  id={shipId}
                  type="number"
                  min="0"
                  value={shippingCost || ""}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="70"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={packId} className="text-xs font-bold text-navy">
                  Packaging Cost (₹)
                </label>
                <input
                  id={packId}
                  type="number"
                  min="0"
                  value={packagingCost || ""}
                  onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="20"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={otherId} className="text-xs font-bold text-navy">
                  Other Expense per Order (₹)
                </label>
                <input
                  id={otherId}
                  type="number"
                  min="0"
                  value={otherExpense || ""}
                  onChange={(e) => setOtherExpense(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          {/* SECTION: PLATFORM & PAYMENT */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-steel" /> Marketplace & Gateway Fees
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor={marketFeeId} className="text-[11px] font-bold text-navy">
                  Marketplace Fee (%)
                </label>
                <input
                  id={marketFeeId}
                  type="number"
                  step="0.5"
                  value={marketplaceFeePct || ""}
                  onChange={(e) => setMarketplaceFeePct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="10"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={payFeeId} className="text-[11px] font-bold text-navy">
                  Payment / COD Fee (%)
                </label>
                <input
                  id={payFeeId}
                  type="number"
                  step="0.1"
                  value={paymentFeePct || ""}
                  onChange={(e) => setPaymentFeePct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="2"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={fixedPayId} className="text-[11px] font-bold text-navy">
                  Fixed Fee (₹)
                </label>
                <input
                  id={fixedPayId}
                  type="number"
                  value={fixedPaymentFee || ""}
                  onChange={(e) => setFixedPaymentFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="10"
                />
              </div>
            </div>

            <div className="pt-1">
              <label htmlFor={gstFeeId} className="text-[11px] font-bold text-navy block mb-1">
                GST on Commission & Fees (%):
              </label>
              <input
                id={gstFeeId}
                type="number"
                step="0.5"
                value={gstOnFeesPct || ""}
                onChange={(e) => setGstOnFeesPct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                placeholder="18"
              />
            </div>
          </div>

          {/* SECTION: RETURNS & RTO */}
          <div className="space-y-3 pt-3 border-t border-navy/10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/80 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-rose-500" /> Customer Returns & Courier RTO
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor={retId} className="text-[11px] font-bold text-navy">
                  Customer Return Rate (%)
                </label>
                <input
                  id={retId}
                  type="number"
                  step="0.5"
                  value={returnRatePct || ""}
                  onChange={(e) => setReturnRatePct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="5"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={rtoId} className="text-[11px] font-bold text-navy">
                  Courier RTO Rate (%)
                </label>
                <input
                  id={rtoId}
                  type="number"
                  step="0.5"
                  value={rtoRatePct || ""}
                  onChange={(e) => setRtoRatePct(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="10"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={avgRetId} className="text-[11px] font-bold text-navy">
                  Avg Return/RTO Cost (₹)
                </label>
                <input
                  id={avgRetId}
                  type="number"
                  value={avgReturnCost || ""}
                  onChange={(e) => setAvgReturnCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          {/* SECTION: MONTHLY VOLUME */}
          <div className="pt-3 border-t border-navy/10 space-y-1.5">
            <label htmlFor={monthId} className="text-xs font-bold text-navy">
              Average Number of Dispatched Orders per Month
            </label>
            <input
              id={monthId}
              type="number"
              min="1"
              value={monthlyOrders || ""}
              onChange={(e) => setMonthlyOrders(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              placeholder="100"
            />
          </div>
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5 bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
              Expected Net Earnings
            </span>
            <div
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                result.expectedNetEarnings >= 0 ? "text-emerald-300" : "text-rose-400"
              }`}
            >
              ₹{result.expectedNetEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-cream/90">
                Profit Margin: {result.profitMarginPct.toFixed(2)}%
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-cream/90">
                Retained: {result.revenueRetainedPct.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Itemized Deductions */}
          <div className="space-y-2 pt-3 border-t border-cream/15 text-xs">
            <div className="flex justify-between text-cream/80">
              <span>Gross Order Value</span>
              <span className="font-bold text-white">₹{result.grossRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Expected Revenue ({100 - result.effectiveReturnRatePct}% Delivered)</span>
              <span className="font-bold text-white">₹{result.expectedRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Product & Packaging</span>
              <span className="font-bold text-red-300">-₹{(productCost + packagingCost).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Forward Shipping & Expenses</span>
              <span className="font-bold text-red-300">-₹{(shippingCost + otherExpense).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Marketplace & Gateway Commission</span>
              <span className="font-bold text-red-300">-₹{result.totalPlatformCommission.toFixed(2)}</span>
            </div>
            {result.taxOnFees > 0 && (
              <div className="flex justify-between text-cream/80">
                <span>GST on Platform Fees ({gstOnFeesPct}%)</span>
                <span className="font-bold text-red-300">-₹{result.taxOnFees.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-cream/80">
              <span>Expected Return/RTO Loss ({result.effectiveReturnRatePct}%)</span>
              <span className="font-bold text-red-300">-₹{result.expectedReturnRtoCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-cream/15 font-black text-white text-sm">
              <span>Total Costs & Deductions</span>
              <span className="text-red-300">-₹{result.totalDeductions.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-1 font-black text-white text-base">
              <span>Net Earnings per Parcel</span>
              <span className={result.expectedNetEarnings >= 0 ? "text-emerald-300" : "text-rose-400"}>
                ₹{result.expectedNetEarnings.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Monthly Run-Rate Box */}
          <div className="p-3.5 bg-white/5 rounded-2xl border border-cream/10 space-y-1.5 text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e89d67] block">
              Monthly Projections ({monthlyOrders} Orders)
            </span>
            <div className="flex justify-between items-center text-xs">
              <span className="text-cream/70">Estimated Monthly Net:</span>
              <strong
                className={`text-sm ${
                  result.monthlyNetEarnings >= 0 ? "text-emerald-300" : "text-rose-400"
                }`}
              >
                ₹{result.monthlyNetEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </strong>
            </div>
          </div>

          {/* Smart Insight Note */}
          <div className="p-3 bg-white/5 rounded-xl border border-cream/10 text-[11px] text-cream/80 leading-relaxed">
            Your parcel sells for <strong>₹{result.grossRevenue.toFixed(0)}</strong>, but after platform commissions, logistics, and reverse losses, you keep <strong>₹{result.expectedNetEarnings.toFixed(2)}</strong>. Total leakages consume <strong>{result.totalLeakagePct.toFixed(1)}%</strong> of your selling price.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
              aria-label="Share Calculator"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
              aria-label="Reset Calculator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
