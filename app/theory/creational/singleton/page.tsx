/**
 * COMPONENT TYPE: Container
 * SECTION: Theory Pages
 *
 * ROLE:
 * - Detailed page for Singleton pattern
 * - Display complete theory, examples, and guidelines
 *
 * PATTERNS USED:
 * - PatternLayout component for structured presentation
 * - Static data from patternTheory.ts
 *
 * NOTES FOR CONTRIBUTORS:
 * - All pattern pages follow this same structure
 * - Data comes from lib/patternTheory.ts
 */

"use client";

import { getPatternById } from '@/lib/patternTheory';
import PatternLayout from '@/components/theory/PatternLayout/PatternLayout';
import { notFound } from 'next/navigation';

export default function SingletonPage() {
  const pattern = getPatternById('singleton');

  if (!pattern) {
    notFound();
  }

  return <PatternLayout pattern={pattern} />;
}
