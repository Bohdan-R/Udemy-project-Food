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

    const deadline = '2021-03-14';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
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
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            };
        };
    };

    setClock('.timer', deadline);

    // Modal

    const modalOpenBtnsRef = document.querySelectorAll('button[data-modal]');
    const modalRef = document.querySelector('.modal');
    const modalCloseBtnRef = document.querySelector('[data-close]');

    modalOpenBtnsRef.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtnRef.addEventListener('click', closeModal);

    modalRef.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        };
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalRef.classList.contains('show')) {
            closeModal();
        };
        console.log(e);
    });

    /* const modalTimerTd = setTimeout(openModal, 5000); */

    function openModal() {
        modalRef.classList.add('show');
        modalRef.classList.remove('hide');
        /* modalRef.classList.toggle('show'); */
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerTd);
    }

    function closeModal() {
        modalRef.classList.add('hide');
        modalRef.classList.remove('show');
        /* modalRef.classList.toggle('show'); */
        document.body.style.overflow = '';
    };

    function openModalBySkroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalBySkroll);
        }
    }

    window.addEventListener('scroll', openModalBySkroll);

    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parenSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.parent = document.querySelector(parenSelector);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element === 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `           
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;

            this.parent.append(element); 
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        18,
        '.menu .container',
        'menu__item',
        'menu__item--black',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu .container',
        'menu__item',
    ).render();
})