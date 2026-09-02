// ============================================================================
// PURE TYPESCRIPT OPTIONS & MULTI-LEG STRATEGY ENGINE (PHASE 2 HARDENED)
// Zero external chart libraries. Clean Indian Rupee formatting.
// ============================================================================

import {
  OptionLeg,
  PayoffPoint,
  StrategyPayoffResult,
  TradingCalculationResult,
} from "../types";

export type { OptionLeg, PayoffPoint, StrategyPayoffResult } from "../types";

export interface SingleOptionInput {
  spotPrice: number;
  strikePrice: number;
  premium: number;
  quantity: number;
  contractMultiplier?: number;
  optionType: "call" | "put";
  side: "long" | "short";
  targetPriceAtExpiry?: number;
}

export function calculateSingleOptionMetrics(input: SingleOptionInput): TradingCalculationResult {
  const S = Math.max(0, input.spotPrice || 0);
  const K = Math.max(0, input.strikePrice || 0);
  const P = Math.max(0, input.premium || 0);
  const qty = Math.max(1, Math.floor(input.quantity || 1));
  const mult = Math.max(1, Math.floor(input.contractMultiplier || 1));
  const totalUnits = qty * mult;
  const expiryS = input.targetPriceAtExpiry !== undefined && input.targetPriceAtExpiry >= 0
    ? input.targetPriceAtExpiry
    : S;

  // 1. Intrinsic and Extrinsic (Time) Value
  let intrinsicPerUnit = 0;
  if (input.optionType === "call") {
    intrinsicPerUnit = Math.max(0, S - K);
  } else {
    intrinsicPerUnit = Math.max(0, K - S);
  }
  const timeValuePerUnit = Math.max(0, P - intrinsicPerUnit);

  // 2. Moneyness Status
  let moneyness: "ITM" | "ATM" | "OTM" = "ATM";
  const diffPct = K > 0 ? ((S - K) / K) * 100 : 0;
  if (Math.abs(diffPct) < 0.25) {
    moneyness = "ATM";
  } else if (input.optionType === "call") {
    moneyness = S > K ? "ITM" : "OTM";
  } else {
    moneyness = S < K ? "ITM" : "OTM";
  }

  // 3. Breakeven Price at Expiry
  let breakeven = 0;
  if (input.optionType === "call") {
    breakeven = K + P;
  } else {
    breakeven = Math.max(0, K - P);
  }

  // 4. Payoff & Profit at Expiry Price
  let payoffPerUnit = 0;
  if (input.optionType === "call") {
    payoffPerUnit = Math.max(0, expiryS - K);
  } else {
    payoffPerUnit = Math.max(0, K - expiryS);
  }

  let unitProfit = 0;
  if (input.side === "long") {
    unitProfit = payoffPerUnit - P;
  } else {
    unitProfit = P - payoffPerUnit;
  }
  const totalPnL = unitProfit * totalUnits;
  const totalPremium = P * totalUnits;
  const returnOnPremium = totalPremium > 0 ? (totalPnL / totalPremium) * 100 : 0;

  // Max Profit / Max Loss
  let maxProfitDesc = "";
  let maxLossDesc = "";
  if (input.side === "long") {
    if (input.optionType === "call") {
      maxProfitDesc = "Unlimited";
    } else {
      const maxPutProfitTotal = Math.max(0, (K - P) * totalUnits);
      maxProfitDesc = `₹${maxPutProfitTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    maxLossDesc = `-₹${totalPremium.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Premium Paid)`;
  } else {
    // Short position
    maxProfitDesc = `+₹${totalPremium.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Premium Received)`;
    if (input.optionType === "call") {
      maxLossDesc = "Unlimited";
    } else {
      const maxPutLossTotal = Math.max(0, (K - P) * totalUnits);
      maxLossDesc = `-₹${maxPutLossTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  return {
    primaryMetric: {
      label: `Net Option P&L (at ₹${expiryS.toFixed(2)})`,
      value: totalPnL,
      formatted: `${totalPnL >= 0 ? "+" : ""}₹${totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: totalPnL >= 0,
    },
    secondaryMetrics: [
      { label: "Moneyness Status", value: moneyness, formatted: `${moneyness} (${moneyness === "ITM" ? "In-The-Money" : moneyness === "OTM" ? "Out-of-The-Money" : "At-The-Money"})`, highlight: moneyness === "ITM" ? "green" : moneyness === "OTM" ? "red" : "neutral" },
      { label: "Breakeven at Expiry", value: breakeven, formatted: `₹${breakeven.toFixed(2)}`, highlight: "cyan" },
      { label: "Intrinsic Value / Unit", value: intrinsicPerUnit, formatted: `₹${intrinsicPerUnit.toFixed(2)}`, highlight: "neutral" },
      { label: "Extrinsic (Time) Value", value: timeValuePerUnit, formatted: `₹${timeValuePerUnit.toFixed(2)}`, highlight: "neutral" },
      { label: "Maximum Potential Upside", value: 0, formatted: maxProfitDesc, highlight: "green" },
      { label: "Maximum Downside Risk", value: 0, formatted: maxLossDesc, highlight: "red" },
      { label: "Return on Premium", value: returnOnPremium, formatted: `${returnOnPremium >= 0 ? "+" : ""}${returnOnPremium.toFixed(1)}%`, highlight: returnOnPremium >= 0 ? "green" : "red" },
    ],
    breakdown: [
      { item: "Total Premium Commitment", amount: totalPremium, formatted: `₹${totalPremium.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, type: input.side === "long" ? "debit" : "credit" },
      { item: "Per-Unit Expiration Payoff", amount: payoffPerUnit, formatted: `₹${payoffPerUnit.toFixed(2)}`, type: "neutral" },
      { item: "Net In-Pocket P&L", amount: totalPnL, formatted: `₹${totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, type: totalPnL >= 0 ? "credit" : "debit" },
    ],
  };
}

export function calculateLegPnLAtPrice(leg: OptionLeg, S: number): number {
  const K = leg.strikePrice;
  const P = leg.premium;
  const units = leg.quantity * leg.contractMultiplier;

  let intrinsic = 0;
  if (leg.optionType === "call") {
    intrinsic = Math.max(0, S - K);
  } else {
    intrinsic = Math.max(0, K - S);
  }

  const perUnitProfit = leg.side === "long" ? intrinsic - P : P - intrinsic;
  return perUnitProfit * units;
}

export function calculateStrategyPayoff(
  strategyName: string,
  legs: OptionLeg[],
  currentSpot: number
): StrategyPayoffResult {
  if (legs.length === 0) {
    return {
      name: strategyName,
      netPremium: 0,
      isNetCredit: false,
      maxProfit: 0,
      maxLoss: 0,
      breakevens: [],
      riskRewardRatio: "N/A",
      selectedSpotPnL: 0,
      payoffCurve: [],
      profitZones: [],
    };
  }

  let netPremium = 0;
  for (const leg of legs) {
    const cost = leg.premium * leg.quantity * leg.contractMultiplier;
    netPremium += leg.side === "long" ? -cost : cost;
  }
  const isNetCredit = netPremium > 0;

  const strikes = legs.map((l) => l.strikePrice);
  const minStrike = Math.min(...strikes, currentSpot);
  const maxStrike = Math.max(...strikes, currentSpot);
  const padding = Math.max(20, (maxStrike - minStrike) * 0.4 || currentSpot * 0.15);

  const startPrice = Math.max(0, Math.floor(minStrike - padding));
  const endPrice = Math.ceil(maxStrike + padding);
  const steps = 60;
  const stepSize = (endPrice - startPrice) / steps;

  const payoffCurve: PayoffPoint[] = [];
  let minPnL = Infinity;
  let maxPnL = -Infinity;

  for (let i = 0; i <= steps; i++) {
    const s = startPrice + i * stepSize;
    let totalPnL = 0;
    for (const leg of legs) {
      totalPnL += calculateLegPnLAtPrice(leg, s);
    }

    if (totalPnL < minPnL) minPnL = totalPnL;
    if (totalPnL > maxPnL) maxPnL = totalPnL;

    payoffCurve.push({
      underlyingPrice: Math.round(s * 100) / 100,
      payoff: totalPnL,
      profit: totalPnL,
    });
  }

  const breakevens: number[] = [];
  for (let i = 0; i < payoffCurve.length - 1; i++) {
    const p1 = payoffCurve[i];
    const p2 = payoffCurve[i + 1];

    if ((p1.profit <= 0 && p2.profit >= 0) || (p1.profit >= 0 && p2.profit <= 0)) {
      if (p1.profit === 0) {
        breakevens.push(p1.underlyingPrice);
      } else {
        const fraction = Math.abs(p1.profit) / (Math.abs(p1.profit) + Math.abs(p2.profit));
        const be = p1.underlyingPrice + fraction * (p2.underlyingPrice - p1.underlyingPrice);
        breakevens.push(Math.round(be * 100) / 100);
      }
    }
  }

  let totalFarRight = 0;
  let totalFarLeft = 0;
  for (const leg of legs) {
    totalFarRight += calculateLegPnLAtPrice(leg, endPrice * 2);
    totalFarLeft += calculateLegPnLAtPrice(leg, 0);
  }

  const isUnlimitedProfit = totalFarRight > maxPnL * 1.5 || totalFarLeft > maxPnL * 1.5;
  const isUnlimitedLoss = totalFarRight < minPnL * 1.5 || totalFarLeft < minPnL * 1.5;

  const finalMaxProfit: number | "Unlimited" = isUnlimitedProfit ? "Unlimited" : Math.round(maxPnL * 100) / 100;
  const finalMaxLoss: number | "Unlimited" = isUnlimitedLoss ? "Unlimited" : Math.abs(Math.round(minPnL * 100) / 100);

  const currentPnL = legs.reduce((acc, leg) => acc + calculateLegPnLAtPrice(leg, currentSpot), 0);

  const zones: string[] = [];
  if (breakevens.length === 1) {
    if (payoffCurve[payoffCurve.length - 1].profit > 0) {
      zones.push(`Above ₹${breakevens[0].toFixed(2)}`);
    } else {
      zones.push(`Below ₹${breakevens[0].toFixed(2)}`);
    }
  } else if (breakevens.length >= 2) {
    const midIndex = Math.floor(payoffCurve.length / 2);
    if (payoffCurve[midIndex].profit > 0) {
      zones.push(`Between ₹${breakevens[0].toFixed(2)} and ₹${breakevens[1].toFixed(2)}`);
    } else {
      zones.push(`Below ₹${breakevens[0].toFixed(2)} or Above ₹${breakevens[1].toFixed(2)}`);
    }
  }

  const rrRatio =
    typeof finalMaxProfit === "number" && typeof finalMaxLoss === "number" && finalMaxLoss > 0
      ? `1 : ${(finalMaxProfit / finalMaxLoss).toFixed(2)}`
      : "Asymmetric / Dynamic";

  return {
    name: strategyName,
    netPremium: Math.abs(netPremium),
    isNetCredit,
    maxProfit: finalMaxProfit,
    maxLoss: finalMaxLoss,
    breakevens: Array.from(new Set(breakevens)),
    riskRewardRatio: rrRatio,
    selectedSpotPnL: Math.round(currentPnL * 100) / 100,
    payoffCurve,
    profitZones: zones,
  };
}

export function createBullCallSpread(lowerK: number, upperK: number, lowerPrem: number, upperPrem: number, qty: number = 1, mult: number = 50): OptionLeg[] {
  return [
    { id: "leg-1", optionType: "call", side: "long", strikePrice: lowerK, premium: lowerPrem, quantity: qty, contractMultiplier: mult },
    { id: "leg-2", optionType: "call", side: "short", strikePrice: upperK, premium: upperPrem, quantity: qty, contractMultiplier: mult },
  ];
}

export function createBearPutSpread(upperK: number, lowerK: number, upperPrem: number, lowerPrem: number, qty: number = 1, mult: number = 50): OptionLeg[] {
  return [
    { id: "leg-1", optionType: "put", side: "long", strikePrice: upperK, premium: upperPrem, quantity: qty, contractMultiplier: mult },
    { id: "leg-2", optionType: "put", side: "short", strikePrice: lowerK, premium: lowerPrem, quantity: qty, contractMultiplier: mult },
  ];
}

export function createLongStraddle(strike: number, callPrem: number, putPrem: number, qty: number = 1, mult: number = 50): OptionLeg[] {
  return [
    { id: "leg-1", optionType: "call", side: "long", strikePrice: strike, premium: callPrem, quantity: qty, contractMultiplier: mult },
    { id: "leg-2", optionType: "put", side: "long", strikePrice: strike, premium: putPrem, quantity: qty, contractMultiplier: mult },
  ];
}

export function createIronCondor(
  putBuyK: number,
  putSellK: number,
  callSellK: number,
  callBuyK: number,
  putBuyPrem: number,
  putSellPrem: number,
  callSellPrem: number,
  callBuyPrem: number,
  qty: number = 1,
  mult: number = 50
): OptionLeg[] {
  return [
    { id: "leg-1", optionType: "put", side: "long", strikePrice: putBuyK, premium: putBuyPrem, quantity: qty, contractMultiplier: mult },
    { id: "leg-2", optionType: "put", side: "short", strikePrice: putSellK, premium: putSellPrem, quantity: qty, contractMultiplier: mult },
    { id: "leg-3", optionType: "call", side: "short", strikePrice: callSellK, premium: callSellPrem, quantity: qty, contractMultiplier: mult },
    { id: "leg-4", optionType: "call", side: "long", strikePrice: callBuyK, premium: callBuyPrem, quantity: qty, contractMultiplier: mult },
  ];
}
