"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getCourseBySlug, getCourseById } from "@/data/trendingCourses";
import { Rocket, Zap } from "lucide-react";

export default function FloatingEnrollButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Determine if we are viewing a specific course
  let courseId = null;
  let courseTitle = null;
  let coursePrice = null;

  if (pathname?.startsWith("/courses/") && pathname !== "/courses") {
    const slug = pathname.split("/courses/")[1];
    const course = getCourseBySlug(slug);
    if (course) {
      courseId = course.id;
      courseTitle = course.title;
      coursePrice = course.price;
    }
  } else if (pathname === "/dashboard") {
    const pId = searchParams?.get("courseId");
    if (pId && pId !== "1_month" && pId !== "7_day" && pId !== "combo") {
      const course = getCourseById(pId);
      if (course) {
        courseId = course.id;
        courseTitle = course.title;
        coursePrice = course.price;
      }
    }
  }

  // If on payment page or admin/auth page, don't show the floating button
  if (pathname?.startsWith("/dashboard/payment") || pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
    return null;
  }

  const handleEnrollClick = () => {
    if (courseId) {
      router.push(`/dashboard/payment?courseId=${courseId}`);
    } else {
      router.push("/dashboard/payment?courseId=combo");
    }
  };

  const isCombo = !courseId;
  const buttonText = isCombo 
    ? "Unlock All Courses - ₹499" 
    : `Enroll Now - ₹${coursePrice}`;
    
  return (
    <button
      onClick={handleEnrollClick}
      id="floating-enroll-btn"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        background: isCombo ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "9999px",
        padding: "0.85rem 1.75rem",
        fontSize: "0.95rem",
        fontWeight: 800,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        boxShadow: isCombo ? "0 10px 35px rgba(245, 158, 11, 0.4)" : "0 10px 35px rgba(37,99,235,0.4)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="floating-help-animate hover:scale-105 hover:shadow-xl"
      title={buttonText}
    >
      {isCombo ? <Zap size={18} fill="currentColor" /> : <Rocket size={18} />}
      <span>{buttonText}</span>
    </button>
  );
}
