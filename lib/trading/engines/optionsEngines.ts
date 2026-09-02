import { TradingCalculationResult } from "../types";

export interface OptionsStubInput {
  strikePrice: number;
  spotPrice: number;
  premium: number;
  optionType: "call" | "put";
}

export function calculateOptionPayoff(input: OptionsStubInput): TradingCalculationResult {
  const strike = Math.max(0, input.strikePrice || 0);
  const spot = Math.max(0, input.spotPrice || 0);
  const prem = Math.max(0, input.premium || 0);

  const intrinsic = input.optionType === "call" ? Math.max(0, spot - strike) : Math.max(0, strike - spot);
  const timeValue = Math.max(0, prem - intrinsic);
  const breakeven = input.optionType === "call" ? strike + prem : strike - prem;

  return {
    primaryMetric: {
      label: "Break-Even Expiry Price",
      value: breakeven,
      formatted: `₹${breakeven.toFixed(2)}`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Intrinsic Value", value: intrinsic, formatted: `₹${intrinsic.toFixed(2)}`, highlight: "cyan" },
      { label: "Extrinsic (Time) Value", value: timeValue, formatted: `₹${timeValue.toFixed(2)}`, highlight: "neutral" },
      { label: "Max Loss (Premium Paid)", value: prem, formatted: `₹${prem.toFixed(2)}`, highlight: "red" },
    ],
  };
}
