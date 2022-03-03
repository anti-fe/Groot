const nav = document.querySelector('.header__nav');

window.addEventListener('scroll', ()=>{
    nav.classList.toggle('nav_sticky', window.scrollY > 0);
})