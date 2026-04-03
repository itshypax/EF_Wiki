/**
 * EmergencyForge Wiki — Enhancements
 * View Transitions, Scroll Progress
 */

(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ── View Transitions ───────────────────────────

  function initViewTransitions() {
    if (!document.startViewTransition) return;
    var content = document.querySelector(".md-content");
    if (content) {
      content.style.viewTransitionName = "content";
    }
  }

  // ── Scroll Progress Indicator ──────────────────

  function initScrollProgress() {
    var sidebar = document.querySelector(".md-sidebar--secondary");
    if (!sidebar) return;

    var ticking = false;

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      sidebar.style.setProperty("--ef-scroll-progress", progress + "%");
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  // ── Init ───────────────────────────────────────

  function init() {
    initViewTransitions();
    initScrollProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  // Re-init on MkDocs Material instant navigation
  var initDebounceTimer = null;
  document.addEventListener("DOMContentLoaded", function () {
    clearTimeout(initDebounceTimer);
    initDebounceTimer = setTimeout(init, 50);
  });
})();
