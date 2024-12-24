import { products } from "./data.js";

export function getAllProducts() {
  return products;
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
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

export function filterProducts(brandIds, categoryIds, search) {
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

  return filteredProducts;
}
export function sortProducts(sortedProducts,sort) {
    // Create a copy of the array to avoid modifying the original

    if(sortProducts.length==0)
        return [];

    switch (sort) {
      case "0": // No sorting, return original order
        return sortedProducts;
  
        
            case "1": // Sort by price in descending order
              return sortedProducts.sort((a, b) => b.Price - a.Price);
        
      case "2": // Sort by price in ascending order
        return sortedProducts.sort((a, b) => a.Price - b.Price);

      default: // Default case, return the original order
        return sortedProducts;
    }
  }
  