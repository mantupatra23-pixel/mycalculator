import { formatNumberIN } from "@/lib/formatters";
import { CalculationResult } from "./finance";

export type UnitCategory = "length" | "weight" | "temperature" | "area" | "volume" | "speed" | "data" | "time";

export interface UnitOption {
  id: string;
  name: string;
  factor: number; // relative to base
}

export const UNIT_DATA: Record<UnitCategory, { name: string; base: string; units: UnitOption[] }> = {
  length: {
    name: "Length & Distance",
    base: "m",
    units: [
      { id: "m", name: "Meters (m)", factor: 1 },
      { id: "km", name: "Kilometers (km)", factor: 1000 },
      { id: "cm", name: "Centimeters (cm)", factor: 0.01 },
      { id: "mm", name: "Millimeters (mm)", factor: 0.001 },
      { id: "ft", name: "Feet (ft)", factor: 0.3048 },
      { id: "in", name: "Inches (in)", factor: 0.0254 },
      { id: "yd", name: "Yards (yd)", factor: 0.9144 },
      { id: "mi", name: "Miles (mi)", factor: 1609.344 },
    ],
  },
  weight: {
    name: "Weight & Mass",
    base: "kg",
    units: [
      { id: "kg", name: "Kilograms (kg)", factor: 1 },
      { id: "g", name: "Grams (g)", factor: 0.001 },
      { id: "mg", name: "Milligrams (mg)", factor: 0.000001 },
      { id: "lb", name: "Pounds (lbs)", factor: 0.45359237 },
      { id: "oz", name: "Ounces (oz)", factor: 0.0283495 },
      { id: "ton", name: "Metric Ton (t)", factor: 1000 },
      { id: "quintal", name: "Quintal (q)", factor: 100 },
    ],
  },
  temperature: {
    name: "Temperature",
    base: "c",
    units: [
      { id: "c", name: "Celsius (°C)", factor: 1 },
      { id: "f", name: "Fahrenheit (°F)", factor: 1 },
      { id: "k", name: "Kelvin (K)", factor: 1 },
    ],
  },
  area: {
    name: "Area & Land",
    base: "sqm",
    units: [
      { id: "sqm", name: "Square Meters (sq.m)", factor: 1 },
      { id: "sqft", name: "Square Feet (sq.ft)", factor: 0.092903 },
      { id: "sqyd", name: "Square Yards (sq.yd)", factor: 0.836127 },
      { id: "acre", name: "Acres", factor: 4046.86 },
      { id: "hectare", name: "Hectares", factor: 10000 },
      { id: "bigha", name: "Bigha (India)", factor: 2529.28 },
      { id: "guntha", name: "Guntha", factor: 101.17 },
    ],
  },
  volume: {
    name: "Volume & Capacity",
    base: "l",
    units: [
      { id: "l", name: "Liters (L)", factor: 1 },
      { id: "ml", name: "Milliliters (ml)", factor: 0.001 },
      { id: "gal", name: "Gallons (US gal)", factor: 3.78541 },
      { id: "cum", name: "Cubic Meters (m³)", factor: 1000 },
      { id: "cuft", name: "Cubic Feet (ft³)", factor: 28.3168 },
    ],
  },
  speed: {
    name: "Speed",
    base: "kmh",
    units: [
      { id: "kmh", name: "Kilometers / hr (km/h)", factor: 1 },
      { id: "mph", name: "Miles / hr (mph)", factor: 1.60934 },
      { id: "ms", name: "Meters / sec (m/s)", factor: 3.6 },
      { id: "knot", name: "Knots (kn)", factor: 1.852 },
    ],
  },
  data: {
    name: "Digital Data Storage",
    base: "mb",
    units: [
      { id: "b", name: "Bytes (B)", factor: 0.000001 },
      { id: "kb", name: "Kilobytes (KB)", factor: 0.001 },
      { id: "mb", name: "Megabytes (MB)", factor: 1 },
      { id: "gb", name: "Gigabytes (GB)", factor: 1000 },
      { id: "tb", name: "Terabytes (TB)", factor: 1000000 },
      { id: "pb", name: "Petabytes (PB)", factor: 1000000000 },
    ],
  },
  time: {
    name: "Time Units",
    base: "min",
    units: [
      { id: "sec", name: "Seconds (s)", factor: 1 / 60 },
      { id: "min", name: "Minutes (m)", factor: 1 },
      { id: "hr", name: "Hours (h)", factor: 60 },
      { id: "day", name: "Days (d)", factor: 1440 },
      { id: "wk", name: "Weeks (w)", factor: 10080 },
    ],
  },
};

export function convertUnits(category: UnitCategory, fromUnit: string, toUnit: string, value: number): CalculationResult {
  const val = isNaN(value) ? 0 : value;

  if (category === "temperature") {
    let tempC = val;
    if (fromUnit === "f") tempC = ((val - 32) * 5) / 9;
    if (fromUnit === "k") tempC = val - 273.15;

    let targetVal = tempC;
    if (toUnit === "f") targetVal = (tempC * 9) / 5 + 32;
    if (toUnit === "k") targetVal = tempC + 273.15;

    const fromLabel = fromUnit === "c" ? "°C" : fromUnit === "f" ? "°F" : "K";
    const toLabel = toUnit === "c" ? "°C" : toUnit === "f" ? "°F" : "K";

    return {
      primaryLabel: `Converted Temperature (${toLabel})`,
      primaryValue: `${formatNumberIN(targetVal, 2)} ${toLabel}`,
      metrics: [
        { label: "Original Input", value: `${formatNumberIN(val, 2)} ${fromLabel}` },
        { label: "Celsius Equivalent", value: `${formatNumberIN(tempC, 2)} °C` },
        { label: "Fahrenheit Equivalent", value: `${formatNumberIN((tempC * 9) / 5 + 32, 2)} °F` },
        { label: "Kelvin Equivalent", value: `${formatNumberIN(tempC + 273.15, 2)} K`, highlight: true },
      ],
      summaryText: `${val}${fromLabel} is exactly equal to ${formatNumberIN(targetVal, 2)}${toLabel}.`,
    };
  }

  const catObj = UNIT_DATA[category] || UNIT_DATA.length;
  const fromObj = catObj.units.find((u) => u.id === fromUnit) || catObj.units[0];
  const toObj = catObj.units.find((u) => u.id === toUnit) || catObj.units[1];

  const valueInBase = val * fromObj.factor;
  const converted = valueInBase / toObj.factor;

  // Conversion table of common units in this category
  const previewRows = catObj.units
    .filter((u) => u.id !== fromObj.id)
    .slice(0, 4)
    .map((u) => [u.name, `${formatNumberIN(valueInBase / u.factor, 4)} ${u.id}`]);

  return {
    primaryLabel: `Converted Value (${toObj.id.toUpperCase()})`,
    primaryValue: `${formatNumberIN(converted, 4)} ${toObj.id}`,
    metrics: [
      { label: "Input Value", value: `${formatNumberIN(val, 2)} ${fromObj.id}` },
      { label: "Target Unit", value: toObj.name, highlight: true },
      { label: "Category", value: catObj.name },
    ],
    table: {
      headers: ["Unit", "Equivalent Value"],
      rows: previewRows,
    },
    summaryText: `${val} ${fromObj.name} = ${formatNumberIN(converted, 4)} ${toObj.name}.`,
  };
}
