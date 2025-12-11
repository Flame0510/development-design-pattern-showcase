/**
 * COMPONENT TYPE: Utility
 * SECTION: Internationalization
 *
 * ROLE:
 * - Provide translation utilities for category names
 * - Adapter pattern to translate English category keys to Italian labels
 *
 * PATTERNS USED:
 * - Adapter Pattern - Translate between English keys and Italian display text
 * - Type Safety - Use Category type to ensure valid translations
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep translations centralized in this file
 * - Add new translations as needed for UI elements
 */

import type { Category } from "./types";

export const CATEGORY_TRANSLATIONS: Record<Category, string> = {
  creational: "Creazionali",
  structural: "Strutturali",
  behavioral: "Comportamentali",
};

/**
 * Translate a category key to its Italian display name
 * @param category - The category key (e.g., "creational")
 * @returns The Italian translation (e.g., "Creazionali")
 */
export function translateCategory(category: Category): string {
  return CATEGORY_TRANSLATIONS[category];
}
