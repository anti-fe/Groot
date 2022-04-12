const burgerMenu = document.querySelector('.nav__burger'),
    modalBurger = document.querySelector('.header__burger-menu'),
    burgerProfileBtn = document.querySelector('.header__burger-profile');
const footerSection = document.querySelectorAll('.footer__section');

const formbtn = document.querySelector('.main__form-btn');
const formInps = document.querySelectorAll('.main__from-input');
const fromSucces = document.querySelector('.main__form-succes');

phoneRegEx = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,11}(\s*)?$/;
const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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

formbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    isValid = true;

    validateForm();

    formInps.forEach(inpt => {
        if (inpt.classList.contains('modal-window__error')) {
            isValid = false;
        }
    })
    if (isValid) {
        fromSucces.style.display = 'block';
    } else {
        fromSucces.style.display = 'none';
    }
})

function validateForm() {
    //PHONE
    const phoneInp = formInps[0].value.trim();
    if (formInps[0].value.trim() === '') {
        setError(formInps[0], "Поле должно быть заполнено");
    } else if (!phoneRegEx.test(phoneInp) || !phoneRegEx.test(phoneInp)) {
        setError(formInps[0], "Напишите правильный номер телефона");
    } else {
        setSuccess(formInps[0]);
    }
    //EMAIL
    const emailInp = formInps[1].value.trim();
    if (formInps[1].value.trim() === '') {
        setError(formInps[1], "Поле должно быть заполнено");
    } else if (!emailRegEx.test(emailInp) || !emailRegEx.test(emailInp)) {
        setError(formInps[1], "Напишите правильную почту");
    } else {
        setSuccess(formInps[1]);
    }
    //MESSAGE
    if (formInps[2].value.trim() === '') {
        setError(formInps[2], "Поле должно быть заполнено");
    } else {
        setSuccess(formInps[2]);
    }
}
//Показывать ошибки у инпутов в соответствии с переданными аргументами
function setError(elem, errorMessage) {
    if (elem.classList.contains('modal-window__success')) {
        elem.classList.remove('modal-window__success');
    }
    const parent = elem.parentElement;
    const errorText = parent.querySelector('.modal-window__errorMessage');
    errorText.style.display = 'block';
    errorText.textContent = errorMessage;
    elem.classList.add('modal-window__error');
}
//Показывать то, что пользователь все ввел успешно у инпутов
function setSuccess(elem) {
    const parent = elem.parentElement;
    const errorText = parent.querySelector('.modal-window__errorMessage');
    if (elem.classList.contains('modal-window__error')) {
        elem.classList.remove('modal-window__error');
        errorText.style.display = 'none';
    }
    elem.classList.add('modal-window__success');
}