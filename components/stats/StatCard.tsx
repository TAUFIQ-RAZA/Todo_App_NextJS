import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, color, subtitle }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {title}
                    </p>
                    <p className={`text-3xl font-bold ${color}`}>
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')} dark:${color.replace('text-', 'bg-').replace('-600', '-900/30')}`}>
                    <Icon className={`w-8 h-8 ${color}`} />
                </div>
            </div>
        </div>
    );
}
