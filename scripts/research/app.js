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
