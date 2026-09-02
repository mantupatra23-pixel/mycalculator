"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, AlertTriangle, ShieldCheck } from "lucide-react";
import { TradingCalculationResult } from "@/lib/trading/types";

interface Props {
  title: string;
  result: TradingCalculationResult;
  toolSlug: string;
}

export function TradeResultCard({ title, result, toolSlug }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${title} Calculation Result\n${result.primaryMetric.label}: ${result.primaryMetric.formatted}\n${result.secondaryMetrics
      .map((m) => `${m.label}: ${m.formatted}`)
      .join("\n")}\n\nCalculated on MyCalculators Trading Suite: https://www.mycalculator.xyz/trading/${toolSlug}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0b1222] border border-[#1e293b] text-white rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f59b]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Metric */}
      <div className="space-y-1">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#94a3b8]">
          {result.primaryMetric.label}
        </span>
        <div
          className={`text-3xl sm:text-4xl font-black tracking-tight ${
            result.primaryMetric.isPositive === false ? "text-rose-400" : "text-[#00f59b]"
          }`}
        >
          {result.primaryMetric.formatted}
        </div>
      </div>

      {/* Secondary Metrics Grid */}
      {result.secondaryMetrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1e293b]">
          {result.secondaryMetrics.map((item, idx) => (
            <div key={idx} className="bg-[#0f172a]/60 border border-[#1e293b]/60 rounded-xl p-3">
              <span className="text-[10px] text-[#94a3b8] font-bold block truncate">{item.label}</span>
              <span
                className={`text-sm font-extrabold ${
                  item.highlight === "green"
                    ? "text-[#00f59b]"
                    : item.highlight === "red"
                    ? "text-rose-400"
                    : item.highlight === "cyan"
                    ? "text-[#00d8f6]"
                    : "text-slate-200"
                }`}
              >
                {item.formatted}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Risk Badge */}
      {result.riskAssessment && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold ${
            result.riskAssessment.level === "critical" || result.riskAssessment.level === "high"
              ? "bg-rose-950/30 border-rose-800/40 text-rose-300"
              : "bg-emerald-950/30 border-emerald-800/40 text-emerald-300"
          }`}
        >
          {result.riskAssessment.level === "critical" || result.riskAssessment.level === "high" ? (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          ) : (
            <ShieldCheck className="w-4 h-4 shrink-0" />
          )}
          <span>{result.riskAssessment.summary}</span>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 bg-[#00f59b] hover:bg-[#00d989] text-[#050b14] font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors shadow-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy Result"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title, url: window.location.href }).catch(() => {});
            } else {
              handleCopy();
            }
          }}
          className="p-2.5 rounded-xl border border-[#1e293b] hover:bg-[#1e293b]/60 text-slate-300 transition-colors"
          aria-label="Share Result"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
