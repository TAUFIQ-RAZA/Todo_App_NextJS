'use client';

import { Header } from '@/components/Header';
import { StatCard } from '@/components/stats/StatCard';
import { CategoryChart } from '@/components/stats/CategoryChart';
import { DailyActivity } from '@/components/stats/DailyActivity';
import { StreakDisplay } from '@/components/stats/StreakDisplay';
import { useTodos } from '@/hooks/useTodos';
import { useStats } from '@/hooks/useStats';
import { CheckCircle2, Circle, ListTodo, TrendingUp } from 'lucide-react';

export default function StatsPage() {
    const { allTodos, mounted } = useTodos();
    const stats = useStats(allTodos);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Header />

                {allTodos.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
                        <ListTodo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            No Data Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Start adding tasks to see your productivity statistics!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Tasks"
                                value={stats.total}
                                icon={ListTodo}
                                color="text-blue-600 dark:text-blue-400"
                            />
                            <StatCard
                                title="Completed"
                                value={stats.completed}
                                icon={CheckCircle2}
                                color="text-green-600 dark:text-green-400"
                            />
                            <StatCard
                                title="Pending"
                                value={stats.pending}
                                icon={Circle}
                                color="text-orange-600 dark:text-orange-400"
                            />
                            <StatCard
                                title="Completion Rate"
                                value={`${stats.completionRate}%`}
                                icon={TrendingUp}
                                color="text-purple-600 dark:text-purple-400"
                            />
                        </div>

                        {/* Daily Activity */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <DailyActivity data={stats.last7Days} />
                        </div>

                        {/* Category Breakdown & Today's Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Category Breakdown
                                </h3>
                                <CategoryChart data={stats.byCategory} />
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Today&apos;s Activity
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Added</p>
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            {stats.todayAdded}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
                                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                            {stats.todayCompleted}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Streaks */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <StreakDisplay
                                currentStreak={stats.currentStreak}
                                longestStreak={stats.longestStreak}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
