import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HistoryList } from "@/components/dashboard/HistoryList";
import { calculateCarbon } from "@/services/carbonCalculator";
import type { HistoryEntry } from "@/types/carbon";

function makeEntry(id: string): HistoryEntry {
  return {
    id,
    createdAt: "2026-06-20T12:00:00.000Z",
    result: calculateCarbon({
      commuteKm: 10,
      transport: "car",
      diet: "mixed",
      electricityKwh: 200,
    }),
  };
}

describe("HistoryList", () => {
  it("shows empty state when no entries", () => {
    render(<HistoryList entries={[]} onClear={vi.fn()} />);
    expect(screen.getByText(/no history yet/i)).toBeInTheDocument();
  });

  it("renders entries and calls onClear", async () => {
    const onClear = vi.fn();
    render(<HistoryList entries={[makeEntry("1")]} onClear={onClear} />);

    expect(screen.getByLabelText("Calculation history")).toBeInTheDocument();
    expect(screen.getByText(/top:/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /clear history/i }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
