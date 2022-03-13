const successLogin = document.querySelector('.success-login');
const authForm = document.querySelectorAll('.modal-window__form')[0],
        regForm = document.querySelectorAll('.modal-window__form')[1];
const authBtn = document.querySelectorAll('.modal-window__form-btn')[0],
        regBtn = document.querySelectorAll('.modal-window__form-btn')[1];
const authInps = authForm.querySelectorAll('input'),
        regInps = regForm.querySelectorAll('input');

const fioRegEx = /^([А-ЯA-Z]{2,})+\s+([А-ЯA-Z\s]{2,})+$/i;
const phoneRegEx = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,11}(\s*)?$/;
//Пароль хотя-бы с 1 цифрой, 1 спецсимволом, 1 латинскую букву 
//в нижнем и верхнем регистре, не менее 6 символов.
const passwordRegEx = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/

let usersData = localStorage.getItem('users') ? [JSON.parse(localStorage.getItem('users'))] : [];
let formDataAuth;

authBtn.addEventListener('click', getAuthForm);
regBtn.addEventListener('click', getRegForm);

//Получение данных из формы Авторизации
function getAuthForm(e){
    e.preventDefault();
    formDataAuth = new FormData(authForm);
    formDataAuth = Object.fromEntries(formDataAuth.entries());

    validateAuthForm();

    //Проверяем наличие пользователя в localStorage
    formDataAuth = new FormData(authForm);
    formDataAuth = Object.fromEntries(formDataAuth.entries());
    
    let usersArray = JSON.parse(localStorage.getItem('users'));


    usersArray.forEach(item=>{
        if((item['phone'] == formDataAuth.phone) && (item['password'] == formDataAuth.password)) {
            //Если пользователь вошел в аккаунт
            authInps.forEach(input=>{
                input.classList.remove('modal-window__success');
                input.value = '';
            })
            modalWindow.style.transform = 'translateY(-1080px)';
            headerNav.style.display = 'block';
            page.style.overflowY = 'visible';

            successLogin.style.display = 'flex';
            setTimeout(()=>{
                successLogin.style.display = 'none';
            }, 2000)
            console.log('Вход в аккаунт');
        }
    })
}

//Получение данных из формы Регистрации
function getRegForm(e){
    e.preventDefault();
    validateRegForm();
    let isValid = true;
    regInps.forEach(inpt=>{
        if(inpt.classList.contains('modal-window__error')) {
            isValid = false;
        }
    })
    if(isValid){
        //Если введены коректные данные 
        //Добавляем в localStorage
        formDataReg = new FormData(regForm);
        formDataReg = Object.fromEntries(formDataReg.entries());
        usersData.push(formDataReg);
        localStorage.setItem('users', JSON.stringify(usersData));

        regInps.forEach(input=>{
            input.value = '';
            input.classList.remove('modal-window__success');
        })
        modalWindow.style.transform = 'translateY(-1080px)';
        headerNav.style.display = 'block';
        page.style.overflowY = 'visible';
    } 
}

//Проверка всех полей формы Регистрации
function validateRegForm(e) {
    //FIO
    const fioInp = regInps[0].value.trim();
    if(regInps[0].value.trim() === '') {
        setError(regInps[0], "Поле должно быть заполнено");
    } else if(!fioRegEx.test(fioInp)) {
        setError(regInps[0], "Напишите фамилию и имя, а также отчество при наличии");
    } else {
        setSuccess(regInps[0]);
    }
    //PHONE
    const phoneInp = regInps[1].value.trim();
    let overlap = false;
    formDataReg = new FormData(regForm);
    formDataReg = Object.fromEntries(formDataReg.entries());
    console.log(usersData);
    usersData.forEach(user=>{
        if(user.phone === formDataReg.phone) {
            overlap = true;
        }
    })
    if(regInps[1].value.trim() === '') {
        setError(regInps[1], "Поле должно быть заполнено");
    } else if(!phoneRegEx.test(phoneInp)) {
        setError(regInps[1], "Напишите правильный номер телефона");
    } else if(overlap){
        setError(regInps[1], "Номер телефона уже зарегистрирован");
    } else {
        setSuccess(regInps[1]);
    }
    //PASSWORD
    const passwordInp = regInps[2].value.trim();
    if(regInps[2].value.trim() === '') {
        setError(regInps[2], "Поле должно быть заполнено");
    } else if(!passwordRegEx.test(passwordInp)) {
        setError(regInps[2], "Пример правильного пароля abcABC123$");
    } else {
        setSuccess(regInps[2]);
    }
}

function validateAuthForm() {
    //PHONE
    const phoneInp = authInps[0].value.trim();
    if(authInps[0].value.trim() === '') {
        setError(authInps[0], "Поле должно быть заполнено");
    } else if(!phoneRegEx.test(phoneInp) || !phoneRegEx.test(phoneInp)) {
        setError(authInps[0], "Напишите правильный номер телефона");
    } else {
        setSuccess(authInps[0]);
    }
    //PASSWORD
    const passwordInp = authInps[1].value.trim();
    if(authInps[1].value.trim() === '') {
        setError(authInps[1], "Поле должно быть заполнено");
    } else if(!passwordRegEx.test(passwordInp)) {
        setError(authInps[1], "Введен не правильный пароль");
    } else {
        setSuccess(authInps[1]);
    }
}

function setError(elem, errorMessage) {
    if(elem.classList.contains('modal-window__success')) {
        elem.classList.remove('modal-window__success');
    }
    const parent = elem.parentElement;
    const errorText = parent.querySelector('.modal-window__errorMessage');
    errorText.style.display = 'block';
    errorText.textContent = errorMessage;
    elem.classList.add('modal-window__error');
}
function setSuccess(elem) {
    const parent = elem.parentElement;
    const errorText = parent.querySelector('.modal-window__errorMessage');
    if(elem.classList.contains('modal-window__error')) {
        elem.classList.remove('modal-window__error');
        errorText.style.display = 'none';
    }
    elem.classList.add('modal-window__success');
}
