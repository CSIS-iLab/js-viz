// Modified from https://codepen.io/jnsmith/pen/vYBzEOP

// === CONFIG: published CSV URLs ===
const PROFILES_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1726675466&single=true&output=csv";
const TERMS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1457210827&single=true&output=csv";
const BULLETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1276069821&single=true&output=csv";
const SIMILAR_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=23026962&single=true&output=csv";
const RESULTMAP_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1334620176&single=true&output=csv";
const FLOW_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1571484834&single=true&output=csv";

// --- CSV fetch utility ---
function fetchCsv(url) {
  return new Promise((resolve, reject) => {
    if (!window.Papa) return reject(new Error("PapaParse not loaded yet"));
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data),
      error: reject,
    });
  });
} 

async function loadData() {
  const [
    profilesRows,
    termsRows,
    bulletsRows,
    similarRows,
    flowRows,
    resultMapRows,
  ] = await Promise.all([
    fetchCsv(PROFILES_CSV_URL),
    fetchCsv(TERMS_CSV_URL),
    fetchCsv(BULLETS_CSV_URL),
    fetchCsv(SIMILAR_CSV_URL),
    fetchCsv(FLOW_CSV_URL),
    fetchCsv(RESULTMAP_CSV_URL),
  ]);

  // --- Build profiles (same as before) ---
  const profiles = new Map();
  profilesRows.forEach((row) => {
    const pid = String(row.profileId || "").trim();
    if (!pid) return;
    const iso2 = (row.iso2 || "").trim().toLowerCase();
    const flagUrl =
      (row.flagUrl || "").trim() ||
      (iso2 ? `https://flagcdn.com/w40/${iso2}.png` : "");
    profiles.set(pid, {
      profileId: pid,
      name: row.name || pid,
      iso2,
      flagUrl,
      terms: [],
      bulletsTree: [],
      flourishSrc: (row.flourishSrc || "").trim(),
      similarLinks: [],
    });
  });

  termsRows.forEach((row) => {
    const pid = String(row.profileId || "").trim();
    const p = profiles.get(pid);
    if (p && row.term) p.terms.push(String(row.term).trim());
  });

  // bullets → tree per profile (same logic)
  (function buildBulletTrees() {
    const allByProfile = new Map(); // pid -> items[]
    const byKey = new Map(); // `${pid}::${bulletId}` -> item
    bulletsRows.forEach((row) => {
      const pid = String(row.profileId || "").trim();
      const p = profiles.get(pid);
      if (!p) return;
      const bid = String(row.bulletId || "").trim();
      if (!bid) return;
      const item = {
        id: bid,
        html: String(row.html ?? row.bullet ?? row.text ?? "").trim(),
        order: Number(row.order ?? 0),
        children: [],
        _parentId:
          String(row.parentBulletId || row.parentId || "").trim() || null,
      };
      if (!allByProfile.has(pid)) allByProfile.set(pid, []);
      allByProfile.get(pid).push(item);
      byKey.set(`${pid}::${bid}`, item);
    });

    for (const [pid, items] of allByProfile.entries()) {
      const p = profiles.get(pid);
      if (!p) continue;
      items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const roots = [];
      for (const it of items) {
        if (it._parentId) {
          const parent = byKey.get(`${pid}::${it._parentId}`);
          if (parent) parent.children.push(it);
          else roots.push(it);
        } else {
          roots.push(it);
        }
      }
      function sortChildren(node) {
        if (node.children?.length) {
          node.children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          node.children.forEach(sortChildren);
        }
      }
      roots.forEach(sortChildren);
      p.bulletsTree = roots;
    }
  })();

  // similar links (same)
  similarRows.forEach((row) => {
    const pid = String(row.profileId || "").trim();
    const p = profiles.get(pid);
    if (!p) return;
    const name = (row.name || "").trim();
    const url = (row.url || "").trim();
    if (!name || !url) return;
    const iso2 = (row.iso2 || "").trim().toLowerCase();
    const flagUrl =
      (row.flagUrl || "").trim() ||
      (iso2 ? `https://flagcdn.com/w40/${iso2}.png` : "");
    const order = Number(row.order ?? 0);
    p.similarLinks.push({ name, url, flagUrl, order });
  });
  for (const p of profiles.values()) {
    if (p.similarLinks.length) {
      p.similarLinks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
  }

  // --- Flow: use inline fields ONLY ---
  const flowSteps = flowRows
    .filter((r) => String(r.step || "").trim() !== "")
    .sort((a, b) => Number(a.step) - Number(b.step))
    .map((r) => ({
      step: Number(r.step),
      content: r.content || "",
      imageUrl: (r.imageUrl || "").trim(),
      imageAlt: r.imageAlt || "",
      imageCaption: r.imageCaption || "",
    }));

  // --- Result pattern → profileId (same) ---
  const normalizePattern = (s) =>
    String(s || "")
      .toUpperCase()
      .replace(/[^YN01]/g, "")
      .replace(/1/g, "Y")
      .replace(/0/g, "N");

  const resultMap = new Map();
  resultMapRows.forEach((r) => {
    const pat = normalizePattern(r.pattern);
    const pid = String(r.profileId || "").trim();
    if (pat && pid) resultMap.set(pat, pid);
  });

  return {
    flowSteps,
    resultMap,
    profilesById: profiles,
    profilesArray: Array.from(profiles.values()),
  };
}


// ---------- Helpers (unchanged from your working version) ----------
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c])
  );
}

function sanitizeInlineHtml(html) {
  if (!window.DOMPurify) return escapeHtml(String(html || "")); // fallback
  const clean = DOMPurify.sanitize(String(html || ""), {
    ALLOWED_TAGS: ["a", "strong", "em", "b", "i", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
    FORBID_ATTR: [/^on/i, "style"],
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
  const tmp = document.createElement("div");
  tmp.innerHTML = clean;
  tmp.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!/^https?:\/\//i.test(href)) a.removeAttribute("href");
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });
  return tmp.innerHTML;
}

function renderBulletList(items) {
  if (!items || !items.length) return "";
  return `<ul class="profile-bullets">${items
    .map(
      (it) =>
        `<li>${sanitizeInlineHtml(it.html)}${renderBulletList(
          it.children
        )}</li>`
    )
    .join("")}</ul>`;
}

function renderProfileHTML(p) {
  if (!p) return "";
  const termsHtml = p.terms.length
    ? `<div class="profile-terms">${p.terms
        .map((t) => `<span class="chip">${escapeHtml(t)}</span>`)
        .join("")}</div>`
    : "";
  const bulletsHtml = p.bulletsTree?.length
    ? renderBulletList(p.bulletsTree)
    : "";

  let chartHtml = "";
  if (p.flourishSrc) {
    const base = p.flourishSrc.split("?")[0];
    chartHtml = `
      <div class="profile-chart">
        <div class="flourish-embed flourish-chart" data-src="${escapeHtml(
          p.flourishSrc
        )}"></div>
        <noscript>
          <img src="https://public.flourish.studio/${escapeHtml(
            base
          )}/thumbnail" width="100%" alt="chart visualization" />
        </noscript>
      </div>`;
  }

  const similarHtml = p.similarLinks?.length
    ? `<div class="profile-similar">
         <span class="muted">Similar:</span>
         ${p.similarLinks
           .map(
             (s) => `
           <a class="btn__quiz btn__quiz--nav profile-link"
              href="${escapeHtml(
                s.url
              )}" target="_blank" rel="noopener noreferrer">
             ${
               s.flagUrl
                 ? `<img class="profile-flag profile-flag--inline" src="${escapeHtml(
                     s.flagUrl
                   )}" alt="" />`
                 : ""
             }
             ${escapeHtml(s.name)}
           </a>`
           )
           .join("")}
       </div>`
    : "";

  return `
    <section class="profile">
      <header class="profile-head">
        ${
          p.flagUrl
            ? `<img class="profile-flag" src="${p.flagUrl}" alt="" />`
            : ""
        }
        <h2 class="profile-title">${escapeHtml(p.name)}</h2>
      </header>
      ${termsHtml}
      ${bulletsHtml}
      ${chartHtml}
      ${similarHtml}
    </section>`;
}

function activateFlourishEmbeds(root = document) {
  const embeds = root.querySelectorAll(".flourish-embed");
  if (!embeds.length) return;
  if (window.Flourish && typeof window.Flourish.loadEmbed === "function") {
    embeds.forEach((el) => window.Flourish.loadEmbed(el));
  } else {
    const s = document.createElement("script");
    s.src = "https://public.flourish.studio/resources/embed.js";
    s.onload = () => {
      if (window.Flourish?.loadEmbed)
        embeds.forEach((el) => window.Flourish.loadEmbed(el));
    };
    document.head.appendChild(s);
  }
}

function renderProfiles(container, profilesArray) {
  if (!container || !profilesArray?.length) return;
  const frag = document.createDocumentFragment();
  profilesArray.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card profile-card";
    card.innerHTML = renderProfileHTML(p);
    frag.appendChild(card);
  });
  container.appendChild(frag);
  activateFlourishEmbeds(container);
}

function emphasizeQuestion(container) {
  const first = container.firstChild;
  if (
    first &&
    first.nodeType === Node.TEXT_NODE &&
    first.textContent.trim() !== ""
  ) {
    const p = document.createElement("p");
    p.textContent = first.textContent;
    container.replaceChild(p, first);
  }
  const firstEl = container.firstElementChild;
  if (!firstEl) return;
  if (!firstEl.matches("figure, .question-media, .options-grid, .profile")) {
    firstEl.classList.add("question-lead");
  }
}

// ---------- Fixed yes/no flow UI ----------
function FixedFlowUI(flowSteps, resultMap, profilesById) {
  const card = document.getElementById("question");
  const cardContent = card.querySelector(".card-content");
  const cardNav = card.querySelector(".card-nav");

  const backButton = createBackButton();
  const restartBtn = createRestartButton();

  const state = { step: 0, answers: [], atResult: false };

  function createBackButton() {
    const btn = document.createElement("button");
    btn.className = "btn__quiz btn__quiz--nav";
    btn.setAttribute("aria-label", "Back");
    btn.textContent = "← Back";
    btn.hidden = true;
    btn.addEventListener("click", () => {
      if (state.atResult) {
        state.atResult = false;
        state.step = flowSteps.length - 1;
        renderStep();
        updateNavUI();
        return;
      }
      if (state.step > 0) {
        state.step -= 1;
        renderStep();
        updateNavUI();
      }
    });
    return btn;
  }
  function createRestartButton() {
    const btn = document.createElement("button");
    btn.className = "btn__quiz btn__quiz--nav";
    btn.textContent = "Restart";
    btn.hidden = false;
    btn.addEventListener("click", () => {
      state.step = 0;
      state.answers = [];
      state.atResult = false;
      renderStep();
      updateNavUI();
    });
    return btn;
  }
  function updateNavUI() {
    if (!cardNav.contains(backButton)) cardNav.append(backButton);
    if (!cardNav.contains(restartBtn)) cardNav.append(restartBtn);
    backButton.hidden = !(state.atResult || state.step > 0);
    restartBtn.textContent = state.atResult ? "Retake" : "Restart";
  }

  function renderStep() {
    const s = flowSteps[state.step];
    cardContent.innerHTML = s.content || "";
    emphasizeQuestion(cardContent);

    if (s.imageUrl && /^https?:\/\//i.test(s.imageUrl)) {
      const figure = document.createElement("figure");
      figure.className = "question-media";
      const img = document.createElement("img");
      img.src = s.imageUrl;
      img.alt = s.imageAlt || "";
      img.loading = "lazy";
      img.decoding = "async";
      figure.appendChild(img);
      if (s.imageCaption) {
        const cap = document.createElement("figcaption");
        cap.textContent = s.imageCaption;
        figure.appendChild(cap);
      }
      cardContent.appendChild(figure);
    }

    const wrap = document.createElement("div");
    wrap.className = "options-grid";
    ["Yes", "No"].forEach((label, i) => {
      const b = document.createElement("button");
      b.className = "btn__quiz btn__quiz--opt";
      b.textContent = label;
      b.dataset.answer = i === 0 ? "Y" : "N";
      wrap.appendChild(b);
    });
    cardContent.appendChild(wrap);
  }

  cardContent.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-answer]");
    if (!btn) return;
    state.answers[state.step] = btn.dataset.answer;

    if (state.step < flowSteps.length - 1) {
      state.step += 1;
      renderStep();
      updateNavUI();
    } else {
      const pattern = state.answers.join("");
      const profileId = resultMap.get(pattern);
      const profile = profileId ? profilesById.get(profileId) : null;
      cardContent.innerHTML = profile
        ? renderProfileHTML(profile)
        : `<p class="question-lead">No mapped profile for <code>${pattern}</code>.</p>`;
      if (profile) activateFlourishEmbeds(cardContent);
      state.atResult = true;
      updateNavUI();
    }
  });

  renderStep();
  updateNavUI();
}

// ---------- bootstrap ----------
(async function init() {
  const { flowSteps, resultMap, profilesById, profilesArray } =
    await loadData();

  // Optional: render a section with all profiles elsewhere on the page
  const profilesRoot = document.getElementById("profiles");
  if (profilesRoot && profilesArray?.length) {
    renderProfiles(profilesRoot, profilesArray);
  }

  new FixedFlowUI(flowSteps, resultMap, profilesById);
})();
