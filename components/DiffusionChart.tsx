"use client";

import { useEffect, useRef } from "react";

export default function DiffusionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let progress = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate diffusion data - Li+ diffusion rate over temperature cycles
    // The key insight: rate holds steady (stable electrolyte) vs a declining competitor
    const dataPoints = 50;
    const liData: { x: number; y: number }[] = [];
    const competitorData: { x: number; y: number }[] = [];

    for (let i = 0; i < dataPoints; i++) {
      const x = i / (dataPoints - 1);
      // Li+ in our polymer: holds steady around 1.2e-4 with small fluctuations
      const liBase = 1.2;
      const liNoise = Math.sin(i * 0.7) * 0.04 + Math.sin(i * 0.3) * 0.03;
      liData.push({ x, y: liBase + liNoise });

      // Competitor (liquid electrolyte): starts higher but degrades at high temp
      const compBase = 1.5 - x * 0.8;
      const compNoise = Math.sin(i * 0.5) * 0.05;
      competitorData.push({ x, y: Math.max(0.2, compBase + compNoise) });
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const padL = 50;
      const padR = 20;
      const padT = 20;
      const padB = 35;
      const chartW = w - padL - padR;
      const chartH = h - padT - padB;

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "rgba(10,15,30,0.5)";
      ctx.fillRect(padL, padT, chartW, chartH);

      // Grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padT + (chartH * i) / 4;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + chartW, y);
        ctx.stroke();
      }
      for (let i = 0; i <= 5; i++) {
        const x = padL + (chartW * i) / 5;
        ctx.beginPath();
        ctx.moveTo(x, padT);
        ctx.lineTo(x, padT + chartH);
        ctx.stroke();
      }

      // Y-axis labels
      ctx.fillStyle = "rgba(148,163,184,0.6)";
      ctx.font = "10px monospace";
      ctx.textAlign = "right";
      ctx.fillText("2.0", padL - 8, padT + 5);
      ctx.fillText("1.5", padL - 8, padT + chartH * 0.25 + 4);
      ctx.fillText("1.0", padL - 8, padT + chartH * 0.5 + 4);
      ctx.fillText("0.5", padL - 8, padT + chartH * 0.75 + 4);
      ctx.fillText("0.0", padL - 8, padT + chartH + 3);

      // X-axis label
      ctx.textAlign = "center";
      ctx.fillText("Temperature Cycles (25°C → 150°C)", padL + chartW / 2, h - 8);

      // Y-axis label
      ctx.save();
      ctx.translate(12, padT + chartH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("Li+ Diffusion (×10⁻⁴ cm²/s)", 0, 0);
      ctx.restore();

      const visibleCount = Math.floor(dataPoints * progress);
      if (visibleCount < 2) {
        progress += 0.02;
        raf = requestAnimationFrame(draw);
        return;
      }

      const toX = (x: number) => padL + x * chartW;
      const toY = (y: number) => padT + chartH - (y / 2.0) * chartH;

      // Draw competitor line (dashed, declining)
      ctx.strokeStyle = "rgba(239,68,68,0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let i = 0; i < visibleCount; i++) {
        const px = toX(competitorData[i].x);
        const py = toY(competitorData[i].y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Li+ line (solid, stable)
      ctx.strokeStyle = "#a78bfa";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#a78bfa";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let i = 0; i < visibleCount; i++) {
        const px = toX(liData[i].x);
        const py = toY(liData[i].y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw current point dot
      if (visibleCount > 0) {
        const lastIdx = visibleCount - 1;
        const px = toX(liData[lastIdx].x);
        const py = toY(liData[lastIdx].y);
        ctx.fillStyle = "#a78bfa";
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(167,139,250,0.2)";
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Legend
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      // Li+ legend
      ctx.fillStyle = "#a78bfa";
      ctx.fillRect(padL + 8, padT + 8, 16, 2);
      ctx.fillStyle = "rgba(167,139,250,0.9)";
      ctx.fillText("PEG/Carbamate (ours)", padL + 30, padT + 12);
      // Competitor legend
      ctx.strokeStyle = "rgba(239,68,68,0.5)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL + 8, padT + 26);
      ctx.lineTo(padL + 24, padT + 26);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(239,68,68,0.7)";
      ctx.fillText("Liquid electrolyte (degrades)", padL + 30, padT + 30);

      if (progress < 1) {
        progress += 0.02;
      }
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
