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



// Mobile Navbar
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
    // if you are not in top of site => Show float search bar & hide Mobile Navbar
    if (window.scrollY >= 122) {
        mobPhoneNav.style.bottom = "-125px";
        searchInputMobile.style.top = "12px";
        inputSearchIn.focus();
        searchBoxMob.style.outline = "var(--search-input-outline)";

    } else {
        // Focus on orginal search bar & hide Mobile Navbar
        mobPhoneNav.style.bottom = "-125px";
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
    searchInputMobile.style.top = "-60px";
    mobPhoneNav.style.bottom = "0";
    inputSearchIn.blur();
    input.blur();
}

// on blur => Reshow mobile navbar & hide float search bar
inputSearchIn.addEventListener('blur', pullOutTwo);
function pullOutTwo() {
    searchInputMobile.style.top = "-60px";
    mobPhoneNav.style.bottom = "0";
}

// on blur => Reshow mobile navbar
input.addEventListener('blur', pullOutThree);
function pullOutThree() {
    mobPhoneNav.style.bottom = "0";
}

// on focus => hide mobile navbar
input.addEventListener('focus', pullOutFour);
function pullOutFour() {
    mobPhoneNav.style.bottom = "-125px";
}



// Category shelve under mobile Navbar
let categoryBtnInMobNav = document.querySelector('.category-btn-in-mob-nav');
let CatSectionUnderNav = document.querySelector('.cat-section-under-nav');

categoryBtnInMobNav.addEventListener('click', showCatShelve);

function showCatShelve() {

    if (CatSectionUnderNav.style.bottom < "0") {
        CatSectionUnderNav.style.bottom = "0";
        mobPhoneNav.style.bottom = "70px";
 
    } else {
        CatSectionUnderNav.style.bottom = "-70px";
        mobPhoneNav.style.bottom = "0";

    }

}
