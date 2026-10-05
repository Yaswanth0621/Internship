import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectBySlug, getRelatedProjects, PROJECTS } from "@/lib/projects-data";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.status === "published").map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | FutureAI Projects`,
    description: `${project.shortDescription} — Complete project kit with source code, documentation, architecture diagrams, PPT, viva preparation, and more.`,
    openGraph: {
      title: `${project.title} | FutureAI Projects`,
      description: project.shortDescription,
      url: `https://projects.futureee.me/projects/${project.slug}`,
    },
    alternates: {
      canonical: `https://projects.futureee.me/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project, 4);

  return <ProjectDetailClient project={project} related={related} />;
}
