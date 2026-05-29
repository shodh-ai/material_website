const { mdToPdf } = require("md-to-pdf");
const fs = require("fs");
const path = require("path");

const LOGO_PATH = path.join(__dirname, "../public/shodhai_logo.svg");
const OUTPUT_DIR = path.join(__dirname, "../public/pdf");

const docs = [
  {
    input: path.join(__dirname, "../../GTM and 18 Month Sprint copy 3.md"),
    output: "The-Genesis-Protocol-2.0.pdf",
    title: "The Genesis Protocol 2.0",
  },
  {
    input: path.join(__dirname, "../../architecture doc copy 3.md"),
    output: "The-SkandaX-Protocol.pdf",
    title: "The SkandaX Protocol",
  },
];

const CSS = `
body { font-family: system-ui, -apple-system, sans-serif; color: #1f2937; line-height: 1.7; font-size: 11pt; }
h1 { font-size: 24pt; font-weight: 700; color: #111827; margin-top: 2em; margin-bottom: 0.5em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.3em; }
h2 { font-size: 18pt; font-weight: 600; color: #111827; margin-top: 1.8em; margin-bottom: 0.4em; border-bottom: 1px solid #f3f4f6; padding-bottom: 0.2em; }
h3 { font-size: 14pt; font-weight: 600; color: #1f2937; margin-top: 1.5em; margin-bottom: 0.3em; }
h4 { font-size: 11pt; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 1.3em; }
p { margin-bottom: 0.8em; color: #374151; }
strong { color: #111827; font-weight: 600; }
em { color: #6b7280; }
ul, ol { margin-bottom: 1em; padding-left: 1.5em; }
li { margin-bottom: 0.3em; color: #374151; }
blockquote { border-left: 3px solid #d1d5db; padding: 0.5em 1em; margin: 1em 0; background: #f9fafb; border-radius: 0 6px 6px 0; color: #6b7280; font-style: italic; }
table { width: 100%; border-collapse: collapse; margin: 1.2em 0; font-size: 10pt; }
thead th { background: #f9fafb; border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; font-weight: 600; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.03em; color: #6b7280; }
tbody td { border: 1px solid #e5e7eb; padding: 8px 12px; color: #374151; }
tbody tr:nth-child(even) { background: #fafafa; }
hr { border: none; border-top: 1px solid #e5e7eb; margin: 2em 0; }
code { background: #f3f4f6; padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.9em; }
a { color: #2563eb; text-decoration: none; }
`;

async function generatePDFs() {
  const svgContent = fs.readFileSync(LOGO_PATH, "utf-8");
  const svgBase64 = Buffer.from(svgContent).toString("base64");
  const logoDataUri = `data:image/svg+xml;base64,${svgBase64}`;

  for (const doc of docs) {
    process.stdout.write(`Generating ${doc.output} ... `);

    if (!fs.existsSync(doc.input)) {
      console.log("SKIP (source not found)");
      continue;
    }

    const mdContent = fs.readFileSync(doc.input, "utf-8");

    const pdf = await mdToPdf(
      { content: mdContent },
      {
        launch_options: { args: ["--no-sandbox"] },
        pdf_options: {
          format: "A4",
          margin: { top: "100px", bottom: "80px", left: "60px", right: "60px" },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: `<div style="width:100%;padding:20px 60px 10px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e5e7eb;font-size:9px;"><img src="${logoDataUri}" style="height:18px;"/><span style="color:#9ca3af;font-family:system-ui;letter-spacing:0.05em;text-transform:uppercase;">Confidential - Investor Data Room</span></div>`,
          footerTemplate: `<div style="width:100%;padding:10px 60px 20px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e5e7eb;font-size:8px;color:#9ca3af;font-family:system-ui;"><span>Shodh AI - ${doc.title}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
        },
        stylesheet: CSS,
      }
    ).catch((err) => { console.log("ERROR:", err.message); return null; });

    if (pdf && pdf.content) {
      const outputPath = path.join(OUTPUT_DIR, doc.output);
      fs.writeFileSync(outputPath, pdf.content);
      console.log(`OK (${(pdf.content.length / 1024).toFixed(0)} KB)`);
    }
  }
  console.log("Done!");
}

generatePDFs();
