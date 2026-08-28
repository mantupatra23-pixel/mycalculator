"use client";

import React, { useState, useMemo } from "react";
import { formatNumberIN } from "@/lib/formatters";
import { Copy, Check, Share2, RotateCcw, ArrowRightLeft, ChevronDown } from "lucide-react";

interface Props {
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

export function TimeDateRenderer({ slug, name }: Props) {
  const todayStr = "2026-08-28";

  const [dob, setDob] = useState<string>("2000-01-01");
  const [targetDate, setTargetDate] = useState<string>(todayStr);
  const [startDate, setStartDate] = useState<string>("2026-01-01");
  const [endDate, setEndDate] = useState<string>(todayStr);
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [addQty, setAddQty] = useState<number>(30);
  const [addUnit, setAddUnit] = useState<"days" | "weeks" | "months" | "years">("days");

  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:30");
  const [breakMins, setBreakMins] = useState<number>(30);

  const [tzTime, setTzTime] = useState<string>("14:30");
  const [sourceTz, setSourceTz] = useState<string>("IST");
  const [targetTz, setTargetTz] = useState<string>("EST");

  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    if (slug === "time-zone-calculator") {
      const srcObj = TIMEZONES.find((t) => t.id === sourceTz) || TIMEZONES[0];
      const tgtObj = TIMEZONES.find((t) => t.id === targetTz) || TIMEZONES[2];

      const [h, m] = tzTime.split(":").map(Number);
      const srcTotalMinutes = (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
      const utcMinutes = srcTotalMinutes - srcObj.offset * 60;
      let targetTotalMinutes = utcMinutes + tgtObj.offset * 60;

      let dayOffset = 0;
      while (targetTotalMinutes < 0) { targetTotalMinutes += 24 * 60; dayOffset -= 1; }
      while (targetTotalMinutes >= 24 * 60) { targetTotalMinutes -= 24 * 60; dayOffset += 1; }

      const resH = Math.floor(targetTotalMinutes / 60);
      const resM = Math.round(targetTotalMinutes % 60);
      const period = resH >= 12 ? "PM" : "AM";
      const displayH = resH % 12 === 0 ? 12 : resH % 12;
      const formattedTime = `${String(displayH).padStart(2, "0")}:${String(resM).padStart(2, "0")} ${period}`;
      const time24h = `${String(resH).padStart(2, "0")}:${String(resM).padStart(2, "0")}`;

      const timeDifference = tgtObj.offset - srcObj.offset;
      const diffStr = timeDifference >= 0 ? `+${timeDifference} hrs ahead` : `${timeDifference} hrs behind`;

      return {
        primaryLabel: `Time in ${tgtObj.id}`,
        primaryValue: formattedTime,
        metrics: [
          { label: "24-Hour Format", value: `${time24h} (${tgtObj.id})`, highlight: true },
          { label: "Time Difference", value: diffStr },
          { label: "Relative Day", value: dayOffset === 0 ? "Same Day" : dayOffset > 0 ? "+1 Day (Tomorrow)" : "-1 Day (Yesterday)" },
          { label: "Source Input", value: `${tzTime} (${srcObj.id})` },
        ],
        summaryText: `${tzTime} in ${srcObj.id} is ${formattedTime} in ${tgtObj.id}.`,
      };
    }

    if (slug === "date-add-calculator" || slug === "date-subtract-calculator") {
      const isAdd = slug === "date-add-calculator";
      const dt = new Date(baseDate);
      if (isNaN(dt.getTime())) return { primaryLabel: "Date", primaryValue: "Invalid", metrics: [], summaryText: "" };

      const factor = isAdd ? 1 : -1;
      const qty = Math.max(0, addQty) * factor;

      if (addUnit === "days") dt.setDate(dt.getDate() + qty);
      else if (addUnit === "weeks") dt.setDate(dt.getDate() + qty * 7);
      else if (addUnit === "months") dt.setMonth(dt.getMonth() + qty);
      else if (addUnit === "years") dt.setFullYear(dt.getFullYear() + qty);

      const formatted = dt.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
      return {
        primaryLabel: isAdd ? "Resulting Future Date" : "Resulting Past Date",
        primaryValue: formatted,
        metrics: [
          { label: "Day of the Week", value: dt.toLocaleDateString("en-US", { weekday: "long" }), highlight: true },
          { label: "Operation", value: `${isAdd ? "Added" : "Subtracted"} ${addQty} ${addUnit}` },
          { label: "Starting Date", value: baseDate },
        ],
        summaryText: `${isAdd ? "Adding" : "Subtracting"} ${addQty} ${addUnit} results in ${formatted}.`,
      };
    }

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
        summaryText: `Total elapsed duration is ${hours}h ${mins}m (${decimalHours} hrs).`,
      };
    }

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
        summaryText: `There are ${totalDays} calendar days (${weeks} weeks) between ${startDate} and ${endDate}.`,
      };
    }

    // Age Calculator
    const birth = new Date(dob);
    const target = new Date(targetDate);
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return { primaryLabel: "Age", primaryValue: "Invalid", metrics: [], summaryText: "" };

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
    const daysToNext = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      primaryLabel: slug === "age-in-days-calculator" ? "Total Days Alive" : "Your Exact Age",
      primaryValue: slug === "age-in-days-calculator" ? `${formatNumberIN(totalDays, 0)} Days` : `${years} Years, ${months} Months, ${days} Days`,
      metrics: [
        { label: "Total Days Lived", value: `${formatNumberIN(totalDays, 0)} Days`, highlight: true },
        { label: "Total Hours Lived", value: `${formatNumberIN(totalDays * 24, 0)} Hours` },
        { label: "Next Birthday In", value: `${daysToNext} Days` },
        { label: "Total Weeks Lived", value: `${formatNumberIN(Math.floor(totalDays / 7), 0)} Weeks` },
      ],
      summaryText: `You are ${years} years, ${months} months, and ${days} days old as of ${targetDate}.`,
    };
  }, [slug, tzTime, sourceTz, targetTz, baseDate, addQty, addUnit, startTime, endTime, breakMins, startDate, endDate, dob, targetDate]);

  const handleCopy = () => {
    const text = `${name} Result:\n${result.primaryLabel}: ${result.primaryValue}\n` +
      result.metrics.map((m) => `${m.label}: ${m.value}`).join("\n") +
      `\nCalculated on MyCalculators.xyz`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border border-navy/15 rounded-3xl p-5 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-navy/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-steel bg-sage/40 px-2.5 py-1 rounded-md">
            Time & Date Tool
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setDob("2000-01-01");
            setTargetDate(todayStr);
            setStartDate("2026-01-01");
            setEndDate(todayStr);
            setBaseDate(todayStr);
            setStartTime("09:00");
            setEndTime("17:30");
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {slug === "time-zone-calculator" && (
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
                      <option key={tz.id} value={tz.id}>{tz.label}</option>
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
                      <option key={tz.id} value={tz.id}>{tz.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50 pointer-events-none" />
                </div>
              </div>
            </>
          )}

          {(slug === "date-add-calculator" || slug === "date-subtract-calculator") && (
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
                  <label className="block font-bold text-sm text-navy mb-2">{slug === "date-add-calculator" ? "Add Amount" : "Subtract Amount"}</label>
                  <input
                    type="number"
                    min="1"
                    value={addQty}
                    onChange={(e) => setAddQty(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm text-navy mb-2">Unit</label>
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
          )}

          {(slug === "time-duration-calculator" || slug === "hours-calculator") && (
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
                    value={breakMins}
                    onChange={(e) => setBreakMins(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                  />
                </div>
              )}
            </>
          )}

          {(slug === "date-difference-calculator" || slug === "days-between-dates") && (
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
          )}

          {(slug === "age-calculator" || slug === "age-in-days-calculator") && (
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
          )}
        </div>

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
                  <span className={`font-bold ${m.highlight ? "text-[#b36932]" : "text-navy"}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-6 mt-6 border-t border-navy/10">
            <button
              onClick={handleCopy}
              className="flex-1 bg-white hover:bg-white/80 text-navy font-bold py-2.5 px-3 rounded-xl border border-navy/20 flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Result"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
