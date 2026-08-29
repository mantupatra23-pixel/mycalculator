import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-navy text-cream pt-12 pb-8 border-t border-navy/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-cream/20 flex items-center justify-center bg-white">
                <Image
                  src="/logo.png"
                  alt="MyCalculators Logo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white leading-none">
                  MyCalculators
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#e89d67] mt-0.5">
                  Calculate • Analyze • Grow
                </span>
              </div>
            </Link>
            <p className="text-cream/70 leading-relaxed text-xs max-w-sm">
              Deterministic, private, and zero-latency calculations engineered for personal finance, direct taxation, business forecasting, and mathematics.
            </p>
          </div>

          {/* Finance */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-[#e89d67]">
              Finance
            </h4>
            <ul className="space-y-2 text-cream/75">
              <li><Link href="/calculators/emi-calculator" className="hover:text-white">EMI Calculator</Link></li>
              <li><Link href="/calculators/home-loan-emi-calculator" className="hover:text-white">Home Loan EMI</Link></li>
              <li><Link href="/calculators/sip-calculator" className="hover:text-white">SIP Calculator</Link></li>
              <li><Link href="/calculators/gst-calculator" className="hover:text-white">GST Calculator</Link></li>
              <li><Link href="/calculators/income-tax-calculator" className="hover:text-white">Income Tax (AY 26-27)</Link></li>
              <li><Link href="/calculators/salary-calculator" className="hover:text-white">Salary (In-Hand)</Link></li>
              <li><Link href="/calculators/ltv-calculator" className="hover:text-white">LTV Ratio</Link></li>
            </ul>
          </div>

          {/* Business & Math */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-[#e89d67]">
              Business & Math
            </h4>
            <ul className="space-y-2 text-cream/75">
              <li><Link href="/calculators/roas-calculator" className="hover:text-white">ROAS Calculator</Link></li>
              <li><Link href="/calculators/break-even-calculator" className="hover:text-white">Break-Even Point</Link></li>
              <li><Link href="/calculators/percentage-calculator" className="hover:text-white">Percentage Tool</Link></li>
              <li><Link href="/calculators/discount-calculator" className="hover:text-white">Discount Calculator</Link></li>
              <li><Link href="/calculators/profit-loss-calculator" className="hover:text-white">Profit & Loss</Link></li>
              <li><Link href="/calculators/ratio-calculator" className="hover:text-white">Ratio Simplifier</Link></li>
            </ul>
          </div>

          {/* Converters & Resources */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-[#e89d67]">
              Converters
            </h4>
            <ul className="space-y-2 text-cream/75">
              <li><Link href="/calculators/unit-converter" className="hover:text-white">All-in-One Converter</Link></li>
              <li><Link href="/calculators/length-converter" className="hover:text-white">Length & Distance</Link></li>
              <li><Link href="/calculators/weight-converter" className="hover:text-white">Weight & Mass</Link></li>
              <li><Link href="/calculators/age-calculator" className="hover:text-white">Age Calculator</Link></li>
              <li><Link href="/calculators/cgpa-to-percentage" className="hover:text-white">CGPA to % (India)</Link></li>
              <li><Link href="/resources" className="hover:text-white font-bold text-[#e89d67]">Formula Cheatsheets</Link></li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider text-[#e89d67]">
              Company
            </h4>
            <ul className="space-y-2 text-cream/75">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Desk</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="pt-8 border-t border-cream/10 text-[11px] text-cream/60 leading-relaxed space-y-2">
          <p>
            <strong>Calculation Methodology & Disclaimer:</strong> Financial, tax, investment, health, and educational results are mathematical estimates based on the inputs entered into each calculator. Rules, statutory slabs (e.g. AY 2026-27), and bank loan underwriting criteria vary. Verify with qualified professionals before making binding decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-cream/50 text-[10px]">
            <span>© 2026 MyCalculators. All rights reserved.</span>
            <span>https://www.mycalculator.xyz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
