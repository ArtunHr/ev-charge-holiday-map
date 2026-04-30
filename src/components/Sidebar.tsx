import React from 'react';
import { TripSummary } from './TripSummary';
import { Filters } from './Filters';
import { StationList } from './StationList';
import { PlaylistSection } from './PlaylistSection';
import { RouteFilters, Station } from '../types';

interface SidebarProps {
  totalDistanceKm: number;
  filteredStations: Station[];
  totalStations: number;
  fastStations: number;
  filters: RouteFilters;
  setFilters: (f: RouteFilters) => void;
  availableConnectors: string[];
  selectedStationId?: string;
  setSelectedStation: (station: Station) => void;
}

export function Sidebar({
  totalDistanceKm,
  filteredStations,
  totalStations,
  fastStations,
  filters,
  setFilters,
  availableConnectors,
  selectedStationId,
  setSelectedStation
}: SidebarProps) {
  return (
    <aside className="w-full md:w-[420px] bg-[var(--color-dash-bg-sec)] border-r border-[var(--color-dash-border)] flex flex-col shrink-0 z-10 overflow-y-auto h-1/2 md:h-full md:max-h-screen custom-scrollbar shadow-2xl relative">
      {/* Detail Accent Line */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-dash-accent)] to-transparent opacity-20 pointer-events-none"></div>

      {/* Header Info */}
      <div className="px-6 py-10 bg-gradient-to-b from-[var(--color-dash-bg-ter)] to-transparent shrink-0 relative border-b border-[var(--color-dash-border)]/50">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--color-dash-accent)] to-transparent opacity-50"></div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--color-dash-accent)] shadow-[0_0_8px_var(--color-dash-accent)] animate-pulse"></span>
          <span className="system-label text-[10px] !text-[var(--color-dash-accent)]">ROUTE ACTIVE</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2 leading-tight text-[var(--color-dash-text-pri)]">
          Innvista Hotel Tatil Rotası
        </h1>
        <p className="text-xs text-[var(--color-dash-text-ter)] font-medium leading-relaxed tracking-wide">
          Artun, Fatih ve Utku için Artun tarafından tasarlanmıştır.
        </p>
      </div>

      <div className="flex flex-col gap-1 p-2">
        <TripSummary 
          totalDistanceKm={totalDistanceKm} 
          totalStations={totalStations} 
          fastStations={fastStations} 
        />

        <Filters 
          filters={filters} 
          onChange={setFilters} 
          availableConnectors={availableConnectors} 
        />

        <StationList 
          stations={filteredStations} 
          selectedStationId={selectedStationId} 
          onStationClick={setSelectedStation} 
        />

        <PlaylistSection />
      </div>
    </aside>
  );
}
