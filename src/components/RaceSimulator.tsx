import React, { useState, useEffect, useRef } from 'react';
import { Bike, RaceEvent, RaceStats, User, Track } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Flag, AlertTriangle, Timer, Activity, Mountain, Coffee, Fuel, User as UserIcon, Map as MapIcon } from 'lucide-react';

interface RaceSimulatorProps {
  bikes: Bike[];
  user: User | null;
  track: Track | null;
  onFinish: (stats: RaceStats) => void;
}

type SimMode = 'circuit' | 'dirt' | 'travel';

export default function RaceSimulator({ bikes, user, track, onFinish }: RaceSimulatorProps) {
  const [bike1, bike2] = bikes;
  const [pos1, setPos1] = useState(0); 
  const [pos2, setPos2] = useState(0);
  const [events, setEvents] = useState<RaceEvent[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Determine Simulation Mode based on the primary bike
  const simMode: SimMode = 
    (bike1.type === 'Adventure' || bike1.type === 'Enduro') ? 'dirt' :
    (bike1.type === 'Touring') ? 'travel' : 'circuit';
  
  const statsRef = useRef<RaceStats>({
    winnerId: '',
    margin: 0,
    bestLap1: Infinity,
    bestLap2: Infinity,
    passes: 0,
    penalties1: 0,
    penalties2: 0
  });

  const lapTimes1 = useRef<number[]>([]);
  const lapTimes2 = useRef<number[]>([]);
  const lastLapTime1 = useRef(Date.now());
  const lastLapTime2 = useRef(Date.now());
  const lastLeader = useRef<string | null>(null);

  useEffect(() => {
    const startMsg = 
      simMode === 'dirt' ? `Semaforo verde a ${track?.name || 'pista'}! Le ruote artigliate mordono la terra, si parte per l'inferno di fango! Forza ${user?.name || 'pilota'}!` :
      simMode === 'travel' ? `Motori accesi! Inizia l'odissea verso ${track?.name || 'la meta'}, un test di resistenza pura. ${user?.name || 'Il pilota'} è pronto alla sfida!` :
      `Semaforo verde al ${track?.name || 'circuito'}! Gas a martello, le moto urlano sul rettilineo! ${user?.name || 'Il pilota'} scatta come un fulmine!`;
    
    setEvents([{ id: 'start-' + Date.now(), time: Date.now(), message: startMsg, type: 'start' }]);
    
    const interval = setInterval(() => {
      if (isFinished) return;

      setPos1(prev => {
        let speedBase = (bike1.hp / bike1.weight) * 0.15;
        if (simMode === 'dirt' && (bike1.type === 'Adventure' || bike1.type === 'Enduro')) speedBase *= 1.2;
        if (simMode === 'travel') speedBase = 0.1; // Slower for travel test

        const variance = (Math.random() - 0.5) * 0.05;
        const penaltyProb = simMode === 'dirt' ? 0.12 : 0.08;
        const penalty = Math.random() < penaltyProb ? -0.1 : 0;
        
        if (penalty < 0) {
          statsRef.current.penalties1++;
          const msg = 
            simMode === 'dirt' ? `ATTENZIONE! ${bike1.name} perde il posteriore! ${user?.name || 'Il pilota'} deve remare per restare in piedi!` :
            simMode === 'travel' ? `COLPO DI SCENA! ${bike1.name} rallenta, ${user?.name || 'il pilota'} sembra accusare la fatica!` :
            `ERRORE! ${bike1.name} va lungo in staccata! ${user?.name || 'Il pilota'} perde decimi preziosissimi!`;
          addEvent(msg, 'penalty');
        }

        const next = prev + Math.max(0.01, speedBase + variance + penalty);
        
        if (Math.floor(next) > Math.floor(prev)) {
          const now = Date.now();
          const lapTime = (now - lastLapTime1.current) / 1000;
          lapTimes1.current.push(lapTime);
          if (lapTime < statsRef.current.bestLap1) statsRef.current.bestLap1 = lapTime;
          lastLapTime1.current = now;
          
          const lapMsg = 
            simMode === 'travel' ? `TRAGUARDO INTERMEDIO! ${bike1.name} divora i chilometri, ${user?.name || 'il pilota'} sorride!` :
            `GIRO RECORD! ${bike1.name} vola in ${lapTime.toFixed(2)}s! ${user?.name || 'Il pilota'} è scatenato!`;
          addEvent(lapMsg, 'lap');
        }
        
        return next;
      });

      setPos2(prev => {
        let speedBase = (bike2.hp / bike2.weight) * 0.15;
        if (simMode === 'dirt' && (bike2.type === 'Adventure' || bike2.type === 'Enduro')) speedBase *= 1.2;
        if (simMode === 'travel') speedBase = 0.1;

        const variance = (Math.random() - 0.5) * 0.05;
        const penaltyProb = simMode === 'dirt' ? 0.12 : 0.08;
        const penalty = Math.random() < penaltyProb ? -0.1 : 0;

        if (penalty < 0) {
          statsRef.current.penalties2++;
          const msg = 
            simMode === 'dirt' ? `MAMMA MIA! ${bike2.name} rischia il high-side sulla ghiaia! Che brivido!` :
            simMode === 'travel' ? `MOMENTO DIFFICILE! ${bike2.name} sembra soffrire le vibrazioni, ritmo in calo!` :
            `ATTENZIONE! ${bike2.name} commette una sbavatura! La moto si scompone in frenata!`;
          addEvent(msg, 'penalty');
        }

        const next = prev + Math.max(0.01, speedBase + variance + penalty);

        if (Math.floor(next) > Math.floor(prev)) {
          const now = Date.now();
          const lapTime = (now - lastLapTime2.current) / 1000;
          lapTimes2.current.push(lapTime);
          if (lapTime < statsRef.current.bestLap2) statsRef.current.bestLap2 = lapTime;
          lastLapTime2.current = now;
          
          const lapMsg = 
            simMode === 'travel' ? `MACINA CHILOMETRI! ${bike2.name} non si ferma, autonomia ancora eccellente!` :
            `RISPOSTA DI CARATTERE! ${bike2.name} chiude il giro in ${lapTime.toFixed(2)}s! Non molla un centimetro!`;
          addEvent(lapMsg, 'lap');
        }

        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [simMode]);

  useEffect(() => {
    const currentLeader = pos1 > pos2 ? bike1.id : bike2.id;
    if (lastLeader.current && lastLeader.current !== currentLeader) {
      statsRef.current.passes++;
      const winnerName = currentLeader === bike1.id ? bike1.name : bike2.name;
      addEvent(`INCREDIBILE! SORPASSO E CONTROSORPASSO! ${winnerName} infila l'avversario e si prende la leadership!`, 'pass');
    }
    lastLeader.current = currentLeader;

    if (pos1 >= 5 || pos2 >= 5) {
      setIsFinished(true);
      const winner = pos1 >= 5 ? bike1 : bike2;
      statsRef.current.winnerId = winner.id;
      statsRef.current.margin = Math.abs(pos1 - pos2);
      
      const finishMsg = 
        simMode === 'travel' ? `TRAGUARDO FINALE! ${winner.name} trionfa! Una maratona d'acciaio e nervi saldi!` :
        `BANDIERA A SCACCHI! ${winner.name} VINCE! Una prestazione da leggenda, che vittoria!`;
      addEvent(finishMsg, 'finish');
      
      setTimeout(() => {
        onFinish(statsRef.current);
      }, 3000);
    }
  }, [pos1, pos2, simMode]);

  const addEvent = (message: string, type: RaceEvent['type']) => {
    setEvents(prev => [{ id: Math.random().toString(36).substr(2, 9) + '-' + Date.now(), time: Date.now(), message, type }, ...prev].slice(0, 20));
  };

  const trackPathRef = useRef<SVGPathElement>(null);
  const [p1Coords, setP1Coords] = useState({ x: 150, y: 100 });
  const [p2Coords, setP2Coords] = useState({ x: 150, y: 100 });

  useEffect(() => {
    if (trackPathRef.current) {
      const pathLength = trackPathRef.current.getTotalLength();
      const p1 = trackPathRef.current.getPointAtLength((pos1 % 1) * pathLength);
      const p2 = trackPathRef.current.getPointAtLength((pos2 % 1) * pathLength);
      setP1Coords({ x: p1.x, y: p1.y });
      setP2Coords({ x: p2.x, y: p2.y });
    }
  }, [pos1, pos2]);

  const modeConfig = {
    circuit: { icon: Flag, title: track?.name || "Circuito Privato", color: "text-brand-primary", trackColor: "#374151", bgColor: "bg-white" },
    dirt: { icon: Mountain, title: "Prova Sterrato", color: "text-amber-700", trackColor: "#78350f", bgColor: "bg-amber-50" },
    travel: { icon: Coffee, title: "Test Comfort & Autonomia", color: "text-blue-600", trackColor: "#1e40af", bgColor: "bg-blue-50" }
  };

  const currentConfig = modeConfig[simMode];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {track && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-stone-900 text-white p-4 rounded-2xl flex items-center justify-between border-b-4 border-brand-primary"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <MapIcon size={20} className="text-brand-primary" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight">{track.name}</h2>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{track.length} • {track.turns} Curve • Difficoltà: {track.difficulty}</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <img src={track.imageUrl} alt="" className="h-12 w-auto object-contain brightness-0 invert opacity-50" />
          </div>
        </motion.div>
      )}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className={`${currentConfig.bgColor} p-6 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden transition-colors duration-500`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl flex items-center gap-2">
                <currentConfig.icon className={currentConfig.color} size={20} />
                {currentConfig.title}
              </h2>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-stone-400 uppercase font-bold">
                    {simMode === 'travel' ? 'Distanza' : 'Giro'}
                  </p>
                  <p className={`text-lg font-black ${currentConfig.color}`}>
                    {simMode === 'travel' ? `${(Math.min(5, Math.floor(Math.max(pos1, pos2)) + 1)) * 100}km` : `${Math.min(5, Math.floor(Math.max(pos1, pos2)) + 1)}/5`}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[3/2] w-full">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                {/* Realistic Track Path */}
                <path 
                  ref={trackPathRef}
                  d={track?.path || "M 50,100 A 100,50 0 1,1 250,100 A 100,50 0 1,1 50,100"}
                  fill="none" 
                  stroke={simMode === 'dirt' ? '#d97706' : simMode === 'travel' ? '#93c5fd' : '#e5e7eb'} 
                  strokeWidth="20" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path 
                  d={track?.path || "M 50,100 A 100,50 0 1,1 250,100 A 100,50 0 1,1 50,100"}
                  fill="none" 
                  stroke={currentConfig.trackColor} 
                  strokeWidth="1" 
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Finish Line Indicator */}
                <circle cx="50" cy="100" r="3" fill="white" />

                <motion.g animate={{ x: p1Coords.x, y: p1Coords.y }}>
                  <circle r="6" fill="#D85A30" stroke="white" strokeWidth="2" />
                  <text y="-10" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#D85A30">1</text>
                </motion.g>

                <motion.g animate={{ x: p2Coords.x, y: p2Coords.y }}>
                  <circle r="6" fill="#185FA5" stroke="white" strokeWidth="2" />
                  <text y="-10" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#185FA5">2</text>
                </motion.g>
              </svg>
            </div>

            <div className="mt-8 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span className="text-brand-primary">{bike1.name}</span>
                  <div className="flex gap-4">
                    {simMode === 'travel' && <span className="text-stone-400 flex items-center gap-1"><Fuel size={10}/> {bike1.range}km max</span>}
                    <span>{Math.min(100, (pos1 / 5) * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-primary"
                    animate={{ width: `${(Math.min(5, pos1) / 5) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span className="text-moto2">{bike2.name}</span>
                  <div className="flex gap-4">
                    {simMode === 'travel' && <span className="text-stone-400 flex items-center gap-1"><Fuel size={10}/> {bike2.range}km max</span>}
                    <span>{Math.min(100, (pos2 / 5) * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-moto2"
                    animate={{ width: `${(Math.min(5, pos2) / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-stone-900 rounded-3xl p-6 text-stone-300 flex flex-col h-[500px] lg:h-auto">
          <div className="flex items-center gap-2 mb-4 text-brand-primary">
            <Activity size={18} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Live Log</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {events.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs p-2 rounded border-l-2 ${
                    event.type === 'penalty' ? 'bg-red-500/10 border-red-500 text-red-200' :
                    event.type === 'pass' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-200' :
                    event.type === 'finish' ? 'bg-green-500/10 border-green-500 text-green-200' :
                    'bg-stone-800/50 border-stone-600'
                  }`}
                >
                  <div className="flex justify-end mb-1 opacity-50">
                    {event.type === 'penalty' && <AlertTriangle size={10} />}
                  </div>
                  <p className="font-medium">{event.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
