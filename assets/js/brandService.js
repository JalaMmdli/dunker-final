import { brands } from "./data.js";

export function getAllBrands() {
  return brands;
}

export function getBrandById(brandId) {
  return brands.find((brand) => brand.id === brandId);
}

export function createBrand(newbrand) {
  const brandId = brands.length ? brands[brands.length - 1].id + 1 : 1;
  newbrand.id = brandId;
  brands.push(newbrand);
  return newbrand;
}

export function updateBrand(brandId, updatedData) {
  const brandIndex = brands.findIndex(
    (brand) => brand.id === brandId
  );
  if (brandIndex !== -1) {
    brands[brandIndex] = { ...brands[brandIndex], ...updatedData };
    return brands[brandIndex];
  }
  return null;
}

export function deleteBrand(brandId) {
  const brandIndex = brands.findIndex(
    (brand) => brand.id === brandId
  );
  if (brandIndex !== -1) {
    const deletedbrand = brands.splice(brandIndex, 1);
    return deletedbrand[0];
  }
  return null;
}


