import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALCULATORS, getRelatedCalculators, Calculator } from "@/lib/registry";

import { SalaryCalculatorRenderer } from "@/components/calculators/SalaryCalculatorRenderer";
import { TaxCalculatorRenderer } from "@/components/calculators/TaxCalculatorRenderer";
import { PaymentGatewayFeeCalculatorRenderer } from "@/components/calculators/PaymentGatewayFeeCalculatorRenderer";
import { UpworkCalculatorRenderer } from "@/components/calculators/UpworkCalculatorRenderer";
import { FiverrCalculatorRenderer } from "@/components/calculators/FiverrCalculatorRenderer";
import { EcommerceRoasCalculatorRenderer } from "@/components/calculators/EcommerceRoasCalculatorRenderer";
import { ParcelRealEarningsCalculatorRenderer } from "@/components/calculators/ParcelRealEarningsCalculatorRenderer";
import { TravelRealCostCalculatorRenderer } from "@/components/calculators/TravelRealCostCalculatorRenderer";
import { ConstructionMaterialCalculatorRenderer } from "@/components/calculators/ConstructionMaterialCalculatorRenderer";

import { FinanceCalculatorRenderer } from "@/components/calculators/FinanceCalculatorRenderer";
import { MathCalculatorRenderer } from "@/components/calculators/MathCalculatorRenderer";
import { ConvertersRenderer } from "@/components/calculators/ConvertersRenderer";
import { EducationRenderer } from "@/components/calculators/EducationRenderer";
import { TimeDateRenderer } from "@/components/calculators/TimeDateRenderer";
import { HealthRenderer } from "@/components/calculators/HealthRenderer";
import { BusinessRenderer } from "@/components/calculators/BusinessRenderer";
import { OtherRenderer } from "@/components/calculators/OtherRenderer";
import { Disclaimer } from "@/components/Disclaimer";
import { EmbedModal } from "@/components/EmbedModal";

import {
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Layers,
  ArrowRight,
  Code2,
  Calculator as CalcIcon,
  Calendar,
  TrendingUp,
  ShieldCheck,
  Table as TableIcon,
  Sparkles,
  Info,
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) return { title: "Calculator Not Found | MyCalculators" };

  const pageTitle = `${calc.name} – Free Online Calculator | MyCalculators`;
  const pageDesc = `${calc.description} Free, browser-native tool with step-by-step formulas, worked examples, and instant breakdowns.`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: `https://www.mycalculator.xyz/calculators/${calc.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.mycalculator.xyz/calculators/${calc.slug}`,
      siteName: "MyCalculators",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
    },
  };
}

// Category Intelligence Engine
function getCategoryIntelligence(calc: Calculator) {
  const cat = calc.category;
  const slug = calc.slug;

  if (cat === "health" || slug.includes("bmi") || slug.includes("calorie") || slug.includes("bmr")) {
    return {
      principles: [
        { title: "WHO Classification Standards", desc: "Body Mass Index evaluates adult mass relative to height squared (kg/m²), categorizing metrics across Underweight (<18.5), Normal (18.5-24.9), and Overweight (25-29.9)." },
        { title: "Lean Mass vs Adipose Tissue", desc: "BMI calculates gross weight density without differentiating between dense skeletal muscle and visceral adipose fat. Muscular athletes often show higher scores." },
        { title: "Caloric Equilibrium & BMR", desc: "Basal Metabolic Rate reflects baseline energy consumption at complete rest. Total daily expenditure requires multiplying BMR by active physical exertion factors." },
        { title: "Biometric Screening Scope", desc: "Biometric calculators function as non-invasive statistical screening benchmarks for general health rather than standalone diagnostic clinical assessments." }
      ],
      matrixHeaders: { h1: "BMI Range", h2: "Classification", h3: "Health Risk Profile", h4: "Nutritional Recommendation" },
      matrixRows: [
        { col1: "< 18.5", col2: "Underweight", col3: "Nutrient Deficiency Risk", col4: "Caloric surplus with high-protein whole foods" },
        { col1: "18.5 - 24.9", col2: "Normal Weight", col3: "Lowest Statistical Risk", col4: "Maintain balanced intake and regular cardiovascular fitness" },
        { col1: "25.0 - 29.9+", col2: "Overweight / Obese", col3: "Elevated Metabolic Risk", col4: "Caloric deficit combined with progressive resistance training" }
      ],
      assumptions: [
        "Biometric calculations adhere to standard World Health Organization (WHO) adult physiological formulas (ages 18+).",
        "Calculations assume standard civilian metabolic baselines and non-gestational parameters.",
        "Height and mass parameters are converted to SI metric equivalents (meters and kilograms) prior to computation."
      ],
      defaultFaqs: [
        { q: "What is considered a healthy BMI range?", a: "According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered optimal for healthy adult men and women." },
        { q: "Why doesn't BMI account for athletic muscle mass?", a: "BMI is a height-to-weight ratio and does not isolate body fat percentage. Athletes with significant muscle density may register as overweight despite excellent metabolic health." }
      ]
    };
  }

  if (cat === "converters" || slug.includes("converter") || slug.includes("unit")) {
    return {
      principles: [
        { title: "SI & BIPM Standard Calibration", desc: "Conversions adhere strictly to International System of Units (SI) definitions maintained by BIPM and NIST, ensuring zero mathematical drift." },
        { title: "Floating-Point Precision Guard", desc: "Calculations execute using IEEE-754 double-precision arithmetic to prevent binary floating-point roundoff errors across multi-decimal scaling factors." },
        { title: "Metric vs Imperial Transformation", desc: "Exact statutory multipliers (such as 1 inch = 2.54 cm exactly, 1 pound = 0.45359237 kg) govern inter-system unit translation without truncation." },
        { title: "Zero Latency Browser Engine", desc: "All factor transformations execute synchronously within your browser runtime without network roundtrips or server latency." }
      ],
      matrixHeaders: { h1: "Conversion Scale", h2: "Factor Magnitude", h3: "Numerical Precision", h4: "Standard Use Case" },
      matrixRows: [
        { col1: "Micro / Precision Units", col2: "10^-6 to 10^-3", col3: "High Decimal Accuracy", col4: "Scientific research, engineering tolerances & laboratory work" },
        { col1: "Standard Daily Units", col2: "10^0 to 10^3", col3: "Standard 2 Decimals", col4: "Commercial trade, domestic culinary recipes & road travel" },
        { col1: "Macro / Industrial Units", col2: "10^3 to 10^6+", col3: "Rounded Aggregate", col4: "Bulk freight logistics, agricultural yields & civil infrastructure" }
      ],
      assumptions: [
        "All transformation ratios utilize exact international SI conversion coefficients published by BIPM and NIST.",
        "Internal calculations maintain double-precision floats before displaying user-friendly rounded equivalents.",
        "Temperature conversions account for absolute zero scale offsets (Celsius, Fahrenheit, and Kelvin baselines)."
      ],
      defaultFaqs: [
        { q: "How accurate are these unit conversions?", a: "Every conversion applies exact statutory scientific coefficients (e.g., 1 inch = 2.54 cm). Calculations run locally with zero approximation drift." },
        { q: "Can I convert between Metric and Imperial systems instantly?", a: "Yes. The converter instantly recalculates across international metric units and customary imperial units with zero latency." }
      ]
    };
  }

  if (cat === "math" || slug.includes("discount") || slug.includes("percentage") || slug.includes("fraction")) {
    return {
      principles: [
        { title: "Deterministic Algebraic Precision", desc: "Calculations follow rigorous mathematical proofs and strict operator precedence (BODMAS/PEMDAS) to guarantee reproducible outputs." },
        { title: "Successive Discount Compounding", desc: "Multi-tier discounts apply sequentially to remaining subtotals rather than adding percentages together, avoiding gross margin erosion." },
        { title: "Percentage Markup vs Margin", desc: "Markup reflects profit relative to product cost, whereas margin measures profit relative to selling price. A 25% markup equals a 20% margin." },
        { title: "Commercial Rounding Standards", desc: "Values round using standard half-up commercial formatting to guarantee balance consistency across retail receipts and trade ledgers." }
      ],
      matrixHeaders: { h1: "Calculation Variant", h2: "Mathematical Operation", h3: "Relative Variance", h4: "Analytical Application" },
      matrixRows: [
        { col1: "Single Flat Discount", col2: "Base * (1 - Rate)", col3: "Linear Dollar Saving", col4: "Standard retail markdowns and seasonal clearance sales" },
        { col1: "Stacked / Sequential Coupons", col2: "Subtotal * Rate1 * Rate2", col3: "Compound Marginal Saving", col4: "E-commerce promotion codes and multi-tiered retail vouchers" },
        { col1: "Margin vs Markup Variance", col2: "(Price - Cost) / Base", col3: "Divergent Yield Curve", col4: "Commercial inventory pricing and wholesale distribution" }
      ],
      assumptions: [
        "Arithmetic operations enforce formal mathematical operator hierarchy.",
        "Calculations validate non-negative baseline pricing and prevent division-by-zero anomalies.",
        "Intermediate calculations retain floating-point precision before rounding to currency cents or paisa."
      ],
      defaultFaqs: [
        { q: "How is percentage discount calculated?", a: "Multiply the original price by the discount percentage, divide by 100 to find the total money saved, then deduct that savings from the original price." },
        { q: "Why don't stacked coupons add together directly?", a: "Stacked discounts apply successively. A 20% discount followed by an extra 10% discount yields an effective 28% total saving, not 30%, because the second discount applies to the discounted price." }
      ]
    };
  }

  if (cat === "business" || slug.includes("roas") || slug.includes("earnings") || slug.includes("gateway") || slug.includes("commission") || slug.includes("parcel")) {
    return {
      principles: [
        { title: "Payment Gateway Blended Cost", desc: "Aggregators levy 2% + 18% GST on domestic transactions and up to 3% to 4% on international cards. Factor in service GST to safeguard net margins." },
        { title: "Section 194-O Marketplace TDS", desc: "E-commerce platforms in India withhold 1% TDS under Section 194-O before remitting sales balances. Always reconcile net remittances against Form 26AS." },
        { title: "Return & RTO Overhead Absorption", desc: "Return to Origin (RTO) incurs both forward and reverse shipping costs with zero revenue realized. Maintain minimum margin cushions to absorb logistics friction." },
        { title: "ROAS Breakeven Threshold", desc: "Breakeven Return on Ad Spend equals 1 divided by Gross Profit Margin. A product with 40% margin requires minimum 2.5x ROAS to avoid capital loss." }
      ],
      matrixHeaders: { h1: "Operational Parameter", h2: "Direct Financial Impact", h3: "Risk / Margin Shift", h4: "Optimization Strategy" },
      matrixRows: [
        { col1: "Sub-Scale Order Volume", col2: "Higher Fixed Fee % Burden", col3: "Severe Margin Erosion", col4: "Bundle product units to dilute fixed transaction fees" },
        { col1: "Optimal Scale Level", col2: "Volume Slabs Activated", col3: "Predictable Net Margin", col4: "Negotiate customized enterprise merchant gateway rates" },
        { col1: "High RTO / Courier Returns", col2: "2x Reverse Logistics Cost", col3: "Working Capital Drain", col4: "Implement OTP delivery confirmation and prepaid incentives" }
      ],
      assumptions: [
        "Calculations incorporate standard 18% GST applicable to merchant services and platform commissions in India.",
        "Marketplace settlement models assume standard delivery confirmation reconciliation timelines.",
        "Courier return overheads and packaging wastage amortize across realized order quantities."
      ],
      defaultFaqs: [
        { q: "How does RTO impact online seller profits?", a: "RTO forfeits forward shipping, generates reverse courier fees, and risks inventory transit damage with zero revenue realized." },
        { q: "What is breakeven ROAS?", a: "Breakeven Return on Ad Spend equals 1 divided by gross margin. A 40% margin requires 2.5x ROAS just to cover advertising expenses." }
      ]
    };
  }

  if (cat === "finance" || slug.includes("emi") || slug.includes("loan") || slug.includes("interest") || slug.includes("sip")) {
    return {
      principles: [
        { title: "Reducing Balance vs Flat Rate", desc: "Confirm your lender computes interest on a Reducing Balance method. A quoted 6% flat rate mathematically equals 11% to 12% on a reducing balance schedule." },
        { title: "Tax Deductions (Section 24b & 80C)", desc: "Home loan borrowers in India can claim up to ₹2 Lakhs annually on interest payments (Section 24b) and up to ₹1.5 Lakhs on principal repayments (Section 80C)." },
        { title: "Prepayment Amortization Impact", desc: "Paying just 1 extra EMI each financial year directly toward principal can shorten a 20-year tenure by 3 to 4 years, saving multiple lakhs in interest." },
        { title: "EBLR & RBI Repo Linkage", desc: "Floating-rate retail loans in India link to the RBI repo rate. When benchmark rates shift, banks adjust loan tenure rather than monthly installments by default." }
      ],
      matrixHeaders: { h1: "Loan Tenure Selection", h2: "Monthly EMI Burden", h3: "Total Interest Outgo", h4: "Financial Recommendation" },
      matrixRows: [
        { col1: "Short Tenure (5 - 10 Yrs)", col2: "Higher Monthly Outflow", col3: "Lowest Lifetime Interest", col4: "Saves up to 45% in interest; optimal for aggressive debt retirement" },
        { col1: "Standard Tenure (15 Yrs)", col2: "Balanced Monthly Cash Flow", col3: "Moderate Total Interest", col4: "Balanced equilibrium between liquidity and overall debt cost" },
        { col1: "Extended Tenure (20 - 30 Yrs)", col2: "Lowest Monthly Installment", col3: "Interest Exceeds Principal", col4: "Requires annual prepayments to avoid excessive lifetime interest" }
      ],
      assumptions: [
        "Interest compounding follows the standard reducing balance method with monthly periodic rate conversion (R / 1200).",
        "Amortization schedules assume regular monthly payments without default penalty capitalization.",
        "Statutory tax deductions reflect prevailing thresholds under the Indian Income Tax Act."
      ],
      defaultFaqs: [
        { q: "How is loan EMI calculated?", a: "EMI uses the reducing balance formula: [P * r * (1+r)^n] / [(1+r)^n - 1], where P is loan principal, r is monthly interest rate, and n is tenure in months." },
        { q: "Does loan prepayment reduce tenure or EMI?", a: "By default, banks reduce loan tenure to maximize your interest savings. You can request your lender to reduce monthly EMI instead." }
      ]
    };
  }

  // Fallback for Travel, Time-Date, Education, and General Tools
  return {
    principles: [
      { title: "Hidden Outlay Provisioning", desc: "Realized expenses routinely exceed nominal estimates due to local taxes, transit surcharges, baggage fees, and unlisted municipal tariffs." },
      { title: "Contingency Buffer Sizing", desc: "Financial planners recommend provisioning a minimum 5% to 10% contingency allocation to absorb unforeseen incidentals and protect reserves." },
      { title: "Dynamic Surge & Seasonal Variance", desc: "Dynamic pricing algorithms in hospitality, transit, and procurement trigger sharp spikes during peak demand cycles. Lock bookings early." },
      { title: "Deterministic Baseline Modeling", desc: "This engine generates exact deterministic mathematical baselines to provide reliable reference points before situational variables occur." }
    ],
    matrixHeaders: { h1: "Planning Scenario", h2: "Contingency Buffer", h3: "Budget Exposure", h4: "Execution Guideline" },
    matrixRows: [
      { col1: "Strict / Zero Buffer", col2: "0% Allocation", col3: "High Overrun Risk", col4: "Mandate emergency reserves to cover unanticipated price spikes" },
      { col1: "Standard Allocation", col2: "5% - 10% Buffer", col3: "Stable Target Budget", col4: "Optimal framework for domestic itineraries, projects, or timelines" },
      { col1: "Conservative Allocation", col2: "15%+ Buffer", col3: "Zero Financial Strain", col4: "Recommended for remote logistics, peak seasons, or international travel" }
    ],
    assumptions: [
      "Calculations execute deterministically based purely on user-provided input parameters.",
      "Computations run entirely in your local browser runtime without remote data logging.",
      "Dynamic variables such as seasonal surcharges, local taxes, or currency shifts may require situational adjustment."
    ],
    defaultFaqs: [
      { q: "Why is an emergency contingency buffer recommended?", a: "Real-world plans frequently encounter unexpected surcharges, transit delays, or incidental costs. A 5% to 10% buffer prevents planning deficits." },
      { q: "Are my personal inputs stored online?", a: "No. All calculations run strictly client-side inside your browser. No personal data, itineraries, or figures are uploaded to remote servers." }
    ]
  };
}

export default function CalculatorDetailPage({ params }: Props) {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) notFound();

  const related = getRelatedCalculators(calc, 4);
  const intel = getCategoryIntelligence(calc);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: calc.name,
        applicationCategory: "UtilityApplication",
        operatingSystem: "All",
        url: `https://www.mycalculator.xyz/calculators/${calc.slug}`,
        description: calc.description,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.mycalculator.xyz",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: calc.category.toUpperCase(),
            item: `https://www.mycalculator.xyz/calculators/${calc.category}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: calc.name,
            item: `https://www.mycalculator.xyz/calculators/${calc.slug}`,
          },
        ],
      },
      ...(calc.faqs && calc.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: calc.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  const renderCalculatorComponent = () => {
    if (calc.slug === "salary-calculator") return <SalaryCalculatorRenderer slug={calc.slug} name={calc.name} />;
    if (calc.slug === "income-tax-calculator") return <TaxCalculatorRenderer slug={calc.slug} name={calc.name} />;
    if (calc.slug === "payment-gateway-fee-calculator") return <PaymentGatewayFeeCalculatorRenderer />;
    if (calc.slug === "upwork-net-earnings-calculator") return <UpworkCalculatorRenderer />;
    if (calc.slug === "fiverr-net-earnings-calculator") return <FiverrCalculatorRenderer />;
    if (calc.slug === "ecommerce-roas-break-even-calculator") return <EcommerceRoasCalculatorRenderer />;
    if (calc.slug === "parcel-real-earnings-calculator") return <ParcelRealEarningsCalculatorRenderer />;
    if (calc.slug === "travel-real-cost-calculator") return <TravelRealCostCalculatorRenderer />;
    if (calc.slug === "construction-material-price-calculator") return <ConstructionMaterialCalculatorRenderer />;

    switch (calc.category) {
      case "finance":
        return <FinanceCalculatorRenderer slug={calc.slug} name={calc.name} />;
      case "math":
        return <MathCalculatorRenderer slug={calc.slug} name={calc.name} />;
      case "converters":
        return <ConvertersRenderer slug={calc.slug} name={calc.name} />;
      case "education":
        return <EducationRenderer slug={calc.slug} name={calc.name} />;
      case "time-date":
        return <TimeDateRenderer slug={calc.slug} name={calc.name} />;
      case "health":
        return <HealthRenderer slug={calc.slug} name={calc.name} />;
      case "business":
        return <BusinessRenderer slug={calc.slug} name={calc.name} />;
      case "other":
      default:
        return <OtherRenderer slug={calc.slug} name={calc.name} />;
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs font-semibold text-navy/60">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/calculators/${calc.category}`} className="hover:text-navy uppercase tracking-wider transition-colors">
            {calc.category}
          </Link>
          <span>/</span>
          <span className="text-navy">{calc.name}</span>
        </div>
        {calc.lastUpdated && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-navy/50">
            <Calendar className="w-3 h-3" /> Updated: {calc.lastUpdated}
          </span>
        )}
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mb-2">
            {calc.name}
          </h1>
          <p className="text-sm sm:text-base text-navy/75 max-w-2xl leading-relaxed">
            {calc.description}
          </p>
        </div>
        <div className="shrink-0">
          <EmbedModal slug={calc.slug} name={calc.name} />
        </div>
      </div>

      {renderCalculatorComponent()}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        <div className="md:col-span-8 space-y-8">
          <section className="bg-sage/20 border border-navy/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-steel" /> How to Use &amp; Methodological Guide
            </h2>
            <p className="text-xs sm:text-sm text-navy/80 leading-relaxed">
              The <strong>{calc.name}</strong> executes a verified mathematical evaluation model designed to eliminate manual computation errors and hidden estimation drift. To achieve deterministic precision, apply these operational guidelines:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 1. Input Parameters
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  Provide exact figures or utilize the interactive sliders. Boundary limits prevent invalid negative or zero-division entries.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 2. Real-Time Netting
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  The client-side algorithm computes intermediate variables, deduction thresholds, and multiplier scaling instantly with zero latency.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 3. Evaluate Breakdown
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  Inspect the result dashboard to distinguish between gross baseline figures and net finalized outcomes after fees or buffers.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 4. One-Click Copy
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  Export structured summaries to your clipboard for record keeping, documentation, proposals, or budgeting.
                </p>
              </div>
            </div>
          </section>

          {calc.formulaDescription && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
                <Code2 className="w-5 h-5 text-steel" /> Mathematical Derivation &amp; Formula Engine
              </h2>
              <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                Computations follow formal mathematical expressions ensuring reproducible, consistent results:
              </p>
              <div className="p-4 bg-sage/30 rounded-xl font-mono text-xs sm:text-sm font-bold text-navy break-all border border-navy/10 text-center">
                {calc.formulaDescription}
              </div>
              {calc.formulaVariables && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-navy/70 uppercase tracking-wider block">Variable Specifications:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {calc.formulaVariables.map((v, i) => (
                      <div key={i} className="p-2.5 bg-sage/10 border border-navy/10 rounded-lg flex items-center gap-2">
                        <strong className="font-mono text-steel bg-white px-2 py-0.5 rounded border border-navy/15 shrink-0">
                          {v.symbol}
                        </strong>
                        <span className="text-navy/80">{v.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {calc.workedExample && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
                <CalcIcon className="w-5 h-5 text-steel" /> Worked Practical Example &amp; Case Study
              </h2>
              <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                To evaluate the mathematical model in practical execution, examine this real-world benchmark scenario:
              </p>
              <div className="bg-sage/20 border border-navy/10 rounded-xl p-4 text-xs text-navy/85 space-y-3">
                <div className="font-bold text-steel text-xs uppercase tracking-wide">
                  Scenario: {calc.workedExample.scenario}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(calc.workedExample.inputs).map(([k, v]) => (
                    <div key={k} className="p-2 bg-white/70 rounded-lg border border-navy/10">
                      <span className="text-navy/60 block text-[10px] uppercase font-bold">{k}</span>
                      <strong className="text-navy text-xs">{v}</strong>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-bold text-emerald-900 flex justify-between items-center">
                  <span>Calculated Outcome:</span>
                  <span className="text-sm">{calc.workedExample.result}</span>
                </div>
                <p className="text-xs text-navy/70 leading-relaxed pt-1">
                  {calc.workedExample.explanation}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5 text-steel" /> Variance &amp; Sensitivity Analysis Matrix
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-navy/15 rounded-xl overflow-hidden bg-white">
                    <thead className="bg-sage/30 text-navy font-bold">
                      <tr>
                        <th className="p-2.5 border-b border-navy/15">{intel.matrixHeaders.h1}</th>
                        <th className="p-2.5 border-b border-navy/15">{intel.matrixHeaders.h2}</th>
                        <th className="p-2.5 border-b border-navy/15">{intel.matrixHeaders.h3}</th>
                        <th className="p-2.5 border-b border-navy/15">{intel.matrixHeaders.h4}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/10 text-navy/80">
                      {intel.matrixRows.map((r, i) => (
                        <tr key={i}>
                          <td className="p-2.5 font-semibold">{r.col1}</td>
                          <td className="p-2.5 font-mono">{r.col2}</td>
                          <td className="p-2.5 font-mono text-emerald-700 font-bold">{r.col3}</td>
                          <td className="p-2.5">{r.col4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-steel" /> Strategic Optimization &amp; Core Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {intel.principles.map((p, idx) => (
                <div key={idx} className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                  <h3 className="font-bold text-navy text-xs">{p.title}</h3>
                  <p className="text-[11px] text-navy/70 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-sage/15 border border-navy/15 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-navy">
                Underlying Mathematical Assumptions &amp; Precision Standards
              </h2>
            </div>
            <p className="text-xs text-navy/75 leading-relaxed">
              To deliver deterministic calculations with zero server-side latency, the <strong>{calc.name}</strong> operates on the following mathematical constraints:
            </p>
            <div className="space-y-2 pt-1">
              {calc.assumptions && calc.assumptions.length > 0 ? (
                calc.assumptions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-navy/10 rounded-xl text-xs text-navy/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                intel.assumptions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 bg-white border border-navy/10 rounded-xl text-xs text-navy/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))
              )}
              <div className="flex items-start gap-2.5 p-3 bg-white border border-navy/10 rounded-xl text-xs text-navy/80">
                <Info className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>Calculations execute locally using IEEE 754 double-precision arithmetic to guarantee exact numerical consistency.</span>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-navy/10">
              <h2 className="text-xl sm:text-2xl font-black text-navy flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-steel" /> Frequently Asked Questions
              </h2>
              <span className="text-[11px] font-bold text-steel bg-sage/40 px-2.5 py-0.5 rounded-full">
                Verified Guidance
              </span>
            </div>
            
            <div className="space-y-3">
              {(calc.faqs && calc.faqs.length > 0 ? calc.faqs : intel.defaultFaqs).map((faq, idx) => (
                <div key={idx} className="bg-white border border-navy/15 rounded-2xl p-5 shadow-xs space-y-2 hover:border-steel/60 transition-colors">
                  <h3 className="font-bold text-sm sm:text-base text-navy flex items-start gap-2">
                    <span className="text-steel font-mono">Q{idx + 1}.</span> {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy/75 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Disclaimer
            type={
              calc.category === "finance"
                ? calc.slug.includes("tax")
                  ? "tax"
                  : "financial"
                : calc.category === "health"
                ? "health"
                : "general"
            }
          />
        </div>

        <aside className="md:col-span-4 space-y-6">
          <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-sm sticky top-20 space-y-4">
            <h3 className="font-bold text-sm text-navy flex items-center gap-2">
              <Layers className="w-4 h-4 text-steel" /> Related Tools in {calc.category.toUpperCase()}
            </h3>
            <div className="space-y-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/calculators/${item.slug}`}
                  className="block p-3 rounded-xl bg-sage/30 hover:bg-cream border border-navy/10 transition-colors group"
                >
                  <div className="font-bold text-xs sm:text-sm text-navy group-hover:text-steel flex items-center justify-between">
                    <span>{item.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-navy/40 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[11px] text-navy/60 line-clamp-1 mt-0.5">{item.description}</p>
                </Link>
              ))}
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
              <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Master Guide Available
              </span>
              <p className="text-xs font-bold text-navy">
                Looking for market trading fees and tax breakdowns?
              </p>
              <Link
                href="/guides/intraday-profit-and-loss-calculator-guide"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline block"
              >
                Read Intraday P&amp;L Architecture Guide &rarr;
              </Link>
            </div>

            <div className="pt-2 border-t border-navy/10 text-center">
              <Link
                href="/resources"
                className="text-xs font-bold text-steel hover:text-navy transition-colors inline-flex items-center gap-1"
              >
                Browse All Financial Cheat Sheets &rarr;
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
