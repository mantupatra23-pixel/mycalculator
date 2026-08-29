import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mycalculator.xyz"),
  title: {
    default: "MyCalculators – Free Online Calculators for Everyday Life",
    template: "%s | MyCalculators",
  },
  description:
    "Fast, browser-native online calculators for Loan EMI, Income Tax, GST, SIP Mutual Funds, In-Hand Salary, Age, and Unit Conversions.",
  keywords: [
    "online calculators",
    "emi calculator",
    "sip calculator",
    "gst calculator",
    "income tax calculator fy 2026-27",
    "salary calculator in hand",
    "unit converter",
  ],
  authors: [{ name: "MyCalculators Team" }],
  creator: "MyCalculators",
  publisher: "MyCalculators",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.mycalculator.xyz",
    siteName: "MyCalculators",
    title: "MyCalculators – Free Online Calculators for Everyday Life",
    description: "Fast, private, browser-based calculation tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyCalculators – Free Online Calculators",
    description: "Fast, accurate calculation tools for finance, tax, and math.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "MyCalculators",
        url: "https://www.mycalculator.xyz",
        logo: "https://www.mycalculator.xyz/icon-512.png",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        name: "MyCalculators",
        url: "https://www.mycalculator.xyz",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.mycalculator.xyz/calculators?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fbf9f5] text-navy antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
