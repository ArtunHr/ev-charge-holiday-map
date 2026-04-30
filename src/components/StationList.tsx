import React from 'react';
import { Station } from '../types';
import { cn } from '../lib/utils';
import { Zap, MapPin } from 'lucide-react';

interface Props {
  stations: Station[];
  selectedStationId?: string;
  onStationClick: (station: Station) => void;
}

export function StationList({ stations, selectedStationId, onStationClick }: Props) {
  return (
    <div className="flex-1 shrink-0 relative flex flex-col mt-2">
      <div className="px-5 py-3 border-b border-[var(--color-dash-border)]/50 flex justify-between items-center bg-[var(--color-dash-bg-sec)]/50">
        <h3 className="system-label flex items-center gap-1.5 !text-[var(--color-dash-text-sec)]">
          <Zap className="w-3.5 h-3.5" /> İSTASYON LİSTESİ
        </h3>
        <span className="text-[10px] font-bold bg-[var(--color-dash-accent)] text-[var(--color-dash-bg)] px-2 py-0.5 rounded-full">{stations.length}</span>
      </div>

      {stations.length === 0 ? (
        <div className="text-center text-[var(--color-dash-text-ter)] py-12 px-6">
          <Zap className="mx-auto mb-3 opacity-20 text-[var(--color-dash-text-sec)]" size={48} />
          <p className="text-xs uppercase tracking-wider font-bold">Seçili filtrelere uygun istasyon bulunamadı.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-2">
          {stations.map(station => (
            <div
              key={station.id}
              onClick={() => onStationClick(station)}
              className={cn(
                "dashboard-card p-4 flex gap-4 cursor-pointer relative overflow-hidden group",
                selectedStationId === station.id 
                   ? "border-[var(--color-dash-accent)] shadow-[0_0_20px_rgba(79,216,255,0.15)] bg-[var(--color-dash-panel-hover)]" 
                   : "border-[var(--color-dash-border)] hover:border-[var(--color-dash-border-hover)]"
              )}
            >
               {selectedStationId === station.id && (
                 <div className="absolute top-0 left-0 bottom-0 w-1 bg-[var(--color-dash-accent)] shadow-[0_0_10px_var(--color-dash-accent)]"></div>
               )}
               
               <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border text-[10px] font-bold overflow-hidden object-cover relative", 
                 selectedStationId === station.id ? "border-[var(--color-dash-accent)]/50 shadow-[0_0_15px_rgba(79,216,255,0.2)]" : "border-[var(--color-dash-border)]"
               )}>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-30 pointer-events-none"></div>
                 {station.imageUrl && (
                   <img src={station.imageUrl} alt={station.name} className="w-full h-full object-cover relative z-20" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                 )}
                 <Zap className={cn("absolute inline-block w-6 h-6 z-0", station.isFastCharging ? "text-[var(--color-dash-amber)]" : "text-[var(--color-dash-text-ter)]")} />
               </div>
               
               <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start mb-1.5 gap-2">
                     <h3 className={cn("text-[13px] font-bold leading-tight truncate transition-colors", selectedStationId === station.id ? "text-[var(--color-dash-accent)]" : "text-[var(--color-dash-text-pri)]")}>
                       {station.name}
                     </h3>
                     {station.isFastCharging && (
                       <span className="text-[8px] font-bold bg-[var(--color-dash-amber)]/20 text-[var(--color-dash-amber)] border border-[var(--color-dash-amber)]/40 px-1.5 py-0.5 rounded uppercase shrink-0 tracking-wider">HIZLI DC</span>
                     )}
                   </div>
                   
                   <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                     <span className="text-[10px] font-bold text-[var(--color-dash-text-sec)] bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] px-2 py-0.5 rounded shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                       {station.operator}
                     </span>
                     <span className="text-[10px] font-bold text-[var(--color-dash-accent)] bg-[var(--color-dash-accent)]/10 px-2 py-0.5 rounded border border-[var(--color-dash-accent)]/30">
                       ⚡ {station.chargingSpeedKw} kW
                     </span>
                   </div>

                   <p className="text-[10px] text-[var(--color-dash-text-ter)] mb-2 leading-snug flex items-start gap-1.5 relative">
                     <MapPin className="w-3 h-3 shrink-0 mt-[1px] text-[var(--color-dash-text-sec)]" />
                     <span className="line-clamp-1">{station.address}</span>
                   </p>
                   
                   {station.notes && selectedStationId === station.id && (
                     <div className="mb-3 px-2.5 py-2 bg-[var(--color-dash-bg-ter)]/50 rounded-lg border border-[var(--color-dash-border)]/50">
                       <p className="text-[10px] text-[var(--color-dash-text-sec)] font-medium leading-snug">
                         <span className="text-[var(--color-dash-accent)] mr-1">INFO:</span> {station.notes}
                       </p>
                     </div>
                   )}
                   
                   <div className="flex items-center justify-between text-[9px] font-bold mt-2 pt-2 border-t border-[var(--color-dash-border)]/30">
                     <div className="flex flex-wrap gap-1">
                       {station.connectorTypes.map(c => (
                          <span key={c} className="text-[var(--color-dash-text-ter)] bg-black/20 px-1.5 py-0.5 rounded border border-[var(--color-dash-border)]/50 uppercase tracking-widest">{c}</span>
                       ))}
                     </div>
                     <div className="flex flex-col items-end gap-1">
                        <span className="text-[var(--color-dash-accent)] bg-black/20 px-1.5 py-0.5 rounded border border-[var(--color-dash-accent)]/30 uppercase tracking-widest text-[9.5px]">Konya'dan: {station.distanceFromStartKm} km</span>
                        <span className="text-[var(--color-dash-text-ter)] bg-black/20 px-1.5 py-0.5 rounded border border-[var(--color-dash-border)]/50 uppercase tracking-widest text-[8.5px]">Sapma: {station.distanceFromRouteKm} km</span>
                     </div>
                   </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
