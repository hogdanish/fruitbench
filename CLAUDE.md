# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fruitbench is an over-engineered fruit ranking benchmark application where users can rate fruits based on 4 scoring criteria (Flavor, Nourishment, Reliability, Practicality) and compare results with friends. The application is built as a static site using Astro 5 with Islands Architecture.

## Guidelnes for Claude

- Update this `CLAUDE.md` file whenever there are significant changes to the project structure, tech stack, or development commands that you would benefit from having documented here.
- Make use of linting and formatting tools as configured in the project to maintain code quality and consistency.
- You are encouraged to install any third-party libraries or tools that would benefit development at your discretion, just document them here.

## Tech Stack

- **Framework**: Astro 5.15 (Static Site Generation with Islands Architecture)
- **UI Library**: React 19.2 with @astrojs/react integration
- **Language**: TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Runtime**: Bun (not Node.js)
- **CSS**: Tailwind CSS 4.1 with DaisyUI 5.3 components
- **Themes**: DaisyUI themes (nord light, dim dark) with persistent preference via `theme-change` package
- **Font**: Inter from Google Fonts via Astro experimental fonts API
- **Linting**: @antfu/eslint-config (ESLint 9 with integrated Prettier 3.6)
- **Deployment**: Cloudflare Pages (site: https://fruitbench.hogdani.sh)

## Development Commands

**All commands use Bun, not npm/yarn:**

- `bun run dev` - Start development server
- `bun run build` - Build for production (outputs to `dist/`)
- `bun run preview` - Preview production build locally
- `bun run check` - Run Astro type checking
- `bun run lint` - Lint and auto-fix code with ESLint

**When running commands:**

- Always use `bun` or `bunx`, never `npm` or `npx`
- The package manager is Bun, not npm

## UI/UX overview

The application should be designed in a way that allows the user to quickly select only the fruits they care about and rank them each individually in a quick, simple, and intuitive manner. It should take on the appearance and functionality of a slick PWA application with an interface that makes effective use of DaisyUI components (such as sliders, modals, dropdowns, buttons, a dock, etc.) and smooth yet elegant transition animations that create the appearance of a high-quality yet minimalistic single-page application.

It's important that the benchmark interface is relatively compact and mobile-friendly, as users will often be ranking dozens, if not all of the fruits in the database. The interface should be designed to make as effective use of space and UX as possible. It should also be designed in a way that translates well to a final outputted results table within a single image or link that can be shared to platforms like Discord. The entire thing should feel more like a fun, interactive application rather than a static website (with bouncy animations and transitions, interactive elements, etc), however still minimalistic, functional, fast, and elegant.

## Basic user flow example

The basic flow of the application from the user's perspective should loosely be as follows:

1. User selects fruits that they are interested in from an extensive list of fruits (perhaps with a search/filter function) to add them to the active benchmark table. How this is implemented is up to you—I'm biased towards some slick drag and drop action but this is totally up to your discretion. It should be quick and intuitive though, and the user should be able to add/remove fruits from the active benchmark list at any time without having to refresh or navigate away from the page or revert progress they have already made on ranking fruits.
2. The user uses the ranking interface on each fruit rank them on 4 criteria (Flavor, Nourishment, Reliability, Practicality) using sliders or some similar UI elements. The interface should allow for quick ranking between fruits easy adjustment of scores including being able to remove or reset scores quickly.
3. As the user ranks fruits, the results table updates in real-time to reflect the current rankings, with sortable columns and a tier system (S, A, B, C, F) visually indicated, with the user able to click column headers to sort by different criteria.
4. Once the user is satisfied with their rankings, they can export/share their results to platforms like Discord via a **unique** link to said results or image. The user's rankings should be saved in local storage so they can revisit or adjust them later without losing progress.

## Architecture

**Project Structure:**

- `/src/pages/` - Astro pages (index.astro)
- `/src/components/` - React and Astro components
  - `FruitBench.tsx` - Main application component with state management (React, client:load)
  - `FruitSelector.tsx` - Fruit selection interface with search/filter by tags
  - `RankingPanel.tsx` - Rating sliders for 4 criteria with individual fruit cards
  - `ResultsTable.tsx` - Sortable results table with tier system and color coding
  - `ShareModal.tsx` - Modal for sharing results via link or downloading as JSON
  - `ThemeToggle.tsx` - Theme switcher component (nord/dim)
- `/src/layouts/` - Astro layout components (Layout.astro is the base layout)
- `/src/data/` - Data files
  - `fruits.ts` - Comprehensive fruit database (~70 fruits with emoji icons and tags)
- `/src/types.ts` - TypeScript type definitions (Fruit, FruitRating, RatedFruit, AppState, etc.)
- `/src/utils/` - Utility functions
  - `fruit-utils.ts` - Filtering, sorting, tier calculation functions
  - `storage.ts` - LocalStorage persistence utilities
- `/src/lib/` - Barrel exports for clean imports
- `/src/global.css` - Global styles using Tailwind CSS 4's new `@import` syntax and `@theme` blocks
- `/src/assets/` - Static assets

**Key Architectural Patterns:**

1. **Static Site Generation**: The app uses Astro's SSG mode. All pages are pre-rendered at build time.

2. **Theme System**:
   - Theme switching uses the `theme-change` package to prevent FART (Flash of inAccurate coloR Theme)
   - Theme preference is stored in `localStorage` under the key `theme`
   - An inline script in Layout.astro applies the theme before page render to prevent flash
   - Supports two DaisyUI themes: `nord` (default light) and `dim` (dark)

3. **Styling Approach**:
   - Tailwind CSS 4 is configured via Vite plugin (not PostCSS)
   - Global styles use the new `@import "tailwindcss"` syntax (not `@tailwind` directives)
   - DaisyUI is loaded as a plugin in global.css with theme configuration
   - Font configuration uses Astro's experimental fonts API with CSS variables

4. **Font Loading**:
   - Inter font is loaded via Astro's experimental fonts provider
   - Font is assigned to CSS variable `--font-sans`
   - Configured with variable weights (100-900) and preloaded for performance

5. **Head Management**:
   - Uses `astro-capo` for optimized head element ordering
   - Import `{ Head }` from `astro-capo`, not `astro:components`

6. **React Integration**:
   - React integration is configured in `astro.config.mjs` via `integrations: [react()]`
   - React components use the `client:load` directive to hydrate on page load
   - Main app component (`FruitBench.tsx`) manages all state and syncs with localStorage

## Implemented Features

The application includes:

1. **Interactive Ranking System**:
   - Rate fruits on 4 criteria (Flavor, Nourishment, Reliability, Practicality) using DaisyUI range sliders
   - Each fruit displays in a card with all 4 sliders and a total score
   - Quick reset and remove buttons for each fruit

2. **Fruit Database**:
   - ~70 fruits with emoji icons and tag-based organization
   - 10 tags: popular, berries, tropical, citrus, stone-fruit, melons, exotic, culinary-vegetable, dried, orchard
   - Each fruit can have multiple tags for flexible filtering

3. **Fruit Selection Interface**:
   - Search bar for filtering by name
   - Tag-based filtering with clickable badges (OR logic - show fruits with any selected tag)
   - "Select All Filtered" button to quickly add all visible fruits
   - Visual indicators for selected fruits
   - Mobile: Drawer overlay on mobile devices
   - Desktop: Fixed sidebar for easy access

4. **Results Table**:
   - Sortable columns (click headers to sort by Tier, Flavor, Nourishment, Reliability, Practicality, Total)
   - Tier system (S, A, B, C, F) with color-coded badges and row backgrounds
   - S-tier: Warning color (yellow/gold), 90%+ scores
   - Grouped by tier for easy visual scanning
   - Legend showing tier percentages

5. **Sharing System**:
   - Generate shareable URL with Base64-encoded rankings in query params
   - Copy link to clipboard functionality
   - Download rankings as JSON file for backup
   - Stats display (fruits selected, fruits rated)

6. **Data Persistence**:
   - Auto-save to localStorage on every change
   - Load state from localStorage on page load
   - Import rankings from shared URL (overrides localStorage)
   - Versioned storage format for future migrations

7. **Theme System**:
   - Toggle between 'nord' (light) and 'dim' (dark) themes
   - Persistent preference via localStorage
   - No FART (Flash of inAccurate coloR Theme) using inline script

8. **Mobile-First Design**:
   - Fully responsive layout with mobile drawer for fruit selection
   - Desktop: 3-column layout (selector | ranking | results)
   - Mobile: Stacked layout with hamburger menu for selector
   - Touch-friendly buttons and sliders

## Style Guidelines

- **ESLint**: Uses @antfu/eslint-config which includes:
  - Formatters enabled (Prettier integration)
  - Astro-specific rules via `astro-eslint-parser` and `eslint-plugin-astro`
  - Runs with `--flag unstable_ts_config` for TypeScript support

- **Code Style**: Follow the opinionated @antfu config (automatic via linter)

## MCP Tool Usage

The project README encourages using MCP tools for development assistance:

- **context7**: For documentation on Astro, Tailwind CSS, DaisyUI, Bun, TypeScript
- **Firecrawl**: For web searches when needed

Use these tools at your discretion to help generate code and look up documentation.

## Important Notes

- **Bun Only**: This project uses Bun as its runtime and package manager. Do not use npm/node commands.
- **Tailwind 4 Syntax**: Uses the new `@import "tailwindcss"` syntax, not the old `@tailwind` directives
- **Astro Experimental Features**: The fonts API is experimental and configured in astro.config.mjs
- **Theme Flash Prevention**: The inline theme script in Layout.astro must execute before page render
- **TypeScript**: Project uses strict mode via Astro's strict tsconfig preset
