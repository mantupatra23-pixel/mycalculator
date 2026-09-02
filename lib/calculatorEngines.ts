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

// ----------------------------------------------------------------------------
// 5. PARCEL REAL EARNINGS ENGINE ("Parcel आया तो असल में कितना मिलेगा?")
// ----------------------------------------------------------------------------
export interface ParcelEarningsInputs {
  sellingPrice: number;
  discount: number;
  productCost: number;
  shippingCost: number;
  packagingCost: number;
  marketplaceFeePct: number;
  paymentFeePct: number;
  fixedPaymentFee: number;
  returnRatePct: number;
  rtoRatePct: number;
  avgReturnCost: number;
  gstOnFeesPct: number;
  otherExpense: number;
  monthlyOrders?: number;
}

export interface ParcelEarningsResult {
  grossRevenue: number;
  effectiveReturnRatePct: number;
  expectedRevenue: number;
  marketplaceFee: number;
  paymentFee: number;
  fixedPaymentFee: number;
  totalPlatformCommission: number;
  taxOnFees: number;
  expectedReturnRtoCost: number;
  totalDirectCost: number;
  totalDeductions: number;
  expectedNetEarnings: number;
  profitMarginPct: number;
  revenueRetainedPct: number;
  totalLeakagePct: number;
  monthlyOrders: number;
  monthlyNetEarnings: number;
}

export function calculateParcelRealEarnings(inputs: ParcelEarningsInputs): ParcelEarningsResult {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const discount = Math.max(0, inputs.discount || 0);
  const grossRevenue = Math.max(0, sellingPrice - discount);

  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingCost = Math.max(0, inputs.shippingCost || 0);
  const packagingCost = Math.max(0, inputs.packagingCost || 0);
  const otherExpense = Math.max(0, inputs.otherExpense || 0);

  const marketplaceFeePct = Math.max(0, inputs.marketplaceFeePct || 0);
  const paymentFeePct = Math.max(0, inputs.paymentFeePct || 0);
  const fixedPaymentFee = Math.max(0, inputs.fixedPaymentFee || 0);
  const gstOnFeesPct = Math.max(0, inputs.gstOnFeesPct || 0);

  const returnRatePct = Math.max(0, inputs.returnRatePct || 0);
  const rtoRatePct = Math.max(0, inputs.rtoRatePct || 0);
  const avgReturnCost = Math.max(0, inputs.avgReturnCost || 0);
  const monthlyOrders = Math.max(1, inputs.monthlyOrders || 100);

  const effectiveReturnRatePct = Math.min(100, returnRatePct + rtoRatePct);
  const expectedRevenue = grossRevenue * (1 - effectiveReturnRatePct / 100);

  const marketplaceFee = (grossRevenue * marketplaceFeePct) / 100;
  const paymentFee = (grossRevenue * paymentFeePct) / 100;
  const totalPlatformCommission = marketplaceFee + paymentFee + fixedPaymentFee;
  const taxOnFees = (totalPlatformCommission * gstOnFeesPct) / 100;

  const expectedReturnRtoCost = (effectiveReturnRatePct / 100) * avgReturnCost;
  const totalDirectCost = productCost + shippingCost + packagingCost + otherExpense;

  const totalDeductions =
    totalDirectCost + totalPlatformCommission + taxOnFees + expectedReturnRtoCost;

  const expectedNetEarnings = expectedRevenue - totalDeductions;
  const profitMarginPct = grossRevenue > 0 ? (expectedNetEarnings / grossRevenue) * 100 : 0;
  const revenueRetainedPct = grossRevenue > 0 ? (Math.max(0, expectedNetEarnings) / grossRevenue) * 100 : 0;
  const totalLeakagePct = 100 - profitMarginPct;
  const monthlyNetEarnings = expectedNetEarnings * monthlyOrders;

  return {
    grossRevenue,
    effectiveReturnRatePct,
    expectedRevenue,
    marketplaceFee,
    paymentFee,
    fixedPaymentFee,
    totalPlatformCommission,
    taxOnFees,
    expectedReturnRtoCost,
    totalDirectCost,
    totalDeductions,
    expectedNetEarnings,
    profitMarginPct,
    revenueRetainedPct,
    totalLeakagePct,
    monthlyOrders,
    monthlyNetEarnings,
  };
}

// ----------------------------------------------------------------------------
// 6. TRAVEL REAL COST ENGINE ("Trip ka actual total kharcha kitna hoga?")
// ----------------------------------------------------------------------------
export interface TravelCostInputs {
  travelers: number;
  days: number;
  nights: number;
  flightTrainTotal: number;
  localTransportPerDay: number;
  airportTransfers: number;
  fuelTollParking: number;
  hotelPerNight: number;
  rooms: number;
  foodPerPersonPerDay: number;
  snacksPerDay: number;
  sightseeingTickets: number;
  activitiesTotal: number;
  shoppingBudget: number;
  insuranceTotal: number;
  visaPermits: number;
  bookingFees: number;
  emergencyBudget: number;
  contingencyPct: number;
  plannedBudget?: number;
}

export interface TravelCostResult {
  accommodationTotal: number;
  transportTotal: number;
  foodTotal: number;
  activitiesTotal: number;
  shoppingTotal: number;
  hiddenFeesTotal: number;
  subtotal: number;
  contingencyAmount: number;
  totalRealCost: number;
  costPerPerson: number;
  costPerDay: number;
  stayPctOfTotal: number;
  hiddenCostTotal: number;
  budgetStatus: "under" | "near" | "over" | "none";
  budgetVariance: number;
}

export function calculateTravelRealCost(inputs: TravelCostInputs): TravelCostResult {
  const travelers = Math.max(1, inputs.travelers || 1);
  const days = Math.max(1, inputs.days || 1);
  const nights = Math.max(0, inputs.nights || 0);
  const rooms = Math.max(1, inputs.rooms || 1);

  const accommodationTotal = Math.max(0, inputs.hotelPerNight || 0) * nights * rooms;

  const totalLocalTransport = Math.max(0, inputs.localTransportPerDay || 0) * days;
  const transportTotal =
    Math.max(0, inputs.flightTrainTotal || 0) +
    totalLocalTransport +
    Math.max(0, inputs.airportTransfers || 0) +
    Math.max(0, inputs.fuelTollParking || 0);

  const foodTotal =
    Math.max(0, inputs.foodPerPersonPerDay || 0) * travelers * days +
    Math.max(0, inputs.snacksPerDay || 0) * days;

  const activitiesTotal =
    Math.max(0, inputs.sightseeingTickets || 0) + Math.max(0, inputs.activitiesTotal || 0);

  const shoppingTotal = Math.max(0, inputs.shoppingBudget || 0);

  const hiddenFeesTotal =
    Math.max(0, inputs.insuranceTotal || 0) +
    Math.max(0, inputs.visaPermits || 0) +
    Math.max(0, inputs.bookingFees || 0) +
    Math.max(0, inputs.emergencyBudget || 0);

  const subtotal =
    accommodationTotal + transportTotal + foodTotal + activitiesTotal + shoppingTotal + hiddenFeesTotal;

  const contingencyPct = Math.max(0, inputs.contingencyPct || 0);
  const contingencyAmount = (subtotal * contingencyPct) / 100;
  const totalRealCost = subtotal + contingencyAmount;

  const costPerPerson = totalRealCost / travelers;
  const costPerDay = totalRealCost / days;
  const stayPctOfTotal = totalRealCost > 0 ? (accommodationTotal / totalRealCost) * 100 : 0;
  const hiddenCostTotal = hiddenFeesTotal + contingencyAmount;

  const plannedBudget = inputs.plannedBudget ? Math.max(0, inputs.plannedBudget) : 0;
  let budgetStatus: "under" | "near" | "over" | "none" = "none";
  let budgetVariance = 0;

  if (plannedBudget > 0) {
    budgetVariance = plannedBudget - totalRealCost;
    if (budgetVariance < 0) {
      budgetStatus = "over";
    } else if (budgetVariance <= plannedBudget * 0.05) {
      budgetStatus = "near";
    } else {
      budgetStatus = "under";
    }
  }

  return {
    accommodationTotal,
    transportTotal,
    foodTotal,
    activitiesTotal,
    shoppingTotal,
    hiddenFeesTotal,
    subtotal,
    contingencyAmount,
    totalRealCost,
    costPerPerson,
    costPerDay,
    stayPctOfTotal,
    hiddenCostTotal,
    budgetStatus,
    budgetVariance,
  };
}

// ----------------------------------------------------------------------------
// 7. CONSTRUCTION MATERIAL PRICE INTELLIGENCE ENGINE
// ----------------------------------------------------------------------------
export interface MaterialRowItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  rate: number;
  wastagePct: number;
}

export interface ConstructionMaterialInputs {
  builtUpArea: number;
  areaUnit: "sqft" | "sqm";
  projectType: string;
  floors: number;
  materials: MaterialRowItem[];
  labourCost: number;
  consultantCost: number;
  permitCost: number;
  contingencyPct: number;
  sensitivityRatePct?: number;
}

export interface MaterialRowCalculated extends MaterialRowItem {
  effectiveQuantity: number;
  materialCost: number;
  wastageCost: number;
  totalRowCost: number;
  sharePct: number;
}

export interface ConstructionMaterialResult {
  builtUpAreaSqFt: number;
  builtUpAreaSqM: number;
  calculatedRows: MaterialRowCalculated[];
  totalRawMaterialCost: number;
  totalWastageCost: number;
  totalMaterialBudget: number;
  costPerSqFtMaterial: number;
  costPerSqMMaterial: number;
  labourCost: number;
  otherProjectCosts: number;
  contingencyAmount: number;
  totalProjectBudget: number;
  costPerSqFtProject: number;
  largestMaterialCategory: { name: string; cost: number; sharePct: number };
  sensitivityIncreaseCost: number;
  sensitivityTotalCost: number;
  sensitivityRatePct: number;
}

export function calculateConstructionMaterial(
  inputs: ConstructionMaterialInputs
): ConstructionMaterialResult {
  const area = Math.max(1, inputs.builtUpArea || 1000);
  const isSqM = inputs.areaUnit === "sqm";
  const builtUpAreaSqFt = isSqM ? area * 10.7639 : area;
  const builtUpAreaSqM = isSqM ? area : area / 10.7639;

  let totalRawMaterialCost = 0;
  let totalWastageCost = 0;
  let totalMaterialBudget = 0;

  const preliminaryRows = (inputs.materials || []).map((m) => {
    const qty = Math.max(0, m.quantity || 0);
    const rate = Math.max(0, m.rate || 0);
    const wastage = Math.max(0, m.wastagePct || 0);

    const effectiveQuantity = qty * (1 + wastage / 100);
    const materialCost = qty * rate;
    const wastageCost = qty * (wastage / 100) * rate;
    const totalRowCost = effectiveQuantity * rate;

    totalRawMaterialCost += materialCost;
    totalWastageCost += wastageCost;
    totalMaterialBudget += totalRowCost;

    return {
      ...m,
      effectiveQuantity,
      materialCost,
      wastageCost,
      totalRowCost,
      sharePct: 0,
    };
  });

  let largestCategory = { name: "None", cost: 0, sharePct: 0 };

  const calculatedRows: MaterialRowCalculated[] = preliminaryRows.map((row) => {
    const sharePct = totalMaterialBudget > 0 ? (row.totalRowCost / totalMaterialBudget) * 100 : 0;
    if (row.totalRowCost > largestCategory.cost) {
      largestCategory = { name: row.name, cost: row.totalRowCost, sharePct };
    }
    return {
      ...row,
      sharePct,
    };
  });

  const labourCost = Math.max(0, inputs.labourCost || 0);
  const otherProjectCosts =
    Math.max(0, inputs.consultantCost || 0) + Math.max(0, inputs.permitCost || 0);

  const subtotalBeforeContingency = totalMaterialBudget + labourCost + otherProjectCosts;
  const contingencyPct = Math.max(0, inputs.contingencyPct || 0);
  const contingencyAmount = (subtotalBeforeContingency * contingencyPct) / 100;
  const totalProjectBudget = subtotalBeforeContingency + contingencyAmount;

  const costPerSqFtMaterial = builtUpAreaSqFt > 0 ? totalMaterialBudget / builtUpAreaSqFt : 0;
  const costPerSqMMaterial = builtUpAreaSqM > 0 ? totalMaterialBudget / builtUpAreaSqM : 0;
  const costPerSqFtProject = builtUpAreaSqFt > 0 ? totalProjectBudget / builtUpAreaSqFt : 0;

  const sensitivityRatePct = Math.max(0, inputs.sensitivityRatePct ?? 5);
  const sensitivityIncreaseCost = (totalMaterialBudget * sensitivityRatePct) / 100;
  const sensitivityTotalCost = totalMaterialBudget + sensitivityIncreaseCost;

  return {
    builtUpAreaSqFt,
    builtUpAreaSqM,
    calculatedRows,
    totalRawMaterialCost,
    totalWastageCost,
    totalMaterialBudget,
    costPerSqFtMaterial,
    costPerSqMMaterial,
    labourCost,
    otherProjectCosts,
    contingencyAmount,
    totalProjectBudget,
    costPerSqFtProject,
    largestMaterialCategory: largestCategory,
    sensitivityIncreaseCost,
    sensitivityTotalCost,
    sensitivityRatePct,
  };
}
