/* ============================================================
   EYESON — ANIMATIONS.JS
   Scroll reveals (IntersectionObserver), header scroll state,
   hero parallax, magnetic buttons, back-to-top.
   ============================================================ */

/* Reveal every .reveal / .reveal-left / .reveal-right on scroll */
function initReveals() {
  const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("visible")); return; }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } }),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* Transparent → solid blurred header + logo scale-down on scroll */
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  const top = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (top) top.classList.toggle("show", y > 600);
    /* Hero parallax — background drifts slower than the content */
    const heroBg = document.querySelector(".hero-bg");
    if (heroBg && y < window.innerHeight) heroBg.style.transform = "translateY(" + y * 0.35 + "px)";
  }, { passive: true });
  if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* Magnetic buttons — gently lean toward the cursor */
function initMagneticButtons() {
  if (!window.matchMedia("(hover: hover)").matches) return;
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / 6;
      const y = (e.clientY - r.top - r.height / 2) / 6;
      btn.style.transform = "translate(" + x + "px," + (y - 2) + "px)";
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
}

/* Boot all global motion */
function initAnimations() {
  initReveals();
  initHeaderScroll();
  initMagneticButtons();
}
