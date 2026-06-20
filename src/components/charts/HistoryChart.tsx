import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HistoryEntry } from "@/types/carbon";
import { formatKg } from "@/utils/formatters";

export function HistoryChart({ entries }: { entries: HistoryEntry[] }) {
  const data = [...entries]
    .reverse()
    .slice(-10)
    .map((e, i) => ({
      name: new Date(e.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: Number(e.result.totalMonthlyKg.toFixed(1)),
      key: e.id + i,
    }));

  if (data.length < 2) {
    return (
      <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Log at least two calculations to see your trend over time.
      </p>
    );
  }

  const description = data
    .map((d) => `${d.name}: ${formatKg(d.value)}`)
    .join(", ");

  return (
    <div>
      <p className="sr-only" role="img" aria-label={`Carbon footprint trend. ${description}`}>
        {description}
      </p>
      <div className="h-64 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                color: "var(--color-foreground)",
              }}
              formatter={(v: number) => formatKg(v)}
            />
            <Bar
              dataKey="value"
              fill="var(--color-chart-1)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
