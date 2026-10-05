import Link from "next/link";
import { Project } from "@/lib/types";
import { ArrowRight, Star } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  "ai-ml": "#2563eb",
  "generative-ai": "#4f46e5",
  "ai-agents": "#7c3aed",
  "full-stack": "#059669",
  "data-science": "#d97706",
  "computer-vision": "#db2777",
  cybersecurity: "#dc2626",
  "cloud-devops": "#0284c7",
  mobile: "#0d9488",
  "final-year": "#ea580c",
};

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI & ML",
  "generative-ai": "Generative AI",
  "ai-agents": "AI Agents",
  "full-stack": "Full Stack",
  "data-science": "Data Science",
  "computer-vision": "Computer Vision",
  cybersecurity: "Cybersecurity",
  "cloud-devops": "Cloud & DevOps",
  mobile: "Mobile",
  "final-year": "Final Year",
};

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const catColor = CATEGORY_COLORS[project.category] || "#2563eb";
  const catLabel = CATEGORY_LABELS[project.category] || project.category;

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
      <div className="project-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Card top — subtle colored accent border */}
        <div
          style={{
            height: "4px",
            background: `linear-gradient(90deg, ${catColor}, ${catColor}aa)`,
          }}
        />

        <div style={{ padding: compact ? "1.1rem" : "1.35rem", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header badges */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
            <span
              style={{
                padding: "0.25rem 0.65rem",
                borderRadius: "9999px",
                fontSize: "0.72rem",
                fontWeight: "700",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                background: `${catColor}15`,
                color: catColor,
                border: `1px solid ${catColor}30`,
              }}
            >
              {catLabel}
            </span>
            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              {project.isFinalYear && (
                <span
                  style={{
                    padding: "0.2rem 0.55rem",
                    borderRadius: "9999px",
                    fontSize: "0.68rem",
                    fontWeight: "700",
                    background: "#fff7ed",
                    color: "#c2410c",
                    border: "1px solid #ffedd5",
                  }}
                >
                  Final Year
                </span>
              )}
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "600",
                  padding: "0.15rem 0.45rem",
                  borderRadius: "6px",
                  background:
                    project.difficulty === "Advanced"
                      ? "#fef2f2"
                      : project.difficulty === "Intermediate"
                      ? "#fefce8"
                      : "#f0fdf4",
                  color:
                    project.difficulty === "Advanced"
                      ? "#dc2626"
                      : project.difficulty === "Intermediate"
                      ? "#b45309"
                      : "#16a34a",
                }}
              >
                {project.difficulty}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: compact ? "1rem" : "1.05rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "0.5rem",
              lineHeight: "1.35",
              display: "-webkit-box",
              WebkitLineClamp: compact ? 2 : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          {!compact && (
            <p
              style={{
                fontSize: "0.86rem",
                color: "#64748b",
                lineHeight: "1.6",
                flex: 1,
                marginBottom: "1rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.shortDescription}
            </p>
          )}

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.1rem" }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-badge" style={{ fontSize: "0.72rem" }}>
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="tech-badge" style={{ fontSize: "0.72rem", color: "#64748b" }}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Footer: price + CTA */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "0.85rem",
              borderTop: "1px solid #f1f5f9",
              marginTop: "auto",
            }}
          >
            <div className="price-display">
              <span className="price-currency" style={{ color: "#0f172a" }}>₹</span>
              <span className="price-amount" style={{ color: "#0f172a" }}>{project.price.toLocaleString("en-IN")}</span>
              {project.originalPrice && (
                <span className="price-original" style={{ color: "#94a3b8" }}>₹{project.originalPrice.toLocaleString("en-IN")}</span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#2563eb",
                transition: "gap 0.2s",
              }}
            >
              View Details <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
