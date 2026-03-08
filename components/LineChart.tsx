"use client";

import { useEffect, useRef } from "react";

type LineChartProps = {
  className?: string;
  detailed?: boolean;
};

export default function LineChart({ className, detailed = false }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const width = rect.width;
      const height = rect.height;
      const padding = detailed
        ? { top: 44, right: 28, bottom: 64, left: 68 }
        : { top: 34, right: 24, bottom: 54, left: 58 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const xMax = 1600;
      const failurePoint = 1420;
      const yMin = 58;
      const yMax = 102;

      if (chartWidth <= 0 || chartHeight <= 0) return;

      const mapX = (x: number) => padding.left + (x / xMax) * chartWidth;
      const mapY = (y: number) => {
        const scaled = (y - yMin) / (yMax - yMin);
        return padding.top + (1 - scaled) * chartHeight;
      };

      const generateData = (isPrediction = false) => {
        return Array.from({ length: 121 }, (_, index) => {
          const cycle = (index / 120) * xMax;
          const ratio = cycle / xMax;
          const baseline = 100 - 4.5 * ratio - 5.5 * Math.pow(ratio, 1.4) - 24 * Math.pow(ratio, 3.15);
          const deviation = isPrediction
            ? 0.8 * Math.sin(ratio * 6.2) - 0.6 * Math.pow(ratio, 1.8)
            : -1.4 - 1.1 * Math.sin(ratio * 7.4 + 0.35) - 2.1 * Math.pow(ratio, 1.55) + 0.9 * Math.exp(-Math.pow((ratio - 0.72) / 0.12, 2));

          return {
            x: cycle,
            y: baseline + deviation,
          };
        });
      };

      const predictionData = generateData(true);
      const realData = generateData(false);

      ctx.clearRect(0, 0, width, height);

      const background = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      background.addColorStop(0, "rgba(255,255,255,0.02)");
      background.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = background;
      ctx.fillRect(padding.left, padding.top, chartWidth, chartHeight);

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
      ctx.lineWidth = 1;
      [60, 70, 80, 90, 100].forEach((value) => {
        const y = mapY(value);
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
      });
      [0, 350, 700, 1050, 1420].forEach((value) => {
        const x = mapX(value);
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
      });
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
      ctx.lineWidth = 1.2;
      ctx.moveTo(padding.left, padding.top);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.font = `${detailed ? 12 : 11}px Inter, sans-serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      [100, 90, 80, 70, 60].forEach((value) => {
        ctx.fillText(`${value}%`, padding.left - 12, mapY(value));
      });

      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      [0, 700, 1420].forEach((value) => {
        ctx.fillText(`${value}`, mapX(value), height - padding.bottom + 10);
      });

      ctx.fillStyle = "rgba(255, 255, 255, 0.68)";
      ctx.font = `${detailed ? 13 : 12}px Inter, sans-serif`;
      ctx.fillText("Cycles (Time)", padding.left + chartWidth / 2, height - 18);

      ctx.save();
      ctx.translate(18, padding.top + chartHeight / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Capacity Retention %", 0, 0);
      ctx.restore();

      const drawLine = (data: { x: number; y: number }[], color: string, dashed = false) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = detailed ? 3.4 : 2.8;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.shadowColor = color;
        ctx.shadowBlur = detailed ? 16 : 10;
        ctx.setLineDash(dashed ? [8, 7] : []);

        data.forEach((point, index) => {
          const px = mapX(point.x);
          const py = mapY(point.y);

          if (index === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        });

        ctx.stroke();
        ctx.restore();
      };

      drawLine(predictionData, "#60a5fa", true);
      drawLine(realData, "#22c55e");

      const failureX = mapX(failurePoint);
      const predictedFailure = predictionData.reduce((closest, point) => {
        return Math.abs(point.x - failurePoint) < Math.abs(closest.x - failurePoint) ? point : closest;
      }, predictionData[0]);

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(248, 113, 113, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.moveTo(failureX, padding.top + 8);
      ctx.lineTo(failureX, height - padding.bottom);
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.fillStyle = "#f87171";
      ctx.arc(failureX, mapY(predictedFailure.y), detailed ? 4.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();

      const labelWidth = detailed ? 154 : 112;
      const labelX = Math.min(Math.max(failureX - labelWidth / 2, padding.left + 4), width - padding.right - labelWidth - 4);
      const labelY = padding.top + 10;

      ctx.fillStyle = "rgba(127, 29, 29, 0.88)";
      ctx.fillRect(labelX, labelY, labelWidth, detailed ? 42 : 32);
      ctx.strokeStyle = "rgba(248, 113, 113, 0.5)";
      ctx.strokeRect(labelX, labelY, labelWidth, detailed ? 42 : 32);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = `${detailed ? 11.5 : 10}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(detailed ? "AI Predicted Failure Point" : "Predicted Failure", labelX + labelWidth / 2, labelY + 13);
      ctx.fillStyle = "rgba(254, 202, 202, 0.92)";
      ctx.fillText("Cycle 1,420", labelX + labelWidth / 2, labelY + (detailed ? 29 : 21));

      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      ctx.font = `${detailed ? 12 : 11}px Inter, sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      ctx.beginPath();
      ctx.strokeStyle = "#60a5fa";
      ctx.setLineDash([8, 7]);
      ctx.moveTo(padding.left + 6, padding.top - 18);
      ctx.lineTo(padding.left + 34, padding.top - 18);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillText("AI Prediction", padding.left + 42, padding.top - 18);

      ctx.beginPath();
      ctx.strokeStyle = "#22c55e";
      ctx.moveTo(padding.left + 150, padding.top - 18);
      ctx.lineTo(padding.left + 178, padding.top - 18);
      ctx.stroke();
      ctx.fillText("Real World", padding.left + 186, padding.top - 18);
    };

    drawChart();
    window.addEventListener("resize", drawChart);

    return () => {
      window.removeEventListener("resize", drawChart);
    };
  }, [detailed]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className ?? (detailed ? "w-full h-full min-h-[420px]" : "w-full h-full min-h-[250px]")}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
