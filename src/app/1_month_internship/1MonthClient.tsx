"use client";

import Link from "next/link";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import {
  CheckCircle2,
  Code2,
  Brain,
  ChevronDown,
  Sparkles,
  Calendar,
  Layers,
  FileText,
  Shield,
  Zap,
  Award,
  ArrowRight
} from "lucide-react";

export default function SummerInternshipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const summerCurriculum = [
    {
      week: "Week 01",
      title: "AI/ML Engineering Core & Foundations",
      theme: "Data Science Pipelines & Mathematical Regression Models",
      icon: <Code2 size={24} />,
      color: "#2563eb",
      bg: "#eff6ff",
      lessons: [
        "Lesson 1.1: Virtual Environments (Conda/vEnv) & Reproducible Dependency Setup",
        "Lesson 1.2: The Vectorization Paradigm: Compiling NumPy arrays directly in C to bypass Python's GIL",
        "Lesson 1.3: Advanced Pandas: Median vs. KNN Data Imputation & Outlier Removal",
        "Lesson 1.4: One-Hot Categorical Encoding & Feature Engineering Matrix Operations",
        "Lesson 1.5: Linear Models: MSE Cost functions, Gradient Descent mechanics, Lasso (L1) & Ridge (L2) Regularizations",
        "Lesson 1.6: Classification Metrics: Confusion Matrix, Precision, Recall, F1 & ROC-AUC Optimization"
      ],
      project: "Project 1: Algorithmic Credit Risk Model using ElasticNet combined with SMOTE for default probability forecasting."
    },
    {
      week: "Week 02",
      title: "Deep Learning & Neural Architectures",
      theme: "Representation Learning, PyTorch Pipelines & Spatial Vision",
      icon: <Brain size={24} />,
      color: "#4f46e5",
      bg: "#eef2ff",
      lessons: [
        "Lesson 2.1: Z = X*W + b: Tensor mathematical products & Activation Functions (Sigmoid/ReLU)",
        "Lesson 2.2: Backpropagation Calculus: Chain Rule derivatives & Mitigating Vanishing/Exploding Gradients",
        "Lesson 2.3: Optimization Paradigms: SGD momentum and Adaptive Moment Estimation (Adam velocity/friction)",
        "Lesson 2.4: Subclassing torch.utils.data.Dataset and asynchronous DataLoader GPU pipeline batching",
        "Lesson 2.5: Spatial convolutions: Hierarchical CNN visual filters (edges, textures, shapes)",
        "Lesson 2.6: Transfer Learning: Freezing convolution layers in pre-trained ResNet-50 models"
      ],
      project: "Project 2: Microscopic Wafer Defect Detector using custom ResNet-50 pipelines and heavy OpenCV transformations."
    },
    {
      week: "Week 03",
      title: "Advanced Generative AI & Large Language Models",
      theme: "Transformers, Self-Attention & Enterprise Retrieval-Augmented Generation",
      icon: <Sparkles size={24} />,
      color: "#7c3aed",
      bg: "#f5f3ff",
      lessons: [
        "Lesson 3.1: Attention is All You Need: Query, Key, and Value matrix multiplication dynamics",
        "Lesson 3.2: Self-Attention vs. Recurrent architectures: Contextual semantic associations",
        "Lesson 3.3: LLM Lifecycle: Massive pre-training (next-token prediction), SFT alignment, and RLHF",
        "Lesson 3.4: RAG Foundations: Vectorizing text chunks (1536 float dimensions) using embedding networks",
        "Lesson 3.5: Vector Databases: Upserting, querying, and managing Pinecone/Milvus database indices",
        "Lesson 3.6: Multi-document context prompt injection frameworks and prompt engineering"
      ],
      project: "Project 3: Enterprise Legal Contract Chatbot built with LangChain, Pinecone, OpenAI Embeddings, and FastAPI."
    },
    {
      week: "Week 04",
      title: "Enterprise MLOps & Capstone Deployment",
      theme: "Model Compilations, Multi-stage Containers, XAI Auditing & CI/CD",
      icon: <Layers size={24} />,
      color: "#059669",
      bg: "#f0fdf4",
      lessons: [
        "Lesson 4.1: Weight optimization: Quantizing PyTorch nodes and converting weights to ONNX format",
        "Lesson 4.2: Production containerization: Multi-stage Dockerfiles designed for lightweight runtime nodes",
        "Lesson 4.3: Async REST Interfaces: Non-blocking FastAPI routers & background inference job queuing (Celery/Redis)",
        "Lesson 4.4: Horizontal scaling concepts: Replica sets, Load Balancers, and Kubernetes auto-scalers",
        "Lesson 4.5: Explainable AI (XAI): Probing model parameters using cooperative Game Theory (SHAP summaries)",
        "Lesson 4.6: Algorithmic Bias & Safety: Mitigating feedback loops, GDPR privacy, and EU AI Act Risk Tiers"
      ],
      project: "Capstone Project: Production-grade End-to-End MLOps Pipeline featuring GitHub Actions CI/CD to Google Cloud Run and a live SHAP user-diagnostics dashboard."
    }
  ];

  const summerFaqs = [
    {
      q: "How does the 1-Month Summer Internship track differ from the 7-day program?",
      a: "The 1-Month Summer Internship is a comprehensive, deep-dive academic and professional program. It spreads the 7 core AI modules over 4 weeks, giving you the time to read deep-dive literature, master complex mathematical proofs, and build 3 highly advanced projects plus a final production-grade Capstone. Best of all, certificates and LORs are generated instantly upon completion."
    },
    {
      q: "How are certificates and recommendation letters issued?",
      a: "Both your official Verified Certificate and signed Letter of Recommendation (LOR) are generated and unlocked instantly for PDF download as soon as you complete your modules and verification. No waiting period required."
    },
    {
      q: "How does the optional Letter of Recommendation (LOR) add-on work?",
      a: "A Letter of Recommendation (LOR) is highly prized for university credits and jobs. During checkout, you can optionally pay an extra ₹110 (total ₹229) to receive both your verified Certificate of Completion and a customized, highly professional Letter of Recommendation signed by our lead Directorate, verifying your specific contributions to the projects."
    },
    {
      q: "Is prior AI experience required to join?",
      a: "No. Week 1 is designed to rebuild your Python foundations and mathematical skills from the ground up. If you are diligent, you will be fully capable of completing the deep learning and generative AI projects in Weeks 2 and 3."
    },
    {
      q: "How much does the program cost?",
      a: "Like all our courses, the learning material, modules, and coding projects are 100% free to access. After completing your tasks and milestones, you pay a nominal fee of ₹119 to generate your digital verified certificate, or ₹229 if you choose to add the optional Letter of Recommendation (LOR)."
    }
  ];

  const benefits = [
    { title: "Elite Corporate Training", desc: "Built by cognitive architects at Futureee AI to scout premium talent in India.", icon: <Shield size={20} color="#2563eb" /> },
    { title: "Production MLOps Focus", desc: "You don't just write Jupyter Notebooks; you deploy live web services via Docker & CI/CD.", icon: <Zap size={20} color="#2563eb" /> },
    { title: "Optional Verified LOR", desc: "Add a professional letter from our Directorate to drastically boost your resume and profile.", icon: <FileText size={20} color="#2563eb" /> },
    { title: "University Recognition", desc: "Fulfills standard university internship guidelines with a verifiable credential index.", icon: <Award size={20} color="#2563eb" /> }
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>
      <Navigation />
      {/* SUMMER HERO */}
      <section style={{ position: "relative", padding: "4rem 0 4.5rem", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-150px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-150px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />

        <div className="container-custom">
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#eff6ff", color: "#1d4ed8", padding: "0.4rem 0.85rem", borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 700, border: "1px solid #dbeafe" }}>
                <Calendar size={14} /> Summer Internship Cohort 2026 — Enrolling Now
              </span>
            </div>
            
            <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              Elite 1-Month Summer Internship in <span style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI & Machine Learning</span>
            </h1>
            
            <p style={{ fontSize: "clamp(0.925rem, 2.5vw, 1.15rem)", color: "#475569", lineHeight: 1.65, maxWidth: "700px", margin: "0 auto" }}>
              Accelerate your engineering profile. Deep-dive into high-performance PyTorch pipelines, custom RAG vector indexing, Docker containerization, and model explainability. Get certified and earn an optional corporate LOR.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", marginTop: "0.75rem" }}>
              <Link href="/auth?course=1_month" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.85rem 1.75rem", background: "#2563eb", color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 4px 12px rgba(37,99,235,0.2)", transition: "all 0.2s" }} id="summer-hero-enroll">
                Enroll Now <ArrowRight size={18} />
              </Link>
              <Link href="#summer-curriculum" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.85rem 1.75rem", background: "#fff", color: "#1e293b", borderRadius: "12px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", border: "1px solid #cbd5e1" }}>
                View 4-Week Syllabus
              </Link>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginTop: "2rem", borderTop: "1px solid #e2e8f0", paddingTop: "2rem" }}>
              {["100% Free Learning", "Instant Verification & LOR Generation", "Optional Verified LOR Add-on"].map((txt, idx) => (
                <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "#64748b" }}>
                  <CheckCircle2 size={16} color="#16a34a" /> {txt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUMMER BENEFITS */}
      <section style={{ padding: "5rem 0", background: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "#2563eb", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Program Advantages</span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>Why Choose the 1-Month Summer Cohort?</h2>
            <p style={{ color: "#64748b", maxWidth: "600px", margin: "0.5rem auto 0" }}>A rigorous structured program designed to make you stand out in technical engineering interviews.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {benefits.map((b, idx) => (
              <div key={idx} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", transition: "transform 0.2s" }} className="hover:-translate-y-1">
                <div style={{ width: "40px", height: "40px", background: "#eff6ff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.5rem" }}>{b.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-WEEK SYLLABUS TIMELINE */}
      <section id="summer-curriculum" style={{ padding: "5rem 0" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "#2563eb", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Full Curriculum</span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>Structured 4-Week Engineering Syllabus</h2>
            <p style={{ color: "#64748b", maxWidth: "600px", margin: "0.5rem auto 0" }}>Deep mathematical frameworks, production pipelines, and highly practical engineering tasks.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", maxWidth: "900px", margin: "0 auto" }}>
            {summerCurriculum.map((week, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                {/* Side Indicator */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", minWidth: "180px", flexShrink: 0 }}>
                  <div style={{ background: week.bg, color: week.color, padding: "0.35rem 0.85rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 800, border: `1px solid ${week.color}22`, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    {week.icon}
                    {week.week}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginTop: "0.25rem" }}>{week.title}</h3>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{week.theme}</span>
                </div>

                {/* Lessons list */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem", borderLeft: "2px solid #f1f5f9", paddingLeft: "1.5rem" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Weekly Core Topics</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {week.lessons.map((lesson, lIdx) => (
                      <li key={lIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.9rem", color: "#334155", lineHeight: 1.5 }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: week.color, marginTop: "0.5rem", flexShrink: 0 }} />
                        {lesson}
                      </li>
                    ))}
                  </ul>

                  <div style={{ background: "#f8fafc", borderLeft: `4px solid ${week.color}`, borderRadius: "12px", padding: "1.25rem", marginTop: "1rem" }}>
                    <h5 style={{ fontSize: "0.825rem", fontWeight: 800, color: week.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Weekend Coding Assignment</h5>
                    <p style={{ fontSize: "0.875rem", color: "#334155", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{week.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED SUMMMER FAQs */}
      <section style={{ padding: "5rem 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "#2563eb", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Summer Q&A</span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>Summer Program FAQs</h2>
            <p style={{ color: "#64748b", margin: "0.5rem 0 0" }}>Specific questions and answers about our premium summer internship curriculum.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {summerFaqs.map((f, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                <button
                  id={`summer-faq-btn-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}
                >
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>{f.q}</span>
                  <ChevronDown size={18} color="#64748b" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 1.5rem 1.25rem", fontSize: "0.9rem", color: "#475569", lineHeight: 1.8 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL SUMMER CTA */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div className="container-custom">
          <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #4f46e5 100%)", borderRadius: "32px", padding: "4rem 2rem", textAlign: "center", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(37,99,235,0.15)" }}>
            <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "150px", height: "150px", background: "rgba(255,255,255,0.06)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: "-80px", right: "-40px", width: "200px", height: "200px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "600px", margin: "0 auto" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", padding: "0.35rem 1rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-block", margin: "0 auto" }}>
                Limited Availability
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.2 }}>
                Lock In Your Summer Internship Today
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
                Join the official Summer 2026 Batch. Study advanced AI/ML, build deep portfolios, and unlock career-transforming verified letters.
              </p>
              <div>
                <Link href="/auth?course=1_month" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", background: "#fff", color: "#1d4ed8", borderRadius: "12px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", transition: "all 0.2s" }} id="summer-cta-enroll">
                  Register For Free <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
