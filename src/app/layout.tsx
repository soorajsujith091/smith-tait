import React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smithtait.com"),
  title: {
    default: "Smith Tait — Architectural Lighting Design Studio",
    template: "%s | Smith Tait",
  },
  description:
    "Smith Tait is a premium architectural lighting design studio with a modernist legacy since 1933. Specialising in hospitality, residential, facade, landscape, public realm and mixed-use lighting projects across the MENA region.",
  keywords: [
    "architectural lighting design",
    "lighting design consultants",
    "MENA lighting design",
    "hospitality lighting",
    "facade lighting",
    "landscape lighting",
    "Smith Tait",
    "Dubai lighting design",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Smith Tait",
    title: "Smith Tait — Architectural Lighting Design Studio",
    description:
      "Premium architectural lighting design studio with a modernist legacy since 1933.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smith Tait — Architectural Lighting Design Studio",
    description:
      "Premium architectural lighting design studio with a modernist legacy since 1933.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Smith Tait",
              url: "https://www.smithtait.com",
              description:
                "Premium architectural lighting design studio with a modernist legacy since 1933.",
              foundingDate: "1933",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
              sameAs: [
                "https://www.linkedin.com/company/smith-tait/",
                "https://www.instagram.com/smith_tait_uae/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
