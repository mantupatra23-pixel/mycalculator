import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mycalculators.xyz"),
  title: "Free Online Calculators - Finance, Math, GST, EMI & More | MyCalculators",
  description: "Use free online calculators for EMI, GST, SIP, salary, percentage, age, interest, conversions and more. Fast, simple and mobile-friendly calculators.",
  manifest: "/manifest.json",
  themeColor: "#e4a576",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-navy min-h-screen flex flex-col antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
