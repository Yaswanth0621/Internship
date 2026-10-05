import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "FutureAI Projects — Build Real Projects. Learn Real Skills.",
    template: "%s | FutureAI Projects",
  },
  description:
    "Explore AI, Machine Learning, Full-Stack, Data Science, Cybersecurity, Cloud, and Final-Year project kits with complete source code, documentation, demos, and learning resources.",
  keywords: [
    "AI projects",
    "machine learning projects",
    "final year projects",
    "Python projects",
    "React projects",
    "full stack projects",
    "data science projects",
    "computer vision projects",
    "cybersecurity projects",
    "FutureAI",
  ],
  authors: [{ name: "FutureAI", url: "https://futureee.me" }],
  creator: "FutureAI",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://projects.futureee.me",
    siteName: "FutureAI Projects",
    title: "FutureAI Projects — Build Real Projects. Learn Real Skills.",
    description:
      "Production-ready project kits for students, developers, and aspiring professionals. Complete source code, documentation, demos, and more.",
    images: [
      {
        url: "https://projects.futureee.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "FutureAI Projects Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FutureAI Projects — Build Real Projects. Learn Real Skills.",
    description: "Production-ready project kits for students and developers.",
    images: ["https://projects.futureee.me/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://projects.futureee.me" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="font-inter antialiased bg-background text-foreground">
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
