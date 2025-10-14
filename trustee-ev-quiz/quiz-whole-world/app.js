gsap.registerPlugin(MotionPathPlugin);

// --- Decision tree model ---
// Each node references a camera target (<rect id="cam-...">) and presents answers.
// Each answer points to the next node id and (optionally) a motion path id to animate the "car".
const quiz = {
  startNode: "q1",
  nodes: {
    q1: {
      cameraTarget: "cam-q1",
      number: "1.",
      question: "Does your country manufacture cars?",
      answers: [
        {
          label: "Yes",
          svgId: "btn-q1-yes",
          next: "q2",
          motionPath: "mp-q1-yes",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.11994, autoRotate: false }, // approach
              { pose: "up", end: 0.46644, autoRotate: false }, // turn upward
              { pose: "horizontal", end: 1.0, autoRotate: false }, // straighten out
            ],
          },
        },
        {
          label: "No",
          svgId: "btn-q1-no",
          next: null,
          motionPath: "mp-q1-no",
          caseStudyId: "costa_rica",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.21994, autoRotate: false },
              { pose: "down", end: 1, autoRotate: false },
            ],
          },
        },
      ],
    },
    q2: {
      cameraTarget: "cam-q2",
      number: "2.",
      question: "Is your manufacturing industry primarily driven by exports?",
      answers: [
        {
          label: "Yes",
          svgId: "btn-q2-yes",
          next: "q3_1",
          motionPath: "mp-q2-yes",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.10883, autoRotate: false }, // approach
              { pose: "up", end: 0.51586, autoRotate: false }, // turn upward
              { pose: "horizontal", end: 1.0, autoRotate: false }, // straighten out
            ],
          },
        },
        {
          label: "No",
          svgId: "btn-q2-no",
          next: "q3_2",
          motionPath: "mp-q2-no",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.10619, autoRotate: false },
              { pose: "down", end: 0.52762, autoRotate: false },
              { pose: "horizontal", end: 1.0, autoRotate: false }, // straighten out
            ],
          },
        },
      ],
    },
    q3_1: {
      cameraTarget: "cam-q3-1",
      number: "3.",
      question: "Are you producing EVs?",
      answers: [
        {
          label: "Yes",
          svgId: "btn-q3-1-yes",
          next: null,
          motionPath: "mp-q3-1-yes",
          caseStudyId: "mexico",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.20803, autoRotate: false }, // approach
              { pose: "up", end: 1, autoRotate: false }, // turn upward
            ],
          },
        },
        {
          label: "No",
          svgId: "btn-q3-1-no",
          next: null,
          motionPath: "mp-q3-1-no",
          caseStudyId: "south_africa",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.26546, autoRotate: false },
              { pose: "down", end: 1, autoRotate: false },
            ],
          },
        },
      ],
    },
    q3_2: {
      cameraTarget: "cam-q3-2",
      number: "3.",
      question: "Does your country have strong domestic manufacturers that serve the local market?",
      answers: [
        {
          label: "Yes",
          svgId: "btn-q3-2-yes",
          next: null,
          motionPath: "mp-q3-2-yes",
          caseStudyId: "india",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.20796, autoRotate: false }, // approach
              { pose: "up", end: 1, autoRotate: false }, // turn upward
            ],
          },
        },
        {
          label: "No",
          svgId: "btn-q3-2-no",
          next: "q4",
          motionPath: "mp-q3-2-no",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.12075, autoRotate: false },
              { pose: "down", end: 0.46283, autoRotate: false },
              { pose: "horizontal", end: 1.0, autoRotate: false }, // straighten out
            ],
          },
        },
      ],
    },
    q4: {
      cameraTarget: "cam-q4",
      number: "4.",
      question: "Are you incentivizing domestic EV adoption?",
      answers: [
        {
          label: "Yes",
          svgId: "btn-q4-yes",
          next: null,
          motionPath: "mp-q4-yes",
          caseStudyId: "indonesia",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.20799, autoRotate: false }, // approach
              { pose: "up", end: 1, autoRotate: false }, // turn upward
            ],
          },
        },
        {
          label: "No",
          svgId: "btn-q4-no",
          next: null,
          motionPath: "mp-q4-no",
          caseStudyId: "brazil",
          car: {
            sequence: [
              { pose: "horizontal", end: 0.26089, autoRotate: false },
              { pose: "down", end: 1, autoRotate: false },
            ],
          },
        },
      ],
    },
  },
};

// ===== Quiz =====
// Helpers
const allSvgButtons = () => Array.from(document.querySelectorAll(".svg-button"));
let cleanupFns = [];
const nextFrame = () => new Promise((r) => requestAnimationFrame(r));
const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Turn "South Africa" ➜ "south-africa"
function slugify(str = "") {
  return (
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // strip accents
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

// Ensure uniqueness in the DOM (if two rows share a country)
const _usedIds = new Set();
function reserveId(base) {
  let id = base.replace(/^-+/, ""); // avoid starting with hyphen
  if (!/^[a-z]/.test(id)) id = `cs-${id}`; // prefix if it starts with a digit/other
  let n = 2,
    out = id;
  while (_usedIds.has(out) || document.getElementById(out)) {
    out = `${id}-${n++}`;
  }
  _usedIds.add(out);
  return out;
}

function scrollFrameTop() {
  const a = document.getElementById("frameStackAnchor") || document.getElementById("frameStack");
  if (!a) return;
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  a.scrollIntoView({ block: "start", behavior: prefersReduced ? "auto" : "smooth" });
}

async function retakeToTop(e) {
  e?.preventDefault?.();
  await fadeSwap("#caseStudyMount", "#quizWrapper");
  resetQuiz();
  await nextFrame();
  scrollFrameTop();
}

// --- Camera/controller + frame header ---
const svg = document.getElementById("roadSvg");
const questionNumberEl = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const stageEl = document.querySelector(".frame-stage");
const sr = document.getElementById("sr");
const restartBtn = document.getElementById("restartQuiz");
let hasShownRestart = false;

function showRestart() {
  gsap.killTweensOf(restartBtn);
  if (!restartBtn || !restartBtn.hasAttribute("hidden")) return;
  restartBtn.removeAttribute("hidden");
  gsap.to(restartBtn, { autoAlpha: 1, duration: 0.25, ease: "power2.out" });
}

function hideRestart() {
  gsap.killTweensOf(restartBtn);
  if (!restartBtn) return;
  gsap.set(restartBtn, { autoAlpha: 0 });
  restartBtn.setAttribute("hidden", "");
  hasShownRestart = false;
}

function forceShow(el) {
  if (!el) return;
  el.removeAttribute("hidden");
  el.style.display = "block";
  el.style.visibility = "visible";
  el.style.opacity = "1";
}

function forceHide(el) {
  if (!el) return;
  el.setAttribute("hidden", "");
  el.style.display = "none";
  el.style.visibility = "hidden";
  el.style.opacity = "0";
}

async function smoothRestart() {
  const quizPane = document.getElementById("quizWrapper");
  const csPane = document.getElementById("caseStudyMount");
  if (!quizPane) return;

  // Don’t let repeated clicks stack transitions
  restartBtn?.setAttribute("disabled", "");
  gsap.killTweensOf([quizPane, view, "#car-anchor", "#car-scale"]);

  // Build a single, ordered sequence
  await new Promise((done) => {
    gsap
      .timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          restartBtn?.removeAttribute("disabled");
          done();
        },
      })
      // 1) Fade OUT the quiz
      .to(quizPane, { autoAlpha: 0, duration: 0.35 })

      // 2) Make sure panes are in the right visibility state
      .add(() => {
        forceHide(csPane);
        forceShow(quizPane);
        gsap.set(quizPane, { autoAlpha: 0 });

        // Clean UI state
        cleanupFns.forEach((fn) => fn());
        cleanupFns = [];
        hideRestart();
        hasShownRestart = false;

        // Stop any motion
        gsap.killTweensOf([view, "#car-anchor", "#car-scale"]);

        // Reset to start
        const startId = quiz.startNode;
        const startAns = quiz.nodes[startId].answers[0];

        questionNumberEl.textContent = quiz.nodes[startId].number || "";
        questionText.textContent = quiz.nodes[startId].question;
        announceQuestion(`Question ${questionNumberEl.textContent}: ${quiz.nodes[startId].question}`);

        setCarPose(startAns.car?.sequence?.[0]?.pose || "horizontal");
        registerCarSprite();
        applyCameraScaleToCar();
        positionCarAtStart(startAns.motionPath, startAns.car?.sequence?.[0]?.pose || "horizontal");

        // Jump camera instantly
        tweenToCamera(quiz.nodes[startId].cameraTarget, { duration: 0 });

        // Rebind q1 (no camera tween)
        renderNode(startId, { skipCamera: true });
      })

      // 3) Fade IN the quiz
      .to(quizPane, { autoAlpha: 1, duration: 0.35 });
  });

  await nextFrame();
  scrollFrameTop();
  questionText?.focus({ preventScroll: true });
}

// after you define smoothRestart()
restartBtn?.addEventListener("click", () => {
  scrollFrameTop(); // optional: scroll immediately
  smoothRestart(); // does the fade + calls scrollFrameTop again at the end
});

// Match stage to SVG viewBox ratio
(function syncAspectRatioFromViewBox() {
  const [, , w, h] = (svg.getAttribute("viewBox") || "100.8 47.4 1975.5 1046.9").split(/\s+/).map(Number);
  stageEl?.style.setProperty("aspect-ratio", `${w} / ${h}`);
})();

// Mutable viewBox proxy
const view = { x: 100.8, y: 47.4, w: 1975.5, h: 1046.9 };

const carState = { path: null, progress: 0 };
let isDriving = false;

function registerCarSprite() {
  const el = document.getElementById("car-scale");
  if (!el) return;
  const box = el.getBBox(); // reflects the current <use> pose
  gsap.set(el, {
    x: -box.x - box.width / 2, // move the art so its center is at (0,0)
    y: -box.y - box.height / 2,
    transformBox: "view-box", // use the element's own coordinate system
    transformOrigin: "0 0", // scale from the anchor at (0,0)
  });
}

// Scale the car size based on camera zoom
const BASE_VIEW_W = view.w;
// Tune this so the car looks right when fully zoomed out (view.w === BASE_VIEW_W)
const CAR_WORLD_SIZE = 0.03; // try 0.04..0.10 depending on your art
const MIN = 0.015,
  MAX = 0.12,
  K = 0.7;

function clamp(min, max, v) {
  return Math.max(min, Math.min(max, v));
}

function applyCameraScaleToCar() {
  const zoom = BASE_VIEW_W / view.w;
  const s = clamp(MIN, MAX, CAR_WORLD_SIZE * Math.pow(zoom, K));
  gsap.set("#car-scale", { scale: s, transformBox: "view-box", transformOrigin: "0 0" });
  if (!isDriving && carState.path) reAlignCar();
}

const setViewBox = () => {
  svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
  applyCameraScaleToCar(); // keep the car scaling in sync with the zoom
};

function rectToViewBox(rect, pad = 0, minW = 460, minH = 290) {
  const x = rect.x.baseVal.value - pad;
  const y = rect.y.baseVal.value - pad;
  const w = Math.max(rect.width.baseVal.value + 2 * pad, minW);
  const h = Math.max(rect.height.baseVal.value + 2 * pad, minH);
  return { x, y, w, h };
}

function positionCarAtStart(pathId, pose = "horizontal") {
  const path = document.getElementById(pathId);
  const anchor = document.getElementById("car-anchor");
  if (!path || !anchor) return;

  setCarPose(pose); // sets <use>, we'll recenter next frame
  requestAnimationFrame(() => {
    registerCarSprite(); // center art at (0,0) after <use> swap
    carState.path = path;
    carState.progress = 0;
    gsap.set(anchor, {
      transformBox: "fill-box",
      transformOrigin: "50% 50%",
      motionPath: {
        path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 0,
        end: 0,
      },
    });
    reAlignCar(); // ensures perfect pin before first camera tween
  });
}

function reAlignCar() {
  const path = carState.path;
  const anchor = document.getElementById("car-anchor");
  if (!path || !anchor) return;
  const p = carState.progress;
  gsap.set(anchor, {
    motionPath: {
      path,
      align: path,
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
      start: p,
      end: p,
    },
  });
}

function asPromise(tweenOrTimeline) {
  // If GSAP exposes a real thenable, use it; otherwise wrap onComplete.
  if (tweenOrTimeline && typeof tweenOrTimeline.then === "function") return tweenOrTimeline;
  return new Promise((res) => tweenOrTimeline?.eventCallback?.("onComplete", res) ?? res());
}

// --- move the car along a branch path in sync with the camera ---
async function driveCar(pathId, opts = {}) {
  const path = document.getElementById(pathId);
  const anchor = document.getElementById("car-anchor");
  if (!path || !anchor) return Promise.resolve();

  const dur = opts.duration ?? 4;
  let seq = opts.sequence || [{ pose: "horizontal", end: 1 }];

  let prevEnd = 0;
  seq = seq
    .map((s, i) => ({
      pose: s.pose,
      end: i === seq.length - 1 ? 1 : Math.min(Math.max(s.end, prevEnd), 0.9999),
      autoRotate: s.autoRotate ?? false,
    }))
    .map((s) => ((prevEnd = s.end), s));

  setCarPose(seq[0].pose);
  await nextFrame();
  registerCarSprite();
  await nextFrame();

  isDriving = true;
  carState.path = path;
  carState.progress = 0;

  const tl = gsap.timeline({
    defaults: { ease: "power1.inOut", immediateRender: false },
    onComplete() {
      isDriving = false;
    },
  });

  let start = 0;
  seq.forEach((seg, i) => {
    const segDur = Math.max(dur * (seg.end - start), 0.0001);

    tl.to(anchor, {
      duration: segDur,
      motionPath: {
        path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: seg.autoRotate,
        start,
        end: seg.end,
      },
      onUpdate: function () {
        carState.progress = start + (seg.end - start) * this.progress();
      },
    });

    if (i < seq.length - 1) {
      tl.call(
        () => {
          setCarPose(seq[i + 1].pose);
          registerCarSprite();
        },
        [],
        ">"
      );
    }
    start = seg.end;
  });

  if (typeof opts.progressCueAt === "number" && typeof opts.onProgressCue === "function") {
    let fired = false;
    tl.eventCallback("onUpdate", () => {
      const p = tl.progress(); // 0..1 across the whole drive timeline
      if (!fired && p >= opts.progressCueAt) {
        fired = true;
        opts.onProgressCue();
      }
    });
  }

  return tl.then ? tl : new Promise((res) => tl.eventCallback("onComplete", res));
}

function tweenToCamera(targetRectId, opts = {}) {
  const rect = document.getElementById(targetRectId);
  if (!rect) return Promise.resolve();

  const vb = rectToViewBox(rect, opts.padding ?? 0);

  // bail out if we're already there (prevents needless delays)
  const eps = 0.01;
  if (
    Math.abs(view.x - vb.x) < eps &&
    Math.abs(view.y - vb.y) < eps &&
    Math.abs(view.w - vb.w) < eps &&
    Math.abs(view.h - vb.h) < eps
  ) {
    return Promise.resolve();
  }

  const dur = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : opts.duration ?? 3;

  gsap.killTweensOf(view); // avoid overlapping tweens

  const tween = gsap.to(view, {
    duration: dur,
    ease: opts.ease ?? "power2.inOut",
    x: vb.x,
    y: vb.y,
    w: vb.w,
    h: vb.h,
    onUpdate: setViewBox,
  });

  return new Promise((res) => tween.eventCallback("onComplete", res));
}

// --- Debugging: highlight a motion path ---
function highlightPath(id, color = "#00e676") {
  document.querySelectorAll(".debugPath").forEach((n) => n.remove());
  const p = document.getElementById(id);
  if (!p) return;
  const clone = p.cloneNode(true);
  clone.removeAttribute("id");
  clone.classList.add("debugPath");
  clone.style.pointerEvents = "none";
  clone.style.fill = "none";
  clone.style.stroke = color;
  clone.style.strokeWidth = 6;
  clone.style.strokeOpacity = 0.6;
  p.parentNode.appendChild(clone);
}

// --- set the car orientation ---
function setCarPose(pose) {
  const use = document.getElementById("car-use");
  const map = { horizontal: "#car-horizontal", up: "#car-vertical-up", down: "#car-vertical-down" };
  const target = map[pose] || map.horizontal;
  use.setAttribute("href", target);
  use.setAttribute("xlink:href", target); // Safari
}

// --- Accessibility + bindings ---
// Make the heading programmatically focusable once:
questionText?.setAttribute("tabindex", "-1");

function disableAllSvgButtons() {
  const active = document.activeElement;
  if (active && active.closest?.(".svg-button")) {
    questionText?.focus({ preventScroll: true });
  }

  allSvgButtons().forEach((el) => {
    el.toggleAttribute("inert", "");
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("tabindex", "-1");
  });
}

function bindSvgAnswer(ans, activate) {
  const el = document.getElementById(ans.svgId);
  if (!el) return;

  // Make it an active, reachable control
  el.removeAttribute("inert");
  el.removeAttribute("aria-disabled");
  el.setAttribute("tabindex", "0");
  el.setAttribute("role", el.getAttribute("role") || "button");
  el.setAttribute("aria-label", ans.label);

  const onClick = (e) => {
    e.preventDefault();
    activate(ans);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate(ans);
    }
  };

  el.addEventListener("click", onClick);
  el.addEventListener("keydown", onKeyDown);

  cleanupFns.push(() => {
    el.removeEventListener("click", onClick);
    el.removeEventListener("keydown", onKeyDown);
    el.setAttribute("tabindex", "-1");
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("inert", "");
  });
}

function announceQuestion(text) {
  if (!sr) return;
  sr.textContent = ""; // reset so SRs re-announce
  sr.textContent = text;
}

// --- Node renderer ---
async function renderNode(nodeId, { skipCamera = false } = {}) {
  const node = quiz.nodes[nodeId];
  if (!node) return;

  cleanupFns.forEach((fn) => fn());
  cleanupFns = [];
  disableAllSvgButtons();

  if (!skipCamera) {
    await tweenToCamera(node.cameraTarget);
  }

  questionNumberEl.textContent = node.number || "";
  questionText.textContent = node.question;
  announceQuestion(`Question ${questionNumberEl.textContent}: ${node.question}`);

  const activateAnswer = async (ans) => {
    const isLeaf = !ans.next;

    let csId = null;
    if (isLeaf) {
      csId =
        ans.caseStudyId ||
        caseStudyIndexByLeaf.get(`${nodeId}_${(ans.label || "").toLowerCase().replace(/\s+/g, "")}`) ||
        caseStudyIndexByLeaf.get(nodeId) ||
        null;
    }

    let earlyShown = false;

    const carP = ans.motionPath
      ? driveCar(ans.motionPath, {
          duration: 4,
          sequence: (ans.car || {}).sequence,
          // fire around when the car reaches the button (tweak 0.80–0.90)
          progressCueAt: 0.4,
          onProgressCue: () => {
            if (!earlyShown && csId) {
              earlyShown = true;
              earlyShowCaseStudyById(csId);
            }
          },
        })
      : Promise.resolve();

    if (ans.next) {
      const camP = tweenToCamera(quiz.nodes[ans.next].cameraTarget);
      await Promise.all([carP, camP]);
      if (!hasShownRestart) {
        showRestart();
        hasShownRestart = true;
      }
      await renderNode(ans.next, { skipCamera: true });
    } else {
      // leaf
      await carP; // car finishes
      if (csId) {
        await finalizeCaseStudySwap(); // quiz fades out; case study already visible
      } else {
        hideRestart();
        announceQuestion("Quiz complete. Thanks!");
      }
    }
  };

  node.answers.forEach((ans) => bindSvgAnswer(ans, activateAnswer));
}

// ===== Case studies =====
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQryB41aY-chlYP816eVqR6Y_NTOcSuA3SFx5AJEgvBv4A4gwaAyUbpLipBxCNOxVmaT58x1s7KOWN/pub?output=csv"; // <- your published CSV

async function fetchCSV(url) {
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();
  return parseCSV(text);
}

// Light CSV parser (handles simple commas and quotes)
function parseCSV(text) {
  const rows = [];
  let i = 0,
    field = "",
    row = [],
    inQuotes = false;

  while (i < text.length) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        } // escaped quote
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }

    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
      i++;
      continue;
    }

    field += c;
    i++;
  }
  // push last field
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift().map((h) => h.trim());
  return rows.map((r) => {
    const o = {};
    headers.forEach((h, idx) => (o[h] = (r[idx] ?? "").trim()));
    return o;
  });
}

let caseStudiesById = {};
let caseStudyIndexByLeaf = new Map();

async function loadCaseStudies() {
  const rows = await fetchCSV(SHEET_CSV_URL);

  // index by id
  caseStudiesById = Object.fromEntries(rows.map((r) => [r.id, r]));

  // optional: build leaf → caseStudy mapping from the sheet
  caseStudyIndexByLeaf.clear();
  rows.forEach((r) => {
    const leafs = (r.leaf_ids || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    leafs.forEach((leafId) => caseStudyIndexByLeaf.set(leafId, r.id));
  });

  // also render the gallery once data is ready
  renderCaseStudyGallery(rows);
}

function ensureFlourishScript() {
  if (document.querySelector('script[src*="public.flourish.studio/resources/embed.js"]')) return;
  const s = document.createElement("script");
  s.src = "https://public.flourish.studio/resources/embed.js";
  s.async = true;
  document.head.appendChild(s);
}

function buildFlourishIframe(url, { height = 460 } = {}) {
  const m = String(url || "").match(/visualisation\/(\d+)/);
  const id = m ? m[1] : null;

  if (!id) {
    const fallback = document.createElement("div");
    fallback.className = "cs-chart--error";
    fallback.textContent = null;
    return fallback;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `https://flo.uri.sh/visualisation/${id}/embed`;
  iframe.title = "Flourish chart";
  iframe.style.width = "100%";
  iframe.style.height = `${height}px`;
  iframe.style.border = "0";
  iframe.setAttribute("scrolling", "no");
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  return iframe;
}

function renderCaseStudyCard(study, { mount, showRetake = false, onRetake = null, domId } = {}) {
  mount.innerHTML = "";

  const card = document.createElement("article");
  card.className = "cs-card";
  if (domId) card.id = domId; // <<—— set the id when provided
  if (study.country) card.dataset.country = study.country; // handy for filtering

  card.innerHTML = `
    <header class="cs-header">
      <div class="cs-strategy-number">${study.strategy_number || ""}</div>
      <h2 class="cs-strategy-title">${study.strategy_title || ""}</h2>
      <p class="cs-intro">${study.strategy_intro || ""}</p>
      <div class="cs-case-tag">${study.case_tag || ""}</div>
    </header>

    <section class="cs-body">
      <h3 class="cs-subhead">Overview</h3>
      <p class="cs-overview">${study.overview || ""}</p>

      <h3 class="cs-subhead">${study.key_policy_title || "Key Policy"}</h3>
      <p class="cs-key-policy">${study.key_policy_body || ""}</p>

      <figure class="cs-chart"></figure>

      <h3 class="cs-subhead">${study.takeaway_title || "Takeaway"}</h3>
      <p class="cs-takeaway">${study.takeaway_body || ""}</p>
    </section>

    ${
      showRetake
        ? `
      <footer class="cs-footer">
        <button id="cs-retake" class="cs-retake" type="button">
          <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>
          <span class="label">Retake Quiz</span>
        </button>
      </footer>`
        : ""
    }
  `;

  // (chart injection unchanged)
  const chartFig = card.querySelector(".cs-chart");
  if (chartFig) {
    chartFig.innerHTML = "";
    if (study.chart_url) {
      chartFig.appendChild(buildFlourishIframe(study.chart_url, { height: Number(study.chart_height) || 460 }));
    } else {
      chartFig.textContent = null;
    }
  }

  mount.appendChild(card);

  if (showRetake && onRetake) {
    card.querySelector("#cs-retake")?.addEventListener("click", onRetake);
  }
}

function fadeSwap(fromSel, toSel) {
  const from = document.querySelector(fromSel);
  const to = document.querySelector(toSel);
  return new Promise((res) => {
    gsap.killTweensOf([from, to]);
    gsap
      .timeline({ defaults: { duration: 0.35, ease: "power2.out" }, onComplete: res })
      .to(from, { autoAlpha: 0 })
      .set(from, { display: "none" })
      .set(to, { display: "block", autoAlpha: 0 })
      .to(to, { autoAlpha: 1 });
  });
}

async function showCaseStudyById(id) {
  hideRestart();
  const study = caseStudiesById[id];
  if (!study) {
    console.warn("Unknown case study id:", id);
    return;
  }
  const mount = document.getElementById("caseStudyMount");
  renderCaseStudyCard(study, {
    mount,
    showRetake: true,
    onRetake: retakeToTop,
  });
  await fadeSwap("#quizWrapper", "#caseStudyMount");
}

function resetQuiz() {
  // camera back to start, car to start, buttons active, first question text, etc.
  hideRestart();
  const startAns = quiz.nodes[quiz.startNode].answers[0];
  questionNumberEl.textContent = quiz.nodes[quiz.startNode].number || "";
  questionText.textContent = quiz.nodes[quiz.startNode].question;
  positionCarAtStart(startAns.motionPath, startAns.car?.sequence?.[0]?.pose || "horizontal");
  tweenToCamera(quiz.nodes[quiz.startNode].cameraTarget, { duration: 0 });
  renderNode(quiz.startNode);
}

function renderCaseStudyGallery(rows) {
  const grid = document.getElementById("caseStudyGallery");
  grid.innerHTML = "";

  rows.forEach((study) => {
    const mount = document.createElement("div");
    mount.className = "cs-card-wrap";

    // Prefer the country name; fall back to sheet id or title
    const base = study.country || study.id || study.strategy_title || "case";
    const domId = reserveId(slugify(base)); // e.g., "south-africa"

    renderCaseStudyCard(study, {
      mount,
      showRetake: false, // gallery cards don’t show the retake button
      domId, // <<—— set the element id here
    });

    grid.appendChild(mount);
  });
}

function earlyShowCaseStudyById(id) {
  hideRestart();
  const study = caseStudiesById[id];
  if (!study) return;

  const mount = document.getElementById("caseStudyMount");
  renderCaseStudyCard(study, {
    mount,
    showRetake: true,
    onRetake: retakeToTop,
  });

  // Make sure it overlays and is visible while the quiz is still shown
  gsap.set(mount, {
    display: "block",
    autoAlpha: 0,
    pointerEvents: "none", // prevent accidental clicks
  });
  gsap.to(mount, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
}

async function finalizeCaseStudySwap() {
  const quizPane = document.getElementById("quizWrapper");
  const csPane = document.getElementById("caseStudyMount");

  // enable interaction now that the quiz is going away
  gsap.set(csPane, { pointerEvents: "auto" });

  // just fade OUT the quiz (the case study is already visible)
  await new Promise((res) => gsap.to(quizPane, { autoAlpha: 0, duration: 0.25, ease: "power2.out", onComplete: res }));
  gsap.set(quizPane, { display: "none" });
}

(async function init() {
  await loadCaseStudies();

  const startAns = quiz.nodes[quiz.startNode].answers[0];

  // Clear any inline SVG attributes that might interfere with our gsap.set() calls
  ["x", "y", "width", "height", "transform"].forEach((a) => document.getElementById("car-use")?.removeAttribute(a));

  // Pick starting sprite
  setCarPose(startAns.car?.sequence?.[0]?.pose || "horizontal");
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  // Wait for <use> to settle, then center the art
  await nextFrame();
  registerCarSprite();

  // Scale for initial camera
  applyCameraScaleToCar();

  // Put the car on the very start of the starting path, then run the first node
  positionCarAtStart(startAns.motionPath, startAns.car?.sequence?.[0]?.pose || "horizontal");
  await nextFrame();

  gsap.to("#car-scale", { autoAlpha: 1, duration: 0.12 });

  renderNode(quiz.startNode);
})();
