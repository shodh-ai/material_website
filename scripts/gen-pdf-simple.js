const { mdToPdf } = require("md-to-pdf");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "../public/pdf");
const LOGO_PATH = path.join(__dirname, "../public/shodhai_logo.svg");

const svgContent = fs.readFileSync(LOGO_PATH, "utf-8");
const svgBase64 = Buffer.from(svgContent).toString("base64");
const logoDataUri = "data:image/svg+xml;base64," + svgBase64;

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

async function run() {
  for (const doc of docs) {
    console.log("Processing: " + doc.title);

    if (!fs.existsSync(doc.input)) {
      console.log("  Source not found: " + doc.input);
      continue;
    }

    const md = fs.readFileSync(doc.input, "utf-8");
    console.log("  Read " + md.length + " chars");

    const headerHtml = '<div style="width:100%;padding:20px 60px 10px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e5e7eb;font-size:9px;"><img src="' + logoDataUri + '" style="height:18px;"/><span style="color:#9ca3af;font-family:system-ui;letter-spacing:0.05em;text-transform:uppercase;">Confidential</span></div>';
    const footerHtml = '<div style="width:100%;padding:10px 60px 20px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e5e7eb;font-size:8px;color:#9ca3af;font-family:system-ui;"><span>Shodh AI</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>';

    try {
      const result = await mdToPdf(
        { content: md },
        {
          launch_options: { args: ["--no-sandbox"] },
          pdf_options: {
            format: "A4",
            margin: { top: "100px", bottom: "80px", left: "60px", right: "60px" },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: headerHtml,
            footerTemplate: footerHtml,
          },
          stylesheet: path.join(__dirname, "pdf-style.css"),
        }
      );

      if (result && result.content) {
        const outPath = path.join(OUTPUT_DIR, doc.output);
        fs.writeFileSync(outPath, result.content);
        console.log("  Written: " + outPath + " (" + Math.round(result.content.length / 1024) + " KB)");
      } else {
        console.log("  No PDF content returned");
      }
    } catch (err) {
      console.log("  Error: " + err.message);
    }
  }
  console.log("All done.");
}

run();
