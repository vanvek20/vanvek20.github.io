/**
 * VANVEK — Mobile Menu
 * Бургер → выдвижная панель + overlay
 */
(function() {
  'use strict';

  function initMobileMenu() {
    const btn     = document.querySelector('.mobile-menu-btn');
    const nav     = document.querySelector('.mobile-nav');
    if (!btn || !nav) return;

    // Создаём overlay если его нет
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-nav-overlay';
      document.body.appendChild(overlay);
    }

    // Иконки бургер/крестик
    const burgerIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    const closeIcon  = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    function open() {
      nav.classList.add('open');
      overlay.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Закрыть меню');
      btn.innerHTML = closeIcon;
      document.body.style.overflow = 'hidden';
    }

    function close() {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Открыть меню');
      btn.innerHTML = burgerIcon;
      document.body.style.overflow = '';
    }

    function toggle() {
      nav.classList.contains('open') ? close() : open();
    }

    btn.addEventListener('click', toggle);
    overlay.addEventListener('click', close);

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) close();
    });

    // Закрытие при переходе по ссылке
    nav.querySelectorAll('.mobile-nav__link').forEach(function(link) {
      link.addEventListener('click', close);
    });

    // Закрытие при ресайзе до десктопа
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024) close();
    });
  }

  // Запускаем после инициализации хедера
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    // Хедер вставляется динамически — ждём немного
    setTimeout(initMobileMenu, 50);
  }

  // Экспортируем для переиспользования
  window.initMobileMenu = initMobileMenu;
})();
