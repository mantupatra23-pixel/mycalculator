import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CALCULATORS } from "@/lib/registry";
import { TrendingUp, ArrowRight, ShieldCheck, Calculator, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Finance Calculators - EMI, GST, SIP, Income Tax & Wealth Tools | MyCalculators",
  description: "Free and accurate Indian finance calculators. Calculate loan EMI, GST amounts, SIP mutual fund returns, salary take-home, and PPF savings instantly.",
};

export default function FinanceCategoryPage() {
  const financeCalcs = CALCULATORS.filter((c) => c.category === "finance");

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-navy/60 mb-4">
        <Link href="/" className="hover:text-navy">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-navy">Calculators</Link>
        <span>/</span>
        <span className="text-navy">Finance</span>
      </div>

      {/* Header */}
      <div className="bg-sage/40 rounded-3xl p-6 sm:p-10 border border-navy/10 mb-10">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-steel mb-4 shadow-sm border border-navy/10">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy mb-3">
          Finance Calculators
        </h1>
        <p className="text-navy/80 text-sm sm:text-base max-w-2xl leading-relaxed">
          Comprehensive suite of financial tools designed for Indian tax slabs, banking formulas, mutual fund wealth projections, and personal loan calculations.
        </p>
      </div>

      {/* Grid of 25 Calculators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {financeCalcs.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-navy/15 rounded-2xl p-5 hover:border-steel hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-steel bg-sage/50 px-2 py-0.5 rounded">
                  India & Global
                </span>
                {item.popular && (
                  <span className="text-[10px] font-bold text-navy bg-sand px-2 py-0.5 rounded-full">
                    High Usage
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

      {/* Finance Disclaimer Box */}
      <section className="bg-cream/60 border border-sand/40 rounded-2xl p-6 text-navy/80 text-xs leading-relaxed">
        <h3 className="font-bold text-navy text-sm mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sand" /> Indian Financial Regulatory Disclaimer
        </h3>
        <p>
          Results provided by our financial tools (including EMI, GST, Salary In-Hand, and Income Tax) are mathematical estimates for informational purposes. Exact loan repayments, interest rates, and tax deductions depend on your lender&apos;s policies and applicable CBDT / GST Council guidelines.
        </p>
      </section>
    </main>
  );
}
