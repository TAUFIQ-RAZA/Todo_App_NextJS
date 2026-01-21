import { Priority, Category } from '@/types';

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; emoji: string }> = {
    low: { label: 'Low', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', emoji: '🟢' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', emoji: '🟡' },
    high: { label: 'High', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', emoji: '🔴' },
};

export const CATEGORY_CONFIG: Record<Category, { label: string; color: string; icon: string }> = {
    work: { label: 'Work', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: '💼' },
    study: { label: 'Study', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: '📚' },
    personal: { label: 'Personal', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400', icon: '🏠' },
    fitness: { label: 'Fitness', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: '💪' },
};
