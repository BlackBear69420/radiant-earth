/** Input validation limits — shared by form schema and calculator sanitization. */
export const MAX_COMMUTE_KM = 10_000;
export const MAX_ELECTRICITY_KWH = 100_000;
/** Defensive upper bound applied inside the calculator for non-finite or extreme values. */
export const MAX_SANITIZED_VALUE = 1_000_000;

/** Local persistence and display limits. */
export const MAX_HISTORY_ENTRIES = 20;
export const HISTORY_LIST_DISPLAY = 8;
export const HISTORY_CHART_POINTS = 10;

/** Heuristic factor for the “improvement potential” summary stat. */
export const IMPROVEMENT_POTENTIAL_FACTOR = 0.2;

/** Estimated savings ratios used by the recommendation engine. */
export const RECOMMENDATION_SAVINGS = {
  transportation: 0.25,
  dietNonVegetarian: 0.2,
  dietMixed: 0.1,
  electricity: 0.1,
  largestFocus: 0.15,
} as const;
