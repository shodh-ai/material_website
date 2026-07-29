const { chromium } = require("playwright");
const path = require("path");

const url =
  process.env.INVESTOR_MEMO_URL ||
  "http://127.0.0.1:3001/investor-memo/";
const output = path.resolve(
  process.env.INVESTOR_MEMO_OUTPUT ||
    "output/pdf/shodh-investor-memo.pdf",
);

const PAGE_WIDTH_MM = 198;
const PAGE_HEIGHT_MM = 262;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1800 },
  });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });

  await page.addStyleTag({
    content: `
      @page {
        size: ${PAGE_WIDTH_MM}mm ${PAGE_HEIGHT_MM}mm;
        margin: 0;
      }
      html,
      body,
      .memo-shell {
        width: ${PAGE_WIDTH_MM}mm !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .memo-cover,
      .executive-spread {
        width: ${PAGE_WIDTH_MM}mm !important;
        height: ${PAGE_HEIGHT_MM}mm !important;
        margin: 0 !important;
      }
      .memo-section {
        width: ${PAGE_WIDTH_MM}mm !important;
        margin: 0 !important;
      }
    `,
  });

  await page.pdf({
    path: output,
    width: `${PAGE_WIDTH_MM}mm`,
    height: `${PAGE_HEIGHT_MM}mm`,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(output);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
