// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  applyDocumentLanguage();
  renderApp();
  handleRouting();
  initAnimations();
});

function initAnimations() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
}

function renderApp() {
  renderTopUtilityBar();
  renderHeader();
  renderFooter();
}

function renderTopUtilityBar() {
  const container = document.getElementById('top-utility-bar');
  container.innerHTML = `
    <div class="bg-neutral-900 text-neutral-50 text-[10px] md:text-xs py-2 px-6 flex justify-center items-center z-50 relative tracking-[0.2em] uppercase font-medium">
      Free Delivery in Karachi on orders above PKR 2000
    </div>
  `;
}

function renderHeader() {
  const container = document.getElementById('main-header');
  const isUrdu = appState.language === 'URDU';
  const labels = {
    home: isUrdu ? 'ہوم' : 'Home',
    shop: isUrdu ? 'تمام پراڈکٹس' : 'Shop All',
    categories: isUrdu ? 'اقسام' : 'Categories',
    searchPlaceholder: isUrdu ? 'تلاش کریں...' : 'Search...'
  };

  const categoriesList = ['Spices', 'Dates', 'Dry Fruits', 'Chocolates', 'Cheese', 'Sharbats'];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative bg-white">
      
      <!-- Mobile Toggle & Logo -->
      <div class="flex items-center gap-4">
        <button id="mobile-menu-toggle" class="lg:hidden p-1 text-neutral-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <a href="#home" class="flex-shrink-0 cursor-pointer">
          <img src="Noor Logo.png" onerror="this.src='Noor Logo.jpg'" alt="Noor Store Logo" class="h-10 md:h-16 w-auto object-contain">
        </a>
      </div>

      <!-- Elegant Desktop Navigation with Dropdown -->
      <nav class="hidden lg:flex gap-10 text-sm font-bold tracking-wide text-neutral-900 items-center h-full">
        <a href="#home" class="nav-link hover:text-neutral-600 transition-colors">${labels.home}</a>
        <a href="#shop" class="nav-link hover:text-neutral-600 transition-colors">${labels.shop}</a>
        
        <!-- Dropdown Container -->
        <div class="relative group h-full flex items-center py-4 cursor-pointer">
          <span class="nav-link hover:text-neutral-600 transition-colors">${labels.categories}</span>
          <div class="absolute top-full left-0 mt-0 w-56 bg-white border border-neutral-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-2 rounded-b-md">
            ${categoriesList.map(cat => `
              <a href="#category/${encodeURIComponent(cat)}" class="px-5 py-3 hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 text-sm font-medium border-b border-neutral-50 last:border-0 transition-colors">
                ${cat}
              </a>
            `).join('')}
          </div>
        </div>
      </nav>

      <!-- Search, Cart, & Language Switcher -->
      <div class="flex items-center gap-4">
        <div class="hidden md:block relative w-48 lg:w-64">
          <input 
            type="text" 
            id="search-input"
            placeholder="${labels.searchPlaceholder}" 
            value="${appState.search.query}"
            autocomplete="off"
            class="w-full ${isUrdu ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 bg-neutral-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all border border-neutral-200"
          />
          <svg class="w-4 h-4 text-neutral-400 absolute top-2.5 ${isUrdu ? 'right-3' : 'left-3'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        <button id="cart-button" class="relative p-2 text-neutral-900 hover:opacity-70 transition-opacity">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          <span class="${appState.cart.itemCount > 0 ? 'flex' : 'hidden'} absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full items-center justify-center shadow-md">
            ${appState.cart.itemCount}
          </span>
        </button>

        <div class="hidden sm:flex items-center gap-2 border-l border-neutral-300 pl-4 ml-2 text-xs font-bold uppercase tracking-wider">
          <button id="btn-lang-en" class="hover:text-neutral-900 transition-colors ${!isUrdu ? 'text-neutral-900' : 'text-neutral-400'}">EN</button>
          <span class="text-neutral-300">|</span>
          <button id="btn-lang-ur" class="font-urdu hover:text-neutral-900 transition-colors ${isUrdu ? 'text-neutral-900' : 'text-neutral-400'}">اردو</button>
        </div>
      </div>
    </div>
  `;

  // Bulletproof Event Listeners for Search & Cart
  setTimeout(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        appState.search.query = e.target.value;
        if (typeof executeSearch === 'function') executeSearch(e.target.value);
      });
    }

    const cartBtn = document.getElementById('cart-button');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        if (typeof openMiniCart === 'function') openMiniCart();
      });
    }

    document.getElementById('btn-lang-en').addEventListener('click', () => setLanguage('EN'));
    document.getElementById('btn-lang-ur').addEventListener('click', () => setLanguage('URDU'));
    
    bindMobileMenu();
  }, 0);
}

function renderFooter() {
  const footer = document.getElementById('main-footer');
  // Matching the exact layout and color scheme of the reference image
  footer.innerHTML = `
    <div class="bg-white text-neutral-800 pt-16 pb-8 border-t border-neutral-200 mt-20">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <!-- Column 1: Brand & Locations -->
        <div class="flex flex-col gap-6">
          <img src="Noor Logo.png" onerror="this.src='Noor Logo.jpg'" alt="Noor Store Logo" class="h-16 w-auto object-contain self-start">
          <p class="text-sm text-neutral-600 leading-relaxed">
            Find a location nearest you to reduce shipping costs and make shopping easier. <strong>Show on google maps.</strong>
          </p>
          <div class="text-sm text-neutral-600 space-y-3">
            <p><strong>Karimabad Branch:</strong> Shop # 123, Karimabad Gosht Market, Federal B Area Block 03 Gulberg Town, Karachi</p>
            <p><strong>Waterpump Branch:</strong> Plot R 436, Federal B Area Block 16 Gulberg Town, Karachi</p>
            <p>+92-300-0000000</p>
            <p>info@noorstore.pk</p>
          </div>
          <div class="flex gap-3 mt-2">
            <!-- Social Icons Placeholders -->
            <div class="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 cursor-pointer">f</div>
            <div class="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 cursor-pointer">in</div>
            <div class="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 cursor-pointer">ig</div>
          </div>
        </div>

        <!-- Column 2: Contact Us -->
        <div>
          <h4 class="text-lg font-bold mb-6 text-neutral-900">Contact us</h4>
          <ul class="space-y-3 text-neutral-600 text-sm">
            <li><a href="#" class="hover:text-black">Search Products</a></li>
            <li><a href="#" class="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-black">Return Policy</a></li>
            <li><a href="#" class="hover:text-black">Shipping Policy</a></li>
            <li><a href="#" class="hover:text-black">Terms of Service</a></li>
            <li><a href="#" class="hover:text-black">FAQ</a></li>
            <li><a href="#" class="hover:text-black">Contact us</a></li>
          </ul>
        </div>

        <!-- Column 3: Terms of Service -->
        <div>
          <h4 class="text-lg font-bold mb-6 text-neutral-900">Terms of Service</h4>
          <ul class="space-y-3 text-neutral-600 text-sm">
            <li><a href="#" class="hover:text-black">Search Products</a></li>
            <li><a href="#" class="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-black">Return Policy</a></li>
            <li><a href="#" class="hover:text-black">Shipping Policy</a></li>
            <li><a href="#" class="hover:text-black">Terms of Service</a></li>
            <li><a href="#" class="hover:text-black">FAQ</a></li>
            <li><a href="#" class="hover:text-black">Contact us</a></li>
          </ul>
        </div>

        <!-- Column 4: Newsletter -->
        <div>
          <h4 class="text-lg font-bold mb-6 text-neutral-900">Sign Up to Newsletter</h4>
          <p class="text-sm text-neutral-600 mb-4">Sign up and get your first purchase with free shipping. Updates information on Sales and Offers.</p>
          <div class="flex flex-col xl:flex-row gap-2 mb-4">
            <input type="email" placeholder="Enter your email..." class="flex-1 px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-900 text-sm">
            <button class="bg-neutral-900 text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-neutral-800 transition-colors whitespace-nowrap">Sign Up</button>
          </div>
          <p class="text-xs text-neutral-500">***By entering the e-mail you accept the Terms and Conditions and the <strong>Privacy Policy.</strong></p>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="max-w-7xl mx-auto px-6 border-t border-neutral-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-neutral-600 text-sm">
          &copy; 2026 Noor Store. All rights reserved. <span class="font-bold text-neutral-900">| Site By The Brand Joints</span>
        </div>
        <div class="flex items-center gap-4">
           <!-- Placeholder for payment badges mirroring your reference image -->
           <span class="text-xs font-bold text-neutral-400">PAYMENT METHODS AVALIABLE</span>
        </div>
      </div>
    </div>
  `;
}

function bindMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('close-mobile-menu');
  const overlay = document.getElementById('mobile-menu');
  const panel = document.getElementById('mobile-menu-panel');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() { overlay.classList.remove('hidden'); setTimeout(() => panel.classList.remove('-translate-x-full'), 10); }
  function closeMenu() { panel.classList.add('-translate-x-full'); setTimeout(() => overlay.classList.add('hidden'), 300); }

  if(toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}

function handleRouting() {
  if(window.heroSliderInterval) clearInterval(window.heroSliderInterval);
  window.scrollTo(0, 0);
  
  const hash = window.location.hash;
  const dropdown = document.getElementById('search-dropdown');
  if(dropdown) dropdown.style.display = 'none';

  if (!hash || hash === '#' || hash === '#home') {
    if(typeof renderHome === 'function') renderHome();
  } else if (hash.startsWith('#product/')) {
    const productId = hash.split('/')[1];
    if(typeof renderPDP === 'function') renderPDP(productId);
  } else if (hash.startsWith('#category/')) {
    const categoryName = decodeURIComponent(hash.split('/')[1]);
    if(typeof renderCategoryPage === 'function') renderCategoryPage(categoryName);
  } else if (hash === '#checkout') {
    if(typeof renderCheckout === 'function') renderCheckout();
  } else if (hash.startsWith('#checkout/success/')) {
    const orderNumber = hash.split('/').pop();
    if(typeof renderSuccess === 'function') renderSuccess(orderNumber);
  } else {
    document.getElementById('app-content').innerHTML = `<div class="p-12 text-center text-2xl font-bold">Page not found</div>`;
  }
}

window.addEventListener('hashchange', handleRouting);