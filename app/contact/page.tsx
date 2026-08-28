import React from "react";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-navy">
      <h1 className="text-3xl font-black">Contact Us</h1>
      <p className="text-sm text-navy/75 leading-relaxed">
        Have questions, feedback, or need a specific calculator added? Reach out to our engineering team at <a href="mailto:support@mycalculators.xyz" className="text-steel font-bold underline">support@mycalculators.xyz</a>.
      </p>
    </main>
  );
}
