/* global gsap */
(() => {
  // --- bootstrap GSAP ---
  gsap.registerPlugin(MotionPathPlugin);

  const els = {
    svg: document.getElementById("Layer_1"),
    road: document.getElementById("straight_path"),
    roadDashes: document.getElementById("road_line_dashed"),
    roadPath: document.getElementById("mp_road_path"),
    backTemplate: document.getElementById("tunnel_back"), // shared back
    fronts: {
      industry: document.getElementById("tunnel_front_industry"),
      export: document.getElementById("tunnel_front_export"),
      evs: document.getElementById("tunnel_front_evs"),
      domestic: document.getElementById("tunnel_front_domestic_market"),
      adoption: document.getElementById("tunnel_front_adoption"),
    },
    question: document.getElementById("questionText"),
    yes: document.getElementById("btnYes"),
    no: document.getElementById("btnNo"),
  };

  // Guard for missing IDs
  for (const [k, v] of Object.entries(els.fronts)) {
    if (!v) console.warn(`Missing #tunnel_front_${k} in SVG`);
  }
  if (!els.roadPath) console.warn("Missing #road_line_dashed");

  // ---- constants ---------------------------------------------------
  const STOP_P = 0.5; // where each active tunnel rests along path (0..1)
  const DUR = 1.05;

  // ---- dash illusion ---------------------------------------------------------
  gsap.set(els.roadDashes, { attr: { "stroke-dashoffset": 0 } });
  const dashTL = gsap.to(els.roadDashes, {
    duration: DUR * 5,
    repeat: -1,
    ease: "none",
    paused: true,
    attr: { "stroke-dashoffset": 1200 },
  });

  // ---- utils -----------------------------------------------------------------
  let activeBack = null; // current back clone paired with the visible front

  function hideAll() {
    gsap.set([els.backTemplate, ...Object.values(els.fronts)], {
      autoAlpha: 0,
      clearProps: "transform",
    });
    document.querySelectorAll(".tunnel-back-clone").forEach((n) => n.remove());
    activeBack = null;
  }

  function placeAtProgress(front, back, p) {
    if (!front || !back) return;
    gsap.set(front, {
      transformBox: "fill-box",
      motionPath: {
        path: els.roadPath,
        align: els.roadPath,
        alignOrigin: [0.5, 0.634],
        start: p,
        end: p,
      },
    });
    gsap.set(back, {
      transformBox: "fill-box",
      motionPath: {
        path: els.roadPath,
        align: els.roadPath,
        alignOrigin: [0.5, 0.634],
        start: p,
        end: p,
      },
    });
  }

  function makeBackClone(frontEl) {
    const tpl = els.backTemplate;
    if (!tpl || !frontEl) return null;
    const clone = tpl.cloneNode(true);
    clone.removeAttribute("id"); // avoid duplicate IDs
    clone.classList.add("tunnel-back-clone");
    // put behind the front so it renders underneath
    frontEl.parentNode.insertBefore(clone, els.road);
    gsap.set(clone, { autoAlpha: 0, clearProps: "transform" });
    return clone;
  }

  function enterFromRight(front, back) {
    // optional: pin them at the right end before animating in
    placeAtProgress([front], [back], 1);

    const tl = gsap.timeline();

    tl.to(
      back,
      {
        duration: DUR,
        ease: "none",
        autoAlpha: 1,
        motionPath: {
          path: els.roadPath,
          align: els.roadPath,
          alignOrigin: [1, 0.475],
          start: 1,
          end: STOP_P, // back ends a bit earlier on the path
          // offsetX: BACK_OFFSET.x, // tiny perpendicular nudge
          // offsetY: BACK_OFFSET.y,
        },
      },
      0
    );
    tl.to(
      front,
      {
        duration: DUR,
        ease: "none",
        autoAlpha: 1,
        motionPath: {
          path: els.roadPath,
          align: els.roadPath,
          alignOrigin: [0.5, 0.5],
          start: 1,
          end: STOP_P, // front at the resting spot
        },
      },
      0
    );

    return tl;
  }

  // Exit to the left: STOP_P → 0 (DO NOT pre-place at 0 or it will snap left)
  function exitToLeft(front, back) {
    // start each at its current resting pose; then go off left
    placeAtProgress([front], [back], STOP_P);

    const tl = gsap.timeline();

    tl.to(
      front,
      {
        duration: DUR,
        ease: "none",
        motionPath: {
          path: els.roadPath,
          align: els.roadPath,
          alignOrigin: [0.5, 0.634],
          start: STOP_P,
          end: 0,
        },
      },
      0
    );

    tl.to(
      back,
      {
        duration: DUR,
        ease: "none",
        motionPath: {
          path: els.roadPath,
          align: els.roadPath,
          alignOrigin: [1, 0.475],
          start: STOP_P,
          end: 0, // keeps spacing as it exits
        },
      },
      0
    );

    tl.set([front, back], { autoAlpha: 0 });

    return tl;
  }

  // current front leaves left (with its back clone), next front enters right (with a new back clone)
  function swapFronts(currentKey, nextKey) {
    const currentFront = currentKey ? els.fronts[currentKey] : null;
    const nextFront = nextKey ? els.fronts[nextKey] : null;
    const leaving = [];
    if (currentFront) leaving.push(currentFront);
    if (activeBack) leaving.push(activeBack);

  let nextBack = null;
  if (nextFront) {
    nextBack = makeBackClone(nextFront); // same as you have now
  }

    const tl = gsap.timeline({
      onStart: () => dashTL.play(),
      onComplete: () => {
        dashTL.pause();
        // remove the old back clone after it’s fully offscreen
        if (activeBack && activeBack !== nextBack) activeBack.remove();
        activeBack = nextBack || null;
      },
    });

    console.log({ leaving, nextFront, nextBack });

    if (leaving.length) tl.add(exitToLeft(leaving[0], leaving[1]), 0);
    if (nextFront) tl.add(enterFromRight(nextFront, nextBack), 0);
    return tl;
  }

  // --- Decision tree model ---
  // Each node maps to: text, which tunnel front to show, and where to go on yes/no.
  // Use IDs: 'industry' | 'export' | 'evs' | 'domestic' | 'adoption'
  const TREE = {
    start: {
      text: "Are you ready to explore your EV profile?",
      front: null,
      yes: "industry",
      no: "not_ready",
    },
    industry: {
      text: "Does your country manufacture cars (specifically passenger vehicles)?",
      front: "industry",
      yes: "export",
      no: "profile_costa_rica",
    },
    export: {
      text: "Is your manufacturing industry primarily driven by exports?",
      front: "export",
      yes: "evs",
      no: "domestic",
    },
    evs: {
      text: "Are you producing EVs?",
      front: "evs",
      yes: "profile_mexico",
      no: "profile_south_africa",
    },
    domestic: {
      text: "Is your manufacturing industry mostly made up of domestic manufacturers that serve your local market?",
      front: "domestic",
      yes: "profile_india",
      no: "adoption",
    },
    adoption: {
      text: "Are you incentivizing domestic EV adoption?",
      front: "adoption",
      yes: "profile_indonesia",
      no: "profile_brazil",
    },
    not_ready: {
      text: "No worries—when you are, we'll help you match a profile.",
      front: null,
      yes: "start",
      no: "start",
    },
    // Leaves (profiles) — you can replace with your actual render/action
    profile_costa_rica: {
      text: "Profile - Costa Rica; Strategy: reap the benefits of EVs via imports",
      front: "domestic",
    },
    profile_mexico: {
      text: "Profile - Mexico; Strategy: be wary of reliance on foreign markets",
      front: "evs",
    },
    profile_south_africa: {
      text: "Profile - South Africa; Strategy: address the risks of delaying the EV transition",
      front: "export",
    },
    profile_india: {
      text: "Profile - India; Strategy: empower domestic players and tailor products to domestic consumers",
      front: "adoption",
    },
    profile_indonesia: {
      text: "Profile - Indonesia: Strategy: leverage your domestic market to attract investment",
      front: "adoption",
    },
    profile_brazil: {
      text: "Profile - Brazil: Strategy: Deliberately incentivize domestic market growth",
      front: "domestic",
    },
  };

  const isLeaf = (k) => !TREE[k]?.yes && !TREE[k]?.no;

  // ---- state + UI ------------------------------------------------------------
  let currentNode = "start";
  let currentFrontKey = null;

  // Render the question + set correct button text
  function renderNode(key) {
    const node = TREE[key];
    if (!node) return;
    els.question.textContent = node.text;
    if (isLeaf(key)) {
      els.yes.textContent = "Restart";
      els.no.textContent = "Back";
    } else {
      els.yes.textContent = "Yes";
      els.no.textContent = "No";
    }
  }

  // Advance the state based on answer
  async function answer(yes) {
    const node = TREE[currentNode];
    if (!node) return;

    // start -> industry (enters with its own back clone)
    if (currentNode === "start" && yes) {
      await swapFronts(null, "industry");
      currentFrontKey = "industry";
      currentNode = "industry";
      renderNode(currentNode);
      return;
    }

    // leaves
    if (isLeaf(currentNode)) {
      if (yes && currentFrontKey) await swapFronts(currentFrontKey, null);
      currentFrontKey = null;
      currentNode = "start";
      renderNode(currentNode);
      return;
    }

    const nextKey = yes ? node.yes : node.no;
    const nextFront = TREE[nextKey]?.front ?? null;

    if (nextFront !== currentFrontKey) {
      await swapFronts(currentFrontKey, nextFront);
      currentFrontKey = nextFront;
    }
    currentNode = nextKey;
    renderNode(currentNode);
  }

  // --- Init ---
  function init() {
    hideAll(); // nothing visible on load (template hidden too)
    renderNode(currentNode); // show first question

    els.yes.addEventListener("click", () => answer(true));
    els.no.addEventListener("click", () => answer(false));

    // keep visible items aligned on resize
    const ro = new ResizeObserver(() => {
      const visibles = [activeBack, ...Object.values(els.fronts)].filter(
        (el) => el && gsap.getProperty(el, "autoAlpha") > 0.01
      );
      if (visibles.length) placeAtProgress(visibles, STOP_P);
    });
    ro.observe(document.documentElement);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
