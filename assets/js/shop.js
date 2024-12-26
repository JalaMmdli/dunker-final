import {
  filterProducts,
  getAllProducts,
  getProductById,
  sortProducts,
} from "./productService.js";
import { getAllCategories, getCategoryById } from "./categoryService.js";
import { getAllBrands, getBrandById } from "./brandService.js";
import { isExistWishlist,addToWishlist } from "./wishlistService.js";
import { addToBasket } from "./basketService.js";

const allProducts = getAllProducts();
let renderedProducts = allProducts;
const brands = getAllBrands();
const categories = getAllCategories();

const productsArea = document.querySelector(".shopProductsArea");
const categoriesArea = document.querySelector(".categoriesForFilter");
const brandsArea = document.querySelector(".brandsForFilter");
const filterForm = document.querySelector(".filterForm");
const sortInput = document.querySelector("#sortOptions");

const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const minPriceValue = document.getElementById("minPriceValue");
const maxPriceValue = document.getElementById("maxPriceValue");

function renderProducts(products) {
  productsArea.innerHTML = "";

  if (products.length == 0) {
    productsArea.innerHTML = `    <div class="  text-center py-4 border border-top-1 border-bottom-1">
                            <p class="m-0 fw-bold">Products not found</p>
                        </div>`;

    return;
  }

  products.forEach((product) => {
    let isExist = isExistWishlist(product.Id);
    productsArea.innerHTML += `
              <div class="featured-products-card col-lg-4 col-md-6 col-12" data="fitness">
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
                              src="./assets/img/${image.Image}"
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
              </div>
          `;
  });

  var swiper = new Swiper(".productCardSlider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const wishlistButtons = document.querySelectorAll(".add-to-fav-button");
  const addToCartButtons=document.querySelectorAll('.add-to-basket-button')


addToCartButtons.forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    e.preventDefault();

    addToBasket(btn.dataset.id,1)

  })
})

  wishlistButtons.forEach((wishlistButton) => {
    wishlistButton.addEventListener("click", (e) => {
      e.preventDefault();

      wishlistButton.children[0].classList.toggle("fa-regular");
      wishlistButton.children[0].classList.toggle("fa-solid");
      addToWishlist(wishlistButton.dataset.id);
    });
  });
}

renderProducts(allProducts);

categories.forEach((category) => {
  categoriesArea.innerHTML += `
     <li class="form-check">
                                    <label
                                      class="form-check-label w-100 d-flex align-items-center"
                                      for="${category.Name}"
                                    >
                                      <input
                                        class="form-check-input me-2"
                                        type="checkbox"
                                        name="CategoryId"
                                        id="${category.Name}"
                                        value=${category.Id}
                                      />
                                      ${category.Name}
                                    </label>
                                  </li>
                                 `;
});

brands.forEach((brand) => {
  brandsArea.innerHTML += `  <li class="form-check">
                                    <label
                                      class="form-check-label w-100 d-flex align-items-center"
                                      for="${brand.Name}"
                                    >
                                      <input
                                        class="form-check-input me-2"
                                        type="checkbox"
                                        name="BrandId"
                                        id="${brand.Name}"
                                        value="${brand.Id}"
                                      />
                                      ${brand.Name}
                                    </label>
                                  </li>
                      `;
});

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const filterData = new FormData(filterForm);

  const brandIds = filterData.getAll("BrandId");
  const categoryIds = filterData.getAll("CategoryId");
  const search = filterData.get("Search");

  let brandInts = brandIds.map(Number);
  let categoryInts = categoryIds.map(Number);

  let minPrice = minPriceInput.value;
  let maxPrice = maxPriceInput.value;

  renderedProducts = filterProducts(
    brandInts,
    categoryInts,
    search,
    minPrice,
    maxPrice
  );

  renderProducts(renderedProducts);
});

filterForm.addEventListener("reset", () => {
  renderedProducts = allProducts;

  renderedProducts = sortProducts(renderedProducts, sortInput.value);
  renderProducts(allProducts);
});

sortInput.addEventListener("change", (e) => {
  e.preventDefault();

  renderedProducts = sortProducts(renderedProducts, e.target.value);

  renderProducts(renderedProducts);
});

function updatePriceSlider() {
  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);

  if (minPrice > maxPrice) {
    minPriceInput.value = maxPrice;
  }
  if (maxPrice < minPrice) {
    maxPriceInput.value = minPrice;
  }

  minPriceValue.textContent = `$${minPriceInput.value}`;
  maxPriceValue.textContent = `$${maxPriceInput.value}`;

  const rangeMin = parseInt(minPriceInput.min);
  const rangeMax = parseInt(maxPriceInput.max);
  const percentMin =
    ((minPriceInput.value - rangeMin) / (rangeMax - rangeMin)) * 100;
  const percentMax =
    ((maxPriceInput.value - rangeMin) / (rangeMax - rangeMin)) * 100;

  minPriceInput.style.background = `linear-gradient(to right, #d3d3d3 ${percentMin}%, #000 ${percentMin}%, #000 ${percentMax}%, #d3d3d3 ${percentMax}%)`;
  maxPriceInput.style.background = minPriceInput.style.background;
}

minPriceInput.addEventListener("input", updatePriceSlider);
maxPriceInput.addEventListener("input", updatePriceSlider);

updatePriceSlider();
