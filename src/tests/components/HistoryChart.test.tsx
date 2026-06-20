import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HistoryChart } from "@/components/charts/HistoryChart";
import { calculateCarbon } from "@/services/carbonCalculator";
import type { HistoryEntry } from "@/types/carbon";

function makeEntry(id: string, daysAgo: number): HistoryEntry {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return {
    id,
    createdAt: date.toISOString(),
    result: calculateCarbon({
      commuteKm: 10 + daysAgo,
      transport: "car",
      diet: "mixed",
      electricityKwh: 200,
    }),
  };
}

describe("HistoryChart", () => {
  it("shows a prompt when fewer than two entries exist", () => {
    render(<HistoryChart entries={[makeEntry("1", 0)]} />);
    expect(screen.getByText(/log at least two calculations/i)).toBeInTheDocument();
  });

  it("provides a screen-reader summary when enough data exists", () => {
    const entries = [makeEntry("1", 0), makeEntry("2", 3), makeEntry("3", 7)];
    render(<HistoryChart entries={entries} />);
    const summary = screen.getByRole("img", { name: /carbon footprint trend/i });
    expect(summary).toHaveClass("sr-only");
    expect(summary.textContent).toMatch(/kg/);
  });
});
