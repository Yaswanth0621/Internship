"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, CATEGORIES } from "@/lib/projects-data";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000+", min: 2000, max: Infinity },
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "difficulty", label: "Difficulty" },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [showFinalYear, setShowFinalYear] = useState(false);
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const publishedProjects = PROJECTS.filter((p) => p.status === "published");

  const filtered = useMemo(() => {
    let result = [...publishedProjects];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedDifficulty) {
      result = result.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    if (showFinalYear) {
      result = result.filter((p) => p.isFinalYear);
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "difficulty") {
      const order = { Advanced: 0, Intermediate: 1, Beginner: 2 };
      result.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    }

    return result;
  }, [search, selectedCategory, selectedDifficulty, selectedPriceRange, showFinalYear, sort]);

  const hasFilters = selectedCategory || selectedDifficulty || selectedPriceRange !== null || showFinalYear || search;

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedPriceRange(null);
    setShowFinalYear(false);
  };

  const FilterPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Category */}
      <div>
        <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
          Category
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                color: selectedCategory === cat.id ? "#2563eb" : "#475569",
                background: selectedCategory === cat.id ? "#eff6ff" : "transparent",
                border: selectedCategory === cat.id ? "1px solid #bfdbfe" : "1px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                fontWeight: selectedCategory === cat.id ? "600" : "400",
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
          Difficulty
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(selectedDifficulty === d ? null : d)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                color: selectedDifficulty === d ? "#2563eb" : "#475569",
                background: selectedDifficulty === d ? "#eff6ff" : "transparent",
                border: selectedDifficulty === d ? "1px solid #bfdbfe" : "1px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: selectedDifficulty === d ? "600" : "400",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: d === "Advanced" ? "#dc2626" : d === "Intermediate" ? "#d97706" : "#16a34a",
                  flexShrink: 0,
                }}
              />
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
          Price Range
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {PRICE_RANGES.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                color: selectedPriceRange === i ? "#2563eb" : "#475569",
                background: selectedPriceRange === i ? "#eff6ff" : "transparent",
                border: selectedPriceRange === i ? "1px solid #bfdbfe" : "1px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: selectedPriceRange === i ? "600" : "400",
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Final Year toggle */}
      <div>
        <button
          onClick={() => setShowFinalYear(!showFinalYear)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            background: showFinalYear ? "#fff7ed" : "transparent",
            border: showFinalYear ? "1px solid #ffedd5" : "1px solid transparent",
            cursor: "pointer",
            color: showFinalYear ? "#c2410c" : "#475569",
            fontSize: "0.85rem",
            fontWeight: "600",
          }}
        >
          🎓 Final Year Projects Only
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="page-header">
          <div className="container">
            <div className="section-label">Project Marketplace</div>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
              All Projects
            </h1>
            <p style={{ color: "var(--muted-light)", fontSize: "1rem" }}>
              {publishedProjects.length} project kits across {CATEGORIES.length} technology domains
            </p>
          </div>
        </div>

        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          {/* Top bar: search + sort + filter toggle */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Search */}
            <div style={{ flex: 1, minWidth: "200px", position: "relative" }}>
              <Search
                size={16}
                style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Search projects, technologies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "2.5rem", paddingRight: search ? "2.5rem" : "1rem" }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div style={{ position: "relative" }}>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input-field"
                style={{ paddingRight: "2rem", cursor: "pointer", minWidth: "180px" }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile filter button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="btn-secondary mobile-filter-btn"
              style={{ gap: "0.5rem" }}
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasFilters && (
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "#fff",
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  •
                </span>
              )}
            </button>

            {hasFilters && (
              <button onClick={clearFilters} className="btn-ghost" style={{ color: "var(--error)", fontSize: "0.85rem" }}>
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {/* Mobile filter panel */}
          {filtersOpen && (
            <div
              className="mobile-filter-panel"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <FilterPanel />
            </div>
          )}

          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            {/* Sidebar filters (desktop) */}
            <div
              className="filter-sidebar"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "1.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a" }}>Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}>
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel />
            </div>

            {/* Project grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
                </span>
              </div>

              {filtered.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem 2rem",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                  <h3 style={{ marginBottom: "0.5rem", color: "#0f172a" }}>No projects found</h3>
                  <p style={{ color: "#64748b", marginBottom: "1rem" }}>
                    Try adjusting your filters or search query
                  </p>
                  <button onClick={clearFilters} className="btn-primary">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "1.25rem",
                  }}
                >
                  {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        @media (min-width: 961px) {
          .mobile-filter-btn { display: none !important; }
          .mobile-filter-panel { display: none !important; }
        }
      `}</style>
    </>
  );
}
