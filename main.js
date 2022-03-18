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

    navigator.vibrate(100); // vibrate for 100ms

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



