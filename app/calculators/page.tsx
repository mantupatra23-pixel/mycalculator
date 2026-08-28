import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CALCULATORS, CATEGORIES_META, CalculatorCategory } from "@/lib/registry";
import { ArrowRight, Search, Layers } from "lucide-react";

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
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy">Home</Link>
        <span>/</span>
        <span className="text-navy">All Calculators</span>
      </div>

      {/* Header */}
      <div className="bg-sage/40 rounded-3xl p-6 sm:p-10 border border-navy/10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel bg-white px-3 py-1 rounded-md border border-navy/10 mb-4 shadow-sm">
          <Layers className="w-3.5 h-3.5" /> {totalCount}+ Calculation Tools
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy mb-3">
          All Calculators Directory
        </h1>
        <p className="text-navy/80 text-sm sm:text-base max-w-2xl leading-relaxed">
          Complete directory of browser-native calculators designed for financial modeling, business calculations, unit conversions, math, and health metrics.
        </p>
      </div>

      {/* Category Sections */}
      <div className="space-y-10">
        {categoriesList.map((catKey) => {
          const catMeta = CATEGORIES_META[catKey];
          const calcsInCat = CALCULATORS.filter((c) => c.category === catKey);

          return (
            <section key={catKey} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-navy/10">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-navy">{catMeta.name}</h2>
                  <span className="text-xs font-bold text-steel bg-sage/50 px-2.5 py-0.5 rounded-full">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {calcsInCat.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculators/${calc.slug}`}
                    className="bg-white border border-navy/15 rounded-2xl p-4 hover:border-steel hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-steel bg-sage/40 px-2 py-0.5 rounded">
                          {catMeta.name}
                        </span>
                        {calc.popular && (
                          <span className="text-[10px] font-bold text-navy bg-sand px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base text-navy group-hover:text-steel transition-colors mb-1">
                        {calc.name}
                      </h3>
                      <p className="text-xs text-navy/60 line-clamp-2 leading-relaxed mb-3">
                        {calc.description}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-steel flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Open <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
