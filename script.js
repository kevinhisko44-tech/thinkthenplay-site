// =========================
// script.js (FULL FILE)
// =========================

// ---------- CONFIG: set your App Store / TestFlight link here ----------
const APP_LINK = "coming-soon.html"; // <-- replace with your real link

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Set CTA links ----------
const ctaDesktop = document.getElementById("ctaLinkDesktop");
const ctaAppstore = document.getElementById("ctaAppstore");
if (ctaDesktop) ctaDesktop.href = APP_LINK;
if (ctaAppstore) ctaAppstore.href = APP_LINK;

// ---------- Floating CTA behaviour (Desktop QR vs Mobile/Tablet Button) ----------
const qr = document.getElementById("ctaQr");
const btn = document.getElementById("ctaAppstore");

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function isLikelyMobileOrTablet() {
  const smallEnough = window.matchMedia("(max-width: 1024px)").matches;
  return isTouchDevice() && smallEnough;
}

function updateCTA() {
  if (!qr || !btn) return;

  const showButton = isLikelyMobileOrTablet();
  if (showButton) {
    btn.style.display = "inline-flex";
    qr.style.display = "none";
  } else {
    qr.style.display = "block";
    btn.style.display = "none";
  }
}

window.addEventListener("resize", updateCTA);
updateCTA();

// ---------- Carousel (Apple-style scroll with floating arrows) ----------
const viewport = document.getElementById("carouselViewport");
const track = document.getElementById("carouselTrack");
const arrowButtons = document.querySelectorAll(".carousel-btn");

function getStepSize() {
  if (!track) return 300;

  const first = track.querySelector(".shot");
  if (!first) return 300;

  const style = window.getComputedStyle(track);
  const gap = parseFloat(style.gap || style.columnGap || "56");

  return first.getBoundingClientRect().width + (isNaN(gap) ? 56 : gap);
}

function scrollCarousel(dir) {
  if (!viewport) return;
  const step = getStepSize();
  viewport.scrollBy({ left: dir * step, behavior: "smooth" });
}

if (viewport) {
  arrowButtons.forEach((b) => {
    b.addEventListener("click", () => {
      const dir = parseInt(b.dataset.dir, 10) || 1;
      scrollCarousel(dir);
    });
  });
}

// ---------- Hero video fallback ----------
const heroVideo = document.querySelector(".hero-device-video");
const heroFallback = document.querySelector(".hero-device-fallback");

if (heroVideo && heroFallback) {
  const showFallback = () => {
    heroVideo.style.display = "none";
    heroFallback.style.display = "block";
  };

  heroVideo.addEventListener("error", showFallback);
  heroVideo.addEventListener("stalled", showFallback);

  // If the video can't load/play within a moment, show fallback
  setTimeout(() => {
    if (heroVideo.readyState === 0) showFallback();
  }, 800);
}


// ---------- FAQ Accordion ----------
const acc = document.getElementById("faqAccordion");
if (acc) {
  const items = Array.from(acc.querySelectorAll(".acc-item"));

  items.forEach((btnEl) => {
    btnEl.addEventListener("click", () => {
      const panel = btnEl.nextElementSibling;
      if (!panel) return;

      const isOpen = panel.classList.contains("is-open");

      // Close all
      acc.querySelectorAll(".acc-panel").forEach((p) => p.classList.remove("is-open"));
      acc.querySelectorAll(".acc-plus").forEach((p) => (p.textContent = "+"));

      // Open selected
      if (!isOpen) {
        panel.classList.add("is-open");
        const plus = btnEl.querySelector(".acc-plus");
        if (plus) plus.textContent = "–";
      }
    });
  });
}