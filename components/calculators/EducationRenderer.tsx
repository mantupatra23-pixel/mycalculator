"use client";

import React, { useState, useMemo } from "react";
import { formatNumberIN } from "@/lib/formatters";
import { Copy, Check, Share2, RotateCcw, Plus, Trash2 } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

interface CourseItem {
  id: string;
  name: string;
  gradePoint: number;
  credits: number;
}

interface SemesterItem {
  id: string;
  sem: number;
  sgpa: number;
  credits: number;
}

export function EducationRenderer({ slug, name }: Props) {
  const [marksObtained, setMarksObtained] = useState<number>(85);
  const [totalMaxMarks, setTotalMaxMarks] = useState<number>(100);

  const [courses, setCourses] = useState<CourseItem[]>([
    { id: "1", name: "Mathematics", gradePoint: 4.0, credits: 4 },
    { id: "2", name: "Physics / Computer", gradePoint: 3.5, credits: 3 },
    { id: "3", name: "Data Structures", gradePoint: 3.7, credits: 4 },
    { id: "4", name: "Technical Writing", gradePoint: 3.0, credits: 2 },
  ]);

  const [semesters, setSemesters] = useState<SemesterItem[]>([
    { id: "1", sem: 1, sgpa: 8.4, credits: 22 },
    { id: "2", sem: 2, sgpa: 8.8, credits: 24 },
    { id: "3", sem: 3, sgpa: 8.2, credits: 22 },
    { id: "4", sem: 4, sgpa: 8.6, credits: 24 },
  ]);

  const [cgpaInput, setCgpaInput] = useState<number>(8.5);
  const [percentInput, setPercentInput] = useState<number>(82);
  const [copied, setCopied] = useState<boolean>(false);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now().toString(), name: `Subject ${prev.length + 1}`, gradePoint: 3.5, credits: 3 },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseItem, val: any) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const addSemester = () => {
    setSemesters((prev) => [
      ...prev,
      { id: Date.now().toString(), sem: prev.length + 1, sgpa: 8.0, credits: 22 },
    ]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) setSemesters((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSemester = (id: string, field: keyof SemesterItem, val: any) => {
    setSemesters((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const result = useMemo(() => {
    if (slug === "grade-calculator") {
      const marks = Math.max(0, marksObtained);
      const total = Math.max(1, totalMaxMarks);
      const pct = (marks / total) * 100;
      let grade = "A+";
      let gpa = "4.0";
      let status = "Distinction / Outstanding";

      if (pct >= 90) { grade = "A+"; gpa = "4.0"; status = "Outstanding (Grade O)"; }
      else if (pct >= 80) { grade = "A"; gpa = "3.7"; status = "Excellent (Grade A+)"; }
      else if (pct >= 70) { grade = "B+"; gpa = "3.3"; status = "Very Good (Grade A)"; }
      else if (pct >= 60) { grade = "B"; gpa = "3.0"; status = "Good (Grade B+)"; }
      else if (pct >= 50) { grade = "C"; gpa = "2.0"; status = "Average (Grade B)"; }
      else if (pct >= 40) { grade = "D"; gpa = "1.0"; status = "Pass (Grade P)"; }
      else { grade = "F"; gpa = "0.0"; status = "Fail (Needs Improvement)"; }

      return {
        primaryLabel: "Calculated Final Grade",
        primaryValue: `${grade} (${pct.toFixed(2)}%)`,
        metrics: [
          { label: "Marks Scored", value: `${marks} / ${total}` },
          { label: "Percentage Score", value: `${pct.toFixed(2)}%`, highlight: true },
          { label: "4.0 Scale GPA Equivalent", value: `${gpa} / 4.0` },
          { label: "Academic Standing", value: status },
        ],
        summaryText: `Scoring ${marks} out of ${total} (${pct.toFixed(2)}%) earns grade ${grade} (${gpa} GPA).`,
      };
    }

    if (slug === "gpa-calculator") {
      let totalPts = 0;
      let totalCreds = 0;
      courses.forEach((c) => {
        const cred = Math.max(0, Number(c.credits) || 0);
        const gp = Math.max(0, Number(c.gradePoint) || 0);
        totalPts += gp * cred;
        totalCreds += cred;
      });
      const gpa = totalCreds > 0 ? totalPts / totalCreds : 0;
      return {
        primaryLabel: "Semester GPA (SGPA)",
        primaryValue: `${gpa.toFixed(2)} / 4.0`,
        metrics: [
          { label: "Total Credits", value: `${totalCreds} Credits`, highlight: true },
          { label: "Total Quality Points", value: totalPts.toFixed(2) },
          { label: "Courses Included", value: `${courses.length} Subjects` },
        ],
        summaryText: `Your semester GPA across ${courses.length} courses is ${gpa.toFixed(2)}.`,
      };
    }

    if (slug === "cgpa-calculator") {
      let totalPts = 0;
      let totalCreds = 0;
      semesters.forEach((s) => {
        const cred = Math.max(0, Number(s.credits) || 0);
        const sgpa = Math.max(0, Number(s.sgpa) || 0);
        totalPts += sgpa * cred;
        totalCreds += cred;
      });
      const cgpa = totalCreds > 0 ? totalPts / totalCreds : 0;
      const equivalentPct = cgpa * 9.5;
      return {
        primaryLabel: "Cumulative CGPA",
        primaryValue: `${cgpa.toFixed(2)} / 10.0`,
        metrics: [
          { label: "Equivalent Marks Percentage", value: `${equivalentPct.toFixed(2)}%`, highlight: true },
          { label: "Total Credits Completed", value: `${totalCreds} Credits` },
          { label: "Semesters Added", value: `${semesters.length} Semesters` },
        ],
        summaryText: `Cumulative CGPA across ${semesters.length} semesters is ${cgpa.toFixed(2)} (${equivalentPct.toFixed(2)}%).`,
      };
    }

    if (slug === "cgpa-to-percentage") {
      const cgpa = Math.max(0, Math.min(10, cgpaInput || 0));
      const percentage = cgpa * 9.5;
      let division = "First Class with Distinction";
      if (percentage < 50) division = "Second Division / Pass";
      else if (percentage < 60) division = "Second Division";
      else if (percentage < 75) division = "First Division";

      return {
        primaryLabel: "Marks Percentage",
        primaryValue: `${percentage.toFixed(2)}%`,
        metrics: [
          { label: "CGPA (10-Point Scale)", value: `${cgpa} / 10` },
          { label: "Formula Applied", value: "CGPA × 9.5 (CBSE / AICTE)", highlight: true },
          { label: "Degree Division", value: division },
        ],
        summaryText: `A CGPA of ${cgpa} corresponds to ${percentage.toFixed(2)}% marks (${division}).`,
      };
    }

    // percentage-to-cgpa
    const pct = Math.max(0, Math.min(100, percentInput || 0));
    const cgpa = pct / 9.5;
    return {
      primaryLabel: "Equivalent CGPA",
      primaryValue: `${cgpa.toFixed(2)} / 10.0`,
      metrics: [
        { label: "Entered Percentage", value: `${pct}%` },
        { label: "Formula Applied", value: "Percentage ÷ 9.5", highlight: true },
        { label: "Grading Scale", value: "10-Point Indian Scale" },
      ],
      summaryText: `${pct}% marks translates into a CGPA of ${cgpa.toFixed(2)}.`,
    };
  }, [slug, marksObtained, totalMaxMarks, courses, semesters, cgpaInput, percentInput]);

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
            Education Tool
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">{name}</h2>
        </div>
        <button
          onClick={() => {
            setMarksObtained(85);
            setTotalMaxMarks(100);
            setCgpaInput(8.5);
            setPercentInput(82);
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/70 hover:text-navy px-3 py-1.5 rounded-lg border border-navy/15 hover:bg-sage/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {slug === "grade-calculator" && (
            <>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Marks Scored / Obtained</label>
                <input
                  type="number"
                  value={marksObtained || ""}
                  onChange={(e) => setMarksObtained(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-sm text-navy mb-2">Maximum Total Marks</label>
                <input
                  type="number"
                  value={totalMaxMarks || ""}
                  onChange={(e) => setTotalMaxMarks(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
                />
              </div>
            </>
          )}

          {slug === "gpa-calculator" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-bold text-sm text-navy">Courses / Subjects</label>
                <button
                  type="button"
                  onClick={addCourse}
                  className="flex items-center gap-1 text-xs font-bold text-steel hover:text-navy bg-sage/30 px-3 py-1.5 rounded-lg border border-navy/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Subject
                </button>
              </div>

              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center gap-2 p-2.5 bg-sage/20 border border-navy/10 rounded-xl">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      placeholder="Subject Name"
                      className="flex-1 px-3 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-semibold text-navy"
                    />
                    <div className="w-24">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="4"
                        value={course.gradePoint}
                        onChange={(e) => updateCourse(course.id, "gradePoint", Number(e.target.value))}
                        placeholder="Grade Pt"
                        className="w-full px-2.5 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-bold text-navy text-center"
                      />
                    </div>
                    <div className="w-20">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, "credits", Number(e.target.value))}
                        placeholder="Credits"
                        className="w-full px-2.5 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-bold text-navy text-center"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length <= 1}
                      className="p-2 text-navy/40 hover:text-rose-600 disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slug === "cgpa-calculator" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-bold text-sm text-navy">Semester Performance (SGPA)</label>
                <button
                  type="button"
                  onClick={addSemester}
                  className="flex items-center gap-1 text-xs font-bold text-steel hover:text-navy bg-sage/30 px-3 py-1.5 rounded-lg border border-navy/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Semester
                </button>
              </div>

              <div className="space-y-3">
                {semesters.map((sem, idx) => (
                  <div key={sem.id} className="flex items-center gap-2 p-2.5 bg-sage/20 border border-navy/10 rounded-xl">
                    <span className="w-20 font-bold text-xs text-navy">Sem {idx + 1}</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={sem.sgpa}
                        onChange={(e) => updateSemester(sem.id, "sgpa", Number(e.target.value))}
                        placeholder="SGPA (0-10)"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-bold text-navy"
                      />
                    </div>
                    <div className="w-28">
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={sem.credits}
                        onChange={(e) => updateSemester(sem.id, "credits", Number(e.target.value))}
                        placeholder="Credits"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-navy/15 text-xs sm:text-sm font-bold text-navy text-center"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSemester(sem.id)}
                      disabled={semesters.length <= 1}
                      className="p-2 text-navy/40 hover:text-rose-600 disabled:opacity-30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slug === "cgpa-to-percentage" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-bold text-sm text-navy">Enter CGPA (10-Point Scale)</label>
                <span className="text-xs font-bold text-steel bg-sage/40 px-2 py-0.5 rounded">{cgpaInput} / 10</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={cgpaInput || ""}
                onChange={(e) => setCgpaInput(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
              />
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={cgpaInput}
                onChange={(e) => setCgpaInput(Number(e.target.value))}
                className="w-full accent-steel cursor-pointer"
              />
            </div>
          )}

          {slug === "percentage-to-cgpa" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-bold text-sm text-navy">Enter Marks Percentage (%)</label>
                <span className="text-xs font-bold text-steel bg-sage/40 px-2 py-0.5 rounded">{percentInput}%</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={percentInput || ""}
                onChange={(e) => setPercentInput(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white rounded-xl border border-navy/20 font-bold text-navy text-base focus:ring-2 focus:ring-steel shadow-sm"
              />
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={percentInput}
                onChange={(e) => setPercentInput(Number(e.target.value))}
                className="w-full accent-steel cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Output Card */}
        <div className="lg:col-span-5 bg-sage/35 rounded-2xl p-5 sm:p-6 border border-navy/15 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-1">
              {result.primaryLabel}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-navy mb-6 tracking-tight">
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
