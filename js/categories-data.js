/**
 * Categories — реальные фото товаров (как на santehnika-online.ru)
 */

function img(url, alt) {
  return `<img src="${url}" alt="${alt}" style="width:80px;height:80px;object-fit:contain;display:block;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.12));" loading="lazy" onerror="this.style.display='none'">`;
}

window.STATIC_PAGES = {
  contacts: {
    title: 'Контакты',
    desc: 'Телефоны, адреса и форма обратной связи',
    navKey: 'contacts'
  },
  reviews: {
    title: 'Отзывы клиентов',
    desc: 'Реальные отзывы с Яндекс.Карт, 2GIS и Google',
    navKey: 'reviews'
  },
  about: {
    title: 'О компании',
    desc: 'VANVEK — профессиональная установка сантехники с 2022 года',
    navKey: 'about'
  },
  faq: {
    title: 'Часто задаваемые вопросы',
    desc: 'Ответы на популярные вопросы об установке сантехники',
    navKey: 'faq'
  },
  works: {
    title: 'Наши работы',
    desc: 'Примеры выполненных работ в Москве',
    navKey: 'works'
  }
};

window.CATEGORIES = [
  {
    slug: 'furniture',
    name: 'Мебель для ванной',
    desc: 'Тумбы, шкафы, зеркала',
    bg: '#f0f4fb',
    icon: img('https://static.santehnika-online.ru/static/26hRa9p2wdqKI6nTsffdjatllHUlbmBd06ma8VU3ADA/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8xMy5wbmc_ZGF0ZT0xNzE4MDg4MTMz.png', 'Мебель для ванной')
  },
  {
    slug: 'showers',
    name: 'Душевые кабины и ограждения',
    desc: 'Кабины, поддоны, ограждения',
    bg: '#f0f4fb',
    icon: img('https://static.santehnika-online.ru/static/6ZFesBdrLauwxvAeiJy8ACVwawm__oUTANZ4OhZA0LQ/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8zLnBuZz9kYXRlPTE3MTgwOTA1NDM.png', 'Душевые кабины')
  },
  {
    slug: 'faucets',
    name: 'Смесители и душ',
    desc: 'Смесители для ванны и умывальника',
    bg: '#f0f4fb',
    icon: img('https://static.santehnika-online.ru/static/V2RhUqZA-9eq52YdUrXE9oiVJ2F-2xANOz0J_kQ7P90/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8xMC5wbmc_ZGF0ZT0xNzU2MjAwMzcw.png', 'Смесители и душ')
  },
  {
    slug: 'sinks',
    name: 'Раковины и столешницы',
    desc: 'Накладные и встраиваемые раковины',
    bg: '#f0f4fb',
    icon: img('https://static.santehnika-online.ru/static/k8BQuQNlKjA5zMpHQo8fHsvyCWBxdOpSywVcjH7LkGc/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8xMS5wbmc_ZGF0ZT0xNzE4MDk1OTMy.png', 'Раковины и столешницы')
  },
  {
    slug: 'toilets',
    name: 'Унитазы, биде, писсуары',
    desc: 'Напольные и подвесные унитазы',
    bg: '#f0f4fb',
    icon: img('https://static.santehnika-online.ru/static/4epIKd2lSnnpe3_ex-_2Ka0YiqlXfvkp48z0hWi6YoY/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi85LnBuZz9kYXRlPTE3MTgxMDA3NDg.png', 'Унитазы биде писсуары')
  },
  {
    slug: 'installations',
    name: 'Инсталляции',
    desc: 'Скрытые системы для унитазов',
    bg: '#f0f4fb',
    icon: img('https://static.santehnika-online.ru/static/7_5YuEW62IGvCOHcil7vjhzdwvFCxuOeRs9Jo-iAuP4/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8zMDMxLnBuZz9kYXRlPTE3MTgxMDEzNDU.png', 'Инсталляции')
  },
  {
    slug: 'bathtubs',
    name: 'Ванны и комплектующие',
    desc: 'Акриловые и стальные ванны',
    bg: '#f0f4fb',
    icon: img('https://static.santehnika-online.ru/static/tm-21cAsZqhjXdByPFdOW5Ii9i4vfb_ch6XzjXfkxpc/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8yLnBuZz9kYXRlPTE3MTgxMDIwMDM.png', 'Ванны и комплектующие')
  },
  {
    slug: 'kitchen',
    name: 'Кухонные мойки и фильтры',
    desc: 'Мойки, смесители, фильтры',
    bg: '#f5f2ee',
    icon: img('https://static.santehnika-online.ru/static/brni9k8q1ob-ghk1wujbGHJJNvu8rU9X041-l88_yFo/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8xMi5wbmc_ZGF0ZT0xNzE4MTAyNjAy.png', 'Кухонные мойки и фильтры')
  },
  {
    slug: 'towel-rails',
    name: 'Полотенцесушители',
    desc: 'Водяные и электрические',
    bg: '#f2f5f0',
    icon: img('https://static.santehnika-online.ru/static/QAVY92c5VgEVCVvcwVWNUPiuhE9lNvSe-TGS19KziBw/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8xNi5wbmc_ZGF0ZT0xNzE4MTAzMjAy.png', 'Полотенцесушители')
  },
  {
    slug: 'water-heaters',
    name: 'Водонагреватели',
    desc: 'Бойлеры накопительные и проточные',
    bg: '#f2f5f0',
    icon: img('https://static.santehnika-online.ru/static/nQ-itsxfhI36v7eMpZv4zfsXJ6scZL-ypPP8DKi4iJQ/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8yODMzLnBuZz9kYXRlPTE3MTgxMDMyMDI.png', 'Водонагреватели')
  },
  {
    slug: 'accessories',
    name: 'Аксессуары',
    desc: 'Крючки, держатели, полки',
    bg: '#f2f5f0',
    icon: img('https://static.santehnika-online.ru/static/UiLZO-Ng9MjIvrfYzSCIMyqwVYux7ZdHyc5C9GzO3BY/g:no/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLndlYnNpdGUueWFuZGV4Y2xvdWQubmV0L3BpY3R1cmVzL2luc3RhbGxhdGlvbi8yODMwLnBuZz9kYXRlPTE3MTgxMDM4MDQ.png', 'Аксессуары')
  },

  {
    slug: 'water-supply',
    name: 'Водоснабжение (инженерка)',
    desc: 'Монтаж систем водоснабжения',
    bg: '#f2f5f0',
    icon: img('img-water-supply.png', 'Водоснабжение')
  }
];
