/* Home page fluid background and theme toggle for the research pages.
 * Mirrors public/shodh-new/main.js: the same scene file, palettes and shader
 * parameters, and the same `shodh-theme` setting (dark unless the visitor
 * chose light). If WebGL is unavailable the page keeps its solid theme colour.
 */
(() => {
  const PALETTES = {
    dark: ['#01050b', '#0d3864', '#6b95c2', '#d6e9fc'],
    light: ['#c8d8ef', '#8aaed6', '#5a8ec0', '#3a70a8'],
  };
  const P = { speed: 1.0, dist: 0.38, wave: 0.25, blur: 0.95, grain: 0.04 };
  const RUNTIME = '/research/brand/unicornStudio.umd.js';
  const SCENE = '/research/brand/fluid-config.json';

  const root = document.documentElement;
  const container = document.getElementById('brand-background');
  const toggle = document.getElementById('theme-toggle');
  let baseJson = null;
  let activeScene = null;

  const currentTheme = () => (root.dataset.theme === 'light' ? 'light' : 'dark');

  function hexToVec3(hex) {
    const h = hex.replace('#', '');
    const c = (i) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(8);
    return `vec3(${c(0)}, ${c(2)}, ${c(4)})`;
  }

  // Same layer patching as updateSceneJson() on the home page.
  function sceneJson(colors) {
    const json = JSON.parse(JSON.stringify(baseJson));
    const h = json.history;
    const [c0, c1, c2] = colors;
    h[0].speed = +(P.speed * 0.25).toFixed(4);
    let f0 = h[0].compiledFragmentShaders[0];
    colors.forEach((hex, i) => {
      f0 = f0.replace(new RegExp(`(case ${i}: return )vec3\\([^)]+\\)(;)`), `$1${hexToVec3(hex)}$2`);
    });
    h[0].compiledFragmentShaders[0] = f0;
    h[1].fill = [c2, c1, c0, c1, c2];
    h[2].fill = [c0, c1, c2];
    h[3].compiledFragmentShaders = h[3].compiledFragmentShaders.map((s) =>
      s.replace(/float amount = \([0-9.]+ \* amt\)/, `float amount = (${P.blur.toFixed(4)} * amt)`));
    h[4].speed = +(P.speed * 0.16).toFixed(4);
    h[4].compiledFragmentShaders[0] = h[4].compiledFragmentShaders[0]
      .replace(/return mix\(textureCoord, offset, [0-9.]+\);/, `return mix(textureCoord, offset, ${P.dist.toFixed(4)});`)
      .replace(/st \*= 12\. \* [0-9.]+;/, `st *= 12. * ${P.wave.toFixed(4)};`);
    h[5].speed = +(P.speed * 0.5).toFixed(4);
    h[5].compiledFragmentShaders[0] = h[5].compiledFragmentShaders[0].replace(
      /mix\(color\.rgb, blend\(1, grainRGB, color\.rgb\), [0-9.]+\)/,
      `mix(color.rgb, blend(1, grainRGB, color.rgb), ${P.grain.toFixed(4)})`);
    return json;
  }

  function loadRuntime() {
    if (window.UnicornStudio) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = RUNTIME;
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  }

  function renderScene() {
    if (!container || !baseJson || !window.UnicornStudio) return;
    if (activeScene) {
      try { activeScene.destroy(); } catch (_) { /* already gone */ }
      activeScene = null;
    }
    container.innerHTML = '';
    let data = document.getElementById('research-scene-json');
    if (!data) {
      data = document.createElement('script');
      data.type = 'application/json';
      data.id = 'research-scene-json';
      document.body.append(data);
    }
    data.textContent = JSON.stringify(sceneJson(PALETTES[currentTheme()]));
    UnicornStudio.addScene({
      element: container,
      filePath: data.id,
      fps: 60,
      scale: 1,
      dpi: Math.min(window.devicePixelRatio, 1.5),
      lazyLoad: false,
    }).then((scene) => { activeScene = scene; })
      .catch((err) => console.warn('[Background]', err));
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('shodh-theme', theme); } catch (_) { /* storage blocked */ }
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Use light mode' : 'Use dark mode');
    renderScene();
  }

  if (toggle) {
    toggle.setAttribute('aria-label', currentTheme() === 'dark' ? 'Use light mode' : 'Use dark mode');
    toggle.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  }

  document.addEventListener('visibilitychange', () => {
    if (activeScene && typeof activeScene.paused === 'boolean') activeScene.paused = document.hidden;
  });

  if (!container) return;
  Promise.all([fetch(SCENE).then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))), loadRuntime()])
    .then(([json]) => {
      if (!json.history || !json.options) throw new Error('fluid-config.json is missing history/options');
      baseJson = json;
      renderScene();
    })
    .catch((err) => console.warn('[Background]', err));
})();
