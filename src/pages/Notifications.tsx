import  { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  MoreVertical,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payment Received',
    message: 'Your payment of $1,250 has been processed successfully.',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New User Registration',
    message: 'Sarah Williams has joined your team.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Storage Limit Warning',
    message: 'You have used 85% of your storage quota.',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'error',
    title: 'Failed Transaction',
    message: 'Transaction #12345 failed. Please review.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'System Update',
    message: 'A new system update is available.',
    time: '1 day ago',
    read: true,
  },
];

const iconMap = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
};

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Notifications
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3 mt-10 ml-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
          {unreadCount > 0 && (
            <Button  size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent padding="none">
          <div className="divide-y divide-secondary-200 dark:divide-secondary-700">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-secondary-300 dark:text-secondary-600 mx-auto mb-4" />
                <p className="text-secondary-600 dark:text-secondary-400">
                  No notifications to display
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 flex items-start gap-4 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors ${
                    !notification.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''
                  }`}
                >
                  <div className="flex-shrink-0">{iconMap[notification.type]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-medium text-secondary-900 dark:text-white">
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-xs"
                          >
                            Mark as read
                          </button>
                        )}
                        <button className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-secondary-400 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-secondary-500 dark:text-secondary-500">
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
