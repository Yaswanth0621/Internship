"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { CheckCircle2, BookOpen, Award, Zap, Users, Star, IndianRupee, Clock, ArrowRight, Shield, ShieldCheck, TrendingUp, Code2, Brain, ChevronRight, Rocket, ChevronDown, Flame, X, Sparkles, Check, FileText, QrCode } from "lucide-react";
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

const testimonials = [
  { name:"Priya Sharma", college:"VIT Vellore · B.Tech CSE", text:"The FutureAI internship changed my career trajectory. The hands-on projects were exactly what my resume needed. Got placed at a startup within 2 months!", stars:5 },
  { name:"Rahul Mehta", college:"NIT Warangal · B.Tech ECE", text:"Skeptical at first, but the curriculum is genuinely world-class. The certificate helped me land an ML internship at a product company. Best ₹119 I ever spent!", stars:5 },
  { name:"Ananya Reddy", college:"Osmania University · MCA", text:"Coming from a non-CS background, I was nervous. But the modules were so well-structured that I went from zero to building a working NLP project!", stars:5 },
  { name:"Arjun Patel", college:"BITS Pilani · B.Tech IT", text:"The Generative AI module alone is worth it. I used it to build a project that won our college hackathon. Incredible value for ₹119!", stars:5 },
  { name:"Sneha Nair", college:"Amrita University · B.Tech CSE", text:"This feels like a real internship — the task submissions, the deadlines, the structure. It's the complete package that transformed my skillset.", stars:5 },
  { name:"Mohammed Farhan", college:"JNTUH · B.Tech AI", text:"The MLOps module is incredibly practical. I can now deploy ML models to production — a skill most college students simply don't have!", stars:5 },
];

const faqs = [
  { q:"Is this internship completely free?", a:"Yes! The entire 7-module curriculum and coding tasks are 100% free. You only pay a nominal fee of ₹119 (or ₹229 with official signed Letter of Recommendation) to generate and download your verified credentials upon completion." },
  { q:"Do I get an official Offer Letter?", a:"Yes! Immediately upon registration, you can download an official Internship Offer & Acceptance Letter on Futureee AI letterhead to submit to your college department for approval." },
  { q:"Do I need prior programming experience?", a:"No prior experience is needed. Module 1 covers Python from the ground up. If you already know basic programming, you will progress even faster." },
  { q:"How long does the program take?", a:"Designed as a 7-day intensive (one module per day) or a 4-week deep-dive summer track, but you can complete it at your own pace. There is no hard deadline — your access never expires." },
  { q:"Is the certificate recognised by companies?", a:"Our certificate is an industry-standard credential with a tamper-proof cryptographic QR code and permanent verification portfolio URL. Students regularly feature it on LinkedIn and campus placement resumes." },
  { q:"How do I receive my certificate and LOR?", a:"After completing your modules and submitting your project tasks, pay the ₹119 fee (or ₹229 with LOR) via Razorpay. Both documents are generated and available for instant PDF download." },
  { q:"Can I do this alongside college?", a:"Absolutely. The program is fully online and self-paced. Most students complete it during evenings, weekends, or semester breaks." },
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
  const [currentCohortMonth, setCurrentCohortMonth] = useState("September 2026");
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
        background: "linear-gradient(90deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)",
        color: "#fff",
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
        boxShadow: "0 4px 12px rgba(30,58,138,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        textAlign: "center"
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <CheckCircle2 size={13} color="#4ade80" />
          <span style={{ color: "#e2e8f0" }}>10,247 certificates issued • 4.9★ rating</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <ShieldCheck size={13} color="#4ade80" />
          <span style={{ color: "#e2e8f0" }}>Razorpay Secured • 7-Day Refund Guarantee</span>
        </span>
        <Link href="#tracks" style={{ background: "#fff", color: "#1e3a8a", padding: "0.2rem 0.65rem", borderRadius: "9999px", fontSize: "0.725rem", fontWeight: 800, textDecoration: "none", whiteSpace: "nowrap" }}>
          Enroll Free →
        </Link>
      </div>

      {/* HERO */}
      <section id="hero" className="hero-section">
        <div className="hero-blob hero-blob-right"/><div className="hero-blob hero-blob-left"/>
        <div className="container-custom">
          <div className="hero-grid">
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              <div>
                <span className="enrolling-badge">
                  <span className="enrolling-dot animate-pulse"/>
                  Now Enrolling — {currentCohortMonth} Batch
                </span>
              </div>
              <div>
                <h1 className="hero-headline">Master AI/ML.<br/><span className="hero-headline-accent">Get Certified.</span></h1>
                <p className="hero-subtext">
                  A comprehensive, hands-on micro-internship. Learn AI & Machine Learning for free, then get your industry-verified certificate for just <strong style={{ color:"#111827" }}>₹119</strong> <span style={{ textDecoration:"line-through", color:"#94a3b8", marginLeft:"0.25rem", fontSize:"0.9em" }}>₹999</span>.
                </p>
              </div>

              {/* RETENTION HOOK: RESUME LEARNING BANNER FOR LOGGED IN USERS */}
              {user && (
                <div style={{
                  background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
                  border: "1.5px solid #93c5fd",
                  borderRadius: "16px",
                  padding: "0.85rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.08)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <span className="animate-flame" style={{ fontSize: "1.35rem" }}>🔥</span>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e3a8a" }}>
                        Active Session: {user.displayName?.split(" ")[0] || "Student"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#475569" }}>
                        Your modules & streak are saved. Pick up right where you left off!
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard" className="btn-primary btn-sm" style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    Resume Dashboard <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              <div className="hero-cta-row">
                <Link href="#tracks" id="hero-cta-start" className="btn-primary btn-lg">Start My Internship <ArrowRight size={18}/></Link>
                <Link href="#tracks" id="hero-cta-syllabus" className="btn-outline btn-lg">Choose Track</Link>
              </div>
              <div className="hero-trust-row">
                {["100% Free Curriculum","Instant Offer Letter","Verified Cert & LOR"].map(t => (
                  <span key={t} className="trust-item"><CheckCircle2 size={14} color="#16a34a"/>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative" }}>
              <div className="hero-card animate-float" id="hero-stats-card">
                <div style={{ display:"flex", gap:"0.75rem" }}>
                  {[{label:"Enrolled",val:"10k+",bg:"#eff6ff",text:"#1d4ed8"},{label:"Rating",val:"4.9★",bg:"#fffbeb",text:"#92400e"},{label:"Fee",val:"₹119",bg:"#f0fdf4",text:"#166534"}].map(s => (
                    <div key={s.label} className="hero-stat-pill" style={{ background:s.bg }}>
                      <div style={{ fontSize:"1.05rem", fontWeight:800, color:s.text }}>{s.val}</div>
                      <div style={{ fontSize:"0.65rem", fontWeight:700, color:"#6b7a8f", textTransform:"uppercase", letterSpacing:"0.06em", marginTop:"2px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="hero-logo-box">
                  <Image src="/logo.png" alt="FutureAI Internship Platform Logo - AI ML Course" width={260} height={200} style={{ width:"100%", height:"auto", maxHeight:"160px", objectFit:"contain" }} priority/>
                </div>
                <Link href="#tracks" id="hero-enroll-card-btn" className="hero-card-cta"><span>Enroll Now</span><ChevronRight size={18}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section id="trust-bar" style={{ background:"#f9fafb", borderTop:"1px solid #f3f4f6", borderBottom:"1px solid #f3f4f6", padding:"1.5rem 0" }}>
        <div className="container-custom">
          <p style={{ textAlign:"center", fontSize:"0.78rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem" }}>
            Trusted by students from India&apos;s top colleges
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0.5rem 1.5rem", textAlign: "center" }}>
            {colleges.map(c => <span key={c} style={{ fontSize:"0.825rem", fontWeight:600, color:"#6b7a8f" }}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* COMBO PACK CTA */}
      <section style={{ padding: "4rem 0 2rem", background: "#fff" }}>
        <div className="container-custom">
          <div style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
            borderRadius: "24px",
            padding: "3rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            boxShadow: "0 20px 40px -10px rgba(30,58,138,0.4)"
          }}>
            <span style={{ background: "#fbbf24", color: "#92400e", padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>
              Limited Time Offer
            </span>
            <h2 className="combo-headline" style={{ fontSize: "clamp(1.35rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "1rem", color: "#fff", lineHeight: 1.2 }}>
              The Ultimate 7-Course Combo Pack
            </h2>
            <p style={{ fontSize: "1rem", marginBottom: "2rem", maxWidth: "700px", color: "#bfdbfe", lineHeight: 1.65 }}>
              Get lifetime access to all 7 trending masterclasses (AI, Web Dev, Data Science, DSA & more) plus verified certificates for a single payment of <strong>₹499</strong>.
            </p>
            <Link href="/dashboard/payment?courseId=combo" className="combo-btn hover:scale-105" style={{
              background: "#fbbf24",
              color: "#92400e",
              padding: "0.875rem 2rem",
              borderRadius: "9999px",
              fontWeight: 800,
              fontSize: "1rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              transition: "transform 0.2s",
              boxShadow: "0 8px 20px rgba(251,191,36,0.4)"
            }}>
              <Star fill="currentColor" size={20} /> Unlock All Courses For ₹499
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNSHIP TRACK CHOICES */}
      <section id="tracks" style={{ padding: "5rem 0 4rem", background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container-custom">
          <div className="section-header" style={{ marginBottom: "3rem", textAlign: "center" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Choose Your Track</span>
            <h2 style={{ fontSize: "clamp(1.35rem, 4vw, 2rem)", fontWeight: 800, color: "#111827", marginTop: "0.5rem" }}>Select Your Learning Journey</h2>
            <p style={{ fontSize: "1.05rem", color: "#4b5563", maxWidth: "600px", margin: "0.5rem auto 0", lineHeight: 1.6 }}>
              Whether you need a rapid skills boost or an in-depth academic program, we have the perfect internship track for you.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            {/* 7-DAY CARD */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", position: "relative", transition: "transform 0.2s" }} className="hover:-translate-y-1">
              <div>
                <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "#f0fdf4", color: "#16a34a", padding: "0.25rem 0.65rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, border: "1px solid #d1fae5" }}>
                  Intensive
                </span>
                <div style={{ width: "44px", height: "44px", background: "#f5f3ff", color: "#7c3aed", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Zap size={22} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>7-Day AI/ML Micro-Internship</h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7a8f", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Perfect for students seeking rapid hands-on skill validation. Focuses on core building blocks, quick exercises, and immediate certification.
                </p>
                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {["Complete 7-day curriculum at your own pace", "Immediate certificate verification & download", "Submit core project tasks for review", "Nominal ₹119 certification fee (88% waiver)"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#4b5563", lineHeight: 1.5 }}>
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

            {/* 1-MONTH CARD */}
            <div style={{ background: "#ffffff", border: "2px solid #2563eb", borderRadius: "24px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 8px 30px rgba(37,99,235,0.06)", position: "relative", transition: "transform 0.2s" }} className="hover:-translate-y-1">
              <div>
                <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "#eff6ff", color: "#2563eb", padding: "0.25rem 0.65rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, border: "1px solid #bfdbfe" }}>
                  Highly Popular
                </span>
                <div style={{ width: "44px", height: "44px", background: "#eff6ff", color: "#2563eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <BookOpen size={22} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>1-Month Summer Internship</h3>
                <p style={{ fontSize: "0.875rem", color: "#6b7a8f", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Designed for deep, structured learning. Perfect for academic recognition. Complete 4 weeks of syllabus, 4 complex projects, and earn an optional LOR.
                </p>
                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {["Rigorous 4-week structured curriculum", "Instant certificate verification upon completion", "Optional signed Letter of Recommendation (+₹110)", "Full-scale MLOps and Generative AI projects"].map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "#4b5563", lineHeight: 1.5 }}>
                        <CheckCircle2 size={16} color="#2563eb" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Link href="/1_month_internship" className="btn-outline" style={{ width: "100%", justifyContent: "center", display: "flex", gap: "0.5rem", background: "#2563eb", color: "#ffffff", border: "none" }}>
                  Explore 1-Month Track <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 TRENDING MASTERCLASSES MARKETPLACE */}
      <section id="trending-courses" style={{ padding: "5rem 0", background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div className="section-header" style={{ marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fef3c7", border: "1px solid #fde68a", padding: "0.35rem 0.85rem", borderRadius: "9999px", marginBottom: "0.75rem" }}>
              <Flame size={16} color="#d97706" />
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                2026 Most Trending Masterclasses
              </span>
            </div>
            <h2>Learn High-Income Tech Skills at Low Cost</h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6 }}>
              Industry-grade, extensive curriculums with practical sub-topics, real-world code labs, capstones, and downloadable official course manuals (PDF). <strong>Module 1 is 100% Free</strong> to start!
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {trendingCourses.map((c) => (
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
                  background: "#fff",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", gap: "0.5rem" }}>
                    <span style={{ background: "#eff6ff", color: "#2563eb", fontSize: "0.72rem", fontWeight: 800, padding: "0.25rem 0.6rem", borderRadius: "9999px" }}>
                      {c.badge}
                    </span>
                    <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.72rem", fontWeight: 800, padding: "0.25rem 0.6rem", borderRadius: "9999px" }}>
                      Module 1 FREE
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.35rem", lineHeight: 1.35 }}>
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
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                      Curriculum Highlights:
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <li style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#475569" }}>
                        <Check size={14} color="#16a34a" /> 7 Long, In-Depth Modules ({c.duration})
                      </li>
                      <li style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#475569" }}>
                        <Check size={14} color="#16a34a" /> Production Capstone Project Included
                      </li>
                      <li style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#16a34a", fontWeight: 700 }}>
                        <FileText size={14} color="#16a34a" /> Official PDF Course Manual Download
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a" }}>
                      ₹{c.price}
                    </span>
                    <span style={{ fontSize: "0.95rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 600 }}>
                      ₹{c.originalPrice}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 800, background: "#f0fdf4", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
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
                        background: "#f8fafc",
                        color: "#334155",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        textDecoration: "none",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      View Full Curriculum <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={`/dashboard?courseId=${c.id}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        width: "100%",
                        padding: "0.7rem",
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: "#fff",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
                      }}
                    >
                      Start Free Preview (Module 1) <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Browse All Courses CTA */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              href="/courses"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2.25rem",
                background: "#0f172a",
                color: "#fff",
                borderRadius: "12px",
                fontWeight: 800,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              Browse All {trendingCourses.length} Masterclasses <ArrowRight size={18} />
            </Link>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.75rem" }}>
              Verified certificates • Official PDF manuals • Module 1 always free
            </p>
          </div>
        </div>
      </section>

      {/* PROJECT MARKETPLACE CTA */}
      <section style={{ padding: "5rem 0", background: "#f5f3ff", borderBottom: "1px solid #ede9fe" }}>
        <div className="container-custom">
          <div style={{
            background: "#fff",
            borderRadius: "24px",
            border: "1px solid #ddd6fe",
            padding: "3rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 10px 40px -10px rgba(124,58,237,0.15)"
          }}>
            <div style={{ width: "64px", height: "64px", background: "#f3e8ff", color: "#7c3aed", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
              <Code2 size={32} />
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, marginBottom: "1rem", color: "#111827", lineHeight: 1.2 }}>
              Looking for Final Year Project Kits?
            </h2>
            <p style={{ fontSize: "1.05rem", marginBottom: "2rem", maxWidth: "700px", color: "#4b5563", lineHeight: 1.65 }}>
              Skip the struggle. Get complete, production-ready project kits including source code, documentation, architecture diagrams, and PPTs. Perfect for engineering students and developers.
            </p>
            <a 
              href="https://projects.futureee.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#7c3aed",
                color: "#fff",
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "1.05rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                transition: "transform 0.2s, background 0.2s",
                boxShadow: "0 8px 20px rgba(124,58,237,0.4)"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#6d28d9"}
              onMouseOut={(e) => e.currentTarget.style.background = "#7c3aed"}
            >
              Explore Projects Marketplace <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="stats-section" ref={statsRef}>

        <div className="container-custom">
          <div className="stats-grid">
            {[
              { id:"stat-enrolled", val:`${counted ? count.toLocaleString() : "0"}+`, label:"Students Enrolled", icon:<Users size={20}/>, color:"#2563eb", bg:"#eff6ff" },
              { id:"stat-rating", val:"4.9 / 5", label:"Average Rating", icon:<Star size={20}/>, color:"#d97706", bg:"#fffbeb" },
              { id:"stat-fee", val:"₹119", label:"Certification Fee", icon:<IndianRupee size={20}/>, color:"#059669", bg:"#f0fdf4" },
              { id:"stat-access", val:"Instant", label:"Course Access", icon:<Clock size={20}/>, color:"#7c3aed", bg:"#f5f3ff" },
            ].map((s,i) => (
              <div key={i} id={s.id} className="stat-card">
                <div className="stat-icon" style={{ background:s.bg, color:s.color }}>{s.icon}</div>
                <div><div className="stat-value">{s.val}</div><div className="stat-label">{s.label}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="benefits-section" style={{ background:"#fafafa" }}>
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag" style={{ background:"#f3f4f6", color:"#111827" }}>About Our Architects</span>
            <h2>FUTUREEE AI</h2>
            <p style={{ fontSize:"1.05rem", color:"#4b5563", maxWidth:"800px", margin:"0 auto", lineHeight:1.7 }}>
              FUTUREEE AI is a premier global agency specializing in enterprise-grade cognitive architectures and predictive neuro-modeling. Founded in 2018, we streamline the ML pipeline for Fortune 500 companies. We built this platform to scout top talent to join our elite teams.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"2rem", marginTop:"3rem" }}>
            {[
              { icon:<Shield size={24}/>, bg:"#eff6ff", c:"#2563eb", title:"Project Sentinel-V", desc:"An autonomous surveillance grid utilizing federated reinforcement learning to detect anomalies in smart city infrastructure with 99.8% precision." },
              { icon:<BookOpen size={24}/>, bg:"#eef2ff", c:"#4f46e5", title:"Cortex NLP", desc:"A proprietary large language model fine-tuned for high-stakes legal document synthesis and contextual arbitration in over 40 jurisdictions." },
              { icon:<TrendingUp size={24}/>, bg:"#f0fdf4", c:"#059669", title:"OmniStock Engine", desc:"A decentralized, low-latency predictive trading engine leveraging transformer-based time-series forecasting for volatile crypto markets." },
            ].map((p,i) => (
              <div key={i} className="stat-card" style={{ flexDirection:"column", alignItems:"flex-start", gap:"1rem" }}>
                <div className="stat-icon" style={{ background:p.bg, color:p.c }}>{p.icon}</div>
                <div>
                  <h3 style={{ fontSize:"1.1rem", fontWeight:700, color:"#111827", marginBottom:"0.5rem" }}>{p.title}</h3>
                  <p style={{ fontSize:"0.9rem", color:"#6b7a8f", lineHeight:1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section id="technologies" style={{ padding: "4rem 0", background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        <div className="container-custom">
          <p style={{ textAlign: "center", fontSize: "0.78rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem" }}>
            Technologies You Will Master
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", opacity: 0.7 }}>
            {["Python", "NumPy", "Pandas", "Scikit-Learn", "TensorFlow", "Keras", "OpenCV", "NLTK", "FastAPI", "Docker", "Git", "MLOps"].map(tech => (
              <span key={tech} style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", filter: "grayscale(100%)" }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="curriculum-section">
        <div className="container-custom">
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-tag">Explore Curriculum</span>
            <h2>Comprehensive Technical Syllabus</h2>
            <p style={{ fontSize:"1.05rem", color:"#6b7a8f" }}>Industry-standard learning modules designed for engineering students with zero prior AI experience.</p>
          </div>

          {/* Premium Syllabus Toggle Switcher */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
            <div style={{ 
              display: "inline-flex", 
              background: "#f1f5f9", 
              padding: "6px", 
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
              position: "relative"
            }}>
              <button 
                type="button"
                onClick={() => setCurriculumTrack("7_day")}
                style={{
                  padding: "0.75rem 1.75rem",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  transition: "all 0.25s",
                  cursor: "pointer",
                  background: curriculumTrack === "7_day" ? "#fff" : "transparent",
                  color: curriculumTrack === "7_day" ? "#2563eb" : "#64748b",
                  border: "none",
                  boxShadow: curriculumTrack === "7_day" ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <Zap size={15} /> 7-Day Intensive
              </button>
              <button 
                type="button"
                onClick={() => setCurriculumTrack("1_month")}
                style={{
                  padding: "0.75rem 1.75rem",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  transition: "all 0.25s",
                  cursor: "pointer",
                  background: curriculumTrack === "1_month" ? "#fff" : "transparent",
                  color: curriculumTrack === "1_month" ? "#2563eb" : "#64748b",
                  border: "none",
                  boxShadow: curriculumTrack === "1_month" ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <BookOpen size={15} /> 1-Month Summer Track
              </button>
            </div>
          </div>

          <div className="curriculum-grid">
            {curriculumTrack === "7_day" ? (
              curriculum.map((item,i) => (
                <div key={i} id={`curriculum-item-${i}`} className="curriculum-card">
                  <div className="curriculum-icon" style={{ background:item.bg, color:item.c, border:`1px solid ${item.c}22` }}>{item.icon}</div>
                  <div>
                    <div className="curriculum-day" style={{ color:item.c }}>{item.day}</div>
                    <h3 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.5rem", color:"#111827" }}>{item.title}</h3>
                    <p style={{ fontSize:"0.875rem", color:"#6b7a8f", lineHeight:1.65, margin:0 }}>{item.desc}</p>
                  </div>
                  <Link href="/auth?course=7_day" className="curriculum-module-link" style={{ color:item.c }}>View Module <ArrowRight size={14}/></Link>
                </div>
              ))
            ) : (
              summerCurriculum.map((item,i) => (
                <div key={i} id={`summer-curriculum-item-${i}`} className="curriculum-card animate-fade-up">
                  <div className="curriculum-icon" style={{ background:item.bg, color:item.c, border:`1px solid ${item.c}22` }}>{item.icon}</div>
                  <div>
                    <div className="curriculum-day" style={{ color:item.c }}>{item.week}</div>
                    <h3 style={{ fontSize:"1rem", fontWeight:700, marginBottom:"0.5rem", color:"#111827" }}>{item.title}</h3>
                    <p style={{ fontSize:"0.875rem", color:"#6b7a8f", lineHeight:1.65, margin:0 }}>{item.desc}</p>
                  </div>
                  <Link href="/1_month_internship" className="curriculum-module-link" style={{ color:item.c }}>Explore Syllabus <ArrowRight size={14}/></Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ background:"#fafafa", padding:"5rem 0" }}>
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Student Reviews</span>
            <h2>Trusted by 10,247+ Students Across India</h2>
            <p style={{ fontSize:"1.05rem", color:"#6b7a8f" }}>Real reviews from verified students — not marketing copy.</p>
            {/* Aggregate rating bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_,j) => <Star key={j} size={20} fill="#f59e0b" color="#f59e0b"/>)}
              </div>
              <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#111827" }}>4.9</span>
              <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>from 847 verified ratings</span>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(290px, 1fr))", gap:"1.5rem", marginTop:"3rem" }}>
            {testimonials.map((t,i) => {
              const avatarColors = ["#2563eb","#7c3aed","#16a34a","#d97706","#e11d48","#0891b2"];
              const initials = t.name.split(" ").map((n:string) => n[0]).join("").slice(0,2);
              return (
                <div key={i} style={{ background:"#fff", border:"1px solid #e8ecf2", borderRadius:"16px", padding:"1.75rem", display:"flex", flexDirection:"column", gap:"1rem", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", position: "relative" }}>
                  {/* Verified badge */}
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.3rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "9999px", padding: "0.2rem 0.55rem" }}>
                    <CheckCircle2 size={11} color="#16a34a" />
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#16a34a" }}>Verified Purchase</span>
                  </div>
                  <div style={{ display:"flex", gap:"2px" }}>{[...Array(t.stars)].map((_,j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b"/>)}</div>
                  <p style={{ fontSize:"0.9rem", color:"#374151", lineHeight:1.7, margin:0, fontStyle:"italic" }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:"1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: avatarColors[i % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#fff" }}>{initials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:"0.9rem", color:"#111827" }}>{t.name}</div>
                      <div style={{ fontSize:"0.78rem", color:"#6b7a8f", marginTop:"1px" }}>{t.college}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE CERTIFICATE PREVIEW GENERATOR */}
      <section id="cert-preview" style={{ padding: "5rem 0", background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container-custom">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Interactive Tool</span>
            <h2 style={{ fontSize: "clamp(1.35rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>
              Preview Your Verified Credential
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "620px", margin: "0.5rem auto 0", lineHeight: 1.6 }}>
              See exactly how your name will appear on the official, tamper-proof FutureAI credential before you start.
            </p>
          </div>

          <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
            {/* Name Input Bar */}
            <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="preview-name-input" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={16} color="#2563eb" /> Type Your Name to Preview Live:
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
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  borderRadius: "12px",
                  border: "2px solid #2563eb",
                  outline: "none",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.1)",
                  color: "#0f172a",
                  background: "#fff"
                }}
              />
            </div>

            {/* Live Rendered Certificate Mockup */}
            <div className="cert-preview-wrapper" style={{
              width: "100%",
              background: "#fdfcf9",
              border: "6px solid #0f172a",
              outline: "3px solid #daa520",
              outlineOffset: "-6px",
              borderRadius: "16px",
              padding: "3rem 2.5rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Subtle Guilloche Corner Accents */}
              <div style={{ position: "absolute", top: "12px", left: "12px", width: "36px", height: "36px", borderTop: "2px solid #daa520", borderLeft: "2px solid #daa520" }} />
              <div style={{ position: "absolute", top: "12px", right: "12px", width: "36px", height: "36px", borderTop: "2px solid #daa520", borderRight: "2px solid #daa520" }} />
              <div style={{ position: "absolute", bottom: "12px", left: "12px", width: "36px", height: "36px", borderBottom: "2px solid #daa520", borderLeft: "2px solid #daa520" }} />
              <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "36px", height: "36px", borderBottom: "2px solid #daa520", borderRight: "2px solid #daa520" }} />

              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#1e3a8a", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  FUTUREEE AI COGNITIVE ARCHITECTURES
                </div>
                <div style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.75rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "0.02em", fontFamily: "serif" }}>
                  CERTIFICATE OF COMPLETION
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>
                  This is proudly presented to
                </div>

                {/* Candidate Name */}
                <div className="cert-name-preview" style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  fontFamily: "serif",
                  borderBottom: "2px solid #daa520",
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
                  For successfully demonstrating professional competency in modern Artificial Intelligence, PyTorch Deep Learning Pipelines, and Production MLOps architectures.
                </p>

                {/* Certificate Details Footer */}
                <div className="cert-footer-grid" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a" }}>ID: FAI-2026-XXXX</div>
                    <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Status: Official Verified Record</div>
                    <div style={{ fontSize: "0.7rem", color: "#64748b" }}>AICTE Industry Pattern</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                    <div style={{ width: "52px", height: "52px", border: "2px dashed #2563eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}>
                      <QrCode size={32} />
                    </div>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b" }}>SCAN TO VERIFY</span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ width: "110px", borderBottom: "1.5px solid #0f172a", marginBottom: "4px" }} />
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#0f172a" }}>Dr. V. Rao</div>
                    <div style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 600 }}>Lead Directorate, FutureAI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Anchor CTA Bar */}
            <div style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "1.5rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.25rem",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 700 }}>₹999</span>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: "#111827" }}>₹119</span>
                  <span style={{ background: "#dcfce7", color: "#15803d", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 800 }}>88% Student Waiver</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px" }}>
                  Includes instant downloadable Certificate + instant signed LOR option (+₹110)
                </div>
              </div>
              <Link href="/auth" className="btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
                Claim & Unlock This Credential <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RECRUITER-READY COMPARISON GRID */}
      <section id="comparison" style={{ padding: "5rem 0", background: "#f8fafc" }}>
        <div className="container-custom">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag" style={{ background: "#eff6ff", color: "#2563eb" }}>Recruiter Value</span>
            <h2 style={{ fontSize: "clamp(1.35rem, 4vw, 2.25rem)", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem" }}>
              Why HR & Placement Cells Trust FutureAI
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "600px", margin: "0.5rem auto 0", lineHeight: 1.6 }}>
              Generic YouTube tutorials get ignored in placement drives. FutureAI credentials give you proof of corporate rigor.
            </p>
          </div>

          <div className="comparison-table-scroll" style={{ maxWidth: "860px", margin: "0 auto", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <div className="comparison-grid-inner">
              <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1.4fr 1.6fr", padding: "1.25rem 1.5rem", background: "#f1f5f9", fontWeight: 800, fontSize: "0.85rem", color: "#334155", borderBottom: "1px solid #e2e8f0" }}>
                <div>FEATURE / CREDENTIAL</div>
                <div style={{ textAlign: "center", color: "#64748b" }}>Generic Online Courses</div>
                <div style={{ textAlign: "center", color: "#2563eb" }}>FutureAI Micro-Internship</div>
              </div>

              {[
                { feat: "Instant Official Internship Offer Letter", bad: "❌ None", good: "✅ Instant Download on Day 1" },
                { feat: "Tamper-Proof Cryptographic QR Verification", bad: "❌ Plain PDF / Easily Forged", good: "✅ Scannable Live Registry URL" },
                { feat: "Signed Letter of Recommendation (LOR)", bad: "❌ Not Available", good: "✅ Official Letterhead & Seal" },
                { feat: "Production-Grade Capstone (Docker / FastAPI)", bad: "❌ Basic Toy Scripts", good: "✅ Deployable End-to-End API" },
                { feat: "AICTE University Internship Guidelines", bad: "❌ Often Rejected by HODs", good: "✅ Formally Accepted for Credits" },
                { feat: "Public Developer Portfolio Page", bad: "❌ None", good: "✅ Hosted at futureee.me/u/..." },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.2fr 1.4fr 1.6fr",
                    padding: "1.1rem 1.5rem",
                    borderBottom: idx === 5 ? "none" : "1px solid #f1f5f9",
                    alignItems: "center",
                    background: idx % 2 === 1 ? "#fafbfd" : "#fff",
                    fontSize: "0.875rem"
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#1e293b" }}>{row.feat}</div>
                  <div style={{ textAlign: "center", color: "#94a3b8", fontWeight: 600 }}>{row.bad}</div>
                  <div style={{ textAlign: "center", color: "#16a34a", fontWeight: 700, background: "#f0fdf4", padding: "0.35rem 0.75rem", borderRadius: "8px", border: "1px solid #dcfce7" }}>{row.good}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS + PRICING */}
      <section id="benefits" className="benefits-section">
        <div className="container-custom">
          <div className="benefits-grid">
            <div>
              <span className="section-tag">Why FutureAI</span>
              <h2 style={{ margin:"1.25rem 0 1rem" }}>Everything you need to <span style={{ color:"#2563eb" }}>launch your AI career</span></h2>
              <p style={{ fontSize:"1.05rem", color:"#6b7a8f", marginBottom:"2rem" }}>We built a program that actually works — hands-on, guided, and affordable for every engineering student in India.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
                {benefits.map((b,i) => (
                  <div key={i} className="benefit-item">
                    <div className="benefit-check"><CheckCircle2 size={16} color="#2563eb"/></div>
                    <span className="benefit-text">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div className="pricing-card" id="pricing">
                <div className="pricing-amount-box">
                  <div className="pricing-label">Early-Bird Certification Fee</div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 700 }}>₹999</span>
                    <span className="pricing-amount">₹119</span>
                  </div>
                  <div className="pricing-sublabel">88% Fee Waiver · One-time · No Subscription</div>
                  <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#2563eb", fontWeight: 700 }}>
                    + Optional Signed LOR: ₹110 (Total ₹229)
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", marginBottom:"2rem" }}>
                  {["Complete 7-day or 1-month program","Submit your project tasks","Pay ₹119 via Razorpay","Certificate & LOR unlocked instantly"].map((step,i) => (
                    <div key={i} className="pricing-step">
                      <div className="pricing-step-num">{i+1}</div>
                      <span style={{ fontSize:"0.875rem", color:"#364052", fontWeight:500 }}>{step}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/auth?course=${curriculumTrack}`} id="pricing-cta" className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"0.875rem" }}>Enroll Now <ArrowRight size={16}/></Link>
                <div className="pricing-trust"><Shield size={14} color="#16a34a"/><span>Secure &amp; trusted by 10,000+ students</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background:"#fafafa", padding:"5rem 0" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto", padding:"0 1.5rem" }}>
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p style={{ fontSize:"1.05rem", color:"#6b7a8f" }}>Everything you need to know before you enroll.</p>
          </div>
          <div style={{ marginTop:"2.5rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
            {faqs.map((f,i) => (
              <div key={i} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"12px", overflow:"hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq===i?null:i)}
                  style={{ width:"100%", padding:"1.25rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}
                  aria-expanded={openFaq===i}
                >
                  <span style={{ fontWeight:700, fontSize:"0.95rem", color:"#111827" }}>{f.q}</span>
                  <ChevronDown size={18} color="#6b7a8f" style={{ transform:openFaq===i?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s", flexShrink:0 }}/>
                </button>
                {openFaq===i && (
                  <div style={{ padding:"0 1.5rem 1.25rem", color:"#4b5563", fontSize:"0.875rem", lineHeight:1.7, borderTop:"1px solid #f3f4f6", paddingTop:"0.875rem" }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY TRUST & LEGITIMACY SECTION */}
      <section style={{ padding: "4rem 0", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-tag" style={{ background: "#f0fdf4", color: "#16a34a" }}>About FutureAI</span>
            <h2 style={{ marginTop: "0.75rem" }}>A Legitimate, Trusted Platform</h2>
            <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "600px", margin: "0.5rem auto 0" }}>
              We know online certifications can feel sketchy. Here&apos;s why thousands of students trust us.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
            {[
              { icon: "🏢", title: "Registered Business", desc: "FutureAI (Futureee AI) is a registered education technology brand based in Hyderabad, Telangana, India.", detail: "Est. 2024 | team@futureee.me" },
              { icon: "🔐", title: "Razorpay Verified Merchant", desc: "All payments are processed through Razorpay — verified merchant. KYC verified, regulated by RBI.", detail: "8 million+ businesses trust Razorpay" },
              { icon: "🏆", title: "10,247 Certificates Issued", desc: "Every certificate has a unique tamper-proof QR code verifiable at futureee.me/verify in real time.", detail: "Zero disputed certificates since launch" },
              { icon: "🎓", title: "Students From Top Colleges", desc: "Our students represent IITs, NITs, BITS, VIT, Osmania, JNTUH and 200+ other institutions across India.", detail: "IIT • NIT • BITS Pilani • VIT • JNTUH" },
              { icon: "💬", title: "Real Human Support", desc: "Have a problem? Our team responds within 2 hours on WhatsApp and email — not a bot, a real person.", detail: "WhatsApp: +91 79890 13513" },
              { icon: "🛡️", title: "7-Day Refund Policy", desc: "If you are not satisfied for any reason within 7 days of purchase, we will refund you 100%, no questions asked.", detail: "Zero-hassle refund process" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>{item.title}</h4>
                <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.65, margin: "0 0 0.5rem" }}>{item.desc}</p>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb" }}>{item.detail}</span>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a
              href="https://wa.me/917989013513?text=Hi%2C%20I%20have%20a%20question%20about%20FutureAI%20internship"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#22c55e", color: "#fff", padding: "0.85rem 2rem", borderRadius: "9999px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}
            >
              💬 Chat With Us on WhatsApp
            </a>
            <p style={{ fontSize: "0.825rem", color: "#94a3b8", marginTop: "0.75rem" }}>Response time: Under 2 hours • team@futureee.me</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" style={{ background:"linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)", padding:"6rem 0", color:"#fff" }}>
        <div className="container-custom" style={{ textAlign:"center" }}>
          <div style={{ maxWidth:"680px", margin:"0 auto" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", color:"#fff", padding:"0.3rem 0.875rem", borderRadius:"999px", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"1.5rem" }}>
              <CheckCircle2 size={14} /> Open Enrollment — Join Any Time
            </span>
            <h2 style={{ fontSize:"clamp(1.4rem, 4.5vw, 2.75rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.03em", marginBottom:"1.25rem", lineHeight:1.18 }}>
              Ready to break into AI & Machine Learning?
            </h2>
            <p style={{ fontSize:"0.95rem", color:"rgba(255,255,255,0.85)", lineHeight:1.65, marginBottom:"2rem" }}>
              Join 10,247+ engineering students from across India. Start learning today for free, build production-grade AI projects, and get your verified certificate.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:"1rem", flexWrap:"wrap" }}>
              <Link href="/auth" id="final-cta-btn" className="btn-primary" style={{ background:"#fff", color:"#1e40af", padding:"0.875rem 2.25rem", fontSize:"1rem", fontWeight:800, border:"none" }}>
                Enroll Free Now <ArrowRight size={18}/>
              </Link>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:"2rem", marginTop:"2.5rem", flexWrap:"wrap" }}>
              {["100% Free Access","7-Day Refund Guarantee","Verified Certificate"].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.85rem", color:"rgba(255,255,255,0.8)", fontWeight:600 }}>
                  <Check size={16} color="#4ade80"/>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO FOOTER */}
      <section style={{ padding: "3rem 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", marginBottom: "1rem" }}>Popular Internships</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Free AI Internship 2026", "Machine Learning Internship India", "Python for Data Science", "Virtual AI Training"].map(link => (
                  <li key={link}><Link href="/auth" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", marginBottom: "1rem" }}>Certification Search</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Verify Certificate ID", "Download Internship Letter", "LinkedIn Profile Verification", "AI ML Skills Badge"].map(link => (
                  <li key={link}><Link href="/verify" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", marginBottom: "1rem" }}>Student Resources</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Resume Building Tips", "AI Interview Prep", "Machine Learning Roadmap", "Python Career Guide"].map(link => (
                  <li key={link}><Link href="#curriculum" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>{link}</Link></li>
                ))}
                <li>
                  <a href="https://projects.futureee.me" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    Project Kits Marketplace <Code2 size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="main-footer" className="site-footer">
        <div className="container-custom">
          <div className="footer-inner">
            <div>
              <div className="footer-logo">
                <div className="footer-logo-icon"><Zap size={18}/></div>
                <span className="footer-logo-text">FutureAI <span style={{ color:"#2563eb" }}>Internship</span></span>
              </div>
              <p className="footer-desc">Empowering engineering students with specialised, high-impact AI & Machine Learning micro-internships.</p>
            </div>
            <div className="footer-bottom">
              <div className="footer-links">
                <Link href="/privacy" className="footer-link">Privacy</Link>
                <Link href="/terms" className="footer-link">Terms</Link>
                <a href="mailto:team@futureee.me" className="footer-link">Support</a>
              </div>
              <span className="footer-copy">© 2026 FutureAI Internship · All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>

      {/* LIVE FLOATING RECENT ACTIVITY SOCIAL PROOF TOAST */}
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
            boxShadow: "0 12px 30px -4px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            maxWidth: "360px",
            transition: "all 0.3s ease-in-out"
          }}
        >
          <div style={{
            width: "38px",
            height: "38px",
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
            <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
              {activities[toastIndex].name} ({activities[toastIndex].college})
            </div>
            <div style={{ fontSize: "0.775rem", color: "#475569", marginTop: "1px" }}>
              {activities[toastIndex].action}
            </div>
            <div style={{ fontSize: "0.675rem", color: "#94a3b8", marginTop: "2px", display: "flex", alignItems: "center", gap: "0.35rem" }}>
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
