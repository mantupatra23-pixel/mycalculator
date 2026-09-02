// ============================================================================
// PURE TYPESCRIPT TRADING RISK MANAGEMENT ENGINE (PHASE 1)
// Rigorous nonlinear formulas for ruin probability and capital preservation.
// ============================================================================

import { TradingCalculationResult, RiskLevel } from "../types";

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

  if (entry === 0 || perShareRisk === 0) {
    return {
      primaryMetric: { label: "Conservative Quantity", value: 0, formatted: "0 Units", isPositive: false },
      secondaryMetrics: [
        { label: "Max Account Risk", value: maxRiskAmount, formatted: `₹${maxRiskAmount.toFixed(2)}`, highlight: "red" },
        { label: "Stop-Loss Gap", value: 0, formatted: "0.00 pts", highlight: "neutral" },
      ],
      notes: ["Entry and Stop-Loss prices cannot be equal (per-share risk must be > 0)."],
    };
  }

  const allowableQty = Math.floor(maxRiskAmount / perShareRisk);
  const totalPositionValue = allowableQty * entry;
  const capitalUtilization = capital > 0 ? (totalPositionValue / capital) * 100 : 0;
  const actualRiskAmount = allowableQty * perShareRisk;

  const riskLevel: RiskLevel =
    riskPct > 3 ? "critical" : riskPct > 2 ? "high" : riskPct > 1 ? "moderate" : "low";

  return {
    primaryMetric: {
      label: "Allowable Quantity (Units)",
      value: allowableQty,
      formatted: `${allowableQty.toLocaleString("en-IN")} Shares`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Max Capital at Risk", value: actualRiskAmount, formatted: `₹${actualRiskAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, highlight: "red" },
      { label: "Risk Per Share", value: perShareRisk, formatted: `₹${perShareRisk.toFixed(2)}`, highlight: "neutral" },
      { label: "Total Position Value", value: totalPositionValue, formatted: `₹${totalPositionValue.toLocaleString("en-IN")}`, highlight: "cyan" },
      { label: "Capital Utilization", value: capitalUtilization, formatted: `${capitalUtilization.toFixed(1)}%`, highlight: capitalUtilization > 100 ? "red" : "neutral" },
    ],
    riskAssessment: {
      level: riskLevel,
      score: riskPct,
      summary: riskPct > 2
        ? "Exceeds standard 1%–2% institutional risk guidelines."
        : "Conservative position size within disciplined limits.",
    },
  };
}

export interface RiskRewardInput {
  entryPrice: number;
  stopLossPrice: number;
  targetPrice: number;
  tradeType: "long" | "short";
}

export function calculateRiskReward(input: RiskRewardInput): TradingCalculationResult {
  const entry = Math.max(0, input.entryPrice || 0);
  const sl = Math.max(0, input.stopLossPrice || 0);
  const target = Math.max(0, input.targetPrice || 0);

  const riskPoints = Math.abs(entry - sl);
  const rewardPoints = Math.abs(target - entry);

  const isValidLong = input.tradeType === "long" && sl < entry && target > entry;
  const isValidShort = input.tradeType === "short" && sl > entry && target < entry;
  const isValid = isValidLong || isValidShort;

  if (riskPoints === 0 || !isValid) {
    return {
      primaryMetric: { label: "Risk-to-Reward Ratio", value: 0, formatted: "Invalid Setup", isPositive: false },
      secondaryMetrics: [],
      notes: ["For a Long trade, Target > Entry > Stop Loss. For a Short trade, Stop Loss > Entry > Target."],
    };
  }

  const rrRatio = rewardPoints / riskPoints;
  const winRateNeeded = (1 / (1 + rrRatio)) * 100;

  return {
    primaryMetric: {
      label: "Reward-to-Risk Ratio",
      value: rrRatio,
      formatted: `1 : ${rrRatio.toFixed(2)}`,
      isPositive: rrRatio >= 1.5,
    },
    secondaryMetrics: [
      { label: "Potential Reward", value: rewardPoints, formatted: `+${rewardPoints.toFixed(2)} pts`, highlight: "green" },
      { label: "Risk Distance", value: riskPoints, formatted: `-${riskPoints.toFixed(2)} pts`, highlight: "red" },
      { label: "Break-Even Win Rate", value: winRateNeeded, formatted: `${winRateNeeded.toFixed(1)}%`, highlight: "cyan" },
    ],
    riskAssessment: {
      level: rrRatio < 1 ? "high" : rrRatio < 1.5 ? "moderate" : "low",
      score: rrRatio,
      summary: rrRatio < 1.5
        ? "Setup offers low asymmetry (< 1:1.5). High win-rate required."
        : "Favorable asymmetric profile with > 1:1.5 reward multiplier.",
    },
  };
}

export function calculateDrawdownRecovery(drawdownPct: number, startingCapital: number = 100000): TradingCalculationResult {
  const d = Math.min(99.9, Math.max(0, drawdownPct));
  const capital = Math.max(0, startingCapital);

  // Nonlinear recovery relationship: R = D / (1 - D)
  const recoveryGainNeededPct = d < 100 ? (d / (100 - d)) * 100 : 0;
  const capitalRemaining = capital * (1 - d / 100);
  const recoveryAmountRequired = capital - capitalRemaining;

  const riskLevel: RiskLevel =
    d >= 50 ? "critical" : d >= 30 ? "high" : d >= 15 ? "moderate" : "low";

  return {
    primaryMetric: {
      label: "Required Gain to Recover",
      value: recoveryGainNeededPct,
      formatted: `+${recoveryGainNeededPct.toFixed(2)}%`,
      isPositive: false,
    },
    secondaryMetrics: [
      { label: "Current Capital Left", value: capitalRemaining, formatted: `₹${capitalRemaining.toLocaleString("en-IN")}`, highlight: "red" },
      { label: "Capital Lost in Drawdown", value: recoveryAmountRequired, formatted: `-₹${recoveryAmountRequired.toLocaleString("en-IN")}`, highlight: "red" },
      { label: "Break-Even Corpus", value: capital, formatted: `₹${capital.toLocaleString("en-IN")}`, highlight: "neutral" },
    ],
    riskAssessment: {
      level: riskLevel,
      score: d,
      summary: d >= 50
        ? "Severe capital impairment (>50%). Requires over 100% gain to restore equity."
        : "Recoverable drawdown. Strict loss prevention advised.",
    },
  };
}

export interface LossLimitInput {
  accountCapital: number;
  maxDailyLossPct: number;
  realizedLossToday: number;
  unrealizedLossToday?: number;
}

export function calculateDailyLossLimit(input: LossLimitInput): TradingCalculationResult {
  const capital = Math.max(0, input.accountCapital || 0);
  const maxLossPct = Math.max(0, input.maxDailyLossPct || 0);
  const realized = Math.max(0, input.realizedLossToday || 0);
  const unrealized = Math.max(0, input.unrealizedLossToday || 0);
  const totalCurrentLoss = realized + unrealized;

  const maxAllowableRupeeLoss = (capital * maxLossPct) / 100;
  const remainingAllowance = Math.max(0, maxAllowableRupeeLoss - totalCurrentLoss);
  const utilizationPct = maxAllowableRupeeLoss > 0 ? (totalCurrentLoss / maxAllowableRupeeLoss) * 100 : 0;

  const isBreached = totalCurrentLoss >= maxAllowableRupeeLoss;

  return {
    primaryMetric: {
      label: "Remaining Loss Buffer",
      value: remainingAllowance,
      formatted: `₹${remainingAllowance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      isPositive: !isBreached,
    },
    secondaryMetrics: [
      { label: "Maximum Permitted Loss", value: maxAllowableRupeeLoss, formatted: `₹${maxAllowableRupeeLoss.toFixed(2)}`, highlight: "red" },
      { label: "Current Loss Incurred", value: totalCurrentLoss, formatted: `₹${totalCurrentLoss.toFixed(2)}`, highlight: "red" },
      { label: "Limit Capacity Consumed", value: utilizationPct, formatted: `${utilizationPct.toFixed(1)}%`, highlight: utilizationPct > 80 ? "red" : "neutral" },
    ],
    riskAssessment: {
      level: isBreached ? "critical" : utilizationPct > 75 ? "high" : "low",
      score: utilizationPct,
      summary: isBreached
        ? "Daily loss threshold reached. Close terminals to eliminate revenge trading."
        : "Loss allowance intact. Trade within verified risk boundaries.",
    },
  };
}

export interface RiskOfRuinInput {
  winRatePct: number;
  payoffRatio: number; // Avg Win / Avg Loss
  riskPerTradePct: number;
  capitalUnits?: number; // Defaults to 100 / riskPerTradePct
}

export function calculateRiskOfRuin(input: RiskOfRuinInput): TradingCalculationResult {
  const W = Math.min(0.99, Math.max(0.01, (input.winRatePct || 50) / 100));
  const R = Math.max(0.1, input.payoffRatio || 1);
  const riskPct = Math.max(0.1, input.riskPerTradePct || 2);
  const U = Math.max(1, Math.round(input.capitalUnits || 100 / riskPct));

  // Statistical Edge: E = W*R - (1 - W)
  const edge = W * R - (1 - W);

  let ruinProbabilityPct = 100;
  if (edge <= 0) {
    ruinProbabilityPct = 100;
  } else {
    // Standard discrete Gambler's Ruin / Perry approximation for trading
    const ratio = Math.max(0, (1 - edge / (W * R + (1 - W))) / (1 + edge / (W * R + (1 - W))));
    ruinProbabilityPct = Math.min(100, Math.max(0, Math.pow(ratio, U) * 100));
  }

  const riskLevel: RiskLevel =
    ruinProbabilityPct > 20 ? "critical" : ruinProbabilityPct > 5 ? "high" : ruinProbabilityPct > 1 ? "moderate" : "low";

  return {
    primaryMetric: {
      label: "Statistical Risk of Ruin",
      value: ruinProbabilityPct,
      formatted: `${ruinProbabilityPct < 0.01 && ruinProbabilityPct > 0 ? "< 0.01" : ruinProbabilityPct.toFixed(2)}%`,
      isPositive: ruinProbabilityPct < 1,
    },
    secondaryMetrics: [
      { label: "Calculated Edge", value: edge, formatted: `${edge > 0 ? "+" : ""}${edge.toFixed(3)}`, highlight: edge > 0 ? "green" : "red" },
      { label: "Account Buffer Units", value: U, formatted: `${U} Consecutive Stops`, highlight: "cyan" },
      { label: "Win Probability", value: W * 100, formatted: `${(W * 100).toFixed(0)}%`, highlight: "neutral" },
    ],
    riskAssessment: {
      level: riskLevel,
      score: ruinProbabilityPct,
      summary: ruinProbabilityPct > 5
        ? "Elevated probability of capital ruin. Lower risk per trade or increase asymmetric payoff."
        : "Robust mathematical edge. Risk of account wipeout is negligible under disciplined sizing.",
    },
  };
}

export function calculateConsecutiveLosses(startingCapital: number, riskPerTradePct: number, consecutiveCount: number): TradingCalculationResult {
  const cap = Math.max(0, startingCapital);
  const r = Math.max(0, riskPerTradePct) / 100;
  const n = Math.max(1, Math.min(50, consecutiveCount));

  // Compounded drawdown: C_n = C_0 * (1 - r)^n
  const finalCapital = cap * Math.pow(1 - r, n);
  const totalLost = cap - finalCapital;
  const drawdownPct = cap > 0 ? (totalLost / cap) * 100 : 0;

  return {
    primaryMetric: {
      label: "Capital Post Drawdown Streak",
      value: finalCapital,
      formatted: `₹${finalCapital.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      isPositive: drawdownPct < 25,
    },
    secondaryMetrics: [
      { label: "Total Equity Erosion", value: drawdownPct, formatted: `-${drawdownPct.toFixed(2)}%`, highlight: "red" },
      { label: "Cash Lost", value: totalLost, formatted: `-₹${totalLost.toLocaleString("en-IN")}`, highlight: "red" },
      { label: "Consecutive Losses", value: n, formatted: `${n} Trades`, highlight: "neutral" },
    ],
  };
}
