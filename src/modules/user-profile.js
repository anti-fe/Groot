const burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu'),
        burgerProfileBtn = document.querySelector('.header__burger-profile'),
        logOutBtn = document.querySelectorAll('.log-out-btn'); 
const mainWrapper = document.querySelector('.main__wrapper'),
        main = document.querySelector('.main'),
        mainCont = document.querySelectorAll('.main__cont');

//Добавляем класс active к иконке бургера и ему самому
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active-burger');
    modalBurger.classList.toggle('active-menu-burger');
})

burgerProfileBtn.addEventListener('click', ()=>{
    burgerMenu.classList.remove('active-burger');
    modalBurger.classList.remove('active-menu-burger');
})

logOutBtn.forEach(item=>{
    item.addEventListener("click",()=>{
        window.location.href = '../../index.html';
    })
})

gsap.registerPlugin(ScrollTrigger);
gsap.to(mainCont, {
    xPercent: -100 * (mainCont.length - 1),
    ease: 'none',
    duration: 6,
    scrollTrigger: {
        trigger: main,
        pin: true,
        scrub: true,
        // snap: 1 / (mainCont.length - 1),
        start: `-150px`,
        end: `+=${main.offsetWidth}`
    }
})

