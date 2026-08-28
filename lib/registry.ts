export type CalculatorCategory =
  | "finance"
  | "business"
  | "math"
  | "health"
  | "time-date"
  | "converters"
  | "education"
  | "other";

export interface CalculatorMeta {
  id: string;
  slug: string;
  name: string;
  category: CalculatorCategory;
  description: string;
  keywords: string[];
  popular?: boolean;
  featured?: boolean;
  formulaDescription?: string;
  assumptions?: string[];
  relatedCalculators?: string[];
  faqs?: { q: string; a: string }[];
}

export const CATEGORIES_META: Record<
  CalculatorCategory,
  { name: string; title: string; description: string; icon: string }
> = {
  finance: {
    name: "Finance",
    title: "Finance & Loan Calculators",
    description: "Loans, investments, taxes, retirement, and savings calculators for Indian & global users.",
    icon: "TrendingUp",
  },
  business: {
    name: "Business",
    title: "Business & Freelance Calculators",
    description: "Profit margins, ROAS, hourly rates, payroll, invoices, and break-even models.",
    icon: "Briefcase",
  },
  math: {
    name: "Math",
    title: "Math & Percentage Calculators",
    description: "Percentages, discounts, markup, fractions, statistical averages, and ratios.",
    icon: "Percent",
  },
  health: {
    name: "Health",
    title: "Health & Fitness Calculators",
    description: "BMI, BMR, calorie maintenance, ideal weight, body fat, and hydration goals.",
    icon: "HeartPulse",
  },
  "time-date": {
    name: "Time & Date",
    title: "Time & Date Calculators",
    description: "Age calculations, date differences, duration tracking, and global timezones.",
    icon: "Clock",
  },
  converters: {
    name: "Unit Converters",
    title: "Unit & Measurement Converters",
    description: "Instant unit converters for length, weight, area, volume, temperature, and speed.",
    icon: "Scale",
  },
  education: {
    name: "Education",
    title: "Education & Grading Calculators",
    description: "CGPA to percentage, GPA scales, exam marks, and academic grading conversions.",
    icon: "GraduationCap",
  },
  other: {
    name: "Other Tools",
    title: "Everyday Utility Calculators",
    description: "Fuel expenses, vehicle mileage, electricity power bills, tip splits, and countdowns.",
    icon: "Calculator",
  },
};

export const CATEGORIES = Object.keys(CATEGORIES_META) as CalculatorCategory[];

export const CALCULATORS: CalculatorMeta[] = [
  // ==========================================
  // 1. FINANCE CALCULATORS (27 Calculators)
  // ==========================================
  {
    id: "emi-calculator",
    slug: "emi-calculator",
    name: "EMI Calculator",
    category: "finance",
    description: "Calculate home loan, car loan, and personal loan monthly EMIs with full amortization schedule.",
    keywords: ["emi calculator", "loan emi", "home loan emi", "car loan emi", "monthly installment"],
    popular: true,
    featured: true,
    formulaDescription: "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)",
    assumptions: [
      "Interest is calculated on a monthly reducing balance basis.",
      "Monthly interest rate equals Annual Rate / 1200.",
      "Repayments occur at standard regular monthly intervals."
    ],
    relatedCalculators: ["home-loan-emi-calculator", "car-loan-emi-calculator", "personal-loan-emi-calculator", "ltv-calculator"],
    faqs: [
      { q: "How is EMI calculated?", a: "EMI is computed using the reducing balance formula taking principal loan amount, monthly interest rate, and total monthly installments into account." },
      { q: "Does extending tenure increase total interest?", a: "Yes. Longer loan tenures reduce your monthly installment amount but significantly increase overall compound interest paid across the lifetime of the loan." }
    ]
  },
  {
    id: "home-loan-emi-calculator",
    slug: "home-loan-emi-calculator",
    name: "Home Loan EMI Calculator",
    category: "finance",
    description: "Plan your housing loan monthly installments, interest rates, and total payable interest.",
    keywords: ["home loan emi", "housing loan calculator", "mortgage calculator india"],
    popular: true,
    relatedCalculators: ["emi-calculator", "ltv-calculator", "loan-calculator", "hra-calculator"]
  },
  {
    id: "car-loan-emi-calculator",
    slug: "car-loan-emi-calculator",
    name: "Car Loan EMI Calculator",
    category: "finance",
    description: "Calculate auto loan monthly payments, tenure interest, and on-road down payment ratios.",
    keywords: ["car loan emi", "auto loan calculator", "vehicle financing"],
    relatedCalculators: ["emi-calculator", "personal-loan-emi-calculator", "loan-calculator"]
  },
  {
    id: "personal-loan-emi-calculator",
    slug: "personal-loan-emi-calculator",
    name: "Personal Loan EMI Calculator",
    category: "finance",
    description: "Compute personal loan installments and effective borrowing costs across Indian banks.",
    keywords: ["personal loan emi", "instant loan calculator", "unsecured loan interest"],
    relatedCalculators: ["emi-calculator", "loan-calculator", "simple-interest-calculator"]
  },
  {
    id: "sip-calculator",
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "finance",
    description: "Project mutual fund Systematic Investment Plan (SIP) returns and compound wealth creation.",
    keywords: ["sip calculator", "mutual fund returns", "systematic investment plan", "wealth builder"],
    popular: true,
    featured: true,
    formulaDescription: "FV = P × [ (1 + i)^n - 1 ] / i × (1 + i)",
    assumptions: [
      "Investments are made systematically at the end/beginning of each monthly cycle.",
      "Compounding frequency is monthly aligned with deposit frequency.",
      "Projected annual returns are constant estimates and not guaranteed market returns."
    ],
    relatedCalculators: ["lumpsum-calculator", "cagr-calculator", "mutual-fund-returns-calculator", "compound-interest-calculator"],
    faqs: [
      { q: "How is SIP maturity value calculated?", a: "SIP uses monthly compounding on each installment where earlier deposits accumulate interest for longer durations." },
      { q: "Are SIP returns guaranteed?", a: "No, mutual fund investments are subject to market volatility. The rate entered is an expected annualized CAGR estimate." }
    ]
  },
  {
    id: "lumpsum-calculator",
    slug: "lumpsum-calculator",
    name: "Lumpsum Calculator",
    category: "finance",
    description: "Estimate one-time mutual fund investment returns over long-term compounding horizons.",
    keywords: ["lumpsum calculator", "one time mutual fund investment", "wealth growth"],
    relatedCalculators: ["sip-calculator", "cagr-calculator", "compound-interest-calculator", "fd-calculator"]
  },
  {
    id: "gst-calculator",
    slug: "gst-calculator",
    name: "GST Calculator",
    category: "finance",
    description: "Calculate GST Inclusive and Exclusive amounts with 5%, 12%, 18%, 28% slabs and CGST/SGST/IGST splits.",
    keywords: ["gst calculator", "goods and services tax", "gst inclusive", "gst exclusive", "cgst sgst igst"],
    popular: true,
    featured: true,
    formulaDescription: "Exclusive GST = Base × Rate / 100 | Inclusive Base = Total / (1 + Rate / 100)",
    assumptions: [
      "Intra-state transactions split GST equally between CGST (50%) and SGST (50%).",
      "Inter-state supplies apply full GST under IGST (100%)."
    ],
    relatedCalculators: ["invoice-total-calculator", "profit-loss-calculator", "percentage-calculator"],
    faqs: [
      { q: "What is the difference between GST inclusive and exclusive?", a: "GST exclusive adds tax on top of base amount. GST inclusive extracts embedded tax from the final retail price." }
    ]
  },
  {
    id: "income-tax-calculator",
    slug: "income-tax-calculator",
    name: "Income Tax Calculator",
    category: "finance",
    description: "Compare tax liabilities between New and Old Tax Regimes under current Indian financial rules.",
    keywords: ["income tax calculator", "new tax regime", "old tax regime", "tds calculation", "itr planning"],
    popular: true,
    assumptions: [
      "New Regime includes standard deduction of ₹75,000 for salaried employees.",
      "Section 87A rebate provides full tax rebate for taxable income up to ₹7,00,000 in New Regime.",
      "Health & Education cess is uniformly applied at 4% on net income tax."
    ],
    relatedCalculators: ["salary-calculator", "hra-calculator", "tds-calculator", "ppf-calculator"],
    faqs: [
      { q: "What is the standard deduction for AY 2026-27 in New Regime?", a: "The standard deduction for salaried individuals in the New Tax Regime is ₹75,000." },
      { q: "Is tax zero up to ₹7 Lakhs in New Regime?", a: "Yes, under Section 87A, resident individuals with net taxable income up to ₹7 Lakh receive full tax rebate." }
    ]
  },
  {
    id: "salary-calculator",
    slug: "salary-calculator",
    name: "Salary (In-Hand) Calculator",
    category: "finance",
    description: "Calculate monthly take-home salary from Annual CTC after EPF, Professional Tax, and TDS deductions.",
    keywords: ["salary calculator", "in hand salary", "take home pay", "ctc to in hand", "payroll deductions"],
    popular: true,
    featured: true,
    assumptions: [
      "Statutory EPF deduction is 12% of basic pay (capped at ₹1,800/mo standard).",
      "Professional tax is estimated at standard ₹200/month (₹2,400/year).",
      "Employer contributions included in CTC are separated from gross monthly salary."
    ],
    relatedCalculators: ["income-tax-calculator", "salary-hike-calculator", "payroll-calculator", "hra-calculator"],
    faqs: [
      { q: "Why does monthly in-hand differ from CTC / 12?", a: "CTC includes employer contributions (PF, gratuity, insurance) and employee deductions (PF, professional tax, TDS)." }
    ]
  },
  {
    id: "fd-calculator",
    slug: "fd-calculator",
    name: "Fixed Deposit (FD) Calculator",
    category: "finance",
    description: "Calculate bank Fixed Deposit maturity value, quarterly compound interest, and tenure yield.",
    keywords: ["fd calculator", "fixed deposit interest", "bank fd rates", "maturity corpus"],
    popular: true,
    assumptions: [
      "Bank standard compounding frequency is quarterly (4 times per year).",
      "TDS deductions on interest income are not withheld in the baseline estimate."
    ],
    relatedCalculators: ["rd-calculator", "compound-interest-calculator", "simple-interest-calculator", "ppf-calculator"]
  },
  {
    id: "rd-calculator",
    slug: "rd-calculator",
    name: "Recurring Deposit (RD) Calculator",
    category: "finance",
    description: "Calculate maturity returns on monthly recurring deposits with compound interest compounding.",
    keywords: ["rd calculator", "recurring deposit interest", "post office rd", "monthly savings"],
    relatedCalculators: ["fd-calculator", "sip-calculator", "savings-calculator"]
  },
  {
    id: "ppf-calculator",
    slug: "ppf-calculator",
    name: "PPF Calculator",
    category: "finance",
    description: "Calculate Public Provident Fund 15-year tax-free compounding interest and maturity corpus.",
    keywords: ["ppf calculator", "public provident fund", "tax free return", "section 80c"],
    popular: true,
    relatedCalculators: ["epf-calculator", "nps-calculator", "fd-calculator", "income-tax-calculator"]
  },
  {
    id: "epf-calculator",
    slug: "epf-calculator",
    name: "EPF Calculator",
    category: "finance",
    description: "Project retirement corpus from employee and employer monthly Employee Provident Fund contributions.",
    keywords: ["epf calculator", "provident fund corpus", "pf balance check", "retirement fund"],
    relatedCalculators: ["ppf-calculator", "epf-passbook-calculator", "gratuity-calculator", "salary-calculator"]
  },
  {
    id: "epf-passbook-calculator",
    slug: "epf-passbook-calculator",
    name: "EPF Passbook Balance Calculator",
    category: "finance",
    description: "Calculate accumulated PF interest and employee-employer ledger balance projections.",
    keywords: ["epf passbook", "pf interest calculation", "epfo balance"],
    relatedCalculators: ["epf-calculator", "ppf-calculator", "salary-calculator"]
  },
  {
    id: "nps-calculator",
    slug: "nps-calculator",
    name: "NPS Calculator",
    category: "finance",
    description: "Calculate National Pension Scheme retirement corpus, monthly annuity payout, and tax benefits.",
    keywords: ["nps calculator", "national pension system", "pension annuity", "retirement corpus"],
    relatedCalculators: ["epf-calculator", "ppf-calculator", "sip-calculator"]
  },
  {
    id: "hra-calculator",
    slug: "hra-calculator",
    name: "HRA Exemption Calculator",
    category: "finance",
    description: "Calculate tax-exempt House Rent Allowance (HRA) under Section 10(13A) of the Income Tax Act.",
    keywords: ["hra calculator", "house rent allowance exemption", "section 10 13a", "rent tax save"],
    relatedCalculators: ["income-tax-calculator", "salary-calculator", "rent-split-calculator"]
  },
  {
    id: "gratuity-calculator",
    slug: "gratuity-calculator",
    name: "Gratuity Calculator",
    category: "finance",
    description: "Estimate statutory gratuity payout based on last drawn basic salary and completed service years.",
    keywords: ["gratuity calculator", "gratuity act 1972", "retirement gratuity payout"],
    relatedCalculators: ["salary-calculator", "epf-calculator", "payroll-calculator"]
  },
  {
    id: "tds-calculator",
    slug: "tds-calculator",
    name: "TDS Calculator",
    category: "finance",
    description: "Calculate Tax Deducted at Source across salary, professional fees, contractor payments, and rent.",
    keywords: ["tds calculator", "tax deducted at source", "194j 194c", "tds rate"],
    relatedCalculators: ["income-tax-calculator", "salary-calculator", "gst-calculator"]
  },
  {
    id: "cagr-calculator",
    slug: "cagr-calculator",
    name: "CAGR Calculator",
    category: "finance",
    description: "Compute Compound Annual Growth Rate for stock market, real estate, and portfolio investments.",
    keywords: ["cagr calculator", "compound annual growth rate", "investment annual yield"],
    popular: true,
    relatedCalculators: ["sip-calculator", "lumpsum-calculator", "roi-calculator", "compound-interest-calculator"]
  },
  {
    id: "compound-interest-calculator",
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "finance",
    description: "Calculate compound interest with annual, quarterly, monthly, and daily compounding frequencies.",
    keywords: ["compound interest calculator", "compound interest formula", "wealth growth"],
    popular: true,
    relatedCalculators: ["simple-interest-calculator", "fd-calculator", "cagr-calculator"]
  },
  {
    id: "simple-interest-calculator",
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    category: "finance",
    description: "Calculate simple interest on principal loans and short-term debt agreements instantly.",
    keywords: ["simple interest calculator", "si formula", "flat interest"],
    relatedCalculators: ["compound-interest-calculator", "loan-calculator", "emi-calculator"]
  },
  {
    id: "loan-calculator",
    slug: "loan-calculator",
    name: "Loan Calculator",
    category: "finance",
    description: "General loan repayment, total interest, and installment duration estimator.",
    keywords: ["loan calculator", "bank loan repayment", "finance interest"],
    relatedCalculators: ["emi-calculator", "ltv-calculator", "home-loan-emi-calculator"]
  },
  {
    id: "roi-calculator",
    slug: "roi-calculator",
    name: "ROI (Return on Investment) Calculator",
    category: "finance",
    description: "Measure efficiency and percentage profitability of financial and business investments.",
    keywords: ["roi calculator", "return on investment", "profitability ratio"],
    relatedCalculators: ["cagr-calculator", "roas-calculator", "profit-loss-calculator"]
  },
  {
    id: "inflation-calculator",
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    category: "finance",
    description: "Calculate future purchasing power and price inflation adjustments over time.",
    keywords: ["inflation calculator", "purchasing power", "cost of living increase"],
    relatedCalculators: ["sip-calculator", "cagr-calculator", "savings-calculator"]
  },
  {
    id: "mutual-fund-returns-calculator",
    slug: "mutual-fund-returns-calculator",
    name: "Mutual Fund Returns Calculator",
    category: "finance",
    description: "Evaluate mutual fund SIP and lumpsum returns with annual CAGR compounding projections.",
    keywords: ["mutual fund calculator", "equity returns", "mf portfolio growth"],
    relatedCalculators: ["sip-calculator", "lumpsum-calculator", "cagr-calculator"]
  },
  {
    id: "sukanya-samriddhi-calculator",
    slug: "sukanya-samriddhi-calculator",
    name: "Sukanya Samriddhi (SSY) Calculator",
    category: "finance",
    description: "Calculate maturity amount and government interest on Sukanya Samriddhi Yojana girl child scheme.",
    keywords: ["ssy calculator", "sukanya samriddhi yojana", "girl child savings scheme"],
    relatedCalculators: ["ppf-calculator", "fd-calculator", "sip-calculator"]
  },
  {
    id: "ltv-calculator",
    slug: "ltv-calculator",
    name: "Loan-to-Value (LTV) Calculator",
    category: "finance",
    description: "Calculate loan-to-value ratio, required equity down payment, and mortgage risk proportions.",
    keywords: ["ltv calculator", "loan to value ratio", "mortgage down payment", "home loan eligibility"],
    popular: true,
    formulaDescription: "LTV Ratio (%) = (Loan Amount / Property Value) × 100",
    assumptions: [
      "LTV reflects the proportion of collateral asset value funded by borrowing.",
      "Actual loan sanction depends on lender underwriting, credit scores, legal clearances, and repayment capacity."
    ],
    relatedCalculators: ["home-loan-emi-calculator", "emi-calculator", "loan-calculator"],
    faqs: [
      { q: "What does an LTV ratio indicate?", a: "Loan-to-Value ratio measures the percentage of an asset's total appraised value that is being financed via debt." },
      { q: "Does lower LTV guarantee loan approval?", a: "No. While lower LTV reduces lender exposure, approvals also require credit score checks, documented income, and title verification." }
    ]
  },

  // ==========================================
  // 2. BUSINESS CALCULATORS (14 Calculators)
  // ==========================================
  {
    id: "roas-calculator",
    slug: "roas-calculator",
    name: "ROAS Calculator",
    category: "business",
    description: "Calculate Return on Ad Spend for marketing campaigns and e-commerce advertising.",
    keywords: ["roas calculator", "return on ad spend", "marketing roi"],
    relatedCalculators: ["break-even-calculator", "business-profit-calculator", "roi-calculator"]
  },
  {
    id: "break-even-calculator",
    slug: "break-even-calculator",
    name: "Break-Even Point Calculator",
    category: "business",
    description: "Determine sales volume and revenue required to cover fixed and variable overheads.",
    keywords: ["break even calculator", "break even point", "contribution margin"],
    relatedCalculators: ["business-profit-calculator", "margin-calculator", "markup-calculator"]
  },
  {
    id: "commission-calculator",
    slug: "commission-calculator",
    name: "Commission Calculator",
    category: "business",
    description: "Calculate sales commission payouts, tiered incentives, and net distributor revenue.",
    keywords: ["commission calculator", "sales commission", "agent fee"],
    relatedCalculators: ["freelance-hourly-rate", "salary-calculator", "percentage-calculator"]
  },
  {
    id: "freelance-hourly-rate",
    slug: "freelance-hourly-rate",
    name: "Freelance Hourly Rate Calculator",
    category: "business",
    description: "Determine ideal billing rate based on income goals, billable hours, and overheads.",
    keywords: ["freelance rate calculator", "hourly rate", "consultant pricing"],
    relatedCalculators: ["hourly-to-annual-salary", "salary-calculator", "overtime-pay-calculator"]
  },
  {
    id: "hourly-to-annual-salary",
    slug: "hourly-to-annual-salary",
    name: "Hourly to Annual Salary Calculator",
    category: "business",
    description: "Convert hourly pay into weekly, monthly, and yearly gross income estimates.",
    keywords: ["hourly to salary", "wage converter", "annual pay"],
    relatedCalculators: ["freelance-hourly-rate", "salary-calculator", "overtime-pay-calculator"]
  },
  {
    id: "overtime-pay-calculator",
    slug: "overtime-pay-calculator",
    name: "Overtime Pay Calculator",
    category: "business",
    description: "Calculate overtime compensation with standard 1.5x and 2.0x multipliers.",
    keywords: ["overtime calculator", "ot pay", "shift pay"],
    relatedCalculators: ["hourly-to-annual-salary", "salary-calculator", "payroll-calculator"]
  },
  {
    id: "salary-hike-calculator",
    slug: "salary-hike-calculator",
    name: "Salary Hike Calculator",
    category: "business",
    description: "Calculate annual appraisal percentage increase and updated monthly paycheck.",
    keywords: ["salary hike calculator", "appraisal percentage", "pay rise"],
    relatedCalculators: ["salary-increment-calculator", "salary-calculator", "percentage-increase-calculator"]
  },
  {
    id: "salary-increment-calculator",
    slug: "salary-increment-calculator",
    name: "Salary Increment Calculator",
    category: "business",
    description: "Project multi-year compounding wage increments and career CTC progression.",
    keywords: ["salary increment", "annual pay increment"],
    relatedCalculators: ["salary-hike-calculator", "salary-calculator", "cagr-calculator"]
  },
  {
    id: "payroll-calculator",
    slug: "payroll-calculator",
    name: "Payroll Calculator",
    category: "business",
    description: "Calculate gross salary breakdown with employee EPF, PT, and employer contributions.",
    keywords: ["payroll calculator", "salary slip calculator", "ctc breakdown"],
    relatedCalculators: ["salary-calculator", "income-tax-calculator", "gratuity-calculator"]
  },
  {
    id: "invoice-total-calculator",
    slug: "invoice-total-calculator",
    name: "Invoice Total Calculator",
    category: "business",
    description: "Generate invoice totals with itemized line items, trade discounts, and GST taxes.",
    keywords: ["invoice calculator", "bill total", "gst invoice"],
    relatedCalculators: ["gst-calculator", "discount-calculator", "percentage-calculator"]
  },
  {
    id: "business-profit-calculator",
    slug: "business-profit-calculator",
    name: "Business Profit Calculator",
    category: "business",
    description: "Analyze operating EBIT, COGS, OpEx, and net profit margins after corporate taxes.",
    keywords: ["business profit", "operating profit", "ebit calculator"],
    relatedCalculators: ["business-margin-calculator", "break-even-calculator", "markup-vs-margin-calculator"]
  },
  {
    id: "business-margin-calculator",
    slug: "business-margin-calculator",
    name: "Business Margin Calculator",
    category: "business",
    description: "Calculate gross margin, operating margin, and net profit ratios from revenue.",
    keywords: ["business margin", "gross margin", "net margin"],
    relatedCalculators: ["business-profit-calculator", "margin-calculator", "markup-vs-margin-calculator"]
  },
  {
    id: "markup-vs-margin-calculator",
    slug: "markup-vs-margin-calculator",
    name: "Markup vs Margin Calculator",
    category: "business",
    description: "Convert cost markup percentage to gross profit margin and vice-versa seamlessly.",
    keywords: ["markup vs margin", "markup to margin", "pricing markup"],
    relatedCalculators: ["markup-calculator", "margin-calculator", "discount-calculator"]
  },
  {
    id: "rent-split-calculator",
    slug: "rent-split-calculator",
    name: "Rent Split Calculator",
    category: "business",
    description: "Fairly divide apartment rent and utility bills among flatmates.",
    keywords: ["rent split", "roommate rent calculator", "flatmate split"],
    relatedCalculators: ["tip-calculator", "hra-calculator", "salary-calculator"]
  },

  // ==========================================
  // 3. MATH CALCULATORS (11 Calculators)
  // ==========================================
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "math",
    description: "Calculate percentage shares, fractions, and percentage differences with real-time modes.",
    keywords: ["percentage calculator", "percent share", "math percentage"],
    popular: true,
    relatedCalculators: ["percentage-increase-calculator", "percentage-decrease-calculator", "discount-calculator"]
  },
  {
    id: "percentage-increase-calculator",
    slug: "percentage-increase-calculator",
    name: "Percentage Increase Calculator",
    category: "math",
    description: "Calculate growth and percentage appreciation between original and final amounts.",
    keywords: ["percentage increase", "growth rate", "percent addition"],
    relatedCalculators: ["percentage-calculator", "percentage-decrease-calculator", "salary-hike-calculator"]
  },
  {
    id: "percentage-decrease-calculator",
    slug: "percentage-decrease-calculator",
    name: "Percentage Decrease Calculator",
    category: "math",
    description: "Compute price drops, depreciation, and reduction percentages accurately.",
    keywords: ["percentage decrease", "markdown rate", "price reduction"],
    relatedCalculators: ["percentage-calculator", "discount-calculator", "loss-calculator"]
  },
  {
    id: "discount-calculator",
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "math",
    description: "Calculate shopping discounts, clearance sales, stacked coupons, and net savings.",
    keywords: ["discount calculator", "sale price", "coupon discount"],
    popular: true,
    relatedCalculators: ["percentage-calculator", "gst-calculator", "markup-vs-margin-calculator"]
  },
  {
    id: "profit-calculator",
    slug: "profit-calculator",
    name: "Profit Calculator",
    category: "math",
    description: "Calculate gross trade profit and markup return against wholesale cost price.",
    keywords: ["profit calculator", "trade profit", "gain percentage"],
    relatedCalculators: ["profit-loss-calculator", "margin-calculator", "markup-calculator"]
  },
  {
    id: "loss-calculator",
    slug: "loss-calculator",
    name: "Loss Calculator",
    category: "math",
    description: "Evaluate trading losses and downward percentage deviations on capital.",
    keywords: ["loss calculator", "trade loss", "loss percentage"],
    relatedCalculators: ["profit-loss-calculator", "percentage-decrease-calculator"]
  },
  {
    id: "profit-loss-calculator",
    slug: "profit-loss-calculator",
    name: "Profit & Loss Calculator",
    category: "math",
    description: "Comprehensive CP vs SP financial profitability calculator with quantity multipliers.",
    keywords: ["profit and loss calculator", "cp sp calculator", "net gain loss"],
    relatedCalculators: ["profit-calculator", "loss-calculator", "margin-calculator", "markup-calculator"]
  },
  {
    id: "average-calculator",
    slug: "average-calculator",
    name: "Average Calculator",
    category: "math",
    description: "Calculate Arithmetic Mean, Median, Mode, Range, and Sum from a sequence of numbers.",
    keywords: ["average calculator", "mean median mode", "statistical average"],
    relatedCalculators: ["ratio-calculator", "percentage-calculator", "grade-calculator"]
  },
  {
    id: "ratio-calculator",
    slug: "ratio-calculator",
    name: "Ratio Calculator",
    category: "math",
    description: "Simplify mathematical ratios, calculate scaling proportions, and visual percentage shares.",
    keywords: ["ratio calculator", "simplify ratio", "aspect ratio"],
    relatedCalculators: ["average-calculator", "fraction-calculator", "percentage-calculator"]
  },
  {
    id: "markup-calculator",
    slug: "markup-calculator",
    name: "Markup Calculator",
    category: "math",
    description: "Calculate retail selling price and profit cash from cost markup percentages.",
    keywords: ["markup calculator", "cost markup", "pricing formula"],
    relatedCalculators: ["margin-calculator", "markup-vs-margin-calculator", "profit-loss-calculator"]
  },
  {
    id: "margin-calculator",
    slug: "margin-calculator",
    name: "Margin Calculator",
    category: "math",
    description: "Calculate gross profit margins and revenue ratios from selling prices.",
    keywords: ["margin calculator", "gross profit margin", "trade margin"],
    relatedCalculators: ["markup-calculator", "business-margin-calculator", "profit-loss-calculator"]
  },

  // ==========================================
  // 4. HEALTH & FITNESS (7 Calculators)
  // ==========================================
  {
    id: "bmi-calculator",
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "health",
    description: "Calculate Body Mass Index (BMI) and healthy weight ranges for adults.",
    keywords: ["bmi calculator", "body mass index", "healthy weight"],
    popular: true,
    relatedCalculators: ["ideal-weight-calculator", "body-fat-calculator", "calorie-calculator"]
  },
  {
    id: "bmr-calculator",
    slug: "bmr-calculator",
    name: "BMR Calculator",
    category: "health",
    description: "Calculate Basal Metabolic Rate using Mifflin-St Jeor formula for resting calorie burn.",
    keywords: ["bmr calculator", "basal metabolic rate", "resting calorie burn"],
    relatedCalculators: ["calorie-calculator", "macro-calculator", "bmi-calculator"]
  },
  {
    id: "calorie-calculator",
    slug: "calorie-calculator",
    name: "Daily Calorie Calculator",
    category: "health",
    description: "Determine daily maintenance, deficit, and surplus calories for targeted fitness goals.",
    keywords: ["calorie calculator", "tdee calculator", "weight loss calories"],
    popular: true,
    relatedCalculators: ["bmr-calculator", "macro-calculator", "water-intake-calculator"]
  },
  {
    id: "ideal-weight-calculator",
    slug: "ideal-weight-calculator",
    name: "Ideal Body Weight Calculator",
    category: "health",
    description: "Estimate optimal body weight based on Devine, Robinson, and Miller formulas.",
    keywords: ["ideal weight calculator", "healthy body weight", "devine formula"],
    relatedCalculators: ["bmi-calculator", "body-fat-calculator"]
  },
  {
    id: "body-fat-calculator",
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    category: "health",
    description: "Estimate body fat percentage using US Navy circumference method.",
    keywords: ["body fat calculator", "us navy body fat", "lean mass"],
    relatedCalculators: ["bmi-calculator", "ideal-weight-calculator", "calorie-calculator"]
  },
  {
    id: "water-intake-calculator",
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    category: "health",
    description: "Calculate recommended daily hydration target based on weight and workout activity.",
    keywords: ["water intake calculator", "daily hydration", "water drinking target"],
    relatedCalculators: ["calorie-calculator", "bmi-calculator"]
  },
  {
    id: "macro-calculator",
    slug: "macro-calculator",
    name: "Macro Calculator",
    category: "health",
    description: "Calculate daily protein, carbohydrate, and fat gram requirements for fitness diets.",
    keywords: ["macro calculator", "protein carbs fats", "diet macros"],
    relatedCalculators: ["calorie-calculator", "bmr-calculator"]
  },

  // ==========================================
  // 5. TIME & DATE (9 Calculators)
  // ==========================================
  {
    id: "age-calculator",
    slug: "age-calculator",
    name: "Age Calculator",
    category: "time-date",
    description: "Calculate exact chronological age in years, months, days, hours, and next birthday countdown.",
    keywords: ["age calculator", "calculate age from dob", "date of birth calculator"],
    popular: true,
    relatedCalculators: ["age-in-days-calculator", "date-difference-calculator", "countdown-calculator"]
  },
  {
    id: "date-difference-calculator",
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    category: "time-date",
    description: "Calculate elapsed calendar days, weeks, and duration between two dates.",
    keywords: ["date difference", "days between dates", "calendar duration"],
    relatedCalculators: ["days-between-dates", "date-add-calculator", "age-calculator"]
  },
  {
    id: "days-between-dates",
    slug: "days-between-dates",
    name: "Days Between Dates",
    category: "time-date",
    description: "Find total count of working days and weekends between any two calendar dates.",
    keywords: ["days between dates", "work days calculator", "calendar count"],
    relatedCalculators: ["date-difference-calculator", "hours-calculator"]
  },
  {
    id: "time-duration-calculator",
    slug: "time-duration-calculator",
    name: "Time Duration Calculator",
    category: "time-date",
    description: "Add, subtract, and find duration between start and end clock times.",
    keywords: ["time duration calculator", "time difference", "hours minutes count"],
    relatedCalculators: ["hours-calculator", "time-zone-calculator"]
  },
  {
    id: "hours-calculator",
    slug: "hours-calculator",
    name: "Hours Calculator",
    category: "time-date",
    description: "Calculate total work hours, timesheet shifts, and unpaid break deductions.",
    keywords: ["hours calculator", "work hours", "timesheet calculator"],
    relatedCalculators: ["time-duration-calculator", "overtime-pay-calculator"]
  },
  {
    id: "date-add-calculator",
    slug: "date-add-calculator",
    name: "Date Add Calculator",
    category: "time-date",
    description: "Add days, weeks, months, or years to any date to calculate future target milestones.",
    keywords: ["add days to date", "future date calculator", "date addition"],
    relatedCalculators: ["date-subtract-calculator", "date-difference-calculator"]
  },
  {
    id: "date-subtract-calculator",
    slug: "date-subtract-calculator",
    name: "Date Subtract Calculator",
    category: "time-date",
    description: "Subtract days, weeks, or months from any date to find historical calendar points.",
    keywords: ["subtract days from date", "past date calculator"],
    relatedCalculators: ["date-add-calculator", "date-difference-calculator"]
  },
  {
    id: "age-in-days-calculator",
    slug: "age-in-days-calculator",
    name: "Age in Days Calculator",
    category: "time-date",
    description: "Find the exact number of total days and hours you have lived since birth.",
    keywords: ["age in days", "days alive calculator", "total days lived"],
    relatedCalculators: ["age-calculator", "countdown-calculator"]
  },
  {
    id: "time-zone-calculator",
    slug: "time-zone-calculator",
    name: "Time Zone Converter",
    category: "time-date",
    description: "Convert meeting times across IST, UTC, EST, PST, GMT, Dubai, Tokyo, and Sydney.",
    keywords: ["time zone converter", "ist to est", "utc to ist converter"],
    relatedCalculators: ["time-duration-calculator", "countdown-calculator"]
  },

  // ==========================================
  // 6. UNIT CONVERTERS (20 Calculators)
  // ==========================================
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "All-in-One Unit Converter",
    category: "converters",
    description: "Universal converter across length, mass, land area, volume, temperature, and speed.",
    keywords: ["unit converter", "metric converter", "all in one conversion"],
    popular: true,
    relatedCalculators: ["length-converter", "weight-converter", "area-converter", "temperature-converter"]
  },
  {
    id: "length-converter",
    slug: "length-converter",
    name: "Length Converter",
    category: "converters",
    description: "Convert between meters, feet, inches, kilometers, centimeters, and miles.",
    keywords: ["length converter", "meters to feet", "distance converter"],
    relatedCalculators: ["feet-to-meter", "meter-to-feet", "inch-to-cm", "height-converter"]
  },
  {
    id: "weight-converter",
    slug: "weight-converter",
    name: "Weight Converter",
    category: "converters",
    description: "Convert kilograms, pounds (lbs), grams, ounces, and metric tons.",
    keywords: ["weight converter", "kg to lbs", "mass conversion"],
    relatedCalculators: ["kg-to-pound", "pound-to-kg", "unit-converter"]
  },
  {
    id: "height-converter",
    slug: "height-converter",
    name: "Height Converter",
    category: "converters",
    description: "Convert human height between feet + inches and centimeters.",
    keywords: ["height converter", "feet to cm", "cm to feet inches"],
    relatedCalculators: ["length-converter", "bmi-calculator", "feet-to-meter"]
  },
  {
    id: "area-converter",
    slug: "area-converter",
    name: "Area Converter",
    category: "converters",
    description: "Convert land units: Square Feet, Square Meters, Acres, Hectares, and Bigha.",
    keywords: ["area converter", "sq ft to acre", "bigha to sq ft"],
    relatedCalculators: ["length-converter", "unit-converter"]
  },
  {
    id: "volume-converter",
    slug: "volume-converter",
    name: "Volume Converter",
    category: "converters",
    description: "Convert Liters, Milliliters, Gallons, and Cubic Meters.",
    keywords: ["volume converter", "liters to gallons", "fluid ounces to ml"],
    relatedCalculators: ["water-intake-calculator", "unit-converter"]
  },
  {
    id: "temperature-converter",
    slug: "temperature-converter",
    name: "Temperature Converter",
    category: "converters",
    description: "Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K).",
    keywords: ["temperature converter", "celsius to fahrenheit", "kelvin conversion"],
    relatedCalculators: ["celsius-to-fahrenheit", "fahrenheit-to-celsius"]
  },
  {
    id: "speed-converter",
    slug: "speed-converter",
    name: "Speed Converter",
    category: "converters",
    description: "Convert km/h, mph, m/s, and knots instantly.",
    keywords: ["speed converter", "kmh to mph", "knots to kmh"],
    relatedCalculators: ["mileage-calculator", "unit-converter"]
  },
  {
    id: "time-converter",
    slug: "time-converter",
    name: "Time Converter",
    category: "converters",
    description: "Convert seconds, minutes, hours, days, and weeks.",
    keywords: ["time converter", "hours to minutes", "seconds to hours"],
    relatedCalculators: ["time-duration-calculator", "hours-calculator"]
  },
  {
    id: "data-storage-converter",
    slug: "data-storage-converter",
    name: "Data Storage Converter",
    category: "converters",
    description: "Convert Bytes, KB, MB, GB, TB, and PB digital storage sizes.",
    keywords: ["data converter", "mb to gb", "gb to tb converter"],
    relatedCalculators: ["unit-converter"]
  },
  {
    id: "feet-to-meter",
    slug: "feet-to-meter",
    name: "Feet to Meter Converter",
    category: "converters",
    description: "Convert feet (ft) to meters (m) accurately.",
    keywords: ["feet to meter", "ft to m"],
    relatedCalculators: ["meter-to-feet", "length-converter", "height-converter"]
  },
  {
    id: "meter-to-feet",
    slug: "meter-to-feet",
    name: "Meter to Feet Converter",
    category: "converters",
    description: "Convert meters (m) to feet (ft) with decimal precision.",
    keywords: ["meter to feet", "m to ft"],
    relatedCalculators: ["feet-to-meter", "length-converter", "inch-to-cm"]
  },
  {
    id: "inch-to-cm",
    slug: "inch-to-cm",
    name: "Inch to CM Converter",
    category: "converters",
    description: "Convert inches (in) to centimeters (cm).",
    keywords: ["inch to cm", "in to cm"],
    relatedCalculators: ["cm-to-inch", "height-converter", "length-converter"]
  },
  {
    id: "cm-to-inch",
    slug: "cm-to-inch",
    name: "CM to Inch Converter",
    category: "converters",
    description: "Convert centimeters (cm) to inches (in).",
    keywords: ["cm to inch", "cm to in"],
    relatedCalculators: ["inch-to-cm", "height-converter", "length-converter"]
  },
  {
    id: "kg-to-pound",
    slug: "kg-to-pound",
    name: "KG to Pound Converter",
    category: "converters",
    description: "Convert kilograms (kg) to pounds (lbs).",
    keywords: ["kg to pound", "kg to lbs"],
    relatedCalculators: ["pound-to-kg", "weight-converter", "bmi-calculator"]
  },
  {
    id: "pound-to-kg",
    slug: "pound-to-kg",
    name: "Pound to KG Converter",
    category: "converters",
    description: "Convert pounds (lbs) to kilograms (kg).",
    keywords: ["pound to kg", "lbs to kg"],
    relatedCalculators: ["kg-to-pound", "weight-converter", "bmi-calculator"]
  },
  {
    id: "km-to-miles",
    slug: "km-to-miles",
    name: "KM to Miles Converter",
    category: "converters",
    description: "Convert kilometers (km) to statute miles (mi).",
    keywords: ["km to miles", "km to mi"],
    relatedCalculators: ["miles-to-km", "speed-converter", "length-converter"]
  },
  {
    id: "miles-to-km",
    slug: "miles-to-km",
    name: "Miles to KM Converter",
    category: "converters",
    description: "Convert statute miles (mi) to kilometers (km).",
    keywords: ["miles to km", "mi to km"],
    relatedCalculators: ["km-to-miles", "speed-converter", "length-converter"]
  },
  {
    id: "celsius-to-fahrenheit",
    slug: "celsius-to-fahrenheit",
    name: "Celsius to Fahrenheit",
    category: "converters",
    description: "Convert Celsius (°C) to Fahrenheit (°F).",
    keywords: ["celsius to fahrenheit", "c to f"],
    relatedCalculators: ["fahrenheit-to-celsius", "temperature-converter"]
  },
  {
    id: "fahrenheit-to-celsius",
    slug: "fahrenheit-to-celsius",
    name: "Fahrenheit to Celsius",
    category: "converters",
    description: "Convert Fahrenheit (°F) to Celsius (°C).",
    keywords: ["fahrenheit to celsius", "f to c"],
    relatedCalculators: ["celsius-to-fahrenheit", "temperature-converter"]
  },

  // ==========================================
  // 7. EDUCATION CALCULATORS (5 Calculators)
  // ==========================================
  {
    id: "grade-calculator",
    slug: "grade-calculator",
    name: "Grade Calculator",
    category: "education",
    description: "Calculate test scores, letter grades (A+, A, B, etc.), and 4.0 GPA standing.",
    keywords: ["grade calculator", "exam marks", "letter grade"],
    relatedCalculators: ["gpa-calculator", "percentage-calculator", "average-calculator"]
  },
  {
    id: "gpa-calculator",
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "education",
    description: "Calculate semester Grade Point Average (SGPA) with credit-hour weighting.",
    keywords: ["gpa calculator", "semester gpa", "4.0 scale gpa"],
    relatedCalculators: ["cgpa-calculator", "grade-calculator", "cgpa-to-percentage"]
  },
  {
    id: "cgpa-calculator",
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "education",
    description: "Calculate Cumulative Grade Point Average across all semesters.",
    keywords: ["cgpa calculator", "cumulative gpa", "college cgpa"],
    relatedCalculators: ["gpa-calculator", "cgpa-to-percentage", "percentage-to-cgpa"]
  },
  {
    id: "cgpa-to-percentage",
    slug: "cgpa-to-percentage",
    name: "CGPA to Percentage (India)",
    category: "education",
    description: "Convert CBSE / AICTE 10-point CGPA into marks percentage (multiply by 9.5).",
    keywords: ["cgpa to percentage", "cbse cgpa to percentage", "aicte cgpa conversion"],
    popular: true,
    formulaDescription: "Marks Percentage (%) = CGPA × 9.5",
    assumptions: [
      "Standard formula applies strictly to CBSE and AICTE affiliated universities.",
      "Check your individual university marksheet for autonomous scale multipliers."
    ],
    relatedCalculators: ["percentage-to-cgpa", "cgpa-calculator", "gpa-calculator"]
  },
  {
    id: "percentage-to-cgpa",
    slug: "percentage-to-cgpa",
    name: "Percentage to CGPA",
    category: "education",
    description: "Convert academic marks percentage into standard 10-point CGPA.",
    keywords: ["percentage to cgpa", "marks to cgpa conversion"],
    formulaDescription: "CGPA (10-Point Scale) = Marks Percentage / 9.5",
    relatedCalculators: ["cgpa-to-percentage", "cgpa-calculator", "percentage-calculator"]
  },

  // ==========================================
  // 8. OTHER USEFUL TOOLS (8 Calculators)
  // ==========================================
  {
    id: "fuel-cost-calculator",
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "other",
    description: "Calculate road trip petrol/diesel expenses, required liters, and running cost per km.",
    keywords: ["fuel cost calculator", "petrol expense", "trip cost"],
    popular: true,
    relatedCalculators: ["mileage-calculator", "electricity-bill-calculator"]
  },
  {
    id: "mileage-calculator",
    slug: "mileage-calculator",
    name: "Vehicle Mileage Calculator",
    category: "other",
    description: "Calculate vehicle fuel economy in km/L from distance and fuel filled.",
    keywords: ["mileage calculator", "kmpl calculator", "fuel efficiency"],
    relatedCalculators: ["fuel-cost-calculator", "speed-converter"]
  },
  {
    id: "electricity-bill-calculator",
    slug: "electricity-bill-calculator",
    name: "Electricity Bill Calculator",
    category: "other",
    description: "Estimate monthly power costs and kWh energy consumption for appliances.",
    keywords: ["electricity bill calculator", "power consumption", "bijli bill"],
    relatedCalculators: ["fuel-cost-calculator", "savings-calculator"]
  },
  {
    id: "tip-calculator",
    slug: "tip-calculator",
    name: "Tip & Bill Split Calculator",
    category: "other",
    description: "Calculate dining tip percentages and divide restaurant bills equally.",
    keywords: ["tip calculator", "bill split", "restaurant tip"],
    relatedCalculators: ["rent-split-calculator", "percentage-calculator"]
  },
  {
    id: "savings-calculator",
    slug: "savings-calculator",
    name: "Savings Calculator",
    category: "other",
    description: "Project future savings corpus from monthly deposits with interest compounding.",
    keywords: ["savings calculator", "savings growth", "monthly deposit"],
    relatedCalculators: ["sip-calculator", "rd-calculator", "fd-calculator"]
  },
  {
    id: "countdown-calculator",
    slug: "countdown-calculator",
    name: "Date Countdown Calculator",
    category: "other",
    description: "Live countdown timer tracking remaining days, hours, and minutes until your event.",
    keywords: ["countdown calculator", "event countdown", "days left"],
    relatedCalculators: ["age-calculator", "date-difference-calculator"]
  },
  {
    id: "fraction-calculator",
    slug: "fraction-calculator",
    name: "Fraction Calculator",
    category: "other",
    description: "Add, subtract, multiply, divide, and simplify fractions into mixed numbers.",
    keywords: ["fraction calculator", "simplify fractions", "mixed fraction"],
    relatedCalculators: ["ratio-calculator", "percentage-calculator", "scientific-calculator"]
  },
  {
    id: "scientific-calculator",
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    category: "other",
    description: "Interactive browser scientific calculator for trigonometry, powers, roots, and logarithms.",
    keywords: ["scientific calculator", "trigonometry calculator", "online math tools"],
    relatedCalculators: ["fraction-calculator", "percentage-calculator", "average-calculator"]
  },
];

export function getCalculatorsByCategory(cat: CalculatorCategory): CalculatorMeta[] {
  return CALCULATORS.filter((c) => c.category === cat);
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

export function getRelatedCalculators(current: CalculatorMeta, limit: number = 4): CalculatorMeta[] {
  if (current.relatedCalculators && current.relatedCalculators.length > 0) {
    const list = current.relatedCalculators
      .map((slug) => CALCULATORS.find((c) => c.slug === slug))
      .filter((c): c is CalculatorMeta => c !== undefined);
    if (list.length >= limit) return list.slice(0, limit);
  }
  const sameCategory = CALCULATORS.filter(
    (c) => c.category === current.category && c.slug !== current.slug
  );
  return sameCategory.slice(0, limit);
}
