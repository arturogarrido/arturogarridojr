// Performance data
const performances = [
    {
        id: 1,
        title: "The Play That Goes Wrong",
        role: "Robert Grove, who plays Thomas Colleymoore",
        date: "Spring 2023",
        type: "video",
        thumbnail: "./images/theplaythatgoeswrong.png",
        videoUrl: "https://www.youtube.com/embed/FAYM3BETfas",
        platform: "youtube",
        category: "theater",
        description: "Gunn Theatre's 2023 Production"
    },
    {
        id: 2,
        title: "Midsummer Night Dream",
        role: "Puck",
        date: "2024",
        type: "video",
        thumbnail: "./images/summerdream.png",
        videoUrl: "https://youtube.com/embed/DyQ6xsRF260?si=oLVvE8qSe9Xy9QYr",
        platform: "youtube",
        category: "theater",
        description: "Gunn Theatre's 2024 Production"
    },
    {
        id: 3,
        title: "Willkommen from Cabaret",
        role: "Emcee",
        date: "2025",
        type: "video",
        thumbnail: "./images/willkommen.png",
        videoUrl: "https://youtube.com/embed/L0NpPvYEBcQ",
        platform: "youtube",
        category: "theater",
        description: "Gunn Theatre's 2025 Talent Night"
    },
    {
        id: 4,
        title: "Monologue",
        role: "Puck",
        date: "2024",
        type: "video",
        thumbnail: "./images/monologue_puck.png",
        videoUrl: "https://youtube.com/embed/z8RLMVMIGF4",
        platform: "youtube",
        category: "theater",
        description: "Puck's Monologue from Midsummer Night Dream"
    }
    // Add more performances here
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    initializePhotoGallery();
    createDustParticles();
    initializeSpotlight();
    initializeSmoothScroll();
});

// Smooth scroll functionality
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery initialization
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Create gallery items
    renderGalleryItems(performances);

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            const filteredPerformances = filter === 'all' 
                ? performances 
                : performances.filter(item => item.category === filter);
            
            renderGalleryItems(filteredPerformances);
        });
    });
}

// Render gallery items
function renderGalleryItems(items) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';

    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="relative cursor-pointer">
                <img src="${item.type === 'video' ? item.thumbnail : item.imageUrl}" 
                     alt="${item.title}" 
                     class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 
                            transition-opacity flex items-center justify-center">
                    ${item.type === 'video' 
                        ? '<svg viewBox="0 0 24 24" class="w-12 h-12 text-white"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>' 
                        : '<svg viewBox="0 0 24 24" class="w-12 h-12 text-white"><path fill="currentColor" d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-7.83 7.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>'}
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-bold text-xl mb-2 playfair text-burgundy">${item.title}</h3>
                <p class="text-gold mb-4 lora">${item.role} - ${item.date}</p>
                <p class="text-gray-600 lora line-clamp-2">${item.description}</p>
            </div>
        `;

        galleryItem.addEventListener('click', () => openModal(item));
        galleryGrid.appendChild(galleryItem);
    });
}

// Modal functionality
function openModal(item) {
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('modalBody');

    let content = '';
    if (item.type === 'video') {
        if (item.platform === 'youtube') {
            // Ensure URL is in embed format
            const videoUrl = item.videoUrl.includes('embed') 
                ? item.videoUrl 
                : `https://www.youtube.com/embed/${item.videoUrl.split('v=')[1]}`;
            
            content = `
                <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe 
                        src="${videoUrl}"
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>`;
        } else if (item.platform === 'vimeo') {
            content = `
                <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe 
                        src="${item.videoUrl}"
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>`;
        }
    } else {
        content = `<img src="${item.imageUrl}" alt="${item.title}" class="w-full h-auto">`;
    }

    modalBody.innerHTML = `
        <div class="max-w-4xl mx-auto">
            ${content}
            <div class="mt-4">
                <h3 class="text-2xl font-bold playfair text-burgundy">${item.title}</h3>
                <p class="text-gold mt-1 lora">${item.role} - ${item.date}</p>
                <p class="text-gray-600 mt-2 lora">${item.description}</p>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Create dust particles effect
function createDustParticles() {
    const container = document.getElementById('dustParticles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${5 + Math.random() * 5}s`;
        container.appendChild(particle);
    }
}

// Initialize spotlight effect
function initializeSpotlight() {
    const hero = document.querySelector('.hero');
    const spotlight = document.querySelector('.spotlight-overlay');

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        spotlight.style.background = `
            radial-gradient(
                circle at ${x}% ${y}%,
                rgba(255, 215, 0, 0.15) 0%,
                transparent 30%
            )
        `;
    });
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('mediaModal');
    modal.classList.add('hidden');
    // Optional: Clear the modal content when closing
    document.getElementById('modalBody').innerHTML = '';
}

// Event listener for close button
document.addEventListener('DOMContentLoaded', function() {
    // Close button click
    const closeButton = document.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Click outside modal
    const modal = document.getElementById('mediaModal');
    modal.addEventListener('click', function(e) {
        // Close only if clicking the dark overlay, not the content
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Photo Gallery data
const photos = [
    {
        id: 0,
        title: "Willkommen",
        event: "Gunn Theatre Talen Night",
        date: "2024",
        imageUrl: "./images/willkommen_2.png",
        category: "production",
        description: "Directed, Emcee role"
    },
    {
        id: 1,
        title: "Beetlejuice Preparations",
        event: "Beetlejuice",
        date: "Spring 2023",
        imageUrl: "./images/bjuice.png",
        category: "backstage",
        description: "Getting into character"
    },
    {
        id: 2,
        title: "On stage",
        event: "...",
        date: "Spring 2023",
        imageUrl: "./images/onstage1.png",
        category: "backstage",
        description: "On Stage"
    },
    {
        id: 3,
        title: "Poisoned",
        event: "The Play That Goes Wrong",
        date: "Winter 2023",
        imageUrl: "./images/tptgw1.png",
        category: "production",
        description: "Final Scene"
    },
    {
        id: 4,
        title: "High School Musical",
        event: "High School Musical",
        date: "Spring 2023",
        imageUrl: "./images/hsm1.png",
        category: "portrait",
        description: "Lights On"
    },
    {
        id: 5,
        title: "Ophelia",
        event: "Ophelia",
        date: "Fall 2023",
        imageUrl: "./images/ophelia1.png",
        category: "production",
        description: "On Stage"
    },
    {
        id: 6,
        title: "De Pinna Scene",
        event: "You Can't Take It With You",
        date: "2024",
        imageUrl: "./images/yctiwy.gif",
        category: "production",
        description: ""
    },
    {
        id: 7,
        title: "De Pinna 1",
        event: "You Can't Take It With You",
        date: "2024",
        imageUrl: "./images/yctiwy_1.png",
        category: "production",
        description: ""
    },
    {
        id: 8,
        title: "De Pinna 2",
        event: "You Can't Take It With You",
        date: "2024",
        imageUrl: "./images/yctiwy_2.png",
        category: "production",
        description: ""
    },
    {
        id: 9,
        title: "Serious Business",
        event: "Dinner",
        date: "2024",
        imageUrl: "./images/business.png",
        category: "bio",
        description: ""
    },
    {
        id: 10,
        title: "The Worm",
        event: "High School Musical",
        date: "2024",
        imageUrl: "./images/worm.png",
        category: "production",
        description: ""
    },
    {
        id: 10,
        title: "5th Grade Bio",
        event: "Elementary School",
        date: "2017",
        imageUrl: "./images/ArturoBio5thgrade.png",
        category: "bio",
        description: "Dreaming about the future"
    }
];

// Initialize photo gallery
function initializePhotoGallery() {
    const photoGrid = document.getElementById('photoGrid');
    const photoFilterButtons = document.querySelectorAll('.photo-filter-btn');

    // Create gallery items
    renderPhotoGallery(photos);

    // Filter functionality
    photoFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            photoFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            const filteredPhotos = filter === 'all' 
                ? photos 
                : photos.filter(item => item.category === filter);
            
            renderPhotoGallery(filteredPhotos);
        });
    });
}

// Render photo gallery items
function renderPhotoGallery(items) {
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.innerHTML = '';

    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="relative cursor-pointer group">
                <img src="${item.imageUrl}" 
                     alt="${item.title}" 
                     class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 
                            transition-opacity flex items-center justify-center">
                    <svg class="w-12 h-12 text-white" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-7.83 7.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-bold text-xl mb-2 playfair text-burgundy">${item.title}</h3>
                <p class="text-gold mb-4 lora">${item.event} - ${item.date}</p>
                <p class="text-gray-600 lora line-clamp-2">${item.description}</p>
            </div>
        `;

        galleryItem.addEventListener('click', () => openPhotoModal(item));
        photoGrid.appendChild(galleryItem);
    });
}

// Photo modal functionality
function openPhotoModal(item) {
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-auto rounded-lg shadow-lg">
            <div class="mt-4">
                <h3 class="text-2xl font-bold playfair text-burgundy">${item.title}</h3>
                <p class="text-gold mt-1 lora">${item.event} - ${item.date}</p>
                <p class="text-gray-600 mt-2 lora">${item.description}</p>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}