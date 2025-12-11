# Reusable Components Catalog

> **Component Documentation for AI-Assisted Development**  
> Comprehensive guide to all reusable components in the Design Pattern Showcase, including purpose, props, usage examples, patterns, and testing strategies.

---

## 🎯 Purpose

This catalog documents every reusable component in the project, providing:

1. **Component Overview**: What it does and why it exists
2. **Props Interface**: All props with types, defaults, and descriptions
3. **Usage Examples**: Basic and advanced use cases
4. **Design Patterns**: Architectural patterns implemented
5. **Styling Guide**: CSS Modules, Tailwind, Ant Design usage
6. **Testing Strategy**: Key test scenarios and edge cases

---

## 📦 Component Index

### Core Components
- [CodeBlock](#codeblock) - Syntax-highlighted code display
- [ExampleViewer](#exampleviewer) - Pattern example viewer with solution reveal
- [RoundController](#roundcontroller) - Game controller with round management
- [TeamSetup](#teamsetup) - Team configuration and management

### Future Components (Post-Ant Design Migration)
- [PatternBadge](#patternbadge) - *(Planned)* Pattern category badge
- [ScoreBoard](#scoreboard) - *(Planned)* Team scoreboard display
- [GameHistory](#gamehistory) - *(Planned)* Round history viewer

---

## CodeBlock

### Overview

**Purpose**: Display JavaScript/TypeScript code with syntax highlighting and copy-to-clipboard functionality.

**Type**: Presentational Component  
**Section**: UI Components

**Why it exists**: Pattern examples are the core of the quiz game. This component ensures code is readable, syntax-highlighted, and easy to copy for further study.

---

### Props Interface

```typescript
interface CodeBlockProps {
  /** JavaScript/TypeScript code to display */
  code: string;
  
  /** Programming language for syntax highlighting */
  language?: 'javascript' | 'typescript' | 'python' | 'java';
  
  /** Optional title displayed above the code block */
  title?: string;
  
  /** Enable copy-to-clipboard button */
  showCopyButton?: boolean;
  
  /** Custom CSS class for styling overrides */
  className?: string;
}
```

**Default Props**:
```typescript
{
  language: 'javascript',
  showCopyButton: true,
  className: ''
}
```

---

### Usage Examples

#### Basic Usage

```tsx
import { CodeBlock } from '@/components/CodeBlock';

function PatternExample() {
  const code = `
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = createConnection();
    Database.instance = this;
  }
}
  `.trim();
  
  return <CodeBlock code={code} />;
}
```

#### With Title and TypeScript

```tsx
<CodeBlock 
  code={typescriptCode}
  language="typescript"
  title="Singleton Pattern Implementation"
  showCopyButton={true}
/>
```

#### Custom Styling

```tsx
<CodeBlock 
  code={exampleCode}
  className="rounded-lg shadow-md"
/>
```

---

### Design Patterns

**Presentational Component Pattern**:
- No internal state (props only)
- No Redux dependencies
- Pure function of props
- Highly reusable across different contexts

**Custom Syntax Highlighter**:
- Built-in (not Prism.js or Highlight.js)
- Pattern-focused highlighting (keywords, classes, functions)
- Optimized for JavaScript/TypeScript

---

### Styling

**CSS Modules**: `CodeBlock.module.css`

```css
.codeBlock {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
}

.codeBlock__title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #a0a0a0;
}

.codeBlock__pre {
  margin: 0;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.codeBlock__copyButton {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.codeBlock__copyButton:hover {
  background-color: #2563eb;
}
```

**Tailwind Utilities** (applied via className prop):
- `rounded-lg` - Rounded corners
- `shadow-md` - Drop shadow
- `mb-4` - Bottom margin

**Future (Ant Design Migration)**:
```tsx
import { Card } from 'antd';

<Card className="code-block-card">
  <CodeBlock code={code} />
</Card>
```

---

### Testing Strategy

**Key Scenarios**:
1. ✅ Renders code correctly
2. ✅ Applies syntax highlighting
3. ✅ Copy button copies to clipboard
4. ✅ Title is optional (renders without title)
5. ✅ Handles empty code gracefully
6. ✅ Supports multiple languages

**Example Tests**:

```typescript
describe('CodeBlock', () => {
  it('should render code with default language (javascript)', () => {
    render(<CodeBlock code="const x = 42;" />);
    expect(screen.getByText(/const x = 42;/)).toBeInTheDocument();
  });
  
  it('should display title when provided', () => {
    render(<CodeBlock code="const x = 42;" title="Example Code" />);
    expect(screen.getByText('Example Code')).toBeInTheDocument();
  });
  
  it('should copy code to clipboard when button is clicked', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn(() => Promise.resolve()) },
    });
    
    render(<CodeBlock code="const x = 42;" />);
    const copyButton = screen.getByRole('button', { name: /copy/i });
    
    await userEvent.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 42;');
  });
  
  it('should not render copy button when showCopyButton is false', () => {
    render(<CodeBlock code="const x = 42;" showCopyButton={false} />);
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument();
  });
});
```

---

## ExampleViewer

### Overview

**Purpose**: Display pattern examples with code, title, and solution reveal functionality.

**Type**: Presentational Component  
**Section**: UI Components

**Why it exists**: Combines `CodeBlock` with solution explanations, pattern badges, and reveal mechanics. Central UI for the quiz game experience.

---

### Props Interface

```typescript
interface ExampleViewerProps {
  /** Pattern example to display (or null if no example selected) */
  example: PatternExample | null;
  
  /** Whether the solution should be revealed */
  solutionRevealed: boolean;
  
  /** Callback when "Reveal Solution" button is clicked */
  onRevealSolution: () => void;
  
  /** Loading state (when fetching next example) */
  loading?: boolean;
  
  /** Custom CSS class for styling overrides */
  className?: string;
}
```

**Default Props**:
```typescript
{
  loading: false,
  className: ''
}
```

---

### Usage Examples

#### Basic Usage (Container Component)

```tsx
'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { revealSolution } from '@/lib/store/gameSlice';
import { ExampleViewer } from '@/components/ExampleViewer';

function GameView() {
  const dispatch = useAppDispatch();
  const { currentExample, solutionRevealed } = useAppSelector(state => state.game);
  
  const handleRevealSolution = () => {
    dispatch(revealSolution());
  };
  
  return (
    <ExampleViewer 
      example={currentExample}
      solutionRevealed={solutionRevealed}
      onRevealSolution={handleRevealSolution}
    />
  );
}
```

#### With Loading State

```tsx
<ExampleViewer 
  example={currentExample}
  solutionRevealed={solutionRevealed}
  onRevealSolution={handleRevealSolution}
  loading={isLoadingNextExample}
/>
```

---

### Design Patterns

**Presentational Component Pattern**:
- Receives example data via props
- No Redux dependencies (callbacks passed from parent)
- Reusable in different contexts (game, viewer, preview)

**Composition Pattern**:
- Built from smaller components:
  - `CodeBlock` for code display
  - `PatternBadge` for category tags (future)
  - Ant Design `Card`, `Button` (future)

---

### Styling

**CSS Modules**: `ExampleViewer.module.css`

```css
.exampleViewer {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.exampleViewer__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a202c;
}

.exampleViewer__category {
  display: inline-block;
  background-color: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.exampleViewer__solution {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f0fdf4;
  border-left: 4px solid #10b981;
  border-radius: 8px;
}

.exampleViewer__solutionTitle {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #065f46;
}

.exampleViewer__explanation {
  line-height: 1.6;
  color: #374151;
}

.exampleViewer__revealButton {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.exampleViewer__revealButton:hover {
  background-color: #2563eb;
}

.exampleViewer__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
```

**Future (Ant Design Migration)**:
```tsx
import { Card, Button, Tag, Spin } from 'antd';

<Card 
  title={example.title}
  extra={<Tag color="blue">{example.category}</Tag>}
  className="example-viewer-card"
>
  <CodeBlock code={example.code} />
  
  {!solutionRevealed && (
    <Button type="primary" onClick={onRevealSolution}>
      Reveal Solution
    </Button>
  )}
  
  {solutionRevealed && (
    <Card type="inner" title="Solution" className="mt-4">
      <p><strong>Pattern:</strong> {example.solutionPatterns.join(', ')}</p>
      <p>{example.solutionExplanation}</p>
    </Card>
  )}
</Card>
```

---

### Testing Strategy

**Key Scenarios**:
1. ✅ Renders example title and code
2. ✅ Shows category badge
3. ✅ Hides solution initially
4. ✅ Reveals solution when button clicked
5. ✅ Shows loading state
6. ✅ Handles null example gracefully

**Example Tests**:

```typescript
describe('ExampleViewer', () => {
  const mockExample: PatternExample = {
    id: 'creational-01',
    title: 'Database Connection Manager',
    category: 'creational',
    code: 'class Database { /* ... */ }',
    solutionExplanation: 'This is a Singleton pattern...',
    solutionPatterns: ['Singleton'],
  };
  
  it('should render example title and code', () => {
    render(
      <ExampleViewer 
        example={mockExample}
        solutionRevealed={false}
        onRevealSolution={jest.fn()}
      />
    );
    
    expect(screen.getByText('Database Connection Manager')).toBeInTheDocument();
    expect(screen.getByText(/class Database/)).toBeInTheDocument();
  });
  
  it('should hide solution initially', () => {
    render(
      <ExampleViewer 
        example={mockExample}
        solutionRevealed={false}
        onRevealSolution={jest.fn()}
      />
    );
    
    expect(screen.queryByText(/This is a Singleton pattern/)).not.toBeInTheDocument();
  });
  
  it('should reveal solution when button clicked', async () => {
    const onRevealSolution = jest.fn();
    
    render(
      <ExampleViewer 
        example={mockExample}
        solutionRevealed={false}
        onRevealSolution={onRevealSolution}
      />
    );
    
    const revealButton = screen.getByRole('button', { name: /reveal solution/i });
    await userEvent.click(revealButton);
    
    expect(onRevealSolution).toHaveBeenCalledTimes(1);
  });
  
  it('should show solution when solutionRevealed is true', () => {
    render(
      <ExampleViewer 
        example={mockExample}
        solutionRevealed={true}
        onRevealSolution={jest.fn()}
      />
    );
    
    expect(screen.getByText(/This is a Singleton pattern/)).toBeInTheDocument();
    expect(screen.getByText('Singleton')).toBeInTheDocument();
  });
  
  it('should show loading spinner when loading is true', () => {
    render(
      <ExampleViewer 
        example={null}
        solutionRevealed={false}
        onRevealSolution={jest.fn()}
        loading={true}
      />
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner has role="status"
  });
});
```

---

## RoundController

### Overview

**Purpose**: Manage quiz rounds, example selection, and game flow.

**Type**: Container Component  
**Section**: Game Logic

**Why it exists**: Centralized logic for advancing rounds, selecting examples by category, tracking history, and managing solution reveal state.

---

### Props Interface

```typescript
// RoundController is a container component with no props
// It connects directly to Redux store

interface RoundControllerInternalState {
  // No component-level state (all in Redux)
}
```

**Redux State Dependencies**:
```typescript
const { 
  currentRound, 
  currentExample, 
  exampleHistory, 
  solutionRevealed 
} = useAppSelector(state => state.game);
```

---

### Usage Examples

#### Basic Usage (App Router Page)

```tsx
'use client';

import { RoundController } from '@/components/RoundController';

export default function GamePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Design Pattern Quiz</h1>
      <RoundController />
    </div>
  );
}
```

---

### Design Patterns

**Container Component Pattern**:
- Manages state and logic (Redux integration)
- Delegates rendering to presentational components
- Handles all side effects (example selection, history updates)

**Redux Toolkit Slice Pattern**:
- Dispatches actions to update global state
- Selects state slices for rendering
- Uses typed hooks (`useAppSelector`, `useAppDispatch`)

**Strategy Pattern** (Example Selection):
- Different selection strategies per category
- Delegates to `getRandomExample()` utility
- Excludes already-shown examples

---

### Styling

**CSS Modules**: `RoundController.module.css`

```css
.roundController {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.roundController__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.roundController__round {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
}

.roundController__categorySelector {
  display: flex;
  gap: 0.5rem;
}

.roundController__categoryButton {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.roundController__categoryButton--active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.roundController__actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.roundController__button {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.roundController__button--primary {
  background-color: #3b82f6;
  color: white;
}

.roundController__button--primary:hover {
  background-color: #2563eb;
}

.roundController__button--secondary {
  background-color: #e5e7eb;
  color: #1a202c;
}

.roundController__button--secondary:hover {
  background-color: #d1d5db;
}
```

**Future (Ant Design Migration)**:
```tsx
import { Card, Button, Radio, Space } from 'antd';

<Card title={`Round ${currentRound}`}>
  <Space direction="vertical" style={{ width: '100%' }}>
    <Radio.Group value={selectedCategory} onChange={handleCategoryChange}>
      <Radio.Button value="creational">Creational</Radio.Button>
      <Radio.Button value="structural">Structural</Radio.Button>
      <Radio.Button value="behavioral">Behavioral</Radio.Button>
      <Radio.Button value="multipattern">Multi-Pattern</Radio.Button>
      <Radio.Button value="all">All Categories</Radio.Button>
    </Radio.Group>
    
    <ExampleViewer 
      example={currentExample}
      solutionRevealed={solutionRevealed}
      onRevealSolution={handleRevealSolution}
    />
    
    <Space>
      <Button type="primary" onClick={handleNextRound}>Next Round</Button>
      <Button onClick={handleResetGame}>Reset Game</Button>
    </Space>
  </Space>
</Card>
```

---

### Testing Strategy

**Key Scenarios**:
1. ✅ Selects example when category chosen
2. ✅ Advances to next round
3. ✅ Tracks example history (no repeats)
4. ✅ Reveals solution
5. ✅ Resets game state
6. ✅ Handles "all examples shown" edge case

**Example Tests**:

```typescript
import { renderWithProviders } from '@/test-utils/redux';

describe('RoundController', () => {
  it('should display current round number', () => {
    renderWithProviders(<RoundController />, {
      preloadedState: { game: { currentRound: 5, /* ... */ } }
    });
    
    expect(screen.getByText('Round 5')).toBeInTheDocument();
  });
  
  it('should select a new example when category is chosen', async () => {
    const { store } = renderWithProviders(<RoundController />);
    
    const creationalButton = screen.getByRole('button', { name: /creational/i });
    await userEvent.click(creationalButton);
    
    const state = store.getState();
    expect(state.game.currentExample).not.toBeNull();
    expect(state.game.currentExample?.category).toBe('creational');
  });
  
  it('should add example to history when advancing round', async () => {
    const { store } = renderWithProviders(<RoundController />, {
      preloadedState: { game: { currentExample: mockExample, /* ... */ } }
    });
    
    const nextButton = screen.getByRole('button', { name: /next round/i });
    await userEvent.click(nextButton);
    
    const state = store.getState();
    expect(state.game.exampleHistory).toContain(mockExample.id);
  });
});
```

---

## TeamSetup

### Overview

**Purpose**: Configure teams (name, color) before starting the quiz.

**Type**: Container Component  
**Section**: Game Logic

**Why it exists**: Teams are the foundation of the quiz game. This component collects team data and dispatches to Redux for global state management.

---

### Props Interface

```typescript
// TeamSetup connects to Redux (no external props)

interface TeamSetupInternalState {
  // Temporary local state before dispatch
  newTeamName: string;
  newTeamColor: string;
}
```

**Redux State Dependencies**:
```typescript
const { teams } = useAppSelector(state => state.game);
const dispatch = useAppDispatch();
```

---

### Usage Examples

#### Basic Usage

```tsx
'use client';

import { TeamSetup } from '@/components/TeamSetup';

export default function SetupPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Team Setup</h1>
      <TeamSetup />
    </div>
  );
}
```

---

### Design Patterns

**Container Component Pattern**:
- Manages local form state (temporary)
- Dispatches to Redux on submit
- Validates team data before dispatch

**Controlled Components**:
- Form inputs controlled by React state
- `value` and `onChange` props

---

### Styling

**CSS Modules**: `TeamSetup.module.css`

```css
.teamSetup {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.teamSetup__form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.teamSetup__input {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  font-size: 1rem;
}

.teamSetup__colorPicker {
  width: 60px;
  height: 44px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  cursor: pointer;
}

.teamSetup__addButton {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: #10b981;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.teamSetup__addButton:hover {
  background-color: #059669;
}

.teamSetup__teamList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.teamSetup__teamItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background-color: #f9fafb;
}

.teamSetup__teamName {
  font-weight: 600;
  font-size: 1.125rem;
}

.teamSetup__teamPoints {
  color: #6b7280;
}

.teamSetup__removeButton {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.teamSetup__removeButton:hover {
  background-color: #dc2626;
}
```

**Future (Ant Design Migration)**:
```tsx
import { Card, Form, Input, ColorPicker, Button, List, Tag } from 'antd';

<Card title="Team Setup">
  <Form onFinish={handleAddTeam}>
    <Form.Item label="Team Name" name="teamName" rules={[{ required: true }]}>
      <Input placeholder="Enter team name" />
    </Form.Item>
    
    <Form.Item label="Team Color" name="teamColor">
      <ColorPicker defaultValue="#3b82f6" />
    </Form.Item>
    
    <Button type="primary" htmlType="submit">Add Team</Button>
  </Form>
  
  <List
    dataSource={teams}
    renderItem={(team) => (
      <List.Item
        actions={[
          <Button danger onClick={() => handleRemoveTeam(team.name)}>Remove</Button>
        ]}
      >
        <List.Item.Meta
          avatar={<Tag color={team.color}>{team.name}</Tag>}
          title={`${team.name}: ${team.points} points`}
        />
      </List.Item>
    )}
  />
</Card>
```

---

### Testing Strategy

**Key Scenarios**:
1. ✅ Adds team with name and color
2. ✅ Removes team
3. ✅ Validates team name (no duplicates, no empty)
4. ✅ Updates Redux state
5. ✅ Resets form after adding team

**Example Tests**:

```typescript
describe('TeamSetup', () => {
  it('should add a new team when form is submitted', async () => {
    const { store } = renderWithProviders(<TeamSetup />);
    
    const nameInput = screen.getByPlaceholderText(/team name/i);
    const addButton = screen.getByRole('button', { name: /add team/i });
    
    await userEvent.type(nameInput, 'Team Alpha');
    await userEvent.click(addButton);
    
    const state = store.getState();
    expect(state.game.teams).toHaveLength(1);
    expect(state.game.teams[0].name).toBe('Team Alpha');
  });
  
  it('should not add team with duplicate name', async () => {
    renderWithProviders(<TeamSetup />, {
      preloadedState: { game: { teams: [{ name: 'Team Alpha', points: 0, color: '#3b82f6' }] } }
    });
    
    const nameInput = screen.getByPlaceholderText(/team name/i);
    const addButton = screen.getByRole('button', { name: /add team/i });
    
    await userEvent.type(nameInput, 'Team Alpha');
    await userEvent.click(addButton);
    
    expect(screen.getByText(/team name already exists/i)).toBeInTheDocument();
  });
  
  it('should remove team when remove button is clicked', async () => {
    const { store } = renderWithProviders(<TeamSetup />, {
      preloadedState: { game: { teams: [{ name: 'Team Alpha', points: 10, color: '#3b82f6' }] } }
    });
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    await userEvent.click(removeButton);
    
    const state = store.getState();
    expect(state.game.teams).toHaveLength(0);
  });
});
```

---

## Future Components

### PatternBadge

**Purpose**: Display pattern category badges with consistent styling.

**Props**:
```typescript
interface PatternBadgeProps {
  category: 'creational' | 'structural' | 'behavioral' | 'multipattern';
  size?: 'small' | 'medium' | 'large';
}
```

**Implementation** (Ant Design):
```tsx
import { Tag } from 'antd';

const CATEGORY_COLORS = {
  creational: 'blue',
  structural: 'green',
  behavioral: 'orange',
  multipattern: 'purple',
};

export function PatternBadge({ category, size = 'medium' }: PatternBadgeProps) {
  return (
    <Tag color={CATEGORY_COLORS[category]} className={`badge-${size}`}>
      {category.toUpperCase()}
    </Tag>
  );
}
```

---

### ScoreBoard

**Purpose**: Display team scores in a leaderboard format.

**Props**:
```typescript
interface ScoreBoardProps {
  teams: Team[];
  highlightTopTeam?: boolean;
}
```

**Implementation** (Ant Design):
```tsx
import { Card, List, Badge } from 'antd';

export function ScoreBoard({ teams, highlightTopTeam = true }: ScoreBoardProps) {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
  
  return (
    <Card title="Scoreboard">
      <List
        dataSource={sortedTeams}
        renderItem={(team, index) => (
          <List.Item className={highlightTopTeam && index === 0 ? 'top-team' : ''}>
            <List.Item.Meta
              avatar={<Badge count={index + 1} style={{ backgroundColor: team.color }} />}
              title={team.name}
              description={`${team.points} points`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
```

---

### GameHistory

**Purpose**: Display history of rounds and examples shown.

**Props**:
```typescript
interface GameHistoryProps {
  history: string[]; // Array of example IDs
  examples: Record<string, PatternExample>; // Lookup table
}
```

**Implementation** (Ant Design):
```tsx
import { Timeline, Card } from 'antd';

export function GameHistory({ history, examples }: GameHistoryProps) {
  return (
    <Card title="Game History">
      <Timeline>
        {history.map((exampleId, index) => {
          const example = examples[exampleId];
          return (
            <Timeline.Item key={exampleId}>
              <strong>Round {index + 1}:</strong> {example?.title || 'Unknown Example'}
              <br />
              <PatternBadge category={example?.category} size="small" />
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Card>
  );
}
```

---

## 🧪 Testing Utilities

### Redux Test Helpers

```typescript
// test-utils/redux.tsx
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/lib/store/gameSlice';

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { game: gameReducer },
      preloadedState,
    }),
    ...renderOptions
  }: RenderOptions & { preloadedState?: any; store?: any } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
```

**Usage**:
```typescript
import { renderWithProviders } from '@/test-utils/redux';

it('should display teams from Redux state', () => {
  renderWithProviders(<TeamSetup />, {
    preloadedState: {
      game: {
        teams: [{ name: 'Team A', points: 10, color: '#3b82f6' }],
      },
    },
  });
  
  expect(screen.getByText('Team A: 10 points')).toBeInTheDocument();
});
```

---

## 📚 Summary

| Component | Type | Purpose | Patterns |
|-----------|------|---------|----------|
| **CodeBlock** | Presentational | Syntax-highlighted code display | Presentational Component |
| **ExampleViewer** | Presentational | Pattern example + solution viewer | Presentational Component, Composition |
| **RoundController** | Container | Game flow and round management | Container/Presentational Split, Redux Toolkit |
| **TeamSetup** | Container | Team configuration | Container/Presentational Split, Controlled Components |

---

## 🔗 Related Documentation

- [Main Copilot Instructions](../copilot-instructions.md) - Project overview
- [Project Structure](./project-structure.md) - File organization
- [Styling Conventions](./styling-conventions.md) - Ant Design + Tailwind
- [Commenting Standards](./commenting-standards.md) - File headers and comments

---

**Remember**: Components should be **reusable**, **testable**, and **well-documented**. Keep the Container/Presentational split clear for maintainability! 🚀
