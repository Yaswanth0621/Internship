import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PROJECT_PACKS, PROJECTS } from "@/lib/projects-data";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Packs — FutureAI Projects",
  description: "Bundle multiple AI and full-stack project kits together for comprehensive learning. AI Starter Pack, Generative AI Pack, Final Year AI Pack, and more.",
};

export default function ProjectPacksPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="page-header">
          <div className="container">
            <div className="section-label">Bundle & Save</div>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
              Project Packs
            </h1>
            <p style={{ color: "var(--muted-light)", fontSize: "1rem", maxWidth: "600px" }}>
              Multiple project kits bundled together for comprehensive learning across domains. 
              Perfect for building a strong project portfolio quickly.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {PROJECT_PACKS.map((pack, i) => {
                const packProjects = PROJECTS.filter(
                  (p) => pack.projects.includes(p.slug) && p.status === "published"
                );
                const isFeatured = pack.badge === "Best Value" || pack.badge === "Most Popular";

                return (
                  <div
                    key={pack.id}
                    id={pack.id}
                    style={{
                      background: "var(--card)",
                      border: isFeatured ? "1px solid var(--primary)" : "1px solid var(--border)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {pack.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "2rem",
                          padding: "0.3rem 1rem",
                          background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          color: "#fff",
                          borderRadius: "0 0 10px 10px",
                        }}
                      >
                        {pack.badge}
                      </div>
                    )}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "2rem",
                        padding: "2rem",
                      }}
                      className="pack-inner"
                    >
                      {/* Left */}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                          <Package size={24} color="#7C3AED" />
                          <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#f8fafc" }}>
                            {pack.name}
                          </h2>
                        </div>
                        <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "1.25rem", lineHeight: "1.6" }}>
                          {pack.description}
                        </p>

                        {/* Features */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                          {pack.features.map((f) => (
                            <div
                              key={f}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                fontSize: "0.8rem",
                                color: "var(--muted-light)",
                                padding: "0.3rem 0.6rem",
                                background: "var(--surface)",
                                borderRadius: "6px",
                              }}
                            >
                              <CheckCircle size={12} color="#10b981" />
                              {f}
                            </div>
                          ))}
                        </div>

                        {/* Project previews */}
                        {packProjects.length > 0 && (
                          <div>
                            <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Projects Included:
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                              {packProjects.map((p) => (
                                <Link
                                  key={p.id}
                                  href={`/projects/${p.slug}`}
                                  style={{
                                    fontSize: "0.78rem",
                                    color: "#9f67ff",
                                    padding: "0.2rem 0.5rem",
                                    background: "rgba(124,58,237,0.1)",
                                    borderRadius: "5px",
                                    border: "1px solid rgba(124,58,237,0.2)",
                                    textDecoration: "none",
                                    transition: "background 0.15s",
                                  }}
                                >
                                  {p.title.split(" ").slice(0, 4).join(" ")}...
                                </Link>
                              ))}
                              {pack.projects.length > packProjects.length && (
                                <span style={{ fontSize: "0.78rem", color: "var(--muted)", padding: "0.2rem 0.5rem" }}>
                                  +{pack.projects.length - packProjects.length} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: Price + CTA */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          gap: "1.5rem",
                          minWidth: "200px",
                        }}
                        className="pack-price"
                      >
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "2rem", fontWeight: "900", color: "#f8fafc" }}>
                            ₹{pack.price.toLocaleString("en-IN")}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>One-time • Lifetime access</div>
                        </div>
                        <a
                          href="mailto:support@futureee.me"
                          className="btn-primary"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Get This Pack <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          style={{
            padding: "3rem 0",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container" style={{ maxWidth: "720px" }}>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Pack FAQs</h2>
            {[
              { q: "Can I buy individual projects from a pack?", a: "Yes! All projects are also available individually on the Projects page." },
              { q: "Do packs include all documentation?", a: "Yes, every project in a pack comes with the same full documentation as purchasing individually." },
              { q: "What if I already purchased some projects in a pack?", a: "Contact us at support@futureee.me and we'll offer you the difference price." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: "1rem 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontWeight: "700", color: "#f8fafc", marginBottom: "0.4rem" }}>{faq.q}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
