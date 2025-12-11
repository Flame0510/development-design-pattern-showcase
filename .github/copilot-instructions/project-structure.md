# Project Structure

> **Directory Organization and File Naming Conventions**  
> This document describes how the Design Pattern Showcase codebase is organized.

---

## 📁 Directory Tree

```
design-pattern-showcase/
├── .github/
│   ├── copilot-instructions.md          # Main AI assistant guide
│   └── copilot-instructions/
│       ├── project-structure.md         # This file
│       ├── styling-conventions.md       # CSS/Tailwind guidelines
│       ├── commenting-standards.md      # Code documentation
│       └── reusable-components.md       # Component catalog
│
├── app/                                 # Next.js App Router
│   ├── layout.tsx                       # Root layout with providers
│   ├── page.tsx                         # Home page (game setup)
│   ├── page.module.css                  # Home page styles
│   ├── globals.css                      # Global CSS + Tailwind
│   │
│   └── match-viewer/                    # Live game viewer route
│       ├── page.tsx                     # Match viewer component
│       └── page.module.css              # Match viewer styles
│
├── components/                          # Reusable UI components
│   ├── CodeBlock.tsx                    # Syntax-highlighted code display
│   ├── CodeBlock.module.css
│   ├── ExampleViewer.tsx                # Pattern example display
│   ├── ExampleViewer.module.css
│   ├── RoundController.tsx              # Game round management
│   ├── RoundController.module.css
│   ├── TeamSetup.tsx                    # Team configuration UI
│   └── TeamSetup.module.css
│
├── data/                                # Pattern examples (JSON)
│   ├── creational.json                  # 50 creational pattern examples
│   ├── structural.json                  # 50 structural pattern examples
│   ├── behavioral.json                  # 50 behavioral pattern examples
│   └── multipattern.json                # 50 multi-pattern examples
│
├── lib/                                 # Core libraries and utilities
│   ├── store/                           # Redux Toolkit state management
│   │   ├── index.ts                     # Store configuration + middleware
│   │   ├── gameSlice.ts                 # Game state slice
│   │   └── hooks.ts                     # Typed Redux hooks
│   │
│   ├── examples.ts                      # Example loading utilities
│   └── types.ts                         # TypeScript type definitions
│
├── public/                              # Static assets
│   ├── favicon.ico
│   └── images/
│
├── .editorconfig                        # Editor configuration
├── .eslintrc.json                       # ESLint rules
├── .gitignore                           # Git ignore patterns
├── next.config.ts                       # Next.js configuration
├── next-env.d.ts                        # Next.js TypeScript types
├── package.json                         # Dependencies and scripts
├── README.md                            # Project documentation
├── tailwind.config.ts                   # Tailwind CSS configuration
├── tsconfig.json                        # TypeScript configuration
├── EXAMPLES_TODO.md                     # Example tracking (dev only)
└── SCRIPTS.md                           # Development scripts (dev only)
```

---

## 🗂️ Directory Purposes

### `/app` - Next.js App Router

**Purpose**: Application routes and pages using Next.js 13+ App Router.

**Structure**:
- Each route is a folder with `page.tsx`
- Layouts defined in `layout.tsx`
- Styles co-located as `page.module.css`

**Naming Convention**:
- Route folders: lowercase with hyphens (`match-viewer/`)
- Page files: `page.tsx` (Next.js convention)
- Layout files: `layout.tsx` (Next.js convention)

**Example**:
```
app/
  layout.tsx          # Root layout (providers, fonts)
  page.tsx            # Home route (/)
  match-viewer/
    page.tsx          # /match-viewer route
```

---

### `/components` - Reusable UI Components

**Purpose**: Shared React components used across multiple pages.

**Component Types**:
1. **Presentational**: Display UI based on props (e.g., `ExampleViewer.tsx`)
2. **Container**: Manage state and logic (e.g., `RoundController.tsx`)
3. **Utility**: Helper components (e.g., `CodeBlock.tsx`)

**Naming Convention**:
- Component files: PascalCase (`TeamSetup.tsx`)
- Style modules: Same name + `.module.css` (`TeamSetup.module.css`)
- One component per file

**File Structure**:
```typescript
// TeamSetup.tsx
/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 * ...
 */

import styles from './TeamSetup.module.css';

export default function TeamSetup({ teams, onTeamsChange }) {
  // Implementation
}
```

**CSS Modules**:
```css
/* TeamSetup.module.css */
.container {
  @apply p-6 bg-white rounded-lg shadow-md;
}

.teamList {
  @apply space-y-4;
}
```

---

### `/data` - Pattern Examples

**Purpose**: JSON files containing design pattern code examples.

**Categories**:
- `creational.json` - Object creation patterns (Singleton, Factory, etc.)
- `structural.json` - Object composition patterns (Adapter, Proxy, etc.)
- `behavioral.json` - Object interaction patterns (Observer, Strategy, etc.)
- `multipattern.json` - Combined pattern examples

**Schema**:
```typescript
interface PatternExample {
  id: string;                    // "creational-01"
  title: string;                 // "Database connection pooling"
  category: string;              // "creational"
  code: string;                  // JavaScript code (no pattern hints!)
  solutionExplanation: string;   // 3-4 sentences
  solutionPatterns: string[];    // ["Singleton"]
}
```

**Naming Convention**:
- IDs: `{category}-{number}` (e.g., `structural-23`)
- Files: lowercase with hyphens

---

### `/lib` - Core Libraries

**Purpose**: Business logic, utilities, and shared code.

**Subdirectories**:

#### `/lib/store` - Redux State Management

```
lib/store/
  index.ts         # Store configuration, middleware
  gameSlice.ts     # Game state slice (teams, rounds, examples)
  hooks.ts         # Typed useAppSelector, useAppDispatch
```

**Pattern**: Redux Toolkit with centralized store pattern.

#### Root `/lib` Files

- `examples.ts` - Load and filter pattern examples from JSON
- `types.ts` - TypeScript interfaces and type definitions

**Naming Convention**:
- Files: camelCase (`gameSlice.ts`, `examples.ts`)
- Exported functions: camelCase (`loadExamples()`)
- Exported types: PascalCase (`GameState`, `PatternExample`)

---

## 📝 File Naming Conventions

### TypeScript/TSX Files

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase.tsx | `CodeBlock.tsx` |
| Utilities | camelCase.ts | `examples.ts` |
| Types/Interfaces | camelCase.ts | `types.ts` |
| Redux Slices | camelCase.ts | `gameSlice.ts` |
| Hooks | camelCase.ts | `hooks.ts` |

### CSS Files

| Type | Convention | Example |
|------|------------|---------|
| CSS Modules | PascalCase.module.css | `CodeBlock.module.css` |
| Global Styles | lowercase.css | `globals.css` |

### JSON Data Files

| Type | Convention | Example |
|------|------------|---------|
| Data Files | lowercase-hyphen.json | `creational.json` |

### Configuration Files

| Type | Convention | Example |
|------|------------|---------|
| Next.js Config | next.config.ts | Fixed name |
| TypeScript Config | tsconfig.json | Fixed name |
| Tailwind Config | tailwind.config.ts | Fixed name |

---

## 🎯 Component Organization Patterns

### Presentational vs Container Components

**Presentational** (`components/ExampleViewer.tsx`):
```typescript
// COMPONENT TYPE: Presentational
// - Receives data via props
// - No Redux hooks
// - Focuses on UI rendering

interface ExampleViewerProps {
  example: PatternExample;
  solutionRevealed: boolean;
}

export default function ExampleViewer({ example, solutionRevealed }: ExampleViewerProps) {
  return (
    <div>
      <CodeBlock code={example.code} />
      {solutionRevealed && <p>{example.solutionExplanation}</p>}
    </div>
  );
}
```

**Container** (`components/RoundController.tsx`):
```typescript
// COMPONENT TYPE: Container
// - Manages state with Redux
// - Contains business logic
// - Composes presentational components

export default function RoundController() {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(state => state.game.teams);
  
  const handleAwardPoints = (teamName: string) => {
    // Business logic
    dispatch(awardPoint(teamName));
  };
  
  return (
    <div>
      <ExampleViewer example={currentExample} />
      <TeamList teams={teams} onAwardPoints={handleAwardPoints} />
    </div>
  );
}
```

---

## 📦 Import Conventions

### Import Order

1. External libraries (React, Next.js, Ant Design)
2. Internal libraries (`lib/`)
3. Components (`components/`)
4. Styles
5. Types

```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';

// 2. Internal libraries
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { nextRound } from '@/lib/store/gameSlice';
import { loadExamples } from '@/lib/examples';

// 3. Components
import CodeBlock from '@/components/CodeBlock';
import ExampleViewer from '@/components/ExampleViewer';

// 4. Styles
import styles from './RoundController.module.css';

// 5. Types
import type { PatternExample, Team } from '@/lib/types';
```

### Path Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/data/*": ["./data/*"]
    }
  }
}
```

**Usage**:
```typescript
// ✅ GOOD: Absolute imports
import CodeBlock from '@/components/CodeBlock';
import { loadExamples } from '@/lib/examples';

// ❌ BAD: Relative imports
import CodeBlock from '../../../components/CodeBlock';
```

---

## 🗄️ State Management Structure

### Redux Store Organization

```
lib/store/
  ├── index.ts              # Store setup
  │   - configureStore()
  │   - syncWithLocalStorage middleware
  │   - RootState and AppDispatch types
  │
  ├── gameSlice.ts          # Game state slice
  │   - teams: Team[]
  │   - currentRound: number
  │   - currentExample: PatternExample | null
  │   - exampleHistory: string[]
  │   - solutionRevealed: boolean
  │   - Actions: setTeams, nextRound, revealSolution, etc.
  │
  └── hooks.ts              # Typed hooks
      - useAppSelector (typed version of useSelector)
      - useAppDispatch (typed version of useDispatch)
```

**Pattern**: Single centralized store (Redux pattern, not feature slices).

---

## 🎨 Style Organization

### CSS Modules Pattern

Each component has its own CSS Module:

```
components/
  CodeBlock.tsx
  CodeBlock.module.css      # Scoped to CodeBlock
  
  ExampleViewer.tsx
  ExampleViewer.module.css  # Scoped to ExampleViewer
```

**Benefits**:
- Scoped styles (no global conflicts)
- Co-located with component
- Works with Tailwind `@apply`

### Global Styles

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global resets and base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
}
```

---

## 📐 Adding New Features

### Adding a New Page

1. Create route folder: `app/new-page/`
2. Create `page.tsx` with file header
3. Create `page.module.css` if needed
4. Update navigation links

### Adding a New Component

1. Create `components/NewComponent.tsx`
2. Add file header (COMPONENT TYPE, ROLE, PATTERNS)
3. Create `components/NewComponent.module.css`
4. Document in `reusable-components.md`
5. Export from `components/index.ts` if needed

### Adding New Pattern Examples

1. Open appropriate JSON file (`data/creational.json`, etc.)
2. Follow schema: `{ id, title, category, code, solutionExplanation, solutionPatterns }`
3. Avoid pattern hints in code (class names, variables)
4. Write 3-4 sentence explanation
5. Test in game UI

---

## 🧪 Testing Structure

```
components/
  CodeBlock.tsx
  CodeBlock.test.tsx        # Jest/React Testing Library tests
  
lib/store/
  gameSlice.ts
  gameSlice.test.ts         # Redux slice tests
```

**Naming**: Same as source file with `.test.ts(x)` suffix.

---

## 📚 Documentation Files

### Repository Root

- `README.md` - Main project documentation (showcase philosophy)
- `EXAMPLES_TODO.md` - Pattern example tracking (development only)
- `SCRIPTS.md` - Development commands (development only)

### `.github/copilot-instructions/`

- `copilot-instructions.md` - Main AI guide
- `project-structure.md` - This file
- `styling-conventions.md` - CSS/Tailwind guidelines
- `commenting-standards.md` - Code documentation standards
- `reusable-components.md` - Component catalog

---

## 🔑 Key Takeaways

1. **Routes in `/app`**: Next.js App Router pattern
2. **Components in `/components`**: Reusable UI components
3. **Data in `/data`**: JSON pattern examples
4. **Logic in `/lib`**: State management, utilities, types
5. **Styles**: CSS Modules + Tailwind hybrid
6. **Naming**: PascalCase components, camelCase utilities
7. **Imports**: Use path aliases (`@/components/*`)
8. **Documentation**: File headers + pattern comments

---

**Remember**: Organization enables scalability. Follow these patterns consistently! 🚀
