import React, { ReactNode } from 'react';
import { useApp } from '../context/AppContext';
import { Bus, Settings, MapPin, CreditCard, Bell, Route, LogOut, Sun, Moon } from 'lucide-react';
import { t } from '../utils/translations';

interface LayoutProps {
  children: ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange }) => {
  const { user, theme, language, notifications, logout, toggleTheme } = useApp();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const tabs = [
    { id: 'liveTrack', icon: Bus, label: t('liveTrack', language) },
    { id: 'routes', icon: Route, label: t('routes', language) },
    { id: 'nearestStop', icon: MapPin, label: t('nearestStop', language) },
    { id: 'bookTicket', icon: CreditCard, label: t('bookTicket', language) },
    { id: 'payments', icon: CreditCard, label: t('payments', language) },
    { id: 'notifications', icon: Bell, label: t('notifications', language), badge: unreadCount },
    { id: 'settings', icon: Settings, label: t('settings', language) }
  ];

  const bgClass = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textClass = theme === 'light' ? 'text-gray-900' : 'text-white';
  const accentClass = theme === 'light' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-700';
  const headerBg = theme === 'light' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <header className={`${headerBg} shadow-2xl sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform p-1">
                <img
                  src="/bmtc.logo.jpg"
                  alt="BMTC Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-tight">
                  {t('appName', language)}
                </h1>
                <p className="text-xs text-yellow-100">365J Smart Commuter</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all transform hover:scale-110"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-white" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-300" />
                )}
              </button>

              {user && (
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{t('logout', language)}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className={`${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800 border-gray-700'} border-b sticky top-16 z-40 backdrop-blur-lg bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 transform ${
                    isActive
                      ? `${accentClass} text-white shadow-lg scale-105`
                      : theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-200'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
