'use strict';

// Reset theme on major site version bump — ensures light is default after redesign
const SITE_VERSION = '2';
if (localStorage.getItem('tc-site-version') !== SITE_VERSION) {
  localStorage.removeItem('tc-theme');
  localStorage.removeItem('theme');
  localStorage.setItem('tc-site-version', SITE_VERSION);
}

// === THEME TOGGLE ===
const themeBtn = document.getElementById('themeToggle');
const themeIcon = themeBtn ? themeBtn.querySelector('.theme-icon') : null;

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
}

// Use a new key 'tc-theme' to avoid inheriting old site's saved dark preference
const savedTheme = localStorage.getItem('tc-theme');
applyTheme(savedTheme === 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('tc-theme', isDark ? 'dark' : 'light');
  });
}

// === MOBILE MENU ===
const mobileMenuBtn = document.getElementById('mobileMenu');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

// === ROLLING TITLE ===
const rollingTitles = [
  'Postdoctoral Researcher',
  'MR Scientist',
  'Medical Imaging Engineer',
  'AI Scientist',
];
const rollingEl = document.getElementById('rollingTitle');
if (rollingEl) {
  let idx = 0;
  setInterval(() => {
    rollingEl.classList.add('fade-out');
    setTimeout(() => {
      idx = (idx + 1) % rollingTitles.length;
      rollingEl.textContent = rollingTitles[idx];
      rollingEl.classList.remove('fade-out');
      rollingEl.classList.add('fade-in');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        rollingEl.classList.remove('fade-in');
      }));
    }, 350);
  }, 2800);
}

// === SCROLL SPY: update active nav link as sections scroll into view ===
const sections = document.querySelectorAll('.content-section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

if (sections.length && navLinks.length) {
  const scrollSpy = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -40% 0px' }
  );

  sections.forEach(s => scrollSpy.observe(s));
}

// === SCROLL REVEAL: fade in elements as they enter viewport ===
const reveals = document.querySelectorAll('.reveal');

if (reveals.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  reveals.forEach(el => revealObserver.observe(el));
}
