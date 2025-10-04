import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROUTE_365J_STOPS } from '../data/route365J';
import { Search, MapPin, Clock, Users, Navigation, ArrowDown, ArrowUp } from 'lucide-react';
import { calculateETA } from '../utils/helpers';
import { t } from '../utils/translations';

export const LiveTrackPage: React.FC = () => {
  const { buses, theme, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'timeline' | 'map'>('timeline');

  const isDark = theme === 'dark';

  const filteredBuses = buses.filter(bus => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchesBusNumber = bus.busNumber.toLowerCase().includes(query);
    const matchesStop = ROUTE_365J_STOPS.some(stop =>
      stop.stopName.toLowerCase().includes(query)
    );
    return matchesBusNumber || matchesStop;
  });

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('liveTrack', language)}
        </h2>

        <div className="relative mb-6">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search', language)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all`}
          />
        </div>

        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              viewMode === 'timeline'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            {t('timeline', language)}
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              viewMode === 'map'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Navigation className="w-4 h-4 inline mr-2" />
            {t('mapView', language)}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBuses.map(bus => {
          const currentStop = ROUTE_365J_STOPS[bus.currentStopIndex];
          const nextStop = ROUTE_365J_STOPS[bus.currentStopIndex + 1];
          const progress = (bus.currentStopIndex / (ROUTE_365J_STOPS.length - 1)) * 100;

          return (
            <div
              key={bus.id}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 transform hover:scale-102 transition-all duration-300`}
              style={{
                boxShadow: isDark
                  ? '0 10px 30px rgba(0, 0, 0, 0.5)'
                  : '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Bus {bus.busNumber}
                    </h3>
                    {bus.direction === 'forward' ? (
                      <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-green-100 text-green-800">
                        <ArrowDown className="w-3 h-3" />
                        <span className="text-xs font-semibold">To Jigani</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        <ArrowUp className="w-3 h-3" />
                        <span className="text-xs font-semibold">To Kempegowda</span>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {bus.routeName}
                  </p>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg">
                  <Users className="w-4 h-4" />
                  <span className="font-bold">{bus.availableSeats}/{bus.totalSeats}</span>
                </div>
              </div>

              {viewMode === 'timeline' && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <MapPin className="w-5 h-5 text-yellow-600" />
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('currentLocation', language)}
                      </span>
                    </div>
                    <p className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      {currentStop.stopName}
                    </p>
                  </div>

                  {nextStop && (
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Next Stop:
                        </span>
                        <span className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {t('eta', language)}: {calculateETA(bus.currentStopIndex, bus.currentStopIndex + 1)} {t('minutes', language)}
                        </span>
                      </div>
                      <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {nextStop.stopName}
                      </p>
                    </div>
                  )}

                  <div className="relative pt-2">
                    <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs">
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {ROUTE_365J_STOPS[0].stopName}
                      </span>
                      <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {ROUTE_365J_STOPS[ROUTE_365J_STOPS.length - 1].stopName}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'map' && (
                <div className={`rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-6 h-64 flex items-center justify-center`}>
                  <div className="text-center">
                    <Navigation className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'} animate-pulse`} />
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      3D Map View
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                      Bus currently at: {currentStop.stopName}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                      Lat: {currentStop.latitude.toFixed(4)}, Lon: {currentStop.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
