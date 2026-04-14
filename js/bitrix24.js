/**
 * VANVEK — Bitrix24 CRM Integration Layer
 * =========================================
 * 
 * Задел для подключения сайта к Битрикс24 CRM.
 * 
 * КАК ПОДКЛЮЧИТЬ:
 * 
 * 1. Зайдите в Битрикс24 → Приложения → Разработчикам → Другое → Входящий вебхук
 * 2. Дайте права: CRM (crm)
 * 3. Скопируйте URL вебхука (например: https://your-domain.bitrix24.ru/rest/1/abc123xyz/)
 * 4. Вставьте URL в переменную BITRIX24_WEBHOOK_URL ниже
 * 5. Установите BITRIX24_ENABLED = true
 * 
 * После этого все заявки с корзины и форм будут автоматически создавать лиды в CRM.
 * Параллельно заявки продолжат приходить на email (FormSubmit.co) как резерв.
 * 
 * ВОЗМОЖНОСТИ:
 * - Создание лидов из корзины (crm.lead.add)
 * - Создание лидов из формы заявки
 * - Отслеживание источника (UTM-метки)
 * - Передача списка услуг в комментарий лида
 */

// ============================================================
// НАСТРОЙКИ — ИЗМЕНИТЕ ПЕРЕД ИСПОЛЬЗОВАНИЕМ
// ============================================================

const BITRIX24_CONFIG = {
  // Включить интеграцию (поставьте true после настройки вебхука)
  enabled: false,
  
  // URL входящего вебхука Битрикс24
  // Пример: 'https://vanvek.bitrix24.ru/rest/1/abc123xyz/'
  webhookUrl: '',
  
  // ID источника в CRM (настраивается в Битрикс24 → CRM → Настройки → Справочники → Источники)
  // По умолчанию: 'WEB' (Веб-сайт)
  sourceId: 'WEB',
  
  // Ответственный менеджер (ID пользователя в Битрикс24, 0 = автораспределение)
  assignedById: 0,
  
  // Отправлять ли заявку параллельно на email (true = дублировать, false = только CRM)
  keepEmailFallback: true
};

// ============================================================
// API МЕТОДЫ
// ============================================================

const Bitrix24 = {

  /**
   * Проверить, активна ли интеграция
   */
  isEnabled() {
    return BITRIX24_CONFIG.enabled && BITRIX24_CONFIG.webhookUrl.length > 0;
  },

  /**
   * Вызвать метод REST API Битрикс24
   * @param {string} method — метод API (например 'crm.lead.add')
   * @param {object} params — параметры
   * @returns {Promise<object>}
   */
  async callMethod(method, params = {}) {
    if (!this.isEnabled()) {
      console.warn('[Bitrix24] Интеграция отключена. Включите в BITRIX24_CONFIG.');
      return null;
    }

    const url = BITRIX24_CONFIG.webhookUrl.replace(/\/$/, '') + '/' + method + '.json';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        console.error(`[Bitrix24] API Error: ${data.error_description || data.error}`);
        return null;
      }

      console.log(`[Bitrix24] ${method} → OK`, data.result);
      return data.result;

    } catch (err) {
      console.error(`[Bitrix24] ${method} failed:`, err);
      return null;
    }
  },

  /**
   * Создать лид из заказа корзины
   * @param {object} orderData — данные заказа
   * @param {string} orderData.name — имя клиента
   * @param {string} orderData.phone — телефон
   * @param {string} orderData.email — email (опционально)
   * @param {string} orderData.address — адрес
   * @param {string} orderData.comment — комментарий
   * @param {Array} orderData.items — список услуг [{name, price, qty}]
   * @param {number} orderData.total — итоговая сумма
   */
  async createLeadFromCart(orderData) {
    // Формируем описание услуг для комментария
    const itemsList = (orderData.items || [])
      .map((item, i) => `${i + 1}. ${item.name} — ${item.price} ₽ × ${item.qty || 1}`)
      .join('\n');

    const comment = [
      '🔧 Заказ с сайта VANVEK',
      '━━━━━━━━━━━━━━━━━━━━━',
      '',
      itemsList,
      '',
      `💰 Итого: ${orderData.total || 0} ₽`,
      '',
      orderData.address ? `📍 Адрес: ${orderData.address}` : '',
      orderData.comment ? `💬 Комментарий: ${orderData.comment}` : '',
      '',
      `📅 ${new Date().toLocaleString('ru-RU')}`,
      `🌐 Источник: ${window.location.href}`
    ].filter(Boolean).join('\n');

    // UTM-метки из URL
    const utm = this._getUtmParams();

    const fields = {
      TITLE: `Заказ с сайта: ${orderData.name || 'Клиент'}`,
      NAME: orderData.name || '',
      PHONE: orderData.phone ? [{ VALUE: orderData.phone, VALUE_TYPE: 'WORK' }] : [],
      EMAIL: orderData.email ? [{ VALUE: orderData.email, VALUE_TYPE: 'WORK' }] : [],
      COMMENTS: comment,
      SOURCE_ID: BITRIX24_CONFIG.sourceId,
      CURRENCY_ID: 'RUB',
      OPPORTUNITY: orderData.total || 0,
      ...(BITRIX24_CONFIG.assignedById > 0 && { ASSIGNED_BY_ID: BITRIX24_CONFIG.assignedById }),
      // UTM
      ...(utm.utm_source && { UTM_SOURCE: utm.utm_source }),
      ...(utm.utm_medium && { UTM_MEDIUM: utm.utm_medium }),
      ...(utm.utm_campaign && { UTM_CAMPAIGN: utm.utm_campaign }),
      ...(utm.utm_term && { UTM_TERM: utm.utm_term }),
      ...(utm.utm_content && { UTM_CONTENT: utm.utm_content })
    };

    return await this.callMethod('crm.lead.add', { fields });
  },

  /**
   * Создать лид из формы обратной связи / заявки
   * @param {object} formData — {name, phone, email, message}
   */
  async createLeadFromForm(formData) {
    const utm = this._getUtmParams();

    const fields = {
      TITLE: `Заявка с сайта: ${formData.name || 'Посетитель'}`,
      NAME: formData.name || '',
      PHONE: formData.phone ? [{ VALUE: formData.phone, VALUE_TYPE: 'WORK' }] : [],
      EMAIL: formData.email ? [{ VALUE: formData.email, VALUE_TYPE: 'WORK' }] : [],
      COMMENTS: formData.message || 'Заявка с сайта vanvek.ru',
      SOURCE_ID: BITRIX24_CONFIG.sourceId,
      ...(BITRIX24_CONFIG.assignedById > 0 && { ASSIGNED_BY_ID: BITRIX24_CONFIG.assignedById }),
      ...(utm.utm_source && { UTM_SOURCE: utm.utm_source }),
      ...(utm.utm_medium && { UTM_MEDIUM: utm.utm_medium }),
      ...(utm.utm_campaign && { UTM_CAMPAIGN: utm.utm_campaign })
    };

    return await this.callMethod('crm.lead.add', { fields });
  },

  /**
   * Извлечь UTM-метки из текущего URL
   * @private
   */
  _getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || ''
    };
  }
};

// Экспорт для использования в cart.html и других формах
window.Bitrix24 = Bitrix24;
window.BITRIX24_CONFIG = BITRIX24_CONFIG;

// Лог при загрузке
if (Bitrix24.isEnabled()) {
  console.log('[Bitrix24] ✅ Интеграция активна');
} else {
  console.log('[Bitrix24] ⏸ Интеграция отключена. Настройте BITRIX24_CONFIG для подключения к CRM.');
}
