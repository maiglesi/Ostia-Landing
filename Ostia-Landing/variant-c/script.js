function switchTheme(index) {
    if (index === 0) {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', index);
    }
    
    // Update active pill UI
    document.querySelectorAll('.theme-pill').forEach((pill, idx) => {
        if (idx === index) pill.classList.add('active');
        else pill.classList.remove('active');
    });
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
