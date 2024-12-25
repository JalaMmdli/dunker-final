import { getBasket } from "./basketService.js";
import { getProductById } from "./productService.js";

const basket = getBasket();

const wishlistArea = document.querySelector("#wishlist");

if (basket.length == 0) {
  wishlistArea.innerHTML = `
    <div class="product-wishlist">
      <h2>OrderTitle</h2>
    </div>
    <div class="wishlist-title text-center py-4 border border-top-1 border-bottom-1">
      <p class="m-0 fw-bold">NotFoundItem</p>
    </div>
  `;
} else {
  const productItemsHtml = basket
    .map(item => {
      let product = getProductById(item.ProductId);

      if (product != undefined) {
        return `
          <div class="order-item">
            <img src="/assets/img/${product.Images[0].Image}" alt="${product.Name}">
            <div class="product-details">
              <a style="text-decoration:none;font-weight:600;color:black" href="/shop/detail/${item.ProductId}">
                <span>${product.Name}</span>
              </a>
              <span>Quantity: ${item.Count}</span>
            </div>
            <span class="price">₼${item.Count * product.Price}</span>
          </div>
        `;
      }
      return ''; // Handle undefined products gracefully
    })
    .join(''); // Join the array of HTML strings into one string

  const totalPrice = basket.reduce((total, item) => {
    const product = getProductById(item.ProductId);
    return total + (product ? item.Count * product.Price : 0);
  }, 0);

  wishlistArea.innerHTML = `
    <div class="product-wishlist">
      <h2>OrderTitle</h2>
    </div>
    <div class="checkout-container">
      <div class="order-summary-section">
        <h1>Summary</h1>
        ${productItemsHtml}
        <div class="total">
          <strong>Total:</strong>
          <strong>₼${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
      <div class="checkout-form-section">
        <h1>Details</h1>
        <form method="post" class="checkout-form orderForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" name="Name" required placeholder="NameInput">
            <span class="text-danger"></span>
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <input id="surname" name="Surname" required placeholder="SurnameInput">
            <span class="text-danger"></span>
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input id="city" name="City" required placeholder="CityInput">
            <span class="text-danger"></span>
          </div>
          <div class="form-group">
            <label for="region">Region</label>
            <input id="region" name="Region" required placeholder="RegionInput">
            <span class="text-danger"></span>
          </div>
          <div class="form-group">
            <label for="street">Street</label>
            <input id="street" name="Street" required placeholder="StreetInput">
            <span class="text-danger"></span>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="PhoneNumber" required placeholder="PhoneNumberInput">
            <span class="text-danger"></span>
          </div>
          <div class="form-group">
            <button type="submit" class="orderSubmitButton">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
