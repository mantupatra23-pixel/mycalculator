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
  // ==========================================================================
  // 1. OPTIONS MECHANICS (4 TOOLS)
  // ==========================================================================
  {
    slug: "call-option-payoff-calculator",
    name: "Call Option Payoff Calculator",
    shortDescription: "Calculate intrinsic payoff, net profit/loss, and expiry breakeven for long and short call contracts.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["call option payoff calculator", "call profit calculator", "long call payoff"],
    popular: true,
    status: "active",
    formulaDescription: "Long Call Profit = max(Spot at Expiry - Strike Price, 0) - Premium Paid",
    formulaVariables: [
      { symbol: "S", label: "Underlying market price at expiration" },
      { symbol: "K", label: "Selected Call strike price" },
      { symbol: "P", label: "Option premium paid per unit" },
      { symbol: "BE", label: "Breakeven price = Strike (K) + Premium (P)" },
    ],
    workedExample: {
      scenario: "1 lot (50 units) Nifty 24,500 Call bought at ₹180 premium with Nifty expiring at 24,800.",
      inputs: { "Strike Price": "₹24,500.00", "Option Premium": "₹180.00", "Expiry Spot": "₹24,800.00", "Units": "50" },
      result: "Gross Payoff: ₹300.00/unit | Net Profit: +₹6,000.00 | Breakeven: ₹24,680.00",
      explanation: "Intrinsic value at 24,800 is ₹300. Subtracting the ₹180 premium leaves ₹120 net profit per unit (₹6,000 total across 50 units)."
    },
    assumptions: [
      "Payoff reflects deterministic intrinsic expiration value; early assignment and pre-expiry theta are not modeled.",
      "Regulatory brokerage, STT, and exchange taxes are excluded from the mathematical line.",
    ],
    faqs: [
      { q: "What is a call option payoff?", a: "A call option payoff is the cash value of the contract at expiration before deducting the initial premium paid to purchase it." },
      { q: "How is call option profit calculated?", a: "Profit equals intrinsic expiration value (Underlying Price minus Strike Price, minimum zero) minus the option premium paid, multiplied by total units." },
      { q: "What is the breakeven price of a long call?", a: "The breakeven price equals the Strike Price plus the Premium Paid (K + P). At this price, your intrinsic gain exactly covers the premium." },
      { q: "What happens if the underlying closes below the strike at expiry?", a: "The option expires Out-of-the-Money (OTM) worthless. Your loss is strictly capped at the initial premium paid." },
      { q: "What is the maximum risk on a long call?", a: "The maximum loss on a long call is 100% of the premium paid. It occurs if the underlying closes at or below the strike price." },
      { q: "Is the risk on a short call unlimited?", a: "Yes. A naked short call has theoretically unlimited loss because the underlying stock price has no upper limit." },
      { q: "Does this calculator include brokerage and statutory taxes?", a: "No. This tool models the mathematical derivatives payoff. Use our Indian Brokerage Calculator to estimate STT, turnover fees, and 18% GST." },
      { q: "Does the calculator model option pricing before expiry?", a: "No. This engine calculates deterministic expiration payoffs. Intraday price movements before expiry depend on implied volatility and Greeks." }
    ],
    relatedTradingSlugs: ["put-option-payoff-calculator", "bull-call-spread-calculator", "options-breakeven-calculator", "options-moneyness-calculator"]
  },
  {
    slug: "put-option-payoff-calculator",
    name: "Put Option Payoff Calculator",
    shortDescription: "Calculate put option intrinsic value, expiry profit/loss, and downside breakeven price.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["put option payoff calculator", "put profit calculator", "long put payoff"],
    popular: true,
    status: "active",
    formulaDescription: "Long Put Profit = max(Strike Price - Spot at Expiry, 0) - Premium Paid",
    formulaVariables: [
      { symbol: "K", label: "Selected Put strike price" },
      { symbol: "S", label: "Underlying market price at expiration" },
      { symbol: "P", label: "Option premium paid per unit" },
      { symbol: "BE", label: "Breakeven price = Strike (K) - Premium (P)" },
    ],
    workedExample: {
      scenario: "1 lot (50 units) Nifty 24,500 Put bought at ₹180 premium with Nifty expiring at 24,100.",
      inputs: { "Strike Price": "₹24,500.00", "Option Premium": "₹180.00", "Expiry Spot": "₹24,100.00", "Units": "50" },
      result: "Intrinsic Payoff: ₹400.00/unit | Net Profit: +₹11,000.00 | Breakeven: ₹24,320.00",
      explanation: "Intrinsic value is ₹400 per unit. Subtracting ₹180 premium leaves ₹220 net gain per unit (₹11,000 across 50 units)."
    },
    assumptions: [
      "Payoff evaluates intrinsic expiration settlement; early exercise is not modeled.",
      "Maximum theoretical profit occurs if the asset drops to absolute zero: (Strike - Premium) × Units.",
    ],
    faqs: [
      { q: "What is a put option payoff?", a: "A put option payoff is the cash value realized at expiration from the contractual right to sell the underlying asset at the strike price." },
      { q: "How is long put profit calculated?", a: "Net profit equals intrinsic expiration value (Strike Price minus Underlying Price, minimum zero) minus the option premium paid, multiplied by total units." },
      { q: "What is the breakeven price for a put option?", a: "The breakeven price equals the Strike Price minus the Premium Paid (K - P). The underlying must decline below this level to yield net profit." },
      { q: "What is the maximum profit for a long put?", a: "Maximum profit is capped at (Strike Price - Premium) × Quantity, which is achieved if the asset price falls to zero." },
      { q: "What is the maximum loss on a long put?", a: "Your maximum risk is strictly limited to the premium paid to buy the contract." },
      { q: "What happens when the underlying finishes above the strike at expiry?", a: "The put option expires Out-of-the-Money (OTM) worthless, resulting in the total loss of the initial premium paid." },
      { q: "What is the difference between intrinsic value and premium?", a: "Intrinsic value is the immediate tangible profit if exercised now. Premium includes both intrinsic value and extrinsic time value." }
    ],
    relatedTradingSlugs: ["call-option-payoff-calculator", "bear-put-spread-calculator", "options-breakeven-calculator", "long-straddle-calculator"]
  },
  {
    slug: "options-moneyness-calculator",
    name: "Options Moneyness & Intrinsic Value Calculator",
    shortDescription: "Determine In-The-Money (ITM), At-The-Money (ATM), and Out-of-The-Money (OTM) status and time value.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["options moneyness calculator", "itm atm otm calculator", "intrinsic value options"],
    status: "active",
    formulaDescription: "Call Intrinsic = max(Spot - Strike, 0) | Put Intrinsic = max(Strike - Spot, 0) | Time Value = Premium - Intrinsic",
    formulaVariables: [
      { symbol: "Intrinsic", label: "Immediate tangible value if exercised today" },
      { symbol: "Time Value", label: "Extrinsic premium representing remaining time until expiry" },
    ],
    workedExample: {
      scenario: "Nifty trading at 24,620 with a 24,500 Call option quoting at ₹210 market premium.",
      inputs: { "Underlying Spot": "₹24,620.00", "Strike Price": "₹24,500.00", "Premium": "₹210.00" },
      result: "Status: ITM (In-The-Money) | Intrinsic: ₹120.00 | Extrinsic (Time) Value: ₹90.00",
      explanation: "Because spot exceeds strike by 120 points, the call has ₹120 in intrinsic value. The remaining ₹90 represents extrinsic time decay value."
    },
    assumptions: [
      "Options within ±0.25% of strike are classified as At-The-Money (ATM).",
      "Time value at contract expiration decays strictly to zero.",
    ],
    faqs: [
      { q: "What does In-The-Money (ITM) mean?", a: "An option is ITM when it possesses positive intrinsic value. For calls, spot > strike; for puts, spot < strike." },
      { q: "What does At-The-Money (ATM) mean?", a: "An option is ATM when the underlying price equals or is exceptionally close to the strike price." },
      { q: "What does Out-of-The-Money (OTM) mean?", a: "An option is OTM when it has zero intrinsic value and consists entirely of extrinsic time value." },
      { q: "Can an option be ITM but still result in a net loss?", a: "Yes. If an ITM option's intrinsic value at expiry is less than the premium originally paid, the trade suffers a net loss." },
      { q: "How is extrinsic time value computed?", a: "Extrinsic value equals the total market option premium minus its calculated intrinsic value." },
      { q: "Why does time value decay towards zero?", a: "As expiration approaches, the probability of further favorable price movement diminishes, causing time value (theta) to decay to zero." }
    ],
    relatedTradingSlugs: ["call-option-payoff-calculator", "put-option-payoff-calculator", "options-breakeven-calculator"]
  },
  {
    slug: "options-breakeven-calculator",
    name: "Options Breakeven Calculator",
    shortDescription: "Calculate the exact underlying price needed at expiry to break even on Calls and Puts.",
    category: "options",
    renderer: "options-mechanics",
    keywords: ["options breakeven calculator", "call breakeven", "put breakeven"],
    status: "active",
    formulaDescription: "Call Breakeven = Strike + Premium | Put Breakeven = Strike - Premium",
    workedExample: {
      scenario: "Purchasing a 24,200 Strike Put at ₹140 premium.",
      inputs: { "Strike Price": "₹24,200.00", "Option Premium": "₹140.00" },
      result: "Breakeven Price: ₹24,060.00 | Points Required: -140.00 pts",
      explanation: "The underlying must fall below ₹24,060 by expiry for the trade to generate net profit."
    },
    assumptions: ["Breakeven represents expiration parity and excludes pre-expiry mark-to-market fluctuations."],
    faqs: [
      { q: "How is call breakeven calculated?", a: "Call breakeven is calculated as Strike Price plus Premium Paid. The underlying must expire above this level for profit." },
      { q: "How is put breakeven calculated?", a: "Put breakeven is calculated as Strike Price minus Premium Paid. The underlying must expire below this level for profit." },
      { q: "Why is breakeven different from the strike price?", a: "Because you paid an upfront premium to buy the contract, the asset must move past the strike by at least the premium amount to recover that cost." },
      { q: "Does breakeven include brokerage fees?", a: "This formula computes pure derivatives breakeven. To cover broker fees, add estimated round-trip charges divided by total units." },
      { q: "Is breakeven relevant for option sellers?", a: "Yes. For option sellers, the breakeven is the boundary beyond which their initial premium credit is fully wiped out by losses." },
      { q: "Does the breakeven change if I exit before expiry?", a: "Yes. Prior to expiration, your exit depends on prevailing market premium rather than the expiry intrinsic formula." }
    ],
    relatedTradingSlugs: ["call-option-payoff-calculator", "put-option-payoff-calculator", "bull-call-spread-calculator"]
  },

  // ==========================================================================
  // 2. OPTIONS STRATEGIES (4 TOOLS)
  // ==========================================================================
  {
    slug: "bull-call-spread-calculator",
    name: "Bull Call Spread Calculator",
    shortDescription: "Simulate two-leg debit call spread payoffs, maximum profit caps, and net debit risk with SVG charts.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["bull call spread calculator", "call spread calculator", "vertical debit spread"],
    popular: true,
    status: "active",
    formulaDescription: "Max Profit = (Upper Strike - Lower Strike - Net Debit) × Qty | Max Loss = Net Debit × Qty",
    workedExample: {
      scenario: "Buy 24,500 Call at ₹190, Sell 25,000 Call at ₹60 on 50 units (Nifty).",
      inputs: { "Lower Strike": "₹24,500.00", "Upper Strike": "₹25,000.00", "Net Debit": "₹130.00" },
      result: "Max Profit: +₹18,500.00 | Max Risk: -₹6,500.00 | Breakeven: ₹24,630.00",
      explanation: "Spread width is 500 points minus ₹130 net debit = 370 points max profit (₹18,500 on 50 units)."
    },
    assumptions: ["Both option legs share the exact same underlying asset and expiration date."],
    faqs: [
      { q: "What is a bull call spread?", a: "A bull call spread is a defined-risk, moderately bullish strategy created by buying a lower strike call and selling a higher strike call." },
      { q: "What is the maximum profit on a bull call spread?", a: "Maximum profit equals (Difference between strikes minus Net Debit paid) multiplied by contract quantity." },
      { q: "What is the maximum loss?", a: "Maximum loss is strictly capped at the net debit paid upfront to establish the position." },
      { q: "How is the breakeven point calculated?", a: "The breakeven price equals the lower strike price plus the net debit per unit paid." },
      { q: "What happens if the underlying expires between the strikes?", a: "The short call expires worthless while the long call maintains partial intrinsic value, reducing loss or yielding modest profit." },
      { q: "Why use a spread instead of a naked long call?", a: "Selling the higher call finances part of the long call's cost and reduces time decay risk, though it caps maximum upside." }
    ],
    relatedTradingSlugs: ["bear-put-spread-calculator", "long-straddle-calculator", "iron-condor-calculator", "call-option-payoff-calculator"]
  },
  {
    slug: "bear-put-spread-calculator",
    name: "Bear Put Spread Calculator",
    shortDescription: "Simulate vertical debit put spread returns, capped downside profit, and breakeven levels.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["bear put spread calculator", "debit put spread", "options bear spread"],
    popular: true,
    status: "active",
    formulaDescription: "Max Profit = (Upper Strike - Lower Strike - Net Debit) × Qty | Max Loss = Net Debit × Qty",
    workedExample: {
      scenario: "Buy 24,500 Put at ₹160, Sell 24,000 Put at ₹45 across 50 units.",
      inputs: { "Upper Put": "₹24,500.00", "Lower Put": "₹24,000.00", "Net Debit": "₹115.00" },
      result: "Max Profit: +₹19,250.00 | Max Risk: -₹5,750.00 | Breakeven: ₹24,385.00",
      explanation: "Spread width is 500 points minus 115 debit = 385 points max gain (₹19,250 on 50 units) if spot finishes at or below 24,000."
    },
    assumptions: ["Both legs share identical expiration dates and underlying contract roots."],
    faqs: [
      { q: "What is a bear put spread?", a: "A bear put spread is a defined-risk, moderately bearish strategy formed by buying a higher strike put and selling a lower strike put." },
      { q: "What is the maximum profit?", a: "Maximum profit equals the difference between the two strike prices minus the net debit paid, multiplied by total units." },
      { q: "What is the maximum loss?", a: "Maximum loss is limited to the net premium paid to initiate the position." },
      { q: "How is the breakeven price calculated?", a: "Breakeven equals the higher (long put) strike price minus the net debit per unit." },
      { q: "Why not simply buy a naked put?", a: "A spread significantly reduces cash outlay and offsets negative theta decay, though it caps gains beyond the lower strike." },
      { q: "What happens if the underlying rises strongly?", a: "Both puts expire Out-of-the-Money worthless. Your total loss remains strictly capped at the initial net debit." }
    ],
    relatedTradingSlugs: ["bull-call-spread-calculator", "long-straddle-calculator", "iron-condor-calculator", "put-option-payoff-calculator"]
  },
  {
    slug: "long-straddle-calculator",
    name: "Long Straddle Payoff Calculator",
    shortDescription: "Calculate dual breakevens and unlimited volatility expansion payoffs on ATM Call + Put combinations.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["long straddle calculator", "straddle options calculator", "volatility breakout"],
    popular: true,
    status: "active",
    formulaDescription: "Lower BE = Strike - Combined Premium | Upper BE = Strike + Combined Premium",
    workedExample: {
      scenario: "Buy 24,500 Call at ₹180 and 24,500 Put at ₹170 with 50 units.",
      inputs: { "Strike Price": "₹24,500.00", "Total Premium": "₹350.00" },
      result: "Lower BE: ₹24,150.00 | Upper BE: ₹24,850.00 | Max Loss: -₹17,500.00",
      explanation: "Combined cost is ₹350 per unit. The trade generates net profit if the underlying finishes either below 24,150 or above 24,850 at expiration."
    },
    assumptions: ["Both call and put legs are opened at the exact same strike price and expiration date."],
    faqs: [
      { q: "What is a long straddle?", a: "A long straddle is a market-neutral, high-volatility strategy created by purchasing an equal number of calls and puts at the exact same strike and expiration." },
      { q: "What is the maximum risk on a long straddle?", a: "The maximum loss is 100% of the combined premium paid for both legs. It occurs if the price closes exactly at the strike on expiry." },
      { q: "How are the dual breakeven points calculated?", a: "Lower Breakeven = Strike Price - Total Premium; Upper Breakeven = Strike Price + Total Premium." },
      { q: "When should a trader execute a long straddle?", a: "When expecting explosive market volatility before a major event (earnings, budget, elections) regardless of direction." },
      { q: "What is the biggest risk with a straddle?", a: "Theta (time decay) and volatility crush. If the price moves sideways, both legs decay rapidly towards zero." },
      { q: "Can a long straddle have unlimited profit?", a: "Yes, on the upside there is no ceiling, while on the downside profit is capped only if the asset drops to zero." }
    ],
    relatedTradingSlugs: ["iron-condor-calculator", "bull-call-spread-calculator", "call-option-payoff-calculator", "put-option-payoff-calculator"]
  },
  {
    slug: "iron-condor-calculator",
    name: "Iron Condor Strategy Calculator",
    shortDescription: "Model 4-leg market-neutral credit condors with defined risk wings, dual breakevens, and net credit collection.",
    category: "options-strategies",
    renderer: "options-strategy",
    keywords: ["iron condor calculator", "4 leg options", "range bound options calculator"],
    popular: true,
    status: "active",
    formulaDescription: "Max Profit = Net Credit | Max Loss = Wing Width - Net Credit",
    workedExample: {
      scenario: "Sell 24,100 Put & 24,800 Call; Buy 23,800 Put & 25,100 Call. Net Credit: ₹110 on 50 units.",
      inputs: { "Wing Width": "300 pts", "Net Credit": "₹110.00" },
      result: "Max Profit: +₹5,500.00 | Max Loss: -₹9,500.00 | Profit Zone: ₹23,990 to ₹24,910",
      explanation: "Maximum profit of ₹5,500 is retained if underlying finishes between 24,100 and 24,800. Maximum loss is capped at ₹9,500."
    },
    assumptions: ["Wing widths on both put and call sides are assumed symmetrical unless customized in the editor."],
    faqs: [
      { q: "What is an iron condor?", a: "An iron condor is a defined-risk, non-directional option strategy formed by selling an OTM put spread and an OTM call spread." },
      { q: "What is the maximum profit?", a: "Maximum profit is strictly limited to the net premium credit collected when entering all four legs." },
      { q: "What is the maximum loss on an iron condor?", a: "Maximum loss equals the wing width (distance between adjacent long and short strikes) minus net credit received, multiplied by contract units." },
      { q: "How are the two breakeven points calculated?", a: "Lower BE = Short Put Strike minus Net Credit; Upper BE = Short Call Strike plus Net Credit." },
      { q: "What market condition favors an iron condor?", a: "A low-volatility, range-bound market where the underlying is expected to consolidate between the short strikes." },
      { q: "What happens if the market breaches one of the wings?", a: "The outer long option acts as a protective firewall, capping your loss at the defined maximum threshold." }
    ],
    relatedTradingSlugs: ["long-straddle-calculator", "bull-call-spread-calculator", "bear-put-spread-calculator", "options-breakeven-calculator"]
  },

  // ==========================================================================
  // 3. FUTURES & LEVERAGE (5 TOOLS)
  // ==========================================================================
  {
    slug: "futures-pnl-calculator",
    name: "Futures P&L Calculator",
    shortDescription: "Calculate futures trade profit, points gained, notional exposure, and return on deposited margin.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures pnl calculator", "nifty futures calculator", "derivative profit"],
    popular: true,
    status: "active",
    formulaDescription: "Futures P&L = (Exit Price - Entry Price) × Lots × Lot Size",
    workedExample: {
      scenario: "Buying 2 Lots of Nifty Futures (100 units) at 24,500 and squaring off at 24,750.",
      inputs: { "Entry": "₹24,500.00", "Exit": "₹24,750.00", "Lots": "2", "Lot Size": "50" },
      result: "Points: +250.00 pts | Realized P&L: +₹25,000.00 | Notional: ₹24,50,000.00",
      explanation: "A 250-point gain across 100 contract units yields ₹25,000 gross gain on a ₹24.50 Lakh notional contract value."
    },
    assumptions: ["Calculations evaluate gross trade P&L; statutory exchange charges and STT are computed separately."],
    faqs: [
      { q: "How is futures P&L calculated?", a: "Futures P&L is calculated by multiplying points gained or lost by total underlying units (Lots × Lot Size)." },
      { q: "What is contract notional value?", a: "Notional value is the total underlying cash value controlled by the futures contract (Price × Lot Size × Lots)." },
      { q: "How does return on margin differ from return on notional value?", a: "Because futures are traded on margin, a 1% move in notional value can yield an 8% to 15% return on your deposited margin." },
      { q: "Can a short futures position generate profit?", a: "Yes. In a short futures position, you profit when the exit price is lower than your entry price." },
      { q: "Are mark-to-market (MTM) settlements modeled here?", a: "This calculator determines total realized P&L between entry and exit rather than daily interim cash debits and credits." },
      { q: "Does this calculator deduct brokerage fees?", a: "No. For an exact net deduction of exchange turnover, SEBI fees, and GST, consult our Indian Brokerage Calculator." }
    ],
    relatedTradingSlugs: ["futures-margin-calculator", "liquidation-price-calculator", "futures-risk-calculator", "intraday-pnl-calculator"]
  },
  {
    slug: "futures-margin-calculator",
    name: "Futures Margin & Leverage Calculator",
    shortDescription: "Determine initial SPAN + Exposure margin requirements, effective leverage, and margin utilization.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures margin calculator", "span margin calculator", "futures leverage"],
    popular: true,
    status: "active",
    formulaDescription: "Initial Margin = Notional Value × Margin Rate % | Leverage = 100 / Margin %",
    workedExample: {
      scenario: "Contract price ₹24,500, lot size 50, 2 lots at 12% statutory margin requirement with ₹4,00,000 account equity.",
      inputs: { "Notional Value": "₹24,50,000.00", "Margin Rate": "12.0%", "Equity": "₹4,00,000.00" },
      result: "Margin Required: ₹2,94,000.00 | Embedded Leverage: 8.3x | Margin Utilization: 73.5%",
      explanation: "A ₹2,94,000 deposit controls ₹24.50 Lakh in notional exposure. Account utilization is 73.5%, leaving ₹1,06,000 buffer."
    },
    assumptions: ["Margin rate reflects combined SPAN and exposure margin percentages prescribed by clearing corporations."],
    faqs: [
      { q: "What is initial margin in futures?", a: "Initial margin is the minimum capital required in your trading account to initiate and carry an open futures position." },
      { q: "What is SPAN margin?", a: "SPAN (Standard Portfolio Analysis of Risk) margin is a standardized algorithm used by exchanges to calculate portfolio risk." },
      { q: "How is effective leverage calculated?", a: "Effective leverage equals total notional value of the contract divided by margin deposited." },
      { q: "What is a dangerous margin utilization percentage?", a: "Utilization above 75% leaves minimal cushion. Adverse market gaps can trigger sudden margin calls or automatic liquidation." },
      { q: "Can margin requirements change while holding overnight?", a: "Yes. Exchanges can hike margin percentages during periods of extreme market volatility." },
      { q: "What is free usable equity?", a: "Free equity is your total account balance minus margin locked into active derivative contracts." }
    ],
    relatedTradingSlugs: ["futures-pnl-calculator", "liquidation-price-calculator", "futures-contract-quantity-calculator", "position-size-calculator"]
  },
  {
    slug: "liquidation-price-calculator",
    name: "Estimated Liquidation Price Calculator",
    shortDescription: "Estimate liquidation price based on leverage multiplier and maintenance margin buffer.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["liquidation price calculator", "crypto liquidation", "margin liquidation"],
    status: "active",
    formulaDescription: "Long Liq = Entry × [1 - (1 / Leverage) + Maintenance Margin %]",
    workedExample: {
      scenario: "Long position entered at ₹24,500 with 10x leverage and 0.5% maintenance margin requirement.",
      inputs: { "Entry Price": "₹24,500.00", "Leverage": "10x", "Maintenance": "0.5%" },
      result: "Estimated Liquidation: ₹22,172.50 | Move to Liquidation: -9.50%",
      explanation: "With 10x leverage (10% margin), a 9.50% drop consumes your equity buffer down to the 0.5% maintenance threshold, triggering liquidation."
    },
    assumptions: ["Model assumes isolated margin rules. Cross-margin account balances can buffer liquidation points."],
    faqs: [
      { q: "What is a liquidation price?", a: "The liquidation price is the market price at which your losses deplete your margin buffer, forcing the broker to close the position." },
      { q: "Why is this labeled an 'Estimated' liquidation price?", a: "Actual liquidation varies across exchanges depending on bankruptcy fees, funding rates, index vs mark price, and queue priority." },
      { q: "How does higher leverage affect liquidation price?", a: "Higher leverage moves the liquidation price significantly closer to your entry, meaning small fluctuations can wipe out the trade." },
      { q: "How can I prevent forced liquidation?", a: "Use strict stop-loss orders well ahead of the liquidation threshold, lower your leverage multiplier, or add margin buffer." },
      { q: "What is maintenance margin?", a: "Maintenance margin is the bare minimum percentage of equity required to keep a leveraged contract active." },
      { q: "Does isolated margin differ from cross margin?", a: "Yes. Isolated margin risks only capital allocated to that specific trade, while cross margin risks your entire account balance." }
    ],
    relatedTradingSlugs: ["futures-margin-calculator", "futures-pnl-calculator", "position-size-calculator", "risk-reward-calculator"]
  },
  {
    slug: "futures-risk-calculator",
    name: "Futures Position Risk Calculator",
    shortDescription: "Evaluate contract risk, reward distance, and account exposure on open futures legs.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures risk calculator", "derivatives risk management"],
    status: "active",
    formulaDescription: "Total Risk = |Entry - Stop| × Lots × Lot Size",
    workedExample: {
      scenario: "2 lots Nifty Futures (100 units) with 50-point stop loss.",
      inputs: { "Lots": "2", "Lot Size": "50", "Stop Distance": "50 pts" },
      result: "Total Capital at Risk: ₹5,000.00 | Points Risk: 50.00 pts",
      explanation: "50 points risk on 100 units equals ₹5,000 maximum loss."
    },
    assumptions: ["Stop-loss is assumed to execute without major slippage or gap opening."],
    faqs: [
      { q: "How do you calculate risk on a futures contract?", a: "Multiply stop-loss distance in points by total contract units (Lots × Lot Size)." },
      { q: "Why is risk higher in futures than cash stocks?", a: "Futures are leveraged contracts; a small point move translates to large rupee profit or loss across the entire lot size." },
      { q: "What is an acceptable risk percentage for futures?", a: "Most disciplined traders cap single-trade futures risk at 1% to 2% of total trading equity." },
      { q: "How do overnight gaps affect futures risk?", a: "Market-opening gaps can execute past your stop-loss price, creating larger-than-expected slippage losses." },
      { q: "Does this calculator include margin calls?", a: "It calculates trade capital loss; if losses exceed available free equity, margin calls occur." },
      { q: "How can I limit futures downside?", a: "Use stop-loss market orders or hedge with out-of-the-money options." }
    ],
    relatedTradingSlugs: ["futures-pnl-calculator", "futures-margin-calculator", "futures-contract-quantity-calculator"]
  },
  {
    slug: "futures-contract-quantity-calculator",
    name: "Futures Contract Quantity Calculator",
    shortDescription: "Calculate allowable futures lots based on risk budget and stop-loss distance.",
    category: "futures-leverage",
    renderer: "futures",
    keywords: ["futures contract quantity", "futures lot sizing"],
    status: "active",
    formulaDescription: "Allowable Lots = ⌊(Capital × Risk %) / (|Entry - Stop| × Lot Size)⌋",
    workedExample: {
      scenario: "₹5L capital risking 1% with 40-point stop on Nifty (50 lot size).",
      inputs: { "Capital": "₹5,00,000.00", "Risk %": "1.0%", "Stop": "40 pts", "Lot Size": "50" },
      result: "Max Lots: 2 Lots (100 Units) | Risk per Lot: ₹2,000.00",
      explanation: "₹5,000 risk budget divided by ₹2,000 per-lot risk permits exactly 2 lots."
    },
    assumptions: ["Quantities are rounded down to conservative whole lot integers."],
    faqs: [
      { q: "How do I determine how many futures lots to trade?", a: "Divide your maximum allowable rupee risk budget by the risk per lot (Stop distance × Lot size)." },
      { q: "Can I trade fractional lots in Indian futures?", a: "No. Exchange-traded futures contracts like Nifty and Bank Nifty must be traded in discrete whole lots." },
      { q: "What if my calculated lot size is zero?", a: "If your risk budget is smaller than the risk of 1 lot, you must widen your capital or trade smaller instruments (like micro contracts or options)." },
      { q: "How does lot size impact risk?", a: "Larger lot sizes increase rupee risk per point, requiring tighter stops or larger capital bases." },
      { q: "Does lot sizing prevent margin calls?", a: "Yes. Sizing strictly by risk prevents taking positions too large for your account to withstand." },
      { q: "Should I scale lots based on volatility?", a: "Yes. In high volatility, widen your stop and decrease the number of lots traded." }
    ],
    relatedTradingSlugs: ["futures-risk-calculator", "futures-margin-calculator", "position-size-calculator"]
  },

  // ==========================================================================
  // 4. FOREX & CRYPTO (3 TOOLS)
  // ==========================================================================
  {
    slug: "forex-pip-value-calculator",
    name: "Forex Pip Value Calculator",
    shortDescription: "Calculate cash value per pip across standard, mini, and micro lots in local account currency.",
    category: "forex-crypto",
    renderer: "forex",
    keywords: ["forex pip value calculator", "pip calculator", "currency pip value in inr"],
    popular: true,
    status: "active",
    formulaDescription: "Pip Value = Lots × Contract Units × Pip Decimal Size × Exchange Rate",
    workedExample: {
      scenario: "1 Standard Lot (100,000 units) on EUR/USD (0.0001 pip) with USD/INR at 85.50.",
      inputs: { "Lots Traded": "1.0", "Contract Units": "100,000", "Pip Size": "0.0001", "USD/INR Rate": "85.50" },
      result: "Pip Value: $10.00 / pip | Local Value: ₹855.00 INR per pip",
      explanation: "A 1-pip move on 1 standard lot produces a $10 quote variance. Converting at 85.50 yields ₹855.00 INR per pip."
    },
    assumptions: ["Calculation reflects pure pip valuation; broker spreads and liquidity slippage are excluded."],
    faqs: [
      { q: "What is a pip in Forex trading?", a: "A pip (percentage in point) is the standard unit measuring the smallest price move in a currency pair, usually 0.0001." },
      { q: "Why is pip size different for Japanese Yen (JPY) pairs?", a: "JPY pairs are quoted to two decimal places, meaning a pip equals 0.01 rather than 0.0001." },
      { q: "What is the pip value of 1 standard lot on EUR/USD?", a: "For 1 standard lot (100,000 units), 1 pip equals exactly $10 USD in quote currency." },
      { q: "What is a mini lot and micro lot?", a: "A mini lot is 10,000 units ($1/pip), and a micro lot is 1,000 units ($0.10/pip)." },
      { q: "Why does the exchange rate affect pip value?", a: "If your account currency differs from the pair's quote currency, the dollar pip value must be converted using the active exchange rate." },
      { q: "How do I use pip value for position sizing?", a: "Divide your maximum allowable rupee risk by (Stop-loss distance in pips multiplied by pip value per lot)." }
    ],
    relatedTradingSlugs: ["forex-position-size-calculator", "position-size-calculator", "risk-reward-calculator"]
  },
  {
    slug: "forex-position-size-calculator",
    name: "Forex Lot Size & Risk Calculator",
    shortDescription: "Determine exact lot sizing to ensure risk remains fixed to 1% of account capital.",
    category: "forex-crypto",
    renderer: "forex",
    keywords: ["forex position size calculator", "forex lot size calculator", "forex risk"],
    status: "active",
    formulaDescription: "Allowable Lots = (Account Capital × Risk %) / (Stop Loss Pips × Pip Value Per Lot)",
    workedExample: {
      scenario: "₹1,00,000 capital risking 1.5% with a 25-pip stop loss on USD/INR (₹855 pip value per standard lot).",
      inputs: { "Capital": "₹1,00,000.00", "Risk %": "1.5%", "Stop": "25 Pips", "Pip Value": "₹855.00/lot" },
      result: "Allowable Lots: 0.07 Standard Lots (7 Micro Lots) | Total Risk: ₹1,500.00",
      explanation: "Trading 0.07 lots ensures a 25-pip adverse move limits total loss strictly to ₹1,500."
    },
    assumptions: ["Assumes uniform execution at stop-loss without price gaps."],
    faqs: [
      { q: "How is Forex position size calculated?", a: "Position size is calculated by dividing your cash risk budget by (Stop Loss in pips multiplied by Pip value per standard lot)." },
      { q: "Why is position sizing vital in currency markets?", a: "High leverage in Forex can lead to rapid capital wipeout unless position size is calculated strictly from stop-loss distance." },
      { q: "What happens if my calculated lot size is smaller than 0.01?", a: "Most brokers require a minimum order size of 0.01 micro lots. If your risk permits less, you must widen your stop or deposit additional capital." },
      { q: "Does this formula change for mini or micro accounts?", a: "No. The formula calculates total lot units; 0.07 standard lots simply equals 0.7 mini lots or 7 micro lots." },
      { q: "Should I include broker commissions in risk sizing?", a: "Yes. You can add expected commission costs directly to the stop-loss distance to ensure total friction is covered." },
      { q: "How do currency pairs with different pip values affect sizing?", a: "Pairs with higher pip values in your account currency require smaller lot sizes for the same rupee risk." }
    ],
    relatedTradingSlugs: ["forex-pip-value-calculator", "position-size-calculator", "risk-reward-calculator"]
  },
  {
    slug: "crypto-dca-calculator",
    name: "Crypto DCA (Dollar-Cost Averaging) Calculator",
    shortDescription: "Calculate weighted average buy price and accumulated coin holdings across recurring purchase orders.",
    category: "forex-crypto",
    renderer: "crypto",
    keywords: ["crypto dca calculator", "dollar cost average bitcoin", "crypto average price"],
    popular: true,
    status: "active",
    formulaDescription: "DCA Average Price = Total Fiat Capital Invested / Total Coin Tokens Acquired",
    workedExample: {
      scenario: "Buying ₹50,000 of Bitcoin at ₹55,00,000 and another ₹50,000 at ₹50,00,000.",
      inputs: { "Order 1": "₹50,000 @ ₹55L", "Order 2": "₹50,000 @ ₹50L" },
      result: "Total Invested: ₹1,00,000.00 | Total Coins: 0.019091 BTC | DCA Average Price: ₹52,380.95",
      explanation: "Investing equal cash amounts acquires more coins when prices are lower, pulling the volume-weighted average price (₹52,380.95) below the arithmetic midpoint (₹52,500.00)."
    },
    assumptions: ["Prices and order values represent user-entered historical purchases; live exchange feeds are not utilized."],
    faqs: [
      { q: "What is Dollar-Cost Averaging (DCA)?", a: "DCA is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of the asset's price." },
      { q: "How does DCA lower your average purchase price?", a: "Because you invest fixed cash amounts, you automatically buy more coins when prices are low and fewer when prices are high." },
      { q: "Does DCA guarantee profit in cryptocurrency?", a: "No. If the underlying cryptocurrency continues to decline indefinitely, DCA simply averages down your cost basis without preventing losses." },
      { q: "Why is the DCA average lower than the simple mathematical average?", a: "DCA is volume-weighted. More units are accumulated at lower price tiers, which pulls the weighted average downwards." },
      { q: "How often should I DCA?", a: "Common schedules include daily, weekly, or monthly intervals, often aligned with personal cash flow and market cycles." },
      { q: "How do exchange fees impact DCA?", a: "Frequent small orders can accumulate trading and network withdrawal fees; ensure transaction charges do not consume your margin." }
    ],
    relatedTradingSlugs: ["average-price-calculator", "average-down-calculator", "position-size-calculator"]
  },

  // ==========================================================================
  // 5. P&L & TRADE CALCULATORS (6 TOOLS)
  // ==========================================================================
  {
    slug: "intraday-pnl-calculator",
    name: "Intraday P&L Calculator",
    shortDescription: "Calculate gross and net profit/loss, point moves, and return on capital for day trading.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["intraday pnl calculator", "day trading profit calculator", "share market profit"],
    popular: true,
    status: "active",
    formulaDescription: "Long P&L = (Exit - Entry) × Qty - Charges | Short P&L = (Entry - Exit) × Qty - Charges",
    workedExample: {
      scenario: "100 shares bought at ₹500 and sold at ₹540 with ₹20 charges.",
      inputs: { "Entry": "₹500.00", "Exit": "₹540.00", "Quantity": "100" },
      result: "Gross P&L: +₹4,000.00 | Net P&L: +₹3,980.00 (+7.96% ROI) | Breakeven: ₹500.20",
      explanation: "A 40-point move generates ₹4,000 gross. After ₹20 round-trip fees, net in-hand profit is ₹3,980."
    },
    assumptions: ["Brokerage and taxes apply uniformly to round-trip execution."],
    faqs: [
      { q: "How is intraday P&L calculated?", a: "Price movement multiplied by shares minus all transaction fees." },
      { q: "What is gross vs net P&L?", a: "Gross is pure price gain; net deducts all taxes, STT, and broker commissions." },
      { q: "How is return on margin calculated?", a: "Net profit divided by required intraday margin capital, multiplied by 100." },
      { q: "What is a break-even exit price?", a: "The exact square-off price where trade gross gain equals total transaction fees." },
      { q: "Can intraday P&L be negative even if points were gained?", a: "Yes, if the gross points gained are smaller than total round-trip brokerage and taxes." },
      { q: "How do short trades work in intraday?", a: "You sell first at a higher price and buy back later at a lower price to profit." }
    ],
    relatedTradingSlugs: ["equity-pnl-calculator", "position-size-calculator", "brokerage-charges-calculator", "target-profit-calculator"]
  },
  {
    slug: "equity-pnl-calculator",
    name: "Equity Delivery P&L Calculator",
    shortDescription: "Calculate investment profit, cost basis, sale value, and capital gains for delivery holdings.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["equity delivery calculator", "cnc pnl calculator", "delivery share profit"],
    popular: true,
    status: "active",
    formulaDescription: "Net Return = (Sell Price × Quantity) - (Buy Price × Quantity) - Charges",
    workedExample: {
      scenario: "50 shares bought at ₹1,000 and sold at ₹1,200 after holding with ₹100 charges.",
      inputs: { "Buy Price": "₹1,000.00", "Sell Price": "₹1,200.00", "Quantity": "50" },
      result: "Cost Basis: ₹50,000 | Sale Value: ₹60,000 | Net Profit: +₹9,900.00 (+19.80% ROI)",
      explanation: "Capital appreciated by ₹10,000. Deducting ₹100 in regulatory and DP charges leaves ₹9,900 net gain."
    },
    assumptions: ["Assumes delivery holdings funded with 100% cash without margin financing interest."],
    faqs: [
      { q: "What is equity delivery (CNC)?", a: "Holding shares overnight in your demat account without intraday auto-square off." },
      { q: "What charges apply to delivery trades?", a: "Brokerage, STT (0.1% on buy and sell), exchange fees, SEBI charges, stamp duty (buy side), and DP charges on sell." },
      { q: "How is delivery ROI calculated?", a: "Net profit divided by total purchase cost basis, multiplied by 100." },
      { q: "What are DP charges?", a: "Depository Participant charges levied by CDSL/NSDL when shares are debited from your demat account." },
      { q: "Is STT higher on delivery than intraday?", a: "Yes. Delivery STT is 0.1% on both buy and sell, whereas intraday STT is 0.025% on sell side only." },
      { q: "How does holding period impact capital gains tax?", a: "Holding for more than 1 year qualifies for LTCG (Long-Term Capital Gains); under 1 year is STCG." }
    ],
    relatedTradingSlugs: ["intraday-pnl-calculator", "average-price-calculator", "brokerage-charges-calculator"]
  },
  {
    slug: "target-profit-calculator",
    name: "Target Profit Price Calculator",
    shortDescription: "Determine the exact target exit price needed to hit your rupee profit goal.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["target profit calculator", "target price calculator", "profit goal exit"],
    status: "active",
    formulaDescription: "Required Target Exit = Entry Price + [(Target Profit + Charges) / Quantity]",
    workedExample: {
      scenario: "Buying 200 shares at ₹250 targeting a net ₹5,000 profit with ₹50 estimated charges.",
      inputs: { "Entry Price": "₹250.00", "Quantity": "200", "Target Profit": "₹5,000.00" },
      result: "Required Target Price: ₹275.25 (+25.25 points move needed)",
      explanation: "To secure ₹5,050 gross (yielding ₹5,000 net after fees) across 200 shares requires an exit at ₹275.25."
    },
    assumptions: ["Assumes clean market limit execution at the target level."],
    faqs: [
      { q: "How does target profit exit work?", a: "Calculates the exact exit price that covers costs and yields your goal." },
      { q: "How do trading fees affect target price?", a: "Fees push your target exit price slightly higher for long trades to preserve net profit." },
      { q: "Can I use this for short selling?", a: "Yes. For short trades, target price is Entry Price minus profit points needed." },
      { q: "What if my target price is unrealistically high?", a: "You can increase share quantity (if risk permits) to reach the same profit goal with smaller price movement." },
      { q: "Should targets be based on profit or technical levels?", a: "Professional traders locate technical resistance first, then check if that target yields acceptable reward/risk." },
      { q: "How does lot size impact target price?", a: "Larger positions require fewer points of price movement to hit the same rupee profit." }
    ],
    relatedTradingSlugs: ["stop-loss-calculator", "intraday-pnl-calculator", "risk-reward-calculator"]
  },
  {
    slug: "stop-loss-calculator",
    name: "Stop-Loss Price Calculator",
    shortDescription: "Calculate exact stop-loss price corresponding to your maximum allowable rupee risk.",
    category: "pnl-trades",
    renderer: "pnl",
    keywords: ["stop loss price calculator", "sl price calculator", "max loss stop"],
    status: "active",
    formulaDescription: "Long Stop-Loss = Entry Price - [(Capital × Risk %) / Quantity]",
    workedExample: {
      scenario: "₹1,00,000 capital risking 1% on 100 shares bought at ₹400.",
      inputs: { "Capital": "₹1,00,000.00", "Risk %": "1.0%", "Quantity": "100", "Entry": "₹400.00" },
      result: "Max Risk: ₹1,000.00 | Stop-Loss Price: ₹390.00 (10.00 pts stop distance)",
      explanation: "Dividing allowable ₹1,000 loss by 100 shares permits a 10-point stop, placing stop-loss at ₹390."
    },
    assumptions: ["Stop order executes without extreme market slippage."],
    faqs: [
      { q: "Why use a calculated stop-loss?", a: "Prevents emotional exits by strictly tying price distance to your risk budget." },
      { q: "How is stop-loss distance calculated?", a: "Risk budget in rupees divided by the quantity of shares traded." },
      { q: "Where should stop-loss be placed for short trades?", a: "For short trades, stop-loss is placed above the entry price: Entry + (Risk / Quantity)." },
      { q: "What is slippage on stop-loss orders?", a: "The difference between your stop trigger price and the actual execution fill during fast market moves." },
      { q: "Can a stop-loss guarantee against all losses?", a: "No. Overnight market gaps can jump past your stop level, causing execution at the open price." },
      { q: "Should stop-loss be adjusted during a trade?", a: "Only trail it in the direction of profit; never widen a stop to accommodate a losing trade." }
    ],
    relatedTradingSlugs: ["position-size-calculator", "target-profit-calculator", "atr-stop-loss-calculator"]
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
    formulaDescription: "Volume-Weighted Average = Σ(Price × Quantity) / Σ Quantity",
    workedExample: {
      scenario: "Bought 100 shares at ₹100 and 200 shares at ₹85.",
      inputs: { "Leg 1": "100 @ ₹100", "Leg 2": "200 @ ₹85" },
      result: "Total Quantity: 300 | Invested: ₹27,000 | Weighted Avg: ₹90.00",
      explanation: "Total capital (₹10,000 + ₹17,000 = ₹27,000) divided by 300 shares produces ₹90.00 average cost."
    },
    assumptions: ["Executions evaluate clean purchase prices without brokerage netting."],
    faqs: [
      { q: "Why use weighted average instead of simple average?", a: "Weighted average correctly accounts for unequal share quantities across multiple buy orders." },
      { q: "How do I calculate average price for 3 or more entries?", a: "Add total money spent on all entries, then divide by the total number of shares bought." },
      { q: "Does buying more shares at lower prices reduce the average quickly?", a: "Yes. Larger buy volumes at lower prices pull the weighted average down more aggressively." },
      { q: "How is break-even calculated on averaged positions?", a: "Your break-even is your weighted average entry price plus round-trip transaction costs." },
      { q: "Can I use this for crypto and forex?", a: "Yes. The volume-weighted formula is universal for all financial instruments." },
      { q: "Does averaging price guarantee a profitable exit?", a: "No. If the stock continues downward, averaging down increases total capital exposure." }
    ],
    relatedTradingSlugs: ["average-down-calculator", "position-scaling-calculator", "equity-pnl-calculator"]
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
      explanation: "Investing ₹40,000 more brings your total cost to ₹90,000 across 200 shares, lowering average to ₹450."
    },
    assumptions: ["Averaging down assumes the trader has sufficient free capital buffer."],
    faqs: [
      { q: "What does averaging down mean?", a: "Buying additional shares of an asset you already own after its price has declined to lower your average purchase cost." },
      { q: "What is the biggest danger of averaging down?", a: "You risk committing more capital to a declining asset, which can lead to large portfolio losses if the stock does not recover." },
      { q: "How do I calculate how many shares are needed to hit a target average?", a: "Required Shares = [Current Shares × (Current Avg - Target Avg)] / (Target Avg - New Price)." },
      { q: "When is averaging down considered acceptable?", a: "Only when investing in fundamentally sound assets for the long term, with pre-planned capital allocation limits." },
      { q: "How does averaging down differ from pyramiding?", a: "Averaging down buys as prices fall; pyramiding adds to a winning position as prices rise." },
      { q: "Does averaging down reduce risk?", a: "No. It increases total capital exposure and risk unless position size is capped." }
    ],
    relatedTradingSlugs: ["average-price-calculator", "position-scaling-calculator", "drawdown-recovery-calculator"]
  },

  // ==========================================================================
  // 6. RISK MANAGEMENT (5 TOOLS)
  // ==========================================================================
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
    workedExample: {
      scenario: "₹2,00,000 capital risking 1.5% with entry at ₹450 and stop-loss at ₹435.",
      inputs: { "Capital": "₹2,00,000.00", "Risk %": "1.5%", "Entry": "₹450.00", "SL": "₹435.00" },
      result: "Allowable Quantity: 200 Shares | Total Risk: ₹3,000.00 | Position Value: ₹90,000",
      explanation: "Risk per share is ₹15. Allowable risk is ₹3,000. ₹3,000 / ₹15 = exactly 200 shares."
    },
    assumptions: ["Quantities are rounded down to conservative whole integers to prevent exceeding risk."],
    faqs: [
      { q: "What is a position size calculator?", a: "A position size calculator determines the exact number of shares or lots to trade so your maximum loss matches your risk budget." },
      { q: "Why should risk per trade be capped at 1% to 2%?", a: "Limiting risk to 1-2% protects your account from severe drawdown during normal losing streaks." },
      { q: "How is position size computed mathematically?", a: "Divide total allowable rupee risk (Capital × Risk %) by risk per share (Entry Price minus Stop Loss)." },
      { q: "What happens if stop-loss distance is very tight?", a: "A tight stop increases allowable share quantity for the same risk budget, but increases the chance of being stopped out by market noise." },
      { q: "Does position sizing guarantee profitability?", a: "No. Position sizing controls downside risk; profitability depends on edge, win rate, and risk/reward ratio." },
      { q: "How does capital utilization differ from risk percentage?", a: "Capital utilization is the total position value divided by account equity; risk percentage is the portion lost if stop-loss is hit." }
    ],
    relatedTradingSlugs: ["risk-reward-calculator", "drawdown-recovery-calculator", "daily-loss-limit-calculator", "atr-position-size-calculator"]
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
      explanation: "A 1:3 risk/reward ratio means the trade remains statistically profitable over time with only a 25% win rate."
    },
    assumptions: ["Calculations evaluate price point distances; execution slippage and commissions are excluded."],
    faqs: [
      { q: "What is a risk-to-reward ratio?", a: "A ratio comparing potential trade loss (distance to stop-loss) against anticipated profit (distance to target)." },
      { q: "What is considered a good risk/reward ratio?", a: "Professional traders typically seek a minimum risk-to-reward ratio of 1:2 or 1:3." },
      { q: "How is break-even win rate calculated from R:R?", a: "Break-even win rate equals 1 divided by (1 plus the Reward-to-Risk ratio). A 1:2 ratio requires a 33.3% win rate." },
      { q: "Can a low risk/reward trade still be profitable?", a: "Yes, if the strategy maintains an exceptionally high win rate (e.g., 75%+), though risk of large drawdowns remains." },
      { q: "Why is risk/reward asymmetry important?", a: "Asymmetry allows you to remain profitable even when losing more trades than you win." },
      { q: "Does this ratio account for transaction friction?", a: "No. Transaction costs slightly reduce net reward and increase net risk." }
    ],
    relatedTradingSlugs: ["position-size-calculator", "risk-of-ruin-calculator", "win-rate-breakeven-calculator", "stop-loss-calculator"]
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
      explanation: "Because the capital base shrunk by half, recovering back to the starting corpus requires doubling the balance (100% gain)."
    },
    assumptions: ["Recovery percentage assumes continuous compounding on remaining account equity."],
    faqs: [
      { q: "Why is drawdown recovery nonlinear?", a: "Because losses are calculated on a larger capital base while gains are calculated on a depleted capital base." },
      { q: "How much gain is needed to recover from a 20% loss?", a: "A 20% loss requires a 25% gain to restore starting capital." },
      { q: "What gain is needed to recover from a 50% loss?", a: "A 50% loss requires a 100% gain (doubling your money) just to break even." },
      { q: "Why is preventing deep drawdowns critical?", a: "Deep drawdowns (50%+) require extraordinary performance to recover, significantly increasing emotional stress and risk of total ruin." },
      { q: "How can traders minimize drawdown depth?", a: "By adhering strictly to 1-2% position sizing and enforcing daily/weekly loss limits." },
      { q: "Does adding fresh capital solve a drawdown?", a: "Fresh capital restores cash balance, but does not fix underlying flaws in trading strategy or risk discipline." }
    ],
    relatedTradingSlugs: ["position-size-calculator", "daily-loss-limit-calculator", "risk-of-ruin-calculator", "recovery-factor-calculator"]
  },
  {
    slug: "daily-loss-limit-calculator",
    name: "Daily Loss Limit Calculator",
    shortDescription: "Calculate daily loss thresholds and monitor remaining loss capacity to prevent overtrading.",
    category: "risk-management",
    renderer: "risk",
    keywords: ["daily loss limit calculator", "overtrading prevention", "max loss limit"],
    status: "active",
    formulaDescription: "Remaining Allowance = (Capital × Max Loss %) - Realized Loss",
    workedExample: {
      scenario: "₹5,00,000 capital with a 2% daily loss rule, having lost ₹6,000 so far today.",
      inputs: { "Capital": "₹5,00,000", "Daily Limit %": "2.0%", "Current Loss": "₹6,000" },
      result: "Max Daily Limit: ₹10,000 | Remaining Buffer: ₹4,000.00 (60.0% Capacity Used)",
      explanation: "You have ₹4,000 in risk capacity left before your discipline rule mandates closing terminals."
    },
    assumptions: ["Loss calculations evaluate realized closing losses plus open unrealized trade drawdowns."],
    faqs: [
      { q: "What is a daily loss limit?", a: "A daily loss limit is a pre-determined risk threshold where you stop trading once losses reach a set amount." },
      { q: "Why is a daily loss limit important?", a: "It prevents revenge trading, emotional spirals, and catastrophic account wipeouts during difficult market sessions." },
      { q: "How is the daily limit calculated?", a: "Typically calculated as a fixed percentage (e.g., 1% to 2%) of your total active trading equity." },
      { q: "What should I do when my daily loss limit is reached?", a: "Close trading terminals immediately and review trades only after emotions settle." },
      { q: "Can this calculator automatically lock my broker account?", a: "No. This tool calculates thresholds mathematically; broker kill-switches must be set directly in your trading platform." },
      { q: "How does a daily loss limit improve long-term consistency?", a: "It caps your worst trading days, ensuring that bad sessions do not erase weeks of steady gains." }
    ],
    relatedTradingSlugs: ["drawdown-recovery-calculator", "position-size-calculator", "risk-of-ruin-calculator"]
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
      explanation: "With positive mathematical expectancy and conservative 2% risk, probability of ruin is statistically negligible."
    },
    assumptions: ["Assumes independent, identically distributed trade outcomes with constant win rate and payoff ratio."],
    faqs: [
      { q: "What is the risk of ruin in trading?", a: "Risk of ruin is the mathematical probability that a trading system will result in total account bankruptcy over time." },
      { q: "How does win rate affect risk of ruin?", a: "Higher win rates significantly reduce risk of ruin, provided average losses do not excessively exceed average wins." },
      { q: "Why can a system with a positive win rate still go bankrupt?", a: "If position sizing is too aggressive (e.g., risking 15% per trade), a string of consecutive losses can wipe out equity." },
      { q: "What role does the payoff ratio play?", a: "A high payoff ratio allows a trading system to remain safe and profitable even with a win rate below 50%." },
      { q: "How does position sizing impact risk of ruin?", a: "Lowering risk per trade (e.g., from 5% to 1%) exponentially decreases statistical risk of ruin." },
      { q: "What edge is needed to eliminate risk of ruin?", a: "A positive mathematical expectancy combined with conservative risk-budget allocation keeps ruin probability near zero." }
    ],
    relatedTradingSlugs: ["risk-reward-calculator", "position-size-calculator", "trade-expectancy-calculator", "drawdown-recovery-calculator"]
  },

  // ==========================================================================
  // 7. INDIAN BROKERAGE & TAXES (2 TOOLS)
  // ==========================================================================
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
    workedExample: {
      scenario: "Buying 100 shares at ₹1,000 and selling at ₹1,050 intraday via Zerodha.",
      inputs: { "Buy": "100 @ ₹1,000", "Sell": "100 @ ₹1,050", "Broker": "Zerodha", "Segment": "Intraday" },
      result: "Gross P&L: +₹5,000.00 | Total Charges: -₹83.63 | Net In-Pocket: +₹4,916.37",
      explanation: "Turnover is ₹2,05,000. Brokerage is ₹40, STT is ₹26, Stamp Duty is ₹3, GST is ₹8.33, yielding net ₹4,916.37."
    },
    assumptions: ["Statutory tax rates follow official schedules prescribed by NSE, BSE, SEBI, and Indian Stamp Act."],
    faqs: [
      { q: "How are Indian stock market brokerage charges calculated?", a: "Brokerage is calculated either as a flat fee per order (e.g. ₹20 on Zerodha) or a percentage of trade turnover depending on broker." },
      { q: "What is STT and when is it levied?", a: "STT (Securities Transaction Tax) is a direct tax on securities transactions. For intraday equity, it is 0.025% on the sell side only." },
      { q: "Why is GST charged at 18%?", a: "GST at 18% is applied strictly to taxable service components (brokerage commission, exchange transaction charges, and SEBI turnover fees)." },
      { q: "What is Stamp Duty?", a: "Stamp duty is a state government levy charged on the buy-side transaction value (0.003% for intraday, 0.015% for delivery)." },
      { q: "What are SEBI turnover charges?", a: "Regulatory fees levied at ₹10 per crore (0.0001%) on total trade turnover." },
      { q: "Why do net break-even points matter?", a: "Break-even points show the exact price movement required just to cover round-trip brokerage and taxes before generating net profit." }
    ],
    relatedTradingSlugs: ["break-even-after-brokerage-calculator", "intraday-pnl-calculator", "equity-pnl-calculator"]
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
      explanation: "A 16-paise gain on 500 shares fully covers all round-trip brokerage, STT, exchange fees, and GST."
    },
    assumptions: ["Calculations evaluate round-trip buy and sell execution frictions."],
    faqs: [
      { q: "What is a break-even price after charges?", a: "It is the minimum exit price at which trade revenue equals your purchase cost plus all broker commissions and statutory taxes." },
      { q: "Why is break-even higher than buy price for long trades?", a: "Because you must pay brokerage and taxes on both entry and exit, the asset price must rise enough to cover those transaction costs." },
      { q: "How are charges factored into the break-even formula?", a: "Total estimated round-trip charges are divided by total quantity of shares and added to the buy price." },
      { q: "Does trading in larger quantities lower break-even points per share?", a: "Yes. Fixed flat brokerage fees get distributed across more shares, reducing the per-share frictional burden." },
      { q: "Is this calculator useful for scalpers?", a: "Extremely useful. Scalpers must know their precise break-even ticks before entering short-duration trades." },
      { q: "How does segment affect break-even ticks?", a: "Delivery trades have higher STT and DP charges, resulting in wider break-even spreads than intraday." }
    ],
    relatedTradingSlugs: ["brokerage-charges-calculator", "intraday-pnl-calculator", "target-profit-calculator"]
  },

  // ==========================================================================
  // 8. ADVANCED TRADE ANALYSIS & PERFORMANCE (8 TOOLS)
  // ==========================================================================
  {
    slug: "trade-expectancy-calculator",
    name: "Trade Expectancy Calculator",
    shortDescription: "Calculate mathematical expectancy per trade and projected return over a series of executions.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["trade expectancy", "expectancy calculator", "trading edge"],
    popular: true,
    status: "active",
    formulaDescription: "Expectancy = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)",
    workedExample: {
      scenario: "55% win rate, ₹2,500 avg win, ₹1,200 avg loss.",
      inputs: { "Win Rate": "55%", "Avg Win": "₹2,500", "Avg Loss": "₹1,200" },
      result: "Expectancy: +₹835.00 / trade (+₹83,500 over 100 trades)",
      explanation: "Every trade generates an expected positive mathematical value of ₹835."
    },
    assumptions: ["Expectancy represents long-term statistical average across a statistically significant sample."],
    faqs: [
      { q: "What is trading expectancy?", a: "The average amount of money you expect to win or lose per trade over time based on historical win rate and payoff sizes." },
      { q: "Does positive expectancy guarantee individual trade profit?", a: "No. Individual trade outcomes are probabilistic; expectancy only materializes across a large series of executions." },
      { q: "How can I improve my trading expectancy?", a: "By increasing your win rate, increasing average win size (running winners), or decreasing average loss size (cutting losers quickly)." },
      { q: "What is the difference between win rate and expectancy?", a: "Win rate measures trade frequency; expectancy measures actual rupee value generated per trade." },
      { q: "How many trades are needed to verify expectancy?", a: "A sample size of at least 50 to 100 trades is recommended to minimize random luck variance." },
      { q: "Can a system with a 40% win rate have positive expectancy?", a: "Yes, if average winning trades are significantly larger than average losing trades (e.g. 1:3 payoff)." }
    ],
    relatedTradingSlugs: ["profit-factor-calculator", "win-rate-breakeven-calculator", "payoff-ratio-calculator", "risk-of-ruin-calculator"]
  },
  {
    slug: "profit-factor-calculator",
    name: "Profit Factor Calculator",
    shortDescription: "Measure system efficiency by comparing total gross profits to total gross losses.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["profit factor calculator", "trading profit factor", "system efficiency"],
    popular: true,
    status: "active",
    formulaDescription: "Profit Factor = Gross Profit / Gross Loss",
    workedExample: {
      scenario: "Gross profits ₹75,000 against gross losses ₹30,000.",
      inputs: { "Gross Profit": "₹75,000.00", "Gross Loss": "₹30,000.00" },
      result: "Profit Factor: 2.50 | Net Balance: +₹45,000.00",
      explanation: "System generated ₹2.50 in gains for every ₹1.00 lost."
    },
    assumptions: ["Profit factor is calculated over a fixed evaluation period."],
    faqs: [
      { q: "What is profit factor in trading?", a: "Profit factor is the ratio of total gross profits to total gross losses over a specified trading period." },
      { q: "What is considered a good profit factor?", a: "A profit factor above 1.5 indicates a solid trading strategy, while values above 2.0 represent an exceptional edge." },
      { q: "What does a profit factor below 1.0 mean?", a: "A profit factor under 1.0 means total losses exceed total profits, indicating an unprofitable system." },
      { q: "How does profit factor differ from win rate?", a: "Win rate measures the number of winning trades, whereas profit factor measures actual dollar amounts won versus lost." },
      { q: "Can profit factor be skewed by one trade?", a: "Yes. An outlier jackpot win can artificially inflate profit factor; analyze consistency across regular trades." },
      { q: "What happens if there are zero gross losses?", a: "The calculator reports profit factor as undefined because dividing by zero losses is mathematically indeterminate." }
    ],
    relatedTradingSlugs: ["trade-expectancy-calculator", "win-rate-breakeven-calculator", "recovery-factor-calculator"]
  },
  {
    slug: "win-rate-breakeven-calculator",
    name: "Win Rate Break-Even Calculator",
    shortDescription: "Determine the minimum win percentage required to break even based on your average win/loss sizes.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["win rate breakeven", "required win rate", "breakeven accuracy"],
    status: "active",
    formulaDescription: "Break-Even Win Rate = [Avg Loss / (Avg Win + Avg Loss)] × 100",
    workedExample: {
      scenario: "Avg Win ₹2,500 against Avg Loss ₹1,200.",
      inputs: { "Avg Win": "₹2,500.00", "Avg Loss": "₹1,200.00" },
      result: "Break-Even Win Rate: 32.43% | Payoff Multiple: 2.08x",
      explanation: "You only need to win 33 out of 100 trades to achieve net profitability."
    },
    assumptions: ["Formula assumes constant average winning and losing trade sizes."],
    faqs: [
      { q: "What is break-even win rate?", a: "The minimum percentage of winning trades required to cover all losses and break even." },
      { q: "How is break-even win rate calculated?", a: "Average Loss divided by (Average Win plus Average Loss), multiplied by 100." },
      { q: "Can a trader be profitable with a 35% win rate?", a: "Yes, if average winning trades are at least twice as large as average losing trades." },
      { q: "How do transaction costs affect required win rate?", a: "Brokerage and taxes increase the practical win rate needed by 2% to 5%." },
      { q: "What happens if average win equals average loss?", a: "The required break-even win rate is exactly 50%." },
      { q: "Why focus on payoff size rather than win rate?", a: "Focusing on asymmetric payoffs allows traders to maintain profitability without the psychological strain of needing to be right on every trade." }
    ],
    relatedTradingSlugs: ["trade-expectancy-calculator", "payoff-ratio-calculator", "risk-reward-calculator"]
  },
  {
    slug: "payoff-ratio-calculator",
    name: "Payoff Ratio Calculator",
    shortDescription: "Measure average trade profitability asymmetry by comparing average win size to average loss size.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["payoff ratio", "win loss ratio", "average win loss"],
    status: "active",
    formulaDescription: "Payoff Ratio = Average Winning Trade / Average Losing Trade",
    workedExample: {
      scenario: "Average win of ₹2,500 and average loss of ₹1,200.",
      inputs: { "Avg Win": "₹2,500.00", "Avg Loss": "₹1,200.00" },
      result: "Payoff Ratio: 2.08x",
      explanation: "Winning trades are 2.08 times larger than losing trades on average."
    },
    assumptions: ["Calculated from closed, realized trade executions."],
    faqs: [
      { q: "What is a payoff ratio?", a: "The ratio of average winning trade size to average losing trade size." },
      { q: "How is payoff ratio different from risk/reward ratio?", a: "Payoff ratio measures historical realized trade performance; risk/reward is the planned target vs stop-loss before entry." },
      { q: "What is a healthy payoff ratio?", a: "A ratio of 1.5x to 2.5x is considered healthy for swing and trend-following trading strategies." },
      { q: "Can scalpers succeed with a payoff ratio below 1.0?", a: "Yes, but they require high win rates (70%+) to compensate for smaller wins relative to losses." },
      { q: "How do trailing stops impact payoff ratio?", a: "Trailing stops let winning trades run, helping expand your historical payoff ratio." },
      { q: "Does payoff ratio include transaction fees?", a: "Using net P&L provides a more accurate picture of true after-cost payoff asymmetry." }
    ],
    relatedTradingSlugs: ["win-rate-breakeven-calculator", "trade-expectancy-calculator", "risk-reward-calculator"]
  },
  {
    slug: "cagr-trading-calculator",
    name: "CAGR Trading Return Calculator",
    shortDescription: "Calculate Compound Annual Growth Rate for multi-year trading portfolio returns.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["trading cagr calculator", "annualized trading return"],
    status: "active",
    formulaDescription: "CAGR = (Ending Capital / Starting Capital)^(1 / Years) - 1",
    workedExample: {
      scenario: "₹2 Lakhs grown to ₹5 Lakhs over 3 years.",
      inputs: { "Starting Capital": "₹2,00,000.00", "Ending Capital": "₹5,00,000.00", "Years": "3.0" },
      result: "CAGR: +35.72% p.a.",
      explanation: "Portfolio compounded at an annual rate of 35.72% over 3 years."
    },
    assumptions: ["Assumes capital remains invested throughout the duration without intermediate cash injections."],
    faqs: [
      { q: "What is CAGR in trading?", a: "Compound Annual Growth Rate represents the constant annualized growth rate of a trading portfolio over multiple years." },
      { q: "Why use CAGR instead of total absolute return?", a: "CAGR normalizes returns over time, allowing fair comparison between strategies run over different time horizons." },
      { q: "Does CAGR reflect volatility during the period?", a: "No. CAGR only measures start and end values; Sharpe and Sortino ratios measure the volatility path taken." },
      { q: "How do capital withdrawals affect CAGR?", a: "Withdrawals reduce the ending capital balance, lowering the calculated compound growth rate." },
      { q: "What is considered strong trading CAGR?", a: "Institutional trading performance above 20% to 30% CAGR over multi-year cycles is considered exceptional." },
      { q: "Can CAGR be negative?", a: "Yes. If ending capital is less than starting capital, CAGR will reflect the annualized rate of capital erosion." }
    ],
    relatedTradingSlugs: ["sharpe-ratio-calculator", "sortino-ratio-calculator", "recovery-factor-calculator"]
  },
  {
    slug: "sharpe-ratio-calculator",
    name: "Sharpe Ratio Calculator",
    shortDescription: "Evaluate risk-adjusted return by comparing excess strategy profits to volatility standard deviation.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["sharpe ratio calculator", "risk adjusted return"],
    status: "active",
    formulaDescription: "Sharpe Ratio = (Portfolio Return - Risk Free Rate) / Standard Deviation",
    workedExample: {
      scenario: "24% annual return, 7% risk-free rate, 12% volatility.",
      inputs: { "Return": "24.0%", "Risk-Free Rate": "7.0%", "Volatility": "12.0%" },
      result: "Sharpe Ratio: 1.42",
      explanation: "A ratio of 1.42 indicates strong excess return generated per unit of volatility."
    },
    assumptions: ["Return and risk-free rates must be annualized over identical time periods."],
    faqs: [
      { q: "What is the Sharpe ratio?", a: "A metric that measures return generated in excess of the risk-free rate per unit of volatility." },
      { q: "What is a good Sharpe ratio?", a: "Above 1.0 is considered good, above 1.5 is very good, and above 2.0 is considered world-class." },
      { q: "What is the risk-free rate in India?", a: "Typically the yield on 91-day or 10-year Indian Government Treasury Bills (~6.5% to 7.0%)." },
      { q: "What is a major limitation of the Sharpe ratio?", a: "It treats upside volatility the same as downside volatility, penalizing strategies that experience sharp upward jumps." },
      { q: "How does Sortino ratio improve upon Sharpe?", a: "Sortino only penalizes downside volatility, ignoring profitable upside swings." },
      { q: "Can a negative Sharpe ratio occur?", a: "Yes, if strategy return is less than the risk-free rate." }
    ],
    relatedTradingSlugs: ["sortino-ratio-calculator", "cagr-trading-calculator", "recovery-factor-calculator"]
  },
  {
    slug: "sortino-ratio-calculator",
    name: "Sortino Ratio Calculator",
    shortDescription: "Measure downside risk-adjusted return by penalizing only negative return volatility.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["sortino ratio calculator", "downside deviation ratio"],
    status: "active",
    formulaDescription: "Sortino Ratio = (Portfolio Return - Target Return) / Downside Deviation",
    workedExample: {
      scenario: "24% return, 7% target, 8% downside deviation.",
      inputs: { "Return": "24.0%", "Target": "7.0%", "Downside Dev": "8.0%" },
      result: "Sortino Ratio: 2.13",
      explanation: "High ratio confirms upside volatility without heavy downside drawdowns."
    },
    assumptions: ["Only negative deviations below the target return threshold are included in downside deviation."],
    faqs: [
      { q: "What is the Sortino ratio?", a: "A variation of the Sharpe ratio that evaluates return relative only to negative (downside) volatility." },
      { q: "Why is Sortino preferred over Sharpe for active traders?", a: "Traders welcome sudden large gains; Sortino does not penalize positive volatility." },
      { q: "What is a good Sortino ratio?", a: "A Sortino ratio above 2.0 indicates an attractive, controlled-risk trading system." },
      { q: "What is downside deviation?", a: "The standard deviation calculated strictly from returns that fall below your minimum target threshold." },
      { q: "Can Sortino be calculated on monthly returns?", a: "Yes, provided returns and target benchmarks are measured on the same monthly basis." },
      { q: "How can I improve my strategy's Sortino ratio?", a: "By using hard stop-losses to eliminate large left-tail drawdown events." }
    ],
    relatedTradingSlugs: ["sharpe-ratio-calculator", "cagr-trading-calculator", "recovery-factor-calculator"]
  },
  {
    slug: "recovery-factor-calculator",
    name: "Recovery Factor Calculator",
    shortDescription: "Evaluate strategy resilience by comparing total net profits to maximum peak-to-trough drawdown.",
    category: "performance",
    renderer: "advanced-trade",
    keywords: ["recovery factor calculator", "drawdown recovery factor"],
    status: "active",
    formulaDescription: "Recovery Factor = Total Net Profit / Maximum Absolute Drawdown",
    workedExample: {
      scenario: "₹1,50,000 net profit with a maximum drawdown of ₹30,000.",
      inputs: { "Net Profit": "₹1,50,000.00", "Max Drawdown": "₹30,000.00" },
      result: "Recovery Factor: 5.00x",
      explanation: "Total strategy profits were 5 times larger than the worst historical equity dip."
    },
    assumptions: ["Maximum drawdown evaluates the deepest historical peak-to-trough equity decline."],
    faqs: [
      { q: "What is recovery factor?", a: "A performance metric measuring how easily a strategy generates profits relative to its deepest drawdown." },
      { q: "What is a strong recovery factor score?", a: "Values above 3.0 to 5.0 over multi-year backtests indicate strong capital recovery ability." },
      { q: "How is recovery factor different from profit factor?", a: "Profit factor compares gross gains to gross losses; recovery factor compares net profit to deepest peak-to-trough equity drop." },
      { q: "Can recovery factor be negative?", a: "Yes, if the trading account is currently in net negative territory." },
      { q: "Why do institutional allocators inspect recovery factor?", a: "It demonstrates whether a trader can withstand adversity and recover without requiring fresh cash injections." },
      { q: "How does risk sizing impact recovery factor?", a: "Smaller risk sizing caps drawdown depth, which directly boosts the recovery factor ratio." }
    ],
    relatedTradingSlugs: ["drawdown-recovery-calculator", "profit-factor-calculator", "sharpe-ratio-calculator"]
  },

  // ==========================================================================
  // 9. TRADE MANAGEMENT & VOLATILITY (5 TOOLS)
  // ==========================================================================
  {
    slug: "atr-stop-loss-calculator",
    name: "ATR Stop Loss Calculator",
    shortDescription: "Calculate dynamic volatility stop-loss prices using Average True Range (ATR) multipliers.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["atr stop loss calculator", "volatility stop loss", "atr multiplier"],
    popular: true,
    status: "active",
    formulaDescription: "Long ATR Stop = Entry Price - (ATR × Multiplier)",
    workedExample: {
      scenario: "Entry @ ₹500, ATR is ₹12.50 with 2.0x multiplier.",
      inputs: { "Entry Price": "₹500.00", "ATR": "12.50", "Multiplier": "2.0x" },
      result: "Stop-Loss Price: ₹475.00 (25.00 pts stop distance)",
      explanation: "Sets protective barrier 25 points below entry, beyond standard market noise."
    },
    assumptions: ["ATR value is user-provided from daily or intraday charts."],
    faqs: [
      { q: "What is an ATR stop-loss?", a: "A stop-loss level calculated based on the Average True Range (ATR) indicator to match prevailing market volatility." },
      { q: "Why use ATR instead of a fixed percentage stop?", a: "Fixed stops get hit easily during high volatility and are too loose during quiet markets; ATR automatically adapts." },
      { q: "What is a standard ATR multiplier?", a: "Swing traders commonly use 1.5x to 2.5x ATR, while day traders often use 1.0x to 1.5x ATR." },
      { q: "How is ATR stop calculated for short positions?", a: "For short trades, stop is placed above entry: Entry Price + (ATR × Multiplier)." },
      { q: "Which ATR timeframe should I use?", a: "Use the ATR value from the timeframe matching your trade duration (e.g., 14-period daily ATR for swing trades)." },
      { q: "Can ATR stop-loss be trailed?", a: "Yes. As the stock advances, the ATR trailing stop ratchets upward behind price." }
    ],
    relatedTradingSlugs: ["atr-position-size-calculator", "trailing-stop-calculator", "stop-loss-calculator"]
  },
  {
    slug: "atr-position-size-calculator",
    name: "ATR Position Size Calculator",
    shortDescription: "Size your position dynamically using ATR stop distances to normalize market volatility.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["atr position size", "volatility lot sizing", "risk normalized sizing"],
    status: "active",
    formulaDescription: "Quantity = ⌊(Capital × Risk %) / (ATR × Multiplier)⌋",
    workedExample: {
      scenario: "₹2L capital, 1.5% risk, ATR ₹12.50 with 2.0x buffer (25 pts).",
      inputs: { "Capital": "₹2,00,000.00", "Risk %": "1.5%", "ATR Stop": "25.00 pts" },
      result: "Position Size: 120 Shares | Total Rupee Risk: ₹3,000.00",
      explanation: "₹3,000 risk budget divided by 25 points ATR stop equals 120 shares."
    },
    assumptions: ["Quantities are rounded down to conservative whole integers."],
    faqs: [
      { q: "What is ATR-based position sizing?", a: "A sizing method where share quantity scales inversely with market volatility." },
      { q: "Why trade smaller in high-volatility markets?", a: "Wider swings increase rupee risk per share; trading fewer shares keeps total account risk constant." },
      { q: "How does ATR sizing equalize risk across different stocks?", a: "A volatile stock gets a smaller share allocation while a calm stock gets a larger allocation, ensuring each trade risks the same amount." },
      { q: "What formula does this tool use?", a: "Total Rupee Risk Budget divided by (ATR multiplied by ATR Multiplier)." },
      { q: "Can this be used for index options and futures?", a: "Yes. Multiply ATR points by contract lot size to determine allowable lot quantities." },
      { q: "What happens if volatility spikes after entry?", a: "Your initial risk remains protected by your ATR stop-loss price." }
    ],
    relatedTradingSlugs: ["atr-stop-loss-calculator", "position-size-calculator", "trailing-stop-calculator"]
  },
  {
    slug: "trailing-stop-calculator",
    name: "Trailing Stop Calculator",
    shortDescription: "Calculate dynamic trailing stop prices to lock in running trade gains as the market advances.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["trailing stop calculator", "trail stop loss", "lock profit stop"],
    status: "active",
    formulaDescription: "Long Trailing Stop = Peak Market Price × (1 - Trailing %)",
    workedExample: {
      scenario: "Stock surged to ₹600 peak with a 5% trailing stop.",
      inputs: { "Peak Price": "₹600.00", "Trailing %": "5.0%" },
      result: "Active Trailing Stop: ₹570.00 | Locked Gain Protected",
      explanation: "Stop ratchets upward to ₹570, locking in previous gains."
    },
    assumptions: ["Trailing stop moves only in the direction of trade profit; it never moves backward."],
    faqs: [
      { q: "What is a trailing stop?", a: "A stop order that automatically adjusts upward (for long positions) as price reaches new highs." },
      { q: "What is the benefit of a trailing stop?", a: "It lets winning positions run during strong trends while locking in accumulated profits if the market reverses." },
      { q: "How tight should a trailing stop be?", a: "Too tight (e.g. 1%) leads to premature exits; too loose (e.g. 15%) surrenders too much open profit." },
      { q: "Can trailing stops be based on moving averages or ATR?", a: "Yes. Many traders trail stops using 20 EMA or 2x ATR instead of fixed percentages." },
      { q: "Does this calculator execute automatic orders?", a: "No. This tool calculates stop levels mathematically for order entry in your broker terminal." },
      { q: "How do trailing stops work on short positions?", a: "For short trades, the stop trails downward behind lower lows: Trough Price × (1 + Trailing %)." }
    ],
    relatedTradingSlugs: ["atr-stop-loss-calculator", "scale-out-calculator", "stop-loss-calculator"]
  },
  {
    slug: "scale-out-calculator",
    name: "Multiple Target Scale-Out Calculator",
    shortDescription: "Plan multi-tier profit taking across 3 target levels and calculate volume-weighted exit prices.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["scale out calculator", "partial profit booking", "multiple target exit"],
    popular: true,
    status: "active",
    formulaDescription: "Weighted Exit = Σ(Target Price × Allocated Shares) / Total Shares",
    workedExample: {
      scenario: "100 shares @ ₹500: 30% @ ₹520, 40% @ ₹540, 30% @ ₹575.",
      inputs: { "Quantity": "100", "T1": "₹520", "T2": "₹540", "T3": "₹575" },
      result: "Blended Profit: +₹4,450.00 | Weighted Exit: ₹544.50",
      explanation: "Securing partial profits smooths return volatility while keeping runners for big trends."
    },
    assumptions: ["Allocation percentages across all target tiers sum to 100%."],
    faqs: [
      { q: "What is scaling out?", a: "Closing portions of a winning position at progressive profit targets rather than exiting everything at once." },
      { q: "What are the advantages of scaling out?", a: "It reduces psychological pressure, locks in guaranteed gains, and finances the remaining risk on the trade." },
      { q: "What is the drawback of scaling out?", a: "If the stock makes a massive runaway move, your total profit will be lower than if you had held the full position." },
      { q: "What is a common scale-out allocation?", a: "Taking 33% off at Target 1, 33% at Target 2, and letting the final 34% trail with a loose stop." },
      { q: "When should stop-loss be moved to break-even?", a: "Most traders move their stop to break-even once Target 1 is achieved." },
      { q: "Does scaling out incur higher brokerage fees?", a: "With flat-fee discount brokers (e.g. ₹20/order), executing multiple sell orders incurs separate transaction fees." }
    ],
    relatedTradingSlugs: ["trailing-stop-calculator", "target-profit-calculator", "position-scaling-calculator"]
  },
  {
    slug: "position-scaling-calculator",
    name: "Position Scaling & Pyramiding Calculator",
    shortDescription: "Model multi-tier position additions and blended cost basis as winning trends develop.",
    category: "trade-management",
    renderer: "advanced-trade",
    keywords: ["position scaling calculator", "pyramiding trading", "scaling in"],
    status: "active",
    formulaDescription: "Blended Cost = Total Capital Added / Total Cumulative Shares",
    workedExample: {
      scenario: "Entry 1: 100 @ ₹450; Entry 2 on breakout: 50 @ ₹470.",
      inputs: { "Tier 1": "100 @ 450", "Tier 2": "50 @ 470" },
      result: "Blended Price: ₹456.67 (150 Shares)",
      explanation: "Total ₹68,500 invested across 150 shares sets new average at ₹456.67."
    },
    assumptions: ["Pyramiding adds to positions exclusively when the initial entry is in profit."],
    faqs: [
      { q: "What is pyramiding in trading?", a: "Adding to an existing winning trade as the price confirms the direction of the trend." },
      { q: "How is pyramiding different from averaging down?", a: "Pyramiding adds to winners at higher prices; averaging down adds to losers at lower prices." },
      { q: "What is the golden rule of pyramiding?", a: "Each subsequent add-on should be smaller than the previous position (e.g., 100 shares, then 50, then 25)." },
      { q: "Why must stop-losses be adjusted when pyramiding?", a: "Your average cost basis rises; you must trail your stop upward to ensure the total trade cannot turn into a net loss." },
      { q: "Does pyramiding increase portfolio risk?", a: "Not if profits are locked in and the stop-loss on the combined position is moved above the break-even point." },
      { q: "When should pyramiding be avoided?", a: "In choppy, range-bound markets where breakouts frequently fail." }
    ],
    relatedTradingSlugs: ["scale-out-calculator", "average-price-calculator", "trailing-stop-calculator"]
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
