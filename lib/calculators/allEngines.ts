import { formatNumberIN, formatINR } from "@/lib/formatters";
import { CalculationResult } from "./finance";

export function calculateUniversal(slug: string, v1: number, v2: number, v3: number, strVal?: string): CalculationResult {
  const a = isNaN(v1) ? 0 : v1;
  const b = isNaN(v2) ? 0 : v2;
  const c = isNaN(v3) ? 0 : v3;

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
        { label: "Weight", value: `${weightKg} kg` },
        { label: "Height", value: `${heightCm} cm` },
        { label: "Healthy Range", value: "18.5 - 24.9" },
      ],
      summaryText: `Your BMI is ${bmi.toFixed(1)}, which falls in the ${category} category.`,
    };
  }

  if (slug === "bmr-calculator" || slug === "calorie-calculator") {
    // Mifflin-St Jeor
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
        { label: "Weight Loss (0.5kg/wk)", value: `${maintenance - 500} kcal` },
        { label: "Weight Gain (+0.5kg/wk)", value: `${maintenance + 500} kcal` },
      ],
      summaryText: `Your daily resting metabolic burn is ${Math.round(bmr)} kcal, and maintenance target is ${maintenance} kcal.`,
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
        { label: "Healthy Weight Range", value: `${(idealKg * 0.9).toFixed(1)} - ${(idealKg * 1.1).toFixed(1)} kg`, highlight: true },
        { label: "Height Entered", value: `${heightCm} cm` },
      ],
      summaryText: `For a height of ${heightCm} cm, the ideal estimated weight is approximately ${idealKg.toFixed(1)} kg.`,
    };
  }

  if (slug === "water-intake-calculator") {
    const weightKg = Math.max(1, a || 65);
    const dailyWaterLiters = (weightKg * 0.033) + 0.35;

    return {
      primaryLabel: "Daily Water Goal",
      primaryValue: `${dailyWaterLiters.toFixed(2)} Liters`,
      metrics: [
        { label: "Glasses of Water (250ml)", value: `${Math.round(dailyWaterLiters * 4)} Glasses`, highlight: true },
        { label: "Body Weight", value: `${weightKg} kg` },
      ],
      summaryText: `Based on your weight of ${weightKg} kg, drink at least ${dailyWaterLiters.toFixed(2)} L of water daily.`,
    };
  }

  if (slug === "macro-calculator") {
    const dailyCalories = Math.max(1000, a || 2000);
    const proteinG = Math.round((dailyCalories * 0.30) / 4);
    const carbsG = Math.round((dailyCalories * 0.40) / 4);
    const fatsG = Math.round((dailyCalories * 0.30) / 9);

    return {
      primaryLabel: "Daily Protein Target",
      primaryValue: `${proteinG}g (${Math.round(dailyCalories * 0.3)} kcal)`,
      metrics: [
        { label: "Carbohydrates (40%)", value: `${carbsG}g`, highlight: true },
        { label: "Healthy Fats (30%)", value: `${fatsG}g` },
        { label: "Total Calories", value: `${dailyCalories} kcal` },
      ],
      summaryText: `For ${dailyCalories} kcal: Protein ${proteinG}g, Carbs ${carbsG}g, Fats ${fatsG}g.`,
    };
  }

  // --- TIME & DATE ---
  if (slug === "age-calculator" || slug === "age-in-days-calculator") {
    const birthYear = Math.max(1900, a || 1998);
    const birthMonth = Math.max(1, Math.min(12, b || 1));
    const birthDay = Math.max(1, Math.min(31, c || 1));
    const birth = new Date(birthYear, birthMonth - 1, birthDay);
    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - birth.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const months = Math.floor((totalDays % 365.25) / 30.44);
    const days = Math.floor((totalDays % 365.25) % 30.44);

    return {
      primaryLabel: slug === "age-in-days-calculator" ? "Total Days Alive" : "Your Exact Age",
      primaryValue: slug === "age-in-days-calculator" ? `${formatNumberIN(totalDays, 0)} Days` : `${years} Years, ${months} Months, ${days} Days`,
      metrics: [
        { label: "Total Days Lived", value: `${formatNumberIN(totalDays, 0)} Days`, highlight: true },
        { label: "Total Hours Lived", value: `${formatNumberIN(totalDays * 24, 0)} Hours` },
        { label: "Next Birthday In", value: `${Math.round(365 - (totalDays % 365))} Days` },
      ],
      summaryText: `You are ${years} years old and have lived approximately ${formatNumberIN(totalDays, 0)} days.`,
    };
  }

  if (slug.includes("date") || slug.includes("days-between") || slug.includes("time-duration") || slug.includes("hours")) {
    const days = Math.max(1, a || 45);
    const weeks = (days / 7).toFixed(1);
    const hours = days * 24;

    return {
      primaryLabel: "Calculated Duration",
      primaryValue: `${days} Days`,
      metrics: [
        { label: "In Weeks", value: `${weeks} Weeks`, highlight: true },
        { label: "In Hours", value: `${hours} Hours` },
        { label: "In Minutes", value: `${formatNumberIN(hours * 60, 0)} Mins` },
      ],
      summaryText: `Total elapsed time equals ${days} days (${weeks} weeks).`,
    };
  }

  // --- BUSINESS ---
  if (slug === "roas-calculator") {
    const revenue = Math.max(0, a);
    const adSpend = Math.max(1, b || 1);
    const roas = (revenue / adSpend);
    const roasPct = roas * 100;

    return {
      primaryLabel: "Return on Ad Spend (ROAS)",
      primaryValue: `${roas.toFixed(2)}x (${roasPct.toFixed(0)}%)`,
      metrics: [
        { label: "Total Revenue", value: formatINR(revenue) },
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
      summaryText: `You must sell at least ${breakEvenUnits} units to cover all costs and break even.`,
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

  if (slug === "freelance-rate-calculator" || slug === "hourly-rate-calculator") {
    const monthlyTarget = Math.max(0, a || 100000);
    const billableHoursWeek = Math.max(1, b || 30);
    const monthlyHours = billableHoursWeek * 4;
    const hourlyRate = monthlyTarget / monthlyHours;

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

  if (slug === "rent-split-calculator") {
    const totalRent = Math.max(0, a || 30000);
    const people = Math.max(1, b || 3);
    const splitPerPerson = totalRent / people;

    return {
      primaryLabel: "Per Person Rent Share",
      primaryValue: formatINR(Math.round(splitPerPerson)),
      metrics: [
        { label: "Total Room Rent", value: formatINR(totalRent) },
        { label: "Total Flatmates", value: `${people} People` },
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
        { label: "Conversion Factor", value: "CGPA × 9.5 (CBSE/AICTE Standard)", highlight: true },
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
        { label: "Formula Applied", value: "Percentage ÷ 9.5", highlight: true },
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
        { label: "Marks Scored", value: `${score}%` },
        { label: "4.0 Scale GPA", value: gpa4, highlight: true },
      ],
      summaryText: `A score of ${score}% achieves a grade of ${grade} with a ${gpa4} GPA.`,
    };
  }

  // --- UNIT CONVERTERS ---
  if (slug === "feet-to-meter") {
    const ft = a || 10;
    const m = ft * 0.3048;
    return {
      primaryLabel: "Meters",
      primaryValue: `${m.toFixed(4)} m`,
      metrics: [{ label: "Feet Entered", value: `${ft} ft` }, { label: "Inches", value: `${(ft * 12).toFixed(2)} in`, highlight: true }],
      summaryText: `${ft} feet is equal to ${m.toFixed(4)} meters.`,
    };
  }

  if (slug === "meter-to-feet") {
    const m = a || 3;
    const ft = m * 3.28084;
    return {
      primaryLabel: "Feet",
      primaryValue: `${ft.toFixed(2)} ft`,
      metrics: [{ label: "Meters Entered", value: `${m} m` }, { label: "Centimeters", value: `${(m * 100).toFixed(0)} cm`, highlight: true }],
      summaryText: `${m} meters is equal to ${ft.toFixed(2)} feet.`,
    };
  }

  if (slug === "celsius-to-fahrenheit") {
    const cVal = a || 25;
    const fVal = (cVal * 9/5) + 32;
    return {
      primaryLabel: "Fahrenheit",
      primaryValue: `${fVal.toFixed(1)} °F`,
      metrics: [{ label: "Celsius (°C)", value: `${cVal} °C` }, { label: "Kelvin (K)", value: `${(cVal + 273.15).toFixed(2)} K`, highlight: true }],
      summaryText: `${cVal}°C is equal to ${fVal.toFixed(1)}°F.`,
    };
  }

  if (slug === "fahrenheit-to-celsius") {
    const fVal = a || 98.6;
    const cVal = (fVal - 32) * 5/9;
    return {
      primaryLabel: "Celsius",
      primaryValue: `${cVal.toFixed(2)} °C`,
      metrics: [{ label: "Fahrenheit (°F)", value: `${fVal} °F` }, { label: "Kelvin (K)", value: `${(cVal + 273.15).toFixed(2)} K`, highlight: true }],
      summaryText: `${fVal}°F is equal to ${cVal.toFixed(2)}°C.`,
    };
  }

  if (slug === "kg-to-pound") {
    const kg = a || 70;
    const lbs = kg * 2.20462;
    return {
      primaryLabel: "Pounds (lbs)",
      primaryValue: `${lbs.toFixed(2)} lbs`,
      metrics: [{ label: "Kilograms (kg)", value: `${kg} kg` }, { label: "Grams", value: `${kg * 1000} g`, highlight: true }],
      summaryText: `${kg} kg equals ${lbs.toFixed(2)} pounds.`,
    };
  }

  if (slug === "pound-to-kg") {
    const lbs = a || 150;
    const kg = lbs / 2.20462;
    return {
      primaryLabel: "Kilograms (kg)",
      primaryValue: `${kg.toFixed(2)} kg`,
      metrics: [{ label: "Pounds (lbs)", value: `${lbs} lbs` }],
      summaryText: `${lbs} lbs equals ${kg.toFixed(2)} kg.`,
    };
  }

  if (slug === "km-to-miles") {
    const km = a || 10;
    const mi = km * 0.621371;
    return {
      primaryLabel: "Miles",
      primaryValue: `${mi.toFixed(3)} miles`,
      metrics: [{ label: "Kilometers", value: `${km} km` }, { label: "Meters", value: `${km * 1000} m`, highlight: true }],
      summaryText: `${km} km is equal to ${mi.toFixed(3)} miles.`,
    };
  }

  if (slug === "miles-to-km") {
    const mi = a || 10;
    const km = mi / 0.621371;
    return {
      primaryLabel: "Kilometers",
      primaryValue: `${km.toFixed(3)} km`,
      metrics: [{ label: "Miles", value: `${mi} mi` }],
      summaryText: `${mi} miles is equal to ${km.toFixed(3)} km.`,
    };
  }

  // --- OTHER (Fuel, Electricity, Tip, Mileage) ---
  if (slug === "fuel-cost-calculator" || slug === "mileage-calculator") {
    const distanceKm = Math.max(1, a || 250);
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
      summaryText: `A trip of ${distanceKm} km with ${mileageKmpl} km/L efficiency will consume ${litersNeeded.toFixed(2)} L costing ${formatINR(Math.round(totalCost))}.`,
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
      primaryLabel: "Monthly Electricity Cost",
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

  // Default Universal Fallback
  return {
    primaryLabel: "Result",
    primaryValue: formatNumberIN(a + b, 2),
    metrics: [
      { label: "Input 1", value: formatNumberIN(a, 2) },
      { label: "Input 2", value: formatNumberIN(b, 2) },
    ],
    summaryText: "Calculation evaluated successfully.",
  };
}
