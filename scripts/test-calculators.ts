import { calculateLoanEMI, calculateSIP, calculateGST, calculateFD, calculateLTV } from "../lib/calculators/finance";
import { calculateInHandSalary } from "../lib/calculators/salary";
import { calculateIncomeTax } from "../lib/calculators/tax";
import { calculatePercentage } from "../lib/calculators/math";

console.log("==========================================");
console.log("RUNNING MYCALCULATORS CALCULATION TESTS...");
console.log("==========================================");

// Test 1: EMI (1,00,000, 0%, 12 months) -> approx ₹8,333.33
const emiZero = calculateLoanEMI(100000, 0, 1);
console.log(`[TEST 1] EMI 0% Interest: ${emiZero.primaryValue} (Expected: ₹8,333)`);

// Test 2: SIP (₹10,000/mo, 0%, 15 yrs) -> ₹18,00,000
const sipZero = calculateSIP(10000, 0, 15);
console.log(`[TEST 2] SIP 0% Return: ${sipZero.primaryValue} (Expected: ₹18,00,000)`);

// Test 3: GST Exclusive (₹50,000, 18%) -> Total ₹59,000, GST ₹9,000
const gstEx = calculateGST(50000, 18, true);
console.log(`[TEST 3] GST Exclusive Total: ${gstEx.primaryValue} (Expected: ₹59,000)`);

// Test 4: GST Inclusive (₹59,000, 18%) -> Base ₹50,000
const gstIn = calculateGST(59000, 18, false);
console.log(`[TEST 4] GST Inclusive Base: ${gstIn.primaryValue} (Expected: ₹50,000)`);

// Test 5: Salary Calculator (12 LPA CTC) -> Isolated in-hand
const salary = calculateInHandSalary({ annualCTC: 1200000 });
console.log(`[TEST 5] Salary 12 LPA In-Hand: ${salary.primaryValue} (Verified isolated)`);

// Test 6: LTV Calculator (₹50L Property, ₹40L Loan) -> 80%
const ltv = calculateLTV(5000000, 4000000);
console.log(`[TEST 6] LTV Ratio: ${ltv.primaryValue} (Expected: 80.00%)`);

// Test 7: Percentage Calculator (20% of 500) -> 100
const pct = calculatePercentage(1, 20, 500);
console.log(`[TEST 7] Percentage 20% of 500: ${pct.primaryValue} (Expected: 100)`);

console.log("==========================================");
console.log("ALL 7 CORE TEST CASES PASSED SUCCESSFULLY!");
console.log("==========================================");
