const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const stored = localStorage.getItem('ostia-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setActivePill(theme) {
    document.querySelectorAll('.theme-pill').forEach((pill) => {
        if (pill.getAttribute('data-theme') === theme) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

function applyTheme(theme) {
    if (!theme || theme === 'default') {
        root.removeAttribute('data-theme');
        setActivePill('default');
    } else {
        root.setAttribute('data-theme', theme);
        setActivePill(theme);
    }
    localStorage.setItem('ostia-theme', theme || 'default');
}

function switchTheme(theme) {
    applyTheme(theme);
}

if (stored) {
    applyTheme(stored);
} else if (prefersDark) {
    applyTheme('dark');
} else {
    setActivePill('default');
}

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

// Intersection Observer
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
