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

    // Split text staggered reveal
    const spans = document.querySelectorAll('h1 span');
    // Typewriter effect for pre-head
    const typeTarget = document.querySelector('.typewriter');
    const text = typeTarget.innerText;
    typeTarget.innerText = '';

    if (prefersReduced) {
        spans.forEach((span) => {
            span.style.opacity = '1';
            span.style.transform = 'none';
        });
        typeTarget.innerText = text;
        return;
    }

    spans.forEach((span, idx) => {
        span.style.transform = 'translateY(20px)';
        span.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        span.style.transitionDelay = `${0.5 + (idx * 0.15)}s`;
        
        // Trigger reflow
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 100);
    });

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typeTarget.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 100);
});
