import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | FutureAI Internship",
  description: "Learn how FutureAI Internship platform (futureee.me) collects, uses, and protects student data for AI/ML certification.",
  keywords: ["privacy policy", "data protection", "FutureAI privacy", "student data security"],
  alternates: { canonical: "https://futureee.me/privacy/" },
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when you create an account, such as your name, email address, and payment transaction ID (UTR/Razorpay ID). We do not store your payment card details — all transactions are processed securely by Razorpay."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to: create and manage your student account, issue your certificate of completion, send program-related communications, improve our services, and comply with legal obligations."
    },
    {
      title: "3. Data Storage & Security",
      content: "Your data is stored securely on Google Firebase infrastructure with industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      title: "4. Certificate Data",
      content: "Your name and completion data are stored permanently to allow certificate verification via the QR code on your certificate. This data is publicly verifiable but contains only your name and completion date — no sensitive personal information."
    },
    {
      title: "5. Sharing of Information",
      content: "We do not sell, trade, or rent your personal information to third parties. We may share data with service providers (Firebase, Razorpay) solely to operate our platform. These providers are bound by strict confidentiality obligations."
    },
    {
      title: "6. Cookies",
      content: "We use essential cookies to maintain your session and keep you logged in. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, but this may affect your ability to use the platform."
    },
    {
      title: "7. Your Rights",
      content: "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at team@futureee.me. We will respond to all requests within 30 days."
    },
    {
      title: "8. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at team@futureee.me. We are committed to resolving any privacy concerns promptly."
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", background: "#fff", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Legal</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#111827", margin: "0.75rem 0 1rem", letterSpacing: "-0.02em" }}>Privacy Policy</h1>
          <p style={{ color: "#6b7a8f", fontSize: "1rem", lineHeight: 1.7 }}>
            Last updated: April 27, 2025. This Privacy Policy explains how FutureAI Internships (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your information when you use our platform at futureee.me.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>{s.title}</h2>
              <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "0.95rem" }}>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
