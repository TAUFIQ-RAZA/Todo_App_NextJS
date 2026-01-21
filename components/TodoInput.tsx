'use client';

import { useState, FormEvent } from 'react';
import { Plus, Bell } from 'lucide-react';
import { Priority, Category } from '@/types';

interface TodoInputProps {
    onAdd: (title: string, priority: Priority, category: Category, dueDate: string | null, reminderTime: string | null) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [category, setCategory] = useState<Category>('personal');
    const [dueDate, setDueDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd(title, priority, category, dueDate || null, reminderTime || null);
        setTitle('');
        setDueDate('');
        setReminderTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-lg"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Priority
                        </label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        >
                            <option value="low">🟢 Low</option>
                            <option value="medium">🟡 Medium</option>
                            <option value="high">🔴 High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        >
                            <option value="work">💼 Work</option>
                            <option value="study">📚 Study</option>
                            <option value="personal">🏠 Personal</option>
                            <option value="fitness">💪 Fitness</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Due Date <span className="text-gray-400 dark:text-gray-500 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Bell className="w-4 h-4" />
                            Reminder <span className="text-gray-400 dark:text-gray-500 font-normal">(Optional)</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                >
                    <Plus className="w-5 h-5" />
                    Add Task
                </button>
            </div>
        </form>
    );
}
