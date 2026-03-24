"use client";

import { useEffect, useRef } from "react";

type LineChartProps = {
  className?: string;
  detailed?: boolean;
  theme?: "dark" | "light";
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
  predictedFailureCycle: number;
  actualFailureCycle: number;
  predictedKneeStart: number;
  actualKneeStart: number;
  predictedKneeCapacity: number;
  actualKneeCapacity: number;
  noiseAmplitude: number;
};

const RECIPES: Recipe[] = [
  {
    key: "brittle",
    shortLabel: "Recipe B",
    label: "Intended Fast-Failure Cell",
    color: "#f97316",
    predictionColor: "#fdba74",
    predictedFailureCycle: 300,
    actualFailureCycle: 325,
    predictedKneeStart: 190,
    actualKneeStart: 208,
    predictedKneeCapacity: 91,
    actualKneeCapacity: 90,
    noiseAmplitude: 0.75,
  },
  {
    key: "baseline",
    shortLabel: "Recipe A",
    label: "Standard Commercial Baseline",
    color: "#22c55e",
    predictionColor: "#86efac",
    predictedFailureCycle: 800,
    actualFailureCycle: 862,
    predictedKneeStart: 600,
    actualKneeStart: 628,
    predictedKneeCapacity: 88,
    actualKneeCapacity: 87,
    noiseAmplitude: 0.58,
  },
  {
    key: "hero",
    shortLabel: "Recipe E",
    label: "AI-Optimized Architecture",
    color: "#38bdf8",
    predictionColor: "#93c5fd",
    predictedFailureCycle: 1420,
    actualFailureCycle: 1360,
    predictedKneeStart: 1080,
    actualKneeStart: 1010,
    predictedKneeCapacity: 86,
    actualKneeCapacity: 84,
    noiseAmplitude: 0.48,
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;

const getPredictedCapacity = (recipe: Recipe, cycle: number) => {
  const failureCycle = recipe.predictedFailureCycle;
  const ratio = clamp(cycle / Math.max(failureCycle, 1), 0, 1);

  if (recipe.key === "brittle") {
    if (cycle <= 130) return 100 - (6 / 130) * cycle;
    if (cycle <= 220) {
      const progress = (cycle - 130) / 90;
      return lerp(94, 82, Math.pow(progress, 1.15));
    }
    const progress = clamp((cycle - 220) / 80, 0, 1);
    return lerp(82, 60, Math.pow(progress, 1.55));
  }

  if (recipe.key === "baseline") {
    if (cycle <= 560) return 100 - (11 / 560) * cycle;
    const progress = clamp((cycle - 560) / 240, 0, 1);
    return lerp(89, 60, Math.pow(progress, 1.9));
  }

  if (cycle <= 180) return 100 - (5 / 180) * cycle;
  if (cycle <= 980) {
    const progress = (cycle - 180) / 800;
    return lerp(95, 86, Math.pow(progress, 1.05));
  }
  const progress = clamp((cycle - 980) / 440, 0, 1);
  return lerp(86, 60, Math.pow(progress, 1.82));
};

const getActualCapacity = (recipe: Recipe, cycle: number) => {
  const failureCycle = recipe.actualFailureCycle;

  if (recipe.key === "brittle") {
    if (cycle <= 150) return 100 - (4 / 150) * cycle;
    if (cycle <= 235) {
      const progress = (cycle - 150) / 85;
      return lerp(96, 88, Math.pow(progress, 1.35));
    }
    const progress = clamp((cycle - 235) / Math.max(failureCycle - 235, 1), 0, 1);
    return lerp(88, 60, Math.pow(progress, 0.5));
  }

  if (recipe.key === "baseline") {
    if (cycle <= 590) return 100 - (10.5 / 590) * cycle;
    const progress = clamp((cycle - 590) / Math.max(failureCycle - 590, 1), 0, 1);
    return lerp(89.5, 60, Math.pow(progress, 2.35));
  }

  if (cycle <= 60) {
    const progress = cycle / 60;
    return lerp(100, 93.2, Math.pow(progress, 0.72));
  }
  if (cycle <= 520) {
    const progress = (cycle - 60) / 460;
    return lerp(93.2, 90.4, Math.pow(progress, 1.08));
  }
  if (cycle <= 1120) {
    const progress = (cycle - 520) / 600;
    return lerp(90.4, 86.8, Math.pow(progress, 0.9));
  }
  const progress = clamp((cycle - 1120) / Math.max(failureCycle - 1120, 1), 0, 1);
  return lerp(86.8, 60, Math.pow(progress, 1.92));
};

const generateSeries = (recipe: Recipe, isPrediction: boolean) => {
  const failureCycle = isPrediction ? recipe.predictedFailureCycle : recipe.actualFailureCycle;
  const pointCount = Math.max(48, Math.round((failureCycle / 1600) * 140));

  return Array.from({ length: pointCount + 1 }, (_, index) => {
    const cycle = (index / pointCount) * failureCycle;
    const kneeStart = isPrediction ? recipe.predictedKneeStart : recipe.actualKneeStart;
    const capacity = isPrediction ? getPredictedCapacity(recipe, cycle) : getActualCapacity(recipe, cycle);

    const ratio = cycle / Math.max(failureCycle, 1);
    const deviationBias = recipe.key === "hero"
      ? -1.1
      : recipe.key === "baseline"
        ? 0.55
        : 0.8;

    const noise = isPrediction
      ? 0
      : (() => {
          const sharedNoise = Math.sin(index * 0.9 + failureCycle * 0.012) * recipe.noiseAmplitude
            + Math.cos(index * 2.6 + kneeStart * 0.01) * (recipe.noiseAmplitude * 0.42)
            + (cycle > kneeStart ? Math.sin(index * 1.45) * recipe.noiseAmplitude * 0.45 : 0);

          if (recipe.key === "brittle") {
            const cliffBoost = cycle > 220 ? (cycle - 220) / Math.max(failureCycle - 220, 1) : 0;
            return sharedNoise * 0.52 + cliffBoost * 0.8;
          }

          if (recipe.key === "baseline") {
            const sharperKnee = cycle > 650 ? Math.pow((cycle - 650) / Math.max(failureCycle - 650, 1), 1.35) * 0.65 : 0;
            return sharedNoise * 0.46 + sharperKnee + deviationBias * Math.pow(clamp(ratio, 0, 1), 1.25) * 0.35;
          }

          const earlyPenalty = cycle <= 120 ? -1.4 * (1 - cycle / 120) : 0;
          const crossoverLift = cycle > 360 && cycle < 1080
            ? Math.sin(((cycle - 360) / 720) * Math.PI) * 1.75
            : 0;
          const finalStress = cycle > 1120 ? Math.pow((cycle - 1120) / Math.max(failureCycle - 1120, 1), 1.4) * 0.55 : 0;

          return sharedNoise * 0.4 + earlyPenalty + crossoverLift - finalStress;
        })();

    return {
      x: cycle,
      y: clamp(capacity + noise, 60, 101),
    };
  });
};

export default function LineChart({ className, detailed = false, theme = "dark" }: LineChartProps) {
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

      const palette = theme === "light"
        ? {
            backgroundTop: "rgba(26, 115, 232, 0.05)",
            backgroundBottom: "rgba(255, 255, 255, 0)",
            grid: "rgba(8, 20, 33, 0.08)",
            axis: "rgba(8, 20, 33, 0.22)",
            tick: "rgba(8, 20, 33, 0.56)",
            label: "rgba(8, 20, 33, 0.72)",
            legend: "rgba(8, 20, 33, 0.84)",
            annotationBg: "rgba(255, 255, 255, 0.94)",
            annotationText: "rgba(8, 20, 33, 0.82)",
          }
        : {
            backgroundTop: "rgba(255,255,255,0.025)",
            backgroundBottom: "rgba(255,255,255,0)",
            grid: "rgba(255, 255, 255, 0.07)",
            axis: "rgba(255, 255, 255, 0.24)",
            tick: "rgba(255, 255, 255, 0.55)",
            label: "rgba(255, 255, 255, 0.68)",
            legend: "rgba(255, 255, 255, 0.84)",
            annotationBg: "rgba(8, 12, 20, 0.88)",
            annotationText: "rgba(255,255,255,0.92)",
          };

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
      background.addColorStop(0, palette.backgroundTop);
      background.addColorStop(1, palette.backgroundBottom);
      ctx.fillStyle = background;
      ctx.fillRect(padding.left, padding.top, chartWidth, chartHeight);

      ctx.beginPath();
      ctx.strokeStyle = palette.grid;
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
      ctx.strokeStyle = palette.axis;
      ctx.lineWidth = 1.2;
      ctx.moveTo(padding.left, padding.top);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.stroke();

      ctx.fillStyle = palette.tick;
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

      ctx.fillStyle = palette.label;
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
          return Math.abs(point.x - recipe.predictedFailureCycle) < Math.abs(closest.x - recipe.predictedFailureCycle) ? point : closest;
        }, prediction[0]);

        const failureX = mapX(recipe.predictedFailureCycle);

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

        ctx.fillStyle = palette.legend;
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

          ctx.fillStyle = palette.annotationBg;
          ctx.fillRect(x - 8, y - 14, boxWidth, 24);
          ctx.strokeStyle = `${RECIPES[index].predictionColor}66`;
          ctx.strokeRect(x - 8, y - 14, boxWidth, 24);
          ctx.fillStyle = palette.annotationText;
          ctx.fillText(annotation.text, x + 2, y - 2);
        });
      }
    };

    drawChart();
    window.addEventListener("resize", drawChart);

    return () => {
      window.removeEventListener("resize", drawChart);
    };
  }, [detailed, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? (detailed ? "w-full h-full min-h-[420px]" : "w-full h-full min-h-[250px]")}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
