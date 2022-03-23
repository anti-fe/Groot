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

        
footerSection.forEach(item=>{
    item.addEventListener('click', ()=>{
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

logOutBtn.forEach(item=>{
    item.addEventListener("click",()=>{
        window.location.href = '../../index.html';
    })
})


//Collection checkbox value
const collectionList = JSON.parse(localStorage.getItem('collections'));
function setCollectionCheckbox() {
    collectionList.forEach(item=>{
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
rangeInput.addEventListener('input', ()=>{
    if(rangeInput.value.length === 5) {
        let rangeInputVal1 =  rangeInput.value.slice(0, 2);
        let rangeInputVal2 =  rangeInput.value.slice(2);
        rangeValue.innerHTML = `${rangeInputVal1}.${rangeInputVal2} ₽`;
    } else {
        let rangeInputVal1 =  rangeInput.value.slice(0, 3);
        let rangeInputVal2 =  rangeInput.value.slice(3);
        rangeValue.innerHTML = `${rangeInputVal1}.${rangeInputVal2} ₽`;
    }
})

//Open filter on mobile
cardsList.addEventListener('click', ()=>{

})

//Create card
function createCard() {
    collectionList.forEach(item=>{
        item['collectionItems'].forEach(elem=>{
            const cardCont = document.createElement('div');
            cardCont.classList.add('main__card', 'card');
            cardCont.setAttribute('data-collection-id', item['idCollection']);
            cardCont.setAttribute('data-item-id', elem['idItem']);

            const card = `
            <div class="card__img-block">
                <img class="card__img" src="${elem['photoItem']}" alt="product-img">
            </div>
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
