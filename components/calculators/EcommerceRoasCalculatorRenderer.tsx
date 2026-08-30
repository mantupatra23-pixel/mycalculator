"use client";

import React, { useState, useId } from "react";
import { Copy, Share2, RotateCcw, Check, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export function EcommerceRoasCalculatorRenderer() {
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [sellingPrice, setSellingPrice] = useState<number>(1499);
  const [productCost, setProductCost] = useState<number>(400);
  const [shippingCost, setShippingCost] = useState<number>(90);
  const [packagingCost, setPackagingCost] = useState<number>(30);
  const [marketplaceFeePct, setMarketplaceFeePct] = useState<number>(5);
  const [paymentGatewayFeePct, setPaymentGatewayFeePct] = useState<number>(2);
  const [adSpend, setAdSpend] = useState<number>(25000);
  const [orders, setOrders] = useState<number>(100);
  const [returnsRefundPct, setReturnsRefundPct] = useState<number>(10);
  const [discountPct, setDiscountPct] = useState<number>(0);
  const [otherVariableCost, setOtherVariableCost] = useState<number>(0);
  const [fixedCosts, setFixedCosts] = useState<number>(10000);
  const [copied, setCopied] = useState(false);

  const priceInputId = useId();
  const cogsInputId = useId();
  const shippingInputId = useId();
  const packagingInputId = useId();
  const marketFeeInputId = useId();
  const pgFeeInputId = useId();
  const adSpendInputId = useId();
  const ordersInputId = useId();
  const returnsInputId = useId();
  const fixedCostInputId = useId();

  const handleReset = () => {
    setCurrency("₹");
    setSellingPrice(1499);
    setProductCost(400);
    setShippingCost(90);
    setPackagingCost(30);
    setMarketplaceFeePct(5);
    setPaymentGatewayFeePct(2);
    setAdSpend(25000);
    setOrders(100);
    setReturnsRefundPct(10);
    setDiscountPct(0);
    setOtherVariableCost(0);
    setFixedCosts(10000);
  };

  const validOrders = Math.max(0, isNaN(orders) ? 0 : orders);
  const effectiveUnitPrice = sellingPrice * (1 - discountPct / 100);
  const grossRevenue = validOrders * effectiveUnitPrice;
  const netRevenue = grossRevenue * (1 - returnsRefundPct / 100);

  // Unit and batch variable costs
  const totalCogs = validOrders * productCost;
  const totalShipping = validOrders * shippingCost;
  const totalPackaging = validOrders * packagingCost;
  const totalMarketplaceFees = (netRevenue * marketplaceFeePct) / 100;
  const totalPgFees = (netRevenue * paymentGatewayFeePct) / 100;
  const totalOtherVar = validOrders * otherVariableCost;

  const totalNonAdVariableCosts = totalCogs + totalShipping + totalPackaging + totalMarketplaceFees + totalPgFees + totalOtherVar;
  const contributionMargin = netRevenue - totalNonAdVariableCosts;
  const contributionMarginPct = netRevenue > 0 ? (contributionMargin / netRevenue) * 100 : 0;

  // Net Profit & ROAS metrics
  const netProfit = contributionMargin - adSpend - fixedCosts;
  const netProfitMarginPct = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const actualRoas = adSpend > 0 ? grossRevenue / adSpend : 0;
  
  // Break-even ROAS is Revenue required to yield enough contribution margin to cover ad spend
  const breakEvenRoas = contributionMargin > 0 ? grossRevenue / contributionMargin : 0;
  const maxCac = validOrders > 0 ? Math.max(0, (contributionMargin - fixedCosts) / validOrders) : 0;
  const currentCac = validOrders > 0 ? adSpend / validOrders : 0;

  const handleCopy = () => {
    const text = `E-Commerce ROAS & Profitability Audit:\nGross Revenue: ${currency}${grossRevenue.toFixed(2)}\nTotal Ad Spend: ${currency}${adSpend.toFixed(2)}\nActual ROAS: ${actualRoas.toFixed(2)}x\nBreak-Even ROAS Target: ${breakEvenRoas.toFixed(2)}x\nNet Profit: ${currency}${netProfit.toFixed(2)} (${netProfitMarginPct.toFixed(2)}% Margin)\nMaximum Target CAC: ${currency}${maxCac.toFixed(2)}\nCalculated on https://www.mycalculator.xyz/calculators/ecommerce-roas-break-even-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "E-Commerce ROAS & Break-Even Margin Calculator",
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header Currency Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-navy/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy">Profitability Status:</span>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black ${
              netProfit > 0
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : netProfit === 0
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {netProfit > 0 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            {netProfit > 0 ? "Profitable Operation" : netProfit === 0 ? "Exact Break-Even" : "Loss-Making Campaign"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy/70">Currency:</span>
          <div className="inline-flex rounded-lg border border-navy/10 p-0.5 bg-sage/20">
            <button
              type="button"
              onClick={() => setCurrency("₹")}
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${currency === "₹" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("$")}
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${currency === "$" ? "bg-white text-navy shadow-xs" : "text-navy/60"}`}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-navy/15 shadow-sm space-y-5">
          {/* Revenue & Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor={priceInputId} className="text-[11px] font-bold text-navy">
                Selling Price / Unit ({currency})
              </label>
              <input
                id={priceInputId}
                type="number"
                value={sellingPrice || ""}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor={ordersInputId} className="text-[11px] font-bold text-navy">
                Orders Delivered
              </label>
              <input
                id={ordersInputId}
                type="number"
                value={orders || ""}
                onChange={(e) => setOrders(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor={adSpendInputId} className="text-[11px] font-bold text-navy">
                Total Ad Spend ({currency})
              </label>
              <input
                id={adSpendInputId}
                type="number"
                value={adSpend || ""}
                onChange={(e) => setAdSpend(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>

          {/* Unit Cost Parameters */}
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy/70 block">
              Unit Variable Costs
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor={cogsInputId} className="text-[11px] font-semibold text-navy/80">
                  Product COGS ({currency})
                </label>
                <input
                  id={cogsInputId}
                  type="number"
                  value={productCost || ""}
                  onChange={(e) => setProductCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={shippingInputId} className="text-[11px] font-semibold text-navy/80">
                  Shipping / Unit ({currency})
                </label>
                <input
                  id={shippingInputId}
                  type="number"
                  value={shippingCost || ""}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor={packagingInputId} className="text-[11px] font-semibold text-navy/80">
                  Packaging ({currency})
                </label>
                <input
                  id={packagingInputId}
                  type="number"
                  value={packagingCost || ""}
                  onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Channel & Risk Percentages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor={returnsInputId} className="text-[11px] font-bold text-navy">
                Returns / RTO Rate (%)
              </label>
              <input
                id={returnsInputId}
                type="number"
                step="0.5"
                value={returnsRefundPct || ""}
                onChange={(e) => setReturnsRefundPct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor={marketFeeInputId} className="text-[11px] font-bold text-navy">
                Marketplace Fee (%)
              </label>
              <input
                id={marketFeeInputId}
                type="number"
                step="0.5"
                value={marketplaceFeePct || ""}
                onChange={(e) => setMarketplaceFeePct(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor={fixedCostInputId} className="text-[11px] font-bold text-navy">
                Monthly Fixed Overheads ({currency})
              </label>
              <input
                id={fixedCostInputId}
                type="number"
                value={fixedCosts || ""}
                onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold text-navy bg-sage/20 border border-navy/15 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5 bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
              Net Profit / Bottom Line
            </span>
            <div className={`text-3xl sm:text-4xl font-black tracking-tight ${netProfit >= 0 ? "text-emerald-300" : "text-rose-400"}`}>
              {currency}
              {netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 text-cream/90">
                Profit Margin: {netProfitMarginPct.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Key ROAS Metrics */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-white/5 rounded-2xl border border-cream/10 text-xs">
            <div>
              <span className="text-cream/60 block text-[10px] uppercase font-bold">Actual ROAS</span>
              <strong className="text-lg text-white font-black">{actualRoas.toFixed(2)}x</strong>
            </div>
            <div>
              <span className="text-cream/60 block text-[10px] uppercase font-bold">Break-Even ROAS</span>
              <strong className="text-lg text-[#e89d67] font-black">{breakEvenRoas.toFixed(2)}x</strong>
            </div>
            <div>
              <span className="text-cream/60 block text-[10px] uppercase font-bold">Current CAC</span>
              <strong className="text-sm text-white font-bold">{currency}{currentCac.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-cream/60 block text-[10px] uppercase font-bold">Maximum Target CAC</span>
              <strong className="text-sm text-emerald-300 font-bold">{currency}{maxCac.toFixed(2)}</strong>
            </div>
          </div>

          {/* Itemized P&L Rows */}
          <div className="space-y-2 pt-2 border-t border-cream/15 text-xs">
            <div className="flex justify-between text-cream/80">
              <span>Gross Revenue ({validOrders} Orders)</span>
              <span className="font-bold text-white">
                {currency}{grossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Returns & Adjustments ({returnsRefundPct}%)</span>
              <span className="font-bold text-red-300">
                -{currency}{(grossRevenue - netRevenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>COGS, Shipping & Packaging</span>
              <span className="font-bold text-red-300">
                -{currency}{(totalCogs + totalShipping + totalPackaging).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-cream/80">
              <span>Paid Advertising Spend</span>
              <span className="font-bold text-red-300">
                -{currency}{adSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
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
