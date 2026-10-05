"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  ArrowLeft,
  BookOpen,
  Layout,
  GraduationCap,
  Package,
  HelpCircle,
  MessageSquare,
  User,
  LogIn,
  Layers,
  ArrowUpRight
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { href: "/projects", label: "All Projects", icon: Layout },
      { href: "/final-year-projects", label: "Final Year Projects", icon: GraduationCap },
      { href: "/categories", label: "Browse Categories", icon: BookOpen },
    ],
  },
  { href: "/project-packs", label: "Project Packs" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className="navbar"
        style={{
          background: scrolled ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.90)",
          boxShadow: scrolled ? "0 4px 20px -2px rgba(15, 23, 42, 0.06)" : "none",
          borderBottom: "1px solid #e2e8f0",
          transition: "all 0.25s ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "1.75rem", width: "100%" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                fontWeight: "800",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
              }}
            >
              F
            </div>
            <div>
              <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", lineHeight: "1.1" }}>
                FutureAI
              </div>
              <div style={{ fontSize: "0.62rem", color: "#2563eb", fontWeight: "700", letterSpacing: "0.06em", lineHeight: "1" }}>
                PROJECTS
              </div>
            </div>
          </Link>

          {/* Quick Ecosystem Switch Pill (Back to Main) */}
          <a
            href="https://futureee.me"
            className="back-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.78rem",
              fontWeight: "600",
              color: "#475569",
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              padding: "0.35rem 0.75rem",
              borderRadius: "9999px",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eff6ff";
              e.currentTarget.style.color = "#2563eb";
              e.currentTarget.style.borderColor = "#bfdbfe";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#475569";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <ArrowLeft size={13} />
            <span>Internships Home</span>
          </a>

          {/* Desktop Nav Links */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              flex: 1,
            }}
          >
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="btn-ghost"
                    style={{
                      color: isActive(link.href || "") ? "#2563eb" : "#475569",
                      fontWeight: isActive(link.href || "") ? "600" : "500",
                      fontSize: "0.875rem",
                    }}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  {openDropdown === link.label && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "0.5rem",
                        minWidth: "220px",
                        boxShadow: "0 10px 30px -4px rgba(15, 23, 42, 0.1)",
                        zIndex: 50,
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.6rem 0.75rem",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            color: "#334155",
                            transition: "background 0.15s, color 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "#f1f5f9";
                            (e.currentTarget as HTMLElement).style.color = "#2563eb";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "#334155";
                          }}
                        >
                          <child.icon size={15} color="#2563eb" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="btn-ghost"
                  style={{
                    color: isActive(link.href!) ? "#2563eb" : "#475569",
                    fontWeight: isActive(link.href!) ? "600" : "500",
                    fontSize: "0.875rem",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            {/* Search */}
            <button
              className="btn-ghost"
              onClick={() => setSearchOpen(true)}
              aria-label="Search projects"
              style={{ padding: "0.5rem", color: "#64748b" }}
            >
              <Search size={18} />
            </button>

            {/* Login */}
            <Link
              href="/auth/login"
              className="btn-ghost"
              style={{ padding: "0.45rem 0.75rem", fontSize: "0.875rem", color: "#334155" }}
            >
              <LogIn size={16} />
              <span className="hide-mobile">Login</span>
            </Link>

            {/* Explore CTA */}
            <Link href="/projects" className="btn-primary explore-cta" style={{ padding: "0.45rem 0.95rem", fontSize: "0.85rem" }}>
              Explore Kits
            </Link>

            {/* Mobile menu button */}
            <button
              className="btn-ghost mobile-menu-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              style={{ padding: "0.5rem", color: "#0f172a" }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div
            className="mobile-nav-overlay"
            onClick={() => setIsOpen(false)}
          />
          <div className="mobile-nav-drawer">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#fff",
                  }}
                >
                  F
                </div>
                <span style={{ fontWeight: "800", fontSize: "0.98rem", color: "#0f172a" }}>FutureAI Projects</span>
              </Link>
              <button className="btn-ghost" onClick={() => setIsOpen(false)} style={{ padding: "0.25rem" }}>
                <X size={20} />
              </button>
            </div>

            {/* Back link in drawer */}
            <div style={{ marginBottom: "1rem" }}>
              <a
                href="https://futureee.me"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#2563eb",
                  background: "#eff6ff",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #bfdbfe",
                }}
              >
                <ArrowLeft size={14} /> Back to FutureAI Internships
              </a>
            </div>

            {/* Mobile links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <Link href="/" style={mobileLinkStyle(isActive("/"))}>Home</Link>
              <Link href="/projects" style={mobileLinkStyle(isActive("/projects"))}>All Projects</Link>
              <Link href="/final-year-projects" style={mobileLinkStyle(isActive("/final-year-projects"))}>
                <GraduationCap size={15} /> Final Year Projects
              </Link>
              <Link href="/categories" style={mobileLinkStyle(isActive("/categories"))}>Browse Categories</Link>
              <Link href="/project-packs" style={mobileLinkStyle(isActive("/project-packs"))}>Project Packs</Link>
              <Link href="/how-it-works" style={mobileLinkStyle(isActive("/how-it-works"))}>How It Works</Link>
              <Link href="/faq" style={mobileLinkStyle(isActive("/faq"))}>FAQ</Link>
              <Link href="/contact" style={mobileLinkStyle(isActive("/contact"))}>Contact</Link>
            </div>

            <div style={{ height: "1px", background: "#e2e8f0", margin: "1rem 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link href="/auth/login" className="btn-secondary" style={{ justifyContent: "center" }}>
                <LogIn size={16} /> Login
              </Link>
              <Link href="/projects" className="btn-primary" style={{ justifyContent: "center" }}>
                Explore Projects
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(8px)",
            zIndex: 200,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "6rem 1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Search size={20} color="#64748b" />
              <input
                autoFocus
                className="input-field"
                placeholder="Search projects, technologies, categories..."
                style={{ border: "none", background: "transparent", padding: "0" }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value;
                    if (val) window.location.href = `/projects?search=${encodeURIComponent(val)}`;
                  }
                }}
              />
              <button onClick={() => setSearchOpen(false)} className="btn-ghost" style={{ padding: "0.25rem" }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Try: &quot;AI&quot;, &quot;Python&quot;, &quot;RAG&quot;, &quot;final year&quot;, &quot;computer vision&quot;
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .back-link { display: none !important; }
          .explore-cta { display: none !important; }
        }
        @media (min-width: 961px) {
          .mobile-menu-btn { display: none !important; }
          .hide-mobile { display: inline !important; }
        }
        @media (max-width: 960px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}

function mobileLinkStyle(active: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.65rem 0.75rem",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: active ? "#2563eb" : "#475569",
    background: active ? "#eff6ff" : "transparent",
    transition: "all 0.15s",
  };
}
