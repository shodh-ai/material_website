const { chromium } = require("playwright");
const path = require("path");

const url = process.env.INVESTOR_MEMO_URL || "http://127.0.0.1:3001/investor-memo/";
const output = path.resolve(
  process.env.INVESTOR_MEMO_OUTPUT ||
    "output/pdf/shodh-investor-memo-continuous.pdf",
);
const maxPageHeightPx = 18000;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "screen" });

  await page.addStyleTag({
    content: `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
      }
      body::before, body::after, .screen-header {
        display: none !important;
      }
      .memo-shell {
        margin: 0 !important;
        box-shadow: none !important;
      }
    `,
  });

  const dimensions = await page.evaluate(() => {
    const shell = document.querySelector(".memo-shell");
    const rect = shell.getBoundingClientRect();
    return {
      width: Math.ceil(rect.width),
      height: Math.ceil(shell.scrollHeight),
    };
  });

  const scale = Math.min(1, maxPageHeightPx / dimensions.height);
  const pdfWidth = Math.ceil(dimensions.width * scale);
  const pdfHeight = Math.ceil(dimensions.height * scale);

  await page.addStyleTag({
    content: `
      @page {
        size: ${pdfWidth}px ${pdfHeight}px;
        margin: 0;
      }
      html, body {
        width: ${pdfWidth}px !important;
        height: ${pdfHeight}px !important;
        overflow: hidden !important;
      }
      .memo-shell {
        zoom: ${scale};
      }
    `,
  });

  await page.pdf({
    path: output,
    width: `${pdfWidth}px`,
    height: `${pdfHeight}px`,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(
    JSON.stringify({
      output,
      sourceWidth: dimensions.width,
      sourceHeight: dimensions.height,
      scale,
      pdfWidth,
      pdfHeight,
    }),
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
