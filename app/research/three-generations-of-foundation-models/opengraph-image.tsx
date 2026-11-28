import { ImageResponse } from "next/og";

export const alt = "Three generations of foundation models: generate digital information, simulate domain physics, and design coupled physical systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const generations = [
    { number: "01", title: "Digital information", action: "Generate", detail: "Text · code · images" },
    { number: "02", title: "Domain physics", action: "Simulate", detail: "Evolve a physical state" },
    { number: "03", title: "Coupled physical stack", action: "Design", detail: "Work backwards from a goal" },
  ];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 54, background: "#f0f5fc", color: "#000042" }}>
        <div style={{ display: "flex", fontSize: 22, color: "#486f9c" }}>SHODH AI · RESEARCH</div>
        <div style={{ display: "flex", fontSize: 48, fontWeight: 700, marginTop: 22, marginBottom: 38 }}>Three generations of foundation models</div>
        <div style={{ display: "flex", gap: 20 }}>
          {generations.map((generation) => (
            <div key={generation.number} style={{ display: "flex", flexDirection: "column", width: 350, padding: 24, border: "1px solid #c4d2e5", borderRadius: 12, background: "white" }}>
              <div style={{ display: "flex", fontSize: 22, color: "#486f9c" }}>{generation.number}</div>
              <div style={{ display: "flex", fontSize: 28, height: 80, marginTop: 16 }}>{generation.title}</div>
              <div style={{ display: "flex", fontSize: 38, fontWeight: 700, marginTop: 8 }}>{generation.action}</div>
              <div style={{ display: "flex", fontSize: 21, color: "#475873", marginTop: 12 }}>{generation.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 21, color: "#475873", marginTop: 32 }}>From domain physics to the coupled physical stack</div>
      </div>
    ),
    size,
  );
}
