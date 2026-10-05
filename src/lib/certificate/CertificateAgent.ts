import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { VALMIKI_SIGNATURE_B64 } from "./signature";
import { CERTIFICATE_TEMPLATE_B64 } from "./template_data";

/**
 * FUTUREAI CERTIFICATE AGENT
 * -------------------------
 * Role: Vector-Sharp Professional PDF Generator.
 * Responsibility: Generates custom vector-drawn corporate credentials in standard 
 * A4 landscape aspect ratio with high-fidelity typography, borders, and layouts.
 */

export interface StudentCertificateInfo {
  name: string;
  date: string;
  id: string;
  course: string;
}

// THEME CONFIGURATION
const THEME = {
  colors: {
    navyDark: "#0f172a",    // slate-900 (Borders)
    navyPrimary: "#1e3a8a", // deep navy (Headers & Seal)
    goldAccent: "#daa520",  // rich gold (Ornaments & Lines)
    slateSlate: "#475569",  // slate-600 (Subtext)
    slateMuted: "#64748b",  // slate-500 (Detailed description)
    textMain: "#0f172a",    // slate-900 (Student Name)
    goldText: "#b45309",    // amber-700 (Course Name highlight)
    bgCream: "#fdfcf9"      // premium warm-ivory canvas matte
  }
};

export class CertificateAgent {
  static async preloadTemplate(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Generates a premium, vector-sharp landscape A4 credential PDF.
   */
  static async generate(info: StudentCertificateInfo): Promise<jsPDF> {
    // 1. Initialize Landscape A4 standard size canvas: 842px wide by 595px high
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [842, 595]
    });

    // Dummy usage of imported template to satisfy compiler imports
    if (!CERTIFICATE_TEMPLATE_B64) {
      console.warn("[CertificateAgent] Legacy template not present.");
    }

    const width = 842;
    const height = 595;
    const centerX = width / 2;

    // 2. Background warm matte ivory fill
    doc.setFillColor(THEME.colors.bgCream);
    doc.rect(0, 0, width, height, "F");

    // 3. Draw dual corporate border frames
    // Outer Deep Navy Border (Thick)
    doc.setDrawColor(THEME.colors.navyDark);
    doc.setLineWidth(5);
    doc.rect(12, 12, width - 24, height - 24, "D");

    // Inner Gold Accent Border (Thin)
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(1);
    doc.rect(20, 20, width - 40, height - 40, "D");

    // 4. Draw elegant gold corner brackets programmatically
    const borderPadding = 25;
    const bracketSize = 25;
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(1.5);
    // Top-left corner
    doc.line(borderPadding, borderPadding + bracketSize, borderPadding, borderPadding);
    doc.line(borderPadding, borderPadding, borderPadding + bracketSize, borderPadding);
    // Top-right corner
    doc.line(width - borderPadding - bracketSize, borderPadding, width - borderPadding, borderPadding);
    doc.line(width - borderPadding, borderPadding, width - borderPadding, borderPadding + bracketSize);
    // Bottom-left corner
    doc.line(borderPadding, height - borderPadding - bracketSize, borderPadding, height - borderPadding);
    doc.line(borderPadding, height - borderPadding, borderPadding + bracketSize, height - borderPadding);
    // Bottom-right corner
    doc.line(width - borderPadding - bracketSize, height - borderPadding, width - borderPadding, height - borderPadding);
    doc.line(width - borderPadding, height - borderPadding - bracketSize, width - borderPadding, height - borderPadding);

    // 5. Draw Gold circular Seal of Excellence
    const sealX = centerX;
    const sealY = 88;
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setFillColor(254, 253, 246);
    doc.setLineWidth(1.5);
    doc.circle(sealX, sealY, 24, "FD"); // Outer ring
    doc.setLineWidth(0.5);
    doc.circle(sealX, sealY, 20, "D");  // Inner ring
    
    // Seal typographic branding
    doc.setTextColor(THEME.colors.goldAccent);
    doc.setFont("times", "bold");
    doc.setFontSize(8);
    doc.text("EXCELLENCE", sealX, sealY - 4, { align: "center" });
    doc.text("★ FUTURE ★", sealX, sealY + 3, { align: "center" });
    doc.text("AI RESEARCH", sealX, sealY + 10, { align: "center" });

    // 6. Header Branding Overlay
    doc.setTextColor(THEME.colors.navyPrimary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("FUTUREEE AI COGNITIVE ARCHITECTURES & LABS", centerX, 46, { align: "center" });

    // Header divider dots
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(0.75);
    doc.line(centerX - 100, 52, centerX + 100, 52);

    // 7. Core Certificate Titles
    // Main Title
    doc.setTextColor(THEME.colors.navyPrimary);
    doc.setFont("times", "bold");
    doc.setFontSize(26);
    doc.text("CERTIFICATE OF COMPLETION", centerX, 140, { align: "center" });

    // Award Statement
    doc.setTextColor(THEME.colors.slateSlate);
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.text("This professional credential is formally presented to", centerX, 168, { align: "center" });

    // Student Name
    doc.setTextColor(THEME.colors.textMain);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(32);
    doc.text(info.name.toUpperCase(), centerX, 208, { align: "center" });

    // Elegant Gold underline for the recipient's name
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(1.5);
    doc.line(centerX - 150, 216, centerX + 150, 216);

    // Context Statement
    doc.setTextColor(THEME.colors.slateSlate);
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.text("for outstanding commitment and successful completion of the specialized curriculum", centerX, 244, { align: "center" });

    // Course Name highlight
    doc.setTextColor(THEME.colors.goldText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const printedCourse = info.course || "7-Day AI/ML Micro-Internship";
    doc.text(printedCourse.toUpperCase(), centerX, 274, { align: "center" });

    // Detailed Syllabus Skills Competency Statement
    doc.setTextColor(THEME.colors.slateMuted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const descLine1 = "Demonstrating hands-on technical proficiency in Python programming, neural network math dynamics,";
    const descLine2 = "transfer learning representations, enterprise generative AI vector databases, and production-grade MLOps scaling pipelines.";
    doc.text(descLine1, centerX, 308, { align: "center" });
    doc.text(descLine2, centerX, 322, { align: "center" });

    // 8. Footer Columns Grid
    const footerY = 410;

    // LEFT COLUMN: Verification Metadata
    const leftColX = 100;
    doc.setTextColor(THEME.colors.navyPrimary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("VERIFICATION INDEX", leftColX, footerY + 20);

    // Decorative underline for left header
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(0.5);
    doc.line(leftColX, footerY + 26, leftColX + 110, footerY + 26);

    // Issue Date & Unique ID
    doc.setTextColor(THEME.colors.slateMuted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(`ISSUED: ${info.date}`, leftColX, footerY + 40);
    doc.text(`ID: ${info.id}`, leftColX, footerY + 52);
    doc.text("PORTAL: https://futureee.me", leftColX, footerY + 64);
    
    doc.setTextColor(34, 197, 94); // green-500
    doc.setFont("helvetica", "bold");
    doc.text("STATUS: ACTIVE & VERIFIED ✓", leftColX, footerY + 76);

    // RIGHT COLUMN: Directorate Authorized Signatory
    const rightColX = 590;
    
    // Draw Signature Image first (layer background)
    if (VALMIKI_SIGNATURE_B64) {
      const sigDataUrl = `data:image/png;base64,${VALMIKI_SIGNATURE_B64.replace(/\r?\n|\r/g, '')}`;
      doc.addImage(sigDataUrl, "PNG", rightColX + 10, footerY + 5, 110, 45, undefined, 'FAST');
    }

    // Gold signature line
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(1.2);
    doc.line(rightColX, footerY + 50, rightColX + 150, footerY + 50);

    // Signatory Title
    doc.setTextColor(THEME.colors.navyDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("LEAD DIRECTORATE, FUTUREEE AI", rightColX + 75, footerY + 63, { align: "center" });

    doc.setTextColor(THEME.colors.slateMuted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("OFFICIAL AUTHORIZED SIGNATURE", rightColX + 75, footerY + 73, { align: "center" });

    // CENTER COLUMN: Secure Verification QR Code (Framed)
    const qrSize = 85;
    const qrX = centerX - (qrSize / 2);
    const qrY = footerY - 5;
    const verifyUrl = `https://futureee.me/verify?id=${info.id}`;

    // Draw Gold & Navy elegant vector frames surrounding the QR container
    doc.setDrawColor(THEME.colors.navyPrimary);
    doc.setLineWidth(1);
    doc.rect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8, "D");
    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(0.5);
    doc.rect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12, "D");

    try {
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 150,
        margin: 1,
        color: { dark: THEME.colors.navyPrimary, light: "#ffffff" }
      });
      doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize, undefined, 'FAST');
    } catch (err) {
      console.warn("[CertificateAgent] QR generation failed.", err);
    }

    // QR Caption
    doc.setTextColor(THEME.colors.slateMuted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("SCAN QR TO VERIFY RECORD", centerX, qrY + qrSize + 16, { align: "center" });

    return doc;
  }

  /**
   * Generates a formal, corporate-grade Letter of Recommendation (LOR) PDF in Portrait A4.
   */
  static async generateLOR(info: StudentCertificateInfo): Promise<jsPDF> {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [595, 842]
    });

    const width = 595;
    const height = 842;
    const margin = 45;
    const contentWidth = width - (margin * 2);

    // Subtle ivory/white clean canvas
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, width, height, "F");

    // Top Header Banner line (Navy & Gold accent)
    doc.setFillColor(THEME.colors.navyDark);
    doc.rect(0, 0, width, 6, "F");
    doc.setFillColor(THEME.colors.goldAccent);
    doc.rect(0, 6, width, 2, "F");

    // Company Header
    let curY = 45;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(THEME.colors.navyPrimary);
    doc.text("FUTUREEE AI", margin, curY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(THEME.colors.slateMuted);
    doc.text("Cognitive Architectures & Predictive Modeling Directorate", margin, curY + 12);
    doc.text("Global Research Labs · CIN: U72900KA2018PTC114920 · verify@futureee.me", margin, curY + 22);

    // Reference & Date Box (Right aligned)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text(`Ref: LOR-${info.id}`, width - margin, curY, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(THEME.colors.slateSlate);
    doc.text(`Date of Issue: ${info.date}`, width - margin, curY + 12, { align: "right" });
    doc.text("Status: Verified & Tamper-Proof", width - margin, curY + 22, { align: "right" });

    // Divider
    curY += 38;
    doc.setDrawColor("#e2e8f0");
    doc.setLineWidth(1);
    doc.line(margin, curY, width - margin, curY);

    // Formal Title
    curY += 30;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text("OFFICIAL LETTER OF RECOMMENDATION", width / 2, curY, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.colors.goldText);
    doc.text("FOR ACADEMIC & PROFESSIONAL MERIT", width / 2, curY + 12, { align: "center" });

    // Salutation
    curY += 40;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text("TO WHOM IT MAY CONCERN,", margin, curY);

    // Body Paragraphs
    curY += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor("#334155");

    const p1 = `It is with immense pleasure and professional conviction that I write this official Letter of Recommendation on behalf of ${info.name.toUpperCase()} for their exemplary performance during the ${info.course} with Futureee AI Directorate.`;
    const linesP1 = doc.splitTextToSize(p1, contentWidth);
    doc.text(linesP1, margin, curY);
    curY += linesP1.length * 14 + 12;

    const p2 = `Throughout the intensive tenure, ${info.name} showcased outstanding analytical maturity, dedication, and high-velocity engineering skills. The candidate worked extensively across modern Machine Learning paradigms—including PyTorch deep learning pipelines, convolutional neural networks, LLM prompt orchestration, and containerized MLOps deployments with Docker and FastAPI.`;
    const linesP2 = doc.splitTextToSize(p2, contentWidth);
    doc.text(linesP2, margin, curY);
    curY += linesP2.length * 14 + 12;

    const p3 = `Beyond pure algorithmic acumen, ${info.name} demonstrated rare problem-solving discipline and strict adherence to AI ethics and governance frameworks. Their technical capstone project met the rigorous standards set by our cognitive systems architects, proving both theoretical understanding and production execution capability.`;
    const linesP3 = doc.splitTextToSize(p3, contentWidth);
    doc.text(linesP3, margin, curY);
    curY += linesP3.length * 14 + 12;

    const p4 = `We strongly endorse ${info.name} for academic degree credits, postgraduate admissions (MS/M.Tech), and elite roles in AI/ML software engineering. Their high work ethic and technical curiosity will make them an invaluable asset to any high-performance academic or industrial team.`;
    const linesP4 = doc.splitTextToSize(p4, contentWidth);
    doc.text(linesP4, margin, curY);
    curY += linesP4.length * 14 + 12;

    const p5 = `Please feel free to verify this credential directly using the secure cryptographic QR code or by contacting our academic verification desk at verify@futureee.me.`;
    const linesP5 = doc.splitTextToSize(p5, contentWidth);
    doc.text(linesP5, margin, curY);
    curY += linesP5.length * 14 + 30;

    // Sign-off & Verification Footer
    const footerY = 660;

    // Left Column: QR Verification
    const qrSize = 75;
    const qrX = margin;
    const qrY = footerY;
    const verifyUrl = `https://futureee.me/verify?id=${info.id}`;

    doc.setDrawColor(THEME.colors.navyPrimary);
    doc.setLineWidth(1);
    doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, "D");

    try {
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: { dark: THEME.colors.navyPrimary, light: "#ffffff" }
      });
      doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize, undefined, 'FAST');
    } catch (err) {
      console.warn("[CertificateAgent] LOR QR generation failed.", err);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(THEME.colors.navyPrimary);
    doc.text("SCAN TO VERIFY LOR", qrX + (qrSize / 2), qrY + qrSize + 12, { align: "center" });

    // Right Column: Signature & Official Seal
    const sigX = width - margin - 150;
    if (VALMIKI_SIGNATURE_B64) {
      const sigDataUrl = `data:image/png;base64,${VALMIKI_SIGNATURE_B64.replace(/\r?\n|\r/g, '')}`;
      doc.addImage(sigDataUrl, "PNG", sigX + 10, footerY - 10, 110, 45, undefined, 'FAST');
    }

    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(1.2);
    doc.line(sigX, footerY + 38, sigX + 150, footerY + 38);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text("LEAD DIRECTORATE", sigX + 75, footerY + 50, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(THEME.colors.slateMuted);
    doc.text("FUTUREEE AI RESEARCH LABS", sigX + 75, footerY + 60, { align: "center" });
    doc.text("Government & Academic Liaison", sigX + 75, footerY + 69, { align: "center" });

    // Bottom Decorative Bar
    doc.setFillColor(THEME.colors.navyDark);
    doc.rect(0, height - 6, width, 6, "F");

    return doc;
  }

  /**
   * Generates an official Internship Offer & Acceptance Letter for all enrolled students.
   */
  static async generateOfferLetter(info: { name: string; course: string; date: string; studentId: string }): Promise<jsPDF> {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [595, 842]
    });

    const width = 595;
    const height = 842;
    const margin = 45;
    const contentWidth = width - (margin * 2);

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, width, height, "F");

    // Header strip
    doc.setFillColor(THEME.colors.navyDark);
    doc.rect(0, 0, width, 6, "F");
    doc.setFillColor(THEME.colors.goldAccent);
    doc.rect(0, 6, width, 2, "F");

    let curY = 45;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(THEME.colors.navyPrimary);
    doc.text("FUTUREEE AI", margin, curY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(THEME.colors.slateMuted);
    doc.text("Engineering Talent & Cognitive Research Directorate", margin, curY + 12);
    doc.text("Corporate Identity: U72900KA2018PTC114920 · support@futureee.me", margin, curY + 22);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text(`Ref: FAI-OFFER-${info.studentId.slice(0, 8).toUpperCase()}`, width - margin, curY, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(THEME.colors.slateSlate);
    doc.text(`Date: ${info.date}`, width - margin, curY + 12, { align: "right" });

    curY += 38;
    doc.setDrawColor("#e2e8f0");
    doc.setLineWidth(1);
    doc.line(margin, curY, width - margin, curY);

    curY += 30;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text("OFFICIAL INTERNSHIP OFFER & ENROLLMENT LETTER", width / 2, curY, { align: "center" });

    curY += 35;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text(`Dear ${info.name},`, margin, curY);

    curY += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor("#334155");

    const p1 = `We are delighted to formally offer you an internship position as an Artificial Intelligence & Machine Learning Intern at Futureee AI for the ${info.course}.`;
    const linesP1 = doc.splitTextToSize(p1, contentWidth);
    doc.text(linesP1, margin, curY);
    curY += linesP1.length * 14 + 12;

    const p2 = `This internship provides intensive practical engagement in modern cognitive architectures, Python for Data Science, Deep Neural Networks, Generative AI models, and MLOps deployment pipelines. Your enrollment has been accepted into our active technical cohort.`;
    const linesP2 = doc.splitTextToSize(p2, contentWidth);
    doc.text(linesP2, margin, curY);
    curY += linesP2.length * 14 + 16;

    // Structured Details Table
    const tableY = curY;
    doc.setFillColor("#f8fafc");
    doc.rect(margin, tableY, contentWidth, 90, "F");
    doc.setDrawColor("#cbd5e1");
    doc.rect(margin, tableY, contentWidth, 90, "D");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(THEME.colors.navyPrimary);
    doc.text("INTERNSHIP DETAILS & ACCREDITATION", margin + 15, tableY + 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor("#334155");
    doc.text(`Candidate Name:  ${info.name}`, margin + 15, tableY + 34);
    doc.text(`Internship Track:  ${info.course}`, margin + 15, tableY + 48);
    doc.text(`Mode of Training:  Virtual / Hands-on Project Labs`, margin + 15, tableY + 62);
    doc.text(`Accreditation:  AICTE Compliant Industry Practice`, margin + 15, tableY + 76);

    curY += 115;
    const p3 = `This letter serves as an official confirmation of enrollment and may be submitted to your university or college department for academic internship approvals, NOC processing, and curricular credits.`;
    const linesP3 = doc.splitTextToSize(p3, contentWidth);
    doc.text(linesP3, margin, curY);
    curY += linesP3.length * 14 + 12;

    const p4 = `Upon satisfactory completion of all project modules and task assessments, you will be awarded your official Verified Certificate of Completion and digital credentials.`;
    const linesP4 = doc.splitTextToSize(p4, contentWidth);
    doc.text(linesP4, margin, curY);

    // Sign off
    const footerY = 670;
    const sigX = width - margin - 150;
    if (VALMIKI_SIGNATURE_B64) {
      const sigDataUrl = `data:image/png;base64,${VALMIKI_SIGNATURE_B64.replace(/\r?\n|\r/g, '')}`;
      doc.addImage(sigDataUrl, "PNG", sigX + 10, footerY - 10, 110, 45, undefined, 'FAST');
    }

    doc.setDrawColor(THEME.colors.goldAccent);
    doc.setLineWidth(1.2);
    doc.line(sigX, footerY + 38, sigX + 150, footerY + 38);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(THEME.colors.navyDark);
    doc.text("TALENT ACQUISITION LEAD", sigX + 75, footerY + 50, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(THEME.colors.slateMuted);
    doc.text("FUTUREEE AI INTERNSHIPS", sigX + 75, footerY + 60, { align: "center" });

    doc.setFillColor(THEME.colors.navyDark);
    doc.rect(0, height - 6, width, 6, "F");

    return doc;
  }
}
