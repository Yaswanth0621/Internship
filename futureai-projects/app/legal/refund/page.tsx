import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy — FutureAI Projects",
};

export default function RefundPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "64px" }}>
        <div className="container" style={{ maxWidth: "800px", padding: "4rem 1.5rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem" }}>Refund Policy</h1>
          <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Last Updated: October 2026</p>
          
          <div className="prose" style={{ color: "var(--muted-light)", lineHeight: "1.8" }}>
            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>Digital Product Policy</h2>
            <p>
              Due to the nature of digital goods (source code, documentation, etc.), which cannot be "returned" once downloaded, FutureAI Projects generally operates with a strict no-refund policy after a project has been successfully purchased and accessed.
            </p>

            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>Exceptions</h2>
            <p>
              We may grant refunds in the following exceptional circumstances:
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
              <li>The file is fundamentally corrupted and we cannot provide a working replacement.</li>
              <li>You were charged multiple times for the same transaction.</li>
              <li>The product differs substantially from its description on the website.</li>
            </ul>

            <h2 style={{ color: "#f8fafc", marginTop: "2rem", marginBottom: "1rem" }}>Requesting Support</h2>
            <p>
              If you are facing technical issues running the project, this is not automatically grounds for a refund. Please contact our support team at <strong>support@futureee.me</strong> first so we can assist you with the setup.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
