import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "weblirev | Professional Web Development",
  description:
    "Modern, fast, and responsive websites tailored to your brand. From 1000€/year or custom pricing.",
  keywords: [
    "web development",
    "website design",
    "web design",
    "weblirev",
    "professional websites",
  ],
  openGraph: {
    title: "weblirev | Professional Web Development",
    description:
      "Modern, fast, and responsive websites tailored to your brand.",
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
    <html lang="en" className={`${inter.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
