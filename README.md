# MyCarbon — Personal Carbon Footprint Tracker

> Estimate, track, and reduce your monthly carbon footprint. 100% on-device, no
> sign-up, no external APIs.

## Overview

People care about climate impact but rarely have a clear, personal number to
work with. **MyCarbon** turns four everyday inputs — commute distance, transport
mode, diet, and electricity usage — into a clear monthly CO₂ estimate, a
breakdown by category, and a short list of personalized, doable next steps. All
calculations run in the browser using a small, transparent table of emission
factors.

## Features

- **Quick calculator** — four fields, instant estimate
- **Summary card** — monthly + yearly totals, largest contributor, improvement potential
- **Breakdown chart** — donut chart with per-category share
- **Personalized recommendations** — focused on your biggest emission source
- **Local history** — last 20 calculations saved on-device with a trend chart
- **Privacy-first** — no accounts, no tracking, no network calls for data
- **Accessible** — semantic HTML, ARIA labels on icon buttons & charts, keyboard friendly
- **Responsive** — mobile-first, works on any screen

## Tech Stack

- **React 19 + TypeScript** (strict mode)
- **TanStack Start / Router** (file-based routing, SSR-friendly)
- **Vite** build tooling
- **Tailwind CSS v4** with a custom design system (semantic tokens, OKLCH palette)
- **Recharts** for visualizations
- **Zod** for input validation
- **Vitest + React Testing Library** for unit & component tests

## Folder Structure

```
src/
├── components/
│   ├── charts/        Recharts wrappers (BreakdownChart, HistoryChart)
│   ├── common/        Header, SectionCard
│   ├── dashboard/     SummaryCard, HistoryList
│   ├── forms/         CalculatorForm (with Zod validation)
│   └── recommendations/RecommendationList
├── constants/         Local emission factors (no external APIs)
├── hooks/             useLocalStorage, useCarbonCalculator
├── routes/            File-based routes (index = landing, dashboard)
├── services/          carbonCalculator (pure business logic)
├── tests/             Vitest tests (services, utils, components)
├── types/             Shared TypeScript contracts
└── utils/             formatters, recommendationEngine
```

### Design decisions

- **Business logic is pure & UI-free** — `services/carbonCalculator.ts` and
  `utils/recommendationEngine.ts` have no React, are trivial to unit-test, and
  follow the single-responsibility principle.
- **Hooks isolate side effects** — `useLocalStorage` & `useCarbonCalculator`
  contain all persistence and orchestration, keeping route components thin.
- **Constants are centralized** — every emission factor lives in
  `constants/emissionFactors.ts`. Tweak one file to recalibrate the whole app.
- **Components stay small** — every file is well under 200 lines; charts, forms,
  and presentational cards each live in their own module.
- **Design tokens, not ad-hoc colors** — every color/shadow/radius is a semantic
  token in `src/styles.css`. No hard-coded hex or `text-white` utilities.

## Installation

```bash
bun install     # or: npm install / pnpm install
bun dev         # starts the Vite dev server
```

The app runs on http://localhost:5173 (or the port shown in the console).

## Running Tests

```bash
bunx vitest run            # one-shot
bunx vitest                # watch mode
bunx vitest --coverage     # coverage (requires @vitest/coverage-v8)
```

Test areas covered:

- **Unit** — `carbonCalculator`, `recommendationEngine`, `formatters`
- **Component** — `CalculatorForm` (happy path + validation), `RecommendationList`
- **Edge cases** — empty inputs, negative numbers, `NaN`, extremely large values

## Accessibility

- Semantic landmarks: one `<main>` per route, single `<h1>`, proper heading
  hierarchy
- All form fields have associated `<label>` elements and `aria-describedby` for
  inline errors
- Icon-only buttons & the logo link have `aria-label`s
- Donut chart includes a textual summary in an `sr-only` region for screen
  readers
- Focus rings via `:focus-visible` use the design system ring token; never
  removed
- Minimum tap target 44×44px on primary actions
- Uses `min-h-dvh` so mobile layouts don't break on toolbar resize

## Security

- **Strict TypeScript** with `strict: true`
- **Schema validation** — every form input passes through a Zod schema before
  hitting business logic; invalid values are rejected with field-level errors
- **No `dangerouslySetInnerHTML`** anywhere
- **All data stays in `localStorage`** — there is no network surface to attack,
  no auth, no PII transmission
- **Defensive math** — calculator sanitizes negative / non-finite / absurdly
  large numbers
- **No external scripts** beyond a Google Font stylesheet (HTTPS, preconnected)

## Future Improvements

- Multiple lifestyle profiles (home / travel / work)
- Region-aware emission factors (selectable grid region)
- Export & import history as JSON
- Comparison vs. national averages
- Goal setting with progress nudges
- Optional service worker for offline-first PWA install
