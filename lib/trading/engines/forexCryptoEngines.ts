// ============================================================================
// PURE TYPESCRIPT FOREX & CRYPTO CALCULATION ENGINE (PHASE 2)
// User-provided prices only. Zero external live feeds.
// ============================================================================

import { TradingCalculationResult } from "../types";

export interface ForexPipValueInput {
  lotSizeUnits: number; // 100,000 for standard, 10,000 for mini, 1,000 for micro
  lotsTraded: number;
  pipSize: number; // 0.0001 standard, 0.01 for JPY pairs
  exchangeRateToAccountCurrency?: number; // e.g. 85.5 for USD/INR
}

export function calculateForexPipValue(input: ForexPipValueInput): TradingCalculationResult {
  const units = Math.max(1, input.lotSizeUnits || 100000);
  const lots = Math.max(0.01, input.lotsTraded || 1);
  const pipSize = Math.max(0.00001, input.pipSize || 0.0001);
  const fxRate = Math.max(0.0001, input.exchangeRateToAccountCurrency || 1);

  // Pip value in Quote Currency = Lots * LotSize * PipSize
  const pipValueQuote = lots * units * pipSize;
  const pipValueAccount = pipValueQuote * fxRate;

  return {
    primaryMetric: {
      label: "Value per Single Pip",
      value: pipValueAccount,
      formatted: `₹${pipValueAccount.toFixed(2)} / pip`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Pip Value in Quote Currency", value: pipValueQuote, formatted: `$${pipValueQuote.toFixed(2)}`, highlight: "neutral" },
      { label: "Total Traded Volume", value: lots * units, formatted: `${(lots * units).toLocaleString()} Units`, highlight: "cyan" },
      { label: "Pip Value for 10 Pips Move", value: pipValueAccount * 10, formatted: `₹${(pipValueAccount * 10).toFixed(2)}`, highlight: "green" },
    ],
  };
}

export interface ForexPositionSizeInput {
  accountCapital: number;
  riskPct: number;
  stopLossPips: number;
  pipValuePerStandardLotInAccountCurrency: number;
}

export function calculateForexPositionSize(input: ForexPositionSizeInput): TradingCalculationResult {
  const capital = Math.max(0, input.accountCapital || 0);
  const riskPct = Math.max(0.1, input.riskPct || 1);
  const stopPips = Math.max(1, input.stopLossPips || 20);
  const pipValPerLot = Math.max(0.01, input.pipValuePerStandardLotInAccountCurrency || 850);

  const riskAmount = (capital * riskPct) / 100;
  const lossPerStandardLot = stopPips * pipValPerLot;
  const allowableLots = lossPerStandardLot > 0 ? riskAmount / lossPerStandardLot : 0;

  return {
    primaryMetric: {
      label: "Allowable Lot Size",
      value: allowableLots,
      formatted: `${allowableLots.toFixed(2)} Lots`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Total Account Risk", value: riskAmount, formatted: `₹${riskAmount.toFixed(2)}`, highlight: "red" },
      { label: "Stop Loss Distance", value: stopPips, formatted: `${stopPips} Pips`, highlight: "neutral" },
      { label: "Micro Lots Equivalent", value: allowableLots * 100, formatted: `${(allowableLots * 100).toFixed(1)} Micro Lots`, highlight: "cyan" },
    ],
  };
}

export interface CryptoDcaPurchase {
  price: number;
  amountInvested: number;
}

export function calculateCryptoDca(purchases: CryptoDcaPurchase[]): TradingCalculationResult {
  let totalInvested = 0;
  let totalCoins = 0;

  for (const item of purchases) {
    const inv = Math.max(0, item.amountInvested || 0);
    const p = Math.max(0, item.price || 0);
    if (p > 0 && inv > 0) {
      totalInvested += inv;
      totalCoins += inv / p;
    }
  }

  const averagePrice = totalCoins > 0 ? totalInvested / totalCoins : 0;

  return {
    primaryMetric: {
      label: "DCA Weighted Average Buy Price",
      value: averagePrice,
      formatted: `₹${averagePrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Accumulated Token Units", value: totalCoins, formatted: `${totalCoins.toFixed(6)} Coins`, highlight: "cyan" },
      { label: "Total Fiat Invested", value: totalInvested, formatted: `₹${totalInvested.toLocaleString("en-IN")}`, highlight: "neutral" },
      { label: "Total DCA Executions", value: purchases.length, formatted: `${purchases.length} Orders`, highlight: "neutral" },
    ],
  };
}
