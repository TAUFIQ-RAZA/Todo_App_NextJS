import { Flame, Trophy } from 'lucide-react';

interface StreakDisplayProps {
    currentStreak: number;
    longestStreak: number;
}

export function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Streaks & Consistency
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current Streak */}
                <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-3 mb-2">
                        <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Current Streak
                        </h4>
                    </div>
                    <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                        {currentStreak}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {currentStreak === 1 ? 'day' : 'days'} in a row
                    </p>
                </div>

                {/* Longest Streak */}
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-3 mb-2">
                        <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Longest Streak
                        </h4>
                    </div>
                    <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                        {longestStreak}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        personal best
                    </p>
                </div>
            </div>

            {currentStreak > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-700 dark:text-green-300 text-center">
                        🎉 Keep it up! You&apos;re on a roll!
                    </p>
                </div>
            )}
        </div>
    );
}
