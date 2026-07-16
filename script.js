const projectDetails = {
  maxx: {
    title: 'Maxx CRM',
    lead: 'Платформа для управления игровыми кампаниями, сегментами аудитории, наградами и виджетами.',
    problem: 'Нужно было реализовать крупный модуль геймификации, который другие разработчики оценили в два месяца.',
    action: 'Спроектировал и реализовал игровые сценарии, серверную логику, интерфейс, виджеты и панель управления.',
    result: 'Модуль был готов за две недели вместо первоначальной оценки в два месяца.',
    images: [
      { src: './images/maxx-crm/campaigns.png', alt: 'Редактор кампании в Maxx CRM' },
      { src: './images/maxx-crm/segments.png', alt: 'Сегменты пользователей в Maxx CRM' },
      { src: './images/maxx-crm/templates.png', alt: 'Шаблоны в Maxx CRM' },
      { src: './images/maxx-crm/widgets.png', alt: 'Виджеты в Maxx CRM' }
    ]
  },
  tbank: {
    title: 'Т-Банк',
    lead: 'Клиентское веб-приложение интернет-банка для управления счетами, платежами и банковскими продуктами.',
    problem: 'Из-за способа подключения кода для поддержки разных браузеров интернет-банк загружался медленнее, а продуктовым командам было сложнее выпускать изменения.',
    action: 'Переработал механизм загрузки этого кода в ядре приложения, которое объединяло множество независимых разделов.',
    result: 'Загрузка интернет-банка ускорилась на 15%, а подключение изменений для продуктовых команд стало проще.',
    images: [
      { src: './images/tbank/tbank.png', alt: 'Интернет-банк Т-Банка на компьютере и смартфоне' }
    ]
  },
  toonspace: {
    title: 'ToonSpace',
    lead: 'Приложение для чтения веб-комиксов с каталогом, жанрами и персональными рекомендациями.',
    problem: 'Нужно было с нуля создать первую версию приложения и рабочий процесс генерации контента для веб-комиксов.',
    action: 'Собрал приложение и процесс генерации изображений на Stable Diffusion и ComfyUI, работая вместе с художниками и дизайнерами.',
    result: 'Первая версия приложения и процесс создания контента были готовы примерно за три месяца.',
    images: [
      { src: './images/toonspace/toonspace-1.webp', alt: 'Главный экран приложения ToonSpace' },
      { src: './images/toonspace/toonspace-2.webp', alt: 'Поиск и жанры в ToonSpace' },
      { src: './images/toonspace/toonspace-3.webp', alt: 'Персональные рекомендации в ToonSpace' }
    ]
  },
  piggybank: {
    title: 'PiggyBank',
    lead: 'Telegram-игра с баскетбольной механикой, развитием игрока, заданиями и наградами.',
    problem: 'Разработка игрового ядра с нуля увеличивала бюджет и откладывала запуск примерно на месяц.',
    action: 'Нашёл готовую технологическую основу, адаптировал её под продукт и добавил нужные игровые механики, Telegram и цифровые активы.',
    result: 'Проект вышел на рынок примерно на месяц раньше, а в бюджете сохранили около $10 000.',
    images: [
      { src: './images/piggybank/main.jpg', alt: 'Главный игровой экран PiggyBank' },
      { src: './images/piggybank/5390934420870599739.jpg', alt: 'Дополнительный экран PiggyBank' },
      { src: './images/piggybank/5390934420870599740.jpg', alt: 'Игровые функции PiggyBank' }
    ]
  },
  coinhunters: {
    title: 'CoinHunters',
    lead: 'Telegram-игра с боями, картой, созданием предметов и системой наград.',
    problem: 'Нужно было быстро выпустить играбельную первую версию и проверить продукт на реальных пользователях.',
    action: 'Определил состав MVP и собрал первую рабочую версию с основными игровыми механиками.',
    result: 'MVP вышел примерно за один месяц. Проект занял свою нишу и продолжает работать.',
    images: [
      { src: './images/coinhunter/main.jpg', alt: 'Главный экран игры CoinHunters' },
      { src: './images/coinhunter/map.jpg', alt: 'Игровая карта CoinHunters' },
      { src: './images/coinhunter/craft.jpg', alt: 'Создание предметов в CoinHunters' },
      { src: './images/coinhunter/wheel.jpg', alt: 'Колесо наград в CoinHunters' }
    ]
  }
};

const modal = document.querySelector('#project-modal');
const modalTitle = document.querySelector('#modal-title');
const modalLead = document.querySelector('#modal-lead');
const modalProblem = document.querySelector('#modal-problem');
const modalAction = document.querySelector('#modal-action');
const modalResult = document.querySelector('#modal-result');
const modalGallery = document.querySelector('#modal-gallery');
const modalGalleryImage = document.querySelector('#modal-gallery-image');
const modalGalleryPrevious = document.querySelector('#modal-gallery-prev');
const modalGalleryNext = document.querySelector('#modal-gallery-next');
const modalGalleryCounter = document.querySelector('#modal-gallery-counter');
const modalGalleryThumbnails = document.querySelector('#modal-gallery-thumbnails');
const feed = document.querySelector('.feed');
const feedContent = document.querySelector('.feed-content');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lastFocused = null;
let activeGallery = [];
let activeGalleryIndex = 0;
let galleryThumbnailButtons = [];
let feedWidthFrame = null;

function updateFeedWidth() {
  feedWidthFrame = null;
  const horizontalMargin = window.innerWidth <= 620 ? 36 : 40;
  const availableWidth = Math.max(0, window.innerWidth - horizontalMargin);
  const baseWidth = Math.min(540, availableWidth);
  const targetWidth = Math.min(baseWidth * 1.7, availableWidth);

  if (reducedMotion.matches) {
    feedContent.style.width = `${targetWidth}px`;
    return;
  }

  const feedTop = feed.getBoundingClientRect().top;
  const animationStart = window.innerHeight * .96;
  const animationEnd = window.innerHeight * .25;
  const rawProgress = (animationStart - feedTop) / (animationStart - animationEnd);
  const progress = Math.min(1, Math.max(0, rawProgress));
  const easedProgress = progress * progress * (3 - 2 * progress);
  const width = baseWidth + (targetWidth - baseWidth) * easedProgress;

  feedContent.style.width = `${width.toFixed(2)}px`;
}

function requestFeedWidthUpdate() {
  if (feedWidthFrame !== null) return;
  feedWidthFrame = window.requestAnimationFrame(updateFeedWidth);
}

function showGalleryImage(index) {
  if (!activeGallery.length) return;

  activeGalleryIndex = (index + activeGallery.length) % activeGallery.length;
  const image = activeGallery[activeGalleryIndex];
  modalGalleryImage.src = image.src;
  modalGalleryImage.alt = image.alt;
  modalGalleryCounter.textContent = `${activeGalleryIndex + 1} / ${activeGallery.length}`;

  galleryThumbnailButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === activeGalleryIndex;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function showProjectGallery(images = []) {
  activeGallery = images;
  activeGalleryIndex = 0;
  galleryThumbnailButtons = [];
  modalGalleryThumbnails.replaceChildren();
  modalGallery.hidden = activeGallery.length === 0;

  if (!activeGallery.length) return;

  activeGallery.forEach((image, index) => {
    const button = document.createElement('button');
    const thumbnail = document.createElement('img');

    button.className = 'modal-gallery-thumbnail';
    button.type = 'button';
    button.setAttribute('aria-label', `Показать изображение ${index + 1}`);
    button.addEventListener('click', () => showGalleryImage(index));

    thumbnail.src = image.src;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    thumbnail.decoding = 'async';
    button.append(thumbnail);
    modalGalleryThumbnails.append(button);
    galleryThumbnailButtons.push(button);
  });

  const hasMultipleImages = activeGallery.length > 1;
  modalGalleryPrevious.hidden = !hasMultipleImages;
  modalGalleryNext.hidden = !hasMultipleImages;
  modalGalleryCounter.hidden = !hasMultipleImages;
  modalGalleryThumbnails.hidden = !hasMultipleImages;
  showGalleryImage(0);
}

function openModal(projectId) {
  const project = projectDetails[projectId];
  if (!project) return;

  lastFocused = document.activeElement;
  modalTitle.textContent = project.title;
  modalLead.textContent = project.lead;
  modalProblem.textContent = project.problem;
  modalAction.textContent = project.action;
  modalResult.textContent = project.result;
  showProjectGallery(project.images);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

modalGalleryPrevious.addEventListener('click', () => showGalleryImage(activeGalleryIndex - 1));
modalGalleryNext.addEventListener('click', () => showGalleryImage(activeGalleryIndex + 1));

document.querySelectorAll('.project-card').forEach((card) => {
  const activate = () => openModal(card.dataset.project);
  card.addEventListener('click', activate);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('is-open')) return;

  if (event.key === 'Escape') closeModal();
  if (event.key === 'ArrowLeft' && activeGallery.length > 1) showGalleryImage(activeGalleryIndex - 1);
  if (event.key === 'ArrowRight' && activeGallery.length > 1) showGalleryImage(activeGalleryIndex + 1);
});

window.addEventListener('scroll', requestFeedWidthUpdate, { passive: true });
window.addEventListener('resize', requestFeedWidthUpdate);
reducedMotion.addEventListener('change', requestFeedWidthUpdate);
requestFeedWidthUpdate();
