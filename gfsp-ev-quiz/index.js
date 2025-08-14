// Modified from https://codepen.io/jnsmith/pen/vYBzEOP

// === CONFIG: your published CSV URLs ===
// const NODES_CSV_URL = "https://docs.google.com/spreadsheets/d/1Kl_MfQDnUxDnkfEQXFRxmpmPod9wiPV4NQlqR6eEhIM/gviz/tq?tqx=out:csv&sheet=Nodes";
// const OPTIONS_CSV_URL = "https://docs.google.com/spreadsheets/d/1Kl_MfQDnUxDnkfEQXFRxmpmPod9wiPV4NQlqR6eEhIM/gviz/tq?tqx=out:csv&sheet=Options";
const NODES_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=0&single=true&output=csv";
const OPTIONS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgOfHh9YCuNrgBcjl2rx0QzROSTi7qnWBFmmY3UBeWVmqy_AFvCLafTHw3pDvtexoEyGwqa6DFkSOB/pub?gid=474949223&single=true&output=csv";

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
  const [nodesRows, optionsRows] = await Promise.all([
    fetchCsv(NODES_CSV_URL),
    fetchCsv(OPTIONS_CSV_URL),
  ]);

  // Normalize parentId and coerce empty -> null
  const normalizeParent = (v) => {
    if (v === undefined || v === null) return null;
    const trimmed = String(v).trim();
    return trimmed === "" || trimmed.toLowerCase() === "null" ? null : trimmed;
  };

  // Build a map of nodeId -> node skeleton
  const nodesMap = new Map();
  nodesRows.forEach((row) => {
    const id = String(row.id).trim();
    const parentId = normalizeParent(row.parentId);
    const title = row.title ?? "";
    const content = row.content ?? "";

    nodesMap.set(id, {
      id, // keep as string for consistency
      parentId, // null or string
      data: { title, content }, // as you had
      children: [], // will fill from options
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

  // Return as an array, but ensure the root is first (optional)
  // Find the root by parentId === null
  const nodesArray = Array.from(nodesMap.values());
  nodesArray.sort((a, b) => {
    const aIsRoot = a.parentId === null ? -1 : 0;
    const bIsRoot = b.parentId === null ? -1 : 0;
    return aIsRoot - bIsRoot;
  });

  return nodesArray;
}

// load data, then init tree
(async function init() {
  const data = await loadDecisionTreeData();

  // 1) Make ids comparable regardless of type
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

  // 2) compare root by string "0" OR by parentId === null
  var DecisionTreeUI = function (decisionTree) {
    var tree = decisionTree;
    var state = { card: { title: null }, history: { index: 0 } };

    var card = document.getElementById("question");
    var cardHeader = card.querySelector(".card-header");
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

    var displayNode = function (node) {
      var data = node.data;
      var title = data.title;
      card.dataset.id = node.id;
      cardHeader.innerText = title;
      state.card.title = title;

      cardContent.innerHTML = data.content;
      createOptionButtons(node.children);
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
  var tree = new DecisionTree(data);
  var ui = new DecisionTreeUI(tree);
})();
