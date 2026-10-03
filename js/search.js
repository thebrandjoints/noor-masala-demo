// js/search.js

function normalizeString(str) {
  // Normalize case, spacing, and strip special characters for fuzzy matching[cite: 3]
  return str.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
}

function executeSearch(query) {
  if (!query) {
    appState.search.results = [];
    renderSearchDropdown();
    return;
  }

  const normalizedQuery = normalizeString(query);
  
  // Intercept the query against our alias map[cite: 3, 4]
  const mappedQuery = mockData.searchAliases[normalizedQuery] || normalizedQuery;

  // Filter products using the normalized query/alias
  const results = mockData.products.filter(product => {
    const searchableText = normalizeString(
      `${product.roman_urdu_name} ${product.english_name} ${product.english_subtitle}`
    );
    return searchableText.includes(mappedQuery);
  });

  appState.search.results = results;
  renderSearchDropdown();
}

function renderSearchDropdown() {
  const searchInput = document.getElementById('search-input');
  let dropdown = document.getElementById('search-dropdown');

  // Create the instant quick-results dropdown if it doesn't exist[cite: 3]
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'search-dropdown';
    dropdown.className = 'absolute top-full left-0 w-full mt-1 bg-white border border-neutral-200 shadow-xl max-h-80 overflow-y-auto z-50';
    searchInput.parentNode.appendChild(dropdown);
  }

  if (appState.search.results.length === 0) {
    dropdown.innerHTML = appState.search.query 
      ? `<div class="p-4 text-sm text-neutral-500">No results found for "${appState.search.query}"</div>` 
      : '';
    dropdown.style.display = appState.search.query ? 'block' : 'none';
    return;
  }

  dropdown.style.display = 'block';
  dropdown.innerHTML = appState.search.results.map(product => `
    <a href="#product/${product.id}" class="flex items-center gap-4 p-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0">
      <div class="flex-grow">
        <div class="text-sm font-bold text-neutral-900">${product.roman_urdu_name}</div>
        <div class="text-xs text-neutral-500">${product.english_subtitle}</div>
      </div>
      <div class="text-sm font-semibold text-neutral-900">
        From PKR ${Math.min(...product.variants.map(v => v.price))}
      </div>
    </a>
  `).join('');
}