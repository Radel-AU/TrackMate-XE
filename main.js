// action basket
const sidebarElement = document.querySelector(".sidebar");
const buttonBasketElement = document.querySelector("[data-action-basket]");
const buttonCloseBasketElement = document.querySelector("[data-close-basket]");

let icBasketActive = false;

const openBasket = () => {
    icBasketActive = true;
    sidebarElement.classList.add("sidebar-active");
    sidebarElement.classList.remove("sidebar-not-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}
const closeBasket = () => {
    icBasketActive = false;
    sidebarElement.classList.add("sidebar-not-active");
    sidebarElement.classList.remove("sidebar-active");
}

buttonBasketElement.addEventListener("click", () => {
    if(!icBasketActive) {
        openBasket()
    } else {
        closeBasket();
    }
})

buttonCloseBasketElement.addEventListener("click", ()=> {
    closeBasket();
})

