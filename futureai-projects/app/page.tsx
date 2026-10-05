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
} from "lucide-react";

const TRUST_ITEMS = [
  { icon: Code2, label: "30+ Projects", desc: "Real, complete codebases" },
  { icon: BookOpen, label: "10+ Domains", desc: "AI, ML, Full Stack & more" },
  { icon: FileText, label: "Full Documentation", desc: "Abstracts, SRS, PPTs" },
  { icon: Play, label: "Live Demos", desc: "See before you buy" },
  { icon: GraduationCap, label: "Beginner to Advanced", desc: "For every skill level" },
  { icon: Zap, label: "Lifetime Access", desc: "Download anytime" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse & Discover",
    description: "Explore our catalog of 30+ curated project kits across AI, ML, Full Stack, and more. Filter by technology, difficulty, or use case.",
  },
  {
    step: "02",
    title: "Preview & Evaluate",
    description: "Read detailed project descriptions, view architecture diagrams, explore feature lists, and preview documentation before buying.",
  },
  {
    step: "03",
    title: "Purchase Securely",
    description: "Buy with confidence using Razorpay's secure payment gateway. Your purchase is protected with a satisfaction guarantee.",
  },
  {
    step: "04",
    title: "Access & Learn",
    description: "Instantly access your purchased project from your dashboard. Download source code, read documentation, watch explanations, and learn.",
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
        {/* HERO SECTION */}
        {/* ═══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            padding: "6rem 0 4rem",
          }}
        >
          {/* Background orbs */}
          <div
            className="orb orb-primary"
            style={{ top: "-100px", left: "-100px", opacity: 0.25 }}
          />
          <div
            className="orb orb-accent"
            style={{ bottom: "0", right: "-50px", opacity: 0.2 }}
          />
          {/* Grid pattern overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
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
                    padding: "0.3rem 0.75rem",
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    color: "#9f67ff",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Star size={12} fill="#9f67ff" />
                  Production-Ready Project Kits
                </div>

                <h1
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                    fontWeight: "900",
                    lineHeight: "1.1",
                    letterSpacing: "-0.03em",
                    marginBottom: "1.5rem",
                  }}
                >
                  Build Projects That Make Your{" "}
                  <span className="gradient-text">Resume Stand Out.</span>
                </h1>

                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.15rem)",
                    color: "var(--muted-light)",
                    lineHeight: "1.7",
                    marginBottom: "2rem",
                    maxWidth: "520px",
                  }}
                >
                  Explore AI, Machine Learning, Full-Stack, Data Science, Cybersecurity, Cloud, and
                  Final-Year project kits with complete source code, documentation, demos, and learning
                  resources.
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                  <Link href="/projects" className="btn-primary" style={{ padding: "0.875rem 2rem" }}>
                    Explore Projects <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/final-year-projects"
                    className="btn-secondary"
                    style={{ padding: "0.875rem 2rem" }}
                  >
                    <GraduationCap size={16} /> Final Year Projects
                  </Link>
                </div>

                {/* Quick stats */}
                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                  {[
                    { num: "30+", label: "Projects" },
                    { num: "10+", label: "Tech Domains" },
                    { num: "₹299", label: "Starting from" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "800",
                          background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {stat.num}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{stat.label}</div>
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
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "20px",
                    padding: "1.5rem",
                    width: "300px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.1)",
                  }}
                >
                  <div
                    style={{
                      height: "140px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    🧠
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <span className="badge badge-purple">Generative AI</span>
                    <span className="badge badge-cyan">RAG</span>
                    <span className="badge badge-red">Advanced</span>
                  </div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#f8fafc", marginBottom: "0.3rem" }}>
                    AI College Assistant
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.75rem" }}>
                    RAG-powered academic assistant with vector search
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      {["Python", "React", "FAISS"].map((t) => (
                        <span key={t} className="tech-badge" style={{ fontSize: "0.65rem" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontWeight: "800", color: "#f8fafc", fontSize: "1.1rem" }}>₹2,499</span>
                  </div>
                </div>

                {/* Background floating card 1 */}
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "20px",
                    width: "220px",
                    zIndex: 2,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1rem",
                    opacity: 0.8,
                    transform: "rotate(-5deg)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🛡️</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#f8fafc" }}>Fraud Detection</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>ML + Finance</div>
                  <div style={{ fontSize: "1rem", fontWeight: "800", color: "#f8fafc", marginTop: "0.5rem" }}>₹2,299</div>
                </div>

                {/* Background floating card 2 */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    right: "10px",
                    width: "200px",
                    zIndex: 2,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1rem",
                    opacity: 0.75,
                    transform: "rotate(4deg)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>👁️</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#f8fafc" }}>Traffic Monitor</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>Computer Vision</div>
                  <div style={{ fontSize: "1rem", fontWeight: "800", color: "#f8fafc", marginTop: "0.5rem" }}>₹2,499</div>
                </div>

                {/* Tech badges floating */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    zIndex: 4,
                  }}
                >
                  {["Python", "LangChain", "YOLO", "FastAPI"].map((tech) => (
                    <div
                      key={tech}
                      style={{
                        padding: "0.25rem 0.6rem",
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.3)",
                        borderRadius: "6px",
                        fontSize: "0.7rem",
                        color: "#9f67ff",
                        fontWeight: "600",
                      }}
                    >
                      {tech}
                    </div>
                  ))}
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
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "3rem 0",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "1rem",
              }}
              className="trust-grid"
            >
              {TRUST_ITEMS.map((item) => (
                <div key={item.label} className="trust-item">
                  <div className="trust-icon">
                    <item.icon size={22} />
                  </div>
                  <div style={{ fontWeight: "700", fontSize: "0.9rem", color: "#f8fafc" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--muted)", textAlign: "center" }}>
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
                <div className="section-label">Curated Picks</div>
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">
                  Hand-picked projects across the most in-demand technology domains
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
        {/* FINAL YEAR CTA */}
        {/* ═══════════════════════════════════════ */}
        <section
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.1) 100%)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderLeft: "none",
            borderRight: "none",
            padding: "4rem 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="orb orb-primary" style={{ top: "-200px", right: "-100px", opacity: 0.15 }} />
          <div className="container" style={{ position: "relative", textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.75rem",
                background: "rgba(249,115,22,0.15)",
                border: "1px solid rgba(249,115,22,0.3)",
                borderRadius: "20px",
                fontSize: "0.8rem",
                color: "#fb923c",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              <GraduationCap size={14} />
              Engineering Students
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: "900",
                marginBottom: "1rem",
              }}
            >
              Final Year Projects That Go{" "}
              <span className="gradient-text">Beyond Basic CRUD</span>
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--muted-light)",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                lineHeight: "1.7",
              }}
            >
              10 advanced final year project kits with complete documentation, PPTs, viva prep,
              architecture diagrams, and everything your committee expects — and more.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/final-year-projects"
                className="btn-primary"
                style={{ padding: "0.875rem 2rem" }}
              >
                <GraduationCap size={16} /> Explore Final Year Projects
              </Link>
              <Link
                href="/project-packs"
                className="btn-secondary"
                style={{ padding: "0.875rem 2rem" }}
              >
                <Package size={16} /> View Project Packs
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
                From beginner ML projects to advanced agentic AI — find the right domain for your goals
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
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    transition: "all 0.2s",
                    textDecoration: "none",
                    cursor: "pointer",
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
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      color: "#f8fafc",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: "1.5" }}>
                    {cat.description}
                  </p>
                  <div
                    style={{
                      marginTop: "0.75rem",
                      fontSize: "0.75rem",
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
          style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="section-label">Simple Process</div>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle" style={{ margin: "0 auto" }}>
                From discovery to learning — your complete project journey in 4 steps
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
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      color: "#fff",
                      margin: "0 auto 1rem",
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#f8fafc", marginBottom: "0.5rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: "1.6" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* PROJECT PACKS PREVIEW */}
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
                <div className="section-label">Bundle & Save</div>
                <h2 className="section-title">Project Packs</h2>
                <p className="section-subtitle">Multiple projects bundled together for comprehensive learning</p>
              </div>
              <Link href="/project-packs" className="btn-secondary">
                View All Packs <ArrowRight size={16} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {PROJECT_PACKS.slice(0, 4).map((pack, i) => (
                <div
                  key={pack.id}
                  style={{
                    background: "var(--card)",
                    border: i === 1 ? "1px solid var(--primary)" : "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    position: "relative",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  {pack.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "1rem",
                        padding: "0.2rem 0.75rem",
                        background: i === 2 ? "var(--primary)" : "var(--accent)",
                        borderRadius: "20px",
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      {pack.badge}
                    </div>
                  )}
                  <Package
                    size={28}
                    style={{
                      color: i === 1 ? "var(--primary-light)" : "var(--muted)",
                      marginBottom: "0.75rem",
                    }}
                  />
                  <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#f8fafc", marginBottom: "0.5rem" }}>
                    {pack.name}
                  </h3>
                  <p style={{ fontSize: "0.83rem", color: "var(--muted)", marginBottom: "1rem", lineHeight: "1.5" }}>
                    {pack.description}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {pack.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted-light)" }}>
                        <CheckCircle size={13} color="#10b981" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Starting at </span>
                      <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "#f8fafc" }}>
                        ₹{pack.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Link
                      href={`/project-packs#${pack.id}`}
                      className="btn-primary"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                    >
                      View Pack
                    </Link>
                  </div>
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
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
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
                <div className="section-label">Complete Kits</div>
                <h2 className="section-title">Not Just Source Code</h2>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--muted-light)",
                    lineHeight: "1.7",
                    marginBottom: "2rem",
                  }}
                >
                  Every project kit is a complete learning package — everything you need to understand,
                  run, customize, document, and present your project.
                </p>
                <Link href="/how-it-works" className="btn-primary">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                {[
                  { icon: "💻", label: "Complete Source Code", desc: "Frontend, Backend, Database" },
                  { icon: "📄", label: "Full Documentation", desc: "Abstract, SRS, Architecture" },
                  { icon: "📊", label: "Presentation", desc: "Professional PPT slides" },
                  { icon: "🎥", label: "Demo Video", desc: "Working demonstration" },
                  { icon: "🔧", label: "Installation Guide", desc: "Step-by-step setup" },
                  { icon: "🎓", label: "Viva Preparation", desc: "Questions & model answers" },
                  { icon: "📐", label: "Architecture Diagrams", desc: "UML, ER, Flow diagrams" },
                  { icon: "💼", label: "Portfolio Support", desc: "LinkedIn & GitHub writeups" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "1rem",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>{item.icon}</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#f8fafc", marginBottom: "0.2rem" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* FINAL CTA */}
        {/* ═══════════════════════════════════════ */}
        <section className="section">
          <div className="container">
            <div
              style={{
                textAlign: "center",
                background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))",
                border: "1px solid rgba(124,58,237,0.25)",
                borderRadius: "24px",
                padding: "4rem 2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="orb orb-primary" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)", opacity: 0.2 }} />
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: "900",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                Ready to Build Something{" "}
                <span className="gradient-text">Impressive?</span>
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--muted-light)",
                  maxWidth: "500px",
                  margin: "0 auto 2rem",
                  position: "relative",
                }}
              >
                Join students already building AI-powered projects that get noticed by top recruiters.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  position: "relative",
                }}
              >
                <Link href="/projects" className="btn-primary" style={{ padding: "0.875rem 2rem" }}>
                  Explore All Projects <ArrowRight size={16} />
                </Link>
                <Link href="/final-year-projects" className="btn-secondary" style={{ padding: "0.875rem 2rem" }}>
                  <GraduationCap size={16} /> Final Year Projects
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
