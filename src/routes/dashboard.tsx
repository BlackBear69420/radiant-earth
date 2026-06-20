import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/common/AppShell";
import { SectionCard } from "@/components/common/SectionCard";
import { CalculatorForm } from "@/components/forms/CalculatorForm";
import { BreakdownChart } from "@/components/charts/BreakdownChart";
import { HistoryChart } from "@/components/charts/HistoryChart";
import { HistoryList } from "@/components/dashboard/HistoryList";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RecommendationList } from "@/components/recommendations/RecommendationList";
import { useCarbonCalculator } from "@/hooks/useCarbonCalculator";

const DASHBOARD_FOOTER = "Estimates are based on locally-stored, illustrative emission factors.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — MyCarbon" },
      {
        name: "description",
        content:
          "Your personal carbon footprint dashboard: summary, breakdown chart, recommendations, and history.",
      },
      { property: "og:title", content: "MyCarbon Dashboard" },
      {
        property: "og:description",
        content: "Visualize your carbon footprint and explore tailored suggestions.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { compute, clearHistory, latest, history, recommendations, hydrated } =
    useCarbonCalculator();
  const [editing, setEditing] = useState(false);

  if (!hydrated) {
    return (
      <AppShell footer={DASHBOARD_FOOTER}>
        <main id="main-content" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            Loading…
          </p>
        </main>
      </AppShell>
    );
  }

  if (!latest) {
    return (
      <AppShell footer={DASHBOARD_FOOTER}>
        <main id="main-content" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <SectionCard
            title="No data yet"
            description="Add your lifestyle details on the calculator to see your dashboard."
          >
            <Link to="/" className="btn-primary">
              Go to calculator
            </Link>
          </SectionCard>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell footer={DASHBOARD_FOOTER}>
      <main id="main-content" className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Based on your most recent inputs.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Home
            </Link>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setEditing((s) => !s)}
              aria-expanded={editing}
              aria-controls="edit-panel"
            >
              {editing ? "Close editor" : "Update inputs"}
            </button>
          </div>
        </div>

        {editing ? (
          <SectionCard
            title="Update your inputs"
            description="Recalculate with new lifestyle data."
          >
            <div id="edit-panel">
              <CalculatorForm
                initial={latest.input}
                onSubmit={(input) => {
                  compute(input);
                  setEditing(false);
                }}
                submitLabel="Recalculate"
              />
            </div>
          </SectionCard>
        ) : null}

        <SummaryCard result={latest} />

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard
            title="Breakdown by category"
            description="Where your monthly CO₂ comes from."
          >
            <BreakdownChart breakdown={latest.breakdown} />
          </SectionCard>
          <SectionCard
            title="Personalized recommendations"
            description="Tailored to your biggest emission source."
          >
            <RecommendationList items={recommendations} />
          </SectionCard>
        </div>

        <SectionCard title="Your trend" description="How your calculations compare over time.">
          <HistoryChart entries={history} />
        </SectionCard>

        <SectionCard title="History" description="Recent calculations on this device.">
          <HistoryList entries={history} onClear={clearHistory} />
        </SectionCard>
      </main>
    </AppShell>
  );
}
