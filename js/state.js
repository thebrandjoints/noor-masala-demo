// js/state.js

const STORAGE_KEYS = {
  LANG: 'noor_lang',
  CART: 'noor_cart'
};

// Default Initial State
const appState = {
  language: localStorage.getItem(STORAGE_KEYS.LANG) || 'EN',
  cart: JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || {
    items: [],
    itemCount: 0,
    subtotal: 0
  },
  search: {
    query: '',
    results: []
  },
  filters: {
    form: [],
    weight: [],
    heat: [],
    price: { min: 0, max: 10000 }
  },
  checkout: {
    customer: {},
    address: { city: 'Karachi' },
    shipping: '',
    payment: 'COD'
  }
};

// State Persistence Helpers
function saveCartState() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(appState.cart));
}

function setLanguage(lang) {
  appState.language = lang;
  localStorage.setItem(STORAGE_KEYS.LANG, lang);
  applyDocumentLanguage();
  renderApp();
}

function applyDocumentLanguage() {
  const isUrdu = appState.language === 'URDU';
  document.documentElement.dir = isUrdu ? 'rtl' : 'ltr';
  document.documentElement.lang = isUrdu ? 'ur' : 'en';
}