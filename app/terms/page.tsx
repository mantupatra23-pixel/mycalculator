import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileText, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | MyCalculators",
  description: "Review the Terms of Service governing the use of MyCalculators and its calculation tools.",
  alternates: {
    canonical: "https://mycalculators.xyz/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy">Terms of Service</span>
      </nav>

      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-navy/60">
          Last Updated: August 2026 | Governing Domain: mycalculators.xyz
        </p>
      </div>

      <div className="bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-navy/85 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy flex items-center gap-2">
            <FileText className="w-4 h-4 text-steel" /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using <strong>MyCalculators</strong> (<code>https://mycalculators.xyz</code>), you acknowledge and agree to comply with these Terms of Service. If you do not agree with any part of these terms, you should discontinue using the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy">2. Informational & Educational Use Only</h2>
          <p>
            All calculation engines, amortization schedules, tax estimates, conversion ratios, and health benchmarks provided on this site are designed strictly for educational and preliminary planning purposes. Results do not constitute certified legal, financial, tax, or medical advice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy">3. No Warranties or Guarantee of Absolute Accuracy</h2>
          <p>
            While we apply deterministic formulas and update tax slabs regularly (e.g. AY 2026-27 provisions), we make no explicit warranties regarding the commercial applicability, completeness, or statutory finality of calculated outcomes. Individual lender underwriting criteria, employer payroll structures, and fiscal amendments may alter real-world results.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy">4. Limitation of Liability</h2>
          <p>
            Under no circumstances shall MyCalculators or its contributors be held liable for any direct, indirect, or consequential financial losses arising from the use of or inability to use calculation outputs generated on this platform. Users should confirm figures with certified financial advisors or official regulatory portals before executing binding agreements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy">5. Governing Law & Inquiries</h2>
          <p>
            For questions regarding these Terms of Service, reach out to our administration desk at{" "}
            <a href="mailto:mantupatra23@gmail.com" className="text-steel font-bold underline">
              mantupatra23@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
