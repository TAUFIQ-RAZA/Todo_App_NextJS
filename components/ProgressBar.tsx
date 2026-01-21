interface ProgressBarProps {
    completed: number;
    total: number;
    progress: number;
}

export function ProgressBar({ completed, total, progress }: ProgressBarProps) {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progress
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {completed} / {total} tasks
                </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
