/**
 * Tipos globais do projeto
 */

export type Section = 
  | "intro" 
  | "animation" 
  | "video" 
  | "examples" 
  | "quiz" 
  | "devs" 
  | "projectVideo";

export interface Question {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  userAnswers: number[];
  started: boolean;
  showResults: boolean;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  timestamp: number;
}

export interface UserPreferences {
  musicEnabled: boolean;
  soundEnabled: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

export interface TeamMember {
  name: string;
  fullName: string;
  role: string;
  emoji: string;
  contributions: string[];
}

export interface NavigationItem {
  key: Section;
  label: string;
  emoji: string;
}

export interface AudioRefs {
  acertou: React.RefObject<HTMLAudioElement | null>;
  errou: React.RefObject<HTMLAudioElement | null>;
  music: React.RefObject<HTMLAudioElement | null>;
}

export type AnimationEasing = 
  | "power1.out" 
  | "power2.out" 
  | "power2.in" 
  | "elastic.out" 
  | "bounce.out" 
  | "back.out";

export interface AnimationConfig {
  duration: number;
  ease: AnimationEasing;
  delay?: number;
}
