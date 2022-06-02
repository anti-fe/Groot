const nav = document.querySelector('.header__nav'),
        burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu');
const mainLink = document.querySelector('.header__next'),
        mainBlock = document.querySelector('.main');
const burgerProfileBtn = document.querySelector('.header__burger-profile'); 
const footerSection = document.querySelectorAll('.footer__section');
const btnsProfile = document.querySelectorAll('.profile-btn');


footerSection.forEach(item => {
    item.addEventListener('click', () => {
        let itemList = item.querySelector('.footer__section-list');
        let itemArrow = item.querySelector('.footer__section-head').querySelector('.footer__arrow');
        itemList.classList.toggle('footer__active-list');
        itemArrow.classList.toggle('footer__active-arrow');
    })
})       
if (localStorage.getItem('loggedUser')) {
    if (JSON.parse(localStorage.getItem('loggedUser'))[0]['fio'] === 'admin') {
        btnsProfile.forEach(item=>{
            item.addEventListener('click', locateToAdminAccount);
        })
    }
}

//Добавление подложки для навбара при скроле
window.addEventListener('scroll', () => {
    nav.classList.toggle('nav_sticky', window.scrollY > 0);
})

//Плавный скролл до следующего блока при нажатии на ссылку 
mainLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainBlock.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
})

//Добавляем класс active к иконке бургера и ему самому
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active-burger');
    modalBurger.classList.toggle('active-menu-burger');
})

burgerProfileBtn.addEventListener('click', ()=>{
    burgerMenu.classList.remove('active-burger');
    modalBurger.classList.remove('active-menu-burger');
})

function locateToAccount() {
    if(window.location.pathname === '/index.html') {
        window.location.href = '/src/pages/user-profile.html';
    } else if(window.location.pathname === '/Groot/' || window.location.pathname === '/Groot/index.html') {
        window.location.href = './src/pages/user-profile.html';
    } else {
        window.location.href = '../pages/user-profile.html';
    }
}
function locateToAdminAccount() {
    if(window.location.pathname === '/index.html') {
        window.location.href = '/src/pages/admin-profile.html';
    } else if(window.location.pathname === '/Groot/' || window.location.pathname === '/Groot/index.html') {
        window.location.href = './src/pages/admin-profile.html';
    } else {
        window.location.href = '../pages/admin-profile.html';
    }
}