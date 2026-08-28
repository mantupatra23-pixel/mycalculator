"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CALCULATORS, CalculatorMeta } from "@/lib/registry";
import { Search, ArrowRight, Sparkles, X } from "lucide-react";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const POPULAR_TAGS = [
    { label: "EMI", slug: "emi-calculator" },
    { label: "GST", slug: "gst-calculator" },
    { label: "SIP", slug: "sip-calculator" },
    { label: "Salary", slug: "salary-calculator" },
    { label: "Percentage", slug: "percentage-calculator" },
    { label: "Age", slug: "age-calculator" },
    { label: "BMI", slug: "bmi-calculator" },
    { label: "LTV", slug: "ltv-calculator" },
    { label: "FD", slug: "fd-calculator" },
    { label: "PPF", slug: "ppf-calculator" },
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return CALCULATORS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/calculators/${slug}`);
  };

  return (
    <div ref={searchContainerRef} className="w-full max-w-2xl mx-auto space-y-3 relative">
      {/* Search Bar Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-steel" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search 100+ calculators... (e.g. EMI, SIP, GST, Salary, Age)"
          className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border-2 border-navy/20 focus:border-steel text-navy font-bold text-sm sm:text-base placeholder-navy/45 shadow-md focus:outline-none focus:ring-4 focus:ring-steel/15 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-navy/40 hover:text-navy"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Live Search Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border-2 border-navy/15 shadow-2xl z-50 max-h-96 overflow-y-auto divide-y divide-navy/10 text-left">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.slug)}
                className="w-full px-4 py-3 hover:bg-sage/30 flex items-center justify-between transition-colors text-left group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-navy group-hover:text-steel transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-steel bg-sage/50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-navy/60 line-clamp-1 mt-0.5">{item.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-navy/30 group-hover:text-steel group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-navy/60 text-sm">
              No calculators matching &ldquo;<span className="font-bold text-navy">{query}</span>&rdquo; found.
            </div>
          )}
        </div>
      )}

      {/* Quick Popular Search Chips */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 pt-1">
        <span className="text-xs font-bold text-navy/60 flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-sand" /> Popular:
        </span>
        {POPULAR_TAGS.map((tag) => (
          <Link
            key={tag.slug}
            href={`/calculators/${tag.slug}`}
            className="px-3 py-1 bg-white hover:bg-navy hover:text-cream text-navy font-bold text-xs rounded-xl border border-navy/20 shadow-sm transition-all"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
