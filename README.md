# MyCarbon — Personal Carbon Footprint Tracker

> Estimate, track, and reduce your monthly carbon footprint. 100% on-device, no
> sign-up, no external APIs.

## Challenge Vertical

**Climate & personal sustainability** — MyCarbon acts as a lightweight,
privacy-first assistant that helps individuals understand their carbon footprint
from everyday lifestyle choices and suggests practical next steps. The persona is
someone who cares about climate impact but needs a clear, personal number and
actionable guidance without signing up or sharing data.

## Approach & Logic

### How the assistant decides what to show

1. **Collect inputs** — commute distance, transport mode, diet, and monthly
   electricity usage via a validated form.
2. **Calculate emissions** — pure functions in `src/services/carbonCalculator.ts`
   apply locally stored emission factors (no network calls).
3. **Identify the largest contributor** — the category with the highest monthly
   kgCO₂e drives the primary recommendation.
4. **Generate recommendations** — `src/utils/recommendationEngine.ts` produces
   context-aware tips (transport, diet, electricity) with estimated savings based
   on the user's actual breakdown.
5. **Persist locally** — results are saved in `localStorage` so the user can
   track trends and revisit their dashboard.

### Calculation logic

All factors live in `src/constants/emissionFactors.ts`. Limits and display
constants live in `src/constants/appConfig.ts`. Form validation uses
`src/schemas/calculatorSchema.ts`.

| Category           | Formula                                 | Example (car, 10 km/day, mixed diet, 200 kWh) |
| ------------------ | --------------------------------------- | --------------------------------------------- |
| **Transportation** | `commuteKm × transportFactor × 30 days` | `10 × 0.21 × 30 = 63 kg`                      |
| **Diet**           | `dietFactor × 30 days`                  | `5 × 30 = 150 kg`                             |
| **Electricity**    | `electricityKwh × 0.82`                 | `200 × 0.82 = 164 kg`                         |
| **Monthly total**  | sum of the three categories             | **377 kg**                                    |
| **Yearly total**   | `monthly × 12`                          | **4,524 kg**                                  |

Recommendation savings use heuristic ratios defined in `RECOMMENDATION_SAVINGS`
(`src/constants/appConfig.ts`), e.g. swapping two car trips saves ~25% of
transport emissions.

### Architecture

```
src/
├── components/
│   ├── charts/        Recharts wrappers (BreakdownChart, HistoryChart)
│   ├── common/        AppShell, Header, PageFooter, SectionCard
│   ├── dashboard/     SummaryCard, HistoryList
│   ├── forms/         CalculatorForm
│   └── recommendations/RecommendationList
├── constants/         emissionFactors.ts, appConfig.ts
├── hooks/             useLocalStorage, useCarbonCalculator
├── routes/            index (calculator), dashboard, __root
├── schemas/           calculatorSchema.ts (shared Zod validation)
├── services/          carbonCalculator.ts (pure business logic)
├── tests/             Vitest unit, hook, and component tests
├── types/             Shared TypeScript contracts
└── utils/             formatters, recommendationEngine
```

**Design decisions**

- **Business logic is pure & UI-free** — calculator and recommendation engine
  have no React dependencies and are easy to unit-test.
- **Hooks isolate side effects** — persistence and orchestration stay in hooks;
  route components remain thin.
- **Single source of truth** — emission factors, validation limits, and display
  caps are centralized in `constants/` and `schemas/`.
- **Shared layout** — `AppShell` and `PageFooter` remove duplicated page chrome.

## Assumptions & Limitations

- **Illustrative factors** — emission values are simplified averages, not
  region-specific grid data or peer-reviewed lifecycle assessments.
- **30-day month** — all monthly estimates assume 30 days (`DAYS_PER_MONTH`).
- **Vegetarian baseline** — even a vegetarian diet emits ~2 kgCO₂e/day in this
  model (food production, not zero).
- **No server storage** — all data stays in the browser's `localStorage`; clearing
  site data removes history.
- **Recommendation savings are estimates** — percentages are heuristics for
  motivation, not guarantees.
- **Display limits** — up to 20 calculations are stored; the history list shows
  8 and the trend chart shows the last 10.
- **External assets** — Google Fonts and an OG preview image are loaded for
  typography and social sharing; no user data is transmitted.

## Features

- Quick calculator with Zod-validated inputs
- Summary card with monthly/yearly totals and improvement potential
- Donut breakdown chart with screen-reader summary
- Personalized recommendations based on largest emission source
- Local history with trend chart
- Privacy-first — no accounts, no tracking, no API calls for user data
- Accessible — semantic HTML, ARIA labels, skip link, keyboard-friendly
- Responsive — mobile-first layout

## Tech Stack

- React 19 + TypeScript (strict mode)
- TanStack Start / Router (file-based routing, SSR-friendly)
- Vite, Tailwind CSS v4 (semantic OKLCH design tokens)
- Recharts, Zod, Vitest + React Testing Library

## Installation

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run test       # run Vitest once
npm run test:watch # watch mode
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

## Testing

```bash
npm run test
```

Coverage includes:

- **Services** — `carbonCalculator`, `recommendationEngine`
- **Utils** — `formatKg`, `formatPercent`, `formatDate`, `formatShortDate`
- **Hooks** — `useLocalStorage`, `useCarbonCalculator` (persistence, caps, clear)
- **Components** — `CalculatorForm`, `BreakdownChart`, `HistoryChart`,
  `SummaryCard`, `HistoryList`, `RecommendationList`
- **Edge cases** — negative numbers, empty fields, max validation, invalid dates

## Accessibility

- Semantic landmarks with one `<main>` per route and a skip-to-content link
- Form labels, `aria-invalid`, and `aria-describedby` for errors
- Charts include `sr-only` textual summaries for screen readers
- `:focus-visible` rings and 44px minimum tap targets on primary actions

## Security

- Strict TypeScript and Zod schema validation on all form inputs
- No `dangerouslySetInnerHTML` in application code
- All user data stays in `localStorage` — no network surface for PII
- Defensive math sanitizes negative, non-finite, and extreme values

## Future Improvements

- Region-aware emission factors
- Multiple lifestyle profiles
- JSON export/import for history
- National average comparisons and goal setting
- PWA / offline install
