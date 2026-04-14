/**
 * Shared header + footer HTML — injected into each page
 * VANVEK brand — wave logo SVG + updated palette
 */

/* VANVEK logo — оригинальный файл логотипа */
/* mix-blend-mode: multiply убирает чёрный фон на белом хедере */
const VANVEK_WAVE_SVG = null; // не используется

function getHeaderHTML(activeLink) {
  const navItems = [
    { href: 'index.html',      label: 'Главная',        key: 'home' },
    { href: 'services.html',   label: 'Услуги',          key: 'services' },
    { href: 'prices.html',     label: 'Прайс',            key: 'prices' },
    { href: 'corporate.html',  label: 'Корпоративным',  key: 'corporate' },
    { href: 'faq.html',        label: 'FAQ',              key: 'faq' },
    { href: 'contacts.html',   label: 'Контакты',         key: 'contacts' },
  ];
  const navHTML = navItems.map(item => `
    <li><a href="${item.href}" class="site-nav__link"${item.key === activeLink ? ' aria-current="page"' : ''}>${item.label}</a></li>
  `).join('');

  return `
<header class="site-header" role="banner">
  <div class="container header-inner">

    <!-- VANVEK Logo -->
    <a href="index.html" class="logo" aria-label="VANVEK — на главную">
      <img src="vanvek-logo-tight.jpg" alt="VANVEK" class="logo__img">
    </a>

    <!-- Desktop nav -->
    <nav class="site-nav" aria-label="Основная навигация">
      <ul class="site-nav__list" role="list">${navHTML}</ul>
    </nav>

    <!-- Right: city + phone + cart -->
    <div class="header-right">

      <!-- City labels (simple toggle) -->
      <div class="city-labels" role="navigation" aria-label="Выбор города">
        <button class="city-labels__btn active" data-city-key="moscow" type="button">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Москва
        </button>
        <!-- СПб временно скрыт: раскомментировать чтобы вернуть
        <button class="city-labels__btn" data-city-key="spb" type="button">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Санкт-Петербург
        </button>
        -->
      </div>

      <!-- Phone -->
      <div class="header-phone">
        <a href="tel:88003333333" class="header-phone__number" data-city-phone-href data-city-phone>8 800 333-33-33</a>
        <span class="header-phone__label">Бесплатно</span>
        <a href="tel:88003333333" class="btn btn--call-header" data-city-phone-href aria-label="Позвонить">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" style="flex-shrink:0;min-width:16px;"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        </a>
      </div>

      <!-- Cart wrapper with mini dropdown -->
      <div class="js-cart-mini-wrapper" style="position:relative;">
        <a href="cart.html" class="cart-btn" aria-label="Заявка" data-testid="cart-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span class="cart-btn__label">Заявка</span>
          <span class="cart-btn__badge js-cart-count" data-testid="cart-count">0</span>
        </a>
        <div class="cart-mini" role="dialog" aria-label="Мини-заявка">
          <div class="cart-mini__head">Ваша заявка</div>
          <div class="cart-mini__empty js-cart-mini-empty" style="display:block;">Заявка пуста</div>
          <div class="cart-mini__items js-cart-mini-items" style="display:none;"></div>
          <div class="cart-mini__footer" style="display:none;">
            <div class="cart-mini__total">Итого: <span>0 ₽</span></div>
            <a href="cart.html" class="btn btn--accent btn--sm">Оформить</a>
          </div>
        </div>
      </div>

      <!-- Mobile menu button -->
      <button class="mobile-menu-btn" aria-label="Открыть меню" aria-expanded="false" type="button" aria-controls="mobile-nav">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>

<!-- Mobile nav drawer -->
<nav class="mobile-nav" id="mobile-nav" aria-label="Мобильное меню" role="dialog">

  <!-- Навигация -->
  ${navItems.map(i => `<a href="${i.href}" class="mobile-nav__link">${i.label}</a>`).join('')}

  <!-- Телефон -->
  <div class="mobile-nav__phones">
    <div class="mobile-nav__phone-label">Телефон (бесплатно)</div>
    <a href="tel:88003333333" class="mobile-nav__phone-number" data-city-phone-href data-city-phone>8 800 333-33-33</a>
  </div>

  <!-- Город -->
  <div class="mobile-nav__city">
    <div class="mobile-nav__city-title">Ваш город</div>
    <div class="mobile-nav__city-btns">
      <button class="btn btn--outline btn--sm" onclick="window.AppStore&&window.AppStore.setCity('moscow')">Москва</button>
      <!-- СПб временно скрыт
      <button class="btn btn--outline btn--sm" onclick="window.AppStore&&window.AppStore.setCity('spb')">Санкт-Петербург</button>
      -->
    </div>
  </div>

  <!-- CTA -->
  <div class="mobile-nav__cta">
    <a href="services.html" class="btn btn--accent btn--lg" style="justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
      Выбрать услуги
    </a>
  </div>

</nav>`;
}

function getFooterHTML() {
  return `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brand__logo">
          <img src="vanvek-logo-tight.jpg" alt="VANVEK" class="footer-brand__img">
        </div>
        <p class="footer-brand__desc">Профессиональная установка сантехники в Москве. Фиксированные цены без скрытых доплат. Гарантия на все работы.</p>
      </div>
      <div>
        <div class="footer-col__title">Сантехника</div>
        <ul class="footer-col__list">
          <li><a href="category.html?cat=toilets">Унитазы, биде, писсуары</a></li>
          <li><a href="category.html?cat=installations">Инсталляции</a></li>
          <li><a href="category.html?cat=sinks">Раковины и столешницы</a></li>
          <li><a href="category.html?cat=bathtubs">Ванны и комплектующие</a></li>
          <li><a href="category.html?cat=showers">Душевые кабины</a></li>
          <li><a href="category.html?cat=faucets">Смесители и душ</a></li>
          <li><a href="category.html?cat=towel-rails">Полотенцесушители</a></li>
          <li><a href="category.html?cat=water-heaters">Водонагреватели</a></li>
          <li><a href="category.html?cat=accessories">Аксессуары</a></li>
          <li><a href="category.html?cat=furniture">Мебель для ванной</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col__title">Дополнительно</div>
        <ul class="footer-col__list">
          <li><a href="category.html?cat=kitchen">Кухонные мойки</a></li>
          <li><a href="category.html?cat=water-supply">Водоснабжение (инженерка)</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col__title">Компания</div>
        <ul class="footer-col__list">
          <li><a href="prices.html">Прайс-лист</a></li>
          <li><a href="corporate.html">Корпоративным</a></li>
          <li><a href="about.html">О нас</a></li>
          <li><a href="works.html">Наши работы</a></li>
          <li><a href="reviews.html">Отзывы</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contacts.html">Контакты</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col__title">Контакты</div>
        <div style="margin-bottom:var(--space-4);">
          <a href="tel:88003333333" data-city-phone-href data-city-phone style="font-size:var(--text-base);font-weight:700;color:#fff;display:block;margin-bottom:4px;">8 800 333-33-33</a>
          <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.45);" data-city-name>Москва</div>
        </div>
        <ul class="footer-col__list">
          <li><a href="mailto:info@vanvek.ru">info@vanvek.ru</a></li>
          <li style="color:rgba(255,255,255,0.5);font-size:var(--text-xs);">Ежедневно 9:00–20:00</li>
        </ul>
      </div>
    </div>
    <!-- Отзывы — компактный блок -->
    <div style="text-align:center;padding:var(--space-6) 0;border-top:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:var(--text-sm);color:rgba(255,255,255,0.5);margin-bottom:var(--space-3);">Оставьте отзыв о нашей работе</div>
      <div style="display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap;">
        <a href="https://yandex.ru/maps" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:var(--radius-full);font-size:var(--text-xs);color:rgba(255,255,255,0.7);text-decoration:none;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Яндекс.Карты
        </a>
        <a href="https://2gis.ru" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:var(--radius-full);font-size:var(--text-xs);color:rgba(255,255,255,0.7);text-decoration:none;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          2GIS
        </a>
        <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:var(--radius-full);font-size:var(--text-xs);color:rgba(255,255,255,0.7);text-decoration:none;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Google
        </a>
      </div>
    </div>
    <!-- CTA-строка перед копирайтом -->
    <div style="text-align:center;padding:var(--space-8) 0 var(--space-6);border-top:1px solid rgba(255,255,255,0.12);">
      <div style="font-size:var(--text-sm);color:rgba(255,255,255,0.55);margin-bottom:var(--space-3);">Готовы заказать? Звоните — ответим сразу</div>
      <a href="tel:88003333333" data-city-phone-href data-city-phone style="font-size:1.5rem;font-weight:800;color:#fff;letter-spacing:0.01em;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='#E8450A'" onmouseout="this.style.color='#fff'">8 800 333-33-33</a>
      <div style="margin-top:var(--space-4);display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap;">
        <a href="services.html" style="padding:10px 24px;background:var(--color-accent);border-radius:8px;font-size:var(--text-sm);font-weight:700;color:#fff;text-decoration:none;transition:opacity .2s;" onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">Выбрать услуги</a>
        <a href="contacts.html" style="padding:10px 24px;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.25);border-radius:8px;font-size:var(--text-sm);font-weight:700;color:#fff;text-decoration:none;transition:background .2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">Контакты</a>
      </div>
    </div>
    <!-- Реквизиты компании -->
    <div style="padding:var(--space-6) 0;border-top:1px solid rgba(255,255,255,0.08);margin-top:var(--space-4);">
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-6) var(--space-10);font-size:var(--text-xs);color:rgba(255,255,255,0.45);line-height:1.6;">
        <div>
          <div style="color:rgba(255,255,255,0.6);font-weight:600;margin-bottom:2px;">Юридическая информация</div>
          ИП Белов Евгений Александрович · ИНН 235201128237<br>
          Юр. адрес: 117624, г. Москва, ул. Старокрымская, д. 17
        </div>
        <div>
          <div style="color:rgba(255,255,255,0.6);font-weight:600;margin-bottom:2px;">Банковские реквизиты</div>
          ПАО Сбербанк · р/с 40802810438000247921<br>
          к/с 30101810400000000225 · БИК 044525225
        </div>
        <div>
          <div style="color:rgba(255,255,255,0.6);font-weight:600;margin-bottom:2px;">Почтовый адрес</div>
          117624, г. Москва, ул. Скобелевская, д. 23, А/Я 25
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© 2026 VANVEK. Все права защищены.</div>
      <div style="display:flex;gap:var(--space-4);flex-wrap:wrap;">
<!-- Пока нет документов:
        <a href="#">Политика конфиденциальности</a>
        <a href="#">Договор оферты</a>
        -->
      </div>
    </div>
  </div>
</footer>`;
}

/* ── Плавающие кнопки мессенджеров (FAB) ── */
function getMessengerFAB() {
  return `
<div class="messenger-float" id="js-messenger-float">
  <a href="https://max.ru/u/vanvek" target="_blank" rel="noopener noreferrer" class="messenger-float__btn messenger-float__btn--max" aria-label="Написать в Max" title="Max">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="mg-fab" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#00C8FF"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#mg-fab)"/><path d="M12 5.5C8.13 5.5 5 8.13 5 11.5c0 1.68.78 3.18 2 4.22V18.5l2.5-1.4c.77.22 1.6.34 2.5.34 3.87 0 7-2.63 7-5.94S15.87 5.5 12 5.5z" fill="#fff"/></svg>
  </a>
  <a href="https://t.me/vanvek" target="_blank" rel="noopener noreferrer" class="messenger-float__btn messenger-float__btn--tg" aria-label="Написать в Telegram" title="Telegram">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
  </a>
  <a href="https://vk.me/vanvek" target="_blank" rel="noopener noreferrer" class="messenger-float__btn messenger-float__btn--vk" aria-label="Написать в VK" title="VK">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.524-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.674 2.862 4.674.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.608 2.18-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.72-.576.72z"/></svg>
  </a>
</div>`;
}
