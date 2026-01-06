const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

function setTheme(themeName) {
    if (themeName === 'base') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', themeName);
    }
    localStorage.setItem('ostia-theme', themeName);
}

const saved = localStorage.getItem('ostia-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved) {
    setTheme(saved);
} else if (prefersDark) {
    setTheme('dark');
}

if (toggle) {
    toggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        if (current === 'dark') {
            setTheme('base');
        } else {
            setTheme('dark');
        }
    });
}

// Intersection Observer for scroll animations
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-scroll').forEach((el) => {
        el.classList.add('active');
    });
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-scroll').forEach((el) => {
        observer.observe(el);
    });
}
