const mainCont = document.querySelector('.main')
const footerSection = document.querySelectorAll('.footer__section');
const burgerMenu = document.querySelector('.nav__burger'),
    modalBurger = document.querySelector('.header__burger-menu'),
    burgerProfileBtn = document.querySelector('.header__burger-profile');
const filterCollectionItems = document.querySelector('#filter-collection-items');
const rangeInput = document.querySelector('.main__filter-range'),
    rangeValue = document.querySelector('.main__filter-res-price');
const cardsList = document.querySelector('.main__cards-list');
const filterIcon = document.querySelector('.main__filter-icon'),
    mainFilter = document.querySelector('.main__filter');
const minPrice = document.querySelectorAll('.main__filter-range-price')[0],
    maxPrice = document.querySelectorAll('.main__filter-range-price')[1];
const searchInput = document.querySelector('.main__search-input'),
    searchBtn = document.querySelector('.main__search-btn');

const allUsers = JSON.parse(localStorage.getItem('users'));
const loggUser = JSON.parse(localStorage.getItem('loggedUser'));
let shopCartLS = [];
if(localStorage.getItem('loggedUser')) {
    allUsers.forEach(user=>{
        if((user['phone'] === loggUser[0]['phone']) && (user['password'] === loggUser[0]['password'])) {
            user['shopCart'] ? shopCartLS = user['shopCart'] : false
        }
    })
}

//Модальное окно
page = document.querySelector('body');
modalWindow = document.querySelector('.modal-window');
headerNav = document.querySelector('.header__nav');

let inputVal;

//Локальная корзина товаров
let shopCart = localStorage.getItem("shopCart") ? JSON.parse(localStorage.getItem("shopCart")) : [];

//Переход на страницу с товаром 
setTimeout(() => {
    const cardsListWithCards = document.querySelector('.main__cards-list');
    cardsListWithCards.addEventListener('click', (e) => {
        const item = e.target;
        const secondParentItem = e.target.parentElement.parentElement;
        //Если пользователь кликнул на карточку товара
        if(item.classList.contains('card__btn_active')) {
            window.location.href = "shop-cart.html";
        } else if (item.classList.contains('card__btn')) {
            //Проверяем зашел ли пользователь в аккаунт
            if(!localStorage.getItem('loggedUser')) {
                modalWindow.style.visibility = 'visible';
                modalWindow.style.transform = 'translateY(1080px)';
                headerNav.style.display = 'none';
                page.style.overflowY = 'hidden';
            } else {
                addToShopCart(secondParentItem);
                item.classList.add('card__btn_active');

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
        } else if (secondParentItem.classList.contains('main__card')) {
            createProductPage(secondParentItem);
        } else if (item.classList.contains('main__card')) {
            createProductPage(item);
        }
    });
});

//Берем всю информацию хранящуюся в дата атрибутах карточки
function getInfoCard(item) {
    const itemCount = item.dataset['itemcount'];
    const itemId = item.dataset['itemid'];
    const collectionName = item.dataset['collectionname'];
    const itemName = item.dataset['itemname'];
    const itemType = item.dataset['itemtype'];
    const itemPrice = item.dataset['itemprice'];
    const itemMaterial = item.dataset['itemmaterial'];
    const itemSize = item.dataset['itemsize'];
    const itemPhoto = item.dataset['itemimg'];

    const cardInfo = {
        "itemCount":itemCount,
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
    const cardInfo = getInfoCard(item);;
    const product = {
        "itemCount": cardInfo["itemCount"],
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
    shopCartLS.push(product);
    //Добавляем локальную корзину товаров в LS
    loggUser[0]['shopCart'] = shopCartLS;
    allUsers.forEach(user=>{
        if((user['phone'] === loggUser[0]['phone']) && (user['password'] === loggUser[0]['password'])) {
            user['shopCart'] = shopCartLS;
        }
    })
    // localStorage.setItem('shopCart', JSON.stringify([...new Set(shopCart)]));
    localStorage.setItem('users', JSON.stringify(allUsers))
    localStorage.setItem('loggedUser', JSON.stringify(loggUser))
    
}

function createProductPage(item) {
    const cardInfo = getInfoCard(item);
    const product = {
        "itemCount": cardInfo["itemCount"],
        "itemId": cardInfo["itemId"],
        "collectionName": cardInfo["collectionName"],
        "itemName": cardInfo["itemName"],
        "itemType": cardInfo["itemType"],
        "itemPrice": cardInfo["itemPrice"],
        "itemMaterial": cardInfo["itemMaterial"],
        "itemSize": cardInfo["itemSize"],
        "itemPhoto": cardInfo["itemPhoto"]
    }
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = '../pages/product.html';
}

mainFilter.addEventListener('change', (e) => {
    getFilter(e);
});

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

//Collection checkbox value
const collectionList = JSON.parse(localStorage.getItem('collections'));

searchBtn.addEventListener('click', searchFilterItems);

function setTextPrice(price) {
    let rangeInputVal1 = price.slice(0, price.length - 3);
    let rangeInputVal2 = price.slice(price.length - 3);
    return `${rangeInputVal1}.${rangeInputVal2} ₽`;
}

// Сортировка товара при вводе в поиск
function searchFilterItems(e) {
    e.preventDefault();
    const allCards = document.querySelectorAll('.main__card');

    if (!searchInput.value.trim() === '') {
        cardsList.innerHTML = null;
        createCard();
    } else {
        [...allCards].forEach(item => {
            if (item.classList.contains('card_hidden')) {
                item.classList.remove('card_hidden');
            }
        })
    }

    let textInput = searchInput.value.trim().toLowerCase();
    [...allCards].forEach(item => {
        let cardName = item.querySelector('.card__name').textContent;
        if (cardName.toLowerCase().indexOf(textInput) != -1) {
            item.classList.add('card_visible');
            item.classList.remove('card_hidden');
        } else {
            item.classList.add('card_hidden');
            item.classList.remove('card_visible');
        }
    })
}

function setCollectionCheckbox() {
    collectionList.forEach(item => {
        const filterOption = document.createElement('div');
        filterOption.classList.add('main__filter-option');

        const option = `
        <div class="main__filter-checkbox">
            <input class="main__filter-checkbox-btn" data-filter='${item['nameCollection']}' type="checkbox" name="filter-collection" id="filter-${item['nameCollection']}">
            <div class="main__filter-cust-checkbox"></div>
        </div>
        <label class="main__filter-label" for="filter-${item['nameCollection']}">${item['nameCollection']}</label>
        `

        filterOption.innerHTML = option;
        filterCollectionItems.appendChild(filterOption);
    })
}
setCollectionCheckbox();

function setInputValue() {
    if (rangeInput.value.length === 4) {
        let rangeInputVal1 = rangeInput.value.slice(0, 1);
        let rangeInputVal2 = rangeInput.value.slice(1);
        inputVal = `${rangeInputVal1}${rangeInputVal2}`;
        rangeValue.innerHTML = `до ${rangeInputVal1}.${rangeInputVal2} ₽`;
    } else if (rangeInput.value.length === 5) {
        let rangeInputVal1 = rangeInput.value.slice(0, 2);
        let rangeInputVal2 = rangeInput.value.slice(2);
        inputVal = `${rangeInputVal1}${rangeInputVal2}`;
        rangeValue.innerHTML = `до ${rangeInputVal1}.${rangeInputVal2} ₽`;
    } else if (rangeInput.value.length === 6) {
        let rangeInputVal1 = rangeInput.value.slice(0, 3);
        let rangeInputVal2 = rangeInput.value.slice(3);
        inputVal = `${rangeInputVal1}${rangeInputVal2}`;
        rangeValue.innerHTML = `до ${rangeInputVal1}.${rangeInputVal2} ₽`;
    }
}
setInputValue();

//Range input
rangeInput.addEventListener('input', () => {
    setInputValue();
})
//Range min and max price
function setMinMaxPrice() {
    let pricesItems = [];
    collectionList.forEach(item => {
        item['collectionItems'].forEach(elem => {
            pricesItems.push(elem['priceItem'])
        })
    })
    let maxPriceItem = Math.max.apply(null, pricesItems);
    let minPriceItem = Math.min.apply(null, pricesItems);
    //Устанавливаем min max атрибуты input range
    rangeInput.setAttribute("min", minPriceItem);
    rangeInput.setAttribute("max", maxPriceItem);
    //Устанавливаем текстовые значения около input range
    maxPrice.innerText = setTextPrice(maxPriceItem.toString());
    minPrice.innerText = setTextPrice(minPriceItem.toString());
}
setMinMaxPrice();

//Open filter on mobile
filterIcon.addEventListener('click', () => {
    mainFilter.classList.toggle('main__filter_active');
})

//Create card
function createCard() {
    collectionList.forEach(item => {
        item['collectionItems'].forEach((elem,i) => {

            const cardCont = document.createElement('div');
            cardCont.classList.add('main__card', 'card', 'card_visible');
            cardCont.setAttribute('data-itemCount', 1);
            cardCont.setAttribute('data-itemId', elem['idItem']);
            cardCont.setAttribute('data-itemName', elem['nameItem']);
            cardCont.setAttribute('data-collectionName', item['nameCollection']);
            cardCont.setAttribute('data-itemType', elem['typeItem']);
            cardCont.setAttribute('data-itemMaterial', elem['materialItem']);
            cardCont.setAttribute('data-itemPrice', elem['priceItem']);
            cardCont.setAttribute('data-itemSize', elem['sizeItem']);
            cardCont.setAttribute('data-itemImg', elem['photoItem']);

            const card = `
            <div class="card__img-block">
                <img class="card__img" src="${elem['photoItem']}" alt="product-img">
            </div>
            <div class="card__header">
                <h3 class="card__collection">${item['nameCollection']}</h3>
                <h3 class="card__name">${elem['nameItem']}</h3>
            </div>
            <div class="card__main">
                <span class="card__price">${setTextPrice(elem['priceItem'].toString())}</span>
                <button class="card__btn main__btn">В корзину</button>
            </div>
            `
            cardCont.innerHTML = card;
            cardsList.appendChild(cardCont);
        })
    })
}
createCard();

function createOneCard(itemId ,nameItem, nameCollection, typeItem, priceItem, materialItem, sizeItem, itemImg) {
    const cardCont = document.createElement('div');
    cardCont.classList.add('main__card', 'card', 'card_visible');
    cardCont.setAttribute('data-itemCount', 1);
    cardCont.setAttribute('data-itemId', itemId);
    cardCont.setAttribute('data-itemName', nameItem);
    cardCont.setAttribute('data-collectionName', nameCollection);
    cardCont.setAttribute('data-itemType', typeItem);
    cardCont.setAttribute('data-itemMaterial', materialItem);
    cardCont.setAttribute('data-itemPrice', priceItem);
    cardCont.setAttribute('data-itemSize', sizeItem);
    cardCont.setAttribute('data-itemImg', itemImg);

    const card = `
    <div class="card__img-block">
        <img class="card__img" src="${itemImg}" alt="product-img">
    </div>
    <div class="card__header">
        <h3 class="card__collection">${nameCollection}</h3>
        <h3 class="card__name">${nameItem}</h3>
    </div>
    <div class="card__main">
        <span class="card__price">${setTextPrice(priceItem.toString())}</span>
        <button class="card__btn main__btn">В корзину</button>
    </div>
    `
    cardCont.innerHTML = card;
    cardsList.appendChild(cardCont);
}

let allItemsCollection = [];
collectionList.forEach(item => {
    item['collectionItems'].forEach(elem => {
        allItemsCollection.push(elem);
    })
})
// Filter card
function getFilter(e) {
    const cards = document.querySelectorAll('.main__card');
    const dataFilter = e.target.dataset["filter"];
    const dataFilterType = e.target.getAttribute("name");
    let hiddenCards;

    let checkboxCollection = document.querySelectorAll('[name="filter-collection"]');
    let checkedCollection = [...checkboxCollection].filter((item => item.checked));
    let checkedCollectionName = [...checkedCollection].map((item => item.dataset["filter"]));

    let checkboxType = document.querySelectorAll('[name="filter-type"]');
    let checkedType = [...checkboxType].filter((item => item.checked));
    let checkedTypeName = [...checkedType].map((item => item.dataset["filter"]));

    function filterPrice() {
        let sortedItemPrice = allItemsCollection.filter(item => {
            if (checkedTypeName.length === 0 && checkedCollectionName.length > 0) {
                if (item['priceItem'] <= +inputVal && checkedCollectionName.includes(item['nameCollection'])) {
                    return item;
                }
            } else if (checkedTypeName.length > 0 && checkedCollectionName.length === 0) {
                if (item['priceItem'] <= +inputVal && checkedTypeName.includes(item['typeItem'])) {
                    return item;
                }
            } else if (checkedTypeName.length > 0 && checkedCollectionName.length > 0) {
                if (item['priceItem'] <= +inputVal && checkedTypeName.includes(item['typeItem']) && checkedCollectionName.includes(item['nameCollection'])) {
                    return item;
                }
            } else {
                if (item['priceItem'] <= +inputVal) {
                    return item;
                }
            }
        });
        cardsList.innerHTML = null;
        sortedItemPrice.forEach(item => {
            createOneCard(item['idItem'], item['nameItem'], item['nameCollection'], item['typeItem'], item['priceItem'], item['materialItem'], item['sizeItem'], item['photoItem']);
        })
    }

    function filterType() {
        checkboxCollection = document.querySelectorAll('[name="filter-collection"]');
        checkedCollection = [...checkboxCollection].filter((item => item.checked));
        checkedCollectionName = [...checkedCollection].map((item => item.dataset["filter"]));

        checkboxType = document.querySelectorAll('[name="filter-type"]');
        checkedType = [...checkboxType].filter((item => item.checked));
        checkedTypeName = [...checkedType].map((item => item.dataset["filter"]));

        //Те карточки товаров, которые не скрыты
        visibleCards = [...cards].filter(item => {
            if (item.classList.contains('card_visible')) {
                return item;
            }
        })
        const sorted = visibleCards.filter((item) => {
            const typeEl = item.dataset['itemtype'];

            if (!checkedTypeName.includes(typeEl)) {
                item.classList.add('card_hidden');
                item.classList.remove('card_visible');
            } else if (checkedTypeName.includes(typeEl)) {
                item.classList.add('card_visible');
                item.classList.remove('card_hidden');
            }
        });

        //Те карточки товаров, которые скрыты
        hiddenCards = [...cards].filter(item => {
            if (item.classList.contains('card_hidden') || checkedCollectionName.includes(item.dataset['collectionname'])) {
                return item;
            }
        })
        if (checkedTypeName.length < 1) {
            hiddenCards.filter((item) => {
                if (checkedCollectionName.includes(item.dataset['collectionname'])) {
                    item.classList.remove('card_hidden');
                    item.classList.add('card_visible');
                }
            })
        }
    }

    if (dataFilter === 'descending') {
        const sorted = [...cards].sort((a, b) => {
            const priceElA = a.dataset['itemprice'];
            const priceElB = b.dataset['itemprice'];
            return +priceElB - +priceElA;
        });
        cardsList.innerHTML = null;
        sorted.forEach(el => cardsList.appendChild(el));
    } else if (dataFilter === 'ascending') {
        const sorted = [...cards].sort((a, b) => {
            const priceElA = a.dataset['itemprice'];
            const priceElB = b.dataset['itemprice'];
            return +priceElA - +priceElB;
        });
        cardsList.innerHTML = null;
        sorted.forEach(el => cardsList.appendChild(el));
    } else if (dataFilter === 'default') {
        cardsList.innerHTML = null;
        createCard();
    } else if (dataFilterType === 'filter-collection') {
        //При фильтрации очищать поиск 
        searchInput.value = '';

        checkboxCollection = document.querySelectorAll('[name="filter-collection"]');
        checkedCollection = [...checkboxCollection].filter((item => item.checked));
        checkedCollectionName = [...checkedCollection].map((item => item.dataset["filter"]));

        const sorted = [...cards].filter((item) => {
            const collectionEl = item.dataset['collectionname'];

            if (!checkedCollectionName.includes(collectionEl)) {
                item.classList.add('card_hidden');
                item.classList.remove('card_visible');
            } else {
                item.classList.add('card_visible');
                item.classList.remove('card_hidden');
            }
        });

        //Если ни одна коллекция не выбрана возвращать все карточки товаров    
        if (checkedCollectionName.length < 1) {
            checkboxCollection.forEach(item => {
                checkedCollectionName.push(item.dataset['filter']);
            });

            [...cards].filter((item) => {
                item.classList.add('card_active');
                item.classList.remove('card_hidden');

            })
        }
    } else if (dataFilterType === 'filter-type') {
        //При фильтрации очищать поиск 
        searchInput.value = '';

        filterPrice()
        filterType()
    } else if (dataFilter === 'price') {
        //При фильтрации очищать поиск 
        searchInput.value = '';

        filterType()
        filterPrice()
    }
}
