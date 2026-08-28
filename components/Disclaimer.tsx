import React from "react";
import { AlertCircle, ShieldAlert } from "lucide-react";

export interface DisclaimerProps {
  type?: "financial" | "tax" | "health" | "general";
  className?: string;
}

export function Disclaimer({ type = "general", className = "" }: DisclaimerProps) {
  let text =
    "Calculations are estimates for educational and informational purposes and may differ from actual lender, employer, tax, investment, or statutory calculations.";

  if (type === "financial") {
    text =
      "Results are estimates based on the inputs and mathematical assumptions shown on this page. Actual financial outcomes, loan approvals, and investment returns may vary based on product terms and market conditions.";
  } else if (type === "tax") {
    text =
      "Tax estimates are based on the selected assessment year, assumptions, and applicable statutory provisions. Actual tax liability may differ depending on individual circumstances, income classifications, and official revisions.";
  } else if (type === "health") {
    text =
      "Health calculations are informational estimates based on standard biometric formulas and do not constitute medical advice, diagnosis, or treatment plans.";
  }

  return (
    <div className={`bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 sm:p-5 text-navy/80 text-xs leading-relaxed flex items-start gap-3 ${className}`}>
      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-navy block mb-0.5">Important Notice</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
