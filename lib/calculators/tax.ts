import { formatINR } from "@/lib/formatters";
import { CalculationResult } from "./finance";

export interface IncomeTaxInput {
  annualIncome: number;
  regime: "new" | "old";
  deductions80C?: number;
  deductions80D?: number;
  hraExemption?: number;
  otherDeductions?: number;
}

export function calculateIncomeTax(input: IncomeTaxInput): CalculationResult {
  const income = Math.max(0, input.annualIncome);

  if (input.regime === "new") {
    // FY 2025-26 / FY 2026-27 New Tax Regime Slabs
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, income - standardDeduction);
    let tax = 0;

    // Up to 3,00,000: Nil
    // 3,00,001 - 7,00,000: 5%
    // 7,00,001 - 10,00,000: 10%
    // 10,00,001 - 12,00,000: 15%
    // 12,00,001 - 15,00,000: 20%
    // Above 15,00,000: 30%

    if (taxableIncome > 1500000) {
      tax += (taxableIncome - 1500000) * 0.30;
      tax += 300000 * 0.20;
      tax += 200000 * 0.15;
      tax += 300000 * 0.10;
      tax += 400000 * 0.05;
    } else if (taxableIncome > 1200000) {
      tax += (taxableIncome - 1200000) * 0.20;
      tax += 200000 * 0.15;
      tax += 300000 * 0.10;
      tax += 400000 * 0.05;
    } else if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.15;
      tax += 300000 * 0.10;
      tax += 400000 * 0.05;
    } else if (taxableIncome > 700000) {
      tax += (taxableIncome - 700000) * 0.10;
      tax += 400000 * 0.05;
    } else if (taxableIncome > 300000) {
      tax += (taxableIncome - 300000) * 0.05;
    }

    // Section 87A Rebate: Taxable income up to ₹7,00,000 -> Zero tax
    if (taxableIncome <= 700000) {
      tax = 0;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

    return {
      primaryLabel: "Estimated Tax Payable (New Regime)",
      primaryValue: formatINR(Math.round(totalTax)),
      metrics: [
        { label: "Total Gross Income", value: formatINR(income) },
        { label: "Standard Deduction", value: `-${formatINR(standardDeduction)}` },
        { label: "Net Taxable Income", value: formatINR(Math.round(taxableIncome)) },
        { label: "Base Income Tax", value: formatINR(Math.round(tax)) },
        { label: "Health & Education Cess (4%)", value: formatINR(Math.round(cess)), highlight: true },
        { label: "Effective Tax Rate", value: `${effectiveRate.toFixed(2)}%` },
      ],
      summaryText: `Under the New Tax Regime, your total estimated annual tax liability is ${formatINR(Math.round(totalTax))} on a gross income of ${formatINR(income)}.`,
    };
  } else {
    // Old Tax Regime
    const standardDeduction = 50000;
    const sec80C = Math.min(150000, Math.max(0, input.deductions80C ?? 0));
    const sec80D = Math.min(75000, Math.max(0, input.deductions80D ?? 0));
    const hra = Math.max(0, input.hraExemption ?? 0);
    const other = Math.max(0, input.otherDeductions ?? 0);

    const totalDeductions = standardDeduction + sec80C + sec80D + hra + other;
    const taxableIncome = Math.max(0, income - totalDeductions);
    let tax = 0;

    // Up to 2,50,000: Nil
    // 2,50,001 - 5,00,000: 5%
    // 5,00,001 - 10,00,000: 20%
    // Above 10,00,000: 30%

    if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.30;
      tax += 500000 * 0.20;
      tax += 250000 * 0.05;
    } else if (taxableIncome > 500000) {
      tax += (taxableIncome - 500000) * 0.20;
      tax += 250000 * 0.05;
    } else if (taxableIncome > 250000) {
      tax += (taxableIncome - 250000) * 0.05;
    }

    if (taxableIncome <= 500000) {
      tax = 0;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

    return {
      primaryLabel: "Estimated Tax Payable (Old Regime)",
      primaryValue: formatINR(Math.round(totalTax)),
      metrics: [
        { label: "Total Gross Income", value: formatINR(income) },
        { label: "Total Eligible Deductions", value: `-${formatINR(totalDeductions)}` },
        { label: "Net Taxable Income", value: formatINR(Math.round(taxableIncome)) },
        { label: "Base Income Tax", value: formatINR(Math.round(tax)) },
        { label: "Health & Education Cess (4%)", value: formatINR(Math.round(cess)), highlight: true },
        { label: "Effective Tax Rate", value: `${effectiveRate.toFixed(2)}%` },
      ],
      summaryText: `Under the Old Tax Regime with ${formatINR(totalDeductions)} in total deductions, your estimated tax liability is ${formatINR(Math.round(totalTax))}.`,
    };
  }
}
