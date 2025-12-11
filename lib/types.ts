/**
 * COMPONENT TYPE: Type Definition
 * SECTION: Utilities
 *
 * ROLE:
 * - Define TypeScript interfaces and types for the entire application
 * - Ensure type safety across components and state management
 * - Document data structures for pattern examples, teams, and app state
 *
 * PATTERNS USED:
 * - Interface Segregation - Separate interfaces for different concerns
 * - Type Composition - Combine primitive types into complex structures
 *
 * NOTES FOR CONTRIBUTORS:
 * - All interfaces exported from this file are used throughout the app
 * - Keep types minimal and focused on data shape, not behavior
 * - Use union types for category enums instead of string
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
