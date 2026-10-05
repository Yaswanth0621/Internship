"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown, ChevronRight, CheckCircle2, BookOpen, Lock, Unlock,
  Clock, Star, Users, IndianRupee, FileText, ArrowRight, Award,
  Zap, Shield, Code2, Brain, TrendingUp, Flame, Home, Play,
  BarChart3, Target, Globe, Download, Check
} from "lucide-react";
import type { TrendingCourse } from "@/data/trendingCourses";

interface Props {
  course: TrendingCourse;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Artificial Intelligence": <Brain size={22} />,
  "Automation & Agents": <Zap size={22} />,
  "Web Development": <Code2 size={22} />,
  "Data Science": <TrendingUp size={22} />,
  "Cloud & Security": <Shield size={22} />,
  "Coding Interviews & DSA": <Target size={22} />,
  "Data Analytics": <BarChart3 size={22} />,
};

const categoryColors: Record<string, { bg: string; color: string }> = {
  "Artificial Intelligence": { bg: "#eff6ff", color: "#2563eb" },
  "Automation & Agents": { bg: "#fdf4ff", color: "#9333ea" },
  "Web Development": { bg: "#f0fdf4", color: "#16a34a" },
  "Data Science": { bg: "#fff7ed", color: "#ea580c" },
  "Cloud & Security": { bg: "#f0f9ff", color: "#0284c7" },
  "Coding Interviews & DSA": { bg: "#fefce8", color: "#ca8a04" },
  "Data Analytics": { bg: "#fdf2f8", color: "#db2777" },
};

export default function CourseDetailClient({ course }: Props) {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const catColor = categoryColors[course.category] ?? { bg: "#f1f5f9", color: "#334155" };
  const discountPct = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  const faqs = [
    {
      q: `Is the first module of ${course.title} really free?`,
      a: `Yes! Module 1 is 100% free with no credit card required. You get full access to all lessons, code labs, and the capstone mini-project in Module 1. Modules 2–7 are unlocked with a one-time payment of ₹${course.price}.`,
    },
    {
      q: `Who is this ${course.category} course designed for?`,
      a: `This course is designed for ${course.level} learners. Whether you're a student looking to break into the industry or a working professional upgrading your skill set, the curriculum is structured to take you from fundamentals to production-grade expertise.`,
    },
    {
      q: `What is the course duration and can I learn at my own pace?`,
      a: `The course is designed for ${course.duration}. All content is fully self-paced — there are no deadlines or batch timings. You can access modules 24/7 from any device and progress at your own speed.`,
    },
    {
      q: `Will I get a certificate upon completing this course?`,
      a: `Yes. Upon completing all 7 modules and submitting your capstone project, you receive a verified FutureAI Certificate of Completion for the ${course.title}. You can also download an official PDF course manual.`,
    },
    {
      q: `Can I download the course material (PDF)?`,
      a: `Absolutely. An official PDF course manual covering all 7 modules, sub-topics, code labs, and project briefs is available for download once you enroll. It's yours to keep forever.`,
    },
    {
      q: `What happens after I make the payment?`,
      a: `Your payment is processed instantly via Razorpay (100% secure, UPI/card accepted). All modules are unlocked immediately upon successful payment — no waiting period. You also gain access to the official PDF course manual.`,
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* ── BREADCRUMB ── */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0.75rem 0" }}>
        <div className="container-custom" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#64748b" }}>
          <Link href="/" style={{ color: "#64748b", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/courses" style={{ color: "#64748b", textDecoration: "none" }}>Courses</Link>
          <ChevronRight size={14} />
          <span style={{ color: "#0f172a", fontWeight: 600 }}>{course.title}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
        padding: "4rem 0 5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background blobs */}
        <div style={{ position: "absolute", top: "-80px", right: "-100px", width: "500px", height: "500px", background: `radial-gradient(circle, ${catColor.color}22 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, #2563eb15 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container-custom">
          <div className="course-hero-grid" style={{ display: "grid", alignItems: "start" }}>
            {/* Left: Content */}
            <div>
              {/* Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                <span style={{ background: catColor.bg, color: catColor.color, fontSize: "0.72rem", fontWeight: 800, padding: "0.3rem 0.7rem", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  {categoryIcons[course.category] && <span style={{ display: "flex" }}>{categoryIcons[course.category]}</span>}
                  {course.category}
                </span>
                <span style={{ background: "#fef3c7", color: "#92400e", fontSize: "0.72rem", fontWeight: 800, padding: "0.3rem 0.7rem", borderRadius: "9999px" }}>
                  {course.badge}
                </span>
                <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.72rem", fontWeight: 800, padding: "0.3rem 0.7rem", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Unlock size={12} /> Module 1 FREE
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>
                {course.title}
              </h1>
              <p style={{ fontSize: "1rem", color: "#94a3b8", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: "700px" }}>
                {course.description}
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 1.5rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#f59e0b", fontSize: "0.85rem", fontWeight: 700 }}>
                  <Star size={16} fill="#f59e0b" /> {course.rating} Rating
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                  <Users size={16} /> {course.enrolledCount.toLocaleString()}+ Enrolled
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                  <Clock size={16} /> {course.duration}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                  <BookOpen size={16} /> {course.modules.length} Modules
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                  <Globe size={16} /> {course.level}
                </div>
              </div>

              {/* Mobile CTA (visible on small screens) */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link
                  href={`/dashboard?courseId=${course.id}`}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.85rem 1.5rem", background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#fff", borderRadius: "12px", fontWeight: 800, fontSize: "0.9rem",
                    textDecoration: "none", boxShadow: "0 8px 25px rgba(37,99,235,0.4)",
                  }}
                >
                  <Play size={18} /> Start Free Preview (Module 1)
                </Link>
                <Link
                  href={`/dashboard/payment?courseId=${course.id}`}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                    padding: "0.85rem 1.5rem", background: "rgba(255,255,255,0.08)",
                    color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "0.9rem",
                    textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <IndianRupee size={18} /> Enroll for ₹{course.price}
                </Link>
              </div>
            </div>

            {/* Right: Price Card */}
            <div className="course-price-card" style={{
              background: "#fff", borderRadius: "20px", padding: "2rem",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "2.25rem", fontWeight: 900, color: "#0f172a" }}>₹{course.price}</span>
                <div>
                  <div style={{ fontSize: "1rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 600 }}>₹{course.originalPrice}</div>
                  <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 800, background: "#f0fdf4", padding: "0.1rem 0.4rem", borderRadius: "6px", display: "inline-block" }}>
                    {discountPct}% OFF
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.25rem" }}>One-time payment. Lifetime access.</p>

              <Link
                href={`/dashboard?courseId=${course.id}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  width: "100%", padding: "0.875rem", background: "#f0fdf4", color: "#16a34a",
                  borderRadius: "10px", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none",
                  marginBottom: "0.75rem", border: "2px solid #bbf7d0",
                }}
              >
                <Play size={16} /> Try Module 1 — FREE
              </Link>
              <Link
                href={`/dashboard/payment?courseId=${course.id}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  width: "100%", padding: "0.875rem", background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff", borderRadius: "10px", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(37,99,235,0.25)",
                }}
              >
                <ArrowRight size={16} /> Unlock All 7 Modules
              </Link>

              <div style={{ borderTop: "1px solid #f1f5f9", marginTop: "1.25rem", paddingTop: "1.25rem" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>This course includes:</p>
                {[
                  { icon: <BookOpen size={14} />, text: `${course.modules.length} Professional In-Depth Modules` },
                  { icon: <Clock size={14} />, text: course.duration },
                  { icon: <Award size={14} />, text: "Verified Certificate of Completion" },
                  { icon: <Download size={14} />, text: "Official PDF Course Manual" },
                  { icon: <Zap size={14} />, text: "Instant Lifetime Access" },
                  { icon: <Shield size={14} />, text: "Secure Razorpay Payment (UPI/Card)" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "#475569", marginBottom: "0.5rem" }}>
                    <span style={{ color: "#16a34a" }}>{item.icon}</span> {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      <section style={{ padding: "4rem 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>What You&apos;ll Master</h2>
          <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "1rem" }}>Skills you&apos;ll gain by completing all 7 modules</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem" }}>
            {course.modules.flatMap(m => m.learningObjectives.slice(0, 2)).slice(0, 12).map((obj, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.875rem", color: "#334155", lineHeight: 1.5 }}>
                <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                {obj}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section style={{ padding: "4rem 0", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>Complete Course Curriculum</h2>
          <p style={{ color: "#64748b", marginBottom: "2rem" }}>
            {course.modules.length} modules &bull; {course.duration} &bull; Self-paced
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {course.modules.map((mod, idx) => {
              const isOpen = openModule === idx;
              const isFree = mod.isFree;
              return (
                <div
                  key={mod.id}
                  style={{
                    border: `1px solid ${isOpen ? "#2563eb" : "#e2e8f0"}`,
                    borderRadius: "14px",
                    overflow: "hidden",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow: isOpen ? "0 4px 20px rgba(37,99,235,0.08)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? null : idx)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1.1rem 1.5rem", background: isOpen ? "#eff6ff" : "#fff",
                      border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                      background: isFree ? "#dcfce7" : "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {isFree ? <Unlock size={16} color="#16a34a" /> : <Lock size={16} color="#94a3b8" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
                        {mod.title}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.2rem" }}>
                        {mod.subtitle} &bull; {mod.estimatedHours}
                        {isFree && <span style={{ marginLeft: "0.5rem", background: "#dcfce7", color: "#16a34a", padding: "0.1rem 0.4rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 800 }}>FREE</span>}
                      </div>
                    </div>
                    <ChevronDown size={18} color="#64748b" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }} />
                  </button>

                  {isOpen && (
                    <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #e2e8f0", background: "#fafbff" }}>
                      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Learning Objectives:
                      </p>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {mod.learningObjectives.map((obj, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "#475569", lineHeight: 1.55 }}>
                            <Check size={14} color="#2563eb" style={{ flexShrink: 0, marginTop: "3px" }} />
                            {obj}
                          </li>
                        ))}
                      </ul>
                      <div style={{ marginTop: "1rem", padding: "0.875rem 1rem", background: "#f0fdf4", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#166534", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <Award size={14} /> Module Project:
                        </p>
                        <p style={{ fontSize: "0.82rem", color: "#15803d", margin: 0 }}>{mod.projectTitle}</p>
                      </div>
                      {!isFree && (
                        <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", background: "#eff6ff", borderRadius: "10px", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <Lock size={14} color="#2563eb" />
                          <p style={{ fontSize: "0.82rem", color: "#1d4ed8", margin: 0, fontWeight: 600 }}>
                            Unlock this module for ₹{course.price} &mdash; one-time payment, lifetime access.&nbsp;
                            <Link href={`/dashboard/payment?courseId=${course.id}`} style={{ color: "#2563eb", fontWeight: 800, textDecoration: "underline" }}>Enroll Now →</Link>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY THIS COURSE ── */}
      <section style={{ padding: "4rem 0", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container-custom">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "2rem" }}>Why Choose This Course?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[
              { icon: <BookOpen size={22} />, title: "7 Professional Modules", desc: "Each module is deeply written by industry practitioners — not just tutorials, but real production systems.", bg: "#eff6ff", c: "#2563eb" },
              { icon: <Award size={22} />, title: "Verified Certificate", desc: "Instantly verified FutureAI certificate after completion. Shareable on LinkedIn and resumes.", bg: "#f0fdf4", c: "#16a34a" },
              { icon: <Download size={22} />, title: "Official PDF Manual", desc: "Download the entire course as a professionally formatted PDF manual — yours to keep forever.", bg: "#fdf4ff", c: "#9333ea" },
              { icon: <Zap size={22} />, title: `₹${course.price} One-Time Price`, desc: `No subscriptions, no hidden fees. Pay ₹${course.price} once and get lifetime access to all modules.`, bg: "#fefce8", c: "#ca8a04" },
              { icon: <Clock size={22} />, title: "Self-Paced Learning", desc: "No batch timings or deadlines. Learn at your own speed, from any device, anytime.", bg: "#fff7ed", c: "#ea580c" },
              { icon: <Shield size={22} />, title: "Secure Payments", desc: "Powered by Razorpay — India's most trusted payment gateway. UPI, Debit/Credit cards accepted.", bg: "#f0f9ff", c: "#0284c7" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ width: "44px", height: "44px", background: item.bg, color: item.c, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "4rem 0", background: "#fff" }}>
        <div className="container-custom" style={{ maxWidth: "860px" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>Frequently Asked Questions</h2>
          <p style={{ color: "#64748b", marginBottom: "2rem" }}>Everything you need to know before enrolling</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.25rem", background: isOpen ? "#f8fafc" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}
                  >
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.4 }}>{faq.q}</span>
                    <ChevronDown size={18} color="#64748b" style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 1.25rem 1.1rem", borderTop: "1px solid #f1f5f9" }}>
                      <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.7, margin: "1rem 0 0" }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", padding: "4rem 0" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", padding: "0.35rem 0.85rem", borderRadius: "9999px", marginBottom: "1.25rem" }}>
            <Flame size={14} color="#fde68a" />
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fde68a" }}>{course.badge}</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 900, color: "#fff", marginBottom: "0.75rem" }}>
            Ready to Master {course.category}?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#93c5fd", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Start with Module 1 for free — no credit card needed. Unlock all 7 professional modules for just ₹{course.price}.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={`/dashboard?courseId=${course.id}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2rem", background: "#fff", color: "#1e3a8a", borderRadius: "12px", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
            >
              <Play size={18} /> Start Free — Module 1
            </Link>
            <Link
              href={`/dashboard/payment?courseId=${course.id}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2rem", background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: "12px", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)" }}
            >
              <IndianRupee size={18} /> Enroll for ₹{course.price}
            </Link>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#93c5fd", marginTop: "1.25rem" }}>
            <FileText size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
            Includes Official PDF Course Manual &bull; Verified Certificate &bull; Lifetime Access
          </p>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .course-price-card { display: none !important; }
        }
        .container-custom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
      `}</style>
    </div>
  );
}
