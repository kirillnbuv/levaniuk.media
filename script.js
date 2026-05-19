// Правки 3 та 4: Змінено структуру. 
// Тепер кожна серія має 'title' (підпис під фото), 
// 'tags' (слова для пошуку, наприклад параметри камери чи жанр), 
// та масив 'images' з назвами файлів.
const galleries = [
    {
        title: "Дерева в лісі",
        tags: "чб природа дерева ліс f/8 ISO400",
        images: [
            '20260424001.webp', 
            '20260424002.webp', 
            '20260424003.webp',
            '20260424004.webp',
            '20260424005.webp'
        ]
    },
    {
        title: "Міська архітектура",
        tags: "місто будівлі вулиця репортаж",
        images: [
            '20260426001.webp',
            '20260426002.webp',
            '20260426003.webp'
        ]
    },
    {
        title: "Тіні на вікні",
        tags: "світло тіні абстракція інтерєр",
        images: [
            '20260428001.webp',
            '20260428002.webp'
        ]
    }
];

const galleryContainer = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentGallery = [];
let currentPhotoIndex = 0;

// Генеруємо сітку з можливістю фільтрації (Пошук)
function renderGallery(filterText = '') {
    galleryContainer.innerHTML = '';
    const lowerFilter = filterText.toLowerCase();
    
    galleries.forEach((series, index) => {
        // Логіка пошуку: перевіряємо чи є введений текст у title або у tags
        const matchTitle = series.title.toLowerCase().includes(lowerFilter);
        const matchTags = series.tags.toLowerCase().includes(lowerFilter);
        
        // Якщо текст пошуку не збігається, пропускаємо цю серію
        if (!matchTitle && !matchTags) return;
        
        if (series.images.length === 0) return;
        
        // Створюємо картку, яка триматиме і фото, і підпис
        const card = document.createElement('div');
        card.classList.add('gallery-card');
        
        // Контейнер самого зображення (квадрат)
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.src = 'img/' + series.images[0]; // Перше фото як обкладинка
        img.alt = series.title;
        img.loading = 'lazy';
        
        div.addEventListener('click', () => openLightbox(index));
        div.appendChild(img);
        
        // Підпис під фото
        const caption = document.createElement('div');
        caption.classList.add('gallery-caption');
        caption.innerText = series.title; // Виводимо заголовок з масиву
        
        // Збираємо картку до купи
        card.appendChild(div);
        card.appendChild(caption);
        
        galleryContainer.appendChild(card);
    });
}

// Слухач для поля пошуку: оновлює галерею при кожному введеному символі
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderGallery(e.target.value);
    });
}

// Відкриваємо лайтбокс
function openLightbox(galleryIndex) {
    // Беремо масив images з обраного об'єкта
    currentGallery = galleries[galleryIndex].images; 
    currentPhotoIndex = 0;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Оновлюємо картинку та стрілки
function updateLightboxImage() {
    lightboxImg.src = 'img/' + currentGallery[currentPhotoIndex];
    
    if (currentGallery.length <= 1) {
        prevBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'hidden';
    } else {
        prevBtn.style.visibility = 'visible';
        nextBtn.style.visibility = 'visible';
    }
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNext() {
    if (currentGallery.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % currentGallery.length;
    updateLightboxImage();
}

function showPrev() {
    if (currentGallery.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
}

closeBtn.addEventListener('click', closeLightbox);

prevBtn.removeEventListener('click', showNext);
nextBtn.removeEventListener('click', showPrev);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    }
});

// Форма контактів
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formSuccess.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 4000);
    });
}

// Запуск галереї при завантаженні сторінки
renderGallery();
