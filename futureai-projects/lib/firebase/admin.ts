import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

let adminDb: any;
let adminAuth: any;
let adminStorage: any;

if (!getApps().length) {
  try {
    if (process.env.FIREBASE_ADMIN_PROJECT_ID) {
      const serviceAccount = {
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      };

      initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

      adminDb = getFirestore();
      adminAuth = getAuth();
      adminStorage = getStorage();
    }
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
} else {
  adminDb = getFirestore();
  adminAuth = getAuth();
  adminStorage = getStorage();
}

export { adminDb, adminAuth, adminStorage };
