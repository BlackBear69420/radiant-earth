import { TrendingDown, Flame, Calendar } from "lucide-react";
import type { CarbonResult } from "@/types/carbon";
import { formatKg } from "@/utils/formatters";

export function SummaryCard({ result }: { result: CarbonResult }) {
  const improvement = result.largest.monthlyKg * 0.2;
  return (
    <section
      className="card-surface relative overflow-hidden p-6 sm:p-8"
      aria-label="Carbon footprint summary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-leaf/20 blur-3xl"
      />
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat
          icon={<Calendar className="h-5 w-5" aria-hidden="true" />}
          label="Estimated monthly CO₂"
          value={formatKg(result.totalMonthlyKg)}
          accent
        />
        <Stat
          icon={<Flame className="h-5 w-5" aria-hidden="true" />}
          label="Largest contributor"
          value={result.largest.label}
          sub={`${formatKg(result.largest.monthlyKg)} this month`}
        />
        <Stat
          icon={<TrendingDown className="h-5 w-5" aria-hidden="true" />}
          label="Improvement potential"
          value={formatKg(improvement)}
          sub="With small lifestyle changes"
        />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Annual estimate:{" "}
        <span className="font-semibold text-foreground">
          {formatKg(result.totalYearlyKg)}
        </span>{" "}
        of CO₂ equivalent.
      </p>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${
          accent ? "bg-leaf text-leaf-foreground" : "bg-muted text-foreground"
        }`}
      >
        {icon}
      </div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
        {value}
      </p>
      {sub ? <p className="mt-1 text-sm text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
