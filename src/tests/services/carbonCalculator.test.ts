import { describe, expect, it } from "vitest";
import { calculateCarbon } from "@/services/carbonCalculator";
import type { CarbonInput } from "@/types/carbon";

const baseInput: CarbonInput = {
  commuteKm: 10,
  transport: "car",
  diet: "mixed",
  electricityKwh: 200,
};

describe("calculateCarbon", () => {
  it("computes monthly totals from emission factors", () => {
    const r = calculateCarbon(baseInput);
    // car: 10*0.21*30=63, diet mixed: 5*30=150, electricity: 200*0.82=164
    expect(r.totalMonthlyKg).toBeCloseTo(63 + 150 + 164, 5);
    expect(r.totalYearlyKg).toBeCloseTo(r.totalMonthlyKg * 12, 5);
  });

  it("identifies the largest contributor", () => {
    const r = calculateCarbon(baseInput);
    expect(r.largest.key).toBe("electricity");
  });

  it("breakdown percentages sum to ~100", () => {
    const r = calculateCarbon(baseInput);
    const total = r.breakdown.reduce((a, b) => a + b.percent, 0);
    expect(total).toBeCloseTo(100, 1);
  });

  it("handles zero emissions safely", () => {
    const r = calculateCarbon({
      commuteKm: 0,
      transport: "walk",
      diet: "vegetarian",
      electricityKwh: 0,
    });
    expect(r.totalMonthlyKg).toBe(60);
    expect(r.breakdown.find((b) => b.key === "transportation")?.percent).toBe(0);
  });

  it("treats negative and non-finite inputs as zero", () => {
    const r = calculateCarbon({
      commuteKm: -5,
      transport: "car",
      diet: "vegetarian",
      electricityKwh: Number.NaN,
    });
    expect(r.breakdown.find((b) => b.key === "transportation")?.monthlyKg).toBe(0);
    expect(r.breakdown.find((b) => b.key === "electricity")?.monthlyKg).toBe(0);
  });

  it("caps absurdly large numbers", () => {
    const r = calculateCarbon({
      ...baseInput,
      electricityKwh: 1e12,
    });
    expect(Number.isFinite(r.totalMonthlyKg)).toBe(true);
  });
});
