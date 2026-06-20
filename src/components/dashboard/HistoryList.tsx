import type { HistoryEntry } from "@/types/carbon";
import { formatDate, formatKg } from "@/utils/formatters";

export function HistoryList({
  entries,
  onClear,
}: {
  entries: HistoryEntry[];
  onClear: () => void;
}) {
  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No history yet. Your calculations will appear here.
      </p>
    );
  }
  return (
    <div className="grid gap-3">
      <ul className="grid gap-2" aria-label="Calculation history">
        {entries.slice(0, 8).map((e) => (
          <li
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card/60 px-4 py-3"
          >
            <span className="text-sm text-muted-foreground">
              {formatDate(e.createdAt)}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {formatKg(e.result.totalMonthlyKg)} / mo · top:{" "}
              {e.result.largest.label}
            </span>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={onClear} className="btn-ghost text-sm" type="button">
          Clear history
        </button>
      </div>
    </div>
  );
}
