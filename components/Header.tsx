"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import { CALCULATORS, CalculatorCategory, CATEGORIES_META } from "@/lib/registry";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = query.trim()
    ? CALCULATORS.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-navy/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-navy/15 flex items-center justify-center bg-navy">
              <Image
                src="/logo.png"
                alt="MyCalculators Logo"
                width={36}
                height={36}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-tight text-navy leading-none">
                MyCalculators
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-steel mt-0.5">
                Smart Calculators
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-navy/80">
            <Link href="/calculators/finance" className="hover:text-navy transition-colors">
              Finance
            </Link>
            <Link href="/calculators/business" className="hover:text-navy transition-colors">
              Business
            </Link>
            <Link href="/calculators/math" className="hover:text-navy transition-colors">
              Math
            </Link>
            <Link href="/calculators/health" className="hover:text-navy transition-colors">
              Health
            </Link>
            <Link href="/calculators/converters" className="hover:text-navy transition-colors">
              Converters
            </Link>
            <Link href="/calculators" className="hover:text-navy transition-colors">
              All (100+)
            </Link>
          </nav>

          {/* Search Trigger Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-sage/30 hover:bg-sage/50 text-navy/75 hover:text-navy px-3 py-1.5 rounded-xl border border-navy/10 text-xs font-semibold transition-all shadow-xs"
              aria-label="Search calculators"
            >
              <Search className="w-3.5 h-3.5 text-steel" />
              <span className="hidden sm:inline">Search...</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-navy hover:bg-sage/20 rounded-xl"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-b border-navy/10 px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/calculators/finance"
                onClick={() => setMenuOpen(false)}
                className="p-2.5 bg-sage/20 rounded-xl text-navy"
              >
                Finance
              </Link>
              <Link
                href="/calculators/business"
                onClick={() => setMenuOpen(false)}
                className="p-2.5 bg-sage/20 rounded-xl text-navy"
              >
                Business
              </Link>
              <Link
                href="/calculators/math"
                onClick={() => setMenuOpen(false)}
                className="p-2.5 bg-sage/20 rounded-xl text-navy"
              >
                Math
              </Link>
              <Link
                href="/calculators/health"
                onClick={() => setMenuOpen(false)}
                className="p-2.5 bg-sage/20 rounded-xl text-navy"
              >
                Health
              </Link>
              <Link
                href="/calculators/converters"
                onClick={() => setMenuOpen(false)}
                className="p-2.5 bg-sage/20 rounded-xl text-navy"
              >
                Converters
              </Link>
              <Link
                href="/calculators"
                onClick={() => setMenuOpen(false)}
                className="p-2.5 bg-sage/20 rounded-xl text-navy"
              >
                All 100+ Tools
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-3xl p-5 border border-navy/20 shadow-2xl max-w-xl w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy/10">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-5 h-5 text-steel" />
                <input
                  type="text"
                  placeholder="Search 100+ calculators (e.g., EMI, GST, Salary, SIP)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-sm font-bold text-navy outline-none placeholder:text-navy/40"
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setQuery("");
                }}
                className="p-1 text-navy/50 hover:text-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto space-y-2">
              {filtered.length > 0 ? (
                filtered.map((calc) => (
                  <Link
                    key={calc.id}
                    href={`/calculators/${calc.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-sage/30 transition-colors border border-transparent hover:border-navy/10 group"
                  >
                    <div>
                      <span className="font-bold text-sm text-navy group-hover:text-steel block">
                        {calc.name}
                      </span>
                      <span className="text-xs text-navy/60 line-clamp-1">{calc.description}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-navy/40 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))
              ) : query.trim() ? (
                <div className="text-center py-6 text-xs text-navy/60">
                  No calculators found matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="text-xs text-navy/60 space-y-2 py-2">
                  <span className="font-bold text-navy/70 block uppercase tracking-wider text-[10px]">
                    Popular Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {["emi-calculator", "sip-calculator", "gst-calculator", "salary-calculator", "income-tax-calculator", "ltv-calculator"].map(
                      (slug) => {
                        const item = CALCULATORS.find((c) => c.slug === slug);
                        if (!item) return null;
                        return (
                          <Link
                            key={item.id}
                            href={`/calculators/${item.slug}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setQuery("");
                            }}
                            className="px-2.5 py-1 bg-sage/30 hover:bg-sage text-navy text-xs font-bold rounded-lg border border-navy/10"
                          >
                            {item.name}
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
