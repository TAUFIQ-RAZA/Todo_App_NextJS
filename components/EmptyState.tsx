import { CheckCircle2 } from 'lucide-react';

export function EmptyState() {
    return (
        <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No tasks yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
                Add your first task to get started!
            </p>
        </div>
    );
}
