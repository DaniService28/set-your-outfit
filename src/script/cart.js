// Siempre leer el carrito desde localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Guardar carrito en localStorage
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Agregar producto al carrito
export function addToCart(product) {
  const cart = getCart();        // leer carrito real
  cart.push(product);            // agregar
  saveCart(cart);                // guardar
  updateCartCount();             // actualizar contador
}

// Eliminar producto del carrito
export function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== Number(id));
  saveCart(cart);
  updateCartCount();
}

// Actualizar contador del carrito SIEMPRE desde localStorage
export function updateCartCount() {
  const count = document.getElementById("cart-count");
  const cart = getCart();        // leer carrito real
  count.textContent = cart.length;
}

// Toast
export function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

