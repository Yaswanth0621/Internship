import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://projects.futureee.me"),
  title: {
    default: "FutureAI Projects — Final Year AI/ML Project Kits with Source Code & Documentation",
    template: "%s | FutureAI Projects",
  },
  description:
    "Explore 30+ production-ready AI, Machine Learning, Generative AI, Full-Stack, and Final-Year engineering project kits. Complete with working source code, IEEE documentation reports, PPT presentations, and architecture diagrams.",
  keywords: [
    "final year AI projects",
    "machine learning project kits with code",
    "BTech CSE final year projects",
    "Generative AI projects for engineering students",
    "RAG assistant project source code",
    "Python AI projects with documentation",
    "IEEE format project reports",
    "Computer vision projects YOLO",
    "Cybersecurity project kits",
    "FutureAI Projects",
    "engineering capstone projects",
  ],
  authors: [{ name: "FutureAI", url: "https://futureee.me" }],
  creator: "FutureAI",
  publisher: "FutureAI",
  category: "Educational Technology",
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
    title: "FutureAI Projects — Final Year AI Project Kits with Source Code",
    description: "Production-ready project kits for students and developers with full source code, IEEE reports, and setup guides.",
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
  alternates: {
    canonical: "https://projects.futureee.me",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://projects.futureee.me/#website",
        url: "https://projects.futureee.me",
        name: "FutureAI Projects Marketplace",
        description: "Production-grade project kits for engineering students with complete source code and IEEE reports.",
        publisher: {
          "@type": "EducationalOrganization",
          name: "FutureAI",
          url: "https://futureee.me",
          logo: "https://futureee.me/favicon.svg",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://projects.futureee.me/projects?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://projects.futureee.me/#organization",
        name: "FutureAI Projects",
        url: "https://projects.futureee.me",
        logo: "https://projects.futureee.me/favicon.svg",
        parentOrganization: {
          "@type": "EducationalOrganization",
          name: "FutureAI",
          url: "https://futureee.me",
        },
      },
      {
        "@type": "Product",
        name: "FutureAI Engineering Project Kits",
        description: "Complete final year project kits with Python/React source code, IEEE format documentation report, PPT presentation, and architecture diagram.",
        brand: {
          "@type": "Brand",
          name: "FutureAI",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: "1499",
          highPrice: "2999",
          offerCount: "30",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "420",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is included in each FutureAI project kit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every project kit includes 100% complete working source code, step-by-step installation guides, environment setup files, IEEE format project documentation report (PDF & Word), PowerPoint presentation for college viva, and architecture diagrams.",
            },
          },
          {
            "@type": "Question",
            name: "Are these projects suitable for college final year submissions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all project kits are specifically structured according to university criteria and IEEE research paper standards for B.Tech, M.Tech, BCA, MCA, and Polytechnic final year project evaluations.",
            },
          },
          {
            "@type": "Question",
            name: "How do I access and download my project files?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "After instant checkout via Razorpay, your project entitlement is immediately unlocked on your FutureAI Student Dashboard where you can download the complete ZIP package anytime.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://projects.futureee.me" />
        <meta name="theme-color" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter antialiased bg-background text-foreground">
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

