import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CategoryBreakdown } from "@/types/carbon";
import { formatKg, formatPercent } from "@/utils/formatters";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"];

export function BreakdownChart({ breakdown }: { breakdown: CategoryBreakdown[] }) {
  const data = breakdown.map((b) => ({
    name: b.label,
    value: Number(b.monthlyKg.toFixed(2)),
    percent: b.percent,
  }));

  const description = breakdown
    .map((b) => `${b.label}: ${formatKg(b.monthlyKg)} (${formatPercent(b.percent)})`)
    .join(", ");

  return (
    <div>
      <p className="sr-only" role="img" aria-label={`Emissions breakdown. ${description}`}>
        {description}
      </p>
      <div className="grid items-center gap-6 sm:grid-cols-[1fr_1fr]">
        <div className="h-56 w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                stroke="var(--color-card)"
                strokeWidth={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  color: "var(--color-foreground)",
                }}
                formatter={(value: number) => formatKg(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="grid gap-2" aria-label="Emissions categories">
          {breakdown.map((b, i) => (
            <li
              key={b.key}
              className="flex items-center justify-between rounded-lg border border-border bg-card/60 px-3 py-2"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                {b.label}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatKg(b.monthlyKg)} · {formatPercent(b.percent)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
