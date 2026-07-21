// =========================
// IMPORTS
// =========================
import { 
  getAllMenProducts, 
  getAllWomenProducts, 
  getProductsByCategory 
} from "./data.js";

import { 
  renderHomeView, 
  renderMenView, 
  renderWomenView, 
  renderCartView
} from "./render.js";

import { 
  getCart, 
  updateCartCount 
} from "./cart.js";

import { showToast } from "./cart.js";


// =========================
// INIT
// =========================
export async function init() {
  setupNavigation();
  updateCartCount();

  // Detectar URL actual
  if (location.pathname === "/men") {
    const data = await getAllMenProducts();
    renderMenView(data);
    return;
  }

  if (location.pathname === "/women") {
    const data = await getAllWomenProducts();
    renderWomenView(data);
    return;
  }

  if (location.pathname === "/cart") {
    renderCartView(getCart());
    return;
  }

  // Default: home con productos variados
  const men = await getProductsByCategory("mens-shirts");
  const women = await getProductsByCategory("womens-dresses");
  const shoes = await getProductsByCategory("mens-shoes");

  const mixed = [
    ...men.slice(0, 4),
    ...women.slice(0, 4),
    ...shoes.slice(0, 4)
  ];

  renderHomeView(mixed);

  // 🔥 Activar navegación desde las tarjetas de categoría
  document.addEventListener("click", async (e) => {
    const card = e.target.closest(".category-card");
    if (!card) return;

    const route = card.dataset.route;

    if (route === "men") {
      const data = await getAllMenProducts();
      renderMenView(data);
      history.pushState({}, "", "/men");
    } else if (route === "women") {
      const data = await getAllWomenProducts();
      renderWomenView(data);
      history.pushState({}, "", "/women");
    } else if (route === "shoes") {
      const shoes = await getProductsByCategory("mens-shoes");
      renderHomeView(shoes);
      history.pushState({}, "", "/shoes");
    } else if (route === "accessories") {
      const acc = await getProductsByCategory("mens-watches");
      renderHomeView(acc);
      history.pushState({}, "", "/accessories");
    }
  });
}


// =========================
// NAVIGATION
// =========================
function setupNavigation() {
  const homeBtn = document.querySelector("[data-route='home']");
  const menBtn = document.querySelector("[data-route='men']");
  const womenBtn = document.querySelector("[data-route='women']");

  if (homeBtn) {
    homeBtn.addEventListener("click", async () => {
      const men = await getProductsByCategory("mens-shirts");
      const women = await getProductsByCategory("womens-dresses");
      const shoes = await getProductsByCategory("mens-shoes");

      const mixed = [
        ...men.slice(0, 4),
        ...women.slice(0, 4),
        ...shoes.slice(0, 4)
      ];

      renderHomeView(mixed);
      history.pushState({}, "", "/home");
    });
  }

  if (menBtn) {
    menBtn.addEventListener("click", async () => {
      const data = await getAllMenProducts();
      renderMenView(data);
      history.pushState({}, "", "/men");
    });
  }

  if (womenBtn) {
    womenBtn.addEventListener("click", async () => {
      const data = await getAllWomenProducts();
      renderWomenView(data);
      history.pushState({}, "", "/women");
    });
  }
}


// =========================
// CART BUTTON
// =========================
const cartBtn = document.getElementById("cart-btn");

cartBtn.addEventListener("click", () => {
  const items = getCart();
  renderCartView(items);
  history.pushState({}, "", "/cart");
});


// =========================
// CHECKOUT MODAL
// =========================
export function openCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  setupCheckoutForm(); // inicializa el formulario
}

export function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}


// =========================
// CHECKOUT FORM LOGIC
// =========================
export function setupCheckoutForm() {
  const form = document.getElementById("checkout-form");

  // Asegurar que el formulario se limpie cada vez que se abre
  form.reset();

  // Botón de cerrar
  const closeBtn = document.getElementById("checkout-close");
  closeBtn.onclick = () => {
    closeCheckoutModal();
  };

  // Submit del formulario
  form.onsubmit = (e) => {
    e.preventDefault();

    const order = {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      notes: document.getElementById("notes").value,
      cart: getCart()
    };

    console.log("Order submitted:", order);

    showToast("Order placed successfully ✔️");

    // limpiar carrito
    localStorage.setItem("cart", JSON.stringify([]));
    updateCartCount();

    closeCheckoutModal();
    renderCartView([]);
  };
}

init();
