'use strict';

// === THEME TOGGLE ===
const themeBtn = document.getElementById('themeToggle');
const themeIcon = themeBtn ? themeBtn.querySelector('.theme-icon') : null;

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
