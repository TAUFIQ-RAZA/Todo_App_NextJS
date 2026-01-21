'use client';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Todo } from '@/types';
import { SortableTodoItem } from './SortableTodoItem';
import { EmptyState } from './EmptyState';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Todo>) => void;
    onReorder: (newOrder: Todo[]) => void;
}

export function TodoList({ todos, onToggle, onDelete, onUpdate, onReorder }: TodoListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = todos.findIndex((todo) => todo.id === active.id);
            const newIndex = todos.findIndex((todo) => todo.id === over.id);

            const newOrder = arrayMove(todos, oldIndex, newIndex);
            onReorder(newOrder);
        }
    };

    if (todos.length === 0) {
        return <EmptyState />;
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {todos.map((todo) => (
                        <SortableTodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
