"use client";

import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Loader2, Users, CreditCard, Package, TrendingUp } from "lucide-react";

interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalEntitlements: number;
  recentOrders: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all orders
        const ordersSnapshot = await getDocs(collection(db, "projects_marketplace/data/orders"));
        let revenue = 0;
        const orders = ordersSnapshot.docs.map(doc => {
          const data = doc.data();
          if (data.status === "paid") {
            revenue += (data.amount / 100); // Assuming amount is in paise
          }
          return { id: doc.id, ...data };
        });

        // Fetch entitlements
        const entitlementsSnapshot = await getDocs(collection(db, "projects_marketplace/data/entitlements"));

        // Sort orders by createdAt (descending) manually since we might not have a composite index
        const sortedOrders = orders.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setStats({
          totalOrders: orders.length,
          totalRevenue: revenue,
          totalEntitlements: entitlementsSnapshot.docs.length,
          recentOrders: sortedOrders.slice(0, 5)
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-gray-900">₹{stats?.totalRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard size={24} />
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Orders</div>
          <div className="text-3xl font-bold text-gray-900">{stats?.totalOrders.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Package size={24} />
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Entitlements</div>
          <div className="text-3xl font-bold text-gray-900">{stats?.totalEntitlements.toLocaleString()}</div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Project ID</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                stats?.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">{order.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{order.projectId}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{(order.amount / 100).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}
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
