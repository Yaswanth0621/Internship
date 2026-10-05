import { NextResponse } from "next/server";
import { adminDb, adminAuth, adminStorage } from "@/lib/firebase/admin";

export async function GET(
  request: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;


    // Check entitlement
    const entitlementId = `${userId}_${projectId}`;
    const entitlementDoc = await adminDb.collection("projects_marketplace/data/entitlements").doc(entitlementId).get();

    if (!entitlementDoc.exists) {
      return NextResponse.json({ error: "No entitlement found for this project" }, { status: 403 });
    }

    // Generate signed URL
    const bucket = adminStorage.bucket();
    const file = bucket.file(`projects/${projectId}/package.zip`);

    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ error: "Project files not available yet." }, { status: 404 });
    }

    // Create a 1 hour temporary signed URL
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 60 * 1000,
    });

    // Increment download count
    await adminDb.collection("projects_marketplace/data/entitlements").doc(entitlementId).update({
      downloadCount: (entitlementDoc.data()?.downloadCount || 0) + 1,
      lastDownload: new Date(),
    });

    return NextResponse.json({ downloadUrl: url });
  } catch (error: any) {
    console.error("Get download URL error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
