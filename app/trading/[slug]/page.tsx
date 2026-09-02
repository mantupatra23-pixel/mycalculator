import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTradingTools, getTradingToolBySlug } from "@/lib/trading/registry";
import { PnLCalculatorRenderer } from "@/components/trading/renderers/PnLCalculatorRenderer";
import { PositionSizeRenderer } from "@/components/trading/renderers/PositionSizeRenderer";
import { BrokerageRenderer } from "@/components/trading/renderers/BrokerageRenderer";
import { BookOpen, Calculator, ShieldAlert, ArrowLeft, Code2, HelpCircle } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllTradingTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getTradingToolBySlug(params.slug);
  if (!tool) return { title: "Trading Tool Not Found | MyCalculators" };

  const title = `${tool.name} – Trading Calculator | MyCalculators`;
  const description = `${tool.shortDescription} Free, zero-latency trading algorithm with step-by-step mathematical breakdowns.`;

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
      case "position-size":
        return <PositionSizeRenderer toolSlug={tool.slug} />;
      case "brokerage":
        return <BrokerageRenderer toolSlug={tool.slug} />;
      default:
        return (
          <div className="bg-[#0b1222] border border-[#1e293b] rounded-3xl p-8 text-center text-slate-400">
            Engine module scheduled for upcoming phase rollout.
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#050b14] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/trading" className="hover:text-[#00f59b] transition-colors">Trading</Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold">{tool.name}</span>
        </nav>

        {/* Heading & Meta */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link
              href="/trading"
              className="p-1.5 rounded-lg border border-[#1e293b] text-slate-400 hover:text-white hover:bg-[#0b1222] transition-all inline-flex sm:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#00f59b] bg-[#00f59b]/10 px-2.5 py-0.5 rounded-md">
              {tool.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{tool.name}</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">{tool.shortDescription}</p>
        </div>

        {/* Primary Interactive Engine Component */}
        {renderActiveTool()}

        {/* Content, Formula, Assumptions, & Safety Disclosures */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-[#1e293b]">
          <div className="md:col-span-8 space-y-6">
            {/* Mathematical Formula */}
            {tool.formulaDescription && (
              <section className="bg-[#0b1222] border border-[#1e293b] rounded-2xl p-5 space-y-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#00f59b]" /> Mathematical Formulation
                </h2>
                <div className="p-3 bg-[#0f172a] rounded-xl font-mono text-xs text-[#00f59b] border border-[#1e293b]">
                  {tool.formulaDescription}
                </div>
                {tool.formulaVariables && (
                  <ul className="space-y-1 text-xs text-slate-400 pt-1">
                    {tool.formulaVariables.map((v, i) => (
                      <li key={i}>
                        <strong className="text-slate-200 font-mono">{v.symbol}:</strong> {v.label}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* Worked Example */}
            {tool.workedExample && (
              <section className="bg-[#0b1222] border border-[#1e293b] rounded-2xl p-5 space-y-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#00d8f6]" /> Worked Mathematical Example
                </h2>
                <p className="text-xs text-slate-400">{tool.workedExample.scenario}</p>
                <div className="bg-[#0f172a] p-3 rounded-xl border border-[#1e293b] text-xs font-semibold text-slate-200">
                  {tool.workedExample.result}
                </div>
                <p className="text-[11px] text-slate-400">{tool.workedExample.explanation}</p>
              </section>
            )}

            {/* FAQs */}
            {tool.faqs && tool.faqs.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-400" /> Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                  {tool.faqs.map((faq, i) => (
                    <div key={i} className="bg-[#0b1222] border border-[#1e293b] rounded-xl p-4">
                      <h3 className="text-xs font-bold text-slate-200 mb-1">{faq.q}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Guidelines */}
          <aside className="md:col-span-4 space-y-4">
            <div className="bg-[#0b1222] border border-[#1e293b] rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#00f59b]" /> Risk Parameters
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculations execute locally inside your browser runtime. No financial data, account numbers, or portfolio metrics are saved or transmitted to remote cloud databases.
              </p>
            </div>

            <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-300/80 space-y-1">
              <span className="font-bold flex items-center gap-1 text-amber-300">
                <ShieldAlert className="w-3.5 h-3.5" /> No Advisory Guarantee
              </span>
              <p className="text-[11px] text-amber-200/60 leading-relaxed">
                Calculations are mathematical estimations for self-directed traders. Always confirm order parameters with your registered broker.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
