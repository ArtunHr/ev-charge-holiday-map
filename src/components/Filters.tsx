import React from 'react';
import { RouteFilters } from '../types';
import { cn } from '../lib/utils';
import { Settings2 } from 'lucide-react';

interface Props {
  filters: RouteFilters;
  onChange: (filters: RouteFilters) => void;
  availableConnectors: string[];
}

export function Filters({ filters, onChange, availableConnectors }: Props) {
  return (
    <div className="bg-transparent border-b border-[var(--color-dash-border)]/50 shrink-0">
      <div className="px-5 py-5 space-y-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="system-label flex items-center gap-1.5 !text-[var(--color-dash-text-sec)]">
            <Settings2 className="w-3.5 h-3.5" /> FİLTRELER
          </h2>
        </div>

        <div>
          <label className="text-[10px] font-bold text-[var(--color-dash-text-ter)] mb-2.5 block uppercase tracking-wide">Maksimum Sapma</label>
          <div className="flex flex-wrap gap-2">
            {[1, 3, 5, 10, 20].map(d => (
              <button
                key={d}
                onClick={() => onChange({...filters, maxDistanceKm: d})}
                className={cn(
                  "px-4 py-1.5 text-xs rounded-full font-bold transition-all border",
                  filters.maxDistanceKm === d 
                    ? "bg-[var(--color-dash-accent)]/10 border-[var(--color-dash-accent)] text-[var(--color-dash-accent)] shadow-[0_0_10px_rgba(79,216,255,0.2)]" 
                    : "bg-[var(--color-dash-bg-ter)] border-[var(--color-dash-border)] text-[var(--color-dash-text-ter)] hover:border-[var(--color-dash-border-hover)] hover:text-[var(--color-dash-text-sec)]"
                )}
              >
                {d} km
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-[var(--color-dash-text-ter)] mb-2.5 block uppercase tracking-wide">Soket Tipi</label>
          <div className="flex flex-wrap gap-2">
             <button
                onClick={() => onChange({...filters, connectorType: null})}
                className={cn(
                  "px-4 py-1.5 text-xs rounded-full font-bold transition-all border",
                  filters.connectorType === null 
                    ? "bg-[var(--color-dash-accent)]/10 border-[var(--color-dash-accent)] text-[var(--color-dash-accent)] shadow-[0_0_10px_rgba(79,216,255,0.2)]" 
                    : "bg-[var(--color-dash-bg-ter)] border-[var(--color-dash-border)] text-[var(--color-dash-text-ter)] hover:border-[var(--color-dash-border-hover)] hover:text-[var(--color-dash-text-sec)]"
                )}
              >Tümü</button>
            {availableConnectors.map(c => (
              <button
                key={c}
                onClick={() => onChange({...filters, connectorType: c})}
                className={cn(
                  "px-4 py-1.5 text-xs rounded-full font-bold transition-all border",
                  filters.connectorType === c 
                    ? "bg-[var(--color-dash-accent)]/10 border-[var(--color-dash-accent)] text-[var(--color-dash-accent)] shadow-[0_0_10px_rgba(79,216,255,0.2)]" 
                    : "bg-[var(--color-dash-bg-ter)] border-[var(--color-dash-border)] text-[var(--color-dash-text-ter)] hover:border-[var(--color-dash-border-hover)] hover:text-[var(--color-dash-text-sec)]"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between cursor-pointer pt-3 pb-1">
          <span className="text-[11px] font-bold text-[var(--color-dash-text-sec)] uppercase tracking-wide">Sadece Hızlı Şarj (DC)</span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={filters.isFastChargingOnly}
              onChange={(e) => onChange({...filters, isFastChargingOnly: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[var(--color-dash-text-ter)] peer-checked:after:bg-[var(--color-dash-accent)] after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[var(--color-dash-accent)]/20 peer-checked:border-[var(--color-dash-accent)]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
          </div>
        </label>
      </div>
    </div>
  );
}
