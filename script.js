/* TERANOX frontend interactions and config renderer. No framework required. */
(() => {
  const config = window.TERANOX_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // Theme and brand
  if (config.theme?.accent) document.documentElement.style.setProperty('--orange', config.theme.accent);
  if (config.theme?.background) document.documentElement.style.setProperty('--bg', config.theme.background);
  $$('.logo').forEach(logo => {
    const mark = $('.logo-icon', logo);
    if (mark && config.brand?.mark) mark.textContent = config.brand.mark;
    const textNodes = Array.from(logo.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
    if (textNodes.length) textNodes[0].textContent = ` ${config.brand?.name || 'TERANOX'}`;
    const suffix = $('span:last-child', logo);
    if (suffix && config.brand?.suffix) suffix.textContent = config.brand.suffix;
  });

  // Hero copy
  const hero = $('.hero');
  if (hero && config.hero) {
    const eyebrow = $('.eyebrow', hero); if (eyebrow) eyebrow.lastChild.textContent = ` ${config.hero.eyebrow || ''}`;
    const h1 = $('h1', hero);
    if (h1) h1.innerHTML = `${escapeHTML(config.hero.titleLine1 || 'WE BUILD')}<br><span>${escapeHTML(config.hero.titleLine2 || 'YOUR VISION.')}</span>`;
    const paragraph = $('.hero-text > p', hero); if (paragraph) paragraph.textContent = config.hero.description || '';
    const note = $('.hero-note', hero); if (note && config.hero.note) note.lastChild.textContent = ` ${config.hero.note}`;
  }

  // Services
  $$('.service-card').forEach((card, i) => {
    const item = config.services?.[i]; if (!item) return;
    const title = $('h3', card); const description = $('p', card);
    if (title) title.textContent = item.title || '';
    if (description) description.textContent = item.description || '';
  });

  // Stats: values are demo content until replaced in config.js.
  $$('.stat-item').forEach((item, i) => {
    const data = config.stats?.[i]; if (!data) return;
    const heading = $('h2', item); const label = $('p', item);
    if (heading) heading.innerHTML = `${escapeHTML(data.value)}<span>${escapeHTML(data.suffix || '')}</span>`;
    if (label) label.textContent = data.label || '';
  });

  // Project cards are populated from the same list on both pages.
  $$('.project-card[data-project-index]').forEach(card => {
    const item = config.projects?.[Number(card.dataset.projectIndex)]; if (!item) return;
    card.dataset.category = item.category || 'residential';
    const image = $('.project-image', card);
    if (image) {
      image.style.backgroundImage = item.image ? `url("${item.image}")` : 'linear-gradient(135deg, #33281f, #6a4a32)';
      const tag = $('.project-tag', image);
      if (tag) tag.textContent = `${String(Number(card.dataset.projectIndex) + 1).padStart(2, '0')} / ${(item.category || 'PROJECT').toUpperCase()}`;
    }
    const title = $('h3', card); const detail = $('.project-info p', card);
    if (title) title.textContent = item.title || 'Project title';
    if (detail) detail.textContent = item.detail || '';
  });

  // Contact links and optional phone visibility
  $$('a[href^="mailto:"]').forEach(link => {
    if (config.contact?.email) link.href = `mailto:${config.contact.email}`;
  });
  $$('[data-contact-phone]').forEach(el => {
    if (config.contact?.phone) el.textContent = config.contact.phone;
    else el.hidden = true;
  });

  // Mobile navigation
  const menuToggle = $('#menuToggle'); const navMenu = $('#navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(navMenu.classList.contains('active')));
    });
    $$('a', navMenu).forEach(link => link.addEventListener('click', () => {
      navMenu.classList.remove('active'); menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Project category filters
  $$('.project-filters').forEach(filterBar => {
    const buttons = $$('.filter-btn', filterBar);
    buttons.forEach(button => button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      buttons.forEach(btn => btn.classList.toggle('active', btn === button));
      // Filter cards in the page's project grid, not unrelated grids.
      const grid = filterBar.nextElementSibling;
      if (!grid?.classList.contains('projects-grid')) return;
      $$('.project-card', grid).forEach(card => {
        card.classList.toggle('hidden', selected !== 'all' && card.dataset.category !== selected);
      });
    }));
  });

  // Image lightbox
  const modal = $('#imageModal'); const modalImage = $('#modalImage'); const close = $('#modalClose');
  const closeModal = () => {
    if (!modal || !modalImage) return;
    modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true');
    modalImage.src = ''; document.body.style.overflow = '';
  };
  if (modal && modalImage) {
    $$('.project-image').forEach(image => image.addEventListener('click', () => {
      const background = getComputedStyle(image).backgroundImage;
      const match = background.match(/url\(["']?(.*?)["']?\)/);
      if (!match) return;
      modalImage.src = match[1];
      modalImage.alt = $('h3', image.closest('.project-card'))?.textContent || 'Project image';
      modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }));
    close?.addEventListener('click', closeModal);
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
  }

  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
})();
