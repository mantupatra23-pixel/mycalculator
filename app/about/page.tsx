import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Zap, Lock, Cpu, ArrowRight, HeartHandshake, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | MyCalculators – Smart Calculators for Everyday Life",
  description: "Learn about MyCalculators, our mission to provide zero-latency, private, and deterministic browser-based calculations for finance, math, business, and health.",
  alternates: {
    canonical: "https://mycalculators.xyz/about",
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy">About Us</span>
      </nav>

      {/* Header */}
      <div className="bg-sage/40 rounded-3xl p-6 sm:p-10 border border-navy/10 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-steel bg-white px-3 py-1 rounded-md border border-navy/10 shadow-sm">
          <HeartHandshake className="w-3.5 h-3.5" /> Our Mission & Vision
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
          About MyCalculators
        </h1>
        <p className="text-navy/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Smart, browser-native calculation tools engineered for everyday clarity in personal finance, business projections, academic grading, and health reference.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="space-y-6 text-sm text-navy/85 leading-relaxed bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-navy">Who We Are</h2>
        <p>
          <strong>MyCalculators</strong> was founded with a straightforward conviction: everyday mathematical and financial planning should be instant, completely private, and free from invasive ad trackers or paywalls. Whether planning a home loan, analyzing New vs Old Tax Regime implications under Indian statutes, or simplifying complex ratios, our tools deliver mathematical answers directly inside your web browser.
        </p>

        <h2 className="text-xl font-bold text-navy pt-2">Core Operating Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="bg-sage/20 border border-navy/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-navy text-sm">
              <Zap className="w-4 h-4 text-steel" /> Zero Server Latency
            </div>
            <p className="text-xs text-navy/70 leading-relaxed">
              Every formula executes deterministically on your client device using modern JavaScript/TypeScript standards. No slow server round-trips.
            </p>
          </div>

          <div className="bg-sage/20 border border-navy/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-navy text-sm">
              <Lock className="w-4 h-4 text-steel" /> Privacy-First Architecture
            </div>
            <p className="text-xs text-navy/70 leading-relaxed">
              Your salary figures, loan balances, tax slabs, and biometric health metrics remain strictly inside your browser. We never log or monetize input values.
            </p>
          </div>

          <div className="bg-sage/20 border border-navy/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-navy text-sm">
              <Cpu className="w-4 h-4 text-steel" /> Mathematical Rigor
            </div>
            <p className="text-xs text-navy/70 leading-relaxed">
              Formulas are audited against standard statutory provisions (e.g. CBSE/AICTE CGPA, Indian Banking Reducing Balance EMI, and Income Tax Department rules).
            </p>
          </div>

          <div className="bg-sage/20 border border-navy/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-navy text-sm">
              <ShieldCheck className="w-4 h-4 text-steel" /> Clear Assumptions
            </div>
            <p className="text-xs text-navy/70 leading-relaxed">
              We make every compounding frequency, tax rebate threshold, and variable assumption explicit so you understand exactly how numbers are derived.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-navy pt-2">Our Quality Commitment</h2>
        <p>
          We do not believe in opaque calculation engines or aggressive paywalls. Our code undergoes systematic unit testing for boundary cases, negative values, and zero rates. For inquiries, technical audits, or suggestions, please contact our engineering desk at{" "}
          <a href="mailto:mantupatra23@gmail.com" className="text-steel font-bold underline">
            mantupatra23@gmail.com
          </a>.
        </p>
      </div>

      {/* CTA Section */}
      <div className="flex justify-center">
        <Link
          href="/calculators"
          className="bg-navy hover:bg-navy/90 text-cream font-bold py-3 px-6 rounded-2xl flex items-center gap-2 text-xs sm:text-sm transition-colors shadow-sm"
        >
          Explore All 100+ Calculators <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
