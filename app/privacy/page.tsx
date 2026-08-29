import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | MyCalculators",
  description: "Read the MyCalculators Privacy Policy. We prioritize browser-native execution without storing or transmitting your sensitive input data.",
  alternates: {
    canonical: "https://mycalculators.xyz/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy">Privacy Policy</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-navy/60">
          Last Updated: August 2026 | Effective Date: August 2026
        </p>
      </div>

      <div className="bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-navy/85 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy flex items-center gap-2">
            <Lock className="w-4 h-4 text-steel" /> 1. Client-Side Execution & Zero Data Retention
          </h2>
          <p>
            At <strong>MyCalculators</strong> (accessible via <code>https://mycalculators.xyz</code>), user privacy is fundamental to our system architecture. All calculation operations—including loan amounts, salary numbers, tax exemption records, and biometric measurements—are processed locally on your device via client-side JavaScript. We do not store, transmit, log, or monetize your inputs on remote servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-steel" /> 2. Information We Do Not Collect
          </h2>
          <p>
            When utilizing our suite of 100+ calculators:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-navy/75">
            <li>We do not require user account registration, passwords, or personal profiles.</li>
            <li>We do not record financial numbers, bank account balances, PAN details, or CTC salaries.</li>
            <li>We do not track health inputs or fitness numbers.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy">3. Web Analytics & Cookie Policy</h2>
          <p>
            We may utilize standard, privacy-preserving technical log metrics (such as aggregate pageviews, browser user-agent headers, and operating system types) solely to evaluate platform uptime and improve mobile responsiveness. We do not sell personally identifiable data to third-party data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy">4. Third-Party Links & Embeds</h2>
          <p>
            Our website may provide contextual links to regulatory portals or allow third-party websites to embed our calculation widgets via iframes. We are not responsible for the independent privacy practices or content of external third-party services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-navy">5. Contact Information</h2>
          <p>
            For any inquiries regarding this Privacy Policy or our technical security standards, please contact us directly at:
          </p>
          <div className="p-3 bg-sage/20 rounded-xl font-semibold text-navy">
            Email: <a href="mailto:mantupatra23@gmail.com" className="text-steel underline">mantupatra23@gmail.com</a>
          </div>
        </section>
      </div>
    </main>
  );
}
