import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - MyCalculators",
  description: "Learn more about MyCalculators - Smart Calculators for Everyday Life.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-navy">
      <div className="bg-sage/40 rounded-3xl p-8 border border-navy/10 text-center">
        <h1 className="text-3xl sm:text-4xl font-black mb-3">About MyCalculators</h1>
        <p className="text-navy/75 text-base max-w-xl mx-auto">
          Smart Calculators for Everyday Life. Built for Indian & global users.
        </p>
      </div>

      <div className="space-y-4 text-sm sm:text-base leading-relaxed text-navy/80">
        <p>
          MyCalculators is an ultra-fast calculation suite crafted to make day-to-day decisions effortless. Whether estimating a home loan EMI, evaluating GST, projecting mutual fund SIP returns, or checking academic CGPA conversions, we deliver deterministic calculations directly in your browser.
        </p>
        <p>
          Unlike traditional calculator sites that are slow and cluttered with invasive ads, our platform prioritizes performance, privacy, and simplicity.
        </p>
      </div>
    </main>
  );
}
