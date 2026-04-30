import React from 'react';
import { PLAYLIST } from '../data/playlist';
import { Music, PlayCircle } from 'lucide-react';

export function PlaylistSection() {
  return (
    <div className="p-4 mt-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="system-label flex items-center gap-1.5 !text-[var(--color-dash-text-sec)]">
          <Music className="w-3.5 h-3.5" /> AUDIO MODULE
        </h2>
        <div className="flex gap-1">
           <div className="w-1 h-2 bg-[var(--color-dash-accent)]/80 animate-pulse rounded-full"></div>
           <div className="w-1 h-3 bg-[var(--color-dash-accent)]/60 animate-pulse rounded-full" style={{ animationDelay: '0.1s' }}></div>
           <div className="w-1 h-1.5 bg-[var(--color-dash-accent)]/90 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      <div className="dashboard-card p-2 space-y-1">
        {PLAYLIST.map((song, index) => (
          <div 
            key={song.id} 
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--color-dash-bg-ter)] border border-transparent hover:border-[var(--color-dash-border)]/50 transition-all group cursor-default"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-dash-accent)]/50 transition-colors relative overflow-hidden">
               <span className="text-[10px] font-bold text-[var(--color-dash-text-ter)] group-hover:hidden">{"0" + (index + 1)}</span>
               <PlayCircle className="w-4 h-4 text-[var(--color-dash-accent)] hidden group-hover:block relative z-10" />
               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-dash-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="flex-1 min-w-0">
               <h3 className="text-[12px] font-bold text-[var(--color-dash-text-pri)] truncate leading-tight group-hover:text-[var(--color-dash-accent)] transition-colors">{song.title}</h3>
               <p className="text-[10px] font-medium text-[var(--color-dash-text-ter)] truncate mt-0.5 tracking-wide">{song.artist}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-right">
               {song.mood && (
                  <span className="hidden sm:inline-block text-[8px] font-bold uppercase tracking-widest text-[var(--color-dash-text-sec)] bg-black/40 border border-[var(--color-dash-border)]/30 px-1.5 py-0.5 rounded shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                    {song.mood}
                  </span>
               )}
               {song.duration && (
                 <span className="text-[10px] font-bold text-[var(--color-dash-text-ter)] w-8 tracking-wider">{song.duration}</span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
