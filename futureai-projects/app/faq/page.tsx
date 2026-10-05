"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    category: "Products & Projects",
    questions: [
      {
        q: "What exactly is included in a project kit?",
        a: "Each project kit is a complete learning package. Depending on the tier, it can include: complete source code (frontend + backend + database), documentation (SRS, abstract, literature survey), architecture and UML diagrams, a professional PPT presentation, installation guide, API documentation, viva questions and model answers, code explanation walkthrough, and portfolio/LinkedIn descriptions.",
      },
      {
        q: "Are these projects truly original and complete?",
        a: "Yes. Every project in our catalog is a genuine, working software project — not placeholder or stub code. Final year projects especially include full implementations with real AI/ML integration, databases, and working frontends.",
      },
      {
        q: "Can I use these projects for my college final year submission?",
        a: "Our projects are designed as educational resources intended for learning, customization, experimentation, and portfolio development. We provide them to help you understand real-world project architecture. You are responsible for understanding your institution's academic integrity policies and appropriately adapting the work.",
      },
      {
        q: "What programming languages/technologies are used?",
        a: "Our projects use modern, industry-standard technologies including Python, React, Next.js, FastAPI, Node.js, Firebase, TensorFlow, PyTorch, LangChain, OpenCV, and more. Each project detail page shows the exact tech stack.",
      },
      {
        q: "What difficulty levels are available?",
        a: "Beginner (great for learning basics), Intermediate (some experience required), and Advanced (for final year and complex projects requiring prior knowledge of the domain).",
      },
    ],
  },
  {
    category: "Payments & Pricing",
    questions: [
      {
        q: "How do I pay for a project?",
        a: "We accept payments via Razorpay — India's most trusted payment gateway. You can pay via UPI, credit/debit cards, net banking, or wallets.",
      },
      {
        q: "Is the payment secure?",
        a: "Yes. Payments are processed entirely through Razorpay's PCI-DSS compliant infrastructure. We never store your card details. Payment verification happens server-side before any access is granted.",
      },
      {
        q: "Can I get a discount or coupon?",
        a: "We occasionally offer coupons for students. Check our Instagram or contact us at support@futureee.me for current offers.",
      },
      {
        q: "Is there a group or institutional pricing?",
        a: "For institutions or groups of 5+ students, contact us for special pricing at support@futureee.me.",
      },
    ],
  },
  {
    category: "Access & Downloads",
    questions: [
      {
        q: "When do I get access after paying?",
        a: "Access is granted immediately after successful payment verification. You can find your purchased projects in the 'My Projects' dashboard.",
      },
      {
        q: "How long can I access my purchased projects?",
        a: "Lifetime access. Once purchased, you can download and access your project materials at any time — there's no expiry.",
      },
      {
        q: "Can I download the files multiple times?",
        a: "Yes. You can download your project files multiple times from your dashboard.",
      },
    ],
  },
  {
    category: "Refunds & Support",
    questions: [
      {
        q: "What is the refund policy?",
        a: "Because these are digital products, we generally cannot offer refunds after the source code has been downloaded. However, we review all requests individually. If you experienced a technical issue preventing access, contact us within 48 hours of purchase at support@futureee.me.",
      },
      {
        q: "What if I face issues with installation or setup?",
        a: "Email support@futureee.me with your order ID and a description of the issue. Our team will assist you.",
      },
      {
        q: "Are there any updates to projects after purchase?",
        a: "If a significant update is made to a project you've purchased, we will notify you via email. Critical bug fixes are provided at no additional cost.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="page-header">
          <div className="container">
            <div className="section-label">Help & Support</div>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
              Frequently Asked Questions
            </h1>
            <p style={{ color: "var(--muted-light)", fontSize: "1rem" }}>
              Everything you need to know about FutureAI Projects
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {FAQS.map((section) => (
                <div key={section.category}>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#7C3AED", marginBottom: "1rem" }}>
                    {section.category}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {section.questions.map((faq, i) => {
                      const key = `${section.category}-${i}`;
                      const isOpen = openMap[key];
                      return (
                        <div
                          key={key}
                          style={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            overflow: "hidden",
                            transition: "border-color 0.2s",
                          }}
                        >
                          <button
                            onClick={() => toggle(key)}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1.1rem 1.25rem",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#f8fafc",
                              fontWeight: "600",
                              fontSize: "0.925rem",
                              textAlign: "left",
                              gap: "1rem",
                            }}
                          >
                            {faq.q}
                            {isOpen ? (
                              <ChevronUp size={16} color="var(--muted)" style={{ flexShrink: 0 }} />
                            ) : (
                              <ChevronDown size={16} color="var(--muted)" style={{ flexShrink: 0 }} />
                            )}
                          </button>
                          {isOpen && (
                            <div
                              style={{
                                padding: "0 1.25rem 1.1rem",
                                fontSize: "0.9rem",
                                color: "var(--muted-light)",
                                lineHeight: "1.75",
                                borderTop: "1px solid var(--border)",
                                paddingTop: "1rem",
                              }}
                            >
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "3rem",
                padding: "2rem",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>Still have questions?</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                Our support team is happy to help you.
              </p>
              <a
                href="mailto:support@futureee.me"
                className="btn-primary"
                style={{ display: "inline-flex" }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
