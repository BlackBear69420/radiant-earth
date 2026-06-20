import { IMPROVEMENT_POTENTIAL_FACTOR, RECOMMENDATION_SAVINGS } from "@/constants/appConfig";
import type { CarbonResult, CategoryKey, Recommendation } from "@/types/carbon";

const recommendationId = (category: CategoryKey, title: string): string =>
  `${category}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export const generateRecommendations = (result: CarbonResult): Recommendation[] => {
  const recs: Recommendation[] = [];
  const byCategory = Object.fromEntries(
    result.breakdown.map((b) => [b.key, b.monthlyKg]),
  ) as Record<CategoryKey, number>;

  if (byCategory.transportation > 0) {
    const title = "Swap two car trips for public transport each week";
    recs.push({
      id: recommendationId("transportation", title),
      category: "transportation",
      title,
      description:
        "Replacing two weekly car commutes with bus or train can cut a quarter of your transport emissions.",
      estimatedMonthlySavingKg: byCategory.transportation * RECOMMENDATION_SAVINGS.transportation,
    });
  }

  if (result.input.diet === "nonVegetarian") {
    const title = "Try two meat-free days per week";
    recs.push({
      id: recommendationId("diet", title),
      category: "diet",
      title,
      description: "Reducing meat by two days per week noticeably lowers diet-related emissions.",
      estimatedMonthlySavingKg: byCategory.diet * RECOMMENDATION_SAVINGS.dietNonVegetarian,
    });
  } else if (result.input.diet === "mixed") {
    const title = "Add one more vegetarian day per week";
    recs.push({
      id: recommendationId("diet", title),
      category: "diet",
      title,
      description: "Shifting one extra day to plant-based meals trims your monthly footprint.",
      estimatedMonthlySavingKg: byCategory.diet * RECOMMENDATION_SAVINGS.dietMixed,
    });
  }

  if (byCategory.electricity > 0) {
    const title = "Lower electricity usage by 10%";
    recs.push({
      id: recommendationId("electricity", title),
      category: "electricity",
      title,
      description: "Unplug idle devices, switch to LED bulbs, and use energy-efficient appliances.",
      estimatedMonthlySavingKg: byCategory.electricity * RECOMMENDATION_SAVINGS.electricity,
    });
  }

  if (result.totalMonthlyKg > 0) {
    const title = `Focus first on ${result.largest.label.toLowerCase()}`;
    recs.unshift({
      id: recommendationId(result.largest.key, title),
      category: result.largest.key,
      title,
      description: `${result.largest.label} is your largest source of emissions this month. Small changes here have the biggest impact.`,
      estimatedMonthlySavingKg: result.largest.monthlyKg * RECOMMENDATION_SAVINGS.largestFocus,
    });
  }

  return recs;
};

/** Shared heuristic for the dashboard summary “improvement potential” stat. */
export const estimateImprovementPotential = (largestMonthlyKg: number): number =>
  largestMonthlyKg * IMPROVEMENT_POTENTIAL_FACTOR;
