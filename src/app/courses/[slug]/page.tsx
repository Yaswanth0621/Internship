import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import CourseDetailClient from "./CourseDetailClient";
import { trendingCourses, getCourseBySlug } from "@/data/trendingCourses";

interface Props {
  params: Promise<{ slug: string }>;
}

// ── SSG: pre-render all 7 course pages at build time ──
export async function generateStaticParams() {
  return trendingCourses.map((c) => ({ slug: c.slug }));
}

// ── Per-course SEO metadata ──
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found | FutureAI" };

  const discountPct = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  const url = `https://futureee.me/courses/${course.slug}/`;

  const keywordsMap: Record<string, string[]> = {
    "ai-engineering-generative-ai": [
      "AI engineering course India 2026", "generative AI masterclass online",
      "LLM development course", "RAG systems tutorial", "AI agents course India",
      "ChatGPT API course", "OpenAI engineering course", "AI SaaS development",
    ],
    "ai-agents-automation": [
      "AI agents course online India", "n8n workflow automation masterclass",
      "AI automation agency course", "MCP model context protocol tutorial",
      "business process automation AI", "n8n tutorial India", "agentic AI course",
    ],
    "full-stack-web-development": [
      "full stack web development course India 2026", "Next.js 15 course",
      "React TypeScript masterclass", "MERN stack course online",
      "full stack developer certification India", "Node.js Supabase course",
      "web development course ₹149",
    ],
    "data-science-machine-learning": [
      "data science course India 2026", "machine learning masterclass online",
      "Python data science certification", "scikit-learn pandas course",
      "MLOps course India", "data scientist course ₹119", "ML engineering tutorial",
    ],
    "cloud-devops-cybersecurity": [
      "cloud computing course India 2026", "DevOps certification online",
      "AWS certification preparation", "Kubernetes Docker course",
      "cybersecurity course India", "DevOps engineer course ₹129",
      "Terraform infrastructure course", "SRE monitoring course",
    ],
    "python-dsa-leetcode-placement": [
      "DSA course India 2026", "LeetCode course online",
      "Python data structures algorithms", "FAANG interview preparation India",
      "competitive programming course", "placement preparation DSA",
      "coding interview masterclass ₹99",
    ],
    "data-analytics-powerbi-sql": [
      "Power BI course India 2026", "SQL analytics masterclass",
      "business intelligence course online", "data analyst certification India",
      "DAX Power BI tutorial", "data analytics course ₹119",
      "Excel to Power BI course", "BI analyst certification",
    ],
  };

  const keywords = keywordsMap[course.slug] ?? [
    course.title, `${course.category} course India`,
    "FutureAI courses", "online course certification India",
  ];

  return {
    title: `${course.title} (2026) — ${discountPct}% OFF | FutureAI`,
    description: `${course.tagline} ${course.modules.length}-module professional masterclass for ${course.level} learners. Module 1 FREE. Enroll for just ₹${course.price} (was ₹${course.originalPrice}). ${course.enrolledCount.toLocaleString()}+ students enrolled. Verified certificate + PDF manual included.`,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${course.title} — ${discountPct}% OFF Only ₹${course.price} | FutureAI`,
      description: `${course.tagline} Professional ${course.modules.length}-module course. ${course.enrolledCount.toLocaleString()}+ students. Module 1 FREE — no card needed!`,
      url,
      type: "website",
      siteName: "FutureAI",
      locale: "en_IN",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${course.title} | FutureAI` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} — ₹${course.price} Only | FutureAI`,
      description: `${course.tagline} Module 1 FREE. ${course.enrolledCount.toLocaleString()}+ students enrolled. Verified certificate included.`,
      images: ["/og-image.png"],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const url = `https://futureee.me/courses/${course.slug}/`;
  const discountPct = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // ── 1. Course Schema ──
      {
        "@type": "Course",
        "@id": `${url}#course`,
        "name": course.title,
        "description": course.description,
        "url": url,
        "courseCode": `FAI-${course.id.toUpperCase()}-2026`,
        "educationalLevel": course.level,
        "inLanguage": "en-IN",
        "provider": {
          "@type": "Organization",
          "name": "FutureAI",
          "@id": "https://futureee.me/#organization",
          "sameAs": "https://futureee.me",
        },
        "offers": {
          "@type": "Offer",
          "url": url,
          "priceCurrency": "INR",
          "price": course.price.toString(),
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01",
          "description": `${discountPct}% off. Was ₹${course.originalPrice}, now ₹${course.price}. Lifetime access.`,
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": course.rating.toString(),
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": course.enrolledCount.toString(),
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "duration": `P${parseInt(course.duration)}W`,
          "courseWorkload": "PT12H",
          "instructor": {
            "@type": "Person",
            "name": "FutureAI Expert Faculty",
          },
        },
        "numberOfCredits": course.modules.length,
        "hasPart": course.modules.map((m) => ({
          "@type": "CourseSection",
          "name": m.title,
          "description": m.subtitle,
          "timeRequired": m.estimatedHours,
        })),
      },
      // ── 2. Product Schema (for rich snippets with price) ──
      {
        "@type": "Product",
        "@id": `${url}#product`,
        "name": course.title,
        "description": course.description,
        "image": "https://futureee.me/og-image.png",
        "brand": { "@type": "Brand", "name": "FutureAI" },
        "offers": {
          "@type": "Offer",
          "url": url,
          "priceCurrency": "INR",
          "price": course.price.toString(),
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "FutureAI" },
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": course.rating.toString(),
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": course.enrolledCount.toString(),
        },
      },
      // ── 3. BreadcrumbList ──
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://futureee.me/" },
          { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://futureee.me/courses/" },
          { "@type": "ListItem", "position": 3, "name": course.title, "item": url },
        ],
      },
      // ── 4. FAQPage Schema ──
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Is the first module of ${course.title} really free?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, Module 1 is 100% free with no credit card required. You get full access to all lessons, code labs, and the capstone mini-project in Module 1. Modules 2–7 are unlocked with a one-time payment of ₹${course.price}.`,
            },
          },
          {
            "@type": "Question",
            "name": `Who is the ${course.title} designed for?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `This course is designed for ${course.level} learners interested in ${course.category}. It provides ${course.modules.length} professional modules progressing from foundations to advanced production systems.`,
            },
          },
          {
            "@type": "Question",
            "name": "What is the total cost of this course?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The full course costs ₹${course.price} (one-time payment), which is ${discountPct}% off the original price of ₹${course.originalPrice}. This is a lifetime access purchase — no subscriptions or hidden fees. Module 1 is completely free to preview.`,
            },
          },
          {
            "@type": "Question",
            "name": "Will I get a verified certificate after completing this course?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes. Upon completing all ${course.modules.length} modules and submitting your capstone project, you receive a verified FutureAI Certificate of Completion. You will also receive an official PDF course manual covering all ${course.modules.length} modules.`,
            },
          },
        ],
      },
      // ── 5. ItemList (Curriculum modules) ──
      {
        "@type": "ItemList",
        "@id": `${url}#curriculum`,
        "name": `${course.title} — Course Curriculum`,
        "numberOfItems": course.modules.length,
        "itemListElement": course.modules.map((m, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": m.title,
          "description": m.subtitle,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <CourseDetailClient course={course} />
    </>
  );
}
