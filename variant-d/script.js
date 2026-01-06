// Custom Cursor
const cursor = document.querySelector('.cursor-dot');
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const stored = localStorage.getItem('ostia-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (stored === 'dark' || (!stored && prefersDark)) {
    root.setAttribute('data-theme', 'dark');
}

if (toggle) {
    toggle.addEventListener('click', () => {
        if (root.getAttribute('data-theme') === 'dark') {
            root.removeAttribute('data-theme');
            localStorage.setItem('ostia-theme', 'light');
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('ostia-theme', 'dark');
        }
    });
}

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const hoverables = document.querySelectorAll('a, button, .theme-opt');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Theme Switcher
function changePalette(style) {
    if (style === 'atelier') {
        document.documentElement.removeAttribute('data-style');
    } else {
        document.documentElement.setAttribute('data-style', style);
    }
}

// Scroll Reveal
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('active'));
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}
