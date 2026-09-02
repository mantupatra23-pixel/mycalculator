import { TradingCalculationResult } from "../types";

export interface PnLInput {
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  tradeType: "long" | "short";
  leverage?: number;
}

export function calculateBasePnL(input: PnLInput): TradingCalculationResult {
  const entry = Math.max(0, input.entryPrice || 0);
  const exit = Math.max(0, input.exitPrice || 0);
  const qty = Math.max(0, input.quantity || 0);
  const points = input.tradeType === "long" ? exit - entry : entry - exit;
  const grossPnL = points * qty;
  const investedCapital = entry * qty;
  const returnPct = investedCapital > 0 ? (grossPnL / investedCapital) * 100 : 0;

  return {
    primaryMetric: {
      label: "Gross Profit / Loss",
      value: grossPnL,
      formatted: `₹${grossPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: grossPnL >= 0,
    },
    secondaryMetrics: [
      {
        label: "Return on Capital",
        value: returnPct,
        formatted: `${returnPct.toFixed(2)}%`,
        highlight: returnPct >= 0 ? "green" : "red",
      },
      {
        label: "Points Difference",
        value: points,
        formatted: `${points >= 0 ? "+" : ""}${points.toFixed(2)} pts`,
        highlight: points >= 0 ? "green" : "red",
      },
      {
        label: "Trade Value",
        value: investedCapital,
        formatted: `₹${investedCapital.toLocaleString("en-IN")}`,
        highlight: "neutral",
      },
    ],
  };
}
