import { getProductById } from "./data.js";

export function clearMain() {
  const main = document.getElementById("main");
  main.innerHTML = "";
}

// render a card
export function renderProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    </div>
  `;
}

// main banner
export function renderBanner() {
  return `
    <section class="banner">
      <h1>BEST PROMOTIONS</h1>
      <p>Find your perfect outfit today</p>
    </section>
  `;
}

// render main home
export function renderHomeView(products) {
  clearMain();
  const main = document.getElementById("main");

  // Banner
  main.innerHTML += renderBanner();

  // Productos destacados
  main.innerHTML += `<h2>Featured Products</h2>`;

  const grid = document.createElement("div");
  grid.classList.add("product-grid");

  products.forEach(product => {
    grid.innerHTML += renderProductCard(product);
  });

  main.appendChild(grid);
}

// Renderiza la vista completa de Hombres
export function renderMenView(data) {
  clearMain();
  const main = document.getElementById("main");

  main.innerHTML += `
    <h1 class="page-title">Men's Collection</h1>
  `;

  data.forEach(section => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("category-section");

  wrapper.innerHTML += `
    <h2 class="category-title">${formatCategoryName(section.category)}</h2>
  `;

  const grid = document.createElement("div");
  grid.classList.add("product-grid");

  section.products.forEach(product => {
    grid.innerHTML += renderProductCard(product);
  });

  
    // Add event listener to each product card to open the modal when clicked   
  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
        const id = card.dataset.id;
        openProductModal(id);
    });
    });

  wrapper.appendChild(grid);
  main.appendChild(wrapper);
});
}

// Renderiza la vista completa de Mujeres
export function renderWomenView(data) {
  clearMain();
  const main = document.getElementById("main");

  main.innerHTML += `
    <h1 class="page-title">Women's Collection</h1>
  `;

  data.forEach(section => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("category-section");

  wrapper.innerHTML += `
    <h2 class="category-title">${formatCategoryName(section.category)}</h2>
  `;

  const grid = document.createElement("div");
  grid.classList.add("product-grid");

  section.products.forEach(product => {
    grid.innerHTML += renderProductCard(product);
  });

  // Add event listener to each product card to open the modal when clicked   
  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
        const id = card.dataset.id;
        openProductModal(id);
    });
    });

  wrapper.appendChild(grid);
  main.appendChild(wrapper);
});
}

function formatCategoryName(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}


export async function openProductModal(id) {
    // Fetch product details by ID
  const modal = document.getElementById("product-modal");
  const product = await getProductById(id);

  modal.innerHTML = `
    <div class="modal-content">
      <button id="close-product-modal">X</button>

      <img src="${product.thumbnail}" alt="${product.title}" style="width:100%; border-radius:10px;">

      <h2>${product.title}</h2>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
      <p>${product.description}</p>

      <button id="add-to-cart-btn">Add to Cart</button>
    </div>
  `;

  modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // 🚫 bloquea scroll

  document.getElementById("close-product-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // ✅ restaura scroll
  });
}