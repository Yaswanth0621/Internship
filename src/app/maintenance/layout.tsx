import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance Portal | FutureAI",
  robots: "noindex, nofollow",
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
