// The home page's fluid background (public/shodh-new/main.js) for the engineering index:
// the same scene file, palettes and shader parameters.

export type Theme = "light" | "dark";

type Scene = { destroy: () => void };
type UnicornStudioRuntime = {
  addScene: (options: Record<string, unknown>) => Promise<Scene>;
};

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioRuntime;
  }
}

const PALETTES: Record<Theme, readonly [string, string, string, string]> = {
  dark: ["#01050b", "#0d3864", "#6b95c2", "#d6e9fc"],
  light: ["#c8d8ef", "#8aaed6", "#5a8ec0", "#3a70a8"],
};
const P = { speed: 1.0, dist: 0.38, wave: 0.25, blur: 0.95, grain: 0.04 };

let runtime: Promise<void> | null = null;
let config: Promise<any> | null = null;

function loadRuntime(): Promise<void> {
  if (window.UnicornStudio) return Promise.resolve();
  runtime ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/shodh-new/vendor/unicornStudio.umd.js";
    script.onload = () => resolve();
    script.onerror = () => {
      runtime = null;
      reject(new Error("Background runtime unavailable"));
    };
    document.head.append(script);
  });
  return runtime;
}

function loadConfig(): Promise<any> {
  config ??= fetch("/shodh-new/fluid-config.json")
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status} loading fluid-config.json`))))
    .catch((err) => {
      config = null;
      throw err;
    });
  return config;
}

function hexToVec3(hex: string): string {
  const h = hex.replace("#", "");
  const c = (i: number) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(8);
  return `vec3(${c(0)}, ${c(2)}, ${c(4)})`;
}

// Same layer patching as updateSceneJson() on the home page.
function sceneFor(base: any, theme: Theme): any {
  const json = JSON.parse(JSON.stringify(base));
  const h = json.history;
  const colors = PALETTES[theme];
  const [c0, c1, c2] = colors;
  h[0].speed = +(P.speed * 0.25).toFixed(4);
  let f0: string = h[0].compiledFragmentShaders[0];
  colors.forEach((hex, i) => {
    f0 = f0.replace(new RegExp(`(case ${i}: return )vec3\\([^)]+\\)(;)`), `$1${hexToVec3(hex)}$2`);
  });
  h[0].compiledFragmentShaders[0] = f0;
  h[1].fill = [c2, c1, c0, c1, c2];
  h[2].fill = [c0, c1, c2];
  h[3].compiledFragmentShaders = h[3].compiledFragmentShaders.map((s: string) =>
    s.replace(/float amount = \([0-9.]+ \* amt\)/, `float amount = (${P.blur.toFixed(4)} * amt)`),
  );
  h[4].speed = +(P.speed * 0.16).toFixed(4);
  h[4].compiledFragmentShaders[0] = h[4].compiledFragmentShaders[0]
    .replace(/return mix\(textureCoord, offset, [0-9.]+\);/, `return mix(textureCoord, offset, ${P.dist.toFixed(4)});`)
    .replace(/st \*= 12\. \* [0-9.]+;/, `st *= 12. * ${P.wave.toFixed(4)};`);
  h[5].speed = +(P.speed * 0.5).toFixed(4);
  h[5].compiledFragmentShaders[0] = h[5].compiledFragmentShaders[0].replace(
    /mix\(color\.rgb, blend\(1, grainRGB, color\.rgb\), [0-9.]+\)/,
    `mix(color.rgb, blend(1, grainRGB, color.rgb), ${P.grain.toFixed(4)})`,
  );
  return json;
}

/** Renders the fluid scene into `container`; returns a cleanup function. */
export function mountFluid(container: HTMLElement, theme: Theme): () => void {
  let cancelled = false;
  let scene: Scene | null = null;
  let data: HTMLScriptElement | null = null;

  Promise.all([loadConfig(), loadRuntime()])
    .then(([base]) => {
      if (cancelled || !window.UnicornStudio) return;
      if (!base?.history || !base?.options) throw new Error("fluid-config.json is missing history/options");
      data = document.createElement("script");
      data.type = "application/json";
      data.id = `engineering-scene-${theme}-${Date.now()}`;
      data.textContent = JSON.stringify(sceneFor(base, theme));
      document.body.append(data);
      container.innerHTML = "";
      return window.UnicornStudio.addScene({
        element: container,
        filePath: data.id,
        fps: 60,
        scale: 1,
        dpi: Math.min(window.devicePixelRatio, 1.5),
        lazyLoad: false,
      });
    })
    .then((created) => {
      if (!created) return;
      if (cancelled) {
        try { created.destroy(); } catch { /* already gone */ }
        return;
      }
      scene = created;
    })
    .catch((err) => console.warn("[Background]", err));

  return () => {
    cancelled = true;
    try { scene?.destroy(); } catch { /* already gone */ }
    data?.remove();
    container.innerHTML = "";
  };
}
