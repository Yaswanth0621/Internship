import Link from "next/link";
import { Project } from "@/lib/types";
import { ArrowRight, Star } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  "ai-ml": "#7C3AED",
  "generative-ai": "#06B6D4",
  "ai-agents": "#8B5CF6",
  "full-stack": "#10B981",
  "data-science": "#F59E0B",
  "computer-vision": "#EC4899",
  cybersecurity: "#EF4444",
  "cloud-devops": "#3B82F6",
  mobile: "#14B8A6",
  "final-year": "#F97316",
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
  const catColor = CATEGORY_COLORS[project.category] || "#7C3AED";
  const catLabel = CATEGORY_LABELS[project.category] || project.category;

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
      <div className="project-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Card top — colored category banner */}
        <div
          style={{
            height: "6px",
            background: `linear-gradient(90deg, ${catColor}, ${catColor}88)`,
          }}
        />

        <div style={{ padding: compact ? "1rem" : "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header badges */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <span
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "20px",
                fontSize: "0.7rem",
                fontWeight: "700",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                background: `${catColor}20`,
                color: catColor,
              }}
            >
              {catLabel}
            </span>
            <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
              {project.isFinalYear && (
                <span
                  style={{
                    padding: "0.2rem 0.5rem",
                    borderRadius: "20px",
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    background: "rgba(249, 115, 22, 0.15)",
                    color: "#fb923c",
                  }}
                >
                  Final Year
                </span>
              )}
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  color:
                    project.difficulty === "Advanced"
                      ? "#f87171"
                      : project.difficulty === "Intermediate"
                      ? "#fbbf24"
                      : "#34d399",
                }}
              >
                {project.difficulty}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: compact ? "0.95rem" : "1rem",
              fontWeight: "700",
              color: "#f8fafc",
              marginBottom: "0.5rem",
              lineHeight: "1.3",
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
                fontSize: "0.83rem",
                color: "var(--muted)",
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1rem" }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-badge" style={{ fontSize: "0.68rem" }}>
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="tech-badge" style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
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
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border)",
              marginTop: "auto",
            }}
          >
            <div className="price-display">
              <span className="price-currency">₹</span>
              <span className="price-amount">{project.price.toLocaleString("en-IN")}</span>
              {project.originalPrice && (
                <span className="price-original">₹{project.originalPrice.toLocaleString("en-IN")}</span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.8rem",
                fontWeight: "600",
                color: "#9f67ff",
                transition: "gap 0.2s",
              }}
            >
              View Project <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
