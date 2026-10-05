"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Zap, 
  Users, 
  Star, 
  IndianRupee, 
  Clock, 
  ArrowRight, 
  Shield, 
  ShieldCheck, 
  TrendingUp, 
  Code2, 
  Brain, 
  ChevronRight, 
  Rocket, 
  ChevronDown, 
  Flame, 
  X, 
  Sparkles, 
  Check, 
  FileText, 
  QrCode,
  GraduationCap,
  ExternalLink,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { trendingCourses } from "@/data/trendingCourses";

const curriculum = [
  { day:"Day 01", title:"Python for AI & Data Science", desc:"Master essential Python, NumPy, and Pandas for data manipulation and analysis.", icon:<Code2 size={22}/>, c:"#2563eb", bg:"#eff6ff" },
  { day:"Day 02", title:"Regression & Statistics", desc:"Deep dive into Linear and Logistic regression with real-world datasets.", icon:<TrendingUp size={22}/>, c:"#4f46e5", bg:"#eef2ff" },
  { day:"Day 03", title:"Neural Network Fundamentals", desc:"Understand how deep learning neurons work and build your first model.", icon:<Brain size={22}/>, c:"#0891b2", bg:"#ecfeff" },
  { day:"Day 04", title:"Generative AI Mastery", desc:"Explore LLMs, prompt engineering, and the future of AI technology.", icon:<Zap size={22}/>, c:"#7c3aed", bg:"#f5f3ff" },
  { day:"Day 05", title:"Computer Vision Applications", desc:"Extract meaningful information from images utilizing CNNs.", icon:<Award size={22}/>, c:"#065f46", bg:"#d1fae5" },
  { day:"Day 06", title:"MLOps and Deployment", desc:"Learn to containerize and deploy ML models with FastAPI and Docker.", icon:<Rocket size={22}/>, c:"#b45309", bg:"#fef3c7" },
  { day:"Day 07", title:"AI Ethics and Governance", desc:"Understand algorithmic bias and the responsibility of AI engineering.", icon:<Shield size={22}/>, c:"#be123c", bg:"#ffe4e6" },
];

const summerCurriculum = [
  { week:"Week 01", title:"AI/ML Engineering Core", desc:"Master data pipeline engineering, vectorization math, and linear/logistic regularizations.", icon:<Code2 size={22}/>, c:"#2563eb", bg:"#eff6ff" },
  { week:"Week 02", title:"Deep Learning & Computer Vision", desc:"Build spatial vision models, optimize backpropagation metrics, and freeze ResNet pipelines.", icon:<Brain size={22}/>, c:"#4f46e5", bg:"#eef2ff" },
  { week:"Week 03", title:"Generative AI & Enterprise RAG", desc:"Deep dive into Self-Attention systems, multi-document chunk indexing, and Pinecone vector stores.", icon:<Zap size={22}/>, c:"#7c3aed", bg:"#f5f3ff" },
  { week:"Week 04", title:"MLOps & Production Deployment", desc:"Convert models to ONNX, build multi-stage Docker images, wrap async APIs, and deploy with CI/CD.", icon:<Award size={22}/>, c:"#059669", bg:"#f0fdf4" },
];

const showcaseProjects = [
  {
    title: "AI Academic RAG Assistant",
    tagline: "Vector-embedded PDF question answering with FAISS, FastAPI & React",
    category: "Generative AI",
    badge: "Bestseller",
    price: 2499,
    tech: ["Python", "FastAPI", "FAISS", "React"],
    slug: "ai-college-academic-assistant-rag",
  },
  {
    title: "Financial Fraud & Anomaly Detector",
    tagline: "End-to-end ML pipeline with real-time transaction classification",
    category: "Machine Learning",
    badge: "Final Year Pick",
    price: 2299,
    tech: ["Python", "Scikit-Learn", "FastAPI", "Docker"],
    slug: "financial-fraud-detection-system",
  },
  {
    title: "Autonomous Traffic Flow AI",
    tagline: "YOLO computer vision traffic density estimator and smart signal timing",
    category: "Computer Vision",
    badge: "IEEE Compliant",
    price: 2499,
    tech: ["YOLOv8", "OpenCV", "PyTorch", "Python"],
    slug: "smart-traffic-management-system",
  },
];

const testimonials = [
  { name:"Priya Sharma", college:"VIT Vellore · B.Tech CSE", text:"The FutureAI internship changed my career trajectory. The hands-on projects were exactly what my resume needed. Got placed at a startup within 2 months!", stars:5 },
  { name:"Rahul Mehta", college:"NIT Warangal · B.Tech ECE", text:"Skeptical at first, but the curriculum is genuinely world-class. The certificate helped me land an ML internship at a product company. Best ₹119 I ever spent!", stars:5 },
  { name:"Ananya Reddy", college:"Osmania University · MCA", text:"Coming from a non-CS background, I was nervous. But the modules were so well-structured that I went from zero to building a working NLP project!", stars:5 },
  { name:"Arjun Patel", college:"BITS Pilani · B.Tech IT", text:"The Generative AI module alone is worth it. I used it to build a project that won our college hackathon. Incredible value for ₹119!", stars:5 },
  { name:"Sneha Nair", college:"Amrita University · B.Tech CSE", text:"This feels like a real internship — the task submissions, the deadlines, the structure. It's the complete package that transformed my skillset.", stars:5 },
  { name:"Mohammed Farhan", college:"JNTUH · B.Tech AI", text:"The MLOps module is incredibly practical. I can now deploy ML models to production — a skill most college students simply don't have!", stars:5 },
];

const faqs = [
  { q:"Is this internship completely free to learn?", a:"Yes! The entire 7-module curriculum, code labs, and project tasks are 100% free to access. You only pay a nominal fee of ₹119 (or ₹229 with official signed Letter of Recommendation) to generate and download your verified credentials upon completion." },
  { q:"Do I get an official Offer Letter?", a:"Yes! Immediately upon registration, you can download an official Internship Offer & Acceptance Letter on Futureee AI letterhead to submit to your college department for approval." },
  { q:"Do I have to buy courses or project kits?", a:"Never. The internship is a complete standalone program. Our masterclasses and project kits are purely optional resources for students who wish to specialize further or need ready-made project kits for final year college submissions. You are free to browse and learn at your own pace." },
  { q:"How long does the program take?", a:"Designed as a 7-day intensive (one module per day) or a 4-week deep-dive summer track, but you can complete it at your own pace. There is no hard deadline — your access never expires." },
  { q:"Is the certificate recognised by companies?", a:"Our certificate is an industry-standard credential with a tamper-proof cryptographic QR code and permanent verification portfolio URL. Students regularly feature it on LinkedIn and campus placement resumes." },
  { q:"How do I receive my certificate and LOR?", a:"After completing your modules and submitting your project tasks, pay the ₹119 fee (or ₹229 with LOR) via Razorpay. Both documents are generated and available for instant PDF download." },
  { q:"Can I do this alongside college classes?", a:"Absolutely. The program is fully online and self-paced. Most students complete it during evenings, weekends, or semester breaks." },
];

const colleges = ["IIT Students","NIT Students","BITS Pilani","VIT Vellore","JNTUH","Amrita University","Osmania University","SRM University","Manipal University","Anna University"];
const benefits = ["Industry-recognised AI/ML certificate","Instant Internship Offer Letter","Signed Letter of Recommendation (LOR) option","LinkedIn-shareable digital portfolio","Access to alumni community","No prior experience needed"];

export default function LandingPage() {
  const [user] = useAuthState(auth);
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [counted, setCounted] = useState(false);
  const [count, setCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [curriculumTrack, setCurriculumTrack] = useState<"7_day" | "1_month">("7_day");

  // Dynamic Cohort Month
  const [currentCohortMonth, setCurrentCohortMonth] = useState("October 2026");
  useEffect(() => {
    setCurrentCohortMonth(new Date().toLocaleString("en-US", { month: "long", year: "numeric" }));
  }, []);

  // Live Recent Activity Social Proof Toasts
  const activities = [
    { name: "Rahul S.", college: "VIT Vellore", action: "unlocked Verified AI Certificate", time: "2 mins ago", icon: <Award size={18} />, color: "#16a34a", bg: "#dcfce7" },
    { name: "Priya M.", college: "JNTU Hyderabad", action: "enrolled in 1-Month Summer Track", time: "4 mins ago", icon: <Zap size={18} />, color: "#2563eb", bg: "#dbeafe" },
    { name: "Sneha N.", college: "NIT Warangal", action: "downloaded Signed Letter of Recommendation", time: "6 mins ago", icon: <FileText size={18} />, color: "#7c3aed", bg: "#ede9fe" },
    { name: "Arjun K.", college: "BITS Pilani", action: "completed MLOps Capstone Project", time: "9 mins ago", icon: <CheckCircle2 size={18} />, color: "#059669", bg: "#d1fae5" },
    { name: "Ananya R.", college: "Osmania University", action: "downloaded Official Offer Letter", time: "12 mins ago", icon: <Sparkles size={18} />, color: "#d97706", bg: "#fef3c7" },
  ];

  const [toastIndex, setToastIndex] = useState(0);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setToastIndex(prev => (prev + 1) % 5);
        setShowToast(true);
      }, 400);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  // Interactive Certificate Preview Name
  const [previewName, setPreviewName] = useState("Yaswanth Kumar");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCounted(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!counted) return;
    let i = 0;
    const timer = setInterval(() => { i += 250; setCount(Math.min(i, 10000)); if (i >= 10000) clearInterval(timer); }, 40);
    return () => clearInterval(timer);
  }, [counted]);

  return (
    <main style={{ display:"flex", flexDirection:"column", width:"100%", background:"#fff", overflowX:"hidden" }}>
      <h1 className="sr-only">FutureAI - Best Free AI & Machine Learning Internship in India with Certificate</h1>

      {/* TRUST ANNOUNCEMENT BAR */}
      <div style={{
        background: "#eff6ff",
        color: "#1e40af",
        padding: "0.5rem 0.75rem",
        fontSize: "0.825rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem 1.5rem",
        flexWrap: "wrap",
        position: "relative",
        zIndex: 10,
        borderBottom: "1px solid #dbeafe",
        textAlign: "center"
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <CheckCircle2 size={13} color="#16a34a" />
          <span style={{ color: "#1e3a8a" }}>10,247+ certificates verified • 4.9★ rating</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <ShieldCheck size={13} color="#16a34a" />
          <span style={{ color: "#1e3a8a" }}>AICTE Format Accepted • Tamper-proof QR Code</span>
        </span>
        <Link href="#tracks" style={{ background: "#2563eb", color: "#ffffff", padding: "0.2rem 0.65rem", borderRadius: "9999px", fontSize: "0.725rem", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
          Enroll Free →
        </Link>
      </div>

      {/* HERO SECTION — HIGHLIGHT INTERNSHIP FIRST */}
      <section id="hero" className="hero-section" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fafafb 100%)", padding: "5rem 0 4rem" }}>
        <div className="hero-blob hero-blob-right"/><div className="hero-blob hero-blob-left"/>
        <div className="container-custom">
          <div className="hero-grid">
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              <div>
                <span className="enrolling-badge" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
                  <span className="enrolling-dot animate-pulse" style={{ background: "#2563eb" }}/>
                  Now Enrolling — {currentCohortMonth} Batch
                </span>
              </div>
              <div>
                <h1 className="hero-headline" style={{ color: "#0f172a" }}>
                  Master Practical AI.<br/>
                  <span className="hero-headline-accent" style={{ color: "#2563eb" }}>Get Formally Certified.</span>
                </h1>
                <p className="hero-subtext" style={{ color: "#475569", fontSize: "1.1rem", lineHeight: 1.7 }}>
                  India&apos;s leading micro-internship for engineering students. Complete hands-on coding modules in Python, Neural Networks, and GenAI for free — receive your verified certificate and official offer letter for just <strong style={{ color:"#0f172a" }}>₹119</strong>.
                </p>
              </div>

              {/* RESUME LEARNING BANNER FOR ACTIVE STUDENTS */}
              {user && (
                <div style={{
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "16px",
                  padding: "0.85rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  boxShadow: "0 2px 8px rgba(37,99,235,0.06)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <span style={{ fontSize: "1.35rem" }}>🔥</span>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e3a8a" }}>
                        Welcome back, {user.displayName?.split(" ")[0] || "Student"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#475569" }}>
                        Continue your modules and task submissions in your dashboard.
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard" className="btn-primary btn-sm" style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    Go to Dashboard <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              <div className="hero-cta-row" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="#tracks" id="hero-cta-start" className="btn-primary btn-lg" style={{ padding: "0.85rem 2rem", fontSize: "0.98rem" }}>
                  Start Free Internship <ArrowRight size={18}/>
                </Link>
                <Link href="#curriculum" id="hero-cta-syllabus" className="btn-outline btn-lg" style={{ padding: "0.85rem 1.75rem", fontSize: "0.98rem" }}>
                  View 7-Day Syllabus
                </Link>
              </div>
              <div className="hero-trust-row" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                {["100% Free to Learn","Instant Offer Letter on Day 1","Verifiable Certificate & LOR"].map(t => (
                  <span key={t} className="trust-item" style={{ fontSize: "0.82rem", color: "#475569", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    <CheckCircle2 size={15} color="#16a34a"/>{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Hero interactive card */}
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative" }}>
              <div className="hero-card" id="hero-stats-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.08)", borderRadius: "24px", padding: "1.75rem", width: "100%", maxWidth: "440px" }}>
                <div style={{ display:"flex", gap:"0.75rem", marginBottom: "1rem" }}>
                  {[
                    { label:"Enrolled", val:"10k+", bg:"#eff6ff", text:"#1d4ed8" },
                    { label:"Rating", val:"4.9★", bg:"#fefce8", text:"#b45309" },
                    { label:"Access", val:"Free", bg:"#f0fdf4", text:"#15803d" }
                  ].map(s => (
                    <div key={s.label} className="hero-stat-pill" style={{ background:s.bg, padding: "0.5rem 0.85rem", borderRadius: "12px", textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize:"1.05rem", fontWeight:800, color:s.text }}>{s.val}</div>
                      <div style={{ fontSize:"0.65rem", fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.05em", marginTop:"2px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="hero-logo-box" style={{ padding: "1rem", background: "#f8fafc", borderRadius: "16px", marginBottom: "1rem", border: "1px solid #f1f5f9" }}>
                  <Image src="/logo.png" alt="FutureAI Internship Platform Logo" width={260} height={180} style={{ width:"100%", height:"auto", maxHeight:"150px", objectFit:"contain" }} priority/>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <Link href="#tracks" id="hero-enroll-card-btn" className="hero-card-cta" style={{ background: "#2563eb", color: "#ffffff", padding: "0.75rem 1rem", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", fontWeight: "700", fontSize: "0.9rem", boxShadow: "0 4px 12px rgba(37,99,235,0.2)" }}>
                    <span>Choose Your Track</span>
                    <ChevronRight size={18}/>
                  </Link>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.72rem", color: "#64748b", marginTop: "4px" }}>
                    <ShieldCheck size={13} color="#16a34a" />
                    <span>No upfront payment required to begin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR — COLLEGES */}
      <section id="trust-bar" style={{ background:"#ffffff", borderTop:"1px solid #e2e8f0", borderBottom:"1px solid #e2e8f0", padding:"1.75rem 0" }}>
        <div className="container-custom">
          <p style={{ textAlign:"center", fontSize:"0.76rem", fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.85rem" }}>
            Trusted by students and developers from India&apos;s leading institutions
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0.75rem 1.75rem", textAlign: "center" }}>
            {colleges.map(c => <span key={c} style={{ fontSize:"0.84rem", fontWeight:600, color:"#475569" }}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* 4 PILLARS OF INSTITUTIONAL TRUST */}
      <section id="trust-pillars" style={{ background: "#f8fafc", padding: "3.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div className="trust-pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            <div className="trust-pillar-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                  AICTE Aligned Format
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
                  Meets university curriculum guidelines for semester internship credits and academic approval.
                </div>
              </div>
            </div>

            <div className="trust-pillar-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <QrCode size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                  Tamper-Proof QR Code
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
                  Every credential has an encrypted QR code verified live on futureee.me/verify by employers.
                </div>
              </div>
            </div>

            <div className="trust-pillar-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                  Official Offer Letter
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
                  Download an official Internship Offer & Acceptance letterhead immediately upon registration.
                </div>
              </div>
            </div>

            <div className="trust-pillar-card">
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#f5f3ff", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                  Verified & Secure
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
                  Razorpay Live SSL encrypted payments with full transparent pricing and zero recurring fees.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* INTERNSHIP TRACK CHOICES */}
      {/* ═══════════════════════════════════════ */}
      <section id="tracks" style={{ padding: "5rem 0 4rem", background: "#fafafb", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div className="section-header" style={{ marginBottom: "3rem", textAlign: "center" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Structured Tracks</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>Choose Your Internship Track</h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", maxWidth: "620px", margin: "0.5rem auto 0", lineHeight: 1.6 }}>
              Both tracks include 100% free curriculum learning, hands-on project submissions, and official certification options.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            {/* 7-DAY TRACK */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", position: "relative" }}>
              <div>
                <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "#f0fdf4", color: "#16a34a", padding: "0.25rem 0.65rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, border: "1px solid #bbf7d0" }}>
                  Self-Paced / Fast-Track
                </span>
                <div style={{ width: "44px", height: "44px", background: "#eff6ff", color: "#2563eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Zap size={22} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>7-Day AI/ML Micro-Internship</h3>
                <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Ideal for students looking for quick hands-on skill validation. Covers Python, Machine Learning models, and instant certification.
                </p>
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      "Complete 7 progressive daily modules",
                      "Instant Offer Letter upon registration",
                      "Daily code challenges & project tasks",
                      "₹119 nominal fee to generate verified certificate"
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#334155", lineHeight: 1.5 }}>
                        <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Link href="/auth?course=7_day" className="btn-primary" style={{ width: "100%", justifyContent: "center", display: "flex", gap: "0.5rem" }}>
                  Start 7-Day Track <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* 1-MONTH TRACK */}
            <div style={{ background: "#ffffff", border: "2px solid #2563eb", borderRadius: "20px", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 8px 30px rgba(37,99,235,0.06)", position: "relative" }}>
              <div>
                <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "#eff6ff", color: "#2563eb", padding: "0.25rem 0.65rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, border: "1px solid #bfdbfe" }}>
                  Recommended for College
                </span>
                <div style={{ width: "44px", height: "44px", background: "#eff6ff", color: "#2563eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <GraduationCap size={22} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>1-Month Summer Internship</h3>
                <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Designed for college semester credit approval. Deep dive into Deep Learning, Generative AI RAG systems, and signed LOR options.
                </p>
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      "4-week rigorous engineering curriculum",
                      "University academic approval letterhead",
                      "Production MLOps & GenAI capstone projects",
                      "Optional signed Letter of Recommendation (LOR)"
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#334155", lineHeight: 1.5 }}>
                        <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Link href="/1_month_internship" className="btn-primary" style={{ width: "100%", justifyContent: "center", display: "flex", gap: "0.5rem" }}>
                  Explore 1-Month Track <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CURRICULUM SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section id="curriculum" className="curriculum-section" style={{ padding: "5rem 0", background: "#ffffff" }}>
        <div className="container-custom">
          <div className="section-header" style={{ marginBottom: "2rem", textAlign: "center" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Hands-On Syllabus</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a" }}>Curriculum Designed for Builders</h2>
            <p style={{ fontSize:"1.05rem", color:"#64748b" }}>Progressive daily modules and tasks — learn by writing actual Python code.</p>
          </div>

          {/* Track Switcher */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
            <div style={{ 
              display: "inline-flex", 
              background: "#f1f5f9", 
              padding: "5px", 
              borderRadius: "14px",
              border: "1px solid #e2e8f0"
            }}>
              <button 
                type="button"
                onClick={() => setCurriculumTrack("7_day")}
                style={{
                  padding: "0.65rem 1.5rem",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  transition: "all 0.2s",
                  cursor: "pointer",
                  background: curriculumTrack === "7_day" ? "#fff" : "transparent",
                  color: curriculumTrack === "7_day" ? "#2563eb" : "#64748b",
                  border: "none",
                  boxShadow: curriculumTrack === "7_day" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <Zap size={14} /> 7-Day Fast-Track
              </button>
              <button 
                type="button"
                onClick={() => setCurriculumTrack("1_month")}
                style={{
                  padding: "0.65rem 1.5rem",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  transition: "all 0.2s",
                  cursor: "pointer",
                  background: curriculumTrack === "1_month" ? "#fff" : "transparent",
                  color: curriculumTrack === "1_month" ? "#2563eb" : "#64748b",
                  border: "none",
                  boxShadow: curriculumTrack === "1_month" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <BookOpen size={14} /> 1-Month Summer Track
              </button>
            </div>
          </div>

          <div className="curriculum-grid">
            {curriculumTrack === "7_day" ? (
              curriculum.map((item,i) => (
                <div key={i} id={`curriculum-item-${i}`} className="curriculum-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div className="curriculum-icon" style={{ background:item.bg, color:item.c, border:`1px solid ${item.c}22`, width: "42px", height: "42px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>{item.icon}</div>
                  <div>
                    <div className="curriculum-day" style={{ color:item.c, fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{item.day}</div>
                    <h3 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.4rem", color:"#0f172a" }}>{item.title}</h3>
                    <p style={{ fontSize:"0.84rem", color:"#64748b", lineHeight:1.6, margin:0 }}>{item.desc}</p>
                  </div>
                  <Link href="/auth?course=7_day" className="curriculum-module-link" style={{ color:item.c, display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", fontWeight: 600, marginTop: "1rem" }}>
                    Start Day {i+1} <ArrowRight size={13}/>
                  </Link>
                </div>
              ))
            ) : (
              summerCurriculum.map((item,i) => (
                <div key={i} id={`summer-curriculum-item-${i}`} className="curriculum-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div className="curriculum-icon" style={{ background:item.bg, color:item.c, border:`1px solid ${item.c}22`, width: "42px", height: "42px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>{item.icon}</div>
                  <div>
                    <div className="curriculum-day" style={{ color:item.c, fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{item.week}</div>
                    <h3 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.4rem", color:"#0f172a" }}>{item.title}</h3>
                    <p style={{ fontSize:"0.84rem", color:"#64748b", lineHeight:1.6, margin:0 }}>{item.desc}</p>
                  </div>
                  <Link href="/1_month_internship" className="curriculum-module-link" style={{ color:item.c, display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", fontWeight: 600, marginTop: "1rem" }}>
                    Explore Week {i+1} <ArrowRight size={13}/>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* INTERACTIVE CERTIFICATE PREVIEW */}
      {/* ═══════════════════════════════════════ */}
      <section id="cert-preview" style={{ padding: "5rem 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Live Preview</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>
              Preview Your Verified Credential
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "620px", margin: "0.5rem auto 0", lineHeight: 1.6 }}>
              See how your name appears on your official, tamper-proof FutureAI certificate with QR code verification.
            </p>
          </div>

          <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
            {/* Name Input Bar */}
            <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="preview-name-input" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={16} color="#2563eb" /> Type your name to preview in real-time:
              </label>
              <input
                id="preview-name-input"
                type="text"
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                placeholder="e.g. Yaswanth Kumar"
                style={{
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "12px",
                  border: "1.5px solid #2563eb",
                  outline: "none",
                  boxShadow: "0 2px 10px rgba(37,99,235,0.08)",
                  color: "#0f172a",
                  background: "#fff"
                }}
              />
            </div>

            {/* Certificate Card */}
            <div className="cert-preview-wrapper" style={{
              width: "100%",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "3rem 2.5rem",
              boxShadow: "0 15px 35px -5px rgba(15, 23, 42, 0.08)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563eb", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  FUTUREAI COGNITIVE ARCHITECTURES
                </div>
                <div style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "0.02em", fontFamily: "serif" }}>
                  CERTIFICATE OF COMPLETION
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>
                  This is proudly presented to
                </div>

                {/* Candidate Name */}
                <div className="cert-name-preview" style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  fontFamily: "serif",
                  borderBottom: "2px solid #2563eb",
                  paddingBottom: "0.5rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  margin: "0.25rem 0",
                  letterSpacing: "0.02em",
                  wordBreak: "break-word",
                  maxWidth: "100%"
                }}>
                  {previewName.trim() || "Student Name"}
                </div>

                <p style={{ maxWidth: "600px", fontSize: "0.85rem", color: "#475569", lineHeight: 1.6, margin: "0 auto" }}>
                  For successfully demonstrating practical competency in modern Artificial Intelligence, Machine Learning models, and Production APIs.
                </p>

                {/* Certificate Details Footer */}
                <div className="cert-footer-grid" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a" }}>ID: FAI-2026-LIVE</div>
                    <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Status: Official Verified Record</div>
                    <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Tamper-proof Cryptographic QR</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                    <div style={{ width: "48px", height: "48px", border: "1.5px solid #2563eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                      <QrCode size={28} />
                    </div>
                    <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#64748b" }}>SCAN TO VERIFY</span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ width: "110px", borderBottom: "1.5px solid #0f172a", marginBottom: "4px" }} />
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0f172a" }}>Dr. V. Rao</div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 600 }}>Directorate, FutureAI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Anchor */}
            <div style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "1.25rem 1.75rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.25rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0f172a" }}>₹119</span>
                  <span style={{ fontSize: "0.95rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 600 }}>₹999</span>
                  <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "0.15rem 0.5rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 800 }}>88% Student Waiver</span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>
                  Instant PDF download + verifiable portfolio URL after completing project tasks.
                </div>
              </div>
              <Link href="/auth" className="btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "0.95rem" }}>
                Claim Credential <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* THE NATURAL STUDENT JOURNEY (THE BRIDGE) */}
      {/* ═══════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>FutureAI Roadmap</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>
              Your Career Progression at Your Own Pace
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "660px", margin: "0.5rem auto 0", lineHeight: 1.6 }}>
              Whether you only want the free internship or choose to level up with courses and ready-made project kits, our ecosystem gives you complete freedom without pressure.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.75rem" }}>
            {/* Step 1 */}
            <div style={{ background: "#fafafb", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "2rem", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", fontWeight: 800, color: "#2563eb", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "0.2rem 0.6rem", borderRadius: "9999px", alignSelf: "flex-start", marginBottom: "1rem" }}>
                STEP 01 • 100% FREE
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
                Core AI Internship
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, flex: 1, marginBottom: "1.5rem" }}>
                Start with zero fees. Work through the 7-day or 1-month structured curriculum, complete task submissions, and download your verified certificate and offer letter.
              </p>
              <Link href="#tracks" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#2563eb", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
                Explore Free Tracks <ArrowRight size={14} />
              </Link>
            </div>

            {/* Step 2 */}
            <div style={{ background: "#fafafb", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "2rem", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", fontWeight: 800, color: "#d97706", background: "#fef3c7", border: "1px solid #fde68a", padding: "0.2rem 0.6rem", borderRadius: "9999px", alignSelf: "flex-start", marginBottom: "1rem" }}>
                STEP 02 • SPECIALIZATION
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
                Self-Paced Masterclasses
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, flex: 1, marginBottom: "1.5rem" }}>
                Want to go deeper into Generative AI, Full-Stack, or Data Science? Try Module 1 of any masterclass completely free. Buy only if you love the syllabus.
              </p>
              <Link href="#trending-courses" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#d97706", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
                Browse Masterclasses <ArrowRight size={14} />
              </Link>
            </div>

            {/* Step 3 */}
            <div style={{ background: "#fafafb", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "2rem", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", fontWeight: 800, color: "#7c3aed", background: "#f5f3ff", border: "1px solid #ddd6fe", padding: "0.2rem 0.6rem", borderRadius: "9999px", alignSelf: "flex-start", marginBottom: "1rem" }}>
                STEP 03 • BUILD & SHIP
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
                Projects Marketplace
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, flex: 1, marginBottom: "1.5rem" }}>
                Building your final-year college project or a capstone for interview rounds? Get production codebases, IEEE reports, PPTs, and architecture diagrams.
              </p>
              <a href="https://projects.futureee.me" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#7c3aed", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
                Visit Projects Marketplace <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* TRENDING COURSES (NON-FORCEFUL EXPLORATION) */}
      {/* ═══════════════════════════════════════ */}
      <section id="trending-courses" style={{ padding: "5rem 0", background: "#fafafb", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div className="section-header" style={{ marginBottom: "3rem", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fef3c7", border: "1px solid #fde68a", padding: "0.35rem 0.85rem", borderRadius: "9999px", marginBottom: "0.75rem" }}>
              <Flame size={15} color="#d97706" />
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Optional Learning Masterclasses
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a" }}>Learn Specialized Skills at Your Pace</h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "720px", margin: "0.5rem auto 0", lineHeight: 1.6 }}>
              Hands-on practical code labs with downloadable manuals. <strong>Module 1 is always 100% Free</strong> to preview before deciding.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {trendingCourses.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.75rem",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", gap: "0.5rem" }}>
                    <span style={{ background: "#eff6ff", color: "#2563eb", fontSize: "0.72rem", fontWeight: 800, padding: "0.25rem 0.6rem", borderRadius: "9999px", border: "1px solid #bfdbfe" }}>
                      {c.badge}
                    </span>
                    <span style={{ background: "#f0fdf4", color: "#16a34a", fontSize: "0.72rem", fontWeight: 800, padding: "0.25rem 0.6rem", borderRadius: "9999px", border: "1px solid #bbf7d0" }}>
                      Module 1 FREE
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.35rem", lineHeight: 1.35 }}>
                    {c.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", color: "#f59e0b" }}>
                      {"★".repeat(5)}
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b" }}>
                      {c.rating} ({c.enrolledCount.toLocaleString()}+ students)
                    </span>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.55, marginBottom: "1.25rem" }}>
                    {c.tagline}
                  </p>

                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1rem", marginBottom: "1.25rem" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <li style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#475569" }}>
                        <Check size={14} color="#16a34a" /> 7 Detailed Modules ({c.duration})
                      </li>
                      <li style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#475569" }}>
                        <Check size={14} color="#16a34a" /> Capstone Project Lab
                      </li>
                      <li style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#16a34a", fontWeight: 700 }}>
                        <FileText size={14} color="#16a34a" /> Course Manual PDF Included
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.65rem", fontWeight: 900, color: "#0f172a" }}>
                      ₹{c.price}
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 600 }}>
                      ₹{c.originalPrice}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 800, background: "#f0fdf4", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                      {Math.round(((c.originalPrice - c.price) / c.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <Link
                      href={`/courses/${c.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        width: "100%",
                        padding: "0.65rem",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        background: "#eff6ff",
                        color: "#2563eb",
                        border: "1px solid #bfdbfe",
                        textDecoration: "none",
                      }}
                    >
                      Preview Syllabus Free <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link
              href="/courses"
              className="btn-secondary"
              style={{ padding: "0.75rem 2rem", fontSize: "0.95rem" }}
            >
              Browse All {trendingCourses.length} Masterclasses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* PROJECTS MARKETPLACE SHOWCASE */}
      {/* ═══════════════════════════════════════ */}
      <section style={{ padding: "5rem 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                <span>✦</span> PROJECTS ECOSYSTEM
              </div>
              <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a" }}>
                Production Project Kits on projects.futureee.me
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "600px" }}>
                Need full source code, IEEE reports, and architecture diagrams for your college viva or portfolio? Explore ready-made project kits.
              </p>
            </div>
            <a
              href="https://projects.futureee.me"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "0.75rem 1.75rem", fontSize: "0.92rem", background: "#7c3aed" }}
            >
              Explore All 30+ Kits <ArrowUpRight size={16} />
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.5rem" }}>
            {showcaseProjects.map((p) => (
              <a
                key={p.slug}
                href={`https://projects.futureee.me/projects/${p.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "block",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  padding: "1.5rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                  transition: "all 0.2s",
                }}
                className="hover:-translate-y-1 hover:border-blue-400"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563eb", background: "#eff6ff", padding: "0.2rem 0.55rem", borderRadius: "9999px", border: "1px solid #bfdbfe" }}>
                    {p.category}
                  </span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7c3aed", background: "#f5f3ff", padding: "0.2rem 0.55rem", borderRadius: "9999px" }}>
                    {p.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.4rem" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {p.tagline}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", background: "#f1f5f9", borderRadius: "6px", color: "#475569" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}>
                    ₹{p.price.toLocaleString("en-IN")}
                  </span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#2563eb", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                    Inspect Kit <ArrowUpRight size={13} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Have questions about projects? Visit our sister platform:{" "}
              <a href="https://projects.futureee.me" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 700 }}>
                projects.futureee.me
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* STATS & ABOUT */}
      {/* ═══════════════════════════════════════ */}
      <section id="stats" className="stats-section" ref={statsRef} style={{ background: "#fafafb", padding: "4rem 0" }}>
        <div className="container-custom">
          <div className="stats-grid">
            {[
              { id:"stat-enrolled", val:`${counted ? count.toLocaleString() : "0"}+`, label:"Students Enrolled", icon:<Users size={20}/>, color:"#2563eb", bg:"#eff6ff" },
              { id:"stat-rating", val:"4.9 / 5", label:"Average Rating", icon:<Star size={20}/>, color:"#d97706", bg:"#fefce8" },
              { id:"stat-fee", val:"₹119", label:"Certification Fee", icon:<IndianRupee size={20}/>, color:"#059669", bg:"#f0fdf4" },
              { id:"stat-access", val:"Instant", label:"Curriculum Access", icon:<Clock size={20}/>, color:"#7c3aed", bg:"#f5f3ff" },
            ].map((s,i) => (
              <div key={i} id={s.id} className="stat-card" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.25rem" }}>
                <div className="stat-icon" style={{ background:s.bg, color:s.color }}>{s.icon}</div>
                <div><div className="stat-value" style={{ color: "#0f172a" }}>{s.val}</div><div className="stat-label">{s.label}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ background:"#ffffff", padding:"5rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Student Reviews</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a" }}>Trusted by Over 10,247+ Students Across India</h2>
            <p style={{ fontSize:"1.05rem", color:"#64748b" }}>Real feedback from college students who completed their credentials.</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_,j) => <Star key={j} size={18} fill="#f59e0b" color="#f59e0b"/>)}
              </div>
              <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>4.9</span>
              <span style={{ fontSize: "0.88rem", color: "#64748b", fontWeight: 600 }}>from 840+ verified ratings</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(290px, 1fr))", gap:"1.5rem" }}>
            {testimonials.map((t,i) => {
              const avatarColors = ["#2563eb","#7c3aed","#16a34a","#d97706","#e11d48","#0891b2"];
              const initials = t.name.split(" ").map((n:string) => n[0]).join("").slice(0,2);
              return (
                <div key={i} style={{ background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:"16px", padding:"1.75rem", display:"flex", flexDirection:"column", gap:"1rem", boxShadow:"0 2px 10px rgba(0,0,0,0.02)", position: "relative" }}>
                  <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", display: "flex", alignItems: "center", gap: "0.3rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "9999px", padding: "0.15rem 0.5rem" }}>
                    <CheckCircle2 size={11} color="#16a34a" />
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#16a34a" }}>Verified Certificate</span>
                  </div>
                  <div style={{ display:"flex", gap:"2px" }}>{[...Array(t.stars)].map((_,j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b"/>)}</div>
                  <p style={{ fontSize:"0.9rem", color:"#475569", lineHeight:1.7, margin:0, fontStyle:"italic" }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ borderTop:"1px solid #f1f5f9", paddingTop:"1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: avatarColors[i % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#fff" }}>{initials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:"0.9rem", color:"#0f172a" }}>{t.name}</div>
                      <div style={{ fontSize:"0.78rem", color:"#64748b", marginTop:"1px" }}>{t.college}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* FAQ SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section id="faq" style={{ padding: "5rem 0", background: "#fafafb", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Answers</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a" }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b" }}>Everything you need to know about FutureAI internships, certificates, and projects.</p>
          </div>

          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
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
                    padding: "1.25rem 1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    gap: "1rem",
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    color="#64748b"
                    style={{
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 1.5rem 1.25rem", fontSize: "0.9rem", color: "#475569", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* UNIFIED ECOSYSTEM FOOTER */}
      {/* ═══════════════════════════════════════ */}
      <footer id="main-footer" style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "4rem 0 2rem" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr repeat(3, 1fr)", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #2563eb, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 }}>
                  F
                </div>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>FutureAI <span style={{ color: "#2563eb" }}>Internship</span></span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.6, maxWidth: "290px", marginBottom: "1.25rem" }}>
                India&apos;s leading practical AI/ML micro-internship platform. Verifiable certificates, instant offer letters, and career resources.
              </p>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                Part of the FutureAI Student Learning Ecosystem
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                Internships
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li><Link href="#tracks" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>7-Day AI Micro-Track</Link></li>
                <li><Link href="/1_month_internship" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>1-Month Summer Cohort</Link></li>
                <li><Link href="#curriculum" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>Daily Technical Syllabus</Link></li>
                <li><Link href="/verify" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>Verify Certificate QR</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                Learning Resources
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li><Link href="/courses" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>Trending Masterclasses</Link></li>
                <li><a href="https://projects.futureee.me" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>Projects Marketplace <ArrowUpRight size={12} /></a></li>
                <li><a href="https://projects.futureee.me/final-year-projects" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>Final Year Kits</a></li>
                <li><Link href="/dashboard" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>Student Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                Support & Legal
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <li><a href="mailto:support@futureee.me" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>support@futureee.me</a></li>
                <li><Link href="/privacy" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>Privacy Policy</Link></li>
                <li><Link href="/terms" style={{ fontSize: "0.85rem", color: "#475569", textDecoration: "none" }}>Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
              © {new Date().getFullYear()} FutureAI. All rights reserved.
            </span>
            <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Built for engineering students, researchers, and aspiring developers in India.
            </div>
          </div>
        </div>
      </footer>

      {/* RECENT ACTIVITY TOAST */}
      {showToast && (
        <aside
          aria-label="Recent student enrollment notification"
          className="recent-activity-toast"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "1.5rem",
            zIndex: 9999,
            background: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "0.85rem 1.15rem",
            boxShadow: "0 10px 25px -4px rgba(15, 23, 42, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            maxWidth: "360px",
            transition: "all 0.3s ease-in-out"
          }}
        >
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: activities[toastIndex].bg,
            color: activities[toastIndex].color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            {activities[toastIndex].icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
              {activities[toastIndex].name} ({activities[toastIndex].college})
            </div>
            <div style={{ fontSize: "0.75rem", color: "#475569", marginTop: "1px" }}>
              {activities[toastIndex].action}
            </div>
            <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginTop: "2px", display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
              {activities[toastIndex].time}
            </div>
          </div>
          <button
            onClick={() => setShowToast(false)}
            style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "4px" }}
            title="Dismiss notification"
          >
            <X size={14} />
          </button>
        </aside>
      )}
    </main>
  );
}
