'use client';

import { Header } from '@/components/Header';
import { TodayInput } from '@/components/today/TodayInput';
import { TodayList } from '@/components/today/TodayList';
import { useTodayTasks } from '@/hooks/useTodayTasks';

import { TodayTask } from '@/types';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TodayPage() {
    const {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        completedCount,
        totalCount,
        mounted
    } = useTodayTasks();

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="container mx-auto px-4 py-8 max-w-3xl">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <Header />

                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                            Daily Focus
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            One day at a time. Stay focused.
                        </p>
                    </motion.div>

                    <TodayInput onAdd={addTask} />

                    <TodayList
                        tasks={tasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onUpdate={updateTask}
                    />

                    {totalCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg flex items-center justify-between border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Progress</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {completedCount} / {totalCount} Tasks
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 max-w-[120px] h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden ml-4">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                                    className="h-full bg-green-500"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
