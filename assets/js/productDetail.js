import { getProductById } from "./productService.js";
import { getCategoryById } from "./categoryService.js";
import { getBrandById } from "./brandService.js";
import { addToBasket } from "./basketService.js";
import { addToWishlist,isExistWishlist } from "./wishlistService.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const product = getProductById(id);

if (product == undefined) throw new Error("Product is not found");

const brand=getBrandById(product.BrandId)
const category=getCategoryById(product.CategoryId)


const main=document.getElementById("main");


main.innerHTML=`
      <!-- Detail Product Section Start -->
      <section id="detail-product">
        <div class="row g-5">
          <div class="col-lg-6 col-12">
            <div class="image-gallery">
              <div class="zoom-img">
                <div class="zoomist-container">
                  <!-- zoomist-wrapper is required -->
                  <div class="zoomist-wrapper">
                    <!-- zoomist-image is required -->
                    <div class="zoomist-image">
                      <img
                        src="/assets/img/${product.Images[0].Image}"
                        alt="Product"
                        id="zoom-img" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="gallery-items">

                     ${product.Images.length>1? product.Images.map(
                        (image) => `
                          <div
                            <div class="gallery-item">
                  <img
                    src="/assets/img/${image.Image}"
                    alt="${product.Name}"
                    class="gallery-img" />
                </div>
                        `
                      ).join("") : ""}
            
               
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="product-content">
              <div class="product-heading">
                <h1>${product.Name}</h1>
                <span>$${product.Price}</span>
                <p>
                  ${product.Description}
                </p>
              </div>
              <div class="product-actions">
                <div class="counter">
                  <button class="decrease-product">-</button>
                  <span class="product-count">1</span>
                  <button class="increase-product">+</button>
                </div>
                <a class="custom-button addToBasketButton">
                  ADD TO CART
                  <span class="basket-product">
                    <i class="fa-solid fa-basket-shopping"></i>
                  </span>
                </a>
                <a href="#" class="wishlist-btn">
                  <i class="fa-regular fa-heart"></i>
                </a>
              </div>
              <div class="product-info">
                <div class="share">
                  <a href="#" class="fs-5 py-5 d-inline-block">
                    <i class="fa-solid fa-square-share-nodes"></i>
                  </a>
                </div>
                <div class="product-stats">
                  <div class="sku">
                    <span>SKU:</span>
                    <a href="#">${product.SKU}</a>
                  </div>
                  <div class="category">
                    <span>CATEGORY:</span>
                    <a href="#">${category?.Name}</a>
                  </div>
                  <div class="tag">
                    <span>BRAND:</span>
                    <a href="#">${brand?.Name}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 pt-5">
            <div class="product-description">
              <div class="product-description-header">
                <ul class="tab-items" id="tabItems">
                  <li class="tab-item">
                    <a href="#" class="tab-link" data-tab="description">
                      DESCRIPTION
                    </a>
                  </li>
                  <li class="tab-item">
                    <a href="#" class="tab-link" data-tab="additional-info">
                      Reviews (0)
                    </a>
                  </li>   
                </ul>
              </div>
              <div class="tabs-content pt-4" id="tabContent">
                <div class="tab" data-tab="description">
                  <p class="fs-5">
                   ${product.Description}
                  </p>
                </div>
                <div class="tab d-none" data-tab="additional-info">
                  <div class="product-stats">
                    <div class="container mt-5">
                      <div class="review">
                          <div class="d-flex align-items-start">
                              <img src="./assets/img/banner1.jpg" style="width: 70px;height: 70px;" alt="User Avatar" class="rounded-circle mr-3">
                              <div>
                                  <p class="mb-1 text-muted">April 12, 2024</p>
                                  <h5 class="font-weight-bold mb-1">Jason Smith</h5>
                                  <p>The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. Suspendisse ultricies nisi vel quam suscipit.</p>
                                  <div class="stars">
                                      <span class="text-warning">&#9733;</span>
                                      <span class="text-warning">&#9733;</span>
                                      <span class="text-warning">&#9733;</span>
                                      <span class="text-warning">&#9733;</span>
                                      <span class="text-secondary">&#9733;</span>
                                  </div>
                              </div>
                          </div>
                      </div>
              
                      <div class="review mt-4">
                          <div class="d-flex align-items-start">
                              <img src="./assets/img/banner1.jpg" style="width: 70px;height: 70px;" alt="User Avatar" class="rounded-circle mr-3">
                              <div>
                                  <p class="mb-1 text-muted">April 12, 2024</p>
                                  <h5 class="font-weight-bold mb-1">Sam Peters</h5>
                                  <p>The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. Suspendisse ultricies nisi vel quam suscipit.</p>
                                  <div class="stars">
                                      <span class="text-warning">&#9733;</span>
                                      <span class="text-warning">&#9733;</span>
                                      <span class="text-warning">&#9733;</span>
                                      <span class="text-secondary">&#9733;</span>
                                      <span class="text-secondary">&#9733;</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>

  
      </section>
      <!-- Detail Product Section End -->
      <!-- Related Products Section Start -->
     
      <!-- Related Products Section End -->

`



const productImages=document.querySelectorAll(".gallery-img");
const zoomImage=document.getElementById("zoom-img")

productImages.forEach(img=>{
    img.addEventListener('click',(e)=>{
        e.preventDefault();
        zoomImage.src=img.src;
    })
})

const decreaseBtn = document.querySelector(".decrease-product");
const increaseBtn = document.querySelector(".increase-product");
const productCount = document.querySelector(".product-count");
const addToBasketButton=document.querySelector(".addToBasketButton")
const wishlistButton=document.querySelector(".wishlist-btn");

let isExist=isExistWishlist(id);

if(isExist){
    wishlistButton.children[0].classList="fa-solid fa-heart"
}

wishlistButton.addEventListener("click",(e)=>{
    e.preventDefault();

    wishlistButton.children[0].classList.toggle("fa-regular")
    wishlistButton.children[0].classList.toggle("fa-solid")
    addToWishlist(id)
})

decreaseBtn.addEventListener("click", () => {
  let count = parseInt(productCount.textContent);

  if (count > 1) {
    count--;
    productCount.textContent = count;
  }
});

increaseBtn.addEventListener("click", () => {
  let count = parseInt(productCount.textContent);
  
  count++;
  productCount.textContent = count;
});


addToBasketButton.addEventListener("click",(e)=>{
    e.preventDefault();

    let count = parseInt(productCount.textContent);

    addToBasket(id,count);

    productCount.textContent=1;


 
})





