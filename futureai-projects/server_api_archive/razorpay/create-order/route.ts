import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { adminDb, adminAuth } from "@/lib/firebase/admin";
import { PROJECTS } from "@/lib/projects-data";

export async function POST(request: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "dummy_key",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret",
    });

    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { projectId } = await request.json();
    const project = PROJECTS.find((p) => p.id === projectId);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Amount in paise
    const amount = project.price * 100;

    const options = {
      amount,
      currency: "INR",
      receipt: `rcpt_${userId.substring(0, 5)}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Save order to Firestore
    await adminDb.collection("projects_marketplace/data/orders").doc(order.id).set({
      userId,
      projectId,
      amount: order.amount,
      status: "created",
      createdAt: new Date(),
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
