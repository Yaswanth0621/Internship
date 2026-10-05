"use client";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

const FOOTER_SECTIONS: { title: string, links: { label: string, href: string, external?: boolean }[] }[] = [
  {
    title: "Project Kits",
    links: [
      { label: "All Projects", href: "/projects" },
      { label: "Final Year Projects", href: "/final-year-projects" },
      { label: "Project Packs", href: "/project-packs" },
      { label: "Browse Categories", href: "/categories" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "FutureAI Programs",
    links: [
      { label: "Free AI/ML Internship", href: "https://futureee.me", external: true },
      { label: "1-Month Summer Cohort", href: "https://futureee.me/1_month_internship", external: true },
      { label: "Trending Courses", href: "https://futureee.me/courses", external: true },
      { label: "Verify Certificates", href: "https://futureee.me/verify", external: true },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Refund Policy", href: "/legal/refund" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
    ],
  },
];

const CATEGORIES = [
  { label: "AI & Machine Learning", href: "/categories/ai-ml" },
  { label: "Generative AI", href: "/categories/generative-ai" },
  { label: "AI Agents", href: "/categories/ai-agents" },
  { label: "Full Stack", href: "/categories/full-stack" },
  { label: "Data Science", href: "/categories/data-science" },
  { label: "Computer Vision", href: "/categories/computer-vision" },
  { label: "Cybersecurity", href: "/categories/cybersecurity" },
  { label: "Cloud & DevOps", href: "/categories/cloud-devops" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        marginTop: "auto",
      }}
    >
      {/* Main footer content */}
      <div className="container" style={{ padding: "4rem 1.5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr repeat(3, 1fr)",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "800",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
                }}
              >
                F
              </div>
              <div>
                <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "#0f172a" }}>FutureAI Projects</div>
                <div style={{ fontSize: "0.65rem", color: "#2563eb", fontWeight: "700", letterSpacing: "0.06em" }}>
                  PART OF FUTUREAI ECOSYSTEM
                </div>
              </div>
            </Link>
            <p style={{ fontSize: "0.9rem", color: "#64748b", maxWidth: "290px", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Production-ready codebases, IEEE reports, PPTs, and architecture diagrams. Built to empower students and developers.
            </p>
            <a
              href="https://futureee.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.82rem",
                fontWeight: "600",
                color: "#2563eb",
                padding: "0.45rem 0.85rem",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#dbeafe";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#eff6ff";
              }}
            >
              Explore Free Internships <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Nav sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3
                style={{
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#0f172a",
                  marginBottom: "1.1rem",
                }}
              >
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.875rem",
                          color: "#475569",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2563eb")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#475569")}
                      >
                        {link.label} <ArrowUpRight size={11} color="#94a3b8" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          fontSize: "0.875rem",
                          color: "#475569",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2563eb")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#475569")}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Categories row */}
        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            paddingTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", fontWeight: "700", color: "#64748b", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Explore by Tech Category
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                style={{
                  fontSize: "0.75rem",
                  color: "#475569",
                  padding: "0.3rem 0.65rem",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#2563eb";
                  el.style.borderColor = "#93c5fd";
                  el.style.background = "#eff6ff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#475569";
                  el.style.borderColor = "#e2e8f0";
                  el.style.background = "#f8fafc";
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            © {new Date().getFullYear()} FutureAI Projects. Part of{" "}
            <a href="https://futureee.me" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: "600" }}>
              FutureAI (futureee.me)
            </a>
          </div>
          <div style={{ fontSize: "0.78rem", color: "#94a3b8", textAlign: "center" }}>
            Self-paced educational project kits with source code, documentation, and live preview demos.
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href="mailto:support@futureee.me"
              style={{ padding: "0.4rem", color: "#64748b", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#2563eb")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#64748b")}
              title="Contact Support"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
