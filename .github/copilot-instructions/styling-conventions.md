# Styling Conventions

> **Ant Design + Tailwind CSS Guidelines**  
> This document describes styling best practices for Design Pattern Showcase.

---

## 🎨 Style Architecture Overview

Design Pattern Showcase uses a **hybrid approach**:

- **Ant Design**: Complex components (modals, forms, tables, buttons)
- **Tailwind CSS**: Layout, spacing, typography, utilities
- **CSS Modules**: Component-specific styles

**Philosophy**: Use Ant Design for rich UI components, Tailwind for layout and utilities, CSS Modules for custom component styling.

---

## 🔷 Ant Design Usage

### When to Use Ant Design

✅ **USE** Ant Design for:
- **Forms**: Input, Select, Checkbox, Radio, DatePicker
- **Data Display**: Table, Card, Descriptions, Timeline
- **Feedback**: Modal, Message, Notification, Alert, Spin
- **Navigation**: Menu, Tabs, Breadcrumb, Pagination
- **Buttons**: Button, IconButton with consistent variants

```tsx
import { Button, Card, Modal, Form, Input, Table } from 'antd';

// ✅ GOOD: Ant Design for complex components
<Card title="Team Setup" bordered={false} className="shadow-lg">
  <Form layout="vertical">
    <Form.Item label="Team Name" name="teamName" rules={[{ required: true }]}>
      <Input placeholder="Enter team name" />
    </Form.Item>
    <Button type="primary" htmlType="submit">
      Add Team
    </Button>
  </Form>
</Card>
```

### Ant Design Theme Configuration

Configure in `app/layout.tsx`:

```tsx
import { ConfigProvider } from 'antd';

const theme = {
  token: {
    // Primary color (professional blue)
    colorPrimary: '#1890ff',
    
    // Success/Error colors (pattern quiz feedback)
    colorSuccess: '#52c41a',
    colorError: '#ff4d4f',
    colorWarning: '#faad14',
    
    // Typography
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 14,
    
    // Borders and radius
    borderRadius: 8,
    borderRadiusLG: 12,
    
    // Layout
    padding: 16,
    paddingLG: 24,
  },
  components: {
    Button: {
      controlHeight: 40,
      controlHeightLG: 48,
    },
    Card: {
      borderRadiusLG: 12,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ConfigProvider theme={theme}>
      {children}
    </ConfigProvider>
  );
}
```

### Ant Design + Tailwind Integration

Combine Ant Design components with Tailwind utilities:

```tsx
// ✅ GOOD: Ant Design component with Tailwind classes
<Card 
  title="Code Example" 
  className="shadow-md rounded-xl mb-6 hover:shadow-lg transition-shadow"
>
  <div className="p-4 bg-gray-50 rounded-lg">
    <CodeBlock code={example.code} language="javascript" />
  </div>
</Card>

<Button 
  type="primary" 
  size="large"
  className="mt-4 shadow-sm hover:shadow-md transition-all"
>
  Reveal Solution
</Button>
```

---

## 🎨 Tailwind CSS Usage

### When to Use Tailwind

✅ **USE** Tailwind for:
- **Layout**: Flexbox, Grid, Container
- **Spacing**: Padding, Margin, Gap
- **Typography**: Font sizes, weights, line heights
- **Colors**: Background, text, borders
- **Responsive design**: Breakpoints (sm, md, lg, xl)
- **Utilities**: Shadows, transitions, transforms

### Mobile-First Approach

**Always start with mobile base styles, then add breakpoints:**

```tsx
// ✅ GOOD: Mobile-first responsive design
<div className="
  p-4 md:p-6 lg:p-8
  text-base md:text-lg lg:text-xl
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
">
  {/* Content */}
</div>

// ❌ BAD: Desktop-first (don't do this)
<div className="lg:p-8 md:p-6 p-4">
  {/* Content */}
</div>
```

### Tailwind Breakpoints

```css
/* Mobile first: default (< 640px) */
.class { }

/* Tablet: 640px and up */
@media (min-width: 640px) { }  /* sm: */

/* Laptop: 768px and up */
@media (min-width: 768px) { }  /* md: */

/* Desktop: 1024px and up */
@media (min-width: 1024px) { } /* lg: */

/* Large Desktop: 1280px and up */
@media (min-width: 1280px) { } /* xl: */

/* Extra Large: 1536px and up */
@media (min-width: 1536px) { } /* 2xl: */
```

**Usage**:
```tsx
<h1 className="
  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  font-bold
  mb-4 md:mb-6 lg:mb-8
">
  Design Patterns
</h1>
```

### Tailwind Layout Patterns

#### Flexbox Layout

```tsx
// Horizontal flex with space-between
<div className="flex items-center justify-between">
  <h2>Title</h2>
  <Button>Action</Button>
</div>

// Vertical flex with gap
<div className="flex flex-col gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</div>

// Centered content
<div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
    <h1>Centered Content</h1>
  </div>
</div>
```

#### Grid Layout

```tsx
// Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <PatternCard />
  <PatternCard />
  <PatternCard />
</div>

// Auto-fit grid (fills available space)
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
  <Card />
  <Card />
</div>
```

### Tailwind Color Palette

Use **semantic color names** aligned with design patterns theme:

```tsx
// ✅ GOOD: Semantic colors
<div className="
  bg-white
  border border-gray-200
  text-gray-900
">
  <h3 className="text-blue-600">Singleton Pattern</h3>
  <p className="text-gray-600">Description</p>
  <Badge className="bg-green-100 text-green-800">Creational</Badge>
</div>

// Pattern category colors
const categoryColors = {
  creational: 'bg-blue-100 text-blue-800 border-blue-200',
  structural: 'bg-purple-100 text-purple-800 border-purple-200',
  behavioral: 'bg-green-100 text-green-800 border-green-200',
  multipattern: 'bg-orange-100 text-orange-800 border-orange-200',
};
```

---

## 📦 CSS Modules

### When to Use CSS Modules

✅ **USE** CSS Modules for:
- Complex component-specific styles
- Animations and keyframes
- Styles that can't be expressed with Tailwind
- When you need `:hover`, `:focus` pseudo-classes with complex logic

### CSS Module Structure

```css
/* CodeBlock.module.css */

/* ═══ CONTAINER ═══ */
.container {
  @apply bg-gray-900 rounded-lg overflow-hidden shadow-lg;
}

/* ═══ HEADER ═══ */
.header {
  @apply flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700;
}

.languageLabel {
  @apply text-xs font-semibold text-gray-400 uppercase tracking-wide;
}

/* ═══ CONTENT ═══ */
.content {
  @apply p-6 overflow-x-auto;
}

.code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #e2e8f0;
}

/* ═══ SYNTAX HIGHLIGHTING ═══ */
.keyword {
  color: #c792ea;
}

.string {
  color: #c3e88d;
}

.function {
  color: #82aaff;
}

.comment {
  color: #546e7a;
  font-style: italic;
}

/* ═══ COPY BUTTON ═══ */
.copyButton {
  @apply px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors;
}

.copyButton:active {
  @apply scale-95;
}

.copyButton.copied {
  @apply bg-green-600 hover:bg-green-700;
}

/* ═══ ANIMATIONS ═══ */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fadeIn {
  animation: fadeIn 0.3s ease-out;
}
```

### Using CSS Modules in Components

```tsx
import styles from './CodeBlock.module.css';

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.languageLabel}>{language}</span>
        <button 
          className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className={styles.content}>
        <pre className={styles.code}>
          <code>{highlightedCode}</code>
        </pre>
      </div>
    </div>
  );
}
```

### Combining CSS Modules with Tailwind

```tsx
// ✅ GOOD: Mix CSS Modules and Tailwind
<div className={`${styles.card} mb-6 shadow-lg`}>
  <h3 className={`${styles.title} text-2xl font-bold`}>
    Pattern Example
  </h3>
</div>

// Use clsx/classnames for conditional classes
import clsx from 'clsx';

<div className={clsx(
  styles.button,
  'px-4 py-2 rounded',
  isActive && 'bg-blue-600',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
  Click me
</div>
```

---

## 🎯 Design System Tokens

### Color Palette

```tsx
// Tailwind config (tailwind.config.ts)
export default {
  theme: {
    extend: {
      colors: {
        // Pattern category colors
        'pattern-creational': {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'pattern-structural': {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        'pattern-behavioral': {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      }
    }
  }
}
```

### Typography Scale

```tsx
// Font sizes (Tailwind utilities)
<h1 className="text-4xl font-bold">Main Title</h1>
<h2 className="text-3xl font-semibold">Section Title</h2>
<h3 className="text-2xl font-semibold">Subsection</h3>
<p className="text-base">Body text</p>
<span className="text-sm text-gray-600">Caption</span>
<code className="text-xs font-mono">Code snippet</code>
```

### Spacing Scale

```tsx
// Consistent spacing (multiples of 4)
<div className="p-4">      {/* 16px */}
<div className="p-6">      {/* 24px */}
<div className="p-8">      {/* 32px */}

<div className="gap-2">    {/* 8px */}
<div className="gap-4">    {/* 16px */}
<div className="gap-6">    {/* 24px */}

<div className="mb-4">     {/* 16px bottom margin */}
<div className="mt-8">     {/* 32px top margin */}
```

---

## ♿ Accessibility Guidelines

### Color Contrast

Ensure **WCAG AA** compliance (4.5:1 for normal text, 3:1 for large text):

```tsx
// ✅ GOOD: High contrast
<p className="text-gray-900 bg-white">High contrast text</p>
<Button type="primary">Accessible button</Button>

// ❌ BAD: Low contrast
<p className="text-gray-400 bg-gray-300">Hard to read</p>
```

### Focus States

Always provide visible focus indicators:

```css
/* CSS Module */
.button:focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}

.input:focus {
  @apply border-blue-500 ring-2 ring-blue-200;
}
```

```tsx
// Tailwind utilities
<button className="focus:ring-2 focus:ring-blue-500 focus:outline-none">
  Click me
</button>

<input className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
```

### Semantic HTML

Use proper HTML elements:

```tsx
// ✅ GOOD: Semantic HTML
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Title</h1>
    <section>
      <h2>Section</h2>
      <p>Content</p>
    </section>
  </article>
</main>

// ❌ BAD: Divitis
<div>
  <div>
    <div onClick={handleClick}>Home</div>
  </div>
</div>
```

---

## 🚀 Performance Best Practices

### Lazy Loading Styles

Use CSS Modules to automatically code-split styles:

```tsx
// Styles are automatically lazy-loaded with component
import styles from './HeavyComponent.module.css';
```

### Avoid Inline Styles

```tsx
// ❌ BAD: Inline styles (no reusability, no caching)
<div style={{ padding: '16px', backgroundColor: '#fff' }}>

// ✅ GOOD: Tailwind utilities (cached, reusable)
<div className="p-4 bg-white">
```

### Minimize Tailwind Classes

```tsx
// ❌ BAD: Too many classes
<div className="rounded-lg shadow-md border border-gray-200 p-6 bg-white hover:shadow-lg transition-shadow duration-300">

// ✅ BETTER: Extract to CSS Module
/* Component.module.css */
.card {
  @apply rounded-lg shadow-md border border-gray-200 p-6 bg-white hover:shadow-lg transition-shadow duration-300;
}

// Component.tsx
<div className={styles.card}>
```

---

## 📐 Layout Patterns

### Container Widths

```tsx
// Full width
<div className="w-full">

// Centered container with max width
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Narrow content (for reading)
<div className="max-w-3xl mx-auto">
  <article className="prose lg:prose-lg">
    {/* Markdown content */}
  </article>
</div>
```

### Card Layouts

```tsx
// Standard card with Ant Design + Tailwind
<Card 
  title="Pattern Example"
  className="rounded-xl shadow-md hover:shadow-lg transition-shadow"
  bodyStyle={{ padding: '24px' }}
>
  <div className="space-y-4">
    <CodeBlock code={code} />
    <Button type="primary" block>Reveal Solution</Button>
  </div>
</Card>
```

### Modal Layouts

```tsx
import { Modal } from 'antd';

<Modal
  title="Solution Explanation"
  open={isOpen}
  onCancel={handleClose}
  footer={[
    <Button key="close" onClick={handleClose}>Close</Button>,
    <Button key="next" type="primary" onClick={handleNext}>Next Round</Button>
  ]}
  width={800}
  className="rounded-xl"
>
  <div className="space-y-4">
    <p className="text-lg font-semibold text-gray-900">
      {pattern.name}
    </p>
    <p className="text-gray-600 leading-relaxed">
      {pattern.explanation}
    </p>
  </div>
</Modal>
```

---

## 🎨 Theme Customization

### Dark Mode Support (Future)

Prepare for dark mode with Tailwind:

```tsx
// Light/dark variants
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <Card className="border-gray-200 dark:border-gray-700">
    Content
  </Card>
</div>
```

### Custom Ant Design Components

Override Ant Design components:

```tsx
// app/layout.tsx
const theme = {
  components: {
    Card: {
      borderRadiusLG: 16,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    Button: {
      controlHeight: 44,
      fontSize: 16,
      fontWeight: 500,
    },
    Table: {
      borderRadius: 12,
    },
  },
};
```

---

## 📚 Style Organization Checklist

✅ **DO**:
- Use Ant Design for complex UI components
- Use Tailwind for layout, spacing, and utilities
- Use CSS Modules for component-specific styles
- Follow mobile-first responsive design
- Ensure WCAG AA color contrast
- Provide visible focus states
- Use semantic HTML elements
- Extract repeated Tailwind classes to CSS Modules

❌ **DON'T**:
- Use inline styles (except for dynamic values)
- Mix too many styling approaches in one component
- Ignore accessibility (focus states, color contrast)
- Use absolute units (px) - prefer Tailwind scale
- Nest CSS too deeply (max 3 levels)

---

## 🔑 Key Takeaways

1. **Hybrid Approach**: Ant Design + Tailwind + CSS Modules
2. **Mobile-First**: Start with mobile, add breakpoints up
3. **Semantic**: Use proper HTML elements and ARIA attributes
4. **Accessible**: WCAG AA contrast, visible focus states
5. **Performant**: Code-split styles, avoid inline styles
6. **Consistent**: Follow design tokens for spacing, colors, typography

---

**Remember**: Styles should enhance usability, not complicate it. Keep it simple and accessible! 🎨
