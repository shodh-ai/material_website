// Social preview for a reading guide: the chart previews of the papers it collects.
// usage: swift scripts/research/social_guide.swift <title> <out.png> <chart.png>...
import AppKit
import CoreText
let a = Array(CommandLine.arguments.dropFirst())
let (title, out, charts) = (a[0], a[1], Array(a.dropFirst(2)))
CTFontManagerRegisterFontsForURL(URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/public/shodh-new/Syne/Syne-VariableFont_wght.ttf") as CFURL, .process, nil)
func font(_ s: CGFloat, bold: Bool = false) -> NSFont { let f = NSFont(name: "Syne", size: s) ?? .systemFont(ofSize: s); return bold ? NSFontManager.shared.convert(f, toHaveTrait: .boldFontMask) : f }
let W = 1200, H = 630
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: W, pixelsHigh: H, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
NSColor(srgbRed: 0.95, green: 0.96, blue: 0.98, alpha: 1).setFill(); NSBezierPath(rect: NSRect(x: 0, y: 0, width: W, height: H)).fill()
NSColor(srgbRed: 0.004, green: 0.02, blue: 0.043, alpha: 1).setFill(); NSBezierPath(rect: NSRect(x: 0, y: 0, width: 14, height: H)).fill()
let accent = NSColor(srgbRed: 0.28, green: 0.44, blue: 0.61, alpha: 1), ink = NSColor(srgbRed: 0, green: 0, blue: 0.26, alpha: 1), muted = NSColor(srgbRed: 0.28, green: 0.35, blue: 0.45, alpha: 1)
("SHODH AI · RESEARCH" as NSString).draw(at: NSPoint(x: 60, y: H - 60), withAttributes: [.font: font(19), .foregroundColor: accent])
(title as NSString).draw(at: NSPoint(x: 60, y: H - 104), withAttributes: [.font: font(30, bold: true), .foregroundColor: ink])
// Up to three thumbnails per row, centred.
let tw: CGFloat = 340, th: CGFloat = 178.5, gap: CGFloat = 24
let rows = stride(from: 0, to: charts.count, by: 3).map { Array(charts[$0..<min($0 + 3, charts.count)]) }
for (ri, row) in rows.enumerated() {
    let rowW = CGFloat(row.count) * tw + CGFloat(row.count - 1) * gap
    for (ci, f) in row.enumerated() {
        guard let img = NSImage(contentsOfFile: f) else { continue }
        let r = NSRect(x: (CGFloat(W) - rowW) / 2 + CGFloat(ci) * (tw + gap), y: CGFloat(H) - 140 - CGFloat(ri + 1) * th - CGFloat(ri) * gap, width: tw, height: th)
        NSColor(white: 0, alpha: 0.12).setFill(); NSBezierPath(roundedRect: r.offsetBy(dx: 0, dy: -3), xRadius: 8, yRadius: 8).fill()
        NSGraphicsContext.saveGraphicsState(); NSBezierPath(roundedRect: r, xRadius: 8, yRadius: 8).addClip(); img.draw(in: r); NSGraphicsContext.restoreGraphicsState()
    }
}
("Charts from the \(charts.count) papers in this reading guide" as NSString).draw(at: NSPoint(x: 60, y: 30), withAttributes: [.font: font(20), .foregroundColor: ink])
let site = "shodh.ai/research" as NSString, attrs: [NSAttributedString.Key: Any] = [.font: font(19), .foregroundColor: muted]
site.draw(at: NSPoint(x: 1140 - site.size(withAttributes: attrs).width, y: 32), withAttributes: attrs)
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
print(out)
