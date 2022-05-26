const modalAuth = document.querySelector('.modal-window__auth');
const modalReg = document.querySelector('.modal-window__reg');
let page = document.querySelector('body');
let modalWindow = document.querySelector('.modal-window');
let headerNav = document.querySelector('.header__nav');

const profileBtn = document.querySelectorAll('.profile-btn');
const modalClose = document.querySelector('.modal-window__close');
const toRegistr = document.querySelector('.modal-window__reg-btn'),
    allRegInputs = modalReg.querySelectorAll('input');
const toAuth = document.querySelector('.modal-window__auth-btn'),
    allAuthInputs = modalAuth.querySelectorAll('input');


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
    allAuthInputs.forEach(inp=>{
        inp.value = '';
        inp.classList.remove('modal-window__error')
        inp.classList.remove('modal-window__success')
        const errorMessage = inp.parentElement.querySelector('.modal-window__errorMessage');
        errorMessage.style.display = 'none';
    })
})

toAuth.addEventListener('click', (e)=>{
    e.preventDefault();
    modalAuth.style.display = "grid";
    modalReg.style.display = "none";
    allRegInputs.forEach(inp=>{
        inp.value = '';
        inp.classList.remove('modal-window__error')
        inp.classList.remove('modal-window__success')
        const errorMessage = inp.parentElement.querySelector('.modal-window__errorMessage');
        errorMessage.style.display = 'none';
    })
})