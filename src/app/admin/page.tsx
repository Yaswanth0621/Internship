"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/lib/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { collection, query, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navigation from "@/components/Navigation";
import { CertificateAgent } from "@/lib/certificate/CertificateAgent";
import { 
  Check, 
  Loader2, 
  ShieldCheck, 
  RefreshCw, 
  Users, 
  Search, 
  Trash2, 
  UserMinus, 
  BarChart3, 
  IndianRupee,
  Award,
  BookOpen,
  DownloadCloud,
  Pencil,
  Eye,
  ExternalLink,
  Mail,
  Copy,
  Send,
  Info,
  AlertTriangle
} from "lucide-react";

export default function AdminPortal() {
  const [user, loadingAuth] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [adminPassword, setAdminPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const [allStudents, setAllStudents] = useState<any[]>([]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [bulkProgress, setBulkProgress] = useState<{current: number, total: number} | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [progressFilter, setProgressFilter] = useState<string>("all");
  const [editingStudent, setEditingStudent] = useState<any | null>(null);

  const [trackFilter, setTrackFilter] = useState<"all" | "7_day" | "1_month">("all");

  // Broadcast Panel State
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastTarget, setBroadcastTarget] = useState<"all" | "pending" | "approved" | "selected" | "7_day" | "1_month">("all");
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [completedBatches, setCompletedBatches] = useState<number[]>([]);

  useEffect(() => {
    setCompletedBatches([]);
  }, [isBroadcastModalOpen, broadcastTarget, selectedStudents]);

  useEffect(() => {
    if (!isPasswordVerified || !user) return;

    setLoading(true);
    console.log("Admin Portal: Initializing real-time Firestore listener on 'students' collection...");
    const colRef = collection(db, "students");
    
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      console.log(`Admin Portal: Real-time update received! Document count: ${querySnapshot.size}`);
      const list: any[] = [];
      querySnapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      
      list.sort((a, b) => {
        const dateA = a.paymentSubmittedAt || a.enrolledAt || 0;
        const dateB = b.paymentSubmittedAt || b.enrolledAt || 0;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
      
      setAllStudents(list);
      setLoading(false);
    }, (err) => {
      console.error("Admin Portal: Real-time listener error:", err);
      setLoading(false);
    });

    return () => {
      console.log("Admin Portal: Cleaning up real-time listener subscription.");
      unsubscribe();
    };
  }, [isPasswordVerified, user]);

  const getBroadcastEmails = () => {
    let list: any[] = [];
    if (broadcastTarget === "all") {
      list = allStudents;
    } else if (broadcastTarget === "pending") {
      list = allStudents.filter(s => s.paymentStatus === "pending");
    } else if (broadcastTarget === "approved") {
      list = allStudents.filter(s => s.paymentStatus === "approved");
    } else if (broadcastTarget === "selected") {
      list = allStudents.filter(s => selectedStudents.includes(s.id));
    } else if (broadcastTarget === "7_day") {
      list = allStudents.filter(s => s.courseId !== "1_month");
    } else if (broadcastTarget === "1_month") {
      list = allStudents.filter(s => s.courseId === "1_month");
    }
    return list.map(s => s.email).filter(Boolean);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleLaunchMailApp = () => {
    const emails = getBroadcastEmails();
    if (emails.length === 0) {
      alert("No recipients selected.");
      return;
    }
    const bccList = emails.join(",");
    const mailtoUrl = `mailto:team@futureee.me?bcc=${encodeURIComponent(bccList)}&subject=${encodeURIComponent(broadcastSubject)}&body=${encodeURIComponent(broadcastBody)}`;
    
    if (mailtoUrl.length > 2000) {
      navigator.clipboard.writeText(bccList);
      setCopiedField("emails");
      setTimeout(() => setCopiedField(null), 3000);
      alert("BCC list is too long for standard browser links. We have automatically copied all recipient emails to your clipboard!\n\nWe will now open your Namecheap PrivateEmail composer. Simply press Ctrl+V to paste the recipients into the BCC field!");
      window.open("https://privateemail.com/appsuite/#app=io.ox/mail&action=compose", "_blank");
    } else {
      window.open(mailtoUrl, "_blank");
    }
  };

  const handleApplyTemplate = (type: "welcome" | "approval" | "progress" | "summer_start" | "lor_upgrade" | "june21_notice" | "support_guidance") => {
    if (type === "welcome") {
      setBroadcastSubject("Welcome to FutureAI Internship Platform!");
      setBroadcastBody(
        `Dear Student,\n\nWe are excited to have you onboard for the FutureAI AI/ML Internship!\n\nPlease log in to your dashboard at https://futureee.me/dashboard to complete your tasks and progress through the 7 modules.\n\nFor any support, please contact us at team@futureee.me.\n\nBest regards,\nFutureAI Team`
      );
    } else if (type === "approval") {
      setBroadcastSubject("Your FutureAI Certificate is Pending Review");
      setBroadcastBody(
        `Dear Student,\n\nCongratulations on completing your internship tasks! We have received your certificate processing request.\n\nOur team is currently reviewing your payment reference (UTR). If your payment is valid, your verified certificate will be granted and made available for download in your dashboard within 24 hours.\n\nIf you have any questions, reply directly to this email (team@futureee.me).\n\nBest regards,\nFutureAI Team`
      );
    } else if (type === "progress") {
      setBroadcastSubject("Keep Going! Complete your FutureAI Internship Tasks");
      setBroadcastBody(
        `Dear Student,\n\nThis is a quick reminder to continue your progress in the FutureAI Internship program. Log in to your dashboard to complete the remaining tasks and claim your certified badge!\n\nAccess dashboard: https://futureee.me/dashboard\n\nBest regards,\nFutureAI Team`
      );
    } else if (type === "summer_start") {
      setBroadcastSubject("Important: Start Your 1-Month Summer AI/ML Internship!");
      setBroadcastBody(
        `Dear Student,\n\nWe are absolutely thrilled to welcome you to India's Elite 1-Month Summer Internship in AI & Machine Learning!\n\nTo unlock your advanced dashboard curriculum, enterprise modules, and start learning immediately, please complete your upfront enrollment verification.\n\nVerify your enrollment and pay ₹100 securely at: https://futureee.me/dashboard\n\nBest regards,\nFutureAI Team`
      );
    } else if (type === "lor_upgrade") {
      setBroadcastSubject("Upgrade Your FutureAI Credentials: Add a signed Letter of Recommendation!");
      setBroadcastBody(
        `Dear Student,\n\nWe want to congratulate you on your incredible progress on the FutureAI Internship platform.\n\nTo maximize your professional impact, we highly recommend upgrading your credentials with a Verified Letter of Recommendation (LOR) signed by the FutureAI Directorate. A signed LOR is a game-changer for university credits, job applications, and showing off on LinkedIn!\n\nYou can easily upgrade and pay ₹100 extra in your payment gateway.\n\nUpgrade your profile at: https://futureee.me/dashboard/payment\n\nBest regards,\nFutureAI Team`
      );
    } else if (type === "june21_notice") {
      setBroadcastSubject("Announcement: Summer Cohort Certification Timeline");
      setBroadcastBody(
        `Dear Student,\n\nWe hope your summer internship journey is progressing beautifully!\n\nThis is an official notice regarding the certification release schedule for the 1-Month Summer Program. All official certificates of completion and signed Letters of Recommendation (LOR) will be generated and published on June 21, 2026 for all students who complete their modules.\n\nYou are highly encouraged to complete your coursework and payment early to ensure your documents are generated on priority.\n\nTrack your status: https://futureee.me/dashboard\n\nBest regards,\nFutureAI Team`
      );
    } else if (type === "support_guidance") {
      setBroadcastSubject("FutureAI Support Desk: Having issues with payments or submissions?");
      setBroadcastBody(
        `Dear Student,\n\nAre you facing technical issues while submitting your repository links or completing your Razorpay checkout? We are here to help!\n\nCommon Fixes:\n1. Google Colab/Drive/GitHub links: Make sure the permissions are set to 'Anyone with the link can view' before submitting.\n2. Payment failure: Try using an alternate payment method (UPI, Cards, or Netbanking) on our secure checkout gateway.\n3. If you still face issues, simply reply directly to this email or click the 'Help & Support' button in your dashboard.\n\nOur dedicated team will resolve your queries on priority!\n\nGet help: https://futureee.me/dashboard\n\nBest regards,\nFutureAI Team`
      );
    }
  };


  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "students"));
      const querySnapshot = await getDocs(q);
      const list: any[] = [];
      querySnapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      
      list.sort((a, b) => {
        const dateA = a.paymentSubmittedAt || a.enrolledAt || 0;
        const dateB = b.paymentSubmittedAt || b.enrolledAt || 0;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
      
      setAllStudents(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (studentId: string) => {
    setActionLoading(studentId);
    try {
      const student = allStudents.find(s => s.id === studentId);
      const docRef = doc(db, "students", studentId);
      const certId = student?.certificateId || `FAI-${Date.now().toString(36).toUpperCase()}-${studentId.slice(0,6).toUpperCase()}`;
      const trackSuffix = student?.courseId === "1_month" ? "1_month" : "7_day";
      const now = new Date().toISOString();
      
      const updateData: any = {
        paymentStatus: "approved",
        isVerified: true,
        certificateId: certId,
        approvedAt: now,

        // Save track-specific equivalents
        [`paymentStatus_${trackSuffix}`]: "approved",
        [`certificateId_${trackSuffix}`]: certId,
        [`approvedAt_${trackSuffix}`]: now,
      };

      // Always update Firestore first so the student is officially approved
      await updateDoc(docRef, updateData);

      // Auto-generate certificate during approval if progress is 100 (non-blocking cloud save)
      if (student?.progress >= 100) {
        // Attempt cloud backup, but catch ALL errors and don't block the UI
        CertificateAgent.generate({
          name: student.name,
          course: student.course || "AI/ML Intensive Internship",
          date: new Date().toLocaleDateString("en-IN", { year:"numeric", month:"long", day:"numeric" }),
          id: certId,
        }).then(async (pdfDoc) => {
          const pdfBlob = pdfDoc.output("blob");
          const storageRef = ref(storage, `certificates/${studentId}.pdf`);
          await uploadBytes(storageRef, pdfBlob);
          const downloadURL = await getDownloadURL(storageRef);
          await updateDoc(docRef, { certificateURL: downloadURL });
        }).catch(err => {
          console.warn("Background cloud backup skipped:", err.message);
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const [bulkLoading, setBulkLoading] = useState(false);

  const handleBulkAction = async (type: "approve" | "delete" | "grant") => {
    if (selectedStudents.length === 0) return;
    if (!confirm(`Are you sure you want to ${type} ${selectedStudents.length} students?`)) return;

    setBulkLoading(true);
    setBulkProgress({ current: 0, total: selectedStudents.length });
    let successCount = 0;

    for (const studentId of selectedStudents) {
      try {
        const student = allStudents.find(s => s.id === studentId);
        if (!student) continue;

        if (type === "approve") {
          await handleApprove(studentId);
        } else if (type === "delete") {
          await deleteDoc(doc(db, "students", studentId));
        } else if (type === "grant") {
          const student = allStudents.find(s => s.id === studentId);
          if (student && student.progress >= 100) {
            await handleApprove(studentId);
          }
        }
        successCount++;
        setBulkProgress(prev => prev ? { ...prev, current: prev.current + 1 } : null);
      } catch (err) {
        console.error(`Bulk ${type} failed for ${studentId}:`, err);
      }
    }

    setSelectedStudents([]);
    setBulkLoading(false);
    setBulkProgress(null);
    alert(`Bulk ${type} completed: ${successCount} processed.`);
  };

  const exportToCSV = () => {
    const dataToExport = selectedStudents.length > 0 
      ? allStudents.filter(s => selectedStudents.includes(s.id))
      : displayedStudents;

    if (dataToExport.length === 0) {
      alert("No data to export.");
      return;
    }

    const headers = ["Name", "Email", "College", "Track", "Course", "PaymentType", "TransactionID", "LORIncluded", "Progress", "Status", "CertificateID"];
    const rows = dataToExport.map(s => [
      s.name,
      s.email,
      s.college,
      s.courseId === "1_month" ? "1-Month Summer" : "7-Day AI/ML",
      s.course,
      s.razorpay_payment_id ? "Razorpay" : s.utr ? "Offline UTR" : "None",
      s.razorpay_payment_id || s.utr || "N/A",
      s.includesLOR ? "Yes" : "No",
      `${Math.round(s.progress || 0)}%`,
      s.paymentStatus || "unpaid",
      s.certificateId || "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(field => `"${field || ""}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `futureai_students_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === displayedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(displayedStudents.map(s => s.id));
    }
  };

  const toggleSelectStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setActionLoading(editingStudent.id);
    try {
      const docRef = doc(db, "students", editingStudent.id);
      await updateDoc(docRef, {
        name: editingStudent.name,
        college: editingStudent.college,
        course: editingStudent.course
      });
      setEditingStudent(null);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevoke = async (studentId: string) => {
    if (!confirm("Are you sure you want to revoke this student's approval?")) return;
    setActionLoading(studentId);
    try {
      const student = allStudents.find(s => s.id === studentId);
      const trackSuffix = student?.courseId === "1_month" ? "1_month" : "7_day";
      const docRef = doc(db, "students", studentId);
      await updateDoc(docRef, {
        paymentStatus: null,
        isVerified: false,
        certificateId: null,
        approvedAt: null,

        // Revoke track-specific equivalents
        [`paymentStatus_${trackSuffix}`]: null,
        [`certificateId_${trackSuffix}`]: null,
        [`approvedAt_${trackSuffix}`]: null,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (studentId: string) => {
    if (!confirm("CRITICAL: This will permanently delete the student record. Continue?")) return;
    setActionLoading(studentId);
    try {
      const docRef = doc(db, "students", studentId);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPassword(""); // Clear input password
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "FutureAI2026") {
      setIsPasswordVerified(true);
      fetchStudents();
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  /* ── Gate screen (Auth & Password Verification) ── */
  if (loadingAuth) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>
        <Loader2 size={36} color="#2563eb" className="animate-spin" style={{ color: "#2563eb" }} />
      </main>
    );
  }

  // Step 1: Check if Firebase Auth is logged in as an admin
  const isUserAdmin = user && (
    user.email === 'team@futureee.me' || 
    user.email === 'admin@futureee.me' ||
    user.email?.endsWith('@futureee.me')
  );

  if (!isUserAdmin) {
    return (
      <main style={{ minHeight: "100vh", background: "#f3f4f6" }}>
        <Navigation />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "32px",
            padding: "3rem",
            width: "100%",
            maxWidth: "440px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}>
            <div style={{
              width: "72px",
              height: "72px",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              boxShadow: "0 10px 20px rgba(239, 68, 68, 0.2)"
            }}>
              <ShieldCheck size={32} color="#fff" />
            </div>
            
            <form onSubmit={handleAdminLogin}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#111827", letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
                Admin Auth
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#6b7280", marginBottom: "2rem" }}>
                Sign in with your @futureee.me admin credentials to unlock operations.
              </p>
              
              <div style={{ textAlign: "left", marginBottom: "1rem" }}>
                <label htmlFor="admin-login-email" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Admin Email</label>
                <input 
                  id="admin-login-email"
                  type="email"
                  placeholder="admin@futureee.me"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    outline: "none",
                    marginTop: "0.25rem"
                  }}
                  required
                />
              </div>

              <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                <label htmlFor="admin-login-password" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Password</label>
                <input 
                  id="admin-login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    outline: "none",
                    marginTop: "0.25rem"
                  }}
                  required
                />
              </div>

              {authError && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "1rem" }}>{authError}</p>}
              
              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "1rem", borderRadius: "14px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none" }}
              >
                {authLoading ? <Loader2 size={18} className="animate-spin" /> : "Sign In to Admin"}
              </button>

              <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "1.5rem" }}>
                Note: Only registered administrative accounts are permitted. If you don&apos;t have one, please register on `/auth` first.
              </p>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Step 2: Show Security Key Form
  if (!isPasswordVerified) {
    return (
      <main style={{ minHeight: "100vh", background: "#f3f4f6" }}>
        <Navigation />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6rem 1.5rem" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "32px",
            padding: "3rem",
            width: "100%",
            maxWidth: "440px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}>
            <div style={{
              width: "72px",
              height: "72px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)"
            }}>
              <ShieldCheck size={32} color="#fff" />
            </div>
            
            <form onSubmit={handlePasswordSubmit}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#111827", letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
                Security Key
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#6b7a8f", marginBottom: "2rem" }}>
                Enter the master password to access the operations dashboard.
              </p>
              <input 
                type="password"
                placeholder="Enter Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "14px",
                  border: passwordError ? "2px solid #ef4444" : "1px solid #e2e8f0",
                  marginBottom: "1rem",
                  textAlign: "center",
                  fontSize: "1rem",
                  outline: "none"
                }}
              />
              {passwordError && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "1rem" }}>Incorrect password. Access denied.</p>}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "1rem", borderRadius: "14px" }}
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Analytics Calculations
  const totalStudents = allStudents.length;
  const approvedCount = allStudents.filter(s => s.paymentStatus === "approved").length;
  const pendingCount = allStudents.filter(s => s.paymentStatus === "pending").length;
  
  // Track wise counts
  const sevenDayCount = allStudents.filter(s => s.courseId !== "1_month").length;
  const oneMonthCount = allStudents.filter(s => s.courseId === "1_month").length;
  const sevenDayPaidCount = allStudents.filter(s => s.courseId !== "1_month" && s.paymentStatus === "approved").length;
  const oneMonthPaidCount = allStudents.filter(s => s.courseId === "1_month" && s.paymentStatus === "approved").length;
  const lorCount = allStudents.filter(s => s.includesLOR === true && s.paymentStatus === "approved").length;

  // Revenue equation: ₹119 base + ₹110 extra if s.includesLOR is true (₹229)
  const totalRevenue = allStudents
    .filter(s => s.paymentStatus === "approved")
    .reduce((acc, s) => acc + (s.includesLOR ? 229 : 119), 0);

  const conversionRate = totalStudents > 0 ? ((approvedCount / totalStudents) * 100).toFixed(1) : "0";

  const displayedStudents = allStudents.filter(s => {
    // Tab Filter
    if (activeTab === "pending" && s.paymentStatus !== "pending") return false;
    if (activeTab === "approved" && s.paymentStatus !== "approved") return false;
    
    // Progress Filter
    if (progressFilter !== "all") {
      const p = s.progress || 0;
      if (progressFilter === "completed" && p < 100) return false;
      if (progressFilter === "in_progress" && (p <= 0 || p >= 100)) return false;
      if (progressFilter === "not_started" && p > 0) return false;
    }

    // Track Filter
    if (trackFilter !== "all") {
      if (trackFilter === "7_day" && s.courseId === "1_month") return false;
      if (trackFilter === "1_month" && s.courseId !== "1_month") return false;
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.college?.toLowerCase().includes(q) ||
        s.utr?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "5rem" }}>
      <Navigation />
      
      {bulkProgress && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        }}>
          <div style={{
            background: "#fff",
            padding: "3rem",
            borderRadius: "32px",
            width: "100%",
            maxWidth: "480px",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
          }}>
            <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 2rem" }}>
               <Loader2 size={80} className="animate-spin" color="#2563eb" style={{ opacity: 0.2 }} />
               <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 800, color: "#2563eb" }}>
                  {Math.round((bulkProgress.current / bulkProgress.total) * 100)}%
               </div>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1e293b", marginBottom: "0.5rem" }}>Generating Intelligence</h2>
            <p style={{ color: "#64748b", marginBottom: "2rem" }}>
              Processing student {bulkProgress.current} of {bulkProgress.total}...
            </p>
            <div style={{ height: "12px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden", marginBottom: "1rem" }}>
               <div style={{ 
                 width: `${(bulkProgress.current / bulkProgress.total) * 100}%`, 
                 height: "100%", 
                 background: "linear-gradient(90deg, #2563eb, #3b82f6)", 
                 transition: "width 0.3s ease-out" 
               }} />
            </div>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Please keep this tab open until completion.</p>
          </div>
        </div>
      )}
      
      <div className="container-custom" style={{ paddingTop: "3rem" }}>
        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2563eb", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              <BarChart3 size={16} /> Admin Intelligence
            </div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#111827", letterSpacing: "-0.04em" }}>Operations Dashboard</h1>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button 
              onClick={() => setIsBroadcastModalOpen(true)}
              className="btn-primary"
              style={{ gap: "0.5rem", borderRadius: "12px", background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            >
              <Mail size={16} /> Broadcast Email
            </button>
            <button 
              onClick={exportToCSV} 
              className="btn-outline" 
              style={{ gap: "0.5rem", borderRadius: "12px", background: "#fff" }}
            >
              <DownloadCloud size={16} /> Export CSV
            </button>
            <button onClick={fetchStudents} className="btn-outline" style={{ gap: "0.5rem", borderRadius: "12px" }}>
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Sync Data
            </button>
          </div>
        </div>

        {/* Bulk Actions Floating Bar */}
        {selectedStudents.length > 0 && (
          <div style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1e293b",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "20px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            zIndex: 100,
            border: "1px solid #334155"
          }}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{selectedStudents.length} Students Selected</span>
            <div style={{ height: "24px", width: "1px", background: "#334155" }} />
            <div style={{ display: "flex", gap: "1rem" }}>
              <button 
                onClick={() => handleBulkAction("approve")}
                style={{ background: "#16a34a", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}
              >
                Bulk Approve
              </button>
              <button 
                onClick={() => handleBulkAction("grant")}
                style={{ background: "#2563eb", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}
              >
                Bulk Grant Certificate
              </button>
              <button 
                onClick={() => handleBulkAction("delete")}
                style={{ background: "#ef4444", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}
              >
                Bulk Delete
              </button>
              <button 
                onClick={() => setSelectedStudents([])}
                style={{ background: "transparent", color: "#94a3b8", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Analytics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <StatCard title="Total Students" value={totalStudents} icon={<Users color="#2563eb" />} trend={`7-Day: ${sevenDayCount} | 1-Month: ${oneMonthCount}`} />
          <StatCard title="Approved Certs" value={approvedCount} icon={<Award color="#16a34a" />} trend={`7-Day: ${sevenDayPaidCount} | 1-Month: ${oneMonthPaidCount}`} />
          <StatCard title="Pending Approvals" value={pendingCount} icon={<Loader2 color="#ca8a04" />} trend="Requires manual / Razorpay review" color={pendingCount > 0 ? "#fefce8" : "#fff"} />
          <StatCard title="Total Revenue" value={`₹${totalRevenue}`} icon={<IndianRupee color="#2563eb" />} trend={`Base Certs + LOR Upgrades (${lorCount})`} />
        </div>

        {/* Breakdown Analytics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1e293b", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BookOpen size={18} color="#2563eb" /> Top Institutions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {Object.entries(
                allStudents.reduce((acc: any, s) => {
                  if (s.college) acc[s.college] = (acc[s.college] || 0) + 1;
                  return acc;
                }, {})
              )
              .sort((a: any, b: any) => b[1] - a[1])
              .slice(0, 5)
              .map(([college, count]: any, i) => (
                <div key={college} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "#64748b" }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 600 }}>{college}</span>
                  </div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1e293b" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* Tabs */}
          <div style={{ display: "flex", background: "#fff", padding: "4px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <TabButton active={activeTab === "pending"} onClick={() => setActiveTab("pending")} label="Pending" count={pendingCount} />
            <TabButton active={activeTab === "approved"} onClick={() => setActiveTab("approved")} label="Approved" />
            <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")} label="All Records" />
          </div>

          {/* Track Filter Pills */}
          <div style={{ display: "flex", background: "#fff", padding: "4px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <button 
              type="button"
              onClick={() => setTrackFilter("all")}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "9px",
                border: "none",
                background: trackFilter === "all" ? "#1e293b" : "transparent",
                color: trackFilter === "all" ? "#fff" : "#64748b",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              All Tracks
            </button>
            <button 
              type="button"
              onClick={() => setTrackFilter("7_day")}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "9px",
                border: "none",
                background: trackFilter === "7_day" ? "#2563eb" : "transparent",
                color: trackFilter === "7_day" ? "#fff" : "#64748b",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              ⚡ 7-Day ({sevenDayCount})
            </button>
            <button 
              type="button"
              onClick={() => setTrackFilter("1_month")}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "9px",
                border: "none",
                background: trackFilter === "1_month" ? "#d97706" : "transparent",
                color: trackFilter === "1_month" ? "#fff" : "#64748b",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              ☀️ 1-Month ({oneMonthCount})
            </button>
          </div>

          {/* Progress Filter Dropdown */}
          <select 
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontSize: "0.9rem",
              outline: "none",
              background: "#fff",
              fontWeight: 600,
              color: "#475569"
            }}
          >
            <option value="all">All Progress</option>
            <option value="completed">Completed (100%)</option>
            <option value="in_progress">In Progress</option>
            <option value="not_started">Not Started (0%)</option>
          </select>

          {/* Search */}
          <div style={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}>
            <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or college..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.5rem",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "0.9rem",
                outline: "none",
                background: "#fff"
              }}
            />
          </div>
        </div>

        {/* Students Table */}
        <div style={{ background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          {loading ? (
            <div style={{ padding: "8rem 2rem", textAlign: "center" }}>
              <Loader2 size={40} className="animate-spin" style={{ margin: "0 auto 1rem", color: "#2563eb" }} />
              <p style={{ color: "#64748b" }}>Loading student intelligence...</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "1.25rem", width: "40px" }}>
                      <input 
                        type="checkbox" 
                        checked={selectedStudents.length === displayedStudents.length && displayedStudents.length > 0}
                        onChange={toggleSelectAll}
                        style={{ cursor: "pointer", width: "18px", height: "18px" }}
                      />
                    </th>
                    <th style={{ padding: "1.25rem", color: "#64748b", fontWeight: 600, fontSize: "0.85rem" }}>STUDENT DETAILS</th>
                    <th style={{ padding: "1.25rem", color: "#64748b", fontWeight: 600, fontSize: "0.85rem" }}>UTR / PAYMENT</th>
                    <th style={{ padding: "1.25rem", color: "#64748b", fontWeight: 600, fontSize: "0.85rem" }}>PROGRESS</th>
                    <th style={{ padding: "1.25rem", color: "#64748b", fontWeight: 600, fontSize: "0.85rem", textAlign: "right" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "6rem 2rem", textAlign: "center", color: "#94a3b8" }}>
                        <Users size={48} style={{ opacity: 0.2, margin: "0 auto 1rem" }} />
                        <p>No student records match your filters.</p>
                      </td>
                    </tr>
                  ) : (
                    displayedStudents.map((s) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9", background: selectedStudents.includes(s.id) ? "#f1f7ff" : "transparent", transition: "background 0.1s" }} className="hover:bg-slate-50">
                        <td style={{ padding: "1.25rem" }}>
                          <input 
                            type="checkbox" 
                            checked={selectedStudents.includes(s.id)}
                            onChange={() => toggleSelectStudent(s.id)}
                            style={{ cursor: "pointer", width: "16px", height: "16px" }}
                          />
                        </td>
                        <td style={{ padding: "1.25rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ fontWeight: 800, color: "#1e293b", fontSize: "0.95rem" }}>{s.name || "Anonymous User"}</div>
                            <button 
                              onClick={() => setEditingStudent(s)}
                              style={{ color: "#94a3b8", border: "none", background: "none", cursor: "pointer", padding: "4px" }}
                              className="hover:text-blue-600"
                            >
                              <Pencil size={14} />
                            </button>
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "2px" }}>{s.email}</div>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                             <ShieldCheck size={12} /> {s.college || "N/A"}
                          </div>
                          
                          {/* Premium Program & LOR Badges */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "6px", flexWrap: "wrap" }}>
                            {s.courseId === "1_month" ? (
                              <span style={{ fontSize: "0.65rem", fontWeight: 800, background: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: "6px", border: "1px solid #fde68a" }}>
                                ☀️ 1-Month Summer Track
                              </span>
                            ) : (
                              <span style={{ fontSize: "0.65rem", fontWeight: 800, background: "#eff6ff", color: "#2563eb", padding: "2px 6px", borderRadius: "6px", border: "1px solid #bfdbfe" }}>
                                ⚡ 7-Day AI/ML Track
                              </span>
                            )}
                            {s.includesLOR && (
                              <span style={{ fontSize: "0.65rem", fontWeight: 800, background: "#f0fdf4", color: "#16a34a", padding: "2px 6px", borderRadius: "6px", border: "1px solid #bbf7d0" }}>
                                📜 LOR Included
                              </span>
                            )}
                          </div>
                          
                          {/* Admin Quick Links */}
                          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                            <a 
                              href={`/verify?id=${s.id}`} 
                              target="_blank" 
                              style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#2563eb", textDecoration: "none", fontWeight: 700, background: "#eff6ff", padding: "2px 8px", borderRadius: "6px" }}
                            >
                              <Eye size={12} /> View Profile
                            </a>
                            {s.certificateURL && (
                              <a 
                                href={s.certificateURL} 
                                target="_blank" 
                                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#16a34a", textDecoration: "none", fontWeight: 700, background: "#f0fdf4", padding: "2px 8px", borderRadius: "6px" }}
                              >
                                <ExternalLink size={12} /> View PDF
                              </a>
                            )}
                            {s.progress >= 100 && !s.certificateId && (
                              <button 
                                onClick={() => handleApprove(s.id)}
                                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "#fff", border: "none", fontWeight: 700, background: "#2563eb", padding: "2px 8px", borderRadius: "6px", cursor: "pointer" }}
                              >
                                <Award size={12} /> Grant Cert
                              </button>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: "1.25rem" }}>
                          {s.razorpay_payment_id ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <span style={{ fontSize: "0.7rem", color: "#2563eb", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}>💳 Razorpay Checkout</span>
                              <code style={{ background: "#eff6ff", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, color: "#1d4ed8", border: "1px solid #dbeafe" }}>{s.razorpay_payment_id}</code>
                              <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{s.paymentSubmittedAt ? new Date(s.paymentSubmittedAt).toLocaleDateString() : ""}</span>
                            </div>
                          ) : s.utr ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <span style={{ fontSize: "0.7rem", color: "#ca8a04", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}>🏦 Offline UTR</span>
                              <code style={{ background: "#fefce8", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, color: "#a16207", border: "1px solid #fef08a" }}>{s.utr}</code>
                              <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{s.paymentSubmittedAt ? new Date(s.paymentSubmittedAt).toLocaleDateString() : ""}</span>
                            </div>
                          ) : (
                             <span style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>No payment recorded</span>
                          )}
                        </td>
                        <td style={{ padding: "1.25rem" }}>
                          <div style={{ width: "120px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                               <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b" }}>Progress</span>
                               <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{Math.round(s.progress || 0)}%</span>
                            </div>
                            <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                               <div style={{ width: `${Math.round(s.progress || 0)}%`, height: "100%", background: (s.progress >= 100) ? "#16a34a" : "#2563eb", borderRadius: "10px" }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "1.25rem", textAlign: "right" }}>
                           <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                              {s.paymentStatus === "pending" && (
                                <button 
                                  onClick={() => handleApprove(s.id)}
                                  disabled={!!actionLoading}
                                  style={{ padding: "0.5rem 1rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
                                >
                                  {actionLoading === s.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Approve
                                </button>
                              )}
                              
                              {s.paymentStatus === "approved" && (
                                <button 
                                  onClick={() => handleRevoke(s.id)}
                                  disabled={!!actionLoading}
                                  title="Revoke Approval"
                                  style={{ padding: "0.5rem", background: "#fef2f2", color: "#ef4444", border: "1px solid #fee2e2", borderRadius: "8px", cursor: "pointer" }}
                                >
                                  <UserMinus size={16} />
                                </button>
                              )}

                              <button 
                                onClick={() => handleDelete(s.id)}
                                disabled={!!actionLoading}
                                title="Delete Student Forever"
                                style={{ padding: "0.5rem", background: "#fff", color: "#94a3b8", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer" }}
                              >
                                <Trash2 size={16} />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Quick Edit Modal */}
      {editingStudent && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "#fff",
            width: "100%",
            maxWidth: "480px",
            borderRadius: "24px",
            padding: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1e293b", marginBottom: "1.5rem" }}>Edit Student Profile</h2>
            <form onSubmit={handleUpdateStudent}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#64748b", marginBottom: "0.5rem" }}>Full Name</label>
                <input 
                  type="text" 
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#64748b", marginBottom: "0.5rem" }}>College / Institution</label>
                <input 
                  type="text" 
                  value={editingStudent.college}
                  onChange={(e) => setEditingStudent({ ...editingStudent, college: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#64748b", marginBottom: "0.5rem" }}>Course Name</label>
                <input 
                  type="text" 
                  value={editingStudent.course}
                  onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  type="button" 
                  onClick={() => setEditingStudent(null)}
                  style={{ flex: 1, padding: "0.75rem", borderRadius: "10px", border: "1px solid #e2e8f0", background: "none", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={actionLoading === editingStudent.id}
                  style={{ flex: 1, padding: "0.75rem", borderRadius: "10px", border: "none", background: "#2563eb", color: "#fff", fontWeight: 700, cursor: "pointer" }}
                >
                  {actionLoading === editingStudent.id ? <Loader2 className="animate-spin" size={18} /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Engine Modal */}
      {isBroadcastModalOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(8px)",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem"
        }}>
          <div style={{
            background: "#fff",
            width: "100%",
            maxWidth: "720px",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: "32px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Modal Header */}
            <div style={{ padding: "2rem 2.5rem 1rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.05em" }}>Communication Hub</span>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1e293b", letterSpacing: "-0.03em", marginTop: "2px" }}>Broadcast Engine</h2>
              </div>
              <button 
                onClick={() => setIsBroadcastModalOpen(false)}
                style={{ background: "#f1f5f9", border: "none", color: "#64748b", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Info Notification */}
              <div style={{ display: "flex", gap: "0.75rem", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "1rem 1.25rem", borderRadius: "16px", alignItems: "flex-start" }}>
                <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "0.85rem", color: "#1e3a8a", lineHeight: 1.5 }}>
                  <strong>Namecheap Email Linkage Active:</strong> This broadcast sends via your Namecheap authenticated account <strong>team@futureee.me</strong>. Composed messages can be launched directly in your native mail program or copied to Namecheap webmail.
                </div>
              </div>

              {/* Dynamic URL Limitation Warning / Smart Assistant */}
              {(((getBroadcastEmails().join(",").length) + broadcastSubject.length + broadcastBody.length > 1800) && (getBroadcastEmails().length <= 45)) && (
                <div style={{ display: "flex", gap: "0.75rem", background: "#fffbeb", border: "1px solid #fef3c7", padding: "1.25rem", borderRadius: "16px", alignItems: "flex-start" }}>
                  <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.85rem", color: "#92400e", lineHeight: 1.6 }}>
                    <strong style={{ color: "#78350f" }}>⚠️ Recipient List Exceeds Browser URL Limit:</strong> You have selected {getBroadcastEmails().length} student(s) which exceeds Google Chrome's 2,000-character standard link capacity.
                    <div style={{ marginTop: "0.5rem", fontWeight: 700, color: "#78350f" }}>
                      No problem! We've prepared a Secure 3-Step Quick Send:
                    </div>
                    <ol style={{ margin: "0.25rem 0 0 1.25rem", padding: 0 }}>
                      <li>Click the blue <strong>Send via Mail App</strong> button below (we will automatically copy all {getBroadcastEmails().length} emails to your clipboard).</li>
                      <li>A blank Namecheap PrivateEmail Compose tab will open.</li>
                      <li>Click the <strong>BCC</strong> field inside PrivateEmail, press <strong>Ctrl+V</strong> (Paste), then copy/paste your Subject & Body!</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Mail Server 50-Recipient Limit Warning */}
              {(getBroadcastEmails().length > 45) && (
                <div style={{ display: "flex", gap: "0.75rem", background: "#fef2f2", border: "1px solid #fecaca", padding: "1.25rem", borderRadius: "16px", alignItems: "flex-start" }}>
                  <AlertTriangle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div style={{ fontSize: "0.85rem", color: "#991b1b", lineHeight: 1.6 }}>
                    <strong style={{ color: "#7f1d1d" }}>⚠️ Mail Server 50-Recipient Limit Block:</strong> You have selected {getBroadcastEmails().length} students. Namecheap's PrivateEmail server enforces a strict maximum limit of 50 recipients per single email to prevent spam.
                    <div style={{ marginTop: "0.5rem", fontWeight: 700, color: "#7f1d1d" }}>
                      No problem! We've automatically split your list into {Math.ceil(getBroadcastEmails().length / 45)} secure batches of 45 recipients.
                    </div>
                    <div style={{ marginTop: "0.25rem" }}>
                      Please trigger each batch individually below. Each button will copy that batch's emails to your clipboard and open the PrivateEmail composer!
                    </div>
                  </div>
                </div>
              )}

              {/* 1. Target Audience */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#475569", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  1. Target Audience
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem" }}>
                  <button 
                    type="button"
                    onClick={() => setBroadcastTarget("all")}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: broadcastTarget === "all" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                      background: broadcastTarget === "all" ? "#eff6ff" : "#fff",
                      color: broadcastTarget === "all" ? "#2563eb" : "#475569",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    All Students ({allStudents.length})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBroadcastTarget("7_day")}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: broadcastTarget === "7_day" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                      background: broadcastTarget === "7_day" ? "#eff6ff" : "#fff",
                      color: broadcastTarget === "7_day" ? "#2563eb" : "#475569",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    ⚡ 7-Day Only ({sevenDayCount})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBroadcastTarget("1_month")}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: broadcastTarget === "1_month" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                      background: broadcastTarget === "1_month" ? "#eff6ff" : "#fff",
                      color: broadcastTarget === "1_month" ? "#2563eb" : "#475569",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    ☀️ 1-Month Only ({oneMonthCount})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBroadcastTarget("pending")}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: broadcastTarget === "pending" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                      background: broadcastTarget === "pending" ? "#eff6ff" : "#fff",
                      color: broadcastTarget === "pending" ? "#2563eb" : "#475569",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    Pending Only ({allStudents.filter(s => s.paymentStatus === "pending").length})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBroadcastTarget("approved")}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: broadcastTarget === "approved" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                      background: broadcastTarget === "approved" ? "#eff6ff" : "#fff",
                      color: broadcastTarget === "approved" ? "#2563eb" : "#475569",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    Approved Only ({allStudents.filter(s => s.paymentStatus === "approved").length})
                  </button>
                  <button 
                    type="button"
                    onClick={() => setBroadcastTarget("selected")}
                    disabled={selectedStudents.length === 0}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: broadcastTarget === "selected" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                      background: broadcastTarget === "selected" ? "#eff6ff" : "#fff",
                      color: broadcastTarget === "selected" ? "#2563eb" : "#475569",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      opacity: selectedStudents.length === 0 ? 0.5 : 1,
                      textAlign: "center"
                    }}
                  >
                    Selected ({selectedStudents.length})
                  </button>
                </div>
              </div>

              {/* 2. Choose Quick Template */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#475569", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  2. Apply Quick Template
                </label>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button 
                    type="button"
                    onClick={() => handleApplyTemplate("welcome")}
                    style={{ padding: "0.5rem 1rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700, color: "#475569", cursor: "pointer" }}
                  >
                    ✨ Welcome & Access
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyTemplate("summer_start")}
                    style={{ padding: "0.5rem 1rem", background: "#fdf8e2", border: "1px solid #fde68a", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700, color: "#b45309", cursor: "pointer" }}
                  >
                    ☀️ Summer Start (Pre-Paid)
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyTemplate("lor_upgrade")}
                    style={{ padding: "0.5rem 1rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700, color: "#15803d", cursor: "pointer" }}
                  >
                    📜 LOR Option Upgrade
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyTemplate("june21_notice")}
                    style={{ padding: "0.5rem 1rem", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700, color: "#1d4ed8", cursor: "pointer" }}
                  >
                    📅 June 21 Cohort Timeline
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyTemplate("support_guidance")}
                    style={{ padding: "0.5rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700, color: "#dc2626", cursor: "pointer" }}
                  >
                    🛠️ Help & Support Desk
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyTemplate("approval")}
                    style={{ padding: "0.5rem 1rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700, color: "#475569", cursor: "pointer" }}
                  >
                    ⏳ Pending Review
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApplyTemplate("progress")}
                    style={{ padding: "0.5rem 1rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700, color: "#475569", cursor: "pointer" }}
                  >
                    📈 Tasks Progression
                  </button>
                </div>
              </div>

              {/* 3. Compose Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem" }}>
                    <span>Subject Line</span>
                    {broadcastSubject && (
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(broadcastSubject, "subject")}
                        style={{ border: "none", background: "none", color: "#2563eb", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        <Copy size={12} /> {copiedField === "subject" ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter email subject line" 
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid #e2e8f0", outline: "none", fontSize: "0.9rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem" }}>
                    <span>Email Content</span>
                    {broadcastBody && (
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(broadcastBody, "body")}
                        style={{ border: "none", background: "none", color: "#2563eb", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        <Copy size={12} /> {copiedField === "body" ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </label>
                  <textarea 
                    rows={8}
                    placeholder="Write the body of your announcement here..." 
                    value={broadcastBody}
                    onChange={(e) => setBroadcastBody(e.target.value)}
                    style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0", outline: "none", fontSize: "0.9rem", lineHeight: 1.5, fontFamily: "inherit" }}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div style={{ padding: "1.5rem 2.5rem 2rem", borderTop: "1px solid #f1f5f9", background: "#f8fafc", borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                
                {/* BCC Recipient Status */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Users size={16} color="#64748b" />
                  <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                    Recipients Selected: <strong style={{ color: "#1e293b" }}>{getBroadcastEmails().length}</strong> students
                  </span>
                </div>

                {getBroadcastEmails().length <= 45 && (
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(getBroadcastEmails().join(", "), "emails")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.6rem 1rem",
                      background: copiedField === "emails" ? "#f0fdf4" : "#fff",
                      color: copiedField === "emails" ? "#16a34a" : "#475569",
                      border: "1px solid",
                      borderColor: copiedField === "emails" ? "#bbf7d0" : "#e2e8f0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                    }}
                  >
                    {copiedField === "emails" ? <Check size={14} /> : <Copy size={14} />}
                    {copiedField === "emails" ? "Emails Copied!" : "Copy Recipient BCC List"}
                  </button>
                )}
              </div>

              {/* Action / Batch Buttons */}
              {getBroadcastEmails().length > 45 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", marginTop: "0.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Trigger Batched Sends ({Math.ceil(getBroadcastEmails().length / 45)} Batches of max 45)
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
                    {Array.from({ length: Math.ceil(getBroadcastEmails().length / 45) }).map((_, batchIdx) => {
                      const start = batchIdx * 45;
                      const end = Math.min((batchIdx + 1) * 45, getBroadcastEmails().length);
                      const batchEmails = getBroadcastEmails().slice(start, end);
                      const isCompleted = completedBatches.includes(batchIdx);
                      const isFieldCopied = copiedField === `batch-${batchIdx}`;
                      
                      return (
                        <button
                          key={batchIdx}
                          type="button"
                          onClick={() => {
                            const batchBccList = batchEmails.join(",");
                            navigator.clipboard.writeText(batchBccList);
                            setCopiedField(`batch-${batchIdx}`);
                            setTimeout(() => setCopiedField(null), 3000);
                            
                            if (!completedBatches.includes(batchIdx)) {
                              setCompletedBatches(prev => [...prev, batchIdx]);
                            }
                            
                            alert(`Batch ${batchIdx + 1} (${batchEmails.length} recipients) copied to clipboard!\n\nWe will now open Namecheap PrivateEmail composer.\nSimply press Ctrl+V inside the BCC field, copy your Subject/Body, and send!`);
                            window.open("https://privateemail.com/appsuite/#app=io.ox/mail&action=compose", "_blank");
                          }}
                          disabled={!broadcastSubject || !broadcastBody}
                          style={{
                            padding: "0.85rem",
                            borderRadius: "12px",
                            border: isCompleted ? "1px solid #bbf7d0" : "1px solid #2563eb",
                            background: isCompleted 
                              ? "#f0fdf4" 
                              : (!broadcastSubject || !broadcastBody) ? "#cbd5e1" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                            color: isCompleted 
                              ? "#16a34a" 
                              : "#fff",
                            fontWeight: 800,
                            cursor: (!broadcastSubject || !broadcastBody) ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                            boxShadow: isCompleted ? "none" : "0 4px 12px rgba(37, 99, 235, 0.15)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {isCompleted ? <Check size={16} /> : <Send size={14} />}
                            <span>Batch {batchIdx + 1} ({batchEmails.length} students)</span>
                          </div>
                          {isFieldCopied ? (
                            <span style={{ fontSize: "0.7rem", background: "#dcfce7", color: "#16a34a", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>Copied!</span>
                          ) : isCompleted ? (
                            <span style={{ fontSize: "0.7rem", background: "#dcfce7", color: "#16a34a", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>Sent ✓</span>
                          ) : (
                            <span style={{ fontSize: "0.7rem", background: "rgba(255, 255, 255, 0.2)", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>Start</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => setIsBroadcastModalOpen(false)}
                    style={{ padding: "0.85rem", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#fff", fontWeight: 700, color: "#64748b", cursor: "pointer", fontSize: "0.9rem", marginTop: "0.5rem" }}
                  >
                    Close Communication Hub
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", width: "100%" }}>
                  <button 
                    type="button" 
                    onClick={() => setIsBroadcastModalOpen(false)}
                    style={{ flex: 1, padding: "0.85rem", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#fff", fontWeight: 700, color: "#64748b", cursor: "pointer", fontSize: "0.9rem" }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={handleLaunchMailApp}
                    disabled={!broadcastSubject || !broadcastBody || getBroadcastEmails().length === 0}
                    style={{
                      flex: 2,
                      padding: "0.85rem",
                      borderRadius: "12px",
                      border: "none",
                      background: (!broadcastSubject || !broadcastBody || getBroadcastEmails().length === 0) 
                        ? "#cbd5e1" 
                        : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      color: "#fff",
                      fontWeight: 800,
                      cursor: (!broadcastSubject || !broadcastBody || getBroadcastEmails().length === 0) ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
                    }}
                  >
                    <Send size={16} /> Send via Mail App (team@futureee.me)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Sub-components for cleaner structure
function StatCard({ title, value, icon, trend, color = "#fff" }: any) {
  return (
    <div style={{ background: color, padding: "1.5rem", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "1px solid #f1f5f9" }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#1e293b", marginBottom: "0.25rem" }}>{value}</div>
      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b" }}>{title}</div>
      <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #f1f5f9" }}>{trend}</div>
    </div>
  );
}

function TabButton({ active, onClick, label, count }: any) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: "0.6rem 1.25rem",
        borderRadius: "9px",
        border: "none",
        background: active ? "#2563eb" : "transparent",
        color: active ? "#fff" : "#64748b",
        fontWeight: 700,
        fontSize: "0.85rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "all 0.2s"
      }}
    >
      {label} {count !== undefined && count > 0 && <span style={{ background: active ? "rgba(255,255,255,0.2)" : "#fee2e2", color: active ? "#fff" : "#ef4444", padding: "1px 6px", borderRadius: "6px", fontSize: "0.7rem" }}>{count}</span>}
    </button>
  );
}
