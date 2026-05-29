/**
 * Fluid Shader Controller - main.js
 *
 * Strategy: build a patched JSON, create a Blob URL from it, and pass that
 * as `filePath` to UnicornStudio.addScene().
 */

let baseJson    = null;   // original parsed config JSON
let activeScene = null;   // current scene instance
let blobUrl     = null;   // current Blob URL for the patched JSON
let reloadTimer = null;   // debounce handle

// ─── Asset Preloading State ───────────────────────────────────────────────────
let allAssetsLoaded = false;   // true when all images + fonts are ready
let shaderReady     = false;   // true when WebGL shader has rendered
let loaderDismissed = false;   // prevent double-dismissal

let totalLoaderAssets = 0;
let loadedLoaderAssets = 0;

function updateLoaderProgress() {
  loadedLoaderAssets++;
  const progress = Math.min(loadedLoaderAssets / totalLoaderAssets, 1.0);
  
  const path1 = document.getElementById('mask-path-1');
  const path2 = document.getElementById('mask-path-2');
  if (path1 && path2) {
    const len1 = parseFloat(path1.dataset.len || 0);
    const len2 = parseFloat(path2.dataset.len || 0);
    path1.style.strokeDashoffset = len1 * (1 - progress);
    path2.style.strokeDashoffset = len2 * (1 - progress);
  }
}

// ─── Defaults ────────────────────────────────────────────────────────────────
const DEFAULTS_DARK = {
  c0: '#01050b', c1: '#0d3864', c2: '#6b95c2', c3: '#d6e9fc',
  speed: 1.0, dist: 0.38, wave: 0.25, blur: 0.95, grain: 0.04
};

const DEFAULTS_LIGHT = {
  c0: '#c8d8ef', c1: '#8aaed6', c2: '#5a8ec0', c3: '#3a70a8',
  speed: 1.0, dist: 0.38, wave: 0.25, blur: 0.95, grain: 0.04
};

// Backwards-compatible alias (used by control panel reset)
const DEFAULTS = DEFAULTS_DARK;

let currentTheme = 'dark';
let P = { ...DEFAULTS_DARK };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function hexToVec3(hex) {
  const h = hex.replace('#', '');
  const r = (parseInt(h.slice(0,2),16)/255).toFixed(8);
  const g = (parseInt(h.slice(2,4),16)/255).toFixed(8);
  const b = (parseInt(h.slice(4,6),16)/255).toFixed(8);
  return `vec3(${r}, ${g}, ${b})`;
}

// ─── Patch JSON with current params and update DOM script tag ────────────────
function updateSceneJson() {
  const json = JSON.parse(JSON.stringify(baseJson));   // deep clone
  const h    = json.history;
  // [0] gradient BG  [1] rect shape  [2] circle shape
  // [3] blur effect  [4] noise effect  [5] grain effect

  // ── Layer 0: animated gradient ────────────────────────────────────────────
  h[0].speed = +(P.speed * 0.25).toFixed(4);

  let f0 = h[0].compiledFragmentShaders[0];
  [P.c0, P.c1, P.c2, P.c3].forEach((hex, i) => {
    f0 = f0.replace(
      new RegExp(`(case ${i}: return )vec3\\([^)]+\\)(;)`),
      `$1${hexToVec3(hex)}$2`
    );
  });
  h[0].compiledFragmentShaders[0] = f0;

  // ── Layers 1 & 2: shape fills ─────────────────────────────────────────────
  h[1].fill = [P.c2, P.c1, P.c0, P.c1, P.c2];
  h[2].fill = [P.c0, P.c1, P.c2];

  // ── Layer 3: gaussian blur (4 passes) ─────────────────────────────────────
  h[3].compiledFragmentShaders = h[3].compiledFragmentShaders.map(s =>
    s.replace(
      /float amount = \([0-9.]+ \* amt\)/,
      `float amount = (${P.blur.toFixed(4)} * amt)`
    )
  );

  // ── Layer 4: fluid noise distortion ───────────────────────────────────────
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

  // ── Layer 5: film grain ───────────────────────────────────────────────────
  h[5].speed = +(P.speed * 0.5).toFixed(4);
  let f5 = h[5].compiledFragmentShaders[0];
  f5 = f5.replace(
    /mix\(color\.rgb, blend\(1, grainRGB, color\.rgb\), [0-9.]+\)/,
    `mix(color.rgb, blend(1, grainRGB, color.rgb), ${P.grain.toFixed(4)})`
  );
  h[5].compiledFragmentShaders[0] = f5;

  // Update the inline script tag
  document.getElementById('my-scene-json').innerText = JSON.stringify(json);
}

// ─── Preload All Assets ──────────────────────────────────────────────────────
function preloadAllAssets() {
  const orbitImages = document.querySelectorAll('.orbit-image');
  
  // Total assets: images + font + svg + shader
  totalLoaderAssets = orbitImages.length + 3;

  // Initialize SVG mask paths
  const path1 = document.getElementById('mask-path-1');
  const path2 = document.getElementById('mask-path-2');
  if (path1 && path2) {
    const len1 = path1.getTotalLength ? path1.getTotalLength() : 40;
    const len2 = path2.getTotalLength ? path2.getTotalLength() : 40;
    path1.dataset.len = len1;
    path2.dataset.len = len2;
    path1.style.strokeDasharray = len1;
    path1.style.strokeDashoffset = len1; // Starts fully hidden
    path2.style.strokeDasharray = len2;
    path2.style.strokeDashoffset = len2; // Starts fully hidden
  }

  // 1. Preload all orbit images
  const imagePromises = Array.from(orbitImages).map(img => {
    return new Promise((resolve) => {
      const onLoad = () => { updateLoaderProgress(); resolve(); };
      if (img.complete && img.naturalWidth > 0) {
        onLoad();
      } else {
        img.onload = onLoad;
        img.onerror = onLoad; // resolve even on error to not block forever
      }
    });
  });

  // 2. Preload fonts
  const fontPromise = document.fonts ? document.fonts.ready.then(() => {
    updateLoaderProgress();
  }) : Promise.resolve().then(() => updateLoaderProgress());

  // 3. Preload SVG brandmark (likely already cached via <link rel="preload">)
  const svgPromise = new Promise((resolve) => {
    const svgImg = new Image();
    const onLoad = () => { updateLoaderProgress(); resolve(); };
    svgImg.onload = onLoad;
    svgImg.onerror = onLoad;
    svgImg.src = 'White Shodh AI Brandmark.svg';
  });

  // Combine all
  return Promise.all([...imagePromises, fontPromise, svgPromise])
    .then(() => {
      allAssetsLoaded = true;
      console.log('[Preloader] All assets loaded.');
      tryDismissLoader();
    })
    .catch(() => {
      // Failsafe: dismiss loader even if some assets fail
      allAssetsLoaded = true;
      console.warn('[Preloader] Some assets failed, proceeding anyway.');
      tryDismissLoader();
    });
}

// ─── Loader Dismissal (only when BOTH shader + assets are ready) ─────────────
function tryDismissLoader() {
  if (loaderDismissed) return;
  if (!allAssetsLoaded || !shaderReady) return;

  loaderDismissed = true;

  const loader = document.getElementById('loader');
  if (loader) {
    // Wait for the final stroke-dashoffset transition (400ms) before fading out
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
        // Unlock scroll after loader is gone
        document.body.classList.remove('loading-lock');
      }, 1300);
    }, 400); // Hold at 100% briefly
  } else {
    document.body.classList.remove('loading-lock');
  }

  // Trigger hero animations
  if (typeof playHeroAnimations === 'function') {
    setTimeout(() => {
      playHeroAnimations();
      // Restore scroll position after animations are set up
      restoreScrollPosition();
    }, 800); // 400ms hold + 400ms delay
  }
}

// ─── Render / reload the scene ───────────────────────────────────────────────
function renderScene() {
  const container = document.getElementById('unicorn-bg');

  // Destroy old scene
  if (activeScene) {
    try { activeScene.destroy(); } catch(_) {}
    activeScene = null;
  }
  container.innerHTML = '';

  updateSceneJson();

  UnicornStudio.addScene({
    element:  container,
    filePath: 'my-scene-json', // Script ID → SDK reads innerText synchronously
    fps:      60,
    scale:    1,
    dpi:      Math.min(window.devicePixelRatio, 1.5),
    lazyLoad: false
  })
  .then(scene => {
    activeScene = scene;
    // Mark shader as ready and attempt to dismiss loader
    shaderReady = true;
    updateLoaderProgress(); // Add shader to progress
    console.log('[Shader] WebGL scene rendered.');
    tryDismissLoader();
  })
  .catch(err => {
    console.error('[UnicornStudio] addScene failed:', err);
    // Even on shader failure, try to show the page
    shaderReady = true;
    tryDismissLoader();
  });
}

// ─── Debounced reload ─────────────────────────────────────────────────────────
function scheduleReload(ms = 200) {
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(renderScene, ms);
}

// ─── Wire controls ────────────────────────────────────────────────────────────
function setupControls() {
  // Toggle panel
  document.getElementById('toggleBtn').addEventListener('click', () => {
    document.getElementById('controlPanel').classList.toggle('collapsed');
  });

  // Color pickers
  ['c0','c1','c2','c3'].forEach(id => {
    const input = document.getElementById(id);
    const hex   = document.getElementById(id + 'hex');
    input.addEventListener('input', () => {
      P[id] = input.value;
      hex.textContent = input.value.toUpperCase();
      scheduleReload(220);
    });
    input.addEventListener('change', () => {
      clearTimeout(reloadTimer);
      P[id] = input.value;
      hex.textContent = input.value.toUpperCase();
      renderScene();
    });
  });

  // Range sliders
  [
    { id:'s-speed', key:'speed', vid:'v-speed', fmt: v => v.toFixed(2)+'×' },
    { id:'s-dist',  key:'dist',  vid:'v-dist',  fmt: v => v.toFixed(2) },
    { id:'s-wave',  key:'wave',  vid:'v-wave',  fmt: v => v.toFixed(2) },
    { id:'s-blur',  key:'blur',  vid:'v-blur',  fmt: v => v.toFixed(2) },
    { id:'s-grain', key:'grain', vid:'v-grain', fmt: v => v.toFixed(3) },
  ].forEach(({ id, key, vid, fmt }) => {
    const slider = document.getElementById(id);
    const label  = document.getElementById(vid);
    slider.addEventListener('input', () => {
      P[key] = parseFloat(slider.value);
      label.textContent = fmt(P[key]);
      scheduleReload(180);
    });
    slider.addEventListener('change', () => {
      clearTimeout(reloadTimer);
      P[key] = parseFloat(slider.value);
      label.textContent = fmt(P[key]);
      renderScene();
    });
  });

  // Reset
  document.getElementById('resetBtn').addEventListener('click', () => {
    P = { ...DEFAULTS };
    syncUI();
    renderScene();
  });

  // Toggle debug grids (Vertical columns & Horizontal rows) with 'G' key
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key.toLowerCase() === 'g') {
      const grid = document.querySelector('.debug-grid');
      const rows = document.querySelector('.debug-rows');
      if (grid) grid.classList.toggle('hidden');
      if (rows) rows.classList.toggle('hidden');
    }
  });

  console.log('%c[Debug Overlay] Press "G" on your keyboard to toggle alignment grids.', 'color: #818cf8; font-weight: bold;');
}

// ─── Sync UI to current P values ─────────────────────────────────────────────
function syncUI() {
  ['c0','c1','c2','c3'].forEach(id => {
    document.getElementById(id).value = P[id];
    document.getElementById(id+'hex').textContent = P[id].toUpperCase();
  });
  [
    { id:'s-speed', key:'speed', vid:'v-speed', fmt: v => v.toFixed(2)+'×' },
    { id:'s-dist',  key:'dist',  vid:'v-dist',  fmt: v => v.toFixed(2) },
    { id:'s-wave',  key:'wave',  vid:'v-wave',  fmt: v => v.toFixed(2) },
    { id:'s-blur',  key:'blur',  vid:'v-blur',  fmt: v => v.toFixed(2) },
    { id:'s-grain', key:'grain', vid:'v-grain', fmt: v => v.toFixed(3) },
  ].forEach(({ id, key, vid, fmt }) => {
    document.getElementById(id).value = P[key];
    document.getElementById(vid).textContent = fmt(P[key]);
  });
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
function setTheme(theme) {
  currentTheme = theme;
  document.body.dataset.theme = theme;

  // Swap shader colors
  const defaults = theme === 'light' ? DEFAULTS_LIGHT : DEFAULTS_DARK;
  P.c0 = defaults.c0;
  P.c1 = defaults.c1;
  P.c2 = defaults.c2;
  P.c3 = defaults.c3;

  // Sync control panel UI (if visible)
  syncUI();

  // Persist
  try { localStorage.setItem('shodh-theme', theme); } catch(_) {}

  // Re-render shader with new palette
  if (baseJson) renderScene();
}

function initTheme() {
  // Read saved preference (default: light)
  let saved = 'light';
  try { saved = localStorage.getItem('shodh-theme') || 'light'; } catch(_) {}

  currentTheme = saved;
  document.body.dataset.theme = saved;

  // Apply the saved palette to P before first render
  const defaults = saved === 'light' ? DEFAULTS_LIGHT : DEFAULTS_DARK;
  P.c0 = defaults.c0;
  P.c1 = defaults.c1;
  P.c2 = defaults.c2;
  P.c3 = defaults.c3;

  // Wire toggle button
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
async function boot() {
  // Lock scroll while loading
  document.body.classList.add('loading-lock');

  try {
    // Start preloading all assets immediately (runs in parallel with shader setup)
    preloadAllAssets();

    // Set a failsafe timeout - if assets take too long (15s), dismiss loader anyway
    setTimeout(() => {
      if (!loaderDismissed) {
        console.warn('[Boot] Failsafe timeout - dismissing loader.');
        allAssetsLoaded = true;
        shaderReady = true;

        // Force full fill on failsafe
        const path1 = document.getElementById('mask-path-1');
        const path2 = document.getElementById('mask-path-2');
        if (path1) path1.style.strokeDashoffset = 0;
        if (path2) path2.style.strokeDashoffset = 0;

        tryDismissLoader();
      }
    }, 15000);

    const res = await fetch('fluid-config.json');
    if (!res.ok) throw new Error(`HTTP ${res.status} loading fluid-config.json`);
    baseJson = await res.json();

    if (!baseJson.history || !baseJson.options) {
      throw new Error('fluid-config.json is missing history/options fields');
    }

    initTheme();        // read saved theme + set data-theme + apply palette
    setupControls();
    renderScene();      // will call tryDismissLoader() when shader is ready

  } catch (err) {
    console.error('[Boot]', err);
    const loader = document.getElementById('loader');
    if (loader) {
      loader.innerHTML = `
        <div style="text-align:center;font-family:monospace;padding:2rem">
          <p style="color:#f87171;font-size:1.1rem">⚠ Could not initialize shader</p>
          <p style="color:#6b7280;font-size:.85rem;margin-top:.5rem">${err.message}</p>
        </div>`;
    }
  }
}

// ─── Lenis Smooth Scroll ──────────────────────────────────────────────────────
let lenisInstance = null; // global reference for scroll persistence

function initLenis() {
  if (typeof Lenis === 'undefined') {
    console.warn('[Lenis] Not loaded, skipping smooth scroll.');
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  lenisInstance = lenis;

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Save scroll position before page unload
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('savedScrollY', lenis.scroll.toString());
  });

  console.log('[Lenis] Smooth scroll initialized.');
}

// ─── Restore scroll position from sessionStorage ─────────────────────────────
function restoreScrollPosition() {
  const saved = sessionStorage.getItem('savedScrollY');
  if (!saved) return;

  const scrollY = parseFloat(saved);
  if (isNaN(scrollY) || scrollY <= 0) return;

  sessionStorage.removeItem('savedScrollY');

  // Use Lenis to jump instantly (no smooth animation)
  if (lenisInstance) {
    lenisInstance.scrollTo(scrollY, { immediate: true });
  } else {
    window.scrollTo(0, scrollY);
  }

  // Refresh ScrollTrigger after position is restored
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    console.log('[Scroll Restore] Restored to', scrollY);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  boot();
  initLenis();
  initViewportResize();
  initFooterForm();
});

// ─── Footer contact form ────────────────────────────────────────────────────
function initFooterForm() {
  const form = document.getElementById('footer-contact-form');
  if (!form) return;

  const fields = form.querySelectorAll('.field');
  const recipientEmail = 'ellwil@shodh.ai';

  const openMailClient = (formData) => {
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = `New Shodh AI footer inquiry from ${name}`;
    const body = [
      'New footer contact form submission',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      '',
      'Message:',
      message,
    ].join('\n');

    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const showSuccess = (message) => {
    const successMessage = form.querySelector('.footer-form-success');

    if (successMessage) {
      successMessage.innerHTML = message;
    }

    form.classList.add('is-success');
    form.reset();
    fields.forEach((field) => field.classList.remove('is-filled'));
  };

  fields.forEach((field) => {
    const input = field.querySelector('.field__input');
    if (!input) return;

    const toggleFilled = () => {
      field.classList.toggle('is-filled', input.value.trim() !== '');
    };

    toggleFilled();
    input.addEventListener('input', toggleFilled);
    input.addEventListener('blur', toggleFilled);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.classList.remove('is-success', 'is-error');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitButton = form.querySelector('.footer-form-send');
    const formData = new FormData(form);

    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch('/api/footer-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        const details = await response.json().catch(() => ({}));
        throw new Error(details.error || 'Footer contact request failed');
      }

      showSuccess('Thank you.<br>Your message has been sent.<br>We will get back to you as soon as possible.');
    } catch (error) {
      console.error(error);
      openMailClient(formData);
      showSuccess(`Thank you.<br>Your email client has opened with the message addressed to ${recipientEmail}.<br>Please send it from there.`);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

// ─── Viewport Resize Handling (mobile URL bar) ───────────────────────────────
function initViewportResize() {
  const container = document.getElementById('unicorn-bg');
  if (!container) return;

  let lastH = window.innerHeight;
  let resizeDebounce = null;

  function onViewportResize() {
    const newH = window.innerHeight;
    // Only act if height changed by > 50px (URL bar toggle)
    if (Math.abs(newH - lastH) > 50) {
      lastH = newH;
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        // Force the UnicornStudio canvas to resize
        if (activeScene && typeof activeScene.resize === 'function') {
          activeScene.resize();
        }
      }, 150);
    }
  }

  // Use visualViewport API for precise mobile viewport tracking
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onViewportResize);
  }
  window.addEventListener('resize', onViewportResize);
}

// ─── Animations ───────────────────────────────────────────────────────────────
function playHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // Fade in the header
  tl.fromTo('.hero-header', 
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 1.2 },
    0.2
  );

  // Reveal the right text (line by line)
  tl.to('.hero-right .reveal-line > span', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.1
  }, 0.5);

  // Fade in the mission label
  tl.to('.mission-label', {
    opacity: 1,
    duration: 1
  }, 0.8);

  // Reveal the main title (line by line)
  tl.to('.main-title .reveal-line > span', {
    y: 0,
    opacity: 1,
    duration: 1.4,
    stagger: 0.15
  }, 0.9);

  // Initialize the scroll animation for section 2
  setupOrbitAnimation();

  // Initialize the process steps horizontal scroll (section 3)
  setupProcessSection();

  // Initialize footer scroll animations
  setupFooterAnimation();

  // Initialize IP security section animation
  setupIPSection();

  // Initialize "One Model" gap section animation
  setupGapSection();
}

function setupOrbitAnimation() {
  if (typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollTrigger not loaded');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const images = document.querySelectorAll('.orbit-image');
  const container = document.querySelector('.orbit-images-container');
  const section = document.querySelector('.orbit-section');
  if (!section || images.length === 0) return;

  const totalImages = images.length;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Orbit radii at different stages
  const largeRadiusX = window.innerWidth * 0.55;
  const largeRadiusY = window.innerHeight * 0.50;
  const smallRadiusX = window.innerWidth * 0.32 * 1.25;
  const smallRadiusY = window.innerHeight * 0.30 * 1.25;
  const exitRadiusX = window.innerWidth * 0.9;
  const exitRadiusY = window.innerHeight * 0.85;

  // Initial text states
  gsap.set(['#shift-label', '#shift-heading', '#shift-body'], { opacity: 0, y: 50 });
  const content2Lines = document.querySelectorAll('#shift-content-2 .reveal-line > span');
  gsap.set('#shift-content-2', { opacity: 0 });
  gsap.set(content2Lines, { y: '110%', opacity: 0 });

  // 1. Setup image sizes and calculate all positions
  const imageSetupPromises = Array.from(images).map((img, i) => {
    return new Promise((resolve) => {
      const setup = () => {
        const nw = img.naturalWidth || 1;
        const nh = img.naturalHeight || 1;
        const isLandscape = nw >= nh;

        // Base size between 135px and 210px on desktop, halved on mobile
        const isMobile = window.innerWidth <= 768;
        const baseSize = (135 + Math.random() * 75) * (isMobile ? 0.5 : 1);
        if (isLandscape) {
          img.style.width = (baseSize * 1.25) + 'px';
          img.style.height = baseSize + 'px';
        } else {
          img.style.width = baseSize + 'px';
          img.style.height = (baseSize * 1.25) + 'px';
        }

        const orbitAngle = (i / totalImages) * Math.PI * 2;

        // Scatter positions: distribute across entire screen (edges, corners, sides)
        // Divide screen into a grid and pick positions that cover the full area
        const zones = [
          // Corners
          { xMin: 0, xMax: 0.15, yMin: 0, yMax: 0.15 },
          { xMin: 0.85, xMax: 1, yMin: 0, yMax: 0.15 },
          { xMin: 0, xMax: 0.15, yMin: 0.85, yMax: 1 },
          { xMin: 0.85, xMax: 1, yMin: 0.85, yMax: 1 },
          // Edges
          { xMin: 0.25, xMax: 0.75, yMin: 0, yMax: 0.1 },
          { xMin: 0.25, xMax: 0.75, yMin: 0.9, yMax: 1 },
          { xMin: 0, xMax: 0.1, yMin: 0.3, yMax: 0.7 },
          { xMin: 0.9, xMax: 1, yMin: 0.3, yMax: 0.7 },
          // Mid-areas (not dead center)
          { xMin: 0.15, xMax: 0.4, yMin: 0.15, yMax: 0.4 },
          { xMin: 0.6, xMax: 0.85, yMin: 0.15, yMax: 0.4 },
          { xMin: 0.15, xMax: 0.4, yMin: 0.6, yMax: 0.85 },
          { xMin: 0.6, xMax: 0.85, yMin: 0.6, yMax: 0.85 },
          // Extra scatter zones
          { xMin: 0, xMax: 0.3, yMin: 0.4, yMax: 0.6 },
          { xMin: 0.7, xMax: 1, yMin: 0.4, yMax: 0.6 },
          { xMin: 0.3, xMax: 0.5, yMin: 0.15, yMax: 0.35 },
          { xMin: 0.5, xMax: 0.7, yMin: 0.65, yMax: 0.85 },
        ];
        const zone = zones[i % zones.length];
        const scatterX = (zone.xMin + Math.random() * (zone.xMax - zone.xMin)) * window.innerWidth;
        const scatterY = (zone.yMin + Math.random() * (zone.yMax - zone.yMin)) * window.innerHeight;

        // 3 size groups for scatter phase:
        // Group 0 (indices 0,3,6,9,12,15): 1.5x larger
        // Group 1 (indices 1,4,7,10,13): 0.6x smaller
        // Group 2 (indices 2,5,8,11,14): normal (1x)
        const group = i % 3;
        let scatterScale;
        if (group === 0) {
          scatterScale = 1.5;  // larger
        } else if (group === 1) {
          scatterScale = 0.6;  // smaller
        } else {
          scatterScale = 1.0;  // normal
        }

        // Large orbit position
        const lgX = centerX + Math.cos(orbitAngle) * largeRadiusX;
        const lgY = centerY + Math.sin(orbitAngle) * largeRadiusY;

        // Small orbit position
        const smX = centerX + Math.cos(orbitAngle) * smallRadiusX;
        const smY = centerY + Math.sin(orbitAngle) * smallRadiusY;

        // Exit position (expanded far out)
        const exX = centerX + Math.cos(orbitAngle) * exitRadiusX;
        const exY = centerY + Math.sin(orbitAngle) * exitRadiusY;

        // Set initial state: scattered randomly with varied sizes
        gsap.set(img, {
          x: scatterX,
          y: scatterY,
          opacity: 0,
          scale: scatterScale,
          rotation: 0,
          transformOrigin: '50% 50%',
          force3D: true
        });

        // Store all positions
        img.dataset.largeX = lgX;
        img.dataset.largeY = lgY;
        img.dataset.smallX = smX;
        img.dataset.smallY = smY;
        img.dataset.exitX = exX;
        img.dataset.exitY = exY;
        resolve();
      };

      if (img.complete && img.naturalWidth > 0) {
        setup();
      } else {
        img.onload = setup;
        img.onerror = setup;
      }
    });
  });
  Promise.all(imageSetupPromises).then(() => {});

  // 2. Create ScrollTrigger Timeline
  // Extended to +=3200 to include the process slide-in (Phase 6)
  // so the transition is seamless - no gap between orbit and process.
  const processSection = document.getElementById('section-process');
  const processTrack   = document.getElementById('process-track');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=3800",
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        // Make process section overlay the viewport during Phase 6.
        // 66% progress ≈ timeline position ~3.9 (text/images fully gone).
        if (processSection) {
          if (self.progress > 0.66) {
            processSection.classList.add('process-fixed-overlay');
          } else {
            processSection.classList.remove('process-fixed-overlay');
          }
        }
      },
      // Keep process-fixed-overlay active on leave - Phase B's pin takes over.
      onLeaveBack: () => {
        if (processSection) {
          processSection.classList.remove('process-fixed-overlay');
        }
      }
    }
  });

  // ── Phase 1 (0–1.5): Scattered → Large orbit + Text 1 appears ──
  tl.to(['#shift-label', '#shift-heading', '#shift-body'], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
  }, 0);

  images.forEach((img) => {
    tl.to(img, {
      x: parseFloat(img.dataset.largeX),
      y: parseFloat(img.dataset.largeY),
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0);
  });

  // ── Continuous rotation throughout (0–4) ──
  tl.to(container, {
    rotation: 540,
    duration: 4,
    ease: "none"
  }, 0);

  // Counter-rotate each image to keep them upright
  images.forEach((img) => {
    tl.to(img, {
      rotation: -540,
      duration: 4,
      ease: "none"
    }, 0);
  });

  // ── Phase 2 (1.5–3.0): Large orbit → Small orbit (shrinking) ──
  images.forEach((img) => {
    tl.to(img, {
      x: parseFloat(img.dataset.smallX),
      y: parseFloat(img.dataset.smallY),
      duration: 1.5,
      ease: "power1.inOut"
    }, 1.5);
  });

  // ── Phase 3 (1.8): Text 1 fades out ──
  tl.to(['#shift-label', '#shift-heading', '#shift-body'], {
    opacity: 0,
    y: -40,
    duration: 0.8,
    stagger: 0.1
  }, 1.8);

  // ── Phase 4 (2.4): Text 2 reveals ──
  tl.to('#shift-content-2', { opacity: 1, duration: 0.05 }, 2.4);
  tl.to(content2Lines, {
    y: 0,
    opacity: 1,
    duration: 0.55,
    stagger: 0.35,
    ease: 'power2.out'
  }, 2.4);

  // ── Phase 5 (3.0–4.0): Orbit expands + images disappear ──
  images.forEach((img) => {
    tl.to(img, {
      x: parseFloat(img.dataset.exitX),
      y: parseFloat(img.dataset.exitY),
      opacity: 0,
      scale: 0.6,
      duration: 1.0,
      ease: "power2.in"
    }, 3.0);
  });

  // Text 2 fades out as images exit
  tl.to('#shift-content-2', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.in'
  }, 3.4);

  // ── Phase 6 (4.0–5.0): Process section slides in from right ──
  // The onUpdate callback above toggles position:fixed on the process
  // section so it overlays the viewport. We animate its track here.
  if (processTrack && processSection) {
    const pSteps = processTrack.querySelectorAll('.process-step');
    const s0     = pSteps[0];
    if (s0) {
      const s0Body    = s0.querySelectorAll('.process-body-text .reveal-line > span');
      const s0Eyebrow = s0.querySelector('.process-eyebrow');
      const s0Heads   = s0.querySelectorAll('.process-heading .reveal-line > span');
      const s0Right   = s0.querySelector('.process-right-inner');

      // Slide track from off-screen right into position (slow & smooth)
      tl.fromTo(processTrack,
        { x: '100vw' },
        { x: 0, duration: 2.0, ease: 'power3.out' },
        4.0
      );

      // Reveal step 0 content
      tl.to(s0Heads, {
        y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out'
      }, 4.3);
      tl.to(s0Eyebrow, {
        opacity: 1, duration: 0.3, ease: 'power2.out'
      }, 4.4);
      tl.to(s0Body, {
        y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out'
      }, 4.5);
      tl.to(s0Right, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        onStart: () => {
          s0.classList.remove('icon-animate');
          void s0.offsetWidth;
          s0.classList.add('icon-animate');
        }
      }, 4.4);
    }
  }
}

// ─── Section 3: Process Steps ──────────────────────────────────────────────────
function setupProcessSection() {
  if (typeof ScrollTrigger === 'undefined') return;

  const section = document.getElementById('section-process');
  const track   = document.getElementById('process-track');
  if (!section || !track) return;

  const steps    = track.querySelectorAll('.process-step');
  const numSteps = steps.length;
  if (numSteps === 0) return;

  // Initial state: track off-screen right
  gsap.set(track, { x: '100vw' });

  // Hide all step content initially
  steps.forEach(step => {
    gsap.set(step.querySelectorAll('.process-body-text .reveal-line > span'), { y: '110%', opacity: 0 });
    gsap.set(step.querySelector('.process-eyebrow'), { opacity: 0 });
    gsap.set(step.querySelectorAll('.process-heading .reveal-line > span'), { y: '110%', opacity: 0 });
    gsap.set(step.querySelector('.process-right-inner'), { opacity: 0, y: 30 });
  });

  // Phase A (first panel slide-in) is handled inside setupOrbitAnimation()
  // as Phase 6 of the orbit timeline, so the transition is seamless.

  // ═══════════════════════════════════════════════════════════════════════
  // PHASE B: Pinned horizontal scroll - steps 2+ slide in while pinned.
  //          Step 1 is already fully visible from Phase A / orbit Phase 6.
  // ═══════════════════════════════════════════════════════════════════════
  const stepDur     = 3;
  const holdFactor  = 0.25;
  const remaining   = numSteps - 1;  // panels after the first

  if (remaining > 0) {
    const totalScroll = Math.round(remaining * 2500 * ((remaining + holdFactor) / (remaining + 1)));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start:  'top top',
        end:    '+=' + totalScroll,
        pin:    true,
        scrub:  1.5,
        onEnter: () => {
          // Remove the fixed overlay from orbit Phase 6 -
          // ScrollTrigger's own pin (position:fixed) takes over seamlessly.
          section.classList.remove('process-fixed-overlay');
        }
      }
    });

    for (let i = 1; i < numSteps; i++) {
      const step         = steps[i];
      const bodyLines    = step.querySelectorAll('.process-body-text .reveal-line > span');
      const eyebrow      = step.querySelector('.process-eyebrow');
      const headingLines = step.querySelectorAll('.process-heading .reveal-line > span');
      const rightInner   = step.querySelector('.process-right-inner');

      const idx        = i - 1;           // 0-based for this timeline
      const slideStart = idx * stepDur;
      const targetX    = -(i * 100) + 'vw';

      // ── Slide track to show this step ──
      tl.to(track, {
        x: targetX,
        duration: 2,
        ease: 'none'
      }, slideStart);

      // ── Heading reveals first ──
      tl.to(headingLines, {
        y: 0, opacity: 1,
        duration: 0.5, stagger: 0.1,
        ease: 'power2.out'
      }, slideStart + 0.3);

      // ── Eyebrow fades in ──
      tl.to(eyebrow, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, slideStart + 0.5);

      // ── Body text lines reveal ──
      tl.to(bodyLines, {
        y: 0, opacity: 1,
        duration: 0.6, stagger: 0.12,
        ease: 'power2.out'
      }, slideStart + 0.7);

      // ── Right-side icon + labels ──
      tl.to(rightInner, {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        onStart: () => {
          step.classList.remove('icon-animate');
          void step.offsetWidth;
          step.classList.add('icon-animate');
        }
      }, slideStart + 0.5);
    }

    // ── Hold the last step on screen before unpinning ──
    const holdStart = remaining * stepDur;
    tl.to({}, { duration: stepDur * holdFactor }, holdStart);
  } else {
    // Only one step - just pin briefly to hold it
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=800',
        pin: true,
        scrub: 1.5,
      }
    });
  }

  // ── Compute actual SVG path lengths for precise line-drawing ──
  initIconPathLengths();
}

// ─── Icon Path Length Initialization ─────────────────────────────────────────
function initIconPathLengths() {
  const paths = document.querySelectorAll('.icon-animated-path');
  paths.forEach(path => {
    try {
      const length = path.getTotalLength();
      path.style.setProperty('--path-length', length);
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    } catch (e) {
      // Fallback: use the hardcoded value from inline style
    }
  });
}

// ─── Section 4: Footer Animations ─────────────────────────────────────────────
function setupFooterAnimation() {
  if (typeof ScrollTrigger === 'undefined') return;

  const footerSection = document.getElementById('section-footer');
  if (!footerSection) return;

  const animElements = footerSection.querySelectorAll('.animate-footer-in');

  gsap.to(animElements, {
    scrollTrigger: {
      trigger: footerSection,
      start: 'top 80%',
      end: 'top 20%',
      scrub: false,
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power2.out',
  });
}

// ─── Section: IP Security Animation ─────────────────────────────────────────────────
function setupIPSection() {
  if (typeof ScrollTrigger === 'undefined') return;

  const section = document.getElementById('section-ip');
  if (!section) return;

  const heading = document.getElementById('ip-heading');
  const body = document.getElementById('ip-body');
  const lines = section.querySelectorAll('.ip-border-line');

  // Measure and setup stroke-dash for each SVG line
  lines.forEach(line => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
  });

  // Trigger animations when section enters viewport
  ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Heading animates in
      tl.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 0);

      // Body text animates in
      tl.to(body, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, 0.3);

      // Border lines draw on with stagger
      lines.forEach((line, i) => {
        tl.to(line, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power1.inOut'
        }, 0.4 + i * 0.12);
      });
    }
  });
}

// ─── Section: "One Model" Gap Animation ──────────────────────────────────────
function setupGapSection() {
  if (typeof ScrollTrigger === 'undefined') return;

  const section = document.getElementById('section-gap');
  if (!section) return;

  const cover = document.getElementById('gap-cover');
  const testimonial = document.getElementById('gap-testimonial');
  const images = section.querySelectorAll('.gap-image');
  const headingLeft = section.querySelector('.gap-heading.is-left');
  const headingRight = section.querySelector('.gap-heading.is-right');

  if (!headingLeft || !headingRight) return;

  // ── Manual character splitting (no SplitText plugin needed) ──
  function splitChars(el) {
    const lines = (el.dataset.lines || el.textContent).split('|');
    el.innerHTML = '';
    const chars = [];
    lines.forEach((lineText) => {
      const line = document.createElement('span');
      line.className = 'gap-line';
      for (let i = 0; i < lineText.length; i++) {
        const span = document.createElement('span');
        span.className = 'gap-char';
        span.textContent = lineText[i] === ' ' ? '\u00A0' : lineText[i];
        line.appendChild(span);
        chars.push(span);
      }
      el.appendChild(line);
    });
    return chars;
  }

  const leftChars = splitChars(headingLeft);
  const rightChars = splitChars(headingRight);

  // ── Initial states ──
  // Characters: pushed outward, invisible, slightly squished
  gsap.set(leftChars, { x: -80, opacity: 0, scaleY: 0.95, display: 'inline-block' });
  gsap.set(rightChars, { x: 80, opacity: 0, scaleY: 0.95, display: 'inline-block' });

  // Cover: collapsed via clip-path (set in CSS)
  // Testimonial: hidden (set in CSS)

  // ── Pin the section when it reaches the top (holds it in place after animation) ──
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=300',
    pin: true,
    invalidateOnRefresh: true
  });

  // ── Scroll-driven animation: plays as section scrolls from ~50% visible to fully visible ──
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 60%',
      end: 'top top',
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  });

  // Animation 1: Expand image cover via clip-path
  tl.fromTo(cover,
    { clipPath: 'inset(50% 50% 50% 50% round 0.25rem)' },
    { clipPath: 'inset(0% 0% 0% 0% round 0.25rem)', duration: 1, ease: 'none' },
    0
  );

  // Animation 2: Character reveal - left text (stagger from end → chars slide inward)
  tl.to(leftChars, {
    keyframes: {
      '40%': { opacity: 1 },
      '90%': { x: 0, scaleY: 1 },
      '100%': {}
    },
    duration: 1,
    ease: 'expo.out',
    stagger: { each: 0.022, from: 'end' }
  }, 0);

  // Animation 2b: Character reveal - right text (stagger from start → chars slide inward)
  tl.to(rightChars, {
    keyframes: {
      '40%': { opacity: 1 },
      '90%': { x: 0, scaleY: 1 },
      '100%': {}
    },
    duration: 1,
    ease: 'expo.out',
    stagger: { each: 0.022, from: 'start' }
  }, 0);

  // Animation 3: Testimonial fades in (after text + cover are mostly done)
  tl.to(testimonial, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, 0.7);

  // ── Image Slideshow (endless continuous loop - never stops) ──
  let currentImg = 0;

  function switchImage() {
    if (images.length <= 1) return;
    gsap.set(images[currentImg], { opacity: 0 });
    currentImg = (currentImg + 1) % images.length;
    gsap.set(images[currentImg], { opacity: 1 });
  }

  // Start the loop immediately and keep it running forever
  setInterval(switchImage, 800);
}
