import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecommendationList } from "@/components/recommendations/RecommendationList";

describe("RecommendationList", () => {
  it("shows empty state when no items", () => {
    render(<RecommendationList items={[]} />);
    expect(screen.getByText(/calculate your footprint/i)).toBeInTheDocument();
  });

  it("renders recommendation titles and savings", () => {
    render(
      <RecommendationList
        items={[
          {
            id: "1",
            title: "Try meat-free days",
            description: "Helps diet emissions.",
            estimatedMonthlySavingKg: 12,
            category: "diet",
          },
        ]}
      />,
    );
    expect(screen.getByText("Try meat-free days")).toBeInTheDocument();
    expect(screen.getByText(/potential saving/i)).toBeInTheDocument();
  });
});
