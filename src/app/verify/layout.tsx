import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Certificate | FutureAI Internship",
  description: "Verify the authenticity of FutureAI internship certificates. Enter a certificate ID to view student achievements and credentials.",
  keywords: ["verify certificate", "internship verification", "FutureAI credentials", "AI ML certificate check"],
  robots: "index, follow",
  alternates: {
    canonical: "https://futureee.me/verify/",
  },
  openGraph: {
    title: "Verify Certificate | FutureAI Internship",
    description: "Verify the authenticity of FutureAI internship certificates. Enter a certificate ID to view student achievements and credentials.",
    url: "https://futureee.me/verify/",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FutureAI Certificate Verification Portal",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Certificate | FutureAI Internship",
    description: "Verify the authenticity of FutureAI internship certificates.",
    images: ["/og-image.png"],
  }
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
