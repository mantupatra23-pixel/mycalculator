import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALCULATORS } from "@/lib/registry";

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

import { CheckCircle2, HelpCircle, BookOpen, Layers, ArrowRight } from "lucide-react";

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
  if (!calc) return { title: "Calculator Not Found - MyCalculators" };

  return {
    title: `${calc.name} - Free Online Tool | MyCalculators`,
    description: `${calc.description} Fast, browser-native calculation with verified formulas and real-time breakdowns.`,
    alternates: {
      canonical: `https://mycalculators.xyz/calculators/${calc.slug}`,
    },
    openGraph: {
      title: `${calc.name} | MyCalculators`,
      description: calc.description,
      url: `https://mycalculators.xyz/calculators/${calc.slug}`,
      siteName: "MyCalculators",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function CalculatorDetailPage({ params }: Props) {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) notFound();

  const related = CALCULATORS.filter(
    (c) => c.category === calc.category && c.slug !== calc.slug
  ).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calc.name,
    operatingSystem: "All",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    description: calc.description,
  };

  // Complete Isolated Renderer Dispatch
  const renderCalculatorComponent = () => {
    if (calc.slug === "salary-calculator" || calc.slug === "in-hand-salary-calculator") {
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
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-14 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy">Home</Link>
        <span>/</span>
        <Link href={`/calculators/${calc.category}`} className="hover:text-navy uppercase tracking-wider">
          {calc.category}
        </Link>
        <span>/</span>
        <span className="text-navy">{calc.name}</span>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy mb-2 tracking-tight">
          {calc.name}
        </h1>
        <p className="text-sm sm:text-base text-navy/75 max-w-2xl leading-relaxed">
          {calc.description} Fast, browser-native calculation with zero latency and full privacy.
        </p>
      </div>

      {/* Isolated Interactive Calculator Component */}
      {renderCalculatorComponent()}

      {/* SEO & Educational Guidance Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        <div className="md:col-span-8 space-y-8">
          <section className="bg-sage/20 border border-navy/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-navy mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-steel" /> How to Use This Calculator
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-navy/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>Enter your parameters or adjust the interactive sliders above.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>The algorithm updates the primary metric and detailed schedules in real-time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
                <span>Click &ldquo;Copy Result&rdquo; to save formatted text results to your clipboard.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 text-navy">
            <h2 className="text-xl font-bold">Calculation Methodology</h2>
            <p className="text-xs sm:text-sm text-navy/80 leading-relaxed">
              Calculations are performed locally in your browser using standard mathematical formulas and statutory provisions without sending sensitive data to remote servers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sand" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <div className="bg-white border border-navy/15 rounded-xl p-4">
                <h3 className="font-bold text-sm text-navy mb-1">
                  Are these calculation results accurate?
                </h3>
                <p className="text-xs text-navy/70 leading-relaxed">
                  Yes, calculations are based on mathematical and statutory formulas. Actual financial, tax, or health outcomes may vary depending on individual policies and amendments.
                </p>
              </div>
              <div className="bg-white border border-navy/15 rounded-xl p-4">
                <h3 className="font-bold text-sm text-navy mb-1">
                  Does this tool work offline?
                </h3>
                <p className="text-xs text-navy/70 leading-relaxed">
                  Yes. Once loaded, all calculators operate locally inside your browser with zero latency.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Related Calculators */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-sm">
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
                    <ArrowRight className="w-3.5 h-3.5 text-navy/40 group-hover:translate-x-1" />
                  </div>
                  <p className="text-[11px] text-navy/60 line-clamp-1 mt-0.5">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
