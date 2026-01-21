'use client';

import { useState, useEffect } from 'react';
import { Todo, Priority, Category, FilterType } from '@/types';

const STORAGE_KEY = 'todos';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
    const [mounted, setMounted] = useState(false);

    // Load todos from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setTodos(JSON.parse(stored));
            } catch (error) {
                console.error('Failed to parse todos from localStorage:', error);
            }
        }
        setMounted(true);
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }, [todos, mounted]);

    const addTodo = (
        title: string,
        priority: Priority,
        category: Category,
        dueDate: string | null,
        reminderTime: string | null
    ) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            priority,
            category,
            dueDate,
            reminderTime,
            createdAt: new Date().toISOString(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id: string, updates: Partial<Todo>) => {
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
        );
    };

    const reorderTodos = (newOrder: Todo[]) => {
        setTodos(newOrder);
    };

    // Filter and search logic
    const getFilteredTodos = () => {
        let filtered = todos;

        // Apply completion filter
        if (filter === 'completed') {
            filtered = filtered.filter((todo) => todo.completed);
        } else if (filter === 'pending') {
            filtered = filtered.filter((todo) => !todo.completed);
        }

        // Apply category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter((todo) => todo.category === categoryFilter);
        }

        // Apply search
        if (searchQuery.trim()) {
            filtered = filtered.filter((todo) =>
                todo.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredTodos = getFilteredTodos();

    // Progress calculation
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalCount = todos.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return {
        todos: filteredTodos,
        allTodos: todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        reorderTodos,
        setTodos,
        searchQuery,
        setSearchQuery,
        filter,
        setFilter,
        categoryFilter,
        setCategoryFilter,
        completedCount,
        totalCount,
        progress,
        mounted,
    };
}

