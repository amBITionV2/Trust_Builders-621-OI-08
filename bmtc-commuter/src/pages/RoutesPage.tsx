import React from 'react';
import { useApp } from '../context/AppContext';
import { ROUTE_365J_STOPS } from '../data/route365J';
import { MapPin, Bus, Navigation } from 'lucide-react';
import { t } from '../utils/translations';

export const RoutesPage: React.FC = () => {
  const { buses, theme, language } = useApp();
  const isDark = theme === 'dark';

  const activeBuses = buses.filter(b => b.status === 'active');

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('routes', language)} - 365J
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Kempegowda Bus Station → Jigani A.P.C. Circle
        </p>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Live Bus Movement
          </h3>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {activeBuses.length} Active
            </span>
          </div>
        </div>

        <div className="relative">
          {ROUTE_365J_STOPS.map((stop, index) => {
            const busesAtStop = activeBuses.filter(b => b.currentStopIndex === index);
            const isLastStop = index === ROUTE_365J_STOPS.length - 1;

            return (
              <div key={stop.id} className="relative pb-8">
                <div className="flex items-start space-x-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full ${
                        busesAtStop.length > 0
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg ring-4 ring-yellow-200'
                          : isDark
                          ? 'bg-gray-700 border-2 border-gray-600'
                          : 'bg-white border-2 border-gray-300'
                      } flex items-center justify-center z-10`}
                    >
                      {busesAtStop.length > 0 && (
                        <MapPin className="w-4 h-4 text-white animate-bounce" />
                      )}
                    </div>
                    {!isLastStop && (
                      <div
                        className={`w-0.5 h-16 ${
                          isDark ? 'bg-gray-700' : 'bg-gray-300'
                        } absolute top-6`}
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className={`p-4 rounded-xl ${
                      busesAtStop.length > 0
                        ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300'
                        : isDark
                        ? 'bg-gray-700 border border-gray-600'
                        : 'bg-gray-50 border border-gray-200'
                    } transition-all`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-bold ${
                            busesAtStop.length > 0
                              ? 'text-yellow-900'
                              : isDark
                              ? 'text-white'
                              : 'text-gray-900'
                          }`}>
                            {stop.stopName}
                          </h4>
                          <p className={`text-xs mt-1 ${
                            busesAtStop.length > 0
                              ? 'text-yellow-700'
                              : isDark
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}>
                            Stop {index + 1} of {ROUTE_365J_STOPS.length}
                          </p>
                        </div>

                        {busesAtStop.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <Bus className="w-5 h-5 text-yellow-700 animate-pulse" />
                            <span className="text-sm font-bold text-yellow-900">
                              {busesAtStop.length} Bus{busesAtStop.length > 1 ? 'es' : ''}
                            </span>
                          </div>
                        )}
                      </div>

                      {busesAtStop.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {busesAtStop.map(bus => (
                            <div
                              key={bus.id}
                              className="flex items-center justify-between p-2 bg-white rounded-lg"
                            >
                              <span className="text-sm font-semibold text-gray-900">
                                Bus {bus.busNumber}
                              </span>
                              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                                {bus.availableSeats} seats
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <div className="flex items-center space-x-3 mb-4">
          <Navigation className="w-6 h-6 text-yellow-600" />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            3D Route Visualization
          </h3>
        </div>
        <div className={`rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} p-8 h-96 flex items-center justify-center`}>
          <div className="text-center">
            <Navigation className={`w-20 h-20 mx-auto mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'} animate-pulse`} />
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              3D Map Visualization
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Interactive route map with live bus tracking
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                <p className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {ROUTE_365J_STOPS.length}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Stops</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                <p className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {activeBuses.length}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Buses</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                <p className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  ~35
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
