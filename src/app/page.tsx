import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "FutureAI | #1 Free AI & ML Internship Online India 2026",
  description:
    "Join India's top-rated free AI & Machine Learning internship. 7-day program with Python, Deep Learning, and NLP. Get a verified certificate for just ₹100. Join 10,000+ students from IITs and NITs.",
  alternates: {
    canonical: "https://futureee.me/",
  },
  keywords: ["AI internship", "free ML internship", "online internship India", "AI certificate online", "FutureAI"],
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "7-Day Intensive AI & Machine Learning Internship",
    "description": "Learn Python, Neural Networks, Generative AI, and MLOps in this intensive 7-day program.",
    "provider": {
      "@type": "Organization",
      "name": "FutureAI",
      "sameAs": "https://futureee.me"
    },
    "courseCode": "FAI-AI-ML-2026",
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "name": "June 2026 Cohort",
        "courseMode": "Online",
        "courseWorkload": "PT20H",
        "startDate": "2026-06-01",
        "endDate": "2026-06-30",
        "offers": {
          "@type": "Offer",
          "category": "Free",
          "price": "0",
          "priceCurrency": "INR"
        },
        "instructor": {
          "@type": "Person",
          "name": "FutureAI Team"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <LandingPage />
    </main>
  );
}

