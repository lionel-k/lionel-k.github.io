// Theme toggle functionality
(function() {
  const STORAGE_KEY = 'theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  const toggleButton = document.querySelector('.theme-toggle-button');
  if (!toggleButton) return;

  // Get system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Determine current theme
  function getCurrentTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_LIGHT || stored === THEME_DARK) {
      return stored;
    }
    // Default to system preference
    return prefersDark.matches ? THEME_DARK : THEME_LIGHT;
  }

  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Toggle theme
  function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    applyTheme(next);
  }

  // Initialize theme
  applyTheme(getCurrentTheme());

  // Listen to system preference changes (optional)
  prefersDark.addEventListener('change', (e) => {
    // Only follow system if no explicit user preference
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
    }
  });

  // Attach click event
  toggleButton.addEventListener('click', toggleTheme);
})();