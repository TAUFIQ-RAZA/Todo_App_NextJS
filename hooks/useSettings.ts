'use client';

import { useState, useEffect } from 'react';
import { AppSettings } from '@/types';

const SETTINGS_KEY = 'app_settings';

const defaultSettings: AppSettings = {
    appearance: {
        theme: 'system',
        accentColor: 'blue',
        layoutDensity: 'comfortable',
    },
    behavior: {
        addOnEnter: true,
        autoFocus: true,
        moveCompletedToBottom: false,
        confirmDelete: true,
    },
    notifications: {
        enabled: true,
        timing: 15,
    },
    accessibility: {
        fontSize: 'normal',
        highContrast: false,
        reducedMotion: false,
    },
};

export function useSettings() {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [mounted, setMounted] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSettings({ ...defaultSettings, ...parsed });
            } catch (error) {
                console.error('Failed to parse settings:', error);
            }
        }
        setMounted(true);
    }, []);

    // Apply settings (Theme and Accent Color)
    useEffect(() => {
        if (!mounted) return;

        // Apply Theme
        const theme = settings.appearance.theme;
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', prefersDark);
        }

        // Apply Accent Color
        root.style.setProperty('--accent-color', `var(--${settings.appearance.accentColor}-500)`);

        // Save to localStorage
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

        // Also sync with the old 'theme' key for ThemeToggle compatibility if needed, 
        // but better to just migrate ThemeToggle to use useSettings.
        localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    }, [settings, mounted]);


    const updateAppearance = (appearance: Partial<AppSettings['appearance']>) => {
        setSettings((prev) => ({
            ...prev,
            appearance: { ...prev.appearance, ...appearance },
        }));
    };

    const updateBehavior = (behavior: Partial<AppSettings['behavior']>) => {
        setSettings((prev) => ({
            ...prev,
            behavior: { ...prev.behavior, ...behavior },
        }));
    };

    const updateNotifications = (notifications: Partial<AppSettings['notifications']>) => {
        setSettings((prev) => ({
            ...prev,
            notifications: { ...prev.notifications, ...notifications },
        }));
    };

    const updateAccessibility = (accessibility: Partial<AppSettings['accessibility']>) => {
        setSettings((prev) => ({
            ...prev,
            accessibility: { ...prev.accessibility, ...accessibility },
        }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
    };

    return {
        settings,
        updateAppearance,
        updateBehavior,
        updateNotifications,
        updateAccessibility,
        resetSettings,
        mounted,
    };
}
