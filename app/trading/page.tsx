import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TRADING_CATEGORIES, TRADING_TOOLS } from "@/lib/trading/registry";
import { ShieldAlert, ArrowRight, Activity, TrendingUp, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Trading & Stock Market Calculators | MyCalculators",
  description:
    "Deterministic, zero-latency trading calculators for intraday P&L, position sizing, brokerage taxes, options payoffs, and risk management.",
  alternates: {
    canonical: "https://www.mycalculator.xyz/trading",
  },
};

export default function TradingHubPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy uppercase tracking-wider">Trading Tools</span>
      </nav>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/40 border border-navy/10 text-navy text-xs font-bold">
          <Activity className="w-3.5 h-3.5 text-steel" /> Professional Market Calculators
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
          Trading &amp; Stock Market Calculators
        </h1>
        <p className="text-sm sm:text-base text-navy/75 max-w-2xl leading-relaxed">
          Zero-latency, browser-native calculation algorithms for intraday traders, risk managers, and options strategists. Account for real point movements, position sizes, and Indian regulatory taxes.
        </p>
      </div>

      {/* Educational Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <strong className="font-bold block">Educational &amp; Calculative Utility:</strong>
          <p className="text-amber-800/80 leading-relaxed">
            These tools provide mathematical models based purely on user-provided inputs. They do not constitute financial advice, investment recommendations, or guaranteed returns.
          </p>
        </div>
      </div>

      {/* Core Tools */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-steel" /> Core Daily Driver Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRADING_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/trading/${tool.slug}`}
              className="group block bg-white border border-navy/15 hover:border-navy/30 rounded-2xl p-5 transition-all shadow-xs"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-navy bg-sage/30 px-2 py-0.5 rounded border border-navy/10">
                  {tool.category}
                </span>
                <ArrowRight className="w-4 h-4 text-navy/40 group-hover:text-steel group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-navy group-hover:text-steel transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-navy/70 mt-1.5 line-clamp-2 leading-relaxed">
                {tool.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Category Directory */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-steel" /> Tool Categories Architecture (240+ Suite)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRADING_CATEGORIES.map((cat) => (
            <div key={cat.id} className="bg-white border border-navy/15 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-steel block">
                {cat.tagline}
              </span>
              <h3 className="text-sm font-bold text-navy">{cat.name}</h3>
              <p className="text-[11px] text-navy/70 leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
