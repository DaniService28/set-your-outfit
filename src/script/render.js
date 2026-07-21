import { getProductById } from "./data.js";
import { addToCart, showToast, removeFromCart, getCart, updateCartCount } from "./cart.js";
import { openCheckoutModal, closeCheckoutModal, setupCheckoutForm } from "./main.js";

export function clearMain() {
  const main = document.getElementById("main");
  main.innerHTML = "";
}

// Render a product card
export function renderProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    </div>
  `;
}

// Main banner
export function renderBanner() {
  return `
    <section class="banner">
      <h1>BEST PROMOTIONS</h1>
      <p>Find your perfect outfit today</p>
    </section>
  `;
}

// Render Home
export async function renderHomeView(products) {
  clearMain();
  const main = document.getElementById("main");

  // HERO BANNER
  main.innerHTML += `
    <section class="hero fade-in-up" style="background-image: url('./src/assets/home-hero.jpg');">
      <h1>Find Your Style</h1>
    </section>
  `;

  // CATEGORY GRID
  main.innerHTML += `
    <h2 class="fade-in-up">Shop by Category</h2>
    <div class="category-grid fade-in-up">
      <div class="category-card" data-route="men" style="background-image:url('./src/assets/men-category.jpg');">
        <span>Men</span>
      </div>
      <div class="category-card" data-route="women" style="background-image:url('./src/assets/women-category.jpg');">
        <span>Women</span>
      </div>
      <div class="category-card" data-route="shoes" style="background-image:url('./src/assets/shoes-category.jpg');">
        <span>Shoes</span>
      </div>
      <div class="category-card" data-route="accessories" style="background-image:url('./src/assets/accessories-category.jpg');">
        <span>Accessories</span>
      </div>
    </div>
  `;

  // PRODUCT GRID
  main.innerHTML += `<h2 class="fade-in-up">Popular Picks</h2>`;
  const grid = document.createElement("div");
  grid.classList.add("home-product-grid");

  products.forEach(product => {
    grid.innerHTML += renderProductCard(product);
  });

  main.appendChild(grid);

  // Category click listeners
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", async () => {
      const route = card.dataset.route;

      if (route === "men") {
        const data = await getAllMenProducts();
        renderMenView(data);
      } else if (route === "women") {
        const data = await getAllWomenProducts();
        renderWomenView(data);
      } else if (route === "shoes") {
        const shoes = await getProductsByCategory("mens-shoes");
        renderHomeView(shoes);
      } else if (route === "accessories") {
        const acc = await getProductsByCategory("mens-watches");
        renderHomeView(acc);
      }
    });
  });

  // Product click listeners
  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      openProductModal(id);
    });
  });
}


// Render Men
export function renderMenView(data) {
  clearMain();
  const main = document.getElementById("main");

  main.innerHTML += `<h1 class="page-title">Men's Collection</h1>`;

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

// Render Women
export function renderWomenView(data) {
  clearMain();
  const main = document.getElementById("main");

  main.innerHTML += `<h1 class="page-title">Women's Collection</h1>`;

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

// Product modal
export async function openProductModal(id) {
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
  document.body.style.overflow = "hidden";

  document.getElementById("close-product-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  });

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product);
    showToast("Added to cart ✔️");
  });
}

// Cart view
export function renderCartView(items) {
  clearMain();
  const main = document.getElementById("main");

  main.innerHTML = `
    <h1>Your Cart</h1>
    <button id="checkout-btn" class="checkout-btn">Proceed to Checkout</button>
  `;

  // Open checkout modal
  document.getElementById("checkout-btn").addEventListener("click", () => {
    openCheckoutModal();
    setupCheckoutForm();
  });

  if (items.length === 0) {
    main.innerHTML += `<p>Your cart is empty.</p>`;
    return;
  }

  const list = document.createElement("div");
  list.classList.add("cart-list");

  items.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}">
      <div class="cart-info">
        <h3>${item.title}</h3>
        <p>$${item.price}</p>
      </div>
      <button class="remove-btn" data-id="${item.id}">🗑️</button>
    `;

    const removeBtn = cartItem.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {
      const id = removeBtn.dataset.id;

      removeFromCart(id);
      cartItem.remove();

      if (getCart().length === 0) {
        renderCartView(getCart());
      }
    });

    list.appendChild(cartItem);
  });

  main.appendChild(list);
}


