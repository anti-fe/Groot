const mainCont = document.querySelector('.main');
let shopCart = localStorage.getItem("shopCart") ? JSON.parse(localStorage.getItem("shopCart")) : [];
const cardsCont = document.querySelector('.main__body');
setPageShopCart();

const burgerMenu = document.querySelector('.nav__burger'),
    modalBurger = document.querySelector('.header__burger-menu'),
    burgerProfileBtn = document.querySelector('.header__burger-profile');
const footerSection = document.querySelectorAll('.footer__section');
const contWithCards = document.querySelector('.main__body');

//Локальная корзина товаров


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

contWithCards.addEventListener('click',(e)=>{
    setCountItem(e);
})


function setPageShopCart() {
    if (shopCart) {
        shopCart.forEach(item=>{
            const card = document.createElement('div');
            card.classList.add('main__card');
    
            const itemShopCart = `
            <div class="main__card-photo-block">
                <img src="${item['itemPhoto']}" alt="shop-cart__product" class="main__card-photo">
            </div>
            <div class="main__card-content-wrapper">
                <div class="main__card-header">
                    <h2 class="main__card-title">${item['itemName']}</h2>
                    <div class="main__delete-btn">
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
                                <span class="main__count-value main__info-value">1</span>
                                <div class="main__count-btn main__btn" id="count-btn-plus">+</div>
                            </div>
                        </div>
                    </div>
                    <div class="main__card-price">
                        <span class="main__info-title">Цена:</span>
                        <span class="main__info-value main__info-price" data-ownitemprice="${item['itemPrice']}" data-itemprice="${item['itemPrice']}">${setTextPrice(item['itemPrice'].toString())}</span>
                    </div>
                </div>
            </div>`;
            card.innerHTML = itemShopCart;
            cardsCont.appendChild(card);
        })
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

function setCountItem(e) {
    const startPrice = document.querySelector('.main__info-price').dataset['ownitemprice'];
    const countBtnName = e.target.getAttribute('id');
    const itemPrice = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.main__info-price');
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
    } else if (countBtnName === 'count-btn-plus') {
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