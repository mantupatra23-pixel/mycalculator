import React from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-cream/90 pt-12 pb-8 border-t border-cream/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* 1. Finance */}
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-sand mb-4">Finance</h4>
            <ul className="space-y-2 text-xs text-cream/70">
              <li><Link href="/calculators/emi-calculator" className="hover:text-cream">EMI Calculator</Link></li>
              <li><Link href="/calculators/gst-calculator" className="hover:text-cream">GST Calculator</Link></li>
              <li><Link href="/calculators/sip-calculator" className="hover:text-cream">SIP Calculator</Link></li>
              <li><Link href="/calculators/income-tax-calculator" className="hover:text-cream">Income Tax</Link></li>
              <li><Link href="/calculators/salary-calculator" className="hover:text-cream">Salary (In-Hand)</Link></li>
              <li><Link href="/calculators/ltv-calculator" className="hover:text-cream">LTV Calculator</Link></li>
              <li><Link href="/calculators/fd-calculator" className="hover:text-cream">FD Calculator</Link></li>
            </ul>
          </div>

          {/* 2. Business */}
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-sand mb-4">Business</h4>
            <ul className="space-y-2 text-xs text-cream/70">
              <li><Link href="/calculators/roas-calculator" className="hover:text-cream">ROAS Calculator</Link></li>
              <li><Link href="/calculators/break-even-calculator" className="hover:text-cream">Break-Even</Link></li>
              <li><Link href="/calculators/freelance-hourly-rate" className="hover:text-cream">Freelance Rate</Link></li>
              <li><Link href="/calculators/salary-hike-calculator" className="hover:text-cream">Salary Hike</Link></li>
              <li><Link href="/calculators/invoice-total-calculator" className="hover:text-cream">Invoice Total</Link></li>
              <li><Link href="/calculators/payroll-calculator" className="hover:text-cream">Payroll</Link></li>
            </ul>
          </div>

          {/* 3. Math */}
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-sand mb-4">Math</h4>
            <ul className="space-y-2 text-xs text-cream/70">
              <li><Link href="/calculators/percentage-calculator" className="hover:text-cream">Percentage</Link></li>
              <li><Link href="/calculators/discount-calculator" className="hover:text-cream">Discount</Link></li>
              <li><Link href="/calculators/profit-loss-calculator" className="hover:text-cream">Profit & Loss</Link></li>
              <li><Link href="/calculators/average-calculator" className="hover:text-cream">Average</Link></li>
              <li><Link href="/calculators/ratio-calculator" className="hover:text-cream">Ratio</Link></li>
            </ul>
          </div>

          {/* 4. Health */}
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-sand mb-4">Health</h4>
            <ul className="space-y-2 text-xs text-cream/70">
              <li><Link href="/calculators/bmi-calculator" className="hover:text-cream">BMI Calculator</Link></li>
              <li><Link href="/calculators/bmr-calculator" className="hover:text-cream">BMR Calculator</Link></li>
              <li><Link href="/calculators/calorie-calculator" className="hover:text-cream">Daily Calories</Link></li>
              <li><Link href="/calculators/body-fat-calculator" className="hover:text-cream">Body Fat</Link></li>
              <li><Link href="/calculators/water-intake-calculator" className="hover:text-cream">Water Intake</Link></li>
            </ul>
          </div>

          {/* 5. Converters */}
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-sand mb-4">Converters</h4>
            <ul className="space-y-2 text-xs text-cream/70">
              <li><Link href="/calculators/unit-converter" className="hover:text-cream">Unit Converter</Link></li>
              <li><Link href="/calculators/length-converter" className="hover:text-cream">Length Converter</Link></li>
              <li><Link href="/calculators/weight-converter" className="hover:text-cream">Weight Converter</Link></li>
              <li><Link href="/calculators/age-calculator" className="hover:text-cream">Age Calculator</Link></li>
              <li><Link href="/calculators/cgpa-to-percentage" className="hover:text-cream">CGPA to %</Link></li>
            </ul>
          </div>

          {/* 6. Company */}
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-sand mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-cream/70">
              <li><Link href="/about" className="hover:text-cream">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cream">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-cream">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cream">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-cream">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Updated Standard Financial & Legal Disclaimer */}
        <div className="pt-8 border-t border-cream/10 space-y-3 text-xs text-cream/60 leading-relaxed">
          <p>
            <strong className="text-cream/80">Calculation Methodology & Disclaimer:</strong> Financial, tax, investment, health, and educational results are estimates based on the inputs and mathematical assumptions shown on each calculator page. Rules, statutory tax slabs, and individual bank policies may change. Verify current applicable information with certified advisors before making important decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-cream/5 gap-2 text-cream/50 text-[11px]">
            <div className="flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5 text-sand" />
              <span>&copy; {new Date().getFullYear()} MyCalculators. All rights reserved.</span>
            </div>
            <span>Calculate. Understand. Decide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
