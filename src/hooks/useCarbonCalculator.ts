import { useCallback, useMemo } from "react";
import { calculateCarbon } from "@/services/carbonCalculator";
import { generateRecommendations } from "@/utils/recommendationEngine";
import type { CarbonInput, CarbonResult, HistoryEntry } from "@/types/carbon";
import { useLocalStorage } from "./useLocalStorage";

const HISTORY_KEY = "mycarbon.history.v1";
const LATEST_KEY = "mycarbon.latest.v1";
const MAX_HISTORY = 20;

export function useCarbonCalculator() {
  const history = useLocalStorage<HistoryEntry[]>(HISTORY_KEY, []);
  const latest = useLocalStorage<CarbonResult | null>(LATEST_KEY, null);

  const compute = useCallback(
    (input: CarbonInput): CarbonResult => {
      const result = calculateCarbon(input);
      const entry: HistoryEntry = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}`,
        createdAt: new Date().toISOString(),
        result,
      };
      latest.setValue(result);
      history.setValue((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
      return result;
    },
    [history, latest],
  );

  const clearHistory = useCallback(() => {
    history.setValue([]);
    latest.setValue(null);
  }, [history, latest]);

  const recommendations = useMemo(
    () => (latest.value ? generateRecommendations(latest.value) : []),
    [latest.value],
  );

  return {
    compute,
    clearHistory,
    history: history.value,
    latest: latest.value,
    recommendations,
    hydrated: history.hydrated && latest.hydrated,
  };
}
