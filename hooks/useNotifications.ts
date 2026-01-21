'use client';

import { useEffect, useRef, useState } from 'react';
import { Todo } from '@/types';
import { parseISO, isBefore } from 'date-fns';

export function useNotifications(todos: Todo[]) {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [hasRequestedPermission, setHasRequestedPermission] = useState(false);
    const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const notifiedTodosRef = useRef<Set<string>>(new Set());

    // Check notification permission on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    // Request notification permission
    const requestPermission = async () => {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            return false;
        }

        if (Notification.permission === 'granted') {
            setPermission('granted');
            return true;
        }

        if (Notification.permission === 'denied') {
            setPermission('denied');
            return false;
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            setHasRequestedPermission(true);
            return result === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    };

    // Show notification
    const showNotification = (todo: Todo) => {
        if (permission !== 'granted' || typeof window === 'undefined') {
            return;
        }

        try {
            const notification = new Notification('Todo Reminder', {
                body: `Reminder: ${todo.title}`,
                icon: '/favicon.ico',
                tag: todo.id,
                requireInteraction: false,
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            // Mark as notified
            notifiedTodosRef.current.add(todo.id);
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    };

    // Check for due reminders
    const checkReminders = () => {
        if (permission !== 'granted') return;

        const now = new Date();

        todos.forEach((todo) => {
            // Skip if already completed or already notified
            if (todo.completed || notifiedTodosRef.current.has(todo.id)) {
                return;
            }

            // Check if reminder time has passed
            if (todo.reminderTime) {
                const reminderDate = parseISO(todo.reminderTime);
                if (isBefore(reminderDate, now)) {
                    showNotification(todo);
                }
            }
        });
    };

    // Set up periodic checking
    useEffect(() => {
        if (permission === 'granted' && todos.length > 0) {
            // Check immediately
            checkReminders();

            // Check every 30 seconds
            checkIntervalRef.current = setInterval(checkReminders, 30000);

            return () => {
                if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current);
                }
            };
        }
    }, [permission, todos]);

    // Clean up notified todos that no longer exist
    useEffect(() => {
        const currentTodoIds = new Set(todos.map((t) => t.id));
        const notifiedIds = Array.from(notifiedTodosRef.current);

        notifiedIds.forEach((id) => {
            if (!currentTodoIds.has(id)) {
                notifiedTodosRef.current.delete(id);
            }
        });
    }, [todos]);

    return {
        permission,
        requestPermission,
        hasRequestedPermission,
        isSupported: typeof window !== 'undefined' && 'Notification' in window,
    };
}
