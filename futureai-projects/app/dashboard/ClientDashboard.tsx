"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase/config";
import { Entitlement, Project } from "@/lib/types";
import { PROJECTS } from "@/lib/projects-data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectKitModal from "@/components/ProjectKitModal";
import { generateAndDownloadProjectZip } from "@/lib/zip-generator";
import { Package, LogOut, ArrowRight, Download, BookOpen, Clock, Loader2, Sparkles, FolderTree } from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [entitlements, setEntitlements] = useState<(Entitlement & { project: Project | undefined })[]>([]);
  const [selectedProjectForKit, setSelectedProjectForKit] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchEntitlements(user.uid);
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchEntitlements = async (uid: string) => {
    try {
      const q = query(collection(db, "projects_marketplace/data/entitlements"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data() as Entitlement);
      
      const enriched = data.map(ent => ({
        ...ent,
        project: PROJECTS.find(p => p.id === ent.projectId)
      }));

      setEntitlements(enriched);
    } catch (err) {
      console.error("Error fetching entitlements", err);
    }
  };

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (project: Project) => {
    try {
      setDownloadingId(project.id);
      // Generate and download client-side ZIP with all 13 promised assets
      await generateAndDownloadProjectZip(project);
    } catch (error: any) {
      console.error("Download failed:", error);
      alert(error.message || "Failed to download the project.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="animate-spin" style={{ width: "32px", height: "32px", border: "3px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%" }} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "80px", minHeight: "calc(100vh - 300px)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "#f8fafc", marginBottom: "0.25rem" }}>
                My Dashboard
              </h1>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                Welcome back, {user.displayName || user.email}
              </p>
            </div>
            <button onClick={handleLogout} className="btn-ghost" style={{ color: "var(--error)", padding: "0.5rem 0.75rem" }}>
              <LogOut size={16} /> Logout
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
            {entitlements.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background: "var(--card)",
                  border: "1px dashed var(--border)",
                  borderRadius: "16px",
                }}
              >
                <Package size={48} color="var(--muted)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontSize: "1.25rem", color: "#f8fafc", marginBottom: "0.5rem" }}>No projects yet</h3>
                <p style={{ color: "var(--muted-light)", marginBottom: "1.5rem" }}>
                  You haven&apos;t purchased any project kits yet.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/projects" className="btn-primary">
                    Explore Projects
                  </Link>
                  <button
                    onClick={() => setSelectedProjectForKit(PROJECTS[0])}
                    className="btn-secondary"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    <Sparkles size={16} /> Preview Sample Deliverables Kit
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc", marginBottom: "0.5rem" }}>
                  My Project Kits
                </h2>
                
                {entitlements.map((ent, i) => {
                  if (!ent.project) return null;
                  const currentProject = ent.project;
                  
                  return (
                    <div
                      key={ent.id || i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        padding: "1.5rem",
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                        flexWrap: "wrap"
                      }}
                    >
                      <div style={{ flex: 1, minWidth: "250px" }}>
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                          <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", background: "rgba(124,58,237,0.1)", color: "#9f67ff", borderRadius: "20px", fontWeight: "600" }}>
                            {currentProject.category}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f8fafc", marginBottom: "0.4rem" }}>
                          {currentProject.title}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Clock size={12} /> Purchased on {new Date(ent.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                        <button
                          className="btn-primary"
                          onClick={() => setSelectedProjectForKit(currentProject)}
                          style={{ padding: "0.6rem 1.1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
                        >
                          <FolderTree size={16} /> Open Project Workspace
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => handleDownload(currentProject)}
                          disabled={downloadingId === currentProject.id}
                          style={{ padding: "0.6rem 1rem", opacity: downloadingId === currentProject.id ? 0.7 : 1, cursor: downloadingId === currentProject.id ? "not-allowed" : "pointer" }}
                        >
                          {downloadingId === currentProject.id ? (
                            <><Loader2 size={15} className="animate-spin" /> Packaging ZIP...</>
                          ) : (
                            <><Download size={15} /> Download Full Kit (.ZIP)</>
                          )}
                        </button>
                        <Link href={`/projects/${currentProject.slug}`} className="btn-ghost" style={{ padding: "0.6rem 1rem", border: "1px solid var(--border)" }}>
                          <BookOpen size={15} /> View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Interactive Project Kit Deliverables Modal */}
      {selectedProjectForKit && (
        <ProjectKitModal
          project={selectedProjectForKit}
          onClose={() => setSelectedProjectForKit(null)}
        />
      )}

      <Footer />
    </>
  );
}
