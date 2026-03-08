"use client";

import { useEffect, useRef } from "react";

type LineChartProps = {
  className?: string;
  detailed?: boolean;
};

type Point = {
  x: number;
  y: number;
};

type Recipe = {
  key: string;
  shortLabel: string;
  label: string;
  color: string;
  predictionColor: string;
  failureCycle: number;
  kneeStart: number;
  kneeCapacity: number;
  endFloor: number;
  noiseAmplitude: number;
};

const RECIPES: Recipe[] = [
  {
    key: "brittle",
    shortLabel: "Recipe B",
    label: "Intended Fast-Failure Cell",
    color: "#f97316",
    predictionColor: "#fdba74",
    failureCycle: 300,
    kneeStart: 190,
    kneeCapacity: 91,
    endFloor: 58,
    noiseAmplitude: 0.75,
  },
  {
    key: "baseline",
    shortLabel: "Recipe A",
    label: "Standard Commercial Baseline",
    color: "#22c55e",
    predictionColor: "#86efac",
    failureCycle: 800,
    kneeStart: 600,
    kneeCapacity: 88,
    endFloor: 58,
    noiseAmplitude: 0.58,
  },
  {
    key: "hero",
    shortLabel: "Recipe E",
    label: "AI-Optimized Architecture",
    color: "#38bdf8",
    predictionColor: "#93c5fd",
    failureCycle: 1420,
    kneeStart: 1080,
    kneeCapacity: 86,
    endFloor: 60,
    noiseAmplitude: 0.48,
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const generateSeries = (recipe: Recipe, isPrediction: boolean) => {
  return Array.from({ length: 161 }, (_, index) => {
    const cycle = (index / 160) * 1600;
    const preKneeSlope = (100 - recipe.kneeCapacity) / recipe.kneeStart;
    let capacity: number;

    if (cycle <= recipe.kneeStart) {
      capacity = 100 - preKneeSlope * cycle;
    } else {
      const kneeProgress = clamp((cycle - recipe.kneeStart) / (recipe.failureCycle - recipe.kneeStart), 0, 1.3);
      const tailDrop = (recipe.kneeCapacity - recipe.endFloor) * Math.pow(kneeProgress, 2.45);
      capacity = recipe.kneeCapacity - tailDrop;
    }

    const ratio = cycle / Math.max(recipe.failureCycle, 1);
    const baseNoise = Math.sin(index * 0.92 + recipe.failureCycle * 0.01) * recipe.noiseAmplitude;
    const microNoise = Math.cos(index * 2.35 + recipe.kneeStart * 0.013) * (recipe.noiseAmplitude * 0.38);
    const lateStress = cycle > recipe.kneeStart ? Math.sin(index * 1.4) * recipe.noiseAmplitude * 0.55 : 0;

    const noise = isPrediction
      ? Math.sin(index * 0.45 + recipe.failureCycle * 0.004) * 0.16 - Math.pow(clamp(ratio, 0, 1), 2) * 0.22
      : baseNoise + microNoise + lateStress - Math.pow(clamp(ratio, 0, 1.1), 1.8) * 0.35;

    return {
      x: cycle,
      y: clamp(capacity + noise, 56, 101),
    };
  });
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
        ? { top: 76, right: 36, bottom: 68, left: 72 }
        : { top: 54, right: 24, bottom: 54, left: 58 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const xMax = 1600;
      const yMin = 58;
      const yMax = 102;

      if (chartWidth <= 0 || chartHeight <= 0) return;

      const mapX = (x: number) => padding.left + (x / xMax) * chartWidth;
      const mapY = (y: number) => {
        const scaled = (y - yMin) / (yMax - yMin);
        return padding.top + (1 - scaled) * chartHeight;
      };

      const datasets = RECIPES.map((recipe) => ({
        recipe,
        prediction: generateSeries(recipe, true),
        real: generateSeries(recipe, false),
      }));

      ctx.clearRect(0, 0, width, height);

      const background = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      background.addColorStop(0, "rgba(255,255,255,0.025)");
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
      [0, 300, 800, 1200, 1420].forEach((value) => {
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
      [0, 300, 800, 1420].forEach((value) => {
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

      const drawLine = (data: Point[], color: string, dashed: boolean, widthMultiplier = 1) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = (detailed ? 3.2 : 2.5) * widthMultiplier;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.shadowColor = dashed ? "transparent" : color;
        ctx.shadowBlur = dashed ? 0 : detailed ? 14 : 8;
        ctx.setLineDash(dashed ? [8, 6] : []);

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

      datasets.forEach(({ recipe, prediction, real }) => {
        drawLine(prediction, recipe.predictionColor, true, 0.92);
        drawLine(real, recipe.color, false, recipe.key === "hero" ? 1.04 : 1);
      });

      datasets.forEach(({ recipe, prediction }) => {
        const markerPoint = prediction.reduce((closest, point) => {
          return Math.abs(point.x - recipe.failureCycle) < Math.abs(closest.x - recipe.failureCycle) ? point : closest;
        }, prediction[0]);

        const failureX = mapX(recipe.failureCycle);

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = `${recipe.predictionColor}80`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([5, 5]);
        ctx.moveTo(failureX, padding.top + 8);
        ctx.lineTo(failureX, height - padding.bottom);
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = recipe.predictionColor;
        ctx.arc(failureX, mapY(markerPoint.y), detailed ? 3.8 : 3.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.font = `${detailed ? 11.5 : 10.5}px Inter, sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      const legendStartX = padding.left + 6;
      const legendStartY = padding.top - (detailed ? 42 : 28);

      RECIPES.forEach((recipe, index) => {
        const y = legendStartY + index * (detailed ? 18 : 14);

        ctx.beginPath();
        ctx.strokeStyle = recipe.predictionColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 6]);
        ctx.moveTo(legendStartX, y);
        ctx.lineTo(legendStartX + 20, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = recipe.color;
        ctx.setLineDash([]);
        ctx.moveTo(legendStartX + 26, y);
        ctx.lineTo(legendStartX + 46, y);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.84)";
        ctx.fillText(`${recipe.shortLabel}: ${recipe.label}`, legendStartX + 54, y);
      });

      if (detailed) {
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const annotationPositions = [
          { x: 322, y: 63, text: "Predicted fail ~300" },
          { x: 822, y: 69, text: "Predicted fail ~800" },
          { x: 1430, y: 76, text: "Predicted fail ~1,420" },
        ];

        annotationPositions.forEach((annotation, index) => {
          const x = mapX(annotation.x);
          const y = mapY(annotation.y);
          const boxWidth = index === 2 ? 126 : 118;

          ctx.fillStyle = "rgba(8, 12, 20, 0.88)";
          ctx.fillRect(x - 8, y - 14, boxWidth, 24);
          ctx.strokeStyle = `${RECIPES[index].predictionColor}66`;
          ctx.strokeRect(x - 8, y - 14, boxWidth, 24);
          ctx.fillStyle = "rgba(255,255,255,0.92)";
          ctx.fillText(annotation.text, x + 2, y - 2);
        });
      }
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
