import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BreakdownChart } from "@/components/charts/BreakdownChart";
import type { CategoryBreakdown } from "@/types/carbon";

const breakdown: CategoryBreakdown[] = [
  { key: "transportation", label: "Transportation", monthlyKg: 63, percent: 16 },
  { key: "diet", label: "Diet", monthlyKg: 150, percent: 38 },
  { key: "electricity", label: "Electricity", monthlyKg: 164, percent: 46 },
];

describe("BreakdownChart", () => {
  it("provides a screen-reader summary of emissions breakdown", () => {
    render(<BreakdownChart breakdown={breakdown} />);
    const summary = screen.getByRole("img", { name: /emissions breakdown/i });
    expect(summary).toHaveClass("sr-only");
    expect(summary).toHaveTextContent("Transportation");
    expect(summary).toHaveTextContent("Diet");
    expect(summary).toHaveTextContent("Electricity");
  });

  it("renders a legend list for each category", () => {
    render(<BreakdownChart breakdown={breakdown} />);
    expect(screen.getByLabelText("Emissions categories")).toBeInTheDocument();
    expect(screen.getByText("Transportation")).toBeInTheDocument();
    expect(screen.getByText("Diet")).toBeInTheDocument();
    expect(screen.getByText("Electricity")).toBeInTheDocument();
  });
});
