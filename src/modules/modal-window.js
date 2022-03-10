//Модальное окно
const profileBtn = document.querySelectorAll('.profile-btn');
const modalClose = document.querySelector('.modal-window__close');
const toRegistr = document.querySelector('.modal-window__reg-btn');
const toAuth = document.querySelector('.modal-window__auth-btn');

const page = document.querySelector('body');
const modalWindow = document.querySelector('.modal-window');
const headerNav = document.querySelector('.header__nav');
const modalAuth = document.querySelector('.modal-window__auth');
const modalReg = document.querySelector('.modal-window__reg');

profileBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        modalWindow.style.transform = 'translateY(1080px)';
        headerNav.style.display = 'none';
        page.style.overflowY = 'hidden';
    })
})

modalClose.addEventListener('click', (e)=>{
    e.preventDefault();
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