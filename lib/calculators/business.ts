import { formatNumberIN, formatINR } from "@/lib/formatters";
import { CalculationResult } from "./finance";

// 1. ROAS Calculator (Return on Ad Spend)
export function calculateROAS(revenue: number, adSpend: number, costOfGoods: number = 0): CalculationResult {
  const rev = Math.max(0, revenue);
  const ads = Math.max(0.01, adSpend);
  const cogs = Math.max(0, costOfGoods);

  const roasMultiplier = rev / ads;
  const roasPct = roasMultiplier * 100;
  const netProfit = rev - ads - cogs;
  const profitMargin = rev > 0 ? (netProfit / rev) * 100 : 0;
  const isProfitable = netProfit > 0;

  return {
    primaryLabel: "Return on Ad Spend (ROAS)",
    primaryValue: `${roasMultiplier.toFixed(2)}x (${roasPct.toFixed(0)}%)`,
    metrics: [
      { label: "Gross Revenue", value: formatINR(rev) },
      { label: "Total Ad Spend", value: formatINR(ads) },
      { label: "Net Campaign Profit", value: formatINR(netProfit), highlight: true },
      { label: "Net Profit Margin", value: `${profitMargin.toFixed(2)}%` },
      { label: "Campaign Status", value: isProfitable ? "Profitable" : "Unprofitable / Loss" },
    ],
    summaryText: `For every ₹1 spent on advertising, you generated ₹${roasMultiplier.toFixed(2)} in revenue, yielding a net profit of ${formatINR(netProfit)}.`,
  };
}

// 2. Break-Even Point Calculator
export function calculateBreakEven(fixedCosts: number, unitSellingPrice: number, unitVariableCost: number): CalculationResult {
  const fixed = Math.max(0, fixedCosts);
  const price = Math.max(0.01, unitSellingPrice);
  const vCost = Math.max(0, unitVariableCost);

  const contributionMargin = price - vCost;
  const contributionRatio = (contributionMargin / price) * 100;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixed / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * price;

  return {
    primaryLabel: "Break-Even Sales Volume",
    primaryValue: `${formatNumberIN(breakEvenUnits, 0)} Units`,
    metrics: [
      { label: "Break-Even Revenue", value: formatINR(breakEvenRevenue), highlight: true },
      { label: "Contribution Margin / Unit", value: formatINR(contributionMargin) },
      { label: "Contribution Margin Ratio", value: `${contributionRatio.toFixed(2)}%` },
      { label: "Fixed Overhead Costs", value: formatINR(fixed) },
    ],
    summaryText: `You need to sell at least ${formatNumberIN(breakEvenUnits, 0)} units (${formatINR(breakEvenRevenue)} in sales) to cover all fixed and variable expenses.`,
  };
}

// 3. Commission Calculator (Base + Tiered Incentive)
export function calculateCommission(salesAmount: number, commissionRate: number, baseSalary: number = 0): CalculationResult {
  const sales = Math.max(0, salesAmount);
  const rate = Math.max(0, commissionRate);
  const base = Math.max(0, baseSalary);

  const commissionEarned = (sales * rate) / 100;
  const totalPayout = base + commissionEarned;
  const effectiveRate = sales > 0 ? (commissionEarned / sales) * 100 : rate;

  return {
    primaryLabel: "Total Payout (Base + Commission)",
    primaryValue: formatINR(Math.round(totalPayout)),
    metrics: [
      { label: "Commission Amount", value: formatINR(Math.round(commissionEarned)), highlight: true },
      { label: "Base Fixed Pay", value: formatINR(base) },
      { label: "Gross Sales Closed", value: formatINR(sales) },
      { label: "Effective Incentive Rate", value: `${effectiveRate.toFixed(2)}%` },
    ],
    summaryText: `A ${rate}% commission on ${formatINR(sales)} generates ${formatINR(Math.round(commissionEarned))} in incentive, making total compensation ${formatINR(Math.round(totalPayout))}.`,
  };
}

// 4. Freelance Hourly Rate Calculator
export function calculateFreelanceRate(
  monthlyIncomeGoal: number,
  billableHoursPerWeek: number,
  monthlyExpenses: number = 0,
  annualVacationWeeks: number = 4
): CalculationResult {
  const goal = Math.max(0, monthlyIncomeGoal);
  const expenses = Math.max(0, monthlyExpenses);
  const hoursWeek = Math.max(1, billableHoursPerWeek);
  const vacation = Math.min(50, Math.max(0, annualVacationWeeks));

  const workingWeeksPerYear = 52 - vacation;
  const totalAnnualTarget = (goal + expenses) * 12;
  const totalBillableHoursYear = hoursWeek * workingWeeksPerYear;
  const hourlyRate = totalBillableHoursYear > 0 ? totalAnnualTarget / totalBillableHoursYear : 0;
  const dailyRate8h = hourlyRate * 8;

  return {
    primaryLabel: "Recommended Hourly Rate",
    primaryValue: `₹${formatNumberIN(Math.round(hourlyRate), 0)} / hr`,
    metrics: [
      { label: "Day Rate (8 hrs)", value: formatINR(Math.round(dailyRate8h)), highlight: true },
      { label: "Monthly Gross Billing", value: formatINR(Math.round(totalAnnualTarget / 12)) },
      { label: "Annual Billable Hours", value: `${formatNumberIN(totalBillableHoursYear, 0)} hrs` },
      { label: "Working Weeks / Year", value: `${workingWeeksPerYear} weeks` },
    ],
    summaryText: `To achieve a take-home target of ${formatINR(goal)}/mo after expenses and taking ${vacation} weeks off, charge ₹${Math.round(hourlyRate)}/hour.`,
  };
}

// 5. Hourly to Annual Salary Calculator
export function calculateHourlyToSalary(hourlyWage: number, hoursPerWeek: number = 40, weeksPerYear: number = 52): CalculationResult {
  const wage = Math.max(0, hourlyWage);
  const hours = Math.max(1, hoursPerWeek);
  const weeks = Math.max(1, weeksPerYear);

  const annual = wage * hours * weeks;
  const monthly = annual / 12;
  const weekly = wage * hours;
  const daily = wage * (hours / 5);

  return {
    primaryLabel: "Total Annual Compensation",
    primaryValue: formatINR(Math.round(annual)),
    metrics: [
      { label: "Monthly Equivalent", value: formatINR(Math.round(monthly)), highlight: true },
      { label: "Weekly Earnings", value: formatINR(Math.round(weekly)) },
      { label: "Daily Rate (8 hrs)", value: formatINR(Math.round(daily)) },
      { label: "Annual Paid Hours", value: `${hours * weeks} hrs` },
    ],
    summaryText: `An hourly wage of ₹${wage} working ${hours} hrs/week translates into ${formatINR(Math.round(monthly))}/month or ${formatINR(Math.round(annual))}/year.`,
  };
}

// 6. Overtime Pay Calculator
export function calculateOvertime(baseHourlyRate: number, regularHours: number, overtimeHours: number, multiplier: number = 1.5): CalculationResult {
  const rate = Math.max(0, baseHourlyRate);
  const regHrs = Math.max(0, regularHours);
  const otHrs = Math.max(0, overtimeHours);
  const mult = Math.max(1, multiplier);

  const regularPay = rate * regHrs;
  const otRate = rate * mult;
  const otPay = otRate * otHrs;
  const totalGrossPay = regularPay + otPay;

  return {
    primaryLabel: "Total Gross Payout",
    primaryValue: formatINR(Math.round(totalGrossPay)),
    metrics: [
      { label: "Overtime Earnings", value: formatINR(Math.round(otPay)), highlight: true },
      { label: "Regular Shift Pay", value: formatINR(Math.round(regularPay)) },
      { label: "Overtime Hourly Rate", value: `₹${otRate.toFixed(2)}/hr (${mult}x)` },
      { label: "Total Shift Hours", value: `${regHrs + otHrs} hrs` },
    ],
    summaryText: `Working ${otHrs} overtime hours at ${mult}x rate adds ${formatINR(Math.round(otPay))} on top of standard pay, for a total of ${formatINR(Math.round(totalGrossPay))}.`,
  };
}

// 7 & 8. Salary Hike & Increment Calculator
export function calculateSalaryHike(currentCTC: number, hikePercentage: number, bonusAmt: number = 0): CalculationResult {
  const ctc = Math.max(0, currentCTC);
  const hike = Math.max(0, hikePercentage);
  const bonus = Math.max(0, bonusAmt);

  const incrementAmount = (ctc * hike) / 100;
  const newCTC = ctc + incrementAmount + bonus;
  const oldMonthly = ctc / 12;
  const newMonthly = newCTC / 12;
  const monthlyDifference = newMonthly - oldMonthly;

  return {
    primaryLabel: "New Appraised CTC",
    primaryValue: formatINR(Math.round(newCTC)),
    metrics: [
      { label: "Annual CTC Hike", value: `+${formatINR(Math.round(incrementAmount))}`, highlight: true },
      { label: "New Monthly Gross", value: formatINR(Math.round(newMonthly)) },
      { label: "Monthly In-Pocket Gain", value: `+${formatINR(Math.round(monthlyDifference))}` },
      { label: "Percentage Hike", value: `${hike.toFixed(2)}%` },
    ],
    summaryText: `A ${hike}% appraisal on ${formatINR(ctc)} increases your salary by ${formatINR(Math.round(incrementAmount))}, giving a new CTC of ${formatINR(Math.round(newCTC))}.`,
  };
}

// 9. Payroll Calculator (Gross to Net In-Hand with Indian Deductions)
export function calculatePayroll(
  grossMonthlySalary: number,
  includePF: boolean = true,
  includePT: boolean = true,
  customTaxDeduction: number = 0
): CalculationResult {
  const gross = Math.max(0, grossMonthlySalary);
  const basic = gross * 0.5; // Approx 50% basic salary standard

  // Deductions
  const employeePF = includePF ? Math.min(1800, basic * 0.12) : 0;
  const employerPF = includePF ? Math.min(1800, basic * 0.12) : 0;
  const professionalTax = includePT ? 200 : 0;
  const tdsTax = Math.max(0, customTaxDeduction);

  const totalDeductions = employeePF + professionalTax + tdsTax;
  const netInHand = Math.max(0, gross - totalDeductions);

  return {
    primaryLabel: "Net Take-Home Pay (Monthly)",
    primaryValue: formatINR(Math.round(netInHand)),
    metrics: [
      { label: "Gross Monthly Pay", value: formatINR(gross) },
      { label: "Employee PF Deduction", value: formatINR(Math.round(employeePF)) },
      { label: "Professional Tax (PT)", value: formatINR(professionalTax) },
      { label: "Income Tax (TDS)", value: formatINR(tdsTax) },
      { label: "Total Monthly Deductions", value: formatINR(Math.round(totalDeductions)), highlight: true },
    ],
    summaryText: `From a gross salary of ${formatINR(gross)}, total statutory deductions equal ${formatINR(Math.round(totalDeductions))}, leaving a net salary of ${formatINR(Math.round(netInHand))}.`,
  };
}

// 10. Invoice Total Calculator
export function calculateInvoice(
  subtotalAmount: number,
  discountPercentage: number = 0,
  taxGstRate: number = 18,
  shippingHandling: number = 0
): CalculationResult {
  const sub = Math.max(0, subtotalAmount);
  const discPct = Math.min(100, Math.max(0, discountPercentage));
  const taxRate = Math.max(0, taxGstRate);
  const shipping = Math.max(0, shippingHandling);

  const discountVal = (sub * discPct) / 100;
  const taxableAmount = sub - discountVal;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const grandTotal = taxableAmount + taxAmount + shipping;

  return {
    primaryLabel: "Grand Invoice Total",
    primaryValue: formatINR(Math.round(grandTotal)),
    metrics: [
      { label: "Items Subtotal", value: formatINR(sub) },
      { label: "Discount Applied", value: `-${formatINR(Math.round(discountVal))}` },
      { label: `GST / Tax (${taxRate}%)`, value: `+${formatINR(Math.round(taxAmount))}`, highlight: true },
      { label: "Shipping & Handling", value: formatINR(shipping) },
    ],
    summaryText: `Invoice subtotal ${formatINR(sub)} with ${taxRate}% GST equals a final payable amount of ${formatINR(Math.round(grandTotal))}.`,
  };
}

// 11 & 12. Business Profit & Margin Calculator
export function calculateBusinessProfit(revenue: number, cogs: number, operatingExpenses: number, taxRate: number = 25): CalculationResult {
  const rev = Math.max(0, revenue);
  const costGoods = Math.max(0, cogs);
  const opex = Math.max(0, operatingExpenses);
  const tax = Math.max(0, taxRate);

  const grossProfit = rev - costGoods;
  const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;

  const operatingProfitEBIT = grossProfit - opex;
  const operatingMargin = rev > 0 ? (operatingProfitEBIT / rev) * 100 : 0;

  const taxAmount = operatingProfitEBIT > 0 ? (operatingProfitEBIT * tax) / 100 : 0;
  const netProfit = operatingProfitEBIT - taxAmount;
  const netMargin = rev > 0 ? (netProfit / rev) * 100 : 0;

  return {
    primaryLabel: "Net Profit (After Tax)",
    primaryValue: formatINR(Math.round(netProfit)),
    metrics: [
      { label: "Gross Profit", value: formatINR(Math.round(grossProfit)) },
      { label: "Gross Margin", value: `${grossMargin.toFixed(2)}%` },
      { label: "Operating Profit (EBIT)", value: formatINR(Math.round(operatingProfitEBIT)) },
      { label: "Net Profit Margin", value: `${netMargin.toFixed(2)}%`, highlight: true },
    ],
    summaryText: `From ${formatINR(rev)} in revenue, net income after COGS, OpEx, and taxes is ${formatINR(Math.round(netProfit))} (${netMargin.toFixed(2)}% net margin).`,
  };
}

// 13. Markup vs Margin Converter
export function calculateMarkupMarginComparison(value: number, inputType: "markup" | "margin"): CalculationResult {
  const val = Math.max(0, value);
  let markup = 0;
  let margin = 0;

  if (inputType === "markup") {
    markup = val;
    margin = (markup / (100 + markup)) * 100;
  } else {
    margin = Math.min(99.99, val);
    markup = (margin / (100 - margin)) * 100;
  }

  // Example scenario based on ₹100 Cost Price
  const exampleCP = 1000;
  const profit = (exampleCP * markup) / 100;
  const exampleSP = exampleCP + profit;

  return {
    primaryLabel: inputType === "markup" ? "Equivalent Gross Margin" : "Equivalent Markup Rate",
    primaryValue: `${(inputType === "markup" ? margin : markup).toFixed(2)}%`,
    metrics: [
      { label: "Input " + (inputType === "markup" ? "Markup" : "Margin"), value: `${val.toFixed(2)}%` },
      { label: "Computed " + (inputType === "markup" ? "Gross Margin" : "Cost Markup"), value: `${(inputType === "markup" ? margin : markup).toFixed(2)}%`, highlight: true },
      { label: "On ₹1,000 Cost -> Selling Price", value: `₹${formatNumberIN(exampleSP, 2)}` },
      { label: "Profit on ₹1,000 Cost", value: `₹${formatNumberIN(profit, 2)}` },
    ],
    summaryText: `A ${val.toFixed(1)}% ${inputType} is equivalent to a ${(inputType === "markup" ? margin : markup).toFixed(2)}% ${inputType === "markup" ? "gross profit margin" : "cost markup"}.`,
  };
}

// 14. Fair Rent Split Calculator
export function calculateRentSplit(totalRent: number, peopleCount: number, utilityBills: number = 0): CalculationResult {
  const rent = Math.max(0, totalRent);
  const people = Math.max(1, peopleCount);
  const utilities = Math.max(0, utilityBills);

  const totalBill = rent + utilities;
  const perPersonTotal = totalBill / people;
  const perPersonRent = rent / people;
  const perPersonUtil = utilities / people;

  return {
    primaryLabel: "Per Person Equal Share",
    primaryValue: formatINR(Math.round(perPersonTotal)),
    metrics: [
      { label: "Total Room Rent", value: formatINR(rent) },
      { label: "Total Utilities (Wifi/Power)", value: formatINR(utilities) },
      { label: "Per Person Rent Portion", value: formatINR(Math.round(perPersonRent)) },
      { label: "Per Person Utility Portion", value: formatINR(Math.round(perPersonUtil)), highlight: true },
      { label: "Total Flatmates", value: `${people} Persons` },
    ],
    summaryText: `Dividing ${formatINR(totalBill)} (${formatINR(rent)} rent + ${formatINR(utilities)} bills) equally among ${people} flatmates results in ${formatINR(Math.round(perPersonTotal))} each.`,
  };
}
