// Масив з вашими фотографіями. 
// Замініть ці посилання на реальні лінки на ваші фото, коли завантажите їх на GitHub.
const images = [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000',
    'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000',
    'https://images.unsplash.com/photo-1502982720700-baf97d4220a0?q=80&w=1000',
    'https://images.unsplash.com/photo-1516214104703-d2507f0144eb?q=80&w=1000',
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000',
    'https://images.unsplash.com/photo-1506744626753-1fa7604d4501?q=80&w=1000',
    'https://images.unsplash.com/photo-1511407397940-d57f68e81203?q=80&w=1000'
];

const galleryContainer = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Функція для генерування галереї на сторінці
function renderGallery() {
    images.forEach((src, index) => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Gallery photo ${index + 1}`;
        img.loading = 'lazy'; // Оптимізація завантаження
        
        // Подія кліку по превью для відкриття лайтбоксу
        div.addEventListener('click', () => openLightbox(index));
        
        div.appendChild(img);
        galleryContainer.appendChild(div);
    });
}

// Відкриття фото на чорному фоні
function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Забороняємо скрол сторінки під низом
}

// Оновлення зображення в лайтбоксі
function updateLightboxImage() {
    lightboxImg.src = images[currentIndex];
}

// Закриття лайтбоксу
function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Повертаємо скрол
}

// Перемикання на попереднє фото
function showPrev() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateLightboxImage();
}

// Перемикання на наступне фото
function showNext() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateLightboxImage();
}

// Призначаємо події для кнопок лайтбоксу
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Закриття лайтбоксу при кліку на чорний фон повз фотографію
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Підтримка керування стрілками на клавіатурі
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    }
});

// Запускаємо рендер галереї при завантаженні сторінки
renderGallery();