// js/home.js

function renderHome() {
  const container = document.getElementById('app-content');
  const isUrdu = appState.language === 'URDU';

  // 5 Pictures for Hero Slider
  const slides = [
    { img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070', title: 'Authentic Spices', sub: 'Freshly ground, directly from the source.' },
    { img: 'https://t4.ftcdn.net/jpg/20/82/72/89/240_F_2082728959_stn5EUZTyVh9wDY8GOSRlc07snRmqk3X.jpg', title: 'Premium Dates', sub: 'The finest Khajoors imported for your table.' },
    { img: 'https://images2.alphacoders.com/129/thumb-1920-1292932.jpg', title: 'Rich Chocolates', sub: 'Indulge in our exquisite sweet selections.' },
    { img: 'https://media.istockphoto.com/id/1218693828/photo/wooden-bowl-with-mixed-nuts-on-rustic-table-top-view-healthy-food-and-snack.jpg?s=612x612&w=0&k=20&c=89-ko7nwlcqM6HPvwaQ3tZus4apArtwHkFAB0IxPQpo=', title: 'Dry Fruits', sub: 'Healthy, crunchy, and packed with nutrition.' },
    { img: 'https://media.istockphoto.com/id/1218693828/photo/wooden-bowl-with-mixed-nuts-on-rustic-table-top-view-healthy-food-and-snack.jpg?s=612x612&w=0&k=20&c=89-ko7nwlcqM6HPvwaQ3tZus4apArtwHkFAB0IxPQpo=', title: 'Refreshing Sharbats', sub: 'Cool down with our traditional syrups.' }
  ];

  let html = `
    <!-- Hero Slider Section -->
    <div class="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-neutral-900 group">
      <div id="hero-slider-track" class="flex w-full h-full transition-transform duration-700 ease-in-out cursor-grab active:cursor-grabbing">
        ${slides.map(slide => `
          <div class="w-full h-full flex-shrink-0 relative">
            <img src="${slide.img}" class="w-full h-full object-cover opacity-70" alt="${slide.title}">
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/20">
              <h1 class="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 drop-shadow-xl">${slide.title}</h1>
              <p class="text-white text-lg md:text-2xl font-medium tracking-wide drop-shadow-md max-w-2xl">${slide.sub}</p>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Slider Arrows -->
      <button id="slider-prev" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button id="slider-next" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>

      <!-- Slider Navigation Dots -->
      <div class="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10" id="slider-dots">
        ${slides.map((_, i) => `<button class="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-colors ${i===0 ? 'bg-white' : ''}" data-idx="${i}"></button>`).join('')}
      </div>
    </div>

    <!-- Featured Products Grid -->
    <div id="shop" class="max-w-7xl mx-auto px-6 py-24 overflow-hidden">
      <div class="flex justify-between items-end mb-10 border-b border-neutral-200 pb-4">
        <h2 class="text-3xl font-black uppercase text-neutral-900">${isUrdu ? 'ہماری مصنوعات' : 'Featured Collection'}</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12" id="product-grid">
  `;

  if (typeof mockData !== 'undefined' && mockData.products) {
    mockData.products.forEach(product => {
      const defaultVariant = product.variants[0];
      html += `
        <a href="#product/${product.id}" class="product-card block group">
          <div class="bg-neutral-50 aspect-[4/5] mb-4 flex flex-col items-center justify-center text-neutral-400 group-hover:bg-neutral-100 border border-neutral-100 transition-colors duration-300 overflow-hidden relative">
            <span class="absolute top-3 left-3 bg-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm text-neutral-900">${product.category}</span>
            <span class="text-lg font-bold text-neutral-300">${product.roman_urdu_name}</span>
          </div>
          <h3 class="font-bold text-sm uppercase tracking-wide text-neutral-900 group-hover:text-neutral-500 transition-colors">${product.roman_urdu_name}</h3>
          <p class="text-xs text-neutral-500 mt-1 mb-2 line-clamp-1">${product.english_subtitle}</p>
          <div class="font-bold text-md text-neutral-900">PKR ${defaultVariant.price}</div>
        </a>
      `;
    });
  }

  html += `</div></div>`;
  container.innerHTML = html;

  initHeroSlider(slides.length);
}

function initHeroSlider(totalSlides) {
  const track = document.getElementById('hero-slider-track');
  const dots = Array.from(document.getElementById('slider-dots').children);
  let currentIdx = 0;
  
  if(window.heroSliderInterval) clearInterval(window.heroSliderInterval);

  function goToSlide(idx) {
    currentIdx = (idx + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIdx * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-white', i === currentIdx);
      dot.classList.toggle('bg-white/40', i !== currentIdx);
    });
  }

  function nextSlide() { goToSlide(currentIdx + 1); }
  function prevSlide() { goToSlide(currentIdx - 1); }

  // Auto slide
  window.heroSliderInterval = setInterval(nextSlide, 5000);

  // Manual Controls
  document.getElementById('slider-next').addEventListener('click', () => { clearInterval(window.heroSliderInterval); nextSlide(); });
  document.getElementById('slider-prev').addEventListener('click', () => { clearInterval(window.heroSliderInterval); prevSlide(); });
  
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      clearInterval(window.heroSliderInterval);
      goToSlide(parseInt(e.target.dataset.idx));
    });
  });

  // Swipe Functionality
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = true; }, {passive: true});
  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    let endX = e.changedTouches[0].clientX;
    clearInterval(window.heroSliderInterval);
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
  });
  
  // Mouse Swipe for Desktop
  track.addEventListener('mousedown', e => { startX = e.clientX; isDragging = true; });
  track.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    let endX = e.clientX;
    clearInterval(window.heroSliderInterval);
    if (startX - endX > 50) nextSlide();
    else if (endX - startX > 50) prevSlide();
  });
  track.addEventListener('mouseleave', () => { isDragging = false; });
}

// Renders the Category Page when a dropdown link is clicked
function renderCategoryPage(categoryName) {
  const container = document.getElementById('app-content');
  const filteredProducts = mockData.products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());

  let html = `
    <div class="max-w-7xl mx-auto px-6 py-20 min-h-[60vh]">
      <div class="mb-12 border-b border-neutral-200 pb-6 flex items-center justify-between">
        <h1 class="text-4xl font-black uppercase tracking-tight text-neutral-900">${categoryName}</h1>
        <a href="#shop" class="text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors">← Back to All</a>
      </div>
      
      ${filteredProducts.length === 0 ? `<p class="text-neutral-500">No products found in this category.</p>` : `
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          ${filteredProducts.map(product => `
            <a href="#product/${product.id}" class="product-card block group">
              <div class="bg-neutral-50 aspect-[4/5] mb-4 flex flex-col items-center justify-center text-neutral-400 group-hover:bg-neutral-100 border border-neutral-100 transition-colors duration-300 overflow-hidden relative">
                <span class="absolute top-3 left-3 bg-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm text-neutral-900">${product.category}</span>
                <span class="text-lg font-bold text-neutral-300">${product.roman_urdu_name}</span>
              </div>
              <h3 class="font-bold text-sm uppercase tracking-wide text-neutral-900 group-hover:text-neutral-500 transition-colors">${product.roman_urdu_name}</h3>
              <p class="text-xs text-neutral-500 mt-1 mb-2 line-clamp-1">${product.english_subtitle}</p>
              <div class="font-bold text-md text-neutral-900">PKR ${product.variants[0].price}</div>
            </a>
          `).join('')}
        </div>
      `}
    </div>
  `;
  container.innerHTML = html;
}