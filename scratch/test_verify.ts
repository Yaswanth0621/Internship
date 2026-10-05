import { db } from "../src/lib/firebase/config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

async function verifyId(id: string) {
  console.log(`\n--- Verifying ID: ${id} ---`);
  try {
    // 1. Try to fetch by document ID
    const docRef = doc(db, "students", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.certificateId) {
        console.log(`Success: Found by Document ID!`);
        console.log(`Name: ${data.name}`);
        console.log(`Certificate ID: ${data.certificateId}`);
        return;
      }
    }

    // 2. Fallback: Search the students collection by the certificateId field
    const q = query(collection(db, "students"), where("certificateId", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      console.log(`Success: Found by Certificate ID fallback query!`);
      console.log(`Name: ${data.name}`);
      console.log(`Certificate ID: ${data.certificateId}`);
      return;
    }

    console.log(`Result: Certificate NOT found!`);
  } catch (err) {
    console.error(`Error verifying certificate:`, err);
  }
}

async function run() {
  // Test with Rishwana's certificateId
  await verifyId("FAI-MPJTP4EI-H2GWJA");
  // Test with Rishwana's UID
  await verifyId("H2GwJaDQeZTWLREtu4PUWoggfbv2");
}

run();
