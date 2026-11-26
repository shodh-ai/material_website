/* Touch devices read the same content using native scroll, without a GPU scene. */
(() => {
  const root = document.documentElement;
  const nativeLayout = matchMedia('(max-width: 800px), (pointer: coarse), (prefers-reduced-motion: reduce)').matches;
  const version = '20261126-mobile';
  function nativeFallback() {
    root.dataset.nativeScroll = 'true';
    document.getElementById('native-scroll-style').media = 'all';
    document.getElementById('loader')?.remove();
    document.body.classList.remove('loading-lock');
  }
  function script(src) {
    return new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.async = false;
      el.onload = resolve;
      el.onerror = () => reject(new Error('Unable to load ' + src));
      document.head.append(el);
    });
  }
  async function start() {
    if (nativeLayout) {
      nativeFallback();
    } else {
      try {
        // Preserve script order: ScrollTrigger follows GSAP. Three.js is unused.
        await Promise.all([
          'vendor/lenis.min.js', 'vendor/gsap.min.js',
          'vendor/ScrollTrigger.min.js', 'vendor/unicornStudio.umd.js'
        ].map(script));
      } catch (error) {
        console.warn('[Site] Using native layout:', error);
        nativeFallback();
      }
    }
    try { await script('main.js?v=' + version); }
    catch (error) { nativeFallback(); console.warn('[Site]', error); }
  }
  start();
})();
