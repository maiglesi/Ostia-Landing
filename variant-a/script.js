document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Logic
    const themeBtns = document.querySelectorAll('.theme-btn');
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const stored = localStorage.getItem('ostia-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = (theme) => {
        if (theme === 'default' || !theme) {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', theme);
        }
        localStorage.setItem('ostia-theme', theme || 'default');
    };

    if (stored) {
        applyTheme(stored);
    } else if (prefersDark) {
        applyTheme('dark');
    }
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            applyTheme(theme);
        });
    });

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            if (current === 'dark') {
                applyTheme('default');
            } else {
                applyTheme('dark');
            }
        });
    }

    // Intersection Observer for Reveal Effects
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.section-reveal').forEach((el) => {
            el.classList.add('visible');
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.section-reveal');
    revealElements.forEach(el => observer.observe(el));
});
