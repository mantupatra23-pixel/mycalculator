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
  Percent,
  Table as TableIcon,
  Sparkles,
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

      {/* Semantic Breadcrumbs */}
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

      {/* Above The Fold Header & Embed Option */}
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

      {/* Primary Calculator Engine */}
      {renderCalculatorComponent()}

      {/* Content, Formula, Assumptions, & FAQ Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        <div className="md:col-span-8 space-y-8">
          
          {/* Section 1: Comprehensive How to Use & Methodology */}
          <section className="bg-sage/20 border border-navy/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-steel" /> How to Use &amp; Methodological Guide
            </h2>
            <p className="text-xs sm:text-sm text-navy/80 leading-relaxed">
              The <strong>{calc.name}</strong> operates on deterministic financial mathematical modeling designed to give you instant, zero-latency feedback directly in your browser. Whether evaluating long-term amortization, tax liabilities, or transactional margins, follow these calibration practices:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 1. Parameter Input
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  Enter baseline numerical values or adjust interactive sliders to reflect exact loan tenures, tax brackets, or principal quantities.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 2. Periodic Compounding
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  The underlying engine divides annual rates into exact monthly periodic rates ($R / (12 \times 100)$) to prevent flat-rate estimation errors.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 3. Schedule Inspection
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  Examine the annual repayment breakdown table below the result card to inspect the shifting ratio between principal and interest.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-navy/10 rounded-xl space-y-1">
                <span className="font-bold text-xs text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-steel" /> 4. Structured Export
                </span>
                <p className="text-[11px] text-navy/70 leading-relaxed">
                  Use the one-click copy tool to export formatted figures for accounting documentation, spreadsheets, or financial planning reports.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Mathematical Derivation & Variable Breakdown */}
          {calc.formulaDescription && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
                <Code2 className="w-5 h-5 text-steel" /> Mathematical Derivation &amp; Formula Engine
              </h2>
              <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                Standard banking and regulatory frameworks in India mandate standard reducing-balance compounding. The mathematical formula powering this engine is:
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
                        <strong className="font-mono text-steel bg-white px-2 py-0.5 rounded border border-navy/15">
                          {v.symbol}
                        </strong>
                        <span className="text-navy/80">{v.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-navy/70 leading-relaxed border-t border-navy/10 pt-3">
                <strong>Why the periodic rate matters:</strong> When banks quote an annual interest rate ($R$), the true monthly rate is derived as $r = R / (12 \times 100)$. The exponential term $(1+r)^n$ accounts for compound interest over $n$ months, ensuring that while the monthly payment stays fixed, the interest component decreases and principal repayment accelerates with each installment.
              </p>
            </section>
          )}

          {/* Section 3: Worked Practical Example & Tenure Sensitivity Table */}
          {calc.workedExample && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
                <Calculator className="w-5 h-5 text-steel" /> Worked Practical Example &amp; Case Study
              </h2>
              <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                To illustrate how amortization behaves in practical scenarios, examine the real-world setup below:
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

              {/* Dynamic Comparison / Sensitivity Matrix */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5 text-steel" /> Tenure Impact &amp; Interest Sensitivity Matrix
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-navy/15 rounded-xl overflow-hidden bg-white">
                    <thead className="bg-sage/30 text-navy font-bold">
                      <tr>
                        <th className="p-2.5 border-b border-navy/15">Selected Tenure</th>
                        <th className="p-2.5 border-b border-navy/15">Monthly Impact</th>
                        <th className="p-2.5 border-b border-navy/15">Total Interest Burden</th>
                        <th className="p-2.5 border-b border-navy/15">Financial Recommendation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/10 text-navy/80">
                      <tr>
                        <td className="p-2.5 font-semibold">Short Tenure (10 Years)</td>
                        <td className="p-2.5 font-mono">Higher Monthly EMI</td>
                        <td className="p-2.5 font-mono text-emerald-700 font-bold">Lowest Total Interest</td>
                        <td className="p-2.5">Saves up to 45% in interest payouts</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">Standard Tenure (15 Years)</td>
                        <td className="p-2.5 font-mono">Balanced Outflow</td>
                        <td className="p-2.5 font-mono text-steel">Moderate Total Interest</td>
                        <td className="p-2.5">Optimal cash flow to debt balance</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">Extended Tenure (20-30 Years)</td>
                        <td className="p-2.5 font-mono">Lowest Monthly EMI</td>
                        <td className="p-2.5 font-mono text-amber-700 font-bold">Exceeds Principal Amount</td>
                        <td className="p-2.5">High total cost; prepayments recommended</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Section 4: Strategic Optimization & Regulatory Insights */}
          <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-steel" /> Strategic Optimization &amp; Indian Financial Rules
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-navy/80 leading-relaxed">
              <p>
                When managing financial obligations like loans, taxes, or business transactions in India, mathematical calculations must account for the following statutory factors:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                  <h3 className="font-bold text-navy text-xs">Reducing Balance vs. Flat Rate</h3>
                  <p className="text-[11px] text-navy/70 leading-relaxed">
                    Always confirm your lender calculates interest on a Reducing Balance method. A seemingly low 6% flat interest rate is mathematically equivalent to nearly 11% to 12% on a reducing balance basis.
                  </p>
                </div>
                <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                  <h3 className="font-bold text-navy text-xs">Income Tax Deductions (Section 24b &amp; 80C)</h3>
                  <p className="text-[11px] text-navy/70 leading-relaxed">
                    Under the Indian Income Tax Act, home loan borrowers can claim up to ₹2 Lakhs per financial year on interest payments (Section 24b) and up to ₹1.5 Lakhs on principal repayments (Section 80C).
                  </p>
                </div>
                <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                  <h3 className="font-bold text-navy text-xs">The Power of 1 Extra EMI Prepayment</h3>
                  <p className="text-[11px] text-navy/70 leading-relaxed">
                    Paying just 1 additional EMI every financial year directly towards principal can reduce a 20-year loan tenure by more than 3 to 4 years, saving multiple lakhs in total interest outgo.
                  </p>
                </div>
                <div className="p-3.5 bg-sage/20 border border-navy/10 rounded-xl space-y-1">
                  <h3 className="font-bold text-navy text-xs">Floating Rate &amp; RBI Repo Rate Linkage</h3>
                  <p className="text-[11px] text-navy/70 leading-relaxed">
                    Most retail loans in India are linked to the RBI External Benchmark Lending Rate (EBLR). When repo rates change, banks generally adjust loan tenure automatically rather than revising monthly EMI amounts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Assumptions & Constraints */}
          {calc.assumptions && calc.assumptions.length > 0 && (
            <section className="bg-sage/10 border border-navy/10 rounded-2xl p-5 space-y-2">
              <h2 className="text-sm font-bold text-navy uppercase tracking-wider">Underlying Mathematical Assumptions</h2>
              <ul className="list-disc pl-5 text-xs text-navy/75 space-y-1 leading-relaxed">
                {calc.assumptions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Section 6: Frequently Asked Questions */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-steel" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {calc.faqs && calc.faqs.length > 0 ? (
                calc.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-navy/15 rounded-xl p-4 shadow-xs">
                    <h3 className="font-bold text-sm text-navy mb-1">{faq.q}</h3>
                    <p className="text-xs text-navy/75 leading-relaxed">{faq.a}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white border border-navy/15 rounded-xl p-4 shadow-xs">
                    <h3 className="font-bold text-sm text-navy mb-1">How accurate are these calculations?</h3>
                    <p className="text-xs text-navy/75 leading-relaxed">
                      All calculations use exact banking and financial formulas rounded according to standard currency conventions. Results closely reflect real banking statements and contract notes.
                    </p>
                  </div>
                  <div className="bg-white border border-navy/15 rounded-xl p-4 shadow-xs">
                    <h3 className="font-bold text-sm text-navy mb-1">Are my personal or financial inputs stored online?</h3>
                    <p className="text-xs text-navy/75 leading-relaxed">
                      No. The calculation runs entirely inside your client-side browser runtime. No financial figures, salaries, or debt values are stored remotely.
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Section 7: Unified Category Disclaimer */}
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

        {/* Sidebar: Contextual Related Calculators */}
        <aside className="md:col-span-4 space-y-6">
          <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-sm sticky top-20 space-y-4">
            <h3 className="font-bold text-sm text-navy flex items-center gap-2">
              <Layers className="w-4 h-4 text-steel" /> Related Financial Tools
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
