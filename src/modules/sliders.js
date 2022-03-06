const header = document.querySelector('.header');
const dataImgs = [
    './src/images/first-screen1.png',
    './src/images/first-screen2.png',
    './src/images/first-screen3.png'
];

let countImg = 1;
//Атоматический слайдер на главном экране
function autoSliderBg() {
    if(countImg > dataImgs.length-1) {
        countImg = 0;
    } else {
        header.style.backgroundImage = `url('${dataImgs[countImg]}')`;
        countImg++;
    }
}
setInterval(autoSliderBg, 6000);