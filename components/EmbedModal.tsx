"use client";

import React, { useState } from "react";
import { Code, Check, Copy, X } from "lucide-react";

interface Props {
  slug: string;
  name: string;
}

export function EmbedModal({ slug, name }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe src="https://mycalculator.xyz/calculators/${slug}" width="100%" height="650" frameborder="0" style="border:1px solid #e2e8f0;border-radius:16px;max-width:650px;" title="${name} - MyCalculators"></iframe>\n<p style="font-size:12px;color:#64748b;margin-top:6px;">Powered by <a href="https://mycalculator.xyz/calculators/${slug}" target="_blank" rel="noopener" style="color:#2b6cb0;text-decoration:underline;">MyCalculators ${name}</a></p>`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-navy/70 hover:text-steel bg-white hover:bg-sage/20 px-3 py-1.5 rounded-xl border border-navy/15 transition-colors shadow-xs"
      >
        <Code className="w-3.5 h-3.5" /> Embed on Your Website
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-navy/20 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy/10">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-steel" />
                <h3 className="font-extrabold text-base text-navy">Embed {name}</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-navy/50 hover:text-navy hover:bg-sage/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-navy/75 leading-relaxed">
              Copy and paste this lightweight HTML snippet into your WordPress post, blog article, or website layout to provide an interactive calculator to your readers:
            </p>

            <div className="bg-sage/20 border border-navy/15 rounded-xl p-3">
              <pre className="text-[11px] font-mono text-navy/85 overflow-x-auto whitespace-pre-wrap break-all">
                {embedCode}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="bg-navy hover:bg-navy/90 text-cream font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 text-xs transition-colors shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied Snippet!" : "Copy Embed Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
