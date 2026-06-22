/* ══════════════════════════════════════════════════
   MOTION & TOUCH DETECTION
══════════════════════════════════════════════════ */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0;

/* ══════════════════════════════════════════════════
   INTRO ANIMATION
══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => document.body.classList.add("page-ready"), 60);
});

/* ══════════════════════════════════════════════════
   CURSOR GLOW
══════════════════════════════════════════════════ */
const cursorGlow = document.querySelector(".cursor-glow");

if (!isTouchDevice && !prefersReducedMotion) {
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top  = e.clientY + "px";
    cursorGlow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

/* ══════════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════════ */
const scrollBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
}, { passive: true });

/* ══════════════════════════════════════════════════
   TOPBAR SHADOW ON SCROLL
══════════════════════════════════════════════════ */
const topbar = document.querySelector(".topbar");

window.addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* ══════════════════════════════════════════════════
   SCROLL-TO-TOP BUTTON
══════════════════════════════════════════════════ */
const scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
}, { passive: true });

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ══════════════════════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════════════════════ */
const hamburger = document.querySelector(".hamburger");
const mainNav   = document.querySelector("#main-nav");

hamburger.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close on nav link click
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!topbar.contains(e.target)) {
    mainNav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

/* ══════════════════════════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════════════════════════ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -60% 0px" }
);

sections.forEach((s) => navObserver.observe(s));

/* ══════════════════════════════════════════════════
   SCROLL REVEAL + STAGGER
══════════════════════════════════════════════════ */
const revealTargets = document.querySelectorAll(".section, .contact-card");

// Mark cards/panels for stagger BEFORE observing
document.querySelectorAll(".project-card, .skill-panel").forEach((el) => {
  el.classList.add("stagger-child");
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");

      // Stagger child cards
      const children = entry.target.querySelectorAll(".stagger-child");
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add("is-visible"), 70 + i * 90);
      });

      // Stagger skill tags
      const tags = entry.target.querySelectorAll(".skill-panel");
      tags.forEach((panel, pi) => {
        panel.querySelectorAll(".skill-tags span").forEach((tag, ti) => {
          tag.style.transition = `background 0.2s ease, border-color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${100 + pi * 60 + ti * 45}ms, opacity 0.35s ease ${100 + pi * 60 + ti * 45}ms, box-shadow 0.2s ease`;
        });
      });

      sectionObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.08 }
);

revealTargets.forEach((t) => sectionObserver.observe(t));

/* ══════════════════════════════════════════════════
   TYPEWRITER EFFECT
══════════════════════════════════════════════════ */
const typeTarget = document.querySelector(".typewriter-target");

if (typeTarget) {
  const fullText = typeTarget.textContent.trim();

  if (prefersReducedMotion) {
    // Skip animation — just show text immediately with shimmer
    typeTarget.textContent = fullText;
    typeTarget.classList.add("shimmer");
  } else {
    typeTarget.textContent = "";

    const cursorSpan = document.createElement("span");
    cursorSpan.className = "cursor-blink";
    typeTarget.appendChild(cursorSpan);

    let i = 0;

    function type() {
      if (i < fullText.length) {
        typeTarget.insertBefore(document.createTextNode(fullText[i]), cursorSpan);
        i++;
        setTimeout(type, 26);
      } else {
        // Fade cursor out, then add shimmer
        setTimeout(() => {
          cursorSpan.style.transition = "opacity 0.5s ease";
          cursorSpan.style.opacity = "0";
          setTimeout(() => {
            typeTarget.classList.add("shimmer");
            cursorSpan.remove();
          }, 600);
        }, 1600);
      }
    }

    setTimeout(type, 350);
  }
}

/* ══════════════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const from   = parseInt(el.dataset.from  || "0", 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value    = Math.round(from + (target - from) * easeOut(progress));
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

if (!prefersReducedMotion) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const els = entry.target.querySelectorAll(".metric-value[data-count]");
        // Slight delay so the section reveal plays first
        setTimeout(() => els.forEach(animateCounter), 300);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  const heroSection = document.querySelector("#hero");
  if (heroSection) counterObserver.observe(heroSection);
}

/* ══════════════════════════════════════════════════
   3D TILT ON PROJECT CARDS
══════════════════════════════════════════════════ */
if (!prefersReducedMotion) {
  document.querySelectorAll(".project-card").forEach((card) => {
    let raf = null;
    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      currentRX = lerp(currentRX, targetRX, 0.1);
      currentRY = lerp(currentRY, targetRY, 0.1);
      card.style.transform =
        `perspective(900px) rotateX(${currentRX}deg) rotateY(${currentRY}deg) translateZ(4px)`;

      if (Math.abs(currentRX - targetRX) > 0.01 || Math.abs(currentRY - targetRY) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      targetRY =  x * 12;
      targetRX = -y * 12;

      // Spotlight glow
      const mx = ((e.clientX - rect.left) / rect.width)  * 100;
      const my = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty("--mx", mx + "%");
      card.style.setProperty("--my", my + "%");

      if (!raf) raf = requestAnimationFrame(tick);
    });

    card.addEventListener("mouseleave", () => {
      targetRX = 0;
      targetRY = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    });
  });
}

/* ══════════════════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════
   COSBA SCREENSHOT LIGHTBOX
══════════════════════════════════════════════════ */
const imgModal    = document.getElementById("img-modal");
const cosbaTriggers = document.querySelectorAll(".project-preview[data-img-src]");
const modalImg    = imgModal ? imgModal.querySelector(".img-modal-img") : null;
const modalClose  = imgModal ? imgModal.querySelector(".img-modal-close") : null;

if (imgModal && cosbaTriggers.length && modalImg) {
  cosbaTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const src = trigger.dataset.imgSrc || trigger.querySelector("img")?.src;
      const alt = trigger.dataset.imgAlt || trigger.querySelector("img")?.alt || "";
      if (!src) return;
      modalImg.src = src;
      modalImg.alt = alt;
      imgModal.showModal();
      modalClose?.focus();
    });
  });

  imgModal.addEventListener("close", () => {
    modalImg.src = "";
    modalImg.alt = "";
  });

  modalClose?.addEventListener("click", () => imgModal.close());

  // Click backdrop to close
  imgModal.addEventListener("click", (e) => {
    if (e.target === imgModal) imgModal.close();
  });
}

if (!prefersReducedMotion) {
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.28;
      const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.28;
      btn.style.transition = "transform 0.12s ease";
      btn.style.transform  = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transition = "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)";
      btn.style.transform  = "translate(0, 0)";
    });
  });
}
