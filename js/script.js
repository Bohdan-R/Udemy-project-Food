window.addEventListener('DOMContentLoaded', () => {

    // TABS

    const tabsRef = document.querySelectorAll('.tabheader__item');
    const tabsContentRef = document.querySelectorAll('.tabcontent');
    const tabsParentRef = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContentRef.forEach(item => {
        /* item.style.display = 'none'; */
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabsRef.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent(i = 0) {
    /* tabsContentRef[i].style.display = 'block'; */
        tabsContentRef[i].classList.add('show', 'fade');
        tabsContentRef[i].classList.remove('hide');
        tabsRef[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabsParentRef.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabsRef.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                };
            });
        };
    });

    // TIMER

    const deadline = '2021-03-08';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);

        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            };
        };
    };

    setClock('.timer', deadline)
})