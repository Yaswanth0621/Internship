// Types for FutureAI Projects Marketplace

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  subcategory?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  isFinalYear: boolean;
  isFeatured: boolean;
  technologies: string[];
  tags: string[];
  price: number; // in INR
  originalPrice?: number;
  tier: "Starter" | "Professional" | "Premium";
  features: string[];
  includes: string[];
  learningOutcomes: string[];
  requirements: string[];
  modules: ProjectModule[];
  screenshots?: string[];
  demoUrl?: string;
  licenseType: "Personal Learning" | "Academic" | "Commercial";
  status: "draft" | "published";
  techStack: TechStack;
  architecture?: string;
  faqs?: FAQ[];
}

export interface ProjectModule {
  name: string;
  description: string;
  features?: string[];
}

export interface TechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  aiml?: string[];
  apis?: string[];
  deployment?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count?: number;
}

export interface ProjectPack {
  id: string;
  name: string;
  description: string;
  projects: string[]; // project slugs
  price: number;
  features: string[];
  badge?: string;
}

export interface Order {
  id: string;
  userId: string;
  projectId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  status: "created" | "paid" | "failed" | "refunded";
  createdAt: Date;
}

export interface Entitlement {
  id: string;
  userId: string;
  projectId: string;
  orderId: string;
  downloadCount: number;
  lastDownload?: Date;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  projectId: string;
  orderId: string;
  rating: number;
  review: string;
  userName: string;
  createdAt: Date;
}
