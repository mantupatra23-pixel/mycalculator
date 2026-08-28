import { formatINR, formatNumberIN } from "@/lib/formatters";
import { CalculationResult } from "./finance";

export interface IncomeTaxInput {
  assessmentYear: "AY2026_27" | "AY2025_26";
  annualIncome: number;
  regime: "new" | "old";
  incomeType?: "salaried" | "business" | "other";
  deductions80C?: number;
  deductions80D?: number;
  hraExemption?: number;
  otherDeductions?: number;
}

export interface TaxComputationBreakdown {
  grossIncome: number;
  standardDeduction: number;
  otherDeductions: number;
  taxableIncome: number;
  slabTax: number;
  rebate87A: number;
  taxAfterRebate: number;
  surcharge: number;
  cess: number;
  finalTax: number;
  effectiveRate: number;
  explanation: string[];
}

export function calculateIncomeTaxDetailed(input: IncomeTaxInput): TaxComputationBreakdown {
  const gross = Math.max(0, input.annualIncome);
  const ay = input.assessmentYear || "AY2026_27";
  const isSalaried = (input.incomeType ?? "salaried") === "salaried";

  if (input.regime === "new") {
    // -------------------------------------------------------------
    // NEW TAX REGIME
    // -------------------------------------------------------------
    let standardDeduction = 0;
    if (isSalaried) {
      standardDeduction = ay === "AY2026_27" ? 75000 : 75000;
    }
    const otherDeductions = 0; // 80C/80D not available in New Regime
    const taxableIncome = Math.max(0, gross - standardDeduction);
    let slabTax = 0;
    const explanation: string[] = [];

    if (ay === "AY2026_27") {
      // AY 2026-27 (FY 2025-26) Revised Slabs:
      // 0 to 4,00,000: 0%
      // 4,00,001 to 8,00,000: 5% (Max ₹20,000)
      // 8,00,001 to 12,00,000: 10% (Max ₹40,000)
      // 12,00,001 to 16,00,000: 15% (Max ₹60,000)
      // 16,00,001 to 20,00,000: 20% (Max ₹80,000)
      // 20,00,001 to 24,00,000: 25% (Max ₹1,00,000)
      // Above 24,00,000: 30%

      if (taxableIncome > 2400000) {
        slabTax += (taxableIncome - 2400000) * 0.30;
        slabTax += 400000 * 0.25;
        slabTax += 400000 * 0.20;
        slabTax += 400000 * 0.15;
        slabTax += 400000 * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 2000000) {
        slabTax += (taxableIncome - 2000000) * 0.25;
        slabTax += 400000 * 0.20;
        slabTax += 400000 * 0.15;
        slabTax += 400000 * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 1600000) {
        slabTax += (taxableIncome - 1600000) * 0.20;
        slabTax += 400000 * 0.15;
        slabTax += 400000 * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 1200000) {
        slabTax += (taxableIncome - 1200000) * 0.15;
        slabTax += 400000 * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 800000) {
        slabTax += (taxableIncome - 800000) * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 400000) {
        slabTax += (taxableIncome - 400000) * 0.05;
      }

      explanation.push(`Standard deduction of ${formatINR(standardDeduction)} applied for salaried income.`);
      explanation.push(`Taxable income computed as ${formatINR(taxableIncome)} across AY 2026-27 revised slabs.`);

      // Section 87A Rebate for AY 2026-27:
      // Resident individual with taxable income <= ₹12,00,000 gets rebate up to ₹60,000 (tax becomes 0).
      let rebate87A = 0;
      if (taxableIncome <= 1200000 && taxableIncome > 0) {
        rebate87A = Math.min(slabTax, 60000);
        explanation.push(`Full Section 87A rebate of ${formatINR(rebate87A)} applied (eligible taxable income ≤ ₹12 Lakh).`);
      }

      const taxAfterRebate = Math.max(0, slabTax - rebate87A);

      // Surcharge
      let surcharge = 0;
      if (taxableIncome > 20000000) surcharge = taxAfterRebate * 0.25;
      else if (taxableIncome > 10000000) surcharge = taxAfterRebate * 0.15;
      else if (taxableIncome > 5000000) surcharge = taxAfterRebate * 0.10;

      const cess = (taxAfterRebate + surcharge) * 0.04;
      const finalTax = taxAfterRebate + surcharge + cess;
      const effectiveRate = gross > 0 ? (finalTax / gross) * 100 : 0;

      return {
        grossIncome: gross,
        standardDeduction,
        otherDeductions,
        taxableIncome,
        slabTax,
        rebate87A,
        taxAfterRebate,
        surcharge,
        cess,
        finalTax,
        effectiveRate,
        explanation,
      };
    } else {
      // AY 2025-26 Slabs (0-3L Nil, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30%)
      if (taxableIncome > 1500000) {
        slabTax += (taxableIncome - 1500000) * 0.30;
        slabTax += 300000 * 0.20;
        slabTax += 200000 * 0.15;
        slabTax += 300000 * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 1200000) {
        slabTax += (taxableIncome - 1200000) * 0.20;
        slabTax += 200000 * 0.15;
        slabTax += 300000 * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 1000000) {
        slabTax += (taxableIncome - 1000000) * 0.15;
        slabTax += 300000 * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 700000) {
        slabTax += (taxableIncome - 700000) * 0.10;
        slabTax += 400000 * 0.05;
      } else if (taxableIncome > 300000) {
        slabTax += (taxableIncome - 300000) * 0.05;
      }

      let rebate87A = 0;
      if (taxableIncome <= 700000 && taxableIncome > 0) {
        rebate87A = Math.min(slabTax, 25000);
      }

      const taxAfterRebate = Math.max(0, slabTax - rebate87A);
      const cess = taxAfterRebate * 0.04;
      const finalTax = taxAfterRebate + cess;
      const effectiveRate = gross > 0 ? (finalTax / gross) * 100 : 0;

      return {
        grossIncome: gross,
        standardDeduction,
        otherDeductions,
        taxableIncome,
        slabTax,
        rebate87A,
        taxAfterRebate,
        surcharge: 0,
        cess,
        finalTax,
        effectiveRate,
        explanation: ["Calculated under AY 2025-26 New Tax Regime parameters."],
      };
    }
  } else {
    // -------------------------------------------------------------
    // OLD TAX REGIME
    // -------------------------------------------------------------
    const standardDeduction = isSalaried ? 50000 : 0;
    const sec80C = Math.min(150000, Math.max(0, input.deductions80C ?? 0));
    const sec80D = Math.min(75000, Math.max(0, input.deductions80D ?? 0));
    const hra = Math.max(0, input.hraExemption ?? 0);
    const customOther = Math.max(0, input.otherDeductions ?? 0);

    const totalEligibleDeductions = sec80C + sec80D + hra + customOther;
    const taxableIncome = Math.max(0, gross - standardDeduction - totalEligibleDeductions);
    let slabTax = 0;

    // Old Slabs: 0-2.5L: Nil, 2.5-5L: 5%, 5-10L: 20%, >10L: 30%
    if (taxableIncome > 1000000) {
      slabTax += (taxableIncome - 1000000) * 0.30;
      slabTax += 500000 * 0.20;
      slabTax += 250000 * 0.05;
    } else if (taxableIncome > 500000) {
      slabTax += (taxableIncome - 500000) * 0.20;
      slabTax += 250000 * 0.05;
    } else if (taxableIncome > 250000) {
      slabTax += (taxableIncome - 250000) * 0.05;
    }

    // Section 87A in Old Regime (Taxable Income <= ₹5,00,000)
    let rebate87A = 0;
    if (taxableIncome <= 500000 && taxableIncome > 0) {
      rebate87A = Math.min(slabTax, 12500);
    }

    const taxAfterRebate = Math.max(0, slabTax - rebate87A);

    let surcharge = 0;
    if (taxableIncome > 50000000) surcharge = taxAfterRebate * 0.37;
    else if (taxableIncome > 20000000) surcharge = taxAfterRebate * 0.25;
    else if (taxableIncome > 10000000) surcharge = taxAfterRebate * 0.15;
    else if (taxableIncome > 5000000) surcharge = taxAfterRebate * 0.10;

    const cess = (taxAfterRebate + surcharge) * 0.04;
    const finalTax = taxAfterRebate + surcharge + cess;
    const effectiveRate = gross > 0 ? (finalTax / gross) * 100 : 0;

    return {
      grossIncome: gross,
      standardDeduction,
      otherDeductions: totalEligibleDeductions,
      taxableIncome,
      slabTax,
      rebate87A,
      taxAfterRebate,
      surcharge,
      cess,
      finalTax,
      effectiveRate,
      explanation: [
        `Standard deduction ${formatINR(standardDeduction)} and eligible deductions ${formatINR(totalEligibleDeductions)} applied.`,
      ],
    };
  }
}

export function calculateIncomeTax(input: IncomeTaxInput): CalculationResult {
  const b = calculateIncomeTaxDetailed(input);
  const ayLabel = (input.assessmentYear || "AY2026_27").replace("_", "-");
  const regimeLabel = input.regime === "new" ? "New Tax Regime" : "Old Tax Regime";

  return {
    primaryLabel: `Estimated Tax (${ayLabel} ${regimeLabel})`,
    primaryValue: formatINR(Math.round(b.finalTax)),
    metrics: [
      { label: "Gross Annual Income", value: formatINR(b.grossIncome) },
      { label: "Standard Deduction", value: `-${formatINR(b.standardDeduction)}` },
      ...(b.otherDeductions > 0 ? [{ label: "Exemptions (80C/80D/HRA)", value: `-${formatINR(b.otherDeductions)}` }] : []),
      { label: "Net Taxable Income", value: formatINR(Math.round(b.taxableIncome)) },
      { label: "Base Computed Slab Tax", value: formatINR(Math.round(b.slabTax)) },
      ...(b.rebate87A > 0 ? [{ label: "Section 87A Tax Rebate", value: `-${formatINR(Math.round(b.rebate87A))}`, highlight: true }] : []),
      { label: "Health & Education Cess (4%)", value: formatINR(Math.round(b.cess)) },
      { label: "Effective Tax Rate", value: `${b.effectiveRate.toFixed(2)}%` },
    ],
    summaryText: `Under ${ayLabel} ${regimeLabel}, gross income of ${formatINR(b.grossIncome)} results in an estimated tax liability of ${formatINR(Math.round(b.finalTax))}.`,
  };
}
