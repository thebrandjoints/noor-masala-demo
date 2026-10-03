// js/pdp.js

let currentSelectedVariant = null;

function renderPDP(productId) {
  const container = document.getElementById('app-content');
  const product = mockData.products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = `<div class="p-12 text-center text-2xl font-bold">Product not found.</div>`;
    return;
  }

  currentSelectedVariant = product.variants[0];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Gallery[cite: 5] -->
      <div class="bg-neutral-100 aspect-square flex items-center justify-center text-neutral-400 text-2xl font-bold">
        ${product.roman_urdu_name} Image
      </div>

      <!-- Product Meta & Variant Engine[cite: 5] -->
      <div>
        <h1 class="text-4xl font-black uppercase mb-2">${product.roman_urdu_name}</h1>
        <h2 class="text-lg text-neutral-500 mb-6">${product.english_subtitle}</h2>
        
        <div class="text-3xl font-bold mb-2" id="pdp-price">PKR ${currentSelectedVariant.price}</div>
        <div class="text-sm text-neutral-500 mb-8 uppercase tracking-widest">
          SKU: <span id="pdp-sku">${currentSelectedVariant.sku}</span> | 
          <span id="pdp-stock" class="${currentSelectedVariant.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}">
            ${currentSelectedVariant.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <!-- Spice Profile[cite: 5] -->
        <div class="bg-neutral-50 p-4 mb-8 flex gap-6 text-sm">
          <div><span class="font-bold">Heat:</span> ${product.spice_profile.heat}/5</div>
          <div><span class="font-bold">Aroma:</span> ${product.spice_profile.aroma}/5</div>
          <div><span class="font-bold">Color:</span> ${product.spice_profile.color}/5</div>
        </div>

        <!-- Variant Selection[cite: 5] -->
        <div class="mb-8">
          <h3 class="font-bold uppercase mb-3">Select Size / Form</h3>
          <div class="flex gap-3 flex-wrap">
            ${product.variants.map(v => `
              <button 
                onclick="selectVariant('${v.id}')"
                class="variant-btn px-4 py-2 border ${v.id === currentSelectedVariant.id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-900'} transition-colors">
                ${v.form} -${v.weight_grams}g
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Add to Cart[cite: 11] -->
        <button id="pdp-add-btn" onclick="addToCart()" class="w-full bg-neutral-900 text-white py-4 font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mb-4">
          Add to Cart
        </button>
      </div>
    </div>
  `;
  
  // Run this once on load to ensure the button starts in the correct state
  selectVariant(currentSelectedVariant.id);
}

// Variant Engine Logic: Updates UI instantly[cite: 5, 10]
function selectVariant(variantId) {
  const productId = window.location.hash.split('/')[1];
  const product = mockData.products.find(p => p.id === productId);
  currentSelectedVariant = product.variants.find(v => v.id === variantId);

  // Update text values
  document.getElementById('pdp-price').innerText = `PKR ${currentSelectedVariant.price}`;
  document.getElementById('pdp-sku').innerText = currentSelectedVariant.sku;
  
  const stockEl = document.getElementById('pdp-stock');
  if (currentSelectedVariant.stock_quantity > 0) {
    stockEl.innerText = 'In Stock';
    stockEl.className = 'text-green-600';
  } else {
    stockEl.innerText = 'Out of Stock';
    stockEl.className = 'text-red-600';
  }

  // Update button active styles
  document.querySelectorAll('.variant-btn').forEach(btn => {
    btn.classList.remove('border-neutral-900', 'bg-neutral-900', 'text-white');
    btn.classList.add('border-neutral-300');
  });
  if(event) {
    event.currentTarget.classList.remove('border-neutral-300');
    event.currentTarget.classList.add('border-neutral-900', 'bg-neutral-900', 'text-white');
  }

  // Phase 5 Logic: Disable Add to Cart if Out of Stock[cite: 11]
  const addBtn = document.getElementById('pdp-add-btn');
  if (currentSelectedVariant.stock_quantity <= 0) {
    addBtn.disabled = true;
    addBtn.innerText = 'Out of Stock';
    addBtn.className = 'w-full bg-neutral-300 text-neutral-500 py-4 font-bold uppercase tracking-wider mb-4 cursor-not-allowed';
  } else {
    addBtn.disabled = false;
    addBtn.innerText = 'Add to Cart';
    addBtn.className = 'w-full bg-neutral-900 text-white py-4 font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mb-4';
  }
}

function addToCart() {
  const productId = window.location.hash.split('/')[1];
  const product = mockData.products.find(p => p.id === productId);
  window.addToCart(currentSelectedVariant, product); 
}