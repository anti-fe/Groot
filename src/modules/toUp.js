const toUpBtn = document.querySelector('#to-up');
const firstScreen = document.querySelector('#firstScreen');

//Плавный скролл до следующего блока при нажатии на ссылку 
toUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    firstScreen.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
})