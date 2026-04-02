/**
 * EmergencyForge Wiki — Overdrive Effects
 * 3D card tilt + View Transitions integration
 */

(function () {
  "use strict";

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // ── 3D Tilt Cards ──────────────────────────────
  // Subtle perspective shift following the cursor

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
        // Lerp for smooth spring-like feel
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
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        // Max 5 degrees — noticeable but not wild
        targetX = ((y - centerY) / centerY) * -5;
        targetY = ((x - centerX) / centerX) * 5;
      });

      card.addEventListener("mouseleave", function () {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        // Animation loop continues until it reaches 0
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

  // ── Init ───────────────────────────────────────

  function init() {
    initTiltCards();
    initViewTransitions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-init on MkDocs Material instant navigation
  document.addEventListener("DOMContentLoaded", init);

  // Observe for dynamically added cards
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length) {
        initTiltCards();
        break;
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
