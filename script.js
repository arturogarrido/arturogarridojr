// Performance data
const performances = [
    {
        id: 1,
        title: "The Play That Goes Wrong",
        role: "Robert Grove, who plays Thomas Colleymoore",
        date: "Spring 2023",
        type: "video",
        thumbnail: "./images/theplaythatgoeswrong.webp",
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
        thumbnail: "./images/summerdream.webp",
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
        thumbnail: "./images/willkommen.webp",
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
        thumbnail: "./images/monologue_puck.webp",
        videoUrl: "https://youtube.com/embed/z8RLMVMIGF4",
        platform: "youtube",
        category: "theater",
        description: "Puck's Monologue from Midsummer Night Dream"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    initializePhotoGallery();
    createDustParticles();
    initializeSpotlight();
    initializeSmoothScroll();
    initializeMobileNav();
    initializeCopyrightYear();
    initializeEmailLink();
});

// Set copyright year safely (replaces document.write)
function initializeCopyrightYear() {
    const el = document.getElementById('copyrightYear');
    if (el) {
        el.textContent = new Date().getFullYear();
    }
}

// Email obfuscation to prevent scraping
function initializeEmailLink() {
    const link = document.getElementById('emailLink');
    if (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Obfuscated email - assembled at runtime to avoid scraping
            const user = 'arturo2college';
            const domain = 'gmail.com';
            const email = user + '@' + domain;
            link.textContent = email;
            link.href = 'mailto:' + email;
            link.removeEventListener('click', arguments.callee);
        });
    }
}

// Mobile navigation toggle
function initializeMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

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
    renderGalleryItems(performances);
}

// Helper: escape text for safe insertion
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Helper: create a play icon SVG element
function createPlayIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'w-12 h-12 text-white');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M8 5v14l11-7z');
    svg.appendChild(path);
    return svg;
}

// Helper: create an expand icon SVG element
function createExpandIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'w-12 h-12 text-white');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-7.83 7.83 1.41 1.41L19 6.41V10h2V3h-7z');
    svg.appendChild(path);
    return svg;
}

// Render gallery items using safe DOM methods (no innerHTML)
function renderGalleryItems(items) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.textContent = '';

    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        // Image wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'relative cursor-pointer';

        const img = document.createElement('img');
        img.src = item.type === 'video' ? item.thumbnail : item.imageUrl;
        img.alt = item.title;
        img.loading = 'lazy';
        img.className = 'w-full h-48 object-cover';
        wrapper.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center';
        overlay.appendChild(item.type === 'video' ? createPlayIcon() : createExpandIcon());
        wrapper.appendChild(overlay);

        galleryItem.appendChild(wrapper);

        // Text content
        const textDiv = document.createElement('div');
        textDiv.className = 'p-6';

        const h3 = document.createElement('h3');
        h3.className = 'font-bold text-xl mb-2 playfair text-burgundy';
        h3.textContent = item.title;
        textDiv.appendChild(h3);

        const roleLine = document.createElement('p');
        roleLine.className = 'text-gold mb-4 lora';
        roleLine.textContent = item.role + ' - ' + item.date;
        textDiv.appendChild(roleLine);

        const desc = document.createElement('p');
        desc.className = 'text-gray-600 lora line-clamp-2';
        desc.textContent = item.description;
        textDiv.appendChild(desc);

        galleryItem.appendChild(textDiv);

        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('role', 'button');
        galleryItem.setAttribute('aria-label', 'View ' + item.title);
        galleryItem.addEventListener('click', () => openModal(item));
        galleryItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(item);
            }
        });
        galleryGrid.appendChild(galleryItem);
    });
}

// Validate and extract YouTube embed URL
function getYouTubeEmbedUrl(url) {
    // Already an embed URL
    const embedMatch = url.match(/^https:\/\/(?:www\.)?youtube\.com\/embed\/([\w-]+)/);
    if (embedMatch) {
        return 'https://www.youtube.com/embed/' + encodeURIComponent(embedMatch[1]);
    }
    // Standard watch URL
    const watchMatch = url.match(/[?&]v=([\w-]+)/);
    if (watchMatch) {
        return 'https://www.youtube.com/embed/' + encodeURIComponent(watchMatch[1]);
    }
    // Short URL
    const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
    if (shortMatch) {
        return 'https://www.youtube.com/embed/' + encodeURIComponent(shortMatch[1]);
    }
    return null;
}

// Modal functionality
function openModal(item) {
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.textContent = '';

    const container = document.createElement('div');
    container.className = 'max-w-4xl mx-auto';

    if (item.type === 'video' && item.platform === 'youtube') {
        const videoUrl = getYouTubeEmbedUrl(item.videoUrl);
        if (videoUrl) {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            videoContainer.style.cssText = 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;';

            const iframe = document.createElement('iframe');
            iframe.src = videoUrl;
            iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;';
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation allow-popups');
            iframe.setAttribute('loading', 'lazy');

            videoContainer.appendChild(iframe);
            container.appendChild(videoContainer);
        }
    } else if (item.type !== 'video') {
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        img.className = 'w-full h-auto';
        container.appendChild(img);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'mt-4';

    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-bold playfair text-burgundy';
    h3.textContent = item.title;
    infoDiv.appendChild(h3);

    const roleLine = document.createElement('p');
    roleLine.className = 'text-gold mt-1 lora';
    roleLine.textContent = item.role + ' - ' + item.date;
    infoDiv.appendChild(roleLine);

    const desc = document.createElement('p');
    desc.className = 'text-gray-600 mt-2 lora';
    desc.textContent = item.description;
    infoDiv.appendChild(desc);

    container.appendChild(infoDiv);
    modalBody.appendChild(container);

    modal.classList.remove('hidden');
}

// Create dust particles effect
function createDustParticles() {
    const container = document.getElementById('dustParticles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (5 + Math.random() * 5) + 's';
        container.appendChild(particle);
    }
}

// Initialize spotlight effect
function initializeSpotlight() {
    const hero = document.querySelector('.hero');
    const spotlight = document.querySelector('.spotlight-overlay');

    let ticking = false;
    hero.addEventListener('mousemove', (e) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            spotlight.style.background =
                'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(255, 215, 0, 0.15) 0%, transparent 30%)';
            ticking = false;
        });
    });
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('mediaModal');
    modal.classList.add('hidden');
    document.getElementById('modalBody').textContent = '';
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
        event: "Gunn Theatre Talent Night",
        date: "2024",
        imageUrl: "./images/willkommen_2.webp",
        category: "production",
        description: "Directed, Emcee role"
    },
    {
        id: 1,
        title: "Beetlejuice Preparations",
        event: "Beetlejuice",
        date: "Spring 2023",
        imageUrl: "./images/bjuice.webp",
        category: "backstage",
        description: "Getting into character"
    },
    {
        id: 2,
        title: "On stage",
        event: "Gunn Theatre",
        date: "Spring 2023",
        imageUrl: "./images/onstage1.webp",
        category: "backstage",
        description: "On Stage"
    },
    {
        id: 3,
        title: "Poisoned",
        event: "The Play That Goes Wrong",
        date: "Winter 2023",
        imageUrl: "./images/tptgw1.webp",
        category: "production",
        description: "Final Scene"
    },
    {
        id: 4,
        title: "High School Musical",
        event: "High School Musical",
        date: "Spring 2023",
        imageUrl: "./images/hsm1.webp",
        category: "portrait",
        description: "Lights On"
    },
    {
        id: 5,
        title: "Ophelia",
        event: "Ophelia",
        date: "Fall 2023",
        imageUrl: "./images/ophelia1.webp",
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
        imageUrl: "./images/yctiwy_1.webp",
        category: "production",
        description: ""
    },
    {
        id: 8,
        title: "De Pinna 2",
        event: "You Can't Take It With You",
        date: "2024",
        imageUrl: "./images/yctiwy_2.webp",
        category: "production",
        description: ""
    },
    {
        id: 9,
        title: "Serious Business",
        event: "Dinner",
        date: "2024",
        imageUrl: "./images/business.webp",
        category: "bio",
        description: ""
    },
    {
        id: 10,
        title: "The Worm",
        event: "High School Musical",
        date: "2024",
        imageUrl: "./images/worm.webp",
        category: "production",
        description: ""
    },
    {
        id: 11,
        title: "5th Grade Bio",
        event: "Elementary School",
        date: "2017",
        imageUrl: "./images/ArturoBio5thgrade.webp",
        category: "bio",
        description: "Dreaming about the future"
    }
];

// Initialize photo gallery
function initializePhotoGallery() {
    renderPhotoGallery(photos);
}

// Render photo gallery items using safe DOM methods (no innerHTML)
function renderPhotoGallery(items) {
    const photoGrid = document.getElementById('photoGrid');
    photoGrid.textContent = '';

    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        // Image wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'relative cursor-pointer group';

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        img.loading = 'lazy';
        img.className = 'w-full h-48 object-cover';
        wrapper.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center';
        overlay.appendChild(createExpandIcon());
        wrapper.appendChild(overlay);

        galleryItem.appendChild(wrapper);

        // Text content
        const textDiv = document.createElement('div');
        textDiv.className = 'p-6';

        const h3 = document.createElement('h3');
        h3.className = 'font-bold text-xl mb-2 playfair text-burgundy';
        h3.textContent = item.title;
        textDiv.appendChild(h3);

        const eventLine = document.createElement('p');
        eventLine.className = 'text-gold mb-4 lora';
        eventLine.textContent = item.event + ' - ' + item.date;
        textDiv.appendChild(eventLine);

        const desc = document.createElement('p');
        desc.className = 'text-gray-600 lora line-clamp-2';
        desc.textContent = item.description;
        textDiv.appendChild(desc);

        galleryItem.appendChild(textDiv);

        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('role', 'button');
        galleryItem.setAttribute('aria-label', 'View ' + item.title);
        galleryItem.addEventListener('click', () => openPhotoModal(item));
        galleryItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPhotoModal(item);
            }
        });
        photoGrid.appendChild(galleryItem);
    });
}

// Photo modal functionality using safe DOM methods
function openPhotoModal(item) {
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('modalBody');
    modalBody.textContent = '';

    const container = document.createElement('div');
    container.className = 'max-w-4xl mx-auto';

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;
    img.className = 'w-full h-auto rounded-lg shadow-lg';
    container.appendChild(img);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'mt-4';

    const h3 = document.createElement('h3');
    h3.className = 'text-2xl font-bold playfair text-burgundy';
    h3.textContent = item.title;
    infoDiv.appendChild(h3);

    const eventLine = document.createElement('p');
    eventLine.className = 'text-gold mt-1 lora';
    eventLine.textContent = item.event + ' - ' + item.date;
    infoDiv.appendChild(eventLine);

    const desc = document.createElement('p');
    desc.className = 'text-gray-600 mt-2 lora';
    desc.textContent = item.description;
    infoDiv.appendChild(desc);

    container.appendChild(infoDiv);
    modalBody.appendChild(container);

    modal.classList.remove('hidden');
}
