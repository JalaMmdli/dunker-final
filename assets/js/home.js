import { getTop8ExpensiveProducts } from "./productService.js"
import { isExistWishlist } from "./wishlistService.js";

const productsArea=document.querySelector(".home-products-area")

let products=getTop8ExpensiveProducts();

products.forEach(product => {

    let isExist=isExistWishlist(product.Id)
    productsArea.innerHTML+=`<div class="featured-products-card col-lg-3j col-md-6 col-12" data="fitness">
    <button class="add-to-fav-button" data-id="${product.Id}">
                                    <i class="${
                                      isExist ? "fa-solid" : "fa-regular"
                                    } fa-heart"></i>
                                </button>
        
                <a href="/product-detail.html?id=${product.Id}">
                  <div class="swiper productCardSlider swiper-initialized swiper-horizontal swiper-backface-hidden">
                    <div class="swiper-wrapper" id="swiper-wrapper-c347a114ec1613e9" aria-live="polite">
                      ${product.Images.map(
                        (image) => `
                          <div
                            class="swiper-slide swiper-slide-active"
                            role="group"
                            aria-label="1 / 5"
                            data-swiper-slide-index="0"
                            style="width: 251px; margin-right: 30px"
                          >
                            <img
                              src="/assets/img/${image.Image}"
                              alt="productImg"
                            />
                          </div>
                        `
                      ).join("")}
                    </div>
                    <button>
                      <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"
                        aria-controls="swiper-wrapper-c347a114ec1613e9"></div>
                    </button>
                    <button>
                      <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"
                        aria-controls="swiper-wrapper-c347a114ec1613e9"></div>
                    </button>
                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                  </div>
                </a>
                <div class="product-card-content">
                  <a href="./product-detail.html?id=1"> </a><a href="#">kickz</a>
                  <a href="#" class="product-title">${product.Name}</a>
                  <a href="#" class="product-category">fitness</a>
                  <div>
                    <span>$${product.Price}</span>
                    <span style="
                              color: #727272;
                              text-decoration: line-through;
                            "></span>
                  </div>
                </div>
        
                <button class="add-to-basket-button" data-id="${product.Id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17">
                    <path
                      d="M14 3.5h-3a3.5 3.5 0 0 0-7 0H1a1 1 0 0 0-1 1V15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4.5a1 1 0 0 0-1-1ZM7.5 2A1.5 1.5 0 0 1 9 3.5H6A1.5 1.5 0 0 1 7.5 2ZM13 15H2V5.5h2v1a1 1 0 0 0 2 0v-1h3v1a1 1 0 0 0 2 0v-1h2Z">
                    </path>
                  </svg>
                </button>
              </div>`
    
});