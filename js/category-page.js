// category-page.js — shared category page logic (Sprint 6D)
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('header-mount').innerHTML = getHeaderHTML('services');
  // Хедер вставлен — инициализируем переключатель города
  if (window.AppStore && window.AppStore.initCityDropdown) window.AppStore.initCityDropdown();
  if (window.AppStore && window.AppStore.initThemeToggle) window.AppStore.initThemeToggle();
  if (window.AppStore && window.AppStore.updateCartUI) window.AppStore.updateCartUI();
  document.getElementById('footer-mount').innerHTML = getFooterHTML();
  // Inject messenger FAB
  var fabRoot = document.getElementById('messenger-fab-root');
  if (fabRoot && typeof getMessengerFAB === 'function') { fabRoot.innerHTML = getMessengerFAB(); initMessengerFAB(); }

  // Get category: prefer window.__INITIAL_CAT (set by static category pages) over URL param
  const params = new URLSearchParams(location.search);
  const slug = (window.__INITIAL_CAT) || params.get('cat') || 'sinks';
  const data = window.SERVICES_DATA[slug];
  const catMeta = window.CATEGORIES.find(c => c.slug === slug);

  if (!data || !catMeta) {
    document.getElementById('cat-title').textContent = 'Категория не найдена';
    return;
  }

  // Update page meta (elements may not exist on static category pages)
  var elPageTitle = document.getElementById('page-title');
  var elPageDesc = document.getElementById('page-desc');
  if (elPageTitle) elPageTitle.textContent = `${data.categoryName} — VanVek`;
  if (elPageDesc) elPageDesc.content = `Установка ${data.categoryName.toLowerCase()} в Москве по фиксированной цене.`;
  document.getElementById('cat-breadcrumb').textContent = data.categoryName;
  document.getElementById('cat-title').textContent = data.categoryName + ' в ' + window.AppStore.getCity().name.replace('Санкт-Петербург', 'Санкт-Петербурге').replace('Москва', 'Москве');
  const svcCount = data.services ? data.services.length : 0;
  document.getElementById('cat-subtitle').textContent = svcCount > 0 ? `${svcCount} услуг • фиксированные цены` : 'Фиксированные цены, гарантия 1 год';

  // Track city changes to update heading
  // Listen for city changes
  const observer = new MutationObserver(() => {
    const cityName = window.AppStore.getCity().name;
    const cityPrep = cityName === 'Москва' ? 'Москве' : 'Санкт-Петербурге';
    document.getElementById('cat-title').textContent = data.categoryName + ' в ' + cityPrep;
  });
  setTimeout(() => document.querySelectorAll('[data-city-in-title]').forEach(el => observer.observe(el, {childList: true})), 100);

  // Render services
  renderServices(data.services, slug);

  // Render related categories (exclude current)
  const relatedGrid = document.getElementById('related-cats');
  const related = window.CATEGORIES.filter(c => c.slug !== slug).slice(0, 4);
  relatedGrid.innerHTML = related.map(cat => `
    <div role="listitem">
      <a href="category-${cat.slug}.html" class="category-card" aria-label="${window.AppStore.escHtml(cat.name)}">
        <div class="category-card__illus" aria-hidden="true">${cat.icon}</div>
        <div class="category-card__body">
          <span class="category-card__name">${window.AppStore.escHtml(cat.name)}</span>
          <span class="category-card__arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
      </a>
    </div>
  `).join('');
});

// Sprint 3: filled SVG icons for each category
const CATEGORY_ICONS = {
  furniture: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="14" width="30" height="18" rx="2" fill="#1a2535"/><rect x="9" y="32" width="3" height="5" rx="1" fill="#0d1a2e"/><rect x="28" y="32" width="3" height="5" rx="1" fill="#0d1a2e"/><rect x="8" y="17" width="11" height="12" rx="1" fill="#fff" opacity="0.25"/><rect x="21" y="17" width="11" height="12" rx="1" fill="#fff" opacity="0.25"/><rect x="13" y="22" width="3" height="2" rx="1" fill="#fff" opacity="0.7"/><rect x="25" y="22" width="3" height="2" rx="1" fill="#fff" opacity="0.7"/><rect x="4" y="11" width="32" height="4" rx="2" fill="#0d1a2e"/></svg>',
  showers: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="8" width="3" height="26" rx="1.5" fill="#1a2535"/><rect x="30" y="8" width="3" height="26" rx="1.5" fill="#1a2535"/><rect x="7" y="32" width="26" height="4" rx="2" fill="#0d1a2e"/><circle cx="28" cy="10" r="4" fill="#0d1a2e"/><line x1="22" y1="16" x2="21" y2="22" stroke="#E8450A" stroke-width="2" stroke-linecap="round"/><line x1="25" y1="17" x2="24" y2="24" stroke="#E8450A" stroke-width="2" stroke-linecap="round"/><line x1="19" y1="15" x2="18" y2="20" stroke="#E8450A" stroke-width="2" stroke-linecap="round"/></svg>',
  toilets: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="11" y="5" width="18" height="11" rx="3" fill="#1a2535"/><circle cx="20" cy="10.5" r="2.5" fill="#fff" opacity="0.5"/><rect x="15" y="15" width="10" height="3" rx="1" fill="#0d1a2e"/><path d="M9 18 Q9 32 20 32 Q31 32 31 18 Z" fill="#1a2535"/><rect x="8" y="17" width="24" height="3" rx="1.5" fill="#0d1a2e"/></svg>',
  sinks: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="32" height="5" rx="2" fill="#0d1a2e"/><path d="M10 15 Q10 28 20 28 Q30 28 30 15 Z" fill="#1a2535"/><circle cx="20" cy="24" r="2" fill="#0d1a2e"/><rect x="18" y="6" width="4" height="6" rx="2" fill="#1a2535"/><rect x="13" y="8" width="6" height="2" rx="1" fill="#0d1a2e"/><rect x="21" y="8" width="6" height="2" rx="1" fill="#0d1a2e"/></svg>',
  bathtubs: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="16" width="32" height="3" rx="1.5" fill="#0d1a2e"/><path d="M5 19 Q5 32 20 32 Q35 32 35 19 Z" fill="#1a2535"/><rect x="9" y="32" width="3" height="5" rx="1.5" fill="#0d1a2e"/><rect x="28" y="32" width="3" height="5" rx="1.5" fill="#0d1a2e"/></svg>',
  faucets: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="6" width="8" height="16" rx="4" fill="#1a2535"/><rect x="13" y="9" width="14" height="4" rx="2" fill="#0d1a2e"/><rect x="20" y="20" width="3" height="8" rx="1.5" fill="#0d1a2e"/><rect x="18" y="27" width="7" height="3" rx="1.5" fill="#0d1a2e"/><ellipse cx="22" cy="33" rx="1.2" ry="1.8" fill="#1a2535" opacity="0.7"/></svg>',
  installations: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="4" width="6" height="32" rx="2" fill="#1a2535"/><rect x="26" y="4" width="6" height="32" rx="2" fill="#1a2535"/><rect x="8" y="4" width="24" height="5" rx="2" fill="#1a2535"/><rect x="8" y="31" width="24" height="5" rx="2" fill="#1a2535"/><rect x="8" y="17" width="24" height="4" rx="2" fill="#0d1a2e"/><rect x="14" y="20" width="12" height="7" rx="2" fill="#0d1a2e"/></svg>',
  'towel-rails': '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="5" width="4" height="32" rx="2" fill="#1a2535"/><rect x="27" y="5" width="4" height="32" rx="2" fill="#1a2535"/><rect x="9" y="9" width="22" height="3.5" rx="1.75" fill="#0d1a2e"/><rect x="9" y="16" width="22" height="3.5" rx="1.75" fill="#0d1a2e"/><rect x="9" y="23" width="22" height="3.5" rx="1.75" fill="#0d1a2e"/><rect x="9" y="30" width="22" height="3.5" rx="1.75" fill="#0d1a2e"/></svg>',
  'water-heaters': '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="8" width="20" height="24" rx="10" fill="#1a2535"/><circle cx="26" cy="13" r="3.5" fill="#0d1a2e"/><rect x="15" y="3" width="3" height="7" rx="1.5" fill="#0d1a2e"/><rect x="22" y="3" width="3" height="7" rx="1.5" fill="#0d1a2e"/><rect x="18.5" y="32" width="3" height="6" rx="1.5" fill="#0d1a2e"/></svg>',
  'kitchen-sinks': '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="9" width="34" height="4" rx="2" fill="#0d1a2e"/><rect x="4" y="13" width="32" height="18" rx="2" fill="#1a2535"/><rect x="6" y="15" width="13" height="14" rx="1.5" fill="#fff" opacity="0.2"/><rect x="21" y="15" width="13" height="14" rx="1.5" fill="#fff" opacity="0.2"/><rect x="18.5" y="6" width="3" height="9" rx="1.5" fill="#0d1a2e"/></svg>',
  accessories: '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="16" width="28" height="4" rx="2" fill="#1a2535"/><rect x="6" y="12" width="6" height="12" rx="3" fill="#0d1a2e"/><rect x="28" y="12" width="6" height="12" rx="3" fill="#0d1a2e"/><path d="M17 10 Q17 6 20 6 Q23 6 23 10" stroke="#0d1a2e" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="17" cy="10" r="1.5" fill="#0d1a2e"/><circle cx="23" cy="10" r="1.5" fill="#0d1a2e"/></svg>',
  'water-supply': '<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17" y="4" width="6" height="32" rx="3" fill="#1a2535"/><rect x="4" y="17" width="32" height="6" rx="3" fill="#1a2535"/><circle cx="20" cy="20" r="6" fill="#0d1a2e"/><circle cx="20" cy="20" r="3.5" fill="#1a2535"/><rect x="14" y="18.5" width="12" height="3" rx="1.5" fill="#0d1a2e"/></svg>'
};

function renderServices(services, categorySlug) {
  const list = document.getElementById('services-list');
  if (!list || !services) return;
  const catIcon = ''; // icons removed from service list (Sprint 3.5)

  list.innerHTML = services.map(svc => {
    const addonsHTML = svc.addons.map(addon => {
      const isPct = !!addon.pct;
      const origPriceTag = (!isPct && addon.originalPrice) ? `<span class="addon-item__old-price">${window.AppStore.formatPrice(addon.originalPrice)}</span> ` : '';
      const priceLabel = isPct
        ? `+${window.AppStore.formatPrice(Math.round(svc.price * addon.pct / 100))}`
        : `${origPriceTag}+ ${window.AppStore.formatPrice(addon.price)}${addon.hasQty ? ' за отверстие' : ''}`;
      return `
      <div class="addon-item" data-addon-id="${addon.id}" data-addon-price="${addon.price}" data-addon-pct="${addon.pct||0}">
        <input type="checkbox"
          class="addon-item__check"
          id="addon-${svc.id}-${addon.id}"
          data-service-id="${svc.id}"
          aria-label="${window.AppStore?.escHtml ? window.AppStore.escHtml(addon.name) : addon.name}"
          data-testid="addon-check-${addon.id}">
        <div class="addon-item__body">
          <label class="addon-item__name" for="addon-${svc.id}-${addon.id}">${window.AppStore?.escHtml ? window.AppStore.escHtml(addon.name) : addon.name}</label>
          <div class="addon-item__price">${priceLabel}</div>
          ${addon.hasQty ? `
            <div class="addon-item__qty" id="qty-row-${svc.id}-${addon.id}" style="display:none;">
              <button class="addon-qty-btn" data-action="minus" data-service="${svc.id}" data-addon="${addon.id}" type="button" aria-label="Уменьшить количество">−</button>
              <span class="addon-qty-val" id="qty-val-${svc.id}-${addon.id}">1</span>
              <button class="addon-qty-btn" data-action="plus" data-service="${svc.id}" data-addon="${addon.id}" type="button" aria-label="Увеличить количество">+</button>
              <span style="font-size:var(--text-xs);color:var(--color-text-muted);margin-left:var(--space-1);">${addon.qtyLabel || 'шт.'}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `}).join('');

    const popularBadge = '';

    const iconHTML = '';
    const hasIconClass = '';
    return `
      <article class="service-card service-card--main${hasIconClass}" data-service-id="${svc.id}" data-testid="service-card-${svc.id}">
        <div class="service-card__main">
          ${iconHTML}
          <div class="service-card__info">
            <h3 class="service-card__name">${window.AppStore.escHtml(svc.name)}${popularBadge}</h3>
            <p class="service-card__desc">${window.AppStore.escHtml(svc.desc)}</p>
          </div>
          <div class="service-card__right">
            <div class="service-price" aria-live="polite" aria-label="Итоговая стоимость">
              <div class="service-price__amount" id="price-display-${svc.id}">${window.AppStore.formatPrice(svc.price)}</div>
              <div class="service-price__label" id="price-label-${svc.id}">фиксированная цена</div>
            </div>
            <div class="service-card__actions">
              <button class="btn btn--accent js-add-to-cart"
                data-service-id="${svc.id}"
                data-testid="add-to-cart-${svc.id}"
                type="button"
                aria-label="Добавить ${window.AppStore.escHtml(svc.name)} в заявку">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                Добавить в заявку
              </button>
            </div>
          </div>
        </div>

        <!-- Addons — collapsed by default, expand on click -->
        <div class="service-addons" data-addons-for="${svc.id}">
          <button class="service-addons__toggle" type="button" aria-expanded="false" aria-controls="addons-panel-${svc.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span>Допуслуги + скидки</span>
            <svg class="service-addons__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <div class="service-addons__panel" id="addons-panel-${svc.id}" role="group" aria-label="Дополнительные услуги для ${window.AppStore.escHtml(svc.name)}">
            ${addonsHTML}

            <!-- Subtotal -->
            <div class="addons-subtotal" id="subtotal-${svc.id}" aria-live="polite">
              <span class="addons-subtotal__label">Итого с допами:</span>
              <span class="addons-subtotal__total" id="subtotal-val-${svc.id}"><em>${window.AppStore.formatPrice(svc.price)}</em></span>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // ===== INTERACTIVITY =====

  // Addons toggle (collapsed by default)
  list.querySelectorAll('.service-addons__toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const wrapper = this.closest('.service-addons');
      const panel = wrapper.querySelector('.service-addons__panel');
      const isOpen = wrapper.classList.contains('service-addons--open');
      wrapper.classList.toggle('service-addons--open');
      this.setAttribute('aria-expanded', !isOpen);
      // Auto-scroll to show addons panel when opening
      if (!isOpen && panel) {
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150); // small delay for CSS transition to start
      }
    });
  });

  // Addon checkbox + qty logic
  list.querySelectorAll('.addon-item__check').forEach(chk => {
    chk.addEventListener('change', function() {
      const svcId = this.dataset.serviceId;
      const addonId = this.closest('.addon-item').dataset.addonId;
      const qtyRow = document.getElementById(`qty-row-${svcId}-${addonId}`);
      if (qtyRow) qtyRow.style.display = this.checked ? 'flex' : 'none';
      recalcService(svcId);
    });
  });

  // Qty buttons
  list.querySelectorAll('.addon-qty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const svcId = this.dataset.service;
      const addonId = this.dataset.addon;
      const valEl = document.getElementById(`qty-val-${svcId}-${addonId}`);
      let val = parseInt(valEl.textContent) || 1;
      val = this.dataset.action === 'plus' ? val + 1 : Math.max(1, val - 1);
      valEl.textContent = val;
      recalcService(svcId);
    });
  });

  // === Button state helpers ===
  const ICON_ADD = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;
  const ICON_CHECK = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

  function setButtonAdded(btn, svcName) {
    btn.classList.add('btn--in-cart');
    btn.classList.remove('btn--accent');
    btn.innerHTML = `${ICON_CHECK} В заявке`;
    btn.setAttribute('aria-label', `${svcName} в заявке — нажмите, чтобы убрать`);
  }
  function setButtonDefault(btn, svcName) {
    btn.classList.remove('btn--in-cart');
    btn.classList.add('btn--accent');
    btn.innerHTML = `${ICON_ADD} Добавить в заявку`;
    btn.setAttribute('aria-label', `Добавить ${svcName} в заявку`);
  }

  // Sync all add-to-cart buttons with actual cart state
  function syncAllButtons() {
    list.querySelectorAll('.js-add-to-cart').forEach(b => {
      const sid = b.dataset.serviceId;
      const s = services.find(x => x.id === sid);
      if (!s) return;
      if (window.AppStore.isServiceInCart(sid)) {
        setButtonAdded(b, s.name);
      } else {
        setButtonDefault(b, s.name);
      }
    });
  }

  // Sync on cart changes (e.g. removing from mini-cart or other tab)
  window.AppStore.onCartChange(syncAllButtons);
  // Initial sync (in case page loaded with items already in cart)
  syncAllButtons();

  // Add to cart buttons — toggle behaviour
  list.querySelectorAll('.js-add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const svcId = this.dataset.serviceId;
      const svc = services.find(s => s.id === svcId);
      if (!svc) return;

      // If already in cart — remove
      if (window.AppStore.isServiceInCart(svcId)) {
        window.AppStore.removeLastByServiceId(svcId);
        setButtonDefault(this, svc.name);
        window.AppStore.showToast(`«${svc.name}» убрана из заявки`);
        return;
      }

      // Collect checked addons
      const addons = [];
      const card = this.closest('.service-card');
      card.querySelectorAll('.addon-item__check:checked').forEach(chk => {
        const addonEl = chk.closest('.addon-item');
        const addonId = addonEl.dataset.addonId;
        const addonDef = svc.addons.find(a => a.id === addonId);
        if (!addonDef) return;
        const qtyEl = document.getElementById(`qty-val-${svcId}-${addonId}`);
        const qty = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
        const addonPrice = addonDef.pct ? Math.round(svc.price * addonDef.pct / 100) : addonDef.price;
        addons.push({ id: addonId, name: addonDef.name, price: addonPrice, qty });
      });

      window.AppStore.addToCart({
        serviceId: svcId,
        name: svc.name,
        basePrice: svc.price,
        addons
      });

      // A7: Track add-to-cart
      if (window.VanVekAnalytics) window.VanVekAnalytics.trackAddToCart(svc.name);

      setButtonAdded(this, svc.name);
      window.AppStore.showToastRich(svc.name, svcId);
    });
  });

  function recalcService(svcId) {
    const svc = services.find(s => s.id === svcId);
    if (!svc) return;
    const card = document.querySelector(`[data-service-id="${svcId}"].service-card`);
    let total = svc.price;

    card.querySelectorAll('.addon-item__check:checked').forEach(chk => {
      const addonEl = chk.closest('.addon-item');
      const addonId = addonEl.dataset.addonId;
      const pct = parseInt(addonEl.dataset.addonPct) || 0;
      const price = parseInt(addonEl.dataset.addonPrice) || 0;
      if (pct > 0) {
        total += Math.round(svc.price * pct / 100);
      } else {
        const qtyEl = document.getElementById(`qty-val-${svcId}-${addonId}`);
        const qty = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
        total += price * qty;
      }
    });

    // Update price display
    const priceDisplay = document.getElementById(`price-display-${svcId}`);
    const priceLabel = document.getElementById(`price-label-${svcId}`);
    const subtotalVal = document.getElementById(`subtotal-val-${svcId}`);

    if (priceDisplay) priceDisplay.textContent = window.AppStore.formatPrice(total);
    if (priceLabel) priceLabel.textContent = total === svc.price ? 'фиксированная цена' : 'с доп. услугами';
    if (subtotalVal) subtotalVal.innerHTML = `<em>${window.AppStore.formatPrice(total)}</em>`;

    // Bug fix: if service is already in cart, sync addons live
    if (window.AppStore.isServiceInCart(svcId)) {
      const addons = [];
      card.querySelectorAll('.addon-item__check:checked').forEach(chk => {
        const addonEl = chk.closest('.addon-item');
        const addonId = addonEl.dataset.addonId;
        const addonDef = svc.addons.find(a => a.id === addonId);
        if (!addonDef) return;
        const qtyEl = document.getElementById(`qty-val-${svcId}-${addonId}`);
        const qty = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
        const addonPrice = addonDef.pct ? Math.round(svc.price * addonDef.pct / 100) : addonDef.price;
        addons.push({ id: addonId, name: addonDef.name, price: addonPrice, qty });
      });
      window.AppStore.updateCartAddons(svcId, addons);
    }
  }
}


  // === Price filter pills ===
  const filterContainer = document.createElement('div');
  filterContainer.className = 'price-filters';
  filterContainer.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 24px;';
  filterContainer.innerHTML = [
    { label: 'Все цены', min: 0, max: Infinity },
    { label: 'До 5 000 ₽', min: 0, max: 5000 },
    { label: '5 000 – 10 000 ₽', min: 5000, max: 10000 },
    { label: 'От 10 000 ₽', min: 10000, max: Infinity },
  ].map((f, i) => `<button class="price-filter-btn" data-min="${f.min}" data-max="${f.max}" style="padding:6px 14px;min-height:44px;border:1.5px solid ${i===0?'var(--color-accent)':'var(--color-border)'};border-radius:50px;font-size:var(--text-sm);font-weight:600;background:${i===0?'var(--color-accent)':'var(--color-surface)'};color:${i===0?'#fff':'var(--color-text)'};cursor:pointer;transition:all 0.2s;">${f.label}</button>`).join('');

  const servicesContainer = document.getElementById('services-list') || document.querySelector('.services-list');
  if (servicesContainer) {
    servicesContainer.parentNode.insertBefore(filterContainer, servicesContainer);
    
    filterContainer.addEventListener('click', e => {
      const btn = e.target.closest('.price-filter-btn');
      if (!btn) return;
      const min = Number(btn.dataset.min);
      const max = Number(btn.dataset.max);
      
      // Style buttons
      filterContainer.querySelectorAll('.price-filter-btn').forEach(b => {
        b.style.background = 'var(--color-surface)';
        b.style.color = 'var(--color-text)';
        b.style.borderColor = 'var(--color-border)';
      });
      btn.style.background = 'var(--color-accent)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--color-accent)';
      
      // Filter services
      document.querySelectorAll('.service-card').forEach(card => {
        const priceEl = card.querySelector('.service-card__price');
        const price = priceEl ? parseInt(priceEl.textContent.replace(/\D/g, '')) : 0;
        card.style.display = (price >= min && price < max) ? '' : 'none';
      });
    });
  }
