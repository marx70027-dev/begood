import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebliRev - Izrada web stranica Hrvatska | Web Design Croatia | Flat 1000€ za bilo koji web",
  description:
    "Izrada web stranica za cijelu Hrvatsku za flat 1000€. Bilo koji grad - Zagreb, Split, Rijeka, Osijek, Zadar, Pula. One flat price 1000€ for any website in Croatia.",
  alternates: {
    canonical: "https://weblirev.com/",
    languages: {
      hr: "https://weblirev.com/",
      en: "https://weblirev.com/",
      "x-default": "https://weblirev.com/",
    },
  },
  robots: "index, follow",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "WebliRev",
  alternateName: "WebliRev Croatia Web Design",
  url: "https://weblirev.com",
  description:
    "Izrada web stranica za cijelu Hrvatsku - Zagreb, Split, Rijeka, Osijek, Zadar, Dubrovnik, Pula, Šibenik. Flat cijena 1000€ za bilo koji web. Web design agency for whole Croatia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zagreb",
    addressRegion: "Hrvatska",
    addressCountry: "HR",
  },
  areaServed: [
    { "@type": "Country", name: "Croatia" },
    { "@type": "City", name: "Zagreb" },
    { "@type": "City", name: "Split" },
    { "@type": "City", name: "Rijeka" },
    { "@type": "City", name: "Osijek" },
    { "@type": "City", name: "Zadar" },
    { "@type": "City", name: "Pula" },
    { "@type": "City", name: "Dubrovnik" },
    { "@type": "City", name: "Šibenik" },
  ],
  priceRange: "1000€",
  inLanguage: ["hr", "en"],
  offers: {
    "@type": "Offer",
    name: "Izrada bilo koje web stranice u Hrvatskoj / Any Website in Croatia - Flat 1000€",
    price: "1000",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    description:
      "Flat 1000€ for any website anywhere in Croatia - Zagreb, Split, Rijeka, Osijek, Zadar, Pula, Dubrovnik. Bilo koji web, bilo gdje u HR za 1000€",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
