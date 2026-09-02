import { TradingCalculationResult } from "../types";

export interface PivotPointsInput {
  high: number;
  low: number;
  close: number;
}

export function calculateStandardPivots(input: PivotPointsInput): TradingCalculationResult {
  const h = Math.max(0, input.high || 0);
  const l = Math.max(0, input.low || 0);
  const c = Math.max(0, input.close || 0);

  const pp = (h + l + c) / 3;
  const r1 = 2 * pp - l;
  const s1 = 2 * pp - h;

  return {
    primaryMetric: {
      label: "Central Pivot Point (PP)",
      value: pp,
      formatted: pp.toFixed(2),
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Resistance 1 (R1)", value: r1, formatted: r1.toFixed(2), highlight: "red" },
      { label: "Support 1 (S1)", value: s1, formatted: s1.toFixed(2), highlight: "green" },
    ],
  };
}
