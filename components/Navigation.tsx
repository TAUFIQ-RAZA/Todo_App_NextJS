'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/today', label: 'Today Work', icon: Zap },
    { href: '/stats', label: 'Stats', icon: BarChart3 },
];


export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium',
                            isActive
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
