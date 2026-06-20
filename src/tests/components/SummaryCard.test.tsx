import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { calculateCarbon } from "@/services/carbonCalculator";

describe("SummaryCard", () => {
  it("renders monthly total and largest contributor", () => {
    const result = calculateCarbon({
      commuteKm: 10,
      transport: "car",
      diet: "mixed",
      electricityKwh: 200,
    });
    render(<SummaryCard result={result} />);

    expect(screen.getByLabelText("Carbon footprint summary")).toBeInTheDocument();
    expect(screen.getByText("Estimated monthly CO₂")).toBeInTheDocument();
    expect(screen.getByText(result.largest.label)).toBeInTheDocument();
    expect(screen.getByText(/annual estimate/i)).toBeInTheDocument();
  });
});
