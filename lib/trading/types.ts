// ============================================================================
// MYCALCULATORS TRADING SYSTEM — CORE TYPES & CONTRACTS (PHASE 2)
// ============================================================================

export type TradingCategory =
  | "pnl-trades"
  | "risk-management"
  | "performance"
  | "compounding"
  | "charges-brokerage"
  | "options"
  | "options-strategies"
  | "technical-analysis"
  | "candlestick-patterns"
  | "portfolio-market"
  | "psychology-discipline"
  | "journal-analytics"
  | "ai-trading"
  | "futures-leverage"
  | "forex-crypto"
  | "trader-intelligence";

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export type RendererType =
  | "pnl"
  | "risk"
  | "position-size"
  | "brokerage"
  | "options-mechanics"
  | "options-strategy"
  | "futures"
  | "forex"
  | "crypto"
  | "generic-placeholder";

export interface TradingCategoryMeta {
  id: TradingCategory;
  name: string;
  tagline: string;
  description: string;
  badgeColor: string;
}

export interface TradingFaq {
  q: string;
  a: string;
}

export interface TradingWorkedExample {
  scenario: string;
  inputs: Record<string, string | number>;
  result: string;
  explanation: string;
}

export interface TradingToolDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  category: TradingCategory;
  renderer: RendererType;
  keywords: string[];
  popular?: boolean;
  status: "active" | "placeholder" | "planned";
  formulaDescription?: string;
  formulaVariables?: { symbol: string; label: string }[];
  workedExample?: TradingWorkedExample;
  assumptions?: string[];
  faqs?: TradingFaq[];
  relatedTradingSlugs?: string[];
}

export interface TradingCalculationResult {
  primaryMetric: {
    label: string;
    value: number;
    formatted: string;
    isPositive?: boolean;
  };
  secondaryMetrics: Array<{
    label: string;
    value: number | string;
    formatted: string;
    highlight?: "green" | "red" | "neutral" | "cyan";
  }>;
  breakdown?: Array<{
    item: string;
    amount: number;
    formatted: string;
    type?: "credit" | "debit" | "neutral";
  }>;
  riskAssessment?: {
    level: RiskLevel;
    score: number;
    summary: string;
  };
  notes?: string[];
}

// ----------------------------------------------------------------------------
// Phase 2 Multi-Leg Options & Derivatives Data Contracts
// ----------------------------------------------------------------------------
export type OptionType = "call" | "put";
export type PositionSide = "long" | "short";

export interface OptionLeg {
  id: string;
  optionType: OptionType;
  side: PositionSide;
  strikePrice: number;
  premium: number;
  quantity: number;
  contractMultiplier: number;
}

export interface PayoffPoint {
  underlyingPrice: number;
  payoff: number;
  profit: number;
}

export interface StrategyPayoffResult {
  name: string;
  netPremium: number;
  isNetCredit: boolean;
  maxProfit: number | "Unlimited";
  maxLoss: number | "Unlimited";
  breakevens: number[];
  riskRewardRatio: string;
  selectedSpotPnL: number;
  payoffCurve: PayoffPoint[];
  profitZones: string[];
}
