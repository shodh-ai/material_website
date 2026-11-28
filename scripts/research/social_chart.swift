// Draw 1200×630 social previews (og:image) as bar charts of numbers taken verbatim
// from a paper's own table, for papers that contain no figures.
//
// usage: swift scripts/research/social_chart.swift <specs.json> <out-dir>
// specs.json: [{"id", "table", "chartTitle", "valueLabel", "scale": "linear"|"log",
//               "categories": [...], "series": [{"name", "values": ["0.0554", ...]}],
//               "footer": "Plotted from Table 2 · Short paper title"}]
// Values are kept as the paper's strings; they are only parsed to size the bars,
// and printed rounded to 4 significant figures. macOS only (AppKit).
import AppKit
import CoreText
import Foundation

struct Series: Decodable { let name: String; let values: [String] }
struct Spec: Decodable {
    let id: String, table: String, chartTitle: String, valueLabel: String, scale: String
    let categories: [String], series: [Series], footer: String
}

let args = CommandLine.arguments
guard args.count == 3 else { print("usage: social_chart.swift <specs.json> <out-dir>"); exit(2) }
let specs = try JSONDecoder().decode([Spec].self, from: Data(contentsOf: URL(fileURLWithPath: args[1])))
let outDir = args[2]

CTFontManagerRegisterFontsForURL(URL(fileURLWithPath: FileManager.default.currentDirectoryPath + "/public/shodh-new/Syne/Syne-VariableFont_wght.ttf") as CFURL, .process, nil)
func font(_ size: CGFloat, bold: Bool = false) -> NSFont {
    let base = NSFont(name: "Syne", size: size) ?? NSFont.systemFont(ofSize: size)
    return bold ? NSFontManager.shared.convert(base, toHaveTrait: .boldFontMask) : base
}
func color(_ hex: UInt32) -> NSColor {
    NSColor(srgbRed: CGFloat((hex >> 16) & 255) / 255, green: CGFloat((hex >> 8) & 255) / 255, blue: CGFloat(hex & 255) / 255, alpha: 1)
}
let ink = color(0x000042), muted = color(0x475873), accent = color(0x486F9C), grid = color(0xE3E9F1)
let palette = [color(0x2F6DB0), color(0xD08A3A), color(0x2E8C7C)]

/// Show short values exactly as the paper writes them; round longer ones to 4
/// significant figures, never so far that a non-integer prints as a whole number.
func display(_ raw: String, _ v: Double) -> String {
    let clean = raw.trimmingCharacters(in: .whitespaces)
    if clean.count <= 8 && !clean.contains(" ") { return clean }
    let r = rounded(v)
    if let d = Double(r.replacingOccurrences(of: ",", with: "")), d == d.rounded(), v != v.rounded() { return String(format: "%.6g", v) }
    return r
}
func rounded(_ v: Double) -> String {
    if v == 0 { return "0" }
    let a = abs(v)
    if v == v.rounded() && a >= 1000 && a < 1e15 { // whole-number counts: 31,605,800
        let f = NumberFormatter(); f.numberStyle = .decimal; f.locale = Locale(identifier: "en_US")
        return f.string(from: NSNumber(value: v)) ?? String(format: "%.0f", v)
    }
    if a >= 1e5 || a < 1e-3 { return String(format: "%.3g", v).replacingOccurrences(of: "e-0", with: "e-").replacingOccurrences(of: "e+0", with: "e") }
    var s = String(format: "%.4g", v)
    if s.contains("e") { s = String(format: "%.4f", v) }
    return s
}
/// Parse "1.2e-05", "3.4 × 10^-5", "−0.25", "12.5%" etc.
func parse(_ raw: String) -> Double? {
    var s = raw.replacingOccurrences(of: "−", with: "-").replacingOccurrences(of: ",", with: "").replacingOccurrences(of: "%", with: "")
        .replacingOccurrences(of: " ", with: "").replacingOccurrences(of: "\u{2009}", with: "")
    for sep in ["×10^", "x10^", "·10^", "×10", "x10"] where s.contains(sep) {
        let parts = s.components(separatedBy: sep)
        if parts.count == 2, let m = Double(parts[0]), let e = Double(parts[1].replacingOccurrences(of: "^", with: "")) { return m * pow(10, e) }
    }
    s = s.replacingOccurrences(of: "^", with: "")
    return Double(s)
}

for spec in specs {
    let values = spec.series.map { $0.values.map { parse($0) } }
    guard values.allSatisfy({ $0.allSatisfy { $0 != nil } }) else { print("\(spec.id): unparseable value, skipped"); continue }
    let nums = values.map { $0.map { $0! } }
    let all = nums.flatMap { $0 }
    let log = spec.scale == "log" && all.allSatisfy { $0 > 0 }

    let W = 1200, H = 630
    let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: W, pixelsHigh: H, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true,
                               isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    let gc = NSGraphicsContext(bitmapImageRep: rep)!
    NSGraphicsContext.current = gc
    // Work top-down (y grows downwards) like the page layout.
    let xf = NSAffineTransform(); xf.translateX(by: 0, yBy: CGFloat(H)); xf.scaleX(by: 1, yBy: -1); xf.concat()
    func text(_ s: String, _ p: CGPoint, _ f: NSFont, _ c: NSColor, width: CGFloat? = nil, align: NSTextAlignment = .left) {
        let para = NSMutableParagraphStyle(); para.alignment = align; para.lineBreakMode = .byTruncatingTail
        let attrs: [NSAttributedString.Key: Any] = [.font: f, .foregroundColor: c, .paragraphStyle: para]
        let str = NSAttributedString(string: s, attributes: attrs)
        let h = f.ascender - f.descender + 4
        let w = width ?? str.size().width + 2
        // Flip text back upright inside the flipped space.
        NSGraphicsContext.saveGraphicsState()
        let t = NSAffineTransform(); t.translateX(by: p.x, yBy: p.y + h); t.scaleX(by: 1, yBy: -1); t.concat()
        str.draw(with: CGRect(x: align == .right ? -w : 0, y: 0, width: w, height: h), options: [.usesLineFragmentOrigin, .truncatesLastVisibleLine])
        NSGraphicsContext.restoreGraphicsState()
    }
    color(0xFFFFFF).setFill(); NSBezierPath(rect: CGRect(x: 0, y: 0, width: W, height: H)).fill()
    color(0x01050B).setFill(); NSBezierPath(rect: CGRect(x: 0, y: 0, width: 14, height: H)).fill()
    text("SHODH AI · RESEARCH", CGPoint(x: 60, y: 36), font(19), accent)
    text(spec.chartTitle, CGPoint(x: 60, y: 70), font(28, bold: true), ink, width: 1080)

    // Legend (only when there is more than one series).
    var lx: CGFloat = 60
    let legendY: CGFloat = 118
    if spec.series.count > 1 {
        for (i, s) in spec.series.enumerated() {
            palette[i % palette.count].setFill()
            NSBezierPath(roundedRect: CGRect(x: lx, y: legendY + 5, width: 16, height: 16), xRadius: 3, yRadius: 3).fill()
            text(s.name, CGPoint(x: lx + 24, y: legendY), font(17), muted)
            lx += 24 + s.name.size(withAttributes: [.font: font(17)]).width + 30
        }
    }
    text(spec.valueLabel + (log ? " (log scale)" : ""), CGPoint(x: 1140, y: legendY), font(17), muted, width: 520, align: .right)

    // Plot: categories down the left, horizontal bars to the right.
    let top: CGFloat = 160, bottom: CGFloat = 532
    let labelRight: CGFloat = 400, barLeft: CGFloat = 418, barMax: CGFloat = 610
    let n = CGFloat(spec.categories.count), k = CGFloat(spec.series.count)
    let row = (bottom - top) / n
    let thick = min(30, row * 0.72 / k)
    let lo: Double, hi: Double
    if log {
        lo = floor(log10(all.min()!) - 0.15); hi = log10(all.max()!) + 0.02
    } else {
        lo = min(0, all.min()!); hi = max(0, all.max()!) == 0 ? 1 : max(0, all.max()!)
    }
    func pos(_ v: Double) -> CGFloat {
        let t = log ? (log10(v) - lo) / (hi - lo) : (v - lo) / (hi - lo)
        return barLeft + CGFloat(max(0, min(1, t))) * barMax
    }
    let zero = log ? barLeft : pos(0)
    grid.setFill(); NSBezierPath(rect: CGRect(x: zero - 0.5, y: top - 6, width: 1.5, height: bottom - top + 12)).fill()
    let labelFont = font(n > 6 ? 16 : 18)
    for (ci, cat) in spec.categories.enumerated() {
        let rowTop = top + CGFloat(ci) * row
        let groupH = thick * k
        let gy = rowTop + (row - groupH) / 2
        text(cat, CGPoint(x: labelRight, y: rowTop + row / 2 - (labelFont.ascender - labelFont.descender + 4) / 2), labelFont, ink, width: labelRight - 60, align: .right)
        for si in 0..<spec.series.count {
            let v = nums[si][ci]
            let x1 = pos(v)
            let r = CGRect(x: min(zero, x1), y: gy + CGFloat(si) * thick + 1, width: max(2, abs(x1 - zero)), height: thick - 3)
            palette[si % palette.count].setFill()
            NSBezierPath(roundedRect: r, xRadius: 3, yRadius: 3).fill()
            let vf = font(thick > 22 ? 16 : 14)
            text(display(spec.series[si].values[ci], v), CGPoint(x: r.maxX + 8, y: r.midY - (vf.ascender - vf.descender + 4) / 2), vf, muted)
        }
    }
    grid.setFill(); NSBezierPath(rect: CGRect(x: 60, y: 548, width: 1080, height: 1)).fill()
    text(spec.footer, CGPoint(x: 60, y: 566), font(21), ink, width: 860)
    text("shodh.ai/research", CGPoint(x: 1140, y: 568), font(19), muted, width: 260, align: .right)
    NSGraphicsContext.restoreGraphicsState()

    let out = "\(outDir)/\(spec.id.lowercased()).png"
    try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: out))
    print("\(out): \(spec.table), \(spec.categories.count) categories × \(spec.series.count) series\(log ? ", log" : "")")
}
