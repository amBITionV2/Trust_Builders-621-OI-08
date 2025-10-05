import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, BellOff, Bus, CreditCard, Clock, MapPin } from 'lucide-react';
import { formatTime, formatDate } from '../utils/helpers';
import { t } from '../utils/translations';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, theme, language } = useApp();
  const isDark = theme === 'dark';

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'eta':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'seat':
        return <Bus className="w-5 h-5 text-yellow-500" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'ticket':
        return <MapPin className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleNotificationClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      markNotificationRead(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('notifications', language)}
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              Stay updated with real-time alerts
            </p>
          </div>
          {unreadNotifications.length > 0 && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white">
              <span className="font-bold">{unreadNotifications.length}</span>
              <span className="text-sm ml-1">{t('unread', language)}</span>
            </div>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center`}>
          <BellOff className={`w-20 h-20 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`text-lg font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            No notifications yet
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
            You'll see updates here when they arrive
          </p>
        </div>
      ) : (
        <>
          {unreadNotifications.length > 0 && (
            <div>
              <h3 className={`text-sm font-bold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
                New
              </h3>
              <div className="space-y-3">
                {unreadNotifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id, false)}
                    className={`${isDark ? 'bg-gray-800 border-yellow-700' : 'bg-white border-yellow-300'} border-2 rounded-2xl shadow-xl p-5 cursor-pointer transform hover:scale-102 transition-all hover:shadow-2xl`}
                    style={{
                      perspective: '1000px',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} pr-2`}>
                            {notification.title}
                          </h4>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2 animate-pulse" />
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {formatDate(notification.createdAt)} • {formatTime(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {readNotifications.length > 0 && (
            <div>
              <h3 className={`text-sm font-bold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
                Earlier
              </h3>
              <div className="space-y-3">
                {readNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-2xl shadow-md p-5 opacity-75 hover:opacity-100 transition-opacity`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'} mb-2`}>
                          {notification.title}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                          {formatDate(notification.createdAt)} • {formatTime(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
