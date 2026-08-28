import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CALCULATORS } from "@/lib/registry";
import { Percent, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Math Calculators - Percentage, Discount, Ratios & Statistics | MyCalculators",
  description: "Free fast math calculators. Calculate percentages, shopping discounts, profit & loss, average (mean, median), markup, margin and ratio simplifications.",
};

export default function MathCategoryPage() {
  const mathCalcs = CALCULATORS.filter((c) => c.category === "math");

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-navy/60 mb-4">
        <Link href="/" className="hover:text-navy">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-navy">Calculators</Link>
        <span>/</span>
        <span className="text-navy">Math</span>
      </div>

      {/* Header */}
      <div className="bg-sage/40 rounded-3xl p-6 sm:p-10 border border-navy/10 mb-10">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-steel mb-4 shadow-sm border border-navy/10">
          <Percent className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy mb-3">
          Math Calculators
        </h1>
        <p className="text-navy/80 text-sm sm:text-base max-w-2xl leading-relaxed">
          Zero-latency mathematical calculation tools for percentages, shopping discounts, trade margins, statistical averages, and ratios.
        </p>
      </div>

      {/* Grid of 11 Calculators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {mathCalcs.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-navy/15 rounded-2xl p-5 hover:border-steel hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-steel bg-sage/50 px-2 py-0.5 rounded">
                  Instant Tool
                </span>
                {item.popular && (
                  <span className="text-[10px] font-bold text-navy bg-sand px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <h2 className="font-extrabold text-lg text-navy mb-1.5">{item.name}</h2>
              <p className="text-xs text-navy/70 mb-5 leading-relaxed">{item.description}</p>
            </div>

            <Link
              href={`/calculators/${item.slug}`}
              className="w-full bg-steel hover:bg-steel/90 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors shadow-sm"
            >
              Open Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Educational Math Guidance */}
      <section className="bg-cream/50 border border-sand/40 rounded-2xl p-6 text-navy/80 text-xs leading-relaxed">
        <h3 className="font-bold text-navy text-sm mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sand" /> Standard Mathematical Conventions
        </h3>
        <p>
          All math calculation tools use precision floating-point algorithms to eliminate rounding drift. Zero-division checks protect against invalid inputs and display real-time verified outputs.
        </p>
      </section>
    </main>
  );
}
