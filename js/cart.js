// js/cart.js

function toggleCart(show) {
  const drawer = document.getElementById('cart-drawer');
  if (show) {
    drawer.classList.remove('translate-x-full');
    renderCartContents();
  } else {
    drawer.classList.add('translate-x-full');
  }
}

// Replaces the placeholder alert in pdp.js
function addToCart() {
  if (!currentSelectedVariant) return;
  
  const existingItem = appState.cart.items.find(item => item.variant.id === currentSelectedVariant.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Find parent product name for display
    const product = mockData.products.find(p => p.variants.some(v => v.id === currentSelectedVariant.id));
    appState.cart.items.push({ 
      variant: currentSelectedVariant, 
      productName: product.roman_urdu_name,
      quantity: 1 
    });
  }
  
  updateCartTotals();
  renderHeader(); // Updates the cart badge count[cite: 10]
  toggleCart(true); // Opens automatically after Add to Cart[cite: 6]
}

function updateCartTotals() {
  appState.cart.itemCount = appState.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  appState.cart.subtotal = appState.cart.items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
  saveCartState(); // Persist to localStorage[cite: 2]
}

function renderCartDrawerSetup() {
  const container = document.getElementById('cart-drawer-container');
  container.innerHTML = `
    <div id="cart-drawer" class="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col z-50">
      <div class="p-6 border-b border-neutral-200 flex justify-between items-center">
        <h2 class="text-xl font-black uppercase">Your Cart</h2>
        <button onclick="toggleCart(false)" class="text-neutral-500 hover:text-neutral-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div id="cart-shipping-progress" class="bg-neutral-100 p-4 text-sm text-center font-medium"></div>
      <div id="cart-items" class="flex-grow overflow-y-auto p-6 space-y-6"></div>
      <div class="p-6 border-t border-neutral-200 bg-neutral-50">
        <div class="flex justify-between font-bold text-lg mb-4">
          <span>Subtotal</span>
          <span id="cart-subtotal">PKR 0</span>
        </div>
        <a href="#checkout" onclick="toggleCart(false)" class="block w-full bg-neutral-900 text-white text-center py-4 font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors">
          Checkout
        </a>
      </div>
    </div>
  `;
}

function renderCartContents() {
  const itemsContainer = document.getElementById('cart-items');
  const shippingEl = document.getElementById('cart-shipping-progress');
  
  // Shipping Progress Logic[cite: 6]
  const amountRemaining = 2000 - appState.cart.subtotal;
  if (appState.cart.subtotal === 0) {
    shippingEl.innerHTML = `Spend PKR 2000 for Free Karachi Delivery!`;
  } else if (amountRemaining > 0) {
    shippingEl.innerHTML = `You are PKR <span class="font-bold text-red-600">${amountRemaining}</span> away from Free Delivery!`;
  } else {
    shippingEl.innerHTML = `<span class="text-green-600 font-bold">You have unlocked Free Delivery in Karachi!</span>`;
  }

  document.getElementById('cart-subtotal').innerText = `PKR ${appState.cart.subtotal}`;

  if (appState.cart.items.length === 0) {
    itemsContainer.innerHTML = `<div class="text-center text-neutral-500 mt-10">Your cart is empty.</div>`;
    return;
  }

  itemsContainer.innerHTML = appState.cart.items.map((item, index) => `
    <div class="flex gap-4 border-b border-neutral-100 pb-4">
      <div class="w-16 h-16 bg-neutral-200 flex-shrink-0"></div>
      <div class="flex-grow">
        <div class="font-bold text-sm">${item.productName}</div>
        <div class="text-xs text-neutral-500 mb-2">${item.variant.form} - ${item.variant.weight_grams}g</div>
        <div class="flex justify-between items-center">
          <div class="font-semibold text-sm">PKR ${item.variant.price}</div>
          <div class="text-sm font-bold text-neutral-500">Qty: ${item.quantity}</div>
        </div>
      </div>
    </div>
  `).join('');
}