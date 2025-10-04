export const generateVerificationCode = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const calculateFare = (fromIndex: number, toIndex: number): number => {
  const distance = Math.abs(toIndex - fromIndex);
  const baseFare = 10;

  if (distance <= 5) {
    return baseFare;
  } else if (distance <= 10) {
    return 15;
  } else if (distance <= 15) {
    return 20;
  } else if (distance <= 20) {
    return 25;
  } else if (distance <= 30) {
    return 35;
  } else {
    return 50;
  }
};

export const calculateETA = (currentIndex: number, targetIndex: number, direction: 'forward' | 'reverse'): number => {
  let stopsAway = 0;

  if (direction === 'forward') {
    if (targetIndex <= currentIndex) return 0;
    stopsAway = targetIndex - currentIndex;
  } else {
    if (targetIndex >= currentIndex) return 0;
    stopsAway = currentIndex - targetIndex;
  }

  const minutesPerStop = 3;
  return stopsAway * minutesPerStop;
};

export const calculateArrivalTime = (etaMinutes: number): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + etaMinutes);
  return formatTime(now);
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const findNearestStop = (userLat: number, userLon: number, stops: Array<{ latitude: number; longitude: number; stopName: string }>): { stopName: string; distance: number } | null => {
  if (stops.length === 0) return null;

  let nearest = stops[0];
  let minDistance = getDistance(userLat, userLon, nearest.latitude, nearest.longitude);

  for (let i = 1; i < stops.length; i++) {
    const distance = getDistance(userLat, userLon, stops[i].latitude, stops[i].longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = stops[i];
    }
  }

  return { stopName: nearest.stopName, distance: minDistance };
};
