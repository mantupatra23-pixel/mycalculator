"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CALCULATORS } from "@/lib/registry";
import { Search, ArrowRight, X } from "lucide-react";

export function SearchSection() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return CALCULATORS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search calculators (e.g., EMI, GST, SIP, Percentage, Age, BMI)..."
          className="w-full pl-12 pr-10 py-4 bg-white text-navy placeholder:text-navy/45 rounded-2xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-steel text-base shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-navy/50 hover:text-navy"
            aria-label="Clear Search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Instant Dropdown Results */}
      {query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-navy/15 rounded-2xl shadow-xl z-30 max-h-96 overflow-y-auto divide-y divide-navy/10 p-2">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <Link
                key={item.id}
                href={`/calculators/${item.slug}`}
                className="flex items-center justify-between p-3.5 hover:bg-sage/30 rounded-xl transition-colors group"
              >
                <div>
                  <div className="font-bold text-navy text-sm sm:text-base group-hover:text-steel transition-colors">
                    {item.name}
                  </div>
                  <div className="text-xs text-navy/60 line-clamp-1">{item.description}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-navy/40 group-hover:text-steel transition-transform group-hover:translate-x-1" />
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-navy/60">
              No calculator found for &ldquo;{query}&rdquo;. Browse all tools below.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
