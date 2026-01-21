'use client';

import { useState, useEffect } from 'react';
import { TodayTask } from '@/types';

const STORAGE_KEY = 'today_tasks';

export function useTodayTasks() {
    const [tasks, setTasks] = useState<TodayTask[]>([]);
    const [mounted, setMounted] = useState(false);

    // Load tasks from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Optional: Check if it's a new day and clear? 
                // For now, let's just load them.
                setTasks(parsed);
            } catch (error) {
                console.error('Failed to parse today_tasks:', error);
            }
        }
        setMounted(true);
    }, []);

    // Save tasks to localStorage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks, mounted]);

    const addTask = (title: string, timing?: string) => {
        if (!title.trim()) return;
        const newTask: TodayTask = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            timing,
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, title: string, timing?: string) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, title, timing } : task))
        );
    };

    const clearCompleted = () => {
        setTasks((prev) => prev.filter((task) => !task.completed));
    };

    const completedCount = tasks.filter((t) => t.completed).length;
    const totalCount = tasks.length;

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        clearCompleted,
        completedCount,
        totalCount,
        mounted,
    };
}
