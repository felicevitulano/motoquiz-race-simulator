import React from 'react';
import { Bike } from '../types';
import { motion } from 'motion/react';
import { Trophy, Zap, Weight, Gauge, Play } from 'lucide-react';
import BikeImage from './BikeImage';

interface ResultsProps {
  bikes: Bike[];
  onStartRace: () => void;
}

export default function Results({ bikes, onStartRace }: ResultsProps) {
  const [bike1, bike2] = bikes;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-3 bg-brand-light rounded-2xl mb-4"
        >
          <Trophy className="text-brand-primary" size={32} />
        </motion.div>
        <h1 className="text-4xl font-bold text-stone-900 mb-4">I tuoi abbinamenti perfetti</h1>
        <p className="text-stone-600 max-w-xl mx-auto">
          In base alle tue risposte, queste sono le due motociclette che meglio si adattano al tuo profilo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {bikes.map((bike, idx) => (
          <motion.div
            key={bike.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className={`moto-card overflow-hidden flex flex-col p-0 ${idx === 0 ? 'featured' : ''}`}
          >
            <div className="aspect-video w-full overflow-hidden bg-stone-100">
              <BikeImage bike={bike} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              {idx === 0 && (
                <span className="inline-block px-3 py-1 bg-brand-light text-brand-dark text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                  Migliore Abbinamento
                </span>
              )}
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-stone-500 uppercase tracking-widest mb-1">{bike.brand}</h3>
                    <h2 className="text-2xl font-bold text-stone-900">{bike.name}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-primary font-black text-xl">{bike.price}</p>
                    <p className="text-[10px] text-stone-400 uppercase font-bold">Prezzo indicativo</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Zap size={14} />
                  <span>Potenza</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{bike.hp} CV</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Weight size={14} />
                  <span>Peso</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{bike.weight} kg</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Gauge size={14} />
                  <span>Cilindrata</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{bike.cc} cc</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Trophy size={14} />
                  <span>Tipo</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{bike.type}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {bike.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onStartRace}
          className="next-btn max-w-md flex items-center justify-center gap-3 text-lg"
        >
          <Play size={20} fill="currentColor" />
          Simula la gara in pista
        </button>
        <p className="text-xs text-stone-400 uppercase tracking-widest">5 giri • Circuito Privato • Real-time Log</p>
      </div>
    </div>
  );
}
