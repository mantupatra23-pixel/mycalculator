import { formatNumberIN } from "@/lib/formatters";
import { CalculationResult } from "./finance";

// 1. BMI Calculator
export function calculateBMI(weightKg: number, heightCm: number): CalculationResult {
  const w = Math.max(1, weightKg);
  const hM = Math.max(0.5, heightCm / 100);
  const bmi = w / (hM * hM);

  let category = "Normal weight";
  let colorClass = "text-emerald-600";

  if (bmi < 18.5) {
    category = "Underweight";
    colorClass = "text-amber-600";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    colorClass = "text-orange-600";
  } else if (bmi >= 30) {
    category = "Obese";
    colorClass = "text-rose-600";
  }

  const minNormalWeight = 18.5 * (hM * hM);
  const maxNormalWeight = 24.9 * (hM * hM);

  return {
    primaryLabel: "Your Body Mass Index (BMI)",
    primaryValue: bmi.toFixed(1),
    metrics: [
      { label: "Weight Status", value: category, highlight: true },
      { label: "Healthy Weight Range", value: `${minNormalWeight.toFixed(1)} - ${maxNormalWeight.toFixed(1)} kg` },
      { label: "BMI Prime", value: (bmi / 25).toFixed(2) },
      { label: "Ponderal Index", value: `${(w / Math.pow(hM, 3)).toFixed(2)} kg/m³` },
    ],
    summaryText: `Your BMI is ${bmi.toFixed(1)} kg/m², which falls into the ${category} category for a height of ${heightCm} cm.`,
  };
}

// 2. BMR Calculator (Mifflin-St Jeor)
export function calculateBMR(gender: "male" | "female", weightKg: number, heightCm: number, ageYrs: number): CalculationResult {
  const w = Math.max(1, weightKg);
  const h = Math.max(50, heightCm);
  const a = Math.max(1, ageYrs);

  let bmr = 10 * w + 6.25 * h - 5 * a + (gender === "male" ? 5 : -161);
  bmr = Math.max(500, bmr);

  return {
    primaryLabel: "Basal Metabolic Rate (BMR)",
    primaryValue: `${Math.round(bmr)} kcal/day`,
    metrics: [
      { label: "Sedentary (Little/no exercise)", value: `${Math.round(bmr * 1.2)} kcal`, highlight: true },
      { label: "Light Active (1-3 days/wk)", value: `${Math.round(bmr * 1.375)} kcal` },
      { label: "Moderate Active (3-5 days/wk)", value: `${Math.round(bmr * 1.55)} kcal` },
      { label: "Very Active (6-7 days/wk)", value: `${Math.round(bmr * 1.725)} kcal` },
    ],
    summaryText: `Your body burns approximately ${Math.round(bmr)} calories each day at complete rest to maintain vital organ functions.`,
  };
}

// 3. Daily Calorie Calculator (TDEE & Weight Goal Targets)
export function calculateCalories(
  gender: "male" | "female",
  weightKg: number,
  heightCm: number,
  ageYrs: number,
  activityMultiplier: number = 1.375
): CalculationResult {
  const w = Math.max(1, weightKg);
  const h = Math.max(50, heightCm);
  const a = Math.max(1, ageYrs);

  const bmr = 10 * w + 6.25 * h - 5 * a + (gender === "male" ? 5 : -161);
  const maintenance = Math.round(bmr * activityMultiplier);

  return {
    primaryLabel: "Daily Maintenance Calories",
    primaryValue: `${maintenance} kcal/day`,
    metrics: [
      { label: "Mild Weight Loss (-0.25 kg/wk)", value: `${maintenance - 250} kcal`, highlight: true },
      { label: "Standard Weight Loss (-0.5 kg/wk)", value: `${maintenance - 500} kcal` },
      { label: "Extreme Weight Loss (-1.0 kg/wk)", value: `${Math.max(1200, maintenance - 1000)} kcal` },
      { label: "Lean Muscle Gain (+0.25 kg/wk)", value: `${maintenance + 300} kcal` },
    ],
    summaryText: `To maintain your current weight of ${weightKg} kg, consume ${maintenance} kcal daily. Reduce to ${maintenance - 500} kcal for losing ~0.5 kg per week.`,
  };
}

// 4. US Navy Body Fat Calculator
export function calculateBodyFat(
  gender: "male" | "female",
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm: number,
  weightKg: number
): CalculationResult {
  const h = Math.max(50, heightCm);
  const neck = Math.max(10, neckCm);
  const waist = Math.max(20, waistCm);
  const hip = Math.max(20, hipCm);
  const w = Math.max(1, weightKg);

  let bodyFatPct = 0;

  if (gender === "male") {
    const diff = Math.max(1, waist - neck);
    bodyFatPct = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(h)) - 450;
  } else {
    const sumDiff = Math.max(1, waist + hip - neck);
    bodyFatPct = 495 / (1.29579 - 0.35004 * Math.log10(sumDiff) + 0.22100 * Math.log10(h)) - 450;
  }

  bodyFatPct = Math.max(2, Math.min(65, bodyFatPct));

  const fatMassKg = (w * bodyFatPct) / 100;
  const leanMassKg = w - fatMassKg;

  let category = "Fitness";
  if (gender === "male") {
    if (bodyFatPct < 6) category = "Essential Fat";
    else if (bodyFatPct <= 13) category = "Athletes";
    else if (bodyFatPct <= 17) category = "Fitness";
    else if (bodyFatPct <= 24) category = "Average";
    else category = "Obese";
  } else {
    if (bodyFatPct < 14) category = "Essential Fat";
    else if (bodyFatPct <= 20) category = "Athletes";
    else if (bodyFatPct <= 24) category = "Fitness";
    else if (bodyFatPct <= 31) category = "Average";
    else category = "Obese";
  }

  return {
    primaryLabel: "Estimated Body Fat Percentage",
    primaryValue: `${bodyFatPct.toFixed(1)}%`,
    metrics: [
      { label: "Body Fat Category", value: category, highlight: true },
      { label: "Total Fat Mass", value: `${fatMassKg.toFixed(1)} kg` },
      { label: "Lean Body Mass", value: `${leanMassKg.toFixed(1)} kg` },
      { label: "Ideal Target Range", value: gender === "male" ? "10% - 17%" : "18% - 24%" },
    ],
    summaryText: `Your estimated body fat is ${bodyFatPct.toFixed(1)}% (${category}). Total fat mass is ${fatMassKg.toFixed(1)} kg and lean body mass is ${leanMassKg.toFixed(1)} kg.`,
  };
}

// 5. Ideal Body Weight Calculator (Devine, Robinson, Miller Formulas)
export function calculateIdealWeight(gender: "male" | "female", heightCm: number): CalculationResult {
  const h = Math.max(100, heightCm);
  const totalInches = h / 2.54;
  const inchesOver5Ft = Math.max(0, totalInches - 60);

  // Devine Formula
  const devineKg = gender === "male" ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;
  // Robinson Formula
  const robinsonKg = gender === "male" ? 52 + 1.9 * inchesOver5Ft : 49 + 1.7 * inchesOver5Ft;
  // Miller Formula
  const millerKg = gender === "male" ? 56.2 + 1.41 * inchesOver5Ft : 53.1 + 1.36 * inchesOver5Ft;

  return {
    primaryLabel: "Ideal Body Weight (Devine)",
    primaryValue: `${devineKg.toFixed(1)} kg`,
    metrics: [
      { label: "Healthy Target Range", value: `${(devineKg * 0.9).toFixed(1)} - ${(devineKg * 1.1).toFixed(1)} kg`, highlight: true },
      { label: "Robinson Formula", value: `${robinsonKg.toFixed(1)} kg` },
      { label: "Miller Formula", value: `${millerKg.toFixed(1)} kg` },
      { label: "Height Reference", value: `${heightCm} cm (${(totalInches / 12).toFixed(1)} ft)` },
    ],
    summaryText: `For a ${gender} of height ${heightCm} cm, the standard medical ideal weight is ${devineKg.toFixed(1)} kg.`,
  };
}

// 6. Water Intake Calculator
export function calculateWaterIntake(weightKg: number, exerciseMinutes: number = 30, isHotClimate: boolean = false): CalculationResult {
  const w = Math.max(1, weightKg);
  const ex = Math.max(0, exerciseMinutes);

  let dailyLiters = w * 0.033; // 33ml per kg
  dailyLiters += (ex / 30) * 0.35; // +350ml per 30 mins workout
  if (isHotClimate) dailyLiters += 0.5; // +500ml in hot/tropical climate

  const glasses250ml = Math.round(dailyLiters / 0.25);
  const bottles750ml = (dailyLiters / 0.75).toFixed(1);

  return {
    primaryLabel: "Daily Water Intake Goal",
    primaryValue: `${dailyLiters.toFixed(2)} Liters`,
    metrics: [
      { label: "Standard Glasses (250ml)", value: `${glasses250ml} Glasses`, highlight: true },
      { label: "Water Bottles (750ml)", value: `${bottles750ml} Bottles` },
      { label: "Hourly Intake Target", value: `${Math.round((dailyLiters * 1000) / 14)} ml / hr` },
    ],
    summaryText: `Based on your weight (${w} kg) and ${ex} mins activity, drink at least ${dailyLiters.toFixed(2)} Liters of water daily.`,
  };
}

// 7. Macro Nutrients Calculator
export function calculateMacros(dailyCalories: number, dietType: "balanced" | "low_carb" | "high_protein" | "keto"): CalculationResult {
  const cal = Math.max(800, dailyCalories);

  let pPct = 0.30;
  let cPct = 0.40;
  let fPct = 0.30;

  if (dietType === "low_carb") {
    pPct = 0.40; cPct = 0.20; fPct = 0.40;
  } else if (dietType === "high_protein") {
    pPct = 0.35; cPct = 0.45; fPct = 0.20;
  } else if (dietType === "keto") {
    pPct = 0.25; cPct = 0.05; fPct = 0.70;
  }

  const proteinG = Math.round((cal * pPct) / 4);
  const carbsG = Math.round((cal * cPct) / 4);
  const fatsG = Math.round((cal * fPct) / 9);

  return {
    primaryLabel: "Daily Protein Target",
    primaryValue: `${proteinG}g (${Math.round(pPct * 100)}%)`,
    metrics: [
      { label: "Carbohydrates", value: `${carbsG}g (${Math.round(cPct * 100)}%)`, highlight: true },
      { label: "Healthy Fats", value: `${fatsG}g (${Math.round(fPct * 100)}%)` },
      { label: "Total Energy Target", value: `${cal} kcal / day` },
      { label: "Diet Plan Profile", value: dietType.replace("_", " ").toUpperCase() },
    ],
    summaryText: `For a ${cal} kcal ${dietType.replace("_", " ")} plan: Protein ${proteinG}g (${Math.round(cal * pPct)} kcal), Carbs ${carbsG}g (${Math.round(cal * cPct)} kcal), Fats ${fatsG}g (${Math.round(cal * fPct)} kcal).`,
  };
}
