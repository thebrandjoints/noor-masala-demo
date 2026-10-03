// js/checkout.js

function renderCheckout() {
  const container = document.getElementById('app-content');
  
  if (appState.cart.items.length === 0) {
    container.innerHTML = `<div class="p-24 text-center text-2xl font-bold text-neutral-400">Your cart is empty. <br><a href="#shop" class="text-neutral-900 underline mt-4 inline-block text-lg">Continue Shopping</a></div>`;
    return;
  }

  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      <!-- Checkout Form -->
      <div>
        <h2 class="text-2xl font-black uppercase tracking-wider mb-8 border-b border-neutral-200 pb-4">Shipping Details</h2>
        
        <div class="space-y-5 mb-10">
          <input type="text" id="chk-name" placeholder="Full Name" class="w-full p-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors" required>
          <input type="tel" id="chk-phone" placeholder="Mobile Number (e.g. 03001234567)" class="w-full p-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors" required>
          
          <div class="grid grid-cols-2 gap-4">
            <select id="chk-province" class="w-full p-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-600 appearance-none">
              <option value="" disabled selected>Select Province</option>
              <option value="Sindh">Sindh</option>
              <option value="Punjab">Punjab</option>
              <option value="KPK">Khyber Pakhtunkhwa (KPK)</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Islamabad">Islamabad Capital</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              <option value="AJK">AJK</option>
            </select>
            <input type="text" id="chk-city" placeholder="City" class="w-full p-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors" required>
          </div>

          <textarea id="chk-address" placeholder="Complete Street Address" rows="3" class="w-full p-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors resize-none" required></textarea>
        </div>

        <h3 class="font-bold uppercase tracking-wider mb-4 border-b border-neutral-200 pb-2">Payment Method</h3>
        <div class="space-y-3 mb-10">
          <label class="block p-5 border border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer flex gap-4 items-center transition-colors">
            <input type="radio" name="payment" value="COD" checked class="w-4 h-4 text-neutral-900 focus:ring-neutral-900"> 
            <span class="font-bold">Cash on Delivery (COD)</span>
          </label>
          <label class="block p-5 border border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer flex flex-col gap-2 transition-colors">
            <div class="flex gap-4 items-center">
              <input type="radio" name="payment" value="BankTransfer" class="w-4 h-4 text-neutral-900 focus:ring-neutral-900"> 
              <span class="font-bold">Bank Transfer / Raast</span>
            </div>
            <div class="text-sm text-neutral-500 ml-8">Send screenshot via WhatsApp after order placement.</div>
          </label>
        </div>

        <button onclick="placeOrder()" class="w-full bg-neutral-900 text-white py-5 font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-lg">
          Place Secure Order
        </button>
      </div>

      <!-- Order Summary -->
      <div class="bg-neutral-50 border border-neutral-100 p-8 h-fit sticky top-24">
        <h3 class="text-xl font-black uppercase tracking-wider mb-6">Order Summary</h3>
        <div class="space-y-4 mb-6">
          ${appState.cart.items.map(item => `
            <div class="flex justify-between items-center text-sm border-b border-neutral-200 pb-4">
              <div class="flex flex-col">
                <span class="font-bold text-neutral-900">${item.name}</span>
                <span class="text-neutral-500 text-xs">${item.form} - ${item.weight}g  x${item.quantity}</span>
              </div>
              <span class="font-bold">PKR ${item.price * item.quantity}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="flex justify-between text-neutral-500 text-sm mb-2">
          <span>Subtotal</span>
          <span>PKR ${appState.cart.subtotal}</span>
        </div>
        <div class="flex justify-between text-neutral-500 text-sm mb-6">
          <span>Standard Delivery</span>
          <span class="text-green-600 font-bold">${appState.cart.subtotal > 2000 ? 'FREE' : 'Calculated next step'}</span>
        </div>

        <div class="border-t border-neutral-300 pt-6 flex justify-between font-black text-2xl">
          <span>Total</span>
          <span>PKR ${appState.cart.subtotal}</span>
        </div>
      </div>

    </div>
  `;
}

function placeOrder() {
  const name = document.getElementById('chk-name').value;
  const prov = document.getElementById('chk-province').value;
  const city = document.getElementById('chk-city').value;
  
  if (!name || !prov || !city) { 
    alert("Please fill in your name, province, and city."); 
    return; 
  }
  
  const orderNumber = `NS-${Math.floor(100000 + Math.random() * 900000)}`;
  appState.cart.items = []; 
  updateCartState();
  window.location.hash = `#checkout/success/${orderNumber}`;
}

function renderSuccess(orderNumber) {
  const container = document.getElementById('app-content');
  const waMessage = encodeURIComponent(`Hi Noor Store, I have placed order ${orderNumber}. Please confirm my delivery details.`);
  const waLink = `https://wa.me/923000000000?text=${waMessage}`;

  container.innerHTML = `
    <div class="max-w-2xl mx-auto px-6 py-24 text-center">
      <div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h1 class="text-4xl font-black uppercase tracking-tight mb-4">Order Confirmed</h1>
      <p class="text-neutral-500 text-lg mb-8">Thank you for shopping with Noor Store. Your premium items are being prepped.</p>
      
      <div class="text-2xl font-bold bg-neutral-50 border border-neutral-200 py-6 px-12 mb-10 inline-block shadow-sm">
        <span class="text-neutral-400 text-sm block mb-1 uppercase tracking-widest">Order Number</span>
        ${orderNumber}
      </div>
      
      <br>
      <a href="${waLink}" target="_blank" class="inline-block bg-green-500 text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-green-600 transition-colors shadow-lg hover:scale-105 duration-200">
        Send Details via WhatsApp
      </a>
    </div>
  `;
}