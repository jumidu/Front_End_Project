function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);

    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = isDark ? '☀️' : '🌙';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isDark = localStorage.getItem('darkMode') === 'true';

    if (isDark) {
        document.body.classList.add('dark-mode');
    }

    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = isDark ? '☀️' : '🌙';
    }
});
