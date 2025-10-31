# Copilot Instructions for Fruitbench

## Project Overview

Fruitbench is an interactive fruit ranking app built with **Astro 5 + React 19 Islands**, using **Bun** (not Node/npm), **Tailwind CSS 4**, and **DaisyUI**. Users rate ~70 fruits on 4 criteria (Flavor, Nourishment, Reliability, Practicality), view tier-ranked results (S/A/B/C/F), and share via URL.

## Critical Commands

**Always use Bun:**

- `bun run dev` - Development server
- `bun run build` - Production build (SSG to `dist/`)
- `bun run lint` - Auto-fix with ESLint + Prettier via @antfu/eslint-config
- Never use `npm`, `npx`, `yarn`, or `pnpm`

## Architecture Patterns

### State Management Pattern

All app state lives in `FruitBench.tsx` (the root React component with `client:load`):

- **Single source of truth**: `ratings`, `selectedTags`, `removedFruitIds`, `sortColumn`, `sortDirection`
- **Auto-persists**: Every state change syncs to localStorage via `useEffect` (key: `'fruitbench-state'`)
- **URL sharing**: Supports `?data=<base64>` query param to override localStorage with shared rankings
- **No Redux/Zustand**: Plain React useState hooks manage everything

Example state update:

```tsx
// Bad: Direct state mutation
ratings[fruitId] = newRating

// Good: Immutable update pattern used throughout
setRatings((prev) => ({ ...prev, [fruitId]: { ...prev[fruitId], flavor: 9 } }))
```

### Component Communication

Props flow one-way from `FruitBench.tsx` → child components:

- `RankingPanel` receives `selectedFruitIds`, `ratings`, callbacks `onUpdateRating`, `onRemoveFruit`
- `ResultsTable` receives computed `ratedFruits` (fruits + ratings + totals + tiers)
- `TagSelector` manages tag selection, returns changes via `onToggleTag` callback
- No global context or event bus - keep it simple

### Data Flow

1. **Fruit Selection**: Tag-based filtering (OR logic) → `selectedFruitIds` array → passed to `RankingPanel`
2. **Rating Updates**: Slider changes → `onUpdateRating(fruitId, criterion, value)` → updates `ratings` state → auto-saves to localStorage
3. **Results Calculation**: `ratings` object → mapped to `RatedFruit[]` with calculated `total` (0-40) and `tier` (S/A/B/C/F) → sorted by `sortColumn`/`sortDirection`
4. **Sharing**: `ratings` → Base64 encode → URL query param → clipboard or download JSON

## Type System

Key types in `src/types.ts`:

- `Fruit`: Core fruit data (id, name, emoji, tags)
- `FruitRating`: User's 4 scores (fruitId, flavor, nourishment, reliability, practicality) - each 0-10
- `RatedFruit`: Fruit + rating + calculated total + tier
- `FruitTag`: 10 categories ('popular', 'berries', 'tropical', etc.)

**Tier calculation** (in `fruit-utils.ts`):

```typescript
// S: 90%+ (36-40), A: 80-89% (32-35), B: 70-79% (28-31), C: 50-69% (20-27), F: <50% (0-19)
export function calculateTier(total: number): 'S' | 'A' | 'B' | 'C' | 'F'
```

## Styling & Theme System

### Tailwind CSS 4 Syntax (NEW)

Uses the modern `@import` syntax, **not** `@tailwind` directives:

```css
/* ✅ Correct (global.css) */
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

/* ❌ Old syntax - don't use */
@tailwind base;
@tailwind components;
```

### DaisyUI Integration

- **Themes**: `nord` (light, default) and `dim` (dark) configured via `@plugin "daisyui" { themes: light --default, dim --prefersdark; }`
- **Theme switching**: Uses `theme-change` package to prevent FART (Flash of inAccurate coloR Theme)
- **Critical pattern**: Inline script in `Layout.astro` applies theme BEFORE render:

```astro
<script is:inline>
  // ☝️ Must be is:inline to run before page render
  if (localStorage.getItem('theme') === null) {
    document.documentElement.setAttribute('data-theme', 'light')
  } else {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme'),
    )
  }
</script>
```

### DaisyUI Components Used

- `btn`, `btn-primary`, `btn-ghost`, `btn-circle` - Buttons with variants
- `navbar` - Header with logo and actions
- `badge` - Tag pills and tier indicators
- `range` - Sliders for 0-10 ratings
- `modal` - Share dialog
- **Responsive modifiers**: Use DaisyUI's responsive classes (e.g., `btn-sm`, `btn-lg`)

## UI/UX Patterns

### Layout Strategy

**Desktop (lg+)**: Two-column layout (45% ranking panel | 55% results table)
**Mobile (<lg)**: Single-column with floating action button for results modal

```tsx
{
  /* Desktop */
}
;<div className='hidden lg:flex flex-1'>
  <section className='w-[45%]'>...</section>
  <section className='w-[55%]'>...</section>
</div>

{
  /* Mobile */
}
;<div className='flex flex-1 flex-col lg:hidden'>
  {/* Ranking panel only */}
  {/* FAB for results modal */}
</div>
```

### Responsive Patterns

- Sticky tag selector at top of ranking panel (`border-b border-base-300 bg-base-100 p-3`)
- Overflow scroll on fruit cards container (`flex-1 overflow-y-auto p-4`)
- Mobile modal for results (`fixed inset-0 z-50 flex flex-col`)

## Development Workflows

### Adding a New Fruit

1. Edit `src/data/fruits.ts` → add to `FRUITS` array with id, name, emoji, tags
2. Optional: Add `searchTerms` for alternative names (e.g., `['kiwifruit']` for kiwi)
3. Tag with appropriate categories (fruits can have multiple tags)

### Adding a New Criterion

**Not recommended** - the 4 criteria are intentionally fixed. If needed:

1. Add to `Criterion` type in `src/types.ts`
2. Update `CRITERION_METADATA` object with emoji, label, description
3. Update `FruitRating` interface
4. Update `RankingPanel.tsx` sliders
5. Update tier calculation if needed

### Testing Changes

No test suite yet. Manual testing flow:

1. `bun run dev`
2. Select fruits via tags → verify filtering works
3. Rate fruits → verify sliders update state
4. Check results table → verify tiers/sorting
5. Share → verify URL encoding/decoding
6. Refresh → verify localStorage persistence

## Important Constraints

### TypeScript Strict Mode

Project uses `"extends": "astro/tsconfigs/strict"`. Avoid:

- Implicit `any` types
- Non-null assertions (`!`) without justification
- Unsafe type assertions

### Astro Islands Architecture

- React components use `client:load` directive (see `pages/index.astro`)
- Hydrates JavaScript on page load for interactivity
- Astro components render at build time (static)

### Font Loading

Uses **Astro experimental fonts API** (not traditional `<link>` tags):

```astro
<!-- Layout.astro -->
<Font
  cssVariable='--font-sans'
  preload={[{ subset: 'latin', style: 'normal' }]}
/>
```

CSS variable defined in `astro.config.mjs` experimental fonts config.

### Head Management

**Always** import `Head` from `astro-capo`, not `astro:components`:

```astro
import {Head} from 'astro-capo' // ✅ Correct
import {Head} from 'astro:components' // ❌ Wrong
```

## Code Style

Follows **@antfu/eslint-config** with Prettier integration:

- Auto-fix on save with `bun run lint`
- Stylistic rules mostly disabled for Astro files (formatter handles it)
- Single quotes, no semicolons (automatic)
- 2-space indentation

## File Organization

```
src/
├── data/fruits.ts          # ~70 fruit database with tags
├── types.ts                # Core TypeScript interfaces
├── utils/
│   ├── fruit-utils.ts      # Filtering, sorting, tier calculation
│   └── storage.ts          # LocalStorage persistence
├── components/             # React & Astro components
│   ├── FruitBench.tsx      # Root state container (client:load)
│   ├── RankingPanel.tsx    # Rating sliders for selected fruits
│   ├── ResultsTable.tsx    # Sortable tier-based results
│   ├── TagSelector.tsx     # Tag filtering UI
│   ├── ShareModal.tsx      # URL/JSON export
│   └── ThemeToggle.tsx     # Nord/Dim theme switcher
└── pages/index.astro       # Entry point (SSG)
```

## Common Pitfalls

1. **Don't use Node.js commands**: Always `bun`, never `npm`/`npx`
2. **Theme flash prevention**: Never remove the `is:inline` script from `Layout.astro`
3. **Immutable state updates**: Always spread objects/arrays when updating React state
4. **LocalStorage sync**: Don't manually call storage functions - `useEffect` handles it
5. **Tier styling**: S-tier uses `badge-warning` (gold) to stand out, not green/blue
6. **Tag filtering logic**: OR logic (fruit needs ANY selected tag), not AND (all tags)

## When Adding Features

**Preserve these patterns:**

- Single component state management in `FruitBench.tsx`
- Auto-save to localStorage on every state change
- Mobile-first responsive design (test with `lg:` breakpoint)
- DaisyUI components over custom CSS
- Type safety with strict TypeScript
- URL sharing support via Base64 encoding

**Documentation to reference:**

- Astro Islands: https://docs.astro.build/en/concepts/islands/
- Tailwind CSS 4: https://tailwindcss.com/docs
- DaisyUI: https://daisyui.com/components/
- Bun: https://bun.sh/docs
