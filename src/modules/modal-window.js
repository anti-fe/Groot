//Модальное окно
const profileBtn = document.querySelectorAll('.profile-btn');
const modalWindow = document.querySelector('.modal-window');
const headerNav = document.querySelector('.header__nav');

profileBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        modalWindow.style.transform = 'translateY(1080px)';
        headerNav.style.display = 'none';
    })
})