import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { createPortal } from 'react-dom';

export function MapAlert({ children }: { children: React.ReactNode }) {
  const map = useMap();
  const alertContainer = useRef(L.DomUtil.create('div'));

  useEffect(() => {
    const container = alertContainer.current;
    
    // Mount inside the map container directly!
    // But since we want it above map but below popup, we can just append it to leaflet-map-pane
    // and give it a z-index of 500!
    // leaflet-popup-pane has z-index 700.
    const mapPane = map.getPane('mapPane');
    if (mapPane) {
      mapPane.appendChild(container);
    }
    
    // Position it at the top center
    container.className = "absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none";
    container.style.zIndex = "650"; // 650 is above markers (600) but below popups (700)!

    L.DomEvent.disableClickPropagation(container);

    return () => {
      container.remove();
    };
  }, [map]);

  return createPortal(children, alertContainer.current);
}
