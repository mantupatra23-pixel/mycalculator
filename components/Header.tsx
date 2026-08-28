"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, Search, Menu, X } from "lucide-react";
import { HeroSearch } from "./HeroSearch";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-navy/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center text-sand shadow-sm group-hover:bg-steel transition-colors">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-lg text-navy tracking-tight block leading-none">
                MyCalculators
              </span>
              <span className="text-[10px] font-bold text-steel tracking-wider uppercase">
                Smart Calculators
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-navy/80">
            <Link href="/calculators/finance" className="hover:text-steel transition-colors">Finance</Link>
            <Link href="/calculators/business" className="hover:text-steel transition-colors">Business</Link>
            <Link href="/calculators/math" className="hover:text-steel transition-colors">Math</Link>
            <Link href="/calculators/health" className="hover:text-steel transition-colors">Health</Link>
            <Link href="/calculators/converters" className="hover:text-steel transition-colors">Converters</Link>
            <Link href="/calculators" className="hover:text-steel transition-colors">All (100+)</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-navy/80 hover:text-navy bg-sage/30 hover:bg-sage/60 px-3 py-1.5 rounded-xl border border-navy/15 transition-all shadow-xs"
            >
              <Search className="w-3.5 h-3.5 text-steel" />
              <span>Search</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-navy hover:bg-sage/30"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-navy/10 px-4 py-4 space-y-2 text-sm font-bold text-navy">
            <Link
              href="/calculators/finance"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-sage/30"
            >
              Finance Calculators
            </Link>
            <Link
              href="/calculators/business"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-sage/30"
            >
              Business Calculators
            </Link>
            <Link
              href="/calculators/math"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-sage/30"
            >
              Math Calculators
            </Link>
            <Link
              href="/calculators/health"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-sage/30"
            >
              Health Calculators
            </Link>
            <Link
              href="/calculators/time-date"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-sage/30"
            >
              Time & Date
            </Link>
            <Link
              href="/calculators/converters"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-sage/30"
            >
              Unit Converters
            </Link>
            <Link
              href="/calculators/education"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-sage/30"
            >
              Education Calculators
            </Link>
            <Link
              href="/calculators"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg bg-navy text-cream"
            >
              All 100+ Calculators
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-navy/20 shadow-2xl w-full max-w-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-steel">
                Search Directory
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-navy/60 hover:text-navy hover:bg-sage/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <HeroSearch />
          </div>
        </div>
      )}
    </>
  );
}
