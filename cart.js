// cart.js - Logika koszyka zgodna z Concept Art
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
    // Jeśli koszyk jest otwarty, odśwież widok (np. w trybie checkout)
    if (document.getElementById('cartModal')?.classList.contains('show')) {
        checkout(); // Odświeża cały widok checkoutu
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartIcon();
    checkout(); // Odświeżamy widok checkoutu po usunięciu
}

// --- UI MODAL ---
function updateCartIcon() {
    const btns = document.querySelectorAll('.btn-icon-cart');
    if (btns.length === 0) return;

    btns.forEach(btn => {
        btn.innerHTML = `🛒 Koszyk (${cart.length})`;
    });
}

function openCartModal() {
    // Od razu otwieramy w trybie "Checkout" (lista + formularz), jak na concept arcie
    checkout();
    document.getElementById('cartModal')?.classList.add('show');
}

function closeCartModal() {
    document.getElementById('cartModal')?.classList.remove('show');
}

// GŁÓWNA FUNKCJA RENDERUJĄCA WIDOK "CONCEPT ART"
function checkout() {
    const modalContent = document.querySelector('#cartModal .modal-content');
    if (!modalContent) return;

    // Czyścimy standardowe przyciski modala, bo będą wewnątrz layoutu
    const standardButtons = modalContent.querySelector('.modal-buttons');
    if (standardButtons) standardButtons.style.display = 'none';
    
    // Ukrywamy standardowy nagłówek i listę, jeśli istnieją (zależnie od HTML)
    const oldTitle = modalContent.querySelector('h2.section-title');
    if (oldTitle) oldTitle.style.display = 'none';
    const oldList = document.getElementById('cartItemsContainer');
    if (oldList) oldList.style.display = 'none';
    const oldSummary = document.querySelector('.cart-summary');
    if (oldSummary) oldSummary.style.display = 'none';


    // Sprawdzamy, czy kontener layoutu już istnieje, jeśli nie - tworzymy go
    let layoutContainer = document.getElementById('conceptArtLayout');
    
    if (!layoutContainer) {
        layoutContainer = document.createElement('div');
        layoutContainer.id = 'conceptArtLayout';
        layoutContainer.className = 'cart-layout';
        modalContent.appendChild(layoutContainer);
    }

    // Generujemy listę produktów HTML
    let itemsHTML = '';
    if (cart.length === 0) {
        itemsHTML = '<p class="empty-msg">Twój koszyk jest pusty.</p>';
    } else {
        itemsHTML = cart.map((item, i) => `
            <div class="cart-item-row">
                <img src="${item.image}" alt="" class="cart-item-img" onerror="this.src='https://placehold.co/50?text=Foto'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} zł</div>
                </div>
                <button class="btn-remove-small" onclick="removeFromCart(${i})">Usuń</button>
            </div>
        `).join('');
    }

    // Wypełniamy kontener strukturą z concept artu
    layoutContainer.innerHTML = `
        <div class="cart-left-column">
            <h2 class="cart-column-title">Twój Koszyk</h2>
            <div class="cart-items-scroll">
                ${itemsHTML}
            </div>
            <div class="cart-total-section">
                Suma: <span class="total-price">${getCartTotal()} zł</span>
            </div>
        </div>

        <div class="cart-right-column">
            
            <h2 class="cart-column-title">📦 Dane do wysyłki</h2>
            <form id="orderForm" class="checkout-form">
                <div class="form-group">
                    <input type="text" id="orderName" placeholder="Imię i nazwisko *" required>
                </div>
                <div class="form-group">
                    <input type="email" id="orderEmail" placeholder="Email *" required>
                </div>
                <div class="form-group">
                    <input type="text" id="orderAddress" placeholder="Adres (ulica, nr) *" required>
                </div>
                <div class="form-row-split">
                    <input type="text" id="orderPostal" placeholder="Kod pocztowy *" required>
                    <input type="text" id="orderCity" placeholder="Miasto *" required>
                </div>

                <h2 class="cart-column-title mt-4">💳 Metoda płatności</h2>
                <div class="payment-options">
                    <label class="payment-option">
                        <input type="radio" name="payment" value="blik" checked>
                        <span>BLIK</span>
                    </label>
                    <label class="payment-option">
                        <input type="radio" name="payment" value="card">
                        <span>Karta płatnicza</span>
                    </label>
                    <label class="payment-option">
                        <input type="radio" name="payment" value="transfer">
                        <span>Przelew bankowy</span>
                    </label>
                    <label class="payment-option">
                        <input type="radio" name="payment" value="cod">
                        <span>Przy odbiorze</span>
                    </label>
                </div>
            </form>

            <div class="checkout-actions">
                <button class="btn-checkout-confirm" onclick="confirmOrder()">✅ Zamawiam</button>
                <button class="btn-checkout-back" onclick="closeCartModal()">Wróć do sklepu</button>
            </div>
        </div>
    `;
}

function confirmOrder() {
    const form = document.getElementById('orderForm');
    if (cart.length === 0) {
        alert("Koszyk jest pusty!");
        return;
    }
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    alert(`Dziękujemy za zamówienie na kwotę ${getCartTotal()} zł!`);
    cart = [];
    saveCart();
    updateCartIcon();
    closeCartModal();
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', updateCartIcon);