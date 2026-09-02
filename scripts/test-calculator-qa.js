// ============================================================================
// STANDALONE UNIFIED AUTOMATED QA TEST RUNNER (ALL 7 CALCULATOR ENGINES)
// Pure JavaScript execution for Termux/Node.js with zero TypeScript dependencies
// ============================================================================

function calculatePaymentGateway(inputs) {
  const feePct = Math.max(0, inputs.feePct || 0);
  const fixedFee = Math.max(0, inputs.fixedFee || 0);
  const taxPct = Math.max(0, inputs.taxPct || 0);
  const convPct = Math.max(0, inputs.conversionFeePct || 0);
  const rawAmount = Math.max(0, inputs.amount || 0);

  if (inputs.mode === "forward") {
    const grossAmount = rawAmount;
    const baseFee = (grossAmount * feePct) / 100 + fixedFee;
    const taxOnFee = (baseFee * taxPct) / 100;
    const totalGatewayFee = baseFee + taxOnFee;
    const conversionFee = (grossAmount * convPct) / 100;
    const totalDeduction = totalGatewayFee + conversionFee;
    const netReceived = Math.max(0, grossAmount - totalDeduction);
    const effectiveFeePct = grossAmount > 0 ? (totalDeduction / grossAmount) * 100 : 0;
    return { grossAmount, totalGatewayFee, totalDeduction, netReceived, effectiveFeePct };
  } else {
    const targetNet = rawAmount;
    const effectiveFeeRate = (feePct / 100) * (1 + taxPct / 100) + convPct / 100;
    const fixedWithTax = fixedFee * (1 + taxPct / 100);
    const grossAmount = effectiveFeeRate >= 1 ? 0 : (targetNet + fixedWithTax) / (1 - effectiveFeeRate);
    const baseFee = (grossAmount * feePct) / 100 + fixedFee;
    const taxOnFee = (baseFee * taxPct) / 100;
    const totalGatewayFee = baseFee + taxOnFee;
    const conversionFee = (grossAmount * convPct) / 100;
    const totalDeduction = totalGatewayFee + conversionFee;
    const netReceived = targetNet;
    const effectiveFeePct = grossAmount > 0 ? (totalDeduction / grossAmount) * 100 : 0;
    return { grossAmount, totalGatewayFee, totalDeduction, netReceived, effectiveFeePct };
  }
}

function calculateUpwork(inputs) {
  const grossInvoice = Math.max(0, inputs.invoiceAmount || 0);
  const upworkFeePct = Math.max(0, inputs.upworkFeePct || 0);
  const tdsPct = Math.max(0, inputs.tdsPct || 0);
  const fxSpreadPct = Math.max(0, inputs.fxSpreadPct || 0);
  const withdrawalFee = Math.max(0, inputs.withdrawalFee || 0);
  const otherExpenses = Math.max(0, inputs.otherExpenses || 0);

  const upworkServiceFee = (grossInvoice * upworkFeePct) / 100;
  const postUpworkAmount = Math.max(0, grossInvoice - upworkServiceFee);
  const estimatedTds = (grossInvoice * tdsPct) / 100;
  const fxFee = (postUpworkAmount * fxSpreadPct) / 100;

  const totalDeductions = upworkServiceFee + estimatedTds + fxFee + withdrawalFee + otherExpenses;
  const netPayout = Math.max(0, grossInvoice - totalDeductions);
  const effectiveDeductionPct = grossInvoice > 0 ? (totalDeductions / grossInvoice) * 100 : 0;

  return { grossInvoice, upworkServiceFee, estimatedTds, fxFee, withdrawalFee, netPayout, effectiveDeductionPct };
}

function calculateFiverr(inputs) {
  const rawGross = (inputs.gigPrice || 0) + (inputs.extras || 0) + (inputs.tips || 0) - (inputs.refunds || 0);
  const grossOrderValue = Math.max(0, rawGross);
  const fiverrFeePct = Math.max(0, inputs.fiverrFeePct || 0);
  const tdsPct = Math.max(0, inputs.tdsPct || 0);
  const fxSpreadPct = Math.max(0, inputs.fxSpreadPct || 0);
  const withdrawalFee = Math.max(0, inputs.withdrawalFee || 0);
  const otherExpenses = Math.max(0, inputs.otherExpenses || 0);

  const fiverrFee = (grossOrderValue * fiverrFeePct) / 100;
  const postPlatformAmount = Math.max(0, grossOrderValue - fiverrFee);
  const estimatedTds = (grossOrderValue * tdsPct) / 100;
  const fxFee = (postPlatformAmount * fxSpreadPct) / 100;

  const totalDeductions = fiverrFee + estimatedTds + fxFee + withdrawalFee + otherExpenses;
  const netEarnings = Math.max(0, grossOrderValue - totalDeductions);
  const netMarginPct = grossOrderValue > 0 ? (netEarnings / grossOrderValue) * 100 : 0;

  return { grossOrderValue, fiverrFee, postPlatformAmount, estimatedTds, totalDeductions, netEarnings, netMarginPct };
}

function calculateEcommerceRoas(inputs) {
  const orders = Math.max(0, inputs.orders || 0);
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const returnsRefundPct = Math.max(0, inputs.returnsRefundPct || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingCost = Math.max(0, inputs.shippingCost || 0);
  const packagingCost = Math.max(0, inputs.packagingCost || 0);
  const marketplaceFeePct = Math.max(0, inputs.marketplaceFeePct || 0);
  const pgFeePct = Math.max(0, inputs.paymentGatewayFeePct || 0);
  const adSpend = Math.max(0, inputs.adSpend || 0);
  const fixedCosts = Math.max(0, inputs.fixedCosts || 0);

  const grossRevenue = orders * sellingPrice;
  const netRevenue = grossRevenue * (1 - returnsRefundPct / 100);

  const totalCogs = orders * productCost;
  const totalShipping = orders * shippingCost;
  const totalPackaging = orders * packagingCost;
  const totalMarketplaceFees = (netRevenue * marketplaceFeePct) / 100;
  const totalPgFees = (netRevenue * pgFeePct) / 100;

  const totalNonAdVariableCosts = totalCogs + totalShipping + totalPackaging + totalMarketplaceFees + totalPgFees;
  const contributionMargin = netRevenue - totalNonAdVariableCosts;
  const netProfit = contributionMargin - adSpend - fixedCosts;

  const actualRoas = adSpend > 0 ? grossRevenue / adSpend : 0;
  const breakEvenRoas = contributionMargin > 0 ? grossRevenue / contributionMargin : 0;
  const maxCac = orders > 0 ? Math.max(0, (contributionMargin - fixedCosts) / orders) : 0;

  return { grossRevenue, netRevenue, totalNonAdVariableCosts, contributionMargin, netProfit, actualRoas, breakEvenRoas, maxCac };
}

function calculateParcelRealEarnings(inputs) {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const discount = Math.max(0, inputs.discount || 0);
  const grossRevenue = Math.max(0, sellingPrice - discount);
  const returnRatePct = Math.max(0, inputs.returnRatePct || 0);
  const rtoRatePct = Math.max(0, inputs.rtoRatePct || 0);
  const avgReturnCost = Math.max(0, inputs.avgReturnCost || 0);
  const monthlyOrders = Math.max(1, inputs.monthlyOrders || 100);

  const effectiveReturnRatePct = Math.min(100, returnRatePct + rtoRatePct);
  const expectedRevenue = grossRevenue * (1 - effectiveReturnRatePct / 100);

  const marketplaceFee = (grossRevenue * (inputs.marketplaceFeePct || 0)) / 100;
  const paymentFee = (grossRevenue * (inputs.paymentFeePct || 0)) / 100;
  const totalCommission = marketplaceFee + paymentFee + (inputs.fixedPaymentFee || 0);
  const taxOnFees = (totalCommission * (inputs.gstOnFeesPct || 0)) / 100;

  const expectedReturnRtoCost = (effectiveReturnRatePct / 100) * avgReturnCost;
  const totalDirectCost = (inputs.productCost || 0) + (inputs.shippingCost || 0) + (inputs.packagingCost || 0) + (inputs.otherExpense || 0);

  const totalDeductions = totalDirectCost + totalCommission + taxOnFees + expectedReturnRtoCost;
  const expectedNetEarnings = expectedRevenue - totalDeductions;
  const profitMarginPct = grossRevenue > 0 ? (expectedNetEarnings / grossRevenue) * 100 : 0;
  const monthlyNetEarnings = expectedNetEarnings * monthlyOrders;

  return { grossRevenue, expectedRevenue, totalCommission, taxOnFees, totalDeductions, expectedNetEarnings, profitMarginPct, monthlyNetEarnings };
}

function calculateTravelRealCost(inputs) {
  const travelers = Math.max(1, inputs.travelers || 1);
  const days = Math.max(1, inputs.days || 1);
  const nights = Math.max(0, inputs.nights || 0);
  const rooms = Math.max(1, inputs.rooms || 1);

  const accommodationTotal = (inputs.hotelPerNight || 0) * nights * rooms;
  const transportTotal = (inputs.flightTrainTotal || 0) + (inputs.localTransportPerDay || 0) * days + (inputs.airportTransfers || 0) + (inputs.fuelTollParking || 0);
  const foodTotal = (inputs.foodPerPersonPerDay || 0) * travelers * days + (inputs.snacksPerDay || 0) * days;
  const activitiesTotal = (inputs.sightseeingTickets || 0) + (inputs.activitiesTotal || 0);
  const shoppingTotal = inputs.shoppingBudget || 0;
  const hiddenFeesTotal = (inputs.insuranceTotal || 0) + (inputs.visaPermits || 0) + (inputs.bookingFees || 0) + (inputs.emergencyBudget || 0);

  const subtotal = accommodationTotal + transportTotal + foodTotal + activitiesTotal + shoppingTotal + hiddenFeesTotal;
  const contingencyAmount = (subtotal * (inputs.contingencyPct || 0)) / 100;
  const totalRealCost = subtotal + contingencyAmount;
  const costPerPerson = totalRealCost / travelers;
  const costPerDay = totalRealCost / days;

  return { transportTotal, accommodationTotal, foodTotal, activitiesTotal, shoppingTotal, hiddenFeesTotal, subtotal, contingencyAmount, totalRealCost, costPerPerson, costPerDay };
}

function calculateConstructionMaterial(inputs) {
  const area = Math.max(1, inputs.builtUpArea || 1000);
  const isSqM = inputs.areaUnit === "sqm";
  const builtUpAreaSqFt = isSqM ? area * 10.7639 : area;

  let totalRawMaterialCost = 0;
  let totalWastageCost = 0;
  let totalMaterialBudget = 0;

  (inputs.materials || []).forEach((m) => {
    const qty = Math.max(0, m.quantity || 0);
    const rate = Math.max(0, m.rate || 0);
    const wastage = Math.max(0, m.wastagePct || 0);

    const effectiveQty = qty * (1 + wastage / 100);
    const rawCost = qty * rate;
    const wastageCost = qty * (wastage / 100) * rate;
    const rowTotal = effectiveQty * rate;

    totalRawMaterialCost += rawCost;
    totalWastageCost += wastageCost;
    totalMaterialBudget += rowTotal;
  });

  const labourCost = Math.max(0, inputs.labourCost || 0);
  const otherCosts = Math.max(0, inputs.consultantCost || 0) + Math.max(0, inputs.permitCost || 0);
  const subtotal = totalMaterialBudget + labourCost + otherCosts;
  const contingencyAmount = (subtotal * Math.max(0, inputs.contingencyPct || 0)) / 100;
  const totalProjectBudget = subtotal + contingencyAmount;

  const costPerSqFtMaterial = builtUpAreaSqFt > 0 ? totalMaterialBudget / builtUpAreaSqFt : 0;
  const costPerSqFtProject = builtUpAreaSqFt > 0 ? totalProjectBudget / builtUpAreaSqFt : 0;

  const sensitivityRatePct = Math.max(0, inputs.sensitivityRatePct ?? 5);
  const sensitivityIncreaseCost = (totalMaterialBudget * sensitivityRatePct) / 100;
  const sensitivityTotalCost = totalMaterialBudget + sensitivityIncreaseCost;

  return { totalRawMaterialCost, totalWastageCost, totalMaterialBudget, labourCost, otherCosts, contingencyAmount, totalProjectBudget, costPerSqFtMaterial, costPerSqFtProject, sensitivityIncreaseCost, sensitivityTotalCost };
}

console.log("==================================================");
console.log("RUNNING COMPLETE AUTOMATED QA AUDIT (ALL 7 ENGINES)");
console.log("==================================================\n");

let failures = 0;
function assertEqual(actual, expected, name) {
  const diff = Math.abs(actual - expected);
  if (diff < 0.05) {
    console.log(`  [PASS] ${name}: ${actual} === ${expected}`);
  } else {
    console.error(`  [FAIL] ${name}: Expected ${expected}, Got ${actual}`);
    failures++;
  }
}

// 1. Upwork Test
console.log("1. Testing Upwork Engine ($1,000 Contract):");
const upworkRes = calculateUpwork({
  invoiceAmount: 1000,
  upworkFeePct: 10,
  tdsPct: 1.0,
  fxSpreadPct: 1.5,
  withdrawalFee: 0.99,
  otherExpenses: 0,
});
assertEqual(upworkRes.grossInvoice, 1000, "Gross Invoice");
assertEqual(upworkRes.upworkServiceFee, 100, "10% Service Fee");
assertEqual(upworkRes.estimatedTds, 10, "1% TDS");
assertEqual(upworkRes.netPayout, 875.51, "Net Payout ($875.51)");

// 2. Fiverr Test
console.log("\n2. Testing Fiverr Engine ($150 Order):");
const fiverrRes = calculateFiverr({
  gigPrice: 100,
  extras: 30,
  tips: 20,
  refunds: 0,
  fiverrFeePct: 20,
  tdsPct: 1.0,
  fxSpreadPct: 2.0,
  withdrawalFee: 1.00,
  otherExpenses: 0,
});
assertEqual(fiverrRes.grossOrderValue, 150, "Gross Order Value");
assertEqual(fiverrRes.netEarnings, 115.10, "Net In-Pocket ($115.10)");

// 3. E-Commerce ROAS Test
console.log("\n3. Testing E-Commerce ROAS Engine (100 Orders @ ₹1,499):");
const roasRes = calculateEcommerceRoas({
  sellingPrice: 1499,
  orders: 100,
  productCost: 400,
  shippingCost: 90,
  packagingCost: 30,
  marketplaceFeePct: 5,
  paymentGatewayFeePct: 2,
  adSpend: 25000,
  returnsRefundPct: 10,
  fixedCosts: 10000,
});
assertEqual(parseFloat(roasRes.actualRoas.toFixed(2)), 6.00, "Actual ROAS (6.00x)");
assertEqual(parseFloat(roasRes.breakEvenRoas.toFixed(2)), 2.04, "Break-Even ROAS (2.04x)");
assertEqual(roasRes.netProfit, 38466.30, "Net Profit (₹38,466.30)");

// 4. Payment Gateway Forward & Reverse Test
console.log("\n4. Testing Payment Gateway Engine (₹10,000 Transaction):");
const pgForward = calculatePaymentGateway({
  mode: "forward",
  amount: 10000,
  feePct: 2.0,
  fixedFee: 0,
  taxPct: 18,
  conversionFeePct: 0,
});
assertEqual(pgForward.netReceived, 9764, "Forward Net Received (₹9,764)");

const pgReverse = calculatePaymentGateway({
  mode: "reverse",
  amount: 9764,
  feePct: 2.0,
  fixedFee: 0,
  taxPct: 18,
  conversionFeePct: 0,
});
assertEqual(parseFloat(pgReverse.grossAmount.toFixed(2)), 10000.00, "Reverse Gross Charge (₹10,000.00)");

// 5. Parcel Real Earnings Test
console.log("\n5. Testing Parcel Real Earnings Engine (₹1,000 Parcel):");
const parcelRes = calculateParcelRealEarnings({
  sellingPrice: 1000,
  discount: 0,
  productCost: 300,
  shippingCost: 70,
  packagingCost: 20,
  marketplaceFeePct: 10,
  paymentFeePct: 2,
  fixedPaymentFee: 10,
  returnRatePct: 5,
  rtoRatePct: 10,
  avgReturnCost: 100,
  gstOnFeesPct: 18,
  otherExpense: 10,
  monthlyOrders: 100,
});
assertEqual(parcelRes.expectedRevenue, 850.00, "Expected Revenue (15% Returns)");
assertEqual(parcelRes.totalDeductions, 568.40, "Total Deductions");
assertEqual(parcelRes.expectedNetEarnings, 281.60, "Net per Parcel (₹281.60)");
assertEqual(parseFloat(parcelRes.profitMarginPct.toFixed(2)), 28.16, "Profit Margin % (28.16%)");
assertEqual(parcelRes.monthlyNetEarnings, 28160.00, "Monthly Net (₹28,160)");

// 6. Travel Real Cost Test
console.log("\n6. Testing Travel Real Cost Engine (2 Travelers, 5 Days):");
const travelRes = calculateTravelRealCost({
  travelers: 2,
  days: 5,
  nights: 4,
  rooms: 1,
  flightTrainTotal: 14000,
  localTransportPerDay: 1000,
  airportTransfers: 1200,
  fuelTollParking: 800,
  hotelPerNight: 3000,
  foodPerPersonPerDay: 800,
  snacksPerDay: 400,
  sightseeingTickets: 2500,
  activitiesTotal: 3500,
  shoppingBudget: 4000,
  insuranceTotal: 600,
  visaPermits: 0,
  bookingFees: 400,
  emergencyBudget: 1000,
  contingencyPct: 5,
});
assertEqual(travelRes.transportTotal, 21000.00, "Transport Total (₹21,000)");
assertEqual(travelRes.accommodationTotal, 12000.00, "Lodging Total (₹12,000)");
assertEqual(travelRes.subtotal, 55000.00, "Subtotal (₹55,000)");
assertEqual(travelRes.contingencyAmount, 2750.00, "5% Contingency (₹2,750)");
assertEqual(travelRes.totalRealCost, 57750.00, "Total Real Trip Cost (₹57,750)");
assertEqual(travelRes.costPerPerson, 28875.00, "Cost per Person (₹28,875)");
assertEqual(travelRes.costPerDay, 11550.00, "Cost per Day (₹11,550)");

// 7. Construction Material Engine Test
console.log("\n7. Testing Construction Material Engine (1,000 sq ft):");
const constrRes = calculateConstructionMaterial({
  builtUpArea: 1000,
  areaUnit: "sqft",
  materials: [
    { id: "1", name: "Cement", quantity: 450, unit: "bags", rate: 390, wastagePct: 3 },
    { id: "2", name: "Steel", quantity: 3500, unit: "kg", rate: 68, wastagePct: 4 },
    { id: "3", name: "Sand", quantity: 1800, unit: "cu ft", rate: 55, wastagePct: 5 },
    { id: "4", name: "Aggregate", quantity: 1400, unit: "cu ft", rate: 42, wastagePct: 5 },
    { id: "5", name: "Bricks", quantity: 18000, unit: "pcs", rate: 9, wastagePct: 6 },
    { id: "6", name: "Tiles", quantity: 1100, unit: "sq ft", rate: 65, wastagePct: 8 },
    { id: "7", name: "Paint", quantity: 180, unit: "liters", rate: 320, wastagePct: 4 },
    { id: "8", name: "Electrical", quantity: 1, unit: "set", rate: 55000, wastagePct: 2 },
    { id: "9", name: "Plumbing", quantity: 1, unit: "set", rate: 48000, wastagePct: 3 },
    { id: "10", name: "Doors & Windows", quantity: 8, unit: "units", rate: 9500, wastagePct: 2 },
  ],
  labourCost: 350000,
  consultantCost: 35000,
  permitCost: 20000,
  contingencyPct: 5,
  sensitivityRatePct: 5,
});
assertEqual(constrRes.totalRawMaterialCost, 1041400.00, "Raw Material Cost (₹10,41,400)");
assertEqual(constrRes.totalWastageCost, 44479.00, "Site Handling Wastage (₹44,479)");
assertEqual(constrRes.totalMaterialBudget, 1085879.00, "Total Material Budget (₹10,85,879)");
assertEqual(parseFloat(constrRes.costPerSqFtMaterial.toFixed(2)), 1085.88, "Material Cost / sq ft (₹1,085.88)");
assertEqual(parseFloat(constrRes.totalProjectBudget.toFixed(2)), 1565422.95, "Total Project Budget (₹15,65,422.95)");
assertEqual(parseFloat(constrRes.sensitivityIncreaseCost.toFixed(2)), 54293.95, "+5% Inflation Impact (₹54,293.95)");

// 8. Edge Case Tests (Guards against NaN, Infinity, negative values)
console.log("\n8. Testing Guardrails & Edge Cases (Zero/Negative/Extreme):");
const zeroParcel = calculateParcelRealEarnings({ sellingPrice: 0, productCost: 0, returnRatePct: 150 });
assertEqual(zeroParcel.expectedNetEarnings, 0, "Zero Parcel Net Earnings");

const zeroTravel = calculateTravelRealCost({ travelers: 0, days: 0 });
assertEqual(zeroTravel.totalRealCost, 0, "Zero Travel Guarded");

const zeroRoas = calculateEcommerceRoas({ sellingPrice: 0, orders: 0, adSpend: 0 });
assertEqual(zeroRoas.actualRoas, 0, "Zero ROAS Guarded");

console.log("\n==================================================");
if (failures === 0) {
  console.log("SUCCESS: ALL 7 PRODUCTION ENGINES PASSED QA WITH 0 ERRORS");
} else {
  console.error(`FAILURE: QA TEST FAILED WITH ${failures} ERRORS`);
  process.exit(1);
}
console.log("==================================================");
