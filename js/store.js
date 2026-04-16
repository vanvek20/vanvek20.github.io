/**
 * Global cart store + city state
 * All pages share this via in-memory state (JS module pattern)
 */

// ===== DATA =====
const CITIES = {
  moscow: {
    name: 'Москва',
    nameIn: 'Москве', /* предложный падеж — «в Москве» */
    phone: '8 800 333-33-33',
    phoneHref: 'tel:88003333333',
    zone: 'Москва и МО'
  },
  spb: {
    name: 'СПб',           /* коротко в кнопке — не ломает лейаут */
    nameIn: 'Санкт-Петербурге', /* предложный падеж — для текстов 'в ...' */
    nameDisplay: 'Санкт-Петербург', /* полное для data-city-name */
    phone: '8 800 333-33-33',
    phoneHref: 'tel:88003333333',
    zone: 'Санкт-Петербург и ЛО'
  }
};

// ===== STATE =====
let currentCity = 'moscow';
let cart = []; // { id, serviceId, name, basePrice, addons: [{id, name, price, qty}], total }
let cartListeners = [];

// ===== LOCAL STORAGE =====
const CART_STORAGE_KEY = 'vanvek_cart';
function saveCartToSession() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch(e) { /* localStorage may be blocked */ }
}
function loadCartFromSession() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        cart = parsed.map(item => {
          // Sanitize: ensure basePrice and total are numbers
          const base = item.basePrice || item.price || 0;
          const addonSum = (item.addons || []).reduce((s, a) => s + (a.price || 0) * (a.qty || 1), 0);
          item.basePrice = base;
          if (!item.total || isNaN(item.total)) item.total = base + addonSum;
          return item;
        });
      }
    }
  } catch(e) { /* localStorage may be blocked or data malformed */ }
}

// ===== CITY API =====
function getCity() { return CITIES[currentCity]; }
function getCityKey() { return currentCity; }
function setCity(key) {
  if (!CITIES[key]) return;
  currentCity = key;
  updateCityUI();
}

function updateCityUI() {
  const city = getCity();
  // Update all phone numbers
  document.querySelectorAll('[data-city-phone]').forEach(el => {
    el.textContent = city.phone;
    if (el.tagName === 'A') el.href = city.phoneHref;
  });
  // Update phone links
  document.querySelectorAll('[data-city-phone-href]').forEach(el => {
    el.href = city.phoneHref;
  });
  // Update city name displays (полное название — nameDisplay если есть, иначе name)
  document.querySelectorAll('[data-city-name]').forEach(el => {
    el.textContent = city.nameDisplay || city.name;
  });
  // Update city labels (simple toggle buttons)
  document.querySelectorAll('.city-labels__btn').forEach(btn => {
    const isActive = btn.dataset.cityKey === currentCity;
    btn.classList.toggle('active', isActive);
  });
  // Update page-level city references (e.g. category page h1)
  document.querySelectorAll('[data-city-in-title]').forEach(el => {
    el.textContent = city.nameIn || city.name; /* предложный падеж: «в Москве» */
  });
}

// ===== CART API =====
function cartTotal() {
  return cart.reduce((sum, item) => sum + (item.total || 0), 0);
}
function cartCount() { return cart.length; }

function addToCart(item) {
  // item: { serviceId, name, basePrice|price, addons: [{id,name,price,qty}] }
  const base = item.basePrice || item.price || 0;
  const addonTotal = (item.addons || []).reduce((s, a) => s + a.price * (a.qty || 1), 0);
  const entry = {
    id: Date.now() + Math.random(),
    serviceId: item.serviceId,
    name: item.name,
    basePrice: base,
    addons: item.addons || [],
    total: base + addonTotal
  };
  cart.push(entry);
  saveCartToSession();
  notifyCart();
  return entry.id;
}

function removeFromCart(id) {
  cart = cart.filter(i => String(i.id) !== String(id));
  saveCartToSession();
  notifyCart();
}

function clearCart() {
  cart = [];
  saveCartToSession();
  notifyCart();
}

function getCart() { return [...cart]; }

function isServiceInCart(serviceId) {
  return cart.some(i => i.serviceId === serviceId);
}

function removeLastByServiceId(serviceId) {
  // Remove the last entry with this serviceId (LIFO)
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i].serviceId === serviceId) {
      cart.splice(i, 1);
      saveCartToSession();
      notifyCart();
      return true;
    }
  }
  return false;
}

function updateCartAddons(serviceId, addons) {
  // Update addons for the last cart entry matching serviceId
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i].serviceId === serviceId) {
      cart[i].addons = addons || [];
      const addonTotal = cart[i].addons.reduce((s, a) => s + a.price * a.qty, 0);
      cart[i].total = cart[i].basePrice + addonTotal;
      saveCartToSession();
      notifyCart();
      return true;
    }
  }
  return false;
}

function onCartChange(fn) {
  cartListeners.push(fn);
}

function notifyCart() {
  cartListeners.forEach(fn => fn(cart));
  updateCartUI();
}

// ===== CART UI =====
function updateCartUI() {
  const count = cartCount();
  const total = cartTotal();

  // Badge in header
  document.querySelectorAll('.js-cart-count').forEach(el => {
    el.textContent = count;
  });
  // Has-items class on cart button
  document.querySelectorAll('.cart-btn').forEach(el => {
    el.classList.toggle('has-items', count > 0);
    // animate badge
    const badge = el.querySelector('.cart-btn__badge');
    if (badge) {
      badge.classList.remove('bump');
      void badge.offsetWidth; // reflow
      badge.classList.add('bump');
    }
  });
  // Mini cart content
  updateMiniCart();
}

function updateMiniCart() {
  const miniEmpty = document.querySelector('.js-cart-mini-empty');
  const miniItems = document.querySelector('.js-cart-mini-items');
  const miniTotal = document.querySelector('.js-cart-mini-total');
  const count = cartCount();
  const total = cartTotal();

  if (miniEmpty) miniEmpty.style.display = count === 0 ? 'block' : 'none';
  if (miniItems) {
    miniItems.style.display = count === 0 ? 'none' : 'block';
    // render last 3 items
    const last3 = cart.slice(-3);
    miniItems.innerHTML = last3.map(item => `
      <div class="cart-mini__item">
        <div class="cart-mini__item-name">${escHtml(item.name)}</div>
        <div class="cart-mini__item-price">${formatPrice(item.total)}</div>
      </div>
    `).join('');
  }
  if (miniTotal) {
    const totalSpan = miniTotal.querySelector('span');
    if (totalSpan) totalSpan.textContent = formatPrice(total);
    miniTotal.closest('.cart-mini__footer').style.display = count === 0 ? 'none' : 'flex';
  }

  // Hero mini cart
  const heroCount = document.querySelector('.js-hero-cart-count');
  if (heroCount) {
    heroCount.textContent = count === 0
      ? '0 услуг в заявке'
      : `${count} ${pluralize(count, 'услуга', 'услуги', 'услуг')} в заявке`;
  }
  const heroTotal = document.querySelector('.js-hero-cart-total');
  if (heroTotal) heroTotal.textContent = count === 0 ? '—' : formatPrice(total);
}

// ===== UTILS =====
function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽';
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ===== CITY LABELS LOGIC =====
function initCityDropdown() {
  document.querySelectorAll('.city-labels__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setCity(btn.dataset.cityKey);
    });
  });
}

// ===== CART MINI DROPDOWN LOGIC =====
function initCartMiniDropdown() {
  const wrapper = document.querySelector('.js-cart-mini-wrapper');
  if (!wrapper) return;
  const btn = wrapper.querySelector('.cart-btn');
  const mini = wrapper.querySelector('.cart-mini');
  if (!btn || !mini) return;

  btn.addEventListener('mouseenter', () => mini.classList.add('open'));
  wrapper.addEventListener('mouseleave', () => mini.classList.remove('open'));
  btn.addEventListener('click', (e) => {
    if (window.innerWidth < 768) {
      window.location.href = 'cart.html';
    } else {
      e.preventDefault();
    }
  });
}

// ===== MOBILE NAV =====
function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== DARK MODE TOGGLE =====
function initThemeToggle() {
  const btn = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  setToggleIcon(btn, theme);

  if (btn) {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      setToggleIcon(btn, theme);
    });
  }
}
function setToggleIcon(btn, theme) {
  if (!btn) return;
  btn.setAttribute('aria-label', 'Переключить тему');
  btn.innerHTML = theme === 'dark'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  let toast = document.querySelector('.cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${escHtml(msg)}`;
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== INIT =====
function initCommon() {
  loadCartFromSession(); // Restore cart from session before UI init
  initThemeToggle();
  initCityDropdown();
  initCartMiniDropdown();
  initMobileNav();
  updateCityUI();
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', initCommon);

// === Phone mask for all tel inputs ===
function initPhoneMasks() {
  document.querySelectorAll('input[type="tel"]').forEach(function(input) {
    if (input.dataset.masked) return;
    input.dataset.masked = 'true';
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('autocomplete', 'tel');
    input.addEventListener('input', function(e) {
      var x = e.target.value.replace(/\D/g, '');
      if (x.length === 0) { e.target.value = ''; return; }
      if (x[0] === '7' || x[0] === '8') x = x.substring(1);
      var formatted = '+7';
      if (x.length > 0) formatted += ' (' + x.substring(0, 3);
      if (x.length >= 3) formatted += ') ' + x.substring(3, 6);
      if (x.length >= 6) formatted += '-' + x.substring(6, 8);
      if (x.length >= 8) formatted += '-' + x.substring(8, 10);
      e.target.value = formatted;
    });
  });
}
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initPhoneMasks);
  if (window.AppStore) window.AppStore.initPhoneMasks = initPhoneMasks;
}

// Export to window for cross-page access
window.AppStore = {
  getCity, getCityKey, setCity,
  addToCart, removeFromCart, clearCart, getCart,
  isServiceInCart, removeLastByServiceId, updateCartAddons,
  cartTotal, cartCount,
  formatPrice, pluralize, escHtml,
  showToast, updateCartUI, updateMiniCart,
  onCartChange, CITIES,
  initCityDropdown,  // экспортируем для вызова после инъекции хедера
  initThemeToggle,   // аналогично — тёмная тема тоже нуждается в DOM-кнопке из хедера
  initPhoneMasks     // маска телефона — вызывается после вставки DOM
};


// === Focus Trap for Modals ===
(function() {
  function trapFocus(modal) {
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();
    modal.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modal.removeEventListener('keydown', handler);
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  // Observe modals becoming visible
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.type === 'attributes' && m.attributeName === 'style') {
        const el = m.target;
        if (el.getAttribute('role') === 'dialog' && el.style.display !== 'none' && el.style.display !== '') {
          trapFocus(el);
        }
      }
    });
  });
  document.querySelectorAll('[role="dialog"]').forEach(modal => {
    observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
  });
  // Also handle dynamically created modals
  setTimeout(() => {
    document.querySelectorAll('[role="dialog"]').forEach(modal => {
      observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
    });
  }, 1000);
})();


// === Sticky Cart Bar for category pages ===
// Deferred init: category-page.js renders cards after store.js loads
document.addEventListener('DOMContentLoaded', function() {
  // Only on category pages (they have #service-list or data-category-page)
  var isCategory = document.getElementById('service-list') || document.querySelector('[data-category-slug]') || window.location.pathname.indexOf('category-') !== -1;
  if (!isCategory) return;
  
  // Wait for cards to render
  setTimeout(function() {
    var bar = document.createElement('div');
    bar.className = 'sticky-cart-bar';
    bar.id = 'sticky-cart-bar';
    bar.innerHTML = '<span id="sticky-cart-text" style="font-weight:600;">В заявке: 0 услуг</span><a href="cart.html" class="btn btn--accent" style="padding:8px 20px;">Перейти к заявке \u2192</a>';
    document.body.appendChild(bar);
    
    function updateStickyBar() {
      var cart = window.AppStore ? window.AppStore.getCart() : [];
      var count = cart.length;
      var text = document.getElementById('sticky-cart-text');
      if (text) {
        var word = count === 1 ? 'услуга' : (count >= 2 && count <= 4 ? 'услуги' : 'услуг');
        text.textContent = 'В заявке: ' + count + ' ' + word;
      }
      bar.classList.toggle('visible', count > 0);
    }
    
    if (window.AppStore && window.AppStore.onCartChange) {
      window.AppStore.onCartChange(updateStickyBar);
    }
    updateStickyBar();
  }, 500);
});
