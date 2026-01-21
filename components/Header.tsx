import { ThemeToggle } from './ThemeToggle';
import { Navigation } from './Navigation';

interface HeaderProps {
    children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
    return (
        <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        My Todo App
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Organize your tasks efficiently
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {children}
                    <ThemeToggle />
                </div>
            </div>
            <Navigation />
        </header>
    );
}
