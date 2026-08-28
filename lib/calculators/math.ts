import { formatNumberIN } from "@/lib/formatters";
import { CalculationResult } from "./finance";

function getGCD(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

// 1. Percentage Calculator (3 Distinct Modes)
export function calculatePercentage(mode: number, x: number, y: number): CalculationResult {
  const numX = isNaN(x) ? 0 : x;
  const numY = isNaN(y) ? 0 : y;

  if (mode === 1) {
    // What is X% of Y?
    const result = (numX * numY) / 100;
    return {
      primaryLabel: `${numX}% of ${numY}`,
      primaryValue: formatNumberIN(result, 2),
      metrics: [
        { label: "Percentage (X)", value: `${numX}%` },
        { label: "Base Total (Y)", value: formatNumberIN(numY, 2) },
        { label: "Calculated Share", value: formatNumberIN(result, 2), highlight: true },
        { label: "Remaining Part", value: formatNumberIN(numY - result, 2) },
      ],
      summaryText: `${numX}% of ${numY} is equal to ${formatNumberIN(result, 2)}.`,
    };
  } else if (mode === 2) {
    // X is what percentage of Y?
    const pct = numY !== 0 ? (numX / numY) * 100 : 0;
    return {
      primaryLabel: "Calculated Percentage",
      primaryValue: `${formatNumberIN(pct, 2)}%`,
      metrics: [
        { label: "Part (X)", value: formatNumberIN(numX, 2) },
        { label: "Whole (Y)", value: formatNumberIN(numY, 2) },
        { label: "Fraction Share", value: `${formatNumberIN(pct, 2)}%`, highlight: true },
        { label: "Decimal Ratio", value: (numY !== 0 ? numX / numY : 0).toFixed(4) },
      ],
      summaryText: `${numX} is ${formatNumberIN(pct, 2)}% of ${numY}.`,
    };
  } else {
    // Percentage Change from X to Y
    const diff = numY - numX;
    const changePct = numX !== 0 ? (diff / numX) * 100 : 0;
    const isIncrease = diff >= 0;

    return {
      primaryLabel: isIncrease ? "Percentage Increase" : "Percentage Decrease",
      primaryValue: `${isIncrease ? "+" : ""}${formatNumberIN(changePct, 2)}%`,
      metrics: [
        { label: "Initial Value (X)", value: formatNumberIN(numX, 2) },
        { label: "Final Value (Y)", value: formatNumberIN(numY, 2) },
        { label: "Absolute Difference", value: formatNumberIN(Math.abs(diff), 2), highlight: true },
        { label: "Trend Direction", value: isIncrease ? "Positive (+)" : "Negative (-)" },
      ],
      summaryText: `Moving from ${numX} to ${numY} represents a ${formatNumberIN(Math.abs(changePct), 2)}% ${isIncrease ? "increase" : "decrease"}.`,
    };
  }
}

// 2. Percentage Increase Calculator
export function calculatePercentageIncrease(original: number, increasePct: number): CalculationResult {
  const orig = Math.max(0, original);
  const pct = Math.max(0, increasePct);
  const increaseAmt = (orig * pct) / 100;
  const finalValue = orig + increaseAmt;

  return {
    primaryLabel: "New Increased Value",
    primaryValue: formatNumberIN(finalValue, 2),
    metrics: [
      { label: "Original Value", value: formatNumberIN(orig, 2) },
      { label: "Percentage Added", value: `+${pct}%` },
      { label: "Absolute Addition", value: `+${formatNumberIN(increaseAmt, 2)}`, highlight: true },
      { label: "Growth Multiplier", value: `${(1 + pct / 100).toFixed(4)}x` },
    ],
    summaryText: `Increasing ${orig} by ${pct}% results in ${formatNumberIN(finalValue, 2)}.`,
  };
}

// 3. Percentage Decrease Calculator
export function calculatePercentageDecrease(original: number, decreasePct: number): CalculationResult {
  const orig = Math.max(0, original);
  const pct = Math.min(100, Math.max(0, decreasePct));
  const decreaseAmt = (orig * pct) / 100;
  const finalValue = Math.max(0, orig - decreaseAmt);

  return {
    primaryLabel: "New Reduced Value",
    primaryValue: formatNumberIN(finalValue, 2),
    metrics: [
      { label: "Original Value", value: formatNumberIN(orig, 2) },
      { label: "Percentage Deducted", value: `-${pct}%` },
      { label: "Absolute Reduction", value: `-${formatNumberIN(decreaseAmt, 2)}`, highlight: true },
      { label: "Retained Share", value: `${(100 - pct).toFixed(1)}%` },
    ],
    summaryText: `Decreasing ${orig} by ${pct}% leaves ${formatNumberIN(finalValue, 2)}.`,
  };
}

// 4. Discount Calculator (With Dual Discount & GST/Tax Option)
export function calculateDiscount(
  originalPrice: number,
  discountRate: number,
  additionalDiscountPct: number = 0,
  taxPct: number = 0
): CalculationResult {
  const price = Math.max(0, originalPrice);
  const d1 = Math.min(100, Math.max(0, discountRate));
  const d2 = Math.min(100, Math.max(0, additionalDiscountPct));
  const tax = Math.max(0, taxPct);

  const firstDiscount = (price * d1) / 100;
  const priceAfterFirst = price - firstDiscount;
  const secondDiscount = (priceAfterFirst * d2) / 100;
  const priceAfterDiscounts = priceAfterFirst - secondDiscount;

  const taxAmount = (priceAfterDiscounts * tax) / 100;
  const finalPayable = priceAfterDiscounts + taxAmount;
  const totalSavings = price - priceAfterDiscounts;
  const effectivePct = price > 0 ? (totalSavings / price) * 100 : 0;

  return {
    primaryLabel: "Final Payable Price",
    primaryValue: `₹${formatNumberIN(finalPayable, 2)}`,
    metrics: [
      { label: "Original Retail Price", value: `₹${formatNumberIN(price, 2)}` },
      { label: "Total Money Saved", value: `₹${formatNumberIN(totalSavings, 2)}`, highlight: true },
      { label: "Effective Total Discount", value: `${effectivePct.toFixed(2)}%` },
      ...(tax > 0 ? [{ label: `Added Tax / GST (${tax}%)`, value: `+₹${formatNumberIN(taxAmount, 2)}` }] : []),
    ],
    summaryText: `You save ₹${formatNumberIN(totalSavings, 2)} (${effectivePct.toFixed(1)}% off) on ₹${formatNumberIN(price, 2)}, paying ₹${formatNumberIN(finalPayable, 2)}.`,
  };
}

// 5, 6, 7. Profit & Loss Calculator
export function calculateProfitLoss(costPrice: number, sellingPrice: number, quantity: number = 1): CalculationResult {
  const cp = Math.max(0, costPrice);
  const sp = Math.max(0, sellingPrice);
  const qty = Math.max(1, quantity);

  const totalCP = cp * qty;
  const totalSP = sp * qty;
  const totalDiff = totalSP - totalCP;
  const isProfit = totalDiff >= 0;

  const pct = totalCP > 0 ? (Math.abs(totalDiff) / totalCP) * 100 : 0;
  const marginPct = totalSP > 0 ? (totalDiff / totalSP) * 100 : 0;

  return {
    primaryLabel: isProfit ? "Net Profit Earned" : "Net Loss Incurred",
    primaryValue: `₹${formatNumberIN(Math.abs(totalDiff), 2)}`,
    metrics: [
      { label: "Total Cost (CP)", value: `₹${formatNumberIN(totalCP, 2)}` },
      { label: "Total Revenue (SP)", value: `₹${formatNumberIN(totalSP, 2)}` },
      { label: isProfit ? "Profit Rate" : "Loss Rate", value: `${pct.toFixed(2)}%`, highlight: true },
      { label: "Gross Profit Margin", value: `${marginPct.toFixed(2)}%` },
    ],
    summaryText: isProfit
      ? `You made a profit of ₹${formatNumberIN(totalDiff, 2)} (${pct.toFixed(2)}% gain on cost).`
      : `You incurred a loss of ₹${formatNumberIN(Math.abs(totalDiff), 2)} (${pct.toFixed(2)}% drop on cost).`,
  };
}

// 8. Advanced Statistical Average Calculator (Mean, Median, Mode, Range, Sum)
export function calculateAverage(numbersInput: string): CalculationResult {
  const cleanNums = numbersInput
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  if (cleanNums.length === 0) {
    return {
      primaryLabel: "Arithmetic Mean (Average)",
      primaryValue: "0",
      metrics: [
        { label: "Sample Count (N)", value: "0" },
        { label: "Sum Total (Σ)", value: "0" },
      ],
      summaryText: "Enter a sequence of numbers to calculate statistical averages.",
    };
  }

  const count = cleanNums.length;
  const sum = cleanNums.reduce((acc, curr) => acc + curr, 0);
  const mean = sum / count;

  // Median
  const sorted = [...cleanNums].sort((a, b) => a - b);
  const mid = Math.floor(count / 2);
  const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Mode
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  sorted.forEach((n) => {
    frequency[n] = (frequency[n] || 0) + 1;
    if (frequency[n] > maxFreq) maxFreq = frequency[n];
  });

  const modes = Object.keys(frequency)
    .filter((k) => frequency[Number(k)] === maxFreq && maxFreq > 1)
    .map(Number);
  const modeStr = modes.length > 0 ? modes.join(", ") : "No duplicate mode";

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  return {
    primaryLabel: "Arithmetic Mean (Average)",
    primaryValue: formatNumberIN(mean, 2),
    metrics: [
      { label: "Median (Middle Value)", value: formatNumberIN(median, 2), highlight: true },
      { label: "Mode (Most Frequent)", value: modeStr },
      { label: "Sum Total (Σ)", value: formatNumberIN(sum, 2) },
      { label: "Sample Count (N)", value: `${count} values` },
      { label: "Range (Max - Min)", value: `${min} to ${max} (Δ ${range})` },
    ],
    summaryText: `The arithmetic mean of ${count} numbers is ${formatNumberIN(mean, 2)} with a median of ${formatNumberIN(median, 2)}.`,
  };
}

// 9. Ratio Calculator
export function calculateRatio(a: number, b: number, scaleMultiplier: number = 1): CalculationResult {
  const valA = Math.max(0.0001, a);
  const valB = Math.max(0.0001, b);
  const scale = Math.max(1, scaleMultiplier);

  const gcd = getGCD(valA, valB);
  const simA = valA / gcd;
  const simB = valB / gcd;

  const totalParts = valA + valB;
  const pctA = (valA / totalParts) * 100;
  const pctB = (valB / totalParts) * 100;

  return {
    primaryLabel: "Simplified Integer Ratio",
    primaryValue: `${formatNumberIN(simA, 0)} : ${formatNumberIN(simB, 0)}`,
    metrics: [
      { label: "Input Proportion", value: `${a} : ${b}` },
      { label: "Scaled Equivalent", value: `${formatNumberIN(valA * scale, 1)} : ${formatNumberIN(valB * scale, 1)}`, highlight: true },
      { label: "Share Distribution", value: `${pctA.toFixed(1)}% / ${pctB.toFixed(1)}%` },
      { label: "Decimal Quotient (A ÷ B)", value: (valA / valB).toFixed(4) },
    ],
    summaryText: `The ratio ${a}:${b} simplifies to ${formatNumberIN(simA, 0)}:${formatNumberIN(simB, 0)} (${pctA.toFixed(1)}% to ${pctB.toFixed(1)}%).`,
  };
}

// 10. Markup Calculator
export function calculateMarkup(costPrice: number, markupPercentage: number): CalculationResult {
  const cp = Math.max(0, costPrice);
  const markup = Math.max(0, markupPercentage);

  const profit = (cp * markup) / 100;
  const sellingPrice = cp + profit;
  const marginPct = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  return {
    primaryLabel: "Selling Price (SP)",
    primaryValue: `₹${formatNumberIN(sellingPrice, 2)}`,
    metrics: [
      { label: "Base Cost Price (CP)", value: `₹${formatNumberIN(cp, 2)}` },
      { label: "Markup Rate Added", value: `${markup}%` },
      { label: "Profit Amount", value: `₹${formatNumberIN(profit, 2)}`, highlight: true },
      { label: "Gross Profit Margin", value: `${marginPct.toFixed(2)}%` },
    ],
    summaryText: `Adding a ${markup}% markup to ₹${formatNumberIN(cp, 2)} sets the selling price at ₹${formatNumberIN(sellingPrice, 2)} with a ${marginPct.toFixed(2)}% gross margin.`,
  };
}

// 11. Margin Calculator
export function calculateMargin(costPrice: number, sellingPrice: number): CalculationResult {
  const cp = Math.max(0, costPrice);
  const sp = Math.max(0, sellingPrice);

  const grossProfit = sp - cp;
  const grossMargin = sp > 0 ? (grossProfit / sp) * 100 : 0;
  const markupPct = cp > 0 ? (grossProfit / cp) * 100 : 0;

  return {
    primaryLabel: "Gross Profit Margin",
    primaryValue: `${grossMargin.toFixed(2)}%`,
    metrics: [
      { label: "Cost Price (CP)", value: `₹${formatNumberIN(cp, 2)}` },
      { label: "Selling Price (SP)", value: `₹${formatNumberIN(sp, 2)}` },
      { label: "Gross Profit Cash", value: `₹${formatNumberIN(grossProfit, 2)}`, highlight: true },
      { label: "Equivalent Markup Rate", value: `${markupPct.toFixed(2)}%` },
    ],
    summaryText: `A selling price of ₹${formatNumberIN(sp, 2)} against a cost of ₹${formatNumberIN(cp, 2)} yields a ${grossMargin.toFixed(2)}% gross margin.`,
  };
}
