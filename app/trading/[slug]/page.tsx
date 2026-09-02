import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTradingTools, getTradingToolBySlug } from "@/lib/trading/registry";
import { PnLCalculatorRenderer } from "@/components/trading/renderers/PnLCalculatorRenderer";
import { PositionSizeRenderer } from "@/components/trading/renderers/PositionSizeRenderer";
import { BrokerageRenderer } from "@/components/trading/renderers/BrokerageRenderer";
import { BookOpen, Calculator, ShieldAlert, Code2, HelpCircle } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllTradingTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getTradingToolBySlug(params.slug);
  if (!tool) return { title: "Trading Tool Not Found | MyCalculators" };

  const title = `${tool.name} – Free Trading Calculator | MyCalculators`;
  const description = `${tool.shortDescription} Browser-native calculation algorithm with formulas and live worked examples.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.mycalculator.xyz/trading/${tool.slug}`,
    },
  };
}

export default function TradingToolDetailPage({ params }: Props) {
  const tool = getTradingToolBySlug(params.slug);
  if (!tool) notFound();

  const renderActiveTool = () => {
    switch (tool.renderer) {
      case "pnl":
        return <PnLCalculatorRenderer toolSlug={tool.slug} />;
      case "position-size":
        return <PositionSizeRenderer toolSlug={tool.slug} />;
      case "brokerage":
        return <BrokerageRenderer toolSlug={tool.slug} />;
      default:
        return null;
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-navy/60">
        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
        <span>/</span>
        <Link href="/trading" className="hover:text-navy uppercase tracking-wider transition-colors">Trading</Link>
        <span>/</span>
        <span className="text-navy">{tool.name}</span>
      </nav>

      {/* Heading */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-steel">
          {tool.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">{tool.name}</h1>
        <p className="text-sm sm:text-base text-navy/75 max-w-2xl leading-relaxed">{tool.shortDescription}</p>
      </div>

      {/* Interactive Tool Component */}
      {renderActiveTool()}

      {/* Content & Formula Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        <div className="md:col-span-8 space-y-6">
          {tool.formulaDescription && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <Code2 className="w-4 h-4 text-steel" /> Calculation Formula
              </h2>
              <div className="p-3.5 bg-sage/30 rounded-xl font-mono text-xs sm:text-sm font-bold text-navy break-all border border-navy/10">
                {tool.formulaDescription}
              </div>
              {tool.formulaVariables && (
                <ul className="space-y-1 text-xs text-navy/80 pt-1">
                  {tool.formulaVariables.map((v, i) => (
                    <li key={i}>
                      <strong className="text-navy font-mono">{v.symbol}:</strong> {v.label}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {tool.workedExample && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <Calculator className="w-4 h-4 text-steel" /> Example Calculation
              </h2>
              <p className="text-xs font-semibold text-steel">{tool.workedExample.scenario}</p>
              <div className="bg-sage/20 border border-navy/10 rounded-xl p-3.5 text-xs text-navy/85">
                Outcome: <strong className="text-navy">{tool.workedExample.result}</strong>
              </div>
              <p className="text-xs text-navy/70 leading-relaxed">{tool.workedExample.explanation}</p>
            </section>
          )}

          {tool.faqs && tool.faqs.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#e89d67]" /> Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-navy/15 rounded-xl p-4 shadow-xs">
                    <h3 className="font-bold text-sm text-navy mb-1">{faq.q}</h3>
                    <p className="text-xs text-navy/75 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="md:col-span-4 space-y-4">
          <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-navy flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-steel" /> Client-Side Privacy
            </h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              All trading calculations run locally in your web browser. No trade values or quantities are stored on external servers.
            </p>
          </div>

          <div className="bg-sage/40 border border-navy/10 rounded-2xl p-4 text-xs text-navy space-y-1">
            <span className="font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Important Notice
            </span>
            <p className="text-[11px] text-navy/70 leading-relaxed">
              For mathematical planning and risk estimation only. Not trading or investment advice.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
