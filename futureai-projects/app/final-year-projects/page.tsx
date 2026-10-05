import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getFinalYearProjects } from "@/lib/projects-data";
import { GraduationCap, CheckCircle, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Final Year Projects — FutureAI Projects",
  description:
    "Advanced final year project kits for engineering students. Complete source code, documentation, SRS, PPT, viva preparation, architecture diagrams, and more.",
  alternates: { canonical: "https://projects.futureee.me/final-year-projects" },
};

const FINAL_YEAR_BENEFITS = [
  "Complete project documentation (SRS, Abstract, Literature Survey)",
  "Professional PPT presentation (30-40 slides)",
  "Architecture and UML diagrams",
  "Viva questions and model answers",
  "Code explanation walkthrough",
  "Portfolio and LinkedIn descriptions",
  "Installation and deployment guide",
  "Lifetime access to all materials",
];

export default function FinalYearProjectsPage() {
  const projects = getFinalYearProjects();

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            padding: "5rem 0 3.5rem",
            background: "linear-gradient(180deg, rgba(249,115,22,0.08) 0%, transparent 100%)",
            borderBottom: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div className="container" style={{ position: "relative" }}>
            <div style={{ maxWidth: "700px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.3rem 0.75rem",
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  color: "#fb923c",
                  fontWeight: "600",
                  marginBottom: "1.25rem",
                }}
              >
                <GraduationCap size={14} />
                For Engineering Students
              </div>
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  fontWeight: "900",
                  lineHeight: "1.1",
                  marginBottom: "1.25rem",
                }}
              >
                Final Year Projects That Go{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #f97316, #fb923c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Beyond Basic CRUD
                </span>
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--muted-light)",
                  lineHeight: "1.7",
                  marginBottom: "2rem",
                  maxWidth: "580px",
                }}
              >
                10 advanced project kits designed for engineering students working on major academic projects.
                Every kit comes with everything your committee expects — and more.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="#projects" className="btn-primary">
                  Browse Projects <ArrowRight size={16} />
                </a>
                <Link href="/project-packs#final-year-ai-pack" className="btn-secondary">
                  Final Year Pack — Best Value
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What's included section */}
        <section
          style={{
            padding: "3rem 0",
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
                alignItems: "center",
              }}
              className="fy-benefits-grid"
            >
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>
                  Everything You Need for Your Project Defense
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>
                  Every final year project kit is a complete package. We&apos;ve included everything your
                  committee, supervisor, and viva panel will expect.
                </p>
              </div>
              <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                {FINAL_YEAR_BENEFITS.map((b) => (
                  <li
                    key={b}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--muted-light)" }}
                  >
                    <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects grid */}
        <section className="section" id="projects">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div className="section-label">10 Flagship Projects</div>
                <h2 className="section-title" style={{ marginBottom: "0.25rem" }}>Final Year Project Catalog</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.25)",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  color: "#fb923c",
                  fontWeight: "600",
                }}
              >
                <GraduationCap size={16} />
                {projects.length} Projects Available
              </div>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Pack CTA */}
        <section
          style={{
            padding: "4rem 0",
            background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(124,58,237,0.08))",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "900", marginBottom: "1rem" }}>
              Need All 10 Projects?
            </h2>
            <p style={{ color: "var(--muted-light)", marginBottom: "1.5rem", fontSize: "1rem" }}>
              Get the Final Year AI Pack — all 10 advanced projects with complete documentation at a single price.
            </p>
            <Link href="/project-packs#final-year-ai-pack" className="btn-primary" style={{ padding: "0.875rem 2rem" }}>
              View Final Year AI Pack <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
