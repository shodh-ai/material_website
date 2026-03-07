"use client";

import { useEffect, useRef } from "react";

export default function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    // X-axis
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // Draw grid lines
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    for (let i = 1; i <= 4; i++) {
      const y = padding.top + (chartHeight * i) / 4;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
    }
    for (let i = 1; i <= 5; i++) {
      const x = padding.left + (chartWidth * i) / 5;
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
    }
    ctx.stroke();

    // Labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    
    // Y-axis labels (Capacity)
    ctx.fillText("100%", padding.left - 10, padding.top);
    ctx.fillText("80%", padding.left - 10, padding.top + chartHeight * 0.5);
    ctx.fillText("60%", padding.left - 10, height - padding.bottom);
    
    // X-axis labels (Cycles)
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("0", padding.left, height - padding.bottom + 10);
    ctx.fillText("700", padding.left + chartWidth * 0.5, height - padding.bottom + 10);
    ctx.fillText("1420", padding.left + chartWidth, height - padding.bottom + 10);

    // Generate data
    const generateData = (isPrediction = false) => {
      const points = [];
      const numPoints = 100;
      for (let i = 0; i <= numPoints; i++) {
        const x = i / numPoints;
        // Basic degradation curve
        let y = 1 - (0.1 * x + 0.3 * Math.pow(x, 3));
        
        // Add noise/variation for real data
        if (!isPrediction) {
          y += (Math.random() - 0.5) * 0.02 * (1 - x); // More noise at start
          y -= x * 0.01; // Slight downward shift
        }
        points.push({ x, y });
      }
      return points;
    };

    const predictionData = generateData(true);
    const realData = generateData(false);

    // Function to draw line
    const drawLine = (data: {x: number, y: number}[], color: string, isDashed: boolean = false) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      
      if (isDashed) {
        ctx.setLineDash([5, 5]);
      } else {
        ctx.setLineDash([]);
      }

      data.forEach((point, i) => {
        // Map capacity (0.6 to 1.0) to height
        const scaledY = Math.max(0, (point.y - 0.6) / 0.4);
        
        const px = padding.left + point.x * chartWidth;
        const py = padding.top + (1 - scaledY) * chartHeight;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.stroke();
    };

    // Draw lines
    drawLine(predictionData, "#3b82f6", true); // Blue dotted
    drawLine(realData, "#10b981", false);      // Green solid

    // Legend
    ctx.setLineDash([]);
    
    // Prediction legend
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding.left + 20, padding.top + 20);
    ctx.lineTo(padding.left + 40, padding.top + 20);
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.textAlign = "left";
    ctx.fillText("AI Prediction", padding.left + 50, padding.top + 20);

    // Real legend
    ctx.beginPath();
    ctx.strokeStyle = "#10b981";
    ctx.setLineDash([]);
    ctx.moveTo(padding.left + 20, padding.top + 40);
    ctx.lineTo(padding.left + 40, padding.top + 40);
    ctx.stroke();
    ctx.fillText("Real World", padding.left + 50, padding.top + 40);

  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full min-h-[250px]"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
