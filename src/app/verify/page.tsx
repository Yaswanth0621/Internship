"use client";

import { useState, useEffect, Suspense } from "react";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Download,
  Share2
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VerificationContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // 1. Try to fetch by document ID (student's UID)
        const docRef = doc(db, "students", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.certificateId) {
            setStudent(data);
            return;
          }
        }

        // 2. Fallback: Search the students collection by the certificateId field
        const q = query(collection(db, "students"), where("certificateId", "==", id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setStudent(querySnapshot.docs[0].data());
        }
      } catch (err) {
        console.error("Error verifying certificate ID:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudent();
    else setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
        <div className="animate-spin" style={{ width: "40px", height: "40px", border: "4px solid #3b82f6", borderTopColor: "transparent", borderRadius: "50%" }} />
      </div>
    );
  }

  if (!student) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0f172a", color: "#fff", textAlign: "center", padding: "2rem" }}>
        <meta name="robots" content="noindex, nofollow" />
        <div style={{ background: "rgba(239, 68, 68, 0.1)", padding: "2rem", borderRadius: "32px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
          <ShieldCheck size={64} color="#ef4444" style={{ marginBottom: "1.5rem" }} />
          <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}>Invalid Certificate</h1>
          <p style={{ color: "#94a3b8", maxWidth: "400px", lineHeight: 1.6 }}>The certificate ID you are looking for does not exist or has not been issued yet.</p>
          <Link href="/" style={{ display: "inline-block", marginTop: "2rem", color: "#3b82f6", fontWeight: 700, textDecoration: "none" }}>Go to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="verify-main">
      <style>{`
        .verify-main {
          min-height: 100vh;
          background: #0f172a;
          background-image: radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          padding: 4rem 1rem;
          font-family: sans-serif;
        }
        .verify-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .verify-title {
          color: #fff;
          font-size: 3rem;
          font-weight: 900;
          margin-top: 1.5rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .verify-card {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }
        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
        }
        .cert-id-container {
          text-align: right;
        }
        .student-name {
          color: #fff;
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
        }
        .btn-row {
          margin-top: 3rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .action-btn-primary {
          background: #fff;
          color: #0f172a;
          border: none;
          padding: 1rem 2rem;
          border-radius: 16px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          font-size: 0.95rem;
          transition: transform 0.2s, background-color 0.2s;
        }
        .action-btn-primary:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }
        .action-btn-outline {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 2rem;
          border-radius: 16px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          font-size: 0.95rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: transform 0.2s, background-color 0.2s;
        }
        .action-btn-outline:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
        
        @media (max-width: 640px) {
          .verify-main {
            padding: 2rem 0.75rem;
          }
          .verify-title {
            font-size: 1.8rem;
          }
          .verify-card {
            padding: 1.5rem;
            border-radius: 28px;
          }
          .card-header-row {
            flex-direction: column;
            gap: 1.25rem;
            align-items: flex-start;
            margin-bottom: 2rem;
          }
          .cert-id-container {
            text-align: left;
          }
          .student-name {
            font-size: 1.6rem;
            word-break: break-word;
          }
          .info-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            padding-top: 1.5rem;
          }
          .btn-row {
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 2rem;
            width: 100%;
          }
          .action-btn-primary, .action-btn-outline {
            width: 100%;
            padding: 0.875rem 1.5rem;
          }
        }
      `}</style>

      <div className="verify-container">
        
        {/* Verification Badge */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            background: "rgba(34, 197, 94, 0.1)", 
            color: "#22c55e", 
            padding: "0.75rem 1.5rem", 
            borderRadius: "100px", 
            fontSize: "0.9rem", 
            fontWeight: 800,
            border: "1px solid rgba(34, 197, 94, 0.2)",
            backdropFilter: "blur(10px)"
          }}>
            <CheckCircle2 size={18} /> VERIFIED ACHIEVEMENT
          </div>
          <h1 className="verify-title">Certificate of Completion</h1>
        </div>

        {/* Certificate Card */}
        <div className="verify-card">
          {/* Decorative Elements */}
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: "rgba(59, 130, 246, 0.1)", filter: "blur(40px)", borderRadius: "50%" }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="card-header-row">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ background: "#2563eb", width: "48px", height: "48px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Award color="#fff" size={28} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 900, fontSize: "1.2rem" }}>FutureAI</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600 }}>PLATFORM VERIFIED</div>
                </div>
              </div>
              <div className="cert-id-container">
                <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>CERTIFICATE ID</div>
                <div style={{ color: "#3b82f6", fontWeight: 800, fontFamily: "monospace", fontSize: "1.1rem" }}>{student.certificateId}</div>
              </div>
            </div>

            <div style={{ marginBottom: "3rem" }}>
              <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>THIS IS TO CERTIFY THAT</p>
              <h2 className="student-name">{student.name}</h2>
              <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "600px" }}>
                Has successfully completed the <strong>{student.course || "AI/ML Intensive Internship"}</strong> program, demonstrating exceptional proficiency and dedication.
              </p>
            </div>

            <div className="info-grid">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  <Building2 size={16} /> INSTITUTION
                </div>
                <div style={{ color: "#fff", fontWeight: 700 }}>{student.college || "N/A"}</div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  <Calendar size={16} /> ISSUED ON
                </div>
                <div style={{ color: "#fff", fontWeight: 700 }}>
                  {student.approvedAt ? new Date(student.approvedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "May 2026"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="btn-row">
          <button 
            onClick={() => window.print()}
            className="action-btn-primary"
          >
            <Download size={20} /> Download PDF
          </button>
          <button 
            onClick={() => {
              navigator.share({
                title: `${student.name}'s FutureAI Certificate`,
                url: window.location.href
              }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              });
            }}
            className="action-btn-outline"
          >
            <Share2 size={20} /> Share Achievement
          </button>
        </div>
      </div>
    </main>
  );
}

export default function VerificationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://futureee.me/verify/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://futureee.me/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Verify Certificate",
        "item": "https://futureee.me/verify/"
      }
    ]
  };

  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0f172a" }} />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VerificationContent />
    </Suspense>
  );
}
