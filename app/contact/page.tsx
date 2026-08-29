import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Mail, MessageSquare, Clock, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | MyCalculators Support & Inquiries",
  description: "Get in touch with the MyCalculators engineering team for feedback, calculator requests, or technical audits.",
  alternates: {
    canonical: "https://mycalculator.xyz/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-navy">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="bg-sage/40 rounded-3xl p-6 sm:p-10 border border-navy/10 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-steel bg-white px-3 py-1 rounded-md border border-navy/10 shadow-sm">
          <MessageSquare className="w-3.5 h-3.5" /> Support & Communication
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
          Contact Engineering Support
        </h1>
        <p className="text-navy/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Have feedback, found a calculation discrepancy, or want a custom tool added to our platform? Reach out directly to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-navy/15 rounded-3xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sage/40 flex items-center justify-center text-steel">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-navy">Direct Email</h2>
            <p className="text-xs text-navy/70 leading-relaxed">
              For general inquiries, bug reports, or feature recommendations:
            </p>
            <a
              href="mailto:mantupatra23@gmail.com"
              className="font-extrabold text-sm text-steel hover:underline block break-all"
            >
              mantupatra23@gmail.com
            </a>
          </div>

          <div className="bg-white border border-navy/15 rounded-3xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sage/40 flex items-center justify-center text-steel">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-base text-navy">Response Window</h2>
            <p className="text-xs text-navy/70 leading-relaxed">
              Our engineering desk monitors incoming queries and typically replies within 24–48 business hours.
            </p>
          </div>
        </div>

        {/* Guidelines / Inquiry Checklist */}
        <div className="md:col-span-7 bg-white border border-navy/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="text-lg font-bold text-navy">How We Can Help</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-navy/80 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
              <span><strong>New Tool Suggestions:</strong> Let us know if you need a specific business, tax, or engineering calculator built.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
              <span><strong>Formula Audits:</strong> If you identify changes in statutory tax slabs, state professional tax slabs, or bank calculation standards.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-steel shrink-0 mt-0.5" />
              <span><strong>Editorial & Embed Inquiries:</strong> Educational institutions or finance publishers seeking custom iframe configurations.</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-navy/10 text-xs text-navy/60">
            Official Support Desk: <strong className="text-navy">mantupatra23@gmail.com</strong>
          </div>
        </div>
      </div>
    </main>
  );
}
