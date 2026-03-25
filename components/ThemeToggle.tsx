"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    document.documentElement.classList.toggle('dark', shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Basculer le thème"
      className="fixed bottom-5 right-5 z-[60] p-3 rounded-full border border-gray-200/70 dark:border-gray-700/70 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
