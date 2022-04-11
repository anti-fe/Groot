const burgerMenu = document.querySelector('.nav__burger'),
    modalBurger = document.querySelector('.header__burger-menu'),
    burgerProfileBtn = document.querySelector('.header__burger-profile');
const footerSection = document.querySelectorAll('.footer__section');

footerSection.forEach(item => {
    item.addEventListener('click', () => {
        let itemList = item.querySelector('.footer__section-list');
        let itemArrow = item.querySelector('.footer__section-head').querySelector('.footer__arrow');
        itemList.classList.toggle('footer__active-list');
        itemArrow.classList.toggle('footer__active-arrow');
    })
})
//Добавляем класс active к иконке бургера и ему самому
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active-burger');
    modalBurger.classList.toggle('active-menu-burger');
})
burgerProfileBtn.addEventListener('click', () => {
    burgerMenu.classList.remove('active-burger');
    modalBurger.classList.remove('active-menu-burger');
})