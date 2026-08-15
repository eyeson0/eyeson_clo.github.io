/* ============================================================
   EYESON — LOADING.JS
   Cinematic eye loading screen. Plays once per session, then
   dissolves into the page.
   ============================================================ */

function initLoadingScreen() {
  /* Skip the cinematic on repeat navigations within the session */
  if (sessionStorage.getItem("eyeson_loaded")) return;

  const screen = document.createElement("div");
  screen.id = "loading-screen";
  screen.innerHTML =
    '<div class="loader-eye" aria-hidden="true">' +
      '<div class="l-eye-shape"></div>' +
      '<div class="l-iris"><div class="l-pupil"></div></div>' +
      '<div class="l-gloss"></div>' +
      '<div class="l-lid-top"></div>' +
      '<div class="l-lid-bottom"></div>' +
    "</div>" +
    /* Official logo fades in beneath the opening eye */
    '<div class="loader-logo"><img src="images/logo/logo.png" alt="EYESON" onerror="this.outerHTML=\'<span class=&quot;logo-fallback&quot;>EYESON</span>\'"/></div>';
  document.body.appendChild(screen);
  document.body.style.overflow = "hidden";

  /* Total cinematic ≈ 2.8s, then dissolve */
  setTimeout(() => {
    screen.classList.add("done");
    document.body.style.overflow = "";
    sessionStorage.setItem("eyeson_loaded", "1");
    setTimeout(() => screen.remove(), 900);
  }, 2800);
}
