const footerSection = document.querySelectorAll('.footer__section');
const burgerMenu = document.querySelector('.nav__burger'),
    modalBurger = document.querySelector('.header__burger-menu'),
    burgerProfileBtn = document.querySelector('.header__burger-profile'),
    logOutBtn = document.querySelectorAll('.log-out-btn');
const filterCollectionItems = document.querySelector('#filter-collection-items'),
    filterTypeItems = document.querySelector('#filter-type-items');
const rangeInput = document.querySelector('.main__filter-range'),
    rangeValue = document.querySelector('.main__filter-res-price'),
    rangePrices = document.querySelectorAll('.main__filter-range-price');
const cardsList = document.querySelector('.main__cards-list');
const filterIcon = document.querySelector('.main__filter-icon'),
    mainFilter = document.querySelector('.main__filter'),
    filterBtn = document.querySelector('.main__filter-btn')
const filterPrice = document.querySelector('.main__filter-range'),
    filterRadio = document.querySelectorAll('.main__filter-radio-btn');
    filterType = document.querySelectorAll('[name = "filter-type"]');


filterBtn.addEventListener('click', getFilter);

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

logOutBtn.forEach(item => {
    item.addEventListener("click", () => {
        window.location.href = '../../index.html';
    })
})


//Collection checkbox value
const collectionList = JSON.parse(localStorage.getItem('collections'));

function setCollectionCheckbox() {
    collectionList.forEach(item => {
        const filterOption = document.createElement('div');
        filterOption.classList.add('main__filter-option');

        const option = `
        <div class="main__filter-option">
            <div class="main__filter-checkbox">
                <input class="main__filter-checkbox-btn" data-filter='${item['nameCollection']}' type="checkbox" name="filter-collection" id="filter-${item['nameCollection']}">
                <div class="main__filter-cust-checkbox"></div>
            </div>
            <label class="main__filter-label" for="filter-${item['nameCollection']}">${item['nameCollection']}</label>
        </div>
        `

        filterOption.innerHTML = option;
        filterCollectionItems.appendChild(filterOption);
    })
}
setCollectionCheckbox();

//Range input
rangeInput.addEventListener('input', () => {
    if (rangeInput.value.length === 5) {
        let rangeInputVal1 = rangeInput.value.slice(0, 2);
        let rangeInputVal2 = rangeInput.value.slice(2);
        rangeValue.innerHTML = `${rangeInputVal1}.${rangeInputVal2} ₽`;
    } else {
        let rangeInputVal1 = rangeInput.value.slice(0, 3);
        let rangeInputVal2 = rangeInput.value.slice(3);
        rangeValue.innerHTML = `${rangeInputVal1}.${rangeInputVal2} ₽`;
    }
})

//Open filter on mobile
filterIcon.addEventListener('click', () => {
    mainFilter.classList.toggle('main__filter_active');
})

//Create card
function createCard() {
    collectionList.forEach(item => {
        item['collectionItems'].forEach(elem => {
            const cardCont = document.createElement('div');
            cardCont.classList.add('main__card', 'card');
            cardCont.setAttribute('data-collectionName', item['nameCollection']);
            cardCont.setAttribute('data-itemType', elem['typeItem']);
            cardCont.setAttribute('data-itemPrice', elem['priceItem']);

            const card = `
            <div class="card__img-block">
                <img class="card__img" src="${elem['photoItem']}" alt="product-img">
            </div>
            <h3 class="card__collection">${item['nameCollection']}</h3>
            <h3 class="card__name">${elem['nameItem']}</h3>
            <div class="card__main">
                <span class="card__price">${elem['priceItem']} ₽</span>
                <button class="card__btn main__btn">В корзину</button>
            </div>
            `
            cardCont.innerHTML = card;
            cardsList.appendChild(cardCont);
        })
    })
}
createCard();



// Filter card
function getFilter() {
    const cards = document.querySelectorAll('.main__card');
    const filterCheckBox = document.querySelectorAll('.main__filter-checkbox-btn');

    cards.forEach(elem => {
        elem.classList.remove('card_hidden');
        elem.classList.remove('card_visible');
    })
    
    filterCheckedCheckbox = [];
    filterCheckBox.forEach(item=>{
        if(item.checked) {
            filterCheckedCheckbox.push(item);
        }
    })

    cards.forEach(item => {
        if(filterCheckedCheckbox.length > 1) {
            filterCheckedCheckbox.forEach(collection => {
                if ((collection.dataset.filter === item.dataset.collectionname)) {
                    item.classList.add('card_visible');
                }
                if ((collection.dataset.filter === item.dataset.itemtype)) {
                    item.classList.add('card_visible');
                } else {
                    item.classList.remove('card_visible');
                }
            })
            if (!item.classList.contains('card_visible')){
                item.classList.add('card_hidden');
            }
        }
    })
}