import React from 'react';
import { Track } from '../types';
import { motion } from 'motion/react';
import { Flag, Map as MapIcon, Timer, ChevronRight, Trophy } from 'lucide-react';

interface TrackSelectionProps {
  tracks: Track[];
  onSelect: (track: Track) => void;
}

function TrackImage({ track }: { track: Track }) {
  const [src, setSrc] = React.useState(track.imageUrl);
  const [stage, setStage] = React.useState<'primary' | 'wiki' | 'placeholder'>('primary');

  const handleError = async () => {
    if (stage === 'primary') {
      try {
        const q = encodeURIComponent(`${track.name} circuit`);
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=800&generator=search&gsrlimit=1&gsrsearch=${q}`
        );
        if (res.ok) {
          const data = await res.json();
          const pages = data?.query?.pages;
          const first = pages && (Object.values(pages)[0] as any);
          const thumb: string | undefined = first?.thumbnail?.source;
          if (thumb) { setSrc(thumb); setStage('wiki'); return; }
        }
      } catch { /* ignore */ }
      setSrc(`https://picsum.photos/seed/${track.id}/800/450`);
      setStage('placeholder');
    } else if (stage === 'wiki') {
      setSrc(`https://picsum.photos/seed/${track.id}/800/450`);
      setStage('placeholder');
    }
  };

  return (
    <img
      src={src}
      alt={track.name}
      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
      referrerPolicy="no-referrer"
      onError={handleError}
    />
  );
}

export default function TrackSelection({ tracks, onSelect }: TrackSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12 space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block p-3 bg-brand-primary/10 text-brand-primary rounded-2xl"
        >
          <Flag size={32} />
        </motion.div>
        <h1 className="text-4xl font-black text-stone-900 uppercase tracking-tight">Scegli il Circuito</h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          Ogni pista ha le sue insidie. Scegli dove mettere alla prova la tua nuova moto.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tracks.map((track, idx) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden hover:border-brand-primary transition-all cursor-pointer"
            onClick={() => onSelect(track)}
          >
            <div className="aspect-video bg-stone-100 relative overflow-hidden">
              <TrackImage track={track} />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  track.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                  track.difficulty === 'Medium' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {track.difficulty}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-black text-stone-900 uppercase">{track.name}</h3>
                <p className="text-sm text-stone-500 line-clamp-2">{track.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-stone-400">
                <div className="flex items-center gap-1">
                  <MapIcon size={14} className="text-brand-primary" />
                  {track.length}
                </div>
                <div className="flex items-center gap-1">
                  <Timer size={14} className="text-brand-primary" />
                  {track.turns} Curve
                </div>
              </div>

              <button className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold group-hover:bg-brand-primary transition-colors flex items-center justify-center gap-2">
                Seleziona Pista
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
