# Commenting Standards

> **Documentation Standards for AI-Assisted Development**  
> This guide defines required comment formats, file headers, and inline documentation patterns for the Design Pattern Showcase codebase.

---

## 🎯 Philosophy

Comments in this codebase serve three audiences:

1. **Human Developers**: Understanding code purpose and architectural decisions
2. **AI Assistants**: Pattern recognition for code generation and refactoring
3. **Future Contributors**: Onboarding and maintaining consistency

### Core Principles

- **Comments explain WHY, not WHAT**: Code should be self-documenting through clear naming
- **Pattern Labels**: Identify design patterns and architectural decisions
- **Context Over Description**: Provide reasoning, trade-offs, and gotchas
- **AI-Friendly Structure**: Consistent formats enable AI pattern recognition
- **Avoid Redundancy**: Don't comment obvious code

---

## 📋 Required File Headers

**Every TypeScript/TSX file** must begin with a structured header following this template:

```typescript
/**
 * COMPONENT TYPE: Container | Presentational | Utility | Service | Type Definition | Store | Middleware
 * SECTION: Game Logic | UI Components | State Management | Data | Utilities
 *
 * ROLE:
 * - [Primary responsibility of this file]
 * - [Key features it provides]
 * - [What problem it solves]
 *
 * PATTERNS USED:
 * - [Design pattern name] - [Brief description]
 * - [Architectural pattern] - [How it's applied]
 *
 * NOTES FOR CONTRIBUTORS:
 * - [Guidelines for future modifications]
 * - [Important dependencies or relationships]
 * - [Testing considerations]
 * - [Performance or security notes]
 */
```

### Component Type Classifications

| Type | When to Use | Example Files |
|------|-------------|---------------|
| **Container** | Components that manage state and logic | `RoundController.tsx` |
| **Presentational** | Pure UI components (props only) | `ExampleViewer.tsx`, `CodeBlock.tsx` |
| **Utility** | Helper functions, data transformations | `examples.ts` |
| **Service** | External API calls, browser APIs | (future: `analytics.ts`) |
| **Type Definition** | TypeScript interfaces and types | `types.ts` |
| **Store** | Redux slices and store configuration | `gameSlice.ts`, `index.ts` |
| **Middleware** | Redux middleware for side effects | `index.ts` (syncWithLocalStorage) |

### Section Classifications

| Section | Scope |
|---------|-------|
| **Game Logic** | Quiz rounds, scoring, team management |
| **UI Components** | Reusable visual components |
| **State Management** | Redux slices, actions, reducers |
| **Data** | Pattern examples, JSON loading |
| **Utilities** | Helper functions, formatters |

---

## 📝 File Header Examples

### Container Component

```typescript
/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Manages quiz rounds and team scoring
 * - Dispatches Redux actions for state updates
 * - Handles game flow (start round, reveal solution, next example)
 *
 * PATTERNS USED:
 * - Container/Presentational Split - Separates logic from UI rendering
 * - Redux Toolkit Slice Pattern - Centralized state management
 * - Custom Hooks - Reusable state logic (useAppSelector, useAppDispatch)
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep game logic separate from UI rendering (delegate to presentational components)
 * - Use typed Redux hooks from lib/store/hooks, not direct useSelector/useDispatch
 * - Example selection logic is in lib/examples.ts (don't duplicate here)
 * - Test round transitions and score updates thoroughly
 */

'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
// ... rest of component
```

### Presentational Component

```typescript
/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display pattern code examples with syntax highlighting
 * - Provide copy-to-clipboard functionality
 * - Render solution explanations when revealed
 *
 * PATTERNS USED:
 * - Presentational Component - Props-only, no state management
 * - Custom Syntax Highlighter - Pattern-focused code visualization
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep this component stateless (no Redux, no useEffect for side effects)
 * - Syntax highlighting is custom-built (not Prism/Highlight.js)
 * - Add new language support in highlightCode() function
 * - Ensure code examples are accessible (ARIA labels, keyboard navigation)
 */

import React from 'react';
import styles from './CodeBlock.module.css';
// ... rest of component
```

### Redux Slice

```typescript
/**
 * COMPONENT TYPE: Store
 * SECTION: State Management
 *
 * ROLE:
 * - Define game state structure (teams, rounds, examples, history)
 * - Provide actions for state mutations (setTeams, nextRound, revealSolution)
 * - Export selectors for accessing state slices
 *
 * PATTERNS USED:
 * - Redux Toolkit Slice Pattern - Simplified reducer + action creation
 * - Immer Integration - Mutable syntax with immutable updates under the hood
 * - Typed Actions - PayloadAction<T> for type-safe dispatches
 *
 * NOTES FOR CONTRIBUTORS:
 * - Use Immer's mutable syntax in reducers (it's actually immutable)
 * - Don't store non-serializable data (functions, Promises, class instances)
 * - Export actions from slice.actions, not manually created
 * - Test state transitions with Redux DevTools Extension
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Team, PatternExample } from '@/lib/types';
// ... rest of slice
```

### Utility Module

```typescript
/**
 * COMPONENT TYPE: Utility
 * SECTION: Data
 *
 * ROLE:
 * - Load pattern examples from JSON files (creational, structural, behavioral, multipattern)
 * - Select random examples by category without repeats
 * - Filter examples based on game state (exclude already shown)
 *
 * PATTERNS USED:
 * - Facade Pattern - Simplified interface for complex example loading logic
 * - Strategy Pattern - Different selection strategies per category
 *
 * NOTES FOR CONTRIBUTORS:
 * - JSON files are loaded at runtime (not build-time) for dynamic updates
 * - Example IDs must be unique across all categories
 * - Random selection uses Fisher-Yates shuffle for fairness
 * - Handle edge cases (empty category, all examples shown)
 */

import creatinalExamples from '@/data/creational.json';
import structuralExamples from '@/data/structural.json';
// ... rest of module
```

### Type Definition Module

```typescript
/**
 * COMPONENT TYPE: Type Definition
 * SECTION: Utilities
 *
 * ROLE:
 * - Define core TypeScript interfaces for game entities (Team, PatternExample, GameState)
 * - Provide type safety across components, Redux, and utilities
 * - Document data structure contracts
 *
 * PATTERNS USED:
 * - Interface Segregation - Small, focused interfaces (Team, Round, Example)
 * - Type Composition - Complex types built from primitives
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep interfaces minimal (only essential properties)
 * - Use TypeScript utility types (Partial, Pick, Omit) for variations
 * - Document property purposes with JSDoc comments
 * - Avoid circular type dependencies
 */

/**
 * Represents a quiz team with name, score, and visual identity
 */
export interface Team {
  /** Team display name (user-provided) */
  name: string;
  /** Current score (points awarded for correct answers) */
  points: number;
  /** Hex color for UI display (#FF5733, etc.) */
  color: string;
}
// ... rest of types
```

---

## 🏗️ Pattern Comments

**Pattern comments** label architectural decisions, design patterns, and non-obvious code structures. They help AI assistants recognize recurring patterns and assist developers in understanding trade-offs.

### Format

```typescript
// PATTERN: [Pattern Name] ([Context])
// PURPOSE:
// - [Why this pattern is used]
// - [What problem it solves]
// - [Trade-offs or alternatives considered]
```

### When to Use Pattern Comments

✅ **DO use pattern comments for**:
- Design pattern implementations (Observer, Strategy, Factory, etc.)
- Architectural patterns (Container/Presentational, HOC, Middleware)
- Non-obvious algorithms or data structures
- Cross-cutting concerns (logging, caching, error handling)
- Performance optimizations
- Browser API workarounds or polyfills

❌ **DON'T use pattern comments for**:
- Standard React patterns (useState, useEffect without side effects)
- Obvious code (simple loops, basic conditionals)
- Library-specific boilerplate (Next.js "use client", TypeScript imports)

### Pattern Comment Examples

#### Redux Middleware

```typescript
// PATTERN: Middleware Pattern (Redux Toolkit)
// PURPOSE:
// - Intercept actions to trigger side effects (localStorage sync)
// - Separate concerns: state updates vs persistence
// - Enable cross-window communication without WebSockets
// - Dispatch custom events for real-time match viewer updates

const syncWithLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action); // Let the action pass through first
  
  // Persist entire state to localStorage after every action
  const state = store.getState();
  localStorage.setItem('gameState', JSON.stringify(state));
  
  // Notify other windows via custom event
  window.dispatchEvent(new Event('gameStateChanged'));
  
  return result;
};
```

#### Observer Pattern

```typescript
// PATTERN: Observer Pattern (Browser Events + Polling)
// PURPOSE:
// - Watch for state changes across browser windows/tabs
// - Enable real-time synchronization without backend/WebSockets
// - Fallback polling (500ms) ensures reliability if events fail
// - Used for Match Viewer live updates

useEffect(() => {
  const handleStorageChange = () => {
    const rawState = localStorage.getItem('gameState');
    if (rawState) {
      const state = JSON.parse(rawState);
      dispatch(hydrate(state)); // Sync Redux with localStorage
    }
  };
  
  // Listen to storage events (fired from other windows)
  window.addEventListener('storage', handleStorageChange);
  
  // Listen to custom events (fired from same window)
  window.addEventListener('gameStateChanged', handleStorageChange);
  
  // Polling fallback (in case events don't fire)
  const interval = setInterval(handleStorageChange, 500);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('gameStateChanged', handleStorageChange);
    clearInterval(interval);
  };
}, [dispatch]);
```

#### Strategy Pattern

```typescript
// PATTERN: Strategy Pattern (Category-based example selection)
// PURPOSE:
// - Different selection algorithms per category (creational, structural, etc.)
// - Easily add new categories without modifying existing logic
// - Testable in isolation (mock strategies independently)

type ExampleSelectionStrategy = (
  category: PatternCategory,
  excludeIds: string[]
) => PatternExample | null;

const strategies: Record<PatternCategory, ExampleSelectionStrategy> = {
  creational: (category, excludeIds) => selectFromJSON(creatinalExamples, excludeIds),
  structural: (category, excludeIds) => selectFromJSON(structuralExamples, excludeIds),
  behavioral: (category, excludeIds) => selectFromJSON(behavioralExamples, excludeIds),
  multipattern: (category, excludeIds) => selectFromJSON(multipatternExamples, excludeIds),
  all: (category, excludeIds) => selectFromAllCategories(excludeIds),
};

export function getRandomExample(
  category: PatternCategory,
  excludeIds: string[]
): PatternExample | null {
  const strategy = strategies[category];
  return strategy(category, excludeIds);
}
```

#### Container/Presentational Split

```typescript
// PATTERN: Container/Presentational Split
// PURPOSE:
// - Separate data fetching/state logic (Container) from UI rendering (Presentational)
// - Makes presentational components reusable and testable
// - Container manages Redux, Presentational receives props

// ❌ BAD: Logic and UI mixed
function TeamDisplay() {
  const teams = useAppSelector(state => state.game.teams); // Redux logic
  
  return (
    <div>
      {teams.map(team => (
        <div key={team.name}>{team.name}: {team.points}</div>
      ))}
    </div>
  );
}

// ✅ GOOD: Container handles logic
function TeamDisplayContainer() {
  const teams = useAppSelector(state => state.game.teams);
  return <TeamList teams={teams} />; // Delegate to presentational
}

// ✅ GOOD: Presentational receives props
interface TeamListProps {
  teams: Team[];
}

function TeamList({ teams }: TeamListProps) {
  return (
    <div>
      {teams.map(team => (
        <div key={team.name}>{team.name}: {team.points}</div>
      ))}
    </div>
  );
}
```

#### Custom Hook Pattern

```typescript
// PATTERN: Custom Hook (Reusable state logic)
// PURPOSE:
// - Extract repeated logic (game state access) into reusable hook
// - Type-safe Redux selectors with TypeScript inference
// - Avoid direct useSelector/useDispatch (use typed versions)

// ❌ BAD: Repeated logic in every component
function Component1() {
  const teams = useSelector((state: RootState) => state.game.teams);
  const dispatch = useDispatch<AppDispatch>();
}

function Component2() {
  const teams = useSelector((state: RootState) => state.game.teams);
  const dispatch = useDispatch<AppDispatch>();
}

// ✅ GOOD: Typed hooks in lib/store/hooks.ts
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// ✅ GOOD: Components use typed hooks
function Component1() {
  const teams = useAppSelector(state => state.game.teams); // Type-safe
  const dispatch = useAppDispatch();
}
```

---

## 💬 Inline Comments

### When to Use Inline Comments

✅ **DO comment**:
- **Complex algorithms**: Explain non-obvious logic
- **Workarounds**: Document browser quirks, library bugs
- **Performance optimizations**: Why this approach is faster
- **Business logic**: Domain-specific rules
- **Gotchas**: Potential pitfalls for future developers

❌ **DON'T comment**:
- **Obvious code**: `i++; // increment i` (redundant)
- **What code does**: Code should be self-documenting via naming
- **Outdated comments**: Remove comments that no longer apply

### Inline Comment Examples

#### ✅ GOOD: Explains WHY

```typescript
// Use Fisher-Yates shuffle for unbiased random selection
// (Array.sort(() => Math.random() - 0.5) has bias issues)
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
```

#### ✅ GOOD: Documents trade-off

```typescript
// Polling every 500ms as fallback for storage events
// Trade-off: Slight delay vs guaranteed sync if events fail
// (storage events don't fire in the same window that triggered them)
const interval = setInterval(handleStorageChange, 500);
```

#### ✅ GOOD: Explains business logic

```typescript
// Award 10 points for correct answers in standard mode
// (future: make this configurable for different difficulty levels)
const pointsAwarded = 10;
dispatch(awardPoints({ teamName, points: pointsAwarded }));
```

#### ❌ BAD: States the obvious

```typescript
// Set the team name to the value from the input
setTeamName(e.target.value);

// Loop through all teams
teams.forEach(team => {
  // Add 10 points to the team
  team.points += 10;
});
```

---

## 📖 JSDoc for Public APIs

Use **JSDoc comments** for functions, interfaces, and types that are exported or part of a public API.

### Format

```typescript
/**
 * Brief one-line summary
 *
 * Detailed description (optional, 1-3 sentences)
 *
 * @param paramName - Description of parameter
 * @param anotherParam - Description (use hyphens, not colons)
 * @returns Description of return value
 *
 * @example
 * ```typescript
 * const example = getRandomExample('creational', ['creational-01']);
 * ```
 */
export function functionName(paramName: string, anotherParam: number): ReturnType {
  // Implementation
}
```

### JSDoc Examples

#### Function Documentation

```typescript
/**
 * Selects a random pattern example from the specified category, excluding already shown examples
 *
 * This function uses the Strategy pattern to delegate to category-specific selection logic.
 * If no examples are available (all shown or category empty), returns null.
 *
 * @param category - Pattern category ('creational', 'structural', 'behavioral', 'multipattern', 'all')
 * @param excludeIds - Array of example IDs to exclude (already shown in current game)
 * @returns Random example or null if no examples available
 *
 * @example
 * ```typescript
 * const example = getRandomExample('creational', ['creational-01', 'creational-05']);
 * if (example) {
 *   console.log(`Selected: ${example.title}`);
 * }
 * ```
 */
export function getRandomExample(
  category: PatternCategory,
  excludeIds: string[]
): PatternExample | null {
  // Implementation
}
```

#### Interface Documentation

```typescript
/**
 * Represents a design pattern code example for the quiz game
 *
 * Examples are loaded from JSON files in /data and displayed in quiz rounds.
 * The `solutionPatterns` array can contain multiple patterns for multi-pattern examples.
 */
export interface PatternExample {
  /** Unique identifier (format: 'category-##', e.g., 'creational-01') */
  id: string;
  
  /** Descriptive title WITHOUT pattern name (to avoid spoiling the quiz) */
  title: string;
  
  /** Pattern category (determines which JSON file it's from) */
  category: 'creational' | 'structural' | 'behavioral' | 'multipattern';
  
  /** JavaScript/TypeScript code demonstrating the pattern(s) */
  code: string;
  
  /** 3-4 sentence explanation of why this code uses the pattern(s) */
  solutionExplanation: string;
  
  /** Array of pattern names (1 for single-pattern, 2-3 for multi-pattern examples) */
  solutionPatterns: string[];
}
```

---

## 🚫 Anti-Patterns to Avoid

### ❌ Commented-Out Code

**Don't leave commented-out code in production.**

Use version control (Git) instead.

```typescript
// ❌ BAD
// function oldImplementation() {
//   // ... 50 lines of old code
// }

function newImplementation() {
  // ... new code
}
```

If you need to preserve old code temporarily:
1. Create a Git branch
2. Commit the working version
3. Reference the commit hash in a comment

```typescript
// ✅ ACCEPTABLE (temporary, during migration)
// Previous implementation in commit abc1234 (pre-refactor branch)
// Kept for comparison during testing, remove after validation
```

### ❌ TODO Comments Without Context

**Bad TODOs** lack context, deadlines, or ownership:

```typescript
// ❌ BAD
// TODO: fix this
// TODO: improve performance
// TODO: refactor
```

**Good TODOs** are actionable:

```typescript
// ✅ GOOD
// TODO(michele, 2026-01-15): Add timer mode for competitive rounds
// - Track time per round
// - Award bonus points for speed
// - Display countdown timer in UI
// Related issue: #42

// ✅ GOOD
// TODO: Optimize shuffle for large arrays (>1000 items)
// Current: O(n) Fisher-Yates shuffle
// Bottleneck: Not critical for 200 examples, but needed for community submissions
```

### ❌ Misleading Comments

**Comments that contradict the code are worse than no comments.**

```typescript
// ❌ BAD: Comment says "increment" but code decrements
// Increment the counter
counter--;

// ✅ GOOD: Remove misleading comment (code is clear)
counter--;
```

**Fix outdated comments immediately** when updating code.

### ❌ Over-Commenting

**Don't comment what the code already says.**

```typescript
// ❌ BAD: Every line commented
// Create a new array to store teams
const teams: Team[] = [];

// Loop through each team name
teamNames.forEach(name => {
  // Create a new team object
  const team: Team = {
    // Set the name property
    name: name,
    // Set initial points to zero
    points: 0,
    // Set a random color
    color: getRandomColor(),
  };
  
  // Add the team to the array
  teams.push(team);
});

// ✅ GOOD: Only comment non-obvious parts
const teams: Team[] = teamNames.map(name => ({
  name,
  points: 0,
  color: getRandomColor(), // Random assignment for visual distinction
}));
```

---

## 🧪 Testing Comments

**Test files** (`.test.ts`, `.spec.ts`) should have descriptive test names, not extensive comments.

### ✅ GOOD: Self-Documenting Tests

```typescript
describe('getRandomExample', () => {
  describe('when excludeIds is empty', () => {
    it('should return a random example from the specified category', () => {
      const example = getRandomExample('creational', []);
      expect(example).not.toBeNull();
      expect(example?.category).toBe('creational');
    });
  });
  
  describe('when all examples are excluded', () => {
    it('should return null', () => {
      const allIds = creatinalExamples.map(ex => ex.id);
      const example = getRandomExample('creational', allIds);
      expect(example).toBeNull();
    });
  });
  
  describe('when category is "all"', () => {
    it('should select from all categories without bias', () => {
      // Run 100 times to check distribution
      const categories = new Set<string>();
      for (let i = 0; i < 100; i++) {
        const example = getRandomExample('all', []);
        if (example) categories.add(example.category);
      }
      
      // Expect at least 3 different categories (statistical probability)
      expect(categories.size).toBeGreaterThanOrEqual(3);
    });
  });
});
```

### ❌ BAD: Over-Commented Tests

```typescript
// ❌ BAD
it('should return null', () => {
  // Arrange: Create an array of all IDs
  const allIds = creatinalExamples.map(ex => ex.id);
  
  // Act: Call the function with all IDs excluded
  const example = getRandomExample('creational', allIds);
  
  // Assert: Expect null
  expect(example).toBeNull();
});
```

**Test names should be full sentences** describing behavior.

---

## 🤖 AI-Friendly Comment Practices

### Why Comment Consistency Matters for AI

AI assistants (GitHub Copilot, ChatGPT, Cursor, etc.) rely on **pattern recognition**:

- **File headers** → Understand component purpose and architecture
- **Pattern comments** → Recognize recurring solutions
- **JSDoc** → Generate type-safe code suggestions
- **Consistent formats** → Train on project-specific patterns

### How to Make Comments AI-Friendly

✅ **DO**:
- Use consistent keywords (`PATTERN:`, `PURPOSE:`, `ROLE:`)
- Structure headers the same way in every file
- Label design patterns explicitly
- Provide examples in JSDoc
- Write clear, grammatically correct sentences

❌ **DON'T**:
- Mix comment styles (pick one format and stick to it)
- Use abbreviations without explanation
- Write comments in multiple languages
- Leave incomplete TODOs without context

### Example: AI-Friendly Header

```typescript
/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display team information (name, score, color)
 * - Provide interactive buttons for awarding points
 * - Highlight the team with the highest score
 *
 * PATTERNS USED:
 * - Presentational Component - Props-only, no Redux dependencies
 * - Composition Pattern - Built from smaller components (Badge, Button)
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep this component stateless for reusability
 * - Team colors are user-provided (validate hex codes in parent)
 * - Add tests for edge cases (tie scores, zero teams)
 */
```

**Why this is AI-friendly**:
- ✅ Consistent keywords (`COMPONENT TYPE:`, `ROLE:`, etc.)
- ✅ Clear categorization (Presentational → props-only)
- ✅ Explicit pattern labels (Composition Pattern)
- ✅ Actionable guidance for contributors

**AI can now**:
- Suggest similar presentational components
- Avoid adding Redux logic to this component
- Generate tests for edge cases mentioned

---

## 📚 Summary

| Comment Type | When to Use | Example |
|--------------|-------------|---------|
| **File Header** | Every TypeScript/TSX file | See [File Header Examples](#file-header-examples) |
| **Pattern Comment** | Design patterns, architectural decisions | `// PATTERN: Observer Pattern` |
| **Inline Comment** | Complex logic, workarounds, trade-offs | `// Fisher-Yates shuffle (unbiased)` |
| **JSDoc** | Public APIs, exported functions/types | `/** @param category - Pattern category */` |
| **TODO** | Actionable future work | `// TODO(name, date): Description` |

---

## 🔗 Related Documentation

- [Main Copilot Instructions](../copilot-instructions.md) - Project overview
- [Project Structure](./project-structure.md) - File organization
- [Styling Conventions](./styling-conventions.md) - Ant Design + Tailwind
- [Reusable Components](./reusable-components.md) - Component catalog

---

**Remember**: Comments are for humans first, AI second. Write clearly, concisely, and helpfully! 🚀
