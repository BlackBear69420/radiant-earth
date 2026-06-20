import { describe, expect, it } from "vitest";
import { formatDate, formatKg, formatPercent, formatShortDate } from "@/utils/formatters";

describe("formatters", () => {
  describe("formatKg", () => {
    it("formats kg under 1000", () => {
      expect(formatKg(12.34)).toBe("12.3 kg");
    });

    it("switches to tonnes above 1000", () => {
      expect(formatKg(2500)).toBe("2.50 t");
    });

    it("handles invalid input", () => {
      expect(formatKg(Number.NaN)).toBe("0 kg");
    });
  });

  describe("formatPercent", () => {
    it("formats percent", () => {
      expect(formatPercent(42.7)).toBe("43%");
    });

    it("handles invalid input", () => {
      expect(formatPercent(Number.NaN)).toBe("0%");
    });
  });

  describe("formatDate", () => {
    it("formats a valid ISO date string", () => {
      const result = formatDate("2026-06-20T14:30:00.000Z");
      expect(result).toMatch(/2026/);
      expect(result).toMatch(/Jun/);
    });

    it("returns the original string for invalid dates", () => {
      expect(formatDate("not-a-date")).toBe("not-a-date");
    });
  });

  describe("formatShortDate", () => {
    it("formats month and day only", () => {
      const result = formatShortDate("2026-06-20T14:30:00.000Z");
      expect(result).toMatch(/Jun/);
      expect(result).not.toMatch(/2026/);
    });
  });
});
