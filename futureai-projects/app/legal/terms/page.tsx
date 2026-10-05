import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — FutureAI Projects",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="container" style={{ maxWidth: "800px", padding: "4rem 1.5rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem" }}>Terms of Service</h1>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Last Updated: October 2026</p>
          
          <div className="prose" style={{ color: "var(--muted-light)", lineHeight: "1.8" }}>
            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
            <p>
              By accessing and using FutureAI Projects (projects.futureee.me), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>2. Digital Products</h2>
            <p>
              FutureAI Projects provides downloadable digital software project kits ("Products"). Upon purchase, you are granted a non-exclusive, non-transferable license to use the Products according to our License Agreement.
            </p>

            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>3. Academic Integrity</h2>
            <p>
              Our Products are educational resources. If you are a student, you are solely responsible for ensuring that your use of these Products complies with your academic institution's policies regarding plagiarism and academic integrity. FutureAI Projects is not liable for any academic penalties incurred.
            </p>

            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>4. Payments and Refunds</h2>
            <p>
              All payments are processed securely. Due to the digital nature of our Products, refunds are governed by our specific Refund Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
