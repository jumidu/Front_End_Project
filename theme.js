// theme.js - Wersja bez "mrugania" (No Flash)

// 1. TO URUCHAMIA SIĘ NATYCHMIAST (zanim strona się wyświetli)
(function() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        // Dodajemy klasę do znacznika <html> zamiast <body>
        // (ponieważ w <head> element <body> jeszcze nie istnieje)
        document.documentElement.classList.add('dark-mode');
    }
})();

// 2. Funkcja przełączająca (wywoływana przyciskiem)
function toggleDarkMode() {
    // Przełączamy klasę na elemencie <html>
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);

    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = isDark ? '☀️' : '🌙';
    }
}

// 3. Ustawienie ikonki po załadowaniu reszty strony
document.addEventListener('DOMContentLoaded', () => {
    // Sprawdzamy czy klasa jest na <html>
    const isDark = document.documentElement.classList.contains('dark-mode');
    
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = isDark ? '☀️' : '🌙';
    }
});