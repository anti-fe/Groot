const sliderContent = document.querySelector('.slider__content'),
    sliderTrack = document.querySelector('.slider__track');
let sliderMove = 0;
let countSlides = 0;
const header = document.querySelector('.header');
const dataImgs = [
    './src/images/first-screen1.webp',
    './src/images/first-screen2.webp',
    './src/images/first-screen3.webp'
];
const elseSlider = document.querySelector('.swiper');
const dataCollections = JSON.parse(localStorage.getItem('collections'));

let countImg = 1;
//Атоматический слайдер на главном экране
function autoSliderBg() {
    if(countImg > dataImgs.length-1) {
        countImg = 0;
        header.style.backgroundImage = `url('${dataImgs[countImg]}')`;
    } else {
        header.style.backgroundImage = `url('${dataImgs[countImg]}')`;
        countImg++;
    }
}
setInterval(autoSliderBg, 6000);


//Слайдер "Другие товары"
elseSlider.addEventListener('click',(e)=>{
    const slides = document.querySelectorAll('.slider__card');
    const parent = e.target.parentElement;
    const secondParent = e.target.parentElement.parentElement;
    const item = e.target;

    if(item.classList.contains('slider__btn-prev') ||
    parent.classList.contains('slider__btn-prev') || 
    secondParent.classList.contains('slider__btn-prev')) {
        if(countSlides <= 0) {
            countSlides = slides.length-1;
            sliderMove = 300;
            sliderTrack.style.transform = `translateX(-${sliderMove}%)`;
        } else {
            countSlides--;
            sliderMove -= 100;
            sliderTrack.style.transform = `translateX(-${sliderMove}%)`;
        }
    } else if(item.classList.contains('slider__btn-next') ||
    parent.classList.contains('slider__btn-next') || 
    secondParent.classList.contains('slider__btn-next')) {
        if(countSlides >= slides.length-1) {
            countSlides = 0;
            sliderMove = 0;
            sliderTrack.style.transform = `translateX(${sliderMove}%)`;
        } else {
            countSlides++;
            sliderMove += 100
            sliderTrack.style.transform = `translateX(-${sliderMove}%)`;
        }
    }
})

sliderTrack.addEventListener('click',(e)=>{    
    const parent = e.target.parentElement.parentElement.parentElement;
    const parent2 = parent.parentElement;

    const btnParent = e.target;
    const btnParent2 = e.target.parentElement;

    if(btnParent.classList.contains('slider__more-btn')) {
        createProductPage(parent);
    } else if (btnParent2.classList.contains('slider__more-btn')) {
        createProductPage(parent2);
    }
})

function createProductPage(item) {
    const collectionName = item.dataset['collectionname'];
    const itemName = item.dataset['itemname'];
    const itemType = item.dataset['itemtype'];
    const itemPrice = item.dataset['itemprice'];
    const itemMaterial = item.dataset['itemmaterial'];
    const itemSize = item.dataset['itemsize'];
    const itemPhoto = item.dataset['itemimg'];

    const product = 
    {
        "collectionName": collectionName,
        "itemName": itemName,
        "itemType": itemType,
        "itemPrice": itemPrice,
        "itemMaterial": itemMaterial,
        "itemSize": itemSize,
        "itemPhoto": itemPhoto
    };
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = 'src/pages/product.html';
}