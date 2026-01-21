'use client';

import { useMemo } from 'react';
import { Todo, TodoStats, Category, Priority } from '@/types';
import { startOfDay, isToday, parseISO, differenceInDays } from 'date-fns';

export function useStats(todos: Todo[]) {
    const stats = useMemo((): TodoStats => {
        const total = todos.length;
        const completed = todos.filter((t) => t.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Category breakdown
        const byCategory: Record<Category, number> = {
            work: 0,
            study: 0,
            personal: 0,
            fitness: 0,
        };
        todos.forEach((todo) => {
            byCategory[todo.category]++;
        });

        // Priority breakdown (completed tasks only)
        const byPriority: Record<Priority, number> = {
            low: 0,
            medium: 0,
            high: 0,
        };
        todos.filter((t) => t.completed).forEach((todo) => {
            byPriority[todo.priority]++;
        });

        // Today's activity
        const todayAdded = todos.filter((t) => isToday(parseISO(t.createdAt))).length;
        const todayCompleted = todos.filter(
            (t) => t.completed && t.createdAt && isToday(parseISO(t.createdAt))
        ).length;

        // Streaks calculation
        const completedDates = todos
            .filter((t) => t.completed)
            .map((t) => startOfDay(parseISO(t.createdAt)).getTime())
            .sort((a, b) => b - a); // Sort descending

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        if (completedDates.length > 0) {
            const uniqueDates = [...new Set(completedDates)];
            const today = startOfDay(new Date()).getTime();

            // Check if there's activity today or yesterday
            if (uniqueDates[0] === today || differenceInDays(today, uniqueDates[0]) === 1) {
                currentStreak = 1;
                tempStreak = 1;

                for (let i = 1; i < uniqueDates.length; i++) {
                    const dayDiff = differenceInDays(uniqueDates[i - 1], uniqueDates[i]);
                    if (dayDiff === 1) {
                        currentStreak++;
                        tempStreak++;
                    } else {
                        break;
                    }
                }
            }

            // Calculate longest streak
            tempStreak = 1;
            for (let i = 1; i < uniqueDates.length; i++) {
                const dayDiff = differenceInDays(uniqueDates[i - 1], uniqueDates[i]);
                if (dayDiff === 1) {
                    tempStreak++;
                    longestStreak = Math.max(longestStreak, tempStreak);
                } else {
                    tempStreak = 1;
                }
            }
            longestStreak = Math.max(longestStreak, tempStreak);
        }

        // Last 7 days activity
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayStart = startOfDay(date);

            const completedOnDay = todos.filter((t) => {
                if (!t.completed || !t.createdAt) return false;
                const todoDate = startOfDay(parseISO(t.createdAt));
                return todoDate.getTime() === dayStart.getTime();
            }).length;

            last7Days.push({
                date: dayStart.toISOString().split('T')[0],
                completed: completedOnDay,
            });
        }

        return {
            total,
            completed,
            pending,
            completionRate,
            byCategory,
            byPriority,
            todayAdded,
            todayCompleted,
            currentStreak,
            longestStreak,
            last7Days,
        };
    }, [todos]);

    return stats;
}
