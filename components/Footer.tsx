import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] text-white border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Brand Header */}
        <div className="space-y-1 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f59b] animate-pulse"></span>
            <span className="font-black text-lg sm:text-xl tracking-tight text-white">MyCalculators</span>
          </div>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
            CALCULATE • ANALYZE • GROW
          </p>
        </div>

        {/* 5 Columns Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {/* 1. FINANCE */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
              FINANCE
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/calculators/emi-calculator" className="hover:text-white transition-colors">EMI Calculator</Link></li>
              <li><Link href="/calculators/home-loan-emi-calculator" className="hover:text-white transition-colors">Home Loan EMI</Link></li>
              <li><Link href="/calculators/sip-calculator" className="hover:text-white transition-colors">SIP Calculator</Link></li>
              <li><Link href="/calculators/gst-calculator" className="hover:text-white transition-colors">GST Calculator</Link></li>
              <li><Link href="/calculators/income-tax-calculator" className="hover:text-white transition-colors">Income Tax (AY 26-27)</Link></li>
              <li><Link href="/calculators/salary-calculator" className="hover:text-white transition-colors">Salary (In-Hand)</Link></li>
              <li><Link href="/calculators/ltv-ratio-calculator" className="hover:text-white transition-colors">LTV Ratio</Link></li>
            </ul>
          </div>

          {/* 2. TRADING & MARKETS (NEW COLUMN) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#00f59b]">
              TRADING
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/trading/intraday-pnl-calculator" className="hover:text-[#00f59b] transition-colors">Intraday P&amp;L</Link></li>
              <li><Link href="/trading/call-option-payoff-calculator" className="hover:text-[#00f59b] transition-colors">Call Option Payoff</Link></li>
              <li><Link href="/trading/position-size-calculator" className="hover:text-[#00f59b] transition-colors">Position Size Sizing</Link></li>
              <li><Link href="/trading/futures-pnl-calculator" className="hover:text-[#00f59b] transition-colors">Futures P&amp;L</Link></li>
              <li><Link href="/trading/brokerage-charges-calculator" className="hover:text-[#00f59b] transition-colors">Brokerage &amp; Taxes</Link></li>
              <li><Link href="/trading/trade-expectancy-calculator" className="hover:text-[#00f59b] transition-colors">Trade Expectancy</Link></li>
              <li>
                <Link href="/trading" className="text-[#00f59b] font-bold hover:underline inline-flex items-center gap-1 pt-1">
                  View All 42 Tools &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. BUSINESS & MATH */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
              BUSINESS &amp; MATH
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/calculators/roas-calculator" className="hover:text-white transition-colors">ROAS Calculator</Link></li>
              <li><Link href="/calculators/break-even-point-calculator" className="hover:text-white transition-colors">Break-Even Point</Link></li>
              <li><Link href="/calculators/percentage-calculator" className="hover:text-white transition-colors">Percentage Tool</Link></li>
              <li><Link href="/calculators/discount-calculator" className="hover:text-white transition-colors">Discount Calculator</Link></li>
              <li><Link href="/calculators/profit-and-loss-calculator" className="hover:text-white transition-colors">Profit &amp; Loss</Link></li>
              <li><Link href="/calculators/ratio-simplifier-calculator" className="hover:text-white transition-colors">Ratio Simplifier</Link></li>
            </ul>
          </div>

          {/* 4. CONVERTERS */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
              CONVERTERS
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/calculators/all-in-one-converter" className="hover:text-white transition-colors">All-in-One Converter</Link></li>
              <li><Link href="/calculators/length-distance-converter" className="hover:text-white transition-colors">Length &amp; Distance</Link></li>
              <li><Link href="/calculators/weight-mass-converter" className="hover:text-white transition-colors">Weight &amp; Mass</Link></li>
              <li><Link href="/calculators/age-calculator" className="hover:text-white transition-colors">Age Calculator</Link></li>
              <li><Link href="/calculators/cgpa-to-percentage-calculator" className="hover:text-white transition-colors">CGPA to % (India)</Link></li>
              <li><Link href="/calculators/formula-cheatsheets" className="text-amber-400 hover:underline">Formula Cheatsheets</Link></li>
            </ul>
          </div>

          {/* 5. COMPANY */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
              COMPANY
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Desk</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Footnote / Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <p>
            Deterministic, private, and zero-latency calculations engineered for personal finance, direct taxation, trading performance, business forecasting, and mathematics. All calculations execute locally in your browser.
          </p>
          <div className="mt-4 flex items-center justify-between text-slate-400">
            <span>&copy; {new Date().getFullYear()} MyCalculators. All rights reserved.</span>
            <span>https://www.mycalculator.xyz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
