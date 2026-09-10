// =========================================================
// Nav indicator: pílula que desliza até o link ativo
// =========================================================
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const indicator = document.querySelector('.nav-indicator');
const navLinksWrap = document.querySelector('.nav-links');

function moveIndicatorTo(link) {
  if (!link || !indicator || !navLinksWrap) return;
  const wrapRect = navLinksWrap.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const offsetLeft = linkRect.left - wrapRect.left;
  indicator.style.width = `${linkRect.width}px`;
  indicator.style.transform = `translateX(${offsetLeft - 6}px)`;
}

function setActiveLink(link) {
  navLinks.forEach((l) => l.classList.remove('is-active'));
  if (link) {
    link.classList.add('is-active');
    moveIndicatorTo(link);
  }
}

// posição inicial da pílula no primeiro link
window.addEventListener('load', () => setActiveLink(navLinks[0]));
window.addEventListener('resize', () => {
  const current = document.querySelector('.nav-link.is-active');
  if (current) moveIndicatorTo(current);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setActiveLink(link));
});

// =========================================================
// Scrollspy: ativa o link da seção visível na tela
// =========================================================
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        const matchingLink = navLinks.find((l) => l.getAttribute('href') === id);
        if (matchingLink) setActiveLink(matchingLink);
      }
    });
  },
  { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
);

sections.forEach((section) => spyObserver.observe(section));

// =========================================================
// Ano automático (se algum dia adicionar no footer)
// =========================================================
const footer = document.querySelector('.footer p');
if (footer) {
  const year = new Date().getFullYear();
  footer.textContent = footer.textContent.replace(/\.$/, ` · ${year}.`);
}