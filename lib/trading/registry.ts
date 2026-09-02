// ============================================================================
// INDEPENDENT TRADING REGISTRY — PHASE 1 TOOLS
// Completely isolated from lib/registry.ts. Zero old-calculator imports.
// ============================================================================

import { TradingCategory, TradingCategoryMeta, TradingToolDefinition } from "./types";

export const TRADING_CATEGORIES: TradingCategoryMeta[] = [
  {
    id: "pnl-trades",
    name: "P&L & Trade Calculators",
    tagline: "Profit & Loss Modeling",
    description: "Intraday, delivery, multi-entry averages, and target profit calculators.",
    badgeColor: "text-steel",
  },
  {
    id: "risk-management",
    name: "Risk Management",
    tagline: "Capital Preservation",
    description: "Position sizing, risk-to-reward ratios, stop-loss limits, and ruin probability.",
    badgeColor: "text-amber-600",
  },
  {
    id: "charges-brokerage",
    name: "Brokerage & Trading Charges",
    tagline: "Regulatory Friction",
    description: "STT, Exchange Turnover, SEBI fees, Stamp Duty, and 18% GST analysis.",
    badgeColor: "text-rose-600",
  },
  {
    id: "performance",
    name: "Trading Performance",
    tagline: "Upcoming Phase",
    description: "Win rate expectancies, Profit Factors, Sharpe, and Sortino ratios.",
    badgeColor: "text-navy/50",
  },
  {
    id: "compounding",
    name: "Compounding & Growth",
    tagline: "Upcoming Phase",
    description: "Daily reinvestment targets, Kelly Criterion, and time-to-target simulations.",
    badgeColor: "text-navy/50",
  },
  {
    id: "options",
    name: "Options Trading",
    tagline: "Upcoming Phase",
    description: "Call/Put payoffs, Moneyness (ITM/ATM/OTM), and intrinsic vs extrinsic value.",
    badgeColor: "text-navy/50",
  },
  {
    id: "options-strategies",
    name: "Options Strategy Tools",
    tagline: "Upcoming Phase",
    description: "Spreads, straddles, strangles, Iron Condor, and Iron Butterfly simulators.",
    badgeColor: "text-navy/50",
  },
  {
    id: "technical-analysis",
    name: "Technical Analysis",
    tagline: "Upcoming Phase",
    description: "Pivots (CPR, Camarilla), Fibonacci retracements, and ATR volatility limits.",
    badgeColor: "text-navy/50",
  },
  {
    id: "candlestick-patterns",
    name: "Candlestick Tools",
    tagline: "Upcoming Phase",
    description: "Wick-to-body ratios for Pin Bars, Hammers, Dojis, and Engulfing structures.",
    badgeColor: "text-navy/50",
  },
  {
    id: "portfolio-market",
    name: "Portfolio & Market Tools",
    tagline: "Upcoming Phase",
    description: "Portfolio rebalancing, stock weights, XIRR returns, and sector exposures.",
    badgeColor: "text-navy/50",
  },
  {
    id: "psychology-discipline",
    name: "Trading Psychology & Discipline",
    tagline: "Upcoming Phase",
    description: "Revenge trading risk meters, FOMO checkers, and pre-trade decision scores.",
    badgeColor: "text-navy/50",
  },
  {
    id: "journal-analytics",
    name: "Trading Journal & Analytics",
    tagline: "Upcoming Phase",
    description: "Time-of-day analytics, equity curves, and CSV execution exports.",
    badgeColor: "text-navy/50",
  },
  {
    id: "ai-trading",
    name: "AI Trading Tools",
    tagline: "Upcoming Phase",
    description: "Trade plan evaluation, post-trade reviews, and strategy comparison matrices.",
    badgeColor: "text-navy/50",
  },
  {
    id: "futures-leverage",
    name: "Futures & Leverage",
    tagline: "Upcoming Phase",
    description: "Margin utilization, lot sizes, contract values, and liquidation levels.",
    badgeColor: "text-navy/50",
  },
  {
    id: "forex-crypto",
    name: "Forex & Crypto",
    tagline: "Upcoming Phase",
    description: "Pip value calculators, crypto liquidation points, and dollar-cost averaging.",
    badgeColor: "text-navy/50",
  },
  {
    id: "trader-intelligence",
    name: "Trader Intelligence",
    tagline: "Upcoming Phase",
    description: "Trade reality checkers, loss recovery matrices, and 100-trade scenario runs.",
    badgeColor: "text-navy/50",
  },
];

export const TRADING_TOOLS: TradingToolDefinition[] = [
  // --------------------------------------------------------------------------
  // 1. P&L & TRADE CALCULATORS
  // --------------------------------------------------------------------------
  {
    slug: "intraday-pnl-calculator",
    name: "Intraday P&L Calculator",
    shortDescription: "Calculate gross and net profit/loss, point movements, and trade return percentage for day trading.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["intraday pnl calculator", "day trading profit calculator", "share market profit calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Long P&L = (Exit - Entry) × Qty - Charges | Short P&L = (Entry - Exit) × Qty - Charges",
    formulaVariables: [
      { symbol: "Entry Price", label: "Initial fill price of execution" },
      { symbol: "Exit Price", label: "Square-off price at market" },
      { symbol: "Quantity", label: "Total traded shares or units" },
      { symbol: "Break-Even Exit", label: "Entry Price ± (Total Charges / Quantity)" },
    ],
    workedExample: {
      scenario: "Buying 100 shares at ₹500 and exiting at ₹540 with ₹20 total charges.",
      inputs: { "Entry": "₹500.00", "Exit": "₹540.00", "Quantity": "100", "Charges": "₹20.00" },
      result: "Gross P&L: +₹4,000.00 | Net P&L: +₹3,980.00 | Return on Capital: +7.96%",
      explanation: "A 40-point move generates ₹4,000 gross. After ₹20 in round-trip fees, net in-hand profit is ₹3,980.",
    },
    assumptions: ["Brokerage and taxes apply uniformly to round-trip execution."],
    faqs: [
      { q: "What is the difference between gross and net P&L?", a: "Gross P&L is pure price movement multiplied by shares. Net P&L deducts brokerage, STT, exchange fees, and GST." },
    ],
    relatedTradingSlugs: ["position-size-calculator", "brokerage-charges-calculator"],
  },
  {
    slug: "equity-pnl-calculator",
    name: "Equity Delivery P&L Calculator",
    shortDescription: "Calculate investment profit, cost basis, sale value, and capital gains for delivery holdings.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["equity delivery calculator", "cnc pnl calculator", "share delivery profit"],
    popular: true,
    status: "active",
    formulaDescription: "Net Return = (Sell Price × Quantity) - (Buy Price × Quantity) - Charges",
    workedExample: {
      scenario: "Buying 50 shares at ₹1,000 and selling at ₹1,200 after holding with ₹100 charges.",
      inputs: { "Buy Price": "₹1,000.00", "Sell Price": "₹1,200.00", "Quantity": "50", "Charges": "₹100.00" },
      result: "Cost Basis: ₹50,000 | Sale Value: ₹60,000 | Net Profit: +₹9,900.00 (+19.80% ROI)",
      explanation: "Capital appreciated by ₹10,000. Deducting ₹100 in regulatory and DP charges leaves ₹9,900 net gain.",
    },
    relatedTradingSlugs: ["intraday-pnl-calculator", "average-price-calculator"],
  },
  {
    slug: "target-profit-calculator",
    name: "Target Profit Price Calculator",
    shortDescription: "Determine the exact target exit price needed to hit your rupee profit goal.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["target profit calculator", "target price calculator", "profit goal exit"],
    status: "active",
    formulaDescription: "Long Target Exit = Entry Price + [(Desired Profit + Charges) / Quantity]",
    workedExample: {
      scenario: "Buying 200 shares at ₹250 targeting a net ₹5,000 profit with ₹50 estimated charges.",
      inputs: { "Entry Price": "₹250.00", "Quantity": "200", "Target Profit": "₹5,000.00", "Charges": "₹50.00" },
      result: "Required Target Price: ₹275.25 (+25.25 points move needed)",
      explanation: "To secure ₹5,050 gross (yielding ₹5,000 net after fees) across 200 shares requires an exit at ₹275.25.",
    },
    relatedTradingSlugs: ["intraday-pnl-calculator", "risk-reward-calculator"],
  },
  {
    slug: "stop-loss-calculator",
    name: "Stop-Loss Price Calculator",
    shortDescription: "Calculate exact stop-loss price corresponding to your maximum allowable rupee risk.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["stop loss price calculator", "sl price calculator", "max loss limit"],
    status: "active",
    formulaDescription: "Long Stop-Loss = Entry Price - [(Capital × Risk %) / Quantity]",
    workedExample: {
      scenario: "₹1,00,000 capital risking 1% on 100 shares bought at ₹400.",
      inputs: { "Capital": "₹1,00,000", "Risk %": "1.0%", "Quantity": "100", "Entry": "₹400.00" },
      result: "Max Risk: ₹1,000 | Stop-Loss Price: ₹390.00 (10.00 pts stop distance)",
      explanation: "Dividing allowable ₹1,000 loss by 100 shares permits a 10-point stop, placing stop-loss at ₹390.",
    },
    relatedTradingSlugs: ["position-size-calculator", "risk-reward-calculator"],
  },
  {
    slug: "average-price-calculator",
    name: "Multi-Entry Average Price Calculator",
    shortDescription: "Calculate weighted average purchase price and total investment across multiple trade legs.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["average price calculator", "stock average calculator", "weighted average price"],
    popular: true,
    status: "active",
    formulaDescription: "Weighted Average Price = Σ(Price × Quantity) / Σ Quantity",
    workedExample: {
      scenario: "Bought 100 shares at ₹100 and 200 shares at ₹85.",
      inputs: { "Leg 1": "100 @ ₹100", "Leg 2": "200 @ ₹85" },
      result: "Total Quantity: 300 | Invested: ₹27,000 | Volume-Weighted Avg: ₹90.00",
      explanation: "Total capital (₹10,000 + ₹17,000 = ₹27,000) divided by 300 total shares produces ₹90.00 average cost.",
    },
    relatedTradingSlugs: ["average-down-calculator", "equity-pnl-calculator"],
  },
  {
    slug: "average-down-calculator",
    name: "Average Down Calculator",
    shortDescription: "Calculate new blended cost basis and additional shares needed to lower your average price.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["average down calculator", "stock averaging down", "recovery average"],
    status: "active",
    formulaDescription: "New Average = (Existing Capital + New Capital) / (Existing Qty + New Qty)",
    workedExample: {
      scenario: "Holding 100 shares at ₹500; buying 100 more at ₹400.",
      inputs: { "Holding": "100 @ ₹500", "New Buy": "100 @ ₹400" },
      result: "New Combined Average: ₹450.00 | Total Shares: 200",
      explanation: "Investing ₹40,000 more brings your total cost to ₹90,000 across 200 shares, lowering average to ₹450.",
    },
    relatedTradingSlugs: ["average-price-calculator", "equity-pnl-calculator"],
  },

  // --------------------------------------------------------------------------
  // 2. RISK MANAGEMENT TOOLS
  // --------------------------------------------------------------------------
  {
    slug: "position-size-calculator",
    name: "Position Size Calculator",
    shortDescription: "Determine exact share quantity so trade loss is strictly capped at 1% to 2% of capital.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["position size calculator", "risk per trade calculator", "lot size calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Allowable Quantity = ⌊(Account Capital × Risk %) / |Entry Price - Stop Loss|⌋",
    formulaVariables: [
      { symbol: "Account Capital", label: "Total active trading balance" },
      { symbol: "Risk %", label: "Maximum allowable risk percentage (1-2%)" },
      { symbol: "Per Share Risk", label: "Difference between Entry and Stop Loss" },
    ],
    workedExample: {
      scenario: "₹2,00,000 capital risking 1.5% with entry at ₹450 and stop-loss at ₹435.",
      inputs: { "Capital": "₹2,00,000", "Risk %": "1.5%", "Entry": "₹450.00", "SL": "₹435.00" },
      result: "Allowable Quantity: 200 Shares | Total Risk: ₹3,000.00 | Position Value: ₹90,000",
      explanation: "Risk per share is ₹15. Allowable risk is ₹3,000. ₹3,000 / ₹15 = exactly 200 shares.",
    },
    assumptions: ["Quantities are rounded down to conservative whole integers."],
    faqs: [
      { q: "Why should risk per trade not exceed 2%?", a: "Limiting risk to 1-2% protects accounts against strings of consecutive losses without triggering catastrophic drawdown." },
    ],
    relatedTradingSlugs: ["risk-reward-calculator", "drawdown-recovery-calculator"],
  },
  {
    slug: "risk-reward-calculator",
    name: "Risk/Reward Ratio Calculator",
    shortDescription: "Calculate risk-to-reward ratio, reward multiplier, and required break-even win rate.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["risk reward calculator", "rr ratio calculator", "reward to risk"],
    popular: true,
    status: "active",
    formulaDescription: "Reward/Risk = |Target - Entry| / |Entry - Stop Loss| | Break-Even Win Rate = 1 / (1 + RR)",
    workedExample: {
      scenario: "Long setup with Entry at ₹100, Stop Loss at ₹95, and Target at ₹115.",
      inputs: { "Entry": "₹100.00", "SL": "₹95.00", "Target": "₹115.00" },
      result: "Risk: 5.00 pts | Reward: 15.00 pts | R:R Ratio: 1 : 3.00 | Break-Even Win Rate: 25.0%",
      explanation: "A 1:3 risk/reward ratio means the trade remains statistically profitable over time with only a 25% win rate.",
    },
    relatedTradingSlugs: ["position-size-calculator", "risk-of-ruin-calculator"],
  },
  {
    slug: "drawdown-recovery-calculator",
    name: "Drawdown Recovery Calculator",
    shortDescription: "Determine the nonlinear percentage gain required to restore capital after an account drawdown.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["drawdown recovery calculator", "drawdown calculator", "loss recovery percentage"],
    popular: true,
    status: "active",
    formulaDescription: "Required Recovery % = [Drawdown % / (100 - Drawdown %)] × 100",
    workedExample: {
      scenario: "An account suffers a 50% drawdown from ₹1,00,000 down to ₹50,000.",
      inputs: { "Drawdown": "50.0%", "Starting Capital": "₹1,00,000" },
      result: "Capital Left: ₹50,000 | Required Recovery Gain: +100.00% (Needs ₹50,000 gain)",
      explanation: "Because the capital base shrunk by half, recovering back to the starting corpus requires doubling the balance (100% gain).",
    },
    relatedTradingSlugs: ["position-size-calculator", "daily-loss-limit-calculator"],
  },
  {
    slug: "daily-loss-limit-calculator",
    name: "Daily Loss Limit Calculator",
    shortDescription: "Calculate daily loss thresholds and monitor remaining loss capacity to prevent overtrading.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["daily loss limit calculator", "overtrading prevention", "max loss limit"],
    status: "active",
    formulaDescription: "Remaining Allowance = (Capital × Max Loss %) - (Realized Loss + Unrealized Loss)",
    workedExample: {
      scenario: "₹5,00,000 capital with a 2% daily loss rule, having lost ₹6,000 so far today.",
      inputs: { "Capital": "₹5,00,000", "Daily Limit %": "2.0%", "Current Loss": "₹6,00,000" },
      result: "Max Daily Limit: ₹10,000 | Remaining Buffer: ₹4,000.00 (60.0% Capacity Used)",
      explanation: "You have ₹4,000 in risk capacity left before your discipline rule mandates closing terminals.",
    },
    relatedTradingSlugs: ["drawdown-recovery-calculator", "position-size-calculator"],
  },
  {
    slug: "risk-of-ruin-calculator",
    name: "Risk of Ruin Calculator",
    shortDescription: "Simulate probability of account bankruptcy based on edge, win rate, and risk per trade.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["risk of ruin calculator", "gamblers ruin trading", "ruin probability"],
    status: "active",
    formulaDescription: "Ruin Probability = [(1 - Edge) / (1 + Edge)]^(Capital Units)",
    workedExample: {
      scenario: "55% win rate, 1.5 payoff ratio, and 2% risk per trade.",
      inputs: { "Win Rate": "55%", "Payoff": "1.5", "Risk %": "2.0%" },
      result: "Mathematical Edge: +0.375 | Statistical Risk of Ruin: < 0.01%",
      explanation: "With positive mathematical expectancy and conservative 2% risk, probability of ruin is statistically negligible.",
    },
    relatedTradingSlugs: ["risk-reward-calculator", "position-size-calculator"],
  },

  // --------------------------------------------------------------------------
  // 3. BROKERAGE & STATUTORY CHARGES TOOLS
  // --------------------------------------------------------------------------
  {
    slug: "brokerage-charges-calculator",
    name: "Indian Brokerage & Taxes Calculator",
    shortDescription: "Calculate STT, GST (18%), exchange turnover fees, SEBI charges, and net break-even for Zerodha, Groww, and Angel One.",
    category: "charges-brokerage",
    renderer: "brokerage",
    keywords: ["zerodha brokerage calculator", "groww charges calculator", "stt calculator", "share market taxes"],
    popular: true,
    status: "active",
    formulaDescription: "Total Frictions = Brokerage + STT + Exchange Charges + SEBI Fees + Stamp Duty + GST (18% on fees)",
    formulaVariables: [
      { symbol: "STT", label: "Intraday: 0.025% on Sell | Delivery: 0.1% on Buy & Sell" },
      { symbol: "Exchange Charges", label: "NSE: 0.00297% on total turnover" },
      { symbol: "SEBI Fee", label: "₹10 per crore (0.0001% of turnover)" },
      { symbol: "Stamp Duty", label: "Buy side only: 0.003% intraday, 0.015% delivery" },
      { symbol: "GST", label: "18% strictly on (Brokerage + Exchange + SEBI)" },
    ],
    workedExample: {
      scenario: "Buying 100 shares at ₹1,000 and selling at ₹1,050 intraday via Zerodha.",
      inputs: { "Buy": "100 @ ₹1,000", "Sell": "100 @ ₹1,050", "Broker": "Zerodha", "Segment": "Intraday" },
      result: "Gross P&L: +₹5,000.00 | Total Charges: -₹86.42 | Net In-Pocket: +₹4,913.58",
      explanation: "Turnover is ₹2,05,000. Brokerage is ₹40, STT is ₹26, Stamp Duty is ₹3, GST is ₹8.30, yielding net ₹4,913.58.",
    },
    assumptions: [
      "Official statutory rates as per NSE, SEBI, and Indian Stamp Act schedules.",
      "GST is calculated on fee components only and never on taxes like STT or Stamp Duty.",
    ],
    faqs: [
      { q: "Why is GST not applied to STT or Stamp Duty?", a: "Under Indian Tax Laws, GST applies strictly to taxable services (brokerage, exchange turnover, SEBI fees), not on statutory taxes." },
    ],
    relatedTradingSlugs: ["intraday-pnl-calculator", "break-even-after-brokerage-calculator"],
  },
  {
    slug: "break-even-after-brokerage-calculator",
    name: "Break-Even Price After Charges Calculator",
    shortDescription: "Calculate the exact ticks and exit price needed to fully recover all brokerage and regulatory taxes.",
    category: "charges-brokerage",
    renderer: "brokerage",
    keywords: ["break even after charges", "zerodha breakeven calculator", "brokerage breakeven"],
    status: "active",
    formulaDescription: "Break-Even Exit = Buy Price + (Total Estimated Charges / Quantity)",
    workedExample: {
      scenario: "Buying 500 shares of an equity stock at ₹200 intraday on Zerodha.",
      inputs: { "Buy Price": "₹200.00", "Quantity": "500", "Segment": "Intraday" },
      result: "Break-Even Points: +₹0.16 | Minimum Profitable Exit: ₹200.16",
      explanation: "A 16-paise gain on 500 shares fully covers all round-trip brokerage, STT, exchange fees, and GST.",
    },
    relatedTradingSlugs: ["brokerage-charges-calculator", "intraday-pnl-calculator"],
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
