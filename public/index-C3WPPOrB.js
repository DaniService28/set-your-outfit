(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://dummyjson.com/products`;async function t(t){try{return(await(await fetch(`${e}/category/${t}`)).json()).products}catch(e){return console.error(`Error fetching category:`,e),[]}}async function n(t){try{return await(await fetch(`${e}/${t}`)).json()}catch(e){return console.error(`Error fetching product:`,e),null}}var r=[`mens-shirts`,`mens-shoes`,`mens-watches`,`sunglasses`,`sports-accessories`,`fragrances`,`mobile-accessories`,`kitchen-accessories`,`vehicle`,`motorcycle`,`smartphones`,`laptops`,`tablets`,`furniture`,`home-decoration`];async function i(){let e=[];for(let n of r){let r=await t(n);e.push({category:n,products:r})}return e}var a=[`womens-bags`,`womens-dresses`,`womens-jewellery`,`womens-shoes`,`womens-watches`,`tops`,`sunglasses`,`fragrances`,`sports-accessories`,`mobile-accessories`,`kitchen-accessories`,`beauty`,`skin-care`,`vehicle`,`motorcycle`,`furniture`,`home-decoration`];async function o(){let e=[];for(let n of a){let r=await t(n);e.push({category:n,products:r})}return e}function s(){return JSON.parse(localStorage.getItem(`cart`))||[]}function c(e){localStorage.setItem(`cart`,JSON.stringify(e))}function l(e){let t=s();t.push(e),c(t),d()}function u(e){c(s().filter(t=>t.id!==Number(e))),d()}function d(){let e=document.getElementById(`cart-count`);e.textContent=s().length}function f(e){let t=document.getElementById(`toast`);t.textContent=e,t.classList.add(`show`),setTimeout(()=>{t.classList.remove(`show`)},2e3)}async function p(){if(m(),d(),location.pathname===`/men`){x(await i());return}if(location.pathname===`/women`){S(await o());return}if(location.pathname===`/cart`){T(s());return}b(await t(`mens-shoes`))}function m(){let e=document.querySelector(`[data-route='home']`),n=document.querySelector(`[data-route='men']`),r=document.querySelector(`[data-route='women']`);e&&e.addEventListener(`click`,async()=>{b(await t(`mens-shoes`)),history.pushState({},``,`/home`)}),n&&n.addEventListener(`click`,async()=>{x(await i()),history.pushState({},``,`/men`)}),r&&r.addEventListener(`click`,async()=>{S(await o()),history.pushState({},``,`/women`)})}document.getElementById(`cart-btn`).addEventListener(`click`,()=>{T(s()),history.pushState({},``,`/cart`)});function h(){document.getElementById(`checkout-modal`).classList.remove(`hidden`),document.body.style.overflow=`hidden`,_()}function g(){document.getElementById(`checkout-modal`).classList.add(`hidden`),document.body.style.overflow=``}function _(){let e=document.getElementById(`checkout-form`);e.reset();let t=document.getElementById(`checkout-close`);t.onclick=()=>{g()},e.onsubmit=e=>{e.preventDefault();let t={name:document.getElementById(`name`).value,address:document.getElementById(`address`).value,phone:document.getElementById(`phone`).value,email:document.getElementById(`email`).value,notes:document.getElementById(`notes`).value,cart:s()};console.log(`Order submitted:`,t),f(`Order placed successfully ✔️`),localStorage.setItem(`cart`,JSON.stringify([])),d(),g(),T([])}}p();function v(){let e=document.getElementById(`main`);e.innerHTML=``}function y(e){return`
    <div class="product-card" data-id="${e.id}">
      <img src="${e.thumbnail}" alt="${e.title}">
      <h3>${e.title}</h3>
      <p>$${e.price}</p>
    </div>
  `}async function b(e){v();let t=document.getElementById(`main`);t.innerHTML+=`
    <section class="hero" style="background-image: url('./src/assets/home-hero.jpg');">
      <h1>Find Your Style</h1>
    </section>
  `,t.innerHTML+=`
    <h2>Shop by Category</h2>
    <div class="category-grid">
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
  `,t.innerHTML+=`<h2>Popular Picks</h2>`;let n=document.createElement(`div`);n.classList.add(`home-product-grid`),e.forEach(e=>{n.innerHTML+=y(e)}),t.appendChild(n),document.querySelectorAll(`.category-card`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.route;t===`men`?x(await getAllMenProducts()):t===`women`?S(await getAllWomenProducts()):t===`shoes`?b(await getProductsByCategory(`mens-shoes`)):t===`accessories`&&b(await getProductsByCategory(`mens-watches`))})}),n.querySelectorAll(`.product-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id;w(t)})})}function x(e){v();let t=document.getElementById(`main`);t.innerHTML+=`<h1 class="page-title">Men's Collection</h1>`,e.forEach(e=>{let n=document.createElement(`div`);n.classList.add(`category-section`),n.innerHTML+=`
      <h2 class="category-title">${C(e.category)}</h2>
    `;let r=document.createElement(`div`);r.classList.add(`product-grid`),e.products.forEach(e=>{r.innerHTML+=y(e)}),r.querySelectorAll(`.product-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id;w(t)})}),n.appendChild(r),t.appendChild(n)})}function S(e){v();let t=document.getElementById(`main`);t.innerHTML+=`<h1 class="page-title">Women's Collection</h1>`,e.forEach(e=>{let n=document.createElement(`div`);n.classList.add(`category-section`),n.innerHTML+=`
      <h2 class="category-title">${C(e.category)}</h2>
    `;let r=document.createElement(`div`);r.classList.add(`product-grid`),e.products.forEach(e=>{r.innerHTML+=y(e)}),r.querySelectorAll(`.product-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id;w(t)})}),n.appendChild(r),t.appendChild(n)})}function C(e){return e.replace(/-/g,` `).replace(/\b\w/g,e=>e.toUpperCase())}async function w(e){let t=document.getElementById(`product-modal`),r=await n(e);t.innerHTML=`
    <div class="modal-content">
      <button id="close-product-modal">X</button>

      <img src="${r.thumbnail}" alt="${r.title}" style="width:100%; border-radius:10px;">

      <h2>${r.title}</h2>
      <p><strong>Price:</strong> $${r.price}</p>
      <p><strong>Rating:</strong> ⭐ ${r.rating}</p>
      <p>${r.description}</p>

      <button id="add-to-cart-btn">Add to Cart</button>
    </div>
  `,t.classList.remove(`hidden`),document.body.style.overflow=`hidden`,document.getElementById(`close-product-modal`).addEventListener(`click`,()=>{t.classList.add(`hidden`),document.body.style.overflow=``}),document.getElementById(`add-to-cart-btn`).addEventListener(`click`,()=>{l(r),f(`Added to cart ✔️`)})}function T(e){v();let t=document.getElementById(`main`);if(t.innerHTML=`
    <h1>Your Cart</h1>
    <button id="checkout-btn" class="checkout-btn">Proceed to Checkout</button>
  `,document.getElementById(`checkout-btn`).addEventListener(`click`,()=>{h(),_()}),e.length===0){t.innerHTML+=`<p>Your cart is empty.</p>`;return}let n=document.createElement(`div`);n.classList.add(`cart-list`),e.forEach(e=>{let t=document.createElement(`div`);t.classList.add(`cart-item`),t.innerHTML=`
      <img src="${e.thumbnail}" alt="${e.title}">
      <div class="cart-info">
        <h3>${e.title}</h3>
        <p>$${e.price}</p>
      </div>
      <button class="remove-btn" data-id="${e.id}">🗑️</button>
    `;let r=t.querySelector(`.remove-btn`);r.addEventListener(`click`,()=>{let e=r.dataset.id;u(e),t.remove(),s().length===0&&T(s())}),n.appendChild(t)}),t.appendChild(n)}