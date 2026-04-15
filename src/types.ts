export interface Bike {
  id: string;
  name: string;
  brand: string;
  cc: number;
  hp: number;
  weight: number;
  type: 'Naked' | 'Supersport' | 'Adventure' | 'Sportiva' | 'Touring' | 'Enduro';
  priceRange: 'low' | 'mid' | 'high';
  price: string;
  range: number; // Autonomia in km
  imageUrl: string;
  origin: 'Italian' | 'Japanese' | 'German-Austrian';
  tags: string[];
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    tags: string[];
  }[];
}

export type Screen = 'welcome' | 'quiz' | 'results' | 'track-selection' | 'race' | 'final';

export interface Track {
  id: string;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  length: string;
  turns: number;
  imageUrl: string;
  path: string; // SVG path data
}

export interface User {
  name: string;
  age: number;
}

export interface RaceEvent {
  id: string;
  time: number;
  message: string;
  type: 'start' | 'lap' | 'pass' | 'penalty' | 'finish';
}

export interface RaceStats {
  winnerId: string;
  margin: number;
  bestLap1: number;
  bestLap2: number;
  passes: number;
  penalties1: number;
  penalties2: number;
}
