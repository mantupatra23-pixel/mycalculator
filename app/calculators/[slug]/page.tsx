import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALCULATORS, getRelatedCalculators } from "@/lib/registry";

import { SalaryCalculatorRenderer } from "@/components/calculators/SalaryCalculatorRenderer";
import { TaxCalculatorRenderer } from "@/components/calculators/TaxCalculatorRenderer";
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

import { CheckCircle2, HelpCircle, BookOpen, Layers, ArrowRight, Code2, Calculator, Calendar } from "lucide-react";

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
      canonical: `https://mycalculator.xyz/calculators/${calc.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://mycalculator.xyz/calculators/${calc.slug}`,
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
        url: `https://mycalculator.xyz/calculators/${calc.slug}`,
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
            item: "https://mycalculator.xyz",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: calc.category.toUpperCase(),
            item: `https://mycalculator.xyz/calculators/${calc.category}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: calc.name,
            item: `https://mycalculator.xyz/calculators/${calc.slug}`,
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
    if (calc.slug === "salary-calculator") {
      return <SalaryCalculatorRenderer slug={calc.slug} name={calc.name} />;
    }
    if (calc.slug === "income-tax-calculator") {
      return <TaxCalculatorRenderer slug={calc.slug} name={calc.name} />;
    }

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
          {/* How to Use Section */}
          <section className="bg-sage/20 border border-navy/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-steel" /> How to Use the {calc.name}
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-navy/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>Input your parameters in the fields or drag the interactive sliders.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>The algorithm updates the primary metric and schedules in real-time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>Click &ldquo;Copy Result&rdquo; to copy structured values to your clipboard.</span>
              </li>
            </ul>
          </section>

          {/* Mathematical Formula Section */}
          {calc.formulaDescription && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <Code2 className="w-4 h-4 text-steel" /> Calculation Formula
              </h2>
              <div className="p-3.5 bg-sage/30 rounded-xl font-mono text-xs sm:text-sm font-bold text-navy break-all border border-navy/10">
                {calc.formulaDescription}
              </div>
              {calc.formulaVariables && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-navy/70 uppercase">Where:</span>
                  <ul className="mt-1 space-y-1 text-xs text-navy/80">
                    {calc.formulaVariables.map((v, i) => (
                      <li key={i} className="flex gap-2">
                        <strong className="font-mono text-steel">{v.symbol}:</strong> {v.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Worked Practical Example */}
          {calc.workedExample && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <Calculator className="w-4 h-4 text-steel" /> Example Calculation
              </h2>
              <p className="text-xs font-semibold text-steel">{calc.workedExample.scenario}</p>
              <div className="bg-sage/20 border border-navy/10 rounded-xl p-3.5 text-xs text-navy/85 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(calc.workedExample.inputs).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-navy/60">{k}:</span> <strong className="text-navy">{v}</strong>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-navy/10 font-bold text-navy">
                  Outcome: <span className="text-steel">{calc.workedExample.result}</span>
                </div>
              </div>
              <p className="text-xs text-navy/70 leading-relaxed">{calc.workedExample.explanation}</p>
            </section>
          )}

          {/* Important Assumptions Section */}
          {calc.assumptions && calc.assumptions.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy">Important Assumptions</h2>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-navy/80 space-y-1 leading-relaxed">
                {calc.assumptions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Frequently Asked Questions */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sand" /> Frequently Asked Questions
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
                <div className="bg-white border border-navy/15 rounded-xl p-4 shadow-xs">
                  <h3 className="font-bold text-sm text-navy mb-1">Are these calculations free and private?</h3>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    Yes. All calculations are 100% free and run entirely inside your web browser without sending financial or biometric inputs to remote servers.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Unified Category Disclaimer */}
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
          <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-sm sticky top-20">
            <h3 className="font-bold text-sm text-navy mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-steel" /> Related Calculators
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

            <div className="mt-6 pt-4 border-t border-navy/10 text-center">
              <Link
                href="/resources"
                className="text-xs font-bold text-steel hover:text-navy transition-colors inline-flex items-center gap-1"
              >
                Browse Financial Cheat Sheets & Guides <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
