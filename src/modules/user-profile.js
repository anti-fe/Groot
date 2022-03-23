const burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu'),
        burgerProfileBtn = document.querySelector('.header__burger-profile'),
        logOutBtn = document.querySelectorAll('.log-out-btn'); 
const mainWrapper = document.querySelector('.main__wrapper'),
        main = document.querySelector('.main'),
        mainCont = document.querySelectorAll('.main__cont');
const footerSection = document.querySelectorAll('.footer__section');
const userInfoConts = document.querySelectorAll('.info-cont__text');
const ordersBtn = document.querySelector('.main__orders-btn');

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

footerSection.forEach(item=>{
    item.addEventListener('click', ()=>{
        let itemList = item.querySelector('.footer__section-list');
        let itemArrow = item.querySelector('.footer__section-head').querySelector('.footer__arrow');

        itemList.classList.toggle('footer__active-list');
        itemArrow.classList.toggle('footer__active-arrow');
    })
})

//Устанавливаем информацию в ЛК, беря ее из localStorage
userInfoConts[0].textContent = JSON.parse(localStorage.getItem('loggedUser'))['fio'];
userInfoConts[1].textContent = JSON.parse(localStorage.getItem('loggedUser'))['phone'];
userInfoConts[2].textContent = JSON.parse(localStorage.getItem('loggedUser'))['password'];

ordersBtn.addEventListener('click', ()=>{
    window.location.href = "../pages/catalog.html";
})