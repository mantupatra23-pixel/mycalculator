import { formatINR } from "@/lib/formatters";
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
  employerPFAnnual?: number;
  gratuityAnnual?: number;
  bonusAnnual?: number;
  insuranceAnnual?: number;
  isAdvancedMode?: boolean;
}

export function calculateInHandSalary(input: SalaryInput): CalculationResult {
  const ctc = Math.max(0, input.annualCTC);

  if (!input.isAdvancedMode) {
    const annualBasic = ctc * 0.50;
    const annualHRA = ctc * 0.20;
    const statutoryEmployerPF = Math.min(annualBasic * 0.12, 21600 * 12);
    const employerPFAnnual = input.includeEmployerPFInCTC !== false ? statutoryEmployerPF : 0;
    const employeePFAnnual = input.customEmployeePF !== undefined ? input.customEmployeePF * 12 : statutoryEmployerPF;
    const ptAnnual = input.customPT !== undefined ? input.customPT * 12 : 2400;
    const tdsAnnual = input.customTDS !== undefined ? input.customTDS * 12 : 0;
    const otherDeductionsAnnual = input.customOtherDeductions !== undefined ? input.customOtherDeductions * 12 : 0;

    const annualGrossSalary = Math.max(0, ctc - employerPFAnnual);
    const monthlyGrossSalary = annualGrossSalary / 12;

    const monthlyEmployeePF = employeePFAnnual / 12;
    const monthlyPT = ptAnnual / 12;
    const monthlyTDS = tdsAnnual / 12;
    const monthlyOtherDeductions = otherDeductionsAnnual / 12;
    const totalMonthlyDeductions = monthlyEmployeePF + monthlyPT + monthlyTDS + monthlyOtherDeductions;

    const monthlyInHand = Math.max(0, monthlyGrossSalary - totalMonthlyDeductions);
    const annualInHand = monthlyInHand * 12;

    const inHandPct = monthlyGrossSalary > 0 ? (monthlyInHand / monthlyGrossSalary) * 100 : 0;
    const deductionsPct = monthlyGrossSalary > 0 ? (totalMonthlyDeductions / monthlyGrossSalary) * 100 : 0;

    return {
      primaryLabel: "Monthly In-Hand (Take-Home) Salary",
      primaryValue: formatINR(Math.round(monthlyInHand)),
      metrics: [
        { label: "Annual Cost to Company (CTC)", value: formatINR(ctc) },
        { label: "Estimated Monthly Gross Salary", value: formatINR(Math.round(monthlyGrossSalary)) },
        { label: "Total Monthly Deductions", value: formatINR(Math.round(totalMonthlyDeductions)), highlight: true },
        { label: "Annual Net Take-Home Pay", value: formatINR(Math.round(annualInHand)) },
        { label: "Employee PF (Monthly)", value: formatINR(Math.round(monthlyEmployeePF)) },
        { label: "Professional Tax (PT)", value: formatINR(Math.round(monthlyPT)) },
        { label: "Estimated Monthly TDS", value: formatINR(Math.round(monthlyTDS)) },
      ],
      breakdown: {
        principalPct: parseFloat(inHandPct.toFixed(1)),
        interestPct: parseFloat(deductionsPct.toFixed(1)),
      },
      table: {
        headers: ["Salary Component", "Monthly Amount", "Annual Total", "Classification"],
        rows: [
          ["Basic Salary (50%)", formatINR(Math.round(annualBasic / 12)), formatINR(Math.round(annualBasic)), "Gross Earnings"],
          ["House Rent Allowance (20%)", formatINR(Math.round(annualHRA / 12)), formatINR(Math.round(annualHRA)), "Gross Earnings"],
          ["Special Allowance", formatINR(Math.round((annualGrossSalary - annualBasic - annualHRA) / 12)), formatINR(Math.round(annualGrossSalary - annualBasic - annualHRA)), "Gross Earnings"],
          ["Employee PF (EPF)", `-${formatINR(Math.round(monthlyEmployeePF))}`, `-${formatINR(Math.round(employeePFAnnual))}`, "Employee Deduction"],
          ["Professional Tax (PT)", `-${formatINR(Math.round(monthlyPT))}`, `-${formatINR(Math.round(ptAnnual))}`, "Employee Deduction"],
          ["Estimated TDS / Tax", `-${formatINR(Math.round(monthlyTDS))}`, `-${formatINR(Math.round(tdsAnnual))}`, "Employee Deduction"],
          ["Net Take-Home Salary", formatINR(Math.round(monthlyInHand)), formatINR(Math.round(annualInHand)), "Net Payout"],
        ],
      },
      summaryText: `For an annual CTC of ${formatINR(ctc)}, estimated take-home pay is ${formatINR(Math.round(monthlyInHand))}/month after statutory deductions.`,
    };
  } else {
    const basicPct = Math.min(100, Math.max(10, input.basicPercentage ?? 50));
    const hraPct = Math.min(100, Math.max(0, input.hraPercentage ?? 20));

    const annualBasic = (ctc * basicPct) / 100;
    const annualHRA = (ctc * hraPct) / 100;
    const employerPF = input.employerPFAnnual ?? Math.min(annualBasic * 0.12, 21600 * 12);
    const gratuity = input.gratuityAnnual ?? (annualBasic * 15) / 26 / 12;
    const bonus = input.bonusAnnual ?? 0;
    const insurance = input.insuranceAnnual ?? 0;

    const totalEmployerBenefits = employerPF + gratuity + bonus + insurance;
    const annualGrossSalary = Math.max(0, ctc - totalEmployerBenefits);
    const monthlyGrossSalary = annualGrossSalary / 12;

    const employeePFAnnual = input.customEmployeePF !== undefined ? input.customEmployeePF * 12 : employerPF;
    const ptAnnual = input.customPT !== undefined ? input.customPT * 12 : 2400;
    const tdsAnnual = input.customTDS !== undefined ? input.customTDS * 12 : 0;
    const otherDeductionsAnnual = input.customOtherDeductions !== undefined ? input.customOtherDeductions * 12 : 0;

    const totalEmployeeDeductionsAnnual = employeePFAnnual + ptAnnual + tdsAnnual + otherDeductionsAnnual;
    const monthlyInHand = Math.max(0, (annualGrossSalary - totalEmployeeDeductionsAnnual) / 12);
    const annualInHand = monthlyInHand * 12;

    return {
      primaryLabel: "Monthly In-Hand Pay (Advanced)",
      primaryValue: formatINR(Math.round(monthlyInHand)),
      metrics: [
        { label: "Annual CTC", value: formatINR(ctc) },
        { label: "Employer Benefits (PF/Gratuity/Bonus)", value: `-${formatINR(Math.round(totalEmployerBenefits))}` },
        { label: "Gross Monthly Pay", value: formatINR(Math.round(monthlyGrossSalary)) },
        { label: "Total Employee Monthly Deductions", value: `-${formatINR(Math.round(totalEmployeeDeductionsAnnual / 12))}`, highlight: true },
        { label: "Annual Net Take-Home", value: formatINR(Math.round(annualInHand)) },
      ],
      table: {
        headers: ["Component", "Monthly Share", "Annual Total", "Type"],
        rows: [
          ["Basic Pay", formatINR(Math.round(annualBasic / 12)), formatINR(Math.round(annualBasic)), "Earnings"],
          ["House Rent Allowance (HRA)", formatINR(Math.round(annualHRA / 12)), formatINR(Math.round(annualHRA)), "Earnings"],
          ["Employer PF Contribution", formatINR(Math.round(employerPF / 12)), formatINR(Math.round(employerPF)), "Employer Benefit in CTC"],
          ["Gratuity Provision", formatINR(Math.round(gratuity / 12)), formatINR(Math.round(gratuity)), "Employer Benefit in CTC"],
          ["Employee EPF Deduction", `-${formatINR(Math.round(employeePFAnnual / 12))}`, `-${formatINR(Math.round(employeePFAnnual))}`, "Deduction"],
          ["Professional Tax", `-${formatINR(Math.round(ptAnnual / 12))}`, `-${formatINR(Math.round(ptAnnual))}`, "Deduction"],
          ["Estimated Monthly TDS", `-${formatINR(Math.round(tdsAnnual / 12))}`, `-${formatINR(Math.round(tdsAnnual))}`, "Deduction"],
          ["Net Take-Home Pay", formatINR(Math.round(monthlyInHand)), formatINR(Math.round(annualInHand)), "Net Payout"],
        ],
      },
      summaryText: `Under advanced breakdown, net take-home salary is ${formatINR(Math.round(monthlyInHand))}/month.`,
    };
  }
}
