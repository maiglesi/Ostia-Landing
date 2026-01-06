// Custom Cursor
const cursor = document.querySelector('.cursor-dot');

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
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
