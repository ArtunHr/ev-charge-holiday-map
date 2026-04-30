export interface Station {
  id: string;
  name: string;
  operator: string;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  connectorTypes: string[];
  chargingSpeedKw: number;
  isFastCharging: boolean;
  distanceFromRouteKm: number;
  distanceFromStartKm?: number;
  notes?: string;
  navigationUrl: string;
  imageUrl?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration?: string;
  mood?: string;
}

export interface RouteFilters {
  maxDistanceKm: number;
  isFastChargingOnly: boolean;
  connectorType: string | null;
}

