# Design Pattern Showcase - Copilot Instructions

> **AI-Assisted Development Guide**  
> This document helps AI assistants (GitHub Copilot, ChatGPT, etc.) understand the project architecture, coding conventions, and design patterns used in this codebase.

---

## 🎯 Project Overview

**Design Pattern Showcase** is an interactive learning platform that transforms design pattern education into an immersive, gamified experience. Part of a series of "showcase" projects (following [Angular Showcase](https://github.com/Flame0510/angular-showcase)), this platform teaches software design patterns through:

- **Interactive Quiz Game**: Team-based pattern recognition challenges
- **Progressive Disclosure**: Deep-dive explanations available on demand
- **Real-Time Match Viewer**: Second-screen live game monitoring
- **Code Examples**: 200+ real-world pattern implementations
- **Redux State Management**: Centralized game state with Redux Toolkit

### Project Philosophy

Learning design patterns should be:
- **Interactive**: Learn by playing, not just reading
- **Contextual**: See patterns in real-world code scenarios
- **Progressive**: Start simple, go deep when ready
- **Collaborative**: Team-based learning and competition

---

## 🏗️ Architecture Overview

### Tech Stack

- **Framework**: Next.js 15.5.7 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Ant Design 5.x + Tailwind CSS 3.x
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **UI Components**: Ant Design (antd) + custom components
- **Code Highlighting**: Custom syntax highlighter

### Project Structure

```
├── .github/
│   └── copilot-instructions/        # AI-assisted development docs
│       ├── project-structure.md     # Directory organization
│       ├── styling-conventions.md   # SCSS/Tailwind guidelines
│       ├── commenting-standards.md  # File headers & patterns
│       └── reusable-components.md   # Component docs
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page (game setup)
│   ├── globals.css                  # Global styles
│   └── match-viewer/                # Live game viewer
│       └── page.tsx
├── components/                      # Reusable UI components
│   ├── CodeBlock.tsx               # Syntax-highlighted code
│   ├── ExampleViewer.tsx           # Pattern example display
│   ├── RoundController.tsx         # Game controller
│   └── TeamSetup.tsx               # Team configuration
├── data/                           # Pattern examples (JSON)
│   ├── creational.json             # 50 creational examples
│   ├── structural.json             # 50 structural examples
│   ├── behavioral.json             # 50 behavioral examples
│   └── multipattern.json           # 50 multi-pattern examples
├── lib/                            # Core libraries
│   ├── store/                      # Redux Toolkit store
│   │   ├── index.ts               # Store config + middleware
│   │   ├── gameSlice.ts           # Game state slice
│   │   └── hooks.ts               # Typed Redux hooks
│   ├── examples.ts                # Example loading utilities
│   └── types.ts                   # TypeScript interfaces
└── public/                         # Static assets
```

---

## 🎨 Design Patterns Used in This Codebase

### State Management Patterns

**Redux Toolkit Slice Pattern** (Centralized Store)
```typescript
// PATTERN: Redux Toolkit Slice
// PURPOSE:
// - Centralized game state management
// - Immutable state updates with Immer
// - Type-safe actions and reducers

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload; // Immer handles immutability
    }
  }
});
```

**Middleware Pattern** (Cross-Window Sync)
```typescript
// PATTERN: Middleware for side effects
// PURPOSE:
// - Sync state to localStorage after every action
// - Dispatch custom events for cross-window communication
// - Separate concerns (state updates vs persistence)

const syncWithLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('gameState', JSON.stringify(store.getState()));
  window.dispatchEvent(new Event('gameStateChanged'));
  return result;
};
```

### Component Patterns

**Container/Presentational Split**
- **Container**: `RoundController.tsx` - manages state, dispatches actions
- **Presentational**: `ExampleViewer.tsx` - receives props, displays UI

**Composition Pattern**
```typescript
// PATTERN: Component composition
// PURPOSE:
// - Build complex UIs from simple components
// - Reusable, testable, maintainable

<RoundController>
  <ExampleViewer example={currentExample} />
  <TeamSetup teams={teams} onTeamsChange={handleTeamsChange} />
</RoundController>
```

---

## 📝 Coding Conventions

### Styling Best Practices (CRITICAL)

**NEVER USE INLINE STYLES IN TSX/JSX FILES**

❌ **WRONG - NEVER DO THIS**:
```tsx
<Title style={{ color: '#ffc107', fontSize: '48px' }}>Text</Title>
<div style={{ padding: '24px', backgroundColor: '#0a1929' }}>Content</div>
```

✅ **CORRECT - ALWAYS DO THIS**:
```tsx
// TSX file
<Title className="page__title">Text</Title>
<div className="page__container">Content</div>

// SCSS file
.page {
  &__title {
    color: $yellow-primary !important; // !important to override Ant Design
    font-size: fn.rem(48) !important;
  }
  
  &__container {
    padding: fn.rem(24);
    background-color: $navy-dark;
  }
}
```

**When to use `!important`**:
- ✅ To override Ant Design component styles (Typography, Card, etc.)
- ✅ When SCSS class needs to override theme tokens
- ❌ Never for regular custom components (fix specificity instead)

**Ant Design Typography Override Pattern**:
```scss
// For Typography components on dark backgrounds
.component {
  &__title {
    color: $yellow-primary !important;  // Override Ant Design default
    font-weight: 800 !important;
    margin-bottom: fn.rem(16) !important;
  }
}
```

---

### Language Convention (CRITICAL)

**ALL code, comments, documentation, and commit messages MUST be in English.**

✅ **CORRECT**:
```typescript
// PATTERN: Observer pattern (localStorage + events)
// PURPOSE: Watch for state changes across browser windows

const handleStorageChange = () => {
  // Implementation
};
```

❌ **WRONG**:
```typescript
// PATTERN: Pattern Observer (localStorage + eventi)
// SCOPO: Osservare i cambiamenti di stato tra finestre

const gestisciCambioStorage = () => {
  // Implementazione
};
```

This includes:
- Variable names, function names, class names
- Comments (inline, block, JSDoc)
- Documentation files (README.md, STYLING.md, etc.)
- Git commit messages
- Code review comments
- Error messages and logs

**Exceptions**: User-facing content in the UI can be localized.

---

### File Headers (REQUIRED for all files)

Every TypeScript/TSX file must start with:

```typescript
/**
 * COMPONENT TYPE: Container | Presentational | Utility | Service
 * SECTION: Game Logic | UI Components | State Management | Data
 *
 * ROLE:
 * - Primary responsibility of this file
 * - Key features it provides
 *
 * PATTERNS USED:
 * - Design patterns implemented (Redux, Facade, Observer, etc.)
 * - Architectural patterns (Container/Presentational, HOC, etc.)
 *
 * NOTES FOR CONTRIBUTORS:
 * - Guidelines for future modifications
 * - Dependencies and relationships
 * - Testing considerations
 */
```

### Pattern Comments (Label recurring patterns)

```typescript
// PATTERN: Observer pattern (localStorage + events)
// PURPOSE:
// - Watch for state changes across browser windows
// - Enable real-time synchronization without WebSockets
// - Fallback polling for reliability

useEffect(() => {
  const handleStorageChange = () => {
    const state = JSON.parse(localStorage.getItem('gameState'));
    dispatch(hydrate(state));
  };
  
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('gameStateChanged', handleStorageChange);
  
  const interval = setInterval(handleStorageChange, 500);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('gameStateChanged', handleStorageChange);
    clearInterval(interval);
  };
}, [dispatch]);
```

### TypeScript Guidelines

✅ **DO**:
- Use explicit types for all function parameters and return values
- Define interfaces for all data structures
- Use TypeScript utility types (`Partial<T>`, `Pick<T>`, `Omit<T>`)
- Export types alongside components

❌ **DON'T**:
- Use `any` (use `unknown` instead)
- Skip return types
- Use `as` casts without validation

```typescript
// ✅ GOOD
interface Team {
  name: string;
  points: number;
  color: string;
}

function updateTeamPoints(team: Team, points: number): Team {
  return { ...team, points: team.points + points };
}

// ❌ BAD
function updateTeamPoints(team: any, points): any {
  team.points += points;
  return team;
}
```

---

## 🎨 Styling Conventions

### Ant Design + Tailwind Hybrid

We use **Ant Design** for complex components (forms, modals, tables) and **Tailwind** for layout and utilities.

```tsx
// ✅ GOOD: Ant Design for complex UI
import { Card, Button, Modal } from 'antd';

<Card className="shadow-lg rounded-xl">
  <Button type="primary" className="mt-4">
    Start Game
  </Button>
</Card>

// ✅ GOOD: Tailwind for layout
<div className="flex items-center justify-between p-6 bg-gray-50">
  <h1 className="text-2xl font-bold text-gray-900">Design Patterns</h1>
</div>
```

### Tailwind Utility Classes

✅ **Mobile-First Approach**:
```tsx
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-xl md:text-2xl lg:text-3xl">Title</h1>
</div>
```

✅ **Semantic Class Names with CSS Modules** (when needed):
```tsx
// component.module.css
.gameCard {
  @apply rounded-lg shadow-md p-6 bg-white;
}

.gameCard__title {
  @apply text-2xl font-bold mb-4;
}
```

### Ant Design Theme Customization

```typescript
// Theme focused on code/pattern learning (not gradient/glass)
const theme = {
  token: {
    colorPrimary: '#1890ff',      // Professional blue
    colorSuccess: '#52c41a',      // Green for correct answers
    colorError: '#ff4d4f',        // Red for errors
    borderRadius: 8,              // Rounded corners
    fontFamily: 'Inter, sans-serif',
  }
};
```

---

## 🧩 Component Development

### Component Template

```typescript
/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display pattern code examples with syntax highlighting
 * - Provide copy-to-clipboard functionality
 *
 * PATTERNS USED:
 * - Presentational component (props only)
 * - Custom syntax highlighter
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep this component stateless
 * - Syntax highlighting is custom-built
 * - Add new languages in highlightCode()
 */

import React from 'react';

interface CodeBlockProps {
  code: string;
  language: 'javascript' | 'typescript' | 'python';
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  // Implementation
};
```

### Component Documentation (in reusable-components.md)

Every reusable component needs:
1. **Purpose**: What problem does it solve?
2. **Props Interface**: All props with types and descriptions
3. **Usage Example**: Basic and advanced use cases
4. **Patterns**: Design patterns implemented
5. **Testing**: Key test scenarios

---

## 🔄 State Management Guidelines

### Redux Toolkit Best Practices

✅ **DO**:
- Use `createSlice` for all state slices
- Define initial state with TypeScript interfaces
- Use Immer's mutable syntax in reducers (it's actually immutable)
- Create typed hooks (`useAppSelector`, `useAppDispatch`)
- Use middleware for side effects (localStorage sync)

❌ **DON'T**:
- Mutate state outside reducers
- Store non-serializable data in Redux
- Create actions manually (use slice.actions)

```typescript
// ✅ GOOD: Redux Toolkit slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentRound: number;
  teams: Team[];
}

const initialState: GameState = {
  currentRound: 1,
  teams: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextRound: (state) => {
      state.currentRound += 1; // Looks mutable, actually immutable
    },
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
  },
});

export const { nextRound, setTeams } = gameSlice.actions;
export default gameSlice.reducer;
```

---

## 📊 Data Patterns

### Pattern Example Structure

All examples follow this schema:

```typescript
interface PatternExample {
  id: string;                    // Unique ID (e.g., "creational-01")
  title: string;                 // Descriptive title (no pattern name!)
  category: 'creational' | 'structural' | 'behavioral' | 'multipattern';
  code: string;                  // JavaScript/TypeScript code
  solutionExplanation: string;   // 3-4 sentences explaining the pattern
  solutionPatterns: string[];    // Pattern names (for solution reveal)
}
```

### Example Guidelines

✅ **DO**:
- Write realistic, production-like code
- Use clear variable/class names (no generic `foo`, `bar`)
- Provide 3-4 sentence explanations
- **Avoid pattern hints in class names** (e.g., `UserCache` not `SingletonCache`)

❌ **DON'T**:
- Include pattern names in code (spoils the quiz)
- Write trivial or academic examples
- Skip explanations

```javascript
// ✅ GOOD: No pattern hints
class ConnectionPool {
  constructor() {
    if (ConnectionPool.instance) {
      return ConnectionPool.instance;
    }
    this.connections = [];
    ConnectionPool.instance = this;
  }
}

// ❌ BAD: Pattern name visible
class SingletonConnectionPool { /* ... */ }
```

---

## 🧪 Testing Guidelines

### Test Structure

```typescript
// PATTERN: Test organization
// PURPOSE:
// - Group related tests in describe blocks
// - Use descriptive test names
// - Test behavior, not implementation

describe('RoundController', () => {
  describe('team scoring', () => {
    it('should award points to correct team', () => {
      // Arrange
      const teams = [{ name: 'Team A', points: 0 }];
      
      // Act
      const result = awardPoints(teams, 'Team A', 10);
      
      // Assert
      expect(result[0].points).toBe(10);
    });
  });
});
```

---

## 🚀 Performance Considerations

### Optimization Patterns

**Memoization**:
```typescript
// PATTERN: useMemo for expensive computations
const sortedTeams = useMemo(() => 
  [...teams].sort((a, b) => b.points - a.points),
  [teams]
);
```

**Lazy Loading**:
```typescript
// PATTERN: Dynamic imports for code splitting
const MatchViewer = dynamic(() => import('./match-viewer/page'), {
  loading: () => <Spin />,
});
```

---

## 🤖 AI-Assisted Development

### How AI Can Help

This codebase is structured to help AI assistants:

✅ **Pattern Recognition**:
- File headers identify component types
- Pattern comments label design patterns
- Consistent naming conventions

✅ **Code Generation**:
- Generate new pattern examples following schema
- Create new components using templates
- Add tests following existing patterns

✅ **Refactoring**:
- Identify code smells
- Suggest pattern applications
- Improve TypeScript types

### Working with AI

**When asking AI to:**
- **Add a feature**: Reference similar existing components
- **Fix a bug**: Include error messages and file context
- **Refactor code**: Specify which pattern to apply
- **Write tests**: Point to similar test files

---

## 📚 Learning Resources

### Design Patterns
- **Creational**: Singleton, Factory, Builder, Prototype, Abstract Factory
- **Structural**: Adapter, Proxy, Decorator, Facade, Composite, Bridge, Flyweight
- **Behavioral**: Observer, Strategy, Command, State, Template Method, Iterator, Mediator

### Project-Specific Patterns
- **Redux Toolkit**: Slice pattern, middleware pattern
- **React**: Container/Presentational, Composition, Hooks
- **Next.js**: App Router, Server/Client Components

---

## 🔗 Related Projects

This project is part of a series of interactive learning showcases:

1. **[Angular Showcase](https://github.com/Flame0510/angular-showcase)** - Angular concepts with progressive disclosure
2. **Design Pattern Showcase** (this project) - Design patterns through gamification
3. **Future**: React, Vue, architecture patterns showcases

All projects share the same philosophy:
- **Immersive learning** (no context switching)
- **Progressive depth** (start simple, go deep)
- **AI-assisted development** (clear patterns and documentation)

---

## 📞 Getting Help

- **Issues**: Report bugs or request features
- **Discussions**: Ask questions or share ideas
- **Pull Requests**: Follow contribution guidelines in README.md

---

**Remember**: This documentation is for both humans and AI. Keep it clear, consistent, and helpful! 🚀
