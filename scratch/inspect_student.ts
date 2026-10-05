import { db } from "../src/lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

async function main() {
  console.log("[Diagnostic] Searching for student Rishwana Samsu...");
  try {
    const q = query(collection(db, "students"), where("email", "==", "rishwanasamsu@gmail.com"));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("[Diagnostic] No student record found for email: rishwanasamsu@gmail.com");
      
      // Let's do a general scan of first 10 students in database to see structure
      console.log("[Diagnostic] Scanning first 10 records...");
      const scanQ = query(collection(db, "students"));
      const scanSnapshot = await getDocs(scanQ);
      scanSnapshot.docs.slice(0, 10).forEach(doc => {
        console.log(`- ID: ${doc.id}, Name: ${doc.data().name}, Email: ${doc.data().email}, certId: ${doc.data().certificateId}`);
      });
      return;
    }
    
    querySnapshot.forEach((doc) => {
      console.log("[Diagnostic] Found Student Record!");
      console.log(`Document ID (UID): ${doc.id}`);
      console.log(JSON.stringify(doc.data(), null, 2));
    });
  } catch (err) {
    console.error("[Diagnostic] Error querying database:", err);
  }
}

main();
