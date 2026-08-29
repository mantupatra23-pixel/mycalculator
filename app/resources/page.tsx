import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CALCULATORS } from "@/lib/registry";
import { BookOpen, Code, FileText, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculator Resources, Formula Cheat Sheets & Embeds | MyCalculators",
  description: "Free calculation cheat sheets, Indian financial formulas, embeddable widgets, and practical math guides for bloggers, CAs, and educators.",
  alternates: {
    canonical: "https://mycalculator.xyz/resources",
  },
  openGraph: {
    title: "Financial & Math Calculation Resources | MyCalculators",
    description: "Formulas, embed widgets, and practical calculation guides.",
    url: "https://mycalculator.xyz/resources",
    siteName: "MyCalculators",
    locale: "en_IN",
    type: "website",
  },
};

export default function ResourcesPage() {
  const topCalculators = CALCULATORS.filter((c) => c.popular).slice(0, 8);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-sage/40 rounded-3xl p-6 sm:p-10 border border-navy/10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel bg-white px-3 py-1 rounded-md border border-navy/10 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> Editorial & Publisher Assets
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy">
          Calculation Resources & Guides
        </h1>
        <p className="text-navy/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Formulas, embeddable web widgets, and calculation methodologies designed for finance bloggers, educators, students, and chartered accountants.
        </p>
      </div>

      {/* Grid of Link-Worthy Asset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Formulas */}
        <div className="bg-white border-2 border-navy/15 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center text-steel">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-navy">Formula Cheat Sheets</h2>
            <p className="text-xs text-navy/70 leading-relaxed">
              Verified mathematical equations for Reducing Balance EMI, Monthly Compound SIP, Indian CGPA-to-Percentage conversion, and CAGR.
            </p>
          </div>
          <div className="space-y-2 pt-2 border-t border-navy/10 text-xs">
            <Link href="/calculators/emi-calculator" className="text-steel font-bold hover:underline block">
              Reducing Balance EMI Formula &rarr;
            </Link>
            <Link href="/calculators/sip-calculator" className="text-steel font-bold hover:underline block">
              SIP Future Value Compounding Equation &rarr;
            </Link>
            <Link href="/calculators/cgpa-to-percentage" className="text-steel font-bold hover:underline block">
              CBSE/AICTE 9.5 Multiplier Rule &rarr;
            </Link>
          </div>
        </div>

        {/* 2. Embed Widgets */}
        <div className="bg-white border-2 border-navy/15 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center text-steel">
              <Code className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-navy">Embeddable Widgets</h2>
            <p className="text-xs text-navy/70 leading-relaxed">
              Embed responsive, ad-free calculation widgets directly into your blog posts or web portals with zero API keys or backend setup required.
            </p>
          </div>
          <div className="bg-sage/20 rounded-xl p-3 text-[11px] font-mono text-navy/80 break-all border border-navy/10">
            &lt;iframe src=&quot;https://mycalculator.xyz/calculators/emi-calculator&quot; width=&quot;100%&quot; height=&quot;650&quot;&gt;&lt;/iframe&gt;
          </div>
        </div>

        {/* 3. Tax Slabs */}
        <div className="bg-white border-2 border-navy/15 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sage/50 flex items-center justify-center text-steel">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-navy">AY 2026-27 Direct Tax Slabs</h2>
            <p className="text-xs text-navy/70 leading-relaxed">
              Detailed breakdown of Section 87A rebate rules (up to ₹12 Lakhs income), salaried standard deduction (₹75,000), and New vs Old Tax Regime comparisons.
            </p>
          </div>
          <Link
            href="/calculators/income-tax-calculator"
            className="w-full bg-steel hover:bg-steel/90 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors shadow-sm"
          >
            Open Income Tax Calculator <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Direct Links to Popular Calculators */}
      <div className="bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-navy">Top Embeddable Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {topCalculators.map((calc) => (
            <Link
              key={calc.id}
              href={`/calculators/${calc.slug}`}
              className="p-4 bg-sage/25 hover:bg-sage/50 border border-navy/10 rounded-2xl transition-all group"
            >
              <span className="font-extrabold text-sm text-navy group-hover:text-steel block mb-1">
                {calc.name}
              </span>
              <span className="text-[11px] text-navy/60 line-clamp-1">Get embed code &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
