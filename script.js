const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

// Keep the HTYLLM2 project focused on work and methods rather than result metrics
// that are not part of the current public CV story.
document.querySelectorAll('.project-results').forEach((results) => results.remove());

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = [...document.querySelectorAll('.reveal')];

if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 40}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] });

  navTargets.forEach((section) => navObserver.observe(section));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
