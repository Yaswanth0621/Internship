import type { Metadata } from "next";
import { Suspense } from "react";
import AuthClient from "./AuthClient";

export const metadata: Metadata = {
  title: "Join FutureAI Internship | Sign Up or Login",
  description: "Start your AI/ML internship journey with FutureAI. Sign up or login to access your dashboard and course materials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthClient />
    </Suspense>
  );
}
