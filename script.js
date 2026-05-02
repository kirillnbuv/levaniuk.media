// Кожна квадратна дужка [] всередині - це окрема серія/зйомка.
// Додавайте сюди ваші назви файлів у форматі yyyymmddnnn.webp
const galleries = [
    // Серія 1
    [
        '20260424001.webp', 
        '20260424002.webp', 
        '20260424003.webp',
        '20260424004.webp',
        '20260424005.webp',
    ],
    // Серія 2
    [
        '20260426001.webp',
        '20260426002.webp',
        '20260426003.webp'
    ],
    // Серія 3
    [
        '20260428001.webp',
        '20260428002.webp'
    ]
];

const galleryContainer = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentGallery = [];
let currentPhotoIndex = 0;

// Генеруємо сітку превью
function renderGallery() {
    galleryContainer.innerHTML = '';
    
    galleries.forEach((series, index) => {
        if (series.length === 0) return;
        
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.src = 'img/' + series[0];
        img.alt = `Gallery preview ${index + 1}`;
        img.loading = 'lazy';
        
        div.addEventListener('click', () => openLightbox(index));
        div.appendChild(img);
        galleryContainer.appendChild(div);
    });
}

// Відкриваємо лайтбокс
function openLightbox(galleryIndex) {
    currentGallery = galleries[galleryIndex];
    currentPhotoIndex = 0;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Оновлюємо картинку та стрілки
function updateLightboxImage() {
    lightboxImg.src = 'img/' + currentGallery[currentPhotoIndex];
    
    // Виправлення: використовуємо visibility щоб не зміщувати layout
    if (currentGallery.length <= 1) {
        prevBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'hidden';
    } else {
        prevBtn.style.visibility = 'visible';
        nextBtn.style.visibility = 'visible';
    }
}

// Закриття
function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Наступне фото
function showNext() {
    if (currentGallery.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % currentGallery.length;
    updateLightboxImage();
}

// Попереднє фото
function showPrev() {
    if (currentGallery.length <= 1) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showNext);
nextBtn.addEventListener('click', showPrev);

// Виправлення: prev/next кнопки були переплутані місцями (prevBtn → showNext, nextBtn → showPrev)
// Правильне підключення:
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

// Виправлення форми: preventDefault щоб не перезавантажувати сторінку
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

renderGallery();
