"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navigation from "@/components/Navigation";
import { 
  ShieldCheck, 
  Award, 
  Download, 
  Share2, 
  CheckCircle2, 
  Link2, 
  Globe,
  ExternalLink,
  Brain,
  Code2,
  Cpu,
  Zap,
  ArrowRight,
  TrendingUp,
  Rocket,
  Shield
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioClient({ username }: { username: string }) {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "students"), where("certificateId", "==", username));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setStudent(querySnapshot.docs[0].data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchStudent();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Verifying ID...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <meta name="robots" content="noindex, nofollow" />
        <Navigation />
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Credential Not Found</h1>
          <p className="text-gray-500 max-w-md text-lg">We couldn&apos;t find a verified portfolio matching this ID. Please ensure the link is correct.</p>
          <Link href="/" className="mt-8 btn-primary btn-lg">
            Return to Homepage <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-[100px]" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-indigo-50/50 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-200 transform group-hover:rotate-3 transition-transform">
                {student.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-2xl shadow-xl border border-gray-100">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                  <CheckCircle2 size={24} />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-extrabold uppercase tracking-widest border border-blue-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  Verified AI Professional
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
                {student.name}
              </h1>
              <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mb-8 leading-relaxed">
                Completed the <span className="text-blue-600 font-bold">FutureAI Micro-Internship</span>. 
                Expertise in Neural Networks, Computer Vision, and AI Deployment.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button 
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                    alert("Portfolio link copied to clipboard!");
                  }}
                  className="btn-primary btn-lg group cursor-pointer"
                >
                  <Share2 size={18} /> Share Profile
                </button>
                <button 
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
                  }}
                  className="btn-outline btn-lg cursor-pointer"
                >
                  <Link2 size={18} /> LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="relative py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="card-standard bg-white border-blue-100 p-0 overflow-hidden group">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-25/50">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Award className="text-blue-600" /> Verifiable Credential
                  </h3>
                  <span className="text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
                    ID: {student.certificateId}
                  </span>
                </div>
                
                <div className="relative aspect-[1.414/1] bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <div className="text-center p-12 transform group-hover:scale-105 transition-transform duration-500">
                    <div className="w-32 h-32 bg-white rounded-full shadow-2xl mx-auto flex items-center justify-center mb-6 border-8 border-blue-50">
                      <Image src="/logo.png" alt="FutureAI - Verified Corporate Seal" width={80} height={80} className="object-contain" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">AI Mastery Certification</h4>
                    <p className="text-gray-500 font-medium">Click below to view and download full-res certificate</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {student.certificateURL ? (
                      <a href={student.certificateURL} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg shadow-2xl">
                        <Download size={20} /> Download PDF (Verified)
                      </a>
                    ) : (
                      <button className="btn-primary btn-lg shadow-2xl opacity-50 cursor-not-allowed">
                        <Loader2 className="animate-spin" size={20} /> Generating...
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard 
                  icon={<Brain className="text-blue-600" />} 
                  title="Core AI Specialization"
                  desc="Verified competence in Supervised Learning, Deep Neural Networks, and Data Processing pipelines."
                />
                <InfoCard 
                  icon={<Zap className="text-indigo-600" />} 
                  title="Modern Tech Stack"
                  desc="Proficient in Python, TensorFlow, and MLOps frameworks. Ready for high-impact production roles."
                />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="card bg-white border-blue-50 p-8 shadow-xl shadow-blue-500/5">
                <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600" /> Skill Competency
                </h3>
                <div className="space-y-6">
                  <SkillItem name="Neural Networks" val="92%" />
                  <SkillItem name="Python for AI" val="98%" />
                  <SkillItem name="Computer Vision" val="85%" />
                  <SkillItem name="Generative AI" val="90%" />
                  <SkillItem name="Model Deployment" val="88%" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Shield size={120} />
                </div>
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Rocket size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Recruiter Insight</h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                    {student.name} has undergone a rigorous 1-week micro-internship focused on practical, deployable AI skills.
                  </p>
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">Issue Date</div>
                      <div className="font-bold">{student.approvedAt ? new Date(student.approvedAt).toLocaleDateString() : "April 2026"}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">Status</div>
                      <div className="text-green-400 font-bold">VERIFIED</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 text-center">
        <div className="container-custom">
           <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 grayscale opacity-30">
                <Image src="/logo.png" alt="Futureee AI Research Labs Logo" width={120} height={40} className="object-contain" />
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                FutureAI Verified Talent Network • 2026
              </p>
           </div>
        </div>
      </footer>
    </main>
  );
}

function InfoCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-[32px] bg-white border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-500/5 group">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function SkillItem({ name, val }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-gray-700">{name}</span>
        <span className="font-black text-blue-600">{val}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
          style={{ width: val }}
        />
      </div>
    </div>
  );
}

import { Loader2 } from "lucide-react";
