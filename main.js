//header sticky
const headerElement = document.querySelector("[data-header-sticky]");
let lastScroll = 0;
window.addEventListener('scroll', function(event) {
    const currentScroll = Math.floor(document.documentElement.scrollTop);
    if( currentScroll == 0 ) {
        headerElement.style.backgroundColor = "transparent";
        headerElement.style.boxShadow = "none";
    }
    if(currentScroll > lastScroll) {
        setTimeout(() => {
            headerElement.style.position = "relative";
            headerElement.style.animation = "none";
            headerElement.style.zIndex = "100";
            headerElement.style.backgroundColor = "rgba(35, 35, 35, 1)";
            headerElement.style.boxShadow = "0px 0px 10px black";
        }, 150)
        headerElement.style.animation = "headerDefault 0.2s";
    } else if(currentScroll < lastScroll) {
        headerElement.style.position = "sticky";
        headerElement.style.animation = "headerSticky 0.2s";
    }
    lastScroll = currentScroll;
});


// action basket
const sidebarElement = document.querySelector(".sidebar");
const buttonBasketElement = document.querySelector("[data-action-basket]");
const buttonCloseBasketElement = document.querySelector("[data-close-basket]");

let isBasketActive = false;

const openBasket = () => {
    isBasketActive = true;
    sidebarElement.classList.add("sidebar-active");
    sidebarElement.classList.remove("sidebar-not-active", "visually-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}
const closeBasket = () => {
    isBasketActive = false;
    sidebarElement.classList.add("sidebar-not-active");
    setTimeout((icBasketActive) => {
        sidebarElement.classList.add("visually-hidden");
    }, 500, isBasketActive)
    sidebarElement.classList.remove("sidebar-active");
}

document.addEventListener("click", (event) => {
    if(isBasketActive && !event.target.closest(".sidebar") && !event.target.closest("[data-action-basket]")) {
        closeBasket();
    }
})

buttonBasketElement.addEventListener("click", () => {
    if(!isBasketActive) {
        openBasket()
    } else {
        closeBasket();
    }
})


buttonCloseBasketElement.addEventListener("click", ()=> {
    closeBasket();
})

