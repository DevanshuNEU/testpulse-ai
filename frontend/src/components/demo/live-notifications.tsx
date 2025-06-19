'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface LiveNotificationsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

function NotificationItem({ notification, onDismiss }: NotificationItemProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          onDismiss(notification.id);
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [notification.id, onDismiss]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getProgressColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div
      className={`rounded-lg border shadow-lg animate-in slide-in-from-right duration-300 overflow-hidden ${getBgColor(
        notification.type
      )}`}
    >
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className={`h-full transition-all duration-75 ease-linear ${getProgressColor(notification.type)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          {getIcon(notification.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">
                {notification.title}
              </h4>
              <button
                onClick={() => onDismiss(notification.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {notification.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LiveNotifications({ notifications, onDismiss }: LiveNotificationsProps) {
  return (
    <div className="fixed top-6 right-6 z-40 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}