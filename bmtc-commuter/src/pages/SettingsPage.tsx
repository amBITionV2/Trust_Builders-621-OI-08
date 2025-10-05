import React from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, Globe, Bell, User } from 'lucide-react';
import { t } from '../utils/translations';
import type { Language } from '../types';

export const SettingsPage: React.FC = () => {
  const { user, theme, language, toggleTheme, setLanguage } = useApp();
  const isDark = theme === 'dark';

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: t('english', language) },
    { code: 'kn', label: t('kannada', language) },
    { code: 'hi', label: t('hindi', language) }
  ];

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('settings', language)}
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Customize your experience
        </p>
      </div>

      {user && (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user.fullName}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.mobile}
              </p>
              {user.email && (
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {user.email}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center space-x-3 mb-4">
          {theme === 'light' ? (
            <Sun className="w-6 h-6 text-yellow-600" />
          ) : (
            <Moon className="w-6 h-6 text-yellow-400" />
          )}
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('theme', language)}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={toggleTheme}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
              theme === 'light'
                ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100'
                : isDark
                ? 'border-gray-600 bg-gray-700'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <Sun className={`w-8 h-8 mx-auto mb-2 ${theme === 'light' ? 'text-yellow-600' : 'text-gray-500'}`} />
            <p className={`text-sm font-semibold text-center ${
              theme === 'light'
                ? 'text-yellow-900'
                : isDark
                ? 'text-gray-400'
                : 'text-gray-600'
            }`}>
              {t('lightMode', language)}
            </p>
          </button>

          <button
            onClick={toggleTheme}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
              theme === 'dark'
                ? 'border-yellow-500 bg-gradient-to-br from-gray-800 to-gray-900'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <Moon className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-500'}`} />
            <p className={`text-sm font-semibold text-center ${
              theme === 'dark'
                ? 'text-yellow-400'
                : 'text-gray-600'
            }`}>
              {t('darkMode', language)}
            </p>
          </button>
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-6 h-6 text-yellow-600" />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('language', language)}
          </h3>
        </div>

        <div className="space-y-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all transform hover:scale-102 ${
                language === lang.code
                  ? 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-lg'
                  : isDark
                  ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${
                  language === lang.code
                    ? 'text-yellow-900'
                    : isDark
                    ? 'text-white'
                    : 'text-gray-900'
                }`}>
                  {lang.label}
                </span>
                {language === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-6 h-6 text-yellow-600" />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('notifications', language)}
          </h3>
        </div>

        <div className="space-y-3">
          {[
            { id: 'eta', label: 'Bus ETA Updates', enabled: true },
            { id: 'seat', label: 'Seat Availability Alerts', enabled: true },
            { id: 'payment', label: 'Payment Confirmations', enabled: true },
            { id: 'ticket', label: 'Ticket Status Updates', enabled: true }
          ].map(item => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-xl ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.label}
              </span>
              <div
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  item.enabled
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    : isDark
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform ${
                    item.enabled ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            BMTC Passenger Interface v1.0
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Smart Commuter Assistant for Route 365J
          </p>
        </div>
      </div>
    </div>
  );
};
