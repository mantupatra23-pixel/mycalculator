import { TradingCalculationResult } from "../types";

export interface PositionSizeInput {
  accountCapital: number;
  riskPercentage: number;
  entryPrice: number;
  stopLossPrice: number;
}

export function calculatePositionSize(input: PositionSizeInput): TradingCalculationResult {
  const capital = Math.max(0, input.accountCapital || 0);
  const riskPct = Math.max(0, input.riskPercentage || 0);
  const entry = Math.max(0, input.entryPrice || 0);
  const sl = Math.max(0, input.stopLossPrice || 0);

  const maxRiskAmount = (capital * riskPct) / 100;
  const perShareRisk = Math.abs(entry - sl);
  const allowableQuantity = perShareRisk > 0 ? Math.floor(maxRiskAmount / perShareRisk) : 0;
  const maxPositionValue = allowableQuantity * entry;

  return {
    primaryMetric: {
      label: "Allowable Quantity (Units)",
      value: allowableQuantity,
      formatted: `${allowableQuantity.toLocaleString("en-IN")} Shares`,
      isPositive: true,
    },
    secondaryMetrics: [
      {
        label: "Total Capital at Risk",
        value: maxRiskAmount,
        formatted: `₹${maxRiskAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        highlight: "red",
      },
      {
        label: "Per Share Risk",
        value: perShareRisk,
        formatted: `₹${perShareRisk.toFixed(2)}`,
        highlight: "neutral",
      },
      {
        label: "Required Trade Value",
        value: maxPositionValue,
        formatted: `₹${maxPositionValue.toLocaleString("en-IN")}`,
        highlight: "cyan",
      },
    ],
    riskAssessment: {
      level: riskPct > 3 ? "critical" : riskPct > 2 ? "high" : riskPct > 1 ? "moderate" : "low",
      score: riskPct,
      summary: riskPct > 2 ? "Risk exceeds professional 1-2% threshold." : "Position sized within prudent risk guidelines.",
    },
  };
}
