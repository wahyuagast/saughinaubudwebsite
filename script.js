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
