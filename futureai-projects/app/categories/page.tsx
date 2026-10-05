
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/projects-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Categories — FutureAI Projects",
  description: "Browse project kits by technology domain — AI & ML, Generative AI, Full Stack, Data Science, Computer Vision, Cybersecurity, and more.",
};

export default function CategoriesPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="page-header">
          <div className="container">
            <div className="section-label">Browse by Domain</div>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
              Project Categories
            </h1>
            <p style={{ color: "var(--muted-light)", fontSize: "1rem" }}>
              Find projects tailored to your technology domain and career goals
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="category-card"
                  style={{
                    display: "block",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "2rem",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    "--hover-color": cat.color,
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "14px",
                      background: `${cat.color}15`,
                      border: `1px solid ${cat.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#f8fafc", marginBottom: "0.5rem" }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: "1.6", marginBottom: "1rem" }}>
                    {cat.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: cat.color,
                    }}
                  >
                    Browse projects <ArrowRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
