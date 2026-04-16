/**
 * Shared header + footer HTML — injected into each page
 * VanVek brand — wave logo SVG + updated palette
 */

/* VanVek logo — оригинальный файл логотипа */
/* mix-blend-mode: multiply убирает чёрный фон на белом хедере */
const VANVEK_WAVE_SVG = null; // не используется

function getHeaderHTML(activeLink) {
  const navItems = [
    { href: 'index.html',      label: 'Главная',        key: 'home' },
    { href: 'services.html',   label: 'Услуги',          key: 'services' },
    { href: 'prices.html',     label: 'Прайс',            key: 'prices' },
    { href: 'corporate.html',  label: 'Бизнесу',        key: 'corporate' },
    { href: 'faq.html',        label: 'Вопросы',          key: 'faq' },
    { href: 'contacts.html',   label: 'Контакты',         key: 'contacts' },
  ];
  const navHTML = navItems.map(item => `
    <li><a href="${item.href}" class="site-nav__link"${item.key === activeLink ? ' aria-current="page"' : ''}>${item.label}</a></li>
  `).join('');

  return `
<header class="site-header" role="banner">
  <div class="container header-inner">

    <!-- VanVek Logo -->
    <a href="index.html" class="logo" aria-label="VanVek — на главную">
      <img src="vanvek-logo-tight.jpg" alt="VanVek" class="logo__img">
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
        <button class="city-labels__btn" data-city-key="spb" type="button">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Санкт-Петербург
        </button>
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
        <a href="cart.html" class="cart-btn" aria-label="Корзина" data-testid="cart-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span class="cart-btn__label">Корзина</span>
          <span class="cart-btn__badge js-cart-count" data-testid="cart-count">0</span>
        </a>
        <div class="cart-mini" role="dialog" aria-label="Мини-корзина">
          <div class="cart-mini__head">Ваша корзина</div>
          <div class="cart-mini__empty js-cart-mini-empty" style="display:block;">Корзина пуста</div>
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
      <button class="btn btn--outline btn--sm" onclick="window.AppStore&&window.AppStore.setCity('spb')">Санкт-Петербург</button>
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
          <img src="vanvek-logo-tight.jpg" alt="VanVek" class="footer-brand__img">
        </div>
        <p class="footer-brand__desc">Профессиональная установка сантехники в Москве. Фиксированные цены без скрытых доплат. Гарантия на все работы.</p>
      </div>
      <div>
        <div class="footer-col__title">Сантехника</div>
        <ul class="footer-col__list">
          <li><a href="category-toilets.html">Унитазы, биде, писсуары</a></li>
          <li><a href="category-installations.html">Инсталляции</a></li>
          <li><a href="category-sinks.html">Раковины и столешницы</a></li>
          <li><a href="category-bathtubs.html">Ванны и комплектующие</a></li>
          <li><a href="category-showers.html">Душевые кабины</a></li>
          <li><a href="category-faucets.html">Смесители и душ</a></li>
          <li><a href="category-towel-rails.html">Полотенцесушители</a></li>
          <li><a href="category-water-heaters.html">Водонагреватели</a></li>
          <li><a href="category-accessories.html">Аксессуары</a></li>
          <li><a href="category-furniture.html">Мебель для ванной</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col__title">Дополнительно</div>
        <ul class="footer-col__list">
          <li><a href="category-kitchen.html">Кухонные мойки</a></li>
          <li><a href="category-water-supply.html">Водоснабжение (инженерка)</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col__title">Компания</div>
        <ul class="footer-col__list">
          <li><a href="prices.html">Прайс-лист</a></li>
          <li><a href="corporate.html">Бизнесу</a></li>
          <li><a href="about.html">О нас</a></li>
          <li><a href="faq.html">Вопросы</a></li>
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
    <div style="padding:var(--space-4) 0;border-top:1px solid rgba(255,255,255,0.08);margin-top:var(--space-4);">
      <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.35);line-height:1.6;text-align:center;">
        VanVek — сервис по установке сантехники. Москва и Санкт-Петербург.<br>
        <a onclick="document.getElementById('requisites-modal').style.display='flex'" style="cursor:pointer;color:rgba(255,255,255,0.5);text-decoration:underline;">Реквизиты для юридических лиц</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© 2026 VanVek. Все права защищены.</div>
      <div style="display:flex;gap:var(--space-4);flex-wrap:wrap;">
        <a onclick="document.getElementById('privacy-modal').style.display='flex'" style="cursor:pointer;">Политика конфиденциальности</a>
        <a onclick="document.getElementById('oferta-modal').style.display='flex'" style="cursor:pointer;">Договор оферты</a>
      </div>
    </div>
  </div>
</footer>

<!-- Modal: Реквизиты -->
<div id="requisites-modal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:#fff;border-radius:16px;padding:32px;max-width:480px;width:90%;margin:auto;position:relative;max-height:90vh;overflow-y:auto;">
    <button onclick="this.parentElement.parentElement.style.display='none'" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;line-height:1;">×</button>
    <h3 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#0d1a2e;">Реквизиты для юридических лиц</h3>
    <div style="font-size:14px;line-height:1.8;color:#333;">
      <div style="font-weight:600;margin-bottom:8px;">ИП Белов Евгений Александрович</div>
      <div>ИНН: 235201128237</div>
      <div>ОГРНИП: 322237500224621</div>
      <div>Р/с: 40802.810.4.38000247921</div>
      <div>Банк: ПАО СБЕРБАНК Г. МОСКВА</div>
      <div>БИК: 044525225</div>
      <div>К/с: 30101.810.4.00000000225</div>
      <div>ОКПО: 2016210184</div>
      <div style="margin-top:8px;">Адрес: г. Москва</div>
    </div>
    <p style="margin-top:16px;font-size:13px;color:#666;">По вопросам сотрудничества: <a href="mailto:info@vanvek.ru" style="color:#F5821F;">info@vanvek.ru</a></p>
  </div>
</div>

<!-- Modal: Политика конфиденциальности -->
<div id="privacy-modal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:#fff;border-radius:16px;padding:32px;max-width:540px;width:90%;margin:auto;position:relative;max-height:90vh;overflow-y:auto;">
    <button onclick="this.parentElement.parentElement.style.display='none'" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;line-height:1;">×</button>
    <h3 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#0d1a2e;">Политика конфиденциальности</h3>
    <div style="font-size:14px;line-height:1.7;color:#333;">
      <p>ИП Белов Евгений Александрович (далее — Оператор) обрабатывает персональные данные в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».</p>
      <p style="margin-top:10px;"><strong>Какие данные собираем:</strong> имя, номер телефона, адрес электронной почты — при оформлении заказа через корзину сайта.</p>
      <p style="margin-top:10px;"><strong>Цель обработки:</strong> выполнение заказа, связь с клиентом, информирование о статусе работ.</p>
      <p style="margin-top:10px;"><strong>Хранение:</strong> данные хранятся до момента выполнения заказа и в течение 1 года после для гарантийных обращений.</p>
      <p style="margin-top:10px;"><strong>Передача третьим лицам:</strong> данные не передаются третьим лицам, кроме случаев, предусмотренных законодательством РФ.</p>
      <p style="margin-top:10px;"><strong>Удаление:</strong> вы можете запросить удаление персональных данных, написав на info@vanvek.ru.</p>
      <p style="margin-top:10px;">Оставляя данные на сайте, вы соглашаетесь с настоящей политикой.</p>
    </div>
  </div>
</div>

<!-- Modal: Договор-оферта -->
<div id="oferta-modal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:#fff;border-radius:16px;padding:32px;max-width:540px;width:90%;margin:auto;position:relative;max-height:90vh;overflow-y:auto;">
    <button onclick="this.parentElement.parentElement.style.display='none'" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;line-height:1;">×</button>
    <h3 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#0d1a2e;">Договор-оферта</h3>
    <div style="font-size:14px;line-height:1.7;color:#333;">
      <p>ИП Белов Евгений Александрович предлагает услуги по установке сантехнического оборудования на условиях настоящей оферты.</p>
      <p style="margin-top:10px;"><strong>Заказ:</strong> оформляется через корзину на сайте vanvek.ru. Подтверждение заказа является акцептом оферты.</p>
      <p style="margin-top:10px;"><strong>Цены:</strong> фиксируются на момент оформления заказа. Окончательная стоимость не меняется после приезда мастера.</p>
      <p style="margin-top:10px;"><strong>Оплата:</strong> производится после выполнения работ и подписания акта выполненных работ.</p>
      <p style="margin-top:10px;"><strong>Гарантия:</strong> 1 год на все выполненные работы с момента подписания акта.</p>
      <p style="margin-top:10px;"><strong>Отмена:</strong> заказ можно отменить бесплатно до выезда мастера.</p>
      <p style="margin-top:10px;">Полные условия уточняются при оформлении договора на месте.</p>
    </div>
  </div>
</div>`;
}

/* ── Плавающие кнопки мессенджеров (FAB) ── */
function getMessengerFAB() {
  return `
<div class="messenger-float" id="js-messenger-float">
  <div class="messenger-float__items">
    <a href="https://max.ru/u/vanvek" target="_blank" rel="noopener noreferrer" class="messenger-float__btn messenger-float__btn--max" aria-label="Написать в Max" title="Max">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="mg-fab" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#00C8FF"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#mg-fab)"/><path d="M12 5.5C8.13 5.5 5 8.13 5 11.5c0 1.68.78 3.18 2 4.22V18.5l2.5-1.4c.77.22 1.6.34 2.5.34 3.87 0 7-2.63 7-5.94S15.87 5.5 12 5.5z" fill="#fff"/></svg>
    </a>
    <a href="https://t.me/vanvek" target="_blank" rel="noopener noreferrer" class="messenger-float__btn messenger-float__btn--tg" aria-label="Написать в Telegram" title="Telegram">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    </a>
    <a href="https://vk.me/vanvek" target="_blank" rel="noopener noreferrer" class="messenger-float__btn messenger-float__btn--vk" aria-label="Написать в VK" title="VK">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.524-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.674 2.862 4.674.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.608 2.18-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.72-.576.72z"/></svg>
    </a>
  </div>
  <button class="messenger-float__toggle" id="js-messenger-toggle" aria-label="Мессенджеры" title="Написать нам">
    <svg class="messenger-float__icon-chat" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <svg class="messenger-float__icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
</div>`;
}

/* Инициализация FAB мессенджеров — вызывать после innerHTML */
function initMessengerFAB() {
  var toggle = document.getElementById('js-messenger-toggle');
  var wrap = document.getElementById('js-messenger-float');
  if(!toggle || !wrap) return;
  toggle.addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    wrap.classList.toggle('open');
  });
  document.addEventListener('click', function(e){
    if(!wrap.contains(e.target)) wrap.classList.remove('open');
  });
}
