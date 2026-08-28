import React from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-cream border-t border-navy/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-sand text-sm uppercase tracking-wider mb-4">Finance</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/calculators/emi-calculator" className="hover:text-cream">EMI Calculator</Link></li>
              <li><Link href="/calculators/gst-calculator" className="hover:text-cream">GST Calculator</Link></li>
              <li><Link href="/calculators/sip-calculator" className="hover:text-cream">SIP Calculator</Link></li>
              <li><Link href="/calculators/income-tax-calculator" className="hover:text-cream">Income Tax</Link></li>
              <li><Link href="/calculators/salary-calculator" className="hover:text-cream">Salary (In-Hand)</Link></li>
              <li><Link href="/calculators/fd-calculator" className="hover:text-cream">FD Calculator</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-sand text-sm uppercase tracking-wider mb-4">Business</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/calculators/roas-calculator" className="hover:text-cream">ROAS Calculator</Link></li>
              <li><Link href="/calculators/break-even-calculator" className="hover:text-cream">Break-Even</Link></li>
              <li><Link href="/calculators/freelance-rate-calculator" className="hover:text-cream">Freelance Rate</Link></li>
              <li><Link href="/calculators/salary-hike-calculator" className="hover:text-cream">Salary Hike</Link></li>
              <li><Link href="/calculators/invoice-calculator" className="hover:text-cream">Invoice Total</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-sand text-sm uppercase tracking-wider mb-4">Math</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/calculators/percentage-calculator" className="hover:text-cream">Percentage</Link></li>
              <li><Link href="/calculators/discount-calculator" className="hover:text-cream">Discount</Link></li>
              <li><Link href="/calculators/profit-loss-calculator" className="hover:text-cream">Profit & Loss</Link></li>
              <li><Link href="/calculators/average-calculator" className="hover:text-cream">Average</Link></li>
              <li><Link href="/calculators/ratio-calculator" className="hover:text-cream">Ratio</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-sand text-sm uppercase tracking-wider mb-4">Health</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/calculators/bmi-calculator" className="hover:text-cream">BMI Calculator</Link></li>
              <li><Link href="/calculators/bmr-calculator" className="hover:text-cream">BMR Calculator</Link></li>
              <li><Link href="/calculators/calorie-calculator" className="hover:text-cream">Daily Calories</Link></li>
              <li><Link href="/calculators/ideal-weight-calculator" className="hover:text-cream">Ideal Weight</Link></li>
              <li><Link href="/calculators/water-intake-calculator" className="hover:text-cream">Water Intake</Link></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className="font-bold text-sand text-sm uppercase tracking-wider mb-4">Converters</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/calculators/unit-converter" className="hover:text-cream">Unit Converter</Link></li>
              <li><Link href="/calculators/length-converter" className="hover:text-cream">Length Converter</Link></li>
              <li><Link href="/calculators/weight-converter" className="hover:text-cream">Weight Converter</Link></li>
              <li><Link href="/calculators/age-calculator" className="hover:text-cream">Age Calculator</Link></li>
              <li><Link href="/calculators/cgpa-to-percentage" className="hover:text-cream">CGPA to %</Link></li>
            </ul>
          </div>

          {/* Col 6 */}
          <div>
            <h4 className="font-bold text-sand text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/about" className="hover:text-cream">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cream">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-cream">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cream">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-cream">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="border-t border-cream/10 pt-6 pb-6 text-xs text-cream/60 leading-relaxed">
          <p className="mb-2">
            <strong>Calculation Methodology & Disclaimer:</strong> Calculations are performed instantly inside your browser using standard mathematical formulas. All financial, medical, and educational results are estimates for educational and informational purposes only. Please verify important financial and tax decisions with certified advisors.
          </p>
          <p>
            Results for GST, Income Tax, Salary, and TDS calculators are based on prevailing Indian statutes and slabs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-sand" />
            <span>© 2026 MyCalculators. All rights reserved.</span>
          </div>
          <div>Calculate. Understand. Decide.</div>
        </div>
      </div>
    </footer>
  );
}
