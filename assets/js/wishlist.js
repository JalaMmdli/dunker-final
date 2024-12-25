import { getProductById } from "./productService.js";
import { getWishlist, addToWishlist } from "./wishlistService.js";
import { addToBasket } from "./basketService.js";

const wishlistArea = document.querySelector(".wishlist-items");

var removeButtons = document.querySelectorAll(".removeToWishlist");
var addToCartButtons=document.querySelectorAll(".addToCartButton")


function renderWishlistArea() {

    

    
  let wishlist = getWishlist();

  if (wishlist.length == 0) {
    wishlistArea.innerHTML = `     
  
             <div
              class="wishlist-title text-center py-4 border border-top-1 border-bottom-1">
              <p class="m-0 fw-bold">NO PRODUCTS ADDED TO THE WISHLIST</p>
            </div> 
            `;
  } else {
    wishlistArea.innerHTML = ``;
    wishlist.forEach((item) => {
      let product = getProductById(item.ProductId);

      if (product != undefined) {
        wishlistArea.innerHTML += `     <div class="wishlist-item">
              <div class="left-side-wishlist">
                <button data-id="${product.Id}" class="removeToWishlist">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="wishlist-img">
                  <img
                    src="/assets/img/${product.Images[0].Image}"
                    alt="${product.Name}" />
                </div>
                <div class="wishlist-info">
                  <a href="#">${product.Name}</a>
                  <a href="#"><span>Winter</span></a>
                </div>
              </div>
              <div class="right-side-wishlist">
                <div class="product-price">
                  <span>$${product.Price}</span>
                </div>
                <div class="product-stock-status">
                  <span>In Stock</span>
                </div>
                <a href="#" data-id="${product.Id}" class="custom-button addToCartButton">
                  ADD TO CART
                  <i class="fa-solid fa-basket-shopping"></i>
                </a>
              </div>
            </div> `;
      }
    });
  }




  removeButtons = document.querySelectorAll(".removeToWishlist");
  addToCartButtons=document.querySelectorAll(".addToCartButton")



  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
  
      addToWishlist(btn.dataset.id);
      renderWishlistArea();
    });
  });
  
  
  addToCartButtons.forEach(btn=>{
      btn.addEventListener("click",(e)=>{
          e.preventDefault();
  
          addToBasket(btn.dataset.id,1)
      })
  })
}

renderWishlistArea();

