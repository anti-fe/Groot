const footerSection = document.querySelectorAll('.footer__section');
const burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu'),
        burgerProfileBtn = document.querySelector('.header__burger-profile'),
        logOutBtn = document.querySelectorAll('.log-out-btn'); 
const filterCollectionItems = document.querySelector('#filter-collection-items');

        
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


const collectionList = JSON.parse(localStorage.getItem('collections'));
console.log(collectionList[0]['nameCollection']);
function setCheckbox() {
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
setCheckbox();