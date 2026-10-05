"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";

// In a real app, this should be checked against a Firestore admin collection or custom claims.
// For now, we hardcode the admin emails.
const ADMIN_EMAILS = ["admin@futureee.me", "yaswanth@futureee.me"];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser) {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 mb-6">You do not have administrative privileges to view this area.</p>
          <Link href="/" className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors inline-block">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-bold text-xl text-gray-900 tracking-tight">FutureAI Admin</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="block px-4 py-2.5 bg-purple-50 text-purple-700 font-semibold rounded-xl">
            Dashboard
          </Link>
          <Link href="/admin/orders" className="block px-4 py-2.5 text-gray-600 font-semibold rounded-xl hover:bg-gray-50">
            Orders
          </Link>
          <Link href="/admin/entitlements" className="block px-4 py-2.5 text-gray-600 font-semibold rounded-xl hover:bg-gray-50">
            Entitlements
          </Link>
          <Link href="/admin/projects" className="block px-4 py-2.5 text-gray-600 font-semibold rounded-xl hover:bg-gray-50">
            Projects Catalog
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm font-semibold text-gray-900 truncate">{user.email}</div>
          <div className="text-xs text-gray-500">Administrator</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 md:hidden">
          <span className="font-bold text-lg text-gray-900">FutureAI Admin</span>
        </header>
        <div className="p-6 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
