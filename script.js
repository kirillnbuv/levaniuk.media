// Колекції зображень (Замінюй тестові дані на свої назви файлів yyyymmddnnn.webp)
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

// Рендеринг сітки з можливістю динамічного пошуку
function renderGallery(filterText = '') {
    galleryContainer.innerHTML = '';
    const lowerFilter = filterText.toLowerCase();
    
    galleries.forEach((series, index) => {
        const matchTitle = series.title.toLowerCase().includes(lowerFilter);
        const matchTags = series.tags.toLowerCase().includes(lowerFilter);
        
        if (!matchTitle && !matchTags) return;
        if (series.images.length === 0) return;
        
        const card = document.createElement('div');
        card.classList.add('gallery-card');
        
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.src = 'img/' + series.images[0]; 
        img.alt = series.title;
        img.loading = 'lazy';
        
        div.addEventListener('click', () => openLightbox(index));
        div.appendChild(img);
        
        const caption = document.createElement('div');
        caption.classList.add('gallery-caption');
        caption.innerText = series.title; 
        
        card.appendChild(div);
        card.appendChild(caption);
        
        galleryContainer.appendChild(card);
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderGallery(e.target.value);
    });
}

function openLightbox(galleryIndex) {
    currentGallery = galleries[galleryIndex].images; 
    currentPhotoIndex = 0;
    updateLightboxImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

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

// Первинний запуск галереї
renderGallery();

// =======================================================
// ОФІЦІЙНА АСИНХРОННА ІНТЕГРАЦІЯ WEB3FORMS (ЗАХИЩЕНА)
// =======================================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Зупиняємо базове перезавантаження сторінки

        const formData = new FormData(contactForm);
        
        // Очищуємо та безпечно додаємо ключ без пробілів
        formData.delete("access_key");
        formData.append("access_key", "96bb48c6-6091-4c97-af76-bf80f6fb69f7".trim());

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending..."; // Процес надсилання (English)
        submitBtn.disabled = true;           // Блокуємо повторні кліки

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                // Повідомлення про успіх (English)
                formSuccess.style.display = "block";
                formSuccess.style.color = "#1a1a1a";
                formSuccess.textContent = "Success! Your message has been sent.";
                contactForm.reset(); // Очищення полів
            } else {
                // Помилка конфігурації
                formSuccess.style.display = "block";
                formSuccess.style.color = "#d9534f";
                formSuccess.textContent = "Error: " + data.message;
            }

        } catch (error) {
            // Помилка мережі / CORS
            formSuccess.style.display = "block";
            formSuccess.style.color = "#d9534f";
            formSuccess.textContent = "Something went wrong. Please check your internet or host the site.";
        } finally {
            // Повертаємо кнопку до початкового стану ("Send")
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Ховаємо статусний рядок через 5 секунд
            setTimeout(() => {
                formSuccess.style.display = "none";
            }, 5000);
        }
    });
}
