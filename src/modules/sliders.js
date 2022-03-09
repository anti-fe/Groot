const header = document.querySelector('.header');
const sliderDots = Array.from(document.querySelectorAll('.header__dots-item'));
const dataImgs = [
    './src/images/first-screen1.png',
    './src/images/first-screen2.png',
    './src/images/first-screen3.png'
];

let countImg = 1;
//Атоматический слайдер на главном экране
function autoSliderBg() {
    sliderDots.forEach(dote=>{
        dote.classList.remove('item-active');
    })
    if(countImg > dataImgs.length-1) {
        countImg = 0;
        header.style.backgroundImage = `url('${dataImgs[countImg]}')`;
        sliderDots[countImg].classList.add('item-active');
    } else {
        header.style.backgroundImage = `url('${dataImgs[countImg]}')`;
        sliderDots[countImg].classList.add('item-active');
        countImg++;
    }
}
setInterval(autoSliderBg, 6000);