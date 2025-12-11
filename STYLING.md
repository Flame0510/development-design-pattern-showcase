# 🎨 Styling Architecture

## Approach: Tailwind v4 + SCSS with BEM

This project uses:
- **Tailwind CSS v4** for fast, responsive utility classes
- **SCSS** for complex components, centralized theming, and reusable mixins
- **BEM Convention** for clean, predictable naming (`.block__element--modifier`)

---

## 📁 File Structure

```
styles/
├── _colors.scss        # Centralized color palette
├── _typography.scss    # Font families, sizes, typography mixins
├── _spacing.scss       # Spacing scale, border radius, shadows, z-index
├── _mixins.scss        # Reusable mixins (hover, card, flex, etc.)
└── index.scss          # Central export point

app/
└── globals.scss        # Global styles + Tailwind config

components/
├── ComponentName.tsx
└── ComponentName.scss  # SCSS per component (BEM convention)
```

---

## 🎨 Color Palette

### Primary Colors (from course slides)
- **Navy Dark** (`#0a1929`) - Main background
- **Navy Medium** (`#1a2942`) - Secondary background
- **Yellow Primary** (`#ffc107`) - CTAs, titles, icons
- **Pink Accent** (`#ff4d6d`) - Hover states, errors, highlights
- **Beige Card** (`#f5e6d3`) - Card backgrounds

### Semantic Colors
- **Success**: `#10b981` (green)
- **Error**: `#ff4d6d` (uses pink-accent)
- **Warning**: `#ffc107` (uses yellow-primary)
- **Info**: `#3b82f6` (blue)

---

## 🔧 How to Use

### 1. Tailwind Utility Classes (Fast approach)

```tsx
<div className="bg-navy text-yellow p-6 rounded-lg hover-pink">
  <h1 className="text-3xl font-bold">Title</h1>
</div>
```

**When to use**: Fast layouts, spacing, responsive design, basic hover/focus states

### 2. SCSS Variables (Direct values)

```scss
@use '@/styles' as *; // Import everything without prefix

.myComponent {
  background-color: $navy-dark;
  color: $yellow-primary;
  padding: $spacing-6; // 24px
}
```

**When to use**: Custom component styles, values not covered by Tailwind

### 3. SCSS Mixins (Reusable patterns)

```scss
@use '@/styles' as *;

.myCard {
  @include card-hover; // Beige background + hover effect
  @include flex-between; // display: flex; justify: space-between
}

.myButton {
  @include hover-glow($pink-accent);
}
```

**When to use**: Complex effects, recurring patterns, custom hover/focus states

### 4. BEM Convention (Component styles)

```tsx
// CategoryCard.tsx
import './CategoryCard.scss';

export default function CategoryCard() {
  return (
    <div className="category-card">
      <div className="category-card__icon">🏗️</div>
      <h3 className="category-card__title">Creational</h3>
      <p className="category-card__description">Description</p>
    </div>
  );
}
```

```scss
// CategoryCard.scss
@use '@/styles' as *;

.category-card {
  @include card-base;
  
  &__icon {
    font-size: 60px;
    color: $yellow-primary;
  }
  
  &__title {
    @include heading-3;
    color: $navy-dark;
  }
  
  &__description {
    color: $navy-dark;
    margin-bottom: $spacing-4;
  }
}
```

**When to use**: Always for components with dedicated styles. BEM prevents conflicts without CSS Modules.

---

## 📱 Responsive Design

### Tailwind Breakpoints
```scss
@use '@/styles' as *;

.component {
  font-size: 16px;
  
  @include md {
    font-size: 20px;
  }
  
  @include lg {
    font-size: 24px;
  }
}
```
.component {
  font-size: 16px;
  
  @include styles.md {
    font-size: 20px;
  }
  
  @include styles.lg {
    font-size: 24px;
  }
}
```

---

## 🚫 Anti-Pattern: NO Inline Styles

❌ **EVITARE**:
```tsx
<div style={{ backgroundColor: '#0a1929', padding: '24px' }}>
```tsx
// Option 1: Tailwind
<div className="bg-navy p-6">Good practice</div>

// Option 2: BEM class
<div className="pattern-card">Good practice</div>
```

---

## 🎯 BEM Naming Convention

**Block Element Modifier** - Clean and predictable naming:
---
```scss
.block { }              // Main component
.block__element { }     // Child element
.block--modifier { }    // Block variant
.block__element--modifier { }  // Element variant
```

**Real examples**:
```scss
.category-card { }                    // Category card
.category-card__icon { }              // Category icon
.category-card__title { }             // Category title
.category-card--large { }             // Large card
.category-card__icon--yellow { }      // Yellow icon
```

---

## 🎯 Decision Tree

```
Need to style something?
  │
### Card Pattern (from slides)r?
```scss
// components/theory/CategoryCard.scss
@use '@/styles' as *;

.category-card {
  @include card-hover; // Beige background + border + lift effect
      └─ YES → Use component SCSS with BEM naming
```

---

## 📚 Code Examples─ NO → Usa SCSS component con BEM naming
```tegory-card--large { }             // Card grande
.category-card__icon--yellow { }      // Icona gialla
```

---

### Card Pattern (dalle slide)
```scss
// components/theory/CategoryCard.scss
@use '@/styles' as *;

.category-card {
  @include card-hover; // Beige + border + lift
  
  &__icon {
    font-size: 60px;
    color: $yellow-primary;
  }
  
  &__title {
    @include heading-3;
    color: $navy-dark;
  }
}
```

### Navbar
```scss
// components/Navbar.scss
@use '@/styles' as *;

.navbar {
  background-color: $navy-dark;
  border-bottom: 2px solid $yellow-primary;
  z-index: $z-50;
  
  &__link {
    color: $white;
    transition: color 0.3s ease;
    
    &:hover {
      color: $yellow-primary;
    }
  }
}
```

### Button Variants
```scss
// components/Button.scss
@use '@/styles' as *;

.button {
  padding: $spacing-3 $spacing-6;
  border-radius: $radius-base;
  font-weight: $weight-semibold;
  transition: all 0.3s ease;
  
  &--primary {
```

---

## 🔄 Gradual Migration

We are **progressively** migrating from inline styles to SCSS with BEM:

1. ✅ `globals.scss` - Configured with centralized palette
2. ✅ `CategoryCard` - Converted to BEM SCSS
3. ⏳ `PatternLayout` - TODO
4. ⏳ `Navbar` - TODO  
5. ⏳ Other pages - TODO
    &:hover {
      background-color: styles.$pink-accent;
      color: styles.$white;
    }
  }
}
```

---

## 🔄 Migrazione Graduale

Stiamo migrando **progressivamente** da inline styles a SCSS con BEM:

1. ✅ `globals.scss` - Configurato con palette centralizzata
2. ✅ `CategoryCard` - Convertito a SCSS con BEM
3. ⏳ `PatternLayout` - TODO
4. ⏳ `Navbar` - TODO  
5. ⏳ Altre pagine - TODO

---

## 💡 Best Practices
---

## 💡 Best Practices

1. **Centralize colors**: Always use `$color-name`, never direct hex values
2. **Use mixins for repeated patterns**: Hover effects, card styles, flex layouts
3. **Mobile-first**: Start mobile and add breakpoints with `@include md`
4. **BEM naming**: `.block__element--modifier` for clarity and predictability
5. **Tailwind for layout**: `flex`, `grid`, `p-4`, `mt-6` are perfect
6. **SCSS for logic**: Animations, complex states, theming
7. **Simple import**: `@use '@/styles' as *;` for direct variable access
## 🛠️ Tools & Commands

```bash
# Development
npm run dev

# Build (compila SCSS automaticamente)
npm run build

# Lint SCSS
npm run lint:scss
```

---
## 📖 Risorse

- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [SCSS Guide](https://sass-lang.com/guide)
- [BEM Methodology](https://getbem.com/)
- [Ant Design Theming](https://ant.design/docs/react/customize-theme)
- [Ant Design Theming](https://ant.design/docs/react/customize-theme)
```bash
# Development
npm run dev

# Build (compiles SCSS automatically)
npm run build

# Lint SCSS
npm run lint:scss
```

---

## 📖 Resources- [BEM Methodology](https://getbem.com/)
- [Ant Design Theming](https://ant.design/docs/react/customize-theme)