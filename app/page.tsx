import React from "react";
import Link from "next/link";
import { SearchSection } from "@/components/SearchSection";
import { FeaturedEMI } from "@/components/FeaturedEMI";
import { CALCULATORS, CATEGORIES } from "@/lib/registry";
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Calculator,
  TrendingUp,
  Percent,
  Clock,
  HeartPulse,
  Scale,
  GraduationCap
} from "lucide-react";

export default function HomePage() {
  const popularCalculators = CALCULATORS.filter((c) => c.popular);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "finance": return <TrendingUp className="w-5 h-5" />;
      case "math": return <Percent className="w-5 h-5" />;
      case "health": return <HeartPulse className="w-5 h-5" />;
      case "time-date": return <Clock className="w-5 h-5" />;
      case "converters": return <Scale className="w-5 h-5" />;
      case "education": return <GraduationCap className="w-5 h-5" />;
      default: return <Calculator className="w-5 h-5" />;
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="bg-sage rounded-3xl p-6 sm:p-12 border border-navy/15 text-center shadow-sm">
        <div className="inline-flex items-center gap-2 bg-sand/40 text-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-navy" /> 100% Free & Client-Side Fast
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-navy mb-4 tracking-tight leading-tight">
          Free Online Calculators for Everyday Life
        </h1>
        
        <p className="text-navy/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Calculate loans, GST, SIP returns, percentages, salary, age, interest, conversions and more with fast, accurate and easy-to-use calculators.
        </p>

        {/* Instant Search Bar */}
        <SearchSection />

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold text-navy/70">
          <span>Popular Searches:</span>
          {["EMI", "GST", "SIP", "Percentage", "Age", "Salary", "BMI"].map((tag) => (
            <Link
              key={tag}
              href={`/calculators?q=${tag.toLowerCase()}`}
              className="bg-cream/80 hover:bg-cream px-2.5 py-1 rounded-md border border-navy/10 text-navy transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Calculator Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-black text-navy">Interactive Calculator</h2>
          <p className="text-sm text-navy/70">Plan your finances instantly with live recalculation.</p>
        </div>
        <FeaturedEMI />
      </section>

      {/* Popular Calculators Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-navy flex items-center gap-2">
              <Zap className="w-6 h-6 text-sand fill-sand" /> Popular Calculators
            </h2>
            <p className="text-sm text-navy/70">Most frequently used tools by individuals & businesses.</p>
          </div>
          <Link
            href="/calculators"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-steel hover:text-navy transition-colors"
          >
            View All 100+ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCalculators.map((calc) => (
            <div
              key={calc.id}
              className="bg-cream border border-navy/15 rounded-2xl p-5 hover:border-steel hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-navy mb-3">
                  <Calculator className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-extrabold text-lg text-navy mb-1">{calc.name}</h3>
                <p className="text-xs sm:text-sm text-navy/70 mb-5 leading-relaxed">{calc.description}</p>
              </div>

              <Link
                href={`/calculators/${calc.slug}`}
                className="w-full bg-steel hover:bg-steel/90 text-cream font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
              >
                Open Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex sm:hidden justify-center">
          <Link
            href="/calculators"
            className="w-full text-center bg-sand text-navy font-bold py-3 px-4 rounded-xl text-sm"
          >
            Explore All Calculators
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-black text-navy flex items-center gap-2">
            <Layers className="w-6 h-6 text-steel" /> Browse By Category
          </h2>
          <p className="text-sm text-navy/70">Explore organized calculators across multiple disciplines.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const count = CALCULATORS.filter((c) => c.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/calculators/${cat.id}`}
                className="bg-cream border border-navy/15 rounded-2xl p-5 hover:border-sand hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-sage group-hover:bg-sand/30 rounded-xl flex items-center justify-center text-navy mb-3 transition-colors">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <h3 className="font-bold text-base text-navy mb-1 group-hover:text-steel transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-navy/60 mb-4">{cat.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-navy/75 pt-3 border-t border-navy/10">
                  <span>{count} Calculators</span>
                  <ArrowRight className="w-4 h-4 text-navy/40 group-hover:translate-x-1 group-hover:text-steel transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust & Methodology Section */}
      <section className="bg-sage/70 rounded-3xl p-6 sm:p-10 border border-navy/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-navy">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-6 h-6 text-sand shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base mb-1">Instant & Browser-Native</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Calculations execute locally on your device with zero server latency or loading delays.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-sand shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base mb-1">100% Private & Secure</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                No accounts, no logins, and zero remote financial data storage. Your numbers stay on your screen.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <TrendingUp className="w-6 h-6 text-sand shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base mb-1">India & Global Standards</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Built-in support for INR (₹ Lakhs & Crores), standard GST slabs, and global conversion units.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
