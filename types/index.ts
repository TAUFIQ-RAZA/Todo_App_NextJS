export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'study' | 'personal' | 'fitness';
export type FilterType = 'all' | 'completed' | 'pending';

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    priority: Priority;
    category: Category;
    dueDate: string | null;
    reminderTime: string | null;
    createdAt: string;
}

export interface TodayTask {
    id: string;
    title: string;
    completed: boolean;
    timing?: string; // Optional timing/duration
    createdAt: string;
}

export interface AppSettings {
    appearance: {
        theme: 'light' | 'dark' | 'system';
        accentColor: 'blue' | 'purple' | 'green';
        layoutDensity: 'comfortable' | 'compact';
    };
    behavior: {
        addOnEnter: boolean;
        autoFocus: boolean;
        moveCompletedToBottom: boolean;
        confirmDelete: boolean;
    };
    notifications: {
        enabled: boolean;
        timing: 5 | 15 | 60; // minutes before
    };
    accessibility: {
        fontSize: 'normal' | 'large' | 'extra-large';
        highContrast: boolean;
        reducedMotion: boolean;
    };
}

export interface TodoStats {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
    byCategory: Record<Category, number>;
    byPriority: Record<Priority, number>;
    todayAdded: number;
    todayCompleted: number;
    currentStreak: number;
    longestStreak: number;
    last7Days: { date: string; completed: number }[];
}
