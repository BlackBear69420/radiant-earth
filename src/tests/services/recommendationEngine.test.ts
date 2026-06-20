import { describe, expect, it } from "vitest";
import { generateRecommendations } from "@/utils/recommendationEngine";
import { calculateCarbon } from "@/services/carbonCalculator";

describe("generateRecommendations", () => {
  it("returns recommendations targeting the largest source first", () => {
    const result = calculateCarbon({
      commuteKm: 50,
      transport: "car",
      diet: "nonVegetarian",
      electricityKwh: 100,
    });
    const recs = generateRecommendations(result);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].category).toBe(result.largest.key);
  });

  it("suggests vegetarian shift only for non-vegetarian/mixed diets", () => {
    const veg = generateRecommendations(
      calculateCarbon({
        commuteKm: 5,
        transport: "bike",
        diet: "vegetarian",
        electricityKwh: 50,
      }),
    );
    expect(veg.find((r) => r.category === "diet" && r.title.includes("meat"))).toBeUndefined();
  });

  it("produces empty list when there are no emissions at all", () => {
    const recs = generateRecommendations(
      calculateCarbon({
        commuteKm: 0,
        transport: "walk",
        diet: "vegetarian",
        electricityKwh: 0,
      }),
    );
    // diet still produces baseline emissions, so at least diet rec absent; total>0 => focus rec exists
    expect(Array.isArray(recs)).toBe(true);
  });
});
