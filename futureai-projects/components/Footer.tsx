"use client";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

const FOOTER_SECTIONS: { title: string, links: { label: string, href: string, external?: boolean }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "All Projects", href: "/projects" },
      { label: "Final Year Projects", href: "/final-year-projects" },
      { label: "Project Packs", href: "/project-packs" },
      { label: "Browse Categories", href: "/categories" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "FutureAI",
    links: [
      { label: "Courses", href: "https://futureee.me/courses", external: true },
      { label: "Internships", href: "https://futureee.me/1_month_internship", external: true },
      { label: "Certificates", href: "https://futureee.me/verify", external: true },
      { label: "FutureAI Home", href: "https://futureee.me", external: true },
    ],
  },
  {
    title: "Support",
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
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        marginTop: "auto",
      }}
    >
      {/* Main footer content */}
      <div className="container" style={{ padding: "4rem 1.5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr repeat(3, auto)",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "800",
                  color: "#fff",
                }}
              >
                F
              </div>
              <div>
                <div style={{ fontWeight: "800", fontSize: "1rem", color: "#f8fafc" }}>FutureAI Projects</div>
                <div style={{ fontSize: "0.65rem", color: "#7C3AED", fontWeight: "600", letterSpacing: "0.05em" }}>
                  by FutureAI
                </div>
              </div>
            </Link>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: "260px", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Build real projects. Learn real skills. Build your future with production-ready project kits.
            </p>
            <a
              href="https://futureee.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: "#7C3AED",
                padding: "0.4rem 0.75rem",
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                borderRadius: "8px",
              }}
            >
              Visit FutureAI <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Nav sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--muted-light)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7C3AED")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted-light)")}
                      >
                        {link.label} <ArrowUpRight size={10} />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--muted-light)",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7C3AED")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted-light)")}
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
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Categories
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  padding: "0.2rem 0.6rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#9f67ff";
                  el.style.borderColor = "#7C3AED";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--muted)";
                  el.style.borderColor = "var(--border)";
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
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
            © {new Date().getFullYear()} FutureAI Projects. All rights reserved.{" "}
            <a href="https://futureee.me" target="_blank" rel="noopener noreferrer" style={{ color: "#7C3AED" }}>
              futureee.me
            </a>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)", textAlign: "center" }}>
            Projects are educational resources for learning, customization, and portfolio development.
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href="mailto:support@futureee.me"
              style={{ padding: "0.4rem", color: "var(--muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7C3AED")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
