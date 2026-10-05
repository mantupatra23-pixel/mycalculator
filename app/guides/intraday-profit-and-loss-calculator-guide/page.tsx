import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  Calculator,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
  Percent,
  Code2,
  Layers,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Intraday Profit & Loss Calculator India: Brokerage, STT & Tax Architecture | MyCalculators",
  description:
    "Audit the true friction on your trades: Zerodha ₹20 brokerage cap, 0.025% STT, 18% service GST, contract note simulations, and exact tick breakeven formulas in Indian markets.",
  alternates: {
    canonical: "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide",
  },
  openGraph: {
    title: "Intraday Profit & Loss Architecture: Net Ledger Mechanics in Indian Markets",
    description:
      "Audit the true friction on your trades: Zerodha ₹20 brokerage cap, 0.025% STT, 18% service GST, and exact tick breakeven formulas.",
    url: "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide",
    siteName: "MyCalculators",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "https://www.mycalculator.xyz/og-trading-guide.png",
        width: 1200,
        height: 630,
        alt: "Intraday Profit and Loss Calculator India Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Do Taxes & Brokerage Actually Eat From Your Intraday P&L?",
    description:
      "Screen profit != bank profit. Complete mathematical walkthrough of 0.025% STT, exchange fees, and tick breakeven math.",
    images: ["https://www.mycalculator.xyz/og-trading-guide.png"],
  },
};

export default function IntradayGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide#article",
        "headline": "Intraday Profit and Loss Calculator India: Brokerage, STT, and Net Return Architecture",
        "description": "A definitive technical breakdown of net intraday trading returns across Indian stock exchanges, detailing statutory fees, brokerage caps, and position sizing.",
        "author": {
          "@type": "Organization",
          "name": "MyCalculators Quantitative Desk",
          "url": "https://www.mycalculator.xyz"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MyCalculators",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.mycalculator.xyz/icon-512.png"
          }
        },
        "datePublished": "2026-09-08",
        "dateModified": "2026-10-06",
        "mainEntityOfPage": "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.mycalculator.xyz" },
          { "@type": "ListItem", "position": 2, "name": "Trading Suite", "item": "https://www.mycalculator.xyz/trading" },
          { "@type": "ListItem", "position": 3, "name": "Intraday P&L Guide", "item": "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.mycalculator.xyz/guides/intraday-profit-and-loss-calculator-guide#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is Securities Transaction Tax (STT) charged on intraday loss in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Securities Transaction Tax (STT) is an execution-level statutory tax applied strictly to sell-side turnover at 0.025%. The clearing corporation debits STT automatically regardless of whether the gross trade outcome is a profit or a loss."
            }
          },
          {
            "@type": "Question",
            "name": "Why is intraday STT lower than delivery STT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Delivery trades require physical transfer of ownership via electronic Demat registries, attracting 0.1% STT on both buy and sell legs (0.2% total). Intraday equity settles purely on cash price differentials without depository transfer, attracting a concessional 0.025% levy on the sell leg only."
            }
          },
          {
            "@type": "Question",
            "name": "What is the auto-square-off penalty on discount brokers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Open MIS positions remaining at market close (typically 15:15 to 15:25 IST) are automatically squared off by the broker's Risk Management System (RMS). Brokers charge an administrative fee of ₹50 + 18% GST (₹59.00 total) per executed order."
            }
          },
          {
            "@type": "Question",
            "name": "How does discount brokerage cap at 20 rupees?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Brokers apply min(₹20, 0.03% × Turnover). For any order leg with turnover exceeding ₹66,666.67, 0.03% exceeds ₹20, triggering the statutory cap of flat ₹20 per executed order."
            }
          }
        ]
      }
    ]
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <Link href="/trading" className="hover:text-navy transition-colors">Trading Suite</Link>
        <span>/</span>
        <span className="text-navy truncate">Intraday P&amp;L Guide</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 border-b border-navy/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Market Intelligence &amp; Quantitative Protocol
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight">
          Intraday Profit &amp; Loss Calculator India: Brokerage, STT, and Net Return Architecture
        </h1>
        <p className="text-base sm:text-lg text-navy/75 leading-relaxed">
          Real-time terminal figures represent gross point moves, not bankable capital. This architectural guide breaks down the multi-tier regulatory clearing pipeline: Zerodha brokerage limits, 0.025% STT, 18% service GST, options breakeven drift, and risk-budget position sizing.
        </p>
      </header>

      {/* Interactive Tool Banner */}
      <div className="bg-gradient-to-r from-[#0b1329] to-[#182848] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#00f59b] uppercase tracking-wider">
            <Calculator className="w-4 h-4" /> Live Web Application
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Calculate Your Real Trade P&amp;L Instantly</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Skip manual arithmetic. Calculate exact net returns after Zerodha brokerage, 0.025% STT, exchange fees, and 18% GST locally with zero latency.
          </p>
        </div>
        <Link
          href="/trading/intraday-pnl-calculator"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00f59b] hover:bg-[#00d084] text-[#0b1329] font-black text-xs sm:text-sm transition-all shadow-md shrink-0"
        >
          Open Intraday Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Section 1 */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-navy flex items-center gap-2.5">
          <Layers className="w-6 h-6 text-steel" /> 1. Core Mechanics of Intraday Equity Settlement
        </h2>
        
        {/* Settlement Architecture Diagram */}
        <div className="bg-[#0b1329] text-[#00f59b] p-5 sm:p-6 rounded-2xl overflow-x-auto text-[11px] sm:text-xs font-mono border border-slate-800 leading-relaxed shadow-xs">
          <pre>{`[Order Placed: MIS] ---> [Matching Engine (NSE/BSE)] ---> [Execution Confirm]
         |                                                       |
         v                                                       v
  [09:15 - 15:15 IST]                                   [Turnover Generated]
  Active Trade Window                                   Buy Leg + Sell Leg
         |                                                       |
         +--> Position Closed by Trader?                         v
         |    |-- YES --> Normal Settlement             [Statutory Pipeline]
         |    |                                         - Stamp Duty (Buy Leg)
         |    +-- NO  --> [15:15 - 15:25 IST]           - STT 0.025% (Sell Leg)
         |                RMS Auto-Square-Off           - Exchange Turnover Fee
         |                Triggered:                    - SEBI Fee (₹10/Cr)
         |                (₹50 + 18% GST Penalty)       - GST (18% on Services)
         |                                                       |
         +-------------------------------------------------------+
                                   |
                                   v
                       [Net Bank-Settled P&L]`}</pre>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <h3 className="text-lg sm:text-xl font-bold text-navy">
            1.1 What Constitutes an MIS Intraday Execution on NSE and BSE
          </h3>
          <p>
            An intraday trade executed under the Margin Intraday Square-off (MIS) product code signifies that the trader intends to open and liquidate their position within the same market session (09:15 AM to 03:30 PM IST). Under current SEBI Peak Margin frameworks, MIS orders receive up to 5x intraday leverage.
          </p>
          <p>
            Because MIS transactions settle within the same trading session, shares are never delivered to or debited from your electronic Demat account. Depositories (CDSL/NSDL) do not levy Demat Debit Charges (DP charges) on intraday orders. If an open MIS position is not liquidated manually before the broker&apos;s Risk Management System (RMS) cutoff (typically between 15:15 and 15:25 IST), the position is forcibly squared off at market price with an auto-square-off penalty fee of ₹50 + 18% GST (₹59.00 total) per executed order.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-navy">
            1.2 Gross Terminal Profit vs. Net Bank-Settled P&amp;L
          </h3>
          <p>
            The green or red figure displayed on your terminal screen reflects strictly gross point differential:
          </p>
          <div className="p-4 bg-sage/20 border border-navy/10 rounded-2xl font-mono text-xs sm:text-sm text-navy space-y-1">
            <div>Gross P&amp;L = (Sell Execution Price - Buy Execution Price) × Traded Quantity</div>
            <div>Net Realized P&amp;L = Gross P&amp;L - (Brokerage + STT + Exchange Fees + Stamp Duty + SEBI + GST)</div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-navy flex items-center gap-2.5">
          <Percent className="w-6 h-6 text-steel" /> 2. Mathematical Breakdown of Intraday Trading Friction
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <h3 className="text-lg sm:text-xl font-bold text-navy">
            2.1 Discount Brokerage Formula (Zerodha, Groww, Angel One)
          </h3>
          <p>
            Indian discount brokers price equity intraday orders via an algorithmic cap:
          </p>
          <div className="p-4 bg-white border border-navy/15 rounded-2xl font-mono text-xs sm:text-sm text-navy">
            Brokerage per Leg = min(₹20, 0.0003 × Turnover per Leg)
          </div>

          {/* Brokerage Curve Diagram */}
          <div className="bg-[#0b1329] text-[#00f59b] p-5 sm:p-6 rounded-2xl overflow-x-auto text-[11px] sm:text-xs font-mono border border-slate-800 leading-relaxed">
            <pre>{`Brokerage Fee (₹)
 ^
20 |                      +--------------------------------------- (Capped at ₹20)
   |                     /
   |                    /
   |                   /  Slope = 0.03%
   |                  /
 0 +-----------------+---------------------------------------------> Turnover (₹)
   0             ₹66,666.67`}</pre>
          </div>

          <p>
            The critical inflection point is ₹66,666.67 per order leg ($20 / 0.0003$):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Turnover &lt; ₹66,666.67:</strong> Billed at 0.03% (e.g. ₹10,000 turnover incurs ₹3.00 brokerage).</li>
            <li><strong>Turnover &ge; ₹66,666.67:</strong> Capped at flat ₹20.00 per executed order (₹40.00 total for a round trip).</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-bold text-navy pt-2">
            2.2 Statutory Government Levies Schedule
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-navy/15 rounded-2xl overflow-hidden bg-white">
              <thead className="bg-sage/40 text-navy font-bold">
                <tr>
                  <th className="p-3 border-b border-navy/15">Tax / Regulatory Vector</th>
                  <th className="p-3 border-b border-navy/15">Statutory Rate</th>
                  <th className="p-3 border-b border-navy/15">Tax Base (Application Leg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10 text-navy/80">
                <tr>
                  <td className="p-3 font-semibold">Securities Transaction Tax (STT)</td>
                  <td className="p-3 font-mono text-emerald-800 font-bold">0.025%</td>
                  <td className="p-3">Sell-side turnover exclusively (MIS Equity)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Exchange Turnover Fee</td>
                  <td className="p-3 font-mono">0.00297% (NSE)</td>
                  <td className="p-3">Combined turnover (Buy leg + Sell leg)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Stamp Duty</td>
                  <td className="p-3 font-mono">0.003%</td>
                  <td className="p-3">Buy-side turnover exclusively</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">SEBI Turnover Fee</td>
                  <td className="p-3 font-mono">₹10 / Crore (0.0001%)</td>
                  <td className="p-3">Combined turnover (Buy leg + Sell leg)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Integrated GST</td>
                  <td className="p-3 font-mono text-emerald-800 font-bold">18.00%</td>
                  <td className="p-3">Brokerage + Exchange Turnover + SEBI Fee</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-navy pt-2">
            2.3 The 18% GST Service Tax Base
          </h3>
          <p>
            GST applies exclusively to financial service commissions, not government tax levies:
          </p>
          <div className="p-4 bg-white border border-navy/15 rounded-2xl font-mono text-xs sm:text-sm text-navy">
            GST = 0.18 × (Brokerage + Exchange Turnover Fee + SEBI Fee)
          </div>
          <p className="text-xs text-navy/70">
            Verify individual contract note stamp duties and exchange fees via the{" "}
            <Link href="/trading/brokerage-charges-calculator" className="font-bold underline text-steel hover:text-navy">
              Indian Brokerage &amp; Taxes Calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-navy flex items-center gap-2.5">
          <TrendingUp className="w-6 h-6 text-steel" /> 3. Deterministic Net P&amp;L Worked Execution
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <p>
            Contract note simulation for 100 shares of Reliance Industries (MIS) bought at ₹1,000 and exited at ₹1,050:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-navy/15 rounded-2xl space-y-1.5 text-xs font-mono">
              <span className="font-bold text-navy uppercase font-sans">Turnover Ledger</span>
              <div>Buy Leg: 100 × ₹1,000 = ₹1,00,000.00</div>
              <div>Sell Leg: 100 × ₹1,050 = ₹1,05,000.00</div>
              <div>Total Turnover = ₹2,05,000.00</div>
              <div className="font-bold text-emerald-700 pt-1 font-sans">Gross P&amp;L: +₹5,000.00</div>
            </div>
            <div className="p-4 bg-white border border-navy/15 rounded-2xl space-y-1 text-xs font-mono">
              <span className="font-bold text-navy uppercase font-sans">Itemized Deductions</span>
              <div>Brokerage (Buy + Sell): ₹40.00</div>
              <div>STT (0.025% of ₹1.05L): ₹26.25</div>
              <div>Exchange Fee (0.00297%): ₹6.09</div>
              <div>Stamp Duty (0.003% Buy): ₹3.00</div>
              <div>SEBI Charges (₹10/Cr): ₹0.21</div>
              <div>GST (18% on ₹46.30): ₹8.33</div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between font-bold text-emerald-900 text-sm gap-2">
            <span>Total Statutory Deductions: ₹83.88</span>
            <span>Net In-Pocket P&amp;L: +₹4,916.12</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-navy pt-2">
            3.2 Calculating Exact Tick Breakeven Spread
          </h3>
          <div className="p-4 bg-white border border-navy/15 rounded-2xl font-mono text-xs sm:text-sm text-navy space-y-1">
            <div>Breakeven Delta P = Total Charges / Quantity = ₹83.88 / 100 = ₹0.8388 ≈ ₹0.84</div>
          </div>
          <p>
            On the NSE (₹0.05 minimum tick size), an exit price must clear at least <strong>17 ticks (₹0.85)</strong> above entry (₹1,000.85) to avoid losing capital.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-navy pt-2 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-steel" /> 3.3 TypeScript Engine Implementation
          </h3>
          <div className="bg-[#0b1329] text-[#00f59b] p-5 sm:p-6 rounded-2xl overflow-x-auto text-[11px] sm:text-xs font-mono border border-slate-800 leading-relaxed">
            <pre>{`export function computeIntradayEquitySettlement(trade: {
  buyPrice: number;
  sellPrice: number;
  quantity: number;
}) {
  const buyTurnover = trade.buyPrice * trade.quantity;
  const sellTurnover = trade.sellPrice * trade.quantity;
  const totalTurnover = buyTurnover + sellTurnover;

  const grossPnL = (trade.sellPrice - trade.buyPrice) * trade.quantity;
  const brokerage = Math.min(20, buyTurnover * 0.0003) + Math.min(20, sellTurnover * 0.0003);
  const stt = sellTurnover * 0.00025;
  const exchangeFee = totalTurnover * 0.0000297;
  const stampDuty = buyTurnover * 0.00003;
  const sebiFee = totalTurnover * 0.000001;
  const gst = (brokerage + exchangeFee + sebiFee) * 0.18;

  const totalFriction = brokerage + stt + exchangeFee + stampDuty + sebiFee + gst;
  return {
    grossPnL,
    totalFriction,
    netPnL: grossPnL - totalFriction,
    breakevenMovePoints: totalFriction / trade.quantity
  };
}`}</pre>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-navy">
          4. Derivative Intraday Adjustments: Futures &amp; Options Friction
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <p>
            Derivative contracts trade in standardized lot multipliers (50 units for Nifty 50). Options trading calculates STT strictly on the traded premium value upon sell-off, whereas Futures calculate STT and turnover on the contract notional value.
          </p>

          <div className="bg-[#0b1329] text-[#00f59b] p-5 sm:p-6 rounded-2xl overflow-x-auto text-[11px] sm:text-xs font-mono border border-slate-800 leading-relaxed">
            <pre>{`+--------------------------+-----------------------+-----------------------+
| Metric                   | Equity Intraday (MIS) | NIFTY Index Options   |
+--------------------------+-----------------------+-----------------------+
| Underlying Notional Base | Spot Price * Quantity | Premium * Lot Size    |
| Round-Trip Brokerage     | min(₹20, 0.03%) x 2   | Flat ₹40.00           |
| STT Rate                 | 0.025% (Sell Leg)     | 0.0625% on Premium    |
| Round-Trip Friction (1L) | Variable by Price     | ~₹59.50 per lot       |
| Point Drag (Nifty Lot 50)| ~0.84 pts             | ~1.19 premium points  |
+--------------------------+-----------------------+-----------------------+`}</pre>
          </div>

          <p>
            Buying 1 lot of Nifty 24,500 Call at ₹180 and exiting at ₹210 produces a gross gain of ₹1,500. After round-trip fees (~₹59.50), your net yield is <strong>₹1,440.50</strong>, representing a friction drag of <strong>1.19 premium points</strong>. To model premium decay and multi-strike net payoffs after friction, evaluate contract scenarios on the{" "}
            <Link href="/trading/call-option-payoff-calculator" className="font-bold underline text-steel hover:text-navy">
              Call Option Payoff Calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-navy">
          5. Capital Protection &amp; Position Sizing Framework
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-navy/80 leading-relaxed">
          <p>
            Position sizing must be derived from market volatility and stop-loss distance rather than available leverage:
          </p>

          <div className="bg-[#0b1329] text-[#00f59b] p-5 sm:p-6 rounded-2xl overflow-x-auto text-[11px] sm:text-xs font-mono border border-slate-800 leading-relaxed">
            <pre>{`[Total Portfolio Capital] 
            |
            v
   * [Risk Allocation %] ---> [Risk Budget in ₹]
                                     |
[Entry Price] - [Stop-Loss]          |
            |                        |
            v                        v
   [Absolute Risk Per Share] ----> [DIVIDE] ----> [floor()] ---> [Exact Order Qty]`}</pre>
          </div>

          <div className="p-4 bg-white border border-navy/15 rounded-2xl font-mono text-xs sm:text-sm text-navy space-y-1">
            <div>Risk Budget (₹) = Total Capital × Risk % (1.0% to 2.0%)</div>
            <div>Allowable Quantity = floor(Risk Budget / |Entry Price - Stop-Loss Price|)</div>
          </div>
          <p>
            With ₹5,00,000 capital and 1.0% risk (₹5,000 budget), entering at ₹2,450 with a ₹2,425 stop-loss (₹25 distance) limits allocation to exactly <strong>200 shares</strong> ($5,000 / 25$). Enforce automated capital limits and calculate exact order sizes via our{" "}
            <Link href="/trading/position-size-calculator" className="font-bold underline text-steel hover:text-navy">
              Position Size Calculator
            </Link>.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-navy pt-2">
            5.2 Mathematical Asymmetry of Risk-Reward (R:R) Ratios
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-navy/15 rounded-2xl overflow-hidden bg-white">
              <thead className="bg-sage/40 text-navy font-bold">
                <tr>
                  <th className="p-3 border-b border-navy/15">Target R:R Ratio</th>
                  <th className="p-3 border-b border-navy/15">Breakeven Win Rate</th>
                  <th className="p-3 border-b border-navy/15">Return Over 100 Trades @ 50% Win Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10 text-navy/80 font-mono">
                <tr>
                  <td className="p-3 font-semibold font-sans">1 : 1.0</td>
                  <td className="p-3">50.00%</td>
                  <td className="p-3 text-amber-700 font-sans">Net Zero (Friction erodes capital)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-sans">1 : 1.5</td>
                  <td className="p-3">40.00%</td>
                  <td className="p-3 text-emerald-700 font-bold font-sans">+25.00 R Units</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-sans">1 : 2.0</td>
                  <td className="p-3">33.33%</td>
                  <td className="p-3 text-emerald-700 font-bold font-sans">+50.00 R Units</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold font-sans">1 : 3.0</td>
                  <td className="p-3">25.00%</td>
                  <td className="p-3 text-emerald-700 font-bold font-sans">+100.00 R Units</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-navy/70 pt-1">
            Compute your system&apos;s long-term mathematical edge over a 100-trade sequence with the{" "}
            <Link href="/trading/trade-expectancy-calculator" className="font-bold underline text-steel hover:text-navy">
              Trade Expectancy Calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* Section 6 - Statutory Authority Citations */}
      <section className="space-y-4 pt-6 border-t border-navy/10">
        <h2 className="text-xl sm:text-2xl font-black text-navy flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" /> Statutory References &amp; Authoritative Sources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <a
            href="https://www.nseindia.com/products-services/equity-market-trading-charges"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white border border-navy/15 rounded-xl hover:border-navy/40 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-navy group-hover:text-steel">NSE India Equity Charges</div>
              <div className="text-navy/60 text-[11px]">Exchange turnover circulars &amp; STT Schedule</div>
            </div>
            <ExternalLink className="w-4 h-4 text-navy/40 group-hover:text-navy" />
          </a>
          <a
            href="https://www.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white border border-navy/15 rounded-xl hover:border-navy/40 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-navy group-hover:text-steel">SEBI (Stock Brokers) Regulations</div>
              <div className="text-navy/60 text-[11px]">Schedule IV turnover fee provisions</div>
            </div>
            <ExternalLink className="w-4 h-4 text-navy/40 group-hover:text-navy" />
          </a>
          <a
            href="https://cbic-gst.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white border border-navy/15 rounded-xl hover:border-navy/40 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-navy group-hover:text-steel">CBIC GST Financial Services</div>
              <div className="text-navy/60 text-[11px]">Section 15 taxable brokerage rules</div>
            </div>
            <ExternalLink className="w-4 h-4 text-navy/40 group-hover:text-navy" />
          </a>
          <a
            href="https://zerodha.com/charge-list"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white border border-navy/15 rounded-xl hover:border-navy/40 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-navy group-hover:text-steel">Zerodha Brokerage Tariff</div>
              <div className="text-navy/60 text-[11px]">MIS equity ₹20 cap execution rules</div>
            </div>
            <ExternalLink className="w-4 h-4 text-navy/40 group-hover:text-navy" />
          </a>
        </div>
      </section>

      {/* Section 7 - FAQ */}
      <section className="space-y-6 pt-6 border-t border-navy/10">
        <h2 className="text-2xl sm:text-3xl font-black text-navy flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-steel" /> Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">Is Securities Transaction Tax (STT) charged on intraday loss in India?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Yes. STT is an execution-level statutory tax applied strictly to sell-side turnover at 0.025%. It is debited automatically by the clearing corporation regardless of whether the trader books a profit or a loss.
            </p>
          </div>
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">Why is intraday STT lower than delivery STT?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Delivery trades require full transfer of ownership in the Demat registry, attracting 0.1% STT on both buy and sell legs. Intraday equity settles purely on cash price differentials, attracting a concessional 0.025% levy on the sell leg only.
            </p>
          </div>
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">What is the auto-square-off penalty on discount brokers?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Open MIS positions remaining at market close (typically 15:15 to 15:25 IST) are automatically squared off by the broker&apos;s Risk Management System (RMS). Brokers charge an administrative fee of ₹50 + 18% GST (₹59 total) per order.
            </p>
          </div>
          <div className="p-5 bg-white border border-navy/15 rounded-2xl space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-sm text-navy">How does discount brokerage cap at 20 rupees?</h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Brokers apply min(₹20, 0.03% × Turnover). For any order leg with turnover exceeding ₹66,666.67, 0.03% exceeds ₹20, triggering the statutory cap of flat ₹20 per executed order.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="p-4 bg-sage/20 border border-navy/15 rounded-2xl text-[11px] text-navy/60 leading-relaxed flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-steel shrink-0 mt-0.5" />
        <div>
          <strong>Regulatory Disclaimer:</strong> The calculations, tax schedules, and quantitative models published on MyCalculators reflect prevailing Indian market standards (SEBI, NSE, BSE, Central Board of Direct Taxes). Results are for educational and mathematical modeling purposes and do not constitute financial advice or trade recommendations.
        </div>
      </footer>
    </article>
  );
}
