// Outline for Search box on DarkMode
const parent = document.querySelector('.search-box')
const input = document.querySelector('.input-search')

input.addEventListener('focus', () => parent.style.outline = "var(--search-input-outline)")
input.addEventListener('blur', () => parent.style.outline = "none")



// Save and toggle (Dark Mode & Check box) in local storage
// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode');

const darkModeToggle = document.querySelector('#dark-mode-toggle');

//On Load check if User checked input before
window.onload = load();
function load() {
    var checked = JSON.parse(localStorage.getItem('dark-mode-toggle'));
    document.getElementById("dark-mode-toggle").checked = checked;
}

const enableDarkMode = () => {
    // Delay a function
    setTimeout(function () {
        // 1. Add the class to the body
        document.body.classList.add('darkmode');
    }, 400);

    // 2. Update darkMode in localStorage
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    // Delay a function 
    setTimeout(function () {
        // 1. Remove the class from the body
        document.body.classList.remove('darkmode');
    }, 400);

    // 2. Update darkMode in localStorage 
    localStorage.setItem('darkMode', null);

}

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {

    // Delay a function
    setTimeout(function () {

        enableDarkMode();

    }, 400);

}

// When someone clicks the button
darkModeToggle.addEventListener('change', () => {

    navigator.vibrate(99); // vibrate for 99ms

    // set checked input in LocalStorage if User click on it
    localStorage.setItem('dark-mode-toggle', darkModeToggle.checked);

    // get their darkMode setting
    darkMode = localStorage.getItem('darkMode');

    // if it not current enabled, enable it
    if (darkMode !== 'enabled') {
        enableDarkMode();
        // if it has been enabled, turn it off  
    } else {
        disableDarkMode();
    }
});




// Carousel Indicator
const myCarousel = document.getElementById("carouselExampleIndicators");
const carouselIndicators = myCarousel.querySelectorAll(
    ".carousel-indicators button span"
);
let intervalID;

const carousel = new bootstrap.Carousel(myCarousel);

window.addEventListener("load", function () {
    fillCarouselIndicator(1);
});

myCarousel.addEventListener("slide.bs.carousel", function (e) {
    let index = e.to;
    fillCarouselIndicator(++index);
});

function fillCarouselIndicator(index) {
    let i = 0;
    for (const carouselIndicator of carouselIndicators) {
        carouselIndicator.style.width = 0;
    }
    clearInterval(intervalID);
    carousel.pause();

    intervalID = setInterval(function () {
        i++;

        myCarousel.querySelector(".carousel-indicators .active span").style.width =
            i + "%";

        if (i >= 100) {
            // i = 0; -> just in case
            carousel.next();
        }
    }, 50);
}



// Focus on Search input in top page onclick on search icon in drop nav
let searchInput = document.querySelector('.input-search');
let searchIconInNav = document.querySelector('.search-icon-drop-nav');

searchIconInNav.addEventListener("click", () => {

    searchInput.focus();
    // parent define at the beginning of this page
    parent.style.outline = "1px solid #8b12fc";
});



// Add active-btn class to button onclick to Nav Categories
let btn = document.querySelectorAll(".cat-items");
let btnArray = Array.from(btn);

btnArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {

        btnArray.forEach((el) => {
            el.classList.remove("active-btn");
        })
        e.currentTarget.classList.add("active-btn");


        // Prevent reload page when click on Nav buttons that take you to the same page you are in.
        let activeBtn = document.querySelector(".active-btn");
        let currentLocation = location.href;

        if (activeBtn.href === currentLocation) {
            e.preventDefault();
        }

    });
});



// Mobile Navbar add active class
const list = document.querySelectorAll('.list');
function activeLink(){
    list.forEach((item) => 
    item.classList.remove('act'));
    this.classList.add('act');
}
list.forEach((item) =>
item.addEventListener('click', activeLink));




// Mobile Navbar when click on search icon
let mobPhoneNav = document.querySelector('.mob-phone-nav');
let searchInputMobile = document.querySelector('.search-input-mobile');
let searchInMobNav = document.querySelector('.search-in-mob-nav');
let inputSearchIn = document.querySelector('.input-search-in');
let searchIconNavMobLink = document.querySelector('.search-icon-nav-mob-link');
let searchBoxMob = document.querySelector('.search-box-mob');


searchInMobNav.addEventListener('click', pullIn);

function pullIn() {
    // if you are NOT in top of site => Show float search bar & hide Mobile Navbar & hide category shelve if shown
    if (window.scrollY >= 122) {
        mobPhoneNav.style.bottom = "-180px";
        searchInputMobile.style.top = "12px";
        inputSearchIn.focus();
        searchBoxMob.style.outline = "var(--search-input-outline)";

    } else {
        // Focus on orginal search bar & hide Mobile Navbar
        mobPhoneNav.style.bottom = "-180px";
        input.focus();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
}



// on scroll mobile => blur & hide the input then show mobile navbar

window.addEventListener('touchmove', pullOutOne);

function pullOutOne() {

    if (input === document.activeElement || inputSearchIn === document.activeElement) {

        searchInputMobile.style.top = "-60px";
        mobPhoneNav.style.bottom = "-70px";
        inputSearchIn.blur();
        input.blur();
    }

}



// on blur => Reshow mobile navbar & hide float search bar
inputSearchIn.addEventListener('blur', pullOutTwo);
function pullOutTwo() {
    searchInputMobile.style.top = "-60px";
    mobPhoneNav.style.bottom = "-70px";
}

// on blur => Reshow mobile navbar
input.addEventListener('blur', pullOutThree);
function pullOutThree() {
    mobPhoneNav.style.bottom = "-70px";
}

// on focus => hide mobile navbar & category shelve if shown
input.addEventListener('focus', pullOutFour);
function pullOutFour() {
    mobPhoneNav.style.bottom = "-180px";
}



// Category shelve under mobile Navbar
let categoryBtnInMobNav = document.querySelector('.category-btn-in-mob-nav');

categoryBtnInMobNav.addEventListener('click', showCatShelve);

function showCatShelve() {

    if (mobPhoneNav.style.bottom < "0") {
        mobPhoneNav.style.bottom = "0";
 
    } else {
        mobPhoneNav.style.bottom == "0";
        mobPhoneNav.style.bottom = "-70px";
    }

}




// Swiped-down mobile navbar to hide Category shelve

(function (window, document) {

    'use strict';

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;

    /**
     * Fires swiped event if swipe detected on touchend
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchEnd(e) {

        // if the user released on a different target, cancel!
        if (startEl !== e.target) return;

        var swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px
        var swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10);    // default 500ms
        var timeDiff = Date.now() - timeDown;
        var eventType = '';
        var changedTouches = e.changedTouches || e.touches || [];

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
            if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
            if (yDiff > 0) {
                eventType = 'swiped-up';
            }
            else {
                eventType = 'swiped-down';
            }
        }

        if (eventType !== '') {

            var eventData = {
                dir: eventType.replace(/swiped-/, ''),
                touchType: (changedTouches[0] || {}).touchType || 'direct',
                xStart: parseInt(xDown, 10),
                xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
                yStart: parseInt(yDown, 10),
                yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10)
            };

            // fire `swiped` event event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));

            // fire `swiped-dir` event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
        }

        // reset values
        xDown = null;
        yDown = null;
        timeDown = null;
    }

    /**
     * Records current location on touchstart event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchStart(e) {

        // if the element has data-swipe-ignore="true" we stop listening for swipe events
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        startEl = e.target;

        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    /**
     * Records location diff in px on touchmove event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchMove(e) {

        if (!xDown || !yDown) return;

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    }

    /**
     * Gets attribute off HTML element or nearest parent
     * @param {object} el - HTML element to retrieve attribute from
     * @param {string} attributeName - name of the attribute
     * @param {any} defaultValue - default value to return if no match found
     * @returns {any} attribute value or defaultValue
     */
    function getNearestAttribute(el, attributeName, defaultValue) {

        // walk up the dom tree looking for attributeName
        while (el && el !== document.documentElement) {

            var attributeValue = el.getAttribute(attributeName);

            if (attributeValue) {
                return attributeValue;
            }

            el = el.parentNode;
        }

        return defaultValue;
    }

}(window, document));

// This is the event(swiped-down)
mobPhoneNav.addEventListener('swiped-down', ()=> {
    mobPhoneNav.style.bottom = "-70px";
});