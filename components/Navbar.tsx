"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, Menu, X, Search, ChevronRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Calculators", href: "/calculators" },
    { label: "Finance", href: "/calculators/finance" },
    { label: "Business", href: "/calculators/business" },
    { label: "Math", href: "/calculators/math" },
    { label: "Health", href: "/calculators/health" },
    { label: "Time & Date", href: "/calculators/time-date" },
    { label: "Converters", href: "/calculators/converters" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-navy/10">
      {/* Top Accent Strip */}
      <div className="h-1 w-full bg-sand" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center text-cream shadow-sm group-hover:bg-steel transition-colors">
            <Calculator className="w-5 h-5 text-sand" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-navy leading-none">
              MyCalculators
            </span>
            <span className="text-[10px] text-navy/60 font-semibold tracking-wider uppercase mt-0.5">
              Smart Calculators
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-navy/80">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg hover:text-navy hover:bg-sage/40 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA / Search Link */}
        <div className="flex items-center gap-2">
          <Link
            href="/calculators"
            className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold text-navy bg-sage/60 border border-navy/15 rounded-lg hover:bg-sage transition-colors"
          >
            <Search className="w-4 h-4 text-steel" />
            <span className="hidden sm:inline">Search</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-sage/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream border-b border-navy/10 px-4 py-4 space-y-1 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-navy font-semibold hover:bg-sage/50 text-base"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-navy/40" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
