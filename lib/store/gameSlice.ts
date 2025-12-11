import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Team, PatternExample, Category } from '@/lib/types';

export interface AnswerHistory {
  roundNumber: number;
  example: PatternExample;
  winnerTeam: Team | null;
  timestamp: number;
  timeElapsed: number; // secondi trascorsi in quel round
}

export interface GameState {
  teams: Team[];
  roundNumber: number;
  usedExampleIds: string[];
  currentExample: PatternExample | null;
  solutionRevealed: boolean;
  selectedCategory: Category | "all" | null;
  selectedPatternCount: 1 | 2 | 3 | null;
  answerHistory: AnswerHistory[];
  roundStartTime: number | null; // timestamp di inizio round
  isPaused: boolean;
}

const initialState: GameState = {
  teams: [],
  roundNumber: 1,
  usedExampleIds: [],
  currentExample: null,
  solutionRevealed: false,
  selectedCategory: null,
  selectedPatternCount: null,
  answerHistory: [],
  roundStartTime: null,
  isPaused: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
    updateTeamScore: (state, action: PayloadAction<{ teamId: string; points: number }>) => {
      const team = state.teams.find(t => t.id === action.payload.teamId);
      if (team) {
        team.score += action.payload.points;
      }
    },
    setCurrentExample: (state, action: PayloadAction<PatternExample | null>) => {
      state.currentExample = action.payload;
      if (action.payload) {
        state.usedExampleIds.push(action.payload.id);
        state.roundStartTime = Date.now();
        state.solutionRevealed = false;
        state.isPaused = false;
      } else {
        state.roundStartTime = null;
      }
    },
    setSelectedCategory: (state, action: PayloadAction<Category | "all" | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedPatternCount: (state, action: PayloadAction<1 | 2 | 3 | null>) => {
      state.selectedPatternCount = action.payload;
    },
    revealSolution: (state) => {
      state.solutionRevealed = true;
    },
    awardPoint: (state, action: PayloadAction<string>) => {
      const team = state.teams.find(t => t.id === action.payload);
      if (team && state.currentExample && state.roundStartTime) {
        team.score += 1;
        
        // Aggiungi allo storico
        const timeElapsed = Math.floor((Date.now() - state.roundStartTime) / 1000);
        state.answerHistory.push({
          roundNumber: state.roundNumber,
          example: state.currentExample,
          winnerTeam: { ...team },
          timestamp: Date.now(),
          timeElapsed,
        });
      }
    },
    nextRound: (state) => {
      state.roundNumber += 1;
      state.currentExample = null;
      state.selectedCategory = null;
      state.selectedPatternCount = null;
      state.solutionRevealed = false;
      state.roundStartTime = null;
      state.isPaused = false;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    resetGame: () => initialState,
    // Azione per sincronizzare da localStorage
    hydrate: (state, action: PayloadAction<Partial<GameState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setTeams,
  updateTeamScore,
  setCurrentExample,
  setSelectedCategory,
  setSelectedPatternCount,
  revealSolution,
  awardPoint,
  nextRound,
  togglePause,
  resetGame,
  hydrate,
} = gameSlice.actions;

export default gameSlice.reducer;

// Middleware per sincronizzare con localStorage
export const syncWithLocalStorage = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  
  // Sincronizza lo stato dopo ogni azione
  if (typeof window !== 'undefined') {
    const state = store.getState().game;
    localStorage.setItem('gameState', JSON.stringify(state));
    // Notifica le altre finestre
    window.dispatchEvent(new Event('gameStateChanged'));
  }
  
  return result;
};
