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
          background: scrolled ? "rgba(15, 15, 26, 0.98)" : "rgba(15, 15, 26, 0.85)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "2rem", width: "100%" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "800",
                color: "#fff",
              }}
            >
              F
            </div>
            <div>
              <div style={{ fontSize: "1rem", fontWeight: "800", color: "#f8fafc", lineHeight: "1.1" }}>
                FutureAI
              </div>
              <div style={{ fontSize: "0.6rem", color: "#7C3AED", fontWeight: "600", letterSpacing: "0.05em", lineHeight: "1" }}>
                PROJECTS
              </div>
            </div>
          </Link>

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
                      color: isActive(link.href || "") ? "#9f67ff" : "#cbd5e1",
                      fontWeight: "500",
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
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        padding: "0.5rem",
                        minWidth: "220px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
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
                            color: "#cbd5e1",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "var(--card)";
                            (e.currentTarget as HTMLElement).style.color = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "#cbd5e1";
                          }}
                        >
                          <child.icon size={15} color="#7C3AED" />
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
                    color: isActive(link.href!) ? "#9f67ff" : "#cbd5e1",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            {/* Back to FutureAI */}
            <a
              href="https://futureee.me"
              target="_blank"
              rel="noopener noreferrer"
              className="back-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.75rem",
                color: "var(--muted)",
                padding: "0.25rem 0.5rem",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              <ArrowLeft size={12} />
              FutureAI
            </a>

            {/* Search */}
            <button
              className="btn-ghost"
              onClick={() => setSearchOpen(true)}
              aria-label="Search projects"
              style={{ padding: "0.5rem" }}
            >
              <Search size={18} />
            </button>

            {/* Login */}
            <Link
              href="/auth/login"
              className="btn-ghost"
              style={{ padding: "0.5rem 0.75rem", fontSize: "0.875rem" }}
            >
              <LogIn size={16} />
              <span className="hide-mobile">Login</span>
            </Link>

            {/* Explore CTA */}
            <Link href="/projects" className="btn-primary explore-cta" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              Explore Projects
            </Link>

            {/* Mobile menu button */}
            <button
              className="btn-ghost mobile-menu-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              style={{ padding: "0.5rem" }}
            >
              <Menu size={20} />
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
            style={{ animation: "fadeIn 0.2s ease" }}
          />
          <div className="mobile-nav-drawer">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#fff",
                  }}
                >
                  F
                </div>
                <span style={{ fontWeight: "700", fontSize: "0.95rem" }}>FutureAI Projects</span>
              </Link>
              <button className="btn-ghost" onClick={() => setIsOpen(false)} style={{ padding: "0.25rem" }}>
                <X size={20} />
              </button>
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

            <div style={{ height: "1px", background: "var(--border)", margin: "1rem 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link href="/auth/login" className="btn-secondary" style={{ justifyContent: "center" }}>
                <LogIn size={16} /> Login
              </Link>
              <Link href="/projects" className="btn-primary" style={{ justifyContent: "center" }}>
                Explore Projects
              </Link>
            </div>

            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
              <a
                href="https://futureee.me"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                }}
              >
                <ArrowLeft size={12} /> Back to FutureAI main site
              </a>
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
            background: "rgba(0,0,0,0.7)",
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
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Search size={20} color="var(--muted)" />
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
            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
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
    color: active ? "#9f67ff" : "#cbd5e1",
    background: active ? "rgba(124, 58, 237, 0.1)" : "transparent",
    transition: "all 0.15s",
  };
}
