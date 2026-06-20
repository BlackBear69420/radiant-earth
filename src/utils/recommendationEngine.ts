import type { CarbonResult, Recommendation } from "@/types/carbon";

const uid = (() => {
  let i = 0;
  return () => `rec-${++i}`;
})();

export const generateRecommendations = (
  result: CarbonResult,
): Recommendation[] => {
  const recs: Recommendation[] = [];
  const byCategory = Object.fromEntries(
    result.breakdown.map((b) => [b.key, b.monthlyKg]),
  ) as Record<string, number>;

  if (byCategory.transportation > 0) {
    const saving = byCategory.transportation * 0.25;
    recs.push({
      id: uid(),
      category: "transportation",
      title: "Swap two car trips for public transport each week",
      description:
        "Replacing two weekly car commutes with bus or train can cut a quarter of your transport emissions.",
      estimatedMonthlySavingKg: saving,
    });
  }

  if (result.input.diet === "nonVegetarian") {
    recs.push({
      id: uid(),
      category: "diet",
      title: "Try two meat-free days per week",
      description:
        "Reducing meat by two days per week noticeably lowers diet-related emissions.",
      estimatedMonthlySavingKg: byCategory.diet * 0.2,
    });
  } else if (result.input.diet === "mixed") {
    recs.push({
      id: uid(),
      category: "diet",
      title: "Add one more vegetarian day per week",
      description:
        "Shifting one extra day to plant-based meals trims your monthly footprint.",
      estimatedMonthlySavingKg: byCategory.diet * 0.1,
    });
  }

  if (byCategory.electricity > 0) {
    recs.push({
      id: uid(),
      category: "electricity",
      title: "Lower electricity usage by 10%",
      description:
        "Unplug idle devices, switch to LED bulbs, and use energy-efficient appliances.",
      estimatedMonthlySavingKg: byCategory.electricity * 0.1,
    });
  }

  // Always include a positive nudge based on the largest contributor
  if (result.totalMonthlyKg > 0) {
    recs.unshift({
      id: uid(),
      category: result.largest.key,
      title: `Focus first on ${result.largest.label.toLowerCase()}`,
      description: `${result.largest.label} is your largest source of emissions this month. Small changes here have the biggest impact.`,
      estimatedMonthlySavingKg: result.largest.monthlyKg * 0.15,
    });
  }

  return recs;
};
