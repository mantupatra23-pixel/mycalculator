import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { TRADING_CATEGORIES, TRADING_TOOLS } from "@/lib/trading/registry";
import { ShieldAlert, ArrowRight, Activity, TrendingUp, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Trading Calculators & Risk Tools | MyCalculators",
  description:
    "Deterministic, zero-latency trading calculators for P&L, position sizing, brokerage taxes, options payoffs, and risk management.",
  alternates: {
    canonical: "https://www.mycalculator.xyz/trading",
  },
};

export default function TradingHubPage() {
  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f59b]/10 border border-[#00f59b]/20 text-[#00f59b] text-xs font-black uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" /> Trading Intelligence Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Trading Calculators & Risk Engines
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Zero-latency, client-side calculation engines designed for intraday traders, options strategists, and portfolio managers. Calculate real P&L, verify position sizes, and account for Indian statutory friction.
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-[#0b1222] border border-amber-500/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <strong className="text-amber-300 block font-bold">Calculative & Educational Utility Notice:</strong>
            <p className="text-slate-400 leading-relaxed">
              These tools provide mathematical models based strictly on user inputs. They do not constitute financial advice, buy/sell signals, or guaranteed returns. Trading securities carries inherent capital risk.
            </p>
          </div>
        </div>

        {/* Featured Foundation Tools */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00f59b]" /> Core Daily Driver Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TRADING_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/trading/${tool.slug}`}
                className="group block bg-[#0b1222] border border-[#1e293b] hover:border-[#00f59b]/50 rounded-2xl p-5 transition-all shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00f59b] bg-[#00f59b]/10 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00f59b] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00f59b] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{tool.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 16 Category Modules */}
        <div className="space-y-4 pt-6 border-t border-[#1e293b]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#00d8f6]" /> Tool Categories Architecture (240+ Suite)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRADING_CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-[#0b1222] border border-[#1e293b] rounded-2xl p-4 space-y-2">
                <span className={`text-[10px] font-black uppercase tracking-wider block ${cat.badgeColor}`}>
                  {cat.tagline}
                </span>
                <h3 className="text-sm font-bold text-white">{cat.name}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
