import { TradingCategory, TradingCategoryMeta, TradingToolDefinition } from "./types";

export const TRADING_CATEGORIES: TradingCategoryMeta[] = [
  { id: "options", name: "Options Trading", tagline: "Options Mechanics", description: "Payoffs, breakevens, and moneyness calculations.", badgeColor: "text-emerald-700" },
  { id: "options-strategies", name: "Options Strategy Tools", tagline: "Multi-Leg Spreads", description: "Spreads, straddles, and condors with SVG curves.", badgeColor: "text-cyan-700" },
  { id: "futures-leverage", name: "Futures & Leverage", tagline: "Derivatives Risk", description: "Futures P&L, contract sizes, and margin utilization.", badgeColor: "text-orange-700" },
  { id: "forex-crypto", name: "Forex & Crypto", tagline: "Currency Tools", description: "Pip value calculators, lot sizing, and DCA.", badgeColor: "text-indigo-700" },
  { id: "pnl-trades", name: "P&L & Trade Calculators", tagline: "Profit & Loss Modeling", description: "Intraday, delivery, and target profit calculators.", badgeColor: "text-steel" },
  { id: "risk-management", name: "Risk Management", tagline: "Capital Preservation", description: "Position sizing, risk-to-reward ratios, and drawdown.", badgeColor: "text-amber-700" },
  { id: "charges-brokerage", name: "Brokerage & Trading Charges", tagline: "Regulatory Friction", description: "STT, Exchange Turnover, SEBI fees, and GST.", badgeColor: "text-rose-700" },
  { id: "performance", name: "Advanced Trade Analysis & Performance", tagline: "Expectancy & Strategy Audit", description: "Expectancy, profit factor, win rates, and ratios.", badgeColor: "text-emerald-800" },
  { id: "trade-management", name: "Trade Management & Execution", tagline: "Volatility & Trailing Guardrails", description: "ATR stops, position scaling, and scale-out targets.", badgeColor: "text-teal-800" },
];

export const TRADING_TOOLS: TradingToolDefinition[] = [
  // 1. P&L & TRADE CALCULATORS (6 TOOLS)
  {
    slug: "intraday-pnl-calculator",
    name: "Intraday P&L Calculator",
    shortDescription: "Calculate gross and net profit/loss, point moves, and return on capital for day trading.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["intraday pnl calculator", "day trading profit"],
    popular: true,
    status: "active",
    formulaDescription: "Long P&L = (Exit - Entry) × Qty - Charges | Short P&L = (Entry - Exit) × Qty - Charges",
    workedExample: { scenario: "100 shares @ ₹500 sold @ ₹540 with ₹20 charges.", inputs: { "Entry": "₹500.00", "Exit": "₹540.00", "Quantity": "100" }, result: "Net Profit: +₹3,980.00 (+7.96% ROI)", explanation: "40 points on 100 shares gives ₹4,000 minus ₹20 fees = ₹3,980." },
    faqs: [{ q: "How is intraday P&L calculated?", a: "Price movement multiplied by shares minus all transaction fees." }, { q: "What is gross vs net P&L?", a: "Gross is pure price gain; net deducts all taxes and broker commissions." }]
  },
  {
    slug: "equity-pnl-calculator",
    name: "Equity Delivery P&L Calculator",
    shortDescription: "Calculate investment profit, cost basis, sale value, and capital gains for delivery holdings.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["equity delivery calculator", "cnc pnl calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Net Return = (Sell Price × Quantity) - (Buy Price × Quantity) - Charges",
    workedExample: { scenario: "50 shares bought at ₹1,000 and sold at ₹1,200.", inputs: { "Buy": "₹1,000.00", "Sell": "₹1,200.00", "Quantity": "50" }, result: "Net Profit: +₹9,900.00 (+19.80% ROI)", explanation: "Capital gained ₹10,000 minus ₹100 fees leaves ₹9,900." },
    faqs: [{ q: "What is equity delivery?", a: "Holding shares overnight in your demat account without intraday auto-square off." }]
  },
  {
    slug: "target-profit-calculator",
    name: "Target Profit Price Calculator",
    shortDescription: "Determine the exact target exit price needed to hit your rupee profit goal.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["target profit calculator", "target price exit"],
    status: "active",
    formulaDescription: "Required Target = Entry Price + [(Target Profit + Charges) / Quantity]",
    workedExample: { scenario: "Buying 200 shares @ ₹250 targeting ₹5,000 profit.", inputs: { "Entry": "₹250.00", "Quantity": "200", "Target": "₹5,000.00" }, result: "Target Price: ₹275.25", explanation: "Need 25.25 points move to clear ₹5,000 net." },
    faqs: [{ q: "How does target profit exit work?", a: "Calculates the exact exit price that covers costs and yields your goal." }]
  },
  {
    slug: "stop-loss-calculator",
    name: "Stop-Loss Price Calculator",
    shortDescription: "Calculate exact stop-loss price corresponding to your maximum allowable rupee risk.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["stop loss price calculator", "sl calculator"],
    status: "active",
    formulaDescription: "Stop-Loss = Entry Price - [(Capital × Risk %) / Quantity]",
    workedExample: { scenario: "₹1,00,000 capital risking 1% on 100 shares @ ₹400.", inputs: { "Capital": "₹1,00,000", "Risk %": "1%", "Qty": "100" }, result: "Stop-Loss: ₹390.00 (10 pts risk)", explanation: "₹1,000 risk divided by 100 shares sets stop at ₹390." },
    faqs: [{ q: "Why use a calculated stop-loss?", a: "Prevents emotional exits by strictly tying price distance to your risk budget." }]
  },
  {
    slug: "average-price-calculator",
    name: "Multi-Entry Average Price Calculator",
    shortDescription: "Calculate weighted average purchase price and total investment across multiple trade legs.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["average price calculator", "stock average"],
    popular: true,
    status: "active",
    formulaDescription: "Volume-Weighted Average = Σ(Price × Quantity) / Σ Quantity",
    workedExample: { scenario: "100 shares @ ₹100 and 200 shares @ ₹85.", inputs: { "Leg 1": "100 @ 100", "Leg 2": "200 @ 85" }, result: "Weighted Avg: ₹90.00 (300 Shares)", explanation: "Total ₹27,000 invested across 300 shares equals ₹90.00/share." },
    faqs: [{ q: "Why use weighted average instead of simple average?", a: "Weighted average correctly accounts for unequal share quantities across buy orders." }]
  },
  {
    slug: "average-down-calculator",
    name: "Average Down Calculator",
    shortDescription: "Calculate new blended cost basis and additional shares needed to lower your average price.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["average down calculator", "stock averaging down"],
    status: "active",
    formulaDescription: "New Average = (Initial Capital + New Capital) / (Initial Qty + New Qty)",
    workedExample: { scenario: "100 shares @ ₹500; buying 100 more @ ₹400.", inputs: { "Holding": "100 @ ₹500", "Buy": "100 @ ₹400" }, result: "New Average: ₹450.00", explanation: "Investing ₹40,000 brings total to ₹90,000 across 200 shares." },
    faqs: [{ q: "Is averaging down always recommended?", a: "No, averaging down increases exposure and should only be done with high-conviction risk limits." }]
  },

  // 2. RISK MANAGEMENT (5 TOOLS)
  {
    slug: "position-size-calculator",
    name: "Position Size Calculator",
    shortDescription: "Determine exact share quantity so trade loss is strictly capped at 1% to 2% of capital.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["position size calculator", "risk sizing"],
    popular: true,
    status: "active",
    formulaDescription: "Allowable Quantity = ⌊(Account Capital × Risk %) / |Entry Price - Stop Loss|⌋",
    workedExample: { scenario: "₹2,00,000 capital risking 1.5% with entry ₹450 and stop ₹435.", inputs: { "Capital": "₹2,00,000", "Risk": "1.5%", "Gap": "₹15" }, result: "Quantity: 200 Shares | Risk: ₹3,000", explanation: "₹3,000 risk divided by ₹15 stop distance equals 200 shares." },
    faqs: [{ q: "Why is position sizing important?", a: "Protects capital so no single losing trade causes catastrophic drawdown." }]
  },
  {
    slug: "risk-reward-calculator",
    name: "Risk/Reward Ratio Calculator",
    shortDescription: "Calculate risk-to-reward ratio, reward multiplier, and required break-even win rate.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["risk reward calculator", "rr ratio"],
    popular: true,
    status: "active",
    formulaDescription: "Reward/Risk = |Target - Entry| / |Entry - Stop Loss|",
    workedExample: { scenario: "Entry ₹100, Stop ₹95, Target ₹115.", inputs: { "Entry": "₹100", "SL": "₹95", "Target": "₹115" }, result: "R:R Ratio: 1 : 3.00 | Break-Even Win Rate: 25%", explanation: "15 points reward against 5 points risk creates a 1:3 ratio." },
    faqs: [{ q: "What is an ideal risk reward ratio?", a: "A 1:2 or 1:3 ratio allows profitability even with a sub-50% win rate." }]
  },
  {
    slug: "drawdown-recovery-calculator",
    name: "Drawdown Recovery Calculator",
    shortDescription: "Determine the nonlinear percentage gain required to restore capital after an account drawdown.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["drawdown recovery calculator", "drawdown gain"],
    popular: true,
    status: "active",
    formulaDescription: "Required Gain % = [Drawdown % / (100 - Drawdown %)] × 100",
    workedExample: { scenario: "Account suffers 50% drawdown down to ₹50,000.", inputs: { "Drawdown": "50%" }, result: "Required Recovery Gain: +100.00%", explanation: "Recovering to ₹1,00,000 requires doubling remaining funds." },
    faqs: [{ q: "Why is recovery gain higher than drawdown?", a: "Losses are calculated on a larger base while recovery occurs on depleted capital." }]
  },
  {
    slug: "daily-loss-limit-calculator",
    name: "Daily Loss Limit Calculator",
    shortDescription: "Calculate daily loss thresholds and monitor remaining loss capacity to prevent overtrading.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["daily loss limit", "overtrading prevention"],
    status: "active",
    formulaDescription: "Remaining Buffer = (Capital × Daily Loss %) - Realized Loss",
    workedExample: { scenario: "₹5L capital with 2% limit, lost ₹6,000 today.", inputs: { "Capital": "₹5,00,000", "Limit": "2%", "Loss": "₹6,000" }, result: "Remaining Buffer: ₹4,00,000", explanation: "₹4,000 capacity left before closing terminals." },
    faqs: [{ q: "What should I do if my daily limit is hit?", a: "Stop trading immediately for the day to avoid emotional revenge trades." }]
  },
  {
    slug: "risk-of-ruin-calculator",
    name: "Risk of Ruin Calculator",
    shortDescription: "Simulate probability of account bankruptcy based on edge, win rate, and risk per trade.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["risk of ruin calculator", "gamblers ruin"],
    status: "active",
    formulaDescription: "Ruin Probability = [(1 - Edge) / (1 + Edge)]^(Capital Units)",
    workedExample: { scenario: "55% win rate, 1.5 payoff ratio, 2% risk/trade.", inputs: { "Win Rate": "55%", "Payoff": "1.5", "Risk": "2%" }, result: "Risk of Ruin: < 0.01%", explanation: "Positive statistical edge keeps bankruptcy probability near zero." },
    faqs: [{ q: "What is risk of ruin?", a: "The probability of losing so much capital that trading cannot continue." }]
  },

  // 3. INDIAN BROKERAGE & TAXES (2 TOOLS)
  {
    slug: "brokerage-charges-calculator",
    name: "Indian Brokerage & Taxes Calculator",
    shortDescription: "Calculate STT, GST (18%), exchange turnover fees, SEBI charges, and net break-even for Zerodha, Groww, and Angel One.",
    category: "charges-brokerage",
    renderer: "brokerage",
    keywords: ["brokerage calculator", "zerodha charges", "stt calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Total Frictions = Brokerage + STT + Exchange Charges + SEBI Fees + Stamp Duty + GST (18%)",
    workedExample: { scenario: "100 shares @ ₹1,000 sold @ ₹1,050 intraday.", inputs: { "Buy": "₹1,000", "Sell": "₹1,050", "Broker": "Zerodha" }, result: "Gross: ₹5,000 | Total Charges: -₹83.63 | Net: ₹4,916.37", explanation: "Brokerage is ₹40, STT is ₹26, GST is ₹8.33." },
    faqs: [{ q: "What is STT in India?", a: "Securities Transaction Tax charged by the government on equity sales." }]
  },
  {
    slug: "break-even-after-brokerage-calculator",
    name: "Break-Even Price After Charges Calculator",
    shortDescription: "Calculate the exact ticks and exit price needed to fully recover all brokerage and regulatory taxes.",
    category: "charges-brokerage",
    renderer: "brokerage",
    keywords: ["break even after charges", "zerodha breakeven"],
    status: "active",
    formulaDescription: "Break-Even Exit = Buy Price + (Total Estimated Charges / Quantity)",
    workedExample: { scenario: "500 shares bought @ ₹200 on Zerodha.", inputs: { "Buy": "₹200", "Qty": "500" }, result: "Break-Even Move: +₹0.16 | Exit: ₹200.16", explanation: "16-paise price increase covers all round-trip fees." },
    faqs: [{ q: "Why does break-even matter?", a: "Ensures you know the minimum profit tick required before executing a trade." }]
  },

  // 4. OPTIONS MECHANICS & STRATEGIES (8 TOOLS)
  {
    slug: "call-option-payoff-calculator",
    name: "Call Option Payoff Calculator",
    shortDescription: "Calculate intrinsic payoff, net profit/loss, and expiry breakeven for long and short call contracts.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["call option payoff", "call option calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Long Call Profit = max(Spot - Strike, 0) - Premium",
    workedExample: { scenario: "1 lot (50 units) 24,500 Call @ ₹180, expiring @ 24,800.", inputs: { "Strike": "24,500", "Prem": "180", "Spot": "24,800" }, result: "Net Profit: +₹6,000.00 | Breakeven: ₹24,680", explanation: "Intrinsic value ₹300 minus ₹180 premium = ₹120 net × 50 units." },
    faqs: [{ q: "What is call option payoff?", a: "Cash realization at expiration before deducting purchase premium." }]
  },
  {
    slug: "put-option-payoff-calculator",
    name: "Put Option Payoff Calculator",
    shortDescription: "Calculate put option intrinsic value, expiry profit/loss, and downside breakeven price.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["put option payoff", "put option calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Long Put Profit = max(Strike - Spot, 0) - Premium",
    workedExample: { scenario: "1 lot (50 units) 24,500 Put @ ₹180, expiring @ 24,100.", inputs: { "Strike": "24,500", "Prem": "180", "Spot": "24,100" }, result: "Net Profit: +₹11,000.00 | Breakeven: ₹24,320", explanation: "Intrinsic value ₹400 minus ₹180 premium = ₹220 net × 50 units." },
    faqs: [{ q: "What is put option payoff?", a: "Value realized at expiration from the right to sell at strike." }]
  },
  {
    slug: "options-moneyness-calculator",
    name: "Options Moneyness & Intrinsic Value Calculator",
    shortDescription: "Determine In-The-Money (ITM), At-The-Money (ATM), and Out-of-The-Money (OTM) status and time value.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["options moneyness", "itm atm otm calculator"],
    status: "active",
    formulaDescription: "Call Intrinsic = max(Spot - Strike, 0) | Time Value = Premium - Intrinsic",
    workedExample: { scenario: "Nifty @ 24,620 with 24,500 Call @ ₹210.", inputs: { "Spot": "24,620", "Strike": "24,500" }, result: "Status: ITM | Intrinsic: ₹120 | Time Value: ₹90", explanation: "Spot is 120 points above strike; remaining ₹90 is extrinsic time value." },
    faqs: [{ q: "What does ITM mean?", a: "Option possesses positive immediate exercise value." }]
  },
  {
    slug: "options-breakeven-calculator",
    name: "Options Breakeven Calculator",
    shortDescription: "Calculate the exact underlying price needed at expiry to break even on Calls and Puts.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["options breakeven", "call breakeven", "put breakeven"],
    status: "active",
    formulaDescription: "Call BE = Strike + Premium | Put BE = Strike - Premium",
    workedExample: { scenario: "Buying 24,200 Put @ ₹140 premium.", inputs: { "Strike": "24,200", "Premium": "₹140" }, result: "Breakeven: ₹24,060.00", explanation: "Underlying must drop below ₹24,060 for net profit." },
    faqs: [{ q: "Why is breakeven different from strike?", a: "Underlying must move enough to recover the upfront premium paid." }]
  },
  {
    slug: "bull-call-spread-calculator",
    name: "Bull Call Spread Calculator",
    shortDescription: "Simulate two-leg debit call spread payoffs, maximum profit caps, and net debit risk with SVG charts.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["bull call spread", "call spread calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Max Profit = (Upper K - Lower K - Net Debit) × Qty | Max Loss = Net Debit",
    workedExample: { scenario: "Buy 24,500 Call @ 190, Sell 25,000 Call @ 60 on 50 units.", inputs: { "Lower K": "24,500", "Upper K": "25,000", "Net Debit": "130" }, result: "Max Profit: +₹18,500 | Max Risk: -₹6,500", explanation: "Spread width 500 minus 130 debit = 370 points × 50 = ₹18,500." },
    faqs: [{ q: "What is a bull call spread?", a: "A defined-risk moderately bullish options strategy." }]
  },
  {
    slug: "bear-put-spread-calculator",
    name: "Bear Put Spread Calculator",
    shortDescription: "Simulate vertical debit put spread returns, capped downside profit, and breakeven levels.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["bear put spread", "debit put spread"],
    popular: true,
    status: "active",
    formulaDescription: "Max Profit = (Upper K - Lower K - Net Debit) × Qty | Max Loss = Net Debit",
    workedExample: { scenario: "Buy 24,500 Put @ 160, Sell 24,000 Put @ 45 on 50 units.", inputs: { "Upper K": "24,500", "Lower K": "24,000", "Net Debit": "115" }, result: "Max Profit: +₹19,250 | Max Risk: -₹5,750", explanation: "385 points max gain if spot expires below 24,000." },
    faqs: [{ q: "What is a bear put spread?", a: "A defined-risk moderately bearish vertical options spread." }]
  },
  {
    slug: "long-straddle-calculator",
    name: "Long Straddle Payoff Calculator",
    shortDescription: "Calculate dual breakevens and unlimited volatility expansion payoffs on ATM Call + Put combinations.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["long straddle", "straddle options"],
    popular: true,
    status: "active",
    formulaDescription: "Lower BE = Strike - Combined Premium | Upper BE = Strike + Combined Premium",
    workedExample: { scenario: "Buy 24,500 Call @ 180 and Put @ 170 on 50 units.", inputs: { "Strike": "24,500", "Total Prem": "350" }, result: "Lower BE: ₹24,150 | Upper BE: ₹24,850 | Max Loss: -₹17,500", explanation: "Profits if spot finishes below 24,150 or above 24,850." },
    faqs: [{ q: "When to use a straddle?", a: "When expecting explosive volatility regardless of direction." }]
  },
  {
    slug: "iron-condor-calculator",
    name: "Iron Condor Strategy Calculator",
    shortDescription: "Model 4-leg market-neutral credit condors with defined risk wings, dual breakevens, and net credit collection.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["iron condor calculator", "4 leg options"],
    popular: true,
    status: "active",
    formulaDescription: "Max Profit = Net Credit | Max Loss = Wing Width - Net Credit",
    workedExample: { scenario: "Sell 24,100P/24,800C; Buy 23,800P/25,100C. Net Credit: ₹110.", inputs: { "Wings": "300 pts", "Credit": "110 pts" }, result: "Max Profit: +₹5,500 | Max Loss: -₹9,500", explanation: "Full credit retained if underlying consolidates in range." },
    faqs: [{ q: "What is an iron condor?", a: "A range-bound 4-leg credit strategy with protected wings." }]
  },

  // 5. FUTURES & LEVERAGE (5 TOOLS)
  {
    slug: "futures-pnl-calculator",
    name: "Futures P&L Calculator",
    shortDescription: "Calculate futures trade profit, points gained, notional exposure, and return on deposited margin.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures pnl calculator", "nifty futures"],
    popular: true,
    status: "active",
    formulaDescription: "Futures P&L = (Exit - Entry) × Lots × Lot Size",
    workedExample: { scenario: "2 lots (100 units) Nifty Futures bought @ 24,500 sold @ 24,750.", inputs: { "Entry": "24,500", "Exit": "24,750", "Lots": "2" }, result: "Points: +250 pts | Net P&L: +₹25,000.00", explanation: "250 points on 100 units = ₹25,000 gross gain." },
    faqs: [{ q: "How is futures P&L calculated?", a: "Points movement multiplied by total lot units." }]
  },
  {
    slug: "futures-margin-calculator",
    name: "Futures Margin & Leverage Calculator",
    shortDescription: "Determine initial SPAN + Exposure margin requirements, effective leverage, and margin utilization.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures margin", "span margin"],
    popular: true,
    status: "active",
    formulaDescription: "Initial Margin = Notional Value × Margin Rate % | Leverage = 100 / Margin %",
    workedExample: { scenario: "Notional ₹24.5L with 12% margin.", inputs: { "Notional": "₹24,50,000", "Margin": "12%" }, result: "Margin Needed: ₹2,94,000 | Leverage: 8.3x", explanation: "₹2.94 Lakh margin controls ₹24.50 Lakh notional contract value." },
    faqs: [{ q: "What is SPAN margin?", a: "Standard exchange portfolio risk margin required to hold futures." }]
  },
  {
    slug: "liquidation-price-calculator",
    name: "Estimated Liquidation Price Calculator",
    shortDescription: "Estimate liquidation price based on leverage multiplier and maintenance margin buffer.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["liquidation price", "crypto liquidation"],
    status: "active",
    formulaDescription: "Long Liq = Entry × [1 - (1 / Leverage) + Maintenance Margin %]",
    workedExample: { scenario: "Long entry @ 24,500 with 10x leverage and 0.5% maintenance margin.", inputs: { "Entry": "24,500", "Leverage": "10x" }, result: "Estimated Liquidation: ₹22,172.50 (-9.50%)", explanation: "9.50% adverse drop reaches margin wipeout threshold." },
    faqs: [{ q: "What is liquidation price?", a: "Price at which losses consume initial margin, forcing liquidation." }]
  },
  {
    slug: "futures-risk-calculator",
    name: "Futures Position Risk Calculator",
    shortDescription: "Evaluate contract risk, reward distance, and account exposure on open futures legs.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures risk", "futures trade risk"],
    status: "active",
    formulaDescription: "Total Risk = |Entry - Stop| × Lots × Lot Size",
    workedExample: { scenario: "2 lots Nifty with 50-point stop loss.", inputs: { "Lots": "2", "Lot Size": "50", "Stop": "50 pts" }, result: "Total Risk: ₹5,000.00", explanation: "50 points risk on 100 units equals ₹5,000 maximum loss." },
    faqs: [{ q: "How to manage futures risk?", a: "Predefine stop points before entering leverage contracts." }]
  },
  {
    slug: "futures-contract-quantity-calculator",
    name: "Futures Contract Quantity Calculator",
    shortDescription: "Calculate allowable futures lots based on risk budget and stop-loss distance.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures quantity", "futures lot sizing"],
    status: "active",
    formulaDescription: "Allowable Lots = ⌊(Capital × Risk %) / (|Entry - Stop| × Lot Size)⌋",
    workedExample: { scenario: "₹5L capital risking 1% with 40-point stop on Nifty (50 lot size).", inputs: { "Capital": "₹5,00,000", "Risk": "1%", "Stop": "40 pts" }, result: "Max Lots: 2 Lots (100 Units)", explanation: "₹5,000 budget divided by ₹2,000 per lot risk allows 2 lots." },
    faqs: [{ q: "Why use lot sizing on futures?", a: "Prevents over-leveraging beyond your account risk limits." }]
  },

  // 6. FOREX & CRYPTO (3 TOOLS)
  {
    slug: "forex-pip-value-calculator",
    name: "Forex Pip Value Calculator",
    shortDescription: "Calculate cash value per pip across standard, mini, and micro lots in local account currency.",
    category: "forex-crypto",
    renderer: "forex",
    keywords: ["forex pip value", "pip calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Pip Value = Lots × Lot Size Units × Pip Decimal × Exchange Rate",
    workedExample: { scenario: "1 Standard Lot EUR/USD with USD/INR @ 85.50.", inputs: { "Lots": "1.0", "Pip": "0.0001", "Rate": "85.50" }, result: "Pip Value: $10.00 / pip (₹855.00 INR)", explanation: "1 pip move generates ₹855 equity change per standard lot." },
    faqs: [{ q: "What is a pip?", a: "Standard unit measuring currency price movement (usually 0.0001)." }]
  },
  {
    slug: "forex-position-size-calculator",
    name: "Forex Lot Size & Risk Calculator",
    shortDescription: "Determine exact lot sizing to ensure risk remains fixed to 1% of account capital.",
    category: "forex-crypto",
    renderer: "forex",
    keywords: ["forex lot size", "forex risk calculator"],
    status: "active",
    formulaDescription: "Allowable Lots = (Capital × Risk %) / (Stop Pips × Pip Value Per Lot)",
    workedExample: { scenario: "₹1,00,000 capital risking 1.5% with 25-pip stop on USD/INR.", inputs: { "Capital": "₹1,00,000", "Risk": "1.5%", "Stop": "25 pips" }, result: "Allowable Lots: 0.07 Standard Lots", explanation: "Limits loss strictly to ₹1,500 upon a 25-pip stop hit." },
    faqs: [{ q: "Why calculate forex lot size?", a: "High currency leverage requires precise sizing to prevent rapid drawdown." }]
  },
  {
    slug: "crypto-dca-calculator",
    name: "Crypto DCA (Dollar-Cost Averaging) Calculator",
    shortDescription: "Calculate weighted average buy price and accumulated coin holdings across recurring purchase orders.",
    category: "forex-crypto",
    renderer: "crypto",
    keywords: ["crypto dca calculator", "bitcoin dca"],
    popular: true,
    status: "active",
    formulaDescription: "DCA Price = Total Fiat Invested / Total Coin Tokens Acquired",
    workedExample: { scenario: "₹50,000 @ ₹55L and ₹50,000 @ ₹50L.", inputs: { "Buy 1": "50k @ 55L", "Buy 2": "50k @ 50L" }, result: "DCA Average: ₹52,380.95 (0.01909 BTC)", explanation: "Averaging during dips pulls cost below arithmetic midpoint." },
    faqs: [{ q: "What is DCA?", a: "Investing fixed amounts at regular intervals regardless of price." }]
  },

  // 7. ADVANCED TRADE ANALYSIS & PERFORMANCE (8 TOOLS)
  {
    slug: "trade-expectancy-calculator",
    name: "Trade Expectancy Calculator",
    shortDescription: "Calculate mathematical expectancy per trade and projected return over a series of executions.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["trade expectancy", "expectancy calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Expectancy = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)",
    workedExample: { scenario: "55% win rate, ₹2,500 avg win, ₹1,200 avg loss.", inputs: { "Win Rate": "55%", "Avg Win": "₹2,500", "Avg Loss": "₹1,200" }, result: "Expectancy: +₹835.00 / trade", explanation: "Every trade generates an expected positive value of ₹835." },
    faqs: [{ q: "What is trading expectancy?", a: "The average amount of money you expect to win or lose per trade over time." }]
  },
  {
    slug: "profit-factor-calculator",
    name: "Profit Factor Calculator",
    shortDescription: "Measure system efficiency by comparing total gross profits to total gross losses.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["profit factor calculator", "trading profit factor"],
    popular: true,
    status: "active",
    formulaDescription: "Profit Factor = Gross Profit / Gross Loss",
    workedExample: { scenario: "Gross profits ₹75,000 against gross losses ₹30,000.", inputs: { "Gross Profit": "₹75,000", "Gross Loss": "₹30,000" }, result: "Profit Factor: 2.50", explanation: "System generated ₹2.50 in gains for every ₹1.00 lost." },
    faqs: [{ q: "What is a good profit factor?", a: "Values above 1.5 indicate a healthy edge; above 2.0 is considered strong." }]
  },
  {
    slug: "win-rate-breakeven-calculator",
    name: "Win Rate Break-Even Calculator",
    shortDescription: "Determine the minimum win percentage required to break even based on your average win/loss sizes.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["win rate breakeven", "required win rate"],
    status: "active",
    formulaDescription: "Break-Even Win Rate = [Avg Loss / (Avg Win + Avg Loss)] × 100",
    workedExample: { scenario: "Avg Win ₹2,500 against Avg Loss ₹1,200.", inputs: { "Avg Win": "₹2,500", "Avg Loss": "₹1,200" }, result: "Break-Even Win Rate: 32.43%", explanation: "You only need to win 33 out of 100 trades to stay profitable." },
    faqs: [{ q: "Can a system with low win rate be profitable?", a: "Yes, if the average win size is substantially larger than average loss." }]
  },
  {
    slug: "payoff-ratio-calculator",
    name: "Payoff Ratio Calculator",
    shortDescription: "Measure average trade profitability asymmetry by comparing average win size to average loss size.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["payoff ratio", "win loss ratio"],
    status: "active",
    formulaDescription: "Payoff Ratio = Average Winning Trade / Average Losing Trade",
    workedExample: { scenario: "Average win of ₹2,500 and average loss of ₹1,200.", inputs: { "Avg Win": "₹2,500", "Avg Loss": "₹1,200" }, result: "Payoff Ratio: 2.08x", explanation: "Wins are 2.08 times larger than losses." },
    faqs: [{ q: "How is payoff ratio different from risk reward?", a: "Payoff ratio evaluates realized historical results; risk/reward is planned target versus stop." }]
  },
  {
    slug: "cagr-trading-calculator",
    name: "CAGR Trading Return Calculator",
    shortDescription: "Calculate Compound Annual Growth Rate for multi-year trading portfolio returns.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["trading cagr", "cagr trading calculator"],
    status: "active",
    formulaDescription: "CAGR = (Ending Capital / Starting Capital)^(1 / Years) - 1",
    workedExample: { scenario: "₹2 Lakhs grown to ₹5 Lakhs over 3 years.", inputs: { "Start": "₹2,00,000", "End": "₹5,00,000", "Years": "3" }, result: "CAGR: +35.72% p.a.", explanation: "Portfolio compounded at an annual rate of 35.72%." },
    faqs: [{ q: "What is CAGR?", a: "Annualized smooth growth rate over an investment horizon." }]
  },
  {
    slug: "sharpe-ratio-calculator",
    name: "Sharpe Ratio Calculator",
    shortDescription: "Evaluate risk-adjusted return by comparing excess strategy profits to volatility standard deviation.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["sharpe ratio calculator", "risk adjusted return"],
    status: "active",
    formulaDescription: "Sharpe = (Portfolio Return - Risk Free Rate) / Standard Deviation",
    workedExample: { scenario: "24% annual return, 7% risk-free rate, 12% volatility.", inputs: { "Return": "24%", "Risk-Free": "7%", "StdDev": "12%" }, result: "Sharpe Ratio: 1.42", explanation: "A ratio of 1.42 indicates strong excess return per unit of volatility." },
    faqs: [{ q: "What is Sharpe ratio?", a: "Standard institutional metric for measuring return generated per unit of risk." }]
  },
  {
    slug: "sortino-ratio-calculator",
    name: "Sortino Ratio Calculator",
    shortDescription: "Measure downside risk-adjusted return by penalizing only negative return volatility.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["sortino ratio calculator", "downside risk ratio"],
    status: "active",
    formulaDescription: "Sortino = (Portfolio Return - Target Return) / Downside Deviation",
    workedExample: { scenario: "24% return, 7% target, 8% downside deviation.", inputs: { "Return": "24%", "Target": "7%", "Downside": "8%" }, result: "Sortino Ratio: 2.13", explanation: "High ratio confirms upside volatility without heavy downside drawdowns." },
    faqs: [{ q: "How is Sortino better than Sharpe?", a: "Sortino does not penalize profitable upside volatility." }]
  },
  {
    slug: "recovery-factor-calculator",
    name: "Recovery Factor Calculator",
    shortDescription: "Evaluate strategy resilience by comparing total net profits to maximum peak-to-trough drawdown.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["recovery factor", "drawdown recovery factor"],
    status: "active",
    formulaDescription: "Recovery Factor = Total Net Profit / Maximum Absolute Drawdown",
    workedExample: { scenario: "₹1,50,000 net profit with a maximum drawdown of ₹30,000.", inputs: { "Net Profit": "₹1,50,000", "Max DD": "₹30,000" }, result: "Recovery Factor: 5.00x", explanation: "Profits produced were 5 times larger than worst drawdown." },
    faqs: [{ q: "What does recovery factor indicate?", a: "Shows how easily an account can recover from severe equity dips." }]
  },

  // 8. TRADE MANAGEMENT & VOLATILITY (5 TOOLS)
  {
    slug: "atr-stop-loss-calculator",
    name: "ATR Stop Loss Calculator",
    shortDescription: "Calculate dynamic volatility stop-loss prices using Average True Range (ATR) multipliers.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["atr stop loss", "volatility stop calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Long ATR Stop = Entry Price - (ATR × Multiplier)",
    workedExample: { scenario: "Entry @ ₹500, ATR is ₹12.50 with 2.0x multiplier.", inputs: { "Entry": "₹500.00", "ATR": "12.50", "Mult": "2.0x" }, result: "Stop-Loss Price: ₹475.00", explanation: "Sets protective barrier beyond standard market noise." },
    faqs: [{ q: "Why use ATR for stop-loss?", a: "Adapts stop distance to current market volatility rather than fixed points." }]
  },
  {
    slug: "atr-position-size-calculator",
    name: "ATR Position Size Calculator",
    shortDescription: "Size your position dynamically using ATR stop distances to normalize market volatility.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["atr position size", "volatility lot sizing"],
    status: "active",
    formulaDescription: "Quantity = ⌊(Capital × Risk %) / (ATR × Multiplier)⌋",
    workedExample: { scenario: "₹2L capital, 1.5% risk, ATR ₹12.50 with 2.0x buffer (25 pts).", inputs: { "Capital": "₹2,00,000", "Risk": "1.5%", "Stop": "25 pts" }, result: "Position Size: 120 Shares", explanation: "₹3,000 risk budget divided by 25 points ATR stop equals 120 shares." },
    faqs: [{ q: "What is volatility-adjusted sizing?", a: "Trades smaller in volatile markets and larger in quiet markets." }]
  },
  {
    slug: "trailing-stop-calculator",
    name: "Trailing Stop Calculator",
    shortDescription: "Calculate dynamic trailing stop prices to lock in running trade gains as the market advances.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["trailing stop calculator", "trail stop"],
    status: "active",
    formulaDescription: "Long Trailing Stop = Peak Market Price × (1 - Trailing %)",
    workedExample: { scenario: "Stock surged to ₹600 peak with a 5% trailing stop.", inputs: { "Peak": "₹600.00", "Trail %": "5.0%" }, result: "Active Trailing Stop: ₹570.00", explanation: "Stop ratchets upward to ₹570, locking in previous gains." },
    faqs: [{ q: "What is a trailing stop?", a: "A stop-loss order that moves in your favor as price advances." }]
  },
  {
    slug: "scale-out-calculator",
    name: "Multiple Target Scale-Out Calculator",
    shortDescription: "Plan multi-tier profit taking across 3 target levels and calculate volume-weighted exit prices.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["scale out calculator", "partial profit booking"],
    popular: true,
    status: "active",
    formulaDescription: "Weighted Exit = Σ(Target Price × Allocated Shares) / Total Shares",
    workedExample: { scenario: "100 shares @ ₹500: 30% @ ₹520, 40% @ ₹540, 30% @ ₹575.", inputs: { "Qty": "100", "T1": "₹520", "T2": "₹540", "T3": "₹575" }, result: "Blended Profit: +₹4,450.00 | Avg Exit: ₹544.50", explanation: "Securing partial profits smooths return volatility while keeping runners." },
    faqs: [{ q: "Why scale out of positions?", a: "Locks in gains while keeping a trailing portion to ride bigger trends." }]
  },
  {
    slug: "position-scaling-calculator",
    name: "Position Scaling & Pyramiding Calculator",
    shortDescription: "Model multi-tier position additions and blended cost basis as winning trends develop.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["position scaling", "pyramiding calculator"],
    status: "active",
    formulaDescription: "Blended Cost = Total Capital Added / Total Cumulative Shares",
    workedExample: { scenario: "Entry 1: 100 @ ₹450; Entry 2 on breakout: 50 @ ₹470.", inputs: { "Tier 1": "100 @ 450", "Tier 2": "50 @ 470" }, result: "Blended Price: ₹456.67 (150 Shares)", explanation: "Total ₹68,500 invested across 150 shares sets new average at ₹456.67." },
    faqs: [{ q: "What is pyramiding?", a: "Adding to a winning trade as market confirmation develops." }]
  }
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
