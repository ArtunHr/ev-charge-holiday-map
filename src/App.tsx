import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { MapView } from './components/MapView';
import { STATIC_ROUTE } from './data/route';
import { STATIC_STATIONS as STATIONS } from './data/stations';
import { RouteFilters, Station } from './types';
import { calculateRouteDistance } from './lib/geo';

export default function App() {
  const [filters, setFilters] = useState<RouteFilters>({
    maxDistanceKm: 5,
    isFastChargingOnly: false,
    connectorType: null
  });
  const [selectedStationId, setSelectedStationId] = useState<string | undefined>();

  // Extract unique connector types
  const availableConnectors = useMemo(() => {
    const connectors = new Set<string>();
    STATIONS.forEach(s => s.connectorTypes.forEach(c => connectors.add(c)));
    return Array.from(connectors).sort();
  }, []);

  // Calculate metrics
  const totalDistanceKm = useMemo(() => calculateRouteDistance(STATIC_ROUTE), []);
  const fastStations = useMemo(() => STATIONS.filter(s => s.isFastCharging).length, []);

  // Filter stations based on state
  const filteredStations = useMemo(() => {
    return STATIONS.filter(station => {
       if (station.distanceFromRouteKm > filters.maxDistanceKm) return false;
       if (filters.isFastChargingOnly && !station.isFastCharging) return false;
       if (filters.connectorType && !station.connectorTypes.includes(filters.connectorType)) return false;
       return true;
    });
  }, [filters]);

  const handleSelectStation = (station: Station | null) => {
    setSelectedStationId(station?.id);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-full bg-[var(--color-dash-bg)] text-[var(--color-dash-text-pri)] font-sans overflow-hidden">
      <Sidebar 
        totalDistanceKm={totalDistanceKm}
        filteredStations={filteredStations}
        totalStations={STATIONS.length}
        fastStations={fastStations}
        filters={filters}
        setFilters={setFilters}
        availableConnectors={availableConnectors}
        selectedStationId={selectedStationId}
        setSelectedStation={handleSelectStation}
      />
      <main className="flex-1 relative h-[50vh] md:h-full shrink-0 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-0">
        <MapView 
          routePath={STATIC_ROUTE} 
          stations={filteredStations} 
          selectedStationId={selectedStationId}
          onSelectStation={handleSelectStation}
        />
      </main>
    </div>
  );
}
