"use client";

import { useEffect, useRef } from "react";

const DEFAULTS_LIGHT = {
  c0: "#c8d8ef",
  c1: "#8aaed6",
  c2: "#5a8ec0",
  c3: "#3a70a8",
  speed: 1.0,
  dist: 0.38,
  wave: 0.25,
  blur: 0.95,
  grain: 0.04,
};

function hexToVec3(hex: string): string {
  const h = hex.replace("#", "");
  const r = (parseInt(h.slice(0, 2), 16) / 255).toFixed(8);
  const g = (parseInt(h.slice(2, 4), 16) / 255).toFixed(8);
  const b = (parseInt(h.slice(4, 6), 16) / 255).toFixed(8);
  return `vec3(${r}, ${g}, ${b})`;
}

export default function UnicornBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Load UnicornStudio vendor script
      await new Promise<void>((resolve, reject) => {
        if ((window as any).UnicornStudio) return resolve();
        const s = document.createElement("script");
        s.src = "/shodh-new/vendor/unicornStudio.umd.js";
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load UnicornStudio"));
        document.body.appendChild(s);
      });

      if (cancelled || !containerRef.current) return;

      // Fetch the same fluid-config.json used by the homepage
      const res = await fetch("/shodh-new/fluid-config.json");
      if (!res.ok) throw new Error(`HTTP ${res.status} loading fluid-config.json`);
      const baseJson = await res.json();

      if (cancelled) return;

      // Patch JSON with light theme colors (same logic as main.js updateSceneJson)
      const P = DEFAULTS_LIGHT;
      const json = JSON.parse(JSON.stringify(baseJson));
      const h = json.history;

      h[0].speed = +(P.speed * 0.25).toFixed(4);
      let f0 = h[0].compiledFragmentShaders[0];
      [P.c0, P.c1, P.c2, P.c3].forEach((hex, i) => {
        f0 = f0.replace(
          new RegExp(`(case ${i}: return )vec3\\([^)]+\\)(;)`),
          `$1${hexToVec3(hex)}$2`
        );
      });
      h[0].compiledFragmentShaders[0] = f0;

      h[1].fill = [P.c2, P.c1, P.c0, P.c1, P.c2];
      h[2].fill = [P.c0, P.c1, P.c2];

      h[3].compiledFragmentShaders = h[3].compiledFragmentShaders.map((s: string) =>
        s.replace(
          /float amount = \([0-9.]+ \* amt\)/,
          `float amount = (${P.blur.toFixed(4)} * amt)`
        )
      );

      h[4].speed = +(P.speed * 0.16).toFixed(4);
      let f4 = h[4].compiledFragmentShaders[0];
      f4 = f4.replace(
        /return mix\(textureCoord, offset, [0-9.]+\);/,
        `return mix(textureCoord, offset, ${P.dist.toFixed(4)});`
      );
      f4 = f4.replace(
        /st \*= 12\. \* [0-9.]+;/,
        `st *= 12. * ${P.wave.toFixed(4)};`
      );
      h[4].compiledFragmentShaders[0] = f4;

      h[5].speed = +(P.speed * 0.5).toFixed(4);
      let f5 = h[5].compiledFragmentShaders[0];
      f5 = f5.replace(
        /mix\(color\.rgb, blend\(1, grainRGB, color\.rgb\), [0-9.]+\)/,
        `mix(color.rgb, blend(1, grainRGB, color.rgb), ${P.grain.toFixed(4)})`
      );
      h[5].compiledFragmentShaders[0] = f5;

      // Set the patched JSON into a script tag for UnicornStudio to read
      let scriptTag = document.getElementById("intro-scene-json");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "intro-scene-json";
        scriptTag.setAttribute("type", "application/json");
        document.body.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(json);

      if (cancelled || !containerRef.current) return;

      // Render the scene — same call as homepage main.js
      const UnicornStudio = (window as any).UnicornStudio;
      UnicornStudio.addScene({
        element: containerRef.current,
        filePath: "intro-scene-json",
        fps: 60,
        scale: 1,
        dpi: Math.min(window.devicePixelRatio, 1.5),
        lazyLoad: false,
      }).then((scene: any) => {
        sceneRef.current = scene;
      }).catch((err: any) => {
        console.error("[UnicornStudio] addScene failed:", err);
      });
    }

    init().catch((err) => console.error("[UnicornBackground]", err));

    return () => {
      cancelled = true;
      if (sceneRef.current) {
        try { sceneRef.current.destroy(); } catch (_) {}
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
