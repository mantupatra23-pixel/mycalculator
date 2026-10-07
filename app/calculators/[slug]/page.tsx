import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALCULATORS, getRelatedCalculators } from "@/lib/registry";

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
  Calculator,
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

export default function CalculatorDetailPage({ params }: Props) {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) notFound();

  const related = getRelatedCalculators(calc, 4);

  const isLoanOrFinance =
    calc.category === "finance" ||
    calc.slug.includes("emi") ||
    calc.slug.includes("loan") ||
    calc.slug.includes("interest") ||
    calc.slug.includes("sip");

  const isBusinessOrFreelance =
    calc.category === "business" ||
    calc.slug.includes("roas") ||
    calc.slug.includes("earnings") ||
    calc.slug.includes("gateway") ||
    calc.slug.includes("commission") ||
    calc.slug.includes("margin");

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
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 1. Input Primary Parameters
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
                  Export structured summaries to your clipboard for record keeping, tax documentation, client proposals, or travel budgeting.
                </p>
              </div>
            </div>
          </section>

          {calc.formulaDescription && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
                <Code2 className="w-4 h-4 text-steel" /> Mathematical Derivation &amp; Formula Engine
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
                <Calculator className="w-4 h-4 text-steel" /> Worked Practical Example &amp; Case Study
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
                        <th className="p-2.5 border-b border-navy/15">Parameter Variance</th>
                        <th className="p-2.5 border-b border-navy/15">Direct Impact</th>
                        <th className="p-2.5 border-b border-navy/15">Risk / Outlay Shift</th>
                        <th className="p-2.5 border-b border-navy/15">Optimization Strategy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/10 text-navy/80">
                      {isLoanOrFinance ? (
                        <>
                          <tr>
                            <td className="p-2.5 font-semibold">Short Tenure (5-10 Yrs)</td>
                            <td className="p-2.5 font-mono">Higher Monthly Installment</td>
                            <td className="p-2.5 font-mono text-emerald-700 font-bold">Lowest Lifetime Interest</td>
                            <td className="p-2.5">Saves up to 40% in compounding interest</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Standard Tenure (15 Yrs)</td>
                            <td className="p-2.5 font-mono">Balanced Monthly Cash Flow</td>
                            <td className="p-2.5 font-mono text-steel">Moderate Total Interest</td>
                            <td className="p-2.5">Optimal balance between liquidity and cost</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Extended Tenure (20-30 Yrs)</td>
                            <td className="p-2.5 font-mono">Lowest Monthly Outflow</td>
                            <td className="p-2.5 font-mono text-amber-700 font-bold">Interest Exceeds Principal</td>
                            <td className="p-2.5">Requires annual prepayments to avoid debt trap</td>
                          </tr>
                        </>
                      ) : isBusinessOrFreelance ? (
                        <>
                          <tr>
                            <td className="p-2.5 font-semibold">Low Volume / Sub-Scale</td>
                            <td className="p-2.5 font-mono">Higher Fixed % Fee Burden</td>
                            <td className="p-2.5 font-mono text-amber-700 font-bold">Margin Erosion</td>
                            <td className="p-2.5">Bundle pricing to absorb gateway minimums</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Optimal Scale Level</td>
                            <td className="p-2.5 font-mono">Volume Discount Slabs</td>
                            <td className="p-2.5 font-mono text-emerald-700 font-bold">Predictable Net Margin</td>
                            <td className="p-2.5">Lock in enterprise gateway merchant rates</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">High Refund / RTO Rate</td>
                            <td className="p-2.5 font-mono">2x Reverse Logistics Loss</td>
                            <td className="p-2.5 font-mono text-red-700 font-bold">Severe Capital Drag</td>
                            <td className="p-2.5">Mandate OTP verification or pre-paid incentives</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className="p-2.5 font-semibold">Tight Budget (0% Buffer)</td>
                            <td className="p-2.5 font-mono">Zero Slack for Surge Fees</td>
                            <td className="p-2.5 font-mono text-red-700 font-bold">High Overrun Risk</td>
                            <td className="p-2.5">Mandate a baseline 5% contingency buffer</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Standard Buffer (5% - 10%)</td>
                            <td className="p-2.5 font-mono">Absorbs Incidental Outlays</td>
                            <td className="p-2.5 font-mono text-emerald-700 font-bold">Safe Realized Budget</td>
                            <td className="p-2.5">Optimal allocation across travel, fuel, or materials</td>
                          </tr>
                          <tr>
                            <td className="p-2.5 font-semibold">Conservative (15%+ Buffer)</td>
                            <td className="p-2.5 font-mono">Over-Allocated Capital</td>
                            <td className="p-2.5 font-mono text-steel">Zero Financial Stress</td>
                            <td className="p-2.5">Ideal for international travel or remote logistics</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-steel" /> Strategic Optimization &amp; Practical Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {isLoanOrFinance ? (
                <>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Reducing Balance vs. Flat Rate</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Confirm your lender computes interest on a Reducing Balance method. A quoted 6% flat rate mathematically equals 11% to 12% on a reducing balance schedule.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Tax Benefits (Section 24b &amp; 80C)</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Home loan borrowers can claim up to ₹2 Lakhs yearly on interest payments (Section 24b) and up to ₹1.5 Lakhs on principal repayments (Section 80C) in India.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Prepayment Amortization Impact</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Paying just 1 extra EMI every financial year directly toward loan principal can shorten a 20-year loan tenure by 3 to 4 years, saving multiple lakhs in interest.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">EBLR &amp; Repo Rate Linkage</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Floating-rate retail loans in India link to the RBI repo rate. When benchmark rates shift, banks adjust loan tenure rather than monthly installments by default.
                    </p>
                  </div>
                </>
              ) : isBusinessOrFreelance ? (
                <>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Payment Gateway Blended Cost</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Merchant aggregators charge 2% + 18% GST on domestic transactions and up to 3% to 4% on international cards. Factor in service GST to safeguard net margins.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Section 194-O &amp; Marketplace TDS</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      E-commerce operators in India deduct 1% TDS under Section 194-O before remitting net sales balances. Always reconcile gross sales against Form 26AS.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Return &amp; RTO Cost Absorption</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Return to Origin (RTO) incurs both forward and reverse shipping overhead without revenue realization. Maintain at least a 15% product margin buffer.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">ROAS Breakeven Threshold</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Breakeven Return on Ad Spend equals 1 divided by Gross Profit Margin. If your gross margin is 40%, your minimum marketing ROAS must exceed 2.5x to avoid net losses.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Hidden Outlay Provisioning</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Real-world expenses routinely diverge from nominal quotes due to local service taxes, airport transfer surges, baggage surcharges, and municipal fees.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Contingency Buffer Sizing</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Financial planners recommend adding a minimum 5% to 10% contingency allocation to absorb unplanned incidentals and protect emergency capital reserves.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Dynamic Surge &amp; Seasonal Volatility</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      Dynamic pricing algorithms in hospitality, transit, and material procurement cause pricing spikes during peak demand cycles. Lock bookings early.
                    </p>
                  </div>
                  <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                    <h3 className="font-bold text-navy text-xs">Deterministic vs. Stochastic Estimates</h3>
                    <p className="text-[11px] text-navy/70 leading-relaxed">
                      While our calculator yields exact deterministic baselines, actual financial execution involves real-time market fluctuations and transaction fee variances.
                    </p>
                  </div>
                </>
              )}
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
              To deliver deterministic calculations with zero server-side latency, the <strong>{calc.name}</strong> operates on the following mathematical and operational constraints:
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
                <>
                  <div className="flex items-start gap-2.5 p-3 bg-white border border-navy/10 rounded-xl text-xs text-navy/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Calculations are executed client-side using IEEE 754 double-precision arithmetic to guarantee exact numerical consistency.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 bg-white border border-navy/10 rounded-xl text-xs text-navy/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Statutory rates, deductions, and rounding conventions adhere to standardized Indian banking and commercial regulations.</span>
                  </div>
                </>
              )}
              <div className="flex items-start gap-2.5 p-3 bg-white border border-navy/10 rounded-xl text-xs text-navy/80">
                <Info className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>Final values round to two decimal places (or nearest whole rupee) consistent with Indian currency and contract note formatting conventions.</span>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-navy/10">
              <h2 className="text-xl sm:text-2xl font-black text-navy flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-steel" /> Frequently Asked Questions
              </h2>
              <span className="text-[11px] font-bold text-steel bg-sage/40 px-2.5 py-0.5 rounded-full">
                Authoritative Guidance
              </span>
            </div>
            
            <div className="space-y-3">
              {calc.faqs && calc.faqs.length > 0 ? (
                calc.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-navy/15 rounded-2xl p-5 shadow-xs space-y-2 hover:border-steel/60 transition-colors">
                    <h3 className="font-bold text-sm sm:text-base text-navy flex items-start gap-2">
                      <span className="text-steel font-mono">Q{idx + 1}.</span> {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy/75 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-sm text-navy">How accurate are the results calculated by this tool?</h3>
                    <p className="text-xs text-navy/75 leading-relaxed">
                      All calculations execute client-side using verified banking, tax, and commercial formulas matching statutory standards. Results closely match official loan amortization schedules, contract notes, and billing ledgers.
                    </p>
                  </div>
                  <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-xs space-y-2">
                    <h3 className="font-bold text-sm text-navy">Are my personal or financial inputs stored online?</h3>
                    <p className="text-xs text-navy/75 leading-relaxed">
                      No. Calculations execute entirely within your local browser environment. No salary data, loan amounts, travel itineraries, or financial inputs are uploaded to or stored on remote servers.
                    </p>
                  </div>
                </>
              )}
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
