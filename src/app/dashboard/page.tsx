import type { Metadata } from "next";
import { Suspense } from "react";
import DashboardClient from "./DashboardClient";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Dashboard | FutureAI Internship & Masterclasses",
  description: "Track your course progress, access learning modules, and download your verified credentials.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://futureee.me/dashboard",
  },
};

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f8fafc" }}>
          <Loader2 size={36} color="#2563eb" className="animate-spin" />
        </div>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
