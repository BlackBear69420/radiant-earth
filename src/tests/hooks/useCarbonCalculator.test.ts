import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarbonCalculator } from "@/hooks/useCarbonCalculator";

describe("useCarbonCalculator", () => {
  it("computes and stores results in localStorage", async () => {
    const { result } = renderHook(() => useCarbonCalculator());

    await vi.waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => {
      result.current.compute({
        commuteKm: 10,
        transport: "car",
        diet: "mixed",
        electricityKwh: 200,
      });
    });

    expect(result.current.latest).not.toBeNull();
    expect(result.current.history).toHaveLength(1);
    expect(result.current.recommendations.length).toBeGreaterThan(0);
  });

  it("clears history and latest result", async () => {
    const { result } = renderHook(() => useCarbonCalculator());

    await vi.waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => {
      result.current.compute({
        commuteKm: 5,
        transport: "bike",
        diet: "vegetarian",
        electricityKwh: 100,
      });
    });

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.latest).toBeNull();
    expect(result.current.history).toHaveLength(0);
    expect(result.current.recommendations).toHaveLength(0);
  });

  it("caps history at 20 entries", async () => {
    const { result } = renderHook(() => useCarbonCalculator());

    await vi.waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => {
      for (let i = 0; i < 25; i++) {
        result.current.compute({
          commuteKm: i,
          transport: "car",
          diet: "mixed",
          electricityKwh: 100,
        });
      }
    });

    expect(result.current.history).toHaveLength(20);
  });
});
