import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = {
  className: "font-sans",
  variable: "--font-inter",
};

const siteUrl = "https://futureee.me";

export const viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FutureAI Internship | Free AI/ML Internship with Certificate India 2026",
    template: "%s | FutureAI Internship",
  },
  description:
    "Apply for FutureAI — India's #1 free online AI & Machine Learning internship for students. Get a verified certificate in 7 days or join our 1-Month Summer Cohort. Hands-on projects in Python, Deep Learning, NLP & more. Only ₹100 for certificate.",
  keywords: [
    "AI internship India",
    "free AI internship 2026",
    "machine learning internship for students",
    "online internship with certificate",
    "artificial intelligence internship",
    "deep learning internship",
    "Python internship online",
    "NLP internship",
    "data science internship India",
    "free online internship certificate",
    "AI ML internship certificate",
    "internship for college students India",
    "virtual internship AI",
    "FutureAI internship",
    "1 week internship certificate",
    "1 month summer internship AI",
    "remote internship India 2026",
    "AI certification India",
    "machine learning certificate India",
    "free internship with certificate India",
    "internship certificate download",
  ],
  authors: [{ name: "FutureAI Internships", url: siteUrl }],
  creator: "FutureAI Internships",
  publisher: "FutureAI Internships",
  category: "Education",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl + "/",
    siteName: "FutureAI Internship",
    title: "FutureAI | Free AI/ML Internship with Verified Certificate India",
    description:
      "Join India's most popular free AI/ML internship. 7-day intensive or 1-Month Summer Cohort, hands-on projects, and verified certification for ₹100. Apply now and boost your career!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FutureAI Internship - Free AI/ML Internship with Certificate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FutureAI | Free AI/ML Internship with Verified Certificate India",
    description:
      "7-day intensive or 1-Month Summer Cohort AI program for engineering students. Verified certificate for ₹100. Join 10,000+ students.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl + "/",
  },
  verification: {
    google: "sPbQWQbK3InJq5W3c8XVoE2vooNSlHkBrFOKxRsg32g",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "EducationalOrganization",
                  "@id": `${siteUrl}/#organization`,
                  name: "FutureAI Internships",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/favicon.ico`,
                  },
                  description:
                    "India's leading free online AI & Machine Learning internship platform for students.",
                  sameAs: [],
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${siteUrl}/#localbusiness`,
                  name: "FutureAI Internships",
                  image: `${siteUrl}/og-image.png`,
                  url: siteUrl,
                  telephone: "",
                  address: {
                    "@type": "PostalAddress",
                    "streetAddress": "Online Platform",
                    "addressLocality": "Hyderabad",
                    "addressRegion": "Telangana",
                    "postalCode": "500001",
                    "addressCountry": "IN"
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    "latitude": 17.3850,
                    "longitude": 78.4867
                  },
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday"
                    ],
                    "opens": "00:00",
                    "closes": "23:59"
                  }
                },
                {
                  "@type": "Product",
                  "name": "FutureAI Machine Learning Internship",
                  "image": `${siteUrl}/og-image.png`,
                  "description": "Intensive AI/ML internship with verified certificate for students.",
                  "brand": {
                    "@type": "Brand",
                    "name": "FutureAI"
                  },
                  "offers": {
                    "@type": "Offer",
                    "url": siteUrl,
                    "priceCurrency": "INR",
                    "price": "100.00",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@type": "Organization",
                      "name": "FutureAI"
                    }
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "10240"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Is FutureAI internship free?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, the learning curriculum and projects are 100% free. We only charge a small fee of ₹100 for the industry-verified certificate issuance and maintenance."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Who can apply for this AI internship?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Any student or professional interested in AI and Machine Learning can apply. It is especially designed for engineering and degree students in India."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How long is the internship program?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We offer a 7-day intensive micro-internship as well as a comprehensive 1-Month Summer Internship track."
                      }
                    }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl + "/",
                  name: "FutureAI Internship",
                  alternateName: ["FutureAI", "Futureee AI", "FutureAI Internship Portal", "futureee.me"],
                  publisher: { "@id": `${siteUrl}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${siteUrl}/?s={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Course",
                  "@id": `${siteUrl}/#course`,
                  name: "AI & Machine Learning Internship Programs",
                  description:
                    "Intensive hands-on online internship tracks covering Python, Machine Learning, Deep Learning, NLP, Computer Vision, and MLOps. Earn a verified certificate upon completion.",
                  provider: { "@id": `${siteUrl}/#organization` },
                  url: siteUrl,
                  courseMode: "online",
                  educationalLevel: "Undergraduate",
                  inLanguage: "en-IN",
                  offers: {
                    "@type": "Offer",
                    price: "100",
                    priceCurrency: "INR",
                    availability: "https://schema.org/InStock",
                    validFrom: "2026-01-01",
                    description: "Certificate fee. The internship itself is free.",
                  },
                  hasCourseInstance: {
                    "@type": "CourseInstance",
                    courseMode: "online",
                    duration: "P30D",
                    instructor: {
                      "@type": "Person",
                      name: "FutureAI Faculty",
                    },
                  },
                },
              ],
            }),
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
