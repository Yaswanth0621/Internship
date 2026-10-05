"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 1.5rem 4rem" }}>
        <div style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "var(--shadow-card)"
        }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#f8fafc", marginBottom: "0.5rem" }}>
              Welcome Back
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              Sign in to access your project kits
            </p>
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1.5rem", textAlign: "center" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--muted-light)", marginBottom: "0.5rem" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.75rem" }}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--muted-light)", marginBottom: "0.5rem" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: "2.75rem" }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <button onClick={handleGoogleLogin} disabled={loading} className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" style={{ color: "#7C3AED", fontWeight: "600" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
