import { formatINR, formatNumberIN } from "@/lib/formatters";
import { CalculationResult } from "./finance";

export interface SalaryInput {
  annualCTC: number;
  basicPercentage?: number;
  hraPercentage?: number;
  customEmployeePF?: number;
  customPT?: number;
  customTDS?: number;
  customOtherDeductions?: number;
  includeEmployerPFInCTC?: boolean;
}

export function calculateInHandSalary(input: SalaryInput): CalculationResult {
  const ctc = Math.max(0, input.annualCTC);
  const basicPct = Math.min(100, Math.max(10, input.basicPercentage ?? 50));
  const hraPct = Math.min(100, Math.max(0, input.hraPercentage ?? 20));

  // Annual Components
  const annualBasic = (ctc * basicPct) / 100;
  const annualHRA = (ctc * hraPct) / 100;
  
  // PF: 12% of Basic or statutory cap ₹1,800/mo (₹21,600/yr) if chosen
  const statutoryEmployeePFAnnual = Math.min(annualBasic * 0.12, 21600 * 12);
  const employeePFAnnual = input.customEmployeePF !== undefined ? input.customEmployeePF * 12 : statutoryEmployeePFAnnual;
  const employerPFAnnual = input.includeEmployerPFInCTC ? employeePFAnnual : 0;

  // Professional Tax: Standard ₹2,400/yr (₹200/mo) in Indian slabs
  const ptAnnual = input.customPT !== undefined ? input.customPT * 12 : 2400;

  // Estimated TDS / Tax Deductions
  const tdsAnnual = input.customTDS !== undefined ? input.customTDS * 12 : 0;
  const otherDeductionsAnnual = input.customOtherDeductions !== undefined ? input.customOtherDeductions * 12 : 0;

  // Allowances & Gross Salary
  const specialAllowanceAnnual = Math.max(0, ctc - (annualBasic + annualHRA + employerPFAnnual));
  const annualGrossSalary = ctc - employerPFAnnual;
  const monthlyGrossSalary = annualGrossSalary / 12;

  // Monthly Deductions
  const monthlyEmployeePF = employeePFAnnual / 12;
  const monthlyPT = ptAnnual / 12;
  const monthlyTDS = tdsAnnual / 12;
  const monthlyOtherDeductions = otherDeductionsAnnual / 12;
  const totalMonthlyDeductions = monthlyEmployeePF + monthlyPT + monthlyTDS + monthlyOtherDeductions;

  // In-Hand Calculation
  const monthlyInHand = Math.max(0, monthlyGrossSalary - totalMonthlyDeductions);
  const annualInHand = monthlyInHand * 12;

  const inHandPct = monthlyGrossSalary > 0 ? (monthlyInHand / monthlyGrossSalary) * 100 : 0;
  const deductionsPct = monthlyGrossSalary > 0 ? (totalMonthlyDeductions / monthlyGrossSalary) * 100 : 0;

  return {
    primaryLabel: "Monthly In-Hand (Take-Home) Salary",
    primaryValue: formatINR(Math.round(monthlyInHand)),
    metrics: [
      { label: "Annual Cost to Company (CTC)", value: formatINR(ctc) },
      { label: "Monthly Gross Salary", value: formatINR(Math.round(monthlyGrossSalary)) },
      { label: "Total Monthly Deductions", value: formatINR(Math.round(totalMonthlyDeductions)), highlight: true },
      { label: "Annual Take-Home Pay", value: formatINR(Math.round(annualInHand)) },
      { label: "Employee PF Deduction (Monthly)", value: formatINR(Math.round(monthlyEmployeePF)) },
      { label: "Professional Tax (PT)", value: formatINR(Math.round(monthlyPT)) },
      { label: "Estimated Monthly TDS / Tax", value: formatINR(Math.round(monthlyTDS)) },
    ],
    breakdown: {
      principalPct: parseFloat(inHandPct.toFixed(1)),
      interestPct: parseFloat(deductionsPct.toFixed(1)),
    },
    table: {
      headers: ["Component", "Monthly Share (₹)", "Annual Total (₹)", "Type"],
      rows: [
        ["Basic Salary", formatINR(Math.round(annualBasic / 12)), formatINR(Math.round(annualBasic)), "Earnings"],
        ["House Rent Allowance (HRA)", formatINR(Math.round(annualHRA / 12)), formatINR(Math.round(annualHRA)), "Earnings"],
        ["Special Allowance", formatINR(Math.round(specialAllowanceAnnual / 12)), formatINR(Math.round(specialAllowanceAnnual)), "Earnings"],
        ["Provident Fund (Employee EPF)", `-${formatINR(Math.round(monthlyEmployeePF))}`, `-${formatINR(Math.round(employeePFAnnual))}`, "Deduction"],
        ["Professional Tax (PT)", `-${formatINR(Math.round(monthlyPT))}`, `-${formatINR(Math.round(ptAnnual))}`, "Deduction"],
        ["Estimated Income Tax (TDS)", `-${formatINR(Math.round(monthlyTDS))}`, `-${formatINR(Math.round(tdsAnnual))}`, "Deduction"],
        ["Net Take-Home Pay", formatINR(Math.round(monthlyInHand)), formatINR(Math.round(annualInHand)), "Net Payout"],
      ],
    },
    summaryText: `For an annual CTC of ${formatINR(ctc)}, your estimated monthly in-hand salary is ${formatINR(Math.round(monthlyInHand))} after statutory deductions of ${formatINR(Math.round(totalMonthlyDeductions))}.`,
  };
}
