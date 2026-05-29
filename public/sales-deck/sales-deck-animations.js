/**
 * Sales deck — Lenis smooth scroll + GSAP / ScrollTrigger animations.
 */

(function initSalesDeckAnimations() {
  const LENIS_EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

  const MASK = {
    duration: 0.547,
    stagger: 0.065,
    ease: 'power3.out',
    y: 30 * 0.58,
  };

  const FADE = {
    duration: 0.52,
    stagger: 0.07,
    delay: 0.12,
    ease: 'power2.out',
  };

  let lenis = null;
  let snapTimer = null;
  let isSnapping = false;
  let userHasScrolled = false;
  let slides = [];
  let slideOffsets = [];

  const scrollEl = document.getElementById('sales-deck-scroll');
  const contentEl = document.getElementById('sales-deck-content');

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function cacheSlideOffsets() {
    slides = [...document.querySelectorAll('.sd-slide')];
    slideOffsets = slides.map((slide) => slide.offsetTop);
  }

  function splitHeadingIntoLines(heading) {
    const explicitLines = [...heading.querySelectorAll(':scope > .sd-text-line')];
    if (explicitLines.length) {
      const fullText = explicitLines.map((line) => line.textContent.trim()).join(' ');
      heading.classList.add('sd-mask-host');
      heading.style.opacity = '1';
      heading.setAttribute('aria-label', fullText);

      return explicitLines.map((lineEl) => {
        const line = document.createElement('span');
        line.className = 'sd-mask-line';
        const inner = document.createElement('span');
        inner.className = 'sd-mask-line-inner sd-text-line';
        inner.textContent = lineEl.textContent;
        line.appendChild(inner);
        lineEl.replaceWith(line);
        return inner;
      });
    }

    const brLines = [];
    let currentLine = '';
    heading.childNodes.forEach((node) => {
      if (node.nodeName === 'BR') {
        brLines.push(currentLine.trim());
        currentLine = '';
      } else {
        currentLine += node.textContent || '';
      }
    });
    brLines.push(currentLine.trim());
    const htmlLines = brLines.filter(Boolean);

    if (htmlLines.length > 1) {
      const fullText = htmlLines.join(' ');
      heading.textContent = '';
      heading.classList.add('sd-mask-host');
      heading.style.opacity = '1';
      heading.setAttribute('aria-label', fullText);

      return htmlLines.map((lineText) => {
        const line = document.createElement('span');
        line.className = 'sd-mask-line';
        const inner = document.createElement('span');
        inner.className = 'sd-mask-line-inner';
        inner.textContent = lineText;
        line.appendChild(inner);
        heading.appendChild(line);
        return inner;
      });
    }

    const text = heading.textContent.trim();
    if (!text) return [];

    heading.textContent = '';
    heading.classList.add('sd-mask-host');
    heading.style.opacity = '1';
    heading.setAttribute('aria-label', text);

    const measureHost = document.createElement('span');
    measureHost.className = 'sd-mask-measure';
    measureHost.setAttribute('aria-hidden', 'true');
    heading.appendChild(measureHost);

    const words = text.split(/\s+/);
    const measureSpans = words.map((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + (index < words.length - 1 ? ' ' : '');
      measureHost.appendChild(span);
      return span;
    });

    const lineGroups = [];
    let currentGroup = [];
    let lastTop = null;

    measureSpans.forEach((span) => {
      const top = span.offsetTop;
      if (lastTop !== null && top !== lastTop) {
        lineGroups.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(span);
      lastTop = top;
    });

    if (currentGroup.length) lineGroups.push(currentGroup);

    measureHost.remove();

    return lineGroups.map((group) => {
      const line = document.createElement('span');
      line.className = 'sd-mask-line';
      const inner = document.createElement('span');
      inner.className = 'sd-mask-line-inner';
      inner.textContent = group.map((span) => span.textContent).join('');
      line.appendChild(inner);
      heading.appendChild(line);
      return inner;
    });
  }

  function getFadeTargets(slide) {
    return [...slide.querySelectorAll('.sd-h2, .sd-label.sd-details, .sd-details')].filter(
      (el) => !el.matches('.sd-h1') && !el.querySelector('.sd-h1')
    );
  }

  function revealSlide(slide) {
    if (slide.classList.contains('sd-slide--animated')) return;
    slide.classList.add('sd-slide--visible', 'sd-slide--animated');

    if (prefersReducedMotion()) return;

    const headings = [...slide.querySelectorAll('.sd-h1')];
    const fadeTargets = getFadeTargets(slide);
    const lineUnits = [];

    headings.forEach((heading) => {
      if (heading.dataset.sdPrepared === 'true') return;
      heading.dataset.sdPrepared = 'true';
      lineUnits.push(...splitHeadingIntoLines(heading));
    });

    if (lineUnits.length) {
      gsap.fromTo(
        lineUnits,
        { y: MASK.y, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          duration: MASK.duration,
          stagger: MASK.stagger,
          ease: MASK.ease,
          onComplete() {
            gsap.set(lineUnits, { clearProps: 'transform' });
          },
        }
      );
    }

    if (fadeTargets.length) {
      gsap.fromTo(
        fadeTargets,
        { opacity: 0 },
        {
          opacity: 1,
          duration: FADE.duration,
          stagger: FADE.stagger,
          delay: headings.length ? FADE.delay : 0,
          ease: FADE.ease,
        }
      );
    }
  }

  function initSlideAnimations() {
    slides.forEach((slide) => {
      ScrollTrigger.create({
        trigger: slide,
        scroller: scrollEl,
        start: 'top 70%',
        once: true,
        onEnter: () => revealSlide(slide),
      });
    });
  }

  function snapToNearestSlide() {
    if (!lenis || isSnapping || !userHasScrolled || prefersReducedMotion()) return;

    const scroll = lenis.scroll;
    let targetIndex = 0;
    let minDist = Infinity;

    slideOffsets.forEach((offset, index) => {
      const dist = Math.abs(offset - scroll);
      if (dist < minDist) {
        minDist = dist;
        targetIndex = index;
      }
    });

    if (minDist < 8) return;

    isSnapping = true;
    lenis.scrollTo(slideOffsets[targetIndex], {
      duration: 0.85,
      easing: LENIS_EASING,
      onComplete: () => {
        isSnapping = false;
      },
    });
  }

  function scheduleSnap() {
    if (!userHasScrolled) return;
    clearTimeout(snapTimer);
    snapTimer = setTimeout(snapToNearestSlide, 180);
  }

  function markUserScroll() {
    if (!userHasScrolled) userHasScrolled = true;
  }

  function isTouchPrimary() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  function initLenis() {
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') {
      console.warn('[Sales deck] Lenis/GSAP not loaded.');
      return;
    }

    // Touch devices: Lenis only smooths the mouse wheel, and the wrapper is
    // overflow:hidden, so native touch scrolling is blocked. Fall back to
    // native scrolling (same path as reduced-motion) so phones can scroll.
    if (prefersReducedMotion() || isTouchPrimary()) {
      scrollEl.style.overflowY = 'auto';
      scrollEl.style.webkitOverflowScrolling = 'touch';
      return;
    }

    lenis = new Lenis({
      wrapper: scrollEl,
      content: contentEl,
      duration: 1.05,
      easing: LENIS_EASING,
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ({ velocity }) => {
      ScrollTrigger.update();

      if (isSnapping) return;
      if (Math.abs(velocity) > 0.08) {
        clearTimeout(snapTimer);
        return;
      }
      scheduleSnap();
    });

    scrollEl.addEventListener('wheel', markUserScroll, { passive: true });
    scrollEl.addEventListener('touchstart', markUserScroll, { passive: true });
    scrollEl.addEventListener('keydown', markUserScroll);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  function initScrollTrigger() {
    if (typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ scroller: scrollEl });

    if (lenis) {
      ScrollTrigger.scrollerProxy(scrollEl, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: scrollEl.clientWidth,
            height: scrollEl.clientHeight,
          };
        },
        pinType: scrollEl.style.transform ? 'transform' : 'fixed',
      });
    }

    initSlideAnimations();
  }

  function init() {
    if (!scrollEl || !contentEl) return;

    cacheSlideOffsets();
    initLenis();
    initScrollTrigger();

    requestAnimationFrame(() => {
      const firstSlide = slides[0];
      if (firstSlide) revealSlide(firstSlide);
      ScrollTrigger.refresh();
    });

    window.addEventListener(
      'resize',
      () => {
        cacheSlideOffsets();
        ScrollTrigger.refresh();
      },
      { passive: true }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
