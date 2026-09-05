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
  title: "WebliRev - Izrada web stranica Zagreb | Flat 1000€ za bilo koji web",
  description:
    "Jedna cijena za sve: 1000€. WebliRev iz Zagreba radi male i ogromne web stranice za istu cijenu. Brzo, moderno, SEO optimizirano.",
  alternates: {
    canonical: "https://weblirev.com/",
  },
  robots: "index, follow",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "WebliRev",
  url: "https://weblirev.com",
  logo: "https://weblirev.com/logo.png",
  description:
    "Agencija za izradu web stranica u Zagrebu. Flat cijena 1000 eura za bilo koju velicinu weba - od one-page do ogromnog web shopa.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zagreb",
    addressCountry: "HR",
  },
  areaServed: "Zagreb",
  priceRange: "1000€",
  offers: {
    "@type": "Offer",
    name: "Izrada bilo koje web stranice",
    price: "1000",
    priceCurrency: "EUR",
    description: "Flat cijena, nebitno mala ili ogromna stranica, sve ukljuceno",
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
