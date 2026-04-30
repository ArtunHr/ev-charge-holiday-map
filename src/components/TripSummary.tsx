import React from 'react';
import { Route, Clock, Zap, MapPin } from 'lucide-react';

interface Props {
  totalDistanceKm: number;
  totalStations: number;
  fastStations: number;
}

export function TripSummary({ totalDistanceKm, totalStations, fastStations }: Props) {
  return (
    <div className="dashboard-card p-5 mb-2 mx-2">
      <h2 className="system-label flex items-center justify-between mb-4">
        <span>Route Telemetry</span>
        <span className="text-[var(--color-dash-accent)]">TRIP DATA</span>
      </h2>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* Metric 1 */}
        <div className="bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] p-3 rounded-xl flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--color-dash-accent)] to-transparent opacity-5"></div>
          <div className="flex items-center gap-1.5 text-[var(--color-dash-text-ter)] mb-1">
            <Route className="w-3.5 h-3.5 text-[var(--color-dash-accent)]" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Toplam Rota</span>
          </div>
          <p className="text-xl font-bold text-[var(--color-dash-text-pri)] tracking-tight">
            {totalDistanceKm} <span className="text-xs font-semibold text-[var(--color-dash-text-ter)]">km</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] p-3 rounded-xl flex flex-col justify-center relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-[var(--color-dash-text-ter)] mb-1">
            <Clock className="w-3.5 h-3.5 text-[var(--color-dash-accent)]" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Süre (Tahmini)</span>
          </div>
          <p className="text-xl font-bold text-[var(--color-dash-text-pri)] tracking-tight">
            3 <span className="text-[10px] font-semibold text-[var(--color-dash-text-ter)] uppercase">sa</span> 29 <span className="text-[10px] font-semibold text-[var(--color-dash-text-ter)] uppercase">dk</span>
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] p-3 rounded-xl flex flex-col justify-center relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-[var(--color-dash-text-ter)] mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Şarj Noktası</span>
          </div>
          <p className="text-xl font-bold text-[var(--color-dash-text-pri)] tracking-tight">
            {totalStations} <span className="text-xs font-semibold text-[var(--color-dash-text-ter)]">İstasyon</span>
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-amber)]/40 p-3 rounded-xl flex flex-col justify-center relative overflow-hidden shadow-[inset_0_0_10px_rgba(255,179,71,0.05)]">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--color-dash-amber)] to-transparent opacity-10"></div>
          <div className="flex items-center gap-1.5 text-[var(--color-dash-amber)] mb-1 relative z-10">
            <Zap className="w-3.5 h-3.5 fill-[var(--color-dash-amber)]" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Hızlı Şarj (DC)</span>
          </div>
          <p className="text-xl font-bold text-[var(--color-dash-text-pri)] tracking-tight relative z-10">
            {fastStations} <span className="text-xs font-semibold text-[var(--color-dash-text-ter)]">İstasyon</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-bold text-[var(--color-dash-text-sec)] bg-[var(--color-dash-bg-ter)]/50 p-2.5 rounded-lg border border-[var(--color-dash-border)]/50">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-dash-accent)] shadow-[0_0_5px_var(--color-dash-accent)]"></div>
            <span className="tracking-wide">KONYA</span>
         </div>
         <div className="flex-1 h-[2px] bg-gradient-to-r from-[var(--color-dash-accent)]/20 via-[var(--color-dash-accent)]/10 to-transparent mx-4 relative">
           <div className="absolute top-[-2px] left-1/2 w-1 h-3 bg-[var(--color-dash-accent)]/30 rounded-full blur-[1px]"></div>
         </div>
         <div className="flex items-center gap-2">
            <span className="tracking-wide">INNVISTA</span>
            <MapPin className="w-3.5 h-3.5 text-[var(--color-dash-amber)]" />
         </div>
      </div>
    </div>
  );
}
