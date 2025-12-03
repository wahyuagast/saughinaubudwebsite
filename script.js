document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Floating CTA Visibility
    const floatingCta = document.querySelector('.floating-cta');
    const heroSection = document.querySelector('.hero');
    
    if (floatingCta && heroSection) {
        const updateCtaVisibility = () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const shouldShow = window.scrollY > heroBottom - 100;
            floatingCta.classList.toggle('visible', shouldShow);
        };
        window.addEventListener('scroll', updateCtaVisibility);
        updateCtaVisibility();
    }

    // Carousel (Gallery replacement)
    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    // Use all available images in assets (excluding logo)
    const carouselImages = [
        'assets/villa-exterior.jpg',
        'assets/outdoor-bath.jpg',
        'assets/balcony-view.jpg',
        'assets/pool-view.jpg',
        'assets/bathroom-sink.jpg'
    ].filter(src => !src.includes('logo'));

    let currentIndex = 0;

    function getCardStyles(index) {
        const total = carouselImages.length;
        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        let pos = 2; // offscreen by default
        if (index === prevIndex) pos = -1;
        else if (index === currentIndex) pos = 0;
        else if (index === nextIndex) pos = 1;

        const rotation = pos * -4; // gentler tilt
        const xPosition = `calc(${pos} * (clamp(90px, 14vw, 160px)))`;
        const zIndex = pos === 0 ? 10 : pos === -1 ? 5 : 4;
        const scale = pos === 0 ? 1 : 0.94;
        return { rotation, xPosition, zIndex, scale };
    }

    function renderCarousel() {
        if (!carouselContainer) return;
        carouselContainer.innerHTML = '';
        // Render only 3 cards: previous, current, next
        const indices = [
            (currentIndex - 1 + carouselImages.length) % carouselImages.length,
            currentIndex,
            (currentIndex + 1) % carouselImages.length
        ];
        indices.forEach((idx, renderIdx) => {
            const src = carouselImages[idx];
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.style.backgroundImage = `url(${src})`;
            const { rotation, xPosition, zIndex, scale } = getCardStyles(idx);
            card.style.transform = `translateX(${xPosition}) rotate(${rotation}deg) scale(${scale})`;
            card.style.zIndex = zIndex;
            card.setAttribute('role', 'group');
            card.setAttribute('aria-label', `Slide ${idx + 1} of ${carouselImages.length}`);
            card.setAttribute('aria-hidden', idx !== currentIndex);
            carouselContainer.appendChild(card);
        });
    }

    function goToPrevious() {
        currentIndex = currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1;
        renderCarousel();
    }

    function goToNext() {
        currentIndex = currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1;
        renderCarousel();
    }

    if (carouselContainer) {
        renderCarousel();
        prevBtn?.addEventListener('click', goToPrevious);
        nextBtn?.addEventListener('click', goToNext);
    }

    // Theme Toggle & System Preference
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = toggleBtn?.querySelector('.theme-icon');
    const themeLabel = toggleBtn?.querySelector('.theme-label');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const STORAGE_KEY = 'theme-mode'; // 'light' | 'dark' | 'system'

    function setThemeAttr(theme) {
        root.setAttribute('data-theme', theme);
    }

    function getSystemTheme() {
        return mediaQuery.matches ? 'dark' : 'light';
    }

    function applyTheme(mode) {
        if (mode === 'system') {
            setThemeAttr(getSystemTheme());
            updateToggleUI('system');
        } else {
            setThemeAttr(mode);
            updateToggleUI(mode);
        }
    }

    function updateToggleUI(mode) {
        if (!toggleBtn) return;
        let label = 'Auto';
        let icon = 'contrast-outline';

        if (mode === 'light') {
            label = 'Light';
            icon = 'sunny-outline';
        } else if (mode === 'dark') {
            label = 'Dark';
            icon = 'moon-outline';
        }

        if (themeIcon) themeIcon.setAttribute('name', icon);
        if (themeLabel) themeLabel.textContent = label;
    }

    function getSavedMode() {
        return localStorage.getItem(STORAGE_KEY) || 'system';
    }

    function saveMode(mode) {
        localStorage.setItem(STORAGE_KEY, mode);
    }

    // Initialize theme
    const initialMode = getSavedMode();
    applyTheme(initialMode);

    // React to OS changes when in system mode
    mediaQuery.addEventListener('change', () => {
        if (getSavedMode() === 'system') {
            applyTheme('system');
        }
    });

    // Cycle modes: light -> dark -> system -> light
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = getSavedMode();
            const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
            saveMode(next);
            applyTheme(next);
        });
    }
});
