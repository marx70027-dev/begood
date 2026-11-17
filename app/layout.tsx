import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "weblirev — Web Development Studio",
  description:
    "We design and engineer modern websites that drive growth. Premium web development from 1000€/year.",
  keywords: [
    "web development",
    "website design",
    "web design",
    "weblirev",
    "professional websites",
  ],
  openGraph: {
    title: "weblirev — Web Development Studio",
    description:
      "We design and engineer modern websites that drive growth.",
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
    <html lang="en" className={`${jakarta.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-jakarta)]">
        {children}
      </body>
    </html>
  );
}
