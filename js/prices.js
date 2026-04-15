/**
 * VanVek — ЕДИНЫЙ ИСТОЧНИК ЦЕН И УСЛУГ
 * =====================================
 * Меняйте цены здесь — они автоматически обновятся:
 *   • в блоке цен на главной странице
 *   • в Schema.org (читается Google, Яндекс)
 *   • в FAQPage Schema (читается ChatGPT, Perplexity, Gemini, Claude)
 *   • в LLM-блоке (скрытый текст для ИИ-краулеров)
 *   • в секции FAQ на странице
 *   • на странице прайс-листа prices.html
 *
 * ФОРМАТ ОДНОЙ ЗАПИСИ:
 *   name:     название услуги
 *   price:    минимальная цена в рублях (число)
 *   unit:     единица измерения (необязательно, по умолчанию 'шт')
 *   category: slug категории из categories-data.js
 *   group:    группа для прайс-листа
 *   note:     пояснение (необязательно)
 */

window.PRICES = [

  // ── МЕБЕЛЬ ДЛЯ ВАННОЙ ───────────────────────────────────────────────────────
  { name: 'Тумба с раковиной до 70 см',              price: 7200,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Тумба с раковиной от 71 см',              price: 8700,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Зеркало до 70 см',                        price: 3500,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Зеркало от 71 до 100 см',                 price: 4500,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Зеркало от 101 см',                       price: 6500,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Зеркало-шкаф до 70 см',                   price: 4300,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Зеркало-шкаф от 71 до 100 см',            price: 5500,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Зеркало-шкаф от 101 см',                  price: 6700,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Настенный шкаф (в сборе)',                price: 3300,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Напольный шкаф (в сборе)',                price: 2500,  category: 'furniture',     group: 'Мебель для ванной' },

  { name: 'Напольный шкаф-пенал (в сборе)',          price: 2500,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Настенный шкаф-пенал (в сборе)',          price: 3300,  category: 'furniture',     group: 'Мебель для ванной' },

  { name: 'Тумба напольная до 70 см',                price: 3700,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Тумба напольная от 71 см',                price: 5600,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Тумба настенная до 70 см',                price: 4400,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Тумба настенная от 71 см',                price: 6700,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Столешница с раковиной до 70 см',         price: 7200,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Столешница с раковиной от 71 см',         price: 8700,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Столешница без раковины до 70 см',        price: 3400,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Столешница без раковины от 71 см',        price: 5200,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Консоль с раковиной',                     price: 7200,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Комод напольный до 70 см',                price: 3700,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Комод напольный от 71 см',                price: 5600,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Светильник для зеркала',                  price: 1500,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Стеклянная полка',                        price: 1300,  category: 'furniture',     group: 'Мебель для ванной' },
  { name: 'Подключение к электросети (мебель с освещением)', price: 1000, category: 'furniture', group: 'Мебель для ванной' },

  // ── ДУШЕВЫЕ КАБИНЫ И ОГРАЖДЕНИЯ ─────────────────────────────────────────────
  { name: 'Душевой уголок до 90 см',                 price: 10000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой уголок от 91 до 100 см',          price: 11500,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой уголок от 101 до 110 см',         price: 12500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой уголок от 111 см',                price: 14500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Шторка стеклянная на ванну до 139 см',    price: 7500,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Шторка стеклянная на ванну от 140 см',    price: 9000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Угловая шторка на ванну',                 price: 11500,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая дверь в нишу до 90 см',           price: 9000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая дверь в нишу до 110 см',          price: 10500,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая дверь в нишу до 130 см',          price: 12000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая дверь в нишу до 150 см',          price: 13000, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая дверь в нишу от 150 см',          price: 15000, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая перегородка до 90 см',            price: 9000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая перегородка до 110 см',           price: 10500,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая перегородка до 130 см',           price: 12000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая перегородка до 150 см',           price: 13000, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая перегородка от 150 см',           price: 15000, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой поддон акрил/сталь до 110 см',    price: 6000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой поддон акрил/сталь до 150 см',    price: 8000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой поддон акрил/сталь от 150 см',    price: 9000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой поддон чугун/керамика до 100 см', price: 8500,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой поддон чугун/керамика до 140 см', price: 14000, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой поддон чугун/керамика от 140 см', price: 16500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина до 90 см (без пара)',       price: 12000,  category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина до 100 см (без пара)',      price: 13500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина до 110 см (без пара)',      price: 15000, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина от 111 см (без пара)',      price: 17500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина до 90 см (с паром)',        price: 15000, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина до 100 см (с паром)',       price: 16500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина до 110 см (с паром)',       price: 17500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевая кабина от 111 см (с паром)',       price: 19500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой бокс до 150 см (без пара)',        price: 18500, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой бокс до 170 см (без пара)',        price: 20700, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой бокс до 150 см (с паром)',         price: 20700, category: 'showers',       group: 'Душевые кабины и ограждения' },
  { name: 'Душевой бокс до 170 см (с паром)',         price: 23500, category: 'showers',       group: 'Душевые кабины и ограждения' },

  // ── СМЕСИТЕЛИ И ДУШ ─────────────────────────────────────────────────────────
  { name: 'Смеситель для раковины',                  price: 3300,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель для ванны с душем',             price: 3300,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель для душа',                      price: 3300,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель для кухни',                     price: 3300,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель для биде',                      price: 3300,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель с термостатом',                 price: 4300,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель бесконтактный',                 price: 5500,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель встраиваемый',                  price: 9000,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель на два отверстия',              price: 5000,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель на три отверстия',              price: 6000,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Смеситель на четыре отверстия',           price: 7500,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Кран',                                    price: 2500,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Стойка душевая',                          price: 4200,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Штанга душевая',                          price: 2500,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Гарнитур душевой',                        price: 4800,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Панель душевая',                          price: 7000,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Комплект душевой встраиваемый',           price: 11000, category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Комплект душевой наружного монтажа',      price: 4200,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Верхний душ',                             price: 2500,  category: 'faucets',       group: 'Смесители и душ' },
  { name: 'Встраиваемый переключатель потоков',      price: 9000,  category: 'faucets',       group: 'Смесители и душ' },

  // ── РАКОВИНЫ И СТОЛЕШНИЦЫ ───────────────────────────────────────────────────
  { name: 'Раковина',                                price: 4300,  category: 'sinks',         group: 'Раковины и столешницы' },
  { name: 'Раковина с пьедесталом',                  price: 5000,  category: 'sinks',         group: 'Раковины и столешницы' },

  // ── УНИТАЗЫ, БИДЕ, ПИССУАРЫ ─────────────────────────────────────────────────
  { name: 'Унитаз-компакт',                          price: 5500,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Унитаз-моноблок',                         price: 5200,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Унитаз подвесной',                        price: 5000,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Унитаз со средним бачком',                price: 6800,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Унитаз с высоким бачком',                 price: 6300,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Бачок для унитаза',                       price: 3500,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Бачок скрытого монтажа',                  price: 6800,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Крышка-сиденье унитаза (отдельно)',       price: 2000,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Комплект: подвесной унитаз + инсталляция + кнопка смыва', price: 13800, category: 'toilets', group: 'Унитазы, биде, писсуары' },
  { name: 'Биде напольное',                          price: 5500,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Биде подвесное',                          price: 5000,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Гигиенический душ со смесителем',         price: 4400,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Гигиенический душ без смесителя',         price: 2500,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Писсуар напольный',                       price: 5500,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },
  { name: 'Писсуар подвесной',                       price: 5000,  category: 'toilets',       group: 'Унитазы, биде, писсуары' },

  // ── ИНСТАЛЛЯЦИИ ─────────────────────────────────────────────────────────────
  { name: 'Инсталляция для унитаза',                 price: 10000,  category: 'installations', group: 'Инсталляции' },
  { name: 'Инсталляция для биде',                    price: 10000,  category: 'installations', group: 'Инсталляции' },
  { name: 'Инсталляция для писсуара',                price: 10000,  category: 'installations', group: 'Инсталляции' },
  { name: 'Инсталляция для раковины',                price: 10000,  category: 'installations', group: 'Инсталляции' },
  { name: 'Кнопка смыва (отдельно)',                 price: 1300,  category: 'installations', group: 'Инсталляции' },

  // ── ВАННЫ И КОМПЛЕКТУЮЩИЕ ───────────────────────────────────────────────────
  { name: 'Прямоугольная акриловая ванна',           price: 8700,  category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Прямоугольная акриловая ванна с гидромассажем', price: 14000, category: 'bathtubs', group: 'Ванны и комплектующие' },
  { name: 'Угловая акриловая ванна',                 price: 10500,  category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Угловая акриловая ванна с гидромассажем', price: 16000, category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Стальная ванна',                          price: 8700,  category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Чугунная ванна',                          price: 12500,  category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Ванна из литьевого мрамора',              price: 25000, category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Карниз для ванны',                        price: 3500,  category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Экран для ванны до 2 м',                  price: 2500,  category: 'bathtubs',      group: 'Ванны и комплектующие' },
  { name: 'Экран для ванны от 2 м',                  price: 2500,  category: 'bathtubs',      group: 'Ванны и комплектующие' },

  // ── КУХОННЫЕ МОЙКИ И ФИЛЬТРЫ ────────────────────────────────────────────────
  { name: 'Кухонная мойка 1 чаша',                   price: 3700,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Кухонная мойка 2 чаши',                   price: 5300,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Комплект мойки и смесителя',              price: 6600,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Комплект мойки и измельчителя',           price: 8000,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Фильтр под мойку',                        price: 4500,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Система обратного осмоса',                price: 6400,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Кран для питьевой воды',                  price: 3300,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Измельчитель отходов',                    price: 5000,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },
  { name: 'Посудомоечная машина',                    price: 4200,  category: 'kitchen',       group: 'Кухонные мойки и фильтры' },

  // ── СЛИВ И КАНАЛИЗАЦИЯ ──────────────────────────────────────────────────────
  { name: 'Сифон для раковины/мойки',                price: 2000,  category: 'drainage',      group: 'Слив и канализация' },
  { name: 'Сифон для поддона',                       price: 2000,  category: 'drainage',      group: 'Слив и канализация' },
  { name: 'Сифон для биде',                          price: 2000,  category: 'drainage',      group: 'Слив и канализация' },
  { name: 'Слив-перелив для ванны',                  price: 3500,  category: 'drainage',      group: 'Слив и канализация' },
  { name: 'Сифон для душевого лотка',                price: 2000,  category: 'drainage',      group: 'Слив и канализация' },
  { name: 'Монтаж точки водоотвода',                 price: 3500,  category: 'drainage',      group: 'Слив и канализация' },
  { name: 'Фановая труба лежак D=100 мм (м.п.)',     price: 500,   category: 'drainage',      group: 'Слив и канализация', unit: 'м.п.' },
  { name: 'Фановая труба лежак D=50 мм (м.п.)',      price: 400,   category: 'drainage',      group: 'Слив и канализация', unit: 'м.п.' },

  // ── ПОЛОТЕНЦЕСУШИТЕЛИ ───────────────────────────────────────────────────────
  { name: 'Водяной полотенцесушитель',               price: 6500,  category: 'towel-rails',   group: 'Отопление и климат' },
  { name: 'Электрический полотенцесушитель',         price: 4500,  category: 'towel-rails',   group: 'Отопление и климат' },

  // ── ВЕНТИЛЯЦИЯ ─────────────────────────────────────────────────────────────
  { name: 'Вытяжной вентилятор',                     price: 3500,  category: 'heating',       group: 'Вентиляция' },

  // ── ВОДОНАГРЕВАТЕЛИ ─────────────────────────────────────────────────────────
  { name: 'Накопительный водонагреватель до 80 л',   price: 6800,  category: 'water-heaters', group: 'Водонагреватели' },
  { name: 'Накопительный водонагреватель до 150 л',  price: 8500,  category: 'water-heaters', group: 'Водонагреватели' },
  { name: 'Накопительный водонагреватель до 200 л',  price: 15000, category: 'water-heaters', group: 'Водонагреватели' },
  { name: 'Накопительный водонагреватель от 200 л',  price: 20000, category: 'water-heaters', group: 'Водонагреватели' },
  { name: 'Проточный электрический водонагреватель', price: 6500,  category: 'water-heaters', group: 'Водонагреватели' },

  // ── ВОДОСНАБЖЕНИЕ ───────────────────────────────────────────────────────────
  { name: 'Шаровый кран',                            price: 1500,   category: 'water-supply',  group: 'Водоснабжение' },
  { name: 'Редуктор давления',                       price: 1500,  category: 'water-supply',  group: 'Водоснабжение' },
  { name: 'Счётчик воды',                            price: 3000,  category: 'water-supply',  group: 'Водоснабжение' },
  { name: 'Магистральный фильтр грубой очистки',     price: 1500,   category: 'water-supply',  group: 'Водоснабжение' },
  { name: 'Магистральный фильтр тонкой очистки',     price: 1500,   category: 'water-supply',  group: 'Водоснабжение' },
  { name: 'Распределительный коллектор (гребёнка)',  price: 7000,  category: 'water-supply',  group: 'Водоснабжение' },
  { name: 'Монтаж системы водоснабжения',            price: 5000,  category: 'water-supply',  group: 'Водоснабжение', note: 'цена индивидуальна' },

  // ── АКСЕССУАРЫ ──────────────────────────────────────────────────────────────
  { name: 'Настенные аксессуары (крючки, держатели)', price: 1000, category: 'accessories',   group: 'Аксессуары' },
  { name: 'Ревизионный люк',                         price: 6500,  category: 'accessories',   group: 'Аксессуары' },
  { name: 'Ревизионный сантехнический лючок',        price: 3500,  category: 'accessories',   group: 'Аксессуары' },

  // ── БЫТОВАЯ ТЕХНИКА ─────────────────────────────────────────────────────────
  { name: 'Стиральная машина',                       price: 4200,  category: 'appliances',    group: 'Бытовая техника' },

  // ── СВЕРЛЕНИЕ И ШТРОБЛЕНИЕ ──────────────────────────────────────────────────
  { name: 'Сверление в керамограните (до 12 мм)',    price: 450,   category: 'drilling',      group: 'Сверление и штробление' },
  { name: 'Отверстие в керамике от 24 мм',           price: 1500,  category: 'drilling',      group: 'Сверление и штробление' },
  { name: 'Отверстие в керамограните от 24 мм',      price: 2000,  category: 'drilling',      group: 'Сверление и штробление' },
  { name: 'Штроба по бетону',                        price: 2000,  category: 'drilling',      group: 'Сверление и штробление', unit: 'м.п.' },
  { name: 'Штроба по кирпичу',                       price: 1500,  category: 'drilling',      group: 'Сверление и штробление', unit: 'м.п.' },
  { name: 'Пропил под мойку в столешнице МДФ/ДСП',  price: 2500,  category: 'drilling',      group: 'Сверление и штробление' },
  { name: 'Пропил под мойку в столешнице из камня',  price: 4500,  category: 'drilling',      group: 'Сверление и штробление' },

  // ── ДЕМОНТАЖ ────────────────────────────────────────────────────────────────
  { name: 'Демонтаж тумбы с раковиной',              price: 2500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж зеркала',                        price: 500,   category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж зеркала-шкафа',                  price: 1300,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж шкафа',                          price: 1300,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж тумбы',                          price: 1500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж душевого уголка',                price: 3000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж душевого уголка с поддоном',     price: 4000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж шторки на ванну',                price: 2500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж душевой двери',                  price: 3000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж душевого поддона',               price: 2000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж душевой кабины',                 price: 4000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж душевого бокса',                 price: 5000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж смесителя',                      price: 800,   category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж стойки душевой',                 price: 1300,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж раковины',                       price: 1500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж унитаза',                        price: 2500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж биде',                           price: 2500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж инсталляции',                    price: 3300,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж акриловой ванны',                price: 2500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж чугунной ванны',                 price: 5000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж ванны с гидромассажем',          price: 3500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж кухонной мойки',                 price: 2000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж полотенцесушителя водяного',     price: 2000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж полотенцесушителя электрического', price: 1500, category: 'dismantling',  group: 'Демонтаж' },
  { name: 'Демонтаж водонагревателя накопительного', price: 2000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж радиатора отопления',            price: 2500,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж стиральной машины',              price: 2000,  category: 'dismantling',   group: 'Демонтаж' },
  { name: 'Демонтаж посудомоечной машины',           price: 2000,  category: 'dismantling',   group: 'Демонтаж' },

];

/**
 * ИНФОРМАЦИЯ О КОМПАНИИ — тоже централизована
 */
window.COMPANY_INFO = {
  name:        'VanVek',
  phone_msk:   '8 800 333-33-33',
  phone_spb:   '8 800 333-33-33',
  website:     'https://vanvek.ru',
  founded:     2022,
  years:       4,
  orders:      9500,
  guarantee:   '1 год',
  cities:      ['Москва'],
  priceFrom:   450,
  servicesCount: 150,
  partner:     'Сантехника-онлайн',
  description: 'Профессиональная установка сантехники в Москве по фиксированной цене. Онлайн-заказ без звонков. Выезд в день заказа. Гарантия 1 год. Официальный договор. Более 9 500 выполненных заказов. На рынке с 2022 года. Официальный партнёр гипермаркета Сантехника-онлайн.',
};
