// cart.js - Logika koszyka

const CART_KEY = 'musicStoreCart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

// --- GŁÓWNE FUNKCJE ---

// Dodawanie do koszyka
function addToCartGlobal(id, name, price, image) {
    const product = {
        id: id,
        name: name,
        price: parseFloat(price),
        image: image
    };

    cart.push(product);
    saveCart();
    updateCartIcon();
    alert(`✅ Dodano do koszyka: ${name}`);
}

// Usuwanie z koszyka
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
    updateCartIcon();
}

// Zapis do localStorage
function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Pobieranie sumy
function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// --- INTERFEJS (UI) ---

// Aktualizacja licznika w nagłówku
function updateCartIcon() {
    const cartBtns = document.querySelectorAll('.nav-buttons .btn-icon');
    cartBtns.forEach(btn => {
        if (btn.innerText.includes('Koszyk')) {
            btn.innerHTML = `🛒 Koszyk (${cart.length})`;
            // Upewniamy się, że przycisk otwiera modal
            btn.onclick = openCartModal; 
        }
    });
}

// Wyświetlanie produktów w modalu koszyka
function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const totalElement = document.getElementById('cartTotalDisplay');
    
    // Zabezpieczenie: jeśli na stronie nie ma modala koszyka, przerywamy
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Twój koszyk jest pusty.</p>';
        if (totalElement) totalElement.innerText = '0 zł';
        return;
    }

    cart.forEach((item, index) => {
        // Sprawdzenie czy obrazek to URL czy Emoji (dla bezpieczeństwa)
        let imgHtml = '';
        if(item.image && (item.image.includes('/') || item.image.includes('http'))) {
             imgHtml = `<img src="${item.image}" class="cart-item-img" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">`;
        } else {
             imgHtml = `<div class="cart-item-emoji" style="font-size: 24px;">${item.image || '🎵'}</div>`;
        }

        const div = document.createElement('div');
        div.className = 'cart-item';
        // Prosty styl inline dla listy w koszyku, żeby wyglądało schludnie
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.marginBottom = '10px';
        div.style.padding = '10px';
        div.style.borderBottom = '1px solid #eee';

        div.innerHTML = `
            <div class="cart-item-left" style="display: flex; gap: 10px; align-items: center;">
                ${imgHtml}
                <div>
                    <h4 style="margin: 0; font-size: 14px;">${item.name}</h4>
                    <p style="margin: 0; color: #666; font-size: 12px;">${item.price} zł</p>
                </div>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Usuń</button>
        `;
        container.appendChild(div);
    });

    if (totalElement) totalElement.innerText = getCartTotal() + ' zł';
}

// Obsługa modala koszyka
function openCartModal() {
    renderCartItems();
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('show');
    } else {
        console.error('Nie znaleziono modala koszyka (id="cartModal") w HTML.');
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function checkout() {
    if(cart.length === 0) return alert("Koszyk jest pusty!");
    alert(`Dziękujemy za zamówienie! Do zapłaty: ${getCartTotal()} zł`);
    cart = [];
    saveCart();
    renderCartItems();
    updateCartIcon();
    closeCartModal();
}

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    
    // Zamykanie modala koszyka kliknięciem w tło
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('cartModal');
        if (e.target === modal) closeCartModal();
    });
});