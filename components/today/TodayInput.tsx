'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

interface TodayInputProps {
    onAdd: (title: string, timing?: string) => void;
}

export function TodayInput({ onAdd }: TodayInputProps) {
    const [title, setTitle] = useState('');
    const [timing, setTiming] = useState('');
    const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleTimingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);

        if (value.length > 2) {
            value = `${value.slice(0, 2)}:${value.slice(2)}`;
        }
        setTiming(value);
    };

    const togglePeriod = () => {
        setPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const finalTiming = timing.trim() ? `${timing} ${period}` : undefined;
        onAdd(title, finalTiming);

        setTitle('');
        setTiming('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3 relative">
                <div className="flex-1">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="What are you working on today?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 rounded-2xl shadow-xl outline-none text-xl transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                    />
                </div>
                <div className="sm:w-64 relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="-- : --"
                            value={timing}
                            onChange={handleTimingChange}
                            className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 rounded-2xl shadow-xl outline-none text-xl transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 font-mono text-center tracking-widest"
                            maxLength={5}
                        />
                        {timing && (
                            <button
                                type="button"
                                onClick={togglePeriod}
                                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs font-bold font-mono transition-colors text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-600"
                            >
                                {period}
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="hidden sm:flex flex-shrink-0 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-colors shadow-lg"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full sm:hidden flex items-center justify-center gap-2 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-colors shadow-lg font-bold"
                >
                    <Plus className="w-6 h-6" />
                    Add Task
                </button>
            </div>
        </form>
    );
}

