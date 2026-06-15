/* ══ STAR BACKGROUND ══ */
const starCanvas = document.getElementById('star-canvas');
const starCtx    = starCanvas.getContext('2d');
let stars = [];

function resizeStarCanvas() {
  starCanvas.width  = window.innerWidth;
  starCanvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((window.innerWidth * window.innerHeight) / 5000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x:       Math.random() * starCanvas.width,
      y:       Math.random() * starCanvas.height,
      r:       Math.random() * 1.3 + 0.2,
      speed:   Math.random() * 0.25 + 0.04,
      opacity: Math.random() * 0.65 + 0.2,
      color:   (() => {
        const roll = Math.random();
        if (roll > 0.93) return '#cc0001';
        if (roll > 0.86) return '#d4af37';
        return '#ffffff';
      })(),
    });
  }
}

function drawStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach(s => {
    starCtx.globalAlpha = s.opacity;
    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starCtx.fillStyle = s.color;
    starCtx.fill();
    s.y -= s.speed;
    if (s.y < -2) { s.y = starCanvas.height + 2; s.x = Math.random() * starCanvas.width; }
  });
  starCtx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => { resizeStarCanvas(); initStars(); });
resizeStarCanvas(); initStars(); drawStars();

/* ══ CONFETTI ══ */
const confCanvas = document.getElementById('confetti-canvas');
const confCtx    = confCanvas.getContext('2d');
let pieces = [];
const CONF_COLORS = ['#cc0001','#d4af37','#ffffff','#00529f','#ff4040','#f0c840'];

function resizeConfCanvas() {
  confCanvas.width  = window.innerWidth  * devicePixelRatio;
  confCanvas.height = window.innerHeight * devicePixelRatio;
  confCtx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function spawnConfetti(n = 120) {
  for (let i = 0; i < n; i++) {
    pieces.push({
      x:       Math.random() * window.innerWidth,
      y:       -20 - Math.random() * window.innerHeight * 0.4,
      w:       6  + Math.random() * 8,
      h:       3  + Math.random() * 4,
      color:   CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)],
      speed:   2.5 + Math.random() * 4,
      rot:     Math.random() * 360,
      spin:    -6  + Math.random() * 12,
      drift:   -1.5 + Math.random() * 3,
    });
  }
}

function drawConfetti() {
  confCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    p.y   += p.speed;
    p.x   += p.drift;
    p.rot += p.spin;
    confCtx.save();
    confCtx.translate(p.x, p.y);
    confCtx.rotate(p.rot * Math.PI / 180);
    confCtx.fillStyle = p.color;
    confCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    confCtx.restore();
    if (p.y > window.innerHeight + 40) pieces.splice(i, 1);
  }
  requestAnimationFrame(drawConfetti);
}

window.addEventListener('resize', resizeConfCanvas);
resizeConfCanvas();
drawConfetti();
setTimeout(() => spawnConfetti(90), 500);

/* ══ PARTY MODE ══ */
document.getElementById('partyBtn').addEventListener('click', () => spawnConfetti(220));
document.getElementById('fireBtn').addEventListener('click', () => spawnConfetti(160));

/* ══ CUSTOM CURSOR ══ */
const ring = document.getElementById('cursorRing');
let mouseX = -200, mouseY = -200, ringX = -200, ringY = -200;

window.addEventListener('pointermove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  ring.classList.add('visible');
});
window.addEventListener('pointerleave', () => ring.classList.remove('visible'));

document.querySelectorAll('a, button, .mem-item, .flip-badge, .j-stop, .fact-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

(function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
})();

/* ══ HERO PARALLAX ══ */
const heroParallax = document.getElementById('heroParallax');
if (heroParallax) {
  const parallaxEls = heroParallax.querySelectorAll('[data-depth]');
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    parallaxEls.forEach(el => {
      const d = parseFloat(el.dataset.depth) || 0.01;
      el.style.transform = `translate(${dx * d}px, ${dy * d}px)`;
    });
  });
}

/* ══ COUNTDOWN ══ */
const birthday = new Date('2026-06-16T00:00:00+02:00');
const cdEls = {
  days:    document.getElementById('cdDays'),
  hours:   document.getElementById('cdHours'),
  minutes: document.getElementById('cdMinutes'),
  seconds: document.getElementById('cdSeconds'),
};
const prevVals = { days: '', hours: '', minutes: '', seconds: '' };

function pad(n) { return String(n).padStart(2, '0'); }

function popEl(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function updateCountdown() {
  const dist = Math.max(0, birthday - new Date());
  const vals = {
    days:    pad(Math.floor(dist / 86400000)),
    hours:   pad(Math.floor((dist % 86400000) / 3600000)),
    minutes: pad(Math.floor((dist % 3600000)  / 60000)),
    seconds: pad(Math.floor((dist % 60000)    / 1000)),
  };
  Object.keys(vals).forEach(k => {
    if (vals[k] !== prevVals[k]) {
      cdEls[k].textContent = vals[k];
      popEl(cdEls[k]);
      prevVals[k] = vals[k];
    }
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ══ 3D TILT EFFECT ══ */
const TILT = 16;

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top)  / r.height - 0.5) * -TILT;
    const ry = ((e.clientX - r.left) / r.width  - 0.5) *  TILT;
    card.style.transition = 'transform 80ms linear';
    card.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 500ms ease';
    card.style.transform  = '';
  });
});

/* ══ JOURNEY ══ */
const jStops = document.querySelectorAll('.j-stop');
const jLoc   = document.getElementById('jLoc');
const jTxt   = document.getElementById('jTxt');

jStops.forEach(stop => {
  stop.addEventListener('click', () => {
    jStops.forEach(s => s.classList.remove('active'));
    stop.classList.add('active');
    jLoc.textContent = stop.dataset.location;
    jTxt.style.opacity = '0';
    setTimeout(() => {
      jTxt.textContent   = stop.dataset.story;
      jTxt.style.opacity = '1';
    }, 200);
    spawnConfetti(22);
  });
});

/* ══ LIGHTBOX ══ */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbClose  = document.getElementById('lbClose');

document.querySelectorAll('.mem-item').forEach(btn => {
  btn.addEventListener('click', () => {
    lbImg.src = btn.dataset.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImg.removeAttribute('src');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

/* ══ SCROLL REVEAL ══ */
const revealObs = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
