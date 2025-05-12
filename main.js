// header sticky

class HeaderSticky {
    isScrolling;
    lastScroll = 0;
    constructor() {
        this.headerElement = document.querySelector("[data-header-sticky]");
        this.bindEvents();
    }

    eventScrollPage = () => {
        window.cancelAnimationFrame(this.isScrolling);
        this.isScrolling = window.requestAnimationFrame(() => {
            const currentScroll = Math.floor(document.documentElement.scrollTop);
            if(currentScroll > this.lastScroll + 100) {
                setTimeout(() => {
                    this.headerElement.style.position = "absolute";
                    this.headerElement.style.animation = "none";
                    this.headerElement.style.zIndex = "100 00";
                    this.headerElement.style.backgroundColor = "rgba(35, 35, 35, 1)";
                    this.headerElement.style.boxShadow = "0px 0px 10px black";
                }, 150)
                this.headerElement.style.animation = "headerDefault 0.2s";
            } else if(currentScroll < this.lastScroll) {
                this.headerElement.style.position = "sticky";
                this.headerElement.style.animation = "headerSticky 0.2s";
            }
            if( currentScroll === 0 ) {
                this.headerElement.style.position = "absolute";
                this.headerElement.style.backgroundColor = "transparent";
                this.headerElement.style.boxShadow = "none";
            }
            this.lastScroll = currentScroll;
        })
    }
    // eventScrollPage
    bindEvents = () => {
        window.addEventListener('scroll', this.eventScrollPage)
    }
}
new HeaderSticky();

// action product card
class ActionProductCard {
    numericalOrderGoods = 0;
    infoProduct = {};
    constructor() {
        this.productSidebarListElement = document.querySelector(".products__list");
        this.bindEvents();
    }
    openDescriptionProduct = (event) => {
        // this.defaultViewElements = event.target.closest(".buying__info--list").querySelectorAll(".buying__info-description");
        //    // defaultViewElements.forEach((elem) => {
        //     //     elem.classList.add("visually-hidden");
        //     // });
        this.listParentElement = event.target.closest(".buying__info--item");
        this.listParentElement.querySelector(".buying__info-description").classList.toggle("visually-hidden");
    }

    getInfoProduct = () => {
        this.articleElement = document.querySelector("[data-article]");
        this.priceElement = document.querySelector("[data-price]");
        this.quantityProductElement = document.querySelector("[data-quantity]");
        this.colorProductElement = document.querySelector("[data-model-color]");
        this.productImgElement = document.querySelector("[data-product-img]");
    }

    selectProductColor = (event) => {
        this.getInfoProduct();

        this.buttonColorProductElements = document.querySelectorAll("[data-select-item]");
        this.colorProductElement.textContent = event.target.getAttribute("data-color-name");
        const numPhoto = event.target.getAttribute("data-select-color");
        this.productImgElement.setAttribute("src", `./src/img/watch-main-option-${numPhoto}.png`);
        this.buttonColorProductElements.forEach(elem => {
            elem.classList.remove("item--active");
            if (elem.getAttribute("data-select-item") === numPhoto){
                elem.classList.add("item--active");
            }
        })
    }

    getNumPhoto = () => {
        let numPhoto = 1;

        switch (this.colorProductElement.textContent) {
            case "Белый": {
                numPhoto = 1;
                break;
            }
            case "Черный": {
                numPhoto = 2;
                break;
            }
            case "Синий": {
                numPhoto = 3;
                break;
            }
            case "Фиолетовый": {
                numPhoto = 4;
                break;
            }
            case "Бирюзовый": {
                numPhoto = 5;
                break;
            }
            default: {
                break;
            }
        }
        return numPhoto;
    }
    saveUserPurchases = () => {
        this.getInfoProduct();
        let numProduct = this.getNumPhoto();
        this.productImgElement.setAttribute("src", `./src/img/watch-main-option-${numProduct}.png`);
        this.infoProduct[numProduct] = {
            article: this.articleElement.getAttribute("data-article"),
            color: this.colorProductElement.textContent,
            price: Number(this.priceElement.getAttribute("data-price")),
            quantity: Number(this.quantityProductElement.value),
            src: this.productImgElement.getAttribute("src"),
            isActive: true
        }
        localStorage.setItem(`user`, JSON.stringify(this.infoProduct));
    }

    basketInfoProducts = () => {
        //clear old info
        this.productSidebarListElement.innerHTML = ``;
        let json;
        let localStorageInfoProduct;
        let quantity;
        let arrKeysObj;
        try {
            json = localStorage.getItem(`user`);
            localStorageInfoProduct = JSON.parse(json);
            quantity = Object.keys(localStorageInfoProduct).length;
            arrKeysObj = Object.keys(localStorageInfoProduct);
            console.log(arrKeysObj);
        }catch (error) {
            console.log(error);
        }
        for (let i = 0; i < quantity; i++) {
            if(localStorageInfoProduct[arrKeysObj[i]]["isActive"] === false) {
                continue;
            }
            const itemElement = document.createElement("li");
            itemElement.classList.add("products__item");
            itemElement.setAttribute("data-num-product", arrKeysObj[i]);
            itemElement.innerHTML = `
                        <div class="products__block-image">
                            <img src="${localStorageInfoProduct[arrKeysObj[i]]["src"]}" alt="watch" class="products__image">
                        </div>
                        <div class="products__description">
                            <div class="products__header-part">
                                <h2 class="title products__title">0.4 TrackMate XE</h2>
                                <button class="button products__button" data-sidebar-product-delete style="width: 45px; background-color: transparent;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" style="fill: white !important;">
                                        <path d="M13 3A1.0001 1.0001 0 0 0 11.986328 4L6 4A1.0001 1.0001 0 1 0 6 6L24 6A1.0001 1.0001 0 1 0 24 4L18.013672 4A1.0001 1.0001 0 0 0 17 3L13 3z M6 8L6 24C6 25.105 6.895 26 8 26L22 26C23.105 26 24 25.105 24 24L24 8L6 8z"/>
                                    </svg>
                                </button>
                            </div>
                            <p class="products__price-text" data-sidebar-product-price>${localStorageInfoProduct[arrKeysObj[i]]["price"]}.00 ₽</p>
                            <p class="products__select--text">Цвет <span data-sidebar-product-color="">${localStorageInfoProduct[arrKeysObj[i]]["color"]}</span> *</p>
                            <div class="products__footer-part">
                                <div class="products__quantity">
                                    <p class="products__select--text">Количество: <span data-sidebar-product-quantity="">${localStorageInfoProduct[arrKeysObj[i]]["quantity"]}</span></p>
                                </div>
                                <p class="products__price-text" data-sidebar-total-price="2500">${this.getTotalPriceProduct(localStorageInfoProduct[arrKeysObj[i]]["price"], localStorageInfoProduct[arrKeysObj[i]]["quantity"])}.00 ₽</p>
                            </div>
                        </div>
                `;
            this.productSidebarListElement.append(itemElement);
        }
    }
    // xd
    getTotalPriceProduct = (a, b) => {
        return a * b;
    }


    showProductColor = (event) => {
        this.getInfoProduct()
        this.itemProductElements = document.querySelectorAll(".model__select--item");
        this.itemProductElements.forEach(elem => {
            elem.classList.remove("item--active");
        })
        const buttonColor =  event.target.closest(".model__select--item");
        console.log(buttonColor);
        buttonColor.classList.add("item--active");
        const numPhoto = event.target.closest("[data-select-item]").getAttribute("data-select-item");
        this.productImgElement.setAttribute("src", `./src/img/watch-main-option-${numPhoto}.png`);
    }

    bindEvents = () => {
        document.addEventListener("click", (event) => {
            if(event.target.closest("[data-select-color]")) {
                this.selectProductColor(event);
            }

            if(event.target.closest("[data-select-item]")) {
                this.showProductColor(event);
            }
            if(event.target.closest(".buying__info--wrapper-head")) {
                this.openDescriptionProduct(event);
            }

            if(event.target.closest("[data-add-product-backet]")) {
                this.saveUserPurchases(event);
            }

        })
    }
}
// сделал чтобы не было повторения и ошибок
// new ActionProductCard();

// action basket
class ActionBasket extends ActionProductCard{
    isBasketActive = false;
    constructor() {
        super();
        this.sidebarElement = document.querySelector(".sidebar");
        this.buttonBasketElement = document.querySelector("[data-action-basket]");
        this.buttonCloseBasketElement = document.querySelector("[data-close-basket]");
        this.bindEvents();
    }
    openBasket = () => {
        this.isBasketActive = true;
        this.sidebarElement.classList.add("sidebar-active");
        this.sidebarElement.classList.remove("sidebar-not-active", "visually-hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.basketInfoProducts();
    }
    closeBasket = () => {
        this.isBasketActive = false;
        this.sidebarElement.classList.add("sidebar-not-active");
        setTimeout((isBasketActive) => {
            this.sidebarElement.classList.add("visually-hidden");
        }, 500, this.isBasketActive)
        this.sidebarElement.classList.remove("sidebar-active");
    }
    // Доделать удаление объекта с json и из local storage
    deleteProductInBasket = (event) => {
        event.target.closest("[data-num-product]").remove();
        const product = event.target.closest("[data-num-product]");
        const numProduct = product.getAttribute("data-num-product");
        let json = localStorage.getItem("user");
        const objProduct = JSON.parse(json);
        objProduct[numProduct]["isActive"] = false;
        json = JSON.stringify(objProduct);
        localStorage.setItem("user", json);
    }
    bindEvents = () => {
        document.addEventListener("click", (event) => {
            if(this.isBasketActive && !event.target.closest(".sidebar") && !event.target.closest("[data-action-basket]")) {
                this.closeBasket();
            }
            if(event.target.closest("[data-sidebar-product-delete]")) {
                this.deleteProductInBasket(event);
            }
        })
        this.buttonBasketElement.addEventListener("click", () => {
            if(!this.isBasketActive) {
                this.openBasket()
            } else {
                this.closeBasket();
            }
        })
        this.buttonCloseBasketElement.addEventListener("click", () => {
            this.closeBasket();
        })
    }
}
new ActionBasket();

// chapter question
class QuestionPage {
    constructor() {
        this.onBind();
    }

    showDescription = (item) => {
        const descriptionElement = item.querySelector(".chapter__text");
        descriptionElement.classList.toggle("visually-hidden");
    }

    switchChapterQuestions = (event) => {
        this.linkElements = document.querySelectorAll("[data-questions-section]");
        this.linkElements.forEach(elem => {
            elem.classList.remove("faq__text--active")
        })
        event.target.classList.add("faq__text--active");
        this.chapterQuestionElement = document.querySelector(".faq__chapter");
        this.loadChapterQuesiton(event.target.getAttribute("data-questions-section"));
    }

    loadChapterQuesiton = (views) => {
        if(views === "all") {
            this.viewChapterFirst();
        }
        if(views === "faq section") {
            this.viewChapterSecond();
        }
    }

    viewChapterFirst = () => {
        this.chapterQuestionElement.innerHTML = `
            <ul class="chapter__list">
                <li class="chapter__item">
                         <div class="chapter__header">
                              <h3 class="chapter__title title">О чем раздел FAQ?</h3>
                              <p class="chapter__cross">+</p>
                         </div>
                    <p class="chapter__text">Раздел FAQ содержит ответы на частые вопросы о вашем бизнесе, например, «В какие регионы вы доставляете?», «Какие у вас часы работы?» или «Как записаться на услугу?».</p>
                </li>
                <li class="chapter__item">
                                <div class="chapter__header">
                                    <h3 class="chapter__title title">Почему раздел с вопросами и ответами важен?</h3>
                                    <p class="chapter__cross">+</p>
                                </div>
                     <p class="chapter__text visually-hidden">Раздел с вопросами и ответами — отличный способ для пользователей быстро найти интересующую их информацию и взаимодействовать с вашим бизнесом и сайтом более эффективно и удобно.</p>
                </li>
                <li class="chapter__item">
                             <div class="chapter__header">
                                    <h3 class="chapter__title title">Где можно добавить раздел FAQ?</h3>
                                    <p class="chapter__cross">+</p>
                                </div>
                      <p class="chapter__text visually-hidden">Раздел можно добавить на любую страницу сайта или приложения Wix, для удобства пользователей.</p>
               </li>
            </ul>
        `;
    }
    viewChapterSecond = () => {
        this.chapterQuestionElement.innerHTML = `
            <ul class="chapter__list">
                <li class="chapter__item">
                    <div class="chapter__header">
                        <h3 class="chapter__title title">Как добавить новый вопрос и ответ?</h3>
                        <p class="chapter__cross">+</p>
                     </div>
                    <p class="chapter__text">Чтобы добавить вопрос в раздел, выполните следующие шаги:</p>
                </li>
                <li class="chapter__item">
                     <div class="chapter__header">
                            <h3 class="chapter__title title">Можно ли вставить картинку, видео или GIF в раздел?</h3>
                            <p class="chapter__cross">+</p>
                     </div>
                     <p class="chapter__text visually-hidden">Да. Чтобы добавить медиафайлы, выполните следующие шаги:</p>
                </li>
                <li class="chapter__item">
                     <div class="chapter__header">
                     <h3 class="chapter__title title">Как изменить или удалить название раздела с вопросами и ответами?</h3>
                            <p class="chapter__cross">+</p>
                     </div>
                      <p class="chapter__text visually-hidden">
                            Вы можете изменить название раздела из вкладки «Настройки» в редакторе.
                            Чтобы удалить название раздела из мобильного приложения, перейдите в раздел «Сайт и моб.» в приложении Owner.
                      </p>
               </li>
            </ul>
        `;
    }


    onBind = () => {
        document.addEventListener("click", (event) => {
            if(event.target.closest("[data-questions-section]")) {
                this.switchChapterQuestions(event);
            }

            if(event.target.closest(".chapter__item")) {
                this.showDescription(event.target.closest(".chapter__item"));
            }
            if(event.target.closest("[data-questions-section]")) {
                event.preventDefault();
            }
        })
    }
}
new QuestionPage();

document.addEventListener("click", (event) => {
    // back in to main page
    // if(event.target.closest('[href="/"]')) {
    //     event.preventDefault();
    //     window.history.pushState(
    //         {},
    //         '',
    //         event.target.getAttribute("href"),
    //     )
    //     window.scrollTo({top:0, behavior: "smooth"})
    // }
})

// switch to buy
class switchPages {
    pages = {
        product: "product-page",
        cart: "basket-page",
        questions: "questions",
        "terms-and-use": "terms-and-use",
        "delivery-and-return": "delivery-and-return",
        "data-protection": "data-protection",
    }
    constructor() {
        this.bindEvents();
    }

    fadeIn = (elem) => {
        let opacityWindow = 1;

        const step = (elem) => {
            if(opacityWindow > 0) {
                elem.style.opacity = String(opacityWindow -= 0.05);
            } else {
                elem.style.opacity = 0;
                clearInterval(idInterval);
            }
        }
        const idInterval = setInterval( step, 25, elem);
    }

    fadeOut = (elem) => {
        let opacityWindow = 0;

        const step = () => {
            if(opacityWindow < 1) {
                elem.style.opacity = String(opacityWindow += 0.02);
            } else {
                elem.style.opacity = 1;
                clearInterval(idInterval);
            }
        }
        const idInterval = setInterval( step, 25, elem);
    }

    loadPages = async (page) => {
        const response = await fetch(`./pages/${page}.html`);
        return await response.text();
    }

    renderPages = async (path) => {
        const mainElement = document.querySelector("main");
        mainElement.innerHTML = await this.loadPages(path);
    }

    switchToProductCard = (event) => {
        event.preventDefault();
        window.history.pushState(
                {},
            '',
            event.target.getAttribute("data-route"),
        )
        setTimeout(() => {
            this.renderPages(event.target.getAttribute("data-route"));
            this.fadeOut(document.body);
            window.scrollTo({top:0, behavior: "smooth"});
        }, 500)
    }

    bindEvents = () => {
        document.addEventListener("click", (event) => {
            if(event.target.matches("[data-route]")){
                this.fadeIn(document.body);
                this.switchToProductCard(event);
            }
        });
    }
}
new switchPages();

