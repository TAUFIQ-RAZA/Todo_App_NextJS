import { Category } from '@/types';
import { CATEGORY_CONFIG } from '@/utils/constants';
import { cn } from '@/utils/cn';

interface CategoryFilterProps {
    activeCategory: Category | 'all';
    onCategoryChange: (category: Category | 'all') => void;
}

const categories: { value: Category | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All Categories', icon: '📋' },
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'study', label: 'Study', icon: '📚' },
    { value: 'personal', label: 'Personal', icon: '🏠' },
    { value: 'fitness', label: 'Fitness', icon: '💪' },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const isActive = activeCategory === category.value;
                    const config = category.value !== 'all' ? CATEGORY_CONFIG[category.value as Category] : null;

                    return (
                        <button
                            key={category.value}
                            onClick={() => onCategoryChange(category.value)}
                            className={cn(
                                'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                                isActive
                                    ? config
                                        ? config.color + ' shadow-md'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/30'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            )}
                        >
                            <span>{category.icon}</span>
                            <span>{category.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
