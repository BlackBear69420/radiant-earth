import type { DietType, TransportMode } from "@/constants/emissionFactors";

export interface CarbonInput {
  commuteKm: number;
  transport: TransportMode;
  diet: DietType;
  electricityKwh: number;
}

export type CategoryKey = "transportation" | "diet" | "electricity";

export interface CategoryBreakdown {
  key: CategoryKey;
  label: string;
  monthlyKg: number;
  percent: number;
}

export interface CarbonResult {
  input: CarbonInput;
  totalMonthlyKg: number;
  totalYearlyKg: number;
  breakdown: CategoryBreakdown[];
  largest: CategoryBreakdown;
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  result: CarbonResult;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  estimatedMonthlySavingKg: number;
  category: CategoryKey;
}
