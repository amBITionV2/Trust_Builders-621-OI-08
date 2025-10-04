import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ROUTE_365J_STOPS } from '../data/route365J';
import { CreditCard, ArrowRight, CheckCircle, Users, Clock, ArrowDown, ArrowUp } from 'lucide-react';
import { calculateFare, generateVerificationCode, calculateETA, calculateArrivalTime } from '../utils/helpers';
import { t } from '../utils/translations';

export const BookTicketPage: React.FC = () => {
  const { buses, bookTicket, theme, language } = useApp();
  const [fromStopIndex, setFromStopIndex] = useState<number>(-1);
  const [toStopIndex, setToStopIndex] = useState<number>(-1);
  const [selectedBusId, setSelectedBusId] = useState<string>('');
  const [selectedBusArrivalTime, setSelectedBusArrivalTime] = useState<string>('');
  const [upiId, setUpiId] = useState('');
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');
  const [bookedTicket, setBookedTicket] = useState<any>(null);

  const isDark = theme === 'dark';

  const getAvailableBuses = () => {
    if (fromStopIndex < 0) return [];

    return buses
      .filter(bus => {
        if (bus.status !== 'active' || bus.availableSeats === 0) return false;

        if (bus.direction === 'forward') {
          return bus.currentStopIndex <= fromStopIndex;
        } else {
          return bus.currentStopIndex >= fromStopIndex;
        }
      })
      .map(bus => {
        const eta = calculateETA(bus.currentStopIndex, fromStopIndex, bus.direction);
        const arrivalTime = calculateArrivalTime(eta);
        return {
          ...bus,
          eta,
          arrivalTime
        };
      })
      .filter(bus => bus.eta > 0)
      .sort((a, b) => a.eta - b.eta);
  };

  const availableBuses = getAvailableBuses();
  const fare = fromStopIndex >= 0 && toStopIndex >= 0 ? calculateFare(fromStopIndex, toStopIndex) : 0;

  const handleProceedToPayment = () => {
    if (fromStopIndex >= 0 && toStopIndex >= 0 && selectedBusId) {
      setStep('payment');
    }
  };

  const handleConfirmPayment = () => {
    if (!upiId) return;

    const selectedBus = buses.find(b => b.id === selectedBusId);
    if (!selectedBus) return;

    const verificationCode = generateVerificationCode();
    const validUntil = new Date();
    validUntil.setMinutes(validUntil.getMinutes() + 45);

    const ticketData = {
      busId: selectedBusId,
      routeNumber: '365J',
      fromStop: ROUTE_365J_STOPS[fromStopIndex].stopName,
      toStop: ROUTE_365J_STOPS[toStopIndex].stopName,
      fare,
      verificationCode,
      paymentStatus: 'completed' as const,
      upiId,
      usageStatus: 'unused' as const,
      arrivalTime: selectedBusArrivalTime,
      busNumber: selectedBus.busNumber,
      validUntil
    };

    bookTicket(ticketData);
    setBookedTicket(ticketData);
    setStep('success');
  };

  const handleBookAnother = () => {
    setFromStopIndex(-1);
    setToStopIndex(-1);
    setSelectedBusId('');
    setSelectedBusArrivalTime('');
    setUpiId('');
    setStep('select');
    setBookedTicket(null);
  };

  if (step === 'success' && bookedTicket) {
    return (
      <div className="space-y-6">
        <div className={`${isDark ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-400 to-green-600'} rounded-2xl shadow-2xl p-8 text-white text-center`}>
          <CheckCircle className="w-20 h-20 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">Ticket Booked!</h2>
          <p className="text-lg opacity-90">Your journey is confirmed</p>
        </div>

        <div
          className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="mb-6 text-center">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              E-Ticket
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Show this to the conductor
            </p>
          </div>

          <div className={`border-2 ${isDark ? 'border-yellow-600 bg-gray-700' : 'border-yellow-500 bg-yellow-50'} rounded-xl p-6 mb-6`}>
            <div className="text-center mb-6">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'} mb-2`}>
                {t('verificationCode', language)}
              </p>
              <p className={`text-5xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'} tracking-wider`}>
                {bookedTicket.verificationCode}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Bus Number:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{bookedTicket.busNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Bus Arrival Time:</span>
                <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>{bookedTicket.arrivalTime}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{t('from', language)}:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{bookedTicket.fromStop}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{t('to', language)}:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{bookedTicket.toStop}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{t('fare', language)}:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{bookedTicket.fare}</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{t('usageStatus', language)}:</span>
                <span className={`font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{t('unused', language)}</span>
              </div>
            </div>
          </div>

          {bookedTicket.validUntil && (
            <div className={`${isDark ? 'bg-gradient-to-r from-orange-900 to-red-900' : 'bg-gradient-to-r from-orange-100 to-red-100'} border-2 ${isDark ? 'border-orange-700' : 'border-orange-300'} rounded-xl p-4 mb-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-orange-300' : 'text-orange-900'} mb-1`}>
                    Ticket Valid Until
                  </p>
                  <p className={`text-xs ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                    This ticket expires in 45 minutes
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                    {new Date(bookedTicket.validUntil).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleBookAnother}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg transform hover:scale-105"
          >
            Book Another Ticket
          </button>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="space-y-6">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('confirmPayment', language)}
          </h2>

          <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-6 space-y-3`}>
            <div className="flex justify-between">
              <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Bus Arrival:</span>
              <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {selectedBusArrivalTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{t('from', language)}:</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {ROUTE_365J_STOPS[fromStopIndex].stopName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{t('to', language)}:</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {ROUTE_365J_STOPS[toStopIndex].stopName}
              </span>
            </div>
            <div className="flex justify-between text-lg">
              <span className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{t('fare', language)}:</span>
              <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>₹{fare}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('upiId', language)}
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20`}
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setStep('select')}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              } transition-all`}
            >
              Back
            </button>
            <button
              onClick={handleConfirmPayment}
              disabled={!upiId}
              className={`flex-1 py-3 rounded-xl font-semibold text-white ${
                upiId
                  ? 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg transform hover:scale-105'
                  : 'bg-gray-400 cursor-not-allowed'
              } transition-all`}
            >
              {t('pay', language)} ₹{fare}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('bookTicket', language)}
        </h2>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('from', language)}
            </label>
            <select
              value={fromStopIndex}
              onChange={(e) => {
                setFromStopIndex(Number(e.target.value));
                setToStopIndex(-1);
                setSelectedBusId('');
              }}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20`}
            >
              <option value={-1}>{t('selectStop', language)}</option>
              {ROUTE_365J_STOPS.slice(0, -1).map((stop, idx) => (
                <option key={stop.id} value={idx}>
                  {stop.stopName}
                </option>
              ))}
            </select>
          </div>

          {fromStopIndex >= 0 && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('to', language)}
              </label>
              <select
                value={toStopIndex}
                onChange={(e) => {
                  setToStopIndex(Number(e.target.value));
                  setSelectedBusId('');
                }}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20`}
              >
                <option value={-1}>{t('selectStop', language)}</option>
                {ROUTE_365J_STOPS.slice(fromStopIndex + 1).map((stop, idx) => (
                  <option key={stop.id} value={fromStopIndex + idx + 1}>
                    {stop.stopName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {toStopIndex >= 0 && (
            <div className={`p-4 rounded-xl ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'} border-2 ${isDark ? 'border-yellow-700' : 'border-yellow-300'}`}>
              <div className="flex items-center justify-between">
                <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('fare', language)}:
                </span>
                <span className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  ₹{fare}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {toStopIndex >= 0 && availableBuses.length > 0 && (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Available Buses Arriving at Your Stop
          </h3>

          <div className="space-y-3">
            {availableBuses.map(bus => (
              <button
                key={bus.id}
                onClick={() => {
                  setSelectedBusId(bus.id);
                  setSelectedBusArrivalTime(bus.arrivalTime);
                }}
                className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-102 ${
                  selectedBusId === bus.id
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg'
                    : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      selectedBusId === bus.id
                        ? 'bg-white text-yellow-600'
                        : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                    }`}>
                      {bus.busNumber}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className={`font-bold ${selectedBusId === bus.id ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'}`}>
                          Bus {bus.busNumber}
                        </p>
                        {bus.direction === 'forward' ? (
                          <ArrowDown className={`w-4 h-4 ${selectedBusId === bus.id ? 'text-white' : 'text-green-600'}`} />
                        ) : (
                          <ArrowUp className={`w-4 h-4 ${selectedBusId === bus.id ? 'text-white' : 'text-blue-600'}`} />
                        )}
                        <span className={`text-xs ${selectedBusId === bus.id ? 'text-yellow-100' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {bus.direction === 'forward' ? 'To Jigani' : 'To Kempegowda'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <p className={`text-sm flex items-center space-x-1 ${selectedBusId === bus.id ? 'text-yellow-100' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Clock className="w-3 h-3" />
                          <span>Arrives: {bus.arrivalTime}</span>
                        </p>
                        <span className={`text-xs ${selectedBusId === bus.id ? 'text-yellow-100' : isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          ({bus.eta} min)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="font-bold">{bus.availableSeats}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedBusId && (
            <button
              onClick={handleProceedToPayment}
              className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {toStopIndex >= 0 && availableBuses.length === 0 && (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center`}>
          <CreditCard className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`text-lg font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            No buses available for this route at the moment
          </p>
        </div>
      )}
    </div>
  );
};
