//Создание заказов в ЛК пользователя
const ordersNoneCont = document.querySelector('.main__orders-none');
let orders;
if(localStorage.getItem('loggedUser')){
    orders = JSON.parse(localStorage.getItem('loggedUser'))[0]['orders'] ? JSON.parse(localStorage.getItem('loggedUser'))[0]['orders'] : [];
    //Если у пользователя нет/есть заказов/зы
    if(JSON.parse(localStorage.getItem('loggedUser'))[0]['orders'].length >= 1) {
        ordersNoneCont.style.display = 'none';
    } else {
        ordersNoneCont.style.display = 'flex';
    }
}
const loggedUser2 = JSON.parse(localStorage.getItem('loggedUser'));
const users = JSON.parse(localStorage.getItem('users'));

const ordersList = document.querySelector('.main__orders');
setOrders();

const orderStatus = document.querySelector('.main__order-status');
const burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu'),
        burgerProfileBtn = document.querySelector('.header__burger-profile'),
        logOutBtn = document.querySelectorAll('.log-out-btn'); 
const mainWrapper = document.querySelector('.main__wrapper'),
        main = document.querySelector('.main'),
        mainCont = document.querySelectorAll('.main__cont');
const footerSection = document.querySelectorAll('.footer__section');
const userInfoConts = document.querySelectorAll('.info-cont__text');
const ordersBtn = document.querySelector('.main__orders-none-btn');
const viewPassword = document.querySelector('.main__password-view');

function setOrders(){
    let count = 0;
    if(orders) {
        orders.forEach(a=>{
            count++;
            createOrder(a, count);

            const orderItemsList = document.createElement('ul');
            orderItemsList.classList.add('main__order-items');
            a['orderItems'].forEach(b=>{
                createOrderItem(b, orderItemsList);
            })
        })
    }
}

function createOrder(a, count){
    let countOrderItems = 0;
    let priceOrderItems = 0;
    a['orderItems'].forEach(elem=>{
        countOrderItems += +elem['itemCount'];
        priceOrderItems += +elem['itemPrice'];
        
    })
    const orderCont = document.createElement('div');
    const idOrder = a['idOrder'];
    orderCont.setAttribute('data-idOrder', idOrder);
    orderCont.classList.add('main__order');
    const orderContent = document.createElement('div');
    orderContent.classList.add('main__order-content');
    
    const order = 
        `
        <div class="main__order-main">
            <span class="main__order-num">${count}.</span>
            <div class="main__order-info">
                <div class="main__order-info-item">
                    <span class="main__order-info-name">Кол-во товаров:</span>
                    <span class="main__order-info-value">${countOrderItems} шт</span>
                </div>
                <div class="main__order-info-item">
                    <span class="main__order-info-name">Сумма заказа:</span>
                    <span class="main__order-info-value">${setTextPrice(priceOrderItems.toString())}</span>
                </div>
                <div class="main__order-info-item">
                    <span class="main__order-info-name">Дата и время:</span>
                    <span class="main__order-info-value">${a.dateOrder['day']}.${a.dateOrder['month']}.${a.dateOrder['year']}, ${a.dateOrder['time']}</span>
                </div>
                <div class="main__order-info-item">
                    <span class="main__order-info-name">Статус:</span>
                    <span class="main__order-info-value main__order-status">${a.statusOrder}</span>
                </div>
            </div>
        </div>
        <div class="main__order-btns">
            <div class="main__order-delete">
                <div class="main__order-delete-line"></div>
                <div class="main__order-delete-line"></div>
            </div>
            <div class="arrow">
                <div class="arrow__line"></div>
                <div class="arrow__line"></div>
            </div>
        </div>
        `;
        orderContent.innerHTML = order;
        orderCont.appendChild(orderContent);
        ordersList.appendChild(orderCont);
}
//цвет статуса заказа
if(orderStatus != null) {
    switch (orderStatus.innerHTML) {
        case 'Оплачен':
            orderStatus.style.color = '#1E90FF'; //blue
            break;
        case 'Изготавливается':
            orderStatus.style.color = '#6A5ACD'; //SlateBlue
            break;
        case 'Готов к отгрузке':
            orderStatus.style.color = '#228B22'; //green
            break;
        default:
            orderStatus.style.color = '#262626'; //black
            break;
    }
}

function createOrderItem(b, orderItemsList) {
    
    const orderItemContent = document.createElement('li');
    orderItemContent.classList.add('main__order-item');

    const orderItem = 
    `
    <div class="main__order-item-info">
        <img class="main__order-item-photo" src=${b['itemPhoto']} />
    </div>
    <div class="main__order-item-info">
        <span class="main__order-info-name">Название товара:</span>
        <span class="main__order-info-value">${b['itemName']}</span>
    </div>
    <div class="main__order-item-info">
        <span class="main__order-info-name">Кол-во:</span>
        <span class="main__order-info-value">${b['itemCount']}</span>
    </div>
    <div class="main__order-item-info">
        <span class="main__order-info-name">Цена товара:</span>
        <span class="main__order-info-value">${setTextPrice((+b['itemPrice'] * +b['itemCount']).toString())}</span>
    </div>
    `;
    orderItemContent.innerHTML = orderItem;
    orderItemsList.appendChild(orderItemContent);
    const allOrders = document.querySelectorAll('.main__order');
    allOrders[allOrders.length - 1].appendChild(orderItemsList);

}

//Добавляем класс active к иконке бургера и ему самому
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active-burger');
    modalBurger.classList.toggle('active-menu-burger');
})

burgerProfileBtn.addEventListener('click', ()=>{
    burgerMenu.classList.remove('active-burger');
    modalBurger.classList.remove('active-menu-burger');
})

if(!JSON.parse(localStorage.getItem('loggedUser'))) {
    window.location.href = '../../index.html';
}

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

ordersList.addEventListener('click', (e)=>{
    const item = e.target;
    if(item.closest('.main__order-delete')) {
        //Удаляем заказ
        const mainOrder = item.closest('.main__order');
        mainOrder.classList.add('main__order_hidden');
        setTimeout(()=>{
            item.closest('.main__order').remove();
        },300);

        const orderId = +mainOrder.dataset['idorder'];
        orders.forEach((item,i)=>{;
            if(item['idOrder'] === orderId) {
                orders.splice(i, 1);
                loggedUser2[0]['orders'] = orders;
                localStorage.setItem('loggedUser', JSON.stringify(loggedUser2));
                users.forEach((user,i)=>{
                    if(user.phone === loggedUser2[0].phone & user.password === loggedUser2[0].password) {
                        users.splice(i, 1, loggedUser2[0]);
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                })
            }
        })
        if(JSON.parse(localStorage.getItem('loggedUser'))[0]['orders'].length < 1) {
            window.location.reload();

        }
    } else if(item.closest('.main__order')) {
        const orderItemsList = item.closest('.main__order').querySelector('.main__order-items');
        const orderItemArrow = item.closest('.main__order').querySelector('.arrow');
        orderItemsList.classList.toggle('main__order-items_active');
        orderItemArrow.classList.toggle('arrow_active');
    }
})

//Устанавливаем информацию в ЛК из localStorage
userInfoConts[0].textContent = JSON.parse(localStorage.getItem('loggedUser'))[0]['fio'];
userInfoConts[1].textContent = JSON.parse(localStorage.getItem('loggedUser'))[0]['phone'];
unviewedPassword(userInfoConts[2], JSON.parse(localStorage.getItem('loggedUser'))[0]['password']);


//Показ и скрытие пароля
viewPassword.addEventListener('click', ()=>{
    const password = JSON.parse(localStorage.getItem('loggedUser'))[0]['password'];
    const passwordText = document.querySelector('.main__password-view');
    
    if(passwordText.classList.contains('main__password-unview')) {
        viewedPassword(userInfoConts[2], password);
        passwordText.classList.remove('main__password-unview')
    } else {
        unviewedPassword(userInfoConts[2], password);
        passwordText.classList.add('main__password-unview')
    }
})
function viewedPassword(elem, password){
    elem.textContent = password;
    viewPassword.textContent = 'Скрыть пароль';
    return;
}
function unviewedPassword(elem, password){
    const unviewPassword = '*'.repeat(password.length);
    elem.textContent = unviewPassword;
    viewPassword.textContent = 'Показать пароль';
    return;
}

ordersBtn.addEventListener('click', ()=>{
    window.location.href = "../pages/shop-cart.html";
})

function setTextPrice(price) {
    // Цена более 999.999
    if (price.length > 6) {
        //Миллион
        let rangeInputVal1 = price.slice(0, price.length-6);
        //Сотни тысяч
        let rangeInputVal2 = price.slice(price.length-6, price.length-3);
        //Сотни
        let rangeInputVal3 = price.slice(price.length-3);

        return `${rangeInputVal1}.${rangeInputVal2}.${rangeInputVal3} ₽`;
    }
    let rangeInputVal1 = price.slice(0, price.length-3);
    let rangeInputVal2 = price.slice(price.length-3);
    return `${rangeInputVal1}.${rangeInputVal2} ₽`;
}