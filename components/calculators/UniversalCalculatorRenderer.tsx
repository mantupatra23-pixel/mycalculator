"use client";

import React, { useState, useMemo } from "react";
import { formatNumberIN, formatINR } from "@/lib/formatters";
import {
  calculateUniversal,
  calculateFraction,
  calculateCountdown,
  calculateUnitConverter,
} from "@/lib/calculators/allEngines";
import {
  Copy,
  Check,
  Share2,
  RotateCcw,
  ArrowRightLeft,
  ChevronDown,
  Delete,
  Equal,
} from "lucide-react";

export interface UniversalProps {
  slug: string;
  name: string;
}

const TIMEZONES = [
  { label: "IST — India (UTC+5:30)", offset: 5.5, id: "IST" },
  { label: "UTC — Universal (UTC+0)", offset: 0, id: "UTC" },
  { label: "EST — New York (UTC-5)", offset: -5, id: "EST" },
  { label: "PST — San Francisco (UTC-8)", offset: -8, id: "PST" },
  { label: "GMT — London (UTC+0)", offset: 0, id: "GMT" },
  { label: "CET — Paris / Berlin (UTC+1)", offset: 1, id: "CET" },
  { label: "GST — Dubai (UTC+4)", offset: 4, id: "GST" },
  { label: "SGT — Singapore (UTC+8)", offset: 8, id: "SGT" },
  { label: "JST — Tokyo (UTC+9)", offset: 9, id: "JST" },
  { label: "AEST — Sydney (UTC+10)", offset: 10, id: "AEST" },
];

export function UniversalCalculatorRenderer({ slug, name }: UniversalProps) {
  const todayStr = "2026-08-28";

  // Scientific Calculator State
  const [sciDisplay, setSciDisplay] = useState<string>("0");
  const [sciFormula, setSciFormula] = useState<string>("");

  // Fraction State
  const [fracN1, setFracN1] = useState<number>(3);
  const [fracD1, setFracD1] = useState<number>(4);
  const [fracOp, setFracOp] = useState<string>("+");
  const [fracN2, setFracN2] = useState<number>(2);
  const [fracD2, setFracD2] = useState<number>(5);

  // Countdown State
  const [countdownDate, setCountdownDate] = useState<string>("2027-01-01T00:00");
  const [countdownTitle, setCountdownTitle] = useState<string>("New Year 2027");

  // Unit Converter State
  const [convCat, setConvCat] = useState<any>(() => {
    if (slug.includes("weight") || slug.includes("kg") || slug.includes("pound")) return "weight";
    if (slug.includes("temperature") || slug.includes("celsius") || slug.includes("fahrenheit")) return "temperature";
    if (slug.includes("area")) return "area";
    if (slug.includes("volume")) return "volume";
    if (slug.includes("speed")) return "speed";
    if (slug.includes("data")) return "data";
    return "length";
  });
  const [convFrom, setConvFrom] = useState<string>(() => {
    if (slug === "meter-to-feet") return "m";
    if (slug === "inch-to-cm") return "in";
    if (slug === "cm-to-inch") return "cm";
    if (slug === "kg-to-pound") return "kg";
    if (slug === "pound-to-kg") return "lb";
    if (slug === "km-to-miles") return "km";
    if (slug === "miles-to-km") return "mi";
    if (slug === "celsius-to-fahrenheit") return "c";
    if (slug === "fahrenheit-to-celsius") return "f";
    return "ft";
  });
  const [convTo, setConvTo] = useState<string>(() => {
    if (slug === "meter-to-feet") return "ft";
    if (slug === "inch-to-cm") return "cm";
    if (slug === "cm-to-inch") return "in";
    if (slug === "kg-to-pound") return "lb";
    if (slug === "pound-to-kg") return "kg";
    if (slug === "km-to-miles") return "mi";
    if (slug === "miles-to-km") return "km";
    if (slug === "celsius-to-fahrenheit") return "f";
    if (slug === "fahrenheit-to-celsius") return "c";
    return "m";
  });
  const [convVal, setConvVal] = useState<number>(10);

  // Time Zone states
  const [tzTime, setTzTime] = useState<string>("14:30");
  const [sourceTz, setSourceTz] = useState<string>("IST");
  const [targetTz, setTargetTz] = useState<string>("EST");

  // Date states
  const [dob, setDob] = useState<string>("2000-01-01");
  const [targetDate, setTargetDate] = useState<string>(todayStr);
  const [startDate, setStartDate] = useState<string>("2026-01-01");
  const [endDate, setEndDate] = useState<string>(todayStr);

  // Date Add / Subtract states
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [addQty, setAddQty] = useState<number>(30);
  const [addUnit, setAddUnit] = useState<"days" | "weeks" | "months" | "years">("days");

  // Time duration states
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:30");
  const [breakMins, setBreakMins] = useState<number>(30);

  // Numeric states
  const [v1, setV1] = useState<number>(() => {
    if (slug === "bmi-calculator") return 70;
    if (slug.includes("calorie") || slug.includes("bmr")) return 70;
    if (slug === "roas-calculator") return 150000;
    if (slug === "cgpa-to-percentage") return 8.5;
    if (slug === "fuel-cost-calculator") return 300;
    if (slug === "mileage-calculator") return 450;
    if (slug === "electricity-bill-calculator") return 1500;
    if (slug === "tip-calculator") return 2000;
    if (slug === "savings-calculator") return 5000;
    if (slug === "commission-calculator") return 200000;
    if (slug === "overtime-calculator") return 250;
    return 100;
  });

  const [v2, setV2] = useState<number>(() => {
    if (slug === "bmi-calculator") return 175;
    if (slug.includes("calorie") || slug.includes("bmr")) return 175;
    if (slug === "roas-calculator") return 30000;
    if (slug === "fuel-cost-calculator") return 18;
    if (slug === "mileage-calculator") return 25;
    if (slug === "electricity-bill-calculator") return 8;
    if (slug === "tip-calculator") return 10;
    if (slug === "savings-calculator") return 7;
    if (slug === "commission-calculator") return 10;
    if (slug === "overtime-calculator") return 15;
    return 10;
  });

  const [v3, setV3] = useState<number>(() => {
    if (slug.includes("calorie") || slug.includes("bmr")) return 28;
    if (slug === "fuel-cost-calculator") return 102;
    if (slug === "mileage-calculator") return 102;
    if (slug === "electricity-bill-calculator") return 7.5;
    if (slug === "tip-calculator") return 4;
    if (slug === "savings-calculator") return 5;
    if (slug === "overtime-calculator") return 1.5;
    return 0;
  });

  const [copied, setCopied] = useState<boolean>(false);

  // Scientific Calculator Key Actions
  const handleSciKey = (key: string) => {
    if (key === "C") {
      setSciDisplay("0");
      setSciFormula("");
    } else if (key === "DEL") {
      setSciDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (key === "=") {
      try {
        let expression = sciDisplay
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/π/g, `${Math.PI}`)
          .replace(/e/g, `${Math.E}`);

        // Math functions safely
        expression = expression.replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)");
        expression = expression.replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)");
        expression = expression.replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)");
        expression = expression.replace(/sqrt\(([^)]+)\)/g, "Math.sqrt($1)");
        expression = expression.replace(/log\(([^)]+)\)/g, "Math.log10($1)");
        expression = expression.replace(/ln\(([^)]+)\)/g, "Math.log($1)");

        // Safe evaluation with Function constructor
        const evalResult = Function(`'use strict'; return (${expression})`)();
        setSciFormula(`${sciDisplay} =`);
        setSciDisplay(isNaN(evalResult) || !isFinite(evalResult) ? "Error" : `${parseFloat(evalResult.toFixed(6))}`);
      } catch {
        setSciDisplay("Error");
      }
    } else if (["sin", "cos", "tan", "sqrt", "log", "ln"].includes(key)) {
      setSciDisplay((prev) => (prev === "0" ? `${key}(` : `${prev}${key}(`));
    } else {
      setSciDisplay((prev) => (prev === "0" && key !== "." ? key : `${prev}${key}`));
    }
  };

  // Calculate Result
  const result = useMemo(() => {
    // Fraction Calculator
    if (slug === "fraction-calculator") {
      return calculateFraction(fracN1, fracD1, fracOp, fracN2, fracD2);
    }

    // Countdown Calculator
    if (slug === "countdown-calculator") {
      return calculateCountdown(countdownDate, countdownTitle);
    }

    // Converters
    if (
      slug.includes("converter") ||
      slug.includes("to-") ||
      slug === "unit-converter" ||
      slug === "height-converter"
    ) {
      return calculateUnitConverter(convCat, convFrom, convTo, convVal);
    }

    // Time Zone Converter
    if (slug === "time-zone-calculator") {
      const srcObj = TIMEZONES.find((t) => t.id === sourceTz) || TIMEZONES[0];
      const tgtObj = TIMEZONES.find((t) => t.id === targetTz) || TIMEZONES[2];

      const [h, m] = tzTime.split(":").map(Number);
      const srcTotalMinutes = (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
      const utcMinutes = srcTotalMinutes - srcObj.offset * 60;
      let targetTotalMinutes = utcMinutes + tgtObj.offset * 60;

      let dayOffset = 0;
      while (targetTotalMinutes < 0) {
        targetTotalMinutes += 24 * 60;
        dayOffset -= 1;
      }
      while (targetTotalMinutes >= 24 * 60) {
        targetTotalMinutes -= 24 * 60;
        dayOffset += 1;
      }

      const resH = Math.floor(targetTotalMinutes / 60);
      const resM = Math.round(targetTotalMinutes % 60);
      const period = resH >= 12 ? "PM" : "AM";
      const displayH = resH % 12 === 0 ? 12 : resH % 12;
      const formattedTime = `${String(displayH).padStart(2, "0")}:${String(resM).padStart(2, "0")} ${period}`;
      const time24h = `${String(resH).padStart(2, "0")}:${String(resM).padStart(2, "0")}`;

      const timeDifference = tgtObj.offset - srcObj.offset;
      const diffStr =
        timeDifference >= 0 ? `+${timeDifference} hrs ahead` : `${timeDifference} hrs behind`;

      return {
        primaryLabel: `Time in ${tgtObj.id}`,
        primaryValue: formattedTime,
        metrics: [
          { label: "24-Hour Format", value: `${time24h} (${tgtObj.id})`, highlight: true },
          { label: "Time Difference", value: diffStr },
          {
            label: "Relative Day",
            value:
              dayOffset === 0
                ? "Same Day"
                : dayOffset > 0
                ? "+1 Day (Tomorrow)"
                : "-1 Day (Yesterday)",
          },
          { label: "Source Input", value: `${tzTime} (${srcObj.id})` },
        ],
        summaryText: `${tzTime} in ${srcObj.id} corresponds to ${formattedTime} (${time24h}) in ${tgtObj.id}.`,
      };
    }

    // Date Add / Subtract
    if (slug === "date-add-calculator" || slug === "date-subtract-calculator") {
      const isAdd = slug === "date-add-calculator";
      const dt = new Date(baseDate);

      if (isNaN(dt.getTime())) {
        return {
          primaryLabel: "Calculated Date",
          primaryValue: "Invalid Date",
          metrics: [],
          summaryText: "Please select a valid date.",
        };
      }

      const factor = isAdd ? 1 : -1;
      const qty = Math.max(0, addQty) * factor;

      if (addUnit === "days") dt.setDate(dt.getDate() + qty);
      else if (addUnit === "weeks") dt.setDate(dt.getDate() + qty * 7);
      else if (addUnit === "months") dt.setMonth(dt.getMonth() + qty);
      else if (addUnit === "years") dt.setFullYear(dt.getFullYear() + qty);

      const formattedResultDate = dt.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        primaryLabel: isAdd ? "Resulting Future Date" : "Resulting Past Date",
        primaryValue: formattedResultDate,
        metrics: [
          { label: "Day of the Week", value: dt.toLocaleDateString("en-US", { weekday: "long" }), highlight: true },
          { label: "Operation", value: `${isAdd ? "Added" : "Subtracted"} ${addQty} ${addUnit}` },
          { label: "Starting Date", value: baseDate },
        ],
        summaryText: `${isAdd ? "Adding" : "Subtracting"} ${addQty} ${addUnit} to ${baseDate} results in ${formattedResultDate}.`,
      };
    }

    // Time Duration & Hours
    if (slug === "time-duration-calculator" || slug === "hours-calculator") {
      const [startH, startM] = startTime.split(":").map(Number);
      const [endH, endM] = endTime.split(":").map(Number);

      let totalMinutes = ((endH || 0) * 60 + (endM || 0)) - ((startH || 0) * 60 + (startM || 0));
      if (totalMinutes < 0) totalMinutes += 24 * 60;

      const netMinutes = Math.max(0, totalMinutes - (slug === "hours-calculator" ? breakMins : 0));
      const hours = Math.floor(netMinutes / 60);
      const mins = netMinutes % 60;
      const decimalHours = (netMinutes / 60).toFixed(2);

      return {
        primaryLabel: slug === "hours-calculator" ? "Net Working Hours" : "Total Duration",
        primaryValue: `${hours} Hours, ${mins} Minutes`,
        metrics: [
          { label: "Decimal Hours", value: `${decimalHours} hrs`, highlight: true },
          { label: "Total Minutes", value: `${formatNumberIN(netMinutes, 0)} Mins` },
          { label: "Total Seconds", value: `${formatNumberIN(netMinutes * 60, 0)} Secs` },
          ...(slug === "hours-calculator" ? [{ label: "Break Deducted", value: `${breakMins} mins` }] : []),
        ],
        summaryText: `From ${startTime} to ${endTime}${slug === "hours-calculator" ? ` minus ${breakMins}m break` : ""}, duration is ${hours}h ${mins}m (${decimalHours} hrs).`,
      };
    }

    // Date Difference
    if (slug === "date-difference-calculator" || slug === "days-between-dates") {
      const d1 = new Date(startDate);
      const d2 = new Date(endDate);
      const diffMs = Math.abs(d2.getTime() - d1.getTime());
      const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const weeks = (totalDays / 7).toFixed(1);

      return {
        primaryLabel: "Days Between Dates",
        primaryValue: `${formatNumberIN(totalDays, 0)} Days`,
        metrics: [
          { label: "Total Weeks", value: `${weeks} Weeks`, highlight: true },
          { label: "Total Hours", value: `${formatNumberIN(totalDays * 24, 0)} Hours` },
          { label: "Working Days (approx)", value: `${formatNumberIN(Math.round(totalDays * (5 / 7)), 0)} Days` },
        ],
        summaryText: `Between ${startDate} and ${endDate}, there are ${totalDays} calendar days (${weeks} weeks).`,
      };
    }

    // Age Calculators
    if (slug === "age-calculator" || slug === "age-in-days-calculator") {
      const birth = new Date(dob);
      const target = new Date(targetDate);

      if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
        return {
          primaryLabel: "Your Exact Age",
          primaryValue: "Invalid Date",
          metrics: [],
          summaryText: "Please select a valid date.",
        };
      }

      let diffMs = Math.max(0, target.getTime() - birth.getTime());
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      let years = target.getFullYear() - birth.getFullYear();
      let months = target.getMonth() - birth.getMonth();
      let days = target.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBday < target) nextBday.setFullYear(target.getFullYear() + 1);
      const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

      return {
        primaryLabel: slug === "age-in-days-calculator" ? "Total Days Alive" : "Your Exact Age",
        primaryValue:
          slug === "age-in-days-calculator"
            ? `${formatNumberIN(totalDays, 0)} Days`
            : `${years} Years, ${months} Months, ${days} Days`,
        metrics: [
          { label: "Total Days Lived", value: `${formatNumberIN(totalDays, 0)} Days`, highlight: true },
          { label: "Total Hours Lived", value: `${formatNumberIN(totalDays * 24, 0)} Hours` },
          { label: "Next Birthday In", value: `${daysToNextBday} Days` },
          { label: "Total Weeks Lived", value: `${formatNumberIN(Math.floor(totalDays / 7), 0)} Weeks` },
        ],
        summaryText: `Born on ${dob}, you are ${years} years, ${months} months, and ${days} days old as of ${targetDate}.`,
      };
    }

    return calculateUniversal(slug, v1, v2, v3);
  }, [
    slug,
    fracN1,
    fracD1,
    fracOp,
    fracN2,
    fracD2,
    countdownDate,
    countdownTitle,
    convCat,
    convFrom,
    convTo,
    convVal,
    tzTime,
    sourceTz,
    targetTz,
    baseDate,
    addQty,
    addUnit,
    dob,
    targetDate,
    startDate,
    endDate,
    startTime,
    endTime,
    breakMins,
    v1,
    v2,
    v3,
  ]);

  const handleCopy = () => {
    const text =
      `${name} Results:\n${result.primaryLabel}: ${result.primaryValue}\n` +
      result.metrics.map((m) => `${m.label}: ${m.value}`).join("\n") +
      `\nCalculated on MyCalculators.xyz`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name} - MyCalculators`,
          text: `${result.primaryLabel}: ${result.primaryValue}`,
          url: window.location.href,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const isScientific = slug === "scientific-calculator";
  const isFraction = slug === "fraction-calculator";
  const isCountdown = slug === "countdown-calculator";
  const isConverter =
    slug.includes("converter") ||
    slug.includes("to-") ||
    slug === "unit-converter" ||
    slug === "height-converter";
  const isTzCalculator = slug === "time-zone-calculator";
  const isDateAddSubCalculator = slug === "date-add-calculator" || slug === "date-subtract-calculator";
  const isTimeCalculator = slug === "time-duration-calculator" || slug === "hours-calculator";
  const isDateDiffCalculator = slug === "date-difference-calculator" || slug === "days-between-dates";
  const isAgeCalculator = slug === "age-calculator" || slug === "age-in-days-calculator";

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Interactive Tool
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setV1(slug === "bmi-calculator" ? 70 : 100);
            setV2(slug === "bmi-calculator" ? 175 : 10);
            setV3(0);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* --- 1. SCIENTIFIC CALCULATOR KEYPAD --- */}
      {isScientific ? (
        <div className="max-w-md mx-auto bg-navy p-5 rounded-3xl shadow-xl text-cream">
          <div className="bg-sage/20 border border-cream/20 p-4 rounded-2xl mb-4 text-right">
            <div className="text-xs text-cream/60 min-h-[18px]">{sciFormula}</div>
            <div className="text-3xl font-mono font-black text-cream tracking-wider overflow-x-auto">
              {sciDisplay}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-sm font-bold">
            {["sin", "cos", "tan", "sqrt", "log", "ln", "(", ")", "C", "DEL", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "π", "="].map(
              (btn) => (
                <button
                  key={btn}
                  onClick={() => handleSciKey(btn === "×" ? "*" : btn === "÷" ? "/" : btn)}
                  className={`py-3 rounded-xl font-bold transition-transform active:scale-95 flex items-center justify-center ${
                    btn === "="
                      ? "bg-sand text-navy text-lg font-black col-span-1 shadow-md hover:bg-sand/90"
                      : btn === "C" || btn === "DEL"
                      ? "bg-rose-500/80 hover:bg-rose-500 text-white"
                      : ["+", "-", "×", "÷", "%"].includes(btn)
                      ? "bg-steel text-white hover:bg-steel/80 text-base"
                      : ["sin", "cos", "tan", "sqrt", "log", "ln", "(", ")", "π"].includes(btn)
                      ? "bg-navy/60 text-sand hover:bg-navy/80 border border-cream/20 text-xs"
                      : "bg-cream/10 hover:bg-cream/20 text-cream text-base"
                  }`}
                >
                  {btn}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Inputs */}
          <div className="lg:col-span-7 space-y-6">
            {/* --- 2. FRACTION CALCULATOR UI --- */}
            {isFraction ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  {/* Fraction 1 */}
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      value={fracN1}
                      onChange={(e) => setFracN1(Number(e.target.value))}
                      className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy"
                    />
                    <div className="w-20 h-0.5 bg-navy" />
                    <input
                      type="number"
                      value={fracD1}
                      onChange={(e) => setFracD1(Number(e.target.value))}
                      className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy"
                    />
                  </div>

                  {/* Operator */}
                  <select
                    value={fracOp}
                    onChange={(e) => setFracOp(e.target.value)}
                    className="py-2.5 px-3 bg-sage/40 rounded-xl border border-navy/20 font-extrabold text-navy text-lg"
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </select>

                  {/* Fraction 2 */}
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      value={fracN2}
                      onChange={(e) => setFracN2(Number(e.target.value))}
                      className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy"
                    />
                    <div className="w-20 h-0.5 bg-navy" />
                    <input
                      type="number"
                      value={fracD2}
                      onChange={(e) => setFracD2(Number(e.target.value))}
                      className="w-20 text-center py-2 bg-white rounded-xl border border-navy/20 font-bold text-navy"
                    />
                  </div>
                </div>
              </div>
            ) : isCountdown ? (
              /* --- 3. COUNTDOWN CALCULATOR UI --- */
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Event Title</label>
                  <input
                    type="text"
                    value={countdownTitle}
                    onChange={(e) => setCountdownTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Target Date & Time</label>
                  <input
                    type="datetime-local"
                    value={countdownDate}
                    onChange={(e) => setCountdownDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel"
                  />
                </div>
              </div>
            ) : isConverter ? (
              /* --- 4. UNIT CONVERTER UI --- */
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Amount to Convert</label>
                  <input
                    type="number"
                    value={convVal || ""}
                    onChange={(e) => setConvVal(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">From Unit</label>
                    <select
                      value={convFrom}
                      onChange={(e) => setConvFrom(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel"
                    >
                      {convCat === "length" && (
                        <>
                          <option value="m">Meters (m)</option>
                          <option value="km">Kilometers (km)</option>
                          <option value="cm">Centimeters (cm)</option>
                          <option value="mm">Millimeters (mm)</option>
                          <option value="ft">Feet (ft)</option>
                          <option value="in">Inches (in)</option>
                          <option value="yd">Yards (yd)</option>
                          <option value="mi">Miles (mi)</option>
                        </>
                      )}
                      {convCat === "weight" && (
                        <>
                          <option value="kg">Kilograms (kg)</option>
                          <option value="g">Grams (g)</option>
                          <option value="mg">Milligrams (mg)</option>
                          <option value="lb">Pounds (lb)</option>
                          <option value="oz">Ounces (oz)</option>
                          <option value="ton">Metric Ton</option>
                        </>
                      )}
                      {convCat === "temperature" && (
                        <>
                          <option value="c">Celsius (°C)</option>
                          <option value="f">Fahrenheit (°F)</option>
                          <option value="k">Kelvin (K)</option>
                        </>
                      )}
                      {convCat === "area" && (
                        <>
                          <option value="sqft">Sq. Feet (sqft)</option>
                          <option value="sqm">Sq. Meters (sqm)</option>
                          <option value="acre">Acres</option>
                          <option value="hectare">Hectares</option>
                          <option value="bigha">Bigha (India)</option>
                        </>
                      )}
                      {convCat === "volume" && (
                        <>
                          <option value="l">Liters (L)</option>
                          <option value="ml">Milliliters (ml)</option>
                          <option value="gal">Gallons (gal)</option>
                          <option value="cum">Cubic Meters</option>
                        </>
                      )}
                      {convCat === "speed" && (
                        <>
                          <option value="kmh">km/h</option>
                          <option value="mph">mph</option>
                          <option value="ms">m/s</option>
                          <option value="knot">Knots</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">To Unit</label>
                    <select
                      value={convTo}
                      onChange={(e) => setConvTo(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel"
                    >
                      {convCat === "length" && (
                        <>
                          <option value="m">Meters (m)</option>
                          <option value="km">Kilometers (km)</option>
                          <option value="cm">Centimeters (cm)</option>
                          <option value="mm">Millimeters (mm)</option>
                          <option value="ft">Feet (ft)</option>
                          <option value="in">Inches (in)</option>
                          <option value="yd">Yards (yd)</option>
                          <option value="mi">Miles (mi)</option>
                        </>
                      )}
                      {convCat === "weight" && (
                        <>
                          <option value="kg">Kilograms (kg)</option>
                          <option value="g">Grams (g)</option>
                          <option value="mg">Milligrams (mg)</option>
                          <option value="lb">Pounds (lb)</option>
                          <option value="oz">Ounces (oz)</option>
                          <option value="ton">Metric Ton</option>
                        </>
                      )}
                      {convCat === "temperature" && (
                        <>
                          <option value="c">Celsius (°C)</option>
                          <option value="f">Fahrenheit (°F)</option>
                          <option value="k">Kelvin (K)</option>
                        </>
                      )}
                      {convCat === "area" && (
                        <>
                          <option value="sqft">Sq. Feet (sqft)</option>
                          <option value="sqm">Sq. Meters (sqm)</option>
                          <option value="acre">Acres</option>
                          <option value="hectare">Hectares</option>
                          <option value="bigha">Bigha (India)</option>
                        </>
                      )}
                      {convCat === "volume" && (
                        <>
                          <option value="l">Liters (L)</option>
                          <option value="ml">Milliliters (ml)</option>
                          <option value="gal">Gallons (gal)</option>
                          <option value="cum">Cubic Meters</option>
                        </>
                      )}
                      {convCat === "speed" && (
                        <>
                          <option value="kmh">km/h</option>
                          <option value="mph">mph</option>
                          <option value="ms">m/s</option>
                          <option value="knot">Knots</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            ) : isTzCalculator ? (
              /* --- 5. TIME ZONE UI --- */
              <>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Select Time</label>
                  <input
                    type="time"
                    value={tzTime}
                    onChange={(e) => setTzTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">From Time Zone</label>
                  <div className="relative">
                    <select
                      value={sourceTz}
                      onChange={(e) => setSourceTz(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.id} value={tz.id}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50 pointer-events-none" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      const prev = sourceTz;
                      setSourceTz(targetTz);
                      setTargetTz(prev);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage/50 text-navy font-bold text-xs hover:bg-sage transition-colors border border-navy/10 shadow-sm"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-steel" /> Swap Time Zones
                  </button>
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">To Time Zone</label>
                  <div className="relative">
                    <select
                      value={targetTz}
                      onChange={(e) => setTargetTz(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.id} value={tz.id}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50 pointer-events-none" />
                  </div>
                </div>
              </>
            ) : isDateAddSubCalculator ? (
              /* --- 6. DATE ADD / SUBTRACT UI --- */
              <>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Starting Date</label>
                  <input
                    type="date"
                    value={baseDate}
                    onChange={(e) => setBaseDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">
                      {slug === "date-add-calculator" ? "Amount to Add" : "Amount to Subtract"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={addQty}
                      onChange={(e) => setAddQty(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">Unit of Time</label>
                    <div className="relative">
                      <select
                        value={addUnit}
                        onChange={(e) => setAddUnit(e.target.value as any)}
                        className="w-full appearance-none px-4 py-3 pr-10 bg-white rounded-xl border border-navy/20 font-bold text-navy text-sm focus:ring-2 focus:ring-steel shadow-sm"
                      >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </>
            ) : isTimeCalculator ? (
              /* --- 7. TIME DURATION UI --- */
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">Start Time</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">End Time</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                    />
                  </div>
                </div>
                {slug === "hours-calculator" && (
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">Unpaid Break (Minutes)</label>
                    <input
                      type="number"
                      min="0"
                      max="300"
                      value={breakMins}
                      onChange={(e) => setBreakMins(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                    />
                  </div>
                )}
              </>
            ) : isDateDiffCalculator ? (
              /* --- 8. DATE DIFFERENCE UI --- */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </div>
            ) : isAgeCalculator ? (
              /* --- 9. AGE UI --- */
              <>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Date of Birth (DOB)</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Age as of Date (Today)</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              </>
            ) : (
              /* --- 10. DEDICATED GENERAL UTILITY TOOLS UI --- */
              <>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">
                    {slug === "fuel-cost-calculator"
                      ? "Total Distance (km)"
                      : slug === "mileage-calculator"
                      ? "Total Distance Covered (km)"
                      : slug === "electricity-bill-calculator"
                      ? "Total Power Rating (Watts)"
                      : slug === "tip-calculator"
                      ? "Total Bill Amount (₹)"
                      : slug === "savings-calculator"
                      ? "Monthly Deposit Amount (₹)"
                      : slug === "commission-calculator"
                      ? "Gross Sales Revenue (₹)"
                      : slug === "overtime-calculator"
                      ? "Base Hourly Wage (₹)"
                      : slug === "bmi-calculator"
                      ? "Body Weight (kg)"
                      : slug.includes("calorie") || slug.includes("water")
                      ? "Body Weight (kg)"
                      : slug === "cgpa-to-percentage"
                      ? "Enter CGPA (0 - 10 Scale)"
                      : slug === "percentage-to-cgpa"
                      ? "Enter Percentage (%)"
                      : slug === "roas-calculator"
                      ? "Total Campaign Revenue (₹)"
                      : "Primary Input Value"}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={v1 || ""}
                    onChange={(e) => setV1(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>

                {!slug.includes("cgpa") && !slug.includes("water") && (
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">
                      {slug === "fuel-cost-calculator"
                        ? "Vehicle Mileage (km / Liter)"
                        : slug === "mileage-calculator"
                        ? "Total Fuel Consumed (Liters)"
                        : slug === "electricity-bill-calculator"
                        ? "Operating Hours Per Day"
                        : slug === "tip-calculator"
                        ? "Tip Percentage (%)"
                        : slug === "savings-calculator"
                        ? "Expected Annual Return (%)"
                        : slug === "commission-calculator"
                        ? "Commission Rate (%)"
                        : slug === "overtime-calculator"
                        ? "Total Overtime Hours"
                        : slug === "bmi-calculator" || slug.includes("calorie")
                        ? "Height (cm)"
                        : slug === "roas-calculator"
                        ? "Total Ad Spend (₹)"
                        : "Secondary Value"}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={v2 || ""}
                      onChange={(e) => setV2(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                    />
                  </div>
                )}

                {(slug.includes("calorie") ||
                  slug === "fuel-cost-calculator" ||
                  slug === "mileage-calculator" ||
                  slug === "electricity-bill-calculator" ||
                  slug === "tip-calculator" ||
                  slug === "savings-calculator" ||
                  slug === "overtime-calculator") && (
                  <div>
                    <label className="block font-bold text-sm text-navy mb-2">
                      {slug.includes("calorie")
                        ? "Age (Years)"
                        : slug === "fuel-cost-calculator" || slug === "mileage-calculator"
                        ? "Fuel Price (₹ / Liter)"
                        : slug === "electricity-bill-calculator"
                        ? "Electricity Tariff (₹ / Unit kWh)"
                        : slug === "tip-calculator"
                        ? "Number of People Sharing"
                        : slug === "savings-calculator"
                        ? "Investment Tenure (Years)"
                        : slug === "overtime-calculator"
                        ? "Overtime Multiplier (1.5x / 2.0x)"
                        : "Third Parameter"}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={v3 || ""}
                      onChange={(e) => setV3(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Output Box */}
          <div className="lg:col-span-5 bg-sage/35 rounded-2xl p-5 sm:p-6 border border-navy/15 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-1">
                {result.primaryLabel}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-navy mb-6 tracking-tight">
                {result.primaryValue}
              </div>

              <div className="space-y-3 text-sm border-t border-navy/10 pt-4">
                {result.metrics.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-navy/75 font-medium">{m.label}:</span>
                    <span className={`font-bold ${m.highlight ? "text-[#b36932]" : "text-navy"}`}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-6 mt-6 border-t border-navy/10">
              <button
                onClick={handleCopy}
                className="flex-1 bg-white hover:bg-white/80 text-navy font-bold py-2.5 px-3 rounded-xl border border-navy/20 flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Result"}
              </button>
              <button
                onClick={handleShare}
                className="bg-navy hover:bg-navy/90 text-cream font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
