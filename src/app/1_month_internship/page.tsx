import type { Metadata } from "next";
import SummerInternshipPage from "./1MonthClient";

export const metadata: Metadata = {
  title: "Elite 1-Month Summer Internship in AI & ML | FutureAI",
  description:
    "Accelerate your career with India's elite 1-month online AI & Machine Learning Summer Internship. Deep-dive into PyTorch, CNNs, Transformers, LLMs, and MLOps. Get certified and earn an optional signed LOR.",
  alternates: {
    canonical: "https://futureee.me/1_month_internship/",
  },
  keywords: [
    "AI summer internship",
    "free machine learning internship 2026",
    "online summer internship college students",
    "Python AI certification",
    "Letter of Recommendation ML",
    "FutureAI Summer Program"
  ],
  openGraph: {
    title: "Elite 1-Month Summer Internship in AI & ML | FutureAI",
    description: "Accelerate your career with India's elite 1-month online AI & Machine Learning Summer Cohort. Deep-dive into PyTorch, CNNs, Transformers, LLMs, and MLOps. Get certified and earn an optional LOR.",
    url: "https://futureee.me/1_month_internship/",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FutureAI Elite 1-Month Summer Cohort - AI & Machine Learning",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite 1-Month Summer Internship in AI & ML | FutureAI",
    description: "Deep-dive into PyTorch, CNNs, Transformers, LLMs, and MLOps. Get certified and earn an optional corporate LOR.",
    images: ["/og-image.png"],
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": "https://futureee.me/1_month_internship/#course",
        "name": "Elite 1-Month Summer Internship in AI & ML",
        "description": "Accelerate your career with India's elite 1-month online AI & Machine Learning Summer Cohort. Deep-dive into PyTorch, CNNs, Transformers, LLMs, and MLOps.",
        "provider": {
          "@type": "Organization",
          "name": "FutureAI",
          "sameAs": "https://futureee.me"
        },
        "courseCode": "FAI-AI-ML-SUMMER-2026",
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "Online",
          "duration": "P30D",
          "courseWorkload": "PT80H",
          "instructor": {
            "@type": "Person",
            "name": "FutureAI Directorate"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://futureee.me/1_month_internship/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the 1-Month Summer Internship track differ from the 7-day program?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 1-Month Summer Internship is a comprehensive, deep-dive academic and professional program. It spreads the curriculum over 4 weeks, master complex mathematical proofs, and builds 3 highly advanced projects plus a final production-grade Capstone."
            }
          },
          {
            "@type": "Question",
            "name": "How are certificates and documents published?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Both your official Verified Certificate and signed Letter of Recommendation (LOR) are generated and unlocked instantly for PDF download upon module completion and verification."
            }
          },
          {
            "@type": "Question",
            "name": "How does the optional Letter of Recommendation (LOR) add-on work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "During checkout, you can optionally pay an extra ₹110 to receive both your verified Certificate of Completion and a customized, highly professional Letter of Recommendation signed by our lead Directorate, verifying your specific contributions."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://futureee.me/1_month_internship/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://futureee.me/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "1-Month Summer Internship",
            "item": "https://futureee.me/1_month_internship/"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SummerInternshipPage />
    </>
  );
}
