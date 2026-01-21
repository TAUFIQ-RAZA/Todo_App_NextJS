'use client';

import { useState } from 'react';
import { Trash2, Edit2, Check } from 'lucide-react';
import { TodayTask } from '@/types';
import { cn } from '@/utils/cn';

interface TodayItemProps {
    task: TodayTask;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, title: string, timing?: string) => void;
}

export function TodayItem({ task, onToggle, onDelete, onUpdate }: TodayItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);
    const [editTiming, setEditTiming] = useState(task.timing ? task.timing.split(' ')[0] : '');
    const [editPeriod, setEditPeriod] = useState<'AM' | 'PM'>(task.timing?.includes('PM') ? 'PM' : 'AM');

    const handleSave = () => {
        const finalTiming = editTiming.trim() ? `${editTiming} ${editPeriod}` : undefined;
        if ((editValue.trim() && editValue !== task.title) || finalTiming !== task.timing) {
            onUpdate(task.id, editValue, finalTiming);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditValue(task.title);
            setEditTiming(task.timing ? task.timing.split(' ')[0] : '');
            setEditPeriod(task.timing?.includes('PM') ? 'PM' : 'AM');
            setIsEditing(false);
        }
    };

    const handleTimingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) {
            value = `${value.slice(0, 2)}:${value.slice(2)}`;
        }
        setEditTiming(value);
    };

    const togglePeriod = () => {
        setEditPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
    };

    return (
        <div className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
            <button
                onClick={() => onToggle(task.id)}
                className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                    task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-500"
                )}
            >
                {task.completed && <Check className="w-5 h-5" />}
            </button>

            <div className="flex-1 min-w-0" onKeyDown={handleKeyDown}>
                {isEditing ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            autoFocus
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleSave}
                            className="flex-1 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg text-xl font-medium outline-none dark:text-white"
                        />
                        <div className="relative flex-shrink-0">
                            <input
                                type="text"
                                value={editTiming}
                                placeholder="--:--"
                                onChange={handleTimingChange}
                                onBlur={handleSave}
                                maxLength={5}
                                className="w-32 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg text-lg outline-none dark:text-gray-300 font-mono text-center tracking-widest"
                            />
                            {editTiming && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        togglePeriod();
                                    }}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-[10px] font-bold font-mono transition-colors text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-600"
                                >
                                    {editPeriod}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 overflow-hidden">
                        <p
                            onClick={() => setIsEditing(true)}
                            className={cn(
                                "text-xl font-medium cursor-text truncate transition-all",
                                task.completed ? "text-gray-400 line-through" : "text-gray-800 dark:text-gray-200"
                            )}
                        >
                            {task.title}
                        </p>
                        {task.timing && (
                            <div className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md font-mono border border-gray-200 dark:border-gray-600 shadow-inner">
                                <span className="text-xs font-bold leading-none">{task.timing.split(' ')[0]}</span>
                                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 leading-none opacity-80">{task.timing.split(' ')[1]}</span>
                            </div>
                        )}
                    </div>
                )}

            </div>



            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => setIsEditing(true)}
                    title="Edit"
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"
                >
                    <Edit2 className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    title="Delete"
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
