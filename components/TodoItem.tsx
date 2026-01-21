'use client';

import { useState } from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { Todo } from '@/types';
import { PRIORITY_CONFIG, CATEGORY_CONFIG } from '@/utils/constants';
import { cn } from '@/utils/cn';
import { format, isPast, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const priorityConfig = PRIORITY_CONFIG[todo.priority];
    const categoryConfig = CATEGORY_CONFIG[todo.category];

    const isOverdue = todo.dueDate && !todo.completed && isPast(parseISO(todo.dueDate));

    const handleSave = () => {
        if (editTitle.trim()) {
            onUpdate(todo.id, { title: editTitle });
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditTitle(todo.title);
            setIsEditing(false);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={cn(
                'bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 transition-all duration-200 hover:shadow-lg',
                isOverdue ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            )}
        >
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-900 border border-blue-500 rounded focus:outline-none"
                        />
                    ) : (
                        <h3
                            onClick={() => setIsEditing(true)}
                            className={cn(
                                'text-lg font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors',
                                todo.completed && 'line-through text-gray-400 dark:text-gray-600'
                            )}
                        >
                            {todo.title}
                        </h3>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', priorityConfig.color)}>
                            {priorityConfig.emoji} {priorityConfig.label}
                        </span>
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', categoryConfig.color)}>
                            {categoryConfig.icon} {categoryConfig.label}
                        </span>
                        {todo.dueDate && (
                            <span
                                className={cn(
                                    'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                                    isOverdue
                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                )}
                            >
                                <Calendar className="w-3 h-3" />
                                {format(parseISO(todo.dueDate), 'MMM d, yyyy')}
                                <Clock className="w-3 h-3 ml-1" />
                                {format(parseISO(todo.dueDate), 'h:mm a')}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    aria-label="Delete task"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
}
