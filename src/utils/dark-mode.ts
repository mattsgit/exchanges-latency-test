import { createSignal, createEffect } from 'solid-js';

// Create global dark mode signal
const [isDarkMode, setIsDarkMode] = createSignal(false);

// Initialize dark mode on load
const initializeDarkMode = () => {
  const stored = localStorage.getItem('darkMode');
  if (stored) {
    setIsDarkMode(stored === 'true');
  } else {
    // Check system preference
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
};

// Update localStorage and document class when dark mode changes
createEffect(() => {
  localStorage.setItem('darkMode', isDarkMode().toString());
  if (isDarkMode()) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// Toggle function
export const toggleDarkMode = () => setIsDarkMode(!isDarkMode());

// Getter function
export const getDarkMode = () => isDarkMode();

// Initialize on module load
if (typeof window !== 'undefined') {
  initializeDarkMode();
} 