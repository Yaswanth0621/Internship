import JSZip from "jszip";
import { Project } from "./types";
import { generateProjectKit } from "./project-kits-data";

export async function generateAndDownloadProjectZip(project: Project): Promise<void> {
  const kit = generateProjectKit(project);
  const zip = new JSZip();

  // Root folder named after project slug
  const root = zip.folder(`${project.slug}-complete-kit`);
  if (!root) throw new Error("Failed to initialize zip directory");

  // 1. Add all starter source files and directory structure
  for (const file of kit.starterSourceFiles) {
    root.file(file.path, file.content);
  }

  // 2. Add full academic documents in docs/ folder
  const docsFolder = root.folder("academic_deliverables");
  if (docsFolder) {
    docsFolder.file("01_IEEE_Project_Report.md", `${kit.abstract}\n\n${kit.problemStatement}\n\n${kit.srsDocument}`);
    docsFolder.file("02_Software_Requirements_Specification_SRS.md", kit.srsDocument);
    docsFolder.file(
      "03_Architecture_and_UML_Diagrams.md",
      `# System Architecture & UML Specification\n\n## Overview\n${kit.architectureDiagrams.overview}\n\n## 1. System Architecture\n\`\`\`mermaid\n${kit.architectureDiagrams.systemArchitecture}\n\`\`\`\n\n## 2. Level 0 DFD\n\`\`\`mermaid\n${kit.architectureDiagrams.dfdLevel0}\n\`\`\`\n\n## 3. Sequence Diagram\n\`\`\`mermaid\n${kit.architectureDiagrams.sequenceDiagram}\n\`\`\``
    );
    docsFolder.file(
      "04_Top_25_Viva_Voce_Questions_and_Answers.md",
      `# Top 25 Viva Voce Questions & Answers\n\n${kit.vivaQuestions
        .map(
          (q) => `### Q${q.id}. ${q.question}
**Category:** ${q.category}
**Model Answer:** ${q.answer}
> **Examiner Tip:** ${q.examinerTip}
`
        )
        .join("\n\n")}`
    );
    docsFolder.file(
      "05_Presentation_Deck_30_Slides_Outline.md",
      `# 30-Slide Presentation Deck Outline with Speaker Notes\n\n${kit.pptOutline
        .map(
          (s) => `### Slide ${s.slideNo}: ${s.title}
${s.bullets.map((b) => `- ${b}`).join("\n")}

*Speaker Notes:* ${s.speakerNotes}
`
        )
        .join("\n\n")}`
    );
    docsFolder.file("06_Installation_and_Deployment_Guide.md", kit.installationGuide);
    docsFolder.file(
      "07_API_Documentation.md",
      `# API Documentation\n\n${kit.apiDocs
        .map(
          (a) => `### ${a.method} ${a.endpoint}
${a.summary}

**Request:**
\`\`\`json
${a.requestBody}
\`\`\`

**Response:**
\`\`\`json
${a.responseBody}
\`\`\`
`
        )
        .join("\n\n")}`
    );
    docsFolder.file(
      "08_Resume_and_LinkedIn_Portfolio_Writeup.md",
      `# Professional Career Deliverables\n\n## ATS Resume Bullet Points\n${kit.resumeBullets.map((b) => `- ${b}`).join("\n")}\n\n## LinkedIn Portfolio Post\n\`\`\`\n${kit.linkedInWriteup}\n\`\`\``
    );
    docsFolder.file("09_Codebase_Walkthrough.md", kit.codeWalkthrough);
    docsFolder.file(
      "10_Literature_Survey_Matrix.md",
      `# Literature Survey & Comparative Analysis\n\n${kit.literatureSurvey
        .map(
          (l, i) => `### [${i + 1}] ${l.title} (${l.year})
- **Authors:** ${l.authors}
- **Methodology:** ${l.methodology}
- **Limitations:** ${l.limitations}
`
        )
        .join("\n\n")}`
    );
  }

  // 3. Add database schemas in database/ folder
  const dbFolder = root.folder("database");
  if (dbFolder) {
    dbFolder.file("schema.sql", kit.databaseSchema.sqlScript);
    dbFolder.file("seed.json", kit.databaseSchema.seedJson);
  }

  // 4. Generate the ZIP blob
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  // 5. Trigger download in browser
  const downloadUrl = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = `${project.slug}-complete-project-kit.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
