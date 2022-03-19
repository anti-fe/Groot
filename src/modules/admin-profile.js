const burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu'),
        burgerProfileBtn = document.querySelector('.header__burger-profile'),
        logOutBtn = document.querySelectorAll('.log-out-btn'); 
const footerSection = document.querySelectorAll('.footer__section');
const mainCollection = document.querySelector('.main__collection');
const collectionListCont = document.querySelector('.main__collection-list');

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



const collectionList = JSON.parse(localStorage.getItem('collections'));

function createCollectionItem(items) {
   
    const collectionItemCont = document.createElement('div');
    collectionItemCont.classList.add('main__collection-item-list');
    items.forEach(elem=>{
        const collectionItem = document.createElement('div');
        collectionItem.classList.add('main__collection-item');
        collectionItem.innerHTML = `
        <p class="main__item-title">${elem['nameItem']}</p>
        <span class="main__item-price">${elem['priceItem']} ₽</span>
        <div class="main__delete-btn main__delete-btn-item">
            <div class="main__delete-btn-line"></div>
            <div class="main__delete-btn-line"></div>
        </div>`

        collectionItemCont.append(collectionItem);
    })
    const mainCollections = document.querySelectorAll('.main__collection');
    mainCollections[mainCollections.length-1].appendChild(collectionItemCont);
}

function createCollectionCont(item) {
    const collectionCont = document.createElement('div');
    collectionCont.classList.add('main__collection');
    collectionCont.innerHTML = 
    `   <div class="main__collection-info">
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
     `
    
    collectionListCont.appendChild(collectionCont);
}

collectionList.forEach(item=>{
    createCollectionCont(item);
    createCollectionItem(item['collectionItems']);
})

const collectionInfo = document.querySelectorAll('.main__collection-info');
collectionInfo.forEach(item=>{
    item.addEventListener('click', (e)=>{
        if(e.target.className !== 'main__delete-btn' && e.target.className !== 'main__delete-btn-line') {
            let parent = item.parentElement;
            let itemList = parent.querySelector('.main__collection-item-list');
            let arrow = parent.querySelector('.main__collection-btns').querySelector('.arrow');
            itemList.classList.toggle('main__collection-item-list_active');
            arrow.classList.toggle('active-arrow');
        }
    })
})


function createArticle() {
    const articlePattern = 'qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOASDFGHJKLZXCVBNM#@$%&!';
    let articleText = '';

    for (var i = 0; i < 8; i++) {
        articleText += articlePattern.charAt(Math.floor(Math.random() * articlePattern.length));
    }
    return articleText;
}