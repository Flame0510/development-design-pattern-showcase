/**
 * COMPONENT TYPE: Utility
 * SECTION: Data
 *
 * ROLE:
 * - Load and aggregate pattern examples from JSON files
 * - Filter examples by category and pattern count
 * - Provide random example selection with exclusion logic
 *
 * PATTERNS USED:
 * - Facade Pattern - Simple API over complex filtering logic
 * - Strategy Pattern - Different filtering strategies (category, count, both)
 *
 * NOTES FOR CONTRIBUTORS:
 * - JSON files in data/ contain 50 examples each
 * - Random selection excludes already-used examples
 * - Returns null when no examples match criteria
 */

import type { Category, PatternExample } from "./types";
import creationalData from "@/data/creational.json";
import structuralData from "@/data/structural.json";
import behavioralData from "@/data/behavioral.json";
import multipatternData from "@/data/multipattern.json";

/**
 * Combina tutti gli esempi da tutti i file JSON
 */
function getAllExamples(): PatternExample[] {
  return [
    ...(creationalData as PatternExample[]),
    ...(structuralData as PatternExample[]),
    ...(behavioralData as PatternExample[]),
    ...(multipatternData as PatternExample[]),
  ];
}

/**
 * Filtra esempi per categoria
 */
function getExamplesByCategory(category: Category): PatternExample[] {
  const allExamples = getAllExamples();
  return allExamples.filter((example) => example.category === category);
}

/**
 * Filtra esempi per numero di pattern
 */
function getExamplesByPatternCount(count: 1 | 2 | 3): PatternExample[] {
  const allExamples = getAllExamples();
  return allExamples.filter((example) => example.solutionPatterns.length === count);
}

/**
 * Filtra esempi per categoria E numero di pattern
 */
function getExamplesByCategoryAndCount(
  category: Category,
  count: 1 | 2 | 3
): PatternExample[] {
  const allExamples = getAllExamples();
  return allExamples.filter(
    (example) =>
      example.category === category && example.solutionPatterns.length === count
  );
}

/**
 * Seleziona un esempio casuale da una categoria specifica,
 * escludendo gli ID già usati
 */
export function getRandomExampleByCategory(
  category: Category,
  usedIds: Set<string>
): PatternExample | null {
  const examples = getExamplesByCategory(category);
  const availableExamples = examples.filter((ex) => !usedIds.has(ex.id));

  if (availableExamples.length === 0) {
    return null; // Nessun esempio disponibile
  }

  const randomIndex = Math.floor(Math.random() * availableExamples.length);
  return availableExamples[randomIndex];
}

/**
 * Seleziona un esempio casuale per numero di pattern,
 * opzionalmente filtrato per categoria
 */
export function getRandomExampleByPatternCount(
  count: 1 | 2 | 3,
  category: Category | null,
  usedIds: Set<string>
): PatternExample | null {
  let examples: PatternExample[];
  
  if (category) {
    examples = getExamplesByCategoryAndCount(category, count);
  } else {
    examples = getExamplesByPatternCount(count);
  }

  const availableExamples = examples.filter((ex) => !usedIds.has(ex.id));

  if (availableExamples.length === 0) {
    return null; // Nessun esempio disponibile
  }

  const randomIndex = Math.floor(Math.random() * availableExamples.length);
  return availableExamples[randomIndex];
}

/**
 * Seleziona un esempio casuale da tutte le categorie,
 * escludendo gli ID già usati
 */
export function getRandomExampleFromAll(
  usedIds: Set<string>
): PatternExample | null {
  const allExamples = getAllExamples();
  const availableExamples = allExamples.filter((ex) => !usedIds.has(ex.id));

  if (availableExamples.length === 0) {
    return null; // Nessun esempio disponibile
  }

  const randomIndex = Math.floor(Math.random() * availableExamples.length);
  return availableExamples[randomIndex];
}

/**
 * Conta quanti esempi totali ci sono per categoria
 */
export function getTotalExamplesByCategory(category: Category): number {
  return getExamplesByCategory(category).length;
}

/**
 * Conta quanti esempi totali ci sono
 */
export function getTotalExamples(): number {
  return getAllExamples().length;
}
