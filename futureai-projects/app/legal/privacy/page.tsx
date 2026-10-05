import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — FutureAI Projects",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="container" style={{ maxWidth: "800px", padding: "4rem 1.5rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem" }}>Privacy Policy</h1>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Last Updated: October 2026</p>
          
          <div className="prose" style={{ color: "var(--muted-light)", lineHeight: "1.8" }}>
            <p>
              FutureAI ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (projects.futureee.me) and purchase our digital products.
            </p>

            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, or when you purchase a product.
              <br/><br/>
              <strong>Personal Data:</strong> Email address, name, and purchase history.
              <br/>
              <strong>Financial Data:</strong> We use Razorpay to process payments. We do not store your credit card numbers, UPI IDs, or other financial details on our servers.
            </p>

            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>2. How We Use Your Information</h2>
            <p>
              We use the information we collect or receive to:
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
              <li>Fulfill and manage your orders.</li>
              <li>Deliver digital products to you.</li>
              <li>Create and manage your account.</li>
              <li>Respond to customer service requests.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
