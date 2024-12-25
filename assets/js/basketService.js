import { getProductById } from "./productService.js";

const BASKET_KEY = "DunkerBasket";

export function getBasket() {
  let json = localStorage.getItem(BASKET_KEY);

  let basket = [];
  try {
    basket = JSON.parse(json) || [];
  } catch (error) {
    console.warn("Invalid basket data. Resetting to an empty basket.", error);
    basket = [];
  }

  return basket;
}

export function setBasket(basket) {
  let json = JSON.stringify(basket);
  localStorage.setItem(BASKET_KEY, json);
}

export function addToBasket(productId, count) {
  const product = getProductById(productId);

  if (product == undefined) {
    throw new Error("Product not found");
  }

  if (count < 1) count = 1;

  let basket = getBasket();

  let basketItem = basket.find((x) => x.ProductId === productId);

  if (basketItem != undefined) {
    basketItem.Count += count;
  } else {
    basketItem = { ProductId: productId, Count: count };
    basket.push(basketItem);
  }

  setBasket(basket);

  renderBasketModal();



  Swal.fire({
    position: "center",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });

}

export function removeToBasket(productId) {
  let basket = getBasket();

  let basketItem = basket.find((x) => x.ProductId == productId);

  if (basketItem == undefined) throw new Error("basket item is not found");

  basket = basket.filter((x) => x.ProductId != productId);

  setBasket(basket);
}

export function renderBasketModal() {

  
    let basket = getBasket();
    const basketCount = document.querySelector(".count-basket");
  
    let count = basket.length;
    if (basketCount != undefined) basketCount.innerHTML = count;
  
    const basketModalArea = document.querySelector(".basket-sidebar");
  
    if (basketModalArea != undefined) {
      const productsHtml = basket
        .map((item) => {
          let product = getProductById(item.ProductId);
  
          if (product != undefined) {
            return `<div class="basket-product">
                <a class="basket-img" href="#">
                  <img src="/assets/img/${product.Images[0].Image}" alt="${product.Name}" />
                </a>
                <div class="basket-product-content">
                  <a href="#" class="product-category">Fitness</a>
                  <a href="#" class="product-item">${product.Name}</a>
                  <span class="product-cost">$${product.Price} x ${item.Count}</span>
                </div>
                <a href="#" class="remove-basket remove-to-basket" data-id="${item.ProductId}">
                  <i class="fa-solid fa-x"></i>
                </a>
              </div>`;
          }
          return "";
        })
        .join("");
  
      basketModalArea.innerHTML = `
            <div class="basket-sidebar-content">
              <div class="basket-sidebar-header">
                <h4>Shopping Cart</h4>
                <a href="#" class="button-close mb-2">
                  <i class="fa-solid fa-x"></i>
                </a>
              </div>
              <div class="basket-products">
                ${productsHtml}
              </div>
              <div class="basket-total">
                <span>Subtotal:</span>
                <span class="amount">$${calculateSubtotal(basket)}</span>
              </div>
              <div class="basket-buttons">
                <a href="checkout.html" class="custom-button">View Cart & Checkout</a>
              </div>
            </div>
         `;
    }
  
    // Open Basket Menu
  
    const basketMenu = document.querySelector(".basket-sidebar");
    const basketClose = document.querySelector(".button-close");
  
  
  
    if (basketClose) {
      basketClose.addEventListener("click", (e) => {
        e.preventDefault();
        basketMenu.classList.remove("active");
      });
    }
    
    // Attach Remove Button Listeners
    const removeToBasketButtons = document.querySelectorAll(".remove-to-basket");
    removeToBasketButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
  
        removeToBasket(btn.dataset.id); 
        renderBasketModal(); 
      });
    });
  }
    

function calculateSubtotal(basket) {
  return basket
    .map((item) => {
      const product = getProductById(item.ProductId);
      return product ? product.Price * item.Count : 0;
    })
    .reduce((total, price) => total + price, 0)
    .toFixed(2);
}
