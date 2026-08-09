import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "weblirev | Izrada profesionalnih web stranica",
  description:
    "Moderni, brzi i responzivni web sajtovi prilagođeni vašem brendu. Od 1000€ godišnje ili po dogovoru.",
  keywords: [
    "web stranice",
    "izrada web stranica",
    "web dizajn",
    "web development",
    "weblirev",
  ],
  openGraph: {
    title: "weblirev | Izrada profesionalnih web stranica",
    description:
      "Moderni, brzi i responzivni web sajtovi prilagođeni vašem brendu.",
    url: "https://weblirev.com",
    siteName: "weblirev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
