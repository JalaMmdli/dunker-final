import {
  filterProducts,
  getAllProducts,
  getProductById,
  sortProducts,
} from "./productService.js";
import { getAllCategories, getCategoryById } from "./categoryService.js";
import { getAllBrands, getBrandById } from "./brandService.js";

const allProducts = getAllProducts();
let renderedProducts = allProducts;
const brands = getAllBrands();
const categories = getAllCategories();

const productsArea = document.querySelector(".shopProductsArea");
const categoriesArea = document.querySelector(".categoriesForFilter");
const brandsArea = document.querySelector(".brandsForFilter");
const filterForm = document.querySelector(".filterForm");
const sortInput = document.querySelector("#sortOptions");

function renderProducts(products) {
  productsArea.innerHTML = "";

  if (products.length == 0) {
    productsArea.innerHTML = `    <div class="  text-center py-4 border border-top-1 border-bottom-1">
                            <p class="m-0 fw-bold">Products not found</p>
                        </div>`;

    return;
  }

  products.forEach((product) => {
    productsArea.innerHTML += `
              <div class="featured-products-card col-lg-4 col-md-6 col-12" data="fitness">
                <button class="add-to-fav-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.932" height="16" viewBox="0 0 16.932 16">
                    <path
                      d="M8.467 16a1.756 1.756 0 0 1-.94-.273c-.67-.422-6.576-4.254-7.425-8.776a6.154 6.154 0 0 1 1.27-4.977A5.177 5.177 0 0 1 5.356 0a4.369 4.369 0 0 1 3.111 1.086A4.185 4.185 0 0 1 11.577 0a5.18 5.18 0 0 1 3.983 1.973 6.157 6.157 0 0 1 1.269 4.977c-.849 4.522-6.755 8.354-7.426 8.777a1.753 1.753 0 0 1-.936.273ZM5.356 2A3.186 3.186 0 0 0 2.92 3.241a4.133 4.133 0 0 0-.853 3.341c.646 3.439 5.543 6.806 6.4 7.371.857-.565 5.754-3.932 6.4-7.371a4.136 4.136 0 0 0-.851-3.341A3.192 3.192 0 0 0 11.577 2a3.021 3.021 0 0 0-2.354 1.122 1 1 0 0 1-.756.346 1 1 0 0 1-.756-.345A3.024 3.024 0 0 0 5.356 2Z">
                    </path>
                  </svg>
                </button>
        
                <a >
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
        
                <button class="add-to-basket-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17">
                    <path
                      d="M14 3.5h-3a3.5 3.5 0 0 0-7 0H1a1 1 0 0 0-1 1V15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4.5a1 1 0 0 0-1-1ZM7.5 2A1.5 1.5 0 0 1 9 3.5H6A1.5 1.5 0 0 1 7.5 2ZM13 15H2V5.5h2v1a1 1 0 0 0 2 0v-1h3v1a1 1 0 0 0 2 0v-1h2Z">
                    </path>
                  </svg>
                </button>
              </div>
          `;
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

  renderedProducts = filterProducts(brandInts, categoryInts, search);

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
