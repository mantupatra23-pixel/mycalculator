import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyCalculators - Smart Calculators for Everyday Life",
  description: "Free fast, accurate, and easy-to-use calculators for India & global users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-navy min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
