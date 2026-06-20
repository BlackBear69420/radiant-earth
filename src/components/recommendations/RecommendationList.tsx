import { Sparkles } from "lucide-react";
import type { Recommendation } from "@/types/carbon";
import { formatKg } from "@/utils/formatters";

export function RecommendationList({ items }: { items: Recommendation[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Calculate your footprint to see personalized recommendations.
      </p>
    );
  }
  return (
    <ul className="grid gap-3" aria-label="Personalized recommendations">
      {items.map((r) => (
        <li
          key={r.id}
          className="rounded-xl border border-border bg-card/60 p-4 transition hover:border-leaf/60 hover:shadow-soft"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
              {r.estimatedMonthlySavingKg > 0 ? (
                <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-leaf/15 px-2 py-1 text-xs font-semibold text-foreground">
                  Potential saving: ~{formatKg(r.estimatedMonthlySavingKg)} / month
                </p>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
