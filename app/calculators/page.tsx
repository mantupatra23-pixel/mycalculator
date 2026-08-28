import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CALCULATORS, CATEGORIES_META, CalculatorCategory } from "@/lib/registry";
import { HeroSearch } from "@/components/HeroSearch";
import { ArrowRight, Layers, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "All Calculators Directory - 100+ Free Online Tools | MyCalculators",
  description:
    "Explore 100+ free online calculators organized across Finance, Business, Math, Health, Time & Date, Converters, and Education.",
  alternates: {
    canonical: "https://mycalculators.xyz/calculators",
  },
  openGraph: {
    title: "All Calculators Directory | MyCalculators",
    description: "Browse 100+ fast browser-native calculation tools.",
    url: "https://mycalculators.xyz/calculators",
    siteName: "MyCalculators",
    locale: "en_IN",
    type: "website",
  },
};

export default function AllCalculatorsPage() {
  const totalCount = CALCULATORS.length;
  const categoriesList = Object.keys(CATEGORIES_META) as CalculatorCategory[];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy">Home</Link>
        <span>/</span>
        <span className="text-navy">All Calculators</span>
      </div>

      {/* Header Banner with Integrated Live Search */}
      <div className="bg-sage/40 rounded-3xl p-6 sm:p-10 border border-navy/10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel bg-white px-3 py-1 rounded-md border border-navy/10 shadow-sm">
          <Layers className="w-3.5 h-3.5" /> {totalCount}+ Calculation Tools Available
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
          All Calculators Directory
        </h1>
        <p className="text-navy/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Complete directory of browser-native calculators designed for financial modeling, business projections, unit conversions, math, and health metrics.
        </p>

        {/* Live Search Bar with Instant Suggestions */}
        <div className="pt-2">
          <HeroSearch />
        </div>
      </div>

      {/* Category Wise Grid Sections */}
      <div className="space-y-12">
        {categoriesList.map((catKey) => {
          const catMeta = CATEGORIES_META[catKey];
          const calcsInCat = CALCULATORS.filter((c) => c.category === catKey);

          return (
            <section key={catKey} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-navy/10">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-navy">{catMeta.name}</h2>
                  <span className="text-xs font-bold text-steel bg-sage/50 px-2.5 py-0.5 rounded-full border border-navy/10">
                    {calcsInCat.length}
                  </span>
                </div>
                <Link
                  href={`/calculators/${catKey}`}
                  className="text-xs font-bold text-steel hover:text-navy flex items-center gap-1"
                >
                  View Category <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Cards with Solid Themed Action Buttons & Border Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {calcsInCat.map((calc) => (
                  <div
                    key={calc.id}
                    className="bg-white border-2 border-navy/15 rounded-2xl p-5 hover:border-steel hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-steel bg-sage/50 px-2 py-0.5 rounded">
                          {catMeta.name}
                        </span>
                        {calc.popular && (
                          <span className="text-[10px] font-bold text-navy bg-sand px-2.5 py-0.5 rounded-full shadow-xs">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-base sm:text-lg text-navy group-hover:text-steel transition-colors mb-1.5">
                        {calc.name}
                      </h3>
                      <p className="text-xs text-navy/70 line-clamp-2 leading-relaxed mb-5">
                        {calc.description}
                      </p>
                    </div>

                    {/* Solid Colored Action Button */}
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
          );
        })}
      </div>

      {/* Methodology Section */}
      <section className="bg-cream/50 border border-sand/40 rounded-2xl p-6 text-navy/80 text-xs leading-relaxed">
        <h3 className="font-bold text-navy text-sm mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sand" /> Standard Calculation Methodology
        </h3>
        <p>
          Calculations on MyCalculators execute deterministically in your browser using verified mathematical, statutory, and statistical algorithms. Results are estimates for educational and planning purposes.
        </p>
      </section>
    </main>
  );
}
