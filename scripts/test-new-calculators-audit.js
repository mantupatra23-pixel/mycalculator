const {
  calculateParcelRealEarnings,
  calculateTravelRealCost,
  calculateConstructionMaterial
} = require('../lib/calculatorEngines');

console.log("==================================================");
console.log("RUNNING QA AUDIT: 3 NEW PRODUCTION CALCULATORS");
console.log("==================================================\n");

let errors = 0;
function assertEqual(actual, expected, label) {
  if (Math.abs(actual - expected) < 0.05) {
    console.log(`  [PASS] ${label}: ${actual} === ${expected}`);
  } else {
    console.error(`  [FAIL] ${label}: Expected ${expected}, Got ${actual}`);
    errors++;
  }
}

// 1. Parcel Real Earnings Test
console.log("1. Parcel Real Earnings Engine:");
const p = calculateParcelRealEarnings({
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
  monthlyOrders: 100
});
assertEqual(p.expectedRevenue, 850.00, "Expected Revenue");
assertEqual(p.totalDeductions, 568.40, "Total Deductions");
assertEqual(p.expectedNetEarnings, 281.60, "Net In-Pocket per Parcel");
assertEqual(parseFloat(p.profitMarginPct.toFixed(2)), 28.16, "Profit Margin %");
assertEqual(p.monthlyNetEarnings, 28160.00, "Monthly Run Rate (100 orders)");

// 2. Travel Real Cost Test
console.log("\n2. Travel Real Cost Engine:");
const t = calculateTravelRealCost({
  travelers: 2,
  days: 5,
  nights: 4,
  rooms: 1,
  flightTrainTotal: 12000,
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
  plannedBudget: 60000
});
assertEqual(t.transportTotal, 19000.00, "Transport Total");
assertEqual(t.accommodationTotal, 12000.00, "Lodging Total");
assertEqual(t.foodTotal, 10000.00, "Food Total");
assertEqual(t.totalRealCost, 55650.00, "Total Real Trip Cost");
assertEqual(t.costPerPerson, 27825.00, "Cost per Person");
assertEqual(t.costPerDay, 11130.00, "Cost per Day");

// 3. Construction Material Test
console.log("\n3. Construction Material Price Intelligence Engine:");
const c = calculateConstructionMaterial({
  builtUpArea: 1000,
  areaUnit: "sqft",
  projectType: "Residential",
  floors: 1,
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
    { id: "10", name: "Doors & Windows", quantity: 8, unit: "units", rate: 9500, wastagePct: 2 }
  ],
  labourCost: 350000,
  consultantCost: 35000,
  permitCost: 20000,
  contingencyPct: 5,
  sensitivityRatePct: 5
});
assertEqual(c.totalRawMaterialCost, 1041400.00, "Raw Material Cost");
assertEqual(c.totalWastageCost, 44479.00, "Site Handling Wastage");
assertEqual(c.totalMaterialBudget, 1085879.00, "Total Material Budget");
assertEqual(c.totalProjectBudget, 1565422.95, "Total Project Budget");
assertEqual(c.sensitivityIncreaseCost, 54293.95, "+5% Inflation Sensitivity");

console.log("\n==================================================");
if (errors === 0) {
  console.log("ALL 3 CALCULATORS AUDITED WITH 0 ERRORS");
} else {
  console.error(`AUDIT FAILED WITH ${errors} ERRORS`);
  process.exit(1);
}
console.log("==================================================");
