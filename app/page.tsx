import React from "react";
import { Calculator, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
      {/* Header Accent Bar */}
      <div className="w-full h-1.5 bg-sand rounded-full mb-8" />

      {/* Hero Section */}
      <section className="bg-sage rounded-2xl p-6 md:p-10 border border-navy/10 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-navy mb-3 tracking-tight">
          Free Online Calculators for Everyday Life
        </h1>
        <p className="text-navy/80 text-base md:text-lg mb-6 max-w-xl mx-auto">
          Calculate EMI, GST, SIP returns, percentages, and more with instant accuracy.
        </p>

        {/* Instant Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search calculators (e.g., EMI, GST, SIP)..."
            className="w-full bg-cream text-navy placeholder:text-navy/50 px-4 py-3.5 rounded-xl border border-navy/20 focus:outline-none focus:ring-2 focus:ring-steel text-base shadow-sm"
          />
        </div>
      </section>

      {/* Popular Calculators Grid */}
      <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-sand" /> Popular Calculators
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          { name: "EMI Calculator", desc: "Calculate home, car & personal loan EMIs" },
          { name: "GST Calculator", desc: "Add or remove GST with custom slabs" },
          { name: "SIP Calculator", desc: "Forecast wealth growth and returns" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-cream border border-navy/15 rounded-xl p-5 hover:border-steel transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-sage rounded-lg flex items-center justify-center text-navy mb-3">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-navy mb-1">{item.name}</h3>
              <p className="text-navy/70 text-sm mb-4">{item.desc}</p>
            </div>
            <button className="w-full bg-steel hover:bg-steel/90 text-cream font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm">
              Open Calculator <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Action Button Accent Example */}
      <div className="flex justify-center">
        <button className="bg-sand hover:bg-sand/90 text-navy font-bold py-3 px-8 rounded-xl shadow-sm text-base">
          Explore All 100+ Calculators
        </button>
      </div>
    </main>
  );
}
