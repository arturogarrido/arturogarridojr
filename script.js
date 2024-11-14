// Performance data
const performances = [
    {
        id: 1,
        title: "Romeo and Juliet",
        role: "Romeo",
        date: "Spring 2023",
        type: "video",
        thumbnail: "/api/placeholder/400/225",
        videoUrl: "https://vimeo.com/your-video-id",
        platform: "vimeo",
        category: "theater",
        description: "Lead role in the school's main stage production"
    },
    {
        id: 2,
        title: "Swan Lake",
        role: "Principal Dancer",
        date: "Winter 2023",
        type: "video",
        thumbnail: "/api/placeholder/400/225",
        videoUrl: "https://youtube.com/embed/your-video-id",
        platform: "youtube",
        category: "dance",
        description: "Featured performance at the winter showcase"
    },
    // Add more performances here
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
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
        if (item.platform === 'vimeo') {
            content = `<iframe src="${item.videoUrl}" class="w-full aspect-video" 
                        frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else if (item.platform === 'youtube') {
            content = `<iframe src="${item.videoUrl}" class="w-full aspect-video" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>`;
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

// Close modal when clicking outside or on close button
document.addEventListener('click', (e) => {
    const modal = document.getElementById('mediaModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.classList.add('hidden');
    }
});

// Prevent modal close when clicking inside modal content
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Handle escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('mediaModal').classList.add('hidden');
    }
});