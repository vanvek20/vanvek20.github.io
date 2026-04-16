/**
 * VanVek AI Assistant
 * Прототип: имитирует ответы на основе prices.js + categories-data.js
 * Виджет: статичный, всегда видимый, ненавязчивый
 */

(function () {
  'use strict';

  const QUICK_QUESTIONS = [
    'Сколько стоит установка унитаза?',
    'Как быстро приедет мастер?',
    'Работаете в выходные?',
    'Нужна ли предоплата?',
    'Есть ли гарантия?',
    'Как сделать заказ?',
  ];

  const FAQ_KB = [
    {
      keywords: ['цена', 'стоимость', 'сколько стоит', 'прайс', 'тариф'],
      answer: (q) => getPriceAnswer(q),
    },
    {
      keywords: ['мастер', 'приедет', 'когда', 'срок', 'быстро', 'сегодня', 'день'],
      answer: () =>
        'Мастер приедет <strong>в день заказа</strong> при оформлении до 14:00. В остальных случаях — на следующий день или в удобное время.',
    },
    {
      keywords: ['выходные', 'праздник', 'суббота', 'воскресенье', 'график', 'часы', 'время работы'],
      answer: () =>
        'Работаем <strong>ежедневно</strong>, включая выходные и праздники. Часы: <strong>9:00 — 20:00</strong>.',
    },
    {
      keywords: ['предоплата', 'оплат', 'наличные', 'карта', 'перевод', 'деньги'],
      answer: () =>
        'Предоплата <strong>не требуется</strong>. Оплата после выполнения работ. Принимаем наличные, карты, переводы.',
    },
    {
      keywords: ['гарантия', 'поломка', 'брак', 'бесплатно исправ'],
      answer: () =>
        'Гарантия на все работы — <strong>1 год</strong>. Если возникнет неисправность по вине мастера — устраним бесплатно.',
    },
    {
      keywords: ['заказ', 'заказать', 'оформить', 'как', 'звонок', 'без звонка'],
      answer: () =>
        'Заказать можно <strong>без звонка</strong> прямо на сайте:<br>1. Выберите услуги<br>2. Добавьте в заявку<br>3. Заполните форму — перезвоним.',
    },
    {
      keywords: ['договор', 'документ', 'акт', 'официально', 'юридическ'],
      answer: () =>
        'Работаем официально: <strong>договор</strong> + <strong>акт выполненных работ</strong> + гарантия.',
    },
    {
      keywords: ['москва', 'мо', 'московская область', 'зона', 'район', 'выезд'],
      answer: () =>
        'Работаем по <strong>Москве и МО</strong>. Выезд включён в цену.',
    },
    {
      keywords: ['демонтаж', 'вывоз', 'старое', 'убрать', 'снять'],
      answer: () =>
        'Да, выполняем <strong>демонтаж</strong> старого оборудования. Мастер вывезет и утилизирует.',
    },
    {
      keywords: ['партнёр', 'купить', 'магазин', 'скидка', 'товар'],
      answer: () =>
        'Мы партнёры <strong>Сантехника-онлайн</strong> — клиенты VanVek получают скидки на покупку оборудования.',
    },
  ];

  const SERVICE_KEYWORDS = {
    'унитаз': 'toilets',
    'инсталляц': 'installations',
    'раковин': 'sinks',
    'смесител': 'faucets',
    'душ': 'showers',
    'кабин': 'showers',
    'ванн': 'bathtubs',
    'полотенцесушител': 'towel-rails',
    'водонагреватель': 'water-heaters',
    'бойлер': 'water-heaters',
    'мойк': 'kitchen',
    'кухн': 'kitchen',
    'мебел': 'furniture',
    'тумб': 'furniture',
    'вентилятор': 'heating',
    'вытяжк': 'heating',
    'вентиляц': 'heating',
    'водоснабжени': 'water-supply',
    'аксессуар': 'accessories',
  };

  function getPriceAnswer(query) {
    const q = query.toLowerCase();
    const prices = window.PRICES || [];
    let matchedSlug = null;
    for (const [kw, slug] of Object.entries(SERVICE_KEYWORDS)) {
      if (q.includes(kw)) { matchedSlug = slug; break; }
    }
    if (matchedSlug) {
      const grouped = prices.filter(p => p.group === matchedSlug || p.slug === matchedSlug);
      if (grouped.length > 0) {
        const lines = grouped.slice(0, 4).map(p =>
          `• ${p.name} — <strong>${p.price.toLocaleString('ru-RU')} ₽</strong>`
        ).join('<br>');
        return `Цены на ${grouped[0].groupName || 'данную услугу'}:<br>${lines}${grouped.length > 4 ? '<br><small>…и ещё варианты</small>' : ''}<br><br>Цены фиксированные.`;
      }
    }
    const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : 600;
    return `Все цены — в <a href="services.html" style="color:var(--color-accent);">каталоге</a>. Стартуют от <strong>${minPrice.toLocaleString('ru-RU')} ₽</strong>. Фиксированные.`;
  }

  function getBotResponse(userMessage) {
    const q = userMessage.toLowerCase().trim();
    if (/^(привет|здравствуй|добрый|хай|hello|hi)/.test(q)) {
      return 'Привет! Я помощник VanVek. Помогу подобрать услугу или назову цену. Что интересует?';
    }
    if (/спасибо|благодарю|отлично|супер|хорошо/.test(q)) {
      return 'Пожалуйста! <a href="services.html" style="color:var(--color-accent);">Перейти к каталогу →</a>';
    }
    for (const item of FAQ_KB) {
      if (item.keywords.some(kw => q.includes(kw))) {
        return typeof item.answer === 'function' ? item.answer(q) : item.answer;
      }
    }
    for (const [kw, slug] of Object.entries(SERVICE_KEYWORDS)) {
      if (q.includes(kw)) {
        const prices = window.PRICES || [];
        const group = prices.filter(p => p.group === slug || p.slug === slug);
        if (group.length > 0) {
          const min = Math.min(...group.map(p => p.price));
          return `<strong>${group[0].groupName || kw}</strong> — от <strong>${min.toLocaleString('ru-RU')} ₽</strong>. <a href="services.html" style="color:var(--color-accent);">Добавить в заявку →</a>`;
        }
      }
    }
    return `Помогу с:<br>• ценами<br>• условиями<br>• оформлением<br><br>Или звоните: <a href="tel:88003333333" style="color:var(--color-accent);">8 800 333-33-33</a>`;
  }

  // ─── DOM ──────────────────────────────────────────────────────────
  function createChatUI() {
    if (document.getElementById('vanvek-ai-chat')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'vanvek-ai-chat';
    wrapper.setAttribute('role', 'complementary');
    wrapper.setAttribute('aria-label', 'Помощник VanVek');

    wrapper.innerHTML = `
      <div class="ai-panel" id="ai-panel" role="dialog" aria-label="Чат с помощником" aria-hidden="true">
        <div class="ai-panel__header">
          <div class="ai-panel__avatar" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div>
            <div class="ai-panel__name">Помощник</div>
            <div class="ai-panel__status"><span class="ai-panel__dot"></span>Онлайн</div>
          </div>
          <button class="ai-panel__close" id="ai-close" aria-label="Закрыть чат">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="ai-messages" id="ai-messages" role="log" aria-live="polite"></div>
        <div class="ai-chips" id="ai-chips" aria-label="Быстрые вопросы"></div>
        <div class="ai-panel__input-row">
          <input class="ai-input" id="ai-input" type="text" placeholder="Напишите вопрос..." autocomplete="off" maxlength="300" aria-label="Ваш вопрос">
          <button class="ai-send" id="ai-send" aria-label="Отправить">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <!-- Quick Actions Menu -->
      <div class="helper-actions" id="helper-actions" aria-label="Быстрые действия">
        <button class="helper-action-btn" data-action="calc">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="16" y2="18"/></svg>
          Рассчитать стоимость
        </button>
        <button class="helper-action-btn" data-action="select">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Подобрать услугу
        </button>

      </div>

      <button class="ai-fab" id="ai-fab" aria-label="Помощник VanVek" aria-expanded="false" aria-controls="ai-panel">
        <svg class="ai-fab__icon ai-fab__icon--close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        <span class="ai-fab__label">Помощник</span>
      </button>
    `;

    document.body.appendChild(wrapper);
    initChatLogic();
  }

  // ─── Logic ──────────────────────────────────────────────────────
  function initChatLogic() {
    const fab = document.getElementById('ai-fab');
    const panel = document.getElementById('ai-panel');
    const closeBtn = document.getElementById('ai-close');
    const messages = document.getElementById('ai-messages');
    const input = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send');
    const chipsEl = document.getElementById('ai-chips');

    const actionsMenu = document.getElementById('helper-actions');
    let isOpen = false;
    let isActionsOpen = false;
    let firstOpen = true;

    function openActions() {
      isActionsOpen = true;
      actionsMenu.classList.add('helper-actions--open');
    }

    function closeActions() {
      isActionsOpen = false;
      actionsMenu.classList.remove('helper-actions--open');
    }

    function openChat() {
      isOpen = true;
      closeActions();
      panel.setAttribute('aria-hidden', 'false');
      panel.classList.add('ai-panel--open');
      fab.setAttribute('aria-expanded', 'true');
      fab.classList.add('ai-fab--open');

      if (firstOpen) {
        firstOpen = false;
        setTimeout(() => {
          addBotMessage('Здравствуйте! Помогу подобрать услугу или назову цену.');
          setTimeout(() => renderChips(), 400);
        }, 200);
      }
      setTimeout(() => input.focus(), 300);
    }

    function closeChat() {
      isOpen = false;
      panel.setAttribute('aria-hidden', 'true');
      panel.classList.remove('ai-panel--open');
      fab.setAttribute('aria-expanded', 'false');
      fab.classList.remove('ai-fab--open');
    }

    function closeAll() {
      closeChat();
      closeActions();
    }

    fab.addEventListener('click', () => {
      if (isOpen) {
        closeAll();
      } else if (isActionsOpen) {
        closeActions();
      } else {
        openActions();
      }
    });

    // Quick action buttons
    actionsMenu.querySelectorAll('.helper-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        closeActions();
        if (action === 'calc') {
          window.location.href = 'index.html#calculator';
        } else if (action === 'select') {
          window.location.href = 'services.html';
        }
      });
    });

    closeBtn.addEventListener('click', closeAll);

    // Close actions when clicking outside
    document.addEventListener('click', (e) => {
      if (isActionsOpen && !fab.contains(e.target) && !actionsMenu.contains(e.target)) {
        closeActions();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isOpen) closeAll();
        else if (isActionsOpen) closeActions();
      }
    });

    function renderChips() {
      if (!chipsEl) return;
      chipsEl.innerHTML = QUICK_QUESTIONS.map(q =>
        `<button class="ai-chip" data-q="${q}">${q}</button>`
      ).join('');
      chipsEl.querySelectorAll('.ai-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          handleUserMessage(btn.dataset.q);
          chipsEl.style.display = 'none';
        });
      });
    }

    function addBotMessage(html, typing = false) {
      const wrap = document.createElement('div');
      wrap.className = 'ai-msg ai-msg--bot';
      if (typing) {
        wrap.innerHTML = `
          <div class="ai-msg__avatar" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div class="ai-msg__bubble ai-msg__bubble--typing">
            <span class="ai-typing-dot"></span><span class="ai-typing-dot"></span><span class="ai-typing-dot"></span>
          </div>`;
      } else {
        wrap.innerHTML = `
          <div class="ai-msg__avatar" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div class="ai-msg__bubble">${html}</div>`;
      }
      messages.appendChild(wrap);
      messages.scrollTop = messages.scrollHeight;
      return wrap;
    }

    function addUserMessage(text) {
      const wrap = document.createElement('div');
      wrap.className = 'ai-msg ai-msg--user';
      wrap.innerHTML = `<div class="ai-msg__bubble">${text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`;
      messages.appendChild(wrap);
      messages.scrollTop = messages.scrollHeight;
    }

    function handleUserMessage(text) {
      if (!text.trim()) return;
      addUserMessage(text);
      input.value = '';
      const typingEl = addBotMessage('', true);
      const delay = 500 + Math.random() * 500;
      setTimeout(() => {
        typingEl.remove();
        addBotMessage(getBotResponse(text));
      }, delay);
    }

    sendBtn.addEventListener('click', () => handleUserMessage(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserMessage(input.value);
      }
    });

    // ─── Trigger from other pages ──────────────────────────────
    function triggerAI(message) {
      if (!isOpen) openChat();
      const delay = firstOpen ? 800 : 200;
      firstOpen = false;
      setTimeout(() => {
        addBotMessage(message);
        input.focus();
      }, delay);
    }

    const pricesTrigger = document.getElementById('prices-ai-trigger');
    if (pricesTrigger) {
      pricesTrigger.addEventListener('click', () =>
        triggerAI('Расскажите своими словами, что нужно сделать — подберу услуги и покажу цены.')
      );
    }
    const servicesTrigger = document.getElementById('services-ai-trigger');
    if (servicesTrigger) {
      servicesTrigger.addEventListener('click', () =>
        triggerAI('Опишите задачу — подберу услуги из каталога и покажу цены.')
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatUI);
  } else {
    createChatUI();
  }

})();
