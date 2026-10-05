import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { CheckCircle, Search, ShoppingCart, Download, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — FutureAI Projects",
  description: "Learn how to discover, evaluate, purchase, and access project kits on FutureAI Projects marketplace.",
};

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Browse & Discover",
    description:
      "Explore 30+ curated project kits across AI, ML, Full Stack, Data Science, Cybersecurity, and more. Use filters to find projects by category, technology, difficulty level, or price range. Search by keyword to find exactly what you need.",
    details: [
      "Filter by category, technology, and difficulty",
      "Search by keyword across all projects",
      "View final year projects separately",
      "Browse project packs for bundled savings",
    ],
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Preview & Evaluate",
    description:
      "Each project has a detailed product page with full descriptions, feature lists, technology stacks, architecture information, module breakdowns, and learning outcomes. Understand exactly what you&apos;re getting before purchasing.",
    details: [
      "Read full project description and use cases",
      "See complete feature lists",
      "Explore the technology stack",
      "Review all included materials",
    ],
  },
  {
    icon: ShoppingCart,
    step: "03",
    title: "Purchase Securely",
    description:
      "Buy with confidence using Razorpay — India's most trusted payment gateway. Your payment is processed securely. Once verified, your project access is created instantly in your dashboard.",
    details: [
      "Secure payment via Razorpay",
      "UPI, cards, and net banking accepted",
      "Payment verified server-side before access is granted",
      "Instant order confirmation",
    ],
  },
  {
    icon: Download,
    step: "04",
    title: "Access & Learn",
    description:
      "Access your purchased projects from your dashboard anytime. Download source code, read documentation, explore architecture diagrams, prepare for your viva, and customize the project for your needs.",
    details: [
      "Instant access after payment verification",
      "Download source code securely",
      "Access all documentation, PPTs, and diagrams",
      "Lifetime access — download anytime",
    ],
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "₹299 – ₹499",
    color: "#10B981",
    includes: [
      "Complete source code",
      "README documentation",
      "Installation guide",
      "Basic project structure",
    ],
    note: "Best for learning a new technology quickly",
  },
  {
    name: "Professional",
    price: "₹699 – ₹1,499",
    color: "#7C3AED",
    includes: [
      "Everything in Starter",
      "Full documentation (SRS, Abstract)",
      "Architecture diagrams",
      "PPT presentation",
      "Demo video",
      "Viva preparation guide",
    ],
    note: "Best for academic projects and portfolio building",
    featured: true,
  },
  {
    name: "Premium",
    price: "₹1,999 – ₹4,999",
    color: "#F59E0B",
    includes: [
      "Everything in Professional",
      "Complete final year documentation",
      "Literature survey",
      "Code explanation walkthrough",
      "LinkedIn and portfolio descriptions",
      "Priority support",
    ],
    note: "Best for final year projects and advanced portfolios",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="page-header">
          <div className="container">
            <div className="section-label">Simple Process</div>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
              How It Works
            </h1>
            <p style={{ color: "var(--muted-light)", fontSize: "1rem" }}>
              From discovery to learning — your complete project journey explained
            </p>
          </div>
        </div>

        {/* Steps */}
        <section className="section">
          <div className="container" style={{ maxWidth: "900px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {STEPS.map((step, i) => (
                <div
                  key={step.step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr",
                    gap: "2rem",
                    alignItems: "flex-start",
                  }}
                  className="step-row"
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <step.icon size={24} color="#fff" />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: "2px", height: "100px", background: "linear-gradient(180deg, #7C3AED44, transparent)" }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#7C3AED", marginBottom: "0.25rem" }}>
                      Step {step.step}
                    </div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.75rem" }}>
                      {step.title}
                    </h2>
                    <p style={{ color: "var(--muted-light)", lineHeight: "1.7", marginBottom: "1rem" }}>
                      {step.description}
                    </p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {step.details.map((d) => (
                        <li key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--muted)" }}>
                          <CheckCircle size={13} color="#10b981" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section
          className="section"
          style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="section-label">Transparent Pricing</div>
              <h2 className="section-title">Project Tiers</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Three tiers designed for different needs — from quick learning to comprehensive academic submission
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}
              className="tiers-grid"
            >
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: "var(--card)",
                    border: tier.featured ? "1px solid var(--primary)" : "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    position: "relative",
                  }}
                >
                  {tier.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "0.2rem 0.75rem",
                        background: "var(--primary)",
                        borderRadius: "20px",
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        color: "#fff",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Most Common
                    </div>
                  )}
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      color: tier.color,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <div style={{ fontSize: "1.4rem", fontWeight: "900", color: "#f8fafc", marginBottom: "0.5rem" }}>
                    {tier.price}
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.25rem", fontStyle: "italic" }}>
                    {tier.note}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {tier.includes.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.85rem",
                          color: "var(--muted-light)",
                        }}
                      >
                        <CheckCircle size={13} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
