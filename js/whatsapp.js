// js/whatsapp.js

function renderWhatsAppFab() {
  const fab = document.createElement('a');
  
  // Use a placeholder number and prefilled support message[cite: 4]
  const message = encodeURIComponent("Hi Noor Spices, I need some help with the store.");
  fab.href = `https://wa.me/923000000000?text=${message}`;
  fab.target = "_blank";
  
  // Fixed bottom-right styling, safe from mobile bottom edges[cite: 4, 11]
  fab.className = "fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-2xl hover:bg-green-600 transition-colors z-40 flex items-center justify-center hover:scale-110 duration-200";
  
  fab.innerHTML = `
    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.441-1.273.6-1.446c.153-.166.331-.208.441-.208.11 0 .222 0 .314.005.112.006.261-.042.408.304.148.347.502 1.229.546 1.317.043.087.072.188.016.304-.055.116-.083.188-.166.289l-.265.266c-.083.088-.172.187-.075.355.097.167.432.713.926 1.157.639.574 1.173.754 1.339.84.166.087.262.073.36-.039.097-.113.418-.485.531-.652.112-.167.225-.139.375-.083.151.058.95.451 1.112.531.161.08.269.119.309.186.039.066.039.387-.105.792z"/>
    </svg>
  `;
  
  document.body.appendChild(fab);
}

document.addEventListener('DOMContentLoaded', renderWhatsAppFab);