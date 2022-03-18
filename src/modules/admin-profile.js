const burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu'),
        burgerProfileBtn = document.querySelector('.header__burger-profile'),
        logOutBtn = document.querySelectorAll('.log-out-btn'); 
const footerSection = document.querySelectorAll('.footer__section');
const collectionName = document.querySelectorAll('.main__collection-name');
const mainCollection = document.querySelector('.main__collection');

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

localStorage.setItem('loggedUser', JSON.stringify([{
    "fio": "admin",
    "password": "admin"
}]))

footerSection.forEach(item=>{
    item.addEventListener('click', ()=>{
        let itemList = item.querySelector('.footer__section-list');
        let itemArrow = item.querySelector('.footer__section-head').querySelector('.footer__arrow');

        itemList.classList.toggle('footer__active-list');
        itemArrow.classList.toggle('footer__active-arrow');
    })
})

collectionName.forEach(item=>{
    item.addEventListener('click', ()=>{
        let parent = item.parentElement.parentElement;
        let itemList = parent.querySelector('.main__collection-item-list');
        let arrow = parent.querySelector('.main__collection-btns').querySelector('.arrow');
        itemList.classList.toggle('main__collection-item-list_active');
        arrow.classList.toggle('active-arrow');
    })
})

(function(){
    const collectionList = JSON.parse(localStorage.getItem('collections'));
    console.log("🚀 ~ collectionList", collectionList)
    
    collectionList.forEach(item=>{
        item['collectionItems'].forEach(item=>{
            let collecionItem = 
            `<div class="main__collection-item-list">
                <div class="main__collection-item">
                    <p class="main__item-title">${item['nameItem']}</p>
                    <span class="main__item-price">${item['priceItem']} ₽</span>
                    <div class="main__delete-btn main__delete-btn-item">
                        <div class="main__delete-btn-line"></div>
                        <div class="main__delete-btn-line"></div>
                    </div>
                </div>
            </div>`
        })
    })
    let collecionItem = collectionList.forEach(item=>{
        item['collectionItems'].forEach(item=>{
            `<div class="main__collection-item-list">
                <div class="main__collection-item">
                    <p class="main__item-title">${item['nameItem']}</p>
                    <span class="main__item-price">${item['priceItem']} ₽</span>
                    <div class="main__delete-btn main__delete-btn-item">
                        <div class="main__delete-btn-line"></div>
                        <div class="main__delete-btn-line"></div>
                    </div>
                </div>
            </div>`
        })
        let collection = 
            `<div class="main__collection">
                <div class="main__collection-info">
                    <h4 class="main__collection-name">${item['nameCollection']}</h4>
                    <div class="main__collection-btns">
                        <div class="main__delete-btn">
                            <div class="main__delete-btn-line"></div>
                            <div class="main__delete-btn-line"></div>
                        </div>
                        <div class="arrow">
                            <div class="arrow__line"></div>
                            <div class="arrow__line"></div>
                        </div>
                    </div>
                </div>
                ${collecionItem}
            </div>`
    })
    
}())

function createArticle() {
    const articlePattern = 'qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOASDFGHJKLZXCVBNM#@$%&!';
    let articleText = '';

    for (var i = 0; i < 8; i++) {
        articleText += articlePattern.charAt(Math.floor(Math.random() * articlePattern.length));
    }
    return articleText;
}