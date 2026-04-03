/**
 * EmergencyForge Wiki — Overdrive Effects
 * 3D card tilt, View Transitions, Scroll Progress
 */

(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ── 3D Tilt Cards ──────────────────────────────

  function initTiltCards() {
    var cards = document.querySelectorAll(".grid.cards > ul > li");

    cards.forEach(function (card) {
      if (card.dataset.tilt) return;
      card.dataset.tilt = "true";

      var isHovering = false;
      var currentX = 0;
      var currentY = 0;
      var targetX = 0;
      var targetY = 0;
      var rafId = null;

      function animate() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        card.style.transform =
          "perspective(600px) rotateX(" + currentX + "deg) rotateY(" + currentY + "deg) translateY(-4px) scale(1.02)";

        if (isHovering || Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
          rafId = requestAnimationFrame(animate);
        } else {
          card.style.transform = "";
          rafId = null;
        }
      }

      card.addEventListener("mouseenter", function () {
        isHovering = true;
        if (!rafId) rafId = requestAnimationFrame(animate);
      });

      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        targetX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
        targetY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
      });

      card.addEventListener("mouseleave", function () {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        if (!rafId) rafId = requestAnimationFrame(animate);
      });
    });
  }

  // ── View Transitions ───────────────────────────

  function initViewTransitions() {
    if (!document.startViewTransition) return;
    var content = document.querySelector(".md-content");
    if (content) {
      content.style.viewTransitionName = "content";
    }
  }

  // ── Scroll Progress Indicator ──────────────────
  // Shows reading progress on the right TOC sidebar

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
    initTiltCards();
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
