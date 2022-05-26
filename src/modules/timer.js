const timerDays = document.querySelector('.new-collection__days'),
    timerHours = document.querySelector('.new-collection__hours'),
    timerMinutes = document.querySelector('.new-collection__min'),
    timerSeconds = document.querySelector('.new-collection__sec'),
    daysText = document.querySelector('.new-collection__days-text'),
    hoursText = document.querySelector('.new-collection__hours-text'),
    minText = document.querySelector('.new-collection__min-text'),
    secText = document.querySelector('.new-collection__sec-text');
const timerCont = document.querySelector('.new-collection__timer'),
    timeIsOver = document.querySelector('.new-collection__time-is-over');

const deadLine = new Date(2022, 5, 27, 36, 0, 0);

let date,
    ourMls,
    days,
    hours,
    minutes,
    seconds

function getTimer(deadLine) {
    date = new Date();
    ourMls = deadLine - date;

    days = Math.floor(ourMls / (1000 * 60 * 60 * 24));

    hours = Math.floor(ourMls / (1000 * 60 * 60) % 24);
    if (hours < 10) hours = `0${hours}`;

    minutes = Math.floor((ourMls / 1000 / 60) % 60);
    if (minutes < 10) minutes = `0${minutes}`;

    seconds = Math.floor((ourMls / 1000) % 60);
    if (seconds < 10) seconds = `0${seconds}`;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}

function setTimer() {
    let arrDate = getTimer(deadLine);
    if (ourMls < 0) {
        arrDate.days = 0;
        arrDate.hours = '00';
        arrDate.minutes = '00';
        arrDate.seconds = '00';
        clearInterval(intervalDate);
    }
    //Проверка склонения дней
    if (arrDate.days == 0) {
        daysText.innerHTML = 'дней';
    } else if (arrDate.days >= 11 && arrDate.days <= 20) {
        daysText.innerHTML = `дней`;
    } else if (arrDate.days % 10 === 1) {
        daysText.innerHTML = `день`;
    } else if ((arrDate.days >= 2 && arrDate.days <= 4) || 
                (arrDate.days >= 22 && arrDate.days <= 24) || 
                (arrDate.days >= 32 && arrDate.days <= 34)) {
        daysText.innerHTML = `дня`;
    } else if ((arrDate.days >= 5 && arrDate.days <= 9) || (arrDate.days % 10 === 0) || (arrDate.days >= 25 && arrDate.days <= 29)) {
        daysText.innerHTML = `дней`;
    }

    //Проверка склонения часов
    if (arrDate.hours == 0) {
        hoursText.innerHTML = 'часов';
    } else if (arrDate.hours >= 11 && arrDate.hours <= 20) {
        hoursText.innerHTML = `часов`;
    } else if (arrDate.hours % 10 === 1) {
        hoursText.innerHTML = `час`;
    } else if ((arrDate.hours >= 2 && arrDate.hours <= 4) || 
                (arrDate.hours >= 22 && arrDate.hours <= 24)) {
        hoursText.innerHTML = `часа`;
    } else if ((arrDate.hours >= 5 && arrDate.hours <= 9) || 
                (arrDate.hours % 10 === 0)){
        hoursText.innerHTML = `часов`;
    }

    //Проверка склонения минут
    if (arrDate.minutes == 0) {
        minText.innerHTML = 'минут';
    } else if (arrDate.minutes >= 11 && arrDate.minutes <= 20) {
        minText.innerHTML = `минут`;
    } else if (arrDate.minutes % 10 === 1) {
        minText.innerHTML = `минута`;
    } else if ((arrDate.minutes >= 2 && arrDate.minutes <= 4) || 
                (arrDate.minutes >= 22 && arrDate.minutes <= 24) || 
                (arrDate.minutes >= 32 && arrDate.minutes <= 34) ||
                (arrDate.minutes >= 42 && arrDate.minutes <= 44) ||
                (arrDate.minutes >= 52 && arrDate.minutes <= 54)) {
        minText.innerHTML = `минуты`;
    } else if ((arrDate.minutes >= 5 && arrDate.minutes <= 9) || 
                (arrDate.minutes % 10 === 0) ||
                (arrDate.minutes >= 15 && arrDate.minutes <= 19) ||
                (arrDate.minutes >= 25 && arrDate.minutes <= 29) ||
                (arrDate.minutes >= 35 && arrDate.minutes <= 39) ||
                (arrDate.minutes >= 45 && arrDate.minutes <= 49) ||
                (arrDate.minutes >= 55 && arrDate.minutes <= 59)) {
        minText.innerHTML = `минут`;
    }

    //Проверка склонения секунд
    if (arrDate.seconds == 0) {
        secText.innerHTML = 'секунд';
    } else if (arrDate.seconds >= 11 && arrDate.seconds <= 20) {
        secText.innerHTML = `секунд`;
    } else if (arrDate.seconds % 10 === 1) {
        secText.innerHTML = `секунда`;
    } else if ((arrDate.seconds >= 2 && arrDate.seconds <= 4) || 
                (arrDate.seconds >= 22 && arrDate.seconds <= 24) || 
                (arrDate.seconds >= 32 && arrDate.seconds <= 34) || 
                (arrDate.seconds >= 42 && arrDate.seconds <= 44) || 
                (arrDate.seconds >= 52 && arrDate.seconds <= 54)) {
        secText.innerHTML = `секунды`;
    } else if ((arrDate.seconds >= 5 && arrDate.seconds <= 9)  ||
                (arrDate.seconds >= 15 && arrDate.seconds <= 19) || 
                (arrDate.seconds >= 25 && arrDate.seconds <= 29) || 
                (arrDate.seconds >= 35 && arrDate.seconds <= 39) || 
                (arrDate.seconds >= 45 && arrDate.seconds <= 49) || 
                (arrDate.seconds >= 55 && arrDate.seconds <= 59) || 
                (arrDate.seconds % 10 === 0)) {
        secText.innerHTML = `секунд`;
    }


    timerDays.innerHTML = arrDate.days;
    timerHours.innerHTML = arrDate.hours;
    timerMinutes.innerHTML = arrDate.minutes;
    timerSeconds.innerHTML = arrDate.seconds;
    return timerSect = {
        "days" : arrDate.days,
        "hours" : arrDate.hours,
        "minutes" : arrDate.minutes,
        "seconds" : arrDate.seconds,
    }
}

let intervalDate = setInterval(() => {
    setTimer();
    if(timerSect["days"] <= 0 && +timerSect["hours"] <= 0 && +timerSect["minutes"] <= 0 && +timerSect["seconds"] <= 0) {
        timerCont.classList.add('timer_hidden');
        timeIsOver.classList.add('time-is-over_visible');
    }
}, 1000);