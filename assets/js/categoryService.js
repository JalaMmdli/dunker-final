import { categories } from "./data.js";

export function getAllCategories() {
  return categories;
}

export function getCategoryById(categoryId) {
  return categories.find((category) => category.Id == categoryId);
}

export function createCategory(newcategory) {
  const categoryId = categories.length ? categories[categories.length - 1].id + 1 : 1;
  newcategory.id = categoryId;
  categories.push(newcategory);
  return newcategory;
}

export function updateCategory(categoryId, updatedData) {
  const categoryIndex = categories.findIndex(
    (category) => category.id === categoryId
  );
  if (categoryIndex !== -1) {
    categories[categoryIndex] = { ...categories[categoryIndex], ...updatedData };
    return categories[categoryIndex];
  }
  return null;
}

export function deleteCategory(categoryId) {
  const categoryIndex = categories.findIndex(
    (category) => category.id === categoryId
  );
  if (categoryIndex !== -1) {
    const deletedcategory = categories.splice(categoryIndex, 1);
    return deletedcategory[0];
  }
  return null;
}


