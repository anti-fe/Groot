const burgerMenu = document.querySelector('.nav__burger'),
        modalBurger = document.querySelector('.header__burger-menu'),
        burgerProfileBtn = document.querySelector('.header__burger-profile'),
        logOutBtn = document.querySelectorAll('.log-out-btn'); 
const mainCollection = document.querySelector('.main__collection');
const collectionListCont = document.querySelector('.main__collection-list');
const selectCollection = document.querySelector('.main__select-collection'),
        optionElse = document.querySelector('#main__option-else'),
        inpNewCollection = document.querySelector('.main__new-collection');
const footerSection = document.querySelectorAll('.footer__section');


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

if(!JSON.parse(localStorage.getItem('loggedUser'))) {
    window.location.href = '../../index.html';
}

logOutBtn.forEach(item=>{
    item.addEventListener("click",()=>{
        window.location.href = '../../index.html';
    })
})

localStorage.setItem('loggedUser', JSON.stringify([{
    "fio": "admin",
    "phone": "admin",
    "password": "admin"
}]))


const collectionList = JSON.parse(localStorage.getItem('collections'));

collectionListCont.addEventListener('click', (e)=>{
    deleteCollection(e);
})
collectionListCont.addEventListener('click', (e)=>{
    deleteCollectionItem(e);
})

function createCollectionItem(items) {
    const collectionItemCont = document.createElement('div');
    collectionItemCont.classList.add('main__collection-item-list');
    items.forEach(elem=>{
        const collectionItem = document.createElement('div');
        collectionItem.classList.add('main__collection-item');
        collectionItem.setAttribute('data-articleitem', elem['articleItem']);

        collectionItem.innerHTML = `
        <p class="main__item-title">${elem['nameItem']}</p>
        <span class="main__item-price">${elem['articleItem']}</span>
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
    collectionCont.setAttribute('data-namecollection', item['nameCollection']);

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

//ADD COLLECTION AND ITEM


createOptionsSelect()
function createOptionsSelect(){
    //create Collection Options Select
    collectionList.forEach(item=>{
        let option = document.createElement('option');
        option.classList.add('main__option-collection', 'main__option');
        option.setAttribute('value', `${item.nameCollection}`);
        option.textContent = `${item.nameCollection}`;

        selectCollection.insertBefore(option, optionElse);
    })
}

selectCollection.addEventListener('change', ()=>{
    //Если выбран "Новая" показывать инпут 
    if(selectCollection.value == 'else') {
        inpNewCollection.style.display = 'block';
    } else {
        inpNewCollection.style.display = 'none';
    }
})

function deleteCollection(e) {
    if(e.target.className === 'main__delete-btn') {
        let oldParent = e.target.parentElement.parentElement.parentElement;
        let nameCollection = e.target.parentElement.parentElement.parentElement.dataset['namecollection'];
        collectionList.forEach((item,i)=>{
            if(item['nameCollection'] === nameCollection) {
                collectionList.splice(i, i+1);
            }
        })
        //Удаляем коллекцию из LS
        localStorage.setItem('collections', JSON.stringify(collectionList));
        oldParent.classList.add('collection_hidden');
        setTimeout(()=>{
            oldParent.remove();
        }, 300);
    }
}
function deleteCollectionItem(e) {
    let collectionListItems = document.querySelectorAll('.main__collection-item-list_active');
    console.log(collectionListItems);
}

function createArticle() {
    const articlePattern = 'qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOASDFGHJKLZXCVBNM#@$%&!';
    let articleText = '';

    for (var i = 0; i < 8; i++) {
        articleText += articlePattern.charAt(Math.floor(Math.random() * articlePattern.length));
    }
    return articleText;
}