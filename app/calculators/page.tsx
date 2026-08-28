"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CALCULATORS, CATEGORIES } from "@/lib/registry";
import { Search, ArrowRight, Layers, Calculator } from "lucide-react";

export default function AllCalculatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    return CALCULATORS.filter((c) => {
      const matchCat = selectedCategory === "all" || c.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-navy/60 mb-4">
        <Link href="/" className="hover:text-navy">Home</Link>
        <span>/</span>
        <span className="text-navy">Calculators</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-navy mb-2 tracking-tight">
          All Calculators
        </h1>
        <p className="text-navy/70 text-sm sm:text-base">
          Browse our complete collection of 100+ free online calculation tools.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search within all calculators..."
            className="w-full pl-10 pr-4 py-2.5 bg-cream border border-navy/20 rounded-xl text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-steel"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-navy text-cream"
                : "bg-sage/60 text-navy hover:bg-sage border border-navy/10"
            }`}
          >
            All ({CALCULATORS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-navy text-cream"
                  : "bg-sage/60 text-navy hover:bg-sage border border-navy/10"
              }`}
            >
              {cat.name.replace(" Calculators", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-cream border border-navy/15 rounded-2xl p-5 hover:border-steel hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-steel bg-sage/80 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
                {item.popular && (
                  <span className="text-[10px] font-bold text-navy bg-sand px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <h2 className="font-extrabold text-base text-navy mb-1">{item.name}</h2>
              <p className="text-xs text-navy/70 mb-4 line-clamp-2">{item.description}</p>
            </div>

            <Link
              href={`/calculators/${item.slug}`}
              className="w-full bg-steel hover:bg-steel/90 text-cream font-bold py-2 px-3.5 rounded-lg flex items-center justify-center gap-1.5 text-xs transition-colors"
            >
              Calculate <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-sage rounded-2xl p-10 text-center border border-navy/10 my-8">
          <Calculator className="w-10 h-10 text-navy/40 mx-auto mb-3" />
          <h3 className="font-bold text-navy text-lg mb-1">No matching calculators found</h3>
          <p className="text-xs text-navy/60 mb-4">Try checking your spelling or select another category filter.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
            }}
            className="bg-sand text-navy font-bold text-xs px-4 py-2 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
