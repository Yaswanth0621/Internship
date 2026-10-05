"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  User, 
  Brain, 
  ChevronRight, 
  LogOut, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Info, 
  Flame, 
  LogIn,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="site-nav">
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
          {/* Logo */}
          <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
            <div className="nav-logo-icon">
              <Brain size={20} />
            </div>
            <span className="nav-logo-text">
              FutureAI <span style={{ color: "#2563eb" }}>Internship</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="nav-desktop-menu">
            <Link 
              href="/#tracks" 
              className="nav-link"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              Internships
            </Link>
            <Link 
              href="/1_month_internship" 
              className={`nav-link ${pathname === "/1_month_internship" ? "nav-link--active" : ""}`}
            >
              1-Month Track
            </Link>
            <Link 
              href="/courses" 
              className={`nav-link ${pathname === "/courses" ? "nav-link--active" : ""}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              Courses
              <span className="nav-badge-hot">HOT</span>
            </Link>
            <a 
              href="https://projects.futureee.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
            >
              Projects <ArrowUpRight size={12} color="#64748b" />
            </a>
            <Link href="/#curriculum" className="nav-link">
              Curriculum
            </Link>
            <Link 
              href="/verify" 
              className={`nav-link ${pathname === "/verify" ? "nav-link--active" : ""}`}
            >
              Verify
            </Link>
            <Link href="/#about" className="nav-link">
              About
            </Link>

            <div style={{ marginLeft: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {user ? (
                <>
                  <Link href="/dashboard" className="btn-primary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                    <User size={14} /> Dashboard
                  </Link>
                  <button 
                    onClick={() => auth.signOut()}
                    className="btn-outline btn-sm"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                    id="nav-logout-desktop"
                    title="Sign Out"
                  >
                    <LogOut size={14} />
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth" className="btn-outline btn-sm" style={{ padding: "0.4rem 0.85rem", fontSize: "0.85rem" }}>
                    Login
                  </Link>
                  <Link href="/auth" className="btn-primary btn-sm">
                    Enroll Free
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="nav-mobile-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className={`nav-mobile-toggle ${isOpen ? "nav-mobile-toggle--open" : ""}`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer & Backdrop */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="nav-mobile-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <div className="nav-mobile-menu">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {/* Courses Link (Prominent) */}
              <Link 
                href="/courses" 
                className={`nav-mobile-link ${pathname === "/courses" ? "nav-mobile-link--active" : ""}`} 
                onClick={() => setIsOpen(false)}
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="nav-mobile-icon-box" style={{ background: "#fef3c7", color: "#d97706" }}>
                    <Flame size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.925rem" }}>
                      Trending Courses
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      AI, Web Dev, DSA & more from ₹99
                    </div>
                  </div>
                </div>
                <span className="nav-badge-hot">2026 HOT</span>
              </Link>
              
              {/* Projects Marketplace */}
              <a 
                href="https://projects.futureee.me"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-mobile-link"
                onClick={() => setIsOpen(false)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="nav-mobile-icon-box" style={{ background: "#f3e8ff", color: "#7c3aed" }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>
                      Project Kits Marketplace
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      Complete source code & resources
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </a>

              {/* 1-Month Internship */}
              <Link 
                href="/1_month_internship" 
                className={`nav-mobile-link ${pathname === "/1_month_internship" ? "nav-mobile-link--active" : ""}`} 
                onClick={() => setIsOpen(false)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="nav-mobile-icon-box" style={{ background: "#eff6ff", color: "#2563eb" }}>
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>
                      1-Month Summer Internship
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      Deep PyTorch, Capstones & LOR
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </Link>

              {/* Curriculum */}
              <Link 
                href="/#curriculum" 
                className="nav-mobile-link" 
                onClick={() => setIsOpen(false)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="nav-mobile-icon-box" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>
                      Internship Curriculum
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      7-day syllabus & code labs
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </Link>

              {/* Verify Certificate */}
              <Link 
                href="/verify" 
                className={`nav-mobile-link ${pathname === "/verify" ? "nav-mobile-link--active" : ""}`} 
                onClick={() => setIsOpen(false)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="nav-mobile-icon-box" style={{ background: "#f5f3ff", color: "#7c3aed" }}>
                    <Award size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>
                      Verify Certificate
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      Check tamper-proof ID record
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </Link>

              {/* About */}
              <Link 
                href="/#about" 
                className="nav-mobile-link" 
                onClick={() => setIsOpen(false)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="nav-mobile-icon-box" style={{ background: "#f8fafc", color: "#64748b" }}>
                    <Info size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>
                      About FutureAI
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                      Our architects & mission
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </Link>
            </div>

            {/* Mobile Bottom CTA Section */}
            <div className="nav-mobile-cta">
              {user ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.6rem 0.75rem", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0 }}>
                      {user.displayName?.[0] || user.email?.[0]?.toUpperCase() || "S"}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.displayName || "Student"}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <Link 
                    href="/dashboard" 
                    className="btn-primary" 
                    style={{ width: "100%", justifyContent: "center", padding: "0.75rem 1rem", fontSize: "0.9rem" }} 
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={16} /> Open Student Dashboard
                  </Link>

                  <button 
                    onClick={() => { auth.signOut(); setIsOpen(false); }}
                    className="btn-outline"
                    style={{ width: "100%", justifyContent: "center", padding: "0.6rem 1rem", fontSize: "0.85rem", color: "#dc2626", borderColor: "#fecaca" }}
                    id="nav-logout-mobile"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <Link 
                    href="/auth" 
                    className="btn-primary" 
                    style={{ width: "100%", justifyContent: "center", padding: "0.85rem 1rem", fontSize: "0.925rem" }} 
                    onClick={() => setIsOpen(false)}
                  >
                    Start Internship — Free <ChevronRight size={16} />
                  </Link>
                  <Link 
                    href="/auth" 
                    className="btn-outline" 
                    style={{ width: "100%", justifyContent: "center", padding: "0.65rem 1rem", fontSize: "0.85rem" }} 
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={15} /> Student Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
