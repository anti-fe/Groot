const nav = document.querySelector('.header__nav');
const mainLink = document.querySelector('.header__next'),
    mainBlock = document.querySelector('.main');

//Добавление подложки для навбара при скроле
window.addEventListener('scroll', ()=>{
    nav.classList.toggle('nav_sticky', window.scrollY > 0);
})

//Плавный скролл до следующего блока при нажатии на ссылку 
mainLink.addEventListener('click', (e)=>{
    e.preventDefault();
    mainBlock.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
})