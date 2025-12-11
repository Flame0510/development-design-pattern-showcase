/**
 * Modello dati per gli esempi di design pattern
 */

export type Category = "creational" | "structural" | "behavioral";

export interface PatternExample {
  id: string; // unique ID, e.g. "creational-01"
  title: string; // short title, e.g. "Pizzeria online - scelta impasto"
  category: Category;
  code: string; // JavaScript code snippet
  solutionPatterns: string[]; // array of pattern names, e.g. ["Factory Method", "Singleton"]
  solutionExplanation: string; // short explanation in Italian
}

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

export interface AppState {
  teams: Team[];
  roundNumber: number;
  usedExampleIds: Set<string>;
  currentExample: PatternExample | null;
  solutionRevealed: boolean;
}
