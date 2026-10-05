"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects, CATEGORIES, PROJECT_PACKS } from "@/lib/projects-data";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  FileText,
  Play,
  GraduationCap,
  Zap,
  Shield,
  BookOpen,
  Package,
  HelpCircle,
  Star,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";

const TRUST_ITEMS = [
  { icon: Code2, label: "30+ Projects", desc: "Production-ready source code" },
  { icon: BookOpen, label: "10+ Domains", desc: "AI, ML, Full Stack, Vision" },
  { icon: FileText, label: "Full Documentation", desc: "SRS, Architecture, PPTs" },
  { icon: Play, label: "Live Previews", desc: "Inspect before buying" },
  { icon: GraduationCap, label: "All Skill Levels", desc: "Beginner to Final Year" },
  { icon: Zap, label: "Instant Access", desc: "One-time payment, lifetime access" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse & Inspect",
    description: "Explore our catalog of 30+ curated project kits across AI, ML, Full Stack, and Cloud. Filter by tech or use case.",
  },
  {
    step: "02",
    title: "Preview Documentation",
    description: "Read detailed project abstracts, view architecture diagrams, and examine tech requirements at your own pace.",
  },
  {
    step: "03",
    title: "Direct & Secure Access",
    description: "Acquire full kits via Razorpay's secure checkout. No forced subscriptions or recurring surprise fees.",
  },
  {
    step: "04",
    title: "Build & Deploy",
    description: "Download complete source code, walk-through guides, and presentation slides to present or build for your portfolio.",
  },
];

const FEATURED_CATEGORIES = CATEGORIES.slice(0, 8);

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 6);

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        {/* ═══════════════════════════════════════ */}
        {/* ECOSYSTEM BANNER */}
        {/* ═══════════════════════════════════════ */}
        <div
          style={{
            background: "#eff6ff",
            borderBottom: "1px solid #dbeafe",
            padding: "0.6rem 1rem",
            textAlign: "center",
            fontSize: "0.84rem",
            color: "#1e40af",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: "700", background: "#dbeafe", color: "#1d4ed8", padding: "0.15rem 0.5rem", borderRadius: "9999px", fontSize: "0.72rem" }}>
            FUTUREAI ECOSYSTEM
          </span>
          <span>Looking for verified certification and guided mentorship?</span>
          <a
            href="https://futureee.me"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: "700",
              color: "#2563eb",
              textDecoration: "underline",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            Join Free AI/ML Internship <ExternalLink size={12} />
          </a>
        </div>

        {/* ═══════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ═══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            minHeight: "85vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            padding: "5rem 0 4rem",
            background: "linear-gradient(180deg, #ffffff 0%, #fafafb 100%)",
          }}
        >
          {/* Subtle geometric orbs */}
          <div className="orb orb-primary" style={{ top: "-120px", left: "-80px" }} />
          <div className="orb orb-accent" style={{ bottom: "-60px", right: "-40px" }} />

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "4rem",
                alignItems: "center",
              }}
              className="hero-grid"
            >
              {/* Left: Text */}
              <div>
                {/* Pill badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.85rem",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    color: "#2563eb",
                    fontWeight: "700",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Sparkles size={14} color="#2563eb" />
                  Production-Ready Project Kits for Students & Developers
                </div>

                <h1
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                    fontWeight: "900",
                    lineHeight: "1.12",
                    letterSpacing: "-0.03em",
                    marginBottom: "1.5rem",
                    color: "#0f172a",
                  }}
                >
                  Build Projects That Make Your{" "}
                  <span className="gradient-text">Resume Stand Out.</span>
                </h1>

                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.12rem)",
                    color: "#475569",
                    lineHeight: "1.7",
                    marginBottom: "2rem",
                    maxWidth: "540px",
                  }}
                >
                  Explore curated project kits in AI, Machine Learning, Full-Stack, Computer Vision, and Final-Year Engineering. Complete with source code, architecture diagrams, SRS reports, and presentation slides.
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                  <Link href="/projects" className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}>
                    Explore All Projects <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/final-year-projects"
                    className="btn-secondary"
                    style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}
                  >
                    <GraduationCap size={16} /> Final Year Kits
                  </Link>
                </div>

                {/* Quick stats */}
                <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", paddingTop: "1rem", borderTop: "1px solid #e2e8f0" }}>
                  {[
                    { num: "30+", label: "Complete Codebases" },
                    { num: "10+", label: "Tech Domains" },
                    { num: "₹299", label: "Starting Price" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "900",
                          color: "#0f172a",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {stat.num}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual card stack */}
              <div
                style={{
                  position: "relative",
                  height: "480px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="hero-visual"
              >
                {/* Main card */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 3,
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "20px",
                    padding: "1.5rem",
                    width: "320px",
                    boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.1), 0 0 20px rgba(37, 99, 235, 0.05)",
                  }}
                >
                  <div
                    style={{
                      height: "140px",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    🧠
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.6rem" }}>
                    <span className="badge badge-purple">Generative AI</span>
                    <span className="badge badge-blue">RAG</span>
                    <span className="badge badge-green">Production</span>
                  </div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.3rem" }}>
                    AI College Assistant
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1rem", lineHeight: "1.5" }}>
                    Multi-document RAG assistant with FAISS vector search and FastAPI
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      {["Python", "React", "FAISS"].map((t) => (
                        <span key={t} className="tech-badge" style={{ fontSize: "0.68rem" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontWeight: "900", color: "#0f172a", fontSize: "1.15rem" }}>₹2,499</span>
                  </div>
                </div>

                {/* Background floating card 1 */}
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "15px",
                    width: "220px",
                    zIndex: 2,
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.1rem",
                    boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.08)",
                    transform: "rotate(-5deg)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>🛡️</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>Fraud Detection</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>ML + Finance Pipeline</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#2563eb", marginTop: "0.5rem" }}>₹2,299</div>
                </div>

                {/* Background floating card 2 */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "35px",
                    right: "15px",
                    width: "210px",
                    zIndex: 2,
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.1rem",
                    boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.08)",
                    transform: "rotate(4deg)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>👁️</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>Traffic Flow AI</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Computer Vision + YOLO</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#2563eb", marginTop: "0.5rem" }}>₹2,499</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* TRUST SECTION */}
        {/* ═══════════════════════════════════════ */}
        <section
          style={{
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
            padding: "3rem 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "1.25rem",
              }}
              className="trust-grid"
            >
              {TRUST_ITEMS.map((item) => (
                <div key={item.label} className="trust-item">
                  <div className="trust-icon">
                    <item.icon size={22} />
                  </div>
                  <div style={{ fontWeight: "700", fontSize: "0.92rem", color: "#0f172a" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b", textAlign: "center" }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* FEATURED PROJECTS */}
        {/* ═══════════════════════════════════════ */}
        <section className="section">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <div className="section-label">Curated Project Kits</div>
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">
                  Tested and verified project kits across top engineering and tech domains
                </p>
              </div>
              <Link href="/projects" className="btn-secondary">
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>

            <div className="projects-grid">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* FINAL YEAR BANNER */}
        {/* ═══════════════════════════════════════ */}
        <section
          style={{
            background: "linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%)",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
            padding: "4.5rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="container" style={{ position: "relative", textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.75rem",
                background: "#fff7ed",
                border: "1px solid #ffedd5",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                color: "#c2410c",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              <GraduationCap size={15} />
              For B.Tech, M.Tech, BCA & MCA Students
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                fontWeight: "900",
                marginBottom: "1rem",
                color: "#0f172a",
              }}
            >
              Final Year Projects That Go{" "}
              <span className="gradient-text">Beyond Generic Templates</span>
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#475569",
                maxWidth: "640px",
                margin: "0 auto 2rem",
                lineHeight: "1.7",
              }}
            >
              Get production-grade project kits complete with IEEE-format documentation, PPT slides, viva preparation questions, architecture diagrams, and working demos.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/final-year-projects"
                className="btn-primary"
                style={{ padding: "0.875rem 2rem" }}
              >
                <GraduationCap size={16} /> Explore Final Year Kits
              </Link>
              <Link
                href="/project-packs"
                className="btn-secondary"
                style={{ padding: "0.875rem 2rem" }}
              >
                <Package size={16} /> Browse Project Packs
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* CATEGORIES */}
        {/* ═══════════════════════════════════════ */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="section-label">Browse by Domain</div>
              <h2 className="section-title">Explore Categories</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Filter by specialized technologies and industries to match your interests
              </p>
            </div>

            <div className="categories-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {FEATURED_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="category-card"
                  style={{
                    display: "block",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    transition: "all 0.2s",
                    textDecoration: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    "--hover-color": cat.color,
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "0.75rem",
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: `${cat.color}15`,
                      border: `1px solid ${cat.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "0.98rem",
                      fontWeight: "700",
                      color: "#0f172a",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: "1.5" }}>
                    {cat.description}
                  </p>
                  <div
                    style={{
                      marginTop: "0.75rem",
                      fontSize: "0.78rem",
                      color: cat.color,
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    Browse projects <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Link href="/categories" className="btn-secondary">
                View All Categories <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* HOW IT WORKS */}
        {/* ═══════════════════════════════════════ */}
        <section
          className="section"
          style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="section-label">Frictionless Process</div>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                Browse, evaluate, and acquire production code at your own speed
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2rem",
                position: "relative",
              }}
              className="how-it-works-grid"
            >
              {HOW_IT_WORKS.map((step) => (
                <div key={step.step} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      color: "#2563eb",
                      margin: "0 auto 1rem",
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: "1.6" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* WHAT'S INCLUDED */}
        {/* ═══════════════════════════════════════ */}
        <section
          className="section"
          style={{
            background: "#fafafb",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
                alignItems: "center",
              }}
              className="included-grid"
            >
              <div>
                <div className="section-label">Complete Learning Kits</div>
                <h2 className="section-title">Not Just Source Code</h2>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#475569",
                    lineHeight: "1.7",
                    marginBottom: "2rem",
                  }}
                >
                  Every kit includes everything you need to run, understand, customize, document, and defend your project confidently in front of any faculty or recruiter panel.
                </p>
                <Link href="/how-it-works" className="btn-primary">
                  Learn More About Kits <ArrowRight size={16} />
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.85rem",
                }}
              >
                {[
                  { icon: "💻", label: "Complete Source Code", desc: "Clean, documented, production-ready" },
                  { icon: "📄", label: "Full Documentation", desc: "Abstract, SRS, and IEEE style report" },
                  { icon: "📊", label: "Presentation Slides", desc: "Professional, customizable PPTs" },
                  { icon: "🎥", label: "Video Walkthrough", desc: "Feature-by-feature explanation" },
                  { icon: "🔧", label: "Setup & Run Guide", desc: "Step-by-step local install steps" },
                  { icon: "🎓", label: "Viva Questions", desc: "Curated Q&A for project defense" },
                  { icon: "📐", label: "Architecture Diagrams", desc: "UML, ER, and pipeline schematics" },
                  { icon: "💼", label: "Resume Bullet Points", desc: "High-impact portfolio descriptions" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "1rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                    }}
                  >
                    <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>{item.icon}</div>
                    <div style={{ fontSize: "0.82rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.2rem" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.74rem", color: "#64748b" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* CROSS-LINK CTA TO MAIN INTERNSHIP */}
        {/* ═══════════════════════════════════════ */}
        <section className="section" style={{ background: "#ffffff" }}>
          <div className="container">
            <div
              style={{
                textAlign: "center",
                background: "linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)",
                border: "1px solid #bfdbfe",
                borderRadius: "24px",
                padding: "4rem 2rem",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px -10px rgba(37, 99, 235, 0.15)",
              }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", background: "#ffffff", borderRadius: "9999px", fontSize: "0.78rem", fontWeight: "700", color: "#2563eb", marginBottom: "1rem", border: "1px solid #bfdbfe" }}>
                <span>✦</span> COMPLEMENT WITH AN INTERNSHIP
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: "900",
                  marginBottom: "1rem",
                  color: "#0f172a",
                }}
              >
                Boost Your Career with FutureAI Free Internships
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#334155",
                  maxWidth: "560px",
                  margin: "0 auto 2rem",
                  lineHeight: "1.65",
                }}
              >
                Work through structured AI/ML modules, submit coding tasks, and earn verifiable certificates and signed recommendation letters. 100% free to participate.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://futureee.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}
                >
                  Join Free Internship <ArrowUpRight size={16} />
                </a>
                <Link href="/projects" className="btn-secondary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}>
                  Browse More Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
