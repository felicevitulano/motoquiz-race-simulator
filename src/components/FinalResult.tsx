import React from 'react';
import { Bike, RaceStats, User } from '../types';
import { motion } from 'motion/react';
import { Trophy, RotateCcw, Timer, Zap, AlertCircle, ArrowRightLeft, Activity, Mountain, Fuel, User as UserIcon } from 'lucide-react';
import BikeImage from './BikeImage';

interface FinalResultProps {
  bikes: Bike[];
  stats: RaceStats;
  user: User | null;
  onRestart: () => void;
}

export default function FinalResult({ bikes, stats, user, onRestart }: FinalResultProps) {
  const [winnerImgError, setWinnerImgError] = React.useState(false);
  const [runnerUpImgError, setRunnerUpImgError] = React.useState(false);

  const winner = bikes.find(b => b.id === stats.winnerId)!;
  const runnerUp = bikes.find(b => b.id !== stats.winnerId)!;

  const simMode = 
    (winner.type === 'Adventure' || winner.type === 'Enduro') ? 'dirt' :
    (winner.type === 'Touring') ? 'travel' : 'circuit';

  const modeLabels = {
    circuit: { title: "Vincitore Gara", unit: "Best Lap", icon: Timer },
    dirt: { title: "Migliore su Sterrato", unit: "Tempo Prova", icon: Mountain },
    travel: { title: "Migliore per Viaggi", unit: "Autonomia", icon: Fuel }
  };

  const currentLabel = modeLabels[simMode];
  const fallbackImg = (id: string) => `https://picsum.photos/seed/${id}/800/600`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block p-4 bg-brand-light rounded-full mb-6"
        >
          <Trophy className="text-brand-primary" size={48} />
        </motion.div>
        <h1 className="text-4xl font-black text-stone-900 mb-2 uppercase tracking-tight">Risultati della Gara</h1>
        <p className="text-stone-500">Analisi delle prestazioni sul tracciato</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Winner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border-2 border-brand-primary shadow-xl overflow-hidden relative"
        >
          <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Vincitore
          </div>
          <div className="aspect-video bg-stone-100">
            <BikeImage bike={winner} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">{winner.brand}</h3>
            <h2 className="text-2xl font-black text-stone-900 mb-6">{winner.name}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase mb-1">
                  <Timer size={12} />
                  <span>Miglior Giro</span>
                </div>
                <div className="text-lg font-black text-stone-900">{stats.bestLap1.toFixed(2)}s</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase mb-1">
                  <Zap size={12} />
                  <span>Vel. Max</span>
                </div>
                <div className="text-lg font-black text-stone-900">{winner.hp * 2} km/h</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Runner up */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden opacity-80"
        >
          <div className="aspect-video bg-stone-100 grayscale">
            <BikeImage bike={runnerUp} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">{runnerUp.brand}</h3>
            <h2 className="text-2xl font-black text-stone-900 mb-6">{runnerUp.name}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase mb-1">
                  <Timer size={12} />
                  <span>Miglior Giro</span>
                </div>
                <div className="text-lg font-black text-stone-900">{stats.bestLap2.toFixed(2)}s</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase mb-1">
                  <Zap size={12} />
                  <span>Vel. Max</span>
                </div>
                <div className="text-lg font-black text-stone-900">{runnerUp.hp * 2} km/h</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-stone-900 rounded-3xl p-8 text-white mb-12">
        <div className="flex items-center gap-2 mb-8">
          <Activity className="text-brand-primary" />
          <h3 className="text-xl font-black uppercase tracking-tight">Statistiche Gara</h3>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-2">Gap Finale</p>
            <p className="text-3xl font-black text-brand-primary">+{stats.margin.toFixed(3)}s</p>
          </div>
          <div>
            <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-2">Condizioni Pista</p>
            <p className="text-3xl font-black">Ottimali</p>
          </div>
          <div>
            <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-2">Usura Gomme</p>
            <p className="text-3xl font-black">12%</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="px-12 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-brand-dark transition-all flex items-center gap-3"
        >
          <RotateCcw size={20} />
          Nuova Simulazione
        </button>
      </div>
    </div>
  );
}
