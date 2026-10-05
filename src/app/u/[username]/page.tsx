import PortfolioClient from "./PortfolioClient";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Metadata } from "next";

export const generateStaticParams = () => {
  return [{ username: "verify" }];
};

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const username = params?.username;
  let studentName = "Student";
  let courseName = "AI/ML Internship";
  let exists = false;
  
  if (username && username !== "verify") {
    try {
      const q = query(collection(db, "students"), where("certificateId", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        studentName = data.name || studentName;
        courseName = data.course || courseName;
        exists = true;
      }
    } catch (err) {
      console.error("Error generating portfolio metadata:", err);
    }
  }
  
  return {
    title: `${studentName} | Verified AI/ML Portfolio & Certificate`,
    description: `View the official verified FutureAI ${courseName} completion certificate and technical portfolio for ${studentName}.`,
    robots: exists ? "index, follow" : "noindex, nofollow",
    alternates: {
      canonical: `https://futureee.me/u/${username}/`,
    },
    openGraph: {
      title: `${studentName} - Verified AI Professional`,
      description: `Officially issued by Futureee AI Research Labs. Discover the verified AI & ML milestones completed by ${studentName}.`,
      type: "profile",
      url: `https://futureee.me/u/${username}/`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${studentName}'s Verified FutureAI Portfolio`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${studentName} | Verified AI/ML Portfolio & Certificate`,
      description: `View the official verified FutureAI ${courseName} completion certificate for ${studentName}.`,
      images: ["/og-image.png"],
    }
  };
}

export default function StudentPortfolioPage({ params }: { params: { username: string } }) {
  return <PortfolioClient username={params.username} />;
}
