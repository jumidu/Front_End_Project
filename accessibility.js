// accessibility.js

// --- USTAWIENIA DOMYŚLNE ---
const THEME_KEY = 'musicStoreTheme';
const FONT_KEY = 'musicStoreFontSize';

// Pobierz zapisane ustawienia
let currentTheme = localStorage.getItem(THEME_KEY) || 'light';
let currentFontSize = localStorage.getItem(FONT_KEY) || 'normal';

// --- FUNKCJE LOGIKI ---

// Zastosuj ustawienia przy starcie
function applySettings() {
    // Motyw
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Czcionka
    document.body.classList.remove('fs-large', 'fs-extra');
    if (currentFontSize === 'large') {
        document.body.classList.add('fs-large');
    } else if (currentFontSize === 'extra') {
        document.body.classList.add('fs-extra');
    }

    updateIcons();
}

// Przełącz tryb Ciemny/Jasny
function toggleTheme() {
    if (currentTheme === 'light') {
        currentTheme = 'dark';
    } else {
        currentTheme = 'light';
    }
    
    localStorage.setItem(THEME_KEY, currentTheme);
    applySettings();
}

// Zmień rozmiar czcionki (cyklicznie: Normal -> Large -> Extra -> Normal)
function cycleFontSize() {
    if (currentFontSize === 'normal') {
        currentFontSize = 'large';
        alert('🔍 Powiększenie tekstu: Duży');
    } else if (currentFontSize === 'large') {
        currentFontSize = 'extra';
        alert('🔍 Powiększenie tekstu: Bardzo duży');
    } else {
        currentFontSize = 'normal';
        alert('🔍 Powiększenie tekstu: Normalny');
    }

    localStorage.setItem(FONT_KEY, currentFontSize);
    applySettings();
}

// Aktualizacja ikon w przyciskach (opcjonalne, dla estetyki)
function updateIcons() {
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
        themeBtn.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
        themeBtn.title = currentTheme === 'dark' ? 'Włącz tryb jasny' : 'Włącz tryb ciemny';
    }
}

// Inicjalizacja po załadowaniu
document.addEventListener('DOMContentLoaded', () => {
    applySettings();
});