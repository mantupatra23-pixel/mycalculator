// ============================================================================
// PURE TYPESCRIPT TRADING P&L ENGINE (PHASE 1)
// Zero React, DOM, or Next.js dependencies. Pure deterministic financial math.
// ============================================================================

import { TradingCalculationResult } from "../types";

export interface IntradayPnLInput {
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  tradeType: "long" | "short";
  buyCharges?: number;
  sellCharges?: number;
  leverageMultiplier?: number;
}

export function calculateIntradayPnL(input: IntradayPnLInput): TradingCalculationResult {
  const entry = Math.max(0, input.entryPrice || 0);
  const exit = Math.max(0, input.exitPrice || 0);
  const qty = Math.max(0, Math.floor(input.quantity || 0));
  const buyCharges = Math.max(0, input.buyCharges || 0);
  const sellCharges = Math.max(0, input.sellCharges || 0);
  const totalCharges = buyCharges + sellCharges;

  if (entry === 0 || qty === 0) {
    return {
      primaryMetric: { label: "Net Profit / Loss", value: 0, formatted: "₹0.00", isPositive: true },
      secondaryMetrics: [
        { label: "Gross P&L", value: 0, formatted: "₹0.00", highlight: "neutral" },
        { label: "Total Charges", value: 0, formatted: "₹0.00", highlight: "neutral" },
        { label: "Return on Capital", value: 0, formatted: "0.00%", highlight: "neutral" },
      ],
      notes: ["Enter positive values for entry price and quantity."],
    };
  }

  const pointMove = input.tradeType === "long" ? exit - entry : entry - exit;
  const grossPnL = pointMove * qty;
  const netPnL = grossPnL - totalCharges;

  const buyTurnover = entry * qty;
  const sellTurnover = exit * qty;
  const totalTurnover = buyTurnover + sellTurnover;

  const leverage = Math.max(1, input.leverageMultiplier || 1);
  const marginRequired = buyTurnover / leverage;
  const returnOnCapital = marginRequired > 0 ? (netPnL / marginRequired) * 100 : 0;
  const pnlPerShare = qty > 0 ? netPnL / qty : 0;

  const breakEvenExit =
    input.tradeType === "long"
      ? entry + totalCharges / qty
      : entry - totalCharges / qty;

  return {
    primaryMetric: {
      label: "Net Profit / Loss",
      value: netPnL,
      formatted: `₹${netPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: netPnL >= 0,
    },
    secondaryMetrics: [
      {
        label: "Gross P&L",
        value: grossPnL,
        formatted: `${grossPnL >= 0 ? "+" : ""}₹${grossPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        highlight: grossPnL >= 0 ? "green" : "red",
      },
      {
        label: "Return on Margin",
        value: returnOnCapital,
        formatted: `${returnOnCapital >= 0 ? "+" : ""}${returnOnCapital.toFixed(2)}%`,
        highlight: returnOnCapital >= 0 ? "green" : "red",
      },
      {
        label: "Total Turnover",
        value: totalTurnover,
        formatted: `₹${totalTurnover.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        highlight: "neutral",
      },
      {
        label: "Net Break-Even Exit",
        value: breakEvenExit,
        formatted: `₹${breakEvenExit.toFixed(2)}`,
        highlight: "cyan",
      },
      {
        label: "P&L Per Share",
        value: pnlPerShare,
        formatted: `${pnlPerShare >= 0 ? "+" : ""}₹${pnlPerShare.toFixed(2)}`,
        highlight: pnlPerShare >= 0 ? "green" : "red",
      },
    ],
    breakdown: [
      { item: "Gross Realized P&L", amount: grossPnL, formatted: `₹${grossPnL.toFixed(2)}`, type: grossPnL >= 0 ? "credit" : "debit" },
      { item: "Total Transaction Charges", amount: totalCharges, formatted: `-₹${totalCharges.toFixed(2)}`, type: "debit" },
      { item: "Net In-Pocket P&L", amount: netPnL, formatted: `₹${netPnL.toFixed(2)}`, type: netPnL >= 0 ? "credit" : "debit" },
    ],
  };
}

export interface DeliveryPnLInput {
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  totalCharges?: number;
}

export function calculateDeliveryPnL(input: DeliveryPnLInput): TradingCalculationResult {
  const buy = Math.max(0, input.buyPrice || 0);
  const sell = Math.max(0, input.sellPrice || 0);
  const qty = Math.max(0, Math.floor(input.quantity || 0));
  const charges = Math.max(0, input.totalCharges || 0);

  const costBasis = buy * qty;
  const saleValue = sell * qty;
  const grossPnL = saleValue - costBasis;
  const netPnL = grossPnL - charges;
  const returnPct = costBasis > 0 ? (netPnL / costBasis) * 100 : 0;
  const breakEven = qty > 0 ? (costBasis + charges) / qty : 0;

  return {
    primaryMetric: {
      label: "Net Delivery Return",
      value: netPnL,
      formatted: `₹${netPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: netPnL >= 0,
    },
    secondaryMetrics: [
      { label: "Cost Basis (Investment)", value: costBasis, formatted: `₹${costBasis.toLocaleString("en-IN")}`, highlight: "neutral" },
      { label: "Sale Value", value: saleValue, formatted: `₹${saleValue.toLocaleString("en-IN")}`, highlight: "neutral" },
      { label: "Net ROI %", value: returnPct, formatted: `${returnPct >= 0 ? "+" : ""}${returnPct.toFixed(2)}%`, highlight: returnPct >= 0 ? "green" : "red" },
      { label: "Break-Even Price", value: breakEven, formatted: `₹${breakEven.toFixed(2)}`, highlight: "cyan" },
    ],
  };
}

export interface TargetProfitInput {
  entryPrice: number;
  quantity: number;
  targetProfitAmount: number;
  tradeType: "long" | "short";
  estimatedCharges?: number;
}

export function calculateTargetProfit(input: TargetProfitInput): TradingCalculationResult {
  const entry = Math.max(0, input.entryPrice || 0);
  const qty = Math.max(0, Math.floor(input.quantity || 0));
  const targetProfit = Math.max(0, input.targetProfitAmount || 0);
  const charges = Math.max(0, input.estimatedCharges || 0);

  if (entry === 0 || qty === 0) {
    return {
      primaryMetric: { label: "Required Target Price", value: 0, formatted: "₹0.00", isPositive: true },
      secondaryMetrics: [],
    };
  }

  const grossNeeded = targetProfit + charges;
  const pointsNeeded = grossNeeded / qty;
  const targetExit = input.tradeType === "long" ? entry + pointsNeeded : entry - pointsNeeded;

  return {
    primaryMetric: {
      label: "Required Target Exit Price",
      value: targetExit,
      formatted: `₹${targetExit.toFixed(2)}`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Points Move Needed", value: pointsNeeded, formatted: `${pointsNeeded.toFixed(2)} pts`, highlight: "cyan" },
      { label: "Gross Target Required", value: grossNeeded, formatted: `₹${grossNeeded.toFixed(2)}`, highlight: "neutral" },
      { label: "Net Profit Retained", value: targetProfit, formatted: `₹${targetProfit.toFixed(2)}`, highlight: "green" },
    ],
  };
}

export interface StopLossPriceInput {
  entryPrice: number;
  accountCapital: number;
  riskPct: number;
  quantity: number;
  tradeType: "long" | "short";
}

export function calculateStopLossPrice(input: StopLossPriceInput): TradingCalculationResult {
  const entry = Math.max(0, input.entryPrice || 0);
  const capital = Math.max(0, input.accountCapital || 0);
  const riskPct = Math.max(0, input.riskPct || 0);
  const qty = Math.max(0, Math.floor(input.quantity || 0));

  const maxAllowedLoss = (capital * riskPct) / 100;
  const riskPerShare = qty > 0 ? maxAllowedLoss / qty : 0;
  const stopLossPrice =
    input.tradeType === "long"
      ? Math.max(0, entry - riskPerShare)
      : entry + riskPerShare;

  return {
    primaryMetric: {
      label: "Stop-Loss Price Limit",
      value: stopLossPrice,
      formatted: `₹${stopLossPrice.toFixed(2)}`,
      isPositive: input.tradeType === "long" ? stopLossPrice > 0 : true,
    },
    secondaryMetrics: [
      { label: "Max Allowable Loss", value: maxAllowedLoss, formatted: `₹${maxAllowedLoss.toFixed(2)}`, highlight: "red" },
      { label: "Stop Distance (Points)", value: riskPerShare, formatted: `${riskPerShare.toFixed(2)} pts`, highlight: "neutral" },
      { label: "Position Size Checked", value: qty, formatted: `${qty} Units`, highlight: "neutral" },
    ],
  };
}

export interface EntryItem {
  price: number;
  quantity: number;
}

export function calculateMultiEntryAverage(entries: EntryItem[]): TradingCalculationResult {
  let totalCost = 0;
  let totalQty = 0;

  for (const item of entries) {
    const p = Math.max(0, item.price || 0);
    const q = Math.max(0, Math.floor(item.quantity || 0));
    totalCost += p * q;
    totalQty += q;
  }

  const averagePrice = totalQty > 0 ? totalCost / totalQty : 0;

  return {
    primaryMetric: {
      label: "Volume-Weighted Average Price",
      value: averagePrice,
      formatted: `₹${averagePrice.toFixed(2)}`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Accumulated Quantity", value: totalQty, formatted: `${totalQty.toLocaleString("en-IN")} Shares`, highlight: "neutral" },
      { label: "Total Capital Invested", value: totalCost, formatted: `₹${totalCost.toLocaleString("en-IN")}`, highlight: "neutral" },
      { label: "Total Lots/Entries", value: entries.length, formatted: `${entries.length} Execution(s)`, highlight: "cyan" },
    ],
  };
}

export interface AverageDownInput {
  existingQty: number;
  existingAvgPrice: number;
  newPrice: number;
  newQty: number;
  targetDesiredAvg?: number;
}

export function calculateAverageDown(input: AverageDownInput): TradingCalculationResult {
  const eQty = Math.max(0, Math.floor(input.existingQty || 0));
  const ePrice = Math.max(0, input.existingAvgPrice || 0);
  const nPrice = Math.max(0, input.newPrice || 0);
  const nQty = Math.max(0, Math.floor(input.newQty || 0));

  const initialInvestment = eQty * ePrice;
  const newInvestment = nQty * nPrice;
  const totalCost = initialInvestment + newInvestment;
  const totalQty = eQty + nQty;
  const newAveragePrice = totalQty > 0 ? totalCost / totalQty : 0;

  let qtyNeededForTarget = 0;
  const target = input.targetDesiredAvg || 0;
  if (target > 0 && nPrice < target && target < ePrice) {
    qtyNeededForTarget = Math.ceil((eQty * (ePrice - target)) / (target - nPrice));
  }

  return {
    primaryMetric: {
      label: "Updated Average Cost Basis",
      value: newAveragePrice,
      formatted: `₹${newAveragePrice.toFixed(2)}`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "New Combined Quantity", value: totalQty, formatted: `${totalQty.toLocaleString("en-IN")} Shares`, highlight: "neutral" },
      { label: "Total Capital Invested", value: totalCost, formatted: `₹${totalCost.toLocaleString("en-IN")}`, highlight: "neutral" },
      {
        label: "Shares to Hit Target Avg",
        value: qtyNeededForTarget,
        formatted: qtyNeededForTarget > 0 ? `${qtyNeededForTarget.toLocaleString("en-IN")} Units` : "N/A",
        highlight: "cyan",
      },
    ],
  };
}

export function calculatePointTickProfit(entry: number, exit: number, quantity: number, pointValue: number = 1): TradingCalculationResult {
  const points = exit - entry;
  const pnl = points * quantity * pointValue;

  return {
    primaryMetric: {
      label: "Total Value Realization",
      value: pnl,
      formatted: `₹${pnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: pnl >= 0,
    },
    secondaryMetrics: [
      { label: "Points Captured", value: points, formatted: `${points >= 0 ? "+" : ""}${points.toFixed(2)} pts`, highlight: points >= 0 ? "green" : "red" },
      { label: "Per-Point P&L", value: quantity * pointValue, formatted: `₹${(quantity * pointValue).toFixed(2)}/pt`, highlight: "neutral" },
    ],
  };
}
