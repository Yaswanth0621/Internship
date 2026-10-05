"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { CheckCircle2, Loader2, ShieldCheck, CreditCard, BookOpen, Download, Sparkles, ArrowLeft } from "lucide-react";
import Script from "next/script";
import Link from "next/link";
import { trendingCourses, getCourseById } from "@/data/trendingCourses";

// Add Razorpay typing to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentClient() {
  const [user, loadingAuth] = useAuthState(auth);
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [includeLOR, setIncludeLOR] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const courseParam = searchParams.get("courseId");
  const isCombo = courseParam === "combo";
  const trendingCourse = courseParam && !isCombo ? getCourseById(courseParam) : null;
  const isTrendingCourse = Boolean(trendingCourse);

  const isOneMonth = studentData?.courseId === "1_month";

  // Determine amount
  const amount = isCombo
    ? 499
    : isTrendingCourse
    ? trendingCourse!.price
    : includeLOR
    ? 229
    : 119;
  const amountInPaise = amount * 100;

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
          const data = docSnap.data();
          setStudentData(data);

          if (isCombo) {
            if (data.paymentStatus_combo === "approved") {
              setSuccess(true);
            }
          } else if (isTrendingCourse && trendingCourse) {
            if (data[`paymentStatus_${trendingCourse.id}`] === "approved") {
              setSuccess(true);
            }
          } else {
            if (data.paymentStatus === "approved") {
              setSuccess(true);
            }
          }
        }
      },
      (err) => {
        console.error("Error listening to payment student data:", err);
      }
    );

    return () => unsubscribe();
  }, [user, loadingAuth, router, isTrendingCourse, trendingCourse]);

  const initializeRazorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_live_TWohmS86WAgf2s", // Public Live Key ID
      amount: amountInPaise.toString(),
      currency: "INR",
      name: "FutureAI Education",
      description: isCombo
        ? "All-Access Pass: Unlock All 7 Masterclasses"
        : isTrendingCourse
        ? `Unlock Full: ${trendingCourse!.title}`
        : includeLOR
        ? "Official Certificate & Signed LOR"
        : "Official Verified Certificate",
      image: "https://i.imgur.com/KxP4b8H.png",
      handler: async function (response: any) {
        try {
          const docRef = doc(db, "students", user!.uid);
          const now = new Date().toISOString();

          if (isCombo) {
            const comboUpdates: any = {
              paymentStatus_combo: "approved",
              razorpay_combo: response.razorpay_payment_id,
            };
            trendingCourses.forEach((c) => {
              comboUpdates[`paymentStatus_${c.id}`] = "approved";
              comboUpdates[`unlockedAt_${c.id}`] = now;
              comboUpdates[`razorpay_${c.id}`] = response.razorpay_payment_id;
            });
            await updateDoc(docRef, comboUpdates);
          } else if (isTrendingCourse && trendingCourse) {
            const courseKey = trendingCourse.id;
            await updateDoc(docRef, {
              [`paymentStatus_${courseKey}`]: "approved",
              [`unlockedAt_${courseKey}`]: now,
              [`razorpay_${courseKey}`]: response.razorpay_payment_id,
            });
          } else {
            const certId = `FAI-${Date.now().toString(36).toUpperCase()}-${user!.uid.slice(0, 6).toUpperCase()}`;
            const trackSuffix = isOneMonth ? "1_month" : "7_day";

            await updateDoc(docRef, {
              paymentStatus: "approved",
              certificateId: certId,
              razorpay_payment_id: response.razorpay_payment_id,
              paymentSubmittedAt: now,
              approvedAt: now,
              includesLOR: includeLOR,

              // Track specific equivalents
              [`paymentStatus_${trackSuffix}`]: "approved",
              [`certificateId_${trackSuffix}`]: certId,
              [`razorpay_payment_id_${trackSuffix}`]: response.razorpay_payment_id,
              [`paymentSubmittedAt_${trackSuffix}`]: now,
              [`approvedAt_${trackSuffix}`]: now,
              [`includesLOR_${trackSuffix}`]: includeLOR,
            });
          }

          setSuccess(true);
        } catch (err) {
          console.error("Failed to update database after payment", err);
          alert("Payment received, but database status update encountered an error. Please contact support.");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: studentData?.name || user?.displayName || "",
        email: user?.email || "",
      },
      theme: {
        color: "#2563eb",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      alert("Payment failed: " + response.error.description);
      setLoading(false);
    });
    paymentObject.open();
  };

  if (loadingAuth || (!studentData && !success && user)) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#fff" }}>
        <Loader2 size={32} color="#2563eb" className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", background: "#fff", minHeight: "100vh" }}>
      <Navigation />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className="hero-section" style={{ flexGrow: 1, display: "flex", alignItems: "center", padding: "4rem 0" }}>
        <div className="hero-blob hero-blob-right" />
        <div className="hero-blob hero-blob-left" />

        <div className="container-custom" style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 10 }}>
          
          <div style={{ textAlign: "center", marginBottom: "2rem", maxWidth: "620px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Link
                href="/dashboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.825rem",
                  fontWeight: 700,
                  color: "#2563eb",
                  textDecoration: "none",
                  background: "#eff6ff",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "9999px",
                }}
              >
                <ArrowLeft size={14} /> Back to Dashboard
              </Link>
            </div>

            <h1 style={{ fontSize: "clamp(1.35rem, 4vw, 2rem)", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
              {isCombo ? "Combo Pack All-Access" : isTrendingCourse ? trendingCourse!.title : "Secure Your Certificate"}
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#4b5563" }}>
              {isCombo 
                ? "Unlock all 7 masterclasses and kickstart your tech career."
                : isTrendingCourse
                ? "Unlock all modules and get the official course manual."
                : "Complete your one-time verification fee to instantly receive your credentials."}
            </p>
          </div>

          <div className="card" style={{ maxWidth: "540px", width: "100%", padding: "clamp(1.25rem, 4vw, 2.5rem)", borderRadius: "20px", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              
              {!success ? (
                <>
                  <div
                    style={{
                      borderBottom: "1px solid #f1f3f7",
                      paddingBottom: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    {isTrendingCourse && (
                      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                        <span style={{ background: "#eff6ff", color: "#2563eb", fontWeight: 800, fontSize: "0.75rem", padding: "0.25rem 0.6rem", borderRadius: "9999px", textTransform: "uppercase" }}>
                          {trendingCourse!.badge}
                        </span>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                          {trendingCourse!.title}
                        </h3>
                        <p style={{ fontSize: "0.825rem", color: "#64748b", margin: 0 }}>
                          Module 1 was free • Unlocking Modules 2 to 7 & Course PDF
                        </p>
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Amount Due
                      </span>
                      <span style={{ background: "#dcfce7", color: "#15803d", padding: "0.15rem 0.5rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 800 }}>
                        {isTrendingCourse ? "LIMITED TIME OFFER" : "88% OFF"}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.25rem", color: "#94a3b8", textDecoration: "line-through", fontWeight: 700 }}>
                        ₹{isTrendingCourse ? trendingCourse!.originalPrice : includeLOR ? "1,999" : "999"}
                      </span>
                      <span style={{ fontSize: "clamp(2.5rem, 8vw, 3.5rem)", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                        ₹{amount}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.85rem", color: "var(--gray-600)", textAlign: "center", maxWidth: "360px", marginTop: "0.25rem" }}>
                      {isTrendingCourse ? (
                        "One-time payment for lifetime access to all modules, code implementations, and the official technical manual (PDF)."
                      ) : isOneMonth ? (
                        "Instant access to advanced curriculum and instant generation of Certificate and LOR upon completion."
                      ) : (
                        "One-time nominal fee. Certificate and credentials unlocked immediately upon payment."
                      )}
                    </div>

                    {isTrendingCourse && (
                      <div style={{ marginTop: "1rem", width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "1rem" }}>
                        <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#1e293b", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          What You Get:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.825rem", color: "#475569", lineHeight: 1.6 }}>
                          <li><strong>All 7 Modules Unlocked:</strong> Full access to 40+ hours of curriculum</li>
                          <li><strong>Production Code & Labs:</strong> Downloadable templates & architectures</li>
                          <li><strong>Official Course Manual:</strong> High-res PDF textbook download</li>
                          <li><strong>Verifiable Certificate:</strong> Cryptographically signed completion badge</li>
                        </ul>
                      </div>
                    )}

                    {!isTrendingCourse && !isCombo && (
                      <div
                        style={{
                          marginTop: "1rem",
                          width: "100%",
                          background: includeLOR ? "#eff6ff" : "#f8fafc",
                          border: includeLOR ? "2px solid #2563eb" : "1px solid #dde2ea",
                          borderRadius: "16px",
                          padding: "1.25rem",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          textAlign: "left",
                        }}
                        onClick={() => setIncludeLOR(!includeLOR)}
                      >
                        <input
                          type="checkbox"
                          checked={includeLOR}
                          onChange={(e) => setIncludeLOR(e.target.checked)}
                          style={{ marginTop: "0.25rem", width: "18px", height: "18px", accentColor: "#2563eb", cursor: "pointer" }}
                        />
                        <div>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            Add Official Signed Letter of Recommendation (LOR)
                            <span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "0.15rem 0.5rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 800 }}>+₹110</span>
                          </h4>
                          <p style={{ fontSize: "0.825rem", color: "#4b5563", lineHeight: 1.5, margin: 0 }}>
                            Instant generation: Receive an official, verifiable LOR signed by the FutureAI Directorate on corporate letterhead. Essential for college credits, placements, and MS admissions.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.95rem", color: "#4b5563" }}>{isCombo ? "Combo Pack (7 Courses)" : "Enrollment Fee"}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>₹{isCombo ? 499 : isTrendingCourse ? trendingCourse!.price : 119}</span>
                  </div>

                  {/* TRUST BAR — above pay button */}
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "0.75rem 1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem", justifyContent: "center", marginBottom: "0.5rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 700, color: "#15803d" }}>
                      <ShieldCheck size={14} /> 100% Secure Checkout
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 700, color: "#15803d" }}>
                      🔒 256-bit SSL Encrypted
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 700, color: "#15803d" }}>
                      ✅ 10,247+ Students Paid Safely
                    </span>
                  </div>

                  <button
                    id="btn-pay-now"
                    onClick={initializeRazorpay}
                    disabled={loading}
                    className="btn-primary w-full"
                    style={{ padding: "1rem", fontSize: "1.1rem", justifyContent: "center", marginTop: "0.5rem", gap: "0.75rem" }}
                  >
                    {loading ? (
                      <Loader2 size={24} className="animate-spin" />
                    ) : (
                      <>
                        <CreditCard size={20} />
                        Pay ₹{amount} with Razorpay
                      </>
                    )}
                  </button>

                  {/* Refund promise */}
                  <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#64748b", marginTop: "0.5rem" }}>
                    🛡️ <strong>7-Day Refund Guarantee</strong> — Not satisfied? Email us for a full refund, no questions asked.
                  </p>

                  <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", opacity: 0.6, marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>⚡ UPI / GPay / PhonePe</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>💳 All Cards</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>🏦 Net Banking</span>
                  </div>

                  {/* Mini FAQ */}
                  <div style={{ borderTop: "1px solid #f1f5f9", marginTop: "1rem", paddingTop: "1rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Common Questions</div>
                    {[
                      { q: "Is this payment safe?", a: "Yes. All payments are processed by Razorpay — India's #1 payment gateway trusted by 8 million+ businesses. Your card data never touches our servers." },
                      { q: "What if I want a refund?", a: "Email team@futureee.me within 7 days of purchase and we'll process a full refund — no questions asked." },
                      { q: "When do I get access?", a: "Instantly! Access is unlocked within seconds of payment confirmation. No waiting, no manual approval." },
                    ].map((item, i) => (
                      <details key={i} style={{ marginBottom: "0.5rem", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                        <summary style={{ padding: "0.6rem 0.85rem", fontSize: "0.82rem", fontWeight: 700, color: "#374151", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                          {item.q} <span style={{ color: "#94a3b8" }}>+</span>
                        </summary>
                        <div style={{ padding: "0 0.85rem 0.6rem", fontSize: "0.8rem", color: "#4b5563", lineHeight: 1.6, borderTop: "1px solid #f1f5f9" }}>
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </div>

                  {/* Contact before purchase */}
                  <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "0.75rem 1rem", textAlign: "center", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                      Have a question before paying?{" "}
                      <a href="https://wa.me/917989013513?text=Hi%2C%20I%20have%20a%20question%20about%20the%20FutureAI%20course" target="_blank" rel="noopener noreferrer" style={{ color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>
                        💬 WhatsApp Us
                      </a>
                      {" or "}
                      <a href="mailto:team@futureee.me" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "none" }}>
                        📧 Email
                      </a>
                      {" — we reply within 2 hours."}
                    </p>
                  </div>

                </>
              ) : (
                <div className="flex flex-col items-center text-center py-6 gap-6">
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "var(--green-500)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 0 10px rgba(34, 197, 94, 0.1)",
                    }}
                  >
                    <CheckCircle2 size={40} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--gray-900)", marginBottom: "0.5rem" }}>
                      Payment Approved!
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "var(--gray-600)", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
                      {isTrendingCourse
                        ? `Your access to ${trendingCourse!.title} is now fully unlocked. All 7 modules, practical labs, and the downloadable PDF manual are ready.`
                        : `Your transaction was successful. Your official Certificate${includeLOR ? " and signed Letter of Recommendation (LOR)" : ""} are now unlocked for instant PDF download in your dashboard.`}
                    </p>
                  </div>
                  <button
                    id="btn-view-cert-after-pay"
                    onClick={() => router.push(isTrendingCourse ? `/dashboard?courseId=${trendingCourse!.id}` : "/dashboard")}
                    className="btn-primary"
                    style={{ marginTop: "1rem" }}
                  >
                    {isTrendingCourse ? "Go to My Course & Start Learning" : "Go to Dashboard & Download Credentials"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>
              Secured by <strong style={{ color: "var(--gray-900)" }}>Razorpay</strong> • 256-Bit SSL Encryption
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
