import { describe, expect, it } from "vitest";
import { formatKg, formatPercent } from "@/utils/formatters";

describe("formatters", () => {
  it("formats kg under 1000", () => {
    expect(formatKg(12.34)).toBe("12.3 kg");
  });
  it("switches to tonnes above 1000", () => {
    expect(formatKg(2500)).toBe("2.50 t");
  });
  it("handles invalid input", () => {
    expect(formatKg(Number.NaN)).toBe("0 kg");
  });
  it("formats percent", () => {
    expect(formatPercent(42.7)).toBe("43%");
  });
});
