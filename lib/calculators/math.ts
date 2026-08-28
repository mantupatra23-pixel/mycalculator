import { formatNumberIN } from "@/lib/formatters";
import { CalculationResult } from "./finance";

// Helper: GCD for Ratio Simplification
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

// 1. Percentage Calculator (3 standard modes)
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
        { label: "Base Value (Y)", value: formatNumberIN(numY, 2) },
        { label: "Calculated Share", value: formatNumberIN(result, 2), highlight: true },
      ],
      summaryText: `${numX}% of ${numY} is equal to ${formatNumberIN(result, 2)}.`,
    };
  } else if (mode === 2) {
    // X is what percentage of Y?
    const pct = numY !== 0 ? (numX / numY) * 100 : 0;
    return {
      primaryLabel: "Percentage Share",
      primaryValue: `${formatNumberIN(pct, 2)}%`,
      metrics: [
        { label: "Part (X)", value: formatNumberIN(numX, 2) },
        { label: "Whole (Y)", value: formatNumberIN(numY, 2) },
        { label: "Percentage Fraction", value: `${formatNumberIN(pct, 2)}%`, highlight: true },
      ],
      summaryText: `${numX} is ${formatNumberIN(pct, 2)}% of ${numY}.`,
    };
  } else {
    // Percentage Increase / Decrease from X to Y
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
        { label: "Direction", value: isIncrease ? "Increase" : "Decrease" },
      ],
      summaryText: `Changing from ${numX} to ${numY} represents a ${formatNumberIN(Math.abs(changePct), 2)}% ${isIncrease ? "increase" : "decrease"}.`,
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
      { label: "Percentage Increase", value: `${pct}%` },
      { label: "Amount Added", value: `+${formatNumberIN(increaseAmt, 2)}`, highlight: true },
    ],
    summaryText: `Increasing ${orig} by ${pct}% results in ${formatNumberIN(finalValue, 2)}.`,
  };
}

// 3. Percentage Decrease Calculator
export function calculatePercentageDecrease(original: number, decreasePct: number): CalculationResult {
  const orig = Math.max(0, original);
  const pct = Math.min(100, Math.max(0, decreasePct));
  const decreaseAmt = (orig * pct) / 100;
  const finalValue = orig - decreaseAmt;

  return {
    primaryLabel: "New Reduced Value",
    primaryValue: formatNumberIN(finalValue, 2),
    metrics: [
      { label: "Original Value", value: formatNumberIN(orig, 2) },
      { label: "Percentage Decrease", value: `${pct}%` },
      { label: "Amount Deducted", value: `-${formatNumberIN(decreaseAmt, 2)}`, highlight: true },
    ],
    summaryText: `Decreasing ${orig} by ${pct}% results in ${formatNumberIN(finalValue, 2)}.`,
  };
}

// 4. Discount Calculator
export function calculateDiscount(originalPrice: number, discountRate: number, additionalOffPct: number = 0): CalculationResult {
  const price = Math.max(0, originalPrice);
  const d1 = Math.min(100, Math.max(0, discountRate));
  const d2 = Math.min(100, Math.max(0, additionalOffPct));

  const firstDiscount = (price * d1) / 100;
  const priceAfterFirst = price - firstDiscount;
  const secondDiscount = (priceAfterFirst * d2) / 100;
  const finalPrice = priceAfterFirst - secondDiscount;
  const totalSavings = price - finalPrice;
  const effectivePct = price > 0 ? (totalSavings / price) * 100 : 0;

  return {
    primaryLabel: "Final Discounted Price",
    primaryValue: `₹${formatNumberIN(finalPrice, 2)}`,
    metrics: [
      { label: "Original Retail Price", value: `₹${formatNumberIN(price, 2)}` },
      { label: "Total Money Saved", value: `₹${formatNumberIN(totalSavings, 2)}`, highlight: true },
      { label: "Effective Total Discount", value: `${effectivePct.toFixed(2)}%` },
    ],
    summaryText: `You save ₹${formatNumberIN(totalSavings, 2)} on a ₹${formatNumberIN(price, 2)} item, paying ₹${formatNumberIN(finalPrice, 2)}.`,
  };
}

// 5 & 6 & 7. Profit & Loss Calculator
export function calculateProfitLoss(costPrice: number, sellingPrice: number): CalculationResult {
  const cp = Math.max(0, costPrice);
  const sp = Math.max(0, sellingPrice);

  const diff = sp - cp;
  const isProfit = diff >= 0;
  const percentage = cp > 0 ? (Math.abs(diff) / cp) * 100 : 0;

  return {
    primaryLabel: isProfit ? "Total Profit Earned" : "Total Loss Incurred",
    primaryValue: `₹${formatNumberIN(Math.abs(diff), 2)}`,
    metrics: [
      { label: "Cost Price (CP)", value: `₹${formatNumberIN(cp, 2)}` },
      { label: "Selling Price (SP)", value: `₹${formatNumberIN(sp, 2)}` },
      { label: isProfit ? "Profit Margin" : "Loss Margin", value: `${percentage.toFixed(2)}%`, highlight: true },
      { label: "Status", value: isProfit ? "Profitable" : "Loss" },
    ],
    summaryText: isProfit
      ? `You made a profit of ₹${formatNumberIN(diff, 2)} (${percentage.toFixed(2)}% gain).`
      : `You incurred a loss of ₹${formatNumberIN(Math.abs(diff), 2)} (${percentage.toFixed(2)}% drop).`,
  };
}

// 8. Average (Mean, Median, Mode) Calculator
export function calculateAverage(numbersInput: string): CalculationResult {
  const cleanNums = numbersInput
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  if (cleanNums.length === 0) {
    return {
      primaryLabel: "Average (Mean)",
      primaryValue: "0",
      metrics: [
        { label: "Total Count", value: "0" },
        { label: "Sum Total", value: "0" },
      ],
      summaryText: "Enter a series of comma-separated numbers to compute statistical metrics.",
    };
  }

  const count = cleanNums.length;
  const sum = cleanNums.reduce((acc, curr) => acc + curr, 0);
  const mean = sum / count;

  // Median
  const sorted = [...cleanNums].sort((a, b) => a - b);
  const mid = Math.floor(count / 2);
  const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Min / Max
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  return {
    primaryLabel: "Arithmetic Mean (Average)",
    primaryValue: formatNumberIN(mean, 2),
    metrics: [
      { label: "Sample Count (N)", value: count.toString() },
      { label: "Sum Total (Σ)", value: formatNumberIN(sum, 2) },
      { label: "Median Value", value: formatNumberIN(median, 2), highlight: true },
      { label: "Range (Min - Max)", value: `${min} to ${max}` },
    ],
    summaryText: `The mean average of ${count} values is ${formatNumberIN(mean, 2)} with a median of ${formatNumberIN(median, 2)}.`,
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

  const scaledA = valA * scale;
  const scaledB = valB * scale;

  return {
    primaryLabel: "Simplified Ratio",
    primaryValue: `${formatNumberIN(simA, 0)} : ${formatNumberIN(simB, 0)}`,
    metrics: [
      { label: "Original Input", value: `${a} : ${b}` },
      { label: "Scaled Equivalent", value: `${formatNumberIN(scaledA, 1)} : ${formatNumberIN(scaledB, 1)}`, highlight: true },
      { label: "Decimal Value (A ÷ B)", value: (valA / valB).toFixed(4) },
      { label: "Percentage Share (A)", value: `${((valA / (valA + valB)) * 100).toFixed(1)}%` },
    ],
    summaryText: `The ratio ${a}:${b} simplifies to ${formatNumberIN(simA, 0)}:${formatNumberIN(simB, 0)}.`,
  };
}

// 10. Markup Calculator
export function calculateMarkup(costPrice: number, markupPercentage: number): CalculationResult {
  const cp = Math.max(0, costPrice);
  const markup = Math.max(0, markupPercentage);

  const profit = (cp * markup) / 100;
  const sellingPrice = cp + profit;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  return {
    primaryLabel: "Recommended Selling Price",
    primaryValue: `₹${formatNumberIN(sellingPrice, 2)}`,
    metrics: [
      { label: "Base Cost Price", value: `₹${formatNumberIN(cp, 2)}` },
      { label: "Markup Added", value: `${markup}%` },
      { label: "Net Profit Amount", value: `₹${formatNumberIN(profit, 2)}`, highlight: true },
      { label: "Equivalent Gross Margin", value: `${profitMargin.toFixed(2)}%` },
    ],
    summaryText: `Adding a ${markup}% markup to ₹${formatNumberIN(cp, 2)} gives a selling price of ₹${formatNumberIN(sellingPrice, 2)}.`,
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
      { label: "Gross Profit Amount", value: `₹${formatNumberIN(grossProfit, 2)}`, highlight: true },
      { label: "Equivalent Markup Rate", value: `${markupPct.toFixed(2)}%` },
    ],
    summaryText: `A selling price of ₹${formatNumberIN(sp, 2)} against a cost of ₹${formatNumberIN(cp, 2)} yields a ${grossMargin.toFixed(2)}% gross margin.`,
  };
}
