"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";
import { generateProjectKit, ProjectKitDeliverables } from "@/lib/project-kits-data";
import { generateAndDownloadProjectZip } from "@/lib/zip-generator";
import {
  X,
  Download,
  BookOpen,
  FileCode,
  GraduationCap,
  Database,
  Terminal,
  Award,
  Check,
  Copy,
  FolderTree,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Loader2,
} from "lucide-react";

interface Props {
  project: Project;
  onClose: () => void;
}

type TabType = "workspace" | "report" | "viva" | "architecture" | "database" | "setup" | "career";

export default function ProjectKitModal({ project, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("workspace");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [openVivaId, setOpenVivaId] = useState<number | null>(1);

  const kit: ProjectKitDeliverables = generateProjectKit(project);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      await generateAndDownloadProjectZip(project);
    } catch (err: any) {
      alert("Error building download zip: " + (err?.message || "Please try again"));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "1150px",
          height: "90vh",
          maxHeight: "850px",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "1.25rem 1.75rem",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #faf5ff 0%, #ffffff 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#7c3aed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
              }}
            >
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "20px",
                    backgroundColor: "#ede9fe",
                    color: "#6d28d9",
                  }}
                >
                  Verified Student Workspace
                </span>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>•</span>
                <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <ShieldCheck size={14} /> 100% Deliverables Ready
                </span>
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.2rem" }}>
                {project.title}
              </h2>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "0.9rem",
                border: "none",
                cursor: isDownloading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              {isDownloading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Packaging ZIP...
                </>
              ) : (
                <>
                  <Download size={16} /> Download Full Kit (.ZIP)
                </>
              )}
            </button>
            <button
              onClick={onClose}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            padding: "0.5rem 1.75rem",
            borderBottom: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            overflowX: "auto",
          }}
        >
          {[
            { id: "workspace", label: "Project Kit Bundle", icon: FolderTree },
            { id: "report", label: "Academic IEEE Report", icon: BookOpen },
            { id: "viva", label: "Top 25 Viva Voce", icon: GraduationCap },
            { id: "architecture", label: "Architecture & Diagrams", icon: Layers },
            { id: "database", label: "Database & API Schema", icon: Database },
            { id: "setup", label: "Terminal Setup & Run", icon: Terminal },
            { id: "career", label: "Resume & LinkedIn", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 0.9rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? "700" : "500",
                  color: isActive ? "#7c3aed" : "#64748b",
                  backgroundColor: isActive ? "#ede9fe" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.75rem", backgroundColor: "#ffffff" }}>
          {/* TAB 1: WORKSPACE & BUNDLE OVERVIEW */}
          {activeTab === "workspace" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                style={{
                  padding: "1.25rem",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  border: "1px solid #bbf7d0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#166534", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Sparkles size={18} /> All 13 Promised Deliverables Ready For Immediate Download
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#15803d", marginTop: "0.25rem" }}>
                    Everything you need for full university submission, faculty reviews (Review 1, 2, 3 & Final), and placement showcase.
                  </p>
                </div>
                <button
                  onClick={handleDownloadZip}
                  disabled={isDownloading}
                  style={{
                    padding: "0.6rem 1.25rem",
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 10px rgba(22, 163, 74, 0.25)",
                  }}
                >
                  <Download size={15} /> Download ZIP Archive
                </button>
              </div>

              <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#0f172a" }}>
                Included In This Package ({kit.starterSourceFiles.length + 10} Files & Deliverables):
              </h4>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    title: "1. Complete Source Code",
                    desc: "Next.js / React UI, REST APIs, and core algorithms",
                    icon: FileCode,
                    tag: "Source Code",
                  },
                  {
                    title: "2. IEEE Academic Report",
                    desc: "Full synopsis, literature survey, and methodology",
                    icon: BookOpen,
                    tag: "Documentation",
                  },
                  {
                    title: "3. SRS Document (IEEE 830)",
                    desc: "Complete functional & non-functional specifications",
                    icon: FileCode,
                    tag: "Engineering",
                  },
                  {
                    title: "4. Architecture & UML/DFD",
                    desc: "Component flow, sequence diagram, and DFD Level 0",
                    icon: Layers,
                    tag: "Diagrams",
                  },
                  {
                    title: "5. Top 25 Viva Voce Q&A",
                    desc: "Categorized questions with examiner scoring tips",
                    icon: GraduationCap,
                    tag: "Interview",
                  },
                  {
                    title: "6. 30-Slide PPT Presentation",
                    desc: "Slide-by-slide deck outline with speaker notes",
                    icon: BookOpen,
                    tag: "Slides",
                  },
                  {
                    title: "7. Database Schema & Seeds",
                    desc: "SQL DDL tables, relational indexes, and seed JSON",
                    icon: Database,
                    tag: "Database",
                  },
                  {
                    title: "8. API Specification",
                    desc: "REST endpoints, request payloads, and status codes",
                    icon: Terminal,
                    tag: "Backend",
                  },
                  {
                    title: "9. Installation & Deployment",
                    desc: "Local run commands, environment config & Dockerfile",
                    icon: Terminal,
                    tag: "DevOps",
                  },
                  {
                    title: "10. Resume & LinkedIn Kit",
                    desc: "ATS bullet points and professional portfolio writeup",
                    icon: Award,
                    tag: "Career",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: "1rem",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                        display: "flex",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          backgroundColor: "#ede9fe",
                          color: "#7c3aed",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>
                            {item.title}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.2rem" }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Codebase Tree preview */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div
                  style={{
                    backgroundColor: "#0f172a",
                    padding: "0.75rem 1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", fontFamily: "monospace" }}>
                    Package Root: {project.slug}-complete-kit/
                  </span>
                  <button
                    onClick={() => copyToClipboard(kit.codeWalkthrough, "tree")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#cbd5e1",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    {copiedKey === "tree" ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    {copiedKey === "tree" ? "Copied" : "Copy Tree"}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: "#020617",
                    color: "#e2e8f0",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.8rem",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    fontFamily: "monospace",
                  }}
                >
                  {kit.codeWalkthrough}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC IEEE REPORT */}
          {activeTab === "report" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>
                    IEEE Standard Academic Report & Synopsis
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Ready for College Submission, Synopsis Signoff, and Project Review 1
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${kit.abstract}\n\n${kit.problemStatement}\n\n${kit.srsDocument}`,
                      "full_report"
                    )
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 0.9rem",
                    backgroundColor: "#ede9fe",
                    color: "#7c3aed",
                    border: "1px solid #ddd6fe",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {copiedKey === "full_report" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedKey === "full_report" ? "Report Copied!" : "Copy Full Report"}
                </button>
              </div>

              {/* Synopsis & Abstract */}
              <div style={{ backgroundColor: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#7c3aed", marginBottom: "0.5rem" }}>
                  1. Project Abstract
                </h4>
                <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: "1.7", whiteSpace: "pre-line" }}>
                  {kit.abstract}
                </p>
              </div>

              {/* Problem Statement */}
              <div style={{ backgroundColor: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#7c3aed", marginBottom: "0.5rem" }}>
                  2. Problem Statement & Motivation
                </h4>
                <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: "1.7", whiteSpace: "pre-line" }}>
                  {kit.problemStatement}
                </p>
              </div>

              {/* Literature Survey Matrix */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#f1f5f9", padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>
                    3. Literature Survey & Comparative Study Matrix
                  </h4>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                      <th style={{ padding: "0.75rem 1rem", color: "#475569" }}>Paper Title & Authors</th>
                      <th style={{ padding: "0.75rem 1rem", color: "#475569" }}>Methodology</th>
                      <th style={{ padding: "0.75rem 1rem", color: "#475569" }}>Research Limitations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kit.literatureSurvey.map((lit, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.75rem 1rem", fontWeight: "600", color: "#0f172a" }}>
                          {lit.title} <span style={{ color: "#64748b", fontWeight: "400" }}>({lit.year})</span>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{lit.authors}</div>
                        </td>
                        <td style={{ padding: "0.75rem 1rem", color: "#334155" }}>{lit.methodology}</td>
                        <td style={{ padding: "0.75rem 1rem", color: "#b91c1c" }}>{lit.limitations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SRS Excerpt */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#0f172a", padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", fontFamily: "monospace" }}>
                    IEEE Std 830-1998 Software Requirements Specification
                  </span>
                  <button
                    onClick={() => copyToClipboard(kit.srsDocument, "srs")}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#cbd5e1",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    {copiedKey === "srs" ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    {copiedKey === "srs" ? "Copied" : "Copy SRS"}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: "#020617",
                    color: "#e2e8f0",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.8rem",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    fontFamily: "monospace",
                    maxHeight: "350px",
                  }}
                >
                  {kit.srsDocument}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: TOP 25 VIVA VOCE TRAINER */}
          {activeTab === "viva" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>
                    Interactive Viva Voce Defense Trainer
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Master every question examiners typically ask with model answers and insider scoring tips
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      kit.vivaQuestions.map((q) => `Q: ${q.question}\nA: ${q.answer}\nTip: ${q.examinerTip}\n`).join("\n"),
                      "all_viva"
                    )
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 0.9rem",
                    backgroundColor: "#ede9fe",
                    color: "#7c3aed",
                    border: "1px solid #ddd6fe",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {copiedKey === "all_viva" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedKey === "all_viva" ? "Copied All Q&A" : "Copy All Q&A"}
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {kit.vivaQuestions.map((q) => {
                  const isOpen = openVivaId === q.id;
                  return (
                    <div
                      key={q.id}
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: isOpen ? "#fdfcff" : "#ffffff",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <button
                        onClick={() => setOpenVivaId(isOpen ? null : q.id)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "1rem 1.25rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: "700",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "20px",
                              backgroundColor: "#f1f5f9",
                              color: "#475569",
                            }}
                          >
                            {q.category}
                          </span>
                          <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>
                            Q{q.id}. {q.question}
                          </span>
                        </div>
                        {isOpen ? <ChevronDown size={18} color="#64748b" /> : <ChevronRight size={18} color="#64748b" />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: "0 1.25rem 1.25rem 1.25rem", borderTop: "1px solid #f1f5f9" }}>
                          <div style={{ marginTop: "0.75rem" }}>
                            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#16a34a" }}>
                              Model Answer (Speak this with confidence):
                            </span>
                            <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: "1.7", marginTop: "0.25rem" }}>
                              {q.answer}
                            </p>
                          </div>

                          <div
                            style={{
                              marginTop: "0.75rem",
                              padding: "0.75rem 1rem",
                              borderRadius: "8px",
                              backgroundColor: "#fffbeb",
                              border: "1px solid #fef3c7",
                            }}
                          >
                            <span style={{ fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#d97706" }}>
                              💡 Examiner Evaluation Tip:
                            </span>
                            <p style={{ fontSize: "0.85rem", color: "#92400e", marginTop: "0.2rem" }}>
                              {q.examinerTip}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ARCHITECTURE & DIAGRAMS */}
          {activeTab === "architecture" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>
                  System Architecture & Data Flow (DFD / UML)
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Detailed structural blueprints ready for copy-pasting into Mermaid.js, draw.io, or your final thesis.
                </p>
              </div>

              {/* Component Architecture */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#0f172a", padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", fontFamily: "monospace" }}>
                    1. High-Level Component Architecture (Mermaid Graph)
                  </span>
                  <button
                    onClick={() => copyToClipboard(kit.architectureDiagrams.systemArchitecture, "arch_code")}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#cbd5e1",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    {copiedKey === "arch_code" ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    {copiedKey === "arch_code" ? "Copied" : "Copy Mermaid"}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: "#020617",
                    color: "#38bdf8",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.8rem",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    fontFamily: "monospace",
                  }}
                >
                  {kit.architectureDiagrams.systemArchitecture}
                </pre>
              </div>

              {/* DFD Level 0 */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#0f172a", padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", fontFamily: "monospace" }}>
                    2. Data Flow Diagram (DFD Level 0)
                  </span>
                  <button
                    onClick={() => copyToClipboard(kit.architectureDiagrams.dfdLevel0, "dfd_code")}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#cbd5e1",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    {copiedKey === "dfd_code" ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    {copiedKey === "dfd_code" ? "Copied" : "Copy Mermaid"}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: "#020617",
                    color: "#38bdf8",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.8rem",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    fontFamily: "monospace",
                  }}
                >
                  {kit.architectureDiagrams.dfdLevel0}
                </pre>
              </div>

              {/* Sequence Diagram */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#0f172a", padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", fontFamily: "monospace" }}>
                    3. Sequence Interaction Diagram
                  </span>
                  <button
                    onClick={() => copyToClipboard(kit.architectureDiagrams.sequenceDiagram, "seq_code")}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#cbd5e1",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    {copiedKey === "seq_code" ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    {copiedKey === "seq_code" ? "Copied" : "Copy Mermaid"}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: "#020617",
                    color: "#38bdf8",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.8rem",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    fontFamily: "monospace",
                  }}
                >
                  {kit.architectureDiagrams.sequenceDiagram}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: DATABASE & API SCHEMA */}
          {activeTab === "database" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>
                    Database DDL & API Route Specification
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Complete relational SQL schema with indexing and OpenAPI specification
                  </p>
                </div>
              </div>

              {/* SQL Schema */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#0f172a", padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", fontFamily: "monospace" }}>
                    database/schema.sql (PostgreSQL / Supabase / MySQL)
                  </span>
                  <button
                    onClick={() => copyToClipboard(kit.databaseSchema.sqlScript, "sql")}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#cbd5e1",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    {copiedKey === "sql" ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    {copiedKey === "sql" ? "Copied" : "Copy SQL"}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: "#020617",
                    color: "#f59e0b",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.8rem",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    fontFamily: "monospace",
                    maxHeight: "300px",
                  }}
                >
                  {kit.databaseSchema.sqlScript}
                </pre>
              </div>

              {/* API Endpoints */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>
                  API Route Endpoints:
                </h4>
                {kit.apiDocs.map((api, idx) => (
                  <div key={idx} style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1rem", backgroundColor: "#f8fafc" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "800",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "6px",
                          backgroundColor: api.method === "GET" ? "#dcfce7" : "#ede9fe",
                          color: api.method === "GET" ? "#15803d" : "#6d28d9",
                        }}
                      >
                        {api.method}
                      </span>
                      <code style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>{api.endpoint}</code>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.4rem" }}>{api.summary}</p>
                    <div style={{ marginTop: "0.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Request</div>
                        <pre style={{ backgroundColor: "#020617", color: "#cbd5e1", padding: "0.5rem", borderRadius: "6px", fontSize: "0.7rem", margin: "0.2rem 0 0 0" }}>
                          {api.requestBody}
                        </pre>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Response</div>
                        <pre style={{ backgroundColor: "#020617", color: "#cbd5e1", padding: "0.5rem", borderRadius: "6px", fontSize: "0.7rem", margin: "0.2rem 0 0 0" }}>
                          {api.responseBody}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TERMINAL SETUP & RUN */}
          {activeTab === "setup" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>
                    Terminal Setup & Execution Guide
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Copy-pasteable commands to get the application running on your laptop in under 2 minutes
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(kit.installationGuide, "guide")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 0.9rem",
                    backgroundColor: "#ede9fe",
                    color: "#7c3aed",
                    border: "1px solid #ddd6fe",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {copiedKey === "guide" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedKey === "guide" ? "Copied Guide" : "Copy Guide"}
                </button>
              </div>

              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#0f172a", padding: "0.75rem 1rem" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", fontFamily: "monospace" }}>
                    Quickstart Commands (Bash / PowerShell)
                  </span>
                </div>
                <pre
                  style={{
                    backgroundColor: "#020617",
                    color: "#4ade80",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.85rem",
                    lineHeight: "1.7",
                    overflowX: "auto",
                    fontFamily: "monospace",
                  }}
                >
{`# 1. Extract Project Kit
unzip ${project.slug}-complete-kit.zip
cd ${project.slug}

# 2. Install Dependencies
npm install

# 3. Setup Environment Variables
cp .env.example .env.local

# 4. Start Local Development Server
npm run dev

# 5. Open In Browser
http://localhost:3000`}
                </pre>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                  Detailed Installation Notes:
                </h4>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "0.8rem",
                    color: "#475569",
                    lineHeight: "1.6",
                    fontFamily: "inherit",
                    margin: 0,
                  }}
                >
                  {kit.installationGuide}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 7: RESUME & LINKEDIN */}
          {activeTab === "career" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>
                  Career & Placement Assets (ATS Resume & LinkedIn)
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Turn this capstone project into recruiter-ready interview talking points and high-visibility LinkedIn posts
                </p>
              </div>

              {/* Resume bullets */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.25rem", backgroundColor: "#f8fafc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>
                    ATS Resume Bullet Points (Copy into your CV Projects section)
                  </h4>
                  <button
                    onClick={() => copyToClipboard(kit.resumeBullets.map((b) => `• ${b}`).join("\n"), "resume")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      color: "#334155",
                    }}
                  >
                    {copiedKey === "resume" ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                    {copiedKey === "resume" ? "Copied Bullets" : "Copy Bullets"}
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {kit.resumeBullets.map((bullet, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: "#334155", lineHeight: "1.6" }}>
                      <span style={{ color: "#7c3aed", fontWeight: "700" }}>•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LinkedIn Writeup */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ backgroundColor: "#0284c7", padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: "700" }}>
                    LinkedIn Project Showcase Template
                  </span>
                  <button
                    onClick={() => copyToClipboard(kit.linkedInWriteup, "linkedin")}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      color: "#ffffff",
                      borderRadius: "6px",
                      padding: "0.3rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    {copiedKey === "linkedin" ? <Check size={12} /> : <Copy size={12} />}
                    {copiedKey === "linkedin" ? "Copied Post" : "Copy Post"}
                  </button>
                </div>
                <pre
                  style={{
                    backgroundColor: "#f0f9ff",
                    color: "#0369a1",
                    padding: "1.25rem",
                    margin: 0,
                    fontSize: "0.85rem",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                  }}
                >
                  {kit.linkedInWriteup}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "1rem 1.75rem",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
            Included with your student license: Lifetime updates, faculty defense assurance & direct academic support.
          </div>
          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              color: "#334155",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Close Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
