import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Bus, Ticket, Notification, FavoriteStop, Theme, Language } from '../types';
import { ROUTE_365J_STOPS } from '../data/route365J';

interface AppContextType {
  user: User | null;
  theme: Theme;
  language: Language;
  buses: Bus[];
  tickets: Ticket[];
  notifications: Notification[];
  favoriteStops: FavoriteStop[];
  login: (mobile: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  bookTicket: (ticket: Omit<Ticket, 'id' | 'userId' | 'bookedAt'>) => void;
  markNotificationRead: (id: string) => void;
  addFavoriteStop: (stopName: string, routeNumber: string) => void;
  removeFavoriteStop: (id: string) => void;
  updateBusPosition: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('en');
  const [buses, setBuses] = useState<Bus[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [favoriteStops, setFavoriteStops] = useState<FavoriteStop[]>([]);

  useEffect(() => {
    const maxStopIndex = ROUTE_365J_STOPS.length - 1;

    const initialBuses: Bus[] = [
      {
        id: 'bus-1',
        busNumber: '365J',
        routeName: 'Kempegowda Bus Station → Jigani A.P.C. Circle',
        currentStopIndex: 0,
        totalSeats: 40,
        availableSeats: 28,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'forward'
      },
      {
        id: 'bus-2',
        busNumber: '365J',
        routeName: 'Kempegowda Bus Station → Jigani A.P.C. Circle',
        currentStopIndex: 8,
        totalSeats: 40,
        availableSeats: 15,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'forward'
      },
      {
        id: 'bus-3',
        busNumber: '365J',
        routeName: 'Kempegowda Bus Station → Jigani A.P.C. Circle',
        currentStopIndex: 15,
        totalSeats: 40,
        availableSeats: 22,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'forward'
      },
      {
        id: 'bus-4',
        busNumber: '365J',
        routeName: 'Kempegowda Bus Station → Jigani A.P.C. Circle',
        currentStopIndex: 25,
        totalSeats: 40,
        availableSeats: 18,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'forward'
      },
      {
        id: 'bus-5',
        busNumber: '365J',
        routeName: 'Kempegowda Bus Station → Jigani A.P.C. Circle',
        currentStopIndex: 35,
        totalSeats: 40,
        availableSeats: 30,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'forward'
      },
      {
        id: 'bus-6',
        busNumber: '365J',
        routeName: 'Jigani A.P.C. Circle → Kempegowda Bus Station',
        currentStopIndex: 41,
        totalSeats: 40,
        availableSeats: 25,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'reverse'
      },
      {
        id: 'bus-7',
        busNumber: '365J',
        routeName: 'Jigani A.P.C. Circle → Kempegowda Bus Station',
        currentStopIndex: 33,
        totalSeats: 40,
        availableSeats: 12,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'reverse'
      },
      {
        id: 'bus-8',
        busNumber: '365J',
        routeName: 'Jigani A.P.C. Circle → Kempegowda Bus Station',
        currentStopIndex: 26,
        totalSeats: 40,
        availableSeats: 20,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'reverse'
      },
      {
        id: 'bus-9',
        busNumber: '365J',
        routeName: 'Jigani A.P.C. Circle → Kempegowda Bus Station',
        currentStopIndex: 18,
        totalSeats: 40,
        availableSeats: 16,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'reverse'
      },
      {
        id: 'bus-10',
        busNumber: '365J',
        routeName: 'Jigani A.P.C. Circle → Kempegowda Bus Station',
        currentStopIndex: 10,
        totalSeats: 40,
        availableSeats: 32,
        status: 'active',
        lastUpdated: new Date(),
        direction: 'reverse'
      }
    ];
    setBuses(initialBuses);

    const interval = setInterval(() => {
      updateBusPosition();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const login = async (mobile: string, password: string): Promise<boolean> => {
    if (mobile && password) {
      const newUser: User = {
        id: 'user-1',
        fullName: 'John Doe',
        mobile,
        email: `${mobile}@example.com`
      };
      setUser(newUser);

      setNotifications([{
        id: `notif-${Date.now()}`,
        userId: newUser.id,
        type: 'ticket',
        title: 'Welcome to BMTC!',
        message: 'Your account has been successfully logged in.',
        isRead: false,
        createdAt: new Date()
      }]);

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTickets([]);
    setNotifications([]);
    setFavoriteStops([]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const bookTicket = (ticketData: Omit<Ticket, 'id' | 'userId' | 'bookedAt'>) => {
    if (!user) return;

    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      userId: user.id,
      bookedAt: new Date()
    };

    setTickets(prev => [newTicket, ...prev]);

    setNotifications(prev => [{
      id: `notif-${Date.now()}`,
      userId: user.id,
      type: 'ticket',
      title: 'Ticket Booked Successfully',
      message: `Your ticket from ${ticketData.fromStop} to ${ticketData.toStop} has been booked. Bus arrives at ${ticketData.arrivalTime}. Verification code: ${ticketData.verificationCode}`,
      isRead: false,
      createdAt: new Date()
    }, ...prev]);

    const busIndex = buses.findIndex(b => b.id === ticketData.busId);
    if (busIndex !== -1) {
      setBuses(prev => {
        const updated = [...prev];
        updated[busIndex] = {
          ...updated[busIndex],
          availableSeats: Math.max(0, updated[busIndex].availableSeats - 1)
        };
        return updated;
      });
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  const addFavoriteStop = (stopName: string, routeNumber: string) => {
    if (!user) return;
    const newFav: FavoriteStop = {
      id: `fav-${Date.now()}`,
      userId: user.id,
      stopName,
      routeNumber
    };
    setFavoriteStops(prev => [...prev, newFav]);
  };

  const removeFavoriteStop = (id: string) => {
    setFavoriteStops(prev => prev.filter(fav => fav.id !== id));
  };

  const updateBusPosition = () => {
    const maxStopIndex = ROUTE_365J_STOPS.length - 1;

    setBuses(prev => prev.map(bus => {
      if (bus.status !== 'active') return bus;

      let newIndex = bus.currentStopIndex;
      let newDirection = bus.direction;

      if (bus.direction === 'forward') {
        if (bus.currentStopIndex < maxStopIndex) {
          newIndex = bus.currentStopIndex + 1;
        } else {
          newDirection = 'reverse';
          newIndex = maxStopIndex - 1;
        }
      } else {
        if (bus.currentStopIndex > 0) {
          newIndex = bus.currentStopIndex - 1;
        } else {
          newDirection = 'forward';
          newIndex = 1;
        }
      }

      const seatChange = Math.floor(Math.random() * 5) - 2;
      const newAvailableSeats = Math.max(0, Math.min(bus.totalSeats, bus.availableSeats + seatChange));

      const newRouteName = newDirection === 'forward'
        ? 'Kempegowda Bus Station → Jigani A.P.C. Circle'
        : 'Jigani A.P.C. Circle → Kempegowda Bus Station';

      return {
        ...bus,
        currentStopIndex: newIndex,
        direction: newDirection,
        routeName: newRouteName,
        availableSeats: newAvailableSeats,
        lastUpdated: new Date()
      };
    }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        theme,
        language,
        buses,
        tickets,
        notifications,
        favoriteStops,
        login,
        logout,
        toggleTheme,
        setLanguage,
        bookTicket,
        markNotificationRead,
        addFavoriteStop,
        removeFavoriteStop,
        updateBusPosition
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
