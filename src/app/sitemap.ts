import { MetadataRoute } from "next";
import { trendingCourses } from "@/data/trendingCourses";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://futureee.me";
  const lastModified = new Date();

  // Static routes
  const staticRoutes = [
    "",
    "/courses",
    "/1_month_internship",
    "/verify",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/courses" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1.0 : route === "/courses" ? 0.9 : 0.8,
  }));

  // Dynamic course routes
  const courseRoutes = trendingCourses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...courseRoutes];
}
