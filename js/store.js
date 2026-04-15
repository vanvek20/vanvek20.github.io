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
      if (Array.isArray(parsed)) cart = parsed;
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
  return cart.reduce((sum, item) => sum + item.total, 0);
}
function cartCount() { return cart.length; }

function addToCart(item) {
  // item: { serviceId, name, basePrice, addons: [{id,name,price,qty}] }
  const addonTotal = (item.addons || []).reduce((s, a) => s + a.price * a.qty, 0);
  const entry = {
    id: Date.now() + Math.random(),
    serviceId: item.serviceId,
    name: item.name,
    basePrice: item.basePrice,
    addons: item.addons || [],
    total: item.basePrice + addonTotal
  };
  cart.push(entry);
  saveCartToSession();
  notifyCart();
  return entry.id;
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
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

// Export to window for cross-page access
window.AppStore = {
  getCity, getCityKey, setCity,
  addToCart, removeFromCart, clearCart, getCart,
  isServiceInCart, removeLastByServiceId,
  cartTotal, cartCount,
  formatPrice, pluralize, escHtml,
  showToast, updateCartUI, updateMiniCart,
  onCartChange, CITIES,
  initCityDropdown,  // экспортируем для вызова после инъекции хедера
  initThemeToggle    // аналогично — тёмная тема тоже нуждается в DOM-кнопке из хедера
};
