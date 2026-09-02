// ============================================================================
// PURE TYPESCRIPT INDIAN BROKERAGE & STATUTORY CHARGES ENGINE (PHASE 1)
// Official SEBI, NSE, BSE, Stamp Duty, and 18% GST calculation model.
// ============================================================================

import { TradingCalculationResult } from "../types";

export type BrokerId = "zerodha" | "groww" | "angelone" | "custom";
export type SegmentId = "equity-intraday" | "equity-delivery";

export interface BrokerPreset {
  id: BrokerId;
  name: string;
  intradayRatePct: number;
  intradayMaxPerOrder: number;
  deliveryRatePct: number;
  deliveryMaxPerOrder: number;
  dpChargesPerScripSell: number;
  lastVerified: string;
}

export const BROKER_PRESETS: Record<BrokerId, BrokerPreset> = {
  zerodha: {
    id: "zerodha",
    name: "Zerodha",
    intradayRatePct: 0.03,
    intradayMaxPerOrder: 20,
    deliveryRatePct: 0,
    deliveryMaxPerOrder: 0,
    dpChargesPerScripSell: 13.5,
    lastVerified: "August 2026",
  },
  groww: {
    id: "groww",
    name: "Groww",
    intradayRatePct: 0.05,
    intradayMaxPerOrder: 20,
    deliveryRatePct: 0.05,
    deliveryMaxPerOrder: 20,
    dpChargesPerScripSell: 13.5,
    lastVerified: "August 2026",
  },
  angelone: {
    id: "angelone",
    name: "Angel One",
    intradayRatePct: 0.25,
    intradayMaxPerOrder: 20,
    deliveryRatePct: 0,
    deliveryMaxPerOrder: 0,
    dpChargesPerScripSell: 20,
    lastVerified: "August 2026",
  },
  custom: {
    id: "custom",
    name: "Custom Broker",
    intradayRatePct: 0.03,
    intradayMaxPerOrder: 20,
    deliveryRatePct: 0,
    deliveryMaxPerOrder: 0,
    dpChargesPerScripSell: 13.5,
    lastVerified: "Custom Configuration",
  },
};

export interface BrokerageCalculationInput {
  broker: BrokerId;
  segment: SegmentId;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  customIntradayFlat?: number;
}

export interface DetailedChargesBreakdown {
  buyValue: number;
  sellValue: number;
  totalTurnover: number;
  brokerage: number;
  stt: number;
  exchangeTurnoverCharges: number;
  sebiTurnoverCharges: number;
  stampDuty: number;
  gstBase: number;
  gstAmount: number;
  dpCharges: number;
  totalCharges: number;
  grossPnL: number;
  netPnL: number;
  breakEvenPoints: number;
  breakEvenSellPrice: number;
}

export function calculateDetailedCharges(input: BrokerageCalculationInput): DetailedChargesBreakdown {
  const buyPrice = Math.max(0, input.buyPrice || 0);
  const sellPrice = Math.max(0, input.sellPrice || 0);
  const qty = Math.max(0, Math.floor(input.quantity || 0));
  const preset = BROKER_PRESETS[input.broker] || BROKER_PRESETS.zerodha;

  const buyValue = buyPrice * qty;
  const sellValue = sellPrice * qty;
  const totalTurnover = buyValue + sellValue;

  // 1. Brokerage calculation (2 executed orders: buy + sell)
  let brokerage = 0;
  if (input.segment === "equity-intraday") {
    const buyBrokerage = Math.min(preset.intradayMaxPerOrder, (buyValue * preset.intradayRatePct) / 100);
    const sellBrokerage = Math.min(preset.intradayMaxPerOrder, (sellValue * preset.intradayRatePct) / 100);
    brokerage = buyBrokerage + sellBrokerage;
  } else {
    // Equity Delivery
    const buyBrokerage = preset.deliveryMaxPerOrder > 0
      ? Math.min(preset.deliveryMaxPerOrder, (buyValue * preset.deliveryRatePct) / 100)
      : 0;
    const sellBrokerage = preset.deliveryMaxPerOrder > 0
      ? Math.min(preset.deliveryMaxPerOrder, (sellValue * preset.deliveryRatePct) / 100)
      : 0;
    brokerage = buyBrokerage + sellBrokerage;
  }

  // 2. Securities Transaction Tax (STT)
  // Intraday: 0.025% on Sell side only
  // Delivery: 0.1% on both Buy and Sell sides
  let stt = 0;
  if (input.segment === "equity-intraday") {
    stt = Math.round((sellValue * 0.00025));
  } else {
    stt = Math.round((buyValue * 0.001) + (sellValue * 0.001));
  }

  // 3. Exchange Transaction Charges (NSE standard: 0.00297% on turnover)
  const exchangeTurnoverCharges = totalTurnover * 0.0000297;

  // 4. SEBI Turnover Fees (₹10 / Crore = 0.0001% of turnover)
  const sebiTurnoverCharges = totalTurnover * 0.000001;

  // 5. Stamp Duty (Applies strictly to BUY side)
  // Intraday: 0.003% (₹300/Cr)
  // Delivery: 0.015% (₹1500/Cr)
  let stampDuty = 0;
  if (input.segment === "equity-intraday") {
    stampDuty = Math.round(buyValue * 0.00003);
  } else {
    stampDuty = Math.round(buyValue * 0.00015);
  }

  // 6. GST at 18% applied strictly to taxable services: (Brokerage + Exchange Charges + SEBI Fees)
  const gstBase = brokerage + exchangeTurnoverCharges + sebiTurnoverCharges;
  const gstAmount = gstBase * 0.18;

  // 7. DP Charges (Applies to Delivery Sell side only)
  const dpCharges = input.segment === "equity-delivery" && sellValue > 0
    ? preset.dpChargesPerScripSell * 1.18 // Including 18% GST on DP charge
    : 0;

  const totalCharges =
    brokerage + stt + exchangeTurnoverCharges + sebiTurnoverCharges + stampDuty + gstAmount + dpCharges;

  const grossPnL = sellValue - buyValue;
  const netPnL = grossPnL - totalCharges;

  const breakEvenPoints = qty > 0 ? totalCharges / qty : 0;
  const breakEvenSellPrice = buyPrice + breakEvenPoints;

  return {
    buyValue,
    sellValue,
    totalTurnover,
    brokerage,
    stt,
    exchangeTurnoverCharges,
    sebiTurnoverCharges,
    stampDuty,
    gstBase,
    gstAmount,
    dpCharges,
    totalCharges,
    grossPnL,
    netPnL,
    breakEvenPoints,
    breakEvenSellPrice,
  };
}

export function calculateTradingCharges(input: BrokerageCalculationInput): TradingCalculationResult {
  const d = calculateDetailedCharges(input);

  return {
    primaryMetric: {
      label: "Total Frictions & Charges",
      value: d.totalCharges,
      formatted: `₹${d.totalCharges.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: false,
    },
    secondaryMetrics: [
      { label: "Net P&L Realized", value: d.netPnL, formatted: `${d.netPnL >= 0 ? "+" : ""}₹${d.netPnL.toFixed(2)}`, highlight: d.netPnL >= 0 ? "green" : "red" },
      { label: "Brokerage Commission", value: d.brokerage, formatted: `₹${d.brokerage.toFixed(2)}`, highlight: "neutral" },
      { label: "Government Taxes & STT", value: d.totalCharges - d.brokerage, formatted: `₹${(d.totalCharges - d.brokerage).toFixed(2)}`, highlight: "red" },
      { label: "Break-Even Move Needed", value: d.breakEvenPoints, formatted: `+₹${d.breakEvenPoints.toFixed(2)}`, highlight: "cyan" },
    ],
    breakdown: [
      { item: "Brokerage Commission", amount: d.brokerage, formatted: `₹${d.brokerage.toFixed(2)}`, type: "debit" },
      { item: "Securities Transaction Tax (STT)", amount: d.stt, formatted: `₹${d.stt.toFixed(2)}`, type: "debit" },
      { item: "Exchange Transaction Charges", amount: d.exchangeTurnoverCharges, formatted: `₹${d.exchangeTurnoverCharges.toFixed(2)}`, type: "debit" },
      { item: "GST (18% on Taxable Services)", amount: d.gstAmount, formatted: `₹${d.gstAmount.toFixed(2)}`, type: "debit" },
      { item: "SEBI Turnover Fees", amount: d.sebiTurnoverCharges, formatted: `₹${d.sebiTurnoverCharges.toFixed(2)}`, type: "debit" },
      { item: "Stamp Duty (State Levy)", amount: d.stampDuty, formatted: `₹${d.stampDuty.toFixed(2)}`, type: "debit" },
      ...(d.dpCharges > 0
        ? [{ item: "Depository Participant (DP) Charge", amount: d.dpCharges, formatted: `₹${d.dpCharges.toFixed(2)}`, type: "debit" as const }]
        : []),
    ],
  };
}
