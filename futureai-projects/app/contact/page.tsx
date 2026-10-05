import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us — FutureAI Projects",
  description: "Get in touch with the FutureAI Projects team for support, custom projects, or business inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="page-header">
          <div className="container">
            <div className="section-label">Get in Touch</div>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: "900", marginBottom: "0.5rem" }}>
              Contact Support
            </h1>
            <p style={{ color: "var(--muted-light)", fontSize: "1rem" }}>
              We're here to help with your project kits and learning journey
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4rem",
              }}
              className="contact-grid"
            >
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>How can we help?</h2>
                <p style={{ color: "var(--muted-light)", lineHeight: "1.7", marginBottom: "2rem" }}>
                  Whether you have a question about a specific project kit, need help with installation,
                  or want to request a custom project, our team is ready to assist you.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ padding: "0.75rem", background: "rgba(124,58,237,0.1)", borderRadius: "12px", color: "#9f67ff" }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", color: "#f8fafc", marginBottom: "0.25rem" }}>Email Support</div>
                      <div style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "0.25rem" }}>For order issues and technical help</div>
                      <a href="mailto:support@futureee.me" style={{ color: "#9f67ff", fontWeight: "600", fontSize: "0.95rem", textDecoration: "none" }}>support@futureee.me</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ padding: "0.75rem", background: "rgba(6,182,212,0.1)", borderRadius: "12px", color: "#06B6D4" }}>
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", color: "#f8fafc", marginBottom: "0.25rem" }}>WhatsApp Support</div>
                      <div style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "0.25rem" }}>For quick queries (Mon-Fri, 10 AM - 6 PM)</div>
                      <div style={{ color: "var(--muted-light)", fontWeight: "600", fontSize: "0.95rem" }}>+91 (FutureAI Number)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "2rem",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Send a Message</h3>
                <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--muted-light)", marginBottom: "0.5rem" }}>
                      Name
                    </label>
                    <input type="text" required className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--muted-light)", marginBottom: "0.5rem" }}>
                      Email
                    </label>
                    <input type="email" required className="input-field" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--muted-light)", marginBottom: "0.5rem" }}>
                      Subject (Optional)
                    </label>
                    <input type="text" className="input-field" placeholder="Order Issue / Custom Project" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--muted-light)", marginBottom: "0.5rem" }}>
                      Message
                    </label>
                    <textarea required className="input-field" rows={5} placeholder="How can we help you?" style={{ resize: "vertical" }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
