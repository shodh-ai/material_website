// Build a 1200×630 social preview (og:image) from a figure or table inside a paper PDF.
//
// usage: swift scripts/research/social_figure.swift <paper.pdf> <caption> <above|below> <label> <out.png>
//   caption  start of the caption line to locate, e.g. "Figure 1" or "Table 1"
//   above    the graphic sits above its caption (usual for figures)
//   below    the graphic sits below its caption (usual for tables)
//   label    footer text, e.g. "Figure 1 · Short paper title"
//
// macOS only (PDFKit + AppKit). The graphic is cropped from the manuscript itself,
// so the preview shows the paper's own content; nothing is redrawn or re-plotted.
import AppKit
import CoreText
import Foundation
import PDFKit

let args = CommandLine.arguments
guard args.count == 6 else {
    FileHandle.standardError.write("usage: social_figure.swift <pdf> <caption> <above|below> <label> <out.png>\n".data(using: .utf8)!)
    exit(2)
}
let (pdfPath, caption, direction, label, outPath) = (args[1], args[2], args[3], args[4], args[5])

func fail(_ message: String) -> Never {
    FileHandle.standardError.write("\(pdfPath): \(message)\n".data(using: .utf8)!)
    exit(1)
}

guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else { fail("cannot open PDF") }

// 1. Find the caption line itself (not an in-text reference such as "see Figure 1").
var found: (PDFPage, CGRect)?
for sel in doc.findString(caption, withOptions: []) {
    guard let page = sel.pages.first, let line = sel.copy() as? PDFSelection else { continue }
    line.extendForLineBoundaries()
    let text = (line.string ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
    guard text.hasPrefix(caption) else { continue }
    // Accept "Figure 1:", "Figure 1." and "Fig. 1 |" style labels.
    let next = text.dropFirst(caption.count).drop { $0 == " " }.first
    guard next == ":" || next == "." || next == "|" else { continue }
    found = (page, line.bounds(for: page))
    break
}
guard let (page, captionRect) = found else { fail("caption \"\(caption)\" not found") }

// 2. Work out the text column and where body text resumes around the graphic.
let crop = page.bounds(for: .cropBox)
let lines: [(rect: CGRect, text: String)] = (page.selection(for: crop)?.selectionsByLine() ?? []).compactMap {
    let r = $0.bounds(for: page)
    let t = ($0.string ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
    return r.width > 1 && !t.isEmpty ? (r, t) : nil
}
let textLeft = lines.map { $0.rect.minX }.min() ?? crop.minX + 54
let textRight = lines.map { $0.rect.maxX }.max() ?? crop.maxX - 54
let textWidth = textRight - textLeft
let narrowLines = lines.filter { $0.rect.width < textWidth * 0.55 && $0.text.count > 40 }.count
let twoColumn = narrowLines > lines.count / 3
var colLeft = textLeft, colRight = textRight
// A narrow caption off to one side means a two-column page or a figure that text
// wraps around; either way the graphic sits in that half. A centred caption keeps
// the full text width.
let mid = (textLeft + textRight) / 2
if captionRect.width < textWidth * 0.55 && (twoColumn || abs(captionRect.midX - mid) > textWidth * 0.12) {
    if captionRect.midX < mid { colRight = mid - 4 } else { colLeft = mid + 4 }
}
let colWidth = colRight - colLeft
// Lines covering most of the column, including full-width lines, can bound the graphic.
let inColumn = lines.filter { min($0.rect.maxX, colRight) - max($0.rect.minX, colLeft) > colWidth * 0.5 }
func isBody(_ l: (rect: CGRect, text: String)) -> Bool { l.rect.width >= colWidth * 0.72 && l.text.count >= 45 }

// PDF space has its origin at the bottom left, so "above" means larger y.
var region: CGRect
if direction == "above" {
    let candidates = inColumn.filter { $0.rect.minY > captionRect.maxY + 1 }.sorted { $0.rect.minY < $1.rect.minY }
    var top = crop.maxY - 40
    for i in candidates.indices where i + 1 < candidates.count && isBody(candidates[i]) && isBody(candidates[i + 1]) {
        top = candidates[i].rect.minY - 2
        break
    }
    region = CGRect(x: colLeft - 6, y: captionRect.maxY + 2, width: colWidth + 12, height: top - captionRect.maxY - 2)
} else {
    let candidates = inColumn.filter { $0.rect.maxY < captionRect.minY - 1 }.sorted { $0.rect.maxY > $1.rect.maxY }
    var bottom = crop.minY + 40
    for i in candidates.indices where i + 1 < candidates.count && isBody(candidates[i]) && isBody(candidates[i + 1]) {
        bottom = candidates[i].rect.maxY + 2
        break
    }
    region = CGRect(x: colLeft - 6, y: bottom, width: colWidth + 12, height: captionRect.minY - 2 - bottom)
}
guard region.width > 40, region.height > 40 else { fail("graphic region too small (\(region))") }

// 3. Render that region of the page at high resolution on white.
let scale: CGFloat = 4
let pw = Int(region.width * scale), ph = Int(region.height * scale)
let rgb = CGColorSpaceCreateDeviceRGB()
guard let ctx = CGContext(data: nil, width: pw, height: ph, bitsPerComponent: 8, bytesPerRow: pw * 4, space: rgb,
                          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { fail("no bitmap context") }
ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
ctx.fill(CGRect(x: 0, y: 0, width: pw, height: ph))
ctx.scaleBy(x: scale, y: scale)
ctx.translateBy(x: -region.minX, y: -region.minY)
page.draw(with: .cropBox, to: ctx)
// Blank out body text from the neighbouring column (or text wrapped beside the figure).
ctx.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
for l in lines where !(l.rect.midX > colLeft && l.rect.midX < colRight) && l.rect.intersects(region) {
    ctx.fill(l.rect.insetBy(dx: -1, dy: -1))
}
guard let rendered = ctx.makeImage(), let data = ctx.data else { fail("render failed") }

// 4. Trim the white margin around the graphic.
let px = data.bindMemory(to: UInt8.self, capacity: pw * ph * 4)
var minX = pw, minY = ph, maxX = -1, maxY = -1
for y in 0..<ph {
    for x in 0..<pw {
        let o = (y * pw + x) * 4
        if px[o] < 235 || px[o + 1] < 235 || px[o + 2] < 235 {
            minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y)
        }
    }
}
guard maxX > minX, maxY > minY else { fail("region is blank") }
let pad = 12
let trim = CGRect(x: max(0, minX - pad), y: max(0, minY - pad),
                  width: min(pw, maxX + pad) - max(0, minX - pad), height: min(ph, maxY + pad) - max(0, minY - pad))
guard let graphic = rendered.cropping(to: trim) else { fail("crop failed") }

// 5. Compose the 1200×630 card: brand line, the graphic, and a footer label.
let fontURL = URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/public/shodh-new/Syne/Syne-VariableFont_wght.ttf")
CTFontManagerRegisterFontsForURL(fontURL as CFURL, .process, nil)
func font(_ size: CGFloat) -> NSFont { NSFont(name: "Syne", size: size) ?? NSFont.systemFont(ofSize: size) }
let W = 1200, H = 630
guard let card = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4, space: rgb,
                           bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { fail("no card context") }
card.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
card.fill(CGRect(x: 0, y: 0, width: W, height: H))
card.setFillColor(CGColor(red: 0.004, green: 0.02, blue: 0.043, alpha: 1)) // brand navy rail
card.fill(CGRect(x: 0, y: 0, width: 14, height: H))
let area = CGRect(x: 60, y: 96, width: 1080, height: 440) // graphic area, measured from the bottom
let fit = min(area.width / CGFloat(graphic.width), area.height / CGFloat(graphic.height))
let gw = CGFloat(graphic.width) * fit, gh = CGFloat(graphic.height) * fit
card.interpolationQuality = .high
card.draw(graphic, in: CGRect(x: area.midX - gw / 2, y: area.midY - gh / 2, width: gw, height: gh))
card.setFillColor(CGColor(red: 0.86, green: 0.89, blue: 0.93, alpha: 1))
card.fill(CGRect(x: 60, y: 78, width: 1080, height: 1))

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(cgContext: card, flipped: false)
let accent = NSColor(srgbRed: 0.28, green: 0.44, blue: 0.61, alpha: 1)
let ink = NSColor(srgbRed: 0, green: 0, blue: 0.26, alpha: 1)
let muted = NSColor(srgbRed: 0.28, green: 0.35, blue: 0.45, alpha: 1)
("SHODH AI · RESEARCH" as NSString).draw(at: CGPoint(x: 60, y: H - 62), withAttributes: [.font: font(19), .foregroundColor: accent, .kern: 1.6])
let site = "shodh.ai/research" as NSString
let siteAttrs: [NSAttributedString.Key: Any] = [.font: font(19), .foregroundColor: muted]
site.draw(at: CGPoint(x: 1140 - site.size(withAttributes: siteAttrs).width, y: 36), withAttributes: siteAttrs)
let para = NSMutableParagraphStyle(); para.lineBreakMode = .byTruncatingTail
(label as NSString).draw(in: CGRect(x: 60, y: 30, width: 860, height: 32),
                         withAttributes: [.font: font(22), .foregroundColor: ink, .paragraphStyle: para])
NSGraphicsContext.restoreGraphicsState()

guard let out = card.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: outPath) as CFURL, "public.png" as CFString, 1, nil) else { fail("cannot write PNG") }
CGImageDestinationAddImage(dest, out, nil)
guard CGImageDestinationFinalize(dest) else { fail("cannot write PNG") }
print("\(outPath): \(caption) on page \((doc.index(for: page)) + 1), graphic \(graphic.width)×\(graphic.height)px")
