// ============================================================================
// PURE TYPESCRIPT FUTURES & LEVERAGE CALCULATION ENGINE (PHASE 2)
// Notional exposure, margin utilization, and estimated liquidation models.
// ============================================================================

import { TradingCalculationResult, RiskLevel } from "../types";

export interface FuturesPnLInput {
  entryPrice: number;
  exitPrice: number;
  quantityLots: number;
  lotSize: number;
  side: "long" | "short";
  marginDeposited?: number;
}

export function calculateFuturesPnL(input: FuturesPnLInput): TradingCalculationResult {
  const entry = Math.max(0, input.entryPrice || 0);
  const exit = Math.max(0, input.exitPrice || 0);
  const lots = Math.max(1, Math.floor(input.quantityLots || 1));
  const lotSize = Math.max(1, Math.floor(input.lotSize || 1));
  const totalUnits = lots * lotSize;

  const pointMove = input.side === "long" ? exit - entry : entry - exit;
  const grossPnL = pointMove * totalUnits;
  const notionalValue = entry * totalUnits;

  const margin = Math.max(0, input.marginDeposited || 0);
  const returnOnMargin = margin > 0 ? (grossPnL / margin) * 100 : 0;
  const effectiveLeverage = margin > 0 ? notionalValue / margin : 1;

  return {
    primaryMetric: {
      label: "Futures Realized P&L",
      value: grossPnL,
      formatted: `${grossPnL >= 0 ? "+" : ""}₹${grossPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: grossPnL >= 0,
    },
    secondaryMetrics: [
      { label: "Points Captured", value: pointMove, formatted: `${pointMove >= 0 ? "+" : ""}${pointMove.toFixed(2)} pts`, highlight: pointMove >= 0 ? "green" : "red" },
      { label: "Total Traded Units", value: totalUnits, formatted: `${totalUnits.toLocaleString("en-IN")} Units (${lots} Lots)`, highlight: "neutral" },
      { label: "Notional Contract Value", value: notionalValue, formatted: `₹${notionalValue.toLocaleString("en-IN")}`, highlight: "cyan" },
      { label: "Return on Deposited Margin", value: returnOnMargin, formatted: margin > 0 ? `${returnOnMargin >= 0 ? "+" : ""}${returnOnMargin.toFixed(2)}%` : "N/A", highlight: returnOnMargin >= 0 ? "green" : "red" },
      { label: "Effective Leverage Ratio", value: effectiveLeverage, formatted: `${effectiveLeverage.toFixed(1)}x`, highlight: "neutral" },
    ],
    breakdown: [
      { item: "Initial Notional Commitment", amount: notionalValue, formatted: `₹${notionalValue.toFixed(2)}`, type: "neutral" },
      { item: "Contract Value at Exit", amount: exit * totalUnits, formatted: `₹${(exit * totalUnits).toFixed(2)}`, type: "neutral" },
      { item: "Net Trading P&L", amount: grossPnL, formatted: `₹${grossPnL.toFixed(2)}`, type: grossPnL >= 0 ? "credit" : "debit" },
    ],
  };
}

export interface FuturesMarginInput {
  contractPrice: number;
  lotSize: number;
  lots: number;
  marginRequirementPct: number;
  accountEquity?: number;
}

export function calculateFuturesMargin(input: FuturesMarginInput): TradingCalculationResult {
  const price = Math.max(0, input.contractPrice || 0);
  const lotSize = Math.max(1, Math.floor(input.lotSize || 1));
  const lots = Math.max(1, Math.floor(input.lots || 1));
  const marginPct = Math.max(0.1, input.marginRequirementPct || 10);
  const equity = Math.max(0, input.accountEquity || 0);

  const notionalValue = price * lotSize * lots;
  const initialMarginRequired = (notionalValue * marginPct) / 100;
  const leverage = marginPct > 0 ? 100 / marginPct : 1;
  const marginUtilizationPct = equity > 0 ? (initialMarginRequired / equity) * 100 : 0;

  const riskLevel: RiskLevel =
    marginUtilizationPct > 80 ? "critical" : marginUtilizationPct > 50 ? "high" : "low";

  return {
    primaryMetric: {
      label: "Initial Margin Required",
      value: initialMarginRequired,
      formatted: `₹${initialMarginRequired.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Notional Exposure", value: notionalValue, formatted: `₹${notionalValue.toLocaleString("en-IN")}`, highlight: "cyan" },
      { label: "Embedded Leverage", value: leverage, formatted: `${leverage.toFixed(1)}x`, highlight: "neutral" },
      { label: "Margin Utilization", value: marginUtilizationPct, formatted: equity > 0 ? `${marginUtilizationPct.toFixed(1)}%` : "N/A", highlight: marginUtilizationPct > 70 ? "red" : "green" },
      { label: "Free Usable Equity Remaining", value: Math.max(0, equity - initialMarginRequired), formatted: equity > 0 ? `₹${Math.max(0, equity - initialMarginRequired).toLocaleString("en-IN")}` : "N/A", highlight: "neutral" },
    ],
    riskAssessment: {
      level: riskLevel,
      score: marginUtilizationPct,
      summary: marginUtilizationPct > 75
        ? "High margin utilization. Account vulnerable to rapid margin calls during adverse volatility."
        : "Conservative margin utilization with adequate free buffer.",
    },
  };
}

export interface EstimatedLiquidationInput {
  entryPrice: number;
  leverage: number;
  side: "long" | "short";
  maintenanceMarginPct: number;
}

export function calculateEstimatedLiquidation(input: EstimatedLiquidationInput): TradingCalculationResult {
  const entry = Math.max(0, input.entryPrice || 0);
  const lev = Math.max(1, input.leverage || 10);
  const mm = Math.min(50, Math.max(0.1, input.maintenanceMarginPct || 0.5)) / 100;

  // Approximate baseline model:
  // For Long: P_liq = Entry * (1 - (1/Leverage) + MaintenanceMargin)
  // For Short: P_liq = Entry * (1 + (1/Leverage) - MaintenanceMargin)
  const initialMarginRatio = 1 / lev;

  let liqPrice = 0;
  if (input.side === "long") {
    liqPrice = Math.max(0, entry * (1 - initialMarginRatio + mm));
  } else {
    liqPrice = entry * (1 + initialMarginRatio - mm);
  }

  const distancePct = entry > 0 ? (Math.abs(entry - liqPrice) / entry) * 100 : 0;

  return {
    primaryMetric: {
      label: "Estimated Liquidation Price",
      value: liqPrice,
      formatted: `₹${liqPrice.toFixed(2)}`,
      isPositive: input.side === "long" ? liqPrice < entry : liqPrice > entry,
    },
    secondaryMetrics: [
      { label: "Adverse Move to Liquidation", value: distancePct, formatted: `${distancePct.toFixed(2)}%`, highlight: distancePct < 5 ? "red" : "cyan" },
      { label: "Initial Margin Rate", value: initialMarginRatio * 100, formatted: `${(initialMarginRatio * 100).toFixed(1)}%`, highlight: "neutral" },
      { label: "Maintenance Buffer", value: mm * 100, formatted: `${(mm * 100).toFixed(2)}%`, highlight: "neutral" },
    ],
    notes: [
      "Estimated result based strictly on isolated margin assumptions. Actual broker liquidation mechanisms vary by exchange contract rules.",
    ],
  };
}
