import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import { Bike, ArrowRight, User as UserIcon, Calendar } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (user: User) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && age) {
      onStart({ name, age: parseInt(age) });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden"
      >
        <div className="bg-stone-900 p-8 text-center relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-2xl mb-6 relative z-10 shadow-lg shadow-brand-primary/20"
          >
            <Bike className="text-white" size={40} />
          </motion.div>
          
          <h1 className="text-3xl font-black text-white mb-2 relative z-10">
            MotoQuiz <span className="text-brand-primary italic">Race</span>
          </h1>
          <p className="text-stone-400 font-medium relative z-10">
            Scopri la moto dei tuoi sogni e mettila alla prova in pista!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                <UserIcon size={12} />
                Il tuo Nome
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Es. Valentino Rossi"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} />
                Età
              </label>
              <input
                required
                type="number"
                min="14"
                max="99"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Es. 25"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !age}
            className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20"
          >
            Inizia il Quiz
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="px-8 pb-8">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <p className="text-[10px] text-stone-500 leading-relaxed text-center italic">
              "Il motore è il cuore di una moto, ma il pilota è la sua anima."
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
