import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalculatorForm } from "@/components/forms/CalculatorForm";

describe("CalculatorForm", () => {
  it("renders all fields and submits valid data", async () => {
    const onSubmit = vi.fn();
    render(<CalculatorForm onSubmit={onSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/commute/i), "12");
    await user.type(screen.getByLabelText(/electricity/i), "200");
    await user.click(screen.getByRole("button", { name: /calculate/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      commuteKm: 12,
      transport: "car",
      diet: "mixed",
      electricityKwh: 200,
    });
  });

  it("shows validation errors for invalid input", async () => {
    const onSubmit = vi.fn();
    render(<CalculatorForm onSubmit={onSubmit} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/commute/i), "-5");
    await user.type(screen.getByLabelText(/electricity/i), "10");
    await user.click(screen.getByRole("button", { name: /calculate/i }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/must be 0 or more/i)).toBeInTheDocument();
  });
});
