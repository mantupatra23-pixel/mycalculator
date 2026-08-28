import { formatNumberIN, formatINR } from "@/lib/formatters";

export interface MetricItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface CalculationResult {
  primaryLabel: string;
  primaryValue: string;
  metrics: MetricItem[];
  breakdown?: {
    principalPct: number;
    interestPct: number;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  summaryText: string;
}

// 1. Loan-to-Value (LTV) Calculator
export function calculateLTV(propertyValue: number, loanAmount: number): CalculationResult {
  const prop = Math.max(0, propertyValue);
  const loan = Math.max(0, loanAmount);

  const ltvPct = prop > 0 ? (loan / prop) * 100 : 0;
  const downPayment = Math.max(0, prop - loan);
  const downPaymentPct = prop > 0 ? (downPayment / prop) * 100 : 0;

  let interpretation = "Lower LTV indicates smaller borrowing proportion and higher equity down payment.";
  if (ltvPct > 90) {
    interpretation = "Very high borrowing ratio (>90%). Most Indian lenders enforce regulatory LTV caps between 75% and 90%.";
  } else if (ltvPct > 75) {
    interpretation = "Standard mortgage financing ratio. Higher down payment generally improves loan terms.";
  } else if (ltvPct > 0) {
    interpretation = "Conservative borrowing ratio with strong initial equity contribution.";
  }

  return {
    primaryLabel: "Loan-to-Value Ratio (LTV)",
    primaryValue: `${ltvPct.toFixed(2)}%`,
    metrics: [
      { label: "Total Property Value", value: formatINR(prop) },
      { label: "Loan Amount Requested", value: formatINR(loan) },
      { label: "Minimum Down Payment Required", value: formatINR(downPayment), highlight: true },
      { label: "Equity Down Payment Share", value: `${downPaymentPct.toFixed(1)}%` },
      { label: "LTV Interpretation", value: interpretation },
    ],
    breakdown: {
      principalPct: parseFloat(Math.min(100, ltvPct).toFixed(1)),
      interestPct: parseFloat(Math.max(0, downPaymentPct).toFixed(1)),
    },
    summaryText: `For a property valued at ${formatINR(prop)}, financing ${formatINR(loan)} requires a minimum equity down payment of ${formatINR(downPayment)} (${downPaymentPct.toFixed(1)}%).`,
  };
}

// 2. Loan EMI Calculator (Reducing Balance Formula)
export function calculateLoanEMI(
  principal: number,
  annualRate: number,
  tenureYears: number,
  tenureInMonths: boolean = false
): CalculationResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRate) / 12 / 100;
  const totalMonths = tenureInMonths
    ? Math.max(1, Math.round(tenureYears))
    : Math.max(1, Math.round(tenureYears * 12));
  const totalYears = Math.ceil(totalMonths / 12);

  let emi = 0;
  if (r > 0) {
    emi = (p * r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);
  } else {
    emi = p / totalMonths;
  }

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - p);
  const principalPct = totalPayment > 0 ? (p / totalPayment) * 100 : 0;
  const interestPct = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  let balance = p;
  const fullAmortizationRows: string[][] = [];

  for (let y = 1; y <= totalYears; y++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    const monthsInThisYear =
      y === totalYears && totalMonths % 12 !== 0 ? totalMonths % 12 : 12;

    for (let m = 1; m <= monthsInThisYear; m++) {
      const interestForMonth = balance * r;
      const principalForMonth = Math.min(balance, emi - interestForMonth);
      yearlyInterest += interestForMonth;
      yearlyPrincipal += principalForMonth;
      balance -= principalForMonth;
      if (balance < 0) balance = 0;
    }

    const yearlyEMI = yearlyPrincipal + yearlyInterest;

    fullAmortizationRows.push([
      `Year ${y}`,
      formatINR(Math.round(yearlyEMI)),
      formatINR(Math.round(yearlyPrincipal)),
      formatINR(Math.round(yearlyInterest)),
      formatINR(Math.round(balance)),
    ]);
  }

  return {
    primaryLabel: "Monthly Loan EMI",
    primaryValue: formatINR(Math.round(emi)),
    metrics: [
      { label: "Principal Loan Amount", value: formatINR(p) },
      { label: "Total Interest Payable", value: formatINR(Math.round(totalInterest)), highlight: true },
      { label: "Total Repayment Amount", value: formatINR(Math.round(totalPayment)) },
      { label: "Total Tenure Months", value: `${totalMonths} Months` },
    ],
    breakdown: {
      principalPct: parseFloat(principalPct.toFixed(1)),
      interestPct: parseFloat(interestPct.toFixed(1)),
    },
    table: {
      headers: ["Period", "Yearly Payment", "Principal Paid", "Interest Paid", "Balance"],
      rows: fullAmortizationRows,
    },
    summaryText: `Your monthly EMI is ${formatINR(Math.round(emi))}. Total interest payable across ${tenureYears} years is ${formatINR(Math.round(totalInterest))}.`,
  };
}

// 3. SIP Calculator
export function calculateSIP(monthlyInvestment: number, returnRate: number, tenureYears: number): CalculationResult {
  const p = Math.max(0, monthlyInvestment);
  const i = Math.max(0, returnRate) / 12 / 100;
  const n = Math.max(1, Math.round(tenureYears * 12));
  const years = Math.max(1, Math.round(tenureYears));

  let futureValue = 0;
  if (i > 0) {
    futureValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  } else {
    futureValue = p * n;
  }

  const investedAmount = p * n;
  const estimatedReturns = Math.max(0, futureValue - investedAmount);
  const investedPct = futureValue > 0 ? (investedAmount / futureValue) * 100 : 0;
  const returnsPct = futureValue > 0 ? (estimatedReturns / futureValue) * 100 : 0;

  const scheduleRows: string[][] = [];
  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    const inv = p * months;
    let fv = i > 0 ? p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i) : inv;
    scheduleRows.push([
      `Year ${y}`,
      formatINR(Math.round(inv)),
      formatINR(Math.round(fv - inv)),
      formatINR(Math.round(fv)),
    ]);
  }

  return {
    primaryLabel: "Total Wealth Created",
    primaryValue: formatINR(Math.round(futureValue)),
    metrics: [
      { label: "Total Invested Amount", value: formatINR(investedAmount) },
      { label: "Estimated Returns (Gains)", value: formatINR(Math.round(estimatedReturns)), highlight: true },
      { label: "Maturity Corpus", value: formatINR(Math.round(futureValue)) },
      { label: "Investment Period", value: `${tenureYears} Years (${n} Months)` },
    ],
    breakdown: {
      principalPct: parseFloat(investedPct.toFixed(1)),
      interestPct: parseFloat(returnsPct.toFixed(1)),
    },
    table: {
      headers: ["Period", "Amount Deposited", "Gains Earned", "Future Value"],
      rows: scheduleRows,
    },
    summaryText: `Investing ${formatINR(p)} monthly at ${returnRate}% for ${tenureYears} years accumulates into ${formatINR(Math.round(futureValue))}.`,
  };
}

// 4. GST Calculator
export function calculateGST(
  amount: number,
  gstRate: number,
  isExclusive: boolean,
  isInterState: boolean = false
): CalculationResult {
  const base = Math.max(0, amount);
  const rate = Math.max(0, gstRate);

  let netAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (isExclusive) {
    netAmount = base;
    gstAmount = (base * rate) / 100;
    totalAmount = netAmount + gstAmount;
  } else {
    totalAmount = base;
    netAmount = (base * 100) / (100 + rate);
    gstAmount = totalAmount - netAmount;
  }

  const halfGST = gstAmount / 2;

  return {
    primaryLabel: isExclusive ? "Total Amount (GST Included)" : "Net Amount (Before GST)",
    primaryValue: formatINR(Math.round(isExclusive ? totalAmount : netAmount)),
    metrics: [
      { label: "Base Taxable Value", value: formatINR(Math.round(netAmount)) },
      { label: `Total GST (${rate}%)`, value: formatINR(Math.round(gstAmount)), highlight: true },
      ...(isInterState
        ? [{ label: `IGST (${rate}%)`, value: formatINR(Math.round(gstAmount)) }]
        : [
            { label: `CGST (${(rate / 2).toFixed(1)}%)`, value: formatINR(Math.round(halfGST)) },
            { label: `SGST / UTGST (${(rate / 2).toFixed(1)}%)`, value: formatINR(Math.round(halfGST)) },
          ]),
      { label: "Gross Total Payable", value: formatINR(Math.round(totalAmount)) },
    ],
    summaryText: `${isExclusive ? "Adding" : "Extracting"} ${rate}% GST on ${formatINR(base)} yields a tax amount of ${formatINR(Math.round(gstAmount))}.`,
  };
}

// 5. Fixed Deposit (FD) Calculator
export function calculateFD(principal: number, interestRate: number, tenureYears: number, compoundingFrequency: number = 4): CalculationResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, interestRate) / 100;
  const t = Math.max(0.1, tenureYears);
  const n = Math.max(1, compoundingFrequency);

  const maturityAmount = p * Math.pow(1 + r / n, n * t);
  const interestEarned = Math.max(0, maturityAmount - p);

  return {
    primaryLabel: "Maturity Corpus",
    primaryValue: formatINR(Math.round(maturityAmount)),
    metrics: [
      { label: "Principal Deposit", value: formatINR(p) },
      { label: "Total Interest Earned", value: formatINR(Math.round(interestEarned)), highlight: true },
      { label: "Tenure Period", value: `${tenureYears} Years` },
    ],
    summaryText: `An FD of ${formatINR(p)} at ${interestRate}% for ${tenureYears} years matures to ${formatINR(Math.round(maturityAmount))}.`,
  };
}

// 6. Recurring Deposit (RD) Calculator
export function calculateRD(monthlyDeposit: number, interestRate: number, tenureMonths: number): CalculationResult {
  const p = Math.max(0, monthlyDeposit);
  const r = Math.max(0, interestRate) / 100;
  const n = Math.max(1, Math.round(tenureMonths));

  let maturityAmount = 0;
  for (let i = 1; i <= n; i++) {
    const t = (n - i + 1) / 12;
    maturityAmount += p * Math.pow(1 + r / 4, 4 * t);
  }

  const totalInvested = p * n;
  const interestEarned = Math.max(0, maturityAmount - totalInvested);

  return {
    primaryLabel: "RD Maturity Value",
    primaryValue: formatINR(Math.round(maturityAmount)),
    metrics: [
      { label: "Total Amount Deposited", value: formatINR(totalInvested) },
      { label: "Interest Earned", value: formatINR(Math.round(interestEarned)), highlight: true },
      { label: "Deposit Period", value: `${n} Months` },
    ],
    summaryText: `Depositing ${formatINR(p)} monthly for ${n} months matures into ${formatINR(Math.round(maturityAmount))}.`,
  };
}

// 7. Compound Interest Calculator
export function calculateCompoundInterest(principal: number, annualRate: number, tenureYears: number, compoundsPerYear: number = 1): CalculationResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRate) / 100;
  const t = Math.max(1, Math.round(tenureYears));
  const n = Math.max(1, compoundsPerYear);

  const futureValue = p * Math.pow(1 + r / n, n * t);
  const compoundInterest = Math.max(0, futureValue - p);

  const scheduleRows: string[][] = [];
  for (let y = 1; y <= t; y++) {
    const fv = p * Math.pow(1 + r / n, n * y);
    scheduleRows.push([
      `Year ${y}`,
      formatINR(p),
      formatINR(Math.round(fv - p)),
      formatINR(Math.round(fv)),
    ]);
  }

  return {
    primaryLabel: "Future Value Amount",
    primaryValue: formatINR(Math.round(futureValue)),
    metrics: [
      { label: "Initial Principal", value: formatINR(p) },
      { label: "Compound Interest Earned", value: formatINR(Math.round(compoundInterest)), highlight: true },
      { label: "Compounding Frequency", value: `${n} times/year` },
    ],
    table: {
      headers: ["Period", "Principal", "Interest Earned", "Balance"],
      rows: scheduleRows,
    },
    summaryText: `${formatINR(p)} invested at ${annualRate}% compounded ${n}x yearly grows to ${formatINR(Math.round(futureValue))} in ${t} years.`,
  };
}
