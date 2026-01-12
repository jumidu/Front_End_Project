// accessibility.js - Tylko obsługa czcionek (Motyw jest w theme.js)

const FONT_KEY = 'musicStoreFontSize';

// Pobierz zapisane ustawienia czcionki
let currentFontSize = localStorage.getItem(FONT_KEY) || 'normal';

// --- FUNKCJE LOGIKI ---

// Zastosuj ustawienia przy starcie
function applySettings() {
    // Czyścimy klasy czcionek
    document.body.classList.remove('fs-large', 'fs-extra');

    // Nakładamy odpowiednią klasę
    if (currentFontSize === 'large') {
        document.body.classList.add('fs-large');
    } else if (currentFontSize === 'extra') {
        document.body.classList.add('fs-extra');
    }
    
    // Usunięto: wywołanie updateIcons(), którego nie ma
}

// Zmień rozmiar czcionki (cyklicznie: Normal -> Large -> Extra -> Normal)
function cycleFontSize() {
    if (currentFontSize === 'normal') {
        currentFontSize = 'large';
    } else if (currentFontSize === 'large') {
        currentFontSize = 'extra';
    } else {
        currentFontSize = 'normal';
    }

    localStorage.setItem(FONT_KEY, currentFontSize);
    applySettings();
}

// Inicjalizacja po załadowaniu
document.addEventListener('DOMContentLoaded', () => {
    applySettings();
});