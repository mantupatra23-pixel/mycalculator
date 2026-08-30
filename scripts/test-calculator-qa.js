// Standalone JavaScript QA Test Runner

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

console.log("==================================================");
console.log("RUNNING AUTOMATED CALCULATION QA ENGINE AUDIT");
console.log("==================================================\n");

let failures = 0;
function assertEqual(actual, expected, name) {
  const diff = Math.abs(actual - expected);
  if (diff < 0.01) {
    console.log(`  [PASS] ${name}: ${actual} === ${expected}`);
  } else {
    console.error(`  [FAIL] ${name}: Expected ${expected}, Got ${actual}`);
    failures++;
  }
}

// 1. Upwork Test Case
console.log("1. Testing Upwork Calculator Engine ($1,000 standard example):");
const upworkRes = calculateUpwork({
  invoiceAmount: 1000,
  upworkFeePct: 10,
  tdsPct: 1.0,
  fxSpreadPct: 1.5,
  withdrawalFee: 0.99,
  otherExpenses: 0,
});
assertEqual(upworkRes.grossInvoice, 1000, "Gross Invoice");
assertEqual(upworkRes.upworkServiceFee, 100, "Upwork Service Fee");
assertEqual(upworkRes.estimatedTds, 10, "Estimated TDS");
assertEqual(upworkRes.netPayout, 875.51, "Net Take-Home Payout");

// 2. Fiverr Test Case
console.log("\n2. Testing Fiverr Calculator Engine ($150 gross example):");
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
assertEqual(fiverrRes.netEarnings, 115.10, "Net Take-Home Earnings");

// 3. E-Commerce ROAS Test Case
console.log("\n3. Testing E-Commerce ROAS & Break-Even Engine:");
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
assertEqual(parseFloat(roasRes.actualRoas.toFixed(2)), 6.00, "Actual ROAS");
assertEqual(parseFloat(roasRes.breakEvenRoas.toFixed(2)), 2.04, "Break-Even ROAS Target");
assertEqual(roasRes.netProfit, 38466.30, "Net Profit");

// 4. Payment Gateway Forward & Reverse
console.log("\n4. Testing Payment Gateway Engine:");
const pgForward = calculatePaymentGateway({
  mode: "forward",
  amount: 10000,
  feePct: 2.0,
  fixedFee: 0,
  taxPct: 18,
  conversionFeePct: 0,
});
assertEqual(pgForward.netReceived, 9764, "Net Received Payout");

console.log("\n==================================================");
if (failures === 0) {
  console.log("ALL AUTOMATED QA TESTS PASSED SUCCESSFULLY (0 ERRORS)");
} else {
  console.error(`QA TEST FAILED WITH ${failures} ERRORS`);
  process.exit(1);
}
console.log("==================================================");
