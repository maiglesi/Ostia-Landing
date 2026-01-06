document.addEventListener('DOMContentLoaded', () => {
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

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hero Text Stagger
    const texts = document.querySelectorAll('.stagger-text');
    const sub = document.querySelector('.stagger-fade');

    if (prefersReduced) {
        texts.forEach((text) => {
            text.style.opacity = '1';
            text.style.transform = 'none';
        });
        if (sub) {
            sub.style.opacity = '1';
            sub.style.transform = 'none';
        }
        document.querySelectorAll('.reveal-slide').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    texts.forEach((text, index) => {
        text.style.animationDelay = `${index * 0.1}s`;
        text.classList.add('slide-in');
    });

    setTimeout(() => {
        sub.classList.add('fade-up');
    }, 600);

    // Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-slide').forEach(el => observer.observe(el));
});
