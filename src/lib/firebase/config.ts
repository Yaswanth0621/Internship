import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXt2Uy3EKiXE2XSbnCtc6RVK_PvifLlzY",
  authDomain: "intership-8083d.firebaseapp.com",
  projectId: "intership-8083d",
  storageBucket: "intership-8083d.firebasestorage.app",
  messagingSenderId: "310778937554",
  appId: "1:310778937554:web:c51dba1b695f1455552d0b",
  measurementId: "G-H2DQG6VC6K"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics is only supported in browser environments
export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

export { app, auth, db, storage };
