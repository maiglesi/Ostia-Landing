const btn = document.querySelector('#theme-toggle');
const val = localStorage.getItem('ostia-theme');
if (val === 'dark' || (!val && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
}
btn.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-theme')) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ostia-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ostia-theme', 'dark');
    }
});
