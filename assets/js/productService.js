import { products } from "./data.js";

export function getAllProducts() {
  return products;
}

export function getProductById(productId) {
  const product = products.find((p) => p.Id == productId);
  return product;
}

export function createProduct(newProduct) {
  const productId = products.length ? products[products.length - 1].id + 1 : 1;
  newProduct.id = productId;
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(productId, updatedData) {
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedData };
    return products[productIndex];
  }
  return null;
}

export function deleteProduct(productId) {
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    return deletedProduct[0];
  }
  return null;
}

export function filterProducts(
  brandIds,
  categoryIds,
  search,
  minPrice,
  maxPrice
) {
  let filteredProducts = products;

  if (categoryIds.length > 0) {
    filteredProducts = filteredProducts.filter((x) =>
      categoryIds.includes(x.CategoryId)
    );
  }

  if (brandIds.length > 0) {
    filteredProducts = filteredProducts.filter((x) =>
      brandIds.includes(x.BrandId)
    );
  }

  if (search.length > 0) {
    filteredProducts = filteredProducts.filter((x) =>
      x.Name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  if (minPrice != 0) {
    filteredProducts = filteredProducts.filter((x) => x.Price > minPrice);
  }

  if (maxPrice < 250) {
    filteredProducts = filteredProducts.filter((x) => x.Price < maxPrice);
  }

  return filteredProducts;
}
export function sortProducts(sortedProducts, sort) {

  if (sortProducts.length == 0) return [];

  switch (sort) {
    case "0":
      return sortedProducts;

    case "1": 
      return sortedProducts.sort((a, b) => b.Price - a.Price);

    case "2": 
      return sortedProducts.sort((a, b) => a.Price - b.Price);

    default:
      return sortedProducts;
  }
}

export function getTop8ExpensiveProducts() {
  const sortedProducts = products.sort((a, b) => b.Price - a.Price);

  return sortedProducts.slice(0, 8);
}

