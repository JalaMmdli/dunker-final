import { getProductById } from "./productService.js";

const WISHLIST_KEY = "DunkerWishlist";

export function getWishlist() {
  let json = localStorage.getItem(WISHLIST_KEY);

  let wishlist = [];
  try {
    wishlist = JSON.parse(json) || [];
  } catch (error) {
    console.warn("Invalid wishlist data. Resetting to an empty wishlist.", error);
    wishlist = [];
  }

  return wishlist;
}

export function setWishlist(wishlist) {
  let json = JSON.stringify(wishlist);
  localStorage.setItem(WISHLIST_KEY, json);
}

export function addToWishlist(productId) {
  const product = getProductById(productId);

  if (product == undefined) {
    throw new Error("Product not found");
  }

  let wishlist = getWishlist();

  // Check if the product is already in the wishlist
  let wishlistItem = wishlist.find((x) => x.ProductId === productId);

  if (wishlistItem != undefined) {
    // Remove the product from the wishlist if it exists
    wishlist = wishlist.filter((x) => x.ProductId !== productId);
  } else {
    // Add the product to the wishlist if it doesn't exist
    wishlist.push({ ProductId: productId });
  }

  setWishlist(wishlist);
}


export function isExistWishlist(productId){

    var wishlist=getWishlist();

    return wishlist.some(x=>x.ProductId==productId);
}