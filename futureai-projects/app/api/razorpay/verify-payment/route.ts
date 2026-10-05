import { NextResponse } from "next/server";
import crypto from "crypto";
import { adminDb, adminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { orderId, paymentId, signature } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    
    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update order status
    await adminDb.collection("projects_marketplace/data/orders").doc(orderId).update({
      status: "paid",
      razorpayPaymentId: paymentId,
      updatedAt: new Date(),
    });

    // Create entitlement
    const orderDoc = await adminDb.collection("projects_marketplace/data/orders").doc(orderId).get();
    const orderData = orderDoc.data();

    if (orderData) {
      const entitlementId = `${userId}_${orderData.projectId}`;
      await adminDb.collection("projects_marketplace/data/entitlements").doc(entitlementId).set({
        userId,
        projectId: orderData.projectId,
        orderId,
        downloadCount: 0,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
