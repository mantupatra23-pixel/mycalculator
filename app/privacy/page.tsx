import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-navy">
      <h1 className="text-3xl font-black">Privacy Policy</h1>
      <div className="space-y-4 text-sm text-navy/80 leading-relaxed">
        <p>At MyCalculators, your privacy is our core priority. All calculation operations happen entirely on your client device using web standards.</p>
        <p>We do not store, transmit, or monetize your private financial inputs, loan values, salaries, or health metrics on external servers.</p>
      </div>
    </main>
  );
}
