const successLogin = document.querySelector('.success-login');
const authForm = document.querySelectorAll('.modal-window__form')[0],
    regForm = document.querySelectorAll('.modal-window__form')[1];
const authBtn = document.querySelectorAll('.modal-window__form-btn')[0],
    regBtn = document.querySelectorAll('.modal-window__form-btn')[1];
const authInps = authForm.querySelectorAll('input'),
    regInps = regForm.querySelectorAll('input');
const logOutBtns = document.querySelectorAll('.log-out-btn'),
    profileBtns = document.querySelectorAll('.profile-btn');

const fioRegEx = /^([А-ЯA-Z]{2,})+\s+([А-ЯA-Z\s]{2,})+$/i;
const phoneRegEx = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,11}(\s*)?$/;
//Пароль хотя-бы с 1 цифрой, 1 спецсимволом, 1 латинскую букву 
//в нижнем и верхнем регистре, не менее 6 символов.
const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

let admin = {
    "fio": "admin",
    "phone": "admin",
    "password": "admin"
}

let usersData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
if(!usersData[0]) {
    usersData.push(admin);
}

localStorage.setItem('users', JSON.stringify(usersData));

let formDataAuth;
let formDataReg;

let loggedUser = [JSON.parse(localStorage.getItem('loggedUser'))];
console.log(usersData);
if(!usersData[0]['fio']) {
    usersData.push(admin);
}

//Если пользователь ранее авторизовался, то после перезагрузки страницы
//Он все также будет авторизован
if (localStorage.getItem('loggedUser')) {
    if (JSON.parse(localStorage.getItem('loggedUser'))['fio'] === "admin"){
        profileBtns.forEach(btn => {
            btn.removeEventListener('click', openModalWindow);
            //Перенаправление на страницу Личный кабинет
            btn.addEventListener('click', locateToAdminAccount);
        })
    } else {
        profileBtns.forEach(btn => {
            btn.removeEventListener('click', openModalWindow);
            //Перенаправление на страницу Личный кабинет
            btn.addEventListener('click', locateToAccount);
        })
    }
    //Появление кнопки выхода из аккаунта
    logOutBtns.forEach(btn => {
        btn.style.display = 'block';
    })
}

function locateToAccount() {
    if(!document.querySelector('.page-name')) {
        window.location.href = './src/pages/user-profile.html';
    } else if(document.querySelector('.page-name')) {
        window.location.href = '../pages/user-profile.html';
    }
}
function locateToAdminAccount() {
    if(!document.querySelector('.page-name')){
        window.location.href = './src/pages/admin-profile.html';
    } else if(document.querySelector('.page-name')) {
        window.location.href = '../pages/admin-profile.html';
    }
}

authBtn.addEventListener('click', getAuthForm);
regBtn.addEventListener('click', getRegForm);
logOutBtns.forEach(btn => {
    btn.addEventListener('click', logOut);
})

//Получение данных из формы Авторизации
function getAuthForm(e) {
    e.preventDefault();
    formDataAuth = new FormData(authForm);
    formDataAuth = Object.fromEntries(formDataAuth.entries());

    validateAuthForm();

    //Проверяем наличие пользователя в localStorage
    formDataAuth = new FormData(authForm);
    formDataAuth = Object.fromEntries(formDataAuth.entries());

    let usersArray = JSON.parse(localStorage.getItem('users'));


    usersArray.forEach(user => {
        if(('admin' == formDataAuth.phone) && ('admin' == formDataAuth.password)) { 
            localStorage.setItem('loggedUser', JSON.stringify([admin]));  

            authInps.forEach(input => {
                input.classList.remove('modal-window__error');
                input.value = '';
            })
            modalWindow.style.transform = 'translateY(-1080px)';
            headerNav.style.display = 'block';
            page.style.overflowY = 'visible';

            //Появление кнопки выхода из аккаунта
            logOutBtns.forEach(btn => {
                btn.style.display = 'block';
            })

            profileBtns.forEach(btn => {
                btn.removeEventListener('click', openModalWindow);
                //Перенаправление на страницу Личный кабинет
                btn.addEventListener('click', locateToAdminAccount);
            })

            successLogin.style.display = 'flex';
            successLogin.style.transform = "translate(0px)";
            setTimeout(() => {
                successLogin.style.transform = "translate(-350px)";
                successLogin.style.display = 'none';
            }, 2000)
        } else if ((user['phone'] == formDataAuth.phone) && (user['password'] == formDataAuth.password)) {
            //Если пользователь вошел в аккаунт
            //Помещаем данные вошедшего пользователя в переменную
            let numberUser = 0;
            usersArray.forEach(user => {
                if (user['phone'] == formDataAuth.phone) {
                    loggedUser = [JSON.parse(localStorage.getItem('users'))[numberUser]];
                    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
                }
                numberUser++;
            })
            authInps.forEach(input => {
                input.classList.remove('modal-window__success');
                input.value = '';
            })
            modalWindow.style.transform = 'translateY(-1080px)';
            headerNav.style.display = 'block';
            page.style.overflowY = 'visible';

            //Появление кнопки выхода из аккаунта
            logOutBtns.forEach(btn => {
                btn.style.display = 'block';
            })

            profileBtns.forEach(btn => {
                btn.removeEventListener('click', openModalWindow);
                //Перенаправление на страницу Личный кабинет
                btn.addEventListener('click', locateToAccount);
            })

            successLogin.style.display = 'flex';
            successLogin.style.transform = "translate(0px)";
            setTimeout(() => {
                successLogin.style.transform = "translate(-350px)";
                successLogin.style.display = 'none';
            }, 2000)
        }
        
    })
}
//Получение данных из формы Регистрации
function getRegForm(e) {
    e.preventDefault();
    validateRegForm();
    let isValid = true;
    regInps.forEach(inpt => {
        if (inpt.classList.contains('modal-window__error')) {
            isValid = false;
        }
    })
    if (isValid) {
        //Если введены коректные данные 
        //Добавляем в localStorage
        formDataReg = new FormData(regForm);
        formDataReg = Object.fromEntries(formDataReg.entries());
        usersData.push(formDataReg);
        localStorage.setItem('users', JSON.stringify(usersData));

        regInps.forEach(input => {
            input.value = '';
            input.classList.remove('modal-window__success');
        })
        //После успешной регистрации авторизовываемся 
        let usersArray = JSON.parse(localStorage.getItem('users'));
        let numberUser = 0;
        usersArray.forEach(user => {
            if (user['phone'] == formDataReg.phone) {
                loggedUser = [JSON.parse(localStorage.getItem('users'))[numberUser]];
                localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            }
            numberUser++;
        })

        //Появление кнопки выхода из аккаунта
        logOutBtns.forEach(btn => {
            btn.style.display = 'block';
        })
        
        successLogin.style.display = 'flex';
        successLogin.style.transform = "translate(0px)";
        setTimeout(() => {
            successLogin.style.transform = "translate(-350px)";
            successLogin.style.display = 'none';
        }, 2000);
        modalWindow.style.transform = 'translateY(-1080px)';
        headerNav.style.display = 'block';
        page.style.overflowY = 'visible';
        profileBtns.forEach(btn => {
            btn.removeEventListener('click', openModalWindow);
            //Перенаправление на страницу Личный кабинет
            btn.addEventListener('click', locateToAccount);
        })
    }
}
//Проверка всех полей формы Регистрации
function validateRegForm(e) {
    //FIO
    const fioInp = regInps[0].value.trim();
    if (regInps[0].value.trim() === '') {
        setError(regInps[0], "Поле должно быть заполнено");
    } else if (!fioRegEx.test(fioInp)) {
        setError(regInps[0], "Напишите фамилию и имя, а также отчество при наличии");
    } else {
        setSuccess(regInps[0]);
    }
    //PHONE
    const phoneInp = regInps[1].value.trim();
    let overlap = false;
    formDataReg = new FormData(regForm);
    formDataReg = Object.fromEntries(formDataReg.entries());
    usersData.forEach(user => {
        if (user.phone === formDataReg.phone) {
            overlap = true;
        }
    })
    if (regInps[1].value.trim() === '') {
        setError(regInps[1], "Поле должно быть заполнено");
    } else if (!phoneRegEx.test(phoneInp)) {
        setError(regInps[1], "Напишите правильный номер телефона");
    } else if (overlap) {
        setError(regInps[1], "Номер телефона уже зарегистрирован");
    } else {
        setSuccess(regInps[1]);
    }
    //PASSWORD
    const passwordInp = regInps[2].value.trim();
    if (regInps[2].value.trim() === '') {
        setError(regInps[2], "Поле должно быть заполнено");
    } else if (!passwordRegEx.test(passwordInp)) {
        setError(regInps[2], "Пример правильного пароля abcde1");
    } else {
        setSuccess(regInps[2]);
    }
}
//Проверка всех полей формы Авторизации
function validateAuthForm() {
    //PHONE
    const phoneInp = authInps[0].value.trim();
    if (authInps[0].value.trim() === '') {
        setError(authInps[0], "Поле должно быть заполнено");
    } else if (!phoneRegEx.test(phoneInp) || !phoneRegEx.test(phoneInp)) {
        setError(authInps[0], "Напишите правильный номер телефона");
    } else {
        setSuccess(authInps[0]);
    }
    //PASSWORD
    const passwordInp = authInps[1].value.trim();
    if (authInps[1].value.trim() === '') {
        setError(authInps[1], "Поле должно быть заполнено");
    } else if (!passwordRegEx.test(passwordInp)) {
        setError(authInps[1], "Введен не правильный пароль");
    } else {
        setSuccess(authInps[1]);
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
//Выход из аккаунта
function logOut() {
    //Убираем кнопки выхода из аккаунта
    logOutBtns.forEach(btn => {
        btn.style.display = 'none';
    })
    profileBtns.forEach(btn => {
        //Убираем перенаправление 
        btn.removeEventListener('click', locateToAccount);
        //Появление модального окна при клике
        btn.addEventListener('click', openModalWindow);
    })
    //Удаляем из localStorage объект с данными авторизованного пользователя
    localStorage.removeItem('loggedUser');
}