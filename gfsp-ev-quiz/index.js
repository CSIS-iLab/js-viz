// Modified from https://codepen.io/jnsmith/pen/vYBzEOP

// === CONFIG: your published CSV URLs ===
const NODES_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=0&single=true&output=csv";
const OPTIONS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=474949223&single=true&output=csv";
const PROFILES_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1726675466&single=true&output=csv";
const TERMS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1457210827&single=true&output=csv";
const SIMILAR_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=23026962&single=true&output=csv";
const DEFS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1723466829&single=true&output=csv";

// Fetch + parse a CSV to array of objects
function fetchCsv(url) {
  return new Promise((resolve, reject) => {
    if (!window.Papa) {
      return reject(new Error("PapaParse not loaded yet"));
    }
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data),
      error: reject,
    });
  });
}

// Build the `data` array in the exact shape your DecisionTree expects
async function loadDecisionTreeData() {
  const [
    nodesRows,
    optionsRows,
    profilesRows,
    termsRows,
    similarRows,
    defsRows,
  ] = await Promise.all([
    fetchCsv(NODES_CSV_URL),
    fetchCsv(OPTIONS_CSV_URL),
    fetchCsv(PROFILES_CSV_URL),
    fetchCsv(TERMS_CSV_URL),
    fetchCsv(SIMILAR_CSV_URL),
    fetchCsv(DEFS_CSV_URL),
  ]);

  // Normalize parentId and coerce empty -> null
  const normalizeParent = (v) => {
    if (v === undefined || v === null) return null;
    const trimmed = String(v).trim();
    return trimmed === "" || trimmed.toLowerCase() === "null" ? null : trimmed;
  };

  // Build nodes
  const nodesMap = new Map();
  nodesRows.forEach((row) => {
    const id = String(row.id).trim();
    const parentId = normalizeParent(row.parentId);
    const content = row.content ?? "";

    nodesMap.set(id, {
      id, // keep as string for consistency
      parentId, // null or string
      data: {
        content: row.content ?? "",
        imageUrl: (row.imageUrl || "").trim(),
        imageAlt: row.imageAlt || "",
        imageCaption: row.imageCaption || "",
      },
      children: [], // will fill from options
      profileId: row.profileId ? String(row.profileId).trim() : null,
    });
  });

  // Attach children arrays from Options sheet
  optionsRows.forEach((row) => {
    const parentId = String(row.parentId).trim();
    const childId = String(row.childId).trim();
    const text = row.text ?? "";
    const order = Number(row.order ?? 0);

    const parentNode = nodesMap.get(parentId);
    if (!parentNode) return; // ignore orphan rows gracefully

    parentNode.children.push({ id: childId, text, order });
  });

  // Sort children by `order` if present
  for (const node of nodesMap.values()) {
    if (node.children && node.children.length) {
      node.children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      // Remove 'order' from final structure (optional)
      node.children = node.children.map(({ id, text }) => ({ id, text }));
    }
  }

  // ----- Build Profiles -----
  const profiles = new Map();

  profilesRows.forEach((row) => {
    const pid = String(row.profileId).trim();
    if (!pid) return;
    const iso2 = (row.iso2 || "").trim().toLowerCase();
    const flagUrl =
      (row.flagUrl || "").trim() ||
      (iso2 ? `https://flagcdn.com/w40/${iso2}.png` : "");
    const flourishSrc = (row.flourishSrc || "").trim();

    const profile = {
      profileId: pid,
      name: row.name ?? pid,
      iso2,
      flagUrl,
      terms: [],
      defs: [],
      flourishSrc,
      similarLinks: [],
    };

    profiles.set(pid, profile);
  });

  termsRows.forEach((row) => {
    const pid = String(row.profileId).trim();
    const p = profiles.get(pid);
    if (p && row.term) p.terms.push(String(row.term).trim());
  });

  defsRows.forEach((row) => {
    const pid = String(row.profileId || "").trim();
    const p = profiles.get(pid);
    if (!p) return;
    const label = (row.label || "").trim();
    const html = String(row.html || "").trim();
    if (!label || !html) return;
    const order = Number(row.order ?? 0);
    p.defs.push({ label, html, order });
  });

  // sort defs by order
  for (const p of profiles.values()) {
    if (p.defs.length) {
      p.defs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
  }

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

  // sort links by order
  for (const p of profiles.values()) {
    if (p.similarLinks.length) {
      p.similarLinks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
  }

  // ----- Link profiles to leaf nodes -----
  for (const node of nodesMap.values()) {
    const isLeaf = !node.children || node.children.length === 0;
    if (isLeaf && node.profileId) {
      const prof = profiles.get(node.profileId);
      if (prof) node.profile = prof; // <-- this is what renderProfile uses
    }
  }

  // Package everything (nodes array first element is root)
  const nodesArray = Array.from(nodesMap.values());
  nodesArray.sort((a, b) => {
    const aIsRoot = a.parentId === null ? -1 : 0;
    const bIsRoot = b.parentId === null ? -1 : 0;
    return aIsRoot - bIsRoot;
  });

  const profilesArray = Array.from(profiles.values());

  return { nodesArray, profilesArray };
}

// ----- Helper functions -----
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

// Allow a tiny subset of inline HTML (links, emphasis, line breaks)
function sanitizeHtml(html, extraTags = []) {
  if (!window.DOMPurify) return escapeHtml(String(html || "")); // fallback

  // 1) Strip everything except a/strong/em/b/i/br and link attributes we care about
  const clean = DOMPurify.sanitize(String(html || ""), {
    ALLOWED_TAGS: ["a", "strong", "em", "b", "i", "br", ...extraTags],
    ALLOWED_ATTR: ["href", "target", "rel"],
    FORBID_ATTR: [/^on/i, "style"], // kill event handlers & inline styles
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });

  // 2) Enforce http(s) only + set rel/target safely
  const tmp = document.createElement("div");
  tmp.innerHTML = clean;
  tmp.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!/^https?:\/\//i.test(href)) {
      a.removeAttribute("href"); // or set to '#' if you prefer
    }
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });
  return tmp.innerHTML;
}

// keep a thin wrapper for places where we only want inline tags
const sanitizeInlineHtml = (html) => sanitizeHtml(html, []);

// Turn "Case Study: India" → "profile-case-study-india"
function slugifyId(str) {
  return ("profile-" + String(str || ""))
    .normalize("NFD") // strip accents
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/['".]/g, "") // drop punctuation
    .replace(/[^a-z0-9]+/g, "-") // spaces → dashes
    .replace(/^-+|-+$/g, ""); // trim dashes
}

const USED_ANCHOR_IDS = new Set();
function getProfileAnchorId(p) {
  const base = slugifyId(p.name || p.profileId);
  let id = base,
    i = 2;
  while (USED_ANCHOR_IDS.has(id)) id = `${base}-${i++}`; // ensure uniqueness
  USED_ANCHOR_IDS.add(id);
  return id;
}

function scrollToHash({ smooth = true } = {}) {
  const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (!hash) return;
  const el = document.getElementById(hash);
  if (!el) return;
  el.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
    inline: "nearest",
  });
}

window.addEventListener("hashchange", () => scrollToHash({ smooth: true }));
window.addEventListener("load", () => scrollToHash({ smooth: true }));


// wait for all <img> inside a container
function waitForImages(container) {
  const imgs = Array.from(container.querySelectorAll("img"));
  if (!imgs.length) return Promise.resolve();
  return Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => {
            img.addEventListener("load", res, { once: true });
            img.addEventListener("error", res, { once: true }); // resolve anyway
          })
    )
  );
}

function debounce(fn, ms = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// Render a definition list from {label, html} objects
function renderDefinitionList(defs) {
  if (!defs?.length) return "";
  return `<dl class="profile-defs">
    ${defs
      .map(
        ({ label, html }) => `
      <dt>${escapeHtml(label)}</dt>
      <dd>${sanitizeHtml(html, ["p", "ul", "ol", "li"])}</dd>
    `
      )
      .join("")}
  </dl>`;
}

// Build the profile HTML for leaf nodes
function renderProfileHTML(p, opts = {}) {
  if (!p) return "";
  const { leadText = "", htmlId = "" } = opts;

  const termsHtml = p.terms.length
    ? `<div class="profile-terms">${p.terms
        .map((t) => `<span class="chip">${escapeHtml(t)}</span>`)
        .join("")}</div>`
    : "";

  const defsHtml = renderDefinitionList(p.defs);

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

  const similarHtml =
    p.similarLinks && p.similarLinks.length
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
    ${leadText ? `<p class="result-lead">${escapeHtml(leadText)}</p>` : ""}
      <header class="profile-head">
        ${
          p.flagUrl
            ? `<img class="profile-flag" src="${p.flagUrl}" alt="" />`
            : ""
        }
        <h2 class="profile-title"${
          htmlId ? ` id="${escapeHtml(htmlId)}"` : ""
        }>${escapeHtml(p.name)}</h2>
      </header>
      ${termsHtml}
      ${defsHtml}
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
    // Fallback: (re)load the script and initialize when ready
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
    const id = getProfileAnchorId(p);
    const card = document.createElement("article");
    card.className = "card profile-card";
    card.innerHTML = renderProfileHTML(p, { htmlId: id });
    frag.appendChild(card);
  });
  container.appendChild(frag);
  activateFlourishEmbeds(container);
}

// ----- load data, then init tree -----
(async function init() {
  const { nodesArray, profilesArray } = await loadDecisionTreeData();

  const DecisionTree = function (nodes) {
    var _history = [];
    var _nodes = nodes;

    var _resetHistory = function () {
      _history.length = 0;
    };

    var _getRootNode = function () {
      return _nodes[0];
    };

    var _getNode = function (id) {
      var matchingNode = null;
      _nodes.some(function (node) {
        if (String(node.id) === String(id)) {
          matchingNode = node;
          return true;
        }
        return false;
      });
      return matchingNode;
    };

    var _getPreviousNode = function () {
      var id = _history.pop();
      return _getNode(id);
    };

    var _updateHistory = function (id) {
      _history.push(id);
    };

    return {
      getNode: _getNode,
      getPreviousNode: _getPreviousNode,
      getRootNode: _getRootNode,
      updateHistory: _updateHistory,
      resetHistory: _resetHistory,
    };
  };

  var DecisionTreeUI = function (decisionTree) {
    var tree = decisionTree;
    var state = { history: { index: 0 } };

    var card = document.getElementById("question");
    // var cardHeader = card.querySelector(".card-header");
    var cardContent = card.querySelector(".card-content");
    var cardNav = card.querySelector(".card-nav");
    var backButton = createBackButton();
    var restartBtn = createRestartButton();
    var selectionHistory = document.getElementById("history");
    var SHOW_HISTORY = false; // set to true if you ever want the list visible again
    var animationDelay = 300;

    function getNodeMeta(node) {
      return {
        isRoot: node?.parentId === null,
        isLeaf: !node?.children || node.children.length === 0,
      };
    }

    function updateNavUI(node) {
      const { isRoot, isLeaf } = getNodeMeta(node);

      // Ensure buttons live in the nav container exactly once
      if (!cardNav.contains(backButton)) cardNav.append(backButton);
      if (!cardNav.contains(restartBtn)) cardNav.append(restartBtn);

      // Restart button
      if (restartBtn) {
        restartBtn.textContent = isLeaf ? "Retake" : "Restart";
        restartBtn.hidden = !!isRoot; // hide on the first question
      }

      // Back button
      if (backButton) {
        if (!isRoot && !isLeaf) {
          backButton.hidden = false;
        } else {
          backButton.hidden = true; // hide on root and on leaf
        }
      }
    }

    function clearHistoryUI() {
      // If you removed the <ul>, this safely no-ops
      if (selectionHistory) selectionHistory.innerHTML = "";
      state.history.index = 0;
    }

    function renderQuestionBlock(node) {
      // 1) question text
      cardContent.innerHTML = node.data.content;

      emphasizeQuestion(cardContent);

      // 2) optional image (between content and options)
      const { imageUrl, imageAlt, imageCaption } = node.data || {};
      if (imageUrl && /^https?:\/\//i.test(imageUrl)) {
        const figure = document.createElement("figure");
        figure.className = "question-media";

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = imageAlt || "";
        img.loading = "lazy";
        img.decoding = "async";
        figure.appendChild(img);

        if (imageCaption) {
          const cap = document.createElement("figcaption");
          cap.textContent = imageCaption;
          figure.appendChild(cap);
        }
        cardContent.appendChild(figure);
      }

      // 3) options
      createOptionButtons(node.children);
    }

    var createOptionButtons = function (children) {
      const wrap = document.createElement("div");
      wrap.className = "options-grid"; // new wrapper

      children.forEach(function (child) {
        var button = createOptionButton(child);
        wrap.append(button);
      });

      cardContent.append(wrap);
    };

    var createOptionButton = function (child) {
      var button = document.createElement("button");
      button.classList.add("btn__quiz", "btn__quiz--opt");
      button.innerText = child.text;
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var id = child.id;
        var node = tree.getNode(id);
        tree.updateHistory(node.parentId);
        if (SHOW_HISTORY && selectionHistory) {
          addHistory(this.innerText);
        }
        displayNode(node);
      });
      return button;
    };

    function createBackButton() {
      var button = document.createElement("button");
      button.setAttribute("aria-label", "Back");
      button.innerHTML = "← Back";
      button.classList.add("btn__quiz", "btn__quiz--nav", "icon-button");
      button.hidden = true;
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var node = tree.getPreviousNode();
        if (node) displayNode(node);
        if (SHOW_HISTORY && selectionHistory) {
          var itemIndex = selectionHistory.firstChild?.dataset?.id;
          if (node && itemIndex !== undefined) {
            removeHistoryItemByIndex(itemIndex);
          }
        }
      });
      return button;
    }

    function restartQuiz() {
      tree.resetHistory(); // clear logical history (for Back)
      clearHistoryUI(); // clear visible history if present
      const root = tree.getRootNode();
      displayNode(root); // show first question again
      updateNavUI(root);
    }

    function createRestartButton() {
      var button = document.createElement("button");
      button.type = "button";
      button.classList.add("btn__quiz", "btn__quiz--nav");
      button.hidden = true;
      button.textContent = "Restart";
      button.addEventListener("click", function (e) {
        e.preventDefault();
        restartQuiz();
      });
      return button;
    }

    var addHistory = function (optionText) {
      if (!SHOW_HISTORY || !selectionHistory) return;
      var choice = document.createElement("li");
      choice.dataset.id = state.history.index;
      choice.classList.add("active");
      var title = document.createElement("p");
      title.innerText = cardContent.firstChild?.innerText || "";
      var option = document.createElement("p");
      option.innerText = optionText;
      option.append(createChangeButton());
      selectionHistory.insertBefore(choice, selectionHistory.childNodes[0]);
      choice.append(title, option);
    };

    var removeHistoryItemByIndex = function (index) {
      if (!SHOW_HISTORY || !selectionHistory) {
        --state.history.index; // keep the counter sane even if hidden
        return;
      }
      var item = selectionHistory.querySelector('li[data-id="' + index + '"]');
      if (!item) return;
      item.classList.remove("active");
      fadeOutElement(item);
      --state.history.index;
    };

    var createChangeButton = function () {
      if (!SHOW_HISTORY || !selectionHistory) {
        // When history UI is hidden, we still need to bump the index
        state.history.index++;
        // Return a dummy element so callers can append without errors
        var dummy = document.createElement("span");
        dummy.style.display = "none";
        return dummy;
      }
      var button = document.createElement("button");
      button.dataset.id = state.history.index;
      state.history.index++;
      button.setAttribute("aria-label", "Change");
      button.innerHTML = '<span class="fas fa-edit" aria-hidden="true"></span>';
      button.classList.add("icon-button");
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var buttonIndex = parseInt(this.dataset.id, 10);
        var numberOfButtonsToRemove = -1 * (buttonIndex - state.history.index);
        var node = null;
        while (numberOfButtonsToRemove > 0) {
          node = tree.getPreviousNode();
          removeHistoryItemByIndex(state.history.index - 1);
          numberOfButtonsToRemove--;
        }
        if (node) displayNode(node);
      });
      return button;
    };

    var createHistoryItem = function (id, title) {
      tree.updateHistory(id);
      addHistory(title);
    };

    function emphasizeQuestion(container) {
      // If the first node is plain text, wrap it in a <p>
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

      // Style the first meaningful element as the prompt
      const firstEl = container.firstElementChild;
      if (!firstEl) return;

      // Don't style media/profile/option wrappers
      if (
        !firstEl.matches("figure, .question-media, .options-grid, .profile")
      ) {
        firstEl.classList.add("question-lead");
      }
    }

    var displayNode = function (node) {
      card.dataset.id = node.id;

      const isLeaf = !node.children || node.children.length === 0;

      if (isLeaf && node.profile) {
        cardContent.innerHTML = renderProfileHTML(node.profile, {
          leadText: "You're most like:",
        });
        activateFlourishEmbeds(cardContent);
      } else {
        renderQuestionBlock(node);
      }
      updateNavUI(node);
    };

    var fadeOutElement = function (element) {
      element.classList.add("squish");
      setTimeout(function () {
        element.remove();
      }, animationDelay);
    };

    var node = tree.getRootNode();
    displayNode(node);
  };

  const profilesRoot = document.getElementById("profiles");
  if (profilesRoot && profilesArray.length) {
    renderProfiles(profilesRoot, profilesArray);
    // 1) wait for fonts and images (prevents “too high” landings)
    if (document.fonts?.ready) {
      try {
        await document.fonts.ready;
      } catch {}
    }
    await waitForImages(profilesRoot);

    // 2) first snap-to (no smooth) once layout is stable
    requestAnimationFrame(() => scrollToHash({ smooth: false }));

    // 3) light retries for late layout shifts (e.g., Flourish iframes)
    setTimeout(() => scrollToHash({ smooth: true }), 250);
    setTimeout(() => scrollToHash({ smooth: true }), 1000);

    // 4) watch for embed mutations and re-scroll once (debounced)
    const reScroll = debounce(() => scrollToHash({ smooth: true }), 200);
    const mo = new MutationObserver(reScroll);
    mo.observe(profilesRoot, { childList: true, subtree: true });
  }

  // Instantiate with sheet-driven data
  const tree = new DecisionTree(nodesArray);
  const ui = new DecisionTreeUI(tree);
})();
