import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CALCULATORS, CATEGORIES_META, CalculatorCategory, getCalculatorsByCategory } from "@/lib/registry";
import { FeaturedEMI } from "@/components/FeaturedEMI";
import {
  TrendingUp,
  Briefcase,
  Percent,
  HeartPulse,
  Clock,
  Scale,
  GraduationCap,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MyCalculators – 100+ Free Smart Online Calculators | Fast, Accurate, Private",
  description:
    "Free, deterministic, browser-based calculators for loans, income tax, GST, salary, freelance, e-commerce, mathematics, health, and unit conversions.",
  alternates: {
    canonical: "https://www.mycalculator.xyz",
  },
  openGraph: {
    title: "MyCalculators – 100+ Free Smart Online Calculators",
    description: "Fast, accurate, and private calculation tools for everyday finance, business, math, and conversions.",
    url: "https://www.mycalculator.xyz",
    siteName: "MyCalculators",
    locale: "en_IN",
    type: "website",
  },
};

const CATEGORY_ICONS: Record<CalculatorCategory, React.ReactNode> = {
  finance: <TrendingUp className="w-5 h-5 text-steel" />,
  business: <Briefcase className="w-5 h-5 text-steel" />,
  math: <Percent className="w-5 h-5 text-steel" />,
  health: <HeartPulse className="w-5 h-5 text-steel" />,
  "time-date": <Clock className="w-5 h-5 text-steel" />,
  converters: <Scale className="w-5 h-5 text-steel" />,
  education: <GraduationCap className="w-5 h-5 text-steel" />,
  other: <Calculator className="w-5 h-5 text-steel" />,
};

// Curated high-intent popular calculators across all categories
const POPULAR_SLUGS = [
  "emi-calculator",
  "payment-gateway-fee-calculator",
  "upwork-net-earnings-calculator",
  "fiverr-net-earnings-calculator",
  "ecommerce-roas-break-even-calculator",
  "home-loan-emi-calculator",
  "sip-calculator",
  "gst-calculator",
  "income-tax-calculator",
  "salary-calculator",
  "percentage-calculator",
  "discount-calculator",
  "bmi-calculator",
  "age-calculator",
  "unit-converter",
  "cgpa-to-percentage",
];

export default function HomePage() {
  const popularCalculators = POPULAR_SLUGS.map((slug) =>
    CALCULATORS.find((c) => c.slug === slug)
  ).filter((c): c is (typeof CALCULATORS)[0] => c !== undefined);

  const categories = Object.keys(CATEGORIES_META) as CalculatorCategory[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MyCalculators",
    url: "https://www.mycalculator.xyz",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.mycalculator.xyz/calculators?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="space-y-16 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-sage/40 border-b border-navy/10 pt-10 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-steel bg-white px-3 py-1 rounded-full border border-navy/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#e89d67]" /> 100+ Free Deterministic Tools
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight max-w-3xl mx-auto leading-tight">
            Smart Calculators for Everyday Life
          </h1>
          <p className="text-navy/75 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Fast, client-side calculation engines for loans, Indian tax regimes, freelancer earnings, e-commerce margins, unit conversions, and health metrics.
          </p>

          {/* Quick-Jump Tool Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold">
            <Link
              href="/calculators/payment-gateway-fee-calculator"
              className="bg-white hover:bg-navy hover:text-cream text-navy px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              💳 Payment Gateway Fee
            </Link>
            <Link
              href="/calculators/upwork-net-earnings-calculator"
              className="bg-white hover:bg-navy hover:text-cream text-navy px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              💼 Upwork Net & TDS
            </Link>
            <Link
              href="/calculators/fiverr-net-earnings-calculator"
              className="bg-white hover:bg-navy hover:text-cream text-navy px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              🎯 Fiverr Earnings
            </Link>
            <Link
              href="/calculators/ecommerce-roas-break-even-calculator"
              className="bg-white hover:bg-navy hover:text-cream text-navy px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              📊 E-Commerce ROAS
            </Link>
            <Link
              href="/calculators/gst-calculator"
              className="bg-white hover:bg-navy hover:text-cream text-navy px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              🧾 GST Calculator
            </Link>
            <Link
              href="/calculators/income-tax-calculator"
              className="bg-white hover:bg-navy hover:text-cream text-navy px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              🏛️ Income Tax (AY 26-27)
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Featured Tool (EMI Live Card) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <FeaturedEMI />
      </section>

      {/* Popular Calculators Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              Popular Calculators
            </h2>
            <p className="text-xs sm:text-sm text-navy/60">
              Most frequently used calculation tools by individuals, freelancers, and businesses
            </p>
          </div>
          <Link
            href="/calculators"
            className="text-xs sm:text-sm font-bold text-steel hover:text-navy transition-colors inline-flex items-center gap-1"
          >
            View All ({CALCULATORS.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCalculators.map((calc) => (
            <div
              key={calc.id}
              className="bg-white rounded-2xl p-5 border border-navy/15 shadow-xs hover:border-steel/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-steel bg-sage/30 px-2 py-0.5 rounded-md">
                    {calc.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#e89d67] bg-[#e89d67]/10 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                </div>
                <h3 className="font-bold text-base text-navy group-hover:text-steel transition-colors leading-snug">
                  {calc.name}
                </h3>
                <p className="text-xs text-navy/65 line-clamp-2 leading-relaxed">
                  {calc.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-navy/10">
                <Link
                  href={`/calculators/${calc.slug}`}
                  className="w-full bg-steel/10 hover:bg-navy hover:text-cream text-navy text-xs font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 group-hover:bg-navy group-hover:text-cream"
                >
                  Open Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse By Category Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
            Browse By Category
          </h2>
          <p className="text-xs sm:text-sm text-navy/60">
            Explore organized calculation suites across finance, business, math, conversions, and academia
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const meta = CATEGORIES_META[cat];
            const count = getCalculatorsByCategory(cat).length;
            return (
              <Link
                key={cat}
                href={`/calculators/${cat}`}
                className="bg-white rounded-2xl p-5 border border-navy/15 shadow-xs hover:border-steel hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sage/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {CATEGORY_ICONS[cat]}
                  </div>
                  <h3 className="font-bold text-base text-navy group-hover:text-steel transition-colors">
                    {meta.name}
                  </h3>
                  <p className="text-xs text-navy/65 line-clamp-2 leading-relaxed">
                    {meta.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-navy/10 flex items-center justify-between text-xs font-bold text-navy/70 group-hover:text-navy">
                  <span>{count} Calculators</span>
                  <ArrowRight className="w-4 h-4 text-navy/40 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Category Deep-Dive Lists */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Business & Freelance Suite */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-navy/10 pb-3">
            <div>
              <h3 className="text-xl font-black text-navy flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-steel" /> Business & Freelance Suites
              </h3>
              <p className="text-xs text-navy/60">Payment gateway fees, marketplace net earnings, and e-commerce models</p>
            </div>
            <Link href="/calculators/business" className="text-xs font-bold text-steel hover:underline">
              View All Business ({getCalculatorsByCategory("business").length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {getCalculatorsByCategory("business").slice(0, 6).map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="p-3.5 bg-white border border-navy/10 hover:border-steel rounded-xl shadow-2xs transition-all group"
              >
                <span className="font-bold text-xs sm:text-sm text-navy group-hover:text-steel block">
                  {calc.name}
                </span>
                <span className="text-[11px] text-navy/60 line-clamp-1 mt-0.5">{calc.description}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Finance & Loans Suite */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-navy/10 pb-3">
            <div>
              <h3 className="text-xl font-black text-navy flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-steel" /> Finance, Loans & Tax Calculators
              </h3>
              <p className="text-xs text-navy/60">Reducing balance loans, Indian tax slabs, mutual fund SIPs, and salary models</p>
            </div>
            <Link href="/calculators/finance" className="text-xs font-bold text-steel hover:underline">
              View All Finance ({getCalculatorsByCategory("finance").length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {getCalculatorsByCategory("finance").slice(0, 6).map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="p-3.5 bg-white border border-navy/10 hover:border-steel rounded-xl shadow-2xs transition-all group"
              >
                <span className="font-bold text-xs sm:text-sm text-navy group-hover:text-steel block">
                  {calc.name}
                </span>
                <span className="text-[11px] text-navy/60 line-clamp-1 mt-0.5">{calc.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Architecture Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-navy text-cream rounded-3xl p-6 sm:p-10 border border-navy/20 shadow-lg space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#e89d67]">
              Engineered For Performance & Privacy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Deterministic Calculations Without Data Tracking
            </h2>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed">
              Unlike traditional bloated calculation portals, every tool on MyCalculators runs locally on your browser. Your loan balances, payroll CTC, and financial numbers are never transmitted or stored on remote databases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-cream/15">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#e89d67] shrink-0" />
              <div className="text-xs">
                <strong className="text-white block">Zero Server Latency</strong>
                <span className="text-cream/60">Instant real-time output</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#e89d67] shrink-0" />
              <div className="text-xs">
                <strong className="text-white block">100% Client-Side</strong>
                <span className="text-cream/60">No financial data stored</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#e89d67] shrink-0" />
              <div className="text-xs">
                <strong className="text-white block">Statutory Precision</strong>
                <span className="text-cream/60">AY 2026-27 tax slab compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
