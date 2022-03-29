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
const addItemBtn = document.querySelector('.main__add-item-btn');

let collectionList = JSON.parse(localStorage.getItem('collections'));
let collectionItems = [],
    collectionItemData;

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

if (!JSON.parse(localStorage.getItem('loggedUser'))) {
    window.location.href = '../../index.html';
}

logOutBtn.forEach(item => {
    item.addEventListener("click", () => {
        window.location.href = '../../index.html';
    })
})

localStorage.setItem('loggedUser', JSON.stringify([{
    "fio": "admin",
    "phone": "admin",
    "password": "admin"
}]))


collectionListCont.addEventListener('click', (e) => {
    deleteCollection(e);
})
collectionListCont.addEventListener('click', (e) => {
    deleteCollectionItem(e);
})

function createCollectionItem(items) {
    const collectionItemCont = document.createElement('div');
    collectionItemCont.classList.add('main__collection-item-list');
    items.forEach(elem => {
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
    mainCollections[mainCollections.length - 1].appendChild(collectionItemCont);
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

collectionList.forEach(item => {
    createCollectionCont(item);
    createCollectionItem(item['collectionItems']);
})

const collectionInfo = document.querySelectorAll('.main__collection-info');
collectionInfo.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.className !== 'main__delete-btn' && e.target.className !== 'main__delete-btn-line') {
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

function createOptionsSelect() {
    //create Collection Options Select
    collectionList.forEach(item => {
        let option = document.createElement('option');
        option.classList.add('main__option-collection', 'main__option');
        option.setAttribute('value', `${item.nameCollection}`);
        option.textContent = `${item.nameCollection}`;

        selectCollection.insertBefore(option, optionElse);
    })
}

selectCollection.addEventListener('change', () => {
    //Если выбран "Новая" показывать инпут 
    if (selectCollection.value == 'else') {
        inpNewCollection.style.display = 'block';
    } else {
        inpNewCollection.style.display = 'none';
    }
})

function deleteCollection(e) {
    let oldParent = e.target.parentElement.parentElement.parentElement;

    if (e.target.className === 'main__delete-btn') {
        deleteCollectionContent(oldParent);
    } else if (e.target.parentElement.className === 'main__delete-btn') {
        deleteCollectionContent(oldParent.parentElement);
    }
}

function deleteCollectionContent(item) {
    let nameCollection = item.dataset['namecollection'];
    collectionList.forEach((elem, i) => {
        if (elem['nameCollection'] === nameCollection) {
            if (elem['idCollection'] === i + 1) {
                collectionList.splice(i, 1);

            }
        }
    })
    //Удаляем коллекцию из LS
    localStorage.setItem('collections', JSON.stringify(collectionList));
    item.classList.add('main__collection_hidden');
    setTimeout(() => {
        item.remove();
    }, 300);
}

function deleteCollectionItem(e) {
    let parent = e.target.parentElement;
    if (e.target.classList.contains('main__delete-btn-item')) {
        deleteCollectionItemContent(parent);
    } else if (e.target.parentElement.classList.contains('main__delete-btn-item')) {
        deleteCollectionItemContent(parent.parentElement);
    }
}

function deleteCollectionItemContent(item) {
    let articleItem = item.dataset['articleitem'];
    collectionList.forEach((superItem, i) => {
        superItem['collectionItems'].forEach((elem, l) => {
            if (elem['articleItem'] === articleItem) {
                superItem['collectionItems'].splice(l, 1);
            }
        })
    })
    //Удаляем мебель коллекции из LS
    localStorage.setItem('collections', JSON.stringify(collectionList));
    item.classList.add('main__collection-item_hidden');
    setTimeout(() => {
        item.remove();
    }, 300);
}

addItemBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector('.main__add-items-content');
    const selectCollection = document.querySelector('.main__select-collection'),
        inputNameCollection = document.querySelector('#nameCollection');
    inputNameItem = document.querySelector('#nameItem'),
        inputMaterialItem = document.querySelector('#materialItem'),
        inputSizeItem = document.querySelector('#sizeItem'),
        inputPriceItem = document.querySelector('#priceItem'),
        selectTypeItem = document.querySelector('.main__select-type');

    createNewCollection(selectCollection, inputNameCollection, inputNameItem, inputMaterialItem, inputSizeItem, inputPriceItem, selectTypeItem);

})

function createNewCollection(selectCollection, inputNameCollection, inputNameItem, inputMaterialItem, inputSizeItem, inputPriceItem, selectTypeItem) {
    //Создаем мебель коллекции
    if (inputNameItem.value !== '' &&
        inputMaterialItem.value !== '' &&
        inputSizeItem.value !== '' &&
        inputPriceItem.value !== '' &&
        selectTypeItem.value !== '' &&
        (selectCollection.value !== '' && selectCollection.value !== 'else')) {
            let countItems = 0;
            collectionList.forEach(item=>{
                if(item['nameCollection'] === selectCollection.value) {
                    countItems = item['collectionItems'].length + 1;
                }
            })
            console.log(countItems);
            collectionItemData = {
                "idItem": countItems,
                "articleItem": createArticle(),
                "nameItem": inputNameItem.value,
                "sizeItem": inputSizeItem.value,
                "materialItem": inputMaterialItem.value,
                "typeItem": selectTypeItem.value,
                "priceItem": +(inputPriceItem.value),
                "nameCollection": selectCollection.value,
                // "photoItem": inputPhotoItem.value,
            }
            //Добавляем созданную мебель в коллекцию
            collectionList.forEach(item=>{
                if(item['nameCollection'] === selectCollection.value) {
                    item['collectionItems'].push(collectionItemData);
                }
            })
        clearInputs(inputNameItem, inputMaterialItem, inputSizeItem, inputPriceItem, selectTypeItem, inputNameCollection);
    } else if (inputNameItem.value !== '' &&
        inputMaterialItem.value !== '' &&
        inputSizeItem.value !== '' &&
        inputPriceItem.value !== '' &&
        selectTypeItem.value !== '' &&
        (selectCollection.value === 'else')) {
            collectionItemData = {
                "idItem": 1,
                "articleItem": createArticle(),
                "nameItem": inputNameItem.value,
                "sizeItem": inputSizeItem.value,
                "materialItem": inputMaterialItem.value,
                "typeItem": selectTypeItem.value,
                "priceItem": +(inputPriceItem.value),
                "nameCollection": inputNameCollection.value,
                // "photoItem": inputPhotoItem.value,
            }
            //Добавляем созданную мебель в коллекцию
            collectionItems.push(collectionItemData);
            collectionList.push({
                "idCollection": collectionList.length + 1,
                "nameCollection": inputNameCollection.value,
                "collectionItems": collectionItems
            })
        clearInputs(inputNameItem, inputMaterialItem, inputSizeItem, inputPriceItem, selectTypeItem, inputNameCollection);
    }
    localStorage.setItem('collections', JSON.stringify(collectionList));

}
function clearInputs(inputNameItem, inputMaterialItem, inputSizeItem, inputPriceItem, selectTypeItem, inputNameCollection){
    //Очищаем все поля ввода
    inputNameItem.value = '';
    inputMaterialItem.value = '';
    inputSizeItem.value = '';
    inputPriceItem.value = '';
    selectTypeItem.value = '';
    inputNameCollection.value = '';
}

function createArticle() {
    const articlePattern = 'qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOASDFGHJKLZXCVBNM#@$%&!';
    let articleText = '';

    for (var i = 0; i < 8; i++) {
        articleText += articlePattern.charAt(Math.floor(Math.random() * articlePattern.length));
    }
    return articleText;
}