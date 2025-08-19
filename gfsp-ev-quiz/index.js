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
const BULLETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=1276069821&single=true&output=csv";
const SIMILAR_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=23026962&single=true&output=csv";

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
    bulletsRows,
    similarRows,
  ] = await Promise.all([
    fetchCsv(NODES_CSV_URL),
    fetchCsv(OPTIONS_CSV_URL),
    fetchCsv(PROFILES_CSV_URL),
    fetchCsv(TERMS_CSV_URL),
    fetchCsv(BULLETS_CSV_URL),
    fetchCsv(SIMILAR_CSV_URL),
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
      data: { content },
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

  // ----- Build Profiles (normalized) -----
  const profiles = new Map();

  profilesRows.forEach((row) => {
    const pid = String(row.profileId).trim();
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
      bullets: [],
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

  bulletsRows.forEach((row) => {
    const pid = String(row.profileId).trim();
    const p = profiles.get(pid);
    if (p && row.bullet) p.bullets.push(String(row.bullet).trim());
  });

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

  return { nodesArray };
}

// load data, then init tree
(async function init() {
  const { nodesArray } = await loadDecisionTreeData();

  console.table(
    nodesArray
      .filter((n) => (!n.children || n.children.length === 0) && n.profileId)
      .map((n) => ({
        nodeId: n.id,
        profileId: n.profileId,
        hasProfile: !!n.profile,
      }))
  );

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
          // backButton.setAttribute("disabled", "");
          // setTimeout(
          //   () => backButton.removeAttribute("disabled"),
          //   animationDelay
          // );
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

    var createOptionButtons = function (children) {
      children.forEach(function (child) {
        var button = createOptionButton(child);
        cardContent.append(button);
      });
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
      button.innerHTML =
        '<span class="fa fa-chevron-left" aria-hidden="true"></span> Back';
      button.classList.add("btn__quiz", "btn__quiz--nav", "icon-button");
      button.hidden = true;
      // button.setAttribute("disabled", "");
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

    // Build the profile HTML for leaf nodes
    function renderProfile(node) {
      const p = node.profile;
      if (!p) return node.data.content || "";

      const termsHtml = p.terms.length
        ? `<div class="profile-terms">${p.terms
            .map((t) => `<span class="chip">${escapeHtml(t)}</span>`)
            .join("")}</div>`
        : "";

      const bulletsHtml = p.bullets.length
        ? `<ul class="profile-bullets">${p.bullets
            .map((b) => `<li>${escapeHtml(b)}</li>`)
            .join("")}</ul>`
        : "";

      let chartHtml = "";
      if (p.flourishSrc) {
        const base = p.flourishSrc.split("?")[0]; // for thumbnail
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
    
    </div>
  `;
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
         </a>
       `
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
    </section>
  `;
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

    var displayNode = function (node) {
      card.dataset.id = node.id;

      const isLeaf = !node.children || node.children.length === 0;

      if (isLeaf && node.profile) {
        cardContent.innerHTML = renderProfile(node);
        activateFlourishEmbeds(cardContent);
      } else {
        cardContent.innerHTML = node.data.content;
        createOptionButtons(node.children);
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

  // Instantiate with sheet-driven data
  const tree = new DecisionTree(nodesArray);
  const ui = new DecisionTreeUI(tree);
})();
