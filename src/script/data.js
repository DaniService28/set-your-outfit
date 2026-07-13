// data.js
// We are gonna use DummyJSON API to fetch products data
// This is public API, so we don't need any authentication or API key

const API_URL = "https://dummyjson.com/products";

/**
 * Get products by category
 * Example: mens-shoes, womens-dresses, mens-shirts
 */
export async function getProductsByCategory(category) {
  try {
    const res = await fetch(`${API_URL}/category/${category}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Search products by text
 */
export async function searchProducts(query) {
  try {
    const res = await fetch(`${API_URL}/search?q=${query}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Get all categories to know what is coming from the API to populate the navigation menu
export async function getAllCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  const categories = await res.json();
  return new Set(categories);
}

export const MEN_CATEGORIES = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "sunglasses",
  "sports-accessories",
  "fragrances",
  "mobile-accessories",
  "kitchen-accessories",
  "vehicle",
  "motorcycle",
  "smartphones",
  "laptops",
  "tablets",
  "furniture",
  "home-decoration"
];

export async function getAllMenProducts() {
    // Fetch all products for each category in MEN_CATEGORIES and return an array 
    // of objects with category and products
    const results = [];

    for (const category of MEN_CATEGORIES) {
        const products = await getProductsByCategory(category);
        results.push({
        category,
        products
        });
    }

    return results;
}


export const WOMEN_CATEGORIES = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
  "tops",
  "sunglasses",
  "fragrances",
  "sports-accessories",
  "mobile-accessories",
  "kitchen-accessories",
  "beauty",
  "skin-care",
  "vehicle",
  "motorcycle",
  "furniture",
  "home-decoration"
];

export async function getAllWomenProducts() {
    // Fetch all products for each category in WOMEN_CATEGORIES and return an array 
    // of objects with category and products
    const results = [];

    for (const category of WOMEN_CATEGORIES) {
        const products = await getProductsByCategory(category);
        results.push({
        category,
        products
        });
    }

    return results;
}
