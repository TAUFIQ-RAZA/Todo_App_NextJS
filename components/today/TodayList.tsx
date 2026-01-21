'use client';

import { TodayTask } from '@/types';
import { TodayItem } from './TodayItem';
import { AnimatePresence, motion } from 'framer-motion';

interface TodayListProps {
    tasks: TodayTask[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, title: string, timing?: string) => void;
}

export function TodayList({ tasks, onToggle, onDelete, onUpdate }: TodayListProps) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-2xl text-gray-400 dark:text-gray-600 font-medium">
                    New day, fresh focus ✨
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <TodayItem
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
