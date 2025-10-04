export interface Stop {
  stop_no: number;
  stop_name: string;
  gps_coordinates: string;
  people_detected_cctv: number;
  arrival_rate: number;
  next_bus_eta: string;
  bus_seats_available: number;
  recommended_action: string;
  inside_buses: Bus[];
  etm_data: {
    boarding: number;
    alighting: number;
  };
  incident_flag: boolean;
  congestion_level: 'low' | 'medium' | 'high';
  coordinates: {
    lat: number;
    lng: number;
  };
  congestion_percentage: number;
  waiting_passengers: number;
  lastDispatchTime?: number;
}

export interface Bus {
  bus_id: string;
  driver: string;
  vehicle_no: string;
  current_onboard: number;
  max_capacity: number;
  eta?: string;
  status: 'active' | 'spare_needed' | 'maintenance' | 'dispatched';
  current_stop?: number;
  dispatch_time?: string;
  destination_stop?: number;
}

export interface RouteData {
  route: string;
  depot: string;
  stops: Stop[];
  total_buses: number;
  active_buses: number;
  spare_buses_needed: number;
}

export interface Notification {
  id: string;
  type: 'delay' | 'crowd' | 'cctv' | 'dispatch' | 'maintenance';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface PeakHourData {
  morning_peak: {
    [stopName: string]: number;
  };
  evening_peak: {
    [stopName: string]: number;
  };
}

export interface HistoricalData {
  date: string;
  hour: number;
  stop_no: number;
  boarded: number;
  deboarded: number;
  waiting: number;
  total_in_bus: number;
  congestion_percentage: number;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}