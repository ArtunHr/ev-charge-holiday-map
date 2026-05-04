import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station } from '../types';
import { AlertTriangle, MapPin, Zap, X } from 'lucide-react';
import { cn } from '../lib/utils';

const customMapStyles = `
  .leaflet-container {
    background: #050B12;
    font-family: var(--font-sans);
  }
  .leaflet-control-container {
    z-index: 400 !important; /* Allow custom HUD to be above standard controls if needed, or vice-versa */
  }
  .leaflet-popup-pane {
    z-index: 1000 !important; /* Put popup completely above everything */
  }
  .dark-popup {
    /* removed override */
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
        map.panTo([station.latitude, station.longitude], { animate: true });
      }
    }
  }, [selectedStationId, stations, map]);
  return null;
}

export function MapView({ routePath, stations, selectedStationId, onSelectStation }: Props) {
  const defaultCenter: [number, number] = [37.6, 31.7];

  const clickCounts = useRef<Record<string, number>>({});
  const [showZesAd, setShowZesAd] = useState(false);

  const handleMarkerClick = (station: Station) => {
    onSelectStation(station);
    const count = (clickCounts.current[station.id] || 0) + 1;
    clickCounts.current[station.id] = count;
    if (count === 3) {
      setShowZesAd(true);
      setTimeout(() => {
        setShowZesAd(false);
        clickCounts.current[station.id] = 0;
      }, 10000);
    }
  };

  return (
    <div className="w-full h-full relative bg-[var(--color-dash-bg)]">
      {/* ZES Ad Overlay */}
      {showZesAd && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity">
           <div className="relative bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(79,216,255,0.3)] max-w-sm w-full p-6 text-center animate-in fade-in zoom-in duration-300">
             <button 
               onClick={() => {
                 setShowZesAd(false);
                 Object.keys(clickCounts.current).forEach(key => clickCounts.current[key] = 0);
               }} 
               className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
             <img src="/zes.png" alt="ZES İstasyonları" className="w-full h-32 object-contain mb-6 drop-shadow-xl" />
             <h2 className="text-xl font-bold text-[var(--color-dash-text-pri)] mb-3 uppercase tracking-wide">Alternatif Arıyorsanız!</h2>
             <p className="text-[var(--color-dash-accent)] text-sm mb-6 leading-relaxed">
               ZES istasyonlarında da hızlı ve güvenilir şarj deneyimini yaşayabilirsiniz. Yolculuğunuza kesintisiz devam edin!
             </p>
             <div className="text-[10px] text-[var(--color-dash-text-ter)] uppercase tracking-widest bg-black/30 py-2 rounded-lg border border-[var(--color-dash-border)]/50">
               Bu mesaj 10 saniye içinde kapanacaktır
             </div>
           </div>
        </div>
      )}

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
              click: () => handleMarkerClick(station),
            }}
          >
            <Popup onClose={() => onSelectStation(null)} className="dark-popup" maxWidth={240} minWidth={180} autoPanPaddingTopLeft={[0, 80]}>
               <div className="p-1 w-[220px] font-sans">
                 {station.imageUrl && (
                   <div className="relative mb-2 rounded-xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-[var(--color-dash-border)] bg-[var(--color-dash-bg-ter)] flex items-center justify-center h-[90px]">
                       <Zap className={cn("absolute w-5 h-5 z-0 opacity-20", station.isFastCharging ? "text-[var(--color-dash-amber)]" : "text-[var(--color-dash-text-ter)]")} />
                       <img 
                         src={station.imageUrl} 
                         alt={station.name} 
                         className="w-full h-full object-contain p-3 relative z-10 bg-[var(--color-dash-bg)]" 
                         referrerPolicy="no-referrer"
                         onError={(e) => { e.currentTarget.style.display = 'none'; }}
                       />
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
                   <div className="mb-2 px-2 py-1.5 bg-black/30 rounded border border-[var(--color-dash-border)]/30">
                     <p className="text-[9px] text-[var(--color-dash-text-sec)] font-medium leading-[1.3]">
                       <span className="text-[var(--color-dash-accent)] mr-1">SYS:</span> {station.notes}
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
