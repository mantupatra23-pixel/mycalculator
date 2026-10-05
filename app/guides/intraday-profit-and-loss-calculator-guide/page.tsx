import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Calculator, ShieldCheck, TrendingUp, HelpCircle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Intraday Profit & Loss Calculator India – Complete Guide | MyCalculators",
  description:
    "Master intraday P&L calculation in India: Zerodha brokerage formula, 0.025% STT, 18% GST, exchange turnover charges, options breakeven, and risk-reward position sizing.",
  alternates: {
    canonical: "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide",
  },
  openGraph: {
    title: "Intraday Profit & Loss Calculator India – Complete Guide",
    description: "Detailed step-by-step breakdown of Zerodha brokerage, STT, GST, and net intraday P&L calculation.",
    url: "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide",
    siteName: "MyCalculators",
    locale: "en_IN",
    type: "article",
  },
};

export default function IntradayGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Intraday Profit & Loss Calculator India – Complete Guide",
        description: "Master intraday trading P&L in India with Zerodha brokerage, 0.025% STT, exchange fees, and risk-reward position sizing.",
        author: {
          "@type": "Organization",
          name: "MyCalculators Editorial Team",
          url: "https://www.mycalculator.xyz",
        },
        publisher: {
          "@type": "Organization",
          name: "MyCalculators",
          logo: {
            "@type": "ImageObject",
            url: "https://www.mycalculator.xyz/icon-512.png",
          },
        },
        datePublished: "2026-09-08",
        dateModified: "2026-10-05",
        mainEntityOfPage: "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalculator.xyz" },
          { "@type": "ListItem", position: 2, name: "Trading Hub", item: "https://www.mycalculator.xyz/trading" },
          { "@type": "ListItem", position: 3, name: "Intraday P&L Guide", item: "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide" },
        ],
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <Link href="/trading" className="hover:text-navy transition-colors">Trading</Link>
        <span>/</span>
        <span className="text-navy truncate">Intraday P&amp;L Guide</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 border-b border-navy/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Market Intelligence Guide
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight">
          Intraday Profit &amp; Loss Calculator – India: Complete Guide
        </h1>
        <p className="text-base sm:text-lg text-navy/75 leading-relaxed">
          A definitive mathematical blueprint for calculating net realized profit, discount broker commissions, statutory taxes (STT, GST, SEBI), and risk-managed position sizing in Indian markets.
        </p>
      </header>

      {/* Interactive Tool Banner */}
      <div className="bg-gradient-to-r from-navy to-[#182848] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#00f59b] uppercase tracking-wider">
            <Calculator className="w-4 h-4" /> Live Web Application
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Calculate Your Real Trade P&amp;L Instantly</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Skip manual arithmetic. Factor in Zerodha brokerage, exact 0.025% STT, and 18% GST directly in your browser.
          </p>
        </div>
        <Link
          href="/trading/intraday-pnl-calculator"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00f59b] hover:bg-[#00d084] text-navy font-black text-xs sm:text-sm transition-all shadow-md shrink-0"
        >
          Open Intraday Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Section 1 */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-navy">1. Understanding Intraday Trading Mechanics</h2>
        <div className="prose text-sm sm:text-base text-navy/80 space-y-4 leading-relaxed">
          <h3 className="text-xl font-bold text-navy">1.1 What Defines an Intraday Trade in Indian Markets</h3>
          <p>
            An intraday transaction in India (MIS - Margin Intraday Square-off) involves opening and closing a position within the exact same trading session (09:15 AM to 03:30 PM IST). 
          </p>
          <p>
            If a position is not closed manually before approximately 03:15 PM to 03:25 PM, your broker’s automated risk management system (RMS) squares off the trade at the prevailing market rate, frequently levying an auto-square-off penalty fee of ₹50 + 18% GST.
          </p>
          <h3 className="text-xl font-bold text-navy">1.2 Key Cost Components: Brokerage, Taxes, and Charges</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Brokerage Commission:</strong> Charged by the broker for executing buy and sell legs.</li>
            <li><strong>Securities Transaction Tax (STT):</strong> Direct statutory levy collected by the government via stock exchanges.</li>
            <li><strong>Exchange Transaction Charges:</strong> Turnover fees levied by the National Stock Exchange (NSE) or Bombay Stock Exchange (BSE).</li>
            <li><strong>GST (18%):</strong> Mandatory service tax applied on Brokerage + Exchange Fees + SEBI Fees.</li>
            <li><strong>Stamp Duty:</strong> State government revenue tax levied strictly on buy-side turnover.</li>
            <li><strong>SEBI Turnover Charges:</strong> Regulatory oversight fee charged at ₹10 per Crore of trade volume.</li>
          </ul>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-navy">2. Calculating Intraday Profit/Loss with Brokerage</h2>
        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <h3 className="text-xl font-bold text-navy">2.1 Brokerage Structures (Flat vs. Percentage) – Zerodha Example</h3>
          <p>
            Discount brokers like Zerodha, Groww, and Angel One charge a capped commission:
          </p>
          <div className="p-4 bg-sage/20 border border-navy/15 rounded-2xl font-mono text-xs sm:text-sm text-navy">
            Brokerage per Order = min(₹20, 0.03% × Order Turnover)
          </div>
          <p>
            On a small trade with ₹1,000 turnover, brokerage is ₹0.30. On trades with turnover exceeding ₹66,667 per leg, the fee caps at flat ₹20 per executed order (₹40 round-trip).
          </p>

          <h3 className="text-xl font-bold text-navy">2.2 Step-by-Step Profit Formula</h3>
          <div className="space-y-2">
            <div className="p-4 bg-white border border-navy/15 rounded-2xl space-y-2 font-mono text-xs sm:text-sm text-navy">
              <div>Gross P&amp;L = (Sell Price - Buy Price) × Quantity</div>
              <div>Total Turnover = (Buy Price × Qty) + (Sell Price × Qty)</div>
              <div>Net P&amp;L = Gross P&amp;L - (Brokerage + STT + Exchange Fees + Stamp Duty + SEBI + GST)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-navy">3. STT &amp; Regulatory Tax Schedule (Zerodha Rates)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-navy/15 rounded-2xl overflow-hidden bg-white">
            <thead className="bg-sage/40 text-navy font-bold">
              <tr>
                <th className="p-3 border-b border-navy/15">Tax Component</th>
                <th className="p-3 border-b border-navy/15">Rate (Equity Intraday)</th>
                <th className="p-3 border-b border-navy/15">Applicable Leg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10 text-navy/80">
              <tr>
                <td className="p-3 font-semibold">Brokerage</td>
                <td className="p-3">0.03% or ₹20/order</td>
                <td className="p-3">Buy and Sell Orders</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Securities Transaction Tax (STT)</td>
                <td className="p-3">0.025%</td>
                <td className="p-3 text-emerald-800 font-bold">Sell Side Only</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Exchange Turnover Fee</td>
                <td className="p-3">~0.00297% (NSE)</td>
                <td className="p-3">Total Turnover (Buy + Sell)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Stamp Duty</td>
                <td className="p-3">0.003%</td>
                <td className="p-3">Buy Side Only</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">SEBI Charges</td>
                <td className="p-3">₹10 / Crore (0.0001%)</td>
                <td className="p-3">Total Turnover</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">GST</td>
                <td className="p-3">18%</td>
                <td className="p-3">Brokerage + Exchange Fees + SEBI</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-cream border border-navy/15 rounded-2xl text-xs text-navy/80">
          <strong>Key Rule:</strong> GST is never levied on government taxes like STT or Stamp Duty. It is charged exclusively on taxable services rendered. Check deductions on our{" "}
          <Link href="/trading/brokerage-charges-calculator" className="font-bold underline text-steel">
            Indian Brokerage &amp; Taxes Calculator
          </Link>.
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-navy">4. Options Intraday Breakeven &amp; P&amp;L Calculation</h2>
        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <p>
            Unlike cash shares, options trading operates on derivative contract lots (e.g. 50 units for Nifty 50). STT on intraday options square-off is charged on the traded premium value.
          </p>
          <div className="p-4 bg-white border border-navy/15 rounded-2xl font-mono text-xs sm:text-sm text-navy space-y-1">
            <div>Call Breakeven = Strike Price + Premium Paid + (Charges / Units)</div>
            <div>Put Breakeven = Strike Price - Premium Paid - (Charges / Units)</div>
          </div>
          <p>
            If you buy 1 lot of Nifty 24,500 Call at ₹180 and exit at ₹210 (+30 points), your gross gain is ₹1,500. Round-trip transaction fees total approximately ₹59.50, delivering a net profit of <strong>₹1,440.50</strong>. Verify multiple strikes on the{" "}
            <Link href="/trading/options-breakeven-calculator" className="font-bold underline text-steel">
              Options Breakeven Calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-navy">5. Risk-Reward Ratio &amp; Position Sizing</h2>
        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <p>
            Disciplined execution mandates sizing positions strictly around your risk budget rather than buying arbitrary share quantities:
          </p>
          <div className="p-4 bg-white border border-navy/15 rounded-2xl font-mono text-xs sm:text-sm text-navy space-y-1">
            <div>Risk Budget = Total Trading Capital × Risk % (typically 1% to 2%)</div>
            <div>Allowable Shares = floor(Risk Budget / |Entry Price - Stop Loss Price|)</div>
          </div>
          <p>
            If you have ₹2,00,000 capital and risk 1.5% (₹3,000) on a trade entering at ₹450 with a ₹435 stop-loss (₹15 stop distance), you may purchase exactly <strong>200 shares</strong>. Calculate your parameters instantly with our{" "}
            <Link href="/trading/position-size-calculator" className="font-bold underline text-steel">
              Position Size Calculator
            </Link>{" "}
            and audit your setup via the{" "}
            <Link href="/trading/risk-reward-calculator" className="font-bold underline text-steel">
              Risk/Reward Ratio Calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-6 pt-4 border-t border-navy/10">
        <h2 className="text-2xl sm:text-3xl font-black text-navy flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-steel" /> Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">How do I incorporate brokerage into intraday P&amp;L on Zerodha?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Deduct min(0.03% or ₹20) on both buy and sell legs, then add statutory taxes (0.025% STT on sell side, exchange fees, stamp duty, SEBI fees, and 18% GST). Subtracting this total from your gross points gained yields net P&amp;L.
            </p>
          </div>
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">What is the exact STT rate for intraday equity trades?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              For equity intraday (MIS), STT is exactly 0.025% charged exclusively on the sell turnover. There is no STT on the buy side of intraday equity transactions.
            </p>
          </div>
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">Can I use the same breakeven formula for futures and options?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              The core principle (Gross Gain = Total Charges) is identical, but futures calculate STT and turnover on the contract notional value, while options calculate STT on the sell-side premium value.
            </p>
          </div>
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">How does the risk-reward ratio affect my capital allocation?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              A 1:2 or 1:3 risk/reward ratio lowers the win rate needed to stay profitable to 33.3% or 25%, protecting your equity curve during unavoidable losing streaks.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="p-4 bg-sage/20 border border-navy/15 rounded-2xl text-[11px] text-navy/60 leading-relaxed">
        <strong>Educational Disclaimer:</strong> This guide and our associated calculator tools provide deterministic mathematical models based strictly on user inputs. They do not constitute investment advice, stock recommendations, or guaranteed returns.
      </footer>
    </article>
  );
}
