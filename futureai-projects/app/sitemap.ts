import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects-data";

export const dynamic = "force-static";

const siteUrl = "https://projects.futureee.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/final-year-projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic project routes
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.filter(p => p.status === "published").map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Distinct category routes
  const categories = Array.from(new Set(PROJECTS.map(p => p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'))));
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes, ...categoryRoutes];
}
