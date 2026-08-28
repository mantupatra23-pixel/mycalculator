import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - MyCalculators",
  description: "Legal and financial calculation disclaimers for MyCalculators.",
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-navy">
      <h1 className="text-3xl font-black mb-4">Calculation Methodology & Legal Disclaimer</h1>
      <div className="bg-cream/70 border border-sand/40 rounded-2xl p-6 text-sm text-navy/80 space-y-4 leading-relaxed">
        <p>
          The tools and calculators on <strong>MyCalculators.xyz</strong> are intended strictly for educational and informational purposes.
        </p>
        <p>
          <strong>Financial & Tax Tools:</strong> EMI, GST, Salary In-Hand, TDS, and Income Tax calculations are mathematical estimates based on standard rules and current statutory provisions. Actual interest charges, amortization schedules, and tax liabilities may vary depending on lender policies, specific deductions, and amendments by regulatory bodies.
        </p>
        <p>
          <strong>Health Calculators:</strong> BMI, BMR, and calorie estimates should not be considered medical advice or diagnosis. Always consult certified healthcare professionals for health or dietary planning.
        </p>
      </div>
    </main>
  );
}
