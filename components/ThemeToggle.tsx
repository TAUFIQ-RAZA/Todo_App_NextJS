'use client';

import { useSettings } from '@/hooks/useSettings';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const { settings, updateAppearance, mounted } = useSettings();
    const isDark = settings.appearance.theme === 'dark' ||
        (settings.appearance.theme === 'system' &&
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        updateAppearance({ theme: newTheme });
    };

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
                <Moon className="w-5 h-5 text-gray-700" />
            )}
        </button>
    );
}

