// import some funcionts from other files
import { getAllMenProducts, getAllWomenProducts, getProductById, getProductsByCategory } from "./data.js";
import { renderHomeView, renderMenView, renderWomenView, openProductModal } from "./render.js";

export async function init() {
  setupNavigation();

  const products = await getProductsByCategory("mens-shoes");

  renderHomeView(products);
}

function setupNavigation() {
  const homeBtn = document.querySelector("[data-route='home']");
  const menBtn = document.querySelector("[data-route='men']");
  const womenBtn = document.querySelector("[data-route='women']");

  if (homeBtn) {
    homeBtn.addEventListener("click", async () => {
      const products = await getProductsByCategory("mens-shoes");
      renderHomeView(products);
    });
  }

  if (menBtn) {
    menBtn.addEventListener("click", async () => {
      const data = await getAllMenProducts();
      renderMenView(data);
    });
  }

  if (womenBtn) {
    womenBtn.addEventListener("click", async () => {
      const data = await getAllWomenProducts();
      renderWomenView(data);
    });
  }
}


init();