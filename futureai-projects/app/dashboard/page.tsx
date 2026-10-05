import { Metadata } from "next";
import ClientDashboard from "./ClientDashboard";

export const metadata: Metadata = {
  title: "My Dashboard — FutureAI Projects",
};

export default function DashboardPage() {
  return <ClientDashboard />;
}
