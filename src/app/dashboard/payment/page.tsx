import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentClient from "./PaymentClient";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Unlock Course & Certification | FutureAI",
  description: "Securely unlock your masterclass modules or pay the verification fee for your credentials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#fff" }}>
          <Loader2 size={32} color="#2563eb" className="animate-spin" />
        </div>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
