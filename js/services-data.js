/**
 * VanVek — ДАННЫЕ УСЛУГ ПО КАТЕГОРИЯМ
 * =====================================
 * Используется на странице category.html
 * Каждая категория содержит список услуг и доп. услуги (addons)
 *
 * ДОПЫ, которые встречаются повсеместно:
 *   - Демонтаж старого оборудования
 *   - Сверление в керамограните (если плитка на стенах — не обычная керамика)
 *   - Герметизация (для ограждений, уголков, поддонов, шторок)
 */

// ── Универсальные допы ──────────────────────────────────────────────────────

const ADDON_DRILLING = {
  id: 'drilling-ceramic',
  name: 'Сверление в керамограните (+450 ₽/отв.)',
  hint: 'Нужно если у вас на стенах керамогранит, а не обычная керамика',
  price: 450,
  hasQty: true,
  qtyLabel: 'отв.'
};

const ADDON_SEALING = {
  id: 'sealing',
  name: 'Герметизация примыкания (м.п.)',
  hint: 'Рекомендуем для спокойствия — защищает от протечек',
  price: 350,
  hasQty: true,
  qtyLabel: 'м.п.'
};

const ADDON_SEALANT_CLIENT = {
  id: 'sealing-client',
  name: 'Герметизация (герметик клиента)',
  hint: 'Если у вас есть свой герметик',
  price: 700,
  hasQty: false
};

const ADDON_UNASSEMBLED = {
  id: 'unassembled',
  name: 'Мебель в разобранном виде (+30%)',
  hint: 'Если мебель не собрана — наценка +30% к стоимости установки',
  price: 0,
  pct: 30,
  hasQty: false
};

// Демонтаж — у каждой услуги свой
function addonDismantling(name, price) {
  return { id: 'dismantling', name: `Демонтаж ${name}`, hint: 'Нужно если заменяете старое', price, hasQty: false };
}

// ── ДАННЫЕ ──────────────────────────────────────────────────────────────────

window.SERVICES_DATA = {

  // ── МЕБЕЛЬ ДЛЯ ВАННОЙ ───────────────────────────────────────────────────
  furniture: {
    categoryName: 'Мебель для ванной',
    services: [
      {
        id: 'furniture-01', name: 'Тумба с раковиной до 70 см', price: 7200,
        desc: 'Сборка, крепёж к стене, подключение к водоснабжению и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          { id: 'washer', name: 'Стиральная машина (вместе дешевле)', price: 3200, hasQty: false, originalPrice: 4200 },
          ADDON_UNASSEMBLED,
          addonDismantling('старой тумбы с раковиной', 2000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-02', name: 'Тумба с раковиной от 71 см', price: 8700,
        desc: 'Сборка, крепёж к стене, подключение к водоснабжению и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          { id: 'washer', name: 'Стиральная машина (вместе дешевле)', price: 3200, hasQty: false, originalPrice: 4200 },
          ADDON_UNASSEMBLED,
          addonDismantling('старой тумбы с раковиной', 2000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-03', name: 'Зеркало до 70 см', price: 3500,
        desc: 'Крепёж к стене, регулировка горизонтали',
        addons: [
          { id: 'glass-shelf', name: 'Стеклянная полка рядом (вместе дешевле)', price: 1000, hasQty: false, originalPrice: 1300 },
          { id: 'electric', name: 'Подключение к электросети (подсветка)', price: 1000, hasQty: false },
          addonDismantling('старого зеркала', 500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-04', name: 'Зеркало от 71 до 100 см', price: 4500,
        desc: 'Крепёж к стене, регулировка горизонтали',
        addons: [
          { id: 'glass-shelf', name: 'Стеклянная полка рядом (вместе дешевле)', price: 1000, hasQty: false, originalPrice: 1300 },
          { id: 'electric', name: 'Подключение к электросети (подсветка)', price: 1000, hasQty: false },
          addonDismantling('старого зеркала', 500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-05', name: 'Зеркало от 101 см', price: 6500,
        desc: 'Крепёж к стене, регулировка горизонтали',
        addons: [
          { id: 'glass-shelf', name: 'Стеклянная полка рядом (вместе дешевле)', price: 1000, hasQty: false, originalPrice: 1300 },
          { id: 'electric', name: 'Подключение к электросети (подсветка)', price: 1000, hasQty: false },
          addonDismantling('старого зеркала', 500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-06', name: 'Зеркало-шкаф до 70 см', price: 4300,
        desc: 'Сборка, крепёж к стене, подключение подсветки при наличии',
        addons: [
          { id: 'glass-shelf', name: 'Стеклянная полка рядом (вместе дешевле)', price: 1000, hasQty: false, originalPrice: 1300 },
          { id: 'electric', name: 'Подключение к электросети (подсветка)', price: 1000, hasQty: false },
          addonDismantling('старого зеркала-шкафа', 1000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-07', name: 'Зеркало-шкаф от 71 до 100 см', price: 5500,
        desc: 'Сборка, крепёж к стене, подключение подсветки при наличии',
        addons: [
          { id: 'electric', name: 'Подключение к электросети (подсветка)', price: 1000, hasQty: false },
          addonDismantling('старого зеркала-шкафа', 1000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-08', name: 'Зеркало-шкаф от 101 см', price: 6700,
        desc: 'Сборка, крепёж к стене, подключение подсветки при наличии',
        addons: [
          { id: 'electric', name: 'Подключение к электросети (подсветка)', price: 1000, hasQty: false },
          addonDismantling('старого зеркала-шкафа', 1000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-09', name: 'Настенный шкаф (в сборе)', price: 3300,
        desc: 'Крепёж к стене, регулировка петель',
        addons: [ ADDON_UNASSEMBLED, addonDismantling('старого шкафа', 1000), ADDON_DRILLING ]
      },
      {
        id: 'furniture-10', name: 'Напольный шкаф (в сборе)', price: 2500,
        desc: 'Установка, крепёж от опрокидывания',
        addons: [ ADDON_UNASSEMBLED, addonDismantling('старого шкафа', 1000) ]
      },

      {
        id: 'furniture-13', name: 'Шкаф-пенал напольный (в сборе)', price: 2500,
        desc: 'Установка, крепёж от опрокидывания',
        addons: [ ADDON_UNASSEMBLED, addonDismantling('старого шкафа-пенала', 1300) ]
      },
      {
        id: 'furniture-14', name: 'Шкаф-пенал настенный (в сборе)', price: 3300,
        desc: 'Крепёж к стене, регулировка',
        addons: [ ADDON_UNASSEMBLED, addonDismantling('старого шкафа-пенала', 1300), ADDON_DRILLING ]
      },

      {
        id: 'furniture-16', name: 'Столешница с раковиной до 70 см', price: 7200,
        desc: 'Монтаж столешницы, раковины, подключение к водоснабжению и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старой столешницы с раковиной', 2000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-17', name: 'Столешница с раковиной от 71 см', price: 8700,
        desc: 'Монтаж столешницы, раковины, подключение к водоснабжению и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старой столешницы с раковиной', 2000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-18', name: 'Консоль с раковиной', price: 7200,
        desc: 'Крепёж к стене, подключение воды и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старой консоли с раковиной', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'furniture-19', name: 'Стеклянная полка', price: 1300,
        desc: 'Крепёж к стене, регулировка горизонтали',
        addons: [ ADDON_DRILLING ]
      },
      {
        id: 'furniture-20', name: 'Светильник для зеркала', price: 1500,
        desc: 'Монтаж над зеркалом, подключение к электросети',
        addons: [ addonDismantling('старого светильника', 500) ]
      },
    ]
  },

  // ── ДУШЕВЫЕ КАБИНЫ И ОГРАЖДЕНИЯ ─────────────────────────────────────────
  showers: {
    categoryName: 'Душевые кабины и ограждения',
    services: [
      {
        id: 'showers-01', name: 'Душевой уголок до 90 см', price: 10000,
        desc: 'Монтаж, крепёж к стене и полу, регулировка, тестирование',
        addons: [
          { id: 'tray-acrylic', name: 'Поддон акрил/сталь (скидка 1 000 ₽)', price: -1000, hasQty: false },
          { id: 'tray-cast', name: 'Поддон чугун/керамика/мрамор (скидка 1 500 ₽)', price: -1500, hasQty: false },
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого уголка', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-02', name: 'Душевой уголок от 91 до 100 см', price: 11500,
        desc: 'Монтаж, крепёж к стене и полу, регулировка, тестирование',
        addons: [
          { id: 'tray-acrylic', name: 'Поддон акрил/сталь (скидка 1 000 ₽)', price: -1000, hasQty: false },
          { id: 'tray-cast', name: 'Поддон чугун/керамика/мрамор (скидка 1 500 ₽)', price: -1500, hasQty: false },
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого уголка', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-03', name: 'Душевой уголок от 101 до 110 см', price: 12500,
        desc: 'Монтаж, крепёж к стене и полу, регулировка, тестирование',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого уголка', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-04', name: 'Душевой уголок от 111 см', price: 14500,
        desc: 'Монтаж, крепёж к стене и полу, регулировка, тестирование',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого уголка', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-05', name: 'Шторка стеклянная на ванну до 139 см', price: 7500,
        desc: 'Монтаж на борт ванны, крепёж к стене, регулировка',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой шторки', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-06', name: 'Шторка стеклянная на ванну от 140 см', price: 9000,
        desc: 'Монтаж на борт ванны, крепёж к стене, регулировка',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой шторки', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-07', name: 'Угловая шторка на ванну', price: 11500,
        desc: 'Монтаж на борт ванны, крепёж к двум стенам',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой шторки', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-08', name: 'Душевая дверь в нишу до 90 см', price: 9000,
        desc: 'Монтаж, выравнивание, крепёж к стенам, регулировка',
        addons: [
          { id: 'tray-acrylic', name: 'Поддон акрил/сталь (скидка 1 000 ₽)', price: -1000, hasQty: false },
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой душевой двери', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-09', name: 'Душевая дверь в нишу до 110 см', price: 10500,
        desc: 'Монтаж, выравнивание, крепёж к стенам, регулировка',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой душевой двери', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-10', name: 'Душевая перегородка до 90 см', price: 9000,
        desc: 'Монтаж, крепёж к стене и полу, герметизация',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой перегородки', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-11', name: 'Душевой поддон акрил/сталь до 110 см', price: 6000,
        desc: 'Монтаж, выравнивание, подключение к канализации, герметизация',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого поддона', 1500),
        ]
      },
      {
        id: 'showers-12', name: 'Душевой поддон акрил/сталь до 150 см', price: 8000,
        desc: 'Монтаж, выравнивание, подключение к канализации, герметизация',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого поддона', 1500),
        ]
      },
      {
        id: 'showers-13', name: 'Душевой поддон чугун/керамика до 100 см', price: 8500,
        desc: 'Монтаж, выравнивание, подключение к канализации, герметизация',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого поддона', 1500),
        ]
      },
      {
        id: 'showers-14', name: 'Душевая кабина до 90 см (без пара)', price: 12000,
        desc: 'Монтаж, подключение к водоснабжению, канализации и электросети',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой душевой кабины', 3000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-15', name: 'Душевая кабина до 90 см (с паром)', price: 15000,
        desc: 'Монтаж, подключение к водоснабжению, канализации и электросети, тестирование пара',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старой душевой кабины', 3000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'showers-16', name: 'Душевой бокс до 150 см (без пара)', price: 18500,
        desc: 'Монтаж, подключение к водоснабжению, канализации и электросети',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого душевого бокса', 4000),
        ]
      },
      {
        id: 'showers-17', name: 'Душевой бокс до 150 см (с паром)', price: 20700,
        desc: 'Монтаж, полное подключение, тестирование парогенератора',
        addons: [
          ADDON_SEALING, ADDON_SEALANT_CLIENT,
          addonDismantling('старого душевого бокса', 4000),
        ]
      },
    ]
  },

  // ── СМЕСИТЕЛИ И ДУШ ─────────────────────────────────────────────────────
  faucets: {
    categoryName: 'Смесители и душ',
    services: [
      {
        id: 'faucets-01', name: 'Смеситель для раковины', price: 3300,
        desc: 'Демонтаж старого, монтаж нового, проверка на течь',
        addons: [ addonDismantling('старого смесителя', 500), ADDON_DRILLING ]
      },
      {
        id: 'faucets-02', name: 'Смеситель для ванны с душем', price: 3300,
        desc: 'Монтаж смесителя, подключение шланга и лейки, проверка',
        addons: [ addonDismantling('старого смесителя', 500), ADDON_DRILLING ]
      },
      {
        id: 'faucets-03', name: 'Смеситель для душа', price: 3300,
        desc: 'Монтаж, подключение, регулировка',
        addons: [ addonDismantling('старого смесителя', 500), ADDON_DRILLING ]
      },
      {
        id: 'faucets-04', name: 'Смеситель для кухни', price: 3300,
        desc: 'Монтаж, подключение к водопроводу, проверка на течь',
        addons: [ addonDismantling('старого смесителя', 500) ]
      },
      {
        id: 'faucets-05', name: 'Смеситель с термостатом', price: 4300,
        desc: 'Монтаж, настройка температуры, проверка',
        addons: [ addonDismantling('старого смесителя', 500), ADDON_DRILLING ]
      },
      {
        id: 'faucets-06', name: 'Смеситель бесконтактный', price: 5500,
        desc: 'Монтаж, подключение к электросети, настройка датчика',
        addons: [ addonDismantling('старого смесителя', 500), ADDON_DRILLING ]
      },
      {
        id: 'faucets-07', name: 'Смеситель встраиваемый', price: 9000,
        desc: 'Монтаж в стену, подключение, штробление при необходимости',
        addons: [ addonDismantling('старого смесителя', 500), ADDON_DRILLING ]
      },
      {
        id: 'faucets-08', name: 'Стойка душевая', price: 4200,
        desc: 'Монтаж на стену, подключение к смесителю',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старой стойки', 1000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'faucets-09', name: 'Гарнитур душевой', price: 4800,
        desc: 'Монтаж держателя, штанги, подключение шланга',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          ADDON_DRILLING,
        ]
      },
      {
        id: 'faucets-10', name: 'Панель душевая', price: 7000,
        desc: 'Монтаж на стену, подключение к водопроводу, тестирование',
        addons: [
          addonDismantling('старой душевой панели', 1000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'faucets-11', name: 'Комплект душевой встраиваемый', price: 11000,
        desc: 'Монтаж в стену, подключение всех элементов системы',
        addons: [ ADDON_DRILLING ]
      },
      {
        id: 'faucets-12', name: 'Комплект душевой наружного монтажа', price: 4200,
        desc: 'Монтаж, подключение, регулировка',
        addons: [ ADDON_DRILLING ]
      },
    ]
  },

  // ── РАКОВИНЫ И СТОЛЕШНИЦЫ ───────────────────────────────────────────────
  sinks: {
    categoryName: 'Раковины и столешницы',
    services: [
      {
        id: 'sinks-01', name: 'Раковина', price: 4300,
        desc: 'Крепёж к стене или столешнице, подключение к водопроводу и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старой раковины', 1000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'sinks-02', name: 'Раковина с пьедесталом', price: 5000,
        desc: 'Монтаж пьедестала, крепёж раковины, подключение воды и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старой раковины', 1000),
          ADDON_DRILLING,
        ]
      },
    ]
  },

  // ── УНИТАЗЫ, БИДЕ, ПИССУАРЫ ─────────────────────────────────────────────
  toilets: {
    categoryName: 'Унитазы, биде, писсуары',
    services: [
      {
        id: 'toilets-01', name: 'Унитаз-компакт', price: 5500,
        desc: 'Монтаж, подключение к водопроводу и канализации, регулировка бачка',
        addons: [
          { id: 'hyg-shower', name: 'Гигиенический душ со смесителем (вместе дешевле)', price: 3000, hasQty: false, originalPrice: 4400 },
          { id: 'hyg-shower-no', name: 'Гигиенический душ без смесителя (вместе дешевле)', price: 2000, hasQty: false, originalPrice: 2500 },
          addonDismantling('старого унитаза', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'toilets-02', name: 'Унитаз-моноблок', price: 5200,
        desc: 'Монтаж, подключение к водопроводу и канализации',
        addons: [
          { id: 'hyg-shower', name: 'Гигиенический душ со смесителем (вместе дешевле)', price: 3000, hasQty: false, originalPrice: 4400 },
          addonDismantling('старого унитаза', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'toilets-03', name: 'Унитаз подвесной', price: 5000,
        desc: 'Монтаж на инсталляцию, подключение, регулировка',
        addons: [
          { id: 'installation', name: 'Инсталляция (вместе дешевле)', price: 7300, hasQty: false, originalPrice: 10000 },
          { id: 'flush-btn', name: 'Кнопка смыва (вместе дешевле)', price: 700, hasQty: false, originalPrice: 1300 },
          { id: 'hyg-shower', name: 'Гигиенический душ со смесителем', price: 4400, hasQty: false },
          addonDismantling('старого унитаза', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'toilets-04', name: 'Комплект: подвесной унитаз + инсталляция + кнопка смыва', price: 13800,
        desc: 'Полная установка под ключ: инсталляция, унитаз, кнопка смыва',
        addons: [
          { id: 'hyg-shower', name: 'Гигиенический душ со смесителем', price: 4400, hasQty: false },
          addonDismantling('старого унитаза и инсталляции', 4000),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'toilets-05', name: 'Биде напольное', price: 5500,
        desc: 'Монтаж, подключение к водопроводу и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старого биде', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'toilets-06', name: 'Биде подвесное', price: 5000,
        desc: 'Монтаж на инсталляцию, подключение',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          addonDismantling('старого биде', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'toilets-07', name: 'Гигиенический душ со смесителем', price: 4400,
        desc: 'Монтаж держателя, смесителя, подключение к водопроводу',
        addons: [ addonDismantling('старого гигиенического душа', 700), ADDON_DRILLING ]
      },
      {
        id: 'toilets-08', name: 'Гигиенический душ без смесителя', price: 2500,
        desc: 'Монтаж держателя, подключение к существующему смесителю',
        addons: [ ADDON_DRILLING ]
      },
      {
        id: 'toilets-09', name: 'Писсуар подвесной', price: 5000,
        desc: 'Монтаж на инсталляцию или крепление к стене, подключение',
        addons: [ addonDismantling('старого писсуара', 1500), ADDON_DRILLING ]
      },
    ]
  },

  // ── ИНСТАЛЛЯЦИИ ─────────────────────────────────────────────────────────
  installations: {
    categoryName: 'Инсталляции',
    services: [
      {
        id: 'inst-01', name: 'Инсталляция для унитаза', price: 10000,
        desc: 'Монтаж в нишу или к стене, подключение к водопроводу и канализации',
        addons: [
          { id: 'toilet', name: 'Подвесной унитаз (вместе дешевле)', price: 3000, hasQty: false, originalPrice: 5000 },
          { id: 'flush-btn', name: 'Кнопка смыва (вместе дешевле)', price: 700, hasQty: false, originalPrice: 1300 },
          addonDismantling('старой инсталляции', 2500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'inst-02', name: 'Инсталляция для биде', price: 10000,
        desc: 'Монтаж, подключение к водопроводу и канализации',
        addons: [
          addonDismantling('старой инсталляции', 2500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'inst-03', name: 'Инсталляция для раковины', price: 10000,
        desc: 'Монтаж, подключение к водопроводу и канализации',
        addons: [
          addonDismantling('старой инсталляции', 2500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'inst-04', name: 'Кнопка смыва (отдельно)', price: 1300,
        desc: 'Установка кнопки смыва для уже установленной инсталляции',
        addons: []
      },
    ]
  },

  // ── ВАННЫ И КОМПЛЕКТУЮЩИЕ ───────────────────────────────────────────────
  bathtubs: {
    categoryName: 'Ванны и комплектующие',
    services: [
      {
        id: 'bath-01', name: 'Прямоугольная акриловая ванна', price: 8700,
        desc: 'Монтаж на ножки, подключение слива-перелива и канализации, герметизация',
        addons: [
          { id: 'faucet-3', name: 'Смеситель на три отверстия (вместе дешевле)', price: 4200, hasQty: false, originalPrice: 6000 },
          ADDON_SEALING, addonDismantling('старой акриловой ванны', 2000),
        ]
      },
      {
        id: 'bath-02', name: 'Прямоугольная акриловая ванна с гидромассажем', price: 14000,
        desc: 'Монтаж, подключение к водопроводу, канализации и электросети',
        addons: [
          ADDON_SEALING, addonDismantling('старой ванны с гидромассажем', 2500),
        ]
      },
      {
        id: 'bath-03', name: 'Угловая акриловая ванна', price: 10500,
        desc: 'Монтаж на ножки, подключение слива-перелива и канализации',
        addons: [
          ADDON_SEALING, addonDismantling('старой акриловой ванны', 2000),
        ]
      },
      {
        id: 'bath-04', name: 'Стальная ванна', price: 8700,
        desc: 'Монтаж на ножки, подключение слива-перелива и канализации, герметизация',
        addons: [
          ADDON_SEALING, addonDismantling('старой стальной ванны', 2000),
        ]
      },
      {
        id: 'bath-05', name: 'Чугунная ванна', price: 12500,
        desc: 'Монтаж на ножки, подключение слива-перелива и канализации, герметизация',
        addons: [
          ADDON_SEALING, addonDismantling('старой чугунной ванны', 3500),
        ]
      },
      {
        id: 'bath-06', name: 'Карниз для ванны', price: 3500,
        desc: 'Монтаж карниза над ванной, крепёж к стене',
        addons: [ addonDismantling('старого карниза', 500), ADDON_DRILLING ]
      },
      {
        id: 'bath-07', name: 'Экран для ванны до 2 м', price: 2500,
        desc: 'Монтаж экрана, крепёж к полу и ванне',
        addons: []
      },
    ]
  },

  // ── КУХОННЫЕ МОЙКИ И ФИЛЬТРЫ ────────────────────────────────────────────
  kitchen: {
    categoryName: 'Кухонные мойки и фильтры',
    services: [
      {
        id: 'kitchen-01', name: 'Кухонная мойка 1 чаша', price: 3700,
        desc: 'Монтаж в столешницу, подключение к водопроводу и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          { id: 'crusher', name: 'Измельчитель отходов (вместе дешевле)', price: 3800, hasQty: false, originalPrice: 5000 },
          { id: 'worktop-cut', name: 'Пропил в столешнице МДФ/ДСП', price: 2500, hasQty: false },
          { id: 'worktop-cut-stone', name: 'Пропил в столешнице из камня', price: 4500, hasQty: false },
          addonDismantling('старой кухонной мойки', 1000),
        ]
      },
      {
        id: 'kitchen-02', name: 'Кухонная мойка 2 чаши', price: 5300,
        desc: 'Монтаж в столешницу, подключение к водопроводу и канализации',
        addons: [
          { id: 'faucet', name: 'Смеситель (вместе дешевле)', price: 2200, hasQty: false, originalPrice: 3300 },
          { id: 'crusher', name: 'Измельчитель отходов (вместе дешевле)', price: 3800, hasQty: false, originalPrice: 5000 },
          { id: 'worktop-cut', name: 'Пропил в столешнице МДФ/ДСП', price: 2500, hasQty: false },
          addonDismantling('старой кухонной мойки', 1000),
        ]
      },
      {
        id: 'kitchen-03', name: 'Посудомоечная машина', price: 4200,
        desc: 'Подключение к водопроводу, канализации и электросети',
        addons: [ addonDismantling('старой посудомоечной машины', 1500) ]
      },
      {
        id: 'kitchen-04', name: 'Фильтр под мойку', price: 4500,
        desc: 'Монтаж, подключение к водопроводу, установка крана для фильтра',
        addons: [ ADDON_DRILLING ]
      },
      {
        id: 'kitchen-05', name: 'Система обратного осмоса', price: 6400,
        desc: 'Монтаж системы, подключение к водопроводу, установка крана',
        addons: [ ADDON_DRILLING ]
      },
      {
        id: 'kitchen-06', name: 'Измельчитель отходов', price: 5000,
        desc: 'Монтаж под мойку, подключение к канализации и электросети',
        addons: [ addonDismantling('старого измельчителя', 1500) ]
      },
    ]
  },

  // ── ПОЛОТЕНЦЕСУШИТЕЛИ ───────────────────────────────────────────────────
  'towel-rails': {
    categoryName: 'Полотенцесушители',
    services: [
      {
        id: 'towel-01', name: 'Водяной полотенцесушитель', price: 6500,
        desc: 'Демонтаж старого, монтаж нового, подключение к системе ГВС, проверка герметичности',
        addons: [
          addonDismantling('старого водяного полотенцесушителя', 1500),
          ADDON_DRILLING,
        ]
      },
      {
        id: 'towel-02', name: 'Электрический полотенцесушитель', price: 4500,
        desc: 'Монтаж на стену, подключение к электросети',
        addons: [
          addonDismantling('старого электрического полотенцесушителя', 1000),
          ADDON_DRILLING,
        ]
      },
    ]
  },

  // ── ВОДОНАГРЕВАТЕЛИ ─────────────────────────────────────────────────────
  'water-heaters': {
    categoryName: 'Водонагреватели',
    services: [
      {
        id: 'wh-01', name: 'Накопительный водонагреватель до 80 л', price: 6800,
        desc: 'Монтаж на стену, подключение к водопроводу (хол. и гор.) и электросети',
        addons: [ addonDismantling('старого водонагревателя', 1500), ADDON_DRILLING ]
      },
      {
        id: 'wh-02', name: 'Накопительный водонагреватель до 150 л', price: 8500,
        desc: 'Монтаж на стену, подключение к водопроводу и электросети',
        addons: [ addonDismantling('старого водонагревателя', 1500), ADDON_DRILLING ]
      },
      {
        id: 'wh-03', name: 'Накопительный водонагреватель до 200 л', price: 15000,
        desc: 'Монтаж на стену или пол, подключение к водопроводу и электросети',
        addons: [ addonDismantling('старого водонагревателя', 1500) ]
      },
      {
        id: 'wh-04', name: 'Накопительный водонагреватель от 200 л', price: 20000,
        desc: 'Напольный монтаж, подключение к водопроводу и электросети',
        addons: [ addonDismantling('старого водонагревателя', 1500) ]
      },
      {
        id: 'wh-05', name: 'Проточный электрический водонагреватель', price: 6500,
        desc: 'Монтаж, подключение к водопроводу и электросети',
        addons: [ addonDismantling('старого водонагревателя', 1000), ADDON_DRILLING ]
      },
    ]
  },

  // ── ВЕНТИЛЯЦИЯ ─────────────────────────────────────────────────────────
  heating: {
    categoryName: 'Вентиляция',
    services: [
      {
        id: 'heat-03', name: 'Вытяжной вентилятор', price: 3500,
        desc: 'Монтаж в вентиляционное отверстие, подключение к электросети',
        addons: [ ADDON_DRILLING ]
      },
    ]
  },


  // ── ВОДОСНАБЖЕНИЕ ───────────────────────────────────────────────────────
  'water-supply': {
    categoryName: 'Водоснабжение (инженерка)',
    services: [
      {
        id: 'ws-01', name: 'Шаровый кран', price: 1500,
        desc: 'Монтаж, замена или установка нового шарового крана',
        addons: [ addonDismantling('старого крана', 500) ]
      },
      {
        id: 'ws-02', name: 'Счётчик воды', price: 3000,
        desc: 'Монтаж счётчика воды, установка фильтра перед счётчиком',
        addons: [ addonDismantling('старого счётчика', 500) ]
      },
      {
        id: 'ws-03', name: 'Редуктор давления', price: 1500,
        desc: 'Монтаж и настройка редуктора давления воды',
        addons: [ addonDismantling('старого редуктора', 500) ]
      },
      {
        id: 'ws-04', name: 'Магистральный фильтр грубой очистки', price: 1500,
        desc: 'Монтаж, подключение к водопроводу',
        addons: [ addonDismantling('старого фильтра', 500) ]
      },
      {
        id: 'ws-05', name: 'Распределительный коллектор (гребёнка)', price: 7000,
        desc: 'Монтаж и подключение коллектора к системе водоснабжения',
        addons: [ addonDismantling('старого коллектора', 1000) ]
      },
      {
        id: 'ws-06', name: 'Монтаж системы водоснабжения', price: 5000,
        desc: 'Разводка труб, монтаж всех элементов системы. Цена индивидуальна — зависит от объёма работ',
        addons: [ ADDON_DRILLING ]
      },
    ]
  },

  // ── АКСЕССУАРЫ ──────────────────────────────────────────────────────────
  accessories: {
    categoryName: 'Аксессуары',
    services: [
      {
        id: 'acc-01', name: 'Настенные аксессуары (крючки, держатели, мыльницы)', price: 1000,
        desc: 'Крепёж к стене, выравнивание',
        addons: [ ADDON_DRILLING ]
      },
      {
        id: 'acc-02', name: 'Ревизионный люк', price: 6500,
        desc: 'Монтаж ревизионного люка в стену или потолок',
        addons: [ ADDON_DRILLING ]
      },
      {
        id: 'acc-03', name: 'Ревизионный сантехнический лючок', price: 3500,
        desc: 'Монтаж небольшого лючка для доступа к коммуникациям',
        addons: [ ADDON_DRILLING ]
      },
    ]
  },


};
