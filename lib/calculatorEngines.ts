// ============================================================================
// SHARED DETERMINISTIC CALCULATION ENGINES FOR MYCALCULATORS
// Guaranteed identical mathematical output across live UI & worked examples.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. PAYMENT GATEWAY ENGINE
// ----------------------------------------------------------------------------
export interface PaymentGatewayInputs {
  mode: "forward" | "reverse";
  amount: number;
  feePct: number;
  fixedFee: number;
  taxPct: number;
  conversionFeePct: number;
}

export interface PaymentGatewayResult {
  grossAmount: number;
  baseFee: number;
  taxOnFee: number;
  totalGatewayFee: number;
  conversionFee: number;
  totalDeduction: number;
  netReceived: number;
  effectiveFeePct: number;
}

export function calculatePaymentGateway(inputs: PaymentGatewayInputs): PaymentGatewayResult {
  const feePct = Math.max(0, inputs.feePct || 0);
  const fixedFee = Math.max(0, inputs.fixedFee || 0);
  const taxPct = Math.max(0, inputs.taxPct || 0);
  const convPct = Math.max(0, inputs.conversionFeePct || 0);
  const rawAmount = Math.max(0, inputs.amount || 0);

  let grossAmount = 0;
  let netReceived = 0;

  if (inputs.mode === "forward") {
    grossAmount = rawAmount;
    const baseFee = (grossAmount * feePct) / 100 + fixedFee;
    const taxOnFee = (baseFee * taxPct) / 100;
    const totalGatewayFee = baseFee + taxOnFee;
    const conversionFee = (grossAmount * convPct) / 100;
    const totalDeduction = totalGatewayFee + conversionFee;
    netReceived = Math.max(0, grossAmount - totalDeduction);

    const effectiveFeePct = grossAmount > 0 ? (totalDeduction / grossAmount) * 100 : 0;

    return {
      grossAmount,
      baseFee,
      taxOnFee,
      totalGatewayFee,
      conversionFee,
      totalDeduction,
      netReceived,
      effectiveFeePct,
    };
  } else {
    const targetNet = rawAmount;
    const effectiveFeeRate = (feePct / 100) * (1 + taxPct / 100) + convPct / 100;
    const fixedWithTax = fixedFee * (1 + taxPct / 100);

    if (effectiveFeeRate >= 1) {
      grossAmount = 0;
    } else {
      grossAmount = (targetNet + fixedWithTax) / (1 - effectiveFeeRate);
    }

    const baseFee = (grossAmount * feePct) / 100 + fixedFee;
    const taxOnFee = (baseFee * taxPct) / 100;
    const totalGatewayFee = baseFee + taxOnFee;
    const conversionFee = (grossAmount * convPct) / 100;
    const totalDeduction = totalGatewayFee + conversionFee;
    netReceived = targetNet;

    const effectiveFeePct = grossAmount > 0 ? (totalDeduction / grossAmount) * 100 : 0;

    return {
      grossAmount,
      baseFee,
      taxOnFee,
      totalGatewayFee,
      conversionFee,
      totalDeduction,
      netReceived,
      effectiveFeePct,
    };
  }
}

// ----------------------------------------------------------------------------
// 2. UPWORK EARNINGS ENGINE
// ----------------------------------------------------------------------------
export interface UpworkInputs {
  invoiceAmount: number;
  upworkFeePct: number;
  tdsPct: number;
  fxSpreadPct: number;
  withdrawalFee: number;
  otherExpenses: number;
  monthlyProjects?: number;
}

export interface UpworkResult {
  grossInvoice: number;
  upworkServiceFee: number;
  postUpworkAmount: number;
  estimatedTds: number;
  fxFee: number;
  withdrawalFee: number;
  otherExpenses: number;
  totalDeductions: number;
  netPayout: number;
  effectiveDeductionPct: number;
  annualGross: number;
  annualUpworkFees: number;
  annualTds: number;
  annualNet: number;
}

export function calculateUpwork(inputs: UpworkInputs): UpworkResult {
  const grossInvoice = Math.max(0, inputs.invoiceAmount || 0);
  const upworkFeePct = Math.max(0, inputs.upworkFeePct || 0);
  const tdsPct = Math.max(0, inputs.tdsPct || 0);
  const fxSpreadPct = Math.max(0, inputs.fxSpreadPct || 0);
  const withdrawalFee = Math.max(0, inputs.withdrawalFee || 0);
  const otherExpenses = Math.max(0, inputs.otherExpenses || 0);
  const monthlyProj = Math.max(1, inputs.monthlyProjects || 1);

  const upworkServiceFee = (grossInvoice * upworkFeePct) / 100;
  const postUpworkAmount = Math.max(0, grossInvoice - upworkServiceFee);
  
  const estimatedTds = (grossInvoice * tdsPct) / 100;
  const fxFee = (postUpworkAmount * fxSpreadPct) / 100;

  const totalDeductions = upworkServiceFee + estimatedTds + fxFee + withdrawalFee + otherExpenses;
  const netPayout = Math.max(0, grossInvoice - totalDeductions);
  const effectiveDeductionPct = grossInvoice > 0 ? (totalDeductions / grossInvoice) * 100 : 0;

  const annualMultiplier = monthlyProj * 12;
  const annualGross = grossInvoice * annualMultiplier;
  const annualUpworkFees = upworkServiceFee * annualMultiplier;
  const annualTds = estimatedTds * annualMultiplier;
  const annualNet = netPayout * annualMultiplier;

  return {
    grossInvoice,
    upworkServiceFee,
    postUpworkAmount,
    estimatedTds,
    fxFee,
    withdrawalFee,
    otherExpenses,
    totalDeductions,
    netPayout,
    effectiveDeductionPct,
    annualGross,
    annualUpworkFees,
    annualTds,
    annualNet,
  };
}

// ----------------------------------------------------------------------------
// 3. FIVERR EARNINGS ENGINE
// ----------------------------------------------------------------------------
export interface FiverrInputs {
  mode: "forward" | "reverse";
  gigPrice: number;
  extras: number;
  tips: number;
  refunds: number;
  fiverrFeePct: number;
  tdsPct: number;
  fxSpreadPct: number;
  withdrawalFee: number;
  otherExpenses: number;
  targetNet?: number;
}

export interface FiverrResult {
  grossOrderValue: number;
  fiverrFee: number;
  postPlatformAmount: number;
  estimatedTds: number;
  fxFee: number;
  withdrawalFee: number;
  otherExpenses: number;
  totalDeductions: number;
  netEarnings: number;
  effectiveDeductionPct: number;
  netMarginPct: number;
}

export function calculateFiverr(inputs: FiverrInputs): FiverrResult {
  const fiverrFeePct = Math.max(0, inputs.fiverrFeePct || 0);
  const tdsPct = Math.max(0, inputs.tdsPct || 0);
  const fxSpreadPct = Math.max(0, inputs.fxSpreadPct || 0);
  const withdrawalFee = Math.max(0, inputs.withdrawalFee || 0);
  const otherExpenses = Math.max(0, inputs.otherExpenses || 0);

  let grossOrderValue = 0;
  let netEarnings = 0;

  if (inputs.mode === "forward") {
    const rawGross = (inputs.gigPrice || 0) + (inputs.extras || 0) + (inputs.tips || 0) - (inputs.refunds || 0);
    grossOrderValue = Math.max(0, rawGross);

    const fiverrFee = (grossOrderValue * fiverrFeePct) / 100;
    const postPlatformAmount = Math.max(0, grossOrderValue - fiverrFee);
    const estimatedTds = (grossOrderValue * tdsPct) / 100;
    const fxFee = (postPlatformAmount * fxSpreadPct) / 100;

    const totalDeductions = fiverrFee + estimatedTds + fxFee + withdrawalFee + otherExpenses;
    netEarnings = Math.max(0, grossOrderValue - totalDeductions);

    const effectiveDeductionPct = grossOrderValue > 0 ? (totalDeductions / grossOrderValue) * 100 : 0;
    const netMarginPct = grossOrderValue > 0 ? (netEarnings / grossOrderValue) * 100 : 0;

    return {
      grossOrderValue,
      fiverrFee,
      postPlatformAmount,
      estimatedTds,
      fxFee,
      withdrawalFee,
      otherExpenses,
      totalDeductions,
      netEarnings,
      effectiveDeductionPct,
      netMarginPct,
    };
  } else {
    const targetNet = Math.max(0, inputs.targetNet || 0);
    const platformRate = fiverrFeePct / 100;
    const tdsRate = tdsPct / 100;
    const fxRate = (fxSpreadPct / 100) * (1 - platformRate);
    const totalRate = platformRate + tdsRate + fxRate;

    if (totalRate >= 1) {
      grossOrderValue = 0;
    } else {
      grossOrderValue = (targetNet + withdrawalFee + otherExpenses) / (1 - totalRate);
    }

    const fiverrFee = (grossOrderValue * fiverrFeePct) / 100;
    const postPlatformAmount = Math.max(0, grossOrderValue - fiverrFee);
    const estimatedTds = (grossOrderValue * tdsPct) / 100;
    const fxFee = (postPlatformAmount * fxSpreadPct) / 100;

    const totalDeductions = fiverrFee + estimatedTds + fxFee + withdrawalFee + otherExpenses;
    netEarnings = targetNet;

    const effectiveDeductionPct = grossOrderValue > 0 ? (totalDeductions / grossOrderValue) * 100 : 0;
    const netMarginPct = grossOrderValue > 0 ? (netEarnings / grossOrderValue) * 100 : 0;

    return {
      grossOrderValue,
      fiverrFee,
      postPlatformAmount,
      estimatedTds,
      fxFee,
      withdrawalFee,
      otherExpenses,
      totalDeductions,
      netEarnings,
      effectiveDeductionPct,
      netMarginPct,
    };
  }
}

// ----------------------------------------------------------------------------
// 4. E-COMMERCE ROAS & BREAK-EVEN ENGINE
// ----------------------------------------------------------------------------
export interface EcommerceRoasInputs {
  sellingPrice: number;
  orders: number;
  productCost: number;
  shippingCost: number;
  packagingCost: number;
  marketplaceFeePct: number;
  paymentGatewayFeePct: number;
  adSpend: number;
  returnsRefundPct: number;
  discountPct: number;
  otherVariableCost: number;
  fixedCosts: number;
}

export interface EcommerceRoasResult {
  grossRevenue: number;
  netRevenue: number;
  returnsAmount: number;
  totalCogs: number;
  totalShipping: number;
  totalPackaging: number;
  totalMarketplaceFees: number;
  totalPgFees: number;
  totalOtherVar: number;
  totalNonAdVariableCosts: number;
  contributionMargin: number;
  contributionMarginPct: number;
  netProfit: number;
  netProfitMarginPct: number;
  actualRoas: number;
  breakEvenRoas: number;
  currentCac: number;
  maxCac: number;
}

export function calculateEcommerceRoas(inputs: EcommerceRoasInputs): EcommerceRoasResult {
  const orders = Math.max(0, inputs.orders || 0);
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const discountPct = Math.max(0, inputs.discountPct || 0);
  const returnsRefundPct = Math.max(0, inputs.returnsRefundPct || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingCost = Math.max(0, inputs.shippingCost || 0);
  const packagingCost = Math.max(0, inputs.packagingCost || 0);
  const marketplaceFeePct = Math.max(0, inputs.marketplaceFeePct || 0);
  const pgFeePct = Math.max(0, inputs.paymentGatewayFeePct || 0);
  const otherVarUnit = Math.max(0, inputs.otherVariableCost || 0);
  const adSpend = Math.max(0, inputs.adSpend || 0);
  const fixedCosts = Math.max(0, inputs.fixedCosts || 0);

  const effectiveUnitPrice = sellingPrice * (1 - discountPct / 100);
  const grossRevenue = orders * effectiveUnitPrice;
  const netRevenue = grossRevenue * (1 - returnsRefundPct / 100);
  const returnsAmount = grossRevenue - netRevenue;

  const totalCogs = orders * productCost;
  const totalShipping = orders * shippingCost;
  const totalPackaging = orders * packagingCost;
  const totalMarketplaceFees = (netRevenue * marketplaceFeePct) / 100;
  const totalPgFees = (netRevenue * pgFeePct) / 100;
  const totalOtherVar = orders * otherVarUnit;

  const totalNonAdVariableCosts =
    totalCogs + totalShipping + totalPackaging + totalMarketplaceFees + totalPgFees + totalOtherVar;

  const contributionMargin = netRevenue - totalNonAdVariableCosts;
  const contributionMarginPct = netRevenue > 0 ? (contributionMargin / netRevenue) * 100 : 0;

  const netProfit = contributionMargin - adSpend - fixedCosts;
  const netProfitMarginPct = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

  const actualRoas = adSpend > 0 ? grossRevenue / adSpend : 0;
  const breakEvenRoas = contributionMargin > 0 ? grossRevenue / contributionMargin : 0;

  const currentCac = orders > 0 ? adSpend / orders : 0;
  const maxCac = orders > 0 ? Math.max(0, (contributionMargin - fixedCosts) / orders) : 0;

  return {
    grossRevenue,
    netRevenue,
    returnsAmount,
    totalCogs,
    totalShipping,
    totalPackaging,
    totalMarketplaceFees,
    totalPgFees,
    totalOtherVar,
    totalNonAdVariableCosts,
    contributionMargin,
    contributionMarginPct,
    netProfit,
    netProfitMarginPct,
    actualRoas,
    breakEvenRoas,
    currentCac,
    maxCac,
  };
}
