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
    const text = `${title} Result:\n${result.primaryMetric.label}: ${result.primaryMetric.formatted}\n${result.secondaryMetrics
      .map((m) => `${m.label}: ${m.formatted}`)
      .join("\n")}\n\nCalculated on https://www.mycalculator.xyz/trading/${toolSlug}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-navy text-cream rounded-3xl p-6 sm:p-7 border border-navy/20 shadow-lg space-y-6">
      {/* Primary Metric */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#e89d67]">
          {result.primaryMetric.label}
        </span>
        <div
          className={`text-3xl sm:text-4xl font-black tracking-tight ${
            result.primaryMetric.isPositive === false ? "text-rose-400" : "text-emerald-300"
          }`}
        >
          {result.primaryMetric.formatted}
        </div>
      </div>

      {/* Secondary Metrics */}
      {result.secondaryMetrics.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-cream/15 text-xs">
          {result.secondaryMetrics.map((item, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-3 border border-cream/10">
              <span className="text-[10px] text-cream/70 font-semibold block truncate">{item.label}</span>
              <span
                className={`text-sm font-black ${
                  item.highlight === "green"
                    ? "text-emerald-300"
                    : item.highlight === "red"
                    ? "text-rose-400"
                    : "text-white"
                }`}
              >
                {item.formatted}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Risk Assessment */}
      {result.riskAssessment && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold ${
            result.riskAssessment.level === "critical" || result.riskAssessment.level === "high"
              ? "bg-rose-500/20 border border-rose-400/30 text-rose-200"
              : "bg-emerald-500/20 border border-emerald-400/30 text-emerald-200"
          }`}
        >
          {result.riskAssessment.level === "critical" || result.riskAssessment.level === "high" ? (
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-300" />
          ) : (
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-300" />
          )}
          <span>{result.riskAssessment.summary}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy Result"}
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
          className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all"
          aria-label="Share Result"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
