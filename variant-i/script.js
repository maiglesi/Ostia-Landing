const t = document.getElementById('theme-toggle');
const s = localStorage.getItem('ostia-theme');
if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches)) document.documentElement.setAttribute('data-theme','dark');
t.onclick=()=>{
    const d=document.documentElement;
    if(d.getAttribute('data-theme')==='dark'){d.removeAttribute('data-theme');localStorage.setItem('ostia-theme','light');}
    else{d.setAttribute('data-theme','dark');localStorage.setItem('ostia-theme','dark');}
};
