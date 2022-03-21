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










// const menuItem = document.querySelectorAll('a');

// const menuLength = const menuItem.length;

// for (Let i = 0; i < menulength; i++) {
    
    //     if (menuItem[i].href === currentLocation) {
        
        //         menuItem[i].className = "active"
        //     }
        // }


        