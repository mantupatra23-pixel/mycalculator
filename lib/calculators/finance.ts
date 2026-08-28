import { formatINR, formatInLakhCrore, formatNumberIN } from "@/lib/formatters";

export interface CalculationResult {
  primaryLabel: string;
  primaryValue: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  breakdown?: { label: string; percentage: number; colorClass: string }[];
  table?: { headers: string[]; rows: string[][] };
  summaryText: string;
}

// 1. EMI Calculator (General, Home Loan, Car Loan, Personal Loan)
export function calculateEMI(principal: number, annualRate: number, tenureYears: number): CalculationResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRate) / 12 / 100;
  const n = Math.max(1, tenureYears * 12);

  if (p === 0 || r === 0) {
    const zeroEmi = n > 0 ? p / n : 0;
    return {
      primaryLabel: "Monthly EMI",
      primaryValue: formatINR(Math.round(zeroEmi)),
      metrics: [
        { label: "Principal Amount", value: formatINR(p) },
        { label: "Total Interest", value: "₹0" },
        { label: "Total Payment", value: formatINR(p) },
      ],
      summaryText: `Your estimated monthly EMI is ${formatINR(Math.round(zeroEmi))} for a tenure of ${tenureYears} years.`,
    };
  }

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  const principalPct = Math.round((p / totalPayment) * 100);
  const interestPct = 100 - principalPct;

  // Generate 5-year preview schedule
  const tableRows: string[][] = [];
  let balance = p;
  const yearlyCount = Math.min(tenureYears, 5);

  for (let y = 1; y <= yearlyCount; y++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 1; m <= 12; m++) {
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      yearInterest += interestPart;
      yearPrincipal += principalPart;
      balance = Math.max(0, balance - principalPart);
    }
    tableRows.push([
      `Year ${y}`,
      formatINR(Math.round(emi * 12)),
      formatINR(Math.round(yearPrincipal)),
      formatINR(Math.round(yearInterest)),
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
      { label: "Total Number of Months", value: `${n} Months` },
    ],
    breakdown: [
      { label: "Principal", percentage: principalPct, colorClass: "bg-steel" },
      { label: "Interest", percentage: interestPct, colorClass: "bg-sand" },
    ],
    table: {
      headers: ["Period", "Yearly EMI", "Principal Paid", "Interest Paid", "Balance"],
      rows: tableRows,
    },
    summaryText: `For a loan of ${formatINR(p)} at ${annualRate}% interest for ${tenureYears} years, your monthly EMI is ${formatINR(Math.round(emi))}.`,
  };
}

// 2. GST Calculator
export function calculateGST(amount: number, rate: number, isInclusive: boolean): CalculationResult {
  const base = Math.max(0, amount);
  const gstRate = Math.max(0, rate);

  if (isInclusive) {
    const netBase = (base * 100) / (100 + gstRate);
    const gstAmount = base - netBase;
    const halfGst = gstAmount / 2;

    return {
      primaryLabel: "Net Base Amount",
      primaryValue: formatINR(Math.round(netBase)),
      metrics: [
        { label: "Total Gross Amount", value: formatINR(base) },
        { label: "GST Amount Extracted", value: formatINR(Math.round(gstAmount)), highlight: true },
        { label: "CGST Portion", value: formatINR(Math.round(halfGst)) },
        { label: "SGST Portion", value: formatINR(Math.round(halfGst)) },
      ],
      summaryText: `Extracting ${gstRate}% GST from ${formatINR(base)} yields a base price of ${formatINR(Math.round(netBase))} with ${formatINR(Math.round(gstAmount))} in total GST.`,
    };
  } else {
    const gstAmount = (base * gstRate) / 100;
    const totalAmount = base + gstAmount;
    const halfGst = gstAmount / 2;

    return {
      primaryLabel: "Total Invoice Amount",
      primaryValue: formatINR(Math.round(totalAmount)),
      metrics: [
        { label: "Base Amount", value: formatINR(base) },
        { label: `GST (${gstRate}%)`, value: formatINR(Math.round(gstAmount)), highlight: true },
        { label: "CGST Portion", value: formatINR(Math.round(halfGst)) },
        { label: "SGST Portion", value: formatINR(Math.round(halfGst)) },
      ],
      summaryText: `Adding ${gstRate}% GST to ${formatINR(base)} results in a total amount of ${formatINR(Math.round(totalAmount))}.`,
    };
  }
}

// 3. SIP Calculator
export function calculateSIP(monthlyInvestment: number, expectedReturnRate: number, tenureYears: number): CalculationResult {
  const p = Math.max(0, monthlyInvestment);
  const i = Math.max(0, expectedReturnRate) / 12 / 100;
  const n = Math.max(1, tenureYears * 12);

  const totalInvested = p * n;
  let futureValue = 0;

  if (i > 0) {
    futureValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  } else {
    futureValue = totalInvested;
  }

  const estimatedGains = Math.max(0, futureValue - totalInvested);
  const investedPct = totalInvested > 0 ? Math.round((totalInvested / futureValue) * 100) : 50;
  const gainPct = 100 - investedPct;

  return {
    primaryLabel: "Expected Maturity Amount",
    primaryValue: formatINR(Math.round(futureValue)),
    metrics: [
      { label: "Total Invested Amount", value: formatINR(totalInvested) },
      { label: "Estimated Wealth Gain", value: formatINR(Math.round(estimatedGains)), highlight: true },
      { label: "Equivalent in Lakhs/Crores", value: formatInLakhCrore(futureValue) },
      { label: "Investment Horizon", value: `${tenureYears} Years (${n} SIPs)` },
    ],
    breakdown: [
      { label: "Invested Amount", percentage: investedPct, colorClass: "bg-steel" },
      { label: "Est. Gains", percentage: gainPct, colorClass: "bg-sand" },
    ],
    summaryText: `Investing ${formatINR(p)} monthly for ${tenureYears} years at ${expectedReturnRate}% yields approx. ${formatINR(Math.round(futureValue))}.`,
  };
}

// 4. Income Tax Calculator (FY 2024-25 / FY 2025-26 Indian New Regime)
export function calculateIncomeTax(annualGrossSalary: number, deductions80C: number = 0, standardDeduction: number = 75000): CalculationResult {
  const gross = Math.max(0, annualGrossSalary);
  const taxableSalary = Math.max(0, gross - standardDeduction);

  let tax = 0;
  // Slabs under New Tax Regime
  if (taxableSalary <= 300000) {
    tax = 0;
  } else if (taxableSalary <= 700000) {
    tax = (taxableSalary - 300000) * 0.05;
  } else if (taxableSalary <= 1000000) {
    tax = 20000 + (taxableSalary - 700000) * 0.10;
  } else if (taxableSalary <= 1200000) {
    tax = 50000 + (taxableSalary - 1000000) * 0.15;
  } else if (taxableSalary <= 1500000) {
    tax = 80000 + (taxableSalary - 1200000) * 0.20;
  } else {
    tax = 140000 + (taxableSalary - 1500000) * 0.30;
  }

  // Section 87A Rebate for Taxable Income up to 7,00,000
  if (taxableSalary <= 700000) {
    tax = 0;
  }

  const cess = tax * 0.04;
  const totalTax = tax + cess;
  const netInHandYearly = gross - totalTax;

  return {
    primaryLabel: "Total Tax Payable (New Regime)",
    primaryValue: formatINR(Math.round(totalTax)),
    metrics: [
      { label: "Gross Annual Income", value: formatINR(gross) },
      { label: "Standard Deduction", value: formatINR(standardDeduction) },
      { label: "Taxable Income", value: formatINR(taxableSalary) },
      { label: "Health & Education Cess (4%)", value: formatINR(Math.round(cess)) },
      { label: "Post-Tax Annual Income", value: formatINR(Math.round(netInHandYearly)) },
    ],
    summaryText: `On a gross income of ${formatINR(gross)}, your estimated tax liability under the New Tax Regime is ${formatINR(Math.round(totalTax))}.`,
  };
}

// 5. In-Hand Salary Calculator
export function calculateSalary(ctc: number, monthlyBonus: number = 0): CalculationResult {
  const annualCtc = Math.max(0, ctc);
  const basic = annualCtc * 0.40;
  const epfEmployee = Math.min(basic * 0.12, 21600);
  const epfEmployer = epfEmployee;
  const standardDeduction = 75000;

  const taxableIncome = Math.max(0, annualCtc - standardDeduction - epfEmployee);
  let tax = 0;
  if (taxableIncome > 700000) {
    if (taxableIncome <= 1000000) tax = 20000 + (taxableIncome - 700000) * 0.1;
    else if (taxableIncome <= 1200000) tax = 50000 + (taxableIncome - 1000000) * 0.15;
    else if (taxableIncome <= 1500000) tax = 80000 + (taxableIncome - 1200000) * 0.20;
    else tax = 140000 + (taxableIncome - 1500000) * 0.30;
    tax += tax * 0.04;
  }

  const professionalTax = 2400;
  const annualInHand = annualCtc - (epfEmployee * 2) - tax - professionalTax;
  const monthlyInHand = Math.max(0, annualInHand / 12);

  return {
    primaryLabel: "Monthly In-Hand (Take Home)",
    primaryValue: formatINR(Math.round(monthlyInHand)),
    metrics: [
      { label: "Annual CTC", value: formatINR(annualCtc) },
      { label: "Monthly Gross Pay", value: formatINR(Math.round(annualCtc / 12)) },
      { label: "Monthly EPF Deduction", value: formatINR(Math.round(epfEmployee / 12)) },
      { label: "Estimated Monthly TDS", value: formatINR(Math.round(tax / 12)) },
      { label: "Annual Take-Home Salary", value: formatINR(Math.round(annualInHand)) },
    ],
    summaryText: `An annual CTC of ${formatINR(annualCtc)} delivers an estimated take-home of ${formatINR(Math.round(monthlyInHand))} per month.`,
  };
}

// 6. FD (Fixed Deposit) Calculator
export function calculateFD(principal: number, annualRate: number, tenureYears: number, compoundingFreq: number = 4): CalculationResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRate) / 100;
  const t = Math.max(0.1, tenureYears);
  const n = compoundingFreq;

  const maturityAmount = p * Math.pow(1 + r / n, n * t);
  const interestEarned = maturityAmount - p;

  return {
    primaryLabel: "FD Maturity Amount",
    primaryValue: formatINR(Math.round(maturityAmount)),
    metrics: [
      { label: "Principal Deposited", value: formatINR(p) },
      { label: "Total Interest Earned", value: formatINR(Math.round(interestEarned)), highlight: true },
      { label: "Compounding Frequency", value: `${n === 4 ? "Quarterly" : n === 12 ? "Monthly" : "Annual"}` },
      { label: "Tenure", value: `${tenureYears} Years` },
    ],
    summaryText: `Depositing ${formatINR(p)} at ${annualRate}% for ${tenureYears} years earns ${formatINR(Math.round(interestEarned))} in interest.`,
  };
}

// 7. PPF Calculator (15-Year Scheme)
export function calculatePPF(yearlyDeposit: number, interestRate: number = 7.1, tenureYears: number = 15): CalculationResult {
  const p = Math.max(0, yearlyDeposit);
  const r = interestRate / 100;
  const n = Math.max(15, tenureYears);

  let totalBalance = 0;
  let totalInvested = 0;

  for (let i = 1; i <= n; i++) {
    totalInvested += p;
    totalBalance = (totalBalance + p) * (1 + r);
  }

  const interestGained = totalBalance - totalInvested;

  return {
    primaryLabel: "PPF Maturity Value",
    primaryValue: formatINR(Math.round(totalBalance)),
    metrics: [
      { label: "Total Invested (15 yrs)", value: formatINR(totalInvested) },
      { label: "Total Tax-Free Interest", value: formatINR(Math.round(interestGained)), highlight: true },
      { label: "Current PPF Rate", value: `${interestRate}% p.a.` },
    ],
    summaryText: `Investing ${formatINR(p)} annually for ${n} years produces ${formatINR(Math.round(totalBalance))} completely tax-free.`,
  };
}

// 8. EPF Calculator
export function calculateEPF(monthlyBasic: number, employeeContributionPct: number = 12, interestRate: number = 8.25, yearsToRetire: number = 25): CalculationResult {
  const basic = Math.max(0, monthlyBasic);
  const r = interestRate / 100;
  let balance = 0;
  let totalDeposit = 0;

  const monthlyEmp = (basic * employeeContributionPct) / 100;
  const monthlyEmployerEPF = (basic * 3.67) / 100;
  const totalMonthlyContr = monthlyEmp + monthlyEmployerEPF;

  for (let y = 1; y <= yearsToRetire; y++) {
    const annualContr = totalMonthlyContr * 12;
    totalDeposit += annualContr;
    balance = (balance + annualContr) * (1 + r);
  }

  return {
    primaryLabel: "Accumulated EPF Corpus",
    primaryValue: formatINR(Math.round(balance)),
    metrics: [
      { label: "Total Contribution Deposited", value: formatINR(Math.round(totalDeposit)) },
      { label: "Compound Interest Earned", value: formatINR(Math.round(balance - totalDeposit)), highlight: true },
      { label: "Retirement Horizon", value: `${yearsToRetire} Years` },
    ],
    summaryText: `Your estimated EPF balance at retirement will be ${formatInLakhCrore(balance)} at an interest rate of ${interestRate}%.`,
  };
}

// 9. RD (Recurring Deposit) Calculator
export function calculateRD(monthlyDeposit: number, annualRate: number, tenureMonths: number): CalculationResult {
  const p = Math.max(0, monthlyDeposit);
  const r = annualRate / 100 / 4; // quarterly compounded
  const n = tenureMonths;
  const quarters = n / 3;

  const totalDeposited = p * n;
  let maturity = 0;

  for (let i = 1; i <= n; i++) {
    const monthsRemaining = n - i + 1;
    maturity += p * Math.pow(1 + r, monthsRemaining / 3);
  }

  const interest = maturity - totalDeposited;

  return {
    primaryLabel: "RD Maturity Value",
    primaryValue: formatINR(Math.round(maturity)),
    metrics: [
      { label: "Total Amount Deposited", value: formatINR(totalDeposited) },
      { label: "Total Interest Earned", value: formatINR(Math.round(interest)), highlight: true },
      { label: "Tenure", value: `${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Yrs)` },
    ],
    summaryText: `An RD of ${formatINR(p)}/month for ${tenureMonths} months matures to ${formatINR(Math.round(maturity))}.`,
  };
}

// 10. NPS (National Pension Scheme) Calculator
export function calculateNPS(monthlyDeposit: number, expectedReturn: number = 10, currentAge: number = 30, retirementAge: number = 60): CalculationResult {
  const p = Math.max(0, monthlyDeposit);
  const r = expectedReturn / 12 / 100;
  const n = Math.max(1, (retirementAge - currentAge) * 12);

  const totalInvested = p * n;
  const totalCorpus = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const lumpSum60 = totalCorpus * 0.60;
  const annuity40 = totalCorpus * 0.40;
  const estMonthlyPension = (annuity40 * 0.06) / 12;

  return {
    primaryLabel: "Total Retirement Corpus",
    primaryValue: formatINR(Math.round(totalCorpus)),
    metrics: [
      { label: "Total Investment", value: formatINR(totalInvested) },
      { label: "Lump Sum Payout (60% Tax-Free)", value: formatINR(Math.round(lumpSum60)) },
      { label: "Annuity Reinvested (40%)", value: formatINR(Math.round(annuity40)) },
      { label: "Estimated Monthly Pension", value: formatINR(Math.round(estMonthlyPension)), highlight: true },
    ],
    summaryText: `NPS corpus of ${formatInLakhCrore(totalCorpus)} provides an estimated monthly pension of ${formatINR(Math.round(estMonthlyPension))}.`,
  };
}

// 11. HRA Exemption Calculator
export function calculateHRA(basicSalary: number, hraReceived: number, rentPaid: number, isMetro: boolean): CalculationResult {
  const basic = Math.max(0, basicSalary);
  const hra = Math.max(0, hraReceived);
  const rent = Math.max(0, rentPaid);

  const condition1 = hra;
  const condition2 = Math.max(0, rent - 0.10 * basic);
  const condition3 = (isMetro ? 0.50 : 0.40) * basic;

  const exemptedHRA = Math.min(condition1, condition2, condition3);
  const taxableHRA = hra - exemptedHRA;

  return {
    primaryLabel: "Exempted HRA (Tax-Free)",
    primaryValue: formatINR(Math.round(exemptedHRA)),
    metrics: [
      { label: "Total HRA Received", value: formatINR(hra) },
      { label: "Taxable HRA Amount", value: formatINR(Math.round(taxableHRA)), highlight: taxableHRA > 0 },
      { label: "Metro City 50% Rule Applied", value: isMetro ? "Yes (50%)" : "No (40%)" },
    ],
    summaryText: `Out of ${formatINR(hra)} HRA received, ${formatINR(Math.round(exemptedHRA))} is exempt from income tax.`,
  };
}

// 12. Gratuity Calculator
export function calculateGratuity(lastDrawnBasic: number, da: number, serviceYears: number): CalculationResult {
  const salary = Math.max(0, lastDrawnBasic) + Math.max(0, da);
  const tenure = Math.max(0, serviceYears);

  if (tenure < 5) {
    return {
      primaryLabel: "Gratuity Payable",
      primaryValue: "₹0",
      metrics: [
        { label: "Status", value: "Not Eligible (Minimum 5 years needed)" },
        { label: "Tenure Completed", value: `${tenure} Years` },
      ],
      summaryText: "Under the Payment of Gratuity Act, a minimum of 5 continuous years of service is required.",
    };
  }

  const gratuity = (15 * salary * tenure) / 26;
  const cappedGratuity = Math.min(gratuity, 2000000); // 20 Lakh statutory cap

  return {
    primaryLabel: "Total Gratuity Payable",
    primaryValue: formatINR(Math.round(cappedGratuity)),
    metrics: [
      { label: "Monthly Salary (Basic + DA)", value: formatINR(salary) },
      { label: "Total Completed Years", value: `${tenure} Years` },
      { label: "Tax-Exempt Statutory Cap", value: "₹20,00,000" },
    ],
    summaryText: `For ${tenure} years of service, the statutory gratuity payable is ${formatINR(Math.round(cappedGratuity))}.`,
  };
}

// 13. TDS Calculator
export function calculateTDS(amount: number, sectionRate: number): CalculationResult {
  const amt = Math.max(0, amount);
  const rate = Math.max(0, sectionRate);
  const tdsDeduction = (amt * rate) / 100;
  const netPayable = amt - tdsDeduction;

  return {
    primaryLabel: "TDS Amount to Deduct",
    primaryValue: formatINR(Math.round(tdsDeduction)),
    metrics: [
      { label: "Gross Payment Amount", value: formatINR(amt) },
      { label: "TDS Rate", value: `${rate}%` },
      { label: "Net Payout After TDS", value: formatINR(Math.round(netPayable)), highlight: true },
    ],
    summaryText: `At ${rate}% TDS rate on ${formatINR(amt)}, the deductible tax is ${formatINR(Math.round(tdsDeduction))}.`,
  };
}

// 14. Simple Interest Calculator
export function calculateSimpleInterest(principal: number, rate: number, timeYears: number): CalculationResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, rate);
  const t = Math.max(0, timeYears);

  const interest = (p * r * t) / 100;
  const total = p + interest;

  return {
    primaryLabel: "Total Simple Interest",
    primaryValue: formatINR(Math.round(interest)),
    metrics: [
      { label: "Principal Amount", value: formatINR(p) },
      { label: "Total Maturity Amount", value: formatINR(Math.round(total)), highlight: true },
      { label: "Annual Rate", value: `${r}%` },
      { label: "Time Period", value: `${t} Years` },
    ],
    summaryText: `Simple interest of ${formatINR(Math.round(interest))} earned on ${formatINR(p)} over ${t} years.`,
  };
}

// 15. Compound Interest Calculator
export function calculateCompoundInterest(principal: number, annualRate: number, timeYears: number, frequency: number = 1): CalculationResult {
  const p = Math.max(0, principal);
  const r = Math.max(0, annualRate) / 100;
  const t = Math.max(0.1, timeYears);
  const n = frequency;

  const total = p * Math.pow(1 + r / n, n * t);
  const interest = total - p;

  return {
    primaryLabel: "Compound Interest Earned",
    primaryValue: formatINR(Math.round(interest)),
    metrics: [
      { label: "Principal Invested", value: formatINR(p) },
      { label: "Final Maturity Balance", value: formatINR(Math.round(total)), highlight: true },
      { label: "Effective Compounding", value: `${n === 1 ? "Annually" : n === 4 ? "Quarterly" : "Monthly"}` },
    ],
    summaryText: `Compounding ${formatINR(p)} at ${annualRate}% over ${timeYears} years yields ${formatINR(Math.round(total))}.`,
  };
}

// 16. Lumpsum Investment Calculator
export function calculateLumpsum(investment: number, expectedReturnRate: number, tenureYears: number): CalculationResult {
  const p = Math.max(0, investment);
  const r = Math.max(0, expectedReturnRate) / 100;
  const t = Math.max(0.1, tenureYears);

  const futureValue = p * Math.pow(1 + r, t);
  const estimatedReturns = futureValue - p;

  return {
    primaryLabel: "Estimated Maturity Value",
    primaryValue: formatINR(Math.round(futureValue)),
    metrics: [
      { label: "Initial Lumpsum Deposited", value: formatINR(p) },
      { label: "Total Estimated Gain", value: formatINR(Math.round(estimatedReturns)), highlight: true },
      { label: "Investment Horizon", value: `${tenureYears} Years` },
    ],
    summaryText: `A one-time investment of ${formatINR(p)} at ${expectedReturnRate}% CAGR grows to ${formatINR(Math.round(futureValue))}.`,
  };
}

// 17. CAGR Calculator
export function calculateCAGR(initialValue: number, finalValue: number, durationYears: number): CalculationResult {
  const v0 = Math.max(0.01, initialValue);
  const vn = Math.max(0.01, finalValue);
  const t = Math.max(0.1, durationYears);

  const cagr = (Math.pow(vn / v0, 1 / t) - 1) * 100;
  const absoluteGrowth = ((vn - v0) / v0) * 100;

  return {
    primaryLabel: "Compound Annual Growth (CAGR)",
    primaryValue: `${cagr.toFixed(2)}%`,
    metrics: [
      { label: "Initial Valuation", value: formatINR(v0) },
      { label: "Final Valuation", value: formatINR(vn) },
      { label: "Total Absolute Return", value: `${absoluteGrowth.toFixed(2)}%`, highlight: true },
      { label: "Time Period", value: `${t} Years` },
    ],
    summaryText: `An asset growing from ${formatINR(v0)} to ${formatINR(vn)} over ${t} years has a CAGR of ${cagr.toFixed(2)}%.`,
  };
}

// 18. Inflation Calculator
export function calculateInflation(currentAmount: number, inflationRate: number, years: number): CalculationResult {
  const amt = Math.max(0, currentAmount);
  const r = Math.max(0, inflationRate) / 100;
  const t = Math.max(0, years);

  const futureCost = amt * Math.pow(1 + r, t);
  const purchasingPowerLoss = amt / Math.pow(1 + r, t);

  return {
    primaryLabel: "Future Equivalent Cost",
    primaryValue: formatINR(Math.round(futureCost)),
    metrics: [
      { label: "Today's Living Cost", value: formatINR(amt) },
      { label: "Annual Inflation Rate", value: `${inflationRate}%` },
      { label: "Future Value Needed in " + t + " Yrs", value: formatINR(Math.round(futureCost)), highlight: true },
      { label: "Equivalent Purchasing Power of Today's Cash", value: formatINR(Math.round(purchasingPowerLoss)) },
    ],
    summaryText: `Due to ${inflationRate}% annual inflation, an item costing ${formatINR(amt)} today will cost ${formatINR(Math.round(futureCost))} in ${t} years.`,
  };
}

// 19. ROI Calculator
export function calculateROI(amountInvested: number, amountReturned: number): CalculationResult {
  const invested = Math.max(0.01, amountInvested);
  const returned = Math.max(0, amountReturned);

  const netProfit = returned - invested;
  const roiPct = (netProfit / invested) * 100;

  return {
    primaryLabel: "Return on Investment (ROI)",
    primaryValue: `${roiPct.toFixed(2)}%`,
    metrics: [
      { label: "Initial Investment", value: formatINR(invested) },
      { label: "Final Returned Capital", value: formatINR(returned) },
      { label: "Net Gain / Profit", value: formatINR(Math.round(netProfit)), highlight: true },
    ],
    summaryText: `Investing ${formatINR(invested)} to earn ${formatINR(returned)} yields an ROI of ${roiPct.toFixed(2)}%.`,
  };
}

// 20. Tax Savings Calculator
export function calculateTaxSavings(investment80C: number, health80D: number, nps80CCD: number, taxBracketPct: number = 30): CalculationResult {
  const c = Math.min(Math.max(0, investment80C), 150000); // 80C cap
  const d = Math.min(Math.max(0, health80D), 75000); // 80D cap
  const nps = Math.min(Math.max(0, nps80CCD), 50000); // 80CCD(1B) cap

  const totalDeductions = c + d + nps;
  const taxSaved = (totalDeductions * taxBracketPct) / 100;

  return {
    primaryLabel: "Total Tax Saved",
    primaryValue: formatINR(Math.round(taxSaved)),
    metrics: [
      { label: "Total Eligible Deductions", value: formatINR(totalDeductions) },
      { label: "Section 80C Deductions", value: formatINR(c) },
      { label: "Section 80D Health Insurance", value: formatINR(d) },
      { label: "NPS 80CCD(1B) Additional", value: formatINR(nps) },
    ],
    summaryText: `By claiming ${formatINR(totalDeductions)} in tax deductions under the ${taxBracketPct}% tax slab, you save ${formatINR(Math.round(taxSaved))} in taxes.`,
  };
}

// 21. Savings Goal Calculator
export function calculateSavingsGoal(targetAmount: number, tenureYears: number, expectedReturnRate: number): CalculationResult {
  const fv = Math.max(0, targetAmount);
  const r = Math.max(0, expectedReturnRate) / 12 / 100;
  const n = Math.max(1, tenureYears * 12);

  let monthlyDeposit = 0;
  if (r > 0) {
    monthlyDeposit = (fv * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
  } else {
    monthlyDeposit = fv / n;
  }

  const totalContribution = monthlyDeposit * n;
  const interestEarned = fv - totalContribution;

  return {
    primaryLabel: "Required Monthly Savings",
    primaryValue: formatINR(Math.round(monthlyDeposit)),
    metrics: [
      { label: "Target Goal Corpus", value: formatINR(fv) },
      { label: "Total Out-of-Pocket Savings", value: formatINR(Math.round(totalContribution)) },
      { label: "Wealth Compounded via Returns", value: formatINR(Math.round(interestEarned)), highlight: true },
      { label: "Timeframe", value: `${tenureYears} Years (${n} Months)` },
    ],
    summaryText: `To achieve a target corpus of ${formatINR(fv)} in ${tenureYears} years, you must save ${formatINR(Math.round(monthlyDeposit))} per month at ${expectedReturnRate}% return.`,
  };
}
