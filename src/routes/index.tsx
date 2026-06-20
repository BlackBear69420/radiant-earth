import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Gauge, Leaf, ShieldCheck } from "lucide-react";
import { Header } from "@/components/common/Header";
import { SectionCard } from "@/components/common/SectionCard";
import { CalculatorForm } from "@/components/forms/CalculatorForm";
import { useCarbonCalculator } from "@/hooks/useCarbonCalculator";
import type { CarbonInput } from "@/types/carbon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyCarbon — Track and reduce your carbon footprint" },
      {
        name: "description",
        content:
          "MyCarbon is a private, on-device calculator that helps you estimate your monthly carbon footprint and discover small changes with big impact.",
      },
      { property: "og:title", content: "MyCarbon — Personal Carbon Footprint Tracker" },
      {
        property: "og:description",
        content:
          "Estimate, track, and reduce your monthly carbon footprint with personalized recommendations. 100% on-device.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const { compute, latest } = useCarbonCalculator();

  const handleSubmit = (input: CarbonInput) => {
    compute(input);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-dvh">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Leaf className="h-3.5 w-3.5 text-leaf" aria-hidden="true" /> Private,
              on-device, no sign-up
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Understand your impact. <span className="text-leaf">Act on it.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              MyCarbon estimates your monthly carbon footprint from a few
              everyday inputs and turns the numbers into clear, doable next
              steps.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <Feature
                icon={<Gauge className="h-4 w-4" aria-hidden="true" />}
                title="Instant breakdown"
                text="See where your emissions come from at a glance."
              />
              <Feature
                icon={<Leaf className="h-4 w-4" aria-hidden="true" />}
                title="Personal tips"
                text="Get focused suggestions based on your biggest source."
              />
              <Feature
                icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />}
                title="Privacy-first"
                text="Everything stays in your browser. No tracking."
              />
              <Feature
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                title="Track progress"
                text="Your last calculations are saved locally for trends."
              />
            </ul>
          </div>

          <SectionCard
            ariaLabel="Carbon footprint calculator"
            className="lg:sticky lg:top-24"
            title="Quick calculator"
            description="Takes about 30 seconds. Update any field to recalculate."
          >
            <CalculatorForm
              initial={latest?.input}
              onSubmit={handleSubmit}
              submitLabel="See my dashboard"
            />
          </SectionCard>
        </section>
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Built with care · Emission factors are illustrative averages.
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-3 rounded-xl border border-border bg-card/60 p-3">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-leaf/15 text-leaf">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </li>
  );
}
