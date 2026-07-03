"use client";

import { useEffect, useRef } from "react";

export default function ShockwaveHeatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w * 0.35;
      const cy = h * 0.5;

      // Clear with dark background
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, w, h);

      // Draw heatmap field around cone
      // We simulate a Mach 5 shockwave pattern
      const coneHalfAngle = 0.35; // ~20 degrees (Mach angle ~11.5° for Mach 5, but visual)
      const machAngle = Math.asin(1 / 5); // Mach angle

      // Create image data for heatmap
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(Math.abs(dy), dx);

          const idx = (y * w + x) * 4;
          let r = 0, g = 0, b = 0;

          // Inside cone (the vehicle body)
          if (dx > -20 && dx < 60 && Math.abs(dy) < Math.max(8, dx * coneHalfAngle * 0.3)) {
            r = 200; g = 200; b = 220;
          }
          // Shockwave region - behind the Mach cone
          else if (dx > 0 && angle > machAngle && angle < machAngle + 0.15) {
            // Strong shock - bright red/white
            const shockIntensity = Math.exp(-Math.abs(angle - machAngle - 0.05) * 40) * (1 - dist / (w * 0.7));
            r = Math.min(255, 255 * shockIntensity);
            g = Math.min(255, 180 * shockIntensity * 0.5);
            b = Math.min(255, 60 * shockIntensity * 0.3);
          }
          // Post-shock region (compressed, hot)
          else if (dx > 0 && angle > machAngle + 0.15 && angle < machAngle + 0.6) {
            const postIntensity = Math.exp(-(angle - machAngle - 0.15) * 5) * (1 - dist / (w * 0.8)) * 0.7;
            r = Math.min(255, 220 * postIntensity);
            g = Math.min(255, 80 * postIntensity);
            b = Math.min(255, 20 * postIntensity);
          }
          // Pre-shock region (undisturbed, cool)
          else if (dx > 0 && angle < machAngle) {
            r = 10; g = 20; b = 50;
          }
          // Far field
          else {
            const farIntensity = Math.exp(-dist / (w * 0.4)) * 0.15;
            r = Math.min(255, 30 * farIntensity);
            g = Math.min(255, 15 * farIntensity);
            b = Math.min(255, 40 * farIntensity);
          }

          // Add animated pulse along shockwave
          if (dx > 0 && angle > machAngle && angle < machAngle + 0.15) {
            const pulse = Math.sin(dist * 0.05 - t * 0.08) * 0.3 + 0.7;
            r = Math.min(255, r * pulse + 30);
            g = Math.min(255, g * pulse);
          }

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Draw cone outline on top
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy);
      ctx.lineTo(cx + 60, cy - Math.max(8, 60 * coneHalfAngle * 0.3));
      ctx.lineTo(cx + 60, cy + Math.max(8, 60 * coneHalfAngle * 0.3));
      ctx.closePath();
      ctx.stroke();

      // Draw Mach cone lines (shock waves)
      ctx.strokeStyle = "rgba(255,200,100,0.5)";
      ctx.lineWidth = 1;
      const machLineLen = w * 0.7;
      ctx.beginPath();
      ctx.moveTo(cx + 60, cy);
      ctx.lineTo(cx + 60 + machLineLen * Math.cos(machAngle), cy + machLineLen * Math.sin(machAngle));
      ctx.moveTo(cx + 60, cy);
      ctx.lineTo(cx + 60 + machLineLen * Math.cos(machAngle), cy - machLineLen * Math.sin(machAngle));
      ctx.stroke();

      // Labels
      ctx.fillStyle = "rgba(255,180,100,0.8)";
      ctx.font = "10px monospace";
      ctx.fillText("Mach cone", cx + 120, cy - 40);
      ctx.fillStyle = "rgba(255,100,60,0.7)";
      ctx.fillText("shock", cx + 100, cy + 55);
      ctx.fillStyle = "rgba(150,150,200,0.5)";
      ctx.fillText("undisturbed", cx + 200, cy - 80);

      t += 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
