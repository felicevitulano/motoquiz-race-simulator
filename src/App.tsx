import React, { useState } from 'react';
import { Bike, Screen, RaceStats, Track } from './types';
import { QUESTIONS, TRACKS } from './constants';
import { calculateRecommendations } from './utils/scoring';
import Quiz from './components/Quiz';
import Results from './components/Results';
import TrackSelection from './components/TrackSelection';
import RaceSimulator from './components/RaceSimulator';
import FinalResult from './components/FinalResult';
import WelcomeScreen from './components/WelcomeScreen';
import { motion, AnimatePresence } from 'motion/react';
import { User as UserType } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [user, setUser] = useState<UserType | null>(null);
  const [recommendedBikes, setRecommendedBikes] = useState<Bike[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [raceStats, setRaceStats] = useState<RaceStats | null>(null);

  const handleStart = (userData: UserType) => {
    setUser(userData);
    setScreen('quiz');
  };

  const handleQuizComplete = (answers: number[]) => {
    const recommendations = calculateRecommendations(answers, QUESTIONS, user);
    setRecommendedBikes(recommendations);
    setScreen('results');
  };

  const handleStartRace = () => {
    setScreen('track-selection');
  };

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setScreen('race');
  };

  const handleRaceFinish = (stats: RaceStats) => {
    setRaceStats(stats);
    setScreen('final');
  };

  const handleRestart = () => {
    setRecommendedBikes([]);
    setRaceStats(null);
    setScreen('welcome');
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-black italic">M</div>
            <span className="font-black uppercase tracking-tighter text-xl">MotoQuiz <span className="text-brand-primary">Race</span></span>
          </div>
          <div className="hidden md:block text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            v1.0 • Simulator Engine
          </div>
        </div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {screen === 'welcome' && (
              <WelcomeScreen onStart={handleStart} />
            )}
            {screen === 'quiz' && (
              <Quiz questions={QUESTIONS} user={user} onComplete={handleQuizComplete} />
            )}
            {screen === 'results' && (
              <Results bikes={recommendedBikes} onStartRace={handleStartRace} />
            )}
            {screen === 'track-selection' && (
              <TrackSelection tracks={TRACKS} onSelect={handleTrackSelect} />
            )}
            {screen === 'race' && (
              <RaceSimulator bikes={recommendedBikes} user={user} track={selectedTrack} onFinish={handleRaceFinish} />
            )}
            {screen === 'final' && raceStats && (
              <FinalResult bikes={recommendedBikes} stats={raceStats} user={user} onRestart={handleRestart} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-200 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">© 2026 MotoQuiz Race Simulator</p>
          <div className="flex justify-center gap-6 text-stone-300">
            <div className="w-8 h-px bg-current" />
            <div className="w-8 h-px bg-current" />
            <div className="w-8 h-px bg-current" />
          </div>
        </div>
      </footer>
    </div>
  );
}
