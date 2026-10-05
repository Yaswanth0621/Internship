import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Terms & Conditions | FutureAI Internship",
  description: "Terms and conditions for FutureAI AI/ML Internship. Learn about eligibility, certificate fees, refund policy, and usage guidelines.",
  keywords: ["terms and conditions", "refund policy", "internship terms", "certificate fee policy"],
  alternates: { canonical: "https://futureee.me/terms/" },
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the FutureAI Internship platform at futureee.me, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our platform."
    },
    {
      title: "2. Eligibility",
      content: "This program is open to any individual who wishes to learn AI and Machine Learning. You must be at least 16 years of age to register. By creating an account, you represent that you meet this eligibility requirement."
    },
    {
      title: "3. Program & Certificate Fee",
      content: "The internship curriculum is provided free of charge. A one-time certificate generation fee of ₹119 (INR), or ₹229 (INR) if opting for a signed Letter of Recommendation (LOR), is charged upon completion of the modules. This fee covers certificate issuance, digital verification, and platform maintenance. All payments are final and non-refundable once the certificate has been generated and downloaded."
    },
    {
      title: "4. Refund Policy",
      content: "If you have paid the certificate fee but have not yet downloaded your certificate, you may request a refund within 48 hours by contacting team@futureee.me. Once a certificate has been generated and made available for download, no refund will be issued. Disputed or fraudulent payment claims will be investigated."
    },
    {
      title: "5. Certificate Usage",
      content: "Upon successful payment and completion, you are granted a non-transferable certificate of completion. You may share your certificate on LinkedIn, your resume, and other professional profiles. You may not resell, transfer, or misrepresent the certificate. FutureAI reserves the right to revoke certificates if fraud or misrepresentation is detected."
    },
    {
      title: "6. Intellectual Property",
      content: "All course content, module materials, videos, and platform code are the intellectual property of FutureAI Internships. You are granted a limited, non-exclusive license to access and use the content for personal, educational purposes only. Reproduction, redistribution, or commercial use of any content is strictly prohibited."
    },
    {
      title: "7. User Conduct",
      content: "You agree not to: share your account credentials with others, submit false or plagiarized task work, attempt to bypass the payment system, or engage in any activity that disrupts the platform. Violations may result in immediate account termination without refund."
    },
    {
      title: "8. Limitation of Liability",
      content: "FutureAI Internships provides the platform on an 'as-is' basis. We do not guarantee specific career outcomes. Our total liability for any claim shall not exceed the amount you paid us (₹100). We are not liable for indirect, incidental, or consequential damages."
    },
    {
      title: "9. Governing Law",
      content: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India."
    },
    {
      title: "10. Changes to Terms",
      content: "We reserve the right to update these Terms at any time. Continued use of the platform after any changes constitutes your acceptance of the new Terms. We will notify registered users of significant changes via email."
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", background: "#fff", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Legal</span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "#111827", margin: "0.75rem 0 1rem", letterSpacing: "-0.02em" }}>Terms & Conditions</h1>
          <p style={{ color: "#6b7a8f", fontSize: "1rem", lineHeight: 1.7 }}>
            Last updated: April 27, 2025. Please read these Terms and Conditions carefully before using the FutureAI Internship platform.
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
