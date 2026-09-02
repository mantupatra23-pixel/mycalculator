import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TRADING_CATEGORIES, TRADING_TOOLS } from "@/lib/trading/registry";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Trading & Stock Market Calculators | MyCalculators",
  description:
    "Free online trading calculators for intraday P&L, position sizing, brokerage taxes, and risk management with zero latency.",
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
        <span className="text-navy uppercase tracking-wider">Trading</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mb-2">
          Trading &amp; Stock Market Calculators
        </h1>
        <p className="text-sm sm:text-base text-navy/75 max-w-2xl leading-relaxed">
          Zero-latency, browser-native calculation algorithms for intraday traders, risk managers, and options strategists. Account for real point movements, position sizes, and Indian regulatory taxes.
        </p>
      </div>

      {/* Educational Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <strong className="font-bold block">Educational &amp; Calculative Utility:</strong>
          <p className="text-amber-900/80 leading-relaxed">
            These tools provide mathematical models based purely on user-provided inputs. They do not constitute financial advice, investment recommendations, or guaranteed returns.
          </p>
        </div>
      </div>

      {/* Section 1: Core Daily Driver Tools (Exact Main Site Card Format) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy">
          Core Daily Driver Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRADING_TOOLS.map((tool) => (
            <div
              key={tool.slug}
              className="bg-white border border-navy/15 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all group"
            >
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-navy/60 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    {tool.category === "pnl-trades"
                      ? "P&L / TRADING"
                      : tool.category === "risk-management"
                      ? "RISK"
                      : "CHARGES / TAX"}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    Popular
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-navy group-hover:text-steel transition-colors">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-navy/70 mt-1.5 line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              {/* Standard Open Calculator Button */}
              <Link
                href={`/trading/${tool.slug}`}
                className="mt-5 w-full bg-[#50727B] hover:bg-[#405d65] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open Calculator</span>
                <span className="text-xs">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Tool Categories Architecture (240+ Suite) */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <h2 className="text-xl font-bold text-navy">
          Tool Categories Architecture (240+ Suite)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRADING_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-navy/15 rounded-2xl p-4 sm:p-5 space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-steel block">
                  {cat.tagline}
                </span>
                <span className="text-[10px] font-bold text-navy/50 bg-sage/30 px-2 py-0.5 rounded">
                  Category
                </span>
              </div>
              <h3 className="text-sm font-bold text-navy">{cat.name}</h3>
              <p className="text-xs text-navy/70 leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
