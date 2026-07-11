import type { Metadata } from "next";
import { Outfit, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scout — Your Coding Profile. Reimagined.",
    template: "%s | Scout",
  },
  description:
    "Transform your public coding profile into a premium collectible developer card worth sharing on LinkedIn, X, and Instagram.",
  keywords: [
    "developer card",
    "LeetCode",
    "coding profile",
    "developer identity",
    "collectible card",
    "Scout",
  ],
  authors: [{ name: "Scout" }],
  creator: "Scout",
  openGraph: {
    title: "Scout — Your Coding Profile. Reimagined.",
    description:
      "Transform your public LeetCode profile into a premium collectible developer card.",
    url: "https://scoutcard.dev",
    siteName: "Scout",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scout — Your Coding Profile. Reimagined.",
    description:
      "Transform your public LeetCode profile into a premium collectible developer card.",
    creator: "@scoutcard",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${outfit.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-outfit)]">
        {children}
      </body>
    </html>
  );
}
