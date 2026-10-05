"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/types";
import { generateProjectKit } from "@/lib/project-kits-data";
import {
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Code2,
  FileText,
  BookOpen,
  Package,
  Star,
  Shield,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Terminal,
  Database,
  FolderTree,
  Award,
} from "lucide-react";

interface Props {
  project: Project;
  related: Project[];
}

const TABS = ["Overview", "Features", "Tech Stack", "What's Included", "Learning Outcomes", "FAQ"];

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI & Machine Learning",
  "generative-ai": "Generative AI",
  "ai-agents": "AI Agents",
  "full-stack": "Full Stack",
  "data-science": "Data Science",
  "computer-vision": "Computer Vision",
  cybersecurity: "Cybersecurity",
  "cloud-devops": "Cloud & DevOps",
  mobile: "Mobile",
  "final-year": "Final Year",
};

export default function ProjectDetailClient({ project, related }: Props) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState<"abstract" | "arch" | "viva" | "tree" | "resume">("abstract");
  const router = useRouter();

  const kit = generateProjectKit(project);

  const handleBuy = async () => {
    if (!auth.currentUser) {
      alert("Please log in to purchase projects.");
      router.push(`/auth/login?redirect=/projects/${project.slug}`);
      return;
    }

    if (typeof window === "undefined" || !(window as any).Razorpay) {
      alert("Payment gateway is initializing. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);
    try {
      const user = auth.currentUser;
      const amountInPaise = project.price * 100;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TkH9L20mqBOzQU",
        amount: amountInPaise.toString(),
        currency: "INR",
        name: "FutureAI Projects",
        description: project.title,
        image: "/favicon.svg",
        handler: async function (response: any) {
          try {
            const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
            const orderDocId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
            const entitlementId = `${user.uid}_${project.id}`;

            // Save order to Firestore
            await setDoc(doc(db, "projects_marketplace/data/orders", orderDocId), {
              userId: user.uid,
              userEmail: user.email || "",
              projectId: project.id,
              projectTitle: project.title,
              amount: project.price,
              currency: "INR",
              status: "paid",
              razorpayPaymentId: paymentId,
              createdAt: serverTimestamp(),
            });

            // Grant entitlement to the user
            await setDoc(doc(db, "projects_marketplace/data/entitlements", entitlementId), {
              userId: user.uid,
              userEmail: user.email || "",
              projectId: project.id,
              projectTitle: project.title,
              orderId: orderDocId,
              razorpayPaymentId: paymentId,
              downloadCount: 0,
              createdAt: serverTimestamp(),
            });

            alert("Payment successful! You now have access to this project kit.");
            router.push("/dashboard");
          } catch (error) {
            console.error("Payment recorded, error navigating:", error);
            router.push("/dashboard");
          }
        },
        prefill: {
          email: user.email || "",
          name: user.displayName || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error(response.error);
        alert("Payment failed: " + (response.error?.description || "Transaction cancelled"));
      });
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to initiate checkout. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        {/* ═══════════════════════════════════════ */}
        {/* HERO */}
        {/* ═══════════════════════════════════════ */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 100%)",
            borderBottom: "1px solid var(--border)",
            padding: "3rem 0",
          }}
        >
          <div className="container">
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
              <a href="/projects" style={{ color: "var(--muted)", textDecoration: "none" }}>Projects</a>
              <span>/</span>
              <a href={`/categories/${project.category}`} style={{ color: "var(--muted)", textDecoration: "none" }}>
                {CATEGORY_LABELS[project.category] || project.category}
              </a>
              <span>/</span>
              <span style={{ color: "var(--muted-light)" }}>{project.title.slice(0, 40)}...</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 360px",
                gap: "3rem",
                alignItems: "start",
              }}
              className="detail-grid"
            >
              {/* Left: Project info */}
              <div>
                {/* Badges */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.7rem",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    {CATEGORY_LABELS[project.category]}
                  </span>
                  {project.isFinalYear && (
                    <span
                      style={{
                        padding: "0.25rem 0.7rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        background: "#fff7ed",
                        color: "#c2410c",
                        border: "1px solid #ffedd5",
                      }}
                    >
                      🎓 Final Year
                    </span>
                  )}
                  <span
                    style={{
                      padding: "0.25rem 0.7rem",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color:
                        project.difficulty === "Advanced"
                          ? "#dc2626"
                          : project.difficulty === "Intermediate"
                          ? "#d97706"
                          : "#16a34a",
                      background:
                        project.difficulty === "Advanced"
                          ? "#fef2f2"
                          : project.difficulty === "Intermediate"
                          ? "#fefce8"
                          : "#f0fdf4",
                    }}
                  >
                    {project.difficulty}
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                    fontWeight: "900",
                    lineHeight: "1.2",
                    marginBottom: "1rem",
                    color: "#0f172a",
                  }}
                >
                  {project.title}
                </h1>

                <p style={{ fontSize: "1.05rem", color: "var(--muted-light)", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Quick stats */}
                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>Tier</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>{project.tier}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>License</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>{project.licenseType}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>Includes</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>
                      {project.includes.length} items
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.2rem" }}>Modules</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>
                      {project.modules.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Purchase card */}
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  position: "sticky",
                  top: "80px",
                  boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.08)",
                }}
                className="purchase-card"
              >
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span style={{ fontSize: "2.25rem", fontWeight: "900", color: "#0f172a" }}>
                      ₹{project.price.toLocaleString("en-IN")}
                    </span>
                    {project.originalPrice && (
                      <span style={{ fontSize: "1rem", color: "var(--muted)", textDecoration: "line-through" }}>
                        ₹{project.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>One-time purchase • Lifetime access</div>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "0.875rem", marginBottom: "0.75rem", fontSize: "1rem", opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? "not-allowed" : "pointer" }}
                  id={`buy-${project.slug}`}
                >
                  {isProcessing ? "Processing..." : "Buy Project Kit"}
                </button>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "0.75rem" }}
                  >
                    <Play size={16} /> View Live Demo
                  </a>
                )}

                <div style={{ marginTop: "1.25rem", padding: "1rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                    This kit includes:
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {project.includes.slice(0, 6).map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.78rem",
                          color: "var(--muted-light)",
                        }}
                      >
                        <CheckCircle size={12} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                        {item}
                      </li>
                    ))}
                    {project.includes.length > 6 && (
                      <li style={{ fontSize: "0.75rem", color: "var(--muted)", paddingLeft: "1.25rem" }}>
                        +{project.includes.length - 6} more items
                      </li>
                    )}
                  </ul>
                </div>

                {/* Trust signals */}
                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    { icon: Shield, text: "Secure payment via Razorpay" },
                    { icon: Download, text: "Instant access after purchase" },
                    { icon: BookOpen, text: "Educational license included" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--muted)" }}
                    >
                      <item.icon size={13} color="#7C3AED" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════ */}
        {/* TABS SECTION */}
        {/* ═══════════════════════════════════════ */}
        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              gap: "0",
              borderBottom: "1px solid var(--border)",
              marginBottom: "2rem",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: activeTab === tab ? "#2563eb" : "#64748b",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid #2563eb" : "2px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                  marginBottom: "-1px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: "3rem",
              alignItems: "start",
            }}
            className="content-grid"
          >
            {/* Tab content */}
            <div>
              {activeTab === "Overview" && (
                <div>
                  <h2 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>About This Project</h2>
                  <div
                    style={{
                      color: "var(--muted-light)",
                      lineHeight: "1.8",
                      fontSize: "0.95rem",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {project.fullDescription}
                  </div>

                  {project.modules.length > 0 && (
                    <>
                      <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.15rem" }}>Project Modules</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {project.modules.map((mod, i) => (
                          <div
                            key={mod.name}
                            style={{
                              padding: "1rem 1.25rem",
                              background: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "12px",
                              display: "flex",
                              gap: "1rem",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "8px",
                                background: "rgba(124,58,237,0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                color: "#2563eb",
                                flexShrink: 0,
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <div>
                              <div style={{ fontWeight: "700", fontSize: "0.9rem", color: "#0f172a", marginBottom: "0.2rem" }}>
                                {mod.name}
                              </div>
                              <div style={{ fontSize: "0.83rem", color: "var(--muted)" }}>{mod.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "Features" && (
                <div>
                  <h2 style={{ marginBottom: "1.25rem", fontSize: "1.4rem" }}>Key Features</h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                    }}
                    className="features-grid"
                  >
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          padding: "1rem",
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "12px",
                        }}
                      >
                        <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontSize: "0.875rem", color: "var(--muted-light)" }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Tech Stack" && (
                <div>
                  <h2 style={{ marginBottom: "1.25rem", fontSize: "1.4rem" }}>Technology Stack</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {Object.entries(project.techStack).map(([key, techs]) => {
                      if (!techs || techs.length === 0) return null;
                      const labels: Record<string, string> = {
                        frontend: "Frontend",
                        backend: "Backend",
                        database: "Database",
                        aiml: "AI / ML",
                        apis: "APIs & Services",
                        deployment: "Deployment",
                      };
                      return (
                        <div key={key}>
                          <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                            {labels[key] || key}
                          </h4>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {techs.map((tech: string) => (
                              <span
                                key={tech}
                                style={{
                                  padding: "0.4rem 0.875rem",
                                  background: "rgba(124,58,237,0.1)",
                                  border: "1px solid rgba(124,58,237,0.25)",
                                  borderRadius: "8px",
                                  fontSize: "0.85rem",
                                  fontWeight: "600",
                                  color: "#9f67ff",
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "What's Included" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "20px", backgroundColor: "#ede9fe", color: "#6d28d9" }}>
                        Guaranteed Complete Kit
                      </span>
                    </div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a" }}>
                      Everything Included In This Project
                    </h2>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                      Every purchase unlocks all 13 promised academic, code, and career assets ready for immediate download.
                    </p>
                  </div>

                  {/* Checklist of deliverables */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                    {project.includes.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          padding: "0.75rem 0.9rem",
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          fontSize: "0.85rem",
                          color: "#334155",
                        }}
                      >
                        <CheckCircle size={15} color="#16a34a" style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: "500" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Transparent "What's in the Box" Preview Box */}
                  <div style={{ border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", backgroundColor: "#ffffff" }}>
                    <div
                      style={{
                        padding: "1rem 1.25rem",
                        backgroundColor: "#f8fafc",
                        borderBottom: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Sparkles size={16} color="#7c3aed" />
                        <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>
                          Transparent Quality Preview (What You Get)
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                        {[
                          { id: "abstract", label: "IEEE Abstract" },
                          { id: "arch", label: "Architecture" },
                          { id: "viva", label: "Viva Q&A" },
                          { id: "tree", label: "Code Tree" },
                          { id: "resume", label: "Resume Bullets" },
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setPreviewMode(m.id as any)}
                            style={{
                              padding: "0.3rem 0.65rem",
                              fontSize: "0.75rem",
                              borderRadius: "6px",
                              fontWeight: previewMode === m.id ? "700" : "500",
                              backgroundColor: previewMode === m.id ? "#7c3aed" : "transparent",
                              color: previewMode === m.id ? "#ffffff" : "#64748b",
                              border: previewMode === m.id ? "1px solid #7c3aed" : "1px solid #e2e8f0",
                              cursor: "pointer",
                            }}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ padding: "1.25rem" }}>
                      {previewMode === "abstract" && (
                        <div>
                          <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#7c3aed", marginBottom: "0.3rem" }}>
                            Sample Project Synopsis & Abstract
                          </div>
                          <p style={{ fontSize: "0.85rem", color: "#334155", lineHeight: "1.7", whiteSpace: "pre-line" }}>
                            {kit.abstract}
                          </p>
                        </div>
                      )}

                      {previewMode === "arch" && (
                        <div>
                          <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#7c3aed", marginBottom: "0.3rem" }}>
                            Component Blueprint & Data Flow (Mermaid Specification)
                          </div>
                          <pre style={{ backgroundColor: "#020617", color: "#38bdf8", padding: "1rem", borderRadius: "8px", fontSize: "0.75rem", lineHeight: "1.6", margin: 0, overflowX: "auto" }}>
                            {kit.architectureDiagrams.systemArchitecture}
                          </pre>
                        </div>
                      )}

                      {previewMode === "viva" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#7c3aed" }}>
                            Sample Viva Voce Questions & Evaluation Tips (Top 3 of 25)
                          </div>
                          {kit.vivaQuestions.slice(0, 3).map((q) => (
                            <div key={q.id} style={{ padding: "0.75rem 1rem", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                              <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>
                                Q{q.id}. {q.question}
                              </div>
                              <p style={{ fontSize: "0.82rem", color: "#334155", marginTop: "0.3rem", lineHeight: "1.6" }}>
                                <strong>Answer:</strong> {q.answer}
                              </p>
                              <div style={{ fontSize: "0.75rem", color: "#92400e", marginTop: "0.3rem", fontStyle: "italic" }}>
                                💡 Tip: {q.examinerTip}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {previewMode === "tree" && (
                        <div>
                          <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#7c3aed", marginBottom: "0.3rem" }}>
                            Source Code Directory Tree
                          </div>
                          <pre style={{ backgroundColor: "#020617", color: "#94a3b8", padding: "1rem", borderRadius: "8px", fontSize: "0.75rem", lineHeight: "1.6", margin: 0, overflowX: "auto" }}>
                            {kit.codeWalkthrough}
                          </pre>
                        </div>
                      )}

                      {previewMode === "resume" && (
                        <div>
                          <div style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#7c3aed", marginBottom: "0.5rem" }}>
                            ATS Resume Bullets Included
                          </div>
                          <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem", paddingLeft: "1.2rem", margin: 0 }}>
                            {kit.resumeBullets.map((b, idx) => (
                              <li key={idx} style={{ fontSize: "0.85rem", color: "#334155", lineHeight: "1.6" }}>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "0.75rem 1.25rem", backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        Instant full download unlocked immediately on checkout.
                      </span>
                      <button
                        onClick={handleBuy}
                        style={{
                          padding: "0.45rem 1rem",
                          backgroundColor: "#7c3aed",
                          color: "#ffffff",
                          borderRadius: "8px",
                          fontWeight: "700",
                          fontSize: "0.8rem",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Buy Kit & Download (₹{project.price})
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Learning Outcomes" && (
                <div>
                  <h2 style={{ marginBottom: "0.5rem", fontSize: "1.4rem" }}>Learning Outcomes</h2>
                  <p style={{ color: "var(--muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                    After completing this project, you will understand and be able to:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {project.learningOutcomes.map((outcome, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          padding: "1rem",
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: "rgba(124,58,237,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                            fontWeight: "800",
                            color: "#9f67ff",
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span style={{ fontSize: "0.9rem", color: "var(--muted-light)" }}>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {project.requirements.length > 0 && (
                    <>
                      <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.1rem" }}>Requirements</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {project.requirements.map((req) => (
                          <div
                            key={req}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontSize: "0.875rem",
                              color: "var(--muted-light)",
                            }}
                          >
                            <span style={{ color: "#fbbf24" }}>•</span> {req}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "FAQ" && (
                <div>
                  <h2 style={{ marginBottom: "1.25rem", fontSize: "1.4rem" }}>Frequently Asked Questions</h2>
                  {project.faqs && project.faqs.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {project.faqs.map((faq, i) => (
                        <div
                          key={i}
                          style={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            overflow: "hidden",
                          }}
                        >
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem 1.25rem",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#0f172a",
                              fontWeight: "600",
                              fontSize: "0.9rem",
                              textAlign: "left",
                              gap: "1rem",
                            }}
                          >
                            {faq.question}
                            {openFaq === i ? <ChevronUp size={16} color="var(--muted)" /> : <ChevronDown size={16} color="var(--muted)" />}
                          </button>
                          {openFaq === i && (
                            <div
                              style={{
                                padding: "0 1.25rem 1rem",
                                fontSize: "0.875rem",
                                color: "var(--muted-light)",
                                lineHeight: "1.7",
                              }}
                            >
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {[
                        {
                          q: "Can I use this for my college project?",
                          a: "Yes, this project kit is designed for educational purposes. You should understand, learn from, and appropriately customize it for your needs, in accordance with your institution's policies.",
                        },
                        {
                          q: "Do I need prior experience to use this project?",
                          a: `This is a ${project.difficulty} level project. ${project.requirements.join(", ")} are required.`,
                        },
                        {
                          q: "Can I get support if I face installation issues?",
                          a: "Yes, email support@futureee.me with your order ID and we'll help you get set up.",
                        },
                        {
                          q: "Is there a refund policy?",
                          a: "Please review our Refund Policy. Digital products are generally non-refundable after download, but we review cases individually.",
                        },
                      ].map((faq, i) => (
                        <div
                          key={i}
                          style={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            overflow: "hidden",
                          }}
                        >
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "1rem 1.25rem",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#0f172a",
                              fontWeight: "600",
                              fontSize: "0.9rem",
                              textAlign: "left",
                              gap: "1rem",
                            }}
                          >
                            {faq.q}
                            {openFaq === i ? <ChevronUp size={16} color="var(--muted)" /> : <ChevronDown size={16} color="var(--muted)" />}
                          </button>
                          {openFaq === i && (
                            <div style={{ padding: "0 1.25rem 1rem", fontSize: "0.875rem", color: "var(--muted-light)", lineHeight: "1.7" }}>
                              {faq.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sticky sidebar (desktop) */}
            <div
              className="detail-sidebar"
              style={{
                position: "sticky",
                top: "80px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Mini buy card */}
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div style={{ fontSize: "1.75rem", fontWeight: "900", color: "#0f172a", marginBottom: "0.25rem" }}>
                  ₹{project.price.toLocaleString("en-IN")}
                </div>
                <button
                  onClick={handleBuy}
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginBottom: "0.5rem", opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? "not-allowed" : "pointer" }}
                >
                  {isProcessing ? "Processing..." : "Buy Project Kit"}
                </button>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="btn-secondary"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.4rem" }}
                  >
                    <Play size={14} /> Live Demo
                  </a>
                )}
              </div>

              {/* Tags */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "1.25rem",
                }}
              >
                <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--muted)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Tags
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section
            style={{
              padding: "3rem 0",
              background: "var(--surface)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="container">
              <h2 style={{ marginBottom: "1.5rem", fontSize: "1.4rem" }}>Related Projects</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {related.map((p) => (
                  <ProjectCard key={p.id} project={p} compact />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .purchase-card { position: static !important; }
          .content-grid { grid-template-columns: 1fr !important; }
          .detail-sidebar { display: none !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
