"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ThemeMode = 'light' | 'dark';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const applyTheme = (theme: ThemeMode) => {
    const root = document.documentElement;
    const darkEnabled = theme === 'dark';

    root.classList.toggle('dark', darkEnabled);
    root.style.colorScheme = darkEnabled ? 'dark' : 'light';
    setIsDark(darkEnabled);
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: ThemeMode =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : prefersDark
          ? 'dark'
          : 'light';

    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = isDark ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Basculer le thème"
      className="fixed bottom-5 right-5 z-[60] p-3 rounded-full border border-sky-200/80 dark:border-gray-700/70 bg-white/95 dark:bg-gray-900/90 text-slate-700 dark:text-slate-100 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-sky-50 dark:hover:bg-gray-800"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
