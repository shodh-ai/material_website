"use strict";
const papers = JSON.parse(document.getElementById("paper-data").textContent);
function legacyRoute() {
  const match = location.hash.match(/^#paper\/(P\d+)(?:\/read)?$/);
  if (match) {
    const paper = papers.find(p => p.id === match[1]);
    if (paper) location.replace("/research/" + paper.slug);
  } else if (location.hash === "#about") location.replace("/research/about");
}
legacyRoute();
window.addEventListener("hashchange", legacyRoute);
const search = document.getElementById("search");
if (search) {
  let domain = "All topics";
  const filters = document.getElementById("filters");
  const reset = document.getElementById("reset-filters");
  const domains = ["All topics", ...new Set(papers.map(p => p.domain))];
  document.querySelectorAll("[data-enhanced]").forEach(el => el.hidden = false);
  function update() {
    let count = 0;
    const query = search.value.trim().toLowerCase();
    for (const p of papers) {
      const visible = (domain === "All topics" || p.domain === domain) &&
        [p.title, p.question, p.abstract, p.domain, ...(p.authors || [])].join(" ").toLowerCase().includes(query);
      document.querySelector(`[data-paper="${p.id}"]`).hidden = !visible;
      if (visible) count++;
    }
    const filtered = domain !== "All topics" || query !== "";
    document.getElementById("result-count").textContent = filtered ? `${count} of ${papers.length} papers` : `${papers.length} papers`;
    reset.hidden = !filtered;
    filters.querySelectorAll("button").forEach(button => {
      const active = button.textContent === domain;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }
  for (const value of domains) {
    const button = document.createElement("button");
    button.className = "chip";
    button.textContent = value;
    button.addEventListener("click", () => { domain = value; update(); });
    filters.append(button);
  }
  search.addEventListener("input", update);
  reset.addEventListener("click", () => { domain = "All topics"; search.value = ""; update(); });
  update();
}

// Glass cards rise in as they scroll into view. Only content below the fold is
// hidden first, so nothing on screen flickers and nothing stays hidden without JS.
(() => {
  const items = [...document.querySelectorAll(".reveal")];
  if (!items.length || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry, i) => {
      const el = entry.target;
      observer.unobserve(el);
      el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
      el.classList.remove("reveal-pending");
      setTimeout(() => { el.style.transitionDelay = ""; }, 1200);
    });
  }, { rootMargin: "0px 0px -6% 0px" });
  for (const el of items) {
    if (el.getBoundingClientRect().top > innerHeight * 0.94) {
      el.classList.add("reveal-pending");
      observer.observe(el);
    }
  }
})();

// "Abstract" on a paper card opens a small centred note instead of expanding the
// card. Without <dialog> support the original inline <details> still works.
(() => {
  if (typeof HTMLDialogElement !== "function") return;
  const byId = new Map(papers.map((p) => [p.id, p]));
  const dialog = document.createElement("dialog");
  dialog.className = "abstract-dialog";
  dialog.setAttribute("aria-labelledby", "abstract-dialog-title");
  dialog.innerHTML = '<div class="dialog-body"><button class="dialog-close" type="button" aria-label="Close abstract"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12"/></svg></button><span class="eyebrow"></span><h2 id="abstract-dialog-title"></h2><p class="dialog-abstract"></p><a class="button dialog-read" href="">Read paper <span aria-hidden="true">→</span></a></div>';
  document.body.append(dialog);
  const [eyebrow, title, text, read] = [".eyebrow", "h2", ".dialog-abstract", ".dialog-read"].map((s) => dialog.querySelector(s));

  function open(paper) {
    eyebrow.textContent = paper.domain;
    title.textContent = paper.title;
    text.textContent = paper.abstract;
    read.href = "/research/" + paper.slug;
    document.documentElement.classList.add("dialog-open");
    dialog.showModal();
    dialog.querySelector(".dialog-close").focus();
  }

  // Unlock page scrolling on every way out; the async "close" event alone is not
  // always delivered promptly (e.g. in background tabs).
  const unlock = () => document.documentElement.classList.remove("dialog-open");
  const shut = () => { dialog.close(); unlock(); };
  dialog.addEventListener("close", unlock);
  dialog.addEventListener("cancel", unlock); // Esc key
  dialog.querySelector(".dialog-close").addEventListener("click", shut);
  // A click on the dimmed backdrop (outside the note) closes it.
  dialog.addEventListener("click", (event) => { if (event.target === dialog) shut(); });
  document.addEventListener("click", (event) => {
    const summary = event.target.closest(".list-abstract > summary");
    const paper = summary && byId.get(summary.closest("[data-paper]")?.dataset.paper);
    if (!paper) return;
    event.preventDefault();
    open(paper);
  });
})();

// Share row on paper pages: the device share sheet where available, plus copy link.
document.querySelectorAll("[data-native-share]").forEach((button) => {
  if (!navigator.share) return;
  button.hidden = false;
  button.addEventListener("click", () => {
    navigator.share({ title: button.dataset.title, url: button.dataset.url }).catch(() => {});
  });
});
document.querySelectorAll("[data-copy-link]").forEach((button) => {
  button.addEventListener("click", async () => {
    const url = button.dataset.url;
    try {
      await navigator.clipboard.writeText(url);
    } catch (_) {
      const field = document.createElement("textarea");
      field.value = url;
      document.body.append(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    const label = button.textContent;
    button.textContent = "Link copied";
    setTimeout(() => { button.textContent = label; }, 2000);
  });
});
