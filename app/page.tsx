'use client';

import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { NotificationButton } from '@/components/NotificationButton';
import { useTodos } from '@/hooks/useTodos';
import { useNotifications } from '@/hooks/useNotifications';

export default function Home() {
    const {
        todos,
        allTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        reorderTodos,
        searchQuery,
        setSearchQuery,
        filter,
        setFilter,
        categoryFilter,
        setCategoryFilter,
        completedCount,
        totalCount,
        progress,
        mounted,
    } = useTodos();

    const { permission, requestPermission, isSupported } = useNotifications(allTodos);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Header>
                    <NotificationButton
                        permission={permission}
                        onRequestPermission={requestPermission}
                        isSupported={isSupported}
                    />
                </Header>

                {totalCount > 0 && (
                    <ProgressBar
                        completed={completedCount}
                        total={totalCount}
                        progress={progress}
                    />
                )}

                <TodoInput onAdd={addTodo} />

                <CategoryFilter
                    activeCategory={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                />

                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                    <FilterBar activeFilter={filter} onFilterChange={setFilter} />
                </div>

                <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                    onReorder={reorderTodos}
                />
            </div>
        </div>
    );
}
