import { Bell, BellOff } from 'lucide-react';

interface NotificationButtonProps {
    permission: NotificationPermission;
    onRequestPermission: () => void;
    isSupported: boolean;
}

export function NotificationButton({ permission, onRequestPermission, isSupported }: NotificationButtonProps) {
    if (!isSupported) {
        return null;
    }

    if (permission === 'granted') {
        return (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm">
                <Bell className="w-4 h-4" />
                <span>Notifications enabled</span>
            </div>
        );
    }

    if (permission === 'denied') {
        return (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
                <BellOff className="w-4 h-4" />
                <span>Notifications blocked</span>
            </div>
        );
    }

    return (
        <button
            onClick={onRequestPermission}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
        >
            <Bell className="w-4 h-4" />
            Enable Notifications
        </button>
    );
}
