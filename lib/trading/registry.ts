// ============================================================================
// INDEPENDENT TRADING TOOLS REGISTRY (PHASE 0)
// Never imports lib/registry.ts. Dedicated to the 16 trading categories.
// ============================================================================

import { TradingCategory, TradingCategoryMeta, TradingToolDefinition } from "./types";

export const TRADING_CATEGORIES: TradingCategoryMeta[] = [
  {
    id: "pnl-trades",
    name: "P&L & Trade Calculators",
    tagline: "Track and forecast profit realization",
    description: "Intraday, delivery, multi-entry averages, and target profit calculators.",
    badgeColor: "text-[#00f59b]",
  },
  {
    id: "risk-management",
    name: "Risk Management",
    tagline: "Defend account drawdown",
    description: "Position sizing, risk-to-reward ratios, stop-loss percentages, and ruin models.",
    badgeColor: "text-amber-400",
  },
  {
    id: "performance",
    name: "Trading Performance",
    tagline: "Statistical strategy audit",
    description: "Win rate expectancies, Profit Factors, Sharpe, and Sortino ratios.",
    badgeColor: "text-[#00d8f6]",
  },
  {
    id: "compounding",
    name: "Compounding & Growth",
    tagline: "Simulate portfolio progression",
    description: "Daily reinvestment targets, Kelly Criterion, and time-to-target calculations.",
    badgeColor: "text-purple-400",
  },
  {
    id: "charges-brokerage",
    name: "Brokerage & Trading Charges",
    tagline: "Indian broker regulatory taxes",
    description: "STT, Exchange Turnover, SEBI fees, Stamp Duty, and 18% GST friction analysis.",
    badgeColor: "text-rose-400",
  },
  {
    id: "options",
    name: "Options Trading",
    tagline: "Option pricing and Greeks",
    description: "Call/Put payoffs, Moneyness (ITM/ATM/OTM), and intrinsic vs extrinsic value.",
    badgeColor: "text-emerald-400",
  },
  {
    id: "options-strategies",
    name: "Options Strategy Tools",
    tagline: "Multi-leg strategies",
    description: "Spreads, straddles, strangles, Iron Condor, and Iron Butterfly simulators.",
    badgeColor: "text-cyan-400",
  },
  {
    id: "technical-analysis",
    name: "Technical Analysis",
    tagline: "Mathematical price indicators",
    description: "Pivots (CPR, Camarilla), Fibonacci retracements, and ATR volatility limits.",
    badgeColor: "text-blue-400",
  },
  {
    id: "candlestick-patterns",
    name: "Candlestick Tools",
    tagline: "Pattern recognition math",
    description: "Wick-to-body ratios for Pin Bars, Hammers, Dojis, and Engulfing structures.",
    badgeColor: "text-teal-400",
  },
  {
    id: "portfolio-market",
    name: "Portfolio & Market Tools",
    tagline: "Asset allocation",
    description: "Portfolio rebalancing, stock weights, XIRR returns, and sector exposures.",
    badgeColor: "text-indigo-400",
  },
  {
    id: "psychology-discipline",
    name: "Trading Psychology & Discipline",
    tagline: "Emotional risk guardrails",
    description: "Revenge trading risk meters, FOMO checkers, and pre-trade decision scores.",
    badgeColor: "text-amber-500",
  },
  {
    id: "journal-analytics",
    name: "Trading Journal & Analytics",
    tagline: "Client-side trade logging",
    description: "Time-of-day analytics, equity curves, and CSV execution exports.",
    badgeColor: "text-slate-300",
  },
  {
    id: "ai-trading",
    name: "AI Trading Tools",
    tagline: "Algorithmic decision helpers",
    description: "Trade plan evaluation, post-trade reviews, and strategy comparison matrices.",
    badgeColor: "text-pink-400",
  },
  {
    id: "futures-leverage",
    name: "Futures & Leverage",
    tagline: "Margin and contract dynamics",
    description: "Margin utilization, lot sizes, contract values, and liquidation levels.",
    badgeColor: "text-orange-400",
  },
  {
    id: "forex-crypto",
    name: "Forex & Crypto",
    tagline: "Decentralized & currency tools",
    description: "Pip value calculators, crypto liquidation points, and dollar-cost averaging (DCA).",
    badgeColor: "text-yellow-400",
  },
  {
    id: "trader-intelligence",
    name: "Trader Intelligence",
    tagline: "Trade feasibility verification",
    description: "Trade reality checkers, loss recovery matrices, and 100-trade scenario runs.",
    badgeColor: "text-[#00f59b]",
  },
];

export const TRADING_TOOLS: TradingToolDefinition[] = [
  {
    slug: "intraday-pnl-calculator",
    name: "Intraday P&L Calculator",
    shortDescription: "Calculate gross & net profit/loss, point movements, and return on trade capital.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["intraday pnl calculator", "share market profit calculator", "day trading profit calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Gross P&L = (Exit Price - Entry Price) × Quantity [for Longs]",
    formulaVariables: [
      { symbol: "Entry Price", label: "Trade fill price at entry" },
      { symbol: "Exit Price", label: "Target or square-off price" },
      { symbol: "Quantity", label: "Number of traded shares or units" },
    ],
    workedExample: {
      scenario: "Buying 100 shares of an equity stock at ₹500 and squaring off at ₹540 intraday.",
      inputs: { "Entry Price": "₹500.00", "Exit Price": "₹540.00", "Quantity": "100 Units" },
      result: "Gross Profit: +₹4,000.00 (+8.00% Return on Capital)",
      explanation: "A +40 point move on 100 shares generates ₹4,000 gross profit on an invested trade value of ₹50,000.",
    },
    assumptions: ["Taxes, STT, and broker commissions are evaluated independently in the Brokerage tool."],
    faqs: [
      { q: "How is intraday P&L calculated?", a: "Multiply the difference between exit and entry price by total quantity." },
    ],
    relatedTradingSlugs: ["position-size-calculator", "brokerage-charges-calculator"],
  },
  {
    slug: "position-size-calculator",
    name: "Position Size Calculator",
    shortDescription: "Compute exact share quantities so account risk is capped strictly at 1% to 2%.",
    category: "risk-management",
    renderer: "position-size",
    keywords: ["position size calculator", "risk management calculator", "trading lot size"],
    popular: true,
    status: "active",
    formulaDescription: "Allowable Quantity = (Account Capital × Risk %) / |Entry Price - Stop Loss Price|",
    formulaVariables: [
      { symbol: "Account Capital", label: "Total active trading equity" },
      { symbol: "Risk %", label: "Max percentage willing to lose on this trade (typically 1-2%)" },
      { symbol: "Per Share Risk", label: "Distance between Entry and Stop Loss" },
    ],
    workedExample: {
      scenario: "₹2,00,000 account risking 1.5% with entry at ₹450 and stop-loss at ₹435.",
      inputs: { "Account Capital": "₹2,00,000", "Risk %": "1.5%", "Entry": "₹450", "Stop-Loss": "₹435" },
      result: "Quantity: 200 Shares | Total Risk: ₹3,000.00",
      explanation: "Per share risk is ₹15. Dividing allowable ₹3,000 risk by ₹15 yields 200 shares.",
    },
    assumptions: ["Slippage during adverse market gaps is not included in the strict formula."],
    faqs: [
      { q: "Why is position sizing critical?", a: "It prevents any single trade from inflicting catastrophic portfolio drawdown." },
    ],
    relatedTradingSlugs: ["intraday-pnl-calculator", "brokerage-charges-calculator"],
  },
  {
    slug: "brokerage-charges-calculator",
    name: "Brokerage & Statutory Charges Calculator",
    shortDescription: "Calculate STT, GST (18%), exchange turnover fees, SEBI charges, and net break-even.",
    category: "charges-brokerage",
    renderer: "brokerage",
    keywords: ["zerodha brokerage calculator", "groww charges", "stt calculator", "trading taxes"],
    popular: true,
    status: "active",
    formulaDescription: "Total Frictions = Flat Brokerage + STT + Exchange Charges + SEBI Turnover Fee + Stamp Duty + 18% GST",
    formulaVariables: [
      { symbol: "Brokerage", label: "Flat ₹20/order or percentage ceiling" },
      { symbol: "GST", label: "18% applied to brokerage and exchange transaction fees" },
    ],
    workedExample: {
      scenario: "₹1,00,000 intraday turnover executed across 2 orders.",
      inputs: { "Turnover": "₹1,00,000", "Orders": "2 Executions" },
      result: "Total Charges: ~₹80.50 (including ₹40 Brokerage + Taxes)",
      explanation: "Account covers flat broker fees plus statutory duties before generating net trading profit.",
    },
    assumptions: ["Standard Indian equity intraday tax schedules are applied."],
    faqs: [
      { q: "What is the biggest component of trading charges?", a: "For large turnovers, STT and GST typically surpass the broker's base fee." },
    ],
    relatedTradingSlugs: ["intraday-pnl-calculator", "position-size-calculator"],
  },
];

export function getTradingToolBySlug(slug: string): TradingToolDefinition | undefined {
  return TRADING_TOOLS.find((t) => t.slug === slug);
}

export function getTradingToolsByCategory(cat: TradingCategory): TradingToolDefinition[] {
  return TRADING_TOOLS.filter((t) => t.category === cat);
}

export function getAllTradingTools(): TradingToolDefinition[] {
  return TRADING_TOOLS;
}
