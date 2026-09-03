export const dynamic = 'force-dynamic';
export const revalidate = 0;
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTradingTools, getTradingToolBySlug } from "@/lib/trading/registry";
import { PnLCalculatorRenderer } from "@/components/trading/renderers/PnLCalculatorRenderer";
import { RiskCalculatorRenderer } from "@/components/trading/renderers/RiskCalculatorRenderer";
import { BrokerageCalculatorRenderer } from "@/components/trading/renderers/BrokerageCalculatorRenderer";
import { OptionsMechanicsRenderer } from "@/components/trading/renderers/OptionsMechanicsRenderer";
import { OptionsStrategyRenderer } from "@/components/trading/renderers/OptionsStrategyRenderer";
import { FuturesRenderer } from "@/components/trading/renderers/FuturesRenderer";
import { ForexCryptoRenderer } from "@/components/trading/renderers/ForexCryptoRenderer";
import { AdvancedTradeRenderer } from "@/components/trading/renderers/AdvancedTradeRenderer";
import { BookOpen, Calculator, ShieldAlert, Code2, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";

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
  const description = `${tool.shortDescription} Free, browser-native mathematical calculations with step-by-step formulas, related tools, and live worked examples.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.mycalculator.xyz/trading/${tool.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.mycalculator.xyz/trading/${tool.slug}`,
      siteName: "MyCalculators Trading Suite",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function TradingToolDetailPage({ params }: Props) {
  const tool = getTradingToolBySlug(params.slug);
  if (!tool) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        applicationCategory: "FinanceApplication",
        operatingSystem: "All",
        url: `https://www.mycalculator.xyz/trading/${tool.slug}`,
        description: tool.shortDescription,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mycalculator.xyz" },
          { "@type": "ListItem", position: 2, name: "Trading", item: "https://www.mycalculator.xyz/trading" },
          { "@type": "ListItem", position: 3, name: tool.name, item: `https://www.mycalculator.xyz/trading/${tool.slug}` },
        ],
      },
    ],
  };

  const renderActiveTool = () => {
    switch (tool.renderer) {
      case "pnl":
        return <PnLCalculatorRenderer toolSlug={tool.slug} />;
      case "risk":
        return <RiskCalculatorRenderer toolSlug={tool.slug} />;
      case "brokerage":
        return <BrokerageCalculatorRenderer toolSlug={tool.slug} />;
      case "options-mechanics":
        return <OptionsMechanicsRenderer toolSlug={tool.slug} />;
      case "options-strategy":
        return <OptionsStrategyRenderer toolSlug={tool.slug} />;
      case "futures":
        return <FuturesRenderer toolSlug={tool.slug} />;
      case "forex":
      case "crypto":
        return <ForexCryptoRenderer toolSlug={tool.slug} />;
      case "advanced-trade":
        return <AdvancedTradeRenderer toolSlug={tool.slug} />;
      default:
        return null;
    }
  };

  // Robust Related Tools Resolver: ensures at least 4 related tools are always shown
  const allTools = getAllTradingTools();
  let relatedTools = (tool.relatedTradingSlugs || [])
    .map((s) => allTools.find((t) => t.slug === s))
    .filter((t): t is typeof tool => t !== undefined);

  if (relatedTools.length < 4) {
    const sameCategory = allTools.filter((t) => t.slug !== tool.slug && t.category === tool.category);
    const otherTools = allTools.filter((t) => t.slug !== tool.slug && !relatedTools.some((r) => r.slug === t.slug));
    relatedTools = [...relatedTools, ...sameCategory, ...otherTools].slice(0, 4);
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          {/* Step-by-Step How it Works */}
          <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> How the Calculation Works
            </h2>
            <div className="space-y-2 text-xs text-navy/80 leading-relaxed">
              <div className="p-3 bg-sage/20 rounded-xl border border-navy/10 space-y-1">
                <span className="font-bold text-navy block">Step 1: Input Valuation</span>
                <p>Read parameters and compute total exposure: multiply order quantity by contract unit multiplier.</p>
              </div>
              <div className="p-3 bg-sage/20 rounded-xl border border-navy/10 space-y-1">
                <span className="font-bold text-navy block">Step 2: Payoff &amp; Boundary Evaluation</span>
                <p>Evaluate terminal return at the selected target price using strict financial mathematical boundary logic.</p>
              </div>
              <div className="p-3 bg-sage/20 rounded-xl border border-navy/10 space-y-1">
                <span className="font-bold text-navy block">Step 3: Frictional &amp; Premium Netting</span>
                <p>Deduct upfront capital commitments, taxes, or net debits to produce final net profit or loss realization.</p>
              </div>
            </div>
          </section>

          {/* Mathematical Formula */}
          {tool.formulaDescription && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <Code2 className="w-4 h-4 text-steel" /> Calculation Formula
              </h2>
              <div className="p-3.5 bg-sage/30 rounded-xl font-mono text-xs sm:text-sm font-bold text-navy break-all border border-navy/10">
                {tool.formulaDescription}
              </div>
              {tool.formulaVariables && tool.formulaVariables.length > 0 && (
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

          {/* Worked Example */}
          {tool.workedExample && (
            <section className="bg-white border border-navy/15 rounded-2xl p-6 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <Calculator className="w-4 h-4 text-steel" /> Example Calculation
              </h2>
              <p className="text-xs font-semibold text-steel">{tool.workedExample.scenario}</p>
              <div className="bg-sage/20 border border-navy/10 rounded-xl p-3.5 text-xs text-navy/85 space-y-1.5">
                Outcome: <strong className="text-navy">{tool.workedExample.result}</strong>
                <p className="text-[11px] text-navy/70 leading-relaxed">{tool.workedExample.explanation}</p>
              </div>
            </section>
          )}

          {/* Assumptions */}
          {tool.assumptions && tool.assumptions.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy">Assumptions &amp; Parameters</h2>
              <ul className="list-disc pl-5 text-xs text-navy/80 space-y-1">
                {tool.assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Comprehensive FAQs Section */}
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

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-4">
          {/* Related Tools Widget (Guaranteed Visible) */}
          <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-navy">Related Trading Tools</h3>
            <div className="space-y-2">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/trading/${rel.slug}`}
                  className="block p-2.5 rounded-xl bg-sage/20 hover:bg-cream border border-navy/10 transition-colors group"
                >
                  <div className="font-bold text-xs text-navy group-hover:text-steel flex items-center justify-between">
                    <span>{rel.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-navy/40 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Client-side privacy statement */}
          <div className="bg-white border border-navy/15 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-navy flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-steel" /> Client-Side Calculation
            </h3>
            <p className="text-xs text-navy/70 leading-relaxed">
              Calculations run locally in your browser. Values entered into this calculator are not transmitted to our servers for the calculation.
            </p>
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-sage/40 border border-navy/10 rounded-2xl p-4 text-xs text-navy space-y-1">
            <span className="font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Educational Disclaimer
            </span>
            <p className="text-[11px] text-navy/70 leading-relaxed">
              Educational calculator only. Results are mathematical estimates based on your inputs and do not constitute investment advice, trading signals, or a guarantee of returns. Actual charges, slippage, liquidity, margin requirements and execution prices may differ.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
