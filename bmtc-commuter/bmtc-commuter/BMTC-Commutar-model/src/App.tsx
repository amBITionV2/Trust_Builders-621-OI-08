import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { LiveTrackPage } from './pages/LiveTrackPage';
import { RoutesPage } from './pages/RoutesPage';
import { NearestStopPage } from './pages/NearestStopPage';
import { BookTicketPage } from './pages/BookTicketPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { user } = useApp();
  const [currentTab, setCurrentTab] = useState('liveTrack');

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentTab) {
      case 'liveTrack':
        return <LiveTrackPage />;
      case 'routes':
        return <RoutesPage />;
      case 'nearestStop':
        return <NearestStopPage />;
      case 'bookTicket':
        return <BookTicketPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LiveTrackPage />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
