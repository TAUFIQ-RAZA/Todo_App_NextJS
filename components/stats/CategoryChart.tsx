import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Category } from '@/types';
import { CATEGORY_CONFIG } from '@/utils/constants';

interface CategoryChartProps {
    data: Record<Category, number>;
}

const COLORS = {
    work: '#3b82f6',
    study: '#8b5cf6',
    personal: '#10b981',
    fitness: '#f59e0b',
};

export function CategoryChart({ data }: CategoryChartProps) {
    const chartData = Object.entries(data)
        .filter(([_, value]) => value > 0)
        .map(([key, value]) => ({
            name: CATEGORY_CONFIG[key as Category].label,
            value,
            color: COLORS[key as Category],
        }));

    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                No tasks to display
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
