const orderBtn = document.querySelector('.main__btn-order');
const nullCont = document.querySelector('.main__null-cont');
const mainCont = document.querySelector('.main');
//Локальная корзина товаров
let shopCart = localStorage.getItem("shopCart") ? JSON.parse(localStorage.getItem("shopCart")) : [];
const cardsCont = document.querySelector('.main__body');
setPageShopCart();

const burgerMenu = document.querySelector('.nav__burger'),
    modalBurger = document.querySelector('.header__burger-menu'),
    burgerProfileBtn = document.querySelector('.header__burger-profile');
const footerSection = document.querySelectorAll('.footer__section');
const contWithCards = document.querySelector('.main__body');

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

contWithCards.addEventListener('click', (e) => {
    btnClick(e);
})

orderBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    //Создание уведомления
    const compliteOrder = document.createElement('div');
    compliteOrder.classList.add('main__order-complite');
    compliteOrder.classList.add('main__order-complite_active');
    const compliteOrderText = document.createElement('h3');
    compliteOrderText.classList.add('main__order-complite-text');
    compliteOrderText.textContent = 'Заказ оформлен';
    compliteOrder.appendChild(compliteOrderText);
    mainCont.appendChild(compliteOrder);
    setTimeout(()=>{
        compliteOrder.classList.remove('main__order-complite_active');
    },1000)
    //Отправка заказа в LS
    localStorage.setItem('order', JSON.stringify(shopCart));
})

function btnClick(e) {
    const countBtnName = e.target.getAttribute('id');
    if (countBtnName === 'count-btn-minus') {
        minusCount(e);
    } else if (countBtnName === 'count-btn-plus') {
        plusCount(e);
    } else if (countBtnName === 'del-btn') {
        deleteCard(e.target);
    } else if (e.target.parentElement.getAttribute('id') === 'del-btn') {
        deleteCard(e.target.parentElement);
    }
}


function setPageShopCart() {
    if (shopCart.length >= 1) {
        nullCont.style.display = 'none';
        shopCart.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('main__card');
            card.setAttribute('data-itemId', item['itemId']);
            card.setAttribute('data-collectionName', item['collectionName']);
            const itemShopCart = `
            <div class="main__card-photo-block">
                <img src="${item['itemPhoto']}" alt="shop-cart__product" class="main__card-photo">
            </div>
            <div class="main__card-content-wrapper">
                <div class="main__card-header">
                    <h2 class="main__card-title">${item['itemName']}</h2>
                    <div class="main__delete-btn" id="del-btn">
                        <div class="main__delete-btn-line"></div>
                        <div class="main__delete-btn-line"></div>
                    </div>
                </div>
                <div class="main__card-body">
                    <div class="main__card-info">
                        <div class="main__card-info-item">
                            <span class="main__info-title">Коллекция:</span>
                            <span class="main__info-value">${item['collectionName']}</span>
                        </div>
                        <div class="main__card-info-item">
                            <span class="main__info-title">Материал:</span>
                            <span class="main__info-value">${item['itemMaterial']}</span>
                        </div>
                        <div class="main__card-info-item">
                            <span class="main__info-title">Габариты (Д x Ш x В):</span>
                            <span class="main__info-value">${item['itemSize']}</span>
                        </div>
                        <div class="main__card-info-item">
                            <span class="main__info-title">Количество:</span>
                            <div class="main__count-cont">
                                <div class="main__count-btn main__btn" id="count-btn-minus">-</div>
                                <span class="main__count-value main__info-value">${item['itemCount']}</span>
                                <div class="main__count-btn main__btn" id="count-btn-plus">+</div>
                            </div>
                        </div>
                    </div>
                    <div class="main__card-price">
                        <span class="main__info-title">Цена:</span>
                        <span class="main__info-value main__info-price" data-ownitemprice="${item['itemPrice']}" data-itemprice="${+item['itemPrice'] * +item['itemCount']}">${setTextPrice((item['itemPrice'] * +item['itemCount']).toString())}</span>
                    </div>
                </div>
            </div>`;
            card.innerHTML = itemShopCart;
            cardsCont.appendChild(card);
        })
    } else {
        nullCont.style.display = 'flex';
    }
}

function setTextPrice(price) {
    // Цена более 999.999
    if (price.length > 6) {
        //Миллион
        let rangeInputVal1 = price.slice(0, price.length - 6);
        //Сотни тысяч
        let rangeInputVal2 = price.slice(price.length - 6, price.length - 3);
        //Сотни
        let rangeInputVal3 = price.slice(price.length - 3);

        return `${rangeInputVal1}.${rangeInputVal2}.${rangeInputVal3} ₽`;
    }
    let rangeInputVal1 = price.slice(0, price.length - 3);
    let rangeInputVal2 = price.slice(price.length - 3);
    return `${rangeInputVal1}.${rangeInputVal2} ₽`;
}

function deleteCard(item) {
    const card = item.parentElement.parentElement.parentElement;
    card.classList.add('main__card-del');

    const idItem = card.dataset['itemid'];
    const nameCollection = card.dataset['collectionname'];
    shopCart.forEach((item, i) => {
        if (item['itemId'] === idItem && item['collectionName'] === nameCollection) {
            shopCart.splice(i, 1);
            localStorage.setItem('shopCart', JSON.stringify(shopCart));
            if(JSON.parse(localStorage.getItem('shopCart')).length < 1) {
                nullCont.style.display = 'flex';
            } else {
                nullCont.style.display = 'none';
            }
        }
    })
    setTimeout(() => {
        card.remove();
    }, 300);
}

function plusCount(e) {
    const countBtnName = e.target.getAttribute('id');
    const itemPrice = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.main__info-price');
    const startPrice = itemPrice.dataset['ownitemprice'];

    let itemPriceValue = itemPrice.dataset['itemprice'];
    let countBtn = e.target.parentElement.querySelector('.main__count-value');
    let countValue = +e.target.parentElement.querySelector('.main__count-value').textContent;
    if (countBtnName === 'count-btn-plus') {
        //Ограничение на заказ максимум 100 товаров
        if (countValue >= 100) return;
        //Меняем значение счетчика
        countValue++;
        countBtn.textContent = countValue;
        //Меняем значение цены товара
        let resPrice = +itemPriceValue + +startPrice;
        //Меняем дата атрибут цены
        itemPrice.dataset.itemprice = `${resPrice}`;
        //Меняем текстовое значение цены
        itemPrice.textContent = setTextPrice(`${resPrice}`);
        return;
    }
}

function minusCount(e) {
    const countBtnName = e.target.getAttribute('id');
    const itemPrice = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.main__info-price');
    const startPrice = itemPrice.dataset['ownitemprice'];

    let itemPriceValue = itemPrice.dataset['itemprice'];
    let countBtn = e.target.parentElement.querySelector('.main__count-value');
    let countValue = +e.target.parentElement.querySelector('.main__count-value').textContent;
    if (countBtnName === 'count-btn-minus') {
        if (countValue < 2) return;
        //Меняем значение счетчика
        countValue--;
        countBtn.textContent = countValue;
        //Меняем значение цены товара
        let resPrice = +itemPriceValue - +startPrice;
        //Меняем дата атрибут цены
        itemPrice.dataset.itemprice = `${resPrice}`;
        //Меняем текстовое значение цены
        itemPrice.textContent = setTextPrice(`${resPrice}`);
        return;
    }
}