import { MAX_COMMUTE_KM, MAX_ELECTRICITY_KWH, MAX_SANITIZED_VALUE } from "@/constants/appConfig";
import {
  DAYS_PER_MONTH,
  DIET_FACTORS,
  ELECTRICITY_FACTOR,
  TRANSPORT_FACTORS,
} from "@/constants/emissionFactors";
import type { CarbonInput, CarbonResult, CategoryBreakdown, CategoryKey } from "@/types/carbon";

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  transportation: "Transportation",
  diet: "Diet",
  electricity: "Electricity",
};

const sanitizeNumber = (n: number, max = MAX_SANITIZED_VALUE): number => {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
};

const calculateCategoryEmissions = (input: CarbonInput) => {
  const km = sanitizeNumber(input.commuteKm, MAX_COMMUTE_KM);
  const kwh = sanitizeNumber(input.electricityKwh, MAX_ELECTRICITY_KWH);

  const transportation = km * TRANSPORT_FACTORS[input.transport] * DAYS_PER_MONTH;
  const diet = DIET_FACTORS[input.diet] * DAYS_PER_MONTH;
  const electricity = kwh * ELECTRICITY_FACTOR;

  return { transportation, diet, electricity };
};

export const calculateCarbon = (input: CarbonInput): CarbonResult => {
  const monthly = calculateCategoryEmissions(input);
  const total = monthly.transportation + monthly.diet + monthly.electricity;

  const safeTotal = total === 0 ? 1 : total;
  const breakdown: CategoryBreakdown[] = (Object.keys(monthly) as CategoryKey[]).map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
    monthlyKg: monthly[key],
    percent: (monthly[key] / safeTotal) * 100,
  }));

  const largest = breakdown.reduce((a, b) => (a.monthlyKg >= b.monthlyKg ? a : b));

  return {
    input,
    totalMonthlyKg: total,
    totalYearlyKg: total * 12,
    breakdown,
    largest,
  };
};
