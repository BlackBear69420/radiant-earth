import {
  DAYS_PER_MONTH,
  DIET_FACTORS,
  ELECTRICITY_FACTOR,
  TRANSPORT_FACTORS,
} from "@/constants/emissionFactors";
import type {
  CarbonInput,
  CarbonResult,
  CategoryBreakdown,
  CategoryKey,
} from "@/types/carbon";

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  transportation: "Transportation",
  diet: "Diet",
  electricity: "Electricity",
};

const sanitizeNumber = (n: number): number => {
  if (!Number.isFinite(n) || n < 0) return 0;
  // cap absurd values to avoid overflow visualization issues
  return Math.min(n, 1_000_000);
};

const calculateCategoryEmissions = (input: CarbonInput) => {
  const km = sanitizeNumber(input.commuteKm);
  const kwh = sanitizeNumber(input.electricityKwh);

  const transportation =
    km * TRANSPORT_FACTORS[input.transport] * DAYS_PER_MONTH;
  const diet = DIET_FACTORS[input.diet] * DAYS_PER_MONTH;
  const electricity = kwh * ELECTRICITY_FACTOR;

  return { transportation, diet, electricity };
};

export const calculateCarbon = (input: CarbonInput): CarbonResult => {
  const monthly = calculateCategoryEmissions(input);
  const total = monthly.transportation + monthly.diet + monthly.electricity;

  const safeTotal = total === 0 ? 1 : total;
  const breakdown: CategoryBreakdown[] = (
    Object.keys(monthly) as CategoryKey[]
  ).map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
    monthlyKg: monthly[key],
    percent: (monthly[key] / safeTotal) * 100,
  }));

  const largest = breakdown.reduce((a, b) =>
    a.monthlyKg >= b.monthlyKg ? a : b,
  );

  return {
    input,
    totalMonthlyKg: total,
    totalYearlyKg: total * 12,
    breakdown,
    largest,
  };
};
