"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Loader2, ArrowRight, Brain, CheckCircle2 } from "lucide-react";

export default function AuthClient() {
  const [user, loadingAuth] = useAuthState(auth);
  const [isLogin, setIsLogin] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseParam = searchParams?.get("course") || "7_day";
  const courseName = courseParam === "1_month" ? "1-Month Summer Internship" : "7-Day AI/ML Micro-Internship";

  const handleRedirectOrSync = async () => {
    if (!user) return;
    try {
      const studentDocRef = doc(db, "students", user.uid);
      const studentDoc = await getDoc(studentDocRef);
      
      if (studentDoc.exists()) {
        const existingData = studentDoc.data();
        const currentTrack = existingData.courseId || "7_day";
        const hasCourseParam = searchParams ? searchParams.has("course") : false;
        const targetTrack = hasCourseParam ? courseParam : currentTrack;

        if (currentTrack !== targetTrack) {
          setLoading(true);
          const currentTrackSuffix = currentTrack === "1_month" ? "1_month" : "7_day";
          const targetTrackSuffix = targetTrack === "1_month" ? "1_month" : "7_day";
          const targetCourseName = targetTrack === "1_month" ? "1-Month Summer Internship" : "7-Day AI/ML Micro-Internship";

          // Back up current top-level fields to the previous track's specific fields
          const currentProgress = existingData.progress !== undefined ? existingData.progress : 0;
          const currentPaymentStatus = existingData.paymentStatus || "unpaid";
          const currentApprovedAt = existingData.approvedAt || null;
          const currentCertificateId = existingData.certificateId || null;
          const currentCertificateURL = existingData.certificateURL || null;
          const currentRazorpayId = existingData.razorpay_payment_id || null;

          // Load target track specific fields
          const targetProgress = existingData[`progress_${targetTrackSuffix}`] !== undefined ? existingData[`progress_${targetTrackSuffix}`] : 0;
          const targetPaymentStatus = existingData[`paymentStatus_${targetTrackSuffix}`] !== undefined ? existingData[`paymentStatus_${targetTrackSuffix}`] : "unpaid";
          const targetApprovedAt = existingData[`approvedAt_${targetTrackSuffix}`] !== undefined ? existingData[`approvedAt_${targetTrackSuffix}`] : null;
          const targetCertificateId = existingData[`certificateId_${targetTrackSuffix}`] !== undefined ? existingData[`certificateId_${targetTrackSuffix}`] : null;
          const targetCertificateURL = existingData[`certificateURL_${targetTrackSuffix}`] !== undefined ? existingData[`certificateURL_${targetTrackSuffix}`] : null;
          const targetRazorpayId = existingData[`razorpay_payment_id_${targetTrackSuffix}`] !== undefined ? existingData[`razorpay_payment_id_${targetTrackSuffix}`] : null;

          await updateDoc(studentDocRef, {
            // Back up old track
            [`progress_${currentTrackSuffix}`]: currentProgress,
            [`paymentStatus_${currentTrackSuffix}`]: currentPaymentStatus,
            [`approvedAt_${currentTrackSuffix}`]: currentApprovedAt,
            [`certificateId_${currentTrackSuffix}`]: currentCertificateId,
            [`certificateURL_${currentTrackSuffix}`]: currentCertificateURL,
            [`razorpay_payment_id_${currentTrackSuffix}`]: currentRazorpayId,

            // Load new track & sync top-level fields
            courseId: targetTrack,
            courseName: targetCourseName,
            course: targetCourseName,
            progress: targetProgress,
            paymentStatus: targetPaymentStatus,
            approvedAt: targetApprovedAt,
            certificateId: targetCertificateId,
            certificateURL: targetCertificateURL,
            razorpay_payment_id: targetRazorpayId,
          });
        }
      }
    } catch (err) {
      console.error("Error auto-syncing track in auth redirect:", err);
    } finally {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (user && !loadingAuth) {
      handleRedirectOrSync();
    }
  }, [user, loadingAuth]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const u = userCred.user;
        const studentDoc = await getDoc(doc(db, "students", u.uid));
        if (!studentDoc.exists()) {
          await setDoc(doc(db, "students", u.uid), {
            uid: u.uid,
            name: u.displayName || "Student",
            email: u.email,
            college: "Not Specified",
            courseId: courseParam,
            courseName: courseName,
            course: courseName, // Synchronize 'course' field
            progress: 0,
            isVerified: false,
            paymentStatus: "unpaid",
            createdAt: new Date().toISOString(),
          });
        } else {
          // Switch tracks if the user explicitly requested a different track via the courseParam search param
          const existingData = studentDoc.data();
          const currentTrack = existingData.courseId || "7_day";
          const hasCourseParam = searchParams ? searchParams.has("course") : false;
          const targetTrack = hasCourseParam ? courseParam : currentTrack;

          if (currentTrack !== targetTrack) {
            const currentTrackSuffix = currentTrack === "1_month" ? "1_month" : "7_day";
            const targetTrackSuffix = targetTrack === "1_month" ? "1_month" : "7_day";
            const targetCourseName = targetTrack === "1_month" ? "1-Month Summer Internship" : "7-Day AI/ML Micro-Internship";

            // Back up current top-level fields to the previous track's specific fields
            const currentProgress = existingData.progress !== undefined ? existingData.progress : 0;
            const currentPaymentStatus = existingData.paymentStatus || "unpaid";
            const currentApprovedAt = existingData.approvedAt || null;
            const currentCertificateId = existingData.certificateId || null;
            const currentCertificateURL = existingData.certificateURL || null;
            const currentRazorpayId = existingData.razorpay_payment_id || null;

            // Load target track specific fields
            const targetProgress = existingData[`progress_${targetTrackSuffix}`] !== undefined ? existingData[`progress_${targetTrackSuffix}`] : 0;
            const targetPaymentStatus = existingData[`paymentStatus_${targetTrackSuffix}`] !== undefined ? existingData[`paymentStatus_${targetTrackSuffix}`] : "unpaid";
            const targetApprovedAt = existingData[`approvedAt_${targetTrackSuffix}`] !== undefined ? existingData[`approvedAt_${targetTrackSuffix}`] : null;
            const targetCertificateId = existingData[`certificateId_${targetTrackSuffix}`] !== undefined ? existingData[`certificateId_${targetTrackSuffix}`] : null;
            const targetCertificateURL = existingData[`certificateURL_${targetTrackSuffix}`] !== undefined ? existingData[`certificateURL_${targetTrackSuffix}`] : null;
            const targetRazorpayId = existingData[`razorpay_payment_id_${targetTrackSuffix}`] !== undefined ? existingData[`razorpay_payment_id_${targetTrackSuffix}`] : null;

            await updateDoc(doc(db, "students", u.uid), {
              // Back up old track
              [`progress_${currentTrackSuffix}`]: currentProgress,
              [`paymentStatus_${currentTrackSuffix}`]: currentPaymentStatus,
              [`approvedAt_${currentTrackSuffix}`]: currentApprovedAt,
              [`certificateId_${currentTrackSuffix}`]: currentCertificateId,
              [`certificateURL_${currentTrackSuffix}`]: currentCertificateURL,
              [`razorpay_payment_id_${currentTrackSuffix}`]: currentRazorpayId,

              // Load new track & sync top-level fields
              courseId: targetTrack,
              courseName: targetCourseName,
              course: targetCourseName,
              progress: targetProgress,
              paymentStatus: targetPaymentStatus,
              approvedAt: targetApprovedAt,
              certificateId: targetCertificateId,
              certificateURL: targetCertificateURL,
              razorpay_payment_id: targetRazorpayId,
            });
          }
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const u = userCredential.user;
        await updateProfile(u, { displayName: name });
        await setDoc(doc(db, "students", u.uid), {
          uid: u.uid,
          name,
          email,
          college,
          courseId: courseParam,
          courseName: courseName,
          course: courseName, // Synchronize 'course' field
          progress: 0,
          isVerified: false,
          paymentStatus: "unpaid",
          createdAt: new Date().toISOString(),
        });
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    "7-day intensive AI/ML program",
    "Hands-on projects & assignments",
    "Industry-verified certificate",
    "₹100 one-time certification fee",
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9fb" }}>
      <Navigation />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4rem 1.5rem" }}>
        <div style={{ display: "flex", width: "100%", maxWidth: "920px", background: "#fff", border: "1px solid #dde2ea", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 48px rgba(16,24,40,0.08)" }}>
          {/* Left panel */}
          <div className="md:flex" style={{ display: "none", flexDirection: "column", width: "42%", background: "linear-gradient(160deg, #1e40af 0%, #2563eb 60%, #4f46e5 100%)", padding: "3rem 2.5rem", color: "#fff", position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <div aria-hidden style={{ position: "absolute", top: "-60px", right: "-80px", width: "240px", height: "240px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", pointerEvents: "none" }} />
            <div aria-hidden style={{ position: "absolute", bottom: "-80px", left: "-40px", width: "280px", height: "280px", background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "2.5rem" }}>
                <div style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", padding: "7px", borderRadius: "10px", display: "flex" }}>
                  <Brain size={20} color="#fff" />
                </div>
                <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>FutureAI Internship</span>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                {courseParam === "1_month" ? "Elite 1-Month Summer Program." : "Launch your AI career in just 7 days."}
              </h2>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "2rem" }}>
                {courseParam === "1_month" ? "Deep portfolio building, advanced PyTorch, and a verifiable corporate credential." : "Join thousands of engineering students who got certified and kickstarted their AI journey."}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {perks.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.1)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <CheckCircle2 size={16} color="rgba(255,255,255,0.9)" />
                    <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                © 2026 FutureAI Internship
              </div>
            </div>
          </div>

          {/* Right panel — Form */}
          <div style={{ flex: 1, padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {isForgotMode ? (
              <div>
                <div style={{ marginBottom: "2rem" }}>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", marginBottom: "0.4rem" }}>
                    Reset your password
                  </h1>
                  <p style={{ fontSize: "0.875rem", color: "#6b7a8f" }}>
                    {resetEmailSent 
                      ? "Check your inbox! We've sent a secure reset link."
                      : "Enter your email address and we'll send you a secure link to reset your password."}
                  </p>
                </div>

                {resetEmailSent ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", padding: "1rem", borderRadius: "12px", fontSize: "0.85rem", lineHeight: 1.5 }}>
                      An email has been sent to <strong>{email}</strong>. Please follow the link in your email inbox to securely reset your password.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(false);
                        setResetEmailSent(false);
                        setError("");
                      }}
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center", padding: "0.8rem", fontSize: "0.95rem" }}
                    >
                      Back to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="form-group">
                      <label htmlFor="reset-email">Email Address</label>
                      <input
                        id="reset-email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {error && <div className="alert alert-error"><span>{error}</span></div>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center", padding: "0.8rem", marginTop: "0.5rem", fontSize: "0.95rem" }}
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <>Send Reset Link <ArrowRight size={16} /></>}
                    </button>
                    
                    <div style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.85rem" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotMode(false);
                          setError("");
                        }}
                        style={{ color: "#2563eb", fontWeight: 700, cursor: "pointer", textDecoration: "underline", background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: "inherit" }}
                      >
                        Back to login
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "2rem" }}>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", marginBottom: "0.4rem" }}>
                    {isLogin ? "Welcome back" : "Create your account"}
                  </h1>
                  <p style={{ fontSize: "0.875rem", color: "#6b7a8f" }}>
                    {isLogin ? "Sign in to continue your internship journey." : "Join FutureAI and start learning AI/ML today."}
                  </p>
                </div>

                <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {!isLogin && (
                    <>
                      <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input id="fullname" type="text" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="college">College / University</label>
                        <input id="college" type="text" required placeholder="IIT Bombay" value={college} onChange={(e) => setCollege(e.target.value)} />
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" required placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label htmlFor="password">Password</label>
                      {isLogin && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotMode(true);
                            setError("");
                          }}
                          style={{ color: "#2563eb", fontSize: "0.8rem", fontWeight: 700, background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline", textUnderlineOffset: "2px", fontFamily: "inherit" }}
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <input id="password" type="password" required minLength={6} placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {error && <div className="alert alert-error"><span>{error}</span></div>}
                  <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.8rem", marginTop: "0.5rem", fontSize: "0.95rem" }}>
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <>{isLogin ? "Sign In" : "Start Internship"} <ArrowRight size={16} /></>}
                  </button>
                </form>

                <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.85rem", color: "#6b7a8f" }}>
                  {isLogin ? "New student?" : "Already have an account?"}{" "}
                  <button type="button" onClick={() => { setIsLogin(!isLogin); setError(""); }}
                    style={{ color: "#2563eb", fontWeight: 700, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "2px", background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: "inherit" }}>
                    {isLogin ? "Create an account" : "Sign in instead"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
