/* ==========================================================
   PROJECT DATA
   Single source of truth for the Featured Projects section.
   Add or edit a project by editing this array only.
========================================================== */
const PROJECTS = [
  {
    name: "Restaurant Operations Platform",
    status: "in-development",
    statusLabel: "In Development",
    description:
      "A secure restaurant operations platform for managing tables, reservations, authentication, and administrative workflows through a responsive full-stack application.",
    highlights: [
      "JWT authentication with rotating refresh tokens and Spring Security",
      "Protected frontend routing and responsive administration screens",
      "Table management and reservation workflows with input validation",
      "Search and filtering across tables and reservations",
      "Flyway database migrations and optimistic locking",
      "Audit events, OpenAPI documentation, and test foundations on both ends",
    ],
    tech: ["React", "TypeScript", "Java 21", "Spring Boot", "MySQL", "Docker"],
    github: "https://github.com/AdamWaleedHatemHossamElden/restaurant-operations-platform",
    note: "Solo project, currently in active development.",
    wide: true,
  },
  {
    name: "CoS-BA Bias Auditor",
    status: "completed",
    statusLabel: "Completed — Final-Year Project — 86%",
    description:
      "A full-stack platform for uploading AI-generated content, reporting potential bias, reviewing community submissions, and managing moderation workflows.",
    highlights: [
      "User authentication and AI-content submissions with file uploads",
      "Bias reporting, community review, likes, and comments",
      "Search and filters with report-status tracking",
      "Admin controls and moderation workflows",
      "Analytical dashboards built with Recharts",
    ],
    tech: ["React", "Node.js", "Express", "MySQL", "JWT", "Recharts"],
    github: "https://github.com/AdamWaleedHatemHossamElden/cosba-bias-auditor",
    featured: true,
    screenshots: [
      { src: "images/cosba/dashboard.webp", label: "Dashboard", alt: "CoS-BA dashboard showing report analytics, charts, categories, and model statistics" },
      { src: "images/cosba/home.webp", label: "Home", alt: "CoS-BA home page showing the main community content feed" },
      { src: "images/cosba/admin.webp", label: "Admin", alt: "CoS-BA admin panel for managing users, content, reports, and report statuses" },
    ],
  },
  {
    name: "Attendance Management System v2",
    status: "in-development",
    statusLabel: "In Development",
    description:
      "An admin-focused attendance platform for managing students, sessions, attendance records, reporting, and analytical workflows.",
    highlights: [
      "Student management with searchable, paginated profiles",
      "Session creation, management, and attendance marking",
      "Dashboard analytics and attendance statistics",
      "Bulk Excel import and export, plus report exports",
      "REST API integration on MySQL-backed workflows with authentication",
    ],
    tech: ["React", "Node.js", "Express", "MySQL", "JWT"],
    github: "https://github.com/AdamWaleedHatemHossamElden/attendance-system",
    note: "Version 2 of the attendance system, rebuilt and actively extended.",
  },
  {
    name: "TraceAI",
    status: "in-development",
    statusLabel: "In Development",
    description:
      "A human-in-the-loop platform for verifying claims in AI-generated answers against user-provided evidence.",
    highlights: [
      "TypeScript API and a separate Python/FastAPI AI service",
      "MySQL database with an authentication foundation and health checks",
      "Docker Compose development environment",
      "Claim-level verification architecture (in progress)",
      "Evidence-upload workflow design (in progress)",
    ],
    tech: ["TypeScript", "Express", "Python", "FastAPI", "MySQL", "Docker Compose"],
    github: "https://github.com/AdamWaleedHatemHossamElden/TraceAI",
    note: "Early-stage foundations are implemented; claim verification and evidence upload are still being built.",
  },
];

const GITHUB_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderProjectCard(project, index) {
  const statusClass = project.status === "completed" ? "status-completed" : "status-progress";
  const highlights = project.highlights
    .map((h) => `<li>${escapeHtml(h)}</li>`)
    .join("");
  const tags = project.tech.map((t) => `<li>${escapeHtml(t)}</li>`).join("");

  const links = [];
  if (project.github) {
    links.push(
      `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="github-btn" aria-label="View ${escapeHtml(
        project.name
      )} source code on GitHub (opens in new tab)">${GITHUB_ICON} View Code</a>`
    );
  }

  const note = project.note ? `<p class="project-note">${escapeHtml(project.note)}</p>` : "";

  let screenshotsHtml = "";
  if (project.screenshots && project.screenshots.length) {
    const shots = project.screenshots
      .map(
        (s) => `
        <button
          class="project-preview"
          type="button"
          data-img-src="${s.src}"
          data-img-alt="${escapeHtml(s.alt)}"
          aria-label="View full-size ${escapeHtml(s.label)} screenshot for ${escapeHtml(project.name)}"
        >
          <span class="project-preview-label">${escapeHtml(s.label)}</span>
          <img src="${s.src}" alt="${escapeHtml(s.alt)}" loading="lazy" class="project-preview-img" width="1600" height="900" />
        </button>`
      )
      .join("");
    screenshotsHtml = `<div class="project-screenshots" aria-label="${escapeHtml(project.name)} screenshots">${shots}</div>`;
  }

  const featuredClass = project.featured ? " project-card-featured" : "";
  const layoutClass = project.screenshots && project.screenshots.length ? " project-card-with-media" : "";
  const wideClass = project.wide && !screenshotsHtml ? " project-card-wide" : "";

  if (project.wide && !screenshotsHtml) {
    return `
      <article class="project-card${wideClass}" aria-label="${escapeHtml(project.name)}">
        <div class="project-card-summary">
          <div class="project-meta-row">
            <span class="project-number">0${index + 1}</span>
            <span class="status-badge ${statusClass}">${escapeHtml(project.statusLabel)}</span>
          </div>
          <h3>${escapeHtml(project.name)}</h3>
          <p class="project-desc">${escapeHtml(project.description)}</p>
          ${note}
          <div class="project-links">${links.join("")}</div>
        </div>
        <div class="project-card-details">
          <ul class="feature-highlights" aria-label="Key features and engineering highlights">${highlights}</ul>
          <ul class="tag-list" aria-label="Technologies used">${tags}</ul>
        </div>
      </article>`;
  }

  return `
    <article class="project-card${featuredClass}${layoutClass}" aria-label="${escapeHtml(project.name)}">
      <div class="project-card-body">
        <div class="project-meta-row">
          <span class="project-number">0${index + 1}</span>
          <span class="status-badge ${statusClass}">${escapeHtml(project.statusLabel)}</span>
        </div>
        <h3>${escapeHtml(project.name)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>
        <ul class="feature-highlights" aria-label="Key features and engineering highlights">${highlights}</ul>
        <ul class="tag-list" aria-label="Technologies used">${tags}</ul>
        ${note}
        <div class="project-links">${links.join("")}</div>
      </div>
      ${screenshotsHtml}
    </article>`;
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(renderProjectCard).join("");
}

renderProjects();

/* ==========================================================
   MOTION PREFERENCE
========================================================== */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */
const scrollBar = document.querySelector(".scroll-progress");
window.addEventListener(
  "scroll",
  () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
  },
  { passive: true }
);

/* ==========================================================
   TOPBAR SHADOW ON SCROLL
========================================================== */
const topbar = document.querySelector(".topbar");
window.addEventListener(
  "scroll",
  () => topbar.classList.toggle("scrolled", window.scrollY > 12),
  { passive: true }
);

/* ==========================================================
   MOBILE NAVIGATION
========================================================== */
const hamburger = document.querySelector(".hamburger");
const mainNav = document.querySelector("#main-nav");

hamburger.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (e) => {
  if (!topbar.contains(e.target)) {
    mainNav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

/* ==========================================================
   ACTIVE NAV LINK ON SCROLL
========================================================== */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

/* ==========================================================
   SCREENSHOT LIGHTBOX
========================================================== */
const imgModal = document.getElementById("img-modal");
const modalImg = imgModal ? imgModal.querySelector(".img-modal-img") : null;
const modalClose = imgModal ? imgModal.querySelector(".img-modal-close") : null;

if (imgModal && modalImg) {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".project-preview[data-img-src]");
    if (!trigger) return;
    modalImg.src = trigger.dataset.imgSrc;
    modalImg.alt = trigger.dataset.imgAlt || "";
    imgModal.showModal();
    modalClose?.focus();
  });

  imgModal.addEventListener("close", () => {
    modalImg.removeAttribute("src");
    modalImg.alt = "";
  });

  modalClose?.addEventListener("click", () => imgModal.close());

  imgModal.addEventListener("click", (e) => {
    if (e.target === imgModal) imgModal.close();
  });
}

/* ==========================================================
   FOOTER YEAR
========================================================== */
const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = String(new Date().getFullYear());
