import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TRADING_CATEGORIES, TRADING_TOOLS } from "@/lib/trading/registry";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Trading & Stock Market Calculators | MyCalculators",
  description:
    "Free online trading calculators for intraday P&L, position sizing, options strategies, futures margin, and statutory Indian charges.",
  alternates: {
    canonical: "https://www.mycalculator.xyz/trading",
  },
};

export default function TradingHubPage() {
  const pnlTools = TRADING_TOOLS.filter((t) => t.category === "pnl-trades");
  const riskTools = TRADING_TOOLS.filter((t) => t.category === "risk-management");
  const chargesTools = TRADING_TOOLS.filter((t) => t.category === "charges-brokerage");
  const optionsTools = TRADING_TOOLS.filter((t) => t.category === "options" || t.category === "options-strategies");
  const futuresTools = TRADING_TOOLS.filter((t) => t.category === "futures-leverage");
  const forexCryptoTools = TRADING_TOOLS.filter((t) => t.category === "forex-crypto");

  const renderToolCard = (tool: (typeof TRADING_TOOLS)[0], badgeText: string) => (
    <div key={tool.slug} className="bg-white border border-navy/15 rounded-2xl p-5 flex flex-col justify-between shadow-2xs group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-navy/60 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            {badgeText}
          </span>
          {tool.popular && (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              Popular
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-navy group-hover:text-steel transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-navy/70 mt-1.5 line-clamp-2 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>
      <Link
        href={`/trading/${tool.slug}`}
        className="mt-5 w-full bg-[#50727B] hover:bg-[#405d65] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>Open Calculator</span>
        <span className="text-xs">&rarr;</span>
      </Link>
    </div>
  );

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
          Trading &amp; Derivatives Calculators
        </h1>
        <p className="text-sm sm:text-base text-navy/75 max-w-2xl leading-relaxed">
          Deterministic algorithms for options payoff modeling, multi-leg spreads, futures margin utilization, intraday P&amp;L, and statutory Indian brokerage friction.
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

      {/* Group 1: Options & Strategy Payoffs (Phase 2 Highlight) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Options Mechanics &amp; Strategy Simulators</h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Phase 2 Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {optionsTools.map((tool) => renderToolCard(tool, "OPTIONS"))}
        </div>
      </div>

      {/* Group 2: Futures & Leverage (Phase 2 Highlight) */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Futures &amp; Leverage Dynamics</h2>
          <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">Phase 2 Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {futuresTools.map((tool) => renderToolCard(tool, "FUTURES"))}
        </div>
      </div>

      {/* Group 3: Forex & Crypto (Phase 2 Highlight) */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Forex &amp; Crypto Mathematical Tools</h2>
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">Phase 2 Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forexCryptoTools.map((tool) => renderToolCard(tool, "FX / CRYPTO"))}
        </div>
      </div>

      {/* Group 4: P&L Tools (Phase 1) */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">P&amp;L &amp; Trade Calculators</h2>
          <span className="text-xs font-semibold text-steel">Phase 1 Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pnlTools.map((tool) => renderToolCard(tool, "P&L"))}
        </div>
      </div>

      {/* Group 5: Risk Management (Phase 1) */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Risk Management &amp; Capital Preservation</h2>
          <span className="text-xs font-semibold text-steel">Phase 1 Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskTools.map((tool) => renderToolCard(tool, "RISK"))}
        </div>
      </div>

      {/* Group 6: Indian Brokerage (Phase 1) */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Indian Brokerage &amp; Statutory Charges</h2>
          <span className="text-xs font-semibold text-steel">Phase 1 Active</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chargesTools.map((tool) => renderToolCard(tool, "TAXES"))}
        </div>
      </div>

      {/* Planned Future Categories */}
      <div className="space-y-4 pt-4 border-t border-navy/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Planned Tool Categories (Phases 3 to 6)</h2>
          <span className="text-xs font-semibold text-navy/50">Coming in Phase 3+</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRADING_CATEGORIES.slice(7).map((cat) => (
            <div key={cat.id} className="bg-white/50 border border-navy/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                {cat.tagline}
              </span>
              <h3 className="text-xs font-bold text-navy/70">{cat.name}</h3>
              <p className="text-[11px] text-navy/50 leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
