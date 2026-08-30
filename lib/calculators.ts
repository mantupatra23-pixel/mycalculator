import { formatNumberIN, formatINR } from "@/lib/formatters";

export interface MetricItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface CalculationResult {
  primaryLabel: string;
  primaryValue: string;
  metrics: MetricItem[];
  summaryText: string;
}

function getGCD(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

// 1. Fraction Calculator
export function calculateFraction(n1: number, d1: number, op: string, n2: number, d2: number): CalculationResult {
  const den1 = d1 === 0 ? 1 : d1;
  const den2 = d2 === 0 ? 1 : d2;
  const num1 = n1;
  const num2 = n2;

  let resNum = 0;
  let resDen = 1;

  if (op === "+") {
    resNum = num1 * den2 + num2 * den1;
    resDen = den1 * den2;
  } else if (op === "-") {
    resNum = num1 * den2 - num2 * den1;
    resDen = den1 * den2;
  } else if (op === "*") {
    resNum = num1 * num2;
    resDen = den1 * den2;
  } else if (op === "/") {
    resNum = num1 * den2;
    resDen = den1 * (num2 === 0 ? 1 : num2);
  }

  const gcd = getGCD(resNum, resDen);
  const simNum = resNum / gcd;
  const simDen = resDen / gcd;

  const decimalVal = simDen !== 0 ? simNum / simDen : 0;
  const wholePart = Math.floor(Math.abs(simNum) / (simDen || 1));
  const remainder = Math.abs(simNum) % (simDen || 1);
  const mixedFraction =
    wholePart > 0 && remainder > 0
      ? `${simNum < 0 ? "-" : ""}${wholePart} ${remainder}/${simDen}`
      : `${simNum}/${simDen}`;

  return {
    primaryLabel: "Simplified Result",
    primaryValue: simDen === 1 ? `${simNum}` : `${simNum} / ${simDen}`,
    metrics: [
      { label: "Decimal Value", value: decimalVal.toFixed(4), highlight: true },
      { label: "Mixed Number", value: mixedFraction },
      { label: "Equation", value: `${num1}/${den1} ${op} ${num2}/${den2}` },
    ],
    summaryText: `${num1}/${den1} ${op} ${num2}/${den2} = ${simNum}/${simDen} (${decimalVal.toFixed(4)}).`,
  };
}

// 2. Countdown Calculator
export function calculateCountdown(targetDateStr: string, titleStr: string = "Target Event"): CalculationResult {
  const target = new Date(targetDateStr);
  const now = new Date();

  if (isNaN(target.getTime())) {
    return {
      primaryLabel: "Time Remaining",
      primaryValue: "Invalid Date",
      metrics: [],
      summaryText: "Please select a valid future date.",
    };
  }

  const diffMs = target.getTime() - now.getTime();
  const isPast = diffMs < 0;
  const absMs = Math.abs(diffMs);

  const totalSeconds = Math.floor(absMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    primaryLabel: isPast ? `${titleStr} Passed Since` : `Time Left Until ${titleStr}`,
    primaryValue: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    metrics: [
      { label: "Total Days", value: `${formatNumberIN(days, 0)} Days`, highlight: true },
      { label: "Total Hours", value: `${formatNumberIN(Math.floor(totalSeconds / 3600), 0)} Hours` },
      { label: "Total Minutes", value: `${formatNumberIN(Math.floor(totalSeconds / 60), 0)} Mins` },
      { label: "Event Date", value: target.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) },
    ],
    summaryText: isPast
      ? `The event occurred ${days} days and ${hours} hours ago.`
      : `There are ${days} days, ${hours} hours, and ${minutes} minutes remaining until ${titleStr}.`,
  };
}

// 3. Multi-Unit Converter Engine
export function calculateUnitConverter(
  category: "length" | "weight" | "temperature" | "area" | "volume" | "speed" | "data" | "time",
  fromUnit: string,
  toUnit: string,
  value: number
): CalculationResult {
  const val = isNaN(value) ? 0 : value;

  const lengthToM: Record<string, number> = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    ft: 0.3048,
    in: 0.0254,
    yd: 0.9144,
    mi: 1609.344,
  };

  const weightToG: Record<string, number> = {
    g: 1,
    kg: 1000,
    mg: 0.001,
    lb: 453.59237,
    oz: 28.3495,
    ton: 1000000,
  };

  const areaToSqm: Record<string, number> = {
    sqm: 1,
    sqft: 0.092903,
    sqyd: 0.836127,
    acre: 4046.86,
    hectare: 10000,
    bigha: 2529.28,
  };

  const volumeToL: Record<string, number> = {
    l: 1,
    ml: 0.001,
    gal: 3.78541,
    qt: 0.946353,
    pt: 0.473176,
    cup: 0.24,
    cum: 1000,
  };

  const speedToKmh: Record<string, number> = {
    kmh: 1,
    mph: 1.60934,
    ms: 3.6,
    knot: 1.852,
  };

  const dataToMB: Record<string, number> = {
    b: 0.00000095367431640625,
    kb: 0.0009765625,
    mb: 1,
    gb: 1024,
    tb: 1048576,
    pb: 1073741824,
  };

  let converted = 0;

  if (category === "temperature") {
    let tempC = val;
    if (fromUnit === "f") tempC = ((val - 32) * 5) / 9;
    if (fromUnit === "k") tempC = val - 273.15;

    if (toUnit === "c") converted = tempC;
    else if (toUnit === "f") converted = (tempC * 9) / 5 + 32;
    else if (toUnit === "k") converted = tempC + 273.15;
  } else if (category === "length") {
    const inMeters = val * (lengthToM[fromUnit] || 1);
    converted = inMeters / (lengthToM[toUnit] || 1);
  } else if (category === "weight") {
    const inGrams = val * (weightToG[fromUnit] || 1);
    converted = inGrams / (weightToG[toUnit] || 1);
  } else if (category === "area") {
    const inSqm = val * (areaToSqm[fromUnit] || 1);
    converted = inSqm / (areaToSqm[toUnit] || 1);
  } else if (category === "volume") {
    const inL = val * (volumeToL[fromUnit] || 1);
    converted = inL / (volumeToL[toUnit] || 1);
  } else if (category === "speed") {
    const inKmh = val * (speedToKmh[fromUnit] || 1);
    converted = inKmh / (speedToKmh[toUnit] || 1);
  } else if (category === "data") {
    const inMB = val * (dataToMB[fromUnit] || 1);
    converted = inMB / (dataToMB[toUnit] || 1);
  }

  return {
    primaryLabel: `Converted Value (${toUnit.toUpperCase()})`,
    primaryValue: `${formatNumberIN(converted, 4)} ${toUnit}`,
    metrics: [
      { label: "Original Input", value: `${formatNumberIN(val, 2)} ${fromUnit}` },
      { label: "Target Unit", value: toUnit.toUpperCase(), highlight: true },
      { label: "Category", value: category.toUpperCase() },
    ],
    summaryText: `${val} ${fromUnit} equals ${formatNumberIN(converted, 4)} ${toUnit}.`,
  };
}

// 4. Main Universal Routing Engine
export function calculateUniversal(slug: string, v1: number, v2: number, v3: number, v4: number = 0): CalculationResult {
  const a = isNaN(v1) ? 0 : v1;
  const b = isNaN(v2) ? 0 : v2;
  const c = isNaN(v3) ? 0 : v3;
  const d = isNaN(v4) ? 0 : v4;

  // --- HEALTH ---
  if (slug === "bmi-calculator") {
    const weightKg = Math.max(1, a);
    const heightCm = Math.max(1, b);
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let category = "Normal weight";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi >= 25 && bmi < 29.9) category = "Overweight";
    else if (bmi >= 30) category = "Obese";

    return {
      primaryLabel: "Your BMI Score",
      primaryValue: bmi.toFixed(1),
      metrics: [
        { label: "Category", value: category, highlight: true },
        { label: "Body Weight", value: `${weightKg} kg` },
        { label: "Height", value: `${heightCm} cm` },
        { label: "Healthy Range", value: "18.5 - 24.9" },
      ],
      summaryText: `Your BMI is ${bmi.toFixed(1)}, which falls into the ${category} category.`,
    };
  }

  if (slug === "bmr-calculator" || slug === "calorie-calculator") {
    const weightKg = Math.max(1, a);
    const heightCm = Math.max(1, b);
    const age = Math.max(1, c || 25);
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    const maintenance = Math.round(bmr * 1.375);

    return {
      primaryLabel: slug === "bmr-calculator" ? "Basal Metabolic Rate (BMR)" : "Maintenance Calories",
      primaryValue: `${slug === "bmr-calculator" ? Math.round(bmr) : maintenance} kcal/day`,
      metrics: [
        { label: "BMR (Resting Burn)", value: `${Math.round(bmr)} kcal` },
        { label: "Mild Weight Loss (0.25kg/wk)", value: `${maintenance - 250} kcal`, highlight: true },
        { label: "Standard Weight Loss (0.5kg/wk)", value: `${maintenance - 500} kcal` },
        { label: "Lean Muscle Gain (+0.5kg/wk)", value: `${maintenance + 400} kcal` },
      ],
      summaryText: `Your daily resting burn is ${Math.round(bmr)} kcal, with a daily maintenance requirement of ${maintenance} kcal.`,
    };
  }

  if (slug === "ideal-weight-calculator") {
    const heightCm = Math.max(100, b || 170);
    const heightInches = heightCm / 2.54;
    const over5Ft = Math.max(0, heightInches - 60);
    const idealKg = 50 + 2.3 * over5Ft;

    return {
      primaryLabel: "Ideal Body Weight",
      primaryValue: `${idealKg.toFixed(1)} kg`,
      metrics: [
        { label: "Healthy Target Range", value: `${(idealKg * 0.9).toFixed(1)} - ${(idealKg * 1.1).toFixed(1)} kg`, highlight: true },
        { label: "Height Entered", value: `${heightCm} cm` },
      ],
      summaryText: `For a height of ${heightCm} cm, your ideal estimated body weight is ${idealKg.toFixed(1)} kg.`,
    };
  }

  if (slug === "water-intake-calculator") {
    const weightKg = Math.max(1, a || 65);
    const dailyWaterLiters = weightKg * 0.033 + 0.35;

    return {
      primaryLabel: "Daily Water Intake Goal",
      primaryValue: `${dailyWaterLiters.toFixed(2)} Liters`,
      metrics: [
        { label: "Standard Glasses (250ml)", value: `${Math.round(dailyWaterLiters * 4)} Glasses`, highlight: true },
        { label: "Water Bottles (750ml)", value: `${(dailyWaterLiters / 0.75).toFixed(1)} Bottles` },
        { label: "Body Weight", value: `${weightKg} kg` },
      ],
      summaryText: `Based on your weight of ${weightKg} kg, drink at least ${dailyWaterLiters.toFixed(2)} Liters of water daily.`,
    };
  }

  if (slug === "macro-calculator") {
    const dailyCalories = Math.max(1000, a || 2000);
    const proteinG = Math.round((dailyCalories * 0.30) / 4);
    const carbsG = Math.round((dailyCalories * 0.40) / 4);
    const fatsG = Math.round((dailyCalories * 0.30) / 9);

    return {
      primaryLabel: "Daily Protein Target",
      primaryValue: `${proteinG}g (30%)`,
      metrics: [
        { label: "Carbohydrates (40%)", value: `${carbsG}g`, highlight: true },
        { label: "Healthy Fats (30%)", value: `${fatsG}g` },
        { label: "Total Daily Energy", value: `${dailyCalories} kcal` },
      ],
      summaryText: `For ${dailyCalories} kcal: Protein ${proteinG}g, Carbs ${carbsG}g, Fats ${fatsG}g.`,
    };
  }

  // --- BUSINESS ---
  if (slug === "roas-calculator") {
    const revenue = Math.max(0, a);
    const adSpend = Math.max(1, b || 1);
    const roas = revenue / adSpend;
    const roasPct = roas * 100;

    return {
      primaryLabel: "Return on Ad Spend (ROAS)",
      primaryValue: `${roas.toFixed(2)}x (${roasPct.toFixed(0)}%)`,
      metrics: [
        { label: "Total Campaign Revenue", value: formatINR(revenue) },
        { label: "Total Ad Spend", value: formatINR(adSpend) },
        { label: "Net Campaign Profit", value: formatINR(revenue - adSpend), highlight: true },
      ],
      summaryText: `For every ₹1 spent on ads, you generated ₹${roas.toFixed(2)} in revenue.`,
    };
  }

  if (slug === "break-even-calculator") {
    const fixedCosts = Math.max(0, a || 50000);
    const pricePerUnit = Math.max(1, b || 100);
    const costPerUnit = Math.max(0, c || 40);
    const contributionMargin = pricePerUnit - costPerUnit;
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
    const breakEvenRevenue = breakEvenUnits * pricePerUnit;

    return {
      primaryLabel: "Break-Even Sales Units",
      primaryValue: `${formatNumberIN(breakEvenUnits, 0)} Units`,
      metrics: [
        { label: "Break-Even Revenue", value: formatINR(breakEvenRevenue), highlight: true },
        { label: "Unit Margin", value: formatINR(contributionMargin) },
        { label: "Fixed Overhead", value: formatINR(fixedCosts) },
      ],
      summaryText: `You need to sell ${breakEvenUnits} units to cover fixed overheads and reach break-even.`,
    };
  }

  if (slug === "commission-calculator") {
    const totalSales = Math.max(0, a || 200000);
    const commRate = Math.max(0, b || 10);
    const commissionAmt = (totalSales * commRate) / 100;
    const netSellerShare = totalSales - commissionAmt;

    return {
      primaryLabel: "Commission Earned",
      primaryValue: formatINR(Math.round(commissionAmt)),
      metrics: [
        { label: "Gross Sales Revenue", value: formatINR(totalSales) },
        { label: "Commission Rate", value: `${commRate}%` },
        { label: "Net Payout", value: formatINR(Math.round(netSellerShare)), highlight: true },
      ],
      summaryText: `A ${commRate}% commission on ₹${formatNumberIN(totalSales, 0)} yields ₹${formatNumberIN(commissionAmt, 0)}.`,
    };
  }

  if (slug === "overtime-pay-calculator" || slug === "overtime-calculator") {
    const hourlyWage = Math.max(0, a || 250);
    const otHours = Math.max(0, b || 15);
    const multiplier = Math.max(1, c || 1.5);
    const otPay = hourlyWage * otHours * multiplier;

    return {
      primaryLabel: "Total Overtime Pay",
      primaryValue: formatINR(Math.round(otPay)),
      metrics: [
        { label: "Base Hourly Rate", value: formatINR(hourlyWage) },
        { label: "Overtime Hours", value: `${otHours} Hours` },
        { label: "Effective OT Rate", value: formatINR(Math.round(hourlyWage * multiplier)), highlight: true },
      ],
      summaryText: `Working ${otHours} hours overtime at ${multiplier}x base pay yields ${formatINR(Math.round(otPay))}.`,
    };
  }

  if (slug === "salary-hike-calculator" || slug === "salary-increment-calculator") {
    const currentCtc = Math.max(0, a || 600000);
    const hikePct = Math.max(0, b || 15);
    const incrementAmt = (currentCtc * hikePct) / 100;
    const newCtc = currentCtc + incrementAmt;

    return {
      primaryLabel: "New Appraised CTC",
      primaryValue: formatINR(Math.round(newCtc)),
      metrics: [
        { label: "Current CTC", value: formatINR(currentCtc) },
        { label: "Annual Hike Amount", value: `+${formatINR(Math.round(incrementAmt))}`, highlight: true },
        { label: "New Monthly CTC", value: formatINR(Math.round(newCtc / 12)) },
      ],
      summaryText: `A ${hikePct}% hike on ${formatINR(currentCtc)} results in a new annual CTC of ${formatINR(Math.round(newCtc))}.`,
    };
  }

  if (slug === "freelance-hourly-rate" || slug === "freelance-rate-calculator" || slug === "hourly-rate-calculator") {
    const monthlyTarget = Math.max(0, a || 100000);
    const billableHoursWeek = Math.max(1, b || 30);
    const monthlyHours = billableHoursWeek * 4;
    const hourlyRate = monthlyHours > 0 ? monthlyTarget / monthlyHours : 0;

    return {
      primaryLabel: "Target Hourly Rate",
      primaryValue: `₹${Math.round(hourlyRate)} / hour`,
      metrics: [
        { label: "Monthly Income Goal", value: formatINR(monthlyTarget) },
        { label: "Billable Hours / Month", value: `${monthlyHours} hrs`, highlight: true },
        { label: "Daily Rate (6 hrs/day)", value: formatINR(Math.round(hourlyRate * 6)) },
      ],
      summaryText: `To earn ${formatINR(monthlyTarget)} monthly working ${billableHoursWeek} hrs/week, charge ₹${Math.round(hourlyRate)}/hr.`,
    };
  }

  if (slug === "hourly-to-annual-salary") {
    const hourlyWage = Math.max(0, a || 500);
    const hoursPerWeek = Math.max(1, b || 40);
    const weeksPerYear = Math.max(1, c || 52);
    const annualSalary = hourlyWage * hoursPerWeek * weeksPerYear;

    return {
      primaryLabel: "Annual Gross Income",
      primaryValue: formatINR(Math.round(annualSalary)),
      metrics: [
        { label: "Hourly Pay Rate", value: formatINR(hourlyWage) },
        { label: "Monthly Income", value: formatINR(Math.round(annualSalary / 12)), highlight: true },
        { label: "Weekly Income", value: formatINR(Math.round(hourlyWage * hoursPerWeek)) },
      ],
      summaryText: `Earning ₹${hourlyWage}/hr at ${hoursPerWeek} hrs/week equates to ${formatINR(Math.round(annualSalary))} per year.`,
    };
  }

  if (slug === "rent-split-calculator") {
    const totalRent = Math.max(0, a || 30000);
    const people = Math.max(1, b || 3);
    const splitPerPerson = totalRent / people;

    return {
      primaryLabel: "Per Person Rent Share",
      primaryValue: formatINR(Math.round(splitPerPerson)),
      metrics: [
        { label: "Total Room Rent", value: formatINR(totalRent) },
        { label: "Total Flatmates", value: `${people} Flatmates` },
      ],
      summaryText: `Dividing ${formatINR(totalRent)} equally among ${people} flatmates is ${formatINR(Math.round(splitPerPerson))} each.`,
    };
  }

  // --- EDUCATION ---
  if (slug === "cgpa-to-percentage") {
    const cgpa = Math.max(0, Math.min(10, a || 8.5));
    const percentage = cgpa * 9.5;

    return {
      primaryLabel: "Equivalent Percentage",
      primaryValue: `${percentage.toFixed(2)}%`,
      metrics: [
        { label: "CGPA (10 Point Scale)", value: cgpa.toString() },
        { label: "Standard Formula", value: "CGPA × 9.5 (CBSE/AICTE)", highlight: true },
      ],
      summaryText: `A CGPA of ${cgpa} corresponds to ${percentage.toFixed(2)}% marks.`,
    };
  }

  if (slug === "percentage-to-cgpa") {
    const pct = Math.max(0, Math.min(100, a || 85));
    const cgpa = pct / 9.5;

    return {
      primaryLabel: "Equivalent CGPA",
      primaryValue: `${cgpa.toFixed(2)} / 10`,
      metrics: [
        { label: "Entered Percentage", value: `${pct}%` },
        { label: "Conversion Formula", value: "Percentage ÷ 9.5", highlight: true },
      ],
      summaryText: `${pct}% marks translates to a CGPA of ${cgpa.toFixed(2)}.`,
    };
  }

  if (slug.includes("gpa") || slug.includes("grade")) {
    const score = Math.max(0, Math.min(100, a || 82));
    let grade = "A";
    let gpa4 = "3.7";
    if (score >= 90) { grade = "A+"; gpa4 = "4.0"; }
    else if (score >= 80) { grade = "A"; gpa4 = "3.5"; }
    else if (score >= 70) { grade = "B"; gpa4 = "3.0"; }
    else if (score >= 60) { grade = "C"; gpa4 = "2.0"; }
    else { grade = "F"; gpa4 = "0.0"; }

    return {
      primaryLabel: "Calculated Grade / GPA",
      primaryValue: `${grade} (GPA ${gpa4})`,
      metrics: [
        { label: "Marks Percentage", value: `${score}%` },
        { label: "4.0 Scale GPA Equivalent", value: gpa4, highlight: true },
      ],
      summaryText: `A score of ${score}% achieves a grade of ${grade} with a ${gpa4} GPA.`,
    };
  }

  // --- OTHER (Fuel, Mileage, Electricity, Tip, Savings) ---
  if (slug === "fuel-cost-calculator") {
    const distanceKm = Math.max(1, a || 300);
    const mileageKmpl = Math.max(1, b || 18);
    const fuelPricePerLiter = Math.max(1, c || 102);

    const litersNeeded = distanceKm / mileageKmpl;
    const totalCost = litersNeeded * fuelPricePerLiter;
    const costPerKm = totalCost / distanceKm;

    return {
      primaryLabel: "Total Fuel Expense",
      primaryValue: formatINR(Math.round(totalCost)),
      metrics: [
        { label: "Fuel Needed", value: `${litersNeeded.toFixed(2)} Liters`, highlight: true },
        { label: "Running Cost Per KM", value: `₹${costPerKm.toFixed(2)} / km` },
        { label: "Trip Distance", value: `${distanceKm} km` },
      ],
      summaryText: `A trip of ${distanceKm} km with ${mileageKmpl} km/L efficiency consumes ${litersNeeded.toFixed(2)} L costing ${formatINR(Math.round(totalCost))}.`,
    };
  }

  if (slug === "mileage-calculator") {
    const distanceKm = Math.max(1, a || 450);
    const fuelLiters = Math.max(0.1, b || 25);
    const fuelCost = Math.max(1, c || 102);

    const kmpl = distanceKm / fuelLiters;
    const costPerKm = (fuelLiters * fuelCost) / distanceKm;

    return {
      primaryLabel: "Fuel Efficiency",
      primaryValue: `${kmpl.toFixed(2)} km/L`,
      metrics: [
        { label: "Cost Per KM", value: `₹${costPerKm.toFixed(2)} / km`, highlight: true },
        { label: "Distance Covered", value: `${distanceKm} km` },
        { label: "Total Fuel Consumed", value: `${fuelLiters} Liters` },
      ],
      summaryText: `Covering ${distanceKm} km with ${fuelLiters} L yields an average mileage of ${kmpl.toFixed(2)} km/L.`,
    };
  }

  if (slug === "electricity-bill-calculator") {
    const watts = Math.max(0, a || 1500);
    const hoursPerDay = Math.max(0, b || 8);
    const costPerUnitKwh = Math.max(0, c || 7.5);

    const dailyUnits = (watts * hoursPerDay) / 1000;
    const monthlyUnits = dailyUnits * 30;
    const monthlyCost = monthlyUnits * costPerUnitKwh;

    return {
      primaryLabel: "Estimated Monthly Bill",
      primaryValue: formatINR(Math.round(monthlyCost)),
      metrics: [
        { label: "Monthly Units Consumed", value: `${monthlyUnits.toFixed(1)} kWh (Units)`, highlight: true },
        { label: "Daily Energy Consumption", value: `${dailyUnits.toFixed(2)} kWh/day` },
        { label: "Tariff Rate", value: `₹${costPerUnitKwh} / unit` },
      ],
      summaryText: `Running ${watts}W appliances for ${hoursPerDay}h daily consumes ${monthlyUnits.toFixed(0)} units, costing approx. ${formatINR(Math.round(monthlyCost))}/mo.`,
    };
  }

  if (slug === "tip-calculator") {
    const bill = Math.max(0, a || 2000);
    const tipPct = Math.max(0, b || 10);
    const people = Math.max(1, c || 4);

    const tipAmount = (bill * tipPct) / 100;
    const grandTotal = bill + tipAmount;
    const perPerson = grandTotal / people;

    return {
      primaryLabel: "Per Person Share",
      primaryValue: formatINR(Math.round(perPerson)),
      metrics: [
        { label: "Total Tip Amount", value: formatINR(Math.round(tipAmount)), highlight: true },
        { label: "Grand Total Bill", value: formatINR(Math.round(grandTotal)) },
        { label: "People Sharing", value: `${people} Persons` },
      ],
      summaryText: `Total bill with ${tipPct}% tip is ${formatINR(Math.round(grandTotal))}, dividing to ${formatINR(Math.round(perPerson))} each for ${people} people.`,
    };
  }

  if (slug === "savings-calculator") {
    const p = Math.max(0, a || 5000);
    const r = Math.max(0, b || 7) / 12 / 100;
    const n = Math.max(1, (c || 5) * 12);

    let futureVal = 0;
    if (r > 0) futureVal = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    else futureVal = p * n;

    const totalInvested = p * n;
    const gains = futureVal - totalInvested;

    return {
      primaryLabel: "Accumulated Savings",
      primaryValue: formatINR(Math.round(futureVal)),
      metrics: [
        { label: "Total Deposited", value: formatINR(totalInvested) },
        { label: "Compound Interest Earned", value: formatINR(Math.round(gains)), highlight: true },
        { label: "Duration", value: `${c || 5} Years (${n} Months)` },
      ],
      summaryText: `Saving ${formatINR(p)} monthly at ${b || 7}% for ${c || 5} years yields ${formatINR(Math.round(futureVal))}.`,
    };
  }

  // Fallback
  return {
    primaryLabel: "Calculated Value",
    primaryValue: formatNumberIN(a + b, 2),
    metrics: [
      { label: "Input 1", value: formatNumberIN(a, 2) },
      { label: "Input 2", value: formatNumberIN(b, 2) },
    ],
    summaryText: "Calculation evaluated successfully.",
  };
}
