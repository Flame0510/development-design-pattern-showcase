/**
 * COMPONENT TYPE: Container
 * SECTION: Theory Pages
 *
 * ROLE:
 * - Overview page for Creational pattern category
 * - List all creational patterns with links
 *
 * PATTERNS USED:
 * - Composition Pattern - Uses CategoryOverview component
 * - Dynamic routing to individual patterns
 *
 * NOTES FOR CONTRIBUTORS:
 * - Uses reusable CategoryOverview component
 * - Shows 5 creational patterns: Singleton, Factory Method, Abstract Factory, Builder, Prototype
 */

"use client";

import { PATTERN_CATEGORIES, getPatternsByCategory } from '@/lib/patternTheory';
import CategoryOverview from '@/components/theory/CategoryOverview/CategoryOverview';

export default function CreationalPatternsPage() {
  const patterns = getPatternsByCategory('creational');

  return (
    <CategoryOverview 
      category={PATTERN_CATEGORIES.creational}
      patterns={patterns}
      categoryKey="creational"
    />
  );
}
