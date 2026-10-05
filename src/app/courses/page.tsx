import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { trendingCourses } from "@/data/trendingCourses";
import { BookOpen, Star, Users, Clock, Check, FileText, ArrowRight, Flame, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Online Tech Courses 2026 India — AI, Web Dev, DSA at ₹99 | FutureAI",
  description:
    "India's most affordable trending tech masterclasses 2026. Learn AI Engineering, Full-Stack Web Development, Data Science, Cloud DevOps, DSA, Power BI & more. Module 1 FREE. Prices ₹99–₹199. Get a verified certificate + PDF manual. Trusted by 10,247+ students from IIT, NIT, BITS Pilani.",
  keywords: [
    // Primary course keywords
    "online courses India 2026",
    "best online courses India",
    "tech courses India 2026",
    "online tech courses 2026",
    "cheap online courses India",
    "affordable tech courses India",
    // AI/ML keywords
    "AI course India 2026",
    "artificial intelligence course India",
    "machine learning course online India",
    "generative AI course India",
    "AI engineering course",
    "deep learning course India",
    "ChatGPT course India",
    "LLM course India",
    // Web Development
    "full stack web development course India",
    "web development course 2026",
    "react nextjs course India",
    "MERN stack course India",
    // Data Science
    "data science course India 2026",
    "data science certification India",
    "python data science course",
    "pandas numpy course India",
    // Cloud / DevOps
    "cloud devops course India",
    "AWS certification course India",
    "docker kubernetes course India",
    "CI CD course India",
    // DSA
    "DSA course India",
    "data structures algorithms course",
    "LeetCode preparation course",
    "coding interview course India",
    // Analytics
    "Power BI course India",
    "SQL course India 2026",
    "data analytics course India",
    "Excel analytics course",
    // Internship keywords
    "online internship with certificate India",
    "AI internship 2026 India",
    "tech internship India students",
    "internship certificate India",
    "free internship with certificate",
    "AI ML internship India 2026",
    // Trust/brand keywords
    "FutureAI courses",
    "futureee AI masterclass",
    "best courses for engineering students India",
    "courses for B.Tech students India",
    "IT courses for students India",
    "verified online certificate India",
    "certificate with QR code India",
    // Price keywords
    "courses under 200 rupees India",
    "₹99 course India",
    "cheapest tech course certificate India",
  ],
  authors: [{ name: "FutureAI Education", url: "https://futureee.me" }],
  creator: "FutureAI Education",
  publisher: "FutureAI Education",
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
  alternates: {
    canonical: "https://futureee.me/courses/",
    languages: {
      "en-IN": "https://futureee.me/courses/",
    },
  },
  openGraph: {
    title: "Best Online Tech Courses 2026 India — AI, Web Dev, DSA from ₹99 | FutureAI",
    description:
      "7 industry-grade masterclasses in AI, Full-Stack Web Dev, Data Science, Cloud DevOps, DSA & Analytics. Module 1 FREE. Verified certificate + PDF manual. Trusted by 10,247+ students across India.",
    url: "https://futureee.me/courses/",
    type: "website",
    siteName: "FutureAI",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FutureAI Online Tech Courses 2026 — AI, Web Dev, Data Science from ₹99",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FutureAI 2026 Tech Masterclasses — AI, Web Dev, DSA from ₹99",
    description:
      "7 pro tech courses. AI Engineering, Full Stack Dev, Data Science, Cloud DevOps & more. Module 1 FREE. Verified certificate + PDF included.",
    images: [{ url: "/og-image.png", alt: "FutureAI Online Tech Courses 2026" }],
    site: "@futureai",
    creator: "@futureai",
  },
  verification: {
    google: "sPbQWQbK3InJq5W3c8XVoE2vooNSlHkBrFOKxRsg32g",
  },
  other: {
    // HEO / Helpfulness signals
    "article:published_time": "2026-01-01T00:00:00Z",
    "article:modified_time": new Date().toISOString(),
    "article:section": "Online Education",
    "article:tag": "AI, Machine Learning, Web Development, Data Science, Online Courses, Internship",
    // Dublin Core
    "DC.title": "Best Online Tech Courses India 2026 | FutureAI",
    "DC.description": "7 affordable tech masterclasses for Indian engineering students. AI, Web Dev, Data Science from ₹99.",
    "DC.creator": "FutureAI Education",
    "DC.language": "en-IN",
    "DC.rights": "© 2026 FutureAI Education",
    // Geo targeting for India rankings
    "geo.region": "IN",
    "geo.placename": "India",
    "geo.position": "20.5937;78.9629",
    "ICBM": "20.5937, 78.9629",
    // Content classification
    "classification": "Education, Technology, Online Courses, Professional Development",
    "category": "Online Education",
    "coverage": "India",
    "distribution": "global",
    "rating": "general",
    "revisit-after": "3 days",
    "language": "en-IN",
    // Monetization/product signals
    "price": "99",
    "priceCurrency": "INR",
    // Pinterest
    "pinterest-rich-pin": "true",
  },
};

const categoryColors: Record<string, { bg: string; color: string; border: string }> = {
  "Artificial Intelligence": { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  "Automation & Agents": { bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
  "Web Development": { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "Data Science": { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
  "Cloud & Security": { bg: "#f0f9ff", color: "#0284c7", border: "#bae6fd" },
  "Coding Interviews & DSA": { bg: "#fefce8", color: "#ca8a04", border: "#fde68a" },
  "Data Analytics": { bg: "#fdf2f8", color: "#db2777", border: "#fbcfe8" },
};

export default function CoursesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization
      {
        "@type": "EducationalOrganization",
        "@id": "https://futureee.me/#organization",
        "name": "FutureAI Education",
        "alternateName": ["FutureAI", "Futureee AI", "FutureAI Internships"],
        "url": "https://futureee.me",
        "logo": {
          "@type": "ImageObject",
          "url": "https://futureee.me/logo.png",
          "width": 200,
          "height": 200,
        },
        "description": "India's leading affordable tech education platform. AI, Web Dev, Data Science masterclasses for engineering students.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "team@futureee.me",
          "availableLanguage": ["English", "Hindi", "Telugu"],
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "847",
          "reviewCount": "847",
        },
        "sameAs": [
          "https://www.linkedin.com/company/futureai",
        ],
      },
      // 2. WebPage with HEO signals
      {
        "@type": "WebPage",
        "@id": "https://futureee.me/courses/#webpage",
        "url": "https://futureee.me/courses/",
        "name": "Best Online Tech Courses India 2026 — AI, Web Dev, Data Science from ₹99 | FutureAI",
        "description": "Explore FutureAI's 7 trending 2026 tech masterclasses. AI Engineering, Full Stack Development, Data Science, Cloud DevOps, DSA & Analytics. Module 1 FREE. Verified certificate + PDF manual.",
        "inLanguage": "en-IN",
        "isPartOf": { "@id": "https://futureee.me/#website" },
        "breadcrumb": { "@id": "https://futureee.me/courses/#breadcrumb" },
        "author": { "@id": "https://futureee.me/#organization" },
        "datePublished": "2026-01-01",
        "dateModified": new Date().toISOString().split("T")[0],
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "h2", ".course-tagline"],
        },
      },
      // 3. BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": "https://futureee.me/courses/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://futureee.me/" },
          { "@type": "ListItem", "position": 2, "name": "All Courses", "item": "https://futureee.me/courses/" },
        ],
      },
      // 4. ItemList — all courses
      {
        "@type": "ItemList",
        "@id": "https://futureee.me/courses/#courselist",
        "name": "FutureAI 2026 Trending Tech Masterclasses",
        "description": "7 industry-grade professional online courses in AI, Web Development, Data Science, Cloud DevOps, DSA and Analytics. Starting from ₹99.",
        "url": "https://futureee.me/courses/",
        "numberOfItems": trendingCourses.length,
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "itemListElement": trendingCourses.map((c, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `https://futureee.me/courses/${c.slug}/`,
          "name": c.title,
          "description": c.tagline,
          "item": {
            "@type": "Course",
            "@id": `https://futureee.me/courses/${c.slug}/#course`,
            "name": c.title,
            "description": c.tagline,
            "url": `https://futureee.me/courses/${c.slug}/`,
            "provider": { "@id": "https://futureee.me/#organization" },
            "courseMode": "online",
            "inLanguage": "en-IN",
            "educationalLevel": "Undergraduate",
            "offers": {
              "@type": "Offer",
              "price": c.price.toString(),
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2027-01-01",
              "seller": { "@id": "https://futureee.me/#organization" },
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "courseWorkload": c.duration,
              "instructor": {
                "@type": "Person",
                "name": "FutureAI Expert Instructor",
              },
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": c.rating,
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": Math.floor(c.enrolledCount * 0.08),
            },
          },
        })),
      },
      // 5. FAQPage — answers critical user queries Google loves
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the best online tech courses in India in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FutureAI offers 7 of the most trending tech masterclasses in India for 2026: AI Engineering & Generative AI, Full-Stack Web Development, Data Science & Machine Learning, Cloud DevOps & Security, Coding Interviews & DSA, Data Analytics with Power BI, and AI Agents & Automation. All start from ₹99.",
            },
          },
          {
            "@type": "Question",
            "name": "Are FutureAI courses affordable for students in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. FutureAI courses are priced between ₹99 and ₹199, making them among the most affordable certified tech courses available in India in 2026. Module 1 of every course is completely free — no credit card required.",
            },
          },
          {
            "@type": "Question",
            "name": "Do FutureAI courses come with a verified certificate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every FutureAI course comes with a tamper-proof, cryptographically verified certificate with a QR code that can be verified live at futureee.me/verify. It also includes an official PDF course manual for download.",
            },
          },
          {
            "@type": "Question",
            "name": "Which tech skills are most in-demand in India in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In 2026, the most in-demand tech skills in India are: Generative AI and LLMs, Full-Stack Web Development (React, Next.js), Data Science and Machine Learning, Cloud DevOps (AWS, Docker, Kubernetes), Data Structures & Algorithms for FAANG interviews, and Data Analytics with Power BI and SQL.",
            },
          },
          {
            "@type": "Question",
            "name": "Is Module 1 of FutureAI courses really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Module 1 is 100% free for every course on FutureAI. No credit card or payment is needed to start. You can read through the entire first module — which includes comprehensive lessons, enterprise code labs, and real-world case studies — before deciding to unlock the remaining modules.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I do FutureAI courses alongside my B.Tech or degree?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. FutureAI courses are self-paced and fully online. Engineering students from IIT, NIT, BITS, VIT, JNTUH, and 200+ other colleges regularly complete these courses during evenings and weekends. Your access never expires.",
            },
          },
        ],
      },
      // 6. Offer/Product for the Combo Pack
      {
        "@type": "Product",
        "@id": "https://futureee.me/courses/#combo",
        "name": "FutureAI All-Access Combo Pack — 7 Courses",
        "description": "Unlock all 7 trending tech masterclasses (AI, Web Dev, Data Science, Cloud, DSA, Analytics) plus verified certificates and PDF manuals in one payment.",
        "image": "https://futureee.me/og-image.png",
        "brand": { "@id": "https://futureee.me/#organization" },
        "offers": {
          "@type": "Offer",
          "price": "499",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://futureee.me/dashboard/payment?courseId=combo",
          "priceValidUntil": "2027-01-01",
          "seller": { "@id": "https://futureee.me/#organization" },
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "ratingCount": "847",
        },
      },
    ],
  };

  const totalStudents = trendingCourses.reduce((acc, c) => acc + c.enrolledCount, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "4.5rem 0 5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, #2563eb20 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container-custom" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.35rem 0.85rem", borderRadius: "9999px", marginBottom: "1.25rem" }}>
            <Flame size={14} color="#fbbf24" />
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              2026 Most Trending Tech Courses
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.75rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>
            Best Online Tech Courses 2026 India —<br />
            <span style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AI, Web Dev, DSA from ₹99
            </span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#94a3b8", maxWidth: "680px", margin: "0 auto 2rem", lineHeight: 1.65 }}>
            {trendingCourses.length} industry-grade masterclasses for engineering students. Module 1 is <strong style={{ color: "#4ade80" }}>100% free</strong> — no credit card needed. Get a verified certificate + PDF manual from ₹99. Trusted by 10,247+ students from IIT, NIT, BITS & more.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.25rem 2rem" }}>
            {[
              { val: `${trendingCourses.length}`, label: "Masterclasses" },
              { val: `${(totalStudents / 1000).toFixed(0)}k+`, label: "Students Enrolled" },
              { val: "₹99+", label: "Starting Price" },
              { val: "4.9★", label: "Average Rating" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: "100px" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff" }}>{s.val}</div>
                <div style={{ fontSize: "0.725rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS (visual, not interactive for SSG) ── */}
      <section style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "1rem 0" }}>
        <div className="container-custom">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b", marginRight: "0.25rem" }}>Browse:</span>
            {Array.from(new Set(trendingCourses.map(c => c.category))).map(cat => {
              const col = categoryColors[cat] ?? { bg: "#f1f5f9", color: "#334155", border: "#e2e8f0" };
              return (
                <span key={cat} style={{ background: col.bg, color: col.color, border: `1px solid ${col.border}`, fontSize: "0.78rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "9999px" }}>
                  {cat}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMBO PACK BANNER ── */}
      <section style={{ padding: "2rem 0 0", background: "#fff" }}>
        <div className="container-custom">
          <div style={{
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            borderRadius: "20px",
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            boxShadow: "0 10px 30px -5px rgba(245,158,11,0.4)"
          }}>
            <h2 className="combo-headline" style={{ fontSize: "clamp(1.35rem, 4vw, 2rem)", fontWeight: 900, marginBottom: "0.5rem", color: "#fff" }}>
              Unlock All 7 Masterclasses
            </h2>
            <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", maxWidth: "600px", fontWeight: 600 }}>
              Get unlimited access to every single course, PDF manual, and certificate for a one-time fee of just ₹499.
            </p>
            <Link href="/dashboard/payment?courseId=combo" className="combo-btn hover:scale-105" style={{
              background: "#fff",
              color: "#d97706",
              padding: "0.85rem 2rem",
              borderRadius: "9999px",
              fontWeight: 800,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "transform 0.2s"
            }}>
              <Star size={18} fill="currentColor" /> Grab The Combo Pack — ₹499
            </Link>
          </div>
        </div>
      </section>

      {/* ── COURSE GRID ── */}
      <section style={{ padding: "3.5rem 0 5rem", background: "#fff" }}>
        <div className="container-custom">
          <h2 style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.5rem)", fontWeight: 800, color: "#0f172a", marginBottom: "0.35rem" }}>
            All {trendingCourses.length} Professional Masterclasses
          </h2>
          <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "0.9rem" }}>
            Every course includes Module 1 free, PDF course manual, and verified certificate.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {trendingCourses.map((course) => {
              const col = categoryColors[course.category] ?? { bg: "#f1f5f9", color: "#334155", border: "#e2e8f0" };
              const discPct = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
              return (
                <article
                  key={course.id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "20px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    background: "#fff",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                >
                  {/* Card Header */}
                  <div style={{ background: col.bg, padding: "1.5rem 1.5rem 1rem", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <span style={{ color: col.color, fontSize: "0.72rem", fontWeight: 800, background: "#fff", padding: "0.25rem 0.6rem", borderRadius: "9999px", border: `1px solid ${col.border}` }}>
                        {course.badge}
                      </span>
                      <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.7rem", fontWeight: 800, padding: "0.25rem 0.6rem", borderRadius: "9999px" }}>
                        Module 1 FREE
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.3, margin: 0 }}>
                      {course.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.6, marginBottom: "1rem", flex: 1 }}>
                      {course.tagline}
                    </p>

                    {/* Meta */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "#64748b" }}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b" /> {course.rating}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "#64748b" }}>
                        <Users size={13} /> {course.enrolledCount.toLocaleString()}+ enrolled
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "#64748b" }}>
                        <Clock size={13} /> {course.duration}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "#64748b" }}>
                        <BookOpen size={13} /> {course.modules.length} modules
                      </span>
                    </div>

                    {/* Includes */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1.25rem" }}>
                      {[
                        "7 In-depth professional modules",
                        "Production capstone project",
                        "Official PDF course manual",
                      ].map((feat, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#475569" }}>
                          <Check size={13} color="#16a34a" /> {feat}
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0f172a" }}>₹{course.price}</span>
                      <span style={{ fontSize: "0.9rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 600 }}>₹{course.originalPrice}</span>
                      <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 800, background: "#f0fdf4", padding: "0.15rem 0.4rem", borderRadius: "6px" }}>{discPct}% OFF</span>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <Link
                        href={`/courses/${course.slug}`}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.7rem", background: col.bg, color: col.color, borderRadius: "10px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", border: `1px solid ${col.border}` }}
                      >
                        <BookOpen size={15} /> View Full Curriculum
                      </Link>
                      <Link
                        href={`/dashboard?courseId=${course.id}`}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.7rem", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", borderRadius: "10px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none" }}
                      >
                        <ArrowRight size={15} /> Start Free (Module 1)
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM TRUST BAR ── */}
      <section style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "3rem 0" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
            Why 10,247+ Students Trust FutureAI
          </h2>
          <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "0.95rem" }}>Real credentials, real support, zero risk.</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem" }}>
            {[
              { icon: <BookOpen size={20} />, label: "7 Modules Per Course", desc: "In-depth professional curriculum" },
              { icon: <Star size={20} />, label: "4.9★ / 847 Ratings", desc: "Verified student reviews" },
              { icon: <ShieldCheck size={20} />, label: "100% Secure Payment", desc: "Razorpay • 256-bit SSL" },
              { icon: <FileText size={20} />, label: "7-Day Refund", desc: "Full refund, no questions asked" },
            ].map((item, i) => (
              <div key={i} style={{ maxWidth: "160px", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", background: "#eff6ff", color: "#2563eb", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Contact strip */}
          <div style={{ marginTop: "2rem", padding: "1rem", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", display: "inline-flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Have questions?</span>
            <a href="https://wa.me/917989013513" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", fontWeight: 700, color: "#16a34a", textDecoration: "none" }}>
              💬 WhatsApp Us
            </a>
            <a href="mailto:team@futureee.me" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>
              📧 team@futureee.me
            </a>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Reply within 2 hours</span>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION — targets Google PAA + rich snippets ── */}
      <section style={{ background: "#fff", padding: "4rem 0", borderTop: "1px solid #f1f5f9" }}>
        <div className="container-custom" style={{ maxWidth: "760px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ background: "#eff6ff", color: "#2563eb", fontSize: "0.75rem", fontWeight: 800, padding: "0.3rem 0.75rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Frequently Asked</span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0f172a", marginTop: "0.75rem" }}>People Also Ask About FutureAI Courses</h2>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>Everything students ask before enrolling — answered honestly.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              {
                q: "What are the best online tech courses in India in 2026?",
                a: "FutureAI offers 7 of the most trending tech masterclasses for 2026: AI Engineering & Generative AI, Full-Stack Web Development, Data Science & Machine Learning, Cloud DevOps & Security, Coding Interviews & DSA, Data Analytics with Power BI & SQL, and AI Agents & Automation. All courses start from ₹99, with Module 1 completely free."
              },
              {
                q: "Are FutureAI courses good for B.Tech / engineering students?",
                a: "Yes — FutureAI courses are specifically designed for Indian engineering students from IIT, NIT, BITS Pilani, VIT, JNTUH, Amrita, Osmania, SRM and 200+ colleges. The curriculum covers skills that placement cells and recruiters actively look for in 2026."
              },
              {
                q: "Is Module 1 really free? Is there a catch?",
                a: "No catch. Module 1 of every FutureAI course is 100% free. No credit card, no sign-up fee. You can read the entire first module including all code labs and exercises before deciding to unlock the remaining modules with a one-time payment."
              },
              {
                q: "Do I get a certificate? Is it verified?",
                a: "Yes. Every FutureAI course includes a tamper-proof, cryptographically signed certificate with a unique QR code verifiable at futureee.me/verify. 10,247+ certificates have been issued with zero disputes. The certificate is accepted by most Indian companies and college departments for credit."
              },
              {
                q: "Which tech skill should I learn in 2026 for jobs?",
                a: "In 2026, the highest-paying and most in-demand tech skills in India are: (1) Generative AI and LLM engineering, (2) Full-Stack Web Development with React and Next.js, (3) Data Science and Machine Learning with Python, (4) Cloud DevOps with AWS and Kubernetes, (5) Data Structures & Algorithms for FAANG placements. FutureAI offers all of these."
              },
              {
                q: "What is the refund policy?",
                a: "FutureAI offers a 7-day full refund guarantee. If you are not satisfied for any reason within 7 days of purchase, email team@futureee.me and we will process a full refund — no questions asked. Payments are secured by Razorpay with 256-bit SSL encryption."
              },
            ].map((item, i, arr) => (
              <details key={i} style={{ borderTop: "1px solid #e2e8f0", borderBottom: i === arr.length - 1 ? "1px solid #e2e8f0" : "none" }}>
                <summary style={{ padding: "1.25rem 0", fontSize: "1rem", fontWeight: 700, color: "#0f172a", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <span>{item.q}</span>
                  <span style={{ flexShrink: 0, color: "#94a3b8", fontSize: "1.25rem" }}>+</span>
                </summary>
                <div style={{ paddingBottom: "1.25rem", fontSize: "0.95rem", color: "#475569", lineHeight: 1.75 }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO RICH TEXT — invisible to users, valuable to crawlers ── */}
      <section style={{ padding: "3rem 0", background: "#f8fafc" }}>
        <div className="container-custom" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem" }}>
            About FutureAI Online Courses — Affordable Tech Education for India 2026
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.85, marginBottom: "1rem" }}>
            FutureAI is one of India&apos;s most affordable and trusted online education platforms offering professional-grade tech masterclasses for engineering students, fresh graduates, and working professionals. Our 7 courses cover the most in-demand skills in the Indian job market for 2026: <strong>Artificial Intelligence & Generative AI</strong>, <strong>Full-Stack Web Development</strong>, <strong>Data Science & Machine Learning</strong>, <strong>Cloud Computing & DevOps</strong>, <strong>Data Structures & Algorithms (DSA)</strong>, <strong>Data Analytics with Power BI & SQL</strong>, and <strong>AI Agents & Automation</strong>.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.85, marginBottom: "1rem" }}>
            All courses are priced between <strong>₹99 and ₹199</strong> — among the most affordable verified tech certifications in India. Module 1 of every course is <strong>100% free</strong> with no credit card required. Upon enrolling, students get access to in-depth professional modules, downloadable PDF course manuals, production-ready code implementations, and a tamper-proof cryptographic completion certificate with a live QR verification link.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.85 }}>
            Over <strong>10,247 students</strong> from IIT, NIT, BITS Pilani, VIT, JNTUH, Amrita, Osmania University, SRM and 200+ other colleges across India have enrolled in FutureAI courses. With a 4.9-star rating from 847 verified reviews and a 7-day no-questions-asked refund policy, FutureAI is the trusted choice for students who want real, industry-relevant skills at a student-friendly price.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
            {["AI Course India","Online Courses 2026 India","Data Science Certification","Web Development Course","Cloud DevOps Course","DSA Course India","Generative AI Course","Machine Learning Certificate","Internship Certificate India","₹99 Tech Course","Free Module 1","Verified Certificate QR Code"].map(tag => (
              <span key={tag} style={{ background: "#eff6ff", color: "#2563eb", fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.6rem", borderRadius: "9999px", border: "1px solid #bfdbfe" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .container-custom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
      `}</style>
    </>
  );
}
