import { CertificateAgent } from "../src/lib/certificate/CertificateAgent";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("[Script] Generating PDF for Rishwana S...");
  try {
    const pdfDoc = await CertificateAgent.generate({
      name: "RISHWANA S",
      course: "AI/ML Intensive Internship",
      date: "May 24, 2026",
      id: "FAI-MPJTP4EI-H2GWJA"
    });

    // Output PDF raw array buffer and write to file
    const pdfOutput = pdfDoc.output("arraybuffer");
    const buffer = Buffer.from(pdfOutput);

    const artifactDir = "C:\\Users\\yaswanth\\.gemini\\antigravity-ide\\brain\\64b322df-114f-4c58-ad18-2eefed120e5a";
    const outputPath = path.join(artifactDir, "Rishwana_S_Certificate.pdf");

    fs.writeFileSync(outputPath, buffer);
    console.log(`[Script] Certificate successfully generated and saved to: ${outputPath}`);
  } catch (err) {
    console.error("[Script] Error generating certificate:", err);
  }
}

main();
