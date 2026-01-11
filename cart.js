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
            btn.onclick = openCartModal; // Podpinamy otwieranie koszyka
        }
    });
}

// Wyświetlanie produktów w modalu koszyka
function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const totalElement = document.getElementById('cartTotalDisplay');
    
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px; color:#888;">Twój koszyk jest pusty.</p>';
        totalElement.innerText = '0 zł';
        return;
    }

    cart.forEach((item, index) => {
        // Sprawdzenie czy obrazek to URL czy Emoji
        let imgHtml = '';
        if(item.image.includes('/') || item.image.includes('http')) {
             imgHtml = `<img src="${item.image}" class="cart-item-img">`;
        } else {
             imgHtml = `<div class="cart-item-emoji">${item.image}</div>`;
        }

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-left">
                ${imgHtml}
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price} zł</p>
                </div>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${index})">Usuń</button>
        `;
        container.appendChild(div);
    });

    totalElement.innerText = getCartTotal() + ' zł';
}

// Obsługa modala koszyka
function openCartModal() {
    renderCartItems();
    document.getElementById('cartModal').classList.add('show');
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('show');
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