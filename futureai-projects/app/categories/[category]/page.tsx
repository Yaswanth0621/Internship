import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { CATEGORIES, getProjectsByCategory } from "@/lib/projects-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} Projects — FutureAI Projects`,
    description: `Explore ${cat.name} project kits: ${cat.description}. Complete source code, documentation, and learning resources.`,
    alternates: { canonical: `https://projects.futureee.me/categories/${cat.id}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();

  const projects = getProjectsByCategory(category);

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div
          style={{
            padding: "5rem 0 3rem",
            background: `linear-gradient(180deg, ${cat.color}12 0%, transparent 100%)`,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container">
            <div style={{ marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--muted)" }}>
              <Link href="/categories" style={{ color: "var(--muted)" }}>Categories</Link>
              {" / "}
              {cat.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "14px",
                  background: `${cat.color}20`,
                  border: `1px solid ${cat.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                }}
              >
                {cat.icon}
              </div>
              <div>
                <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: "900" }}>{cat.name}</h1>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>{cat.description}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            {projects.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚧</div>
                <h2 style={{ marginBottom: "0.5rem" }}>Coming Soon</h2>
                <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
                  Projects in this category are being prepared. Check back soon!
                </p>
                <Link href="/projects" className="btn-primary">Browse All Projects <ArrowRight size={16} /></Link>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>
                  {projects.length} project{projects.length !== 1 ? "s" : ""} in {cat.name}
                </div>
                <div className="projects-grid">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
