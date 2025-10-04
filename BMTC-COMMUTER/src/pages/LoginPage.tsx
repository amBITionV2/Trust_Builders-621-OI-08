import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bus, Lock, Phone } from 'lucide-react';
import { t } from '../utils/translations';

export const LoginPage: React.FC = () => {
  const { login, theme, language } = useApp();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(mobile, password);
    setIsLoading(false);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-yellow-50 via-white to-yellow-100'}`}>
      <div className="w-full max-w-md px-6">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'} rounded-3xl shadow-2xl border-2 p-8 transform hover:scale-105 transition-all duration-300`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl mb-4 transform hover:scale-105 transition-transform p-2">
              <img
                src="/bmtc.logo.jpg"
                alt="BMTC Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              {t('appName', language)}
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('welcome', language)} to 365J Smart Commuter
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('mobile', language)}
              </label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all`}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('password', language)}
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-yellow-500'
                  } focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all`}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                boxShadow: '0 10px 25px -5px rgba(234, 179, 8, 0.5)'
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                t('login', language)
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
