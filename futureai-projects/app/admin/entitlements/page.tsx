"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Loader2, Search } from "lucide-react";

export default function AdminEntitlements() {
  const [entitlements, setEntitlements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEntitlements = async () => {
      try {
        const entSnapshot = await getDocs(collection(db, "projects_marketplace/data/entitlements"));
        const fetchedEntitlements = entSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Sort descending by date
        const sorted = fetchedEntitlements.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setEntitlements(sorted);
      } catch (error) {
        console.error("Error fetching entitlements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntitlements();
  }, []);

  const filteredEntitlements = entitlements.filter(ent => 
    ent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ent.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ent.projectId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">User Entitlements</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search users or projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">User Email</th>
                <th className="px-6 py-4">Project ID</th>
                <th className="px-6 py-4">Downloads</th>
                <th className="px-6 py-4">Granted Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEntitlements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No entitlements match your search.
                  </td>
                </tr>
              ) : (
                filteredEntitlements.map((ent) => (
                  <tr key={ent.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{ent.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{ent.userId}</td>
                    <td className="px-6 py-4 text-blue-600 font-semibold">{ent.projectId}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-bold">
                        {ent.downloadCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {ent.createdAt?.toDate ? ent.createdAt.toDate().toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
