import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyActivityProps {
    data: { date: string; completed: number }[];
}

export function DailyActivity({ data }: DailyActivityProps) {
    const formattedData = data.map((item) => ({
        ...item,
        day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    }));

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Last 7 Days Activity
            </h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                        }}
                    />
                    <Bar dataKey="completed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
