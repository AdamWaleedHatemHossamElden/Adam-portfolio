const revealTargets = document.querySelectorAll(".hero, .section, .contact-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealTargets.forEach((target, index) => {
  target.style.transitionDelay = `${index * 90}ms`;
  observer.observe(target);
});
