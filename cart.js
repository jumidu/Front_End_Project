// cart.js - Logika koszyka
const CART_KEY = 'musicStoreCart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

// --- DANE ---
const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const getCartTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

function addToCartGlobal(id, name, price, image) {
    cart.push({ id, name, price: parseFloat(price), image });
    saveCart();
    updateCartIcon();
    alert(`✅ Dodano: ${name}`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartIcon();
    renderCartItems();
}

// --- UI MODAL ---
function updateCartIcon() {
    const btn = document.querySelector('.btn-icon-cart') || document.querySelector('.nav-buttons .btn-icon');
    if (btn) btn.innerHTML = `🛒 Koszyk (${cart.length})`;
}

function openCartModal() {
    renderCartItems();
    document.getElementById('cartModal')?.classList.add('show');
}

function closeCartModal() {
    document.getElementById('cartModal')?.classList.remove('show');
}

// GŁÓWNY WIDOK KOSZYKA
function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const buttons = document.querySelector('#cartModal .modal-buttons');
    const summary = document.querySelector('.cart-summary');
    
    if (!container) return;
    if (summary) summary.style.display = 'flex'; // Pokaż pasek sumy

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Koszyk jest pusty</p>';
        return;
    }

    container.innerHTML = cart.map((item, i) => `
        <div class="simple-cart-item">
            <img src="${item.image}" alt="">
            <div class="item-details">
                <h4>${item.name}</h4>
                <span>${item.price} zł</span>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${i})">Usuń</button>
        </div>
    `).join('');

    document.getElementById('cartTotalDisplay').innerText = `${getCartTotal()} zł`;

    buttons.innerHTML = `
        <button class="btn-modal btn-buy" onclick="checkout()">✅ Przejdź do kasy</button>
        <button class="btn-modal btn-close" onclick="closeCartModal()">Zamknij</button>
    `;
}

// WIDOK KASY (FORMULARZ)
function checkout() {
    const container = document.getElementById('cartItemsContainer');
    const buttons = document.querySelector('#cartModal .modal-buttons');
    const summary = document.querySelector('.cart-summary');

    if (summary) summary.style.display = 'none'; // Ukrywamy pasek, bo suma będzie w formularzu

    container.innerHTML = `
        <div class="checkout-wrapper">
            <div class="checkout-header">
                <h3>Podsumowanie zamówienia: <strong>${getCartTotal()} zł</strong></h3>
            </div>
            
            <form id="orderForm" class="simple-form">
                <input type="text" id="orderName" placeholder="Imię i nazwisko *" required>
                <input type="email" id="orderEmail" placeholder="Adres e-mail *" required>
                <input type="text" id="orderAddress" placeholder="Ulica i numer domu *" required>
                <div class="form-row">
                    <input type="text" id="orderPostal" placeholder="Kod *" required pattern="[0-9]{2}-[0-9]{3}">
                    <input type="text" id="orderCity" placeholder="Miasto *" required>
                </div>
                
                <div class="payment-section">
                    <h4>Metoda płatności:</h4>
                    <label><input type="radio" name="payment" value="blik" checked> BLIK</label>
                    <label><input type="radio" name="payment" value="card"> Karta</label>
                    <label><input type="radio" name="payment" value="transfer"> Przelew</label>
                </div>
            </form>
        </div>
    `;

    buttons.innerHTML = `
        <button class="btn-modal btn-buy" onclick="confirmOrder()">Potwierdzam zakup</button>
        <button class="btn-modal btn-close" onclick="renderCartItems()">Wróć do koszyka</button>
    `;
}

function confirmOrder() {
    const form = document.getElementById('orderForm');
    if (!form.checkValidity()) return form.reportValidity();
    
    alert(`Dziękujemy za zamówienie na kwotę ${getCartTotal()} zł!`);
    cart = [];
    saveCart();
    updateCartIcon();
    closeCartModal();
}

document.addEventListener('DOMContentLoaded', updateCartIcon);