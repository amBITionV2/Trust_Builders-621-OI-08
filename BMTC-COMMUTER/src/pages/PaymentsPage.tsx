import React from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDate, formatTime } from '../utils/helpers';
import { t } from '../utils/translations';

export const PaymentsPage: React.FC = () => {
  const { tickets, theme, language } = useApp();
  const isDark = theme === 'dark';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return isDark ? 'text-green-400' : 'text-green-600';
      case 'failed':
        return isDark ? 'text-red-400' : 'text-red-600';
      default:
        return isDark ? 'text-yellow-400' : 'text-yellow-600';
    }
  };

  const getUsageStatusColor = (status: string) => {
    switch (status) {
      case 'unused':
        return isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'used':
        return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
      default:
        return isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('myTickets', language)}
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          View all your booked tickets and payment history
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-12 text-center`}>
          <CreditCard className={`w-20 h-20 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`text-lg font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            No tickets booked yet
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
            Book your first ticket to see it here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden transform hover:scale-102 transition-all`}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className={`${isDark ? 'bg-gradient-to-r from-yellow-900 to-yellow-800' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-yellow-600">
                        {ticket.routeNumber}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">
                        Route {ticket.routeNumber}
                      </p>
                      <p className="text-yellow-100 text-xs">
                        {formatDate(ticket.bookedAt)} • {formatTime(ticket.bookedAt)}
                      </p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getUsageStatusColor(ticket.usageStatus)}`}>
                    {t(ticket.usageStatus, language)}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('from', language)}
                    </p>
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {ticket.fromStop}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('to', language)}
                    </p>
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {ticket.toStop}
                    </p>
                  </div>
                </div>

                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('verificationCode', language)}
                    </span>
                    <span className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'} tracking-wider`}>
                      {ticket.verificationCode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(ticket.paymentStatus)}
                      <span className={`text-sm font-semibold ${getStatusColor(ticket.paymentStatus)}`}>
                        {t(ticket.paymentStatus, language)}
                      </span>
                    </div>
                    <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ₹{ticket.fare}
                    </span>
                  </div>

                  <div className={`mt-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    UPI ID: {ticket.upiId}
                  </div>
                </div>

                {ticket.validUntil && (
                  <div className={`${isDark ? 'bg-orange-900/30' : 'bg-orange-50'} border-2 ${isDark ? 'border-orange-700' : 'border-orange-300'} rounded-lg p-3`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-medium ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                        Valid Until:
                      </p>
                      <p className={`text-sm font-bold ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                        {formatTime(ticket.validUntil)}
                      </p>
                    </div>
                  </div>
                )}

                {ticket.usageStatus === 'unused' && (
                  <div className={`${isDark ? 'bg-green-900/30' : 'bg-green-50'} border-2 ${isDark ? 'border-green-700' : 'border-green-300'} rounded-lg p-3 text-center`}>
                    <p className={`text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                      ✓ Valid Ticket - Show to conductor
                    </p>
                  </div>
                )}

                {ticket.verifiedAt && (
                  <div className={`text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    Verified on: {formatDate(ticket.verifiedAt)} at {formatTime(ticket.verifiedAt)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
