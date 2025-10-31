# fruitbench

An over-engineered benchmark for my friends to rank the best fruits and compare their results.

## Notes for Claude

- You are encouraged to use MCP tools at your discreton to help you generate code for this project—particularly context7 for accessing documentation on Astro, Tailwind CSS, DaisyUI, Bun, TypeScript etc, or Firecrawl for any other web searches you might need.

## Tech Stack

- **Framework**: Astro 5.15 (Static Site Generation with Islands Architecture)
- **Language**: TypeScript (strict mode)
- **Runtime**: Bun
- **CSS Framework**: Tailwind CSS 4.1
- **Component Library**: DaisyUI 5.3 (themes: nord, dim)
- **Linting/Formatting**: @antfu/eslint-config (ESLint 9 + Prettier 3.6)
- **Fonts**: Google Fonts via Astro experimental fonts (Inter from Google Fonts)
- **Theme Switching**: theme-change (prevents FART - Flash of inAccurate coloR Theme)
- **Deployment**: Cloudflare Pages
- **Development Tools**: VS Code, Claude Code

## Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Lint and fix code
- `bun run check` - Type checking with Astro

## Features

- 🍎 Interactive fruit ranking system based on 4 scoring criteria
- 🍌 Database of most popular fruits to pick from
- 😋 User-friendly rating interface with sliders
- Basic, minimalist and interactive UI/UX
- 🤝 Ability to share final results to platforms like Discord (perhaps via a link to said results or perhaps also export as image?)
- 🍉 Final results in the form of a table similar to hardware benchmark websites
  - Ablity to sort by different criteria by clcking on column headers
  - Section seperators for different tiers of fruits (e.g. S-tier, A-tier, etc)
  - Alternative methods of viewing result data?
- 🎨 Dual theme support (Nord light, Dim dark) with persistent preference
- 📊 Real-time score calculation and ranking
- 📱 Fully responsive mobile-first design
- ♿ Accessible UI with semantic HTML
- ⚡ Lightning-fast static site generation
- 🎯 Type-safe development with TypeScript
- Animations and transitions for enhanced UX
- Interactive elements

## Results idea

| Icon | Fruit       | Flavor | Nourishment | Reliability | Practicality | Total | Tier |
| ---- | ----------- | ------ | ----------- | ----------- | ------------ | ----- | ---- |
| 🍌   | Banana      | 10     | 10          | 10          | 10           | 40    | S    |
| 🍎   | Red Apple   | 8      | 7           | 9           | 9            | 33    | A    |
| 🍓   | Strawberry  | 9      | 6           | 7           | 7            | 29    | B    |
| 🍊   | Orange      | 8      | 8           | 8           | 6            | 30    | B    |
| 🥭   | Mango       | 10     | 7           | 6           | 5            | 28    | B    |
| 🫐   | Blueberry   | 8      | 7           | 8           | 8            | 31    | A    |
| 🍉   | Watermelon  | 8      | 5           | 6           | 4            | 23    | C    |
| 🍇   | Grape       | 7      | 6           | 8           | 9            | 30    | B    |
| 🍍   | Pineapple   | 9      | 6           | 7           | 4            | 26    | C    |
| 🍑   | Peach       | 9      | 6           | 5           | 5            | 25    | C    |
| 🥝   | Kiwi        | 7      | 7           | 7           | 6            | 27    | C    |
| 🍒   | Cherry      | 9      | 5           | 6           | 6            | 26    | C    |
| 🍋   | Lemon       | 4      | 6           | 9           | 8            | 27    | C    |
| 🥑   | Avocado     | 6      | 9           | 7           | 7            | 29    | B    |
| 🐲   | Dragonfruit | 3      | 5           | 8           | 3            | 19    | F    |
| 🌰   | Durian      | 5      | 9           | 7           | 2            | 23    | C    |
| 🥥   | Coconut     | 6      | 8           | 8           | 3            | 25    | C    |
| 🥭   | Papaya      | 6      | 7           | 6           | 5            | 24    | C    |
| 🍊   | Grapefruit  | 5      | 7           | 8           | 6            | 26    | C    |
| 🫐   | Raspberry   | 8      | 6           | 6           | 6            | 26    | C    |

Maybe instead of having a dedicted "Tier" column, we can use a combination of color coding and section seperators to indicate tiers? The S tier should look really special and standout.
