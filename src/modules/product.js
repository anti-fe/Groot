//Генерация страницы товара
const mainCont = document.querySelector('.main');
const product = JSON.parse(localStorage.getItem('product'));
setPageProduct();

const burgerMenu = document.querySelector('.nav__burger'),
    modalBurger = document.querySelector('.header__burger-menu'),
    burgerProfileBtn = document.querySelector('.header__burger-profile');
    shopCartBtns = document.querySelectorAll('.shop-cart-btn');
const footerSection = document.querySelectorAll('.footer__section');
const countCont = document.querySelector('.main__product-count-cont');
const addInShopCart = document.querySelector('.main__add-product');

const collectionList = JSON.parse(localStorage.getItem('collections'));
//Локальная корзина товаров
let shopCart = localStorage.getItem("shopCart") ? JSON.parse(localStorage.getItem("shopCart")) : [];

countCont.addEventListener('click',(e)=>{
    setCountItem(e);
})
addInShopCart.addEventListener('click',(e)=>{
    e.preventDefault();
    
    //top:37 
    //left:1071

    const parentItem = e.target.parentElement.parentElement.parentElement.parentElement;
    if(addInShopCart.classList.contains('main__add-product_active')) {
        window.location.href = "shop-cart.html";
    } else if (addInShopCart.classList.contains('main__add-product')) {
        addToShopCart(parentItem);
        addInShopCart.classList.add('main__add-product_active');

        //Предупреждение о добавлении товара в корзину
        const warningAdd = document.createElement('div');
        warningAdd.classList.add('main__warning-add');
        const warningAddText = document.createElement('h3');
        warningAddText.textContent = 'Товар добавлен в корзину';
        warningAddText.classList.add('main__warning-add-text');
        warningAdd.appendChild(warningAddText);
        mainCont.appendChild(warningAdd);

        warningAdd.classList.add('main__warning-add_active');
        setTimeout(()=>{
            warningAdd.classList.remove('main__warning-add_active');
        }, 1000);
    }
})

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
burgerProfileBtn.addEventListener('click', ()=>{
    burgerMenu.classList.remove('active-burger');
    modalBurger.classList.remove('active-menu-burger');
})
//Берем всю информацию хранящуюся в дата атрибутах карточки
function getInfoCard(item) {
    const itemId = item.dataset['itemid'];
    const collectionName = item.dataset['collectionname'];
    const itemName = item.dataset['itemname'];
    const itemType = item.dataset['itemtype'];
    const itemPrice = item.dataset['itemprice'];
    const itemMaterial = item.dataset['itemmaterial'];
    const itemSize = item.dataset['itemsize'];
    const itemPhoto = item.dataset['itemimg'];

    const cardInfo = {
        "itemId":itemId,
        "collectionName":collectionName,
        "itemName":itemName,
        "itemType":itemType,
        "itemPrice":itemPrice,
        "itemMaterial":itemMaterial,
        "itemSize":itemSize,
        "itemPhoto":itemPhoto,
    }
    return cardInfo;
}

function addToShopCart(item) {
    const cardInfo = getInfoCard(item);
    const product = {
        "itemId": cardInfo["itemId"],
        "collectionName": cardInfo["collectionName"],
        "itemName": cardInfo["itemName"],
        "itemType": cardInfo["itemType"],
        "itemPrice": cardInfo["itemPrice"],
        "itemMaterial": cardInfo["itemMaterial"],
        "itemSize": cardInfo["itemSize"],
        "itemPhoto": cardInfo["itemPhoto"]
    }
    //Добавляем товар в локальную корзину товаров
    shopCart.push(product);
    //Добавляем локальную корзину товаров в LS
    localStorage.setItem('shopCart', JSON.stringify([...new Set(shopCart)]));
}


function setPageProduct() {
    if (product) {
        const mainWrapper = document.createElement('div');
        mainWrapper.classList.add('main__wrapper');
        const productPage = `
        <div class="main__header">
                <h1 class="main__title">${product['itemName']}</h1>
            </div>
            <div class="main__body">
                <div class="main__product-photo-cont">
                    <img class="main__product-img" src="${product['itemPhoto']}" alt="${product['itemType']}">
                </div>
                <div class="main__product-info">
                    <div class="main__product-photos">
                        <div class="main__product-photo-cont">
                            <img class="main__product-else-img" src="${product['itemPhoto']}" alt="${product['itemType']}">
                        </div>
                        <div class="main__product-photo-cont">
                            <img class="main__product-else-img" src="${product['itemPhoto']}" alt="${product['itemType']}">
                        </div>
                        <div class="main__product-photo-cont">
                            <img class="main__product-else-img" src="${product['itemPhoto']}" alt="${product['itemType']}">
                        </div>
                        
                    </div>
                    <div class="main__product-prop">
                        <div class="main__product-material main__product-prop-item">
                            <span class="main__product-prop-name">Материал:</span>
                            <span class="main__product-prop-value">${product['itemMaterial']}</span>
                        </div>
                        <div class="main__product-size main__product-prop-item">
                            <span class="main__product-prop-name">Габариты  (Д × Ш × В):</span>
                            <span class="main__product-prop-value">${product['itemSize']}</span>
                        </div>
                        <div class="main__product-count main__product-prop-item">
                            <span class="main__product-prop-name">Количество:</span>
                            <div class="main__product-count-cont main__product-prop-value-cont">
                                <div class="main__product-count-btn main__btn" id="count-btn-minus">-</div>
                                <span class="main__product-count-value main__product-prop-value">1</span>
                                <div class="main__product-count-btn main__btn" id="count-btn-plus">+</div>
                            </div>
                        </div>
                        <div class="main__product-res">
                            <div class="main__product-price main__product-prop-item">
                                <span class="main__product-price-name main__product-prop-name">Итоговая цена:</span>
                                <span class="main__product-price-value main__product-prop-value" data-ownitemprice="${product['itemPrice']}" data-itemprice="${product['itemPrice']}">${setTextPrice(product['itemPrice'])}</span>
                            </div>
                            <button class="main__add-product main__btn">Добавить в корзину</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            
            mainWrapper.innerHTML = productPage;
            mainCont.appendChild(mainWrapper);

            const mainBody = document.querySelector('.main__body');
            mainBody.setAttribute('data-itemId', product['itemId']);
            mainBody.setAttribute('data-itemName', product['itemName']);
            mainBody.setAttribute('data-collectionName', product['collectionName']);
            mainBody.setAttribute('data-itemType', product['itemType']);
            mainBody.setAttribute('data-itemMaterial', product['itemMaterial']);
            mainBody.setAttribute('data-itemPrice', product['itemPrice']);
            mainBody.setAttribute('data-itemSize', product['itemSize']);
            mainBody.setAttribute('data-itemImg', product['itemPhoto']);
    }
}

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

function setCountItem(e) {
    const startPrice = document.querySelector('.main__product-price-value').dataset['ownitemprice'];
    const countBtnName = e.target.getAttribute('id');
    let itemPrice = document.querySelector('.main__product-price-value');
    let itemPriceValue = document.querySelector('.main__product-price-value').dataset['itemprice'];
    
    let countBtn = e.target.parentElement.querySelector('.main__product-count-value');
    let countValue = +e.target.parentElement.querySelector('.main__product-count-value').textContent;

    if(countBtnName === 'count-btn-minus') {
        if(countValue < 2) return;
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
    } else if(countBtnName === 'count-btn-plus') {
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