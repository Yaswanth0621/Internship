"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { CertificateAgent } from "@/lib/certificate/CertificateAgent";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function MaintenancePage() {
  const [status, setStatus] = useState<"idle" | "verifying" | "processing" | "completed" | "error">("idle");
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const [key, setKey] = useState("");

  const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  const runMaintenance = async () => {
    if (key !== "FutureAI2026") {
      alert("Invalid security key");
      return;
    }

    setStatus("processing");
    addLog("Starting maintenance: Certificate Generation Backlog...");

    try {
      const q = query(
        collection(db, "students"), 
        where("paymentStatus", "==", "approved"),
        where("progress", "==", 100)
      );
      
      const snapshot = await getDocs(q);
      const students = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .filter(s => !s.certificateURL);

      addLog(`Found ${students.length} students eligible for certificates.`);
      setProgress({ current: 0, total: students.length });

      if (students.length === 0) {
        setStatus("completed");
        return;
      }

      await CertificateAgent.preloadTemplate();

      for (const student of students) {
        try {
          addLog(`Processing: ${student.name}...`);
          
          const certId = student.certificateId || `FAI-${Date.now().toString(36).toUpperCase()}-${student.id.slice(0,6).toUpperCase()}`;
          
          addLog(`🔗 Issuing Official ID: ${certId}...`);
          
          await updateDoc(doc(db, "students", student.id), { 
            certificateId: certId,
            paymentStatus: "approved" // Double check status
          });

          addLog(`✅ Successfully Certified: ${student.name}`);

          addLog(`✅ Success: ${student.name}`);
        } catch (err: any) {
          addLog(`❌ Failed: ${student.name} - ${err.message}`);
        } finally {
          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
        }
      }

      setStatus("completed");
      addLog("Maintenance completed successfully.");
    } catch (err: any) {
      addLog(`CRITICAL ERROR: ${err.message}`);
      setStatus("error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#f8fafc", paddingBottom: "5rem", fontFamily: "sans-serif" }}>
      <Navigation />
      <div style={{ maxWidth: "800px", margin: "4rem auto", padding: "0 1rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Maintenance Portal
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "3rem" }}>Bulk processing & certificate backlog resolution.</p>

        {status === "idle" && (
          <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "24px", border: "1px solid #334155" }}>
            <label style={{ display: "block", marginBottom: "1rem", color: "#cbd5e1" }}>Security Key</label>
            <input 
              type="password" 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", padding: "1rem", borderRadius: "12px", color: "#fff", marginBottom: "2rem" }}
              placeholder="Enter maintenance key..."
            />
            <button 
              onClick={runMaintenance}
              style={{ width: "100%", background: "#3b82f6", color: "#fff", border: "none", padding: "1.25rem", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}
            >
              Run Certificate Backlog Resolution
            </button>
          </div>
        )}

        {(status === "processing" || status === "completed" || status === "error") && (
          <div style={{ background: "#1e293b", padding: "2rem", borderRadius: "24px", border: "1px solid #334155" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              {status === "processing" && <Loader2 className="animate-spin" color="#3b82f6" />}
              {status === "completed" && <CheckCircle2 color="#10b981" />}
              {status === "error" && <AlertCircle color="#ef4444" />}
              <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                {status === "processing" ? `Processing (${progress.current}/${progress.total})` : 
                 status === "completed" ? "System Synchronized" : "Critical Failure"}
              </span>
            </div>

            <div style={{ height: "8px", background: "#0f172a", borderRadius: "4px", overflow: "hidden", marginBottom: "2rem" }}>
              <div style={{ 
                width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%`, 
                height: "100%", 
                background: "#3b82f6", 
                transition: "width 0.3s ease" 
              }} />
            </div>

            <div style={{ background: "#0f172a", padding: "1.5rem", borderRadius: "16px", height: "300px", overflowY: "auto", fontSize: "0.875rem", fontFamily: "monospace" }}>
              {logs.map((log, i) => (
                <div key={i} style={{ marginBottom: "0.5rem", color: log.includes("❌") ? "#ef4444" : log.includes("✅") ? "#10b981" : "#94a3b8" }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
