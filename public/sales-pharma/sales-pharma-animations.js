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

  // Self-drawing illustration reveal: stroked geometry traces itself in while
  // every shape gently fades, so the figure looks like it is being formed.
  // Staggers use `amount` so the total spread stays constant regardless of how
  // many shapes a figure has — keeps the pacing consistent and calm.
  const FIGURE = {
    drawDuration: 1.15,
    drawSpread: 0.9,
    drawEase: 'power1.inOut',
    fadeDuration: 0.75,
    fadeSpread: 0.7,
    fadeEase: 'sine.out',
    delay: 0.15,
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
      (el) =>
        !el.matches('.sd-h1') &&
        !el.querySelector('.sd-h1') &&
        !el.matches('figure') &&
        !el.closest('figure')
    );
  }

  // Animate a single SVG illustration: trace stroked lines via dash offset and
  // fade every shape in, so it reads as the drawing forming naturally.
  function animateFigure(figure) {
    if (figure.dataset.sdFigureAnimated === 'true') return;
    figure.dataset.sdFigureAnimated = 'true';

    const shapes = [...figure.querySelectorAll('path, line, polyline, polygon, circle, ellipse, rect, text')].filter(
      (el) => !el.closest('defs')
    );
    if (!shapes.length) return;

    // Pass 1 — read all geometry/styles up front so we never interleave reads
    // and writes (avoids forced synchronous layout / jank during the reveal).
    const measured = shapes.map((el) => {
      let length = 0;
      if (typeof el.getTotalLength === 'function') {
        try {
          length = el.getTotalLength();
        } catch (err) {
          length = 0;
        }
      }
      const cs = getComputedStyle(el);
      const strokeWidth = parseFloat(cs.strokeWidth) || 0;
      const hasStroke = !!cs.stroke && cs.stroke !== 'none' && strokeWidth > 0;
      const hasDashPattern = !!cs.strokeDasharray && cs.strokeDasharray !== 'none';
      // Only trace solid strokes; leave already-dashed strokes to just fade in.
      const draw = length > 1 && hasStroke && !hasDashPattern;
      return { el, length, draw };
    });

    // Pass 2 — apply the hidden starting state (writes only).
    const strokeEls = [];
    measured.forEach(({ el, length, draw }) => {
      if (draw) {
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        strokeEls.push(el);
      }
    });
    gsap.set(shapes, { opacity: 0 });

    const tl = gsap.timeline({ delay: FIGURE.delay });

    tl.to(
      shapes,
      {
        opacity: 1,
        duration: FIGURE.fadeDuration,
        stagger: { amount: FIGURE.fadeSpread },
        ease: FIGURE.fadeEase,
      },
      0
    );

    if (strokeEls.length) {
      tl.to(
        strokeEls,
        {
          strokeDashoffset: 0,
          duration: FIGURE.drawDuration,
          stagger: { amount: FIGURE.drawSpread },
          ease: FIGURE.drawEase,
          onComplete() {
            gsap.set(strokeEls, { clearProps: 'strokeDasharray,strokeDashoffset' });
          },
        },
        0
      );
    }
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

    [...slide.querySelectorAll('figure')].forEach(animateFigure);
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
