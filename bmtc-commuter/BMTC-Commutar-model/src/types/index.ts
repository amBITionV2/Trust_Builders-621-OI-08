export interface User {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  routeName: string;
  currentStopIndex: number;
  totalSeats: number;
  availableSeats: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdated: Date;
  direction: 'forward' | 'reverse';
}

export interface Stop {
  id: string;
  routeNumber: string;
  stopName: string;
  stopIndex: number;
  latitude: number;
  longitude: number;
}

export interface Ticket {
  id: string;
  userId: string;
  busId: string;
  routeNumber: string;
  fromStop: string;
  toStop: string;
  fare: number;
  verificationCode: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  upiId: string;
  usageStatus: 'unused' | 'used' | 'expired';
  bookedAt: Date;
  verifiedAt?: Date;
  arrivalTime?: string;
  busNumber?: string;
  validUntil?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'eta' | 'seat' | 'payment' | 'ticket';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface FavoriteStop {
  id: string;
  userId: string;
  stopName: string;
  routeNumber: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'kn' | 'hi';
