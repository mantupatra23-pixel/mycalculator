import { TradingCalculationResult } from "../types";

export function calculateTradeExpectancy(winRatePct: number, avgWin: number, avgLoss: number): TradingCalculationResult {
  const w = Math.min(100, Math.max(0, winRatePct)) / 100;
  const l = 1 - w;
  const win = Math.max(0, avgWin);
  const loss = Math.max(0, avgLoss);
  const expectancy = (w * win) - (l * loss);
  const over100 = expectancy * 100;

  return {
    primaryMetric: {
      label: "Expected Value per Trade",
      value: expectancy,
      formatted: `${expectancy >= 0 ? "+" : ""}₹${expectancy.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: expectancy >= 0,
    },
    secondaryMetrics: [
      { label: "Expectancy (100 Trades)", value: over100, formatted: `${over100 >= 0 ? "+" : ""}₹${over100.toLocaleString("en-IN")}`, highlight: over100 >= 0 ? "green" : "red" },
      { label: "Win Probability", value: w * 100, formatted: `${(w * 100).toFixed(1)}%`, highlight: "cyan" },
      { label: "Payoff Ratio (Win/Loss)", value: loss > 0 ? win / loss : 0, formatted: loss > 0 ? (win / loss).toFixed(2) : "N/A", highlight: "neutral" },
    ],
  };
}

export function calculateProfitFactor(grossProfit: number, grossLoss: number): TradingCalculationResult {
  const gp = Math.max(0, grossProfit);
  const gl = Math.max(0, grossLoss);
  const pf = gl > 0 ? gp / gl : gp > 0 ? 999 : 0;

  return {
    primaryMetric: {
      label: "Profit Factor",
      value: pf,
      formatted: gl > 0 ? pf.toFixed(2) : gp > 0 ? "Undefined (Zero Losses)" : "0.00",
      isPositive: pf >= 1.5,
    },
    secondaryMetrics: [
      { label: "Gross Profit Realized", value: gp, formatted: `₹${gp.toLocaleString("en-IN")}`, highlight: "green" },
      { label: "Gross Loss Incurred", value: gl, formatted: `₹${gl.toLocaleString("en-IN")}`, highlight: "red" },
      { label: "Net Strategy Gain", value: gp - gl, formatted: `${gp >= gl ? "+" : ""}₹${(gp - gl).toLocaleString("en-IN")}`, highlight: gp >= gl ? "green" : "red" },
    ],
  };
}

export function calculateWinRateBreakeven(avgWin: number, avgLoss: number): TradingCalculationResult {
  const win = Math.max(0.01, avgWin);
  const loss = Math.max(0.01, avgLoss);
  const be = (loss / (win + loss)) * 100;

  return {
    primaryMetric: {
      label: "Required Break-Even Win Rate",
      value: be,
      formatted: `${be.toFixed(2)}%`,
      isPositive: be <= 50,
    },
    secondaryMetrics: [
      { label: "Average Winning Target", value: win, formatted: `₹${win.toLocaleString("en-IN")}`, highlight: "green" },
      { label: "Average Risk Stop", value: loss, formatted: `₹${loss.toLocaleString("en-IN")}`, highlight: "red" },
      { label: "Payoff Multiple", value: win / loss, formatted: `1 : ${(win / loss).toFixed(2)}`, highlight: "cyan" },
    ],
  };
}

export function calculateAtrStopLoss(entry: number, atr: number, mult: number): TradingCalculationResult {
  const e = Math.max(0, entry);
  const a = Math.max(0, atr);
  const m = Math.max(0.1, mult);
  const stopDist = a * m;
  const stopPrice = Math.max(0, e - stopDist);

  return {
    primaryMetric: {
      label: "Volatility Stop-Loss Level",
      value: stopPrice,
      formatted: `₹${stopPrice.toFixed(2)}`,
      isPositive: true,
    },
    secondaryMetrics: [
      { label: "Stop Distance (Points)", value: stopDist, formatted: `${stopDist.toFixed(2)} pts`, highlight: "neutral" },
      { label: "ATR Buffer Multiplier", value: m, formatted: `${m.toFixed(1)}x ATR`, highlight: "cyan" },
      { label: "Entry Reference Price", value: e, formatted: `₹${e.toFixed(2)}`, highlight: "neutral" },
    ],
  };
}

export function calculateScaleOut(totalShares: number, entry: number, t1: number, t1Pct: number, t2: number, t2Pct: number, t3: number, t3Pct: number): TradingCalculationResult {
  const qty = Math.max(1, totalShares);
  const q1 = Math.floor(qty * (t1Pct / 100));
  const q2 = Math.floor(qty * (t2Pct / 100));
  const q3 = Math.max(0, qty - q1 - q2);

  const p1 = (t1 - entry) * q1;
  const p2 = (t2 - entry) * q2;
  const p3 = (t3 - entry) * q3;
  const totalProfit = p1 + p2 + p3;
  const weightedExit = ((t1 * q1) + (t2 * q2) + (t3 * q3)) / qty;

  return {
    primaryMetric: {
      label: "Blended Profit Realization",
      value: totalProfit,
      formatted: `₹${totalProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      isPositive: totalProfit >= 0,
    },
    secondaryMetrics: [
      { label: "Volume-Weighted Exit Price", value: weightedExit, formatted: `₹${weightedExit.toFixed(2)}`, highlight: "cyan" },
      { label: "Target 1 Profit (P1)", value: p1, formatted: `₹${p1.toLocaleString("en-IN")}`, highlight: "green" },
      { label: "Target 2 Profit (P2)", value: p2, formatted: `₹${p2.toLocaleString("en-IN")}`, highlight: "green" },
      { label: "Runner Profit (P3)", value: p3, formatted: `₹${p3.toLocaleString("en-IN")}`, highlight: "green" },
    ],
  };
}
