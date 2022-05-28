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
const errorMessage = document.querySelector('.main__error-message');
const fileInput = document.querySelector('.main__file-input');
const restoreCollections = document.querySelector('.main__restore');
let uploadedFile = document.querySelector('.main__label-file');
let inputFilePath;

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
        // window.location.href = '../../index.html';
        console.log('dwa');
        // localStorage.removeItem('loggedUser');
    })
})

// localStorage.setItem('loggedUser', JSON.stringify([{
//     "fio": "admin",
//     "phone": "admin",
//     "password": "admin"
// }]))


restoreCollections.addEventListener('click', (e) => {
    e.preventDefault();

    fetch("../collections.json")
        .then(res => res.json())
        .then(str => localStorage.setItem('collections', JSON.stringify(str)));
    document.location.reload();
})
collectionListCont.addEventListener('click', (e) => {
    if (e.target.closest('.main__delete-btn-collection')) {
        deleteCollection(e.target.closest('.main__delete-btn').closest('.main__collection'));
    } else if (e.target.closest('.main__delete-btn-item')) {
        deleteCollectionItemContent(e.target.closest('.main__delete-btn-item').closest('.main__collection-item'));
    }
})
fileInput.addEventListener('change', customInputFile);

function createCollectionItem(items) {
    const collectionItemCont = document.createElement('div');
    collectionItemCont.classList.add('main__collection-item-list');
    items.forEach(elem => {
        const collectionItem = document.createElement('div');
        collectionItem.classList.add('main__collection-item');
        collectionItem.setAttribute('data-articleitem', elem['articleItem']);
        collectionItem.innerHTML = `
        <img class="main__item-photo" src=${elem['photoItem']}>
        <div class="main__item-info"><p class="main__item-article main__item-inp">${elem['articleItem']}</p>
        <input class="main__item-title main__item-inpt" disabled value=${elem['nameItem']}>
        <input class="main__item-material main__item-inpt" disabled value="${elem['materialItem']}">
        <input class="main__item-size main__item-inpt" disabled value="${elem['sizeItem']}">
        <input class="main__item-price main__item-inpt" disabled value="${elem['priceItem']} ₽">
        <div class="main__actions">
        <div class="main__change-btn main__change-btn-item">
        <svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M145.7 640C147.7 640 149.7 639.8 151.7 639.5L319.9 610C321.9 609.6 323.8 608.7 325.2 607.2L749.1 183.3C750.027 182.375 750.763 181.276 751.264 180.066C751.766 178.857 752.024 177.56 752.024 176.25C752.024 174.94 751.766 173.643 751.264 172.434C750.763 171.224 750.027 170.125 749.1 169.2L582.9 2.9C581 1 578.5 0 575.8 0C573.1 0 570.6 1 568.7 2.9L144.8 426.8C143.3 428.3 142.4 430.1 142 432.1L112.5 600.3C111.527 605.657 111.875 611.171 113.513 616.363C115.151 621.556 118.029 626.271 121.9 630.1C128.5 636.5 136.8 640 145.7 640V640ZM213.1 465.6L575.8 103L649.1 176.3L286.4 538.9L197.5 554.6L213.1 465.6V465.6ZM768 724H32C14.3 724 0 738.3 0 756V792C0 796.4 3.6 800 8 800H792C796.4 800 800 796.4 800 792V756C800 738.3 785.7 724 768 724Z" fill="black"/>
        </svg>
        </div><div class="main__delete-btn main__delete-btn-item">
        <div class="main__delete-btn-line"></div>
        <div class="main__delete-btn-line"></div>
    </div></div>`

        collectionItemCont.append(collectionItem);
    })
    const mainCollections = document.querySelectorAll('.main__collection');
    mainCollections[mainCollections.length - 1].appendChild(collectionItemCont);
}

function createCollectionCont(item) {
    const collectionCont = document.createElement('div');
    collectionCont.classList.add('main__collection');
    collectionCont.setAttribute('data-namecollection', item['nameCollection']);
    collectionCont.setAttribute('data-idcollection', item['idCollection']);

    collectionCont.innerHTML =
        `   <div class="main__collection-info">
            <h4 class="main__collection-name">${item['nameCollection']}</h4>
            <div class="main__collection-btns">
                <div class="main__delete-btn main__delete-btn-collection">
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

const mainCollectionItemList = document.querySelectorAll('.main__collection-item-list');
const sendData = {};
mainCollectionItemList.forEach(item => {
    item.addEventListener('click', e => {
        if (e.target.classList.contains('main__change-btn') || e.target.tagName == 'svg') {
            let parent = e.target.closest('.main__collection-item');
            parent.querySelectorAll('input').forEach(input => {
                if (input.disabled === false) 
                    input.disabled = true
                else
                    input.disabled = false
            })
            
            if (parent.querySelector('input').disabled) {
                parent.querySelector('.main__change-btn').innerHTML = `<svg width="20" height="20" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M145.7 640C147.7 640 149.7 639.8 151.7 639.5L319.9 610C321.9 609.6 323.8 608.7 325.2 607.2L749.1 183.3C750.027 182.375 750.763 181.276 751.264 180.066C751.766 178.857 752.024 177.56 752.024 176.25C752.024 174.94 751.766 173.643 751.264 172.434C750.763 171.224 750.027 170.125 749.1 169.2L582.9 2.9C581 1 578.5 0 575.8 0C573.1 0 570.6 1 568.7 2.9L144.8 426.8C143.3 428.3 142.4 430.1 142 432.1L112.5 600.3C111.527 605.657 111.875 611.171 113.513 616.363C115.151 621.556 118.029 626.271 121.9 630.1C128.5 636.5 136.8 640 145.7 640V640ZM213.1 465.6L575.8 103L649.1 176.3L286.4 538.9L197.5 554.6L213.1 465.6V465.6ZM768 724H32C14.3 724 0 738.3 0 756V792C0 796.4 3.6 800 8 800H792C796.4 800 800 796.4 800 792V756C800 738.3 785.7 724 768 724Z" fill="black"/>
                </svg>
                `
                parent.querySelector('.main__change-btn').classList.remove('success')
                sendData.articleItem = parent.querySelector('.main__item-article').innerHTML;
                sendData.nameItem = parent.querySelector('.main__item-title').value;
                sendData.materialItem = parent.querySelector('.main__item-material').value;
                sendData.sizeItem = parent.querySelector('.main__item-size').value;
                sendData.priceItem = parent.querySelector('.main__item-price').value.replace(/[^0-9]/g,"");
                changeData(sendData.articleItem, sendData);
            } else {
                parent.querySelector('.main__change-btn').innerHTML = `<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.9999 11.2L1.7999 7.00001L0.399902 8.40001L5.9999 14L17.9999 2.00001L16.5999 0.600006L5.9999 11.2Z" fill="black"/>
                </svg>
                `
                parent.querySelector('.main__change-btn').classList.add('success')
            }
        }
    })
})

function changeData(vendor, data) {
    collectionList.forEach(item => {
        item.collectionItems.forEach(product => {
            if (product.articleItem === vendor) {
                product.nameItem = data.nameItem;
                product.materialItem = data.materialItem;
                product.sizeItem = data.sizeItem;
                product.priceItem = data.priceItem;
            }
        })
    })
    localStorage.setItem('collections', JSON.stringify(collectionList));
}

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

function deleteCollection(item) {
    let nameCollection = item.dataset['namecollection'];
    let idCollection = +item.dataset['idcollection'];
    collectionList.forEach((elem, i) => {
        if (elem['nameCollection'] === nameCollection && elem['idCollection'] === idCollection) {
            collectionList.splice(i, 1);
            //Удаляем коллекцию из LS
            localStorage.setItem('collections', JSON.stringify(collectionList));
        }
    })
    item.classList.add('main__collection_hidden');
    setTimeout(() => {
        item.remove();
    }, 300);
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

    const selectCollection = document.querySelector('.main__select-collection'),
        inputNameCollection = document.querySelector('#nameCollection');
        inputNameItem = document.querySelector('#nameItem'),
        inputMaterialItem = document.querySelector('#materialItem'),
        inputSizeItem = document.querySelector('#sizeItem'),
        inputPriceItem = document.querySelector('#priceItem'),
        inputPhotoItem = "../images/new-item.png",
        selectTypeItem = document.querySelector('.main__select-type');

    createNewCollection(selectCollection, inputNameCollection, inputNameItem, inputMaterialItem, inputSizeItem, inputPhotoItem, inputPriceItem, selectTypeItem);

})

function createNewCollection(selectCollection, inputNameCollection, inputNameItem, inputMaterialItem, inputSizeItem, inputPhotoItem, inputPriceItem, selectTypeItem) {
    //Создаем мебель коллекции
    if (inputNameItem.value !== '' &&
        inputMaterialItem.value !== '' &&
        inputSizeItem.value !== '' &&
        inputPriceItem.value !== '' &&
        inputPhotoItem.value !== '' &&
        selectTypeItem.value !== '' &&
        (selectCollection.value !== '' && selectCollection.value !== 'else')) {
            addItemBtn.classList.remove('main__add-collection_error');

            let countItems = 0;
            collectionList.forEach(item=>{
                if(item['nameCollection'] === selectCollection.value) {
                    countItems = item['collectionItems'].length + 1;
                }
            })

            collectionItemData = {
                "idItem": countItems,
                "articleItem": createArticle(),
                "nameItem": inputNameItem.value,
                "sizeItem": inputSizeItem.value,
                "materialItem": inputMaterialItem.value,
                "typeItem": selectTypeItem.value,
                "priceItem": +(inputPriceItem.value),
                "nameCollection": selectCollection.value,
                "photoItem": inputPhotoItem,
            }
            //Добавляем созданную мебель в коллекцию
            collectionList.forEach(item=>{
                if(item['nameCollection'] === selectCollection.value) {
                    item['collectionItems'].push(collectionItemData);
                }
            })
        clearInputs(inputNameItem, inputMaterialItem, inputSizeItem, inputPriceItem, uploadedFile, selectTypeItem, inputNameCollection);
    } else if (inputNameItem.value !== '' &&
        inputMaterialItem.value !== '' &&
        inputSizeItem.value !== '' &&
        inputPriceItem.value !== '' &&
        inputPhotoItem.value !== '' &&
        selectTypeItem.value !== '' &&
        (selectCollection.value === 'else')) {
            addItemBtn.classList.remove('main__add-collection_error');
            // errorMessage.style.display = 'none';

            collectionItemData = {
                "idItem": 1,
                "articleItem": createArticle(),
                "nameItem": inputNameItem.value,
                "sizeItem": inputSizeItem.value,
                "materialItem": inputMaterialItem.value,
                "typeItem": selectTypeItem.value,
                "priceItem": +(inputPriceItem.value),
                "nameCollection": inputNameCollection.value,
                "photoItem": inputPhotoItem.value,
            }
            //Добавляем созданную мебель в коллекцию
            collectionItems.push(collectionItemData);
            collectionList.push({
                "idCollection": collectionList.length + 1,
                "nameCollection": inputNameCollection.value,
                "collectionItems": collectionItems
            })
        clearInputs(inputNameItem, inputMaterialItem, inputSizeItem, inputPriceItem, uploadedFile, selectTypeItem, inputNameCollection);
    } else {
        addItemBtn.classList.add('main__add-collection_error');
        errorMessage.style.display = 'flex';
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
    uploadedFile.textContent = 'Выберите изображение';
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

function customInputFile() {
    inputFilePath = fileInput.value;
    const inputFileValue = fileInput.files[0]['name'];
    const inputText = uploadedFile.querySelector('.main__add-input-text');
    inputText.textContent = inputFileValue;
}