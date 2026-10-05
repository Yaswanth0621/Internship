"use client";

import { useState, useEffect, useMemo } from "react";
import { db, auth, storage } from "@/lib/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { modules, oneMonthModules } from "@/data/modules";
import { trendingCourses, getCourseById, TrendingCourse } from "@/data/trendingCourses";
import { signOut } from "firebase/auth";
import {
  CheckCircle2,
  ChevronRight,
  Award,
  Loader2,
  Download,
  ExternalLink,
  Lock,
  BookOpen,
  LogOut,
  Share2,
  FileText,
  Sparkles,
  Flame,
  Zap,
  Code2,
  Check,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { CertificateAgent } from "@/lib/certificate/CertificateAgent";

export default function DashboardClient() {
  const [user, loadingAuth] = useAuthState(auth);
  const [studentData, setStudentData] = useState<any>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [taskLink, setTaskLink] = useState("");
  const [switchingTrack, setSwitchingTrack] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active track / course state
  const courseParam = searchParams.get("courseId");
  const [activeTrack, setActiveTrack] = useState<string>("7_day");

  useEffect(() => {
    if (courseParam) {
      setActiveTrack(courseParam);
      setCurrentModuleIndex(0);
    } else if (studentData?.courseId) {
      setActiveTrack(studentData.courseId);
    }
  }, [courseParam, studentData?.courseId]);

  // Determine current course context
  const selectedTrendingCourse = useMemo(() => {
    return trendingCourses.find((c) => c.id === activeTrack) || null;
  }, [activeTrack]);

  const isTrending = Boolean(selectedTrendingCourse);
  const isOneMonth = activeTrack === "1_month";
  const isSevenDay = activeTrack === "7_day";

  // Active modules list
  const activeModules = useMemo(() => {
    if (isTrending && selectedTrendingCourse) {
      return selectedTrendingCourse.modules;
    }
    if (isOneMonth) {
      return oneMonthModules;
    }
    return modules;
  }, [isTrending, selectedTrendingCourse, isOneMonth]);

  // Payment status for active track
  const isPaid = useMemo(() => {
    if (!studentData) return false;
    if (isTrending && selectedTrendingCourse) {
      return studentData[`paymentStatus_${selectedTrendingCourse.id}`] === "approved";
    }
    if (isOneMonth) {
      return (
        studentData.paymentStatus_1_month === "approved" ||
        studentData.paymentStatus === "approved"
      );
    }
    return studentData.paymentStatus === "approved";
  }, [studentData, isTrending, selectedTrendingCourse, isOneMonth]);

  // Track Progress
  const trackProgress = useMemo(() => {
    if (!studentData) return 0;
    if (isTrending && selectedTrendingCourse) {
      return studentData[`progress_${selectedTrendingCourse.id}`] ?? 0;
    }
    if (isOneMonth) {
      return studentData.progress_1_month ?? studentData.progress ?? 0;
    }
    return studentData.progress ?? 0;
  }, [studentData, isTrending, selectedTrendingCourse, isOneMonth]);

  const isCompleted = trackProgress >= 100;
  const isPending = studentData?.paymentStatus === "pending";

  // Track boundary safety checks
  useEffect(() => {
    if (activeModules && currentModuleIndex >= activeModules.length) {
      setCurrentModuleIndex(0);
    }
  }, [activeModules, currentModuleIndex]);

  // Pre-fill task submission links from Firestore
  useEffect(() => {
    if (studentData?.submissions) {
      const savedLink = isTrending && selectedTrendingCourse
        ? studentData[`submissions_${selectedTrendingCourse.id}`]?.[`module_${currentModuleIndex}`] || ""
        : studentData.submissions[`module_${currentModuleIndex}`] || "";
      setTaskLink(savedLink);
    } else {
      setTaskLink("");
    }
  }, [currentModuleIndex, studentData, isTrending, selectedTrendingCourse]);

  // Fetch student profile on snapshot
  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      router.push("/auth");
      return;
    }

    const docRef = doc(db, "students", user.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setStudentData(docSnap.data());
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to student data:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, loadingAuth, router]);

  // Switching track handler
  const handleSelectTrack = async (targetId: string) => {
    if (!user || switchingTrack) return;
    if (targetId === activeTrack) return;

    if (targetId === "1_month") {
      const targetPaymentStatus = studentData?.[`paymentStatus_1_month`] || studentData?.paymentStatus || "unpaid";
      if (targetPaymentStatus !== "approved") {
        const confirmSwitch = window.confirm(
          "Switching to the 1-Month Summer Internship requires an upfront verification fee of ₹119 to unlock the syllabus.\n\nProceed to the payment screen now?"
        );
        if (!confirmSwitch) return;
        router.push("/dashboard/payment");
        return;
      }
    }

    setSwitchingTrack(true);
    try {
      setActiveTrack(targetId);
      setCurrentModuleIndex(0);
      setTaskLink("");

      // Update active track in firestore
      const docRef = doc(db, "students", user.uid);
      const isTargetTrending = trendingCourses.some((c) => c.id === targetId);
      const targetCourseObj = trendingCourses.find((c) => c.id === targetId);
      
      const courseName = isTargetTrending
        ? targetCourseObj!.title
        : targetId === "1_month"
        ? "1-Month Summer Internship"
        : "7-Day AI/ML Micro-Internship";

      await updateDoc(docRef, {
        courseId: targetId,
        courseName: courseName,
        course: courseName,
      });
    } catch (err) {
      console.error("Error updating active track:", err);
    } finally {
      setSwitchingTrack(false);
    }
  };

  const [downloading, setDownloading] = useState(false);

  const handleDownloadCert = async () => {
    if (!studentData || downloading) return;

    setDownloading(true);
    try {
      const dateRaw = studentData.approvedAt || studentData.paymentSubmittedAt;
      const dateStr = dateRaw
        ? new Date(dateRaw).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
        : new Date().toLocaleDateString("en-IN");

      const courseName = isTrending && selectedTrendingCourse
        ? selectedTrendingCourse.title
        : isOneMonth
        ? "1-Month Summer AI/ML Internship"
        : "AI/ML Intensive Internship";

      const pdfDoc = await CertificateAgent.generate({
        name: studentData.name || user?.displayName || "Student",
        course: courseName,
        date: dateStr,
        id: studentData.certificateId || `FAI-${user?.uid?.slice(0, 8).toUpperCase()}`,
      });

      pdfDoc.save(`FutureAI_Certificate_${(studentData.name || "Student").replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Certificate generation error:", err);
      alert("Failed to download certificate. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const [downloadingLOR, setDownloadingLOR] = useState(false);
  const [downloadingOffer, setDownloadingOffer] = useState(false);

  const handleDownloadLOR = async () => {
    if (!studentData || downloadingLOR) return;
    setDownloadingLOR(true);
    try {
      const dateRaw = studentData.approvedAt || studentData.paymentSubmittedAt;
      const dateStr = dateRaw
        ? new Date(dateRaw).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
        : new Date().toLocaleDateString("en-IN");

      const courseName = isTrending && selectedTrendingCourse
        ? selectedTrendingCourse.title
        : isOneMonth
        ? "1-Month Summer AI/ML Internship"
        : "7-Day AI/ML Micro-Internship";

      const pdfDoc = await CertificateAgent.generateLOR({
        name: studentData.name || user?.displayName || "Student",
        course: courseName,
        date: dateStr,
        id: user?.uid || "STUDENT",
      });

      pdfDoc.save(`FutureAI_Signed_LOR_${(studentData.name || "Student").replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("LOR generation failed:", err);
      alert("Failed to generate LOR. Please try again.");
    } finally {
      setDownloadingLOR(false);
    }
  };

  const handleDownloadOfferLetter = async () => {
    if (!studentData || downloadingOffer) return;
    setDownloadingOffer(true);
    try {
      const dateStr = studentData.createdAt
        ? new Date(studentData.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
        : new Date().toLocaleDateString("en-IN");

      const courseName = isTrending && selectedTrendingCourse
        ? selectedTrendingCourse.title
        : isOneMonth
        ? "1-Month Summer AI/ML Internship"
        : "7-Day AI/ML Micro-Internship";

      const pdfDoc = await CertificateAgent.generateOfferLetter({
        name: studentData.name || user?.displayName || "Student",
        course: courseName,
        date: dateStr,
        studentId: user?.uid || "STUDENT",
      });

      pdfDoc.save(`FutureAI_Offer_Letter_${(studentData.name || "Student").replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Offer letter generation failed:", err);
      alert("Failed to generate Offer Letter. Please try again.");
    } finally {
      setDownloadingOffer(false);
    }
  };

  const handleNextModule = async () => {
    if (!user || !studentData) return;
    const nextIndex = currentModuleIndex + 1;
    const newProgress = Math.max(trackProgress, Math.round((nextIndex / activeModules.length) * 100));

    const docRef = doc(db, "students", user.uid);

    if (isTrending && selectedTrendingCourse) {
      const courseId = selectedTrendingCourse.id;
      const prevSubmissions = studentData[`submissions_${courseId}`] || {};
      if (taskLink.trim()) {
        prevSubmissions[`module_${currentModuleIndex}`] = taskLink.trim();
      }

      await updateDoc(docRef, {
        [`progress_${courseId}`]: newProgress,
        [`submissions_${courseId}`]: prevSubmissions,
      });

      setStudentData({
        ...studentData,
        [`progress_${courseId}`]: newProgress,
        [`submissions_${courseId}`]: prevSubmissions,
      });
    } else {
      const submissions = studentData.submissions || {};
      if (taskLink.trim()) {
        submissions[`module_${currentModuleIndex}`] = taskLink.trim();
      }

      const trackSuffix = isOneMonth ? "1_month" : "7_day";
      await updateDoc(docRef, {
        progress: newProgress,
        submissions: submissions,
        [`progress_${trackSuffix}`]: newProgress,
      });

      setStudentData({
        ...studentData,
        progress: newProgress,
        submissions: submissions,
        [`progress_${trackSuffix}`]: newProgress,
      });
    }

    if (nextIndex < activeModules.length) {
      setCurrentModuleIndex(nextIndex);
      setTaskLink("");
    } else {
      setTaskLink("");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  // Portfolio URL
  const portfolioUrl =
    typeof window !== "undefined"
      ? studentData?.certificateId
        ? `${window.location.origin}/u/${studentData.certificateId}/`
        : `${window.location.origin}/verify?id=${user?.uid}`
      : "";

  const handleCopyPortfolio = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsAppText = `Hey! I'm learning on FutureAI. The first module is 100% free with in-depth masterclass projects and downloadable curriculum. Check it out: https://futureee.me/`;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsAppText)}`;
    window.open(url, "_blank");
  };

  // Check if current active module is locked
  // For trending courses: Module 1 (index 0) is ALWAYS free!
  // Module 2 to 7 (index > 0) are locked if !isPaid.
  const isModuleLocked = isTrending
    ? currentModuleIndex > 0 && !isPaid
    : isOneMonth
    ? !isPaid
    : false;

  if (loadingAuth || loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f8fafc" }}>
        <Loader2 size={36} color="#2563eb" className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column" }}>
      <Navigation />

      <div className="container-custom" style={{ padding: "1.5rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Top Header & Program Switcher */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
              Welcome back, {studentData?.name?.split(" ")[0] || "Student"} 👋
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>
              Active Curriculum:{" "}
              <strong style={{ color: "#2563eb" }}>
                {isTrending && selectedTrendingCourse ? selectedTrendingCourse.title : isOneMonth ? "1-Month Summer Internship" : "7-Day AI/ML Micro-Internship"}
              </strong>
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            {/* Daily Streak */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.85rem",
                background: "#fff7ed",
                border: "1px solid #ffedd5",
                borderRadius: "12px",
                color: "#c2410c",
                fontSize: "0.8rem",
                fontWeight: 800,
              }}
            >
              <Flame size={16} className="text-orange-500" />
              <span>Streak Active</span>
            </div>

            {/* Progress Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem 0.85rem",
                background: "#fff",
                border: "1px solid #dde2ea",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
              }}
            >
              <div style={{ width: "70px" }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${trackProgress}%` }} />
                </div>
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#364052" }}>{trackProgress}%</span>
            </div>

            <button
              onClick={handleSignOut}
              id="btn-signout"
              className="btn-outline"
              style={{ padding: "0.5rem 0.75rem", borderRadius: "12px", fontSize: "0.8rem" }}
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Course & Track Selector Bar */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "1rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.1rem" }}>⚡</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Select Track / Trending Masterclass
              </span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>
              Module 1 is 100% Free on all Masterclasses
            </span>
          </div>

          <div
            className="dashboard-module-scroll"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            {/* Internship Tracks */}
            <button
              onClick={() => handleSelectTrack("7_day")}
              style={{
                padding: "0.5rem 0.85rem",
                borderRadius: "10px",
                border: activeTrack === "7_day" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                background: activeTrack === "7_day" ? "#eff6ff" : "#fff",
                color: activeTrack === "7_day" ? "#1d4ed8" : "#475569",
                fontWeight: 700,
                fontSize: "0.8rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                flexShrink: 0,
              }}
            >
              🎓 7-Day AI/ML Track
            </button>

            <button
              onClick={() => handleSelectTrack("1_month")}
              style={{
                padding: "0.5rem 0.85rem",
                borderRadius: "10px",
                border: activeTrack === "1_month" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                background: activeTrack === "1_month" ? "#eff6ff" : "#fff",
                color: activeTrack === "1_month" ? "#1d4ed8" : "#475569",
                fontWeight: 700,
                fontSize: "0.8rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                flexShrink: 0,
              }}
            >
              🌟 1-Month Summer Track
            </button>

            <div style={{ width: "1px", height: "24px", background: "#cbd5e1", margin: "0 0.25rem", flexShrink: 0 }} />

            {/* Trending Masterclasses */}
            {trendingCourses.map((c) => {
              const isSelected = activeTrack === c.id;
              const isCoursePaid = studentData?.[`paymentStatus_${c.id}`] === "approved";
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectTrack(c.id)}
                  style={{
                    padding: "0.5rem 0.85rem",
                    borderRadius: "10px",
                    border: isSelected ? "2px solid #2563eb" : "1px solid #e2e8f0",
                    background: isSelected ? "#eff6ff" : "#fff",
                    color: isSelected ? "#1d4ed8" : "#334155",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    flexShrink: 0,
                  }}
                >
                  <span>{c.badge.split(" ")[0]}</span>
                  <span>{c.title.replace(" Masterclass", "")}</span>
                  {isCoursePaid ? (
                    <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: "0.65rem", padding: "0.1rem 0.4rem", borderRadius: "9999px" }}>
                      Unlocked
                    </span>
                  ) : (
                    <span style={{ background: "#f1f5f9", color: "#475569", fontSize: "0.65rem", padding: "0.1rem 0.4rem", borderRadius: "9999px" }}>
                      M1 Free • ₹{c.price}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          
          {/* Left Sidebar: Modules & Certifications */}
          <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Offer Letter / Documentation Card */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #dde2ea",
                borderRadius: "18px",
                padding: "1.25rem",
                boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FileText size={18} color="#2563eb" />
                <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  Official Documents
                </h4>
              </div>
              <p style={{ fontSize: "0.775rem", color: "#6b7a8f", margin: 0, lineHeight: 1.45 }}>
                Download your official Acceptance & Offer Letter on FutureAI corporate letterhead.
              </p>
              <button
                id="btn-download-offer-letter"
                disabled={downloadingOffer}
                onClick={handleDownloadOfferLetter}
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  border: "1px solid #bfdbfe",
                  padding: "0.6rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  cursor: downloadingOffer ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                }}
              >
                {downloadingOffer ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                Download Offer Letter (PDF)
              </button>
            </div>

            {/* Modules List */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #dde2ea",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
              }}
            >
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e8ecf2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <BookOpen size={16} color="#2563eb" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827" }}>
                    Curriculum Modules ({activeModules.length})
                  </span>
                </div>
                {isTrending && (
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#16a34a", background: "#f0fdf4", padding: "0.15rem 0.5rem", borderRadius: "9999px" }}>
                    M1 Free
                  </span>
                )}
              </div>

              <div style={{ padding: "0.5rem" }}>
                {activeModules.map((m, i) => {
                  const isModuleDone = trackProgress >= ((i + 1) / activeModules.length) * 100;
                  const isActive = currentModuleIndex === i;
                  const isLocked = isTrending ? i > 0 && !isPaid : isOneMonth ? !isPaid : false;

                  return (
                    <button
                      key={m.id || i}
                      id={`module-btn-${i}`}
                      onClick={() => setCurrentModuleIndex(i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        borderRadius: "10px",
                        border: "none",
                        background: isActive ? "#eff6ff" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        textAlign: "left",
                        marginBottom: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: isLocked ? "#fef2f2" : isModuleDone ? "#f0fdf4" : isActive ? "#dbeafe" : "#f1f3f7",
                          color: isLocked ? "#ef4444" : isModuleDone ? "#16a34a" : isActive ? "#2563eb" : "#98a5b5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        {isLocked ? <Lock size={12} /> : isModuleDone ? <CheckCircle2 size={14} /> : i + 1}
                      </div>
                      <div style={{ overflow: "hidden", flex: 1 }}>
                        <div
                          style={{
                            fontSize: "0.825rem",
                            fontWeight: 600,
                            color: isActive ? "#1d4ed8" : "#364052",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {m.title}
                        </div>
                        {isTrending && i === 0 && (
                          <span style={{ fontSize: "0.68rem", color: "#16a34a", fontWeight: 700 }}>
                            Free Preview Available
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certification & Manual Download Card */}
            <div
              style={{
                background: "#fff",
                border: isPaid ? "1px solid #bbf7d0" : "1px solid #dde2ea",
                borderRadius: "18px",
                padding: "1.25rem",
                boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                <Award size={20} color={isPaid ? "#16a34a" : isCompleted ? "#2563eb" : "#98a5b5"} />
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827" }}>
                  {isTrending ? "Course Manual & Cert" : "Certification"}
                </span>
                {isPaid && <span className="badge badge-green" style={{ marginLeft: "auto" }}>Unlocked</span>}
              </div>

              <p style={{ fontSize: "0.8rem", color: "#6b7a8f", marginBottom: "1rem", lineHeight: 1.5 }}>
                {isPaid
                  ? "Your full access and official materials are ready!"
                  : isTrending
                  ? `Unlock Modules 2-7 and the downloadable Masterclass Manual (PDF) for ₹${selectedTrendingCourse?.price || 149}.`
                  : isCompleted
                  ? "Track complete! Pay ₹119 to unlock your verified certificate."
                  : "Complete all modules to unlock certification."}
              </p>

              {/* If Trending Course is completed or paid, allow downloading PDF Manual */}
              {isTrending && selectedTrendingCourse && (
                <div style={{ marginBottom: "0.75rem" }}>
                  {isPaid ? (
                    <a
                      href={`/courses/${selectedTrendingCourse.pdfFileName}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "100%",
                        padding: "0.7rem",
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        color: "#1d4ed8",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        textDecoration: "none",
                        boxSizing: "border-box",
                      }}
                    >
                      <Download size={14} /> Download Course PDF Manual
                    </a>
                  ) : (
                    <button
                      onClick={() => router.push(`/dashboard/payment?courseId=${selectedTrendingCourse.id}&type=course`)}
                      style={{
                        width: "100%",
                        padding: "0.7rem",
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        color: "#fff",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "0.825rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Unlock Course PDF & Modules (₹{selectedTrendingCourse.price})
                    </button>
                  )}
                </div>
              )}

              {/* Certificate Download when paid/completed */}
              {isPaid ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button
                    id="btn-download-cert"
                    disabled={downloading}
                    onClick={handleDownloadCert}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: downloading ? "#f1f3f7" : "#16a34a",
                      color: downloading ? "#98a5b5" : "#fff",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      border: "none",
                      cursor: downloading ? "not-allowed" : "pointer",
                    }}
                  >
                    {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {downloading ? "Processing Certificate..." : "Download Certificate (PDF)"}
                  </button>

                  {studentData?.includesLOR && !isTrending && (
                    <button
                      id="btn-download-lor"
                      disabled={downloadingLOR}
                      onClick={handleDownloadLOR}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: downloadingLOR ? "#f1f3f7" : "#0284c7",
                        color: downloadingLOR ? "#98a5b5" : "#fff",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        border: "none",
                        cursor: downloadingLOR ? "not-allowed" : "pointer",
                      }}
                    >
                      {downloadingLOR ? <Loader2 size={16} className="animate-spin" /> : <Award size={16} />}
                      {downloadingLOR ? "Generating LOR..." : "Download Signed LOR (PDF)"}
                    </button>
                  )}

                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "#fff",
                      color: "#1e293b",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      border: "1px solid #e2e8f0",
                      cursor: "pointer",
                    }}
                  >
                    <Share2 size={16} /> Share Achievement
                  </button>
                </div>
              ) : !isTrending ? (
                <button
                  disabled={!isCompleted || isPending}
                  id="btn-get-certified"
                  onClick={() => router.push("/dashboard/payment")}
                  style={{
                    width: "100%",
                    padding: "0.625rem",
                    background: isCompleted && !isPending ? "#2563eb" : "#f1f3f7",
                    color: isCompleted && !isPending ? "#fff" : "#98a5b5",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.825rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    border: "none",
                    cursor: isCompleted && !isPending ? "pointer" : "not-allowed",
                  }}
                >
                  {!isCompleted && <Lock size={13} />}
                  {isPending ? "Verifying payment…" : isCompleted ? "Get Certified — ₹119" : "Complete all modules first"}
                </button>
              ) : null}
            </div>

            {/* Official WhatsApp Group */}
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "18px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem" }}>💬</span>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 800, color: "#166534", margin: 0 }}>
                  Batch Discussion Group
                </h4>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#15803d", margin: 0, lineHeight: 1.45 }}>
                Connect with 4,200+ students. Get project hints from mentors and daily updates.
              </p>
              <a
                href="https://chat.whatsapp.com/invite/futureai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#16a34a",
                  color: "#fff",
                  padding: "0.6rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                }}
              >
                Join WhatsApp Group <ExternalLink size={14} />
              </a>
            </div>

          </div>

          {/* Right Main Content Area */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              background: "#fff",
              border: "1px solid #dde2ea",
              borderRadius: "20px",
              boxShadow: "0 1px 3px rgba(16,24,40,0.04)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Paywall Lock Screen for Locked Modules */}
            {isModuleLocked ? (
              <div
                style={{
                  padding: "3.5rem 1.5rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    background: "#fef2f2",
                    border: "1px solid #fee2e2",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    boxShadow: "0 10px 15px -3px rgba(239, 68, 68, 0.1)",
                  }}
                >
                  <Lock size={32} color="#ef4444" />
                </div>

                <span
                  style={{
                    background: "#fee2e2",
                    color: "#dc2626",
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.75rem",
                  }}
                >
                  Premium Module • Locked
                </span>

                <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem", letterSpacing: "-0.03em" }}>
                  {isTrending && selectedTrendingCourse
                    ? `Unlock All 7 Modules of ${selectedTrendingCourse.title}`
                    : "Unlock Your 1-Month Summer Curriculum"}
                </h2>

                <p style={{ fontSize: "0.95rem", color: "#4b5563", maxWidth: "540px", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                  {isTrending && selectedTrendingCourse ? (
                    <>
                      You have experienced <strong>Module 1 for free!</strong> Unlock the remaining 6 extensive modules, production code architectures, enterprise hands-on labs, and the <strong>Official Course Manual (PDF)</strong> for just <strong>₹{selectedTrendingCourse.price}</strong> (Regular ₹{selectedTrendingCourse.originalPrice}).
                    </>
                  ) : (
                    <>
                      To begin your advanced 1-month summer program, complete your enrollment verification fee of <strong>₹119</strong>. This unlocks all enterprise modules, custom templates, developer tools, and certificate processing.
                    </>
                  )}
                </p>

                {/* Value Highlights */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", maxWidth: "540px", width: "100%", marginBottom: "2rem", textAlign: "left" }}>
                  <div style={{ padding: "1rem", background: "#fff", border: "1px solid #dde2ea", borderRadius: "12px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      📚 Complete 7 Modules
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7a8f", lineHeight: 1.4 }}>
                      Full access to production code implementations, deep sub-topics, and practical exercises.
                    </div>
                  </div>
                  <div style={{ padding: "1rem", background: "#fff", border: "1px solid #dde2ea", borderRadius: "12px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      📥 Course Manual (PDF) & Certificate
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7a8f", lineHeight: 1.4 }}>
                      Download the high-resolution official course PDF manual and verified credential.
                    </div>
                  </div>
                </div>

                <button
                  id="btn-unlock-program-now"
                  onClick={() =>
                    router.push(
                      isTrending && selectedTrendingCourse
                        ? `/dashboard/payment?courseId=${selectedTrendingCourse.id}&type=course`
                        : "/dashboard/payment"
                    )
                  }
                  style={{
                    padding: "0.9rem 2.25rem",
                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    color: "#fff",
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontSize: "1rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.3)",
                    transition: "all 0.15s",
                  }}
                >
                  Unlock Program Now ({isTrending && selectedTrendingCourse ? `₹${selectedTrendingCourse.price}` : "₹119"}) <ChevronRight size={18} />
                </button>
              </div>
            ) : (
              <>
                {/* Mobile Quick Lesson Picker */}
                <div className="lg:hidden" style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e8ecf2", background: "#f8fafc" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#64748b", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Select Module:
                  </div>
                  <div className="dashboard-module-scroll">
                    {activeModules.map((m, idx) => {
                      const isAct = currentModuleIndex === idx;
                      const isDone = trackProgress >= ((idx + 1) / activeModules.length) * 100;
                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentModuleIndex(idx)}
                          style={{
                            padding: "0.35rem 0.75rem",
                            borderRadius: "8px",
                            border: isAct ? "1.5px solid #2563eb" : "1px solid #e2e8f0",
                            background: isAct ? "#eff6ff" : isDone ? "#f0fdf4" : "#fff",
                            color: isAct ? "#1d4ed8" : isDone ? "#16a34a" : "#475569",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          {isDone && <CheckCircle2 size={12} />}
                          Module {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Module Header */}
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderBottom: "1px solid #e8ecf2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563eb", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span>Module {currentModuleIndex + 1} of {activeModules.length}</span>
                      {isTrending && currentModuleIndex === 0 && (
                        <span style={{ background: "#dcfce7", color: "#15803d", padding: "0.1rem 0.45rem", borderRadius: "9999px", fontSize: "0.68rem" }}>
                          FREE PREVIEW
                        </span>
                      )}
                    </div>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.3, margin: 0 }}>
                      {activeModules[currentModuleIndex]?.title}
                    </h2>
                  </div>

                  <span className="badge badge-blue">
                    {Math.round(((currentModuleIndex + 1) / activeModules.length) * 100)}% through course
                  </span>
                </div>

                {/* Module Content Body */}
                <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: activeModules[currentModuleIndex]?.content || "" }}
                  />
                </div>

                {/* Task Submission & Next Module Bar */}
                <div
                  style={{
                    padding: "1.5rem 2rem",
                    borderTop: "1px solid #e8ecf2",
                    background: "#f8fafc",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>
                      Task Submission & Progress
                    </h4>
                    <p style={{ fontSize: "0.825rem", color: "#6b7a8f", margin: 0 }}>
                      Submit your project code link (GitHub, Colab, or Drive) to save it in your portfolio, or mark it completed to proceed to the next module.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <input
                      type="url"
                      id="task-url-input"
                      placeholder="Paste your project URL (Optional - e.g. GitHub, Drive, Colab)..."
                      value={taskLink}
                      onChange={(e) => setTaskLink(e.target.value)}
                      style={{
                        flex: 1,
                        minWidth: "250px",
                        padding: "0.75rem 1rem",
                        border: "1px solid #dde2ea",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        outline: "none",
                      }}
                    />

                    {currentModuleIndex < activeModules.length - 1 ? (
                      <button
                        id="btn-submit-task"
                        onClick={handleNextModule}
                        className="btn-primary"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          cursor: "pointer",
                          background: taskLink.trim() ? "#2563eb" : "#4f46e5",
                        }}
                      >
                        {taskLink.trim() ? (
                          <>
                            Submit & Continue <ChevronRight size={16} />
                          </>
                        ) : (
                          <>
                            Mark Completed & Continue <CheckCircle2 size={16} />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        id="btn-submit-final"
                        onClick={handleNextModule}
                        style={{
                          background: "#16a34a",
                          color: "#fff",
                          border: "none",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "8px",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {taskLink.trim() ? (
                          <>
                            Submit Final Project <CheckCircle2 size={16} />
                          </>
                        ) : (
                          <>
                            Complete Course <CheckCircle2 size={16} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>

      {/* Viral Share Modal */}
      {isShareModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(10, 10, 10, 0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
          }}
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "520px",
              padding: "2rem",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                  Share Your Achievement 🚀
                </h3>
                <p style={{ fontSize: "0.8rem", color: "#6b7a8f", margin: "0.25rem 0 0" }}>
                  Showcase your verifiable credential to college friends and recruiters!
                </p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#f1f3f7",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4e5a6b", textTransform: "uppercase" }}>
                Verifiable Portfolio URL
              </label>
              <div
                style={{
                  display: "flex",
                  background: "#f8f9fb",
                  border: "1px solid #dde2ea",
                  borderRadius: "12px",
                  padding: "0.5rem 0.5rem 0.5rem 1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "#1f2a38", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {portfolioUrl}
                </span>
                <button
                  onClick={handleCopyPortfolio}
                  style={{
                    padding: "0.5rem 1rem",
                    background: copied ? "#16a34a" : "#2563eb",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

            <button
              onClick={handleShareWhatsApp}
              style={{
                background: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "0.85rem",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              Share with WhatsApp Friends
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
