import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  it("starts with initial value and hydrates from storage", async () => {
    localStorage.setItem("test.key", JSON.stringify({ count: 5 }));

    const { result } = renderHook(() => useLocalStorage("test.key", { count: 0 }));

    await vi.waitFor(() => expect(result.current.hydrated).toBe(true));
    expect(result.current.value).toEqual({ count: 5 });
  });

  it("persists updates to localStorage", async () => {
    const { result } = renderHook(() => useLocalStorage("persist.key", "initial"));

    await vi.waitFor(() => expect(result.current.hydrated).toBe(true));

    act(() => {
      result.current.setValue("updated");
    });

    expect(result.current.value).toBe("updated");
    expect(localStorage.getItem("persist.key")).toBe(JSON.stringify("updated"));
  });
});
