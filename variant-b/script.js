// Shared logic
const toggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('ostia-theme');
const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (saved === 'dark' || (!saved && sysDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

toggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ostia-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ostia-theme', 'dark');
    }
});
