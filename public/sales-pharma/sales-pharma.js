let baseJson = null;
let activeScene = null;
let sceneTemplate = null;

const DEFAULTS_DARK = {
  c0: '#01050b',
  c1: '#0d3864',
  c2: '#6b95c2',
  c3: '#d6e9fc',
  speed: 1.0,
  dist: 0.38,
  wave: 0.25,
  blur: 0.95,
  grain: 0.04,
};

const DEFAULTS_LIGHT = {
  c0: '#c8d8ef',
  c1: '#8aaed6',
  c2: '#5a8ec0',
  c3: '#3a70a8',
  speed: 1.0,
  dist: 0.38,
  wave: 0.25,
  blur: 0.95,
  grain: 0.04,
};

let currentTheme = 'light';
let P = { ...DEFAULTS_LIGHT };

function applyThemePalette(theme) {
  const defaults = theme === 'light' ? DEFAULTS_LIGHT : DEFAULTS_DARK;
  P.c0 = defaults.c0;
  P.c1 = defaults.c1;
  P.c2 = defaults.c2;
  P.c3 = defaults.c3;
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.dataset.theme = theme;
  applyThemePalette(theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute(
      'aria-label',
      theme === 'light' ? 'Toggle dark mode' : 'Toggle light mode'
    );
  }

  try {
    localStorage.setItem('shodh-theme', theme);
  } catch (_) {}

  if (sceneTemplate) {
    renderScene().catch((error) => {
      console.error('[Sales deck shader]', error);
    });
  }
}

function initTheme() {
  let saved = 'light';
  try {
    saved = localStorage.getItem('shodh-theme') || 'light';
  } catch (_) {}

  currentTheme = saved;
  document.body.dataset.theme = saved;
  applyThemePalette(saved);

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.setAttribute(
    'aria-label',
    saved === 'light' ? 'Toggle dark mode' : 'Toggle light mode'
  );

  btn.addEventListener('click', () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

function hexToVec3(hex) {
  const h = hex.replace('#', '');
  const r = (parseInt(h.slice(0, 2), 16) / 255).toFixed(8);
  const g = (parseInt(h.slice(2, 4), 16) / 255).toFixed(8);
  const b = (parseInt(h.slice(4, 6), 16) / 255).toFixed(8);
  return `vec3(${r}, ${g}, ${b})`;
}

function buildSceneJson() {
  if (!sceneTemplate) return null;

  const json = structuredClone(sceneTemplate);
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

  h[3].compiledFragmentShaders = h[3].compiledFragmentShaders.map((shader) =>
    shader.replace(
      /float amount = \([0-9.]+ \* amt\)/,
      `float amount = (${P.blur.toFixed(4)} * amt)`
    )
  );

  let f4 = h[4].compiledFragmentShaders[0];
  h[4].speed = +(P.speed * 0.16).toFixed(4);
  f4 = f4.replace(
    /return mix\(textureCoord, offset, [0-9.]+\);/,
    `return mix(textureCoord, offset, ${P.dist.toFixed(4)});`
  );
  f4 = f4.replace(
    /st \*= 12\. \* [0-9.]+;/,
    `st *= 12. * ${P.wave.toFixed(4)};`
  );
  h[4].compiledFragmentShaders[0] = f4;

  let f5 = h[5].compiledFragmentShaders[0];
  h[5].speed = +(P.speed * 0.5).toFixed(4);
  f5 = f5.replace(
    /mix\(color\.rgb, blend\(1, grainRGB, color\.rgb\), [0-9.]+\)/,
    `mix(color.rgb, blend(1, grainRGB, color.rgb), ${P.grain.toFixed(4)})`
  );
  h[5].compiledFragmentShaders[0] = f5;

  return json;
}

function updateSceneJson() {
  const json = buildSceneJson();
  if (!json) return;
  document.getElementById('my-scene-json').innerText = JSON.stringify(json);
}

async function renderScene() {
  const container = document.getElementById('unicorn-bg');
  if (!container || typeof UnicornStudio === 'undefined') return;

  if (activeScene) {
    try {
      activeScene.destroy();
    } catch (_) {}
  }

  container.innerHTML = '';
  updateSceneJson();

  activeScene = await UnicornStudio.addScene({
    element: container,
    filePath: 'my-scene-json',
    fps: 30,
    scale: 1,
    dpi: Math.min(window.devicePixelRatio, 1),
    lazyLoad: false,
  });
}

async function boot() {
  const res = await fetch('../shodh-new/fluid-config.json');
  if (!res.ok) throw new Error(`HTTP ${res.status} loading shader config`);
  baseJson = await res.json();
  sceneTemplate = baseJson;

  await renderScene();
}

function scheduleShaderBoot() {
  const start = () => {
    boot().catch((error) => {
      console.error('[Sales deck shader]', error);
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(start, { timeout: 1200 });
  } else {
    window.setTimeout(start, 300);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGridDebug();
  scheduleShaderBoot();
});

function initGridDebug() {
  const body = document.body;
  const params = new URLSearchParams(window.location.search);
  const debug = params.get('debug');

  if (debug === 'grid') body.classList.add('sd-debug-grid');
  if (debug === '0') body.classList.remove('sd-debug-grid');

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'g' && event.key !== 'G') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    body.classList.toggle('sd-debug-grid');
  });
}

let resizeRaf = 0;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    if (activeScene && typeof activeScene.resize === 'function') {
      activeScene.resize();
    }
  });
});
