import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ROUTE_365J_STOPS } from '../data/route365J';
import { MapPin, Navigation, Star, Clock } from 'lucide-react';
import { findNearestStop, calculateETA } from '../utils/helpers';
import { t } from '../utils/translations';

export const NearestStopPage: React.FC = () => {
  const { buses, theme, language, favoriteStops, addFavoriteStop, removeFavoriteStop } = useApp();
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [nearestStop, setNearestStop] = useState<{ stopName: string; distance: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const isDark = theme === 'dark';

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          setUserLocation(loc);

          const nearest = findNearestStop(
            loc.lat,
            loc.lon,
            ROUTE_365J_STOPS.map(s => ({
              latitude: s.latitude,
              longitude: s.longitude,
              stopName: s.stopName
            }))
          );
          setNearestStop(nearest);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          const demoLoc = { lat: 12.9716, lon: 77.5946 };
          setUserLocation(demoLoc);

          const nearest = findNearestStop(
            demoLoc.lat,
            demoLoc.lon,
            ROUTE_365J_STOPS.map(s => ({
              latitude: s.latitude,
              longitude: s.longitude,
              stopName: s.stopName
            }))
          );
          setNearestStop(nearest);
          setIsLoadingLocation(false);
        }
      );
    } else {
      const demoLoc = { lat: 12.9716, lon: 77.5946 };
      setUserLocation(demoLoc);

      const nearest = findNearestStop(
        demoLoc.lat,
        demoLoc.lon,
        ROUTE_365J_STOPS.map(s => ({
          latitude: s.latitude,
          longitude: s.longitude,
          stopName: s.stopName
        }))
      );
      setNearestStop(nearest);
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const nearestStopData = nearestStop
    ? ROUTE_365J_STOPS.find(s => s.stopName === nearestStop.stopName)
    : null;

  const upcomingBuses = nearestStopData
    ? buses
        .filter(b => {
          if (b.direction === 'forward') {
            return b.currentStopIndex <= nearestStopData.stopIndex;
          } else {
            return b.currentStopIndex >= nearestStopData.stopIndex;
          }
        })
        .map(b => ({
          ...b,
          eta: calculateETA(b.currentStopIndex, nearestStopData.stopIndex, b.direction)
        }))
        .filter(b => b.eta > 0)
        .sort((a, b) => a.eta - b.eta)
    : [];

  const isFavorite = nearestStop
    ? favoriteStops.some(f => f.stopName === nearestStop.stopName)
    : false;

  const handleToggleFavorite = () => {
    if (!nearestStop) return;

    if (isFavorite) {
      const fav = favoriteStops.find(f => f.stopName === nearestStop.stopName);
      if (fav) removeFavoriteStop(fav.id);
    } else {
      addFavoriteStop(nearestStop.stopName, '365J');
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('nearestStop', language)}
        </h2>

        <button
          onClick={getUserLocation}
          disabled={isLoadingLocation}
          className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 ${
            isLoadingLocation
              ? isDark
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gray-200 text-gray-500'
              : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700'
          } transition-all shadow-lg transform hover:scale-105 active:scale-95`}
        >
          <Navigation className="w-5 h-5" />
          <span>
            {isLoadingLocation ? 'Detecting Location...' : 'Detect My Location'}
          </span>
        </button>
      </div>

      {nearestStop && nearestStopData && (
        <>
          <div className={`${isDark ? 'bg-gradient-to-br from-yellow-900 to-yellow-800' : 'bg-gradient-to-br from-yellow-400 to-yellow-600'} rounded-2xl shadow-2xl p-6 text-white`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-6 h-6" />
                  <span className="text-sm font-medium opacity-90">Nearest Stop</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{nearestStop.stopName}</h3>
                <p className="text-sm opacity-90">
                  {nearestStop.distance.toFixed(2)} km away
                </p>
              </div>

              <button
                onClick={handleToggleFavorite}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all transform hover:scale-110"
              >
                <Star
                  className={`w-6 h-6 ${isFavorite ? 'fill-white' : ''}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-80 mb-1">Stop Number</p>
                <p className="text-lg font-bold">{nearestStopData.stopIndex + 1}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-80 mb-1">Route</p>
                <p className="text-lg font-bold">365J</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('nextBusIn', language)}
            </h3>

            {upcomingBuses.length > 0 ? (
              <div className="space-y-3">
                {upcomingBuses.map(bus => (
                  <div
                    key={bus.id}
                    className={`p-4 rounded-xl ${
                      isDark ? 'bg-gray-700' : 'bg-gray-50'
                    } flex items-center justify-between transform hover:scale-102 transition-all`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {bus.busNumber}
                      </div>
                      <div>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Bus {bus.busNumber}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {bus.availableSeats} {t('availableSeats', language).toLowerCase()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {bus.eta} {t('minutes', language)}
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                        {t('eta', language)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming buses at this stop</p>
              </div>
            )}
          </div>

          {favoriteStops.length > 0 && (
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Favorite Stops
              </h3>
              <div className="space-y-2">
                {favoriteStops.map(fav => (
                  <div
                    key={fav.id}
                    className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}
                  >
                    <div className="flex items-center space-x-3">
                      <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {fav.stopName}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFavoriteStop(fav.id)}
                      className={`text-xs px-3 py-1 rounded ${
                        isDark
                          ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      } transition-all`}
                    >
                      Remove
                    </button>
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
