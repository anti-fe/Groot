//Модальное окно
const profileBtn = document.querySelectorAll('.profile-btn');
const modalClose = document.querySelector('.modal-window__close');
const toRegistr = document.querySelector('.modal-window__reg-btn');
const toAuth = document.querySelector('.modal-window__auth-btn');

const modalAuth = document.querySelector('.modal-window__auth');
const modalReg = document.querySelector('.modal-window__reg');
let page = document.querySelector('body');
let modalWindow = document.querySelector('.modal-window');
let headerNav = document.querySelector('.header__nav');

profileBtn.forEach(btn=>{
    btn.addEventListener('click', openModalWindow);
})

function openModalWindow(e){
    e.preventDefault();
    modalWindow.style.visibility = 'visible';
    modalWindow.style.transform = 'translateY(1080px)';
    headerNav.style.display = 'none';
    page.style.overflowY = 'hidden';
}

modalClose.addEventListener('click', (e)=>{
    e.preventDefault();
    modalWindow.style.visibility = 'hidden';
    modalWindow.style.transform = 'translateY(-1080px)';
    headerNav.style.display = 'block';
    page.style.overflowY = 'visible';
})

toRegistr.addEventListener('click', (e)=>{
    e.preventDefault();
    modalAuth.style.display = "none";
    modalReg.style.display = "grid";
})

toAuth.addEventListener('click', (e)=>{
    e.preventDefault();
    modalAuth.style.display = "grid";
    modalReg.style.display = "none";
})