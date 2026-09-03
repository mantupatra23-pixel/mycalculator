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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Calculators - EMI, GST, SIP, Trading, Finance & Math | MyCalculators",
  description:
    "Use 150+ free online calculators for EMI, GST, SIP returns, trading P&L, options payoffs, position sizing, in-hand salary, payment gateway fees, freelance earnings, ROAS, and unit conversions. Fast, private and mobile-friendly.",
  alternates: {
    canonical: "https://www.mycalculator.xyz",
  },
  openGraph: {
    title: "Free Online Calculators for Everyday Life | MyCalculators",
    description: "150+ browser-native calculators for finance, trading, math, business, and health.",
    url: "https://www.mycalculator.xyz",
    siteName: "MyCalculators",
    locale: "en_IN",
    type: "website",
  },
};

const CATEGORY_ICONS: Record<CalculatorCategory, React.ReactNode> = {
  finance: <TrendingUp className="w-5 h-5" />,
  business: <Briefcase className="w-5 h-5" />,
  math: <Percent className="w-5 h-5" />,
  health: <HeartPulse className="w-5 h-5" />,
  "time-date": <Clock className="w-5 h-5" />,
  converters: <Scale className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  other: <Calculator className="w-5 h-5" />,
};

export default function HomePage() {
  const popularCalculators = CALCULATORS.filter((c) => c.popular);
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
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/50 text-steel font-bold text-xs uppercase tracking-wider border border-navy/10">
          <Zap className="w-3.5 h-3.5" /> 150+ Free Online Calculators
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight">
          Smart Calculators for Everyday Life
        </h1>
        <p className="text-sm sm:text-base text-navy/75 leading-relaxed max-w-2xl mx-auto">
          Calculate loans, GST, SIP returns, trading P&amp;L, option payoffs, in-hand salary, payment gateway fees, freelance earnings, ROAS, percentages, age, health metrics, and unit conversions with zero latency and complete privacy.
        </p>

        {/* Quick Jump Pills with Trading Suite Highlight */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold">
          <Link
            href="/trading"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy text-[#00f59b] border border-[#00f59b]/40 text-xs font-black hover:bg-[#00f59b] hover:text-black transition-all shadow-xs shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse"></span>
            Trading Suite (42)
          </Link>
          {popularCalculators.slice(0, 6).map((calc) => (
            <Link
              key={calc.id}
              href={`/calculators/${calc.slug}`}
              className="bg-white hover:bg-steel hover:text-white text-navy px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              {calc.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured EMI Engine */}
      <section className="max-w-4xl mx-auto">
        <FeaturedEMI />
      </section>

      {/* Trading Tools High-Visibility Section */}
      <section className="bg-white border border-navy/15 rounded-3xl p-6 sm:p-7 shadow-xs my-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sage/40 border border-navy/10 text-navy text-[11px] font-bold">
              ✦ Real-Time Market Tools
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-navy">
              Trading &amp; Stock Market Calculators
            </h2>
            <p className="text-xs sm:text-sm text-navy/70">
              Calculate intraday P&amp;L, strict position sizes, options strategies, and statutory Indian brokerage taxes (STT, GST, SEBI).
            </p>
          </div>
          <Link
            href="/trading"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-navy hover:bg-navy/90 text-white text-xs font-bold transition-colors shrink-0"
          >
            Explore All 42 Trading Tools →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/trading/intraday-pnl-calculator"
            className="block p-4 rounded-2xl bg-sage/20 hover:bg-cream border border-navy/10 transition-colors group"
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-steel uppercase mb-1">
              <span>P&amp;L Engine</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <h3 className="text-sm font-bold text-navy group-hover:text-steel transition-colors">
              Intraday P&amp;L Calculator
            </h3>
            <p className="text-[11px] text-navy/60 mt-1 line-clamp-2">
              Point movements, gross profit/loss, and trade return percentage.
            </p>
          </Link>

          <Link
            href="/trading/position-size-calculator"
            className="block p-4 rounded-2xl bg-sage/20 hover:bg-cream border border-navy/10 transition-colors group"
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-steel uppercase mb-1">
              <span>Risk Management</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <h3 className="text-sm font-bold text-navy group-hover:text-steel transition-colors">
              Position Size Calculator
            </h3>
            <p className="text-[11px] text-navy/60 mt-1 line-clamp-2">
              Cap trade risk strictly at 1% to 2% to protect capital drawdown.
            </p>
          </Link>

          <Link
            href="/trading/brokerage-charges-calculator"
            className="block p-4 rounded-2xl bg-sage/20 hover:bg-cream border border-navy/10 transition-colors group"
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-steel uppercase mb-1">
              <span>Charges &amp; Taxes</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <h3 className="text-sm font-bold text-navy group-hover:text-steel transition-colors">
              Brokerage &amp; Taxes Calculator
            </h3>
            <p className="text-[11px] text-navy/60 mt-1 line-clamp-2">
              STT, Stamp Duty, SEBI turnover fees, and 18% GST friction.
            </p>
          </Link>
        </div>
      </section>

      {/* Popular Calculators Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-navy/10">
          <div>
            <h2 className="text-2xl font-black text-navy">Popular Calculators</h2>
            <p className="text-xs sm:text-sm text-navy/70">Most frequently used tools by individuals and businesses</p>
          </div>
          <Link
            href="/calculators"
            className="text-xs font-bold text-steel hover:text-navy flex items-center gap-1"
          >
            View All (150+) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCalculators.map((calc) => (
            <div
              key={calc.id}
              className="bg-white border-2 border-navy/15 rounded-2xl p-5 hover:border-steel hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-steel bg-sage/50 px-2 py-0.5 rounded">
                    {calc.category}
                  </span>
                  <span className="text-[10px] font-bold text-navy bg-sand px-2.5 py-0.5 rounded-full shadow-xs">
                    Popular
                  </span>
                </div>
                <h3 className="font-black text-base sm:text-lg text-navy group-hover:text-steel transition-colors mb-1.5 leading-snug">
                  {calc.name}
                </h3>
                <p className="text-xs text-navy/70 line-clamp-2 leading-relaxed mb-5">
                  {calc.description}
                </p>
              </div>

              <Link
                href={`/calculators/${calc.slug}`}
                className="w-full bg-steel hover:bg-steel/90 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors shadow-sm"
              >
                Open Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Browse By Category */}
      <section className="space-y-6 pt-2">
        <div className="pb-2 border-b border-navy/10">
          <h2 className="text-2xl font-black text-navy">Browse By Category</h2>
          <p className="text-xs sm:text-sm text-navy/70">Explore organized calculation tools across disciplines</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((catKey) => {
            const cat = CATEGORIES_META[catKey];
            const count = getCalculatorsByCategory(catKey).length;

            return (
              <Link
                key={catKey}
                href={`/calculators/${catKey}`}
                className="bg-white border-2 border-navy/15 rounded-2xl p-5 hover:border-steel hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sage/40 flex items-center justify-center text-steel mb-3 group-hover:bg-steel group-hover:text-white transition-colors shadow-xs">
                    {CATEGORY_ICONS[catKey]}
                  </div>
                  <h3 className="font-extrabold text-base text-navy mb-1">{cat.name}</h3>
                  <p className="text-xs text-navy/60 line-clamp-2 mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-steel pt-3 border-t border-navy/10">
                  <span>{count} Calculators</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Dynamic Category Deep Dive Sections */}
      <section className="space-y-10">
        {/* Business & Freelance */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-navy/10 pb-3">
            <div>
              <h3 className="text-xl font-black text-navy flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-steel" /> Business & Freelance Tools
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

        {/* Finance & Loans */}
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

      {/* Trust & Architecture Badges */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-navy/10">
        <div className="flex items-center gap-3 bg-sage/20 border border-navy/10 rounded-2xl p-4">
          <Zap className="w-5 h-5 text-steel shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-navy block">Instant & Browser-Native</span>
            <span className="text-navy/70">Calculations run locally with zero server latency.</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-sage/20 border border-navy/10 rounded-2xl p-4">
          <Lock className="w-5 h-5 text-steel shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-navy block">100% Private & Secure</span>
            <span className="text-navy/70">No financial inputs or health data are stored remotely.</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-sage/20 border border-navy/10 rounded-2xl p-4">
          <ShieldCheck className="w-5 h-5 text-steel shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-navy block">Verified Standards</span>
            <span className="text-navy/70">Indian currency notation (Lakhs/Crores) and GST slabs.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
