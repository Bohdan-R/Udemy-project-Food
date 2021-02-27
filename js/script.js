window.addEventListener('DOMContentLoaded', () => {

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
                }
            })
        }
    })
})