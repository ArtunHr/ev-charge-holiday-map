import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station } from '../types';
import { AlertTriangle, MapPin, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const customMapStyles = `
  .leaflet-container {
    background: #050B12;
    font-family: var(--font-sans);
  }
  .leaflet-control-container {
    z-index: 40 !important;
  }
  .leaflet-popup-pane {
    z-index: 50 !important;
  }
  .dark-popup {
    z-index: 50 !important;
  }
  .dark-popup .leaflet-popup-content-wrapper {
    background: rgba(10, 22, 34, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(79, 216, 255, 0.3);
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(79, 216, 255, 0.1);
    color: #F8FAFC;
  }
  .dark-popup .leaflet-popup-tip {
    background: rgba(10, 22, 34, 0.95);
    border: 1px solid rgba(79, 216, 255, 0.3);
  }
  .leaflet-tile-pane {
    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
  }
`;

const normalIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div style="width: 20px; height: 20px; background: rgba(79, 216, 255, 0.2); border: 2px solid #4FD8FF; border-radius: 50%; box-shadow: 0 0 10px rgba(79, 216, 255, 0.8);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const fastIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div style="width: 24px; height: 24px; background: rgba(255, 179, 71, 0.2); border: 2px solid #FFB347; border-radius: 50%; box-shadow: 0 0 15px rgba(255, 179, 71, 0.8);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const selectedIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div style="width: 32px; height: 32px; background: rgba(79, 216, 255, 0.4); border: 3px solid #FFF; border-radius: 50%; box-shadow: 0 0 20px #4FD8FF, inset 0 0 10px #4FD8FF; animation: pulse 2s infinite;"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

interface Props {
  routePath: [number, number][];
  stations: Station[];
  selectedStationId?: string;
  onSelectStation: (station: Station | null) => void;
}

function MapUpdater({ selectedStationId, stations }: { selectedStationId?: string; stations: Station[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedStationId) {
      const station = stations.find(s => s.id === selectedStationId);
      if (station) {
        map.setView([station.latitude, station.longitude], 13, { animate: true });
      }
    }
  }, [selectedStationId, stations, map]);
  return null;
}

function MapOverlay({ children }: { children: React.ReactNode }) {
  const map = useMap();
  const mapPane = map.getContainer().querySelector('.leaflet-map-pane');
  if (!mapPane) return null;
  // Make sure it doesn't move with pan! No wait, leaflet-map-pane MOVES with pan!
  // If we don't want it to move, we can't put it here.
  return ReactDOM.createPortal(
    <div style={{ position: 'absolute', zIndex: 650, pointerEvents: 'none' }}>
      {/* We need to negate the current transform of the map pane? */}
      {/* Leaflet handles custom panes without moving by putting them OUTSIDE? No, all panes move. */}
      {children}
    </div>,
    mapPane
  );
}

export function MapView({ routePath, stations, selectedStationId, onSelectStation }: Props) {
  const defaultCenter: [number, number] = [37.6, 31.7];

  return (
    <div className="w-full h-full relative bg-[var(--color-dash-bg)]">
      <style>{customMapStyles}</style>
      
      {/* HUD Frame Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[10] shadow-[inset_0_0_100px_rgba(5,11,18,0.9)]"></div>
      
      {/* Corner crosshairs top-left */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[var(--color-dash-accent)]/30 z-[20] pointer-events-none rounded-tl-lg"></div>
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[30] pointer-events-none">
         <div className="glass-panel text-[var(--color-dash-text-pri)] px-4 py-2 rounded-full flex gap-2 items-center pointer-events-auto border-t-2 border-[var(--color-dash-amber)]/80 shadow-[0_4px_30px_rgba(255,179,71,0.15)]">
            <AlertTriangle className="w-4 h-4 text-[var(--color-dash-amber)] shrink-0" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-dash-text-sec)]">
               <span className="text-[var(--color-dash-amber)] mr-2">SYS ALR:</span>
               STATİK MVP VERİSİ - YOLA ÇIKMADAN DOĞRULAYIN
            </p>
         </div>
      </div>
      
      <MapContainer 
        center={defaultCenter} 
        zoom={9} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <Polyline 
          positions={routePath} 
          pathOptions={{ 
            color: '#4FD8FF', 
            weight: 6,
            opacity: 0.9,
          }} 
        />
        
        <Polyline 
          positions={routePath} 
          pathOptions={{ 
            color: '#4FD8FF', 
            weight: 12,
            opacity: 0.2,
          }} 
        />

        {stations.map(station => (
          <Marker 
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={selectedStationId === station.id ? selectedIcon : (station.isFastCharging ? fastIcon : normalIcon)}
            eventHandlers={{
              click: () => onSelectStation(station),
            }}
          >
            <Popup onClose={() => onSelectStation(null)} className="dark-popup !z-[50]">
              <div className="p-1 min-w-[240px] max-w-[280px] font-sans">
                 {station.imageUrl && (
                   <div className="relative mb-3 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[var(--color-dash-border)] bg-[var(--color-dash-bg-ter)] flex items-center justify-center min-h-[110px]">
                       <Zap className={cn("absolute w-8 h-8 z-0", station.isFastCharging ? "text-[var(--color-dash-amber)]" : "text-[var(--color-dash-text-ter)]")} />
                       <img 
                         src={station.imageUrl} 
                         alt={station.name} 
                         className="w-full h-28 object-cover opacity-80 relative z-10" 
                         referrerPolicy="no-referrer"
                         onError={(e) => { e.currentTarget.style.display = 'none'; }}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dash-bg-ter)] to-transparent z-20 pointer-events-none"></div>
                   </div>
                 )}
                 <div className="flex justify-between items-start mb-2 gap-2">
                   <h3 className="font-extrabold text-[14px] leading-tight flex-1 text-[var(--color-dash-text-pri)] uppercase">{station.name}</h3>
                   {station.isFastCharging && (
                     <span className="text-[8px] font-bold bg-[var(--color-dash-amber)]/20 text-[var(--color-dash-amber)] px-1.5 py-0.5 rounded border border-[var(--color-dash-amber)]/40 uppercase mt-0.5 shrink-0 shadow-[0_0_10px_rgba(255,179,71,0.2)] tracking-wider">HIZLI DC</span>
                   )}
                 </div>
                 
                 <div className="flex flex-wrap items-center gap-1.5 mb-3">
                   <span className="text-[10px] font-bold text-[var(--color-dash-text-sec)] bg-[var(--color-dash-bg)] px-2 py-0.5 rounded border border-[var(--color-dash-border)] uppercase">
                     {station.operator}
                   </span>
                   <span className="text-[10px] font-bold text-[var(--color-dash-accent)] bg-[var(--color-dash-accent)]/10 px-2 py-0.5 rounded border border-[var(--color-dash-accent)]/30">
                     ⚡ {station.chargingSpeedKw} kW
                   </span>
                 </div>
                 
                 <p className="text-[10px] text-[var(--color-dash-text-ter)] mb-3 leading-snug line-clamp-2 gap-1.5 flex items-start">
                    <MapPin className="w-3 h-3 shrink-0 mt-[1px] text-[var(--color-dash-text-sec)]" />
                    <span>{station.address}</span>
                 </p>
                 
                 <div className="flex flex-wrap gap-1 mb-3">
                   {station.connectorTypes.map(c => (
                     <span key={c} className="text-[9px] font-bold bg-black/40 text-[var(--color-dash-text-sec)] border border-[var(--color-dash-border)]/50 px-1.5 py-0.5 rounded uppercase tracking-widest">
                       {c}
                     </span>
                   ))}
                 </div>
                 
                 <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-[var(--color-dash-border)]/50 mb-3">
                   <div className="flex flex-col">
                      <span className="text-[8px] text-[var(--color-dash-text-ter)] uppercase tracking-wider">Konya'dan</span>
                      <span className="text-[11px] font-bold text-[var(--color-dash-accent)]">{station.distanceFromStartKm} km</span>
                   </div>
                   <div className="w-[1px] h-6 bg-[var(--color-dash-border)]/50"></div>
                   <div className="flex flex-col items-end">
                      <span className="text-[8px] text-[var(--color-dash-text-ter)] uppercase tracking-wider">Rotadan Sapma</span>
                      <span className="text-[11px] font-bold text-[var(--color-dash-text-pri)]">{station.distanceFromRouteKm} km</span>
                   </div>
                 </div>
                 
                 {station.notes && (
                   <div className="mb-3 px-2 py-2 bg-black/30 rounded border border-[var(--color-dash-border)]/30">
                     <p className="text-[10px] text-[var(--color-dash-text-ter)] font-medium leading-snug">
                       <span className="text-[var(--color-dash-accent)] mr-1">NOTE:</span> {station.notes}
                     </p>
                   </div>
                 )}
                 
                 <a 
                   href={station.navigationUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full text-center bg-[var(--color-dash-accent)] hover:bg-[var(--color-dash-accent-sec)] text-[var(--color-dash-bg)] text-[11px] uppercase tracking-widest font-extrabold py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(79,216,255,0.4)] mt-2"
                 >
                   YOL TARİFİ BAŞLAT
                 </a>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapUpdater selectedStationId={selectedStationId} stations={stations} />
      </MapContainer>
    </div>
  );
}
