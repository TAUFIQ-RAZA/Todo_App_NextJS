import { FilterType } from '@/types';
import { cn } from '@/utils/cn';

interface FilterBarProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
    return (
        <div className="flex gap-2">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                        activeFilter === filter.value
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
