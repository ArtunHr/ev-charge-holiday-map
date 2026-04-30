import React from 'react';
import { PLAYLIST } from '../data/playlist';
import { Music, PlayCircle } from 'lucide-react';

export function PlaylistSection() {
  return (
    <div className="p-4 mt-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex flex-col">
          <h2 className="system-label flex items-center gap-1.5 !text-[var(--color-dash-text-sec)]">
            <Music className="w-3.5 h-3.5" /> YOLDA DİNLENECEK ŞARKILAR
          </h2>
          <p className="text-[10px] text-amber-500/80 mt-1 pl-5">2012 yaz hitleri tadında tatil yolu seçkisi</p>
        </div>
        <div className="flex gap-1 pl-2">
           <div className="w-1 h-2 bg-gradient-to-t from-amber-500 to-orange-400 animate-pulse rounded-full"></div>
           <div className="w-1 h-3 bg-gradient-to-t from-amber-500 to-orange-400 animate-pulse rounded-full" style={{ animationDelay: '0.1s' }}></div>
           <div className="w-1 h-1.5 bg-gradient-to-t from-amber-500 to-orange-400 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      <div className="dashboard-card p-2 space-y-1">
        {PLAYLIST.map((song, index) => (
          <div 
            key={song.id} 
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--color-dash-bg-ter)] border border-transparent hover:border-[var(--color-dash-border)]/50 transition-all group cursor-default"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-dash-bg-ter)] border border-[var(--color-dash-border)] flex items-center justify-center shrink-0 group-hover:border-amber-500/50 transition-colors relative overflow-hidden">
               <span className="text-[10px] font-bold text-[var(--color-dash-text-ter)] group-hover:hidden">{index < 9 ? "0" + (index + 1) : (index + 1)}</span>
               <PlayCircle className="w-4 h-4 text-amber-500 hidden group-hover:block relative z-10" />
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="flex-1 min-w-0">
               <h3 className="text-[12px] font-bold text-[var(--color-dash-text-pri)] truncate leading-tight group-hover:text-amber-400 transition-colors">{song.title}</h3>
               <p className="text-[10px] font-medium text-[var(--color-dash-text-ter)] truncate mt-0.5 tracking-wide">{song.artist}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-right">
               {song.mood && (
                  <span className="hidden sm:inline-block text-[8px] font-bold uppercase tracking-widest text-amber-500 bg-amber-950/40 border border-amber-900/50 px-1.5 py-0.5 rounded shadow-[inset_0_1px_3px_rgba(255,165,0,0.1)]">
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
